'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 4 Reviews Carousel & Cards
 * =============================================================================
 *
 * Direct translation of Reference Image 4 (top section):
 * - Elevated white review cards (rounded-[24px]) with subtle border & shadow
 * - 5 Amber star rating
 * - Expressive testimonial body text
 * - Reviewer footer with circular avatar, name, and country/city location
 * - 100% builder editable
 */

import { Star } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { MeridianHeading, MeridianReveal } from './MeridianSection';
import type { StorefrontSectionProps } from './FeaturedProducts';

function ReviewStars() {
  return (
    <div className="flex items-center gap-1 text-[#F59E0B]" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((index) => (
        <Star key={index} className="h-4 w-4 fill-current" />
      ))}
    </div>
  );
}

export function ReviewsSection({
  section,
  reducedMotion,
}: StorefrontSectionProps) {
  if (section.type !== 'testimonials') return null;

  return (
    <MeridianReveal className="w-full bg-white py-14 sm:py-20 lg:py-24" reducedMotion={reducedMotion}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* 3 Elevated Review Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {section.items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between rounded-[32px] border border-black/5 bg-white p-7 sm:p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.06)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Card Header: Avatar + Author on Left, 5 Stars on Right */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-1 ring-black/10">
                        <EditableImage
                          imageKey={item.image.key}
                          defaultSrc={item.image.src}
                          defaultAlt={item.image.alt}
                          containerClassName="h-full w-full"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] font-bold text-xs text-[#12151C]">
                        {item.name?.[0] ?? 'C'}
                      </div>
                    )}

                    <div className="min-w-0">
                      <EditableElement
                        as="h4"
                        id={`${section.id}-${item.id}-name`}
                        field="value"
                        value={item.name}
                        className="truncate text-xs font-bold text-[#12151C] sm:text-sm"
                      />
                      <EditableElement
                        as="p"
                        id={`${section.id}-${item.id}-role`}
                        field="value"
                        value={item.role ?? 'Australia'}
                        className="truncate text-[11px] font-normal text-[#9CA3AF]"
                      />
                    </div>
                  </div>

                  {/* 5 Stars */}
                  <ReviewStars />
                </div>

                {/* Review Quote Body */}
                <EditableElement
                  as="p"
                  id={`${section.id}-${item.id}-quote`}
                  field="value"
                  value={item.quote}
                  className="mt-5 text-xs leading-6 text-[#4B5563] sm:text-[13px]"
                />
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Pagination Bars */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="h-1 w-7 rounded-full bg-[#E5E7EB]" />
          <span className="h-1 w-7 rounded-full bg-[#181B24]" />
        </div>

      </div>
    </MeridianReveal>
  );
}
