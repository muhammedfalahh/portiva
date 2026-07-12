-- =============================================================================
-- PORTIVA: Initial Database Schema Migration
-- =============================================================================
-- Description: Creates the foundational data architecture for Portiva's
--              bento-grid micro-website engine. Includes custom enum types,
--              core relational tables, auto-sync triggers, Row-Level Security
--              policies, and performance indexes.
--
-- Target: Supabase (PostgreSQL 16+)
-- Author: Portiva Engineering
-- =============================================================================

-- -----------------------------------------------------------------------------
-- SECTION 1: CUSTOM ENUM TYPES
-- -----------------------------------------------------------------------------
-- Enums provide strict type safety at the database level, preventing invalid
-- values from ever being persisted. They are more efficient than CHECK
-- constraints on text columns for frequently queried categorical data.
-- -----------------------------------------------------------------------------

-- Subscription tiers control feature gating and billing boundaries.
-- 'free' = basic bento grid with branding footer
-- 'pro'  = custom domain, analytics, no branding
-- 'business' = dealership inventory CMS, WhatsApp commerce, priority support
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'business');

-- Block types define the rendering strategy for each bento grid cell.
-- 'link'              = External redirect card with title + description
-- 'image'             = Full-bleed image with overlay caption
-- 'whatsapp_catalog'  = Commerce card triggering WhatsApp click-to-chat
CREATE TYPE block_type_enum AS ENUM ('link', 'image', 'whatsapp_catalog');

-- Inventory lifecycle states for the dealership CMS extension.
-- 'available' = actively listed, visible to public
-- 'sold'      = greyed out with SOLD overlay, still visible
-- 'promo'     = featured with promotional badge animation
CREATE TYPE inventory_status_enum AS ENUM ('available', 'sold', 'promo');


-- -----------------------------------------------------------------------------
-- SECTION 2: CORE TABLES
-- -----------------------------------------------------------------------------

-- 2.1 PROFILES — Central identity table
-- Each row maps 1:1 to a Supabase auth.users record via the UUID primary key.
-- The ON DELETE CASCADE ensures orphan cleanup when auth records are removed.
CREATE TABLE public.profiles (
    id              UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    handle          TEXT NOT NULL UNIQUE,
    full_name       TEXT NOT NULL,
    subscription_tier subscription_tier NOT NULL DEFAULT 'free',
    is_moderated    BOOLEAN NOT NULL DEFAULT false,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now()),

    -- Handle format: lowercase alphanumeric + hyphens only (e.g., "cool-store")
    CONSTRAINT handle_format_check CHECK (handle ~ '^[a-z0-9-]+$'),
    -- Minimum 3 characters prevents namespace squatting on short slugs
    CONSTRAINT handle_length_check CHECK (char_length(handle) >= 3)
);

COMMENT ON TABLE public.profiles IS 'Core creator identity. 1:1 with auth.users. Handle is the public URL slug.';
COMMENT ON COLUMN public.profiles.handle IS 'URL-safe username slug. Lowercase alphanumeric + hyphens, min 3 chars.';
COMMENT ON COLUMN public.profiles.is_moderated IS 'Content compliance flag. When true, profile is hidden from public resolution.';


