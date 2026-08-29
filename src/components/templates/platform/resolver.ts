/**
 * =============================================================================
 * PORTIVA: Template Platform — Canonical Resolver
 * =============================================================================
 *
 * The ONE resolution mechanism. Both the builder canvas
 * (engine/WorkspaceContainer) and the public renderer
 * (app/[username]/route-renderer) must resolve templates through this module.
 *
 *   manifest  → sync, pure metadata (gallery, routing, seeds)
 *   module    → async, lazily loaded implementation (definition + renderer)
 *
 * Resolved modules are cached so switching templates in the builder never
 * re-downloads a chunk.
 */

import type {
  LegacyFreeTemplateModule,
  PremiumTemplateModule,
  TemplateManifest,
  TemplateManifestPage,
} from '@/lib/template-contract';
import type { TemplateData } from '@/components/engine/useWorkspaceStore';
import type { BentoBioConfig } from '@/lib/bentobio';
import {
  findManifestByHandle,
  getTemplateManifest,
  TEMPLATE_CATEGORY_OPTIONS,
  TEMPLATE_MANIFEST_LIST,
} from './registry';
import {
  FREE_TEMPLATE_LOADERS,
  PREMIUM_TEMPLATE_LOADERS,
} from './loaders';

export { TEMPLATE_CATEGORY_OPTIONS };

// ─── Sync Manifest Accessors ────────────────────────────────────────────────

export function listTemplateManifests(): TemplateManifest[] {
  return TEMPLATE_MANIFEST_LIST;
}

export { findManifestByHandle, getTemplateManifest };

// ─── Module Loading ─────────────────────────────────────────────────────────

/** A resolved template ready to render, of either architecture generation. */
export type ResolvedTemplate = PremiumTemplateModule | LegacyFreeTemplateModule;

const premiumModuleCache = new Map<string, Promise<PremiumTemplateModule | null>>();
const freeModuleCache = new Map<string, Promise<LegacyFreeTemplateModule | null>>();

/**
 * Resolves any template id to a renderable module.
 *
 * Premium: module loader. Free: wrapped legacy component adapters.
 *
 * Falls back to `luxe_universal` for unknown ids (legacy VisualCanvas parity),
 * and returns null only if that fallback itself cannot resolve.
 */
export function loadTemplateModule(id: string): Promise<ResolvedTemplate | null> {
  const premiumLoader = PREMIUM_TEMPLATE_LOADERS[id];
  if (premiumLoader) return cached(premiumModuleCache, id, premiumLoader);

  const freeLoader = FREE_TEMPLATE_LOADERS[id];
  if (freeLoader) return cached(freeModuleCache, id, freeLoader);

  // Unknown id → historical luxe_universal default.
  const fallback = FREE_TEMPLATE_LOADERS.luxe_universal;
  return fallback ? cached(freeModuleCache, 'luxe_universal', fallback) : Promise.resolve(null);
}

function cached<T>(
  cache: Map<string, Promise<T | null>>,
  key: string,
  load: () => Promise<T | null>,
): Promise<T | null> {
  let entry = cache.get(key);
  if (!entry) {
    entry = load().catch((error) => {
      cache.delete(key);
      throw error;
    });
    cache.set(key, entry);
  }
  return entry;
}

// ─── Page Summaries ─────────────────────────────────────────────────────────

/**
 * Page summaries for page switchers. Prefers the module-owned manifest copy;
 * derives from the loaded definition when the manifest omits them.
 */
export async function getPageSummaries(id: string): Promise<TemplateManifestPage[]> {
  const manifest = getTemplateManifest(id);
  if (manifest?.pages && manifest.pages.length > 0) return manifest.pages;

  const resolved = await loadTemplateModule(id);
  if (!resolved) return [];
  if ('definition' in resolved) {
    return resolved.definition.pages.map((page) => ({ id: page.id, label: page.label, slug: page.slug }));
  }
  return [];
}

// ─── Project Seed Data ──────────────────────────────────────────────────────

const EMPTY_OVERRIDE_MAPS = {
  textColors: {},
  textOverrides: {},
  styleOverrides: {},
  mediaOverrides: {},
  buttonOverrides: {},
} as const;

/**
 * Creates fresh project data from a template's seed values.
 * Replaces the old synchronous cloneTemplateData() with an async equivalent
 * that never pulls a template implementation into the calling bundle.
 */
export async function createTemplateProjectData(id: string): Promise<TemplateData | null> {
  const manifest = getTemplateManifest(id);
  if (!manifest) return null;

  let bentoBioConfigSeed: BentoBioConfig | undefined;
  if (id === 'bento_bio') {
    ({ DEFAULT_BENTO_CONFIG: bentoBioConfigSeed } = await import('@/lib/bentobio'));
  }

  const firstPremiumPage =
    manifest.tier === 'premium' ? (await getPageSummaries(id))[0]?.id : undefined;

  return {
    templateId: manifest.id,
    profileName: manifest.profileName,
    profileHandle: manifest.profileHandle,
    activePageId: firstPremiumPage,
    blocks: [],
    theme: { ...manifest.theme },
    ...(bentoBioConfigSeed !== undefined ? { bentoBioConfig: bentoBioConfigSeed } : {}),
    ...EMPTY_OVERRIDE_MAPS,
  };
}

/** Synchronous seed used by server rendering paths (no bento seed needed). */
export function createPublicSeedData(manifest: TemplateManifest): TemplateData {
  return {
    templateId: manifest.id,
    profileName: manifest.profileName,
    profileHandle: manifest.profileHandle,
    activePageId: undefined,
    blocks: [],
    theme: { ...manifest.theme },
    ...EMPTY_OVERRIDE_MAPS,
  };
}
