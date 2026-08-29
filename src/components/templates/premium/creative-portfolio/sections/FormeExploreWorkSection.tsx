'use client';

/**
 * FORME Studio — bespoke "Explore more work" section.
 * Extracted verbatim from PremiumMultipageTemplate.tsx
 * (CreativeExploreWorkSection) during the template platform migration.
 */

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormeExploreWorkSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'cards' }>>) {
  const styleOverrides = useStyleOverrides();

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId) return;
    if (onNavigate && mode === 'builder') {
      event.preventDefault();
      onNavigate(pageId);
    }
  };

  const actionHref = section.primaryAction
    ? buildHref(section.primaryAction, definition, handle, templateId)
    : '#contact';

  return (
    <section
      id="explore-work"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28"
      style={formeSectionSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
    >
      <div id="work" className="absolute -top-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Top Header Row: Left Eyebrow ("FEATURED WORK") + Right Action ("VIEW ALL WORKS ↗") ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <EditableElement
              as="span"
              id={`${section.id}-eyebrow`}
              field="value"
              value={section.eyebrow || 'FEATURED WORK'}
              className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.18em] text-[var(--tone-text)]"
            />
            <Badge
              variant="outline"
              className="text-[10px] font-mono tracking-widest px-2 py-0.5 border-[var(--tone-line)] text-[var(--tone-text-soft)] bg-[var(--tone-wash)] uppercase rounded-none"
            >
              Curated
            </Badge>
          </div>

          <div>
            <EditableButton
              buttonKey={`${section.id}-all-work-btn`}
              defaultText={section.primaryAction?.label || 'VIEW ALL WORKS ↗'}
              defaultHref={actionHref}
              onViewClick={
                section.primaryAction?.targetPageId
                  ? (event) => handleInternalNavigation(event, section.primaryAction?.targetPageId)
                  : undefined
              }
              className="group relative inline-flex items-center justify-center gap-2.5 rounded-none px-6 py-3 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] bg-[var(--tone-strong)] text-[var(--tone-inverse)] shadow-md hover:shadow-xl hover:opacity-95 active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--tone-strong)] border border-[var(--tone-line)] cursor-pointer"
            >
              <span>{section.primaryAction?.label || 'VIEW ALL WORKS ↗'}</span>
              <div className="flex h-4.5 w-4.5 items-center justify-center rounded-none bg-white/20 text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.4} />
              </div>
            </EditableButton>
          </div>
        </motion.div>

        {/* ── Main Section Heading: "Featured Work" ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-10 lg:mt-12"
        >
          <EditableElement
            as="h2"
            id={`${section.id}-title`}
            field="value"
            value={section.title || 'Featured Work'}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.12] text-[var(--tone-text)]"
          />
        </motion.div>

        {/* ── 3-Column Image Cards Grid with ZERO border-radius (rounded-none) ── */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr items-stretch">
          {section.items.map((item, index) => {
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col h-full w-full justify-between cursor-pointer"
              >
                {/* Image Container: pure sharp corners (rounded-none), zero radius */}
                <div className="relative aspect-[4/4.5] w-full shrink-0 overflow-hidden rounded-none bg-[var(--tone-card)] shadow-md transition-all duration-300 group-hover:shadow-xl">
                  {item.image ? (
                    <EditableImage
                      imageKey={item.image.key}
                      defaultSrc={item.image.src}
                      defaultAlt={item.image.alt}
                      className="h-full w-full object-cover object-center rounded-none transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-[var(--tone-wash)]" />
                  )}
                </div>

                {/* Left-aligned uppercase caption directly under the image */}
                <div className="pt-4 sm:pt-4.5">
                  <EditableElement
                    as="h3"
                    id={`${section.id}-${item.id}-title`}
                    field="value"
                    value={item.title}
                    className="text-xs sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--tone-text)] group-hover:text-theme-accent transition-colors duration-200 line-clamp-1"
                  />
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Subtle 1px Bottom Horizontal Divider ── */}
        <div className="mt-16 sm:mt-20 lg:mt-24 w-full border-b border-[var(--tone-line)]" />
      </div>
    </section>
  );
}
