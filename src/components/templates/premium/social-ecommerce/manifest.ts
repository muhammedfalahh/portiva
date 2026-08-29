/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Contains identity, gallery presentation,
 * project seed values, and page summaries. Section content lives in
 * ./definition.ts and loads lazily with the renderer.
 *
 * v2 — full dropshipping storefront redesign. Warm alabaster canvas, espresso
 * ink, burnished sienna accent. Three focused pages: Home, Shop, Product.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const socialEcommerceManifest: TemplateManifest = {
  id: 'premium_social_ecommerce',
  name: 'Meridian Commerce Pro',
  shortName: 'Meridian Commerce',
  category: 'ecommerce',
  categoryLabel: 'E-Commerce',
  tier: 'premium',
  kind: 'premium-module',
  description:
    'Premium dropshipping storefront with a curated catalog, editorial merchandising, and a conversion-focused product page.',
  previewImage:
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop',
  pageCount: 3,
  tags: ['ecommerce', 'pro', 'multipage', 'storefront'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'meridianshop',
  profileName: 'Meridian',
  theme: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    surfaceHover: '#F5F6F8',
    foreground: '#12151C',
    muted: '#717682',
    border: 'rgba(18,21,28,0.08)',
    primary: '#12151C',
    primaryHover: '#282D3C',
    accent: '#E86343',
    accentHover: '#D45233',
  },
  pages: [
    { id: 'home', label: 'Home', slug: '' },
    { id: 'shop', label: 'Shop', slug: 'shop' },
    { id: 'product', label: 'Product', slug: 'product' },
  ],
  version: '3.0.0',
  schemaVersion: 1,
};
