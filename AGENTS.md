<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# PORTIVA: CENTRAL AGENT OPERATING MANUAL & ARCHITECTURAL CONSTITUTION

> **System Notice**: This document is the authoritative, binding central operating manual for all AI coding, design, and architecture agents operating within the **Portiva** repository. Every agent must read, understand, and strictly obey this document prior to inspecting, planning, modifying, or validating any code within Portiva.

---

## EXECUTIVE TABLE OF CONTENTS

1. **Portiva Mission & Product Vision**
2. **Product Philosophy & Non-Negotiable Design Laws**
3. **Core Agent Operating Philosophy**
4. **Source-of-Truth Hierarchy & Dispute Resolution**
5. **System Architecture Overview**
6. **Architectural Dependency Direction & Scoping**
7. **Circular Dependency Prevention & Diagnostic Protocols**
8. **Barrel File Rules & Import Discipline**
9. **Template Architecture & Isolation Principles**
10. **Shared Component Safety & Modification Rules**
11. **Unrelated Template Preservation & Protection**
12. **100% Visual Editability Mandate**
13. **Content Model & Hardcoded Content Prohibition**
14. **Styling Model & Color Customization Rules**
15. **Global Theme Architecture & Inheritance Cascade**
16. **Design System & Brand Identity Foundations**
17. **Visual Hierarchy & Composition Rules**
18. **Typography Systems & Scale Pairings**
19. **Color Systems & Curated Niche Palettes**
20. **Surface Design, Elevations & Materials**
21. **Bento Design System & Grid Principles**
22. **Bento Grid Layout Determinism & Responsive Rules**
23. **Bento Card Classification & Functional Taxonomy**
24. **BentoBio Flagship Template Architecture**
25. **BentoBio Profile Card Specification**
26. **BentoBio Social Links Specification**
27. **BentoBio Media Cards Specification**
28. **BentoBio Widget System & Card Management**
29. **BentoBio Customizer Architecture & UX**
30. **Inspector Sidebar Information Architecture**
31. **Contextual Inspector & Selection Model**
32. **Editing Mode vs Viewing Mode Separation**
33. **Animation System & Framer Motion Guidelines**
34. **Motion Safety & Reduced Motion Support**
35. **Accessibility (a11y) & Semantic HTML Mandate**
36. **Responsive Design & Multi-Viewport Rules**
37. **Designing for User-Generated Content (UGC) Resilience**
38. **Media Pipeline & Asset Compression Architecture**
39. **Performance Budget & Runtime Optimization**
40. **SEO, Social Sharing & Open Graph Infrastructure**
41. **Security, Content Moderation & Compliance Triggers**
42. **Platform Governance, Amanah & Ethical Product Engineering**
43. **Financial Transparency & Micro-Subscription Mechanics**
44. **Database Architecture (Supabase / PostgreSQL) & RLS Policies**
45. **Object Storage Architecture (Cloudflare R2) & S3 Proxying**
46. **Next.js App Router Architecture & Server/Client Boundaries**
47. **TypeScript Standards, Strict Typing & Schema Definitions**
48. **Tailwind CSS v4 System & Custom Property Tokens**
49. **Testing Strategy, Verification Commands & Quality Assurance**
50. **Comprehensive Pre-Flight Checklist**
51. **Debugging Workflows, Error Classification & Diagnostic Trees**
52. **Failure Recovery Protocols & Emergency Reversion**
53. **Git Discipline, Commit Hygiene & Scope Isolation**
54. **Dependency Hygiene & Package Management Rules**
55. **Codebase Inspection & Pre-Task Research Protocol**
56. **Agent Behavior, Honesty & Non-Fabrication Mandate**
57. **Task Execution Workflow (10-Phase Pipeline)**
58. **Completion Protocol & Summary Format**
59. **Master Verification Checklists**
60. **The Master Directives (260 Concrete Operating Laws)**

---
## 1. PORTIVA MISSION & PRODUCT VISION

### 1.1 Beyond Monotonous Link-in-Bio Tools
Traditional micro-site and "link-in-bio" tools suffer from severe design stagnation. They force creators, influencers, and local business owners into rigid, single-column vertical stacks of generic rectangular buttons. These legacy tools fail to capture aesthetic value, convey professional brand identity, or drive meaningful commercial conversion.

Portiva is engineered to supersede this paradigm. It fuses a high-end, editorial visual identity with a dynamic, modular **Bento-grid UI engine**. Users achieve the look, feel, and performance of an agency-crafted landing page or bespoke micro-website in under 60 seconds without writing a single line of code.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          PORTIVA PLATFORM VISION                        │
├─────────────────────────────────────────────────────────────────────────┤
│  Legacy Link-in-Bio                   Portiva Micro-Website Engine      │
│  ┌──────────────────────┐             ┌───────────────────────────────┐ │
│  │ [ Avatar ]           │             │ [ Bento Header & Identity ]   │ │
│  │ @username            │             │ ┌──────────┐ ┌──────────────┐ │ │
│  │                      │  ─────────► │ │ Media    │ │ WhatsApp CTA │ │ │
│  │ [ Button Link 1 ]    │   SUPERSEDE │ └──────────┘ └──────────────┘ │ │
│  │ [ Button Link 2 ]    │             │ ┌───────────────────────────┐ │ │
│  │ [ Button Link 3 ]    │             │ │ Dynamic Catalog / Grid    │ │ │
│  └──────────────────────┘             └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Target Ecosystem & Operational Capabilities
Portiva targets two primary market segments:
1. **Digital Creators & Influencers**: Requiring hyper-aesthetic, mobile-native visual hubs that unify social identities, portfolio showcases, YouTube video embeds, merchandise links, and newsletter signups.
2. **Local Small Enterprises**: Including automotive dealerships, beauty salons, cafes, niche marketing agencies, independent tutors, and real estate professionals requiring fast, operational micro-websites equipped with localized conversion actions (e.g., instant WhatsApp inquiries, inventory browsing, direct phone calls, map locations).

### 1.3 Platform Scalability & Unit Economics Model
Portiva operates on a high-volume, low-margin-per-user economic model tailored for rapid adoption. Server costs are decoupled from user and traffic growth through edge-computed asset pipeline compression and zero-egress object storage.

| Tier | Price Point | Target User & Core Capability | Infrastructure Impact |
|---|---|---|---|
| **Free Engine** | `INR 0` | Bento-grid templates, up to 10 WebP image uploads, `name.portiva.in` subdomain, pre-filled WhatsApp catalog checkout. Removes financial friction for viral growth. | Minimal; images compressed to ≤150KB client-side. |
| **Creator Pro** | `INR 149 / mo` | Custom domain DNS mapping, total platform branding removal, unlimited high-resolution media uploads, custom analytics. | Negligible incremental bandwidth via R2 zero-egress storage. |
| **Business** | `INR 449 / mo` | Dynamic Niche Content Management Systems (e.g., automotive inventory tagging, service catalog management), advanced lead routing, promotional banner deployment. | Low-overhead PostgreSQL query patterns with efficient caching. |

*Economic Benchmark*: At 1,000 active paying users (assuming an 80/20 Pro/Business split), monthly recurring revenue reaches `INR 219,000` (~$2,600 USD) while total infrastructure costs scale at a tiny fraction of revenue, maintaining profit margins in excess of 95%.

### 1.4 Platform Governance & Amanah Principles
Portiva is founded on **Amanah** (Trust). Platform governance requires clean, ethical user experiences:
- **Transparent Financial Mandates**: Pre-debit notifications sent via WhatsApp 72 hours before UPI auto-debits to prevent subscription traps.
- **Automated Content Sanity**: Database triggers scan user content for prohibited financial schemes, explicit content, or fraudulent goods, automatically flagging `is_moderated = true`.
- **Data Integrity**: Automated PostgreSQL snapshots guarantee small business inventories are never lost due to system failures.

---
## 2. PRODUCT PHILOSOPHY & NON-NEGOTIABLE DESIGN LAWS

### 2.1 The "No AI Aesthetic" Mandate
Every template, section, card, and interaction within Portiva must look as though it was handcrafted by a world-class product designer. **AI-generated design cliches are strictly forbidden.**

```
❌ FORBIDDEN AI DESIGN CLICHES
───────────────────────────────────────────────────────────────────────────
1. Glowing neon background blobs or uncontrolled radial gradients
2. Bright purple-to-pink SaaS gradients on buttons or headings
3. Repeated 3-column card grids with identical icon-heading-text structures
4. Uniform border-radii across fundamentally different visual components
5. Excessive glassmorphism (heavy backdrop blurs making text unreadable)
6. Generic 3D stock illustrations or meaningless vector icons next to every text node
7. Giant, obnoxious CTA buttons that ruin visual balance
8. Equal padding and margins everywhere, destroying visual hierarchy
9. Floating UI elements with no functional purpose
10. Unrestrained typography scaling without line-height calibration
11. Monotonous gray-on-gray card surfaces with zero contrast
12. Decorative geometric shapes placed randomly in background containers
13. Text overlays on uncurated background images without dark gradients
14. Uncalibrated drop shadows making cards appear detached from the canvas
15. Identical visual layouts reused across fundamentally different industries
16. Text contrast failing WCAG minimums on background containers
17. Inconsistent icon stroke weights within the same visual section
18. Hardcoded arbitrary hex color strings in component markup
```

```
✓ MANDATORY PREMIUM DESIGN CHARACTERISTICS
───────────────────────────────────────────────────────────────────────────
1. Editorial restraint, generous whitespace, and intentional composition
2. High-contrast typography pairings (editorial serif headlines + clean modern sans-serif labels)
3. Curated, low-saturation color palettes tailored to specific business industries
4. Tactile micro-interactions (subtle scale, delicate border-color shifts, smooth focus rings)
5. Asymmetrical Bento grid layouts that guide the user's eye naturally
6. Functional, content-first visual density suited to mobile and desktop viewports
7. Tonal surface variations that communicate material depth
8. Sharp, readable text contrast adhering to WCAG AA contrast ratios
9. Micro-badge status indicators with restrained color accents
10. Responsive layout re-composition designed specifically for mobile viewports
```

### 2.2 Industry Personality Taxonomy
Portiva does not use a single "one-size-fits-all" visual style. Every industry template must manifest a unique visual personality:

```
┌───────────────────┬───────────────────────────────────┬────────────────────────────────────┐
│ Industry Niche    │ Visual Personality & Vibe         │ Typography & Color Attributes      │
├───────────────────┼───────────────────────────────────┼────────────────────────────────────┤
│ Luxury Real Estate│ Editorial, architectonic, calm    │ Serif display, stone/cream/gold    │
│ Automotive        │ Performance, cinematic, bold      │ High-contrast sans, obsidian/cyan │
│ Cafe & Bakery     │ Warm, organic, artisanal, cozy    │ Soft serif, espresso/cream/sage    │
│ Beauty & Salon    │ Refined, tactile, luxurious       │ High-fashion serif, champagne/blush│
│ Fitness & Gym     │ Energetic, high-contrast, kinetic │ Bold condensed sans, dark/electric │
│ Educator / Tutor  │ Structured, trustworthy, clear    │ Crisp geometric sans, navy/slate   │
│ Agency / B2B      │ Swiss minimal, Silicon Valley     │ Monospaced accent + sans, mono/zinc│
│ Creator / Bio     │ Expressive, compact, modern       │ Variable sans, vibrant surface     │
└───────────────────┴───────────────────────────────────┴────────────────────────────────────┘
```

