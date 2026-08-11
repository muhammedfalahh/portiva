'use client';

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useScrollReveal } from './useScrollReveal';
import type { TestimonialItem } from './types';

interface BrideTestimonialsProps {
  testimonialsTitle: string;
  testimonialsSubtitle: string;
  testimonials: TestimonialItem[];
}

export const BrideTestimonials: React.FC<BrideTestimonialsProps> = ({
  testimonialsTitle,
  testimonialsSubtitle,
  testimonials,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [activeIndex, setActiveIndex] = useState(0);

  const total = testimonials.length;

  const nextTestimonial = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevTestimonial = () => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  if (total === 0) return null;

  const current = testimonials[activeIndex];

  return (
    <section
      id="reviews"
      ref={ref}
      className={`w-full py-28 bg-theme-surface/30 border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent">
            ROYAL BRIDE REFLECTIONS
          </span>
          <EditableElement
            as="h2"
            id="aura-testimonials-title"
            field="testimonialsTitle"
            value={testimonialsTitle}
            type="heading"
            className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
          />
          <EditableElement
            as="p"
            id="aura-testimonials-sub"
            field="testimonialsSubtitle"
            value={testimonialsSubtitle}
            type="text"
            className="font-sans text-sm text-theme-muted"
          />
        </div>

        {/* Featured Testimonial Showcase Card */}
        <div className="bg-theme-surface border border-theme-border/50 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden max-w-4xl mx-auto">
          <Quote className="absolute top-6 right-8 w-24 h-24 text-theme-accent/10 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
            {/* Bride Portrait Frame */}
            <div className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-theme-accent p-1 shadow-lg">
              <EditableImage
                imageKey={`aura-testimonial-img-${activeIndex}`}
                defaultSrc={current.image}
                defaultAlt={current.brideName}
                className="w-full h-full object-cover rounded-full"
                containerClassName="w-full h-full"
              />
            </div>

            {/* Testimonial Content */}
            <div className="flex-1 text-center md:text-left space-y-4">
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start text-amber-400 gap-1">
                {[...Array(current.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <EditableElement
                as="p"
                id={`aura-test-${activeIndex}-quote`}
                field="quote"
                value={current.quote}
                type="heading"
                className="font-editorial text-2xl sm:text-3xl font-light italic text-theme-foreground leading-relaxed"
              />

              <div className="pt-2 border-t border-theme-border/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <EditableElement
                    as="h3"
                    id={`aura-test-${activeIndex}-name`}
                    field="brideName"
                    value={current.brideName}
                    type="heading"
                    className="font-editorial text-xl font-bold text-theme-foreground inline"
                  />
                  <span className="font-sans text-xs text-theme-muted ml-1">
                    {' — '}
                    <EditableElement
                      as="span"
                      id={`aura-test-${activeIndex}-location`}
                      field="weddingLocation"
                      value={current.weddingLocation}
                      type="text"
                      className="inline"
                    />
                  </span>
                </div>
                <EditableElement
                  as="span"
                  id={`aura-test-${activeIndex}-date`}
                  field="weddingDate"
                  value={current.weddingDate}
                  type="text"
                  className="font-sans text-xs text-theme-accent uppercase tracking-wider font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-theme-border/20">
            <span className="font-editorial text-lg font-bold text-theme-accent">
              0{activeIndex + 1} / 0{total}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-full border border-theme-border/50 bg-theme-background text-theme-foreground hover:bg-theme-primary hover:text-theme-background transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-full border border-theme-border/50 bg-theme-background text-theme-foreground hover:bg-theme-primary hover:text-theme-background transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
