/**
 * Shared prop shape for FORME Studio template-local sections.
 * Mirrors the props the legacy monolith handed to its Creative* renderers.
 */

import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';

export interface FormeSectionProps<S extends PremiumTemplateSection> {
  section: S;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  reducedMotion: boolean;
}