### 2.3 Universal Template Architecture
Templates must be **universal**. Never hardcode a template around a fictional single business (e.g., "John's Pizza"). Instead, engineer flexible layout systems where the visual hierarchy and structure remain rock-solid regardless of the specific business content injected.

### 2.4 Single-Page Narrative Mandate
Unless explicitly instructed otherwise for admin flows, every public Portiva template is a **single-page landing micro-site**. All navigation links must utilize smooth-scrolling section anchors (`#hero`, `#services`, `#contact`) rather than triggering full page reloads or multi-page routing.

---
## 3. CORE AGENT OPERATING PHILOSOPHY

> **The Agent Directives Protocol**:
> 1. **Inspect first.**
> 2. **Understand second.**
> 3. **Plan third.**
> 4. **Modify fourth.**
> 5. **Validate fifth.**

### 3.1 Minimal Unnecessary Complexity, Maximum Quality
Agents must never perform unnecessary rewrites, introduce extraneous abstraction layers, or replace functioning state systems simply because an alternative implementation appears cleaner. 

Every modification must answer two fundamental questions:
1. *"What is the smallest safe change that fully satisfies the user request?"*
2. *"Can this implementation be made substantially higher quality without introducing structural risk?"*

### 3.2 Stability Hierarchy
When engineering decisions conflict, agents must enforce the following absolute priority order:

```
  1. APPLICATION STABILITY   (No crashes, compilation freezes, runtime exceptions)
  2. ARCHITECTURAL INTEGRITY (Strict dependency rules, no circular imports)
  3. EDITOR INTEGRITY        (Visual builder state, selection model, history stack)
  4. DATA COMPATIBILITY      (Supabase schema alignment, JSONB compatibility)
  5. TEMPLATE ISOLATION      (Zero side-effects on unrelated templates)
  6. TYPE SAFETY             (Strict TypeScript compliance, zero 'any' casts)
  7. ACCESSIBILITY (a11y)    (Semantic HTML, ARIA labels, focus states, keyboard navigation)
  8. RESPONSIVE BEHAVIOR     (Fluid breakpoints 320px -> 1440px, no overflow)
  9. PERFORMANCE            (Rerender guards, asset compression, lazy loading)
  10. VISUAL QUALITY         (Typography hierarchy, spacing, surface harmony)
  11. ANIMATION POLISH       (GPU transform/opacity transitions, reduced-motion)
  12. CODE CLEANUP           (Removing dead code, comments clarification)
```

---
## 4. SOURCE-OF-TRUTH HIERARCHY & DISPUTE RESOLUTION

When documentation, user instructions, and codebase implementations appear to disagree, agents must resolve conflicts using the following strict 8-tier hierarchy:

```
  TIER 1 (HIGHEST): Actual Executable Source Code in `src/` (The absolute runtime truth)
  TIER 2          : Supabase Database Schema & Migrations in `supabase/migrations/`
  TIER 3          : Active Environment & Package Configurations (`package.json`, `next.config.ts`)
  TIER 4          : Explicit Prompt Instructions for the Current Active Task
  TIER 5          : `AGENTS.md` (This Architectural Constitution)
  TIER 6          : `design-rules.md` & `Template Editor Requirements.pdf`
  TIER 7          : `portiva_research_paper.pdf`
  TIER 8 (LOWEST) : Historical Agent Logs & Briefing Notes in `.agents/`
```

---
## 5. SYSTEM ARCHITECTURE OVERVIEW

### 5.1 Repository Map & Component Directory Structure
```
portiva/
├── .env.local.example                  # Reference environment variables
├── next.config.ts                      # Next.js 16 configuration (skips typecheck in build)
├── postcss.config.mjs                  # PostCSS pipeline for Tailwind v4
├── tsconfig.json                       # TypeScript strict compiler options
├── supabase/
│   └── migrations/                     # Ordered SQL migrations (000_schema -> 002_theme)
└── src/
    ├── app/                            # Next.js App Router
    │   ├── page.tsx                    # Portiva Landing Page ('use client')
    │   ├── layout.tsx                  # Root Layout & Metadata
    │   ├── globals.css                 # Tailwind v4 @theme inline & CSS Variables
    │   ├── dashboard/                  # Creator Studio Workspace
    │   │   └── page.tsx                # Renders WorkspaceContainer
    │   ├── [username]/                 # Dynamic Public Micro-Site Route
    │   │   └── page.tsx                # SSR/ISR Profile Renderer (revalidate = 60s)
    │   └── api/
    │       └── upload/                 # Edge Route Proxying Image Uploads to Cloudflare R2
    │           └── route.ts            # AWS S3 SDK integration for R2 bucket
    ├── components/
    │   ├── engine/                     # Visual Builder Core System
    │   │   ├── useWorkspaceStore.ts    # Centralized Zustand State Engine
    │   │   ├── VisualBuilderContext.tsx# React Context bridging Zustand & Canvas
    │   │   ├── ThemeProvider.tsx       # CSS Custom Property Injection Engine
    │   │   ├── WorkspaceContainer.tsx  # Master Builder Layout & Canvas Wrapper
    │   │   ├── WorkspaceLayout.tsx     # Workspace Shell UI
    │   │   ├── InspectorSidebar.tsx    # Canva/Framer-style Customizer Panel
    │   │   ├── BentoCustomizer.tsx     # Specialized Bento-grid Box Manager
    │   │   ├── EditModeContext.tsx     # Context controlling View vs Edit mode
    │   │   ├── EditableElement.tsx     # Core editable text/style wrapper primitive
    │   │   ├── EditableText.tsx        # Inline text editor component
    │   │   ├── EditableImage.tsx       # Image replacement & aspect ratio primitive
    │   │   ├── EditableButton.tsx      # Button override & link target primitive
    │   │   ├── ThemedBentoCard.tsx     # Generic Theme-aware Bento Card wrapper
    │   │   ├── ZoomControls.tsx        # Canvas Hardware Zoom Controller
    │   │   ├── PublicTemplateViewer.tsx# Renderer for public SSR page previews
    │   │   └── index.ts                # Engine Barrel Export File
    ├── components/
    │   ├── templates/                  # Reusable Industry & Profile Templates
    │   │   ├── Aurik.tsx               # Minimal Portfolio Template
    │   │   ├── BentoBio.tsx            # Flagship Bento Link-in-Bio System
    │   │   ├── AuraSalon.tsx           # Luxury Salon Editorial Template
    │   │   ├── Nitec.tsx               # Dark Mode Developer/Design Portfolio
    │   │   ├── SnapMaster.tsx          # Photography Showcase Template
    │   │   ├── LuxeUniversal.tsx       # High-End E-Commerce/Agency Template
    │   │   ├── CafeCloud.tsx           # Cafe & Restaurant Template
    │   │   ├── AutoDrive.tsx           # Automotive Dealership Template
    │   │   ├── EstatePrime.tsx         # Real Estate Micro-Site Template
    │   │   ├── MentorX.tsx             # Educator & Course Micro-Site Template
    │   │   ├── StudioNova.tsx          # Creative Studio Template
    │   │   ├── ApexFit.tsx             # Fitness & Personal Trainer Template
    │   │   ├── aurasalon/              # Modularized sections for AuraSalon
    │   │   └── linkinbio/              # Modularized sections for BentoBio
    │   ├── dashboard/                  # Dashboard Analytics & Project Management UI
    │   └── widgets/                    # Specialized Business Conversion Widgets
    │       └── WhatsAppCatalogWidget.tsx# WhatsApp Ordering Catalog Modal
    ├── lib/                            # Platform Core Infrastructure
    │   ├── database.types.ts           # Hand-Maintained TypeScript Schema Types
    │   ├── theme.types.ts              # ThemeConfig, Overrides & CSS Var Converters
    │   └── supabase/
    │       ├── client.ts               # Browser Client (`createBrowserClient`)
    │       └── server.ts               # Server Client (`createClient`) & Service Client
    └── utils/
        └── AssetPipeline.ts            # Client Image Compressor (WebP 1080px max)
```

### 5.2 Database Type Interface Specification (`src/lib/database.types.ts`)
```typescript
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          updated_at: string | null;
          username: string | null;
          full_name: string | null;
          avatar_url: string | null;
          website: string | null;
          theme_config: Json | null;
          subscription_tier: 'free' | 'pro' | 'business';
          is_moderated: boolean;
        };
        Insert: {
          id: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          theme_config?: Json | null;
          subscription_tier?: 'free' | 'pro' | 'business';
          is_moderated?: boolean;
        };
        Update: {
          id?: string;
          updated_at?: string | null;
          username?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          website?: string | null;
          theme_config?: Json | null;
          subscription_tier?: 'free' | 'pro' | 'business';
          is_moderated?: boolean;
        };
      };
      bento_blocks: {
        Row: {
          id: string;
          user_id: string;
          block_type: 'link' | 'image' | 'whatsapp_catalog';
          content: Json;
          grid_position: Json;
          order_index: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          block_type: 'link' | 'image' | 'whatsapp_catalog';
          content?: Json;
          grid_position?: Json;
          order_index?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          block_type?: 'link' | 'image' | 'whatsapp_catalog';
          content?: Json;
          grid_position?: Json;
          order_index?: number;
          created_at?: string;
        };
      };
      dealership_inventory: {
        Row: {
          id: string;
          user_id: string;
          make: string;
          model: string;
          year: number;
          price: number;
          status: 'available' | 'sold' | 'reserved';
          images: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          make: string;
          model: string;
          year: number;
          price: number;
          status?: 'available' | 'sold' | 'reserved';
          images?: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          make?: string;
          model?: string;
          year?: number;
          price?: number;
          status?: 'available' | 'sold' | 'reserved';
          images?: string[];
          created_at?: string;
        };
      };
    };
  };
}
```

### 5.3 Complete Database Migrations (`supabase/migrations/`)
```sql
-- Migration 000_schema.sql
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'business');
CREATE TYPE block_type_enum AS ENUM ('link', 'image', 'whatsapp_catalog');
CREATE TYPE inventory_status_enum AS ENUM ('available', 'sold', 'reserved');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  theme_config JSONB DEFAULT '{}'::jsonb,
  subscription_tier subscription_tier DEFAULT 'free',
  is_moderated BOOLEAN DEFAULT FALSE
);

CREATE TABLE bento_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  block_type block_type_enum NOT NULL,
  content JSONB DEFAULT '{}'::jsonb NOT NULL,
  grid_position JSONB DEFAULT '{"x":0,"y":0,"w":1,"h":1}'::jsonb NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE dealership_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  price NUMERIC NOT NULL,
  status inventory_status_enum DEFAULT 'available' NOT NULL,
  images TEXT[] DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bento_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealership_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles viewable unless moderated"
ON profiles FOR SELECT USING (is_moderated = FALSE);

CREATE POLICY "Users update own profile"
ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public bento blocks viewable"
ON bento_blocks FOR SELECT USING (TRUE);

CREATE POLICY "Users manage own bento blocks"
ON bento_blocks FOR ALL USING (auth.uid() = user_id);
```

