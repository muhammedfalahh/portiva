'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronsLeftRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useScrollReveal } from './useScrollReveal';
import type { BeforeAfterItem } from './types';

interface BeforeAfterSliderProps {
  beforeAfterTitle: string;
  beforeAfterSubtitle: string;
  beforeAfterItems: BeforeAfterItem[];
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeAfterTitle,
  beforeAfterSubtitle,
  beforeAfterItems,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPair = beforeAfterItems[activeItemIndex] || beforeAfterItems[0];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updatePosition]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      setSliderPosition((prev) => Math.max(0, prev - 3));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      setSliderPosition((prev) => Math.min(100, prev + 3));
    }
  };

  if (!currentPair) return null;

  return (
    <section
      id="before-after"
      ref={ref}
      className={`w-full py-28 bg-theme-background border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent">
            TRANSFORMATION ARTISTRY
          </span>
          <EditableElement
            as="h2"
            id="aura-ba-title"
            field="beforeAfterTitle"
            value={beforeAfterTitle}
            type="heading"
            className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
          />
          <EditableElement
            as="p"
            id="aura-ba-subtitle"
            field="beforeAfterSubtitle"
            value={beforeAfterSubtitle}
            type="text"
            className="font-sans text-sm text-theme-muted"
          />

          {/* Item Selector Tabs (if multiple pairs) */}
          {beforeAfterItems.length > 1 && (
            <div className="flex items-center justify-center gap-3 pt-4">
              {beforeAfterItems.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => {
                    setActiveItemIndex(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium uppercase tracking-wider transition-all ${
                    activeItemIndex === idx
                      ? 'bg-theme-primary text-theme-background shadow-xs font-bold'
                      : 'bg-theme-surface border border-theme-border/40 text-theme-muted hover:text-theme-foreground'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Split-Screen Comparison Slider Card */}
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-theme-border/50 bg-theme-surface">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden select-none cursor-ew-resize touch-none"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            role="slider"
            aria-valuenow={Math.round(sliderPosition)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Before and After Image Comparison Slider"
          >
            {/* Base Layer: "Before" Image */}
            <div className="absolute inset-0 w-full h-full">
              <EditableImage
                imageKey={`aura-ba-before-${activeItemIndex}`}
                defaultSrc={currentPair.beforeImage}
                defaultAlt="Before Transformation"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>

            {/* Overlay Layer: "After" Image clipped dynamically */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <EditableImage
                imageKey={`aura-ba-after-${activeItemIndex}`}
                defaultSrc={currentPair.afterImage}
                defaultAlt="After Transformation"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>

            {/* Unclipped Badge Overlays */}
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none px-4 py-1.5 rounded-full bg-theme-foreground/80 text-theme-background text-xs font-sans font-bold uppercase tracking-widest backdrop-blur-md">
              Before
            </div>
            <div className="absolute bottom-6 right-6 z-10 pointer-events-none px-4 py-1.5 rounded-full bg-theme-accent text-theme-background text-xs font-sans font-bold uppercase tracking-widest backdrop-blur-md shadow-md">
              After
            </div>

            {/* Vertical Glass Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Central Circular Touch Grip Handle */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-theme-background/90 border-2 border-theme-accent text-theme-foreground shadow-xl flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
                <ChevronsLeftRight className="w-5 h-5 text-theme-accent" />
              </div>
            </div>
          </div>

          {/* Transformation Details Summary Footer */}
          <div className="p-6 bg-theme-surface border-t border-theme-border/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-theme-accent block">
                {currentPair.category}
              </span>
              <EditableElement
                as="h3"
                id={`aura-ba-${activeItemIndex}-title`}
                field="title"
                value={currentPair.title}
                type="heading"
                className="font-editorial text-2xl font-semibold text-theme-foreground"
              />
              <EditableElement
                as="p"
                id={`aura-ba-${activeItemIndex}-details`}
                field="transformationDetails"
                value={currentPair.transformationDetails}
                type="text"
                className="font-sans text-xs text-theme-muted mt-1"
              />
            </div>

            {currentPair.clientQuote && (
              <div className="max-w-md bg-theme-background/60 p-3.5 rounded-2xl border border-theme-border/30 text-xs font-editorial italic text-theme-foreground">
                <EditableElement
                  as="p"
                  id={`aura-ba-${activeItemIndex}-quote`}
                  field="clientQuote"
                  value={currentPair.clientQuote}
                  type="text"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
