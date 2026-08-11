# AuraSalon Luxury Editorial Visual Identity & Portiva Theme Engine Integration Analysis

**Milestone**: Milestone 1 — Theme & Token Architecture Exploration  
**Agent**: Explorer 2  
**Working Directory**: `c:\Users\falah\Documents\Falah\Apps\portiva\.agents\teamwork_preview_explorer_m1_2`  
**Date**: 2026-08-03  

---

## 1. Executive Summary & Architectural Vision

Portiva is a Next.js 16 + React 19 visual website builder platform supporting multi-tenant template customization, real-time draft previews, and persistent user themes stored as `JSONB` in Supabase (`profiles.theme_config`).

This report provides the full architectural blueprint for integrating the **AuraSalon luxury editorial visual identity**—designed for high-end bridal makeup artists, luxury beauty salons, and editorial stylists—into Portiva's CSS variable engine and Tailwind v4 design system.

### Core Aesthetic Philosophy
- **Palette**: Warm ivory (`#FBF9F5`), soft cream (`#F3EFEA`), off-white hover (`#EBE5DE`), deep charcoal / soft black (`#1A1816` / `#2A2421`), muted taupe / champagne accent (`#C29B7F`), and subtle blush undertones (`#F7EBE6`).
- **Typography**: High-contrast editorial serif typography (`Cormorant Garamond` / `Instrument Serif`) paired with crisp, modern sans-serif UI labels (`Plus Jakarta Sans` / `Inter`) and italic editorial highlights.
- **Strict Anti-Patterns**: Absolute exclusion of purple SaaS tech gradients (`from-indigo-600 to-purple-600`), neon glowing blobs (`shadow-glow`), and dark glassmorphic tech overlays.

---

## 2. Portiva Theme System Architecture

Portiva's theme engine consists of three decoupled layers:

```
┌─────────────────────────────────────────────────────────────┐
│ 1. Database Storage / Presets (theme.types.ts)               │
│    ThemeConfig JSON stored in profiles.theme_config          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. Runtime CSS Variable Injector (ThemeProvider.tsx)         │
│    Converts ThemeConfig -> inline --theme-* CSS custom vars  │
│    Renders wrapper div with `className="contents"`           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. Utility Classes (Tailwind v4 @theme inline in globals.css)│
│    Maps --color-theme-* to var(--theme-*) with fallbacks     │
│    Generates bg-theme-*, text-theme-*, border-theme-*        │
└─────────────────────────────────────────────────────────────┘
```

### 2.1 ThemeConfig Interface (`src/lib/theme.types.ts`)
The `ThemeConfig` interface defines 10 core semantic color slots and optional section-level slot overrides:

```typescript
export interface ThemeConfig {
  primary: string;       // Brand accent / primary buttons / highlights
  primaryHover: string;  // Hover state of primary
  background: string;    // Page-level background
  surface: string;       // Card / panel / container backgrounds
  surfaceHover: string;  // Hovered card / panel state
  foreground: string;    // Primary body text color
  muted: string;         // Secondary / caption text color
  border: string;        // Dividers, card outlines, subtle borders
  accent: string;        // Secondary accent (e.g. badges, tag highlights)
  accentHover: string;   // Hover state of accent
  cardBg?: string;       // Card background override
  cardText?: string;     // Card text override
  cardMuted?: string;    // Card muted text override
  heroBg?: string;       // Hero section background override
  heroText?: string;     // Hero section text override
  footerBg?: string;     // Footer section background override
  footerText?: string;   // Footer section text override
}
```

### 2.2 CSS Variable Utilities (`themeConfigToCSSVars`)
The pure function `themeConfigToCSSVars()` maps a `ThemeConfig` object to CSS custom properties:

```typescript
export function themeConfigToCSSVars(config: ThemeConfig): CSSProperties {
  return {
    '--theme-primary': config.primary,
    '--theme-primary-hover': config.primaryHover,
    '--theme-background': config.background,
    '--theme-surface': config.surface,
    '--theme-surface-hover': config.surfaceHover,
    '--theme-foreground': config.foreground,
    '--theme-muted': config.muted,
    '--theme-border': config.border,
    '--theme-accent': config.accent,
    '--theme-accent-hover': config.accentHover,
    '--theme-card-bg': config.cardBg || config.surface,
    '--theme-card-text': config.cardText || config.foreground,
    '--theme-card-muted': config.cardMuted || config.muted,
    '--theme-hero-bg': config.heroBg || config.surface,
    '--theme-hero-text': config.heroText || config.background,
    '--theme-footer-bg': config.footerBg || config.surface,
    '--theme-footer-text': config.footerText || config.background,
  } as CSSProperties;
}
```

### 2.3 Tailwind v4 Integration (`src/app/globals.css`)
In Tailwind v4, design tokens are configured in CSS using `@theme inline`. The semantic theme variables map directly to custom properties:

```css
@theme inline {
  --color-theme-primary: var(--theme-primary, #6366F1);
  --color-theme-primary-hover: var(--theme-primary-hover, #818CF8);
  --color-theme-background: var(--theme-background, #09090B);
  --color-theme-surface: var(--theme-surface, #0F0F12);
  --color-theme-surface-hover: var(--theme-surface-hover, #1C1C21);
  --color-theme-foreground: var(--theme-foreground, #F4F4F5);
  --color-theme-muted: var(--theme-muted, #A1A1AA);
  --color-theme-border: var(--theme-border, rgba(255, 255, 255, 0.09));
  --color-theme-accent: var(--theme-accent, #22C55E);
  --color-theme-accent-hover: var(--theme-accent-hover, #16A34A);
}
```

Because Tailwind v4 automatically parses `--color-*` definitions inside `@theme inline`, the following utility class namespaces are created out of the box:
- `bg-theme-primary`, `bg-theme-background`, `bg-theme-surface`, `bg-theme-surface-hover`, `bg-theme-accent`
- `text-theme-foreground`, `text-theme-muted`, `text-theme-primary`, `text-theme-accent`
- `border-theme-border`, `border-theme-primary`, `border-theme-accent`
- `ring-theme-primary`, `divide-theme-border`

### 2.4 Component-Level Theme Hydration (`ThemeProvider.tsx`)
`ThemeProvider.tsx` receives `theme: ThemeConfig` and outputs:
```tsx
<div style={cssVars} className="contents">
  {children}
</div>
```
Using `display: contents` allows the wrapper element to inject `--theme-*` custom properties while remaining invisible in the DOM layout, so CSS inheritance naturally passes variables to all descendant components.

---

## 3. AuraSalon Luxury Editorial Design Token Mapping

To achieve the warm ivory and luxury editorial aesthetic, the design tokens map to `AURA_SALON_THEME` as follows:

| Semantic Slot | Hex / Value | Description & Visual Usage | Tailwind Utility Class |
|---|---|---|---|
| `background` | `#FBF9F5` | Warm Ivory — main page background | `bg-theme-background` |
| `surface` | `#F3EFEA` | Soft Cream — card, package, section containers | `bg-theme-surface` |
| `surfaceHover` | `#EBE5DE` | Pale Cream — interactive hover state for surface items | `hover:bg-theme-surface-hover` |
| `foreground` | `#1A1816` | Deep Charcoal — primary body text, titles, icons | `text-theme-foreground` |
| `primary` | `#2A2421` | Soft Black / Dark Velvet — primary CTA background, prominent headlines | `bg-theme-primary`, `text-theme-primary` |
| `primaryHover` | `#423B36` | Dark Charcoal — hover state for primary CTA | `hover:bg-theme-primary-hover` |
| `muted` | `#78726A` | Muted Warm Taupe — secondary subtitles, dates, captions | `text-theme-muted` |
| `border` | `rgba(26, 24, 22, 0.12)` | Subtle Charcoal Outline — card borders, dividers | `border-theme-border` |
| `accent` | `#C29B7F` | Warm Champagne / Rose Taupe — badge outlines, pricing highlights, stars | `text-theme-accent`, `bg-theme-accent` |
| `accentHover` | `#A88267` | Deep Champagne — hover state for accent elements | `hover:bg-theme-accent-hover` |