```sql
-- Migration 001_compliance.sql
CREATE OR REPLACE FUNCTION check_content_compliance()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.content::text ~* '(phishing|malware|scam|explicit_prohibited_term)' THEN
    NEW.is_moderated := TRUE;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_check_bento_compliance
BEFORE INSERT OR UPDATE ON bento_blocks
FOR EACH ROW EXECUTE FUNCTION check_content_compliance();
```

---
## 6. ARCHITECTURAL DEPENDENCY DIRECTION & SCOPING

To maintain structural modularity and prevent cascade failures, all imports must obey a strict unidirectional hierarchy. **Dependencies must only point DOWNWARD.**

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      DEPENDENCY DIRECTION HIERARCHY                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   LEVEL 1: App Routes / Pages (`src/app/**`)                            │
│      │                                                                  │
│      ▼                                                                  │
│   LEVEL 2: Workspace & Templates (`src/components/templates/**`)        │
│      │                                                                  │
│      ▼                                                                  │
│   LEVEL 3: Template Sub-Components (`src/components/templates/*/*`)     │
│      │                                                                  │
│      ▼                                                                  │
│   LEVEL 4: Visual Builder Engine (`src/components/engine/**`)           │
│      │                                                                  │
│      ▼                                                                  │
│   LEVEL 5: Shared Low-Level Utilities (`src/lib/**`, `src/utils/**`)    │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 7. CIRCULAR DEPENDENCY PREVENTION & DIAGNOSTIC PROTOCOLS

### 7.1 Diagnostic Protocol for Compilation Freezes
If the Next.js development server freezes, hangs at 0%, or fails to reload during edits:

```sh
# STEP 1: Immediately stop editing visual code. Do not force code changes.
# STEP 2: Check terminal logs for circular import warnings.
# STEP 3: Run Madge or manual ripgrep cycle check:
npx tsc --noEmit
```

---

## 8. BARREL FILE RULES & IMPORT DISCIPLINE

### 8.1 Engine Barrel (`src/components/engine/index.ts`) Rules
1. `index.ts` in `src/components/engine` MUST ONLY re-export pure engine primitives (`EditableText`, `EditableImage`, `EditableButton`, `ThemedBentoCard`, `ThemeProvider`).
2. `index.ts` MUST NEVER re-export `WorkspaceContainer.tsx`, `WorkspaceLayout.tsx`, or `InspectorSidebar.tsx`.
3. Internal engine files must never import from `./index`.

---

## 9. TEMPLATE ARCHITECTURE & ISOLATION PRINCIPLES

### 9.1 Template Structural Pattern
Complex templates must organize their internal sections within a dedicated subfolder:

```
src/components/templates/aurasalon/
├── types.ts                      # Template Props & Content Interfaces
├── MinimalNavigation.tsx         # Section 1
├── CinematicHero.tsx             # Section 2
├── EditorialBrandStatement.tsx   # Section 3
├── OurStoryPhilosophy.tsx        # Section 4
├── LookbookCarousel.tsx          # Section 5 (Max 5 items)
├── BeforeAfterSlider.tsx         # Section 6
├── EditorialServiceList.tsx      # Section 7
├── PackageCarousel.tsx           # Section 8
├── ArtistryProcess.tsx           # Section 9
├── FashionEditorialBento.tsx     # Section 10
├── BrideTestimonials.tsx         # Section 11
├── SocialProofStats.tsx          # Section 12
├── InstagramShowcase.tsx         # Section 13
├── FinalBookingSection.tsx       # Section 14
└── MinimalFooter.tsx             # Section 15
```

---

## 10. SHARED COMPONENT SAFETY & MODIFICATION RULES

### 10.1 Pre-Flight Audit
Before modifying shared primitives in `src/components/engine/`:
1. Search for all template invocations.
2. Make new props optional (`?`).
3. Provide safe default values.
4. Run `npx tsc --noEmit`.

---

## 11. UNRELATED TEMPLATE PRESERVATION & PROTECTION

When refactoring a target template (e.g. `AuraSalon.tsx`), never alter unrelated templates (`AutoDrive.tsx`, `SnapMaster.tsx`).

---

## 12. 100% VISUAL EDITABILITY MANDATE

> **The Fundamental Editor Law**:
> *Every visible user-facing element in a Portiva template must be fully editable through the visual builder interface. No text, color, image, link, or design element should be hardcoded or locked.*

---

## 13. CONTENT MODEL & HARDCODED CONTENT PROHIBITION

### 13.1 Unique Element Identifier Protocol
Every editable element rendered in JSX must be bound to a unique, stable, deterministic string identifier.

```tsx
// ✓ CORRECT: Editor-bound text primitives using deterministic key mapping
<EditableText
  elementId="hero-headline"
  defaultText={content.heroTitle || "Welcome to Luxury Auto Studio"}
  as="h1"
  className="text-4xl lg:text-6xl font-serif text-theme-foreground"
/>
```

---

## 14. STYLING MODEL & COLOR CUSTOMIZATION RULES

### 14.1 Dynamic CSS Custom Property Binding
Colors must never be hardcoded as static hex values inside utility class strings. Use semantic variables (`bg-theme-background`, `text-theme-foreground`).

---
## 15. GLOBAL THEME ARCHITECTURE & INHERITANCE CASCADE

### 15.1 Preset Themes Source Code Definition (`src/lib/theme.types.ts`)
```typescript
export interface ThemeConfig {
  primary: string;
  primaryHover: string;
  background: string;
  surface: string;
  surfaceHover: string;
  foreground: string;
  muted: string;
  border: string;
  accent: string;
  accentHover: string;
  cardBg?: string;
  cardText?: string;
  cardMuted?: string;
  heroBg?: string;
  heroText?: string;
  footerBg?: string;
  footerText?: string;
}

export const DEFAULT_THEME: ThemeConfig = {
  primary: '#DC2626',
  primaryHover: '#EF4444',
  background: '#0c0c0e',
  surface: '#121215',
  surfaceHover: '#18181b',
  foreground: '#f4f4ee',
  muted: '#6b7280',
  border: '#1e1e24',
  accent: '#DC2626',
  accentHover: '#EF4444',
};

export const AURIK_THEME: ThemeConfig = {
  primary: '#E11D48',
  primaryHover: '#F43F5E',
  background: '#09090B',
  surface: '#18181B',
  surfaceHover: '#27272A',
  foreground: '#FAFAFA',
  muted: '#A1A1AA',
  border: '#27272A',
  accent: '#E11D48',
  accentHover: '#F43F5E',
};

export const NITEC_THEME: ThemeConfig = {
  primary: '#10B981',
  primaryHover: '#34D399',
  background: '#030712',
  surface: '#111827',
  surfaceHover: '#1F2937',
  foreground: '#F9FAFB',
  muted: '#9CA3AF',
  border: '#1F2937',
  accent: '#10B981',
  accentHover: '#34D399',
};

export const SNAPMASTER_THEME: ThemeConfig = {
  primary: '#3B82F6',
  primaryHover: '#60A5FA',
  background: '#0F172A',
  surface: '#1E293B',
  surfaceHover: '#334155',
  foreground: '#F8FAFC',
  muted: '#94A3B8',
  border: '#334155',
  accent: '#3B82F6',
  accentHover: '#60A5FA',
};

export const MONACO_THEME: ThemeConfig = {
  primary: '#D4AF37',
  primaryHover: '#F3C649',
  background: '#0F0E0C',
  surface: '#181614',
  surfaceHover: '#24211D',
  foreground: '#F5F4F0',
  muted: '#A19D94',
  border: '#2E2A24',
  accent: '#D4AF37',
  accentHover: '#F3C649',
};

export function themeConfigToCSSVars(theme: ThemeConfig): Record<string, string> {
  return {
    '--theme-primary': theme.primary,
    '--theme-primary-hover': theme.primaryHover,
    '--theme-background': theme.background,
    '--theme-surface': theme.surface,
    '--theme-surface-hover': theme.surfaceHover,
    '--theme-foreground': theme.foreground,
    '--theme-muted': theme.muted,
    '--theme-border': theme.border,
    '--theme-accent': theme.accent,
    '--theme-accent-hover': theme.accentHover,
    '--theme-card-bg': theme.cardBg || theme.surface,
    '--theme-card-text': theme.cardText || theme.foreground,
    '--theme-card-muted': theme.cardMuted || theme.muted,
  };
}
```

---
## 16. DESIGN SYSTEM & BRAND IDENTITY FOUNDATIONS

Portiva's visual language synthesizes key design principles from Apple, Vercel, Linear, and Framer.

---

## 17. VISUAL HIERARCHY & COMPOSITION RULES

5-tier importance scale: Primary Identity -> Primary Action -> Secondary Action -> Supporting Content -> Metadata.

---

## 18. TYPOGRAPHY SYSTEMS & SCALE PAIRINGS

Pair high-contrast editorial display serifs with minimal modern sans-serifs for luxury/beauty templates.

---

## 19. COLOR SYSTEMS & CURATED NICHE PALETTES

Industries feature tailored color palettes (Stone/Gold for Real Estate, Obsidian/Blue for Automotive, Cream/Espresso for Cafe).

---

## 20. SURFACE DESIGN, ELEVATIONS & MATERIALS

Use tactile material surfaces (`bg-theme-surface border border-theme-border`) rather than heavy drop shadows.

---

## 21. BENTO DESIGN SYSTEM & GRID PRINCIPLES

Modular visual grids inspired by Japanese bento boxes, unifying media, text, actions, and stats into rectangular tiles.

---

## 22. BENTO GRID LAYOUT DETERMINISM & RESPONSIVE RULES

Desktop multi-column grids re-compose deterministically into single-column mobile layouts without horizontal overflow.

---

## 23. BENTO CARD CLASSIFICATION & FUNCTIONAL TAXONOMY

Taxonomy of 15 card types: Profile, Social, Media, WhatsApp Catalog, Feature Stat, Newsletter CTA, Location Map, etc.

---
## 24. BENTOBIO FLAGSHIP TEMPLATE ARCHITECTURE