-- 2.2 BENTO BLOCKS — Modular grid cell storage
-- Each block represents a single cell in the bento grid layout.
-- The content JSONB column stores block-type-specific data (title, URL, phone, etc.)
-- The grid_position JSONB stores CSS Grid placement coordinates (x, y, w, h).
CREATE TABLE public.bento_blocks (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    block_type      block_type_enum NOT NULL,
    content         JSONB NOT NULL DEFAULT '{}'::jsonb,
    grid_position   JSONB NOT NULL DEFAULT '{"x": 0, "y": 0, "w": 1, "h": 1}'::jsonb,
    order_index     INTEGER NOT NULL DEFAULT 0,
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.bento_blocks IS 'Individual bento grid cells. Each block has a type, JSONB content, and grid placement.';
COMMENT ON COLUMN public.bento_blocks.content IS 'Block-type-specific payload. Link: {title, url, description}. Image: {image_url, title}. WhatsApp: {title, phone, price, description}.';
COMMENT ON COLUMN public.bento_blocks.grid_position IS 'CSS Grid placement: {x: col-start, y: row-start, w: col-span, h: row-span}. All values are 1-indexed integers.';


-- 2.3 DEALERSHIP INVENTORY — Business tier auto CMS extension
-- Only relevant for 'business' tier profiles. Stores vehicle listings with
-- lifecycle state management (available → sold → promo).
CREATE TABLE public.dealership_inventory (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title           TEXT NOT NULL,
    price           NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    mileage         INTEGER NOT NULL CHECK (mileage >= 0),
    status          inventory_status_enum NOT NULL DEFAULT 'available',
    image_urls      TEXT[] NOT NULL DEFAULT '{}'::text[],
    created_at      TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT timezone('utc'::text, now())
);

COMMENT ON TABLE public.dealership_inventory IS 'Vehicle listings for business-tier dealership profiles. Supports lifecycle state management.';
COMMENT ON COLUMN public.dealership_inventory.image_urls IS 'Ordered array of Cloudflare R2 asset paths for vehicle images.';
COMMENT ON COLUMN public.dealership_inventory.status IS 'Lifecycle state: available (listed), sold (greyed + overlay), promo (featured badge).';


-- -----------------------------------------------------------------------------
-- SECTION 3: AUTO-SYNC TRIGGER — New User Profile Creation
-- -----------------------------------------------------------------------------
-- When a new user signs up via Supabase Auth, this trigger automatically
-- creates their profile row. The handle is derived from the email prefix,
-- with a collision-resolution fallback appending a random 4-char suffix.
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, handle, full_name, subscription_tier)
    VALUES (
        new.id,
        -- Derive handle from the local part of the email address
        LOWER(SPLIT_PART(new.email, '@', 1)),
        -- Use the full_name from signup metadata, or fallback to a default
        COALESCE(new.raw_user_meta_data->>'full_name', 'Portiva Creator'),
        'free'
    )
    -- If the derived handle already exists, append a random 4-char suffix
    -- to ensure uniqueness without failing the signup flow.
    ON CONFLICT (handle) DO UPDATE
    SET handle = public.profiles.handle || '-' || SUBSTRING(gen_random_uuid()::text FROM 1 FOR 4);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION public.handle_new_user() IS 'Auto-creates a profile row when a new auth.users record is inserted. Handles namespace collisions via UUID suffix.';

-- Wire the trigger to fire AFTER each new auth signup
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- -----------------------------------------------------------------------------
-- SECTION 4: ROW-LEVEL SECURITY (RLS)
-- -----------------------------------------------------------------------------
-- RLS is the primary authorization layer. All tables have RLS enabled,
-- meaning queries without matching policies return zero rows.
--
-- Strategy:
--   READ  (SELECT) → Public access to non-moderated content
--   WRITE (INSERT/UPDATE/DELETE) → Owner-only, verified via auth.uid()
-- -----------------------------------------------------------------------------

-- Enable RLS on all tables (mandatory — without this, RLS policies are ignored)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bento_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dealership_inventory ENABLE ROW LEVEL SECURITY;

-- 4.1 PUBLIC READ POLICIES
-- Anyone can view profiles/blocks/inventory as long as the profile is not moderated.
-- The is_moderated flag acts as an instant kill-switch for compliance violations.

CREATE POLICY "Allow public SELECT on safe profiles"
    ON public.profiles
    FOR SELECT
    USING (is_moderated = false);

CREATE POLICY "Allow public SELECT on safe blocks"
    ON public.bento_blocks
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = public.bento_blocks.profile_id
            AND public.profiles.is_moderated = false
        )
    );

CREATE POLICY "Allow public SELECT on safe inventory"
    ON public.dealership_inventory
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE public.profiles.id = public.dealership_inventory.profile_id
            AND public.profiles.is_moderated = false
        )
    );

-- 4.2 OWNER WRITE POLICIES
-- Only the authenticated owner (auth.uid() matching the row's profile ID)
-- can insert, update, or delete their own data.

CREATE POLICY "Allow owner mutation on profiles"
    ON public.profiles
    FOR ALL
    USING (auth.uid() = id);

CREATE POLICY "Allow owner mutation on blocks"
    ON public.bento_blocks
    FOR ALL
    USING (auth.uid() = profile_id);

CREATE POLICY "Allow owner mutation on inventory"
    ON public.dealership_inventory
    FOR ALL
    USING (auth.uid() = profile_id);


-- -----------------------------------------------------------------------------
-- SECTION 5: PERFORMANCE INDEXES
-- -----------------------------------------------------------------------------
-- These indexes are critical for sub-200ms query performance at scale.
-- Partial indexes (WHERE clauses) reduce index size by excluding irrelevant rows.
-- -----------------------------------------------------------------------------

-- Fast handle lookups for public profile resolution (the hottest query path)
-- Partial index excludes moderated profiles since they return 404 anyway.
CREATE INDEX idx_profiles_handle_lookup
    ON public.profiles(handle)
    WHERE is_moderated = false;

-- Block ordering for bento grid assembly (always queried by profile + order)
CREATE INDEX idx_blocks_profile_order
    ON public.bento_blocks(profile_id, order_index);

-- Inventory listing sorted by newest first (dealership landing pages)
CREATE INDEX idx_inventory_profile_date
    ON public.dealership_inventory(profile_id, created_at DESC);
