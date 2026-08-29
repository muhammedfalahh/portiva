'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle2, Quote, UserCheck } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { TestimonialItem, DEFAULT_TESTIMONIALS } from './types';

interface CustomerTestimonialsProps {
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonials?: TestimonialItem[];
}

export const CustomerTestimonials: React.FC<CustomerTestimonialsProps> = ({
  testimonialsTitle = 'Client Deliveries & Verified Reviews',
  testimonialsSubtitle = 'Stories of Acquisition Excellence',
  testimonials = DEFAULT_TESTIMONIALS,
}) => {
  const testimonialList =
    testimonials && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section id="testimonials" className="w-full py-24 sm:py-32 bg-theme-surface border-t border-theme-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-theme-primary" />
            <EditableElement
              as="span"
              id="auto-testimonials-subtitle"
              field="testimonialsSubtitle"
              value={testimonialsSubtitle}
              type="text"
              className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
            />
          </div>

          <EditableElement
            as="h2"
            id="auto-testimonials-title"
            field="testimonialsTitle"
            value={testimonialsTitle}
            type="heading"
            className="font-manrope text-3xl sm:text-5xl font-bold text-theme-foreground tracking-tight leading-tight mb-4"
          />
        </div>

        {/* 3-Column Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonialList.map((item, idx) => (
            <div
              key={item.id}
              className="p-8 sm:p-9 rounded-2xl bg-theme-background/80 border border-theme-border hover:border-theme-primary/50 hover:bg-theme-background transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl relative font-inter"
            >
              <div>
                {/* Rating Stars & Verified Tag */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="flex items-center gap-1 text-theme-primary">
                    {[...Array(item.rating || 5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-theme-surface text-theme-foreground border border-theme-border">
                    <CheckCircle2 className="w-3 h-3 text-theme-primary" />
                    <span>Verified Owner</span>
                  </span>
                </div>

                {/* Review Body */}
                <blockquote className="text-sm sm:text-base text-theme-foreground font-normal leading-relaxed italic mb-8">
                  &quot;<EditableElement
                    as="span"
                    id={`auto-testimonial-quote-${idx}`}
                    field={`testimonialQuote_${idx}`}
                    value={item.quote}
                    type="text"
                    className="inline text-theme-foreground"
                  />&quot;
                </blockquote>
              </div>

              {/* Owner Meta */}
              <div className="pt-6 border-t border-theme-border/60 flex items-center justify-between">
                <div>
                  <EditableElement
                    as="h4"
                    id={`auto-testimonial-name-${idx}`}
                    field={`testimonialName_${idx}`}
                    value={item.name}
                    type="heading"
                    className="font-manrope text-base font-bold text-theme-foreground tracking-tight"
                  />
                  <div className="flex items-center gap-1.5 text-xs text-theme-muted mt-0.5">
                    <span className="font-semibold text-theme-foreground">
                      {item.vehicle}
                    </span>
                    <span className="text-theme-border">•</span>
                    <span>{item.city}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
