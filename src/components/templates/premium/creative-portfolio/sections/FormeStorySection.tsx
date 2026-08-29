'use client';

/**
 * FORME Studio — bespoke story section.
 * Extracted verbatim from PremiumMultipageTemplate.tsx (CreativeStorySection)
 * during the template platform migration.
 *
 * Surface: LIGHT pole, opening on the same paper tone the hero dissolves into,
 * then sinking organically back toward the dark services section.
 */

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormeStorySection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'story' }>>) {
  const styleOverrides = useStyleOverrides();

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };

  const actionHref = section.primaryAction && definition
    ? buildHref(section.primaryAction, definition, handle, templateId)
    : section.primaryAction?.href || '#services';

  return (
    <section
      id="story"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28"
      style={formeSectionSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
    >
      <div id="about" className="absolute -top-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Top Header Row: Left Eyebrow & Nav Arrows + Right Headline ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 items-start"
        >
          {/* Left Column: Eyebrow + Left Arrow Button */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between space-y-3 sm:space-y-4">
            <EditableElement
              as="span"
              id={`${section.id}-eyebrow`}
              field="value"
              value={section.eyebrow || '[01] A STORY WORTH TELLING.'}
              className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tone-text)]"
            />

            {/* Left Pill Button (←) */}
            <div className="flex items-center">
              <button
                type="button"
                aria-label="Previous story item"
                className="group inline-flex h-6.5 w-11 sm:h-7 sm:w-12 items-center justify-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-card)] text-[var(--tone-text)] transition-all duration-200 hover:border-[var(--tone-strong)] active:scale-95 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5 stroke-[1.25] text-[var(--tone-text)] transition-transform group-hover:-translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Large Multi-line Headline + Right Arrow Button */}
          <div className="lg:col-span-9 xl:col-span-9 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
            <EditableElement
              as="h2"
              id={`${section.id}-title`}
              field="value"
              value={
                section.title ||
                'Forme Create for Brands that Value —\nClarity Over Noise, Believing that Meaningful\nDesign Begins with Intention and Grows.'
              }
              className="max-w-4xl text-2xl font-normal sm:font-medium tracking-tight text-[var(--tone-text)] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.65rem] leading-[1.14] sm:leading-[1.12]"
            />

            {/* Right Pill Button (→) */}
            <div className="hidden sm:flex shrink-0 items-center justify-end pt-2">
              <button
                type="button"
                aria-label="Next story item"
                className="group inline-flex h-6.5 w-11 sm:h-7 sm:w-12 items-center justify-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-card)] text-[var(--tone-text)] transition-all duration-200 hover:border-[var(--tone-strong)] active:scale-95 shadow-sm cursor-pointer"
              >
                <ArrowRight className="h-3.5 w-3.5 stroke-[1.25] text-[var(--tone-text)] transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Main Content Grid: Left Vertical Rail + Right Studio Image ── */}
        <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-stretch">
          {/* Left Column: Barcode, Coordinates, 3 Dots, Narrative Copy, SEE MORE CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between"
          >
            {/* Top Barcode Element with 20-25° metadata */}
            <div>
              <div className="flex items-center gap-3">
                {/* Vertical Barcode Lines */}
                <div className="flex h-11 items-stretch gap-[2.5px] text-[var(--tone-text)] select-none opacity-90">
                  <div className="w-[1.5px] bg-current" />
                  <div className="w-[3.5px] bg-current" />
                  <div className="w-[1px] bg-current" />
                  <div className="w-[2px] bg-current" />
                  <div className="w-[4px] bg-current" />
                  <div className="w-[1.5px] bg-current" />
                  <div className="w-[1px] bg-current" />
                  <div className="w-[3px] bg-current" />
                  <div className="w-[2px] bg-current" />
                  <div className="w-[1px] bg-current" />
                  <div className="w-[3.5px] bg-current" />
                  <div className="w-[1.5px] bg-current" />
                </div>

                {/* Rotated Angle Metadata */}
                <div className="-rotate-90 origin-center select-none">
                  <EditableElement
                    as="span"
                    id={`${section.id}-angle-meta`}
                    field="value"
                    value="20-25°"
                    className="font-mono text-[10px] sm:text-[11px] font-normal text-[var(--tone-text-soft)] tracking-tight"
                  />
                </div>
              </div>
            </div>

            {/* Bottom block: 3 Dots + Description + CTA */}
            <div className="pt-8 sm:pt-14 lg:pt-20 space-y-4">
              {/* 3 Decorative Dots (2 ink + 1 accent orange) */}
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone-text)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--tone-text)]" />
                <span className="h-1.5 w-1.5 rounded-full bg-theme-accent" />
              </div>

              {/* Narrative Description */}
              <EditableElement
                as="p"
                id={`${section.id}-description`}
                field="value"
                value={
                  section.description ||
                  'We are a creative agency obsessed with clarity, modern expression, clean and aesthetics. Our philosophy is design should feel effortless.'
                }
                className="max-w-[270px] text-xs sm:text-sm font-normal leading-relaxed text-[var(--tone-text-soft)]"
              />

              {/* Action Link: ↳ SEE MORE */}
              <div className="pt-2">
                <EditableButton
                  buttonKey={`${section.id}-see-more-btn`}
                  defaultText="SEE MORE"
                  defaultHref={actionHref}
                  onViewClick={
                    section.primaryAction?.targetPageId
                      ? (event) => handleInternalNavigation(event, section.primaryAction?.targetPageId)
                      : undefined
                  }
                  className="group inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[var(--tone-text)] transition-all duration-200 hover:text-theme-accent"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-theme-accent text-sm leading-none font-bold transition-transform duration-200 group-hover:translate-x-0.5">
                      ↳
                    </span>
                    <span className="border-b border-transparent group-hover:border-theme-accent transition-colors">
                      {section.primaryAction?.label || 'SEE MORE'}
                    </span>
                  </span>
                </EditableButton>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Featured Studio Workspace Photo + Glass Badge */}
          <div className="lg:col-span-9 xl:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[16/10] w-full overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-2xl"
            >
              <EditableImage
                imageKey={section.media?.key || 'creative-story-team-image'}
                defaultSrc={
                  section.media?.src ||
                  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
                }
                defaultAlt={section.media?.alt || 'Forme creative studio team working at design table'}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />

              {/* Translucent Glass Pill Badge: "Forme Team" */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 pointer-events-auto">
                <div className="inline-flex items-center rounded-full border border-white/60 bg-white/70 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-neutral-900 shadow-md backdrop-blur-md">
                  <EditableElement
                    as="span"
                    id={`${section.id}-team-badge`}
                    field="value"
                    value="Forme Team"
                    className="font-medium tracking-tight"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
