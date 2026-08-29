/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Section Surface System
 * =============================================================================
 *
 * Automotive tonal rhythm derived entirely from the global theme custom
 * properties via CSS color-mix, so global theme edits propagate to every
 * section surface automatically. Sections sit on one of two poles of an
 * obsidian depth ramp:
 *
 *   base   — the page-level background with a faint atmospheric drift
 *   raised — an elevated steel panel for contrast rhythm (cards, bands)
 *
 * Editor compatibility contract (identical to the FORME surface system):
 *   - Per-section styleOverrides ("${sectionId}-section") always win: when a
 *     user sets an explicit background or text color in the visual editor it
 *     replaces the generated surface instead of being hidden beneath it.
 *
 * Pure data + pure functions only — safe to import from server components.
 */

import type { CSSProperties } from 'react';
import type { ElementStyleOverride } from '@/lib/theme.types';

/** Which pole of the obsidian depth ramp a section lives on. */
export type BlacklineTone = 'base' | 'raised' | 'light';

/**
 * Shared content tokens. Every shade mixes live theme variables, so a user
 * editing the global theme repaints all surfaces and text tones instantly.
 */
export const BLACKLINE_TONE_VARS = {
  '--bl-text': 'var(--theme-foreground)',
  '--bl-text-soft': 'var(--theme-muted)',
  '--bl-text-faint': 'color-mix(in srgb, var(--theme-foreground) 38%, transparent)',
  '--bl-panel': 'var(--theme-surface)',
  '--bl-wash': 'color-mix(in srgb, var(--theme-surface) 60%, var(--theme-background))',
  '--bl-line': 'var(--theme-border)',
  '--bl-line-strong': 'color-mix(in srgb, var(--theme-foreground) 16%, transparent)',
  '--bl-inverse': '#FFFFFF',
} as CSSProperties;

const BASE_BACKGROUND = 'var(--theme-background)';

const RAISED_BACKGROUND = [
  'radial-gradient(70% 52% at 50% 0%, color-mix(in srgb, var(--theme-primary) 3%, transparent) 0%, transparent 65%)',
  'linear-gradient(180deg, var(--theme-surface) 0%, var(--theme-surface) 100%)',
].join(', ');

export interface BlacklineSurfaceOptions {
  /** Section id — override key resolved as `${sectionId}-section`. */
  sectionId: string;
  /** Pole of the depth ramp this section anchors to. */
  tone?: BlacklineTone;
  /** Live editor overrides map (templateData.styleOverrides). */
  styleOverrides?: Record<string, ElementStyleOverride>;
}

/**
 * Light-pole content tokens ("paper" pole, used by all pages): panels
 * read as crisp white / light slate cards on a soft paper field, text derives from the
 * theme foreground.
 */
export const BLACKLINE_LIGHT_TONE_VARS = {
  ...BLACKLINE_TONE_VARS,
  '--bl-panel': '#FFFFFF',
  '--bl-wash': '#F1F5F9',
  '--bl-line': 'rgba(15, 23, 42, 0.08)',
  '--bl-line-strong': 'rgba(15, 23, 42, 0.16)',
  '--bl-text': '#0F172A',
  '--bl-text-soft': '#64748B',
  '--bl-inverse': '#FFFFFF',
} as CSSProperties;

const LIGHT_BACKGROUND = 'var(--theme-background)';

/**
 * Builds the inline style for a Blackline section root: tone content tokens,
 * the anchored pole surface — unless the editor holds an explicit per-section
 * override, which then takes precedence untouched.
 */
export function blacklineSurface({
  sectionId,
  tone = 'base',
  styleOverrides,
}: BlacklineSurfaceOptions): CSSProperties {
  const override = styleOverrides?.[`${sectionId}-section`];

  const surfaceStyle: CSSProperties =
    tone === 'light' ? { ...BLACKLINE_LIGHT_TONE_VARS } : { ...BLACKLINE_TONE_VARS };

  if (!override?.backgroundColor) {
    if (tone !== 'light') {
      surfaceStyle.backgroundColor =
        tone === 'raised' ? 'var(--theme-surface)' : 'var(--theme-background)';
      surfaceStyle.backgroundImage =
        tone === 'raised' ? RAISED_BACKGROUND : BASE_BACKGROUND;
    }
    // For 'light' tone, we deliberately do NOT set inline backgroundColor or backgroundImage
    // so that the specific Tailwind classes (e.g. bg-[#F8FAFC]) applied on the section elements 
    // are respected and not overwritten by stale theme CSS variables.
  } else {
    surfaceStyle.backgroundColor = override.backgroundColor;
  }

  if (!override?.color) {
    surfaceStyle.color = 'var(--bl-text)';
  }

  return surfaceStyle;
}
