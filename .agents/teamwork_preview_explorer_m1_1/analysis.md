# Architectural Analysis & Content Model Specification: AuraSalon Redesign

**Author**: Explorer 1  
**Milestone**: Milestone 1 — AuraSalon Architecture & Content Model Specification  
**Working Directory**: `c:\Users\falah\Documents\Falah\Apps\portiva\.agents\teamwork_preview_explorer_m1_1`  
**Project Root**: `c:\Users\falah\Documents\Falah\Apps\portiva`  
**Date**: 2026-08-03  

---

## 1. Executive Summary

The **AuraSalon** template is Portiva's high-end luxury bridal & editorial makeup template. The current implementation in `src/components/templates/AuraSalon.tsx` is a basic 277-line template rendering only 4 sections (Hero, Lookbook with 6 grid images, Pricing with 3 packages, and a basic Footer). It lacks 11 essential sections required for a premiere fashion-editorial bridal salon experience.

This analysis presents:
1. A comprehensive audit of the existing `AuraSalon.tsx` code and its limitations.
2. A deep-dive analysis into Portiva's VisualBuilder engine (`src/components/engine/`), explaining how `VisualBuilderContext`, `EditableElement`, `EditableImage`, `EditableButton`, and `EditableText` interact with overrides and theme CSS variables.
3. The complete, production-grade TypeScript interface specification (`AuraSalonProps`) and default content model covering all **15 required sections**.
4. A step-by-step modularization strategy to decompose `AuraSalon.tsx` into maintainable, co-located section subcomponents.

---

## 2. Audit of Existing `src/components/templates/AuraSalon.tsx`

### Current File Anatomy
- **Location**: `src/components/templates/AuraSalon.tsx`
- **Total Lines**: 277 lines
- **Exported Interface**: `AuraSalonProps`, `PackageItem`
- **Component Type**: Client Component (`'use client'`)

### Existing Sections
1. **Hero Section (lines 74–124)**:
   - Fullscreen background image with dark gradient overlay (`EditableImage` with `aura-hero-bg`).
   - Floating badge with rating (`aura-rating`) and bride count (`aura-brides`).
   - Artist name (`aura-artist-name`) and tagline (`aura-tagline`).
2. **Lookbook Section (lines 126–177)**:
   - Header with title (`aura-lookbook-title`) and subtitle (`aura-lookbook-sub`).
   - 6-item grid driven by `DEFAULT_LOOKBOOK` array.
   - First image takes 2x2 grid span (`md:col-span-2 md:row-span-2`).
3. **Pricing & Packages Section (lines 179–259)**:
   - Title (`aura-pricing-title`) and subtitle (`aura-pricing-sub`).
   - 3 package cards ("Essential Glow", "Royal Bridal", "Entourage").
   - Middle card ("Royal Bridal") highlighted with `scale-105` and `bg-theme-primary/10`.
   - `EditableButton` per package opening a WhatsApp pre-filled booking message.
4. **Footer (lines 261–274)**:
   - Basic single-line copyright paragraph (`aura-footer-text`).

### Key Deficiencies & Missing Sections
The current template is missing 11 of the 15 target sections required for the redesign:
- ❌ **Minimal Navigation**: No header/nav bar exists at all.
- ❌ **Editorial Brand Statement**: Missing high-fashion narrative & core philosophy callouts.
- ❌ **Our Story / Artist Philosophy**: No artist bio, credentials, or philosophy breakdown.
- ❌ **Featured Transformations (Lookbook - capped at 5)**: Current lookbook has 6 unconstrained grid images without transformation details.
- ❌ **Before / After Transformation Slider**: No interactive comparison mechanism.
- ❌ **Editorial Service List**: No categorized breakdown of services (Bridal, Pre-Wedding, Editorial, Hair Artistry).
- ❌ **Package Carousel**: Current pricing is a static 3-column grid, not a responsive carousel.
- ❌ **Artistry Process**: No 4-step consultation-to-d-day roadmap.
- ❌ **Fashion Editorial Bento Section**: No asymmetric bento grid for high-fashion callouts.
- ❌ **Testimonials**: No verified bride testimonials or reviews slider/grid.
- ❌ **Social Proof / Statistics**: No dedicated stat metrics section (e.g. 500+ Brides, 12+ Years, 99.4% Rating).
- ❌ **Social / Instagram Showcase**: No instagram feed or editorial grid.
- ❌ **Final Booking Section**: No dedicated luxury conversion section with direct booking card & guarantee.
- ❌ **Minimal Footer**: Current footer is a single text string without quick links or social branding.

