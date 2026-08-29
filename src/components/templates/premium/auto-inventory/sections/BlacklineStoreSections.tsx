'use client';

/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Store Page Sections
 * =============================================================================
 *
 * Store page furniture, matching the light marketplace reference design:
 *
 *   - BlacklineStoreIntro   : centered typographic header on the light
 *     "paper" pole (eyebrow / title / description).
 *   - BlacklineInventoryGrid: brand filter chips (derived from listing
 *     categories, functional client-side filtering) above a 4-column grid of
 *     light marketplace cards. Scales to any number of listings and derives
 *     chips dynamically, so future CMS inventory appears automatically.
 *   - BlacklineSourcingBand : dark closing "can't find your spec" band.
 *
 * All light-pole shades derive from --bl-* tokens (see surface.ts) so global
 * theme edits repaint the store automatically.
 */

import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { ActionPair, SectionHeading } from './primitives';
import { BlacklineStoreCard } from './BlacklineStoreCard';
import type { BlacklineSectionProps } from './types';

type HeroSection = Extract<PremiumTemplateSection, { type: 'hero' }>;
type CardsSection = Extract<PremiumTemplateSection, { type: 'cards' }>;
type CtaSection = Extract<PremiumTemplateSection, { type: 'cta' }>;

// ─── Store Intro ────────────────────────────────────────────────────────────

export function BlacklineStoreIntro({
  section,
  reducedMotion,
}: BlacklineSectionProps<HeroSection>) {
  const styleOverrides = useStyleOverrides();

  return (
    <section
      className="relative w-full"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 pb-10 pt-16 text-center sm:px-6 sm:pb-12 sm:pt-20 lg:px-8 lg:pb-14 lg:pt-24">
        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.44 }}
        >
          <SectionHeading
            sectionId={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            size="lg"
            align="center"
            titleAs="h1"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Inventory Grid ──────────────────────────────────────────────────────────

export function BlacklineInventoryGrid({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
}: BlacklineSectionProps<CardsSection>) {
  const styleOverrides = useStyleOverrides();
  const [activeBrand, setActiveBrand] = useState<string>('all');

  /**
   * Brand chips derive from listing categories (first-appearance order), so
   * dynamically added inventory contributes its own filters automatically.
   */
  const brands = useMemo(() => {
    const seen: string[] = [];
    for (const item of section.items) {
      if (item.category && !seen.includes(item.category)) seen.push(item.category);
    }
    return seen;
  }, [section.items]);

  const filteredItems = useMemo(() => {
    if (activeBrand === 'all') return section.items;
    return section.items.filter((item) => item.category === activeBrand);
  }, [activeBrand, section.items]);

  const chipClass = (active: boolean) =>
    `rounded-full px-5 py-2 text-xs font-semibold tracking-tight transition duration-200 ease-out active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF] ${
      active
        ? 'bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-[0_2px_10px_rgba(0,102,255,0.3)]'
        : 'border border-slate-200/90 bg-white text-[#475569] hover:border-slate-300 hover:text-[#0F172A]'
    }`;

  return (
    <section
      className="relative w-full bg-[#F8FAFC] pb-20 pt-2 sm:pb-24"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-label={section.eyebrow || 'Vehicle inventory'}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Brand filter chips */}
        <div
          role="group"
          aria-label="Filter inventory by brand"
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          <button
            type="button"
            onClick={() => setActiveBrand('all')}
            aria-pressed={activeBrand === 'all'}
            className={chipClass(activeBrand === 'all')}
          >
            <EditableElement
              as="span"
              id={`${section.id}-filter-all`}
              field="value"
              value="All Cars"
              className="text-xs font-semibold tracking-tight"
            />
          </button>
          {brands.map((brand) => {
            const active = activeBrand === brand;
            return (
              <button
                key={brand}
                type="button"
                onClick={() => setActiveBrand(brand)}
                aria-pressed={active}
                className={chipClass(active)}
              >
                <EditableElement
                  as="span"
                  id={`${section.id}-filter-${brand}`}
                  field="value"
                  value={brand}
                  className="text-xs font-medium tracking-tight"
                />
              </button>
            );
          })}
        </div>

        {/* Inventory grid — scales to any number of listings */}
        {filteredItems.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 xl:grid-cols-4 xl:gap-6">
            {filteredItems.map((item) => (
              <BlacklineStoreCard
                key={item.id}
                sectionId={section.id}
                item={item}
                definition={definition}
                handle={handle}
                templateId={templateId}
                mode={mode}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-[24px] border border-dashed border-black/[0.12] bg-white px-6 py-16 text-center shadow-sm">
            <EditableElement
              as="p"
              id={`${section.id}-empty`}
              field="value"
              value="No vehicles match this filter yet."
              className="text-sm text-[#86868B]"
            />
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Sourcing CTA Band ───────────────────────────────────────────────────────

export function BlacklineSourcingBand({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: BlacklineSectionProps<CtaSection>) {
  const styleOverrides = useStyleOverrides();
  void reducedMotion;

  return (
    <section
      className="relative w-full overflow-hidden border-t border-slate-200/80 bg-[#F8FAFC] text-[#0F172A]"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-labelledby={`${section.id}-title`}
    >
      {section.media ? (
        <>
          <div className="absolute inset-0 opacity-20" aria-hidden="true">
            <EditableImage
              imageKey={section.media.key}
              defaultSrc={section.media.src}
              defaultAlt={section.media.alt}
              containerClassName="h-full w-full"
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #F8FAFC 25%, color-mix(in srgb, #F8FAFC 60%, transparent) 65%, transparent 100%)',
            }}
          />
        </>
      ) : null}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <SectionHeading
            sectionId={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            size="lg"
          />
          <div className="mt-9">
            <ActionPair
              sectionId={section.id}
              definition={definition}
              handle={handle}
              templateId={templateId}
              mode={mode}
              onNavigate={onNavigate}
              primaryAction={section.primaryAction}
              secondaryAction={section.secondaryAction}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
