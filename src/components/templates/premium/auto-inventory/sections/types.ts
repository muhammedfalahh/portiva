/**
 * Shared prop shape for Blackline Motors template-local sections.
 * Mirrors the FormeSectionProps contract used by sibling premium modules.
 */

import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';

export interface BlacklineSectionProps<S extends PremiumTemplateSection> {
  section: S;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  reducedMotion: boolean;
}