---

## 3. Portiva VisualBuilder Engine Analysis

Portiva’s visual editing engine enables drag-and-drop / click-to-edit capabilities directly on rendered React templates without breaking SSR or hardcoding content.

### Engine Components & Roles

| Component | Export File | Key Responsibilities |
|---|---|---|
| `VisualBuilderProvider` / `useVisualBuilder` | `VisualBuilderContext.tsx` | Global context providing `templateData`, `selectedElement`, `mode` (`'EDITING'` \| `'VIEWING'`), undo/redo stack, and override maps (`textOverrides`, `textColors`, `styleOverrides`, `mediaOverrides`, `buttonOverrides`). |
| `EditableElement` | `EditableElement.tsx` | Universal wrapper for HTML text tags (`h1`-`h4`, `p`, `span`, `div`, etc.). Intercepts click/hover in edit mode, computes zoom-adjusted bounding rects for canvas selection outlines, and supports inline `contentEditable` editing. |
| `EditableImage` | `EditableImage.tsx` | Image wrapper keyed by `imageKey`. Renders camera overlay on hover in edit mode. Overrides resolved from `mediaOverrides[imageKey]` (`src`, `alt`, `objectFit`). |
| `EditableButton` | `EditableButton.tsx` | Interactive button wrapper keyed by `buttonKey`. Prevents link navigation in edit mode. Overrides resolved from `buttonOverrides[buttonKey]` (`text`, `href`, `openInNewTab`, colors, borders, typography, hover colors). |
| `EditableText` | `EditableText.tsx` | Dual-mode text component. Public mode renders pure semantic HTML; edit mode renders `contentEditable` div with blur updates. |
| `ThemeProvider` | `ThemeProvider.tsx` | Injects JSONB `ThemeConfig` as CSS custom properties (`--theme-background`, `--theme-foreground`, `--theme-primary`, `--theme-surface`, `--theme-border`, `--theme-muted`, etc.). |

### Overrides Data Structure

The engine maintains 5 distinct override maps inside `TemplateData`:

```ts
export interface TemplateData {
  profileName: string;
  profileHandle: string;
  blocks: BentoBlock[];
  theme: ThemeConfig;
  textColors: Record<string, string>;       // Key: `${elementId}-${field}` -> hex color
  textOverrides?: Record<string, string>;   // Key: `${elementId}-${field}` -> text value
  styleOverrides: Record<string, ElementStyleOverride>; // Key: elementId -> CSS overrides
  mediaOverrides: Record<string, MediaOverride>;       // Key: imageKey -> { src, alt, objectFit }
  buttonOverrides: Record<string, ButtonOverride>;     // Key: buttonKey -> { text, href, openInNewTab, colors... }
}
```

### Theming Conventions (`AGENTS.md`)
- **Zero hardcoded colors**: All background, text, border, and accent colors must use semantic Tailwind tokens:
  - `bg-theme-background`, `text-theme-foreground`
  - `bg-theme-surface`, `bg-theme-surface/50`, `border-theme-border/30`
  - `text-theme-primary`, `bg-theme-primary`, `border-theme-primary/30`
  - `text-theme-muted`
- CSS variables are supplied dynamically via `themeConfigToCSSVars()` in `ThemeProvider.tsx`.

---

## 4. Comprehensive TypeScript Interface Specification (`AuraSalonProps`)

To support all 15 required sections, we define a structured, fully-typed props model.

### 4.1 Sub-Interfaces Definition

