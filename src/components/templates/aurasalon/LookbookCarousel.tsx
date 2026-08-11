'use client';

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import { useScrollReveal } from './useScrollReveal';
import type { LookbookItem } from './types';

interface LookbookCarouselProps {
  lookbookTitle: string;
  lookbookSubtitle: string;
  lookbookItems: LookbookItem[];
}

export const LookbookCarousel: React.FC<LookbookCarouselProps> = ({
  lookbookTitle,
  lookbookSubtitle,
  lookbookItems,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  // STRICT MAXIMUM OF 5 ITEMS CAP AT DATA LEVEL
  const cappedItems = (lookbookItems || []).slice(0, 5);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const builderCtx = useVisualBuilder();
  const isEditing = builderCtx?.mode === 'EDITING';

  const totalSlides = cappedItems.length;

  const nextSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides === 0) return;
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Pointer & Touch drag handlers (DISABLED IN EDITING MODE)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isEditing || totalSlides <= 1) return;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || isEditing) return;
    const deltaX = e.clientX - dragStartX;
    setDragOffset(deltaX);
  };

  const handlePointerUp = () => {
    if (!isDragging || isEditing) return;
    setIsDragging(false);
    if (dragOffset < -50) {
      nextSlide();
    } else if (dragOffset > 50) {
      prevSlide();
    }
    setDragOffset(0);
  };

  if (totalSlides === 0) return null;

  const formattedCounter = `${String(activeIndex + 1).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;

  return (
    <EditableElement
      as="section"
      id="aura-lookbook-section"
      field="lookbookSection"
      value="Lookbook Section"
      type="container"
      className={`w-full py-24 bg-theme-surface/40 border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header with Numerical Indicator & Arrows */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <EditableElement
              as="span"
              id="aura-lookbook-eyebrow"
              field="lookbookEyebrow"
              value="CURATED GALLERY"
              type="text"
              className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent block mb-2"
            />
            <EditableElement
              as="h2"
              id="aura-lookbook-title"
              field="lookbookTitle"
              value={lookbookTitle}
              type="heading"
              className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
            />
            <EditableElement
              as="p"
              id="aura-lookbook-sub"
              field="lookbookSubtitle"
              value={lookbookSubtitle}
              type="text"
              className="font-sans text-sm text-theme-muted mt-2 max-w-lg"
            />
          </div>

          {/* Navigation Controls & Zero-Padded Counter */}
          <div className="flex items-center gap-6">
            <EditableElement
              as="span"
              id="aura-lookbook-counter"
              field="formattedCounter"
              value={formattedCounter}
              type="text"
              className="font-editorial text-2xl font-bold text-theme-accent tracking-widest"
            />

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-theme-border/50 bg-theme-surface hover:bg-theme-primary hover:text-theme-background text-theme-foreground transition-colors focus:outline-none"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-theme-border/50 bg-theme-surface hover:bg-theme-primary hover:text-theme-background text-theme-foreground transition-colors focus:outline-none"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container with Active Focus Scaling */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`relative overflow-hidden cursor-grab active:cursor-grabbing select-none ${
            isEditing ? 'cursor-default' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-4">
            {cappedItems.map((item, idx) => {
              const isCenter = idx === activeIndex;
              const isPrev = idx === (activeIndex - 1 + totalSlides) % totalSlides;
              const isNext = idx === (activeIndex + 1) % totalSlides;

              // Display logic for 3 visible cards at a time on desktop
              let visibilityClass = 'hidden md:block opacity-40 scale-95 saturate-50';
              if (isCenter) {
                visibilityClass = 'block opacity-100 scale-100 shadow-2xl z-20';
              } else if (isPrev || isNext) {
                visibilityClass = 'hidden md:block opacity-60 scale-95 hover:opacity-80 transition-opacity';
              }

              return (
                <div
                  key={item.id || idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative rounded-3xl overflow-hidden border border-theme-border/40 transition-all duration-500 transform ${visibilityClass}`}
                >
                  <div className="relative aspect-[3/4] w-full">
                    <EditableImage
                      imageKey={`aura-lookbook-img-${idx}`}
                      defaultSrc={item.image}
                      defaultAlt={item.title || `Lookbook image ${idx + 1}`}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-foreground/80 via-transparent to-transparent opacity-80" />

                    {/* Badge */}
                    {item.badge && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-theme-accent text-theme-background text-[10px] font-sans font-bold uppercase tracking-widest shadow-sm z-10">
                        <EditableElement
                          as="span"
                          id={`aura-lookbook-${idx}-badge`}
                          field="badge"
                          value={item.badge}
                          type="text"
                          className="inline"
                        />
                      </div>
                    )}

                    {/* Content Overlay */}
                    <div className="absolute bottom-6 left-6 right-6 text-theme-background space-y-1 z-10">
                      <span className="font-sans text-[11px] font-bold uppercase tracking-widest text-theme-accent block">
                        <EditableElement
                          as="span"
                          id={`aura-lookbook-${idx}-category`}
                          field="category"
                          value={item.category}
                          type="text"
                          className="inline"
                        />
                      </span>
                      <EditableElement
                        as="h3"
                        id={`aura-lookbook-${idx}-title`}
                        field="title"
                        value={item.title}
                        type="heading"
                        className="font-editorial text-2xl font-semibold leading-tight text-white"
                      />
                      {item.description && (
                        <EditableElement
                          as="p"
                          id={`aura-lookbook-${idx}-desc`}
                          field="description"
                          value={item.description}
                          type="text"
                          className="font-sans text-xs text-white/80 line-clamp-2 pt-1"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </EditableElement>
  );
};
