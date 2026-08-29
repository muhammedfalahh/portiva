/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Contains identity, gallery presentation,
 * project seed values, and page summaries. Section content lives in
 * ./definition.ts and loads lazily with the renderer.
 *
 * v2: simplified to a two-page architecture (Home landing + Store inventory)
 * with a refined obsidian/ice-cyan automotive theme.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const autoInventoryManifest: TemplateManifest = {
  id: 'premium_auto_inventory',
  name: 'Autobahn Performance',
  shortName: 'Autobahn',
  category: 'automotive',
  categoryLabel: 'Automotive',
  tier: 'free',
  kind: 'premium-module',
  description:
    'Premium automotive showroom and dealership platform with dynamic bento fleet, performance metrics, and inventory store.',
  previewImage:
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=400&auto=format&fit=crop',
  pageCount: 1,
  tags: ['automotive', 'dealership', 'inventory', 'luxury'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'autobahnpremium',
  profileName: 'AUTOBAHN',
  theme: {
    background: '#F8FAFC',
    foreground: '#0F172A',
    primary: '#0066FF',
    primaryHover: '#0052CC',
    surface: '#FFFFFF',
    surfaceHover: '#F1F5F9',
    muted: '#64748B',
    border: 'rgba(15, 23, 42, 0.08)',
    accent: '#0066FF',
    accentHover: '#0052CC',
  },
  pages: [
    { id: 'home', label: 'Home', slug: '' },
  ],
  version: '2.0.0',
  schemaVersion: 2,
};