```ts
// 1. Navigation Link
export interface NavItem {
  id: string;
  label: string;
  href: string;
}

// 3. Editorial Brand Highlights
export interface BrandHighlight {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

// 4. Artist Philosophy Pillars
export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  description: string;
}

// 5. Featured Transformations (Lookbook - max 5 items)
export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  badge?: string;
}

// 6. Before / After Transformation Pair
export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  transformationDetails: string;
  clientQuote?: string;
}

// 7. Editorial Service List
export interface ServiceItem {
  id: string;
  category: 'Bridal Couture' | 'Pre-Wedding & Engagement' | 'Editorial & Red Carpet' | 'Hair Artistry';
  name: string;
  tagline: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
}

// 8. Package Carousel Item
export interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  isPopular?: boolean;
  features: string[];
  ctaText?: string;
  whatsappMessage?: string;
}

// 9. Artistry Process Step
export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  duration?: string;
}

// 10. Fashion Editorial Bento Card
export interface BentoCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gridSpan: string; // e.g. "col-span-1 md:col-span-2 row-span-2"
  tag: string;
  ctaText?: string;
  ctaHref?: string;
}

// 11. Bride Testimonial
export interface TestimonialItem {
  id: string;
  brideName: string;
  weddingLocation: string;
  weddingDate: string;
  rating: number;
  quote: string;
  image: string;
  packageUsed?: string;
}

// 12. Social Proof / Stat Metric
export interface StatItem {
  id: string;
  number: string;
  label: string;
  subtext: string;
}

// 13. Social / Instagram Post
export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  link: string;
  tag: string;
}

// 14. Booking Information
export interface BookingInfo {
  headline: string;
  subheadline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  studioAddress: string;
  responseGuarantee: string;
  availableSlotsNotice: string;
}

// 15. Footer Link Column
export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}
```

### 4.2 Top-Level `AuraSalonProps` Interface

```ts
export interface AuraSalonProps {
  // Global & Brand Identity
  artistName?: string;
  brandTagline?: string;
  artistTitle?: string;
  phone?: string;

  // 1. Navigation
  brandLogoText?: string;
  navItems?: NavItem[];
  navCtaText?: string;

  // 2. Cinematic Hero
  heroRating?: string;
  heroBridesCount?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: string;
  heroPrimaryCtaText?: string;
  heroSecondaryCtaText?: string;

  // 3. Editorial Brand Statement
  brandStatementHeadline?: string;
  brandStatementQuote?: string;
  brandStatementAuthor?: string;
  brandStatementImage?: string;
  brandHighlights?: BrandHighlight[];

  // 4. Our Story / Artist Philosophy
  storyTitle?: string;
  storySubtitle?: string;
  storyBioText1?: string;
  storyBioText2?: string;
  artistPortraitImage?: string;
  artistSignatureImage?: string;
  yearsExperience?: string;
  philosophyPillars?: PhilosophyPillar[];

  // 5. Featured Transformations (Lookbook - max 5 items)
  lookbookTitle?: string;
  lookbookSubtitle?: string;
  lookbookItems?: LookbookItem[];

  // 6. Before / After Transformation Slider
  beforeAfterTitle?: string;
  beforeAfterSubtitle?: string;
  beforeAfterItems?: BeforeAfterItem[];

  // 7. Editorial Service List
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: ServiceItem[];

  // 8. Package Carousel
  packagesTitle?: string;
  packagesSubtitle?: string;
  packages?: PackageItem[];

  // 9. Artistry Process
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: ProcessStep[];

  // 10. Fashion Editorial Bento Section
  bentoTitle?: string;
  bentoSubtitle?: string;
  bentoCards?: BentoCard[];

  // 11. Testimonials
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonials?: TestimonialItem[];

  // 12. Social Proof / Statistics
  statsTitle?: string;
  statsSubtitle?: string;
  stats?: StatItem[];

  // 13. Social / Instagram Showcase
  instagramHandle?: string;
  instagramFollowerCount?: string;
  instagramPosts?: InstagramPost[];

  // 14. Final Booking Section
  bookingInfo?: BookingInfo;

  // 15. Minimal Footer
  footerCopyright?: string;
  footerLinkGroups?: FooterLinkGroup[];

  // Engine props
  navbarBg?: string;
  hoverStyle?: string;
}
```

---

## 5. Default Content Model (`DEFAULT_AURA_SALON_PROPS`)

Below is the complete, high-quality default content object to ensure the template looks stunning even when zero props are passed:

