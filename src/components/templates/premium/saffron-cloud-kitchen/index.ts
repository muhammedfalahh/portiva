/**
 * =============================================================================
 * PORTIVA: Saffron Dock Pro — Template Module (Phase 4)
 * =============================================================================
 *
 * Fourth premium template migrated onto the Template Platform contract, and
 * the third bespoke family. Bespoke arch-topped sections over the shell's
 * default chrome — proving the contract supports bespoke bodies WITHOUT
 * bespoke navigation.
 *
 * This entry file is deliberately a plain module (no 'use client'): the
 * platform resolver imports it on BOTH the server and the client, and the
 * manifest + definition must cross the RSC boundary as real data. The
 * renderer lives in ./renderer.tsx under its own client boundary.
 */

import type { PremiumTemplateModule } from '@/lib/template-contract';
import { saffronDefinition } from './definition';
import { saffronManifest } from './manifest';
import { SaffronRenderer } from './renderer';

const saffronModule: PremiumTemplateModule = {
  manifest: saffronManifest,
  definition: saffronDefinition,
  Renderer: SaffronRenderer,
};

export default saffronModule;
