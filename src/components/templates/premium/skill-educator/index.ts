/**
 * =============================================================================
 * PORTIVA: Atlas Skill Lab Pro — Template Module (generic, Phase 5)
 * =============================================================================
 *
 * Generic premium template on the Template Platform contract: owns identity
 * (manifest), content (definition), and delegates presentation to the shared
 * SectionKit renderer. No bespoke code, no duplicated infrastructure.
 *
 * Plain module (no 'use client'): the platform resolver imports it on BOTH
 * server and client; manifest + definition cross the RSC boundary as data.
 */

import type { PremiumTemplateModule } from '@/lib/template-contract';
import { GenericPremiumRenderer } from '@/components/templates/shared/GenericPremiumRenderer';
import { skillEducatorDefinition } from './definition';
import { skilleducatorManifest } from './manifest';

const skilleducatorModule: PremiumTemplateModule = {
  manifest: skilleducatorManifest,
  definition: skillEducatorDefinition,
  Renderer: GenericPremiumRenderer,
};

export default skilleducatorModule;
