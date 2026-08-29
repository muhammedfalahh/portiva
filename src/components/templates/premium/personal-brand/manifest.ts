/**
 * =============================================================================
 * PORTIVA: Mika Vale Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Section content lives in ./definition.ts
 * and loads lazily together with the shared GenericPremiumRenderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const personalbrandManifest: TemplateManifest = {
  id: 'premium_personal_brand',
  name: 'Mika Vale Pro',
  shortName: 'Mika Vale Pro',
  category: 'personal-brand',
  categoryLabel: 'Personal Brand',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page creator site with content, videos, projects, media kit, and partnerships.',
  previewImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
  pageCount: 7,
  tags: ['personal-brand', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'mikavale',
  profileName: 'Mika Vale',
  theme: {
    background: '#0D0E11',
    foreground: '#FAF7F2',
    primary: '#F2D2C4',
    primaryHover: '#F6E0D6',
    surface: '#17181D',
    surfaceHover: '#1F2127',
    muted: '#B3A79E',
    border: 'rgba(250,247,242,0.1)',
    accent: '#E87D8D',
    accentHover: '#F197A4',
  },
  version: '1.0.0',
  schemaVersion: 1,
};
