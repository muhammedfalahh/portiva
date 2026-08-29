/**
 * Template Platform — public surface.
 *
 * Import from this index (never from loaders/registry internals) so the
 * dependency direction stays one-way: app + engine → platform → templates.
 * The platform never imports app routes, engine internals, or WorkspaceContainer.
 */

export {
  createPublicSeedData,
  createTemplateProjectData,
  getPageSummaries,
  loadTemplateModule,
} from './resolver';
export type { ResolvedTemplate } from './resolver';
export {
  findManifestByHandle,
  getTemplateManifest,
  listTemplateManifests,
  TEMPLATE_CATEGORY_OPTIONS,
} from './resolver';
export type { FreeRenderContext, FreeSeedData } from '@/lib/template-contract';
