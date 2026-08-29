/**
 * =============================================================================
 * PORTIVA: Saffron Dock Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Contains identity, gallery presentation,
 * project seed values, and page summaries. Section content lives in
 * ./definition.ts and loads lazily with the renderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const saffronManifest: TemplateManifest = {
  id: 'premium_cafe_cloud_kitchen',
  name: 'Saffron Dock Pro',
  shortName: 'Saffron Dock Pro',
  category: 'food',
  categoryLabel: 'Food & Hospitality',
  tier: 'premium',
  kind: 'premium-module',
  description:
    'Multi-page hospitality site with menu, reservations, events, and story pages.',
  previewImage:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=400&auto=format&fit=crop',
  pageCount: 7,
  tags: ['food', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'saffrondock',
  profileName: 'Saffron Dock',
  theme: {
    background: '#12100C',
    foreground: '#F6F0E8',
    primary: '#E2B56D',
    primaryHover: '#F0CB8E',
    surface: '#1C1915',
    surfaceHover: '#27221B',
    muted: '#BCA88E',
    border: 'rgba(246,240,232,0.12)',
    accent: '#7D9D71',
    accentHover: '#90B286',
  },
  pages: [
    { id: 'home', label: 'Home', slug: '' },
    { id: 'menu', label: 'Menu', slug: 'menu' },
    { id: 'menu-item', label: 'Menu Item', slug: 'menu-item' },
    { id: 'reservations', label: 'Reservations', slug: 'reservations' },
    { id: 'events', label: 'Events', slug: 'events' },
    { id: 'about', label: 'About', slug: 'about' },
    { id: 'contact', label: 'Contact', slug: 'contact' },
  ],
  version: '1.0.0',
  schemaVersion: 1,
};
