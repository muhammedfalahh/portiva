/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Template Module
 * =============================================================================
 *
 * Premium dropshipping storefront on the Template Platform contract: a bespoke
 * ecommerce header, six-section Home, full Shop catalog with search/filter/
 * sort, and a conversion-focused Product page — all editor-compatible.
 *
 * This entry file is deliberately a plain module (no 'use client'): the
 * platform resolver imports it on BOTH the server and the client, and the
 * manifest + definition must cross the RSC boundary as real data. The
 * renderer lives in ./renderer.tsx under its own client boundary.
 */

import type { PremiumTemplateModule } from '@/lib/template-contract';
import { socialEcommerceDefinition } from './definition';
import { socialEcommerceManifest } from './manifest';
import { SocialEcommerceRenderer } from './renderer';

const socialEcommerceModule: PremiumTemplateModule = {
  manifest: socialEcommerceManifest,
  definition: socialEcommerceDefinition,
  Renderer: SocialEcommerceRenderer,
};

export default socialEcommerceModule;