```ts
export const DEFAULT_AURA_SALON_PROPS: Required<
  Omit<AuraSalonProps, 'navbarBg' | 'hoverStyle'>
> & { navbarBg: string; hoverStyle: string } = {
  artistName: 'Ananya Sharma',
  brandTagline: 'Couture Bridal & Editorial Hair & Makeup',
  artistTitle: 'Master Bridal Makeup Artist & Hair Stylist',
  phone: '919876543210',

  // 1. Navigation
  brandLogoText: 'AURA SALON',
  navItems: [
    { id: 'nav-story', label: 'Our Story', href: '#story' },
    { id: 'nav-lookbook', label: 'Lookbook', href: '#lookbook' },
    { id: 'nav-services', label: 'Services', href: '#services' },
    { id: 'nav-packages', label: 'Packages', href: '#packages' },
    { id: 'nav-process', label: 'Process', href: '#process' },
    { id: 'nav-bento', label: 'Editorial', href: '#editorial' },
    { id: 'nav-reviews', label: 'Reviews', href: '#reviews' },
  ],
  navCtaText: 'Reserve Experience',

  // 2. Cinematic Hero
  heroRating: '4.98 / 5.0 (240+ Reviews)',
  heroBridesCount: '150+ Royal Brides Styled',
  heroHeadline: 'Ethereal Elegance. Timeless Artistry.',
  heroSubheadline:
    'Bespeak luxury bridal makeup & high-fashion hair styling tailored for modern brides and royal celebrations across India and worldwide.',
  heroImage:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
  heroPrimaryCtaText: 'Book Private Consultation',
  heroSecondaryCtaText: 'Explore Lookbook',

  // 3. Editorial Brand Statement
  brandStatementHeadline: 'A Celebration of Natural Beauty & Couture Precision',
  brandStatementQuote:
    '“Makeup should never be a mask; it is an intimate illumination of a bride’s innate grandeur.”',
  brandStatementAuthor: 'Ananya Sharma — Creative Director',
  brandStatementImage:
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop',
  brandHighlights: [
    {
      id: 'high-1',
      title: 'HD Airbrush Perfection',
      description: 'Sweat-proof, 24-hour ultra-weightless perfection for high-definition photography.',
    },
    {
      id: 'high-2',
      title: 'Bespeak Skin Architecture',
      description: 'Custom luxury skincare prep using organic botanical elixirs for radiant glow.',
    },
    {
      id: 'high-3',
      title: 'Global On-Location Suite',
      description: 'Dedicated mobile luxury suite for destination weddings across globe.',
    },
  ],

  // 4. Our Story / Artist Philosophy
  storyTitle: 'The Artist Behind The Brush',
  storySubtitle: 'Over a decade of sculpting ethereal bridal silhouettes',
  storyBioText1:
    'Trained in Paris and Mumbai, Ananya Sharma brings 12+ years of high-fashion editorial experience into the luxury bridal domain. Her signature style fuses classic royal heritage with luminous, skin-first modern aesthetics.',
  storyBioText2:
    'Having styled celebrity brides, fashion covers, and couture runway shows, Ananya treats every bride as a canvas of unique storytelling, ensuring look harmony with jewelry, draping, and lighting.',
  artistPortraitImage:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  artistSignatureImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
  yearsExperience: '12+ Years of Artistry',
  philosophyPillars: [
    { id: 'phil-1', number: '01', title: 'Skin First Architecture', description: 'Deep botanical skin prep creating seamless luminosity without heavy layering.' },
    { id: 'phil-2', number: '02', title: 'Structural Hair Design', description: 'Sculpted hair contours designed to support heavy maang tikkas and dupattas effortlessly.' },
    { id: 'phil-3', number: '03', title: 'Harmonized Color Palette', description: 'Color theory matched precisely to embroidery weave, gemstones, and event lighting.' },
  ],

  // 5. Featured Transformations (Lookbook - max 5 items)
  lookbookTitle: 'The Lookbook',
  lookbookSubtitle: 'Curated editorial transformations across royal wedding celebrations',
  lookbookItems: [
    {
      id: 'lb-1',
      title: 'South Indian Royal Bride',
      category: 'Traditional Heritage',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      description: 'Classic matte base, kohl-rimmed defined eyes, and fresh jasmine floral braid.',
      badge: 'Featured',
    },
    {
      id: 'lb-2',
      title: 'Bengaluru Sunset Wedding',
      category: 'Contemporary Glam',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop',
      description: 'DeWY glass skin, champagne shimmer lid, and soft sculpted waves.',
    },
    {
      id: 'lb-3',
      title: 'Udaipur Royal Palace Reception',
      category: 'Editorial Glam',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop',
      description: 'Smokey bronze eyeshadow paired with deep berry velvet lip.',
    },
    {
      id: 'lb-4',
      title: 'Minimalist Destination Bride',
      category: 'Pastel Elegance',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
      description: 'Soft peach blush tones with feather-light airbrush skin.',
    },
    {
      id: 'lb-5',
      title: 'Cocktail & Sangeet Night',
      category: 'High-Gloss Glamour',
      image: 'https://images.unsplash.com/photo-1559357430-2e6cb1a5f280?q=80&w=800&auto=format&fit=crop',
      description: 'Winged liner precision with Hollywood glam retro curls.',
    },
  ],

  // 6. Before / After Transformation Slider
  beforeAfterTitle: 'Before & After Artistry',
  beforeAfterSubtitle: 'Slide to witness the seamless enhancement of natural features',
  beforeAfterItems: [
    {
      id: 'ba-1',
      title: 'Royal Pheras Transformation',
      category: 'HD Airbrush Bridal',
      beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      transformationDetails: 'Color correction, HD airbrush foundation, custom lash extensions, & antique gold draping.',
      clientQuote: '“I felt like royalty. The skin felt so light yet lasted through 14 hours of ceremony!”',
    },
    {
      id: 'ba-2',
      title: 'Sangeet Glam Transformation',
      category: 'High Fashion Editorial',
      beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop',
      transformationDetails: 'Sculpted cheek contours, graphic winged eye, and crown braid setting.',
      clientQuote: '“The photos looked straight out of Vogue India!”',
    },
  ],

  // 7. Editorial Service List
  servicesTitle: 'Bespeak Services',
  servicesSubtitle: 'Tailored beauty experiences for weddings, editorials, and special occasions',
  services: [
    {
      id: 'srv-1',
      category: 'Bridal Couture',
      name: 'The Signature Royal Bridal Suite',
      tagline: 'Complete D-day transformation with dedicated touch-up artist',
      price: '$999',
      duration: '4.5 Hours',
      description: 'Includes full HD airbrush makeup, luxury lash extension, custom hair sculpting, dupatta setting & saree draping.',
      features: ['2 Pre-wedding trial sessions', 'Ultra HD Airbrush Foundation', 'Saree & Dupatta Draping', 'Mother/Sister quick touch-up kit', 'On-site presence till Pheras'],
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'srv-2',
      category: 'Pre-Wedding & Engagement',
      name: 'Engagement & Mehendi Glamour',
      tagline: 'Luminous glow crafted for sunlit pre-wedding festivities',
      price: '$599',
      duration: '3.0 Hours',
      description: 'Fresh dew skin finish, waterproof eye makeup, and soft boho braid styling ideal for vibrant celebrations.',
      features: ['Skin prep consultation', 'Waterproof eye makeup', 'Boho braid / floral hair setup', 'Touch-up essential kit'],
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'srv-3',
      category: 'Editorial & Red Carpet',
      name: 'Fashion Editorial & Campaign Styling',
      tagline: 'High-definition runway lookbook styling for models & covers',
      price: '$750 / day',
      duration: 'Full Day',
      description: 'Fast-paced look transitions, skin reflection control, and avant-garde hair design for commercial shoots.',
      features: ['Multi-look palette shifts', 'Studio light reflective calibration', 'Continuous set touch-ups', 'Hair ornament integration'],
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'srv-4',
      category: 'Hair Artistry',
      name: 'Couture Hair Sculpting & Extension Setting',
      tagline: 'Intricate floral braid & royal hair structures',
      price: '$350',
      duration: '2.0 Hours',
      description: 'Architectural hair styling built to support heavy jewelry pieces and traditional fresh floral ornaments.',
      features: ['Hair volume extension blending', 'Fresh flower wiring & pinning', 'Crown structure padding', 'Humidity-shield spray finish'],
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=600&auto=format&fit=crop',
    },
  ],

  // 8. Package Carousel
  packagesTitle: 'Luxury Experience Packages',
  packagesSubtitle: 'Complete multi-event packages engineered for peace of mind',
  packages: [
    {
      id: 'pkg-1',
      name: 'Essential Glow',
      subtitle: 'Single Main Event Experience',
      price: '$499',
      features: [
        '1 Bridal trial session',
        'HD airbrush makeup base',
        'Custom hairstyling & hair extensions',
        'Dupatta & jewelry placement',
        'Emergency touch-up kit',
      ],
      ctaText: 'Book Essential Package',
      whatsappMessage: 'Hi Ananya, I would like to book the Essential Glow Package ($499).',
    },
    {
      id: 'pkg-2',
      name: 'Royal Bridal Suite',
      subtitle: 'Most Preferred for Main Wedding + Reception',
      price: '$999',
      originalPrice: '$1,200',
      isPopular: true,
      features: [
        '2 Comprehensive trial sessions',
        'Ultra HD Airbrush base for Wedding & Reception',
        'Advanced draping & jewelry coordination',
        'Mother & Sister touch-up service included',
        'Dedicated on-site assistant till Pheras',
        'Premium mink lashes & hair extensions',
      ],
      ctaText: 'Reserve Royal Suite',
      whatsappMessage: 'Hi Ananya, I want to reserve the Royal Bridal Suite Package ($999).',
    },
    {
      id: 'pkg-3',
      name: 'Grand Entourage Destination',
      subtitle: 'Full Multi-Day Wedding Celebration (Bridal + 4 Bridesmaids)',
      price: '$1,899',
      originalPrice: '$2,400',
      features: [
        'Bridal Makeup + 4 Bridesmaids for 3 Events',
        'HD airbrush base for all members',
        'Mehendi, Sangeet & Pheras styling',
        'Complete travel & on-location team setup',
        'Unlimited touch-up support throughout all events',
        'Deluxe skincare gift hamper for bride',
      ],
      ctaText: 'Book Grand Entourage',
      whatsappMessage: 'Hi Ananya, I want to inquire about the Grand Entourage Destination Package ($1,899).',
    },
  ],

  // 9. Artistry Process
  processTitle: 'The Four-Step Artistry Journey',
  processSubtitle: 'From initial consultation to D-day perfection',
  processSteps: [
    {
      stepNumber: '01',
      title: 'Vision & Skin Analysis',
      subtitle: '6-8 Months Prior',
      description: 'In-depth consultation mapping your wedding outfits, skin type, jewelry hues, and facial architecture.',
      duration: '45 Mins',
    },
    {
      stepNumber: '02',
      title: 'The Trial Session',
      subtitle: '2-3 Months Prior',
      description: 'Hands-on trial session executing two complete looks under high-definition photography lighting.',
      duration: '3 Hours',
    },
    {
      stepNumber: '03',
      title: 'Custom Palette Blueprint',
      subtitle: '2 Weeks Prior',
      description: 'Finalizing hair ornament placement, floral wiring, drape pleating specs, and personalized skin prep regimen.',
      duration: '1 Hour',
    },
    {
      stepNumber: '04',
      title: 'D-Day On-Site Perfection',
      subtitle: 'Wedding Day',
      description: 'On-location luxury suite setup 4 hours prior to ceremony with continuous touch-up support.',
      duration: 'Full Day Support',
    },
  ],

  // 10. Fashion Editorial Bento Section
  bentoTitle: 'Editorial Highlights',
  bentoSubtitle: 'Discover the artistry, studio space, and bespoke cosmetics',
  bentoCards: [
    {
      id: 'bento-1',
      title: 'Vogue India Cover Feature',
      subtitle: 'High Fashion Recognition',
      description: 'Awarded Top 10 Luxury Bridal Artists in South Asia by Vogue Weddings.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      gridSpan: 'col-span-1 md:col-span-2 row-span-2',
      tag: 'Editorial Distinction',
    },
    {
      id: 'bento-2',
      title: 'Clean Botanical Skincare',
      subtitle: 'Pure Organic Elixirs',
      description: 'We exclusively use dermatologically tested, cruelty-free luxury skincare.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      gridSpan: 'col-span-1 row-span-1',
      tag: 'Skincare Standard',
    },
    {
      id: 'bento-3',
      title: 'Destination Luxury Suite',
      subtitle: 'Worldwide Mobility',
      description: 'Fully equipped mobile studio with ring lights & steam drapers traveling across Italy, Dubai, and Thailand.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
      gridSpan: 'col-span-1 row-span-1',
      tag: 'Global Mobility',
    },
  ],

  // 11. Testimonials
  testimonialsTitle: 'Words From Our Royal Brides',
  testimonialsSubtitle: 'Unedited reflections of joy and elegance from real brides',
  testimonials: [
    {
      id: 'test-1',
      brideName: 'Priya Narang',
      weddingLocation: 'The Leela Palace, Udaipur',
      weddingDate: 'December 2025',
      rating: 5,
      quote:
        'Ananya transformed me into the exact bride I always envisioned — regal yet soft. My makeup lasted through emotional pheras and non-stop dancing without a single creasing moment!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      packageUsed: 'Royal Bridal Suite',
    },
    {
      id: 'test-2',
      brideName: 'Meera Reddy',
      weddingLocation: 'JW Marriott, Bengaluru',
      weddingDate: 'November 2025',
      rating: 5,
      quote:
        'The skin prep before makeup was unbelievable. Even under 4K video cameras, my skin looked glowing and weightless. Best decision of my wedding planning!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      packageUsed: 'Grand Entourage Destination',
    },
    {
      id: 'test-3',
      brideName: 'Dr. Radhika Sen',
      weddingLocation: 'Taj Bengal, Kolkata',
      weddingDate: 'January 2026',
      rating: 5,
      quote:
        'Ananya’s eye for color matching with traditional Bengali sarees and gold ornaments is unmatched. Calm, punctual, and an absolute artist.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
      packageUsed: 'Royal Bridal Suite',
    },
  ],

  // 12. Social Proof / Statistics
  statsTitle: 'Artistry By Numbers',
  statsSubtitle: 'A track record of excellence in luxury bridal styling',
  stats: [
    { id: 'stat-1', number: '150+', label: 'Brides Styled', subtext: 'Across 12 countries' },
    { id: 'stat-2', number: '12+', label: 'Years Experience', subtext: 'Editorial & Bridal' },
    { id: 'stat-3', number: '4.98', label: 'Client Rating', subtext: 'Based on 240+ reviews' },
    { id: 'stat-4', number: '100%', label: 'On-Time Record', subtext: 'Punctuality guaranteed' },
  ],

  // 13. Social / Instagram Showcase
  instagramHandle: '@aurasalon.official',
  instagramFollowerCount: '48.5K Editorial Followers',
  instagramPosts: [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop',
      caption: 'Royal South Indian Bride lookbook highlight',
      likes: '2.4k',
      link: 'https://instagram.com',
      tag: '#BridalGlam',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=400&auto=format&fit=crop',
      caption: 'Sunset pheras glow step-by-step skin prep',
      likes: '1.8k',
      link: 'https://instagram.com',
      tag: '#AirbrushMakeup',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400&auto=format&fit=crop',
      caption: 'Smokey bronze eyeshadow for Udaipur reception',
      likes: '3.1k',
      link: 'https://instagram.com',
      tag: '#EditorialBridal',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=400&auto=format&fit=crop',
      caption: 'Soft pastel lehenga makeup pairing',
      likes: '2.9k',
      link: 'https://instagram.com',
      tag: '#PastelBride',
    },
  ],

  // 14. Final Booking Section
  bookingInfo: {
    headline: 'Secure Your Date For An Unforgettable Bridal Experience',
    subheadline: 'Peak wedding season slots fill 6-8 months in advance. Reach out directly to lock in your date.',
    phone: '+91 98765 43210',
    whatsappNumber: '919876543210',
    email: 'concierge@aurasalon.com',
    studioAddress: 'Suite 402, Jubilee Hills, Hyderabad & Mobile Global Suite',
    responseGuarantee: 'Guaranteed response within 2 hours for active wedding inquiries',
    availableSlotsNotice: 'Currently accepting dates for 2026/2027 Wedding Season',
  },

  // 15. Minimal Footer
  footerCopyright: '© 2026 AURA SALON BY ANANYA SHARMA. ALL RIGHTS RESERVED.',
  footerLinkGroups: [
    {
      title: 'Navigation',
      links: [
        { label: 'Our Story', href: '#story' },
        { label: 'Lookbook', href: '#lookbook' },
        { label: 'Services', href: '#services' },
        { label: 'Packages', href: '#packages' },
      ],
    },
    {
      title: 'Experience',
      links: [
        { label: 'Four-Step Process', href: '#process' },
        { label: 'Editorial Bento', href: '#editorial' },
        { label: 'Bride Testimonials', href: '#reviews' },
        { label: 'Instagram Showcase', href: '#instagram' },
      ],
    },
    {
      title: 'Legal & Contact',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Experience', href: '#' },
        { label: 'WhatsApp Inquiry', href: 'https://wa.me/919876543210' },
      ],
    },
  ],

  navbarBg: 'transparent',
  hoverStyle: 'color',
};
```