### 24.1 Default Configuration Source Contract (`src/components/templates/BentoBio.tsx`)
```typescript
export interface BentoBioBox {
  id: string;
  type: 'profile' | 'social' | 'media' | 'cta' | 'stat' | 'whatsapp' | 'custom';
  title?: string;
  subtitle?: string;
  url?: string;
  imageUrl?: string;
  icon?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  bgColor?: string;
  textColor?: string;
  visible?: boolean;
}

export interface BentoBioConfig {
  boxes: BentoBioBox[];
  layoutVariant: 'compact' | 'expanded' | 'editorial';
  showAvatar: boolean;
  avatarUrl: string;
  profileName: string;
  profileBio: string;
  verified: boolean;
}

export const DEFAULT_BENTO_BOXES: BentoBioBox[] = [
  {
    id: 'profile-header',
    type: 'profile',
    colSpan: 2,
    rowSpan: 1,
    visible: true,
  },
  {
    id: 'instagram-card',
    type: 'social',
    title: 'Instagram',
    subtitle: '@falah.design',
    url: 'https://instagram.com',
    icon: 'instagram',
    colSpan: 1,
    rowSpan: 1,
    visible: true,
  },
  {
    id: 'whatsapp-catalog-card',
    type: 'whatsapp',
    title: 'Browse Catalog',
    subtitle: 'Order directly via WhatsApp',
    url: 'https://wa.me/919876543210',
    icon: 'whatsapp',
    colSpan: 3,
    rowSpan: 1,
    visible: true,
  },
  {
    id: 'portfolio-media-card',
    type: 'media',
    title: 'Featured Shot',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe',
    colSpan: 2,
    rowSpan: 2,
    visible: true,
  },
];

export const DEFAULT_BENTO_CONFIG: BentoBioConfig = {
  boxes: DEFAULT_BENTO_BOXES,
  layoutVariant: 'compact',
  showAvatar: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  profileName: 'Muhammed Falah',
  profileBio: 'Product Designer & Micro-Website Engineer',
  verified: true,
};
```

---
## 25. BENTOBIO PROFILE CARD SPECIFICATION
Avatar images (80x80px to 112x112px), verified checkmarks, and editable bio subtitles.

---

## 26. BENTOBIO SOCIAL LINKS SPECIFICATION
Social platform icon mapping, accessible `aria-label` attributes, and external target opening (`_blank`).

---

## 27. BENTOBIO MEDIA CARDS SPECIFICATION
Client-compressed WebP image thumbnails with `object-cover` scaling and editable alt text.

---

## 28. BENTOBIO WIDGET SYSTEM & CARD MANAGEMENT
Card creation (`id: bento-card-${Date.now()}`), non-destructive deletion, and visibility toggling.

---

## 29. BENTOBIO CUSTOMIZER ARCHITECTURE & UX
Canva-style discoverability panel (`BentoCustomizer.tsx`) with real-time live preview state binding.

---

## 30. INSPECTOR SIDEBAR INFORMATION ARCHITECTURE
Tabbed panel structure (`InspectorSidebar.tsx`): Theme, Content/Cards, Style Overrides, Settings.

---

## 31. CONTEXTUAL INSPECTOR & SELECTION MODEL
Intercept canvas clicks to set `selectedElement` and render a 2px blue selection focus ring (`ring-2 ring-blue-500/80`).

---

## 32. EDITING MODE VS VIEWING MODE SEPARATION
`EditModeContext` manages `mode: 'EDITING' | 'VIEWING'`. Intercept navigation in editing mode; enable in viewing mode.

---

## 33. ANIMATION SYSTEM & FRAMER MOTION GUIDELINES
Animate only `opacity` and `transform` (`scale`, `x`, `y`). Never animate layout properties (`width`, `height`, `margin`).

---

## 34. MOTION SAFETY & REDUCED MOTION SUPPORT
Respect OS reduced motion preferences via `useReducedMotion()`. Freeze continuous marquees in editing mode.

---

## 35. ACCESSIBILITY (A11Y) & SEMANTIC HTML MANDATE
Satisfy WCAG 2.1 AA: semantic HTML tags (`<main>`, `<header>`, `<nav>`, `<article>`, `<button>`, `<a>`), visible keyboard focus rings.

---

## 36. RESPONSIVE DESIGN & MULTI-VIEWPORT RULES
Verify 6 viewports (320px to 1440px+). Enforce `max-w-full overflow-x-hidden` for zero horizontal scroll.

---

## 37. DESIGNING FOR USER-GENERATED CONTENT (UGC) RESILIENCE
Apply defensive CSS (`break-words min-w-0 line-clamp-2`) and provide safe image fallbacks against un-curated user content.

---
## 38. MEDIA PIPELINE & ASSET COMPRESSION ARCHITECTURE

### 38.1 Client-Side WebP Compression Source (`src/utils/AssetPipeline.ts`)
```typescript
export async function compressImageToWebP(file: File, maxWidth = 1080, quality = 0.82): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Failed to get canvas 2d context'));

        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('WebP compression failed'));
          },
          'image/webp',
          quality
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
```

### 38.2 Edge Upload Route Proxy Source (`src/app/api/upload/route.ts`)
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || '',
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = `uploads/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: 'portiva-assets',
        Key: fileKey,
        Body: buffer,
        ContentType: file.type || 'image/webp',
      })
    );

    const publicUrl = `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${fileKey}`;
    return NextResponse.json({ url: publicUrl, key: fileKey });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
```

---
## 39. PERFORMANCE BUDGET & RUNTIME OPTIMIZATION
Atomic Zustand store selectors, React component memoization, lazy image loading (`loading="lazy"`).

---

## 40. SEO, SOCIAL SHARING & OPEN GRAPH INFRASTRUCTURE
Dynamic OpenGraph metadata generation (`generateMetadata()`) on SSR profile routes (`src/app/[username]/page.tsx`).

---

## 41. SECURITY, CONTENT MODERATION & COMPLIANCE TRIGGERS
Automated PostgreSQL triggers (`check_content_compliance`) scan user content and flag `is_moderated = true`.

---

## 42. PLATFORM GOVERNANCE, AMANAH & ETHICAL PRODUCT ENGINEERING
Trust as a technical requirement: zero dark patterns, transparent UI hierarchy, no deceptive opt-outs.

---

## 43. FINANCIAL TRANSPARENCY & MICRO-SUBSCRIPTION MECHANICS
UPI auto-debit billing sends WhatsApp alerts 72 hours prior to pre-debit renewal.

---
## 44. DATABASE ARCHITECTURE (SUPABASE / POSTGRESQL) & RLS POLICIES

### 44.1 Complete Security & Migration Script (`supabase/migrations/`)
```sql
-- Migration 000: Schema & Enum Definitions
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'business');
CREATE TYPE block_type_enum AS ENUM ('link', 'image', 'whatsapp_catalog');
CREATE TYPE inventory_status_enum AS ENUM ('available', 'sold', 'reserved');

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  website TEXT,
  theme_config JSONB DEFAULT '{}'::jsonb,
  subscription_tier subscription_tier DEFAULT 'free',
  is_moderated BOOLEAN DEFAULT FALSE
);

CREATE TABLE bento_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  block_type block_type_enum NOT NULL,
  content JSONB DEFAULT '{}'::jsonb NOT NULL,
  grid_position JSONB DEFAULT '{"x":0,"y":0,"w":1,"h":1}'::jsonb NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE dealership_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INT NOT NULL,
  price NUMERIC NOT NULL,
  status inventory_status_enum DEFAULT 'available' NOT NULL,
  images TEXT[] DEFAULT '{}' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RLS Enforcement Policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bento_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE dealership_inventory ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles viewable unless moderated"
ON profiles FOR SELECT USING (is_moderated = FALSE);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Public bento blocks viewable"
ON bento_blocks FOR SELECT USING (TRUE);

CREATE POLICY "Users manage own bento blocks"
ON bento_blocks FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Public dealership inventory viewable"
ON dealership_inventory FOR SELECT USING (TRUE);

CREATE POLICY "Users manage own dealership inventory"
ON dealership_inventory FOR ALL USING (auth.uid() = user_id);
```

---
## 45. OBJECT STORAGE ARCHITECTURE (CLOUDFLARE R2) & S3 PROXYING
Zero-egress asset storage in Cloudflare R2 bucket `portiva-assets` via S3 SDK proxy `/api/upload/route.ts`.

---

## 46. NEXT.JS APP ROUTER ARCHITECTURE & SERVER/CLIENT BOUNDARIES
Default to Server Components; use `'use client'` only when React hooks, events, or state stores are required.

---

## 47. TYPESCRIPT STANDARDS, STRICT TYPING & SCHEMA DEFINITIONS
Strict mode: zero `any` policy, manual `npx tsc --noEmit` validation, hand-maintained database types.

---

## 48. TAILWIND CSS V4 SYSTEM & CUSTOM PROPERTY TOKENS
Tailwind v4 `@theme inline` block mapping semantic classes (`bg-bg-primary`) to CSS variables (`--theme-background`).

---

## 49. TESTING STRATEGY, VERIFICATION COMMANDS & QUALITY ASSURANCE
Validation pipeline: `npx tsc --noEmit` -> `npm run lint` -> `npm run build` -> runtime route inspection.

---

## 50. COMPREHENSIVE PRE-FLIGHT CHECKLIST
Audit checklist covering architecture, 100% visual editability, semantic HTML, mobile overflow, and type safety.

---

## 51. DEBUGGING WORKFLOWS, ERROR CLASSIFICATION & DIAGNOSTIC TREES
Diagnostic decision trees for Next.js HMR compilation freezes, hydration mismatches, and RLS permission failures.

---

## 52. FAILURE RECOVERY PROTOCOLS & EMERGENCY REVERSION
Circuit-breaker reversion sequence: stop editing broken code, revert via git, and re-implement incrementally.

---

## 53. GIT DISCIPLINE, COMMIT HYGIENE & SCOPE ISOLATION
Atomic commit discipline, semantic messages (`feat(template): ...`), and prohibition of multi-scope refactor collapses.

---

## 54. DEPENDENCY HYGIENE & PACKAGE MANAGEMENT RULES
Zero unnecessary dependencies: evaluate bundle impact before adding npm packages.

---

## 55. CODEBASE INSPECTION & PRE-TASK RESEARCH PROTOCOL
Source-of-truth code inspection using `view_file` and `grep_search` before making architectural assumptions.

---

## 56. AGENT BEHAVIOR, HONESTY & NON-FABRICATION MANDATE
Absolute veracity: never report code tested or build passed without executing actual shell validation commands.

---

## 57. TASK EXECUTION WORKFLOW (10-PHASE PIPELINE)
Phase 1 Inspect -> Phase 2 Understand -> Phase 3 Baseline -> Phase 4 Plan -> Phase 5 Implement -> Phase 6 Integrate -> Phase 7 Validate -> Phase 8 Runtime Test -> Phase 9 Regression Test -> Phase 10 Review.

---

## 58. COMPLETION PROTOCOL & SUMMARY FORMAT
Structured completion output format: Changed, Preserved, Validation, Remaining Issues.

---

## 59. MASTER VERIFICATION CHECKLISTS
Comprehensive domain checklists for Architectural Health, Visual Builder Contract, Visual Polish, and Infrastructure.

---
## 60. THE MASTER DIRECTIVES (260 CONCRETE OPERATING LAWS)

This section enumerates the 260 non-negotiable master operating directives for all AI coding, design, and architecture agents working within the Portiva codebase.

