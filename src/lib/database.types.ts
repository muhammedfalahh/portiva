/**
 * =============================================================================
 * PORTIVA: Database Type Definitions
 * =============================================================================
 *
 * These types mirror the PostgreSQL schema exactly, providing compile-time
 * type safety for all Supabase client operations. When the schema changes,
 * these types must be updated to match.
 *
 * Structure:
 *   Database > public > Tables > [table_name] > Row / Insert / Update
 *
 *   - Row:    The shape of data returned from SELECT queries
 *   - Insert: The shape required for INSERT operations (optional fields have defaults)
 *   - Update: The shape for UPDATE operations (all fields optional / partial)
 *
 * Additionally, Enums are mapped to TypeScript union types for strict
 * type checking on categorical columns.
 *
 * Usage with Supabase client:
 *   import type { Database } from '@/lib/database.types';
 *   const supabase = createClient<Database>(...);
 *   // All .from('table').select() calls are now fully typed
 */

// =============================================================================
// Enum Type Aliases
// =============================================================================

/** Subscription tiers controlling feature gating and billing boundaries */
export type SubscriptionTier = 'free' | 'pro' | 'business';

/** Block rendering strategy for each bento grid cell */
export type BlockType = 'link' | 'image' | 'whatsapp_catalog';

/** Inventory lifecycle state for dealership CMS */
export type InventoryStatus = 'available' | 'sold' | 'promo';

// =============================================================================
// Content Payload Interfaces
// =============================================================================

/**
 * JSONB content schema for bento blocks.
 * Each block type uses a subset of these fields:
 *   - link:              title, url, description
 *   - image:             image_url, title
 *   - whatsapp_catalog:  title, description, phone, price, image_url
 */
export interface BlockContent {
  title?: string;
  url?: string;
  description?: string;
  price?: number;
  phone?: string;
  image_url?: string;
}

/**
 * CSS Grid placement coordinates for bento blocks.
 * All values are 1-indexed integers:
 *   - x: Column start position
 *   - y: Row start position
 *   - w: Column span (width in grid cells)
 *   - h: Row span (height in grid cells)
 */
export interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

// =============================================================================
// Supabase Database Type Map
// =============================================================================

export interface Database {
  public: {
    Tables: {
      // ─── PROFILES ───────────────────────────────────────────────────────
      profiles: {
        /** Shape of data returned from SELECT queries */
        Row: {
          id: string;
          handle: string;
          full_name: string;
          subscription_tier: SubscriptionTier;
          is_moderated: boolean;
          created_at: string;
        };
        /** Shape required for INSERT operations */
        Insert: {
          id: string;
          handle: string;
          full_name: string;
          subscription_tier?: SubscriptionTier;
          is_moderated?: boolean;
          created_at?: string;
        };
        /** Shape for UPDATE operations (all fields optional) */
        Update: {
          id?: string;
          handle?: string;
          full_name?: string;
          subscription_tier?: SubscriptionTier;
          is_moderated?: boolean;
          created_at?: string;
        };
      };

      // ─── BENTO BLOCKS ──────────────────────────────────────────────────
      bento_blocks: {
        Row: {
          id: string;
          profile_id: string;
          block_type: BlockType;
          content: BlockContent;
          grid_position: GridPosition;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          block_type: BlockType;
          content?: BlockContent;
          grid_position?: GridPosition;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          block_type?: BlockType;
          content?: BlockContent;
          grid_position?: GridPosition;
          order_index?: number;
          created_at?: string;
        };
      };

      // ─── DEALERSHIP INVENTORY ──────────────────────────────────────────
      dealership_inventory: {
        Row: {
          id: string;
          profile_id: string;
          title: string;
          price: number;
          mileage: number;
          status: InventoryStatus;
          image_urls: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          title: string;
          price: number;
          mileage: number;
          status?: InventoryStatus;
          image_urls?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          title?: string;
          price?: number;
          mileage?: number;
          status?: InventoryStatus;
          image_urls?: string[];
          created_at?: string;
        };
      };
    };

    Views: Record<string, never>;

    Functions: Record<string, never>;

    Enums: {
      subscription_tier: SubscriptionTier;
      block_type_enum: BlockType;
      inventory_status_enum: InventoryStatus;
    };
  };
}
