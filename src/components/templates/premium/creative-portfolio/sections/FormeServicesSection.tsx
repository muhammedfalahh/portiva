'use client';

/**
 * FORME Studio — bespoke interactive services section.
 * Extracted verbatim from PremiumMultipageTemplate.tsx (CreativeServicesSection)
 * during the template platform migration.
 *
 * Surface: DARK pole, opening exactly on the tone the story section dissolved
 * into, then lifting organically toward the light explore-work section.
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormeServicesSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'cards' }>>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const styleOverrides = useStyleOverrides();

  const activeItem = section.items[activeIndex] || section.items[0];

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };

  return (
    <section
      id="services"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28"
      style={formeSectionSurface({ sectionId: section.id, tone: 'dark', styleOverrides })}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Top Header Row: Left Eyebrow [02] OUR SERVICES + Right Subtitle ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-8 sm:pb-12"
        >
          {/* Left: [02] OUR SERVICES */}
          <div>
            <EditableElement
              as="span"
              id={`${section.id}-eyebrow`}
              field="value"
              value={section.eyebrow || '[02] OUR SERVICES'}
              className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tone-text)]"
            />
          </div>

          {/* Right: Header Description */}
          <div className="max-w-md sm:text-right">
            <EditableElement
              as="p"
              id={`${section.id}-description`}
              field="value"
              value={
                section.description ||
                'We craft brand identities and digital experiences with precision, blending creativity and minimalism.'
              }
              className="text-xs sm:text-sm leading-relaxed text-[var(--tone-text-soft)] font-normal"
            />
          </div>
        </motion.div>

        {/* ── Main Content Grid: Left Interactive Services List + Right Dual Media Preview ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Left Column: Interactive Services Accordion / Tabs List */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 xl:col-span-5 divide-y divide-[var(--tone-line)] border-t border-[var(--tone-line)]"
          >
            {section.items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className="group flex items-center justify-between py-5 sm:py-6 lg:py-7 cursor-pointer select-none transition-all duration-200"
                >
                  {/* Left: Corner Arrow + Service Title */}
                  <div className="flex items-center gap-3.5 sm:gap-4 pr-4">
                    <span
                      className={`text-sm sm:text-base font-bold transition-all duration-200 ${
                        isActive
                          ? 'text-theme-accent translate-x-1'
                          : 'text-[var(--tone-text-faint)] group-hover:text-[var(--tone-text-soft)] group-hover:translate-x-0.5'
                      }`}
                    >
                      ↳
                    </span>

                    <EditableElement
                      as="h3"
                      id={`${section.id}-${item.id}-title`}
                      field="value"
                      value={item.title}
                      className={`text-2xl sm:text-3xl lg:text-[2.25rem] xl:text-[2.6rem] font-medium tracking-tight leading-tight transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--tone-text)] font-semibold'
                          : 'text-[var(--tone-text-soft)] group-hover:text-[var(--tone-text)]'
                      }`}
                    />
                  </div>

                  {/* Right: Bracketed Index [01], [02], etc. */}
                  <div className="shrink-0">
                    <EditableElement
                      as="span"
                      id={`${section.id}-${item.id}-eyebrow`}
                      field="value"
                      value={item.eyebrow || `[0${index + 1}]`}
                      className={`font-mono text-xs sm:text-sm font-medium tracking-wider transition-colors duration-200 ${
                        isActive ? 'text-theme-accent' : 'text-[var(--tone-text-faint)] group-hover:text-[var(--tone-text-soft)]'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Right Column: Dynamic Visual Detail & Gallery for Active Service */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6 sm:space-y-7">
            {/* ── Two Editorial Images Side by Side ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Image 1 (Left Image) */}
              <motion.div
                key={`${activeItem.id}-img-1`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/4.5] w-full overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-xl"
              >
                {activeItem.image ? (
                  <EditableImage
                    imageKey={activeItem.image.key}
                    defaultSrc={activeItem.image.src}
                    defaultAlt={activeItem.image.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--tone-card)]" />
                )}
              </motion.div>

              {/* Image 2 (Right Image) */}
              <motion.div
                key={`${activeItem.id}-img-2`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/4.5] w-full overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-xl"
              >
                {activeItem.secondaryImage ? (
                  <EditableImage
                    imageKey={activeItem.secondaryImage.key}
                    defaultSrc={activeItem.secondaryImage.src}
                    defaultAlt={activeItem.secondaryImage.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : activeItem.image ? (
                  <EditableImage
                    imageKey={`${activeItem.image.key}-secondary`}
                    defaultSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                    defaultAlt="Product packaging and tactile brand assets"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[var(--tone-card)]" />
                )}
              </motion.div>
            </div>

            {/* ── Narrative Paragraph for Active Service ── */}
            <motion.div
              key={`${activeItem.id}-desc`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <EditableElement
                as="p"
                id={`${section.id}-${activeItem.id}-description`}
                field="value"
                value={activeItem.description}
                className="max-w-2xl text-xs sm:text-sm font-normal leading-relaxed text-[var(--tone-text-soft)]"
              />

              {/* ── Pill Tags + Arrow Action Button ── */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
                {activeItem.tags && activeItem.tags.length > 0 ? (
                  activeItem.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-wash)] px-3.5 py-1.5 text-xs font-medium text-[var(--tone-text)] shadow-xs select-none"
                    >
                      <EditableElement
                        as="span"
                        id={`${section.id}-${activeItem.id}-${tag.id}`}
                        field="value"
                        value={tag.text}
                        className="text-xs font-medium"
                      />
                    </span>
                  ))
                ) : null}

                {/* Circular Action Button ↗ */}
                <div className="inline-flex items-center">
                  <EditableButton
                    buttonKey={`${section.id}-${activeItem.id}-action`}
                    defaultText="↗"
                    defaultHref={
                      activeItem.action
                        ? buildHref(activeItem.action, definition, handle, templateId)
                        : '#contact'
                    }
                    onViewClick={
                      activeItem.action?.targetPageId
                        ? (event) => handleInternalNavigation(event, activeItem.action?.targetPageId)
                        : undefined
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-wash)] text-[var(--tone-text)] hover:bg-[var(--tone-strong)] hover:text-[var(--tone-inverse)] transition-all duration-200 shadow-xs"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.5]" />
                  </EditableButton>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
