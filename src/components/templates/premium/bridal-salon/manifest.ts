/**
 * =============================================================================
 * PORTIVA: Lina Atelier Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Section content lives in ./definition.ts
 * and loads lazily together with the shared GenericPremiumRenderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const bridalsalonManifest: TemplateManifest = {
  id: 'premium_bridal_salon',
  name: 'Lina Atelier Pro',
  shortName: 'Lina Atelier Pro',
  category: 'beauty',
  categoryLabel: 'Beauty & Salon',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page bridal beauty site with service detail, gallery, testimonials, and booking flow.',
  previewImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=400&auto=format&fit=crop',
  pageCount: 8,
  tags: ['beauty', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'linaatelier',
  profileName: 'Lina Atelier Beauty',
  theme: {
    background: '#F8F3EE',
    foreground: '#201A17',
    primary: '#7C5C52',
    primaryHover: '#8F6B60',
    surface: '#FFFDFB',
    surfaceHover: '#F5ECE4',
    muted: '#8A756C',
    border: 'rgba(32,26,23,0.1)',
    accent: '#C79A7E',
    accentHover: '#D8AB8E',
  },
  version: '1.0.0',
  schemaVersion: 1,
};
