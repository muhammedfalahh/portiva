'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 3 Favorite Picks Grid
 * =============================================================================
 *
 * Direct translation of Reference Image 3 (middle & bottom):
 * - Centered title: "Favorite Picks" + subtitle
 * - Category filter pill tabs ("All Products", "Hoodie", "Bags", "Men", "Women", "Footwear", "Home")
 * - 8 responsive product cards (4 cols desktop, 2 cols mobile)
 * - Category filtering state + smooth layout transitions
 * - 100% builder editable
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { MeridianHeading, MeridianReveal } from './MeridianSection';
import { ProductCard } from './ProductCard';
import { toMeridianProduct } from './products';

export interface StorefrontSectionProps {
  section: PremiumTemplateSection;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  reducedMotion: boolean;
}

export function FeaturedProducts({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: StorefrontSectionProps) {
  if (section.type !== 'cards') return null;

  const [activeCategory, setActiveCategory] = useState('All Products');

  const categories = useMemo(() => {
    const list = ['All Products'];
    const seen = new Set<string>();
    for (const item of section.items) {
      const prod = toMeridianProduct(item);
      if (prod.category && !seen.has(prod.category)) {
        seen.add(prod.category);
        list.push(prod.category);
      }
    }
    return list;
  }, [section.items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All Products') return section.items;
    return section.items.filter((item) => {
      const prod = toMeridianProduct(item);
      return prod.category?.toLowerCase() === activeCategory.toLowerCase();
    });
  }, [section.items, activeCategory]);

  const handleActionNavigation =
    (pageId: string | undefined) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (!pageId || !onNavigate || mode !== 'builder') return;
      event.preventDefault();
      onNavigate(pageId);
    };

  const action = section.primaryAction;

  return (
    <MeridianReveal className="w-full bg-white py-14 sm:py-20 lg:py-24" reducedMotion={reducedMotion}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading */}
        <div className="text-center max-w-lg mx-auto">
          <EditableElement
            as="h2"
            id={`${section.id}-title`}
            field="value"
            value={section.title || 'Favorite Picks'}
            className="font-sans text-4xl font-bold tracking-tight text-[#12151C] sm:text-5xl"
          />
          <EditableElement
            as="p"
            id={`${section.id}-description`}
            field="value"
            value={section.description || 'Step into fashion that not only looks good but feels right. Every piece in our collection is made with love.'}
            className="mt-3 text-xs leading-5 text-[#6B7280] sm:text-sm max-w-sm mx-auto"
          />
        </div>

        {/* Category Filter Pill Bar */}
        <div className="mt-8 flex justify-center overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-2.5">
            {categories.map((cat) => {
              const isActive = cat === activeCategory;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-xs font-semibold tracking-wide transition-all duration-200 active:scale-95 ${
                    isActive
                      ? 'bg-[#181B24] text-white shadow-xs'
                      : 'border border-[#D1D5DB] bg-white text-[#4B5563] hover:border-[#181B24] hover:text-[#181B24]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive 4-Column Product Grid */}
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout={!reducedMotion}
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard
                item={item}
                sectionId={section.id}
                definition={definition}
                handle={handle}
                templateId={templateId}
                mode={mode}
                onNavigate={onNavigate}
              />
            </motion.div>
          ))}
        </div>

        {action ? (
          <div className="mt-14 flex justify-center">
            <EditableButton
              buttonKey={`${section.id}-${action.id}`}
              defaultText={action.label}
              defaultHref={buildHref(action, definition, handle, templateId)}
              onViewClick={handleActionNavigation(action.targetPageId)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#181B24] px-8 py-3.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-[#2A2E3B] active:scale-[0.98] sm:text-sm"
              contentClassName="font-medium text-white"
            />
          </div>
        ) : null}
      </div>
    </MeridianReveal>
  );
}

