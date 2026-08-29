/**
 * Premium template manifests. Pure metadata only.
 *
 * Every premium template is now a migrated module: its manifest lives in the
 * template's own folder, co-located with its definition and renderer. The
 * strangler window is closed — no legacy premium manifests remain.
 */

import type { TemplateManifest } from '@/lib/template-contract';
import { autoInventoryManifest } from '@/components/templates/premium/auto-inventory/manifest';
import { creativePortfolioManifest } from '@/components/templates/premium/creative-portfolio/manifest';
import { socialEcommerceManifest } from '@/components/templates/premium/social-ecommerce/manifest';
import { saffronManifest } from '@/components/templates/premium/saffron-cloud-kitchen/manifest';
import { bridalsalonManifest } from '@/components/templates/premium/bridal-salon/manifest';
import { fitnesscoachManifest } from '@/components/templates/premium/fitness-coach/manifest';
import { realestateagentManifest } from '@/components/templates/premium/real-estate-agent/manifest';
import { skilleducatorManifest } from '@/components/templates/premium/skill-educator/manifest';
import { boutiqueagencyManifest } from '@/components/templates/premium/boutique-agency/manifest';
import { personalbrandManifest } from '@/components/templates/premium/personal-brand/manifest';

/**
 * Migrated premium modules (manifest owned by each template folder).
 */
export const MODULE_MANIFESTS: TemplateManifest[] = [
  autoInventoryManifest,
  creativePortfolioManifest,
  socialEcommerceManifest,
  saffronManifest,
  bridalsalonManifest,
  fitnesscoachManifest,
  realestateagentManifest,
  skilleducatorManifest,
  boutiqueagencyManifest,
  personalbrandManifest,
];

/** All premium templates are modules; kept as an empty list for now. */
export const LEGACY_PREMIUM_MANIFESTS: TemplateManifest[] = [];
