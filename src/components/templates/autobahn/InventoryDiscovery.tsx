'use client';

import React from 'react';
import {
  MessageSquare,
  Sparkles,
  Gauge,
  Zap,
  Calendar,
  Fuel,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { VehicleItem, DEFAULT_VEHICLES } from './types';

interface InventoryDiscoveryProps {
  inventoryTitle?: string;
  inventorySubtitle?: string;
  inventoryDescription?: string;
  vehicles?: VehicleItem[];
  phone: string;
  dealershipName: string;
  onNavigate?: (pageId: string) => void;
}

export const InventoryDiscovery: React.FC<InventoryDiscoveryProps> = ({
  inventoryTitle = 'Featured Inventory',
  inventorySubtitle = 'Curated Vehicle Registry',
  inventoryDescription = 'Every vehicle in our collection has passed our comprehensive 150-point diagnostic audit. Ready for immediate worldwide delivery or in-person viewing.',
  vehicles = DEFAULT_VEHICLES,
  phone,
  dealershipName,
  onNavigate,
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  const vehicleList = (vehicles && vehicles.length > 0 ? vehicles : DEFAULT_VEHICLES).slice(0, 3);

  return (
    <section id="inventory" className="w-full py-24 sm:py-32 bg-theme-background relative font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-theme-primary" />
              <EditableElement
                as="span"
                id="auto-inventory-subtitle"
                field="inventorySubtitle"
                value={inventorySubtitle}
                type="text"
                className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
              />
            </div>

            <EditableElement
              as="h2"
              id="auto-inventory-title"
              field="inventoryTitle"
              value={inventoryTitle}
              type="heading"
              className="font-manrope text-3xl sm:text-5xl lg:text-6xl font-bold text-theme-foreground tracking-tight leading-tight mb-4"
            />

            <EditableElement
              as="p"
              id="auto-inventory-desc"
              field="inventoryDescription"
              value={inventoryDescription}
              type="text"
              className="text-base text-theme-muted font-normal leading-relaxed"
            />
          </div>
        </div>

        {/* Vehicle Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {vehicleList.map((vehicle, idx) => {
            const blockId = `auto-car-${idx + 1}`;
            const whatsappText = `Hi ${dealershipName}, I am interested in acquiring the ${vehicle.year} ${vehicle.title} (Price: ${vehicle.price}). Is it currently available for a test drive or purchase?`;

            return (
              <motion.div
                key={vehicle.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-theme-surface border border-theme-border rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-theme-primary/50 hover:bg-theme-surface-hover transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div>
                  {/* Vehicle Photography Stage */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-theme-background">
                    <EditableImage
                      imageKey={`${blockId}-image`}
                      defaultSrc={vehicle.image}
                      defaultAlt={vehicle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      containerClassName="w-full h-full absolute inset-0"
                    />
                    
                    {/* Gradient Mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-theme-background/90 via-transparent to-black/20 pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none font-inter">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-theme-background/80 backdrop-blur-md border border-theme-border text-theme-foreground tracking-wide">
                        {vehicle.category}
                      </span>

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                          vehicle.status === 'Available'
                            ? 'bg-theme-accent/20 text-theme-accent border border-theme-accent/40 backdrop-blur-md'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md'
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </div>

                    {/* Bottom Feature Tag */}
                    {vehicle.highlightTag && (
                      <div className="absolute bottom-3 left-3.5 pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-theme-background/80 backdrop-blur-md border border-theme-border text-theme-foreground">
                          <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
                          <span>{vehicle.highlightTag}</span>
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content & Specifications */}
                  <div className="p-5 sm:p-6 flex flex-col gap-4 font-inter">
                    {/* Vehicle Title & Price */}
                    <div>
                      <div className="flex items-baseline justify-between gap-3 mb-1">
                        <EditableElement
                          as="h3"
                          id={`${blockId}-title`}
                          field="title"
                          value={vehicle.title}
                          type="heading"
                          className="font-manrope text-lg sm:text-xl font-bold text-theme-foreground tracking-tight line-clamp-1 group-hover:text-theme-foreground transition-colors"
                        />
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <EditableElement
                          as="span"
                          id={`${blockId}-price`}
                          field="price"
                          value={vehicle.price}
                          type="text"
                          className="font-manrope text-2xl font-extrabold text-theme-foreground tracking-tight"
                        />
                        <span className="text-xs text-theme-muted">
                          Tax & Duty Included
                        </span>
                      </div>
                    </div>

                    {/* Scannable Spec Grid */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-theme-border/60 text-xs text-theme-muted">
                      <div className="flex items-center gap-1.5 bg-theme-background/80 p-2.5 rounded-xl border border-theme-border">
                        <Calendar className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                        <EditableElement
                          as="span"
                          id={`${blockId}-year`}
                          field="year"
                          value={vehicle.year}
                          type="text"
                          className="truncate text-theme-foreground font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 bg-theme-background/80 p-2.5 rounded-xl border border-theme-border">
                        <Gauge className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                        <EditableElement
                          as="span"
                          id={`${blockId}-mileage`}
                          field="mileage"
                          value={vehicle.mileage}
                          type="text"
                          className="truncate text-theme-foreground font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 bg-theme-background/80 p-2.5 rounded-xl border border-theme-border">
                        <Zap className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                        <EditableElement
                          as="span"
                          id={`${blockId}-transmission`}
                          field="transmission"
                          value={vehicle.transmission}
                          type="text"
                          className="truncate text-theme-foreground font-medium"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 bg-theme-background/80 p-2.5 rounded-xl border border-theme-border">
                        <Fuel className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                        <EditableElement
                          as="span"
                          id={`${blockId}-fuel`}
                          field="fuel"
                          value={vehicle.fuel}
                          type="text"
                          className="truncate text-theme-foreground font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="p-5 sm:p-6 pt-0 flex flex-col gap-2.5 font-inter">
                  <EditableButton
                    buttonKey={`${blockId}-inquiry`}
                    defaultText="Inquire on Vehicle"
                    defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappText)}`}
                    defaultOpenInNewTab={true}
                    className="w-full py-3 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {activeButtonOverrides[`${blockId}-inquiry`]?.text || 'Inquire on Vehicle'}
                    </span>
                  </EditableButton>

                  <a
                    href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi, I would like to schedule a private viewing/test drive for the ${vehicle.title}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 text-center text-xs font-medium text-theme-muted hover:text-theme-foreground transition-colors"
                  >
                    Book Private Consultation →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View Full Collection Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => {
              if (onNavigate) {
                onNavigate('store');
              } else {
                window.location.hash = 'store';
                window.scrollTo(0, 0);
              }
            }}
            className="px-8 py-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text font-inter font-semibold text-sm transition-all duration-200 cursor-pointer shadow-lg active:scale-98"
          >
            View Full Available Collection
          </button>
        </div>

      </div>
    </section>
  );
};
