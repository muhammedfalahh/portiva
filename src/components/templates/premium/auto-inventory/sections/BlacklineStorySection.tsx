import React from 'react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { SectionHeading } from './primitives';
import type { BlacklineSectionProps } from './types';

type StorySection = Extract<PremiumTemplateSection, { type: 'story' }>;

export function BlacklineStorySection({
  section,
  reducedMotion,
}: BlacklineSectionProps<StorySection>) {
  const styleOverrides = useStyleOverrides();

  return (
    <section
      className="relative w-full border-t border-slate-200/80 bg-[#F8FAFC] py-20 sm:py-24 lg:py-32"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.48 }}
            className="lg:col-span-6"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
              {section.media ? (
                <EditableImage
                  imageKey={section.media.key}
                  defaultSrc={section.media.src}
                  defaultAlt={section.media.alt}
                  className="aspect-[4/3] w-full object-cover"
                  containerClassName="w-full"
                />
              ) : null}
            </div>
          </motion.div>

          <div className="lg:col-span-6">
            <SectionHeading
              sectionId={section.id}
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />
            {section.body && section.body.length > 0 ? (
              <div className="mt-6 space-y-5 border-l border-slate-200 pl-6">
                {section.body.map((paragraph) => (
                  <EditableElement
                    key={paragraph.id}
                    as="p"
                    id={`${section.id}-${paragraph.id}`}
                    field="value"
                    value={paragraph.text}
                    className="break-words text-sm leading-7 text-[#64748B] sm:text-base sm:leading-8"
                  />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