### 3.1 Section Slot Overrides
- `cardBg`: `#FFFFFF` (Pure warm white for highlighted pricing cards)
- `cardText`: `#1A1816` (Deep charcoal text inside cards)
- `cardMuted`: `#78726A` (Muted taupe inside cards)
- `heroBg`: `#2A2421` (Soft velvet black hero backdrop overlay)
- `heroText`: `#FBF9F5` (Warm ivory text over hero media)
- `footerBg`: `#1F1A17` (Deep soft black footer background)
- `footerText`: `#FBF9F5` (Warm ivory text in footer)

### 3.2 Supplemental Editorial Palette & Accent Tints
- **Blush Soft Overlay**: `rgba(247, 235, 230, 0.6)` or `#F7EBE6` (Used for subtle badge backgrounds & package highlights)
- **Champagne Gold Highlight**: `#D4AF37` (Alternative accent for star ratings and awards)
- **Warm Sand Divider**: `rgba(42, 36, 33, 0.08)` (Ultra-subtle section dividers)

---

## 4. Typography Specifications & Font Definitions

Luxury editorial design relies heavily on font contrast between classic serif display headings and clean sans-serif metadata labels.

### 4.1 Imported Google Fonts (`src/app/globals.css`)
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Instrument+Serif:ital@0;1&display=swap');
```

### 4.2 Utility Classes for Typography
Portiva provides two dedicated editorial serif classes in `globals.css`:
```css
/* Editorial Font Utilities */
.font-editorial {
  font-family: 'Cormorant Garamond', Georgia, serif;
}

.font-editorial-serif {
  font-family: 'Instrument Serif', 'Cormorant Garamond', Georgia, serif;
}
```

### 4.3 Typography Usage Matrix for AuraSalon

| Component Element | Recommended Font Class | Size & Weight | Letter Spacing / Case | Example Output |
|---|---|---|---|---|
| **Main Artist Headline (H1)** | `font-editorial-serif` or `font-editorial` | `text-5xl md:text-7xl lg:text-8xl font-normal` | `tracking-tight leading-[0.95]` | *Ananya Sharma* |
| **Section Headings (H2)** | `font-editorial` | `text-3xl md:text-5xl font-light` | `tracking-normal` | *The Lookbook* |
| **Package Names (H3)** | `font-editorial` | `text-2xl font-semibold` | `tracking-tight` | *Royal Bridal Package* |
| **Editorial Italic Highlights** | `font-editorial italic` | `font-normal text-theme-accent` | `italic` | *Art of Transformation* |
| **Nav Links & UI Labels** | `font-sans` | `text-[11px] md:text-xs font-semibold` | `uppercase tracking-[0.2em]` | `BRIDAL SERVICES` |
| **Badges & Tag Chips** | `font-sans` | `text-[10px] font-bold` | `uppercase tracking-widest` | `AIRBRUSH MAKEUP` |
| **Body / Feature Lists** | `font-sans` | `text-sm font-normal text-theme-muted` | `leading-relaxed` | `Full-day on-site support` |

---

## 5. Preset System Integration & Dynamic Override Flow

### 5.1 Preset Theme Constant (`src/lib/theme.types.ts`)
The `AURA_SALON_THEME` preset constant is defined in `src/lib/theme.types.ts` as:

```typescript
export const AURA_SALON_THEME: ThemeConfig = {
  primary: '#2A2421',
  primaryHover: '#423B36',
  background: '#FBF9F5',
  surface: '#F3EFEA',
  surfaceHover: '#EBE5DE',
  foreground: '#1A1816',
  muted: '#78726A',
  border: 'rgba(26, 24, 22, 0.12)',
  accent: '#C29B7F',
  accentHover: '#A88267',
};
```

### 5.2 Inspector Sidebar Palette Registration (`src/components/engine/InspectorSidebar.tsx`)
To make `AuraSalon` selectable in the editor dashboard, `THEME_PALETTES` in `InspectorSidebar.tsx` includes:

```typescript
{
  id: 'aurasalon',
  name: 'AuraSalon Editorial (Warm Ivory & Champagne)',
  background: '#FBF9F5',
  surface: '#F3EFEA',
  foreground: '#1A1816',
  primary: '#2A2421',
  border: 'rgba(26, 24, 22, 0.12)',
  muted: '#78726A',
  cardBg: '#FFFFFF',
  cardText: '#1A1816',
  cardMuted: '#78726A',
  heroBg: '#2A2421',
  heroText: '#FBF9F5',
  footerBg: '#1F1A17',
  footerText: '#FBF9F5',
}
```

### 5.3 Custom Theme Overrides Execution Flow
1. **User Action**: Creator opens the Inspector Sidebar in Portiva Dashboard and modifies `accent` color from `#C29B7F` to `#D4AF37` (Champagne Gold).
2. **State Mutation**: `updateThemeColor('accent', '#D4AF37')` mutates `VisualBuilderContext.templateData.theme.accent`.
3. **Re-rendering**: `ThemeProvider` recalculates `extendedThemeConfigToCSSVars(theme)`, updating `--theme-accent: #D4AF37`.
4. **DOM Reaction**: Descendant Tailwind classes like `text-theme-accent` and `bg-theme-accent` immediately evaluate to `#D4AF37`. No layout shifts or page reloads occur.

