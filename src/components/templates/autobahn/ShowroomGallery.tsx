'use client';

import React, { useState } from 'react';
import { Sparkles, Camera, Check } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { GalleryItem, DEFAULT_GALLERY } from './types';

interface ShowroomGalleryProps {
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryItems?: GalleryItem[];
}

export const ShowroomGallery: React.FC<ShowroomGalleryProps> = ({
  galleryTitle = 'The Showroom & Atelier Gallery',
  gallerySubtitle = 'Facility, Diagnostics & Deliveries',
  galleryItems = DEFAULT_GALLERY,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const items = galleryItems && galleryItems.length > 0 ? galleryItems : DEFAULT_GALLERY;

  const categories = ['All', 'Atelier', 'Showroom', 'Details', 'Experience', 'Logistics'];

  const filteredItems =
    activeFilter === 'All' ? items : items.filter((item) => item.category === activeFilter);

  return (
    <section id="gallery" className="w-full py-24 sm:py-32 bg-theme-background border-t border-theme-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-theme-primary" />
              <EditableElement
                as="span"
                id="auto-gallery-subtitle"
                field="gallerySubtitle"
                value={gallerySubtitle}
                type="text"
                className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
              />
            </div>

            <EditableElement
              as="h2"
              id="auto-gallery-title"
              field="galleryTitle"
              value={galleryTitle}
              type="heading"
              className="font-manrope text-3xl sm:text-5xl font-bold text-theme-foreground tracking-tight leading-tight"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none font-inter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-theme-primary text-theme-primary-text shadow-sm'
                    : 'bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Grid Masonry Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => {
            const blockId = `auto-gallery-img-${idx + 1}`;
            return (
              <div
                key={item.id}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-theme-border bg-theme-surface group shadow-sm hover:shadow-xl hover:border-theme-primary/50 transition-all duration-300 font-inter"
              >
                <EditableImage
                  imageKey={blockId}
                  defaultSrc={item.image}
                  defaultAlt={item.title}
                  className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700 ease-out"
                  containerClassName="w-full h-full absolute inset-0"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-theme-background/90 via-theme-background/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-theme-foreground pointer-events-none">
                  <span className="text-xs font-semibold uppercase tracking-wider text-theme-foreground block mb-1">
                    {item.category}
                  </span>
                  <EditableElement
                    as="h4"
                    id={`${blockId}-title`}
                    field="title"
                    value={item.title}
                    type="heading"
                    className="font-manrope text-base font-bold text-theme-foreground tracking-tight"
                  />
                  <EditableElement
                    as="p"
                    id={`${blockId}-sub`}
                    field="subtitle"
                    value={item.subtitle}
                    type="text"
                    className="text-xs text-theme-muted font-normal"
                  />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
