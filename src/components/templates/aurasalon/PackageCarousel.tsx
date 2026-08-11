'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Check, MessageCircle, Star } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { useScrollReveal } from './useScrollReveal';
import type { PackageItem } from './types';

interface PackageCarouselProps {
  packagesTitle: string;
  packagesSubtitle: string;
  packages: PackageItem[];
  phone: string;
}

export const PackageCarousel: React.FC<PackageCarouselProps> = ({
  packagesTitle,
  packagesSubtitle,
  packages,
  phone,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const builderCtx = useVisualBuilder();
  const activeButtonOverrides: Record<string, ButtonOverride> = (builderCtx?.templateData?.buttonOverrides as Record<string, ButtonOverride>) || {};

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  const scrollBy = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = direction === 'left' ? -360 : 360;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    setTimeout(checkScroll, 300);
  };

  return (
    <section
      id="packages"
      ref={ref}
      className={`w-full py-28 bg-theme-background border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent block mb-2">
              PRICING & EXPERIENCE PACKAGES
            </span>
            <EditableElement
              as="h2"
              id="aura-packages-title"
              field="packagesTitle"
              value={packagesTitle}
              type="heading"
              className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
            />
            <EditableElement
              as="p"
              id="aura-packages-sub"
              field="packagesSubtitle"
              value={packagesSubtitle}
              type="text"
              className="font-sans text-sm text-theme-muted mt-2 max-w-lg"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              className={`p-3 rounded-full border border-theme-border/50 bg-theme-surface transition-all ${
                canScrollLeft
                  ? 'hover:bg-theme-primary hover:text-theme-background text-theme-foreground'
                  : 'opacity-40 cursor-not-allowed text-theme-muted'
              }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              className={`p-3 rounded-full border border-theme-border/50 bg-theme-surface transition-all ${
                canScrollRight
                  ? 'hover:bg-theme-primary hover:text-theme-background text-theme-foreground'
                  : 'opacity-40 cursor-not-allowed text-theme-muted'
              }`}
              aria-label="Scroll Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Snap Scrolling Package Cards Container */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none py-6 px-1"
        >
          {packages.map((pkg, idx) => {
            const isFeatured = pkg.isPopular || pkg.name.toLowerCase().includes('royal');

            return (
              <div
                key={pkg.id || idx}
                className={`snap-center shrink-0 w-full max-w-sm sm:w-[360px] rounded-3xl p-8 border transition-all duration-300 flex flex-col justify-between relative ${
                  isFeatured
                    ? 'bg-theme-surface border-2 border-theme-accent/80 shadow-2xl scale-[1.02]'
                    : 'bg-theme-surface/50 border-theme-border/40 hover:border-theme-accent/40 shadow-xs'
                }`}
              >
                {/* Popular Highlight Badge */}
                {isFeatured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-theme-accent text-theme-background text-[10px] font-sans font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                    <Star className="w-3 h-3 fill-theme-background" />
                    <span>Most Preferred Package</span>
                  </div>
                )}

                <div>
                  <EditableElement
                    as="h3"
                    id={`aura-pkg-${idx}-name`}
                    field="name"
                    value={pkg.name}
                    type="heading"
                    className="font-editorial text-3xl font-semibold text-theme-foreground mb-1"
                  />
                  <EditableElement
                    as="p"
                    id={`aura-pkg-${idx}-subtitle`}
                    field="subtitle"
                    value={pkg.subtitle}
                    type="text"
                    className="font-sans text-xs text-theme-muted mb-6"
                  />

                  {/* Price Section */}
                  <div className="flex items-baseline gap-3 mb-8">
                    <EditableElement
                      as="span"
                      id={`aura-pkg-${idx}-price`}
                      field="price"
                      value={pkg.price}
                      type="heading"
                      className="font-editorial text-4xl sm:text-5xl font-bold text-theme-foreground"
                    />
                    {pkg.originalPrice && (
                      <EditableElement
                        as="span"
                        id={`aura-pkg-${idx}-origprice`}
                        field="originalPrice"
                        value={pkg.originalPrice}
                        type="text"
                        className="font-sans text-base text-theme-muted line-through"
                      />
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3.5 mb-8 border-t border-theme-border/20 pt-6">
                    {pkg.features.map((feat, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-xs font-sans text-theme-foreground/90">
                        <Check className="w-4 h-4 text-theme-accent mt-0.5 shrink-0" />
                        <EditableElement
                          as="span"
                          id={`aura-pkg-${idx}-feat-${fi}`}
                          field={`feature_${fi}`}
                          value={feat}
                          type="text"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp Booking CTA */}
                <EditableButton
                  buttonKey={`aura-package-${idx}-book`}
                  defaultText={pkg.ctaText || 'Reserve Package'}
                  defaultHref={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    pkg.whatsappMessage || `Hi Ananya, I want to reserve the ${pkg.name} package (${pkg.price}).`
                  )}`}
                  defaultOpenInNewTab={true}
                  className={`w-full py-3.5 rounded-full text-xs font-sans font-semibold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 ${
                    isFeatured
                      ? 'bg-theme-primary text-theme-background hover:bg-theme-primary-hover shadow-md'
                      : 'border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-theme-background'
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{activeButtonOverrides[`aura-package-${idx}-book`]?.text || pkg.ctaText || 'Reserve Package'}</span>
                </EditableButton>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
