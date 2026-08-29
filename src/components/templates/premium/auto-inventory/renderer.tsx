'use client';

/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Renderer (client)
 * =============================================================================
 *
 * Composes PremiumShell with a bespoke dealership header and bespoke
 * automotive sections. Dispatch is decided by each section's own id/type
 * contract — never by brand-name sniffing — mirroring the FORME pattern.
 * Section types outside Blackline's bespoke set fall back to the shared
 * generic kit.
 *
 * Lives in its own client file so index.ts stays a plain (server-importable)
 * module exposing the manifest + definition as real data across the RSC
 * boundary.
 */

import { Fragment, useMemo } from 'react';
import { PremiumShell, usePremiumReducedMotion } from '@/components/templates/shared/premium-runtime';
import { renderGenericSection } from '@/components/templates/shared/generic-sections';
import type {
  PremiumRendererProps,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { BlacklineHeader } from './sections/BlacklineHeader';
import { BlacklineHero } from './sections/BlacklineHero';
import { BlacklineFeaturedSection } from './sections/BlacklineFeaturedSection';
import { BlacklineWhySection } from './sections/BlacklineWhySection';
import { BlacklineGallerySection } from './sections/BlacklineGallerySection';
import { BlacklineTestimonialsSection } from './sections/BlacklineTestimonialsSection';
import { BlacklineContactSection } from './sections/BlacklineContactSection';
import {
  BlacklineStoreIntro,
  BlacklineInventoryGrid,
  BlacklineSourcingBand,
} from './sections/BlacklineStoreSections';

interface BlacklineDispatchProps {
  section: PremiumTemplateSection;
  definition: PremiumRendererProps['definition'];
  handle?: string;
  templateId?: string;
  mode: PremiumRendererProps['mode'];
  onNavigate?: PremiumRendererProps['onNavigate'];
  reducedMotion: boolean;
}

function BlacklineSection(props: BlacklineDispatchProps) {
  const { section } = props;

  if (section.type === 'hero') {
    // Store intro is the compact typographic hero; everything else is cinematic.
    return section.id.includes('store-intro') ? (
      <BlacklineStoreIntro {...props} section={section} />
    ) : (
      <BlacklineHero {...props} section={section} />
    );
  }

  if (section.type === 'cards' && section.style === 'vehicle') {
    return section.id.includes('featured') ? (
      <BlacklineFeaturedSection {...props} section={section} />
    ) : (
      <BlacklineInventoryGrid {...props} section={section} />
    );
  }

  if (section.type === 'story') {
    return <BlacklineWhySection {...props} section={section} />;
  }

  if (section.type === 'testimonials') {
    return <BlacklineTestimonialsSection {...props} section={section} />;
  }

  if (section.type === 'gallery') {
    return <BlacklineGallerySection {...props} section={section} />;
  }

  if (section.type === 'contact') {
    return <BlacklineContactSection {...props} section={section} />;
  }

  if (section.type === 'cta') {
    return <BlacklineSourcingBand {...props} section={section} />;
  }

  // Section types outside Blackline's bespoke set fall back to the shared kit.
  return renderGenericSection({
    section,
    definition: props.definition,
    handle: props.handle,
    templateId: props.templateId,
    mode: props.mode,
    onNavigate: props.onNavigate,
    reducedMotion: props.reducedMotion,
  });
}

export function AutoInventoryRenderer({
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
      header={
        <BlacklineHeader
          definition={definition}
          activePageId={activePageId}
          mode={mode}
          handle={handle}
          templateId={templateId}
          onNavigate={onNavigate}
        />
      }
      hidePageMeta
      hideFooter
      mainClassName="pb-0"
    >
      {currentPage.sections.map((section) => (
        <Fragment key={section.id}>
          <BlacklineSection
            section={section}
            definition={definition}
            handle={handle}
            templateId={templateId}
            mode={mode}
            onNavigate={onNavigate}
            reducedMotion={reducedMotion}
          />
        </Fragment>
      ))}
    </PremiumShell>
  );
}
