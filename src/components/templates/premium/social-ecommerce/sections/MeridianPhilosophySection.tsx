'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 2 Philosophy & Styling Accordion
 * =============================================================================
 *
 * Direct translation of Reference Image 2 (bottom section):
 * - Left column: "Conscious Looks, Daily Confidence" + 3 interactive accordions
 *   (Styling Basics, Fashion Business, Sustainable Fashion) with hairline dividers
 *   and right arrow indicators.
 * - Right column: Tall rounded editorial fashion portrait against vibrant backdrop.
 * - 100% builder editable.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { MeridianReveal } from './MeridianSection';
import type { StorefrontSectionProps } from './FeaturedProducts';

interface AccordionItem {
  id: string;
  title: string;
  description: string;
}

const DEFAULT_ITEMS: AccordionItem[] = [
  {
    id: 'philosophy-1',
    title: 'Styling Basics',
    description: 'Master outfit building and personal aesthetics with versatile layering essentials designed for effortless daily confidence.',
  },
  {
    id: 'philosophy-2',
    title: 'Fashion Business',
    description: 'Learn sustainable branding, ethical supply chains, and transparent retail craftsmanship from industry artisans.',
  },
  {
    id: 'philosophy-3',
    title: 'Sustainable Fashion',
    description: 'Design with purpose and planet in mind, utilizing circular regenerative organic fibers and zero-waste patterns.',
  },
];

export function MeridianPhilosophySection({
  section,
  reducedMotion,
}: StorefrontSectionProps) {
  if (section.type !== 'story') return null;

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const storySection = section as Extract<PremiumTemplateSection, { type: 'story' }>;

  const items: AccordionItem[] =
    storySection.points && storySection.points.length > 0
      ? storySection.points.map((pt: { id: string; text: string }, i: number) => ({
          id: pt.id || `pt-${i}`,
          title: pt.text,
          description: storySection.body?.[i]?.text || DEFAULT_ITEMS[i]?.description || '',
        }))
      : DEFAULT_ITEMS;

  return (
    <MeridianReveal className="w-full bg-white py-14 sm:py-20 lg:py-24" reducedMotion={reducedMotion}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 lg:items-center">
          
          {/* ── Left Column: Headline & Interactive Accordions ────────── */}
          <div className="flex flex-col justify-center">
            <h2 className="font-sans text-4xl font-bold leading-[1.08] tracking-tight text-[#12151C] sm:text-5xl lg:text-[48px]">
              <EditableElement
                as="span"
                id={`${section.id}-title-line-1`}
                field="value"
                value="Conscious Looks, Daily"
                className="block"
              />
              <EditableElement
                as="span"
                id={`${section.id}-title-line-2`}
                field="value"
                value="Confidence"
                className="block"
              />
            </h2>

            <EditableElement
              as="p"
              id={`${section.id}-description`}
              field="value"
              value={section.description || 'Step into fashion that not only looks good but feels right. Every piece in our collection is made with love.'}
              className="mt-4 text-xs leading-5 text-[#6B7280] sm:text-sm max-w-md"
            />

            {/* Accordion List */}
            <div className="mt-10 divide-y divide-[#12151C]/10 border-t border-b border-[#12151C]/10">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                  <div key={item.id} className="py-6">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(index)}
                      className="flex w-full items-center justify-between gap-4 text-left group"
                      aria-expanded={isOpen}
                    >
                      <div className="min-w-0 flex-1">
                        <EditableElement
                          as="h3"
                          id={`${section.id}-${item.id}-title`}
                          field="value"
                          value={item.title}
                          className="text-lg font-bold text-[#12151C] transition-colors group-hover:text-[#E86343] sm:text-xl"
                        />
                        {!isOpen ? (
                          <p className="mt-1 text-xs text-[#6B7280] truncate">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#12151C]/60 transition-transform duration-300 group-hover:text-[#12151C]">
                        <ArrowRight className={`h-4 w-4 stroke-[2.2] transition-transform duration-300 ${isOpen ? 'rotate-90 text-[#E86343]' : ''}`} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          initial={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                          animate={reducedMotion ? undefined : { height: 'auto', opacity: 1 }}
                          exit={reducedMotion ? undefined : { height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <EditableElement
                            as="p"
                            id={`${section.id}-${item.id}-description`}
                            field="value"
                            value={item.description}
                            className="pt-2 text-xs leading-6 text-[#6B7280] sm:text-sm max-w-md"
                          />
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right Column: Tall High-Fashion Photo ──────────────────── */}
          <div className="relative min-w-0">
            <div className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden rounded-[36px] bg-[#F5F6F8] shadow-sm">
              <EditableImage
                imageKey={section.media?.key ?? `${section.id}-photo`}
                defaultSrc={section.media?.src ?? 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop'}
                defaultAlt={section.media?.alt ?? 'Man in pastel pink suit with yellow tie against vibrant architectural backdrop'}
                containerClassName="h-full w-full"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </MeridianReveal>
  );
}
