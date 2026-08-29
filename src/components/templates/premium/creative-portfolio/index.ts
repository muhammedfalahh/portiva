/**
 * =============================================================================
 * PORTIVA: FORME Studio — Template Module (bespoke pilot, Phase 2)
 * =============================================================================
 *
 * Second premium template migrated onto the Template Platform contract, and
 * the first fully bespoke one: custom header, custom hero, interactive
 * services, explore-work grid, testimonial carousel, pricing toggle, and a
 * contact-as-footer layout — all template-local.
 *
 * This entry file is deliberately a plain module (no 'use client'): the
 * platform resolver imports it on BOTH the server and the client, and the
 * manifest + definition must cross the RSC boundary as real data. The
 * renderer lives in ./renderer.tsx under its own client boundary.
 */

import type { PremiumTemplateModule } from '@/lib/template-contract';
import { creativePortfolioDefinition } from './definition';
import { creativePortfolioManifest } from './manifest';
import { CreativePortfolioRenderer } from './renderer';

const creativePortfolioModule: PremiumTemplateModule = {
  manifest: creativePortfolioManifest,
  definition: creativePortfolioDefinition,
  Renderer: CreativePortfolioRenderer,
};

export default creativePortfolioModule;
