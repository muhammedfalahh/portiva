/**
 * =============================================================================
 * PORTIVA: FORME Studio — Section Surface System
 * =============================================================================
 *
 * Clean high-contrast solid black and white editorial rhythm for the Creative
 * Studio Pro template. Every section anchors to one pole — solid deep black
 * or solid crisp off-white paper — for maximum editorial clarity.
 *
 * Editor compatibility contract:
 *   - Every shade is derived at paint-time from the global theme custom
 *     properties (--theme-background / --theme-foreground) via CSS color-mix,
 *     so global theme edits propagate to all section surfaces automatically.
 *   - Per-section styleOverrides ("${sectionId}-section") still win: when a
 *     user sets an explicit background or text color in the visual editor it
 *     replaces the generated surface instead of being hidden beneath it.
 *
 * Pure data + pure functions only — safe to import from server components.
 */

import type { CSSProperties } from 'react';
import type { ElementStyleOverride } from '@/lib/theme.types';

// ─── Tone Contracts ─────────────────────────────────────────────────────────

/** Which pole of the black/white rhythm a section lives on. */
export type FormeTone = 'dark' | 'light';

// ─── Shared Ramp Variables ──────────────────────────────────────────────────

const SURFACE_RAMP_VARS = {
  '--gd0': 'var(--theme-background)',
  '--gd1': 'color-mix(in srgb, var(--theme-background) 92%, var(--theme-foreground))',
  '--gd2': 'color-mix(in srgb, var(--theme-background) 81%, var(--theme-foreground))',
  '--gd3': 'color-mix(in srgb, var(--theme-background) 50%, var(--theme-foreground))',
  '--gl0': 'color-mix(in srgb, var(--theme-foreground) 94%, var(--theme-background))',
  '--gl1': 'color-mix(in srgb, var(--theme-foreground) 98%, var(--theme-background))',
  '--gl2': 'color-mix(in srgb, var(--theme-foreground) 86%, var(--theme-background))',
  '--gm': 'color-mix(in srgb, var(--theme-foreground) 50%, var(--theme-background))',
} as CSSProperties;

/** Content tokens for sections sitting on the dark pole of the rhythm. */
export const DARK_TONE_VARS = {
  ...SURFACE_RAMP_VARS,
  '--tone-text': 'color-mix(in srgb, var(--theme-foreground) 96%, var(--theme-background))',
  '--tone-text-soft': 'color-mix(in srgb, var(--theme-foreground) 70%, transparent)',
  '--tone-text-faint': 'color-mix(in srgb, var(--theme-foreground) 44%, transparent)',
  '--tone-card': 'color-mix(in srgb, var(--theme-background) 91%, var(--theme-foreground))',
  '--tone-line': 'color-mix(in srgb, var(--theme-foreground) 11%, transparent)',
  '--tone-wash': 'color-mix(in srgb, var(--theme-foreground) 6%, transparent)',
  '--tone-wash-strong': 'color-mix(in srgb, var(--theme-foreground) 12%, transparent)',
  '--tone-strong': 'var(--theme-foreground)',
  '--tone-inverse': 'color-mix(in srgb, var(--theme-background) 92%, var(--theme-foreground))',
} as CSSProperties;

/** Content tokens for sections sitting on the light pole of the rhythm. */
export const LIGHT_TONE_VARS = {
  ...SURFACE_RAMP_VARS,
  '--tone-text': 'color-mix(in srgb, var(--theme-background) 90%, var(--theme-foreground))',
  '--tone-text-soft': 'color-mix(in srgb, var(--theme-background) 62%, transparent)',
  '--tone-text-faint': 'color-mix(in srgb, var(--theme-background) 42%, transparent)',
  '--tone-card': '#FFFFFF',
  '--tone-line': 'color-mix(in srgb, var(--theme-background) 12%, transparent)',
  '--tone-wash': 'color-mix(in srgb, var(--theme-background) 5%, transparent)',
  '--tone-wash-strong': 'color-mix(in srgb, var(--theme-background) 10%, transparent)',
  '--tone-strong': 'color-mix(in srgb, var(--theme-background) 92%, var(--theme-foreground))',
  '--tone-inverse': 'color-mix(in srgb, var(--theme-foreground) 96%, var(--theme-background))',
} as CSSProperties;

// ─── Solid Pole Backgrounds ─────────────────────────────────────────────────

const POLE_BACKGROUND_COLORS: Record<FormeTone, string> = {
  dark: 'var(--theme-background)',
  light: 'color-mix(in srgb, var(--theme-foreground) 96%, var(--theme-background))',
};

// ─── Legacy Seam Constants (kept empty for backwards compatibility) ─────────

export const SEAM_FADE_TO_LIGHT = 'none';
export const SEAM_FADE_TO_DARK = 'none';

// ─── Section Surface Resolver ───────────────────────────────────────────────

export interface FormeSurfaceOptions {
  /** Section id — override key resolved as `${sectionId}-section`. */
  sectionId: string;
  /** Pole the section's surface & typography live on. */
  tone: FormeTone;
  /** Live editor overrides map (templateData.styleOverrides). */
  styleOverrides?: Record<string, ElementStyleOverride>;
}

/**
 * Builds the inline style for a FORME section root: palette variables, tone
 * content tokens, and solid background color.
 */
export function formeSectionSurface({
  sectionId,
  tone,
  styleOverrides,
}: FormeSurfaceOptions): CSSProperties {
  const override = styleOverrides?.[`${sectionId}-section`];

  const surfaceStyle: CSSProperties = {
    ...(tone === 'dark' ? DARK_TONE_VARS : LIGHT_TONE_VARS),
    backgroundColor: override?.backgroundColor || POLE_BACKGROUND_COLORS[tone],
  };

  if (!override?.color) {
    surfaceStyle.color = 'var(--tone-text)';
  }

  return surfaceStyle;
}