---

## 6. Step-by-Step Modularization & Subcomponent Decomposition Strategy

To keep `src/components/templates/AuraSalon.tsx` clean, maintainable, and aligned with Portiva's component architecture, we recommend decomposing the template into modular section files located in a co-located folder:

```
src/components/templates/
  ├── AuraSalon.tsx (Main orchestrator component)
  └── aurasalon/
      ├── index.ts (Barrel export for section components)
      ├── types.ts (All AuraSalon interface definitions & default props)
      ├── NavbarSection.tsx (Section 1)
      ├── HeroSection.tsx (Section 2)
      ├── BrandStatementSection.tsx (Section 3)
      ├── OurStorySection.tsx (Section 4)
      ├── LookbookSection.tsx (Section 5)
      ├── BeforeAfterSection.tsx (Section 6)
      ├── ServiceListSection.tsx (Section 7)
      ├── PackageCarouselSection.tsx (Section 8)
      ├── ArtistryProcessSection.tsx (Section 9)
      ├── BentoGridSection.tsx (Section 10)
      ├── TestimonialsSection.tsx (Section 11)
      ├── SocialProofSection.tsx (Section 12)
      ├── InstagramSection.tsx (Section 13)
      ├── BookingSection.tsx (Section 14)
      └── FooterSection.tsx (Section 15)
```