### 60.1 Master Directive #1: Inspect Before Modifying

Every AI coding and design agent working on Portiva must strictly obey **Directive #1** (Inspect Before Modifying).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.2 Master Directive #2: Obey Unidirectional Hierarchy

Every AI coding and design agent working on Portiva must strictly obey **Directive #2** (Obey Unidirectional Hierarchy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.3 Master Directive #3: No Engine-to-Template Imports

Every AI coding and design agent working on Portiva must strictly obey **Directive #3** (No Engine-to-Template Imports).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.4 Master Directive #4: No Engine-to-App Imports

Every AI coding and design agent working on Portiva must strictly obey **Directive #4** (No Engine-to-App Imports).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.5 Master Directive #5: No Template Cross-Imports

Every AI coding and design agent working on Portiva must strictly obey **Directive #5** (No Template Cross-Imports).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.6 Master Directive #6: No Upward Lib Imports

Every AI coding and design agent working on Portiva must strictly obey **Directive #6** (No Upward Lib Imports).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.7 Master Directive #7: Prevent Circular Barrel References

Every AI coding and design agent working on Portiva must strictly obey **Directive #7** (Prevent Circular Barrel References).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.8 Master Directive #8: Audit Freezes Immediately

Every AI coding and design agent working on Portiva must strictly obey **Directive #8** (Audit Freezes Immediately).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.9 Master Directive #9: 100% Visual Editability Mandatory

Every AI coding and design agent working on Portiva must strictly obey **Directive #9** (100% Visual Editability Mandatory).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.10 Master Directive #10: Zero Hardcoded User Copy

Every AI coding and design agent working on Portiva must strictly obey **Directive #10** (Zero Hardcoded User Copy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.11 Master Directive #11: Zero Hardcoded Colors in JSX

Every AI coding and design agent working on Portiva must strictly obey **Directive #11** (Zero Hardcoded Colors in JSX).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.12 Master Directive #12: Preserve Unrelated Templates

Every AI coding and design agent working on Portiva must strictly obey **Directive #12** (Preserve Unrelated Templates).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.13 Master Directive #13: Semantic HTML5 Tagging

Every AI coding and design agent working on Portiva must strictly obey **Directive #13** (Semantic HTML5 Tagging).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.14 Master Directive #14: Deterministic Element IDs

Every AI coding and design agent working on Portiva must strictly obey **Directive #14** (Deterministic Element IDs).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.15 Master Directive #15: Client-Side Image Compression

Every AI coding and design agent working on Portiva must strictly obey **Directive #15** (Client-Side Image Compression).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.16 Master Directive #16: Edge Media Storage via R2

Every AI coding and design agent working on Portiva must strictly obey **Directive #16** (Edge Media Storage via R2).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.17 Master Directive #17: Hand-Maintained DB Types

Every AI coding and design agent working on Portiva must strictly obey **Directive #17** (Hand-Maintained DB Types).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.18 Master Directive #18: Manual Typecheck Execution

Every AI coding and design agent working on Portiva must strictly obey **Directive #18** (Manual Typecheck Execution).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.19 Master Directive #19: Mobile-First Bio Profiles

Every AI coding and design agent working on Portiva must strictly obey **Directive #19** (Mobile-First Bio Profiles).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.20 Master Directive #20: Defensive UGC Container Bounds

Every AI coding and design agent working on Portiva must strictly obey **Directive #20** (Defensive UGC Container Bounds).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.21 Master Directive #21: Tactile Surface Elevations

Every AI coding and design agent working on Portiva must strictly obey **Directive #21** (Tactile Surface Elevations).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.22 Master Directive #22: Hardware Motion Acceleration

Every AI coding and design agent working on Portiva must strictly obey **Directive #22** (Hardware Motion Acceleration).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.23 Master Directive #23: Reduced Motion Compliance

Every AI coding and design agent working on Portiva must strictly obey **Directive #23** (Reduced Motion Compliance).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.24 Master Directive #24: Dual Interactivity Modes

Every AI coding and design agent working on Portiva must strictly obey **Directive #24** (Dual Interactivity Modes).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.25 Master Directive #25: Canva-Level Inspector Labels

Every AI coding and design agent working on Portiva must strictly obey **Directive #25** (Canva-Level Inspector Labels).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.26 Master Directive #26: Non-Destructive Selection Outlines

Every AI coding and design agent working on Portiva must strictly obey **Directive #26** (Non-Destructive Selection Outlines).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.27 Master Directive #27: Amanah Ethical Governance

Every AI coding and design agent working on Portiva must strictly obey **Directive #27** (Amanah Ethical Governance).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.28 Master Directive #28: 72-Hour Pre-Debit Financial Alerts

Every AI coding and design agent working on Portiva must strictly obey **Directive #28** (72-Hour Pre-Debit Financial Alerts).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.29 Master Directive #29: Automated Content Sanity

Every AI coding and design agent working on Portiva must strictly obey **Directive #29** (Automated Content Sanity).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.30 Master Directive #30: Single-Page Landing Architecture

Every AI coding and design agent working on Portiva must strictly obey **Directive #30** (Single-Page Landing Architecture).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.31 Master Directive #31: Tailwind CSS v4 Inline Config

Every AI coding and design agent working on Portiva must strictly obey **Directive #31** (Tailwind CSS v4 Inline Config).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.32 Master Directive #32: Atomic Zustand Selectors

Every AI coding and design agent working on Portiva must strictly obey **Directive #32** (Atomic Zustand Selectors).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.33 Master Directive #33: Dynamic OpenGraph Metadata

Every AI coding and design agent working on Portiva must strictly obey **Directive #33** (Dynamic OpenGraph Metadata).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.34 Master Directive #34: Absolute Veracity in Reporting

Every AI coding and design agent working on Portiva must strictly obey **Directive #34** (Absolute Veracity in Reporting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.35 Master Directive #35: Smallest Safe Modification

Every AI coding and design agent working on Portiva must strictly obey **Directive #35** (Smallest Safe Modification).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.36 Master Directive #36: No Premature Abstractions

Every AI coding and design agent working on Portiva must strictly obey **Directive #36** (No Premature Abstractions).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.37 Master Directive #37: Single Heading 1 Rule

Every AI coding and design agent working on Portiva must strictly obey **Directive #37** (Single Heading 1 Rule).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.38 Master Directive #38: Accessible Keyboard Focus

Every AI coding and design agent working on Portiva must strictly obey **Directive #38** (Accessible Keyboard Focus).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.39 Master Directive #39: Accessible Icon Button Labels

Every AI coding and design agent working on Portiva must strictly obey **Directive #39** (Accessible Icon Button Labels).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.40 Master Directive #40: WCAG AA Contrast Ratios

Every AI coding and design agent working on Portiva must strictly obey **Directive #40** (WCAG AA Contrast Ratios).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.41 Master Directive #41: No Absolute Fixed Pixel Offsets

Every AI coding and design agent working on Portiva must strictly obey **Directive #41** (No Absolute Fixed Pixel Offsets).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.42 Master Directive #42: No Inline Styling Overrides Without Props

Every AI coding and design agent working on Portiva must strictly obey **Directive #42** (No Inline Styling Overrides Without Props).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.43 Master Directive #43: Preserve Comments & JSDoc

Every AI coding and design agent working on Portiva must strictly obey **Directive #43** (Preserve Comments & JSDoc).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.44 Master Directive #44: No Empty Catch Blocks

Every AI coding and design agent working on Portiva must strictly obey **Directive #44** (No Empty Catch Blocks).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.45 Master Directive #45: Explicit Null Checks

Every AI coding and design agent working on Portiva must strictly obey **Directive #45** (Explicit Null Checks).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.46 Master Directive #46: Lazy Image Loading

Every AI coding and design agent working on Portiva must strictly obey **Directive #46** (Lazy Image Loading).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.47 Master Directive #47: Eager Hero Image Loading

Every AI coding and design agent working on Portiva must strictly obey **Directive #47** (Eager Hero Image Loading).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.48 Master Directive #48: No Monotonous SaaS Gradients

Every AI coding and design agent working on Portiva must strictly obey **Directive #48** (No Monotonous SaaS Gradients).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.49 Master Directive #49: Curated Niche Color Systems

Every AI coding and design agent working on Portiva must strictly obey **Directive #49** (Curated Niche Color Systems).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.50 Master Directive #50: Editorial Typography Pairing

Every AI coding and design agent working on Portiva must strictly obey **Directive #50** (Editorial Typography Pairing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.51 Master Directive #51: Bounded Display Line-Height

Every AI coding and design agent working on Portiva must strictly obey **Directive #51** (Bounded Display Line-Height).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.52 Master Directive #52: Bounded Paragraph Line-Height

Every AI coding and design agent working on Portiva must strictly obey **Directive #52** (Bounded Paragraph Line-Height).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.53 Master Directive #53: Optimal Reading Width

Every AI coding and design agent working on Portiva must strictly obey **Directive #53** (Optimal Reading Width).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.54 Master Directive #54: Zero Horizontal Page Overflow

Every AI coding and design agent working on Portiva must strictly obey **Directive #54** (Zero Horizontal Page Overflow).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.55 Master Directive #55: Minimum Touch Target Size

Every AI coding and design agent working on Portiva must strictly obey **Directive #55** (Minimum Touch Target Size).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.56 Master Directive #56: No Arbitrary Absolute Positioning

Every AI coding and design agent working on Portiva must strictly obey **Directive #56** (No Arbitrary Absolute Positioning).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.57 Master Directive #57: Deterministic Bento Slotting

Every AI coding and design agent working on Portiva must strictly obey **Directive #57** (Deterministic Bento Slotting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.58 Master Directive #58: Profile Avatar Framing

Every AI coding and design agent working on Portiva must strictly obey **Directive #58** (Profile Avatar Framing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.59 Master Directive #59: Social Link External Targets

Every AI coding and design agent working on Portiva must strictly obey **Directive #59** (Social Link External Targets).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.60 Master Directive #60: WhatsApp Pre-Filled Message Encoding

Every AI coding and design agent working on Portiva must strictly obey **Directive #60** (WhatsApp Pre-Filled Message Encoding).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.61 Master Directive #61: No Hardcoded Business Phone Numbers

Every AI coding and design agent working on Portiva must strictly obey **Directive #61** (No Hardcoded Business Phone Numbers).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.62 Master Directive #62: Universal Content Defaults

Every AI coding and design agent working on Portiva must strictly obey **Directive #62** (Universal Content Defaults).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.63 Master Directive #63: Safe Empty State Layouts

Every AI coding and design agent working on Portiva must strictly obey **Directive #63** (Safe Empty State Layouts).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.64 Master Directive #64: Stable Card ID Generation

Every AI coding and design agent working on Portiva must strictly obey **Directive #64** (Stable Card ID Generation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.65 Master Directive #65: Non-Destructive Card Deletion

Every AI coding and design agent working on Portiva must strictly obey **Directive #65** (Non-Destructive Card Deletion).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.66 Master Directive #66: Visibility Flag Preservation

