import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { SectionHeading } from './primitives';
import type { BlacklineSectionProps } from './types';

type GallerySection = Extract<PremiumTemplateSection, { type: 'gallery' }>;

export function BlacklineGallerySection({
  section,
  reducedMotion,
}: BlacklineSectionProps<GallerySection>) {
  const styleOverrides = useStyleOverrides();
  const [activeDot, setActiveDot] = useState(0);

  const items = section.items || [];
  const gal1 = items[0];
  const gal2 = items[1];
  const gal3 = items[2];
  const gal4 = items[3];
  const gal5 = items[4];

  return (
    <section
      id="bl-home-gallery"
      className="relative w-full bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionHeading
            sectionId={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            size="lg"
            align="center"
          />

          {/* Active Brand Pill Tag */}
          {section.communityBadge ? (
            <div className="mt-5 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-xs font-bold text-[#0066FF] shadow-sm backdrop-blur-md">
                <Camera className="h-3.5 w-3.5 text-[#0066FF]" />
                <EditableElement
                  as="span"
                  id={`${section.id}-community-badge`}
                  field="value"
                  value={section.communityBadge}
                />
              </span>
            </div>
          ) : null}
        </div>

        {/* Pro Asymmetric Bento Photo Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
          {/* Left Tall Column (Item 1) */}
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46 }}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,102,255,0.1)] lg:col-span-1"
          >
            {gal1?.image ? (
              <EditableImage
                imageKey={gal1.image.key}
                defaultSrc={gal1.image.src}
                defaultAlt={gal1.image.alt}
                containerClassName="h-full w-full"
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
          </motion.div>

          {/* Center Column: Top Landscape (Item 2) + Bottom Split 2 Squares (Item 3 & 4) */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-2 lg:gap-5">
            {/* Top Landscape */}
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46, delay: 0.06 }}
              className="group relative flex-1 overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,102,255,0.1)]"
            >
              {gal2?.image ? (
                <EditableImage
                  imageKey={gal2.image.key}
                  defaultSrc={gal2.image.src}
                  defaultAlt={gal2.image.alt}
                  containerClassName="h-full w-full"
                  className="aspect-[16/9] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : null}
            </motion.div>

            {/* Bottom Split 2 Squares */}
            <div className="grid grid-cols-2 gap-4 lg:gap-5">
              <motion.div
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46, delay: 0.1 }}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,102,255,0.1)]"
              >
                {gal3?.image ? (
                  <EditableImage
                    imageKey={gal3.image.key}
                    defaultSrc={gal3.image.src}
                    defaultAlt={gal3.image.alt}
                    containerClassName="h-full w-full"
                    className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
              </motion.div>

              <motion.div
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46, delay: 0.14 }}
                className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,102,255,0.1)]"
              >
                {gal4?.image ? (
                  <EditableImage
                    imageKey={gal4.image.key}
                    defaultSrc={gal4.image.src}
                    defaultAlt={gal4.image.alt}
                    containerClassName="h-full w-full"
                    className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : null}
              </motion.div>
            </div>
          </div>

          {/* Right Tall Column (Item 5) */}
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46, delay: 0.18 }}
            className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:shadow-[0_16px_36px_rgba(0,102,255,0.1)] lg:col-span-1"
          >
            {gal5?.image ? (
              <EditableImage
                imageKey={gal5.image.key}
                defaultSrc={gal5.image.src}
                defaultAlt={gal5.image.alt}
                containerClassName="h-full w-full"
                className="aspect-[3/4] h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : null}
          </motion.div>
        </div>

        {/* Carousel Pagination & Arrows */}
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setActiveDot((prev) => (prev > 0 ? prev - 1 : 4))}
            aria-label="Previous gallery page"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0F172A] shadow-sm transition duration-150 ease-out hover:bg-slate-50 active:scale-90"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
          </button>

          {/* Fluid Dot Indicators */}
          <div className="flex items-center gap-1.5 px-2">
            {[0, 1, 2, 3, 4].map((dot) => (
              <button
                key={dot}
                type="button"
                onClick={() => setActiveDot(dot)}
                aria-label={`Go to slide ${dot + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeDot === dot
                    ? 'w-7 bg-gradient-to-r from-[#0066FF] to-[#0052CC] shadow-sm shadow-blue-500/50'
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setActiveDot((prev) => (prev < 4 ? prev + 1 : 0))}
            aria-label="Next gallery page"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-md shadow-blue-500/25 transition duration-150 ease-out hover:shadow-lg hover:shadow-blue-500/35 active:scale-90"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
