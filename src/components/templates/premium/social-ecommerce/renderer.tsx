'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Renderer (client)
 * =============================================================================
 *
 * v2 dropshipping storefront. Composes PremiumShell with a bespoke ecommerce
 * header, fully bespoke storefront sections per page, and its own footer.
 * Dispatches on section type + deterministic section ids — never brand-name
 * sniffing. The template-local cart provider wraps the shell so header badge,
 * product cards, and PDP share one small cart without touching engine state.
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
import { MeridianCartProvider } from './sections/cart';
import { MeridianHeader } from './sections/MeridianHeader';
import { MeridianFooter } from './sections/MeridianFooter';
import { MeridianHero } from './sections/MeridianHero';
import { FeaturedProducts } from './sections/FeaturedProducts';
import { TrustSection } from './sections/TrustSection';
import { EditorialCollection } from './sections/EditorialCollection';
import { MeridianPhilosophySection } from './sections/MeridianPhilosophySection';
import { ReviewsSection } from './sections/ReviewsSection';
import { FinalCtaSection } from './sections/FinalCtaSection';
import { ShopCatalog } from './sections/ShopCatalog';
import { ProductDetail } from './sections/ProductDetail';

interface MeridianDispatchProps {
  section: PremiumTemplateSection;
  definition: PremiumRendererProps['definition'];
  handle?: string;
  templateId?: string;
  mode: PremiumRendererProps['mode'];
  onNavigate?: PremiumRendererProps['onNavigate'];
  reducedMotion: boolean;
}

/**
 * Template-local section dispatch. Bespoke storefront sections are matched by
 * their deterministic ids; anything outside the storefront's bespoke set falls
 * back to the shared SectionKit.
 */
function MeridianSection(props: MeridianDispatchProps) {
  const { section } = props;

  if (section.type === 'hero') return <MeridianHero {...props} section={section} />;

  if (section.type === 'story' || section.id.includes('philosophy')) {
    return <MeridianPhilosophySection {...props} />;
  }

  if (section.type === 'cards') {
    if (section.id.includes('shop-catalog')) return <ShopCatalog {...props} />;
    if (
      section.id.includes('curated') ||
      section.id.includes('featured-products') ||
      section.id.includes('related-products')
    ) {
      return <FeaturedProducts {...props} />;
    }
    if (section.id.includes('editorial')) return <EditorialCollection {...props} />;
    if (section.id.includes('trust') || section.id.includes('why-shop')) {
      return <TrustSection {...props} />;
    }
  }

  if (section.type === 'detail' && section.id.includes('product-detail')) {
    return <ProductDetail {...props} />;
  }

  if (section.type === 'testimonials' || section.id.includes('reviews')) {
    return <ReviewsSection {...props} />;
  }

  if (section.type === 'cta' && section.id.includes('final-cta')) {
    return <FinalCtaSection {...props} />;
  }

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

export function SocialEcommerceRenderer({
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

  return (
    <MeridianCartProvider>
      <PremiumShell
        definition={definition}
        activePageId={activePageId}
        mode={mode}
        handle={handle}
        templateId={templateId}
        onNavigate={onNavigate}
        header={
          <MeridianHeader
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
        {currentPage ? (
          <>
            {currentPage.sections.map((section) => (
              <Fragment key={section.id}>
                <MeridianSection
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
            <MeridianFooter
              definition={definition}
              mode={mode}
              handle={handle}
              templateId={templateId}
              onNavigate={onNavigate}
            />
          </>
        ) : null}
      </PremiumShell>
    </MeridianCartProvider>
  );
}
