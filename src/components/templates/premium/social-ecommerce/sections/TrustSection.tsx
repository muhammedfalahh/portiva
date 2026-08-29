'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 3 Trust & Value Banner
 * =============================================================================
 *
 * Direct translation of Reference Image 3 (top section):
 * Warm peach/cream rounded container with 3 circular icon pillars:
 * 1. Payment Method ("We offer flexible payment options, to make easier.")
 * 2. Return policy ("You can return a product within 30 days.")
 * 3. Customer Support ("Our customer support is 24/7.")
 *
 * 100% builder editable.
 */

import { CreditCard, Headphones, RotateCcw } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type { PremiumTemplateCard } from '@/lib/template-contract';
import { MeridianReveal } from './MeridianSection';
import type { StorefrontSectionProps } from './FeaturedProducts';

const TRUST_ICONS = [CreditCard, RotateCcw, Headphones];

export function TrustSection({
  section,
  reducedMotion,
}: StorefrontSectionProps) {
  if (section.type !== 'cards') return null;

  return (
    <MeridianReveal className="w-full bg-white py-8 sm:py-12" reducedMotion={reducedMotion}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] bg-[#FFF3E9] px-6 py-12 sm:px-12 sm:py-16 shadow-2xs">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-14">
            {section.items.map((item: PremiumTemplateCard, index: number) => {
              const Icon = TRUST_ICONS[index % TRUST_ICONS.length];
              return (
                <div key={item.id} className="flex flex-col items-center text-center">
                  {/* Large White Circular Badge with Warm Icon */}
                  <span
                    className="flex h-18 w-18 items-center justify-center rounded-full bg-white text-[#D95D39] shadow-xs"
                    aria-hidden="true"
                  >
                    <Icon className="h-8 w-8 stroke-[1.7]" />
                  </span>

                  <EditableElement
                    as="h3"
                    id={`${section.id}-${item.id}-title`}
                    field="value"
                    value={item.title}
                    className="mt-5 text-lg font-bold text-[#12151C] sm:text-xl"
                  />

                  <EditableElement
                    as="p"
                    id={`${section.id}-${item.id}-description`}
                    field="value"
                    value={item.description}
                    className="mt-2 max-w-xs text-xs leading-5 text-[#6B7280] sm:text-[13px]"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MeridianReveal>
  );
}

