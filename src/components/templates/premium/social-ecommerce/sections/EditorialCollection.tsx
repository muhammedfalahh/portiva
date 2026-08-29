'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 2 Editorial Bento Showcase
 * =============================================================================
 *
 * Pixel-perfect translation of Reference Image 2 (top section):
 * "Top Product Of The Month" asymmetrical staggered 4-photo bento mosaic:
 * - Column 1 (Left): Shifted down (mt-12 / pt-8) with tall vertical card ($66.00 + →)
 * - Column 2 (Center): Starts at top with 2 stacked cards ($120.00 + →, $56.00 + →)
 * - Column 3 (Right): Top text block ("Top Product Of \n The Month") + tall card ($80.00 + →)
 * - Large rounded corners (rounded-[32px]), floating frosted glass capsules with price + circular arrow buttons
 * - 100% builder editable
 */

import { ArrowRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { MeridianReveal } from './MeridianSection';
import type { StorefrontSectionProps } from './FeaturedProducts';

export function EditorialCollection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: StorefrontSectionProps) {
  if (section.type !== 'cards') return null;

  const items = section.items;
  const item1 = items[0] || {
    id: 'bento-item-1',
    title: 'Pink Plaid Ensemble',
    price: '$66.00',
    image: { key: 'meridian-bento-1', src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop', alt: 'Model in pink plaid suit' },
  };
  const item2 = items[1] || {
    id: 'bento-item-2',
    title: 'Woven Azure Tote',
    price: '$120.00',
    image: { key: 'meridian-bento-2', src: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop', alt: 'Blue woven handbag' },
  };
  const item3 = items[2] || {
    id: 'bento-item-3',
    title: 'Canary Sun Jacket',
    price: '$56.00',
    image: { key: 'meridian-bento-3', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop', alt: 'Woman in yellow jacket' },
  };
  const item4 = items[3] || {
    id: 'bento-item-4',
    title: 'Crimson Urban Blazer',
    price: '$80.00',
    image: { key: 'meridian-bento-4', src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop', alt: 'Man in red suit' },
  };

  const detailHref = buildHref({ targetPageId: 'product' }, definition, handle, templateId);

  const handleDetailNavigation = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (!onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate('product');
  };

  return (
    <MeridianReveal className="w-full bg-white py-14 sm:py-20 lg:py-24" reducedMotion={reducedMotion}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* ── 3-Column Asymmetric Staggered Bento Grid ────────────────── */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 items-start">
          
          {/* ── Column 1: Left Tall Vertical Card (Shifted down) ───────── */}
          <div className="relative lg:pt-14">
            <div className="relative overflow-hidden rounded-[32px] bg-[#F5F6F8] min-h-[480px] sm:min-h-[520px] lg:min-h-[560px] group shadow-xs">
              <EditableImage
                imageKey={item1.image?.key ?? 'meridian-bento-1'}
                defaultSrc={item1.image?.src ?? 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop'}
                defaultAlt={item1.image?.alt ?? 'Model in pink plaid suit with bag'}
                containerClassName="absolute inset-0 h-full w-full"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Frosted Glass Price Capsule */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between rounded-full bg-white/75 backdrop-blur-md border border-white/60 p-2 pl-6 shadow-sm">
                <EditableElement
                  as="span"
                  id={`${section.id}-${item1.id}-price`}
                  field="value"
                  value={item1.price ?? '$66.00'}
                  className="text-sm font-bold text-[#12151C]"
                />
                <a
                  href={detailHref}
                  onClick={handleDetailNavigation}
                  aria-label={`View ${item1.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#181B24] text-white shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="h-4 w-4 stroke-[2.2]" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 2: Middle Stacked 2 Cards (Starts at top) ───────── */}
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Middle Top Card: Blue Bag */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#F5F6F8] aspect-[4/3] sm:aspect-[16/12] group shadow-xs">
              <EditableImage
                imageKey={item2.image?.key ?? 'meridian-bento-2'}
                defaultSrc={item2.image?.src ?? 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop'}
                defaultAlt={item2.image?.alt ?? 'Blue woven handbag in sand setting'}
                containerClassName="absolute inset-0 h-full w-full"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Frosted Glass Price Capsule */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-full bg-white/75 backdrop-blur-md border border-white/60 p-1.5 pl-5 shadow-sm">
                <EditableElement
                  as="span"
                  id={`${section.id}-${item2.id}-price`}
                  field="value"
                  value={item2.price ?? '$120.00'}
                  className="text-sm font-bold text-[#12151C]"
                />
                <a
                  href={detailHref}
                  onClick={handleDetailNavigation}
                  aria-label={`View ${item2.title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#181B24] text-white shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" />
                </a>
              </div>
            </div>

            {/* Middle Bottom Card: Yellow Jacket */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#F5F6F8] aspect-[4/3] sm:aspect-[16/12] group shadow-xs">
              <EditableImage
                imageKey={item3.image?.key ?? 'meridian-bento-3'}
                defaultSrc={item3.image?.src ?? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop'}
                defaultAlt={item3.image?.alt ?? 'Woman in yellow jacket and sunglasses'}
                containerClassName="absolute inset-0 h-full w-full"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Frosted Glass Price Capsule */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between rounded-full bg-white/75 backdrop-blur-md border border-white/60 p-1.5 pl-5 shadow-sm">
                <EditableElement
                  as="span"
                  id={`${section.id}-${item3.id}-price`}
                  field="value"
                  value={item3.price ?? '$56.00'}
                  className="text-sm font-bold text-[#12151C]"
                />
                <a
                  href={detailHref}
                  onClick={handleDetailNavigation}
                  aria-label={`View ${item3.title}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#181B24] text-white shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="h-3.5 w-3.5 stroke-[2.2]" />
                </a>
              </div>
            </div>
          </div>

          {/* ── Column 3: Right Text Block + Right Tall Card ────────────── */}
          <div className="flex flex-col gap-6 md:col-span-2 lg:col-span-1 lg:gap-8">
            {/* Top Text Block */}
            <div className="pt-2 lg:pt-1">
              <h2 className="font-sans text-3xl font-bold leading-[1.12] tracking-tight text-[#12151C] sm:text-4xl lg:text-[40px]">
                <EditableElement
                  as="span"
                  id={`${section.id}-title-line-1`}
                  field="value"
                  value="Top Product Of"
                  className="block"
                />
                <EditableElement
                  as="span"
                  id={`${section.id}-title-line-2`}
                  field="value"
                  value="The Month"
                  className="block"
                />
              </h2>
              <EditableElement
                as="p"
                id={`${section.id}-description`}
                field="value"
                value={section.description || 'Made from upcycled ocean plastic, this minimalist backpack redefines functional fashion.'}
                className="mt-3 text-xs leading-5 text-[#6B7280] max-w-xs"
              />
            </div>

            {/* Right Tall Vertical Card: Red Suit */}
            <div className="relative overflow-hidden rounded-[32px] bg-[#F5F6F8] min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] group shadow-xs">
              <EditableImage
                imageKey={item4.image?.key ?? 'meridian-bento-4'}
                defaultSrc={item4.image?.src ?? 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'}
                defaultAlt={item4.image?.alt ?? 'Man in red tailored suit in colorful alley'}
                containerClassName="absolute inset-0 h-full w-full"
                className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Frosted Glass Price Capsule */}
              <div className="absolute bottom-5 left-5 right-5 z-10 flex items-center justify-between rounded-full bg-white/75 backdrop-blur-md border border-white/60 p-2 pl-6 shadow-sm">
                <EditableElement
                  as="span"
                  id={`${section.id}-${item4.id}-price`}
                  field="value"
                  value={item4.price ?? '$80.00'}
                  className="text-sm font-bold text-[#12151C]"
                />
                <a
                  href={detailHref}
                  onClick={handleDetailNavigation}
                  aria-label={`View ${item4.title}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#181B24] text-white shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  <ArrowRight className="h-4 w-4 stroke-[2.2]" />
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </MeridianReveal>
  );
}
