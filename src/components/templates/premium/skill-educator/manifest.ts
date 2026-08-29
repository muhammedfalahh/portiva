/**
 * =============================================================================
 * PORTIVA: Atlas Skill Lab Pro — Template Manifest
 * =============================================================================
 *
 * Eagerly available module metadata. Section content lives in ./definition.ts
 * and loads lazily together with the shared GenericPremiumRenderer.
 */

import type { TemplateManifest } from '@/lib/template-contract';

export const skilleducatorManifest: TemplateManifest = {
  id: 'premium_skill_educator',
  name: 'Atlas Skill Lab Pro',
  shortName: 'Atlas Skill Lab Pro',
  category: 'education',
  categoryLabel: 'Education',
  tier: 'premium',
  kind: 'premium-module',
  description: 'Multi-page educator site with courses, curriculum, resources, and instructor pages.',
  previewImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=400&auto=format&fit=crop',
  pageCount: 8,
  tags: ['education', 'pro', 'multipage'],
  capabilities: ['multi-page', 'editor-compatible', 'theme-ready', 'page-switcher'],
  profileHandle: 'atlasskilllab',
  profileName: 'Atlas Skill Lab',
  theme: {
    background: '#0C1020',
    foreground: '#F5F7FF',
    primary: '#B9C8FF',
    primaryHover: '#D0DAFF',
    surface: '#151A2F',
    surfaceHover: '#1D2440',
    muted: '#98A4C8',
    border: 'rgba(245,247,255,0.1)',
    accent: '#5B7CFA',
    accentHover: '#7A96FF',
  },
  version: '1.0.0',
  schemaVersion: 1,
};