---

## 6. Tailwind v4 Utility Class Recommendations & Anti-Patterns

### 6.1 Recommended Utility Class Patterns

#### A. Luxury Card Container
```tsx
<div className="bg-theme-surface border border-theme-border/60 rounded-2xl p-8 hover:bg-theme-surface-hover hover:border-theme-accent/40 transition-all duration-300 shadow-sm">
  ...
</div>
```

#### B. Primary CTA Button (Soft Black Velvet)
```tsx
<button className="bg-theme-primary text-theme-background hover:bg-theme-primary-hover px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200 shadow-md">
  Book Consultation
</button>
```

#### C. Secondary CTA Button (Outlined Champagne)
```tsx
<button className="border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-theme-background px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-200">
  Explore Packages
</button>
```

#### D. Category / Rating Badge (Subtle Blush Pill)
```tsx
<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F7EBE6] border border-theme-accent/30 text-theme-foreground text-[11px] font-semibold uppercase tracking-widest">
  <Star className="w-3.5 h-3.5 fill-[#C29B7F] text-[#C29B7F]" />
  <span>4.9 / 5.0 Rating</span>
</div>
```

#### E. Hero Backdrop Gradient Overlay
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-theme-background/80 via-theme-background/40 to-theme-background pointer-events-none" />
```

### 6.2 Prohibited Anti-Patterns

| Anti-Pattern Class / Style | Why Prohibited | Editorial Replacement |
|---|---|---|
| `bg-gradient-to-r from-indigo-600 to-purple-600` | Purple SaaS startup aesthetic | `bg-theme-surface` or `bg-[#F7EBE6]` |
| `shadow-glow` / `shadow-glow-lg` | Neon glowing tech effect | `shadow-sm` or `shadow-md` |
| `glass` (`rgba(15, 15, 18, 0.75)` backdrop blur) | Dark tech glassmorphism | `bg-white/70 backdrop-blur-md border border-theme-border/30` |
| `text-slate-400` / `text-zinc-500` | Hardcoded cold greys | `text-theme-muted` (`#78726A`) |
| `rounded-none` / Brutalist harsh edges | Misaligned with soft luxury beauty | `rounded-2xl` or `rounded-full` |

---

## 7. Conclusion & Next Steps for Implementation

1. **Preset Verification**: `AURA_SALON_THEME` is correctly defined in `src/lib/theme.types.ts`.
2. **Template Verification**: `AuraSalon.tsx` component correctly consumes `bg-theme-background`, `text-theme-foreground`, `bg-theme-surface`, `border-theme-border`, and `font-serif` / `font-editorial`.
3. **Inspector Sync**: Ensure `aurasalon` palette option is available in dashboard controls for creator selection.
4. **Typography Consistency**: Validate that all heading elements in `AuraSalon.tsx` use `.font-editorial` or `.font-editorial-serif` with high contrast serif styling.

---
*Report compiled by Explorer 2 for Milestone 1.*
