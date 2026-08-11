/**
 * =============================================================================
 * PORTIVA: Theme Engine — Type Definitions, Presets & Utilities
 * =============================================================================
 *
 * This module defines the portable theme configuration contract used across
 * the entire Portiva platform. A ThemeConfig is a plain JSON object (stored
 * as JSONB in the profiles.theme_config column) that maps semantic color
 * "slots" to hex values.
 *
 * Architecture:
 *   1. ThemeConfig interface — the shape of the JSON stored in Supabase
 *   2. Preset theme constants — one per template aesthetic
 *   3. themeConfigToCSSVars() — converts a ThemeConfig into a React
 *      CSSProperties object that the ThemeProvider injects inline
 *   4. ElementStyleOverride — per-element style overrides
 *   5. MediaOverride — per-image replacement overrides
 *   6. ButtonOverride — per-button property overrides
 *
 * The CSS variable names (--theme-*) match the fallback references in
 * globals.css's @theme inline block, so any ThemeProvider override
 * instantly repaints all Tailwind classes using the semantic tokens
 * (e.g., bg-theme-background, text-theme-primary).
 */

import type { CSSProperties } from 'react';
import type { BentoBioConfig } from '@/lib/bentobio';

// =============================================================================
// Theme Configuration Interface
// =============================================================================

/**
 * Portable theme configuration stored as JSONB in profiles.theme_config.
 *
 * Each field maps to a semantic CSS custom property:
 *   primary       → --theme-primary       (brand accent, CTAs, highlights)
 *   primaryHover  → --theme-primary-hover  (hover state of primary)
 *   background    → --theme-background     (page-level background)
 *   surface       → --theme-surface        (card/panel backgrounds)
 *   surfaceHover  → --theme-surface-hover  (hovered card state)
 *   foreground    → --theme-foreground     (primary text color)
 *   muted         → --theme-muted          (secondary/placeholder text)
 *   border        → --theme-border         (dividers, card borders)
 *   accent        → --theme-accent         (secondary accent, e.g., WhatsApp green)
 *   accentHover   → --theme-accent-hover   (hover state of accent)
 */
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

/**
 * Extended theme configuration with typography, spacing, and radius tokens.
 * These are injected as CSS custom properties by the ThemeProvider.
 */
export interface ExtendedThemeConfig extends ThemeConfig {
  // Typography
  fontFamily?: string;
  headingFontFamily?: string;
  baseFontSize?: string;

  // Border Radius
  radiusSm?: string;
  radiusMd?: string;
  radiusLg?: string;
  radiusXl?: string;

  // Shadows
  shadowSm?: string;
  shadowMd?: string;
  shadowLg?: string;
}

// =============================================================================
// Per-Element Override Types (Visual Editor)
// =============================================================================

/**
 * Per-element style overrides applied via the visual editor's inspector.
 * Keyed by elementId in the VisualBuilderContext.styleOverrides map.
 *
 * When a user selects an element and modifies its properties through
 * the inspector sidebar, the override is stored here. Elements without
 * overrides inherit from the global theme CSS variables.
 */
export interface ElementStyleOverride {
  // Colors
  backgroundColor?: string;
  color?: string;
  borderColor?: string;

  // Box model
  borderWidth?: string;
  borderRadius?: string;
  padding?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  margin?: string;
  marginTop?: string;
  marginRight?: string;
  marginBottom?: string;
  marginLeft?: string;

  // Effects
  opacity?: number;
  boxShadow?: string;

  // Layout
  gap?: string;

  // Typography (for text elements)
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;

  // Hover states — applied when hovering over the element in public view
  hoverBackgroundColor?: string;
  hoverColor?: string;
  hoverBorderColor?: string;
  hoverOpacity?: number;
  hoverScale?: string;
}

/**
 * Per-image override for replacing media assets.
 * Keyed by imageKey in the VisualBuilderContext.mediaOverrides map.
 */
