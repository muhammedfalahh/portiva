'use client';

/**
 * =============================================================================
 * PORTIVA: Saffron Dock Pro — Renderer (client)
 * =============================================================================
 *
 * Composes PremiumShell with the DEFAULT header/footer plus bespoke
 * arch-topped sections — matching its legacy rendering path in
 * PremiumMultipageTemplate.tsx (isSaffronHospitality dispatch) byte-for-byte:
 * no page-meta strip, pb-0 main, standard footer retained.
 *
 * Non-bespoke section types fall back to the shared SectionKit exactly like
 * the legacy GenericSectionRenderer fallthrough did. Element ids unchanged.
 */

import { Fragment, useMemo } from 'react';
import { PremiumShell, usePremiumReducedMotion } from '@/components/templates/shared/premium-runtime';
import { renderGenericSection } from '@/components/templates/shared/generic-sections';
import type { PremiumRendererProps } from '@/lib/template-contract';
import {
  SaffronDockHero,
  SaffronMenuCards,
  SaffronStory,
  SaffronDetail,
} from './sections/SaffronSections';

export function SaffronRenderer({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
}: PremiumRendererProps) {
  const reducedMotion = usePremiumReducedMotion(mode);

  const currentPage = useMemo(
    () => definition.pages.find((page) => page.id === activePageId) || definition.pages[0],
    [activePageId, definition.pages],
  );

  if (!currentPage) return null;

  const sectionProps = {
    definition,
    handle,
    templateId,
    mode,
    onNavigate,
    reducedMotion,
  };

  return (
    <PremiumShell
      definition={definition}
      activePageId={activePageId}
      mode={mode}
      handle={handle}
      templateId={templateId}
      onNavigate={onNavigate}
      hidePageMeta
      mainClassName="pb-0"
    >
      {currentPage.sections.map((section) => (
        <Fragment key={section.id}>
          {section.type === 'hero' ? (
            <SaffronDockHero section={section} {...sectionProps} />
          ) : section.type === 'cards' ? (
            <SaffronMenuCards section={section} {...sectionProps} />
          ) : section.type === 'story' ? (
            <SaffronStory section={section} {...sectionProps} />
          ) : section.type === 'detail' ? (
            <SaffronDetail section={section} {...sectionProps} />
          ) : (
            renderGenericSection({
              section,
              definition,
              handle,
              templateId,
              mode,
              onNavigate,
              reducedMotion,
            })
          )}
        </Fragment>
      ))}
    </PremiumShell>
  );
}
