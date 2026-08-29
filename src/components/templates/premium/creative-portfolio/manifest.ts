/**
 * =============================================================================
 * PORTIVA: FORME Studio — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Contains identity, gallery presentation,
 * project seed values, and page summaries. Section content lives in
 * ./definition.ts and loads lazily with the renderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const creativePortfolioManifest: TemplateManifest = {
  id: 'premium_creative_portfolio',
  name: 'Creative Studio Pro',
  shortName: 'FORME Studio',
  category: 'creative',
  categoryLabel: 'Creative',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page portfolio for studios, photographers, designers, and directors.',
  previewImage:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop',
  pageCount: 2,
  tags: ['creative', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'forme',
  profileName: 'FORME Studio',
  theme: {
    background: '#030305',
    foreground: '#F5F0EB',
    primary: '#F5F0EB',
    primaryHover: '#E8DED4',
    surface: '#0D0D12',
    surfaceHover: '#15151C',
    muted: '#8A8480',
    border: 'rgba(245,240,235,0.09)',
    accent: '#C8956C',
    accentHover: '#B8845C',
  },
  pages: [
    { id: 'home', label: 'Home', slug: '' },
    { id: 'works', label: 'Works', slug: 'works' },
  ],
  version: '1.0.0',
  schemaVersion: 1,
};