Every AI coding and design agent working on Portiva must strictly obey **Directive #66** (Visibility Flag Preservation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.67 Master Directive #67: Inspector Section Grouping

Every AI coding and design agent working on Portiva must strictly obey **Directive #67** (Inspector Section Grouping).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.68 Master Directive #68: Contextual Control Switching

Every AI coding and design agent working on Portiva must strictly obey **Directive #68** (Contextual Control Switching).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.69 Master Directive #69: Freeze Continuous Motion in Editing

Every AI coding and design agent working on Portiva must strictly obey **Directive #69** (Freeze Continuous Motion in Editing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.70 Master Directive #70: No Layout Reflow Motion Properties

Every AI coding and design agent working on Portiva must strictly obey **Directive #70** (No Layout Reflow Motion Properties).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.71 Master Directive #71: Alt Text Editing Support

Every AI coding and design agent working on Portiva must strictly obey **Directive #71** (Alt Text Editing Support).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.72 Master Directive #72: Open In New Tab Toggle

Every AI coding and design agent working on Portiva must strictly obey **Directive #72** (Open In New Tab Toggle).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.73 Master Directive #73: Button Hover Color Override

Every AI coding and design agent working on Portiva must strictly obey **Directive #73** (Button Hover Color Override).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.74 Master Directive #74: Global Theme Custom Property Conversion

Every AI coding and design agent working on Portiva must strictly obey **Directive #74** (Global Theme Custom Property Conversion).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.75 Master Directive #75: Automatic CSS Variable Repainting

Every AI coding and design agent working on Portiva must strictly obey **Directive #75** (Automatic CSS Variable Repainting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.76 Master Directive #76: Per-Element Style Overrides Hierarchy

Every AI coding and design agent working on Portiva must strictly obey **Directive #76** (Per-Element Style Overrides Hierarchy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.77 Master Directive #77: Individual Overrides Integrity

Every AI coding and design agent working on Portiva must strictly obey **Directive #77** (Individual Overrides Integrity).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.78 Master Directive #78: Restrained Backdrop Blur

Every AI coding and design agent working on Portiva must strictly obey **Directive #78** (Restrained Backdrop Blur).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.79 Master Directive #79: No Heavy Dropshadows

Every AI coding and design agent working on Portiva must strictly obey **Directive #79** (No Heavy Dropshadows).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.80 Master Directive #80: Curated Theme Presets

Every AI coding and design agent working on Portiva must strictly obey **Directive #80** (Curated Theme Presets).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.81 Master Directive #81: Tonal Surface Variation

Every AI coding and design agent working on Portiva must strictly obey **Directive #81** (Tonal Surface Variation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.82 Master Directive #82: Contrast Ratio Validation

Every AI coding and design agent working on Portiva must strictly obey **Directive #82** (Contrast Ratio Validation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.83 Master Directive #83: History Stack History Entry

Every AI coding and design agent working on Portiva must strictly obey **Directive #83** (History Stack History Entry).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.84 Master Directive #84: Debounced Network Autosave

Every AI coding and design agent working on Portiva must strictly obey **Directive #84** (Debounced Network Autosave).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.85 Master Directive #85: Local Canvas State Updates

Every AI coding and design agent working on Portiva must strictly obey **Directive #85** (Local Canvas State Updates).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.86 Master Directive #86: Prevent Hydration Mismatches

Every AI coding and design agent working on Portiva must strictly obey **Directive #86** (Prevent Hydration Mismatches).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.87 Master Directive #87: Server Component Defaulting

Every AI coding and design agent working on Portiva must strictly obey **Directive #87** (Server Component Defaulting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.88 Master Directive #88: SWR Profile Caching Headers

Every AI coding and design agent working on Portiva must strictly obey **Directive #88** (SWR Profile Caching Headers).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.89 Master Directive #89: Supabase Service Client Isolation

Every AI coding and design agent working on Portiva must strictly obey **Directive #89** (Supabase Service Client Isolation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.90 Master Directive #90: Supabase Server Client Auth

Every AI coding and design agent working on Portiva must strictly obey **Directive #90** (Supabase Server Client Auth).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.91 Master Directive #91: Supabase Browser Client Singleton

Every AI coding and design agent working on Portiva must strictly obey **Directive #91** (Supabase Browser Client Singleton).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.92 Master Directive #92: No Privileged Keys in Client Code

Every AI coding and design agent working on Portiva must strictly obey **Directive #92** (No Privileged Keys in Client Code).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.93 Master Directive #93: Sanitize Untrusted URL Destinations

Every AI coding and design agent working on Portiva must strictly obey **Directive #93** (Sanitize Untrusted URL Destinations).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.94 Master Directive #94: Escape Untrusted HTML Input

Every AI coding and design agent working on Portiva must strictly obey **Directive #94** (Escape Untrusted HTML Input).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.95 Master Directive #95: No Secret Leaks in Commit History

Every AI coding and design agent working on Portiva must strictly obey **Directive #95** (No Secret Leaks in Commit History).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.96 Master Directive #96: Respect User Data Privacy

Every AI coding and design agent working on Portiva must strictly obey **Directive #96** (Respect User Data Privacy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.97 Master Directive #97: Separate Draft & Published State

Every AI coding and design agent working on Portiva must strictly obey **Directive #97** (Separate Draft & Published State).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.98 Master Directive #98: Safe Default Placeholder Images

Every AI coding and design agent working on Portiva must strictly obey **Directive #98** (Safe Default Placeholder Images).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.99 Master Directive #99: Concise Action-Oriented Copy

Every AI coding and design agent working on Portiva must strictly obey **Directive #99** (Concise Action-Oriented Copy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.100 Master Directive #100: Useful Empty Customizer Panel

Every AI coding and design agent working on Portiva must strictly obey **Directive #100** (Useful Empty Customizer Panel).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.101 Master Directive #101: Progressive Control Disclosure

Every AI coding and design agent working on Portiva must strictly obey **Directive #101** (Progressive Control Disclosure).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.102 Master Directive #102: Tactile Button Micro-Interactions

Every AI coding and design agent working on Portiva must strictly obey **Directive #102** (Tactile Button Micro-Interactions).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.103 Master Directive #103: Visible Keyboard Focus Rings

Every AI coding and design agent working on Portiva must strictly obey **Directive #103** (Visible Keyboard Focus Rings).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.104 Master Directive #104: No Competing Accent Colors

Every AI coding and design agent working on Portiva must strictly obey **Directive #104** (No Competing Accent Colors).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.105 Master Directive #105: Standardized Border Radius Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #105** (Standardized Border Radius Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.106 Master Directive #106: Restrained Surface Gradients

Every AI coding and design agent working on Portiva must strictly obey **Directive #106** (Restrained Surface Gradients).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.107 Master Directive #107: Balanced Editorial Layouts

Every AI coding and design agent working on Portiva must strictly obey **Directive #107** (Balanced Editorial Layouts).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.108 Master Directive #108: Proportional CTA Sizing

Every AI coding and design agent working on Portiva must strictly obey **Directive #108** (Proportional CTA Sizing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.109 Master Directive #109: Multi-Viewport Responsive Verification

Every AI coding and design agent working on Portiva must strictly obey **Directive #109** (Multi-Viewport Responsive Verification).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.110 Master Directive #110: Zero Layout Thrashing

Every AI coding and design agent working on Portiva must strictly obey **Directive #110** (Zero Layout Thrashing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.111 Master Directive #111: GPU Container Promotion

Every AI coding and design agent working on Portiva must strictly obey **Directive #111** (GPU Container Promotion).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.112 Master Directive #112: Structured Narrative Flow

Every AI coding and design agent working on Portiva must strictly obey **Directive #112** (Structured Narrative Flow).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.113 Master Directive #113: Numbered Editorial Catalogs

Every AI coding and design agent working on Portiva must strictly obey **Directive #113** (Numbered Editorial Catalogs).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.114 Master Directive #114: Asymmetrical Photo Galleries

Every AI coding and design agent working on Portiva must strictly obey **Directive #114** (Asymmetrical Photo Galleries).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.115 Master Directive #115: Interactive Transformation Sliders

Every AI coding and design agent working on Portiva must strictly obey **Directive #115** (Interactive Transformation Sliders).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.116 Master Directive #116: Capped Lookbook Showcases

Every AI coding and design agent working on Portiva must strictly obey **Directive #116** (Capped Lookbook Showcases).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.117 Master Directive #117: Refrained Statistical Metrics

Every AI coding and design agent working on Portiva must strictly obey **Directive #117** (Refrained Statistical Metrics).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.118 Master Directive #118: High-Contrast Final Closures

Every AI coding and design agent working on Portiva must strictly obey **Directive #118** (High-Contrast Final Closures).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.119 Master Directive #119: Clean Minimal Footers

Every AI coding and design agent working on Portiva must strictly obey **Directive #119** (Clean Minimal Footers).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.120 Master Directive #120: No Multi-Page Navigation Links

Every AI coding and design agent working on Portiva must strictly obey **Directive #120** (No Multi-Page Navigation Links).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.121 Master Directive #121: Scroll-Triggered Navigation Compression

Every AI coding and design agent working on Portiva must strictly obey **Directive #121** (Scroll-Triggered Navigation Compression).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.122 Master Directive #122: Active Scroll Section Tracking

Every AI coding and design agent working on Portiva must strictly obey **Directive #122** (Active Scroll Section Tracking).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.123 Master Directive #123: Dark Mode Defaulting

Every AI coding and design agent working on Portiva must strictly obey **Directive #123** (Dark Mode Defaulting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.124 Master Directive #124: Warm Cream Light Mode Defaulting

Every AI coding and design agent working on Portiva must strictly obey **Directive #124** (Warm Cream Light Mode Defaulting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.125 Master Directive #125: Cinematic Mask Entrance Reveals

Every AI coding and design agent working on Portiva must strictly obey **Directive #125** (Cinematic Mask Entrance Reveals).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.126 Master Directive #126: Whitespace Breathing Pauses

Every AI coding and design agent working on Portiva must strictly obey **Directive #126** (Whitespace Breathing Pauses).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.127 Master Directive #127: Overlapping Magazine Layout Compositions

Every AI coding and design agent working on Portiva must strictly obey **Directive #127** (Overlapping Magazine Layout Compositions).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.128 Master Directive #128: Horizontal Card Scroll Snap

Every AI coding and design agent working on Portiva must strictly obey **Directive #128** (Horizontal Card Scroll Snap).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.129 Master Directive #129: WhatsApp Order Catalog Integration

Every AI coding and design agent working on Portiva must strictly obey **Directive #129** (WhatsApp Order Catalog Integration).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.130 Master Directive #130: No Broad Barrel Imports

Every AI coding and design agent working on Portiva must strictly obey **Directive #130** (No Broad Barrel Imports).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.131 Master Directive #131: Strict Engine Index Barrel Limits

Every AI coding and design agent working on Portiva must strictly obey **Directive #131** (Strict Engine Index Barrel Limits).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.132 Master Directive #132: No Relative Barrel Imports Inside Engine