export interface MediaOverride {
  /** The replacement image URL (can be S3 presigned URL, base64, or external URL) */
  src: string;
  /** Accessible alt text for the image */
  alt?: string;
  /** CSS object-fit property */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

/**
 * Per-button override for fully customizing button elements.
 * Keyed by buttonKey in the VisualBuilderContext.buttonOverrides map.
 */
export interface ButtonOverride {
  /** Button label text */
  text?: string;
  /** Destination URL */
  href?: string;
  /** Whether to open the link in a new tab */
  openInNewTab?: boolean;

  // Styling
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  borderRadius?: string;
  borderWidth?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;

  // Hover states
  hoverBackgroundColor?: string;
  hoverColor?: string;
  hoverBorderColor?: string;
}

/**
 * History entry for undo/redo support.
 * Captures a snapshot of all override maps at a point in time.
 */
export interface HistoryEntry {
  timestamp: number;
  label: string;
  snapshot: {
    textColors: Record<string, string>;
    textOverrides?: Record<string, string>;
    styleOverrides: Record<string, ElementStyleOverride>;
    mediaOverrides: Record<string, MediaOverride>;
    buttonOverrides: Record<string, ButtonOverride>;
    theme: ThemeConfig;
    bentoBioConfig?: BentoBioConfig;
  };
}

/**
 * Converts an ElementStyleOverride into a CSSProperties object.
 * Filters out undefined values and hover-state properties (which are
 * applied separately via onMouseEnter/onMouseLeave handlers).
 */
export function styleOverrideToCSSProperties(
  override: ElementStyleOverride | undefined,
): CSSProperties {
  if (!override) return {};

  const result: Record<string, unknown> = {};

  // Direct CSS properties mapping
  const directMappings: Record<string, keyof ElementStyleOverride> = {
    backgroundColor: 'backgroundColor',
    color: 'color',
    borderColor: 'borderColor',
    borderWidth: 'borderWidth',
    borderRadius: 'borderRadius',
    padding: 'padding',
    paddingTop: 'paddingTop',
    paddingRight: 'paddingRight',
    paddingBottom: 'paddingBottom',
    paddingLeft: 'paddingLeft',
    margin: 'margin',
    marginTop: 'marginTop',
    marginRight: 'marginRight',
    marginBottom: 'marginBottom',
    marginLeft: 'marginLeft',
    opacity: 'opacity',
    boxShadow: 'boxShadow',
    gap: 'gap',
    fontSize: 'fontSize',
    fontWeight: 'fontWeight',
    fontFamily: 'fontFamily',
    lineHeight: 'lineHeight',
    letterSpacing: 'letterSpacing',
    textAlign: 'textAlign',
  };

  for (const [cssProp, overrideKey] of Object.entries(directMappings)) {
    const val = override[overrideKey];
    if (val !== undefined && val !== '' && val !== null) {
      result[cssProp] = val;
    }
  }

  // Add borderStyle when borderWidth is set
  if (override.borderWidth) {
    result.borderStyle = 'solid';
  }

  return result as CSSProperties;
}

/**
 * Extracts hover-state properties from an ElementStyleOverride
 * and returns them as a CSSProperties object.
 */
export function styleOverrideToHoverCSS(
  override: ElementStyleOverride | undefined,
): CSSProperties {
  if (!override) return {};

  const result: Record<string, unknown> = {};

  if (override.hoverBackgroundColor) result.backgroundColor = override.hoverBackgroundColor;
  if (override.hoverColor) result.color = override.hoverColor;
  if (override.hoverBorderColor) result.borderColor = override.hoverBorderColor;
  if (override.hoverOpacity !== undefined) result.opacity = override.hoverOpacity;
  if (override.hoverScale) result.transform = `scale(${override.hoverScale})`;

  return result as CSSProperties;
}

// =============================================================================
// Preset Themes & Single Source of Truth
// =============================================================================

/** Default Portiva dark theme — Midnight Sapphire & Indigo */
export const DEFAULT_THEME: ThemeConfig = {
  primary: '#6366F1',
  primaryHover: '#818CF8',
  background: '#09090B',
  surface: '#0F0F12',
  surfaceHover: '#1C1C21',
  foreground: '#F4F4F5',
  muted: '#A1A1AA',
  border: 'rgba(255, 255, 255, 0.1)',
  accent: '#22C55E',
  accentHover: '#16A34A',
};

/** Apex Fit preset — High-Energy Acid Lime & Charcoal Dark */
export const APEX_FIT_THEME: ThemeConfig = {
  primary: '#C1FF00',
  primaryHover: '#D2FF33',
  background: '#080907',
  surface: '#10120E',
  surfaceHover: '#181B15',
  foreground: '#F4F4F6',
  muted: '#A1A1AA',
  border: 'rgba(255, 255, 255, 0.12)',
  accent: '#C1FF00',
  accentHover: '#D2FF33',
};

/** Aurik preset — Swiss brutalist, monochrome white + crimson red accent */
export const AURIK_THEME: ThemeConfig = {
  primary: '#DC2626',
  primaryHover: '#EF4444',
  background: '#FFFFFF',
  surface: '#FAFAFA',
  surfaceHover: '#F5F5F4',
  foreground: '#0A0A0A',
  muted: '#71717A',
  border: 'rgba(0, 0, 0, 0.1)',
  accent: '#DC2626',
  accentHover: '#B91C1C',
};

/** Nitec preset — Soft futuristic Apple-inspired warm cream layout */
export const NITEC_THEME: ThemeConfig = {
  primary: '#171715',
  primaryHover: '#0A0A09',
  background: '#F4F4EE',
  surface: '#FFFFFF',
  surfaceHover: '#F8F8F4',
  foreground: '#171715',
  muted: '#787870',
  border: '#E3E3DC',
  accent: '#6366f1',
  accentHover: '#4F46E5',
};

/** SnapMaster preset — High-contrast forest green + electric neon lime */
export const SNAPMASTER_THEME: ThemeConfig = {
  primary: '#C5FF2E',
  primaryHover: '#D4FF5C',
  background: '#0A1A0F',
  surface: '#0F2517',
  surfaceHover: '#153320',
  foreground: '#F4F4F5',
  muted: '#94A3B8',
  border: 'rgba(197, 255, 46, 0.2)',
  accent: '#C5FF2E',
  accentHover: '#D4FF5C',
};

/** Monaco Luxe preset — Ultra-luxury Champagne Gold + Deep Velvet Onyx */
export const MONACO_THEME: ThemeConfig = {
  primary: '#D4AF37',
  primaryHover: '#E5C158',
  background: '#0A0A0D',
  surface: '#14141A',
  surfaceHover: '#1C1C24',
  foreground: '#F7F7F8',
  muted: '#9E9EA7',
  border: 'rgba(212, 175, 55, 0.25)',
  accent: '#D4AF37',
  accentHover: '#E5C158',
};

/** AuraSalon preset — Editorial Luxury Warm Ivory & Muted Champagne */
export const AURA_SALON_THEME: ThemeConfig = {
  primary: '#1C1B18',
  primaryHover: '#33302B',
  background: '#FAF7F2',
  surface: '#F0EADF',
  surfaceHover: '#E5DDCF',
  foreground: '#181715',
  muted: '#6E665E',
  border: 'rgba(24, 23, 21, 0.12)',
  accent: '#B38E6E',
  accentHover: '#967456',
};

/** Estate Prime preset — Soft Warm Alabaster, Champagne Gold & Charcoal */
export const ESTATE_PRIME_THEME: ThemeConfig = {
  primary: '#A88B68',
  primaryHover: '#947855',
  background: '#FAF8F5',
  surface: '#FFFFFF',
  surfaceHover: '#F5F2EB',
  foreground: '#1C1B18',
  muted: '#78736A',
  border: '#E8E4DC',
  accent: '#A88B68',
  accentHover: '#947855',
};

/** Café Aroma preset — Warm Cream & Espresso */
export const CAFE_AROMA_THEME: ThemeConfig = {
  primary: '#2B1C16',
  primaryHover: '#422B22',
  background: '#F7F3EE',
  surface: '#EDE5DB',
  surfaceHover: '#E2D7C8',
  foreground: '#2B1C16',
  muted: '#6C564C',
  border: '#D8CEBE',
  accent: '#C25E00',
  accentHover: '#9E4B00',
};

/** Forest Matcha preset — Sage & Emerald */
export const MATCHA_THEME: ThemeConfig = {
  primary: '#1B2B20',
  primaryHover: '#2A4031',
  background: '#F2F5F0',
  surface: '#E3E9DF',
  surfaceHover: '#D4DFCF',
  foreground: '#1B2B20',
  muted: '#526657',
  border: '#CBD6C7',
  accent: '#2D6A4F',
  accentHover: '#1E4835',
};

/** Solar Amber preset — Tuscan Ochre & Amber */
export const SOLAR_THEME: ThemeConfig = {
  primary: '#2C1E14',
  primaryHover: '#422E1F',
  background: '#FAF6F0',
  surface: '#EFE6DA',
  surfaceHover: '#E4D7C5',
  foreground: '#2C1E14',
  muted: '#735B49',
  border: '#DECDBA',
  accent: '#D97706',
  accentHover: '#B45309',
};

/** Nordic Slate preset — Ocean Drift & Sapphire */
export const NORDIC_THEME: ThemeConfig = {
  primary: '#15202E',
  primaryHover: '#223247',
  background: '#F0F3F7',
  surface: '#E1E7EF',
  surfaceHover: '#D2DCE8',
  foreground: '#15202E',
  muted: '#5B6E85',
  border: '#C7D3E2',
  accent: '#2563EB',
  accentHover: '#1D4ED8',
};

/** Brutalist Light preset — Steel & Cobalt */
export const BRUTALIST_LIGHT_THEME: ThemeConfig = {
  primary: '#09090B',
  primaryHover: '#27272A',
  background: '#FAFAFA',
  surface: '#F1F1F4',
  surfaceHover: '#E4E4E9',
  foreground: '#09090B',
  muted: '#64646E',
  border: '#E4E4E7',
  accent: '#2563EB',
  accentHover: '#1D4ED8',
};

/** Nothing Dark preset — Obsidian & Crimson */
export const NOTHING_DARK_THEME: ThemeConfig = {
  primary: '#DC2626',
  primaryHover: '#EF4444',
  background: '#09090B',
  surface: '#141417',
  surfaceHover: '#1F1F24',
  foreground: '#FAFAFA',
  muted: '#A1A1AA',
  border: 'rgba(255, 255, 255, 0.12)',
  accent: '#DC2626',
  accentHover: '#B91C1C',
};

/** Mentrox Executive preset — Obsidian & Electric Blue */
export const MENTROX_THEME: ThemeConfig = {
  primary: '#244BFF',
  primaryHover: '#1E3BFF',
  background: '#060608',
  surface: '#0E0E14',
  surfaceHover: '#161622',
  foreground: '#FAFAFA',
  muted: '#9CA3AF',
  border: 'rgba(255, 255, 255, 0.08)',
  accent: '#7B9AFF',
  accentHover: '#5B7AFF',
};

/**
 * Unified list of curated theme presets.
 * Shared between the engine, InspectorSidebar, and database defaults.
 */
export const THEME_PRESETS_LIST: (ThemeConfig & { id: string; name: string })[] = [
  { id: 'mentorx', name: 'Mentrox Executive (Obsidian & Electric Blue)', ...MENTROX_THEME },
  { id: 'apexfit', name: 'Apex Fit (Acid Lime & Deep Charcoal)', ...APEX_FIT_THEME },
  { id: 'aurasalon', name: 'Aura Salon (Couture Ivory & Rose Gold)', ...AURA_SALON_THEME },
  { id: 'monacoluxe', name: 'Monaco Luxe (Champagne Gold & Velvet)', ...MONACO_THEME },
  { id: 'aurabrew', name: 'Café Aroma (Warm Cream & Espresso)', ...CAFE_AROMA_THEME },
  { id: 'matcha', name: 'Forest Matcha (Sage & Emerald)', ...MATCHA_THEME },
  { id: 'solar', name: 'Solar Amber (Tuscan Ochre & Amber)', ...SOLAR_THEME },
  { id: 'nordic', name: 'Nordic Slate (Ocean Drift & Sapphire)', ...NORDIC_THEME },
  { id: 'nothing', name: 'Brutalist Light (Steel & Cobalt)', ...BRUTALIST_LIGHT_THEME },
  { id: 'nothingdark', name: 'Nothing Dark (Obsidian & Crimson)', ...NOTHING_DARK_THEME },
  { id: 'snapmaster', name: 'Snap Master (Forest & Neon Lime)', ...SNAPMASTER_THEME },
];

// =============================================================================
// Default Extended Theme Tokens
// =============================================================================

export const DEFAULT_EXTENDED_TOKENS: Omit<ExtendedThemeConfig, keyof ThemeConfig> = {
  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
  headingFontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
  baseFontSize: '16px',
  radiusSm: '4px',
  radiusMd: '8px',
  radiusLg: '12px',
  radiusXl: '16px',
  shadowSm: '0 1px 2px rgba(0,0,0,0.05)',
  shadowMd: '0 4px 6px -1px rgba(0,0,0,0.1)',
  shadowLg: '0 10px 15px -3px rgba(0,0,0,0.1)',
};

// =============================================================================
// CSS Variable Conversion Utility
// =============================================================================

/**
 * Converts a ThemeConfig JSON object into a React CSSProperties object
 * containing CSS custom property overrides.
 *
 * The resulting object is spread onto a wrapper element's `style` prop
 * by ThemeProvider. Because the @theme tokens in globals.css reference
 * these variables with fallbacks (e.g., `var(--theme-primary, #6366f1)`),
 * setting them on an ancestor element overrides the defaults via CSS
 * inheritance — instantly repainting all descendant components.
 *
 * @example
 * const vars = themeConfigToCSSVars({ primary: '#DC2626', ... });
 * // Returns: { '--theme-primary': '#DC2626', '--theme-primary-hover': '...', ... }
 */
export function themeConfigToCSSVars(config: ThemeConfig): CSSProperties {
  const primaryLum = getLuminance(config.primary);
  const primaryText = config.cardText || (primaryLum > 0.45 ? '#060608' : '#FFFFFF');
  const accentLum = getLuminance(config.accent);
  const accentText = accentLum > 0.45 ? '#060608' : '#FFFFFF';

  return {
    '--theme-primary': config.primary,
    '--theme-primary-hover': config.primaryHover,
    '--theme-primary-text': primaryText,
    '--theme-background': config.background,
    '--theme-surface': config.surface,
    '--theme-surface-hover': config.surfaceHover,
    '--theme-foreground': config.foreground,
    '--theme-muted': config.muted,
    '--theme-border': config.border,
    '--theme-accent': config.accent,
    '--theme-accent-hover': config.accentHover,
    '--theme-accent-text': accentText,
    '--theme-card-bg': config.cardBg || config.surface,
    '--theme-card-text': config.cardText || config.foreground,
    '--theme-card-muted': config.cardMuted || config.muted,
    '--theme-hero-bg': config.heroBg || config.surface,
    '--theme-hero-text': config.heroText || config.background,
    '--theme-footer-bg': config.footerBg || config.surface,
    '--theme-footer-text': config.footerText || config.background,
  } as CSSProperties;
}

/**
 * Converts an ExtendedThemeConfig into CSS variables including typography,
 * spacing, and radius tokens — in addition to the base color tokens.
 */
export function extendedThemeConfigToCSSVars(
  config: ThemeConfig,
  extended?: Partial<Omit<ExtendedThemeConfig, keyof ThemeConfig>>,
): CSSProperties {
  const base = themeConfigToCSSVars(config);
  const ext = { ...DEFAULT_EXTENDED_TOKENS, ...extended };

  return {
    ...base,
    // Typography
    '--theme-font-family': ext.fontFamily,
    '--theme-font-family-heading': ext.headingFontFamily,
    '--theme-font-size-base': ext.baseFontSize,
    // Border Radius
    '--theme-radius-sm': ext.radiusSm,
    '--theme-radius-md': ext.radiusMd,
    '--theme-radius-lg': ext.radiusLg,
    '--theme-radius-xl': ext.radiusXl,
    // Shadows
    '--theme-shadow-sm': ext.shadowSm,
    '--theme-shadow-md': ext.shadowMd,
    '--theme-shadow-lg': ext.shadowLg,
  } as CSSProperties;
}

/**
 * Calculates relative luminance of a hex color (0 = black, 1 = white).
 */
export function getLuminance(hex: string): number {
  if (!hex || typeof hex !== 'string') return 0.5;
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length < 6) return 0.5;
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;
  const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Ensures that a ThemeConfig satisfies WCAG contrast requirements
 * between background/surface and foreground/muted text.
 * Prevents invisible text or broken color combinations.
 */
export function ensureThemeContrast(config: ThemeConfig): ThemeConfig {
  const bgLum = getLuminance(config.background);
  const fgLum = getLuminance(config.foreground);

  const result = { ...config };

  const isBgLight = bgLum > 0.45;
  const isFgLight = fgLum > 0.45;

  // 1. Ensure Foreground text has strong contrast against Background & Surface
  if (isBgLight && isFgLight) {
    result.foreground = '#181715';
    result.muted = '#6E665E';
  } else if (!isBgLight && !isFgLight) {
    result.foreground = '#F7F7F8';
    result.muted = '#9E9EA7';
  }

  // 2. Ensure Surface has distinct contrast vs Background (not identical)
  if (config.surface.toLowerCase() === config.background.toLowerCase()) {
    result.surface = isBgLight ? '#F0EADF' : '#14141A';
    result.surfaceHover = isBgLight ? '#E5DDCF' : '#1C1C24';
  }

  // 3. Ensure Primary & Accent have hovers
  if (!result.primaryHover) {
    result.primaryHover = result.primary;
  }
  if (!result.accentHover) {
    result.accentHover = result.accent;
  }
  if (!result.surfaceHover) {
    result.surfaceHover = result.surface;
  }

  return result;
}

/**
 * Merges a partial theme config with the default theme.
 * Useful when the database only stores overridden fields.
 *
 * @example
 * const theme = resolveTheme({ primary: '#DC2626' });
 * // Returns DEFAULT_THEME with primary overridden to '#DC2626'
 */
export function resolveTheme(partial: Partial<ThemeConfig>): ThemeConfig {
  return ensureThemeContrast({ ...DEFAULT_THEME, ...partial });
}

// =============================================================================
// Curated Font List for Visual Editor
// =============================================================================

export const FONT_OPTIONS = [
  { label: 'Inter', value: "'Inter', system-ui, sans-serif" },
  { label: 'Roboto', value: "'Roboto', system-ui, sans-serif" },
  { label: 'Open Sans', value: "'Open Sans', system-ui, sans-serif" },
  { label: 'Outfit', value: "'Outfit', system-ui, sans-serif" },
  { label: 'Poppins', value: "'Poppins', system-ui, sans-serif" },
  { label: 'Montserrat', value: "'Montserrat', system-ui, sans-serif" },
  { label: 'Lato', value: "'Lato', system-ui, sans-serif" },
  { label: 'Playfair Display', value: "'Playfair Display', serif" },
  { label: 'Space Grotesk', value: "'Space Grotesk', system-ui, sans-serif" },
  { label: 'DM Sans', value: "'DM Sans', system-ui, sans-serif" },
  { label: 'Plus Jakarta Sans', value: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { label: 'Source Sans 3', value: "'Source Sans 3', system-ui, sans-serif" },
  { label: 'System Default', value: "system-ui, -apple-system, sans-serif" },
  { label: 'Serif', value: "Georgia, 'Times New Roman', serif" },
  { label: 'Monospace', value: "'JetBrains Mono', 'Fira Code', monospace" },
];
