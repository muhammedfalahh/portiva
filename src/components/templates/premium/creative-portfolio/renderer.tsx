'use client';

/**
 * =============================================================================
 * PORTIVA: FORME Studio — Renderer (client)
 * =============================================================================
 *
 * Composes PremiumShell with a bespoke header, bespoke sections, suppressed
 * page-meta strip and standard footer (the contact section IS the footer),
 * matching its legacy rendering path in PremiumMultipageTemplate.tsx
 * (isCreativeStudio dispatch) byte-for-byte. Element ids are unchanged.
 *
 * Lives in its own client file so index.ts stays a plain (server-importable)
 * module exposing the manifest + definition as real data across the RSC
 * boundary.
 */

import { Fragment, useMemo, useState, useEffect } from 'react';
import { PremiumShell, usePremiumReducedMotion } from '@/components/templates/shared/premium-runtime';
import { renderGenericSection } from '@/components/templates/shared/generic-sections';
import type {
  PremiumRendererProps,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { FormeHeader } from './sections/FormeHeader';
import { FormeHero } from './sections/FormeHero';
import { FormeStorySection } from './sections/FormeStorySection';
import { FormeServicesSection } from './sections/FormeServicesSection';
import { FormeExploreWorkSection } from './sections/FormeExploreWorkSection';
import { FormeAllWorksSection } from './sections/FormeAllWorksSection';
import { FormeCardsSection } from './sections/FormeCardsSection';
import { FormeTestimonialsSection } from './sections/FormeTestimonialsSection';
import { FormePricingSection } from './sections/FormePricingSection';
import { FormeDetailSection } from './sections/FormeDetailSection';
import { FormeContactSection } from './sections/FormeContactSection';

interface FormeDispatchProps {
  section: PremiumTemplateSection;
  definition: PremiumRendererProps['definition'];
  handle?: string;
  templateId?: string;
  mode: PremiumRendererProps['mode'];
  onNavigate?: PremiumRendererProps['onNavigate'];
  reducedMotion: boolean;
}

/**
 * Template-local section dispatch. Mirrors the legacy isCreativeStudio branch:
 * services vs explore-work vs all-works vs default cards are distinguished by the section's
 * own style/id contract — never by brand-name sniffing.
 */
function FormeSection(props: FormeDispatchProps) {
  const { section } = props;

  if (section.type === 'hero') return <FormeHero {...props} section={section} />;

  if (section.type === 'cards') {
    if (section.style === 'agency' || section.id.includes('services')) {
      return <FormeServicesSection {...props} section={section} />;
    }
    if (
      section.id.includes('works-gallery') ||
      section.id.includes('all-works')
    ) {
      return <FormeAllWorksSection {...props} section={section} />;
    }
    if (
      section.id.includes('explore-work') ||
      section.id.includes('more-work') ||
      section.style === 'explore-work'
    ) {
      return <FormeExploreWorkSection {...props} section={section} />;
    }
    return <FormeCardsSection {...props} section={section} />;
  }

  if (section.type === 'story') return <FormeStorySection {...props} section={section} />;
  if (section.type === 'detail') return <FormeDetailSection {...props} section={section} />;
  if (section.type === 'contact') return <FormeContactSection {...props} section={section} />;
  if (section.type === 'testimonials') {
    return <FormeTestimonialsSection {...props} section={section} />;
  }
  if (section.type === 'pricing') return <FormePricingSection {...props} section={section} />;

  // Section types outside FORME's bespoke set fall back to the shared kit,
  // exactly like the legacy GenericSectionRenderer fallthrough did.
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

export function CreativePortfolioRenderer({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
}: PremiumRendererProps) {
  const reducedMotion = usePremiumReducedMotion(mode);

  const [currentView, setCurrentView] = useState<string>(
    activePageId || definition.pages[0]?.id || 'home'
  );

  useEffect(() => {
    if (onNavigate) {
      setCurrentView(activePageId || 'home');
      return;
    }

    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && definition.pages.some((p) => p.id === hash || p.slug === hash)) {
        setCurrentView(hash);
      } else if (!window.location.hash) {
        setCurrentView(activePageId || definition.pages[0]?.id || 'home');
      }
    };

    if (!window.location.hash && activePageId) {
      setCurrentView(activePageId);
    } else {
      handleHash();
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activePageId, onNavigate, definition.pages]);

  const effectivePageId = onNavigate ? (activePageId || 'home') : currentView;

  const currentPage = useMemo(
    () => definition.pages.find((page) => page.id === effectivePageId) || definition.pages[0],
    [effectivePageId, definition.pages],
  );

  if (!currentPage) return null;

  return (
    <PremiumShell
      definition={definition}
      activePageId={effectivePageId}
      mode={mode}
      handle={handle}
      templateId={templateId}
      onNavigate={onNavigate}
      header={
        <FormeHeader
          definition={definition}
          activePageId={effectivePageId}
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
      {/* ── Film grain texture overlay ──
           Fixed full-viewport overlay: 0 layout footprint, 0 margin/space impact.
           Subtle noise texture gives authentic analog editorial feel over solid surfaces. */}
      <div
        className="pointer-events-none fixed inset-0 z-30 select-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
          opacity: 0.035,
          mixBlendMode: 'soft-light' as const,
        }}
        aria-hidden="true"
      />
      {currentPage.sections.map((section) => (
        <Fragment key={section.id}>
          <FormeSection
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
