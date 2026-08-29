import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, User } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { SectionHeading } from './primitives';
import type { BlacklineSectionProps } from './types';

type TestimonialsSection = Extract<PremiumTemplateSection, { type: 'testimonials' }>;

export function BlacklineTestimonialsSection({
  section,
  reducedMotion,
}: BlacklineSectionProps<TestimonialsSection>) {
  const styleOverrides = useStyleOverrides();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const totalItems = section.items.length;

  const handlePrev = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : totalItems - 1));
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev < totalItems - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="bl-home-testimonials"
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
        </div>

        {/* 5 VIP Review Cards */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {section.items.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                reducedMotion
                  ? undefined
                  : { type: 'spring', bounce: 0, duration: 0.44, delay: index * 0.06 }
              }
              className="relative flex flex-col justify-between rounded-[24px] border border-slate-200/80 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-500/30 hover:shadow-[0_16px_36px_rgba(0,102,255,0.08)] sm:p-6"
            >
              {/* Rating 5.0 + Gold Stars + Verified Badge */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display text-sm font-extrabold text-[#0F172A]">5.0</span>
                    <div className="flex items-center gap-0.5" role="img" aria-label="Rated 5 out of 5">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B] drop-shadow-sm"
                          strokeWidth={1}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold text-emerald-700 ring-1 ring-emerald-500/20">
                    <CheckCircle2 className="h-2.5 w-2.5" />
                    Verified
                  </span>
                </div>

                {/* Quote Text */}
                <blockquote className="mt-4">
                  <EditableElement
                    as="p"
                    id={`${section.id}-${item.id}-quote`}
                    field="value"
                    value={item.quote}
                    className="line-clamp-5 text-xs leading-relaxed text-[#475569] sm:text-[13px]"
                  />
                </blockquote>
              </div>

              {/* Author Info */}
              <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-3.5">
                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-tr from-[#0066FF] to-[#38BDF8] text-white shadow-sm">
                  <User className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <EditableElement
                    as="p"
                    id={`${section.id}-${item.id}-name`}
                    field="value"
                    value={item.name}
                    className="truncate text-xs font-bold text-[#0F172A]"
                  />
                  <EditableElement
                    as="p"
                    id={`${section.id}-${item.id}-role`}
                    field="value"
                    value={item.role}
                    className="truncate text-[10px] font-medium text-[#64748B]"
                  />
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Circular Spring Navigation Buttons */}
        <div className="mt-10 flex justify-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-[#0F172A] shadow-sm transition duration-150 ease-out hover:bg-slate-50 active:scale-90"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2.2} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-white shadow-md shadow-blue-500/25 transition duration-150 ease-out hover:shadow-lg hover:shadow-blue-500/35 active:scale-90"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    </section>
  );
}
