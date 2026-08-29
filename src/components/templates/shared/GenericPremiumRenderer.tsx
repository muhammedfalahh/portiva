'use client';

/**
 * =============================================================================
 * PORTIVA: Shared Generic Premium Renderer (SectionKit host)
 * =============================================================================
 *
 * Renderer used by generic premium template modules that have no bespoke
 * visual identity requirements: every section renders through the shared
 * SectionKit with the shell's default header/footer and page-meta strip.
 *
 * This is the same composition the auto-inventory pilot uses; extracting it
 * here means generic templates own ONLY manifest + definition + a two-line
 * module entry — zero duplicated rendering infrastructure.
 */

import { Fragment, useMemo } from 'react';
import { PremiumShell, usePremiumReducedMotion } from './premium-runtime';
import { renderGenericSection } from './generic-sections';
import type { PremiumRendererProps } from '@/lib/template-contract';

export function GenericPremiumRenderer({
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

  return (
    <PremiumShell
      definition={definition}
      activePageId={activePageId}
      mode={mode}
      handle={handle}
      templateId={templateId}
      onNavigate={onNavigate}
    >
      {currentPage.sections.map((section) => (
        <Fragment key={section.id}>
          {renderGenericSection({
            section,
            definition,
            handle,
            templateId,
            mode,
            onNavigate,
            reducedMotion,
          })}
        </Fragment>
      ))}
    </PremiumShell>
  );
}
