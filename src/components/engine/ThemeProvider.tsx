/**
 * =============================================================================
 * PORTIVA: ThemeProvider — CSS Variable Injection Engine
 * =============================================================================
 *
 * Converts a ThemeConfig JSON object (from Supabase profiles.theme_config)
 * into inline CSS custom properties on a wrapper element. All descendant
 * components using semantic Tailwind classes (bg-bg-primary,
 * text-text-primary, etc.) automatically repaint when the theme changes.
 *
 * How it works:
 *   1. Receives a ThemeConfig prop (10 hex color values)
 *   2. Calls extendedThemeConfigToCSSVars() to produce a CSSProperties object
 *      that includes color tokens AND typography / radius / shadow tokens
 *   3. Renders a wrapper <div> with those properties as inline styles
 *   4. CSS inheritance propagates the variables to all children
 *   5. The @theme tokens in globals.css reference these variables with
 *      fallback defaults, so templates work with or without a ThemeProvider
 *
 * Extended tokens injected (in addition to the 10 color tokens):
 *   - Typography: --theme-font-family, --theme-font-family-heading,
 *     --theme-font-size-base
 *   - Border radius: --theme-radius-sm, --theme-radius-md,
 *     --theme-radius-lg, --theme-radius-xl, --theme-radius-card, --theme-radius-button
 *   - Shadows: --theme-shadow-sm, --theme-shadow-md, --theme-shadow-lg, --theme-shadow-card
 *
 * Design Decisions:
 *   - Uses `className="contents"` so the wrapper div doesn't affect layout.
 *     The CSS `display: contents` value makes the element invisible to the
 *     layout engine while preserving CSS property inheritance.
 *   - No React context needed — pure CSS inheritance is faster and works
 *     across server/client component boundaries.
 *   - The component is intentionally a client component to support dynamic
 *     theme switching in the dashboard editor without a full page reload.
 *   - Backward compatible: if `extended` is not passed, the
 *     DEFAULT_EXTENDED_TOKENS from theme.types are used automatically.
 *
 * Usage:
 *   <ThemeProvider theme={profileThemeConfig}>
 *     <AurikTemplate blocks={blocks} />
 *   </ThemeProvider>
 *
 *   // With extended overrides:
 *   <ThemeProvider
 *     theme={profileThemeConfig}
 *     extended={{ fontFamily: "'Playfair Display', serif", radiusLg: '16px' }}
 *   >
 *     <AurikTemplate blocks={blocks} />
 *   </ThemeProvider>
 */

'use client';

import React from 'react';
import { extendedThemeConfigToCSSVars, type ThemeConfig, type ExtendedThemeConfig } from '@/lib/theme.types';

// ─── Props ──────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  /** Theme configuration JSON from the database */
  theme: ThemeConfig;
  /**
   * Optional extended theme tokens (typography, border radius, shadows).
   * Merged on top of DEFAULT_EXTENDED_TOKENS — only the fields you provide
   * are overridden; everything else falls back to sensible defaults.
   */
  extended?: Partial<Omit<ExtendedThemeConfig, keyof ThemeConfig>>;
  /** Optional additional className for the wrapper */
  className?: string;
  /** Child components that will inherit the theme variables */
  children: React.ReactNode;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ThemeProvider({
  theme,
  extended,
  className,
  children,
}: ThemeProviderProps) {
  // Convert the JSON theme config (+ extended tokens) to CSS custom properties.
  // This is a pure function — no side effects, no state.
  // When `extended` is undefined the defaults from DEFAULT_EXTENDED_TOKENS
  // are used, keeping full backward compatibility.
  const baseCssVars = extendedThemeConfigToCSSVars(theme, extended);
  const cssVars = {
    ...baseCssVars,
    '--theme-shadow-card': 'var(--shadow-card, 0 4px 6px -1px rgba(0,0,0,0.1))',
    '--theme-radius-card': '20px',
    '--theme-radius-button': '10px',
  } as React.CSSProperties;

  return (
    <div
      style={cssVars}
      // `contents` makes this div invisible to layout while preserving
      // CSS variable inheritance to all descendant elements.
      className={className ? `contents ${className}` : 'contents'}
    >
      {children}
    </div>
  );
}