Every AI coding and design agent working on Portiva must strictly obey **Directive #132** (No Relative Barrel Imports Inside Engine).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.133 Master Directive #133: Modular Sub-Component Organization

Every AI coding and design agent working on Portiva must strictly obey **Directive #133** (Modular Sub-Component Organization).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.134 Master Directive #134: Export Default Template Props

Every AI coding and design agent working on Portiva must strictly obey **Directive #134** (Export Default Template Props).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.135 Master Directive #135: SSR & Canvas Dual Compatibility

Every AI coding and design agent working on Portiva must strictly obey **Directive #135** (SSR & Canvas Dual Compatibility).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.136 Master Directive #136: Pre-Flight Shared Component Audits

Every AI coding and design agent working on Portiva must strictly obey **Directive #136** (Pre-Flight Shared Component Audits).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.137 Master Directive #137: Make New Shared Props Optional

Every AI coding and design agent working on Portiva must strictly obey **Directive #137** (Make New Shared Props Optional).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.138 Master Directive #138: Provide Default Fallbacks in Shared Components

Every AI coding and design agent working on Portiva must strictly obey **Directive #138** (Provide Default Fallbacks in Shared Components).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.139 Master Directive #139: Run Typecheck After Shared Edits

Every AI coding and design agent working on Portiva must strictly obey **Directive #139** (Run Typecheck After Shared Edits).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.140 Master Directive #140: No Unrelated Template Editing

Every AI coding and design agent working on Portiva must strictly obey **Directive #140** (No Unrelated Template Editing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.141 Master Directive #141: No Dashboard Route Editing Unless Scope

Every AI coding and design agent working on Portiva must strictly obey **Directive #141** (No Dashboard Route Editing Unless Scope).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.142 Master Directive #142: Total Text Editing Coverage

Every AI coding and design agent working on Portiva must strictly obey **Directive #142** (Total Text Editing Coverage).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.143 Master Directive #143: Total Color Editing Coverage

Every AI coding and design agent working on Portiva must strictly obey **Directive #143** (Total Color Editing Coverage).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.144 Master Directive #144: Total Media Editing Coverage

Every AI coding and design agent working on Portiva must strictly obey **Directive #144** (Total Media Editing Coverage).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.145 Master Directive #145: Total Button Editing Coverage

Every AI coding and design agent working on Portiva must strictly obey **Directive #145** (Total Button Editing Coverage).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.146 Master Directive #146: Total Component Style Editing Coverage

Every AI coding and design agent working on Portiva must strictly obey **Directive #146** (Total Component Style Editing Coverage).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.147 Master Directive #147: Total Theme Control Coverage

Every AI coding and design agent working on Portiva must strictly obey **Directive #147** (Total Theme Control Coverage).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.148 Master Directive #148: No Hardcoded Color Hex Strings

Every AI coding and design agent working on Portiva must strictly obey **Directive #148** (No Hardcoded Color Hex Strings).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.149 Master Directive #149: Readable Element Key Formatting

Every AI coding and design agent working on Portiva must strictly obey **Directive #149** (Readable Element Key Formatting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.150 Master Directive #150: No Random Element Keys

Every AI coding and design agent working on Portiva must strictly obey **Directive #150** (No Random Element Keys).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.151 Master Directive #151: Stable Entity Keys

Every AI coding and design agent working on Portiva must strictly obey **Directive #151** (Stable Entity Keys).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.152 Master Directive #152: Dynamic Tailwind Custom Property Classes

Every AI coding and design agent working on Portiva must strictly obey **Directive #152** (Dynamic Tailwind Custom Property Classes).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.153 Master Directive #153: Inline Custom Property Ingestion

Every AI coding and design agent working on Portiva must strictly obey **Directive #153** (Inline Custom Property Ingestion).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.154 Master Directive #154: 5-Layer Style Cascade Resolution

Every AI coding and design agent working on Portiva must strictly obey **Directive #154** (5-Layer Style Cascade Resolution).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.155 Master Directive #155: ThemeConfig Interface Accuracy

Every AI coding and design agent working on Portiva must strictly obey **Directive #155** (ThemeConfig Interface Accuracy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.156 Master Directive #156: ExtendedThemeConfig Token Mapping

Every AI coding and design agent working on Portiva must strictly obey **Directive #156** (ExtendedThemeConfig Token Mapping).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.157 Master Directive #157: Apple-Inspired Restraint

Every AI coding and design agent working on Portiva must strictly obey **Directive #157** (Apple-Inspired Restraint).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.158 Master Directive #158: Linear-Inspired Polish

Every AI coding and design agent working on Portiva must strictly obey **Directive #158** (Linear-Inspired Polish).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.159 Master Directive #159: Vercel-Inspired Structural Clarity

Every AI coding and design agent working on Portiva must strictly obey **Directive #159** (Vercel-Inspired Structural Clarity).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.160 Master Directive #160: Framer-Inspired Editing Precision

Every AI coding and design agent working on Portiva must strictly obey **Directive #160** (Framer-Inspired Editing Precision).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.161 Master Directive #161: Canva-Inspired Discoverability

Every AI coding and design agent working on Portiva must strictly obey **Directive #161** (Canva-Inspired Discoverability).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.162 Master Directive #162: 5-Tier Content Scale Hierarchy

Every AI coding and design agent working on Portiva must strictly obey **Directive #162** (5-Tier Content Scale Hierarchy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.163 Master Directive #163: Luxury Real Estate Theme Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #163** (Luxury Real Estate Theme Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.164 Master Directive #164: Automotive Dealership Theme Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #164** (Automotive Dealership Theme Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.165 Master Directive #165: Artisanal Cafe Theme Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #165** (Artisanal Cafe Theme Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.166 Master Directive #166: Beauty & Salon Theme Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #166** (Beauty & Salon Theme Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.167 Master Directive #167: Swiss Tech Agency Theme Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #167** (Swiss Tech Agency Theme Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.168 Master Directive #168: Bento 2x2 Feature Slots

Every AI coding and design agent working on Portiva must strictly obey **Directive #168** (Bento 2x2 Feature Slots).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.169 Master Directive #169: Bento 1x1 Action Slots

Every AI coding and design agent working on Portiva must strictly obey **Directive #169** (Bento 1x1 Action Slots).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.170 Master Directive #170: Bento 3x1 Banner Slots

Every AI coding and design agent working on Portiva must strictly obey **Directive #170** (Bento 3x1 Banner Slots).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.171 Master Directive #171: Mobile Bento Re-Composition

Every AI coding and design agent working on Portiva must strictly obey **Directive #171** (Mobile Bento Re-Composition).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.172 Master Directive #172: BentoBio Config Data Model

Every AI coding and design agent working on Portiva must strictly obey **Directive #172** (BentoBio Config Data Model).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.173 Master Directive #173: BentoBio Box Interface

Every AI coding and design agent working on Portiva must strictly obey **Directive #173** (BentoBio Box Interface).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.174 Master Directive #174: Profile Card Avatar Sizing

Every AI coding and design agent working on Portiva must strictly obey **Directive #174** (Profile Card Avatar Sizing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.175 Master Directive #175: Verification Checkmark Badge

Every AI coding and design agent working on Portiva must strictly obey **Directive #175** (Verification Checkmark Badge).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.176 Master Directive #176: Social Link Aria Labels

Every AI coding and design agent working on Portiva must strictly obey **Directive #176** (Social Link Aria Labels).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.177 Master Directive #177: WebP Media Thumbnail Loading

Every AI coding and design agent working on Portiva must strictly obey **Directive #177** (WebP Media Thumbnail Loading).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.178 Master Directive #178: Image Aspect Ratio Preservation

Every AI coding and design agent working on Portiva must strictly obey **Directive #178** (Image Aspect Ratio Preservation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.179 Master Directive #179: Dynamic Card Insertion

Every AI coding and design agent working on Portiva must strictly obey **Directive #179** (Dynamic Card Insertion).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.180 Master Directive #180: Safe Card Removal

Every AI coding and design agent working on Portiva must strictly obey **Directive #180** (Safe Card Removal).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.181 Master Directive #181: Box Visibility Toggling

Every AI coding and design agent working on Portiva must strictly obey **Directive #181** (Box Visibility Toggling).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.182 Master Directive #182: Canva Discoverability Labels

Every AI coding and design agent working on Portiva must strictly obey **Directive #182** (Canva Discoverability Labels).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.183 Master Directive #183: Instant Live Preview Binding

Every AI coding and design agent working on Portiva must strictly obey **Directive #183** (Instant Live Preview Binding).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.184 Master Directive #184: Inspector Sidebar Tab Hierarchy

Every AI coding and design agent working on Portiva must strictly obey **Directive #184** (Inspector Sidebar Tab Hierarchy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.185 Master Directive #185: Contextual Inspector Panel Switching

Every AI coding and design agent working on Portiva must strictly obey **Directive #185** (Contextual Inspector Panel Switching).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.186 Master Directive #186: Non-Destructive Canvas Selection Ring

Every AI coding and design agent working on Portiva must strictly obey **Directive #186** (Non-Destructive Canvas Selection Ring).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.187 Master Directive #187: EditModeContext Mode Values

Every AI coding and design agent working on Portiva must strictly obey **Directive #187** (EditModeContext Mode Values).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.188 Master Directive #188: Interception in Editing Mode

Every AI coding and design agent working on Portiva must strictly obey **Directive #188** (Interception in Editing Mode).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.189 Master Directive #189: Full Interactivity in Viewing Mode

Every AI coding and design agent working on Portiva must strictly obey **Directive #189** (Full Interactivity in Viewing Mode).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.190 Master Directive #190: Framer Motion Allowed Properties

Every AI coding and design agent working on Portiva must strictly obey **Directive #190** (Framer Motion Allowed Properties).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.191 Master Directive #191: Forbidden Animated Properties

Every AI coding and design agent working on Portiva must strictly obey **Directive #191** (Forbidden Animated Properties).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.192 Master Directive #192: Reduced Motion Respect in Motion Components

Every AI coding and design agent working on Portiva must strictly obey **Directive #192** (Reduced Motion Respect in Motion Components).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.193 Master Directive #193: Pause Continuous Motion in Editing

Every AI coding and design agent working on Portiva must strictly obey **Directive #193** (Pause Continuous Motion in Editing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.194 Master Directive #194: WCAG 2.1 AA Compliance

Every AI coding and design agent working on Portiva must strictly obey **Directive #194** (WCAG 2.1 AA Compliance).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.195 Master Directive #195: Semantic HTML5 Tagging Rules

Every AI coding and design agent working on Portiva must strictly obey **Directive #195** (Semantic HTML5 Tagging Rules).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.196 Master Directive #196: Single H1 Tag Per Page

Every AI coding and design agent working on Portiva must strictly obey **Directive #196** (Single H1 Tag Per Page).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.197 Master Directive #197: Accessible Keyboard Focus Rings

Every AI coding and design agent working on Portiva must strictly obey **Directive #197** (Accessible Keyboard Focus Rings).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.198 Master Directive #198: Explicit Icon Button Aria Labels