### Component Binding Strategy

Each subcomponent receives:
1. Section-specific props from `AuraSalonProps` (with fallback to default constants).
2. Direct access to `EditableElement`, `EditableImage`, and `EditableButton` wrappers with unique IDs (`aura-nav-*`, `aura-hero-*`, `aura-story-*`, `aura-ba-*`, etc.) to guarantee seamless click selection and inline text updates in the VisualBuilder inspector.

### Implementation Checklist for Implementer Phase
1. **Types Extraction**: Place `AuraSalonProps` and sub-interfaces into `src/components/templates/aurasalon/types.ts`.
2. **Subcomponent Authoring**: Implement each of the 15 section components, ensuring all colors use Tailwind semantic classes (`bg-theme-background`, `text-theme-foreground`, `bg-theme-surface`, `text-theme-primary`, `border-theme-border`).
3. **Interactive Features**:
   - Section 6 (Before/After): Include an interactive comparison slider using Framer Motion or range input.
   - Section 8 (Packages): Responsive carousel with horizontal scrolling/touch gestures.
4. **Main Orchestrator (`AuraSalon.tsx`)**: Re-export `AuraSalonProps` and render the 15 section components sequentially.
5. **Type Validation**: Verify build & types with `npx tsc --noEmit`.

---

## 7. Verification Method

To independently verify the analysis and proposed content model:

1. **Type Checking**:
   ```bash
   npx tsc --noEmit
   ```
2. **Visual Builder Compatibility**:
   Ensure all `EditableElement` `id` and `field` attributes follow standard format (`aura-[section]-[itemIdx]-[field]`).
3. **Theme Token Compliance**:
   Verify no hex colors (e.g. `#ffffff`, `#000000`) are used in JSX styling or Tailwind inline classes.

---
