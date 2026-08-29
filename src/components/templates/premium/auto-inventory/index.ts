/**
 * =============================================================================
 * PORTIVA: Blackline Motors Pro — Template Module (pilot)
 * =============================================================================
 *
 * First premium template migrated onto the Template Platform contract.
 *
 * This entry file is deliberately a plain module (no 'use client'): the
 * platform resolver imports it on BOTH the server and the client, and the
 * manifest + definition must cross the RSC boundary as real data. The
 * renderer lives in ./renderer.tsx under its own client boundary.
 */

import type { PremiumTemplateModule } from '@/lib/template-contract';
import { autoInventoryDefinition } from './definition';
import { autoInventoryManifest } from './manifest';
import { AutoInventoryRenderer } from './renderer';

const autoInventoryModule: PremiumTemplateModule = {
  manifest: autoInventoryManifest,
  definition: autoInventoryDefinition,
  Renderer: AutoInventoryRenderer,
};

export default autoInventoryModule;
