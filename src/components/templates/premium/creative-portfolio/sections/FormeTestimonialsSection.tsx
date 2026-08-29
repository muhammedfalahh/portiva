'use client';

/**
 * FORME Studio — bespoke testimonial carousel + milestones stats.
 * Extracted verbatim from PremiumMultipageTemplate.tsx
 * (CreativeTestimonialsSection) during the template platform migration.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormeTestimonialsSection({
  section,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'testimonials' }>>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const styleOverrides = useStyleOverrides();

  const items =
    section.items && section.items.length > 0
      ? section.items
      : [
          {
            id: 'default-test',
            tag: 'HAPPY CUSTOMER',
            year: '2025©',
            quote:
              'They captured our vision with surprising clarity. The process was simple, colaborative, and the result feels timeless.',
            name: 'Sarah C.',
            role: 'Founder & Design Lead',
            image: {
              key: 'creative-test-sarah-img',
              src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
              alt: 'Happy customer portrait in black blazer',
            },
          },
        ];

  const totalItems = items.length;
  const activeItem = items[activeIndex] || items[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalItems);
  };

  const defaultStats = [
    { id: 'm1', label: 'Years Experience', value: '05', suffix: '+' },
    { id: 'm2', label: 'Projects Completed', value: '120', suffix: '+' },
    { id: 'm3', label: 'Brands Transformed', value: '50', suffix: '+' },
    { id: 'm4', label: 'Returning Clients', value: '92', suffix: '%' },
  ];

  const stats = section.stats && section.stats.length > 0 ? section.stats : defaultStats;

  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28"
      style={formeSectionSurface({ sectionId: section.id, tone: 'dark', styleOverrides })}
    >
      <div id="reviews" className="absolute -top-20" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Top Header Eyebrow: [04] WHAT CLIENTS SAY ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-12"
        >
          <EditableElement
            as="span"
            id={`${section.id}-eyebrow`}
            field="value"
            value={section.eyebrow || '[04] WHAT CLIENTS SAY'}
            className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tone-text)]"
          />
        </motion.div>

        {/* ── Main Two-Column Layout: Left Portrait Card + Right Big Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 items-start"
        >
          {/* Left Column: Pill Prev Arrow, Crosshair, Sharp Image Card, Happy Customer & Year ── */}
          <div className="lg:col-span-4 xl:col-span-3.5 flex flex-col max-w-[280px] w-full">
            {/* Top Bar over Card: Left Pill Button (←) + Right Crosshair (+) */}
            <div className="flex items-center justify-between pb-3 select-none">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="group inline-flex h-6.5 w-11 sm:h-7 sm:w-12 items-center justify-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-wash)] text-[var(--tone-text)] transition-all duration-200 hover:border-[var(--tone-text)] hover:bg-[var(--tone-wash-strong)] active:scale-95 cursor-pointer shadow-sm"
              >
                <ArrowLeft className="h-3.5 w-3.5 stroke-[1.25] text-[var(--tone-text)] transition-transform group-hover:-translate-x-0.5" />
              </button>

              <span className="font-mono text-xs text-[var(--tone-text-faint)] select-none" aria-hidden="true">
                +
              </span>
            </div>

            {/* Sharp Portrait Image Card (rounded-none, zero border radius) */}
            <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-lg transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full"
                >
                  <EditableImage
                    imageKey={activeItem.image?.key || `creative-testimonials-${activeItem.id || activeIndex}-img`}
                    defaultSrc={
                      activeItem.image?.src ||
                      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
                    }
                    defaultAlt={activeItem.image?.alt || 'Happy customer portrait'}
                    containerClassName="h-full w-full"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Caption Row: HAPPY CUSTOMER on left, 2025© on right */}
            <div className="flex items-center justify-between pt-3 text-[var(--tone-text)]">
              <EditableElement
                as="span"
                id={`${section.id}-${activeItem.id}-tag`}
                field="value"
                value={activeItem.tag || 'HAPPY CUSTOMER'}
                className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--tone-text)]"
              />
              <EditableElement
                as="span"
                id={`${section.id}-${activeItem.id}-year`}
                field="value"
                value={activeItem.year || '2025©'}
                className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.14em] text-[var(--tone-text-soft)]"
              />
            </div>
          </div>

          {/* Right Column: Big Burnt-Orange Quote Mark, Large Headline Quote, Author, Community Stack, Next Pill */}
          <div className="lg:col-span-8 xl:col-span-8.5 flex flex-col justify-between min-h-[280px] lg:min-h-[340px] space-y-8 sm:space-y-10 lg:space-y-12">
            {/* Top: Orange Quote Glyph + Editorial Quote Text */}
            <div>
              {/* Burnt Orange Double Quote Symbol (66 style) */}
              <div className="text-theme-accent leading-none mb-4 sm:mb-5 select-none" aria-hidden="true">
                <svg className="w-10 h-8 sm:w-12 sm:h-9 lg:w-14 lg:h-10 fill-current" viewBox="0 0 48 38">
                  <path d="M0 22.8C0 10.2 7.6 2.4 20.4 0l2.4 5.4C14.4 7.2 10.8 11.4 10.2 16.8h11.4v21H0V22.8zm26.4 0C26.4 10.2 34 2.4 46.8 0l2.4 5.4c-8.4 1.8-12 6-12.6 11.4H48v21H26.4V22.8z" />
                </svg>
              </div>

              {/* Large Headline Quote with spring fade */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <EditableElement
                    as="p"
                    id={`${section.id}-${activeItem.id}-quote`}
                    field="value"
                    value={activeItem.quote}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3rem] font-medium tracking-tight leading-[1.18] sm:leading-[1.15] text-[var(--tone-text)] max-w-4xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Row: Left Author Attribution + Right Community Proof & Next Arrow */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-2">
              {/* Author Attribution */}
              <div className="flex items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <EditableElement
                      as="p"
                      id={`${section.id}-${activeItem.id}-name`}
                      field="value"
                      value={`— ${activeItem.name}`}
                      className="text-base sm:text-lg lg:text-xl font-normal text-[var(--tone-text)] tracking-tight"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side: Community Avatar Stack + 2-line Subtitle + Next Pill Arrow */}
              <div className="flex items-center gap-6 sm:gap-8 justify-between sm:justify-end">
                {/* Avatar Stack + Subtext */}
                <div className="flex flex-col gap-1.5">
                  {/* Avatars + +1K Badge */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <EditableImage
                        imageKey="creative-testimonials-community-1"
                        defaultSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                        defaultAlt="Community member 1"
                        containerClassName="inline-block h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full border-2 border-[var(--gd0)] shadow-xs shrink-0"
                        className="h-full w-full object-cover"
                      />
                      <EditableImage
                        imageKey="creative-testimonials-community-2"
                        defaultSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                        defaultAlt="Community member 2"
                        containerClassName="inline-block h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full border-2 border-[var(--gd0)] shadow-xs shrink-0"
                        className="h-full w-full object-cover"
                      />
                      <EditableImage
                        imageKey="creative-testimonials-community-3"
                        defaultSrc="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                        defaultAlt="Community member 3"
                        containerClassName="inline-block h-6.5 w-6.5 sm:h-7 sm:w-7 rounded-full border-2 border-[var(--gd0)] shadow-xs shrink-0"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <EditableElement
                      as="span"
                      id={`${section.id}-community-badge`}
                      field="value"
                      value={section.communityBadge || '+1K'}
                      className="font-bold text-xs sm:text-[13px] text-[var(--tone-text)] tracking-tight select-none"
                    />
                  </div>

                  {/* 2-line Subtitle */}
                  <div className="flex flex-col text-[10px] sm:text-[11px] text-[var(--tone-text-soft)] font-normal leading-tight">
                    <EditableElement
                      as="span"
                      id={`${section.id}-community-line1`}
                      field="value"
                      value={section.communityLine1 || 'They joined not just for design,'}
                    />
                    <EditableElement
                      as="span"
                      id={`${section.id}-community-line2`}
                      field="value"
                      value={section.communityLine2 || "We're ready when you are."}
                    />
                  </div>
                </div>

                {/* Right Pill Button (→) */}
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="group inline-flex h-6.5 w-11 sm:h-7 sm:w-12 items-center justify-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-wash)] text-[var(--tone-text)] transition-all duration-200 hover:border-[var(--tone-text)] hover:bg-[var(--tone-wash-strong)] active:scale-95 cursor-pointer shadow-sm"
                  >
                    <ArrowRight className="h-3.5 w-3.5 stroke-[1.25] text-[var(--tone-text)] transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Bottom Section: Horizontal Divider & Agency Milestones Stats Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 lg:mt-24 pt-10 sm:pt-14 lg:pt-16 border-t border-[var(--tone-line)]"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Left Eyebrow: [05] AGENCY MILESTONES */}
            <div className="lg:col-span-3 xl:col-span-3">
              <EditableElement
                as="span"
                id={`${section.id}-milestones-eyebrow`}
                field="value"
                value={section.milestonesEyebrow || '[05] AGENCY MILESTONES'}
                className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tone-text)]"
              />
            </div>

            {/* Right 4-Column Metric Stats Grid */}
            <div className="lg:col-span-9 xl:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.id || `stat-${idx}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col"
                >
                  <div className="flex items-baseline font-sans">
                    <EditableElement
                      as="span"
                      id={`${section.id}-${stat.id}-val`}
                      field="value"
                      value={stat.value}
                      className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--tone-text)] font-mono"
                    />
                    <span className="text-theme-accent text-2xl sm:text-3xl lg:text-4xl font-bold ml-0.5">
                      {stat.suffix || '+'}
                    </span>
                  </div>
                  <EditableElement
                    as="p"
                    id={`${section.id}-${stat.id}-lbl`}
                    field="value"
                    value={stat.label}
                    className="mt-2 text-xs sm:text-sm font-normal text-[var(--tone-text-soft)] leading-snug"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
