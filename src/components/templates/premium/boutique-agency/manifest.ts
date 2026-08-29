/**
 * =============================================================================
 * PORTIVA: Tangent Bureau Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Section content lives in ./definition.ts
 * and loads lazily together with the shared GenericPremiumRenderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const boutiqueagencyManifest: TemplateManifest = {
  id: 'premium_boutique_agency',
  name: 'Tangent Bureau Pro',
  shortName: 'Tangent Bureau Pro',
  category: 'agency',
  categoryLabel: 'Agency & Studio',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page agency site with work, case studies, services, insights, and contact.',
  previewImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=400&auto=format&fit=crop',
  pageCount: 7,
  tags: ['agency', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'tangentbureau',
  profileName: 'Tangent Bureau',
  theme: {
    background: '#0E0E12',
    foreground: '#F6F5F1',
    primary: '#E7D7C7',
    primaryHover: '#F1E4D6',
    surface: '#17181E',
    surfaceHover: '#1F2028',
    muted: '#A8A094',
    border: 'rgba(246,245,241,0.1)',
    accent: '#FF7A3D',
    accentHover: '#FF965F',
  },
  version: '1.0.0',
  schemaVersion: 1,
};
