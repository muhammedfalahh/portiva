/**
 * =============================================================================
 * PORTIVA: Template Platform — Canonical Manifest Registry
 * =============================================================================
 *
 * Single source of truth for template identity. Pure metadata: importing this
 * module never pulls a template implementation or definition into the bundle.
 */

import type { TemplateManifest } from '@/lib/template-contract';
import { FREE_MANIFESTS } from './free-manifests';
import { MODULE_MANIFESTS } from './premium-manifests';

export const TEMPLATE_MANIFESTS: Record<string, TemplateManifest> = Object.fromEntries(
  [...MODULE_MANIFESTS, ...FREE_MANIFESTS].map((manifest) => [manifest.id, manifest]),
);

export const TEMPLATE_MANIFEST_LIST: TemplateManifest[] = Object.values(TEMPLATE_MANIFESTS);

export const FREE_TEMPLATE_MANIFESTS = TEMPLATE_MANIFEST_LIST.filter((m) => m.tier === 'free');
export const PREMIUM_TEMPLATE_MANIFESTS = TEMPLATE_MANIFEST_LIST.filter((m) => m.tier === 'premium');

export const TEMPLATE_CATEGORY_OPTIONS = [
  { id: 'all', label: 'All Templates' },
  { id: 'free', label: 'Free' },
  { id: 'premium', label: 'Premium' },
  { id: 'creative', label: 'Creative' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'food', label: 'Food & Hospitality' },
  { id: 'automotive', label: 'Automotive' },
  { id: 'beauty', label: 'Beauty & Salon' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'real-estate', label: 'Real Estate' },
  { id: 'education', label: 'Education' },
  { id: 'agency', label: 'Agency & Studio' },
  { id: 'personal-brand', label: 'Personal Brand' },
] as const;

export function getTemplateManifest(id: string): TemplateManifest | null {
  return TEMPLATE_MANIFESTS[id] ?? null;
}

export function findManifestByHandle(handle: string): TemplateManifest | null {
  const normalized = handle.toLowerCase();
  return (
    TEMPLATE_MANIFEST_LIST.find((manifest) => manifest.profileHandle.toLowerCase() === normalized) ?? null
  );
}
