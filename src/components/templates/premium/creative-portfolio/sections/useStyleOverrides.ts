'use client';

/**
 * FORME Studio — editor override bridge.
 *
 * Reads the live per-element styleOverrides map from the visual builder
 * context so section surfaces stay fully editable. Safe in every render
 * mode: outside a builder provider the context falls back to VIEWING with
 * an empty map and the theme-derived defaults render untouched.
 */

import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';

export function useStyleOverrides() {
  const { templateData } = useVisualBuilder();
  return templateData?.styleOverrides;
}