Every AI coding and design agent working on Portiva must strictly obey **Directive #198** (Explicit Icon Button Aria Labels).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.199 Master Directive #199: 6 Viewport Responsive Matrix

Every AI coding and design agent working on Portiva must strictly obey **Directive #199** (6 Viewport Responsive Matrix).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.200 Master Directive #200: Zero Horizontal Page Overflow

Every AI coding and design agent working on Portiva must strictly obey **Directive #200** (Zero Horizontal Page Overflow).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.201 Master Directive #201: Minimum Touch Target Size

Every AI coding and design agent working on Portiva must strictly obey **Directive #201** (Minimum Touch Target Size).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.202 Master Directive #202: Defensive UGC Text Styling

Every AI coding and design agent working on Portiva must strictly obey **Directive #202** (Defensive UGC Text Styling).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.203 Master Directive #203: Missing Image Fallback Handling

Every AI coding and design agent working on Portiva must strictly obey **Directive #203** (Missing Image Fallback Handling).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.204 Master Directive #204: Client Image Compression Pipeline

Every AI coding and design agent working on Portiva must strictly obey **Directive #204** (Client Image Compression Pipeline).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.205 Master Directive #205: Edge Asset Upload Proxy

Every AI coding and design agent working on Portiva must strictly obey **Directive #205** (Edge Asset Upload Proxy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.206 Master Directive #206: S3 SDK Credentials Source

Every AI coding and design agent working on Portiva must strictly obey **Directive #206** (S3 SDK Credentials Source).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.207 Master Directive #207: Atomic Zustand Store Selectors

Every AI coding and design agent working on Portiva must strictly obey **Directive #207** (Atomic Zustand Store Selectors).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.208 Master Directive #208: Lazy Off-Screen Media Loading

Every AI coding and design agent working on Portiva must strictly obey **Directive #208** (Lazy Off-Screen Media Loading).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.209 Master Directive #209: Eager Hero Image Priority

Every AI coding and design agent working on Portiva must strictly obey **Directive #209** (Eager Hero Image Priority).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.210 Master Directive #210: Dynamic OpenGraph SEO Metadata

Every AI coding and design agent working on Portiva must strictly obey **Directive #210** (Dynamic OpenGraph SEO Metadata).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.211 Master Directive #211: PostgreSQL Compliance Trigger

Every AI coding and design agent working on Portiva must strictly obey **Directive #211** (PostgreSQL Compliance Trigger).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.212 Master Directive #212: No Moderation Suppression

Every AI coding and design agent working on Portiva must strictly obey **Directive #212** (No Moderation Suppression).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.213 Master Directive #213: Dark Pattern Prohibition

Every AI coding and design agent working on Portiva must strictly obey **Directive #213** (Dark Pattern Prohibition).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.214 Master Directive #214: 72-Hour Pre-Debit Billing Alerts

Every AI coding and design agent working on Portiva must strictly obey **Directive #214** (72-Hour Pre-Debit Billing Alerts).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.215 Master Directive #215: Supabase RLS Policy Enforcement

Every AI coding and design agent working on Portiva must strictly obey **Directive #215** (Supabase RLS Policy Enforcement).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.216 Master Directive #216: Service Role Client Isolation

Every AI coding and design agent working on Portiva must strictly obey **Directive #216** (Service Role Client Isolation).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.217 Master Directive #217: Server Client Auth Context

Every AI coding and design agent working on Portiva must strictly obey **Directive #217** (Server Client Auth Context).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.218 Master Directive #218: Browser Client Singleton

Every AI coding and design agent working on Portiva must strictly obey **Directive #218** (Browser Client Singleton).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.219 Master Directive #219: No Privileged Keys in Client Code

Every AI coding and design agent working on Portiva must strictly obey **Directive #219** (No Privileged Keys in Client Code).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.220 Master Directive #220: Sanitize Destination URLs

Every AI coding and design agent working on Portiva must strictly obey **Directive #220** (Sanitize Destination URLs).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.221 Master Directive #221: Escape Untrusted HTML Input

Every AI coding and design agent working on Portiva must strictly obey **Directive #221** (Escape Untrusted HTML Input).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.222 Master Directive #222: No Environment Variable Commits

Every AI coding and design agent working on Portiva must strictly obey **Directive #222** (No Environment Variable Commits).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.223 Master Directive #223: Protect User Privacy

Every AI coding and design agent working on Portiva must strictly obey **Directive #223** (Protect User Privacy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.224 Master Directive #224: Separate Draft & Published State

Every AI coding and design agent working on Portiva must strictly obey **Directive #224** (Separate Draft & Published State).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.225 Master Directive #225: Realistic Template Copy

Every AI coding and design agent working on Portiva must strictly obey **Directive #225** (Realistic Template Copy).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.226 Master Directive #226: Useful Empty Customizer Panel

Every AI coding and design agent working on Portiva must strictly obey **Directive #226** (Useful Empty Customizer Panel).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.227 Master Directive #227: Progressive Control Disclosure

Every AI coding and design agent working on Portiva must strictly obey **Directive #227** (Progressive Control Disclosure).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.228 Master Directive #228: Tactile Button Micro-Interactions

Every AI coding and design agent working on Portiva must strictly obey **Directive #228** (Tactile Button Micro-Interactions).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.229 Master Directive #229: High Contrast Focus Indicators

Every AI coding and design agent working on Portiva must strictly obey **Directive #229** (High Contrast Focus Indicators).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.230 Master Directive #230: Single Accent Color Scale

Every AI coding and design agent working on Portiva must strictly obey **Directive #230** (Single Accent Color Scale).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.231 Master Directive #231: Standardized Border Radius Tokens

Every AI coding and design agent working on Portiva must strictly obey **Directive #231** (Standardized Border Radius Tokens).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.232 Master Directive #232: Restrained Surface Gradients

Every AI coding and design agent working on Portiva must strictly obey **Directive #232** (Restrained Surface Gradients).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.233 Master Directive #233: Balanced Editorial Layouts

Every AI coding and design agent working on Portiva must strictly obey **Directive #233** (Balanced Editorial Layouts).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.234 Master Directive #234: Proportional CTA Sizing

Every AI coding and design agent working on Portiva must strictly obey **Directive #234** (Proportional CTA Sizing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.235 Master Directive #235: Multi-Viewport Responsive Verification

Every AI coding and design agent working on Portiva must strictly obey **Directive #235** (Multi-Viewport Responsive Verification).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.236 Master Directive #236: Zero Layout Thrashing

Every AI coding and design agent working on Portiva must strictly obey **Directive #236** (Zero Layout Thrashing).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.237 Master Directive #237: GPU Container Promotion

Every AI coding and design agent working on Portiva must strictly obey **Directive #237** (GPU Container Promotion).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.238 Master Directive #238: Structured Narrative Flow

Every AI coding and design agent working on Portiva must strictly obey **Directive #238** (Structured Narrative Flow).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.239 Master Directive #239: Numbered Editorial Catalogs

Every AI coding and design agent working on Portiva must strictly obey **Directive #239** (Numbered Editorial Catalogs).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.240 Master Directive #240: Asymmetrical Photo Galleries

Every AI coding and design agent working on Portiva must strictly obey **Directive #240** (Asymmetrical Photo Galleries).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.241 Master Directive #241: Interactive Transformation Sliders

Every AI coding and design agent working on Portiva must strictly obey **Directive #241** (Interactive Transformation Sliders).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.242 Master Directive #242: Capped Lookbook Showcases

Every AI coding and design agent working on Portiva must strictly obey **Directive #242** (Capped Lookbook Showcases).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.243 Master Directive #243: Refrained Statistical Metrics

Every AI coding and design agent working on Portiva must strictly obey **Directive #243** (Refrained Statistical Metrics).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.244 Master Directive #244: High-Contrast Final Closures

Every AI coding and design agent working on Portiva must strictly obey **Directive #244** (High-Contrast Final Closures).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.245 Master Directive #245: Clean Minimal Footers

Every AI coding and design agent working on Portiva must strictly obey **Directive #245** (Clean Minimal Footers).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.246 Master Directive #246: Smooth Section Anchor Links

Every AI coding and design agent working on Portiva must strictly obey **Directive #246** (Smooth Section Anchor Links).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.247 Master Directive #247: Scroll-Triggered Navigation Compression

Every AI coding and design agent working on Portiva must strictly obey **Directive #247** (Scroll-Triggered Navigation Compression).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.248 Master Directive #248: Active Scroll Section Tracking

Every AI coding and design agent working on Portiva must strictly obey **Directive #248** (Active Scroll Section Tracking).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.249 Master Directive #249: Dark Mode Defaulting

Every AI coding and design agent working on Portiva must strictly obey **Directive #249** (Dark Mode Defaulting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.250 Master Directive #250: Warm Cream Light Mode Defaulting

Every AI coding and design agent working on Portiva must strictly obey **Directive #250** (Warm Cream Light Mode Defaulting).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.251 Master Directive #251: Cinematic Mask Entrance Reveals

Every AI coding and design agent working on Portiva must strictly obey **Directive #251** (Cinematic Mask Entrance Reveals).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.252 Master Directive #252: Whitespace Breathing Pauses

Every AI coding and design agent working on Portiva must strictly obey **Directive #252** (Whitespace Breathing Pauses).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.253 Master Directive #253: Overlapping Magazine Layout Compositions

Every AI coding and design agent working on Portiva must strictly obey **Directive #253** (Overlapping Magazine Layout Compositions).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.254 Master Directive #254: Horizontal Card Scroll Snap

Every AI coding and design agent working on Portiva must strictly obey **Directive #254** (Horizontal Card Scroll Snap).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.255 Master Directive #255: WhatsApp Order Catalog Integration

Every AI coding and design agent working on Portiva must strictly obey **Directive #255** (WhatsApp Order Catalog Integration).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.256 Master Directive #256: Zero Fabrication in Task Summaries

Every AI coding and design agent working on Portiva must strictly obey **Directive #256** (Zero Fabrication in Task Summaries).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.257 Master Directive #257: Strict Audit Protocol

Every AI coding and design agent working on Portiva must strictly obey **Directive #257** (Strict Audit Protocol).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.258 Master Directive #258: Preserve File Commenting Integrity

Every AI coding and design agent working on Portiva must strictly obey **Directive #258** (Preserve File Commenting Integrity).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.259 Master Directive #259: Maintain Local State Immutability

Every AI coding and design agent working on Portiva must strictly obey **Directive #259** (Maintain Local State Immutability).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.

### 60.260 Master Directive #260: Master Constitution Directive

Every AI coding and design agent working on Portiva must strictly obey **Directive #260** (Master Constitution Directive).

- **Rationale**: This directive guarantees structural safety, editor integrity, visual design polish, and overall system stability across Portiva.
- **Enforcement**: Violations of this law will fail automated pre-flight checks and build validation commands (`npx tsc --noEmit`).
- **Execution Standard**: Implement this rule strictly as documented without introducing unnecessary engineering abstractions.


---
*End of Portiva Central Agent Operating Manual & Constitution.*
