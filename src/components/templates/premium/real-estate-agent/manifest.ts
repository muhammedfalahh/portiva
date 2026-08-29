/**
 * =============================================================================
 * PORTIVA: Harbor Crest Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Section content lives in ./definition.ts
 * and loads lazily together with the shared GenericPremiumRenderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const realestateagentManifest: TemplateManifest = {
  id: 'premium_real_estate_agent',
  name: 'Harbor Crest Pro',
  shortName: 'Harbor Crest Pro',
  category: 'real-estate',
  categoryLabel: 'Real Estate',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page real estate site with listings, property detail, agent story, and service pages.',
  previewImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=400&auto=format&fit=crop',
  pageCount: 6,
  tags: ['real-estate', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'harborcrest',
  profileName: 'Harbor Crest Estates',
  theme: {
    background: '#F7F4EF',
    foreground: '#1D1A16',
    primary: '#8B715B',
    primaryHover: '#A08670',
    surface: '#FFFFFF',
    surfaceHover: '#F1ECE4',
    muted: '#7D756E',
    border: 'rgba(29,26,22,0.1)',
    accent: '#C9A66B',
    accentHover: '#D8B57A',
  },
  version: '1.0.0',
  schemaVersion: 1,
};
