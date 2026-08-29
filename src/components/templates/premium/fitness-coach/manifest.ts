/**
 * =============================================================================
 * PORTIVA: Forge Method Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Section content lives in ./definition.ts
 * and loads lazily together with the shared GenericPremiumRenderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const fitnesscoachManifest: TemplateManifest = {
  id: 'premium_fitness_coach',
  name: 'Forge Method Pro',
  shortName: 'Forge Method Pro',
  category: 'fitness',
  categoryLabel: 'Fitness',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page coach website with programs, transformations, pricing, and contact pages.',
  previewImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=400&auto=format&fit=crop',
  pageCount: 7,
  tags: ['fitness', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'forgemethod',
  profileName: 'Forge Method',
  theme: {
    background: '#0A0B0C',
    foreground: '#F5F7F9',
    primary: '#C7FF3D',
    primaryHover: '#D4FF66',
    surface: '#131619',
    surfaceHover: '#1B1F24',
    muted: '#9EA8B4',
    border: 'rgba(245,247,249,0.1)',
    accent: '#F97316',
    accentHover: '#FB923C',
  },
  version: '1.0.0',
  schemaVersion: 1,
};
