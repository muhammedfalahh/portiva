'use client';

import React from 'react';
import {
  Sparkles,
  Zap,
  Gauge,
  Timer,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

interface FeaturedSpotlightProps {
  spotlightTag?: string;
  spotlightTitle?: string;
  spotlightSubtitle?: string;
  spotlightDescription?: string;
  spotlightVehicleName?: string;
  spotlightPrice?: string;
  spotlightPower?: string;
  spotlightAcceleration?: string;
  spotlightTopSpeed?: string;
  spotlightTransmission?: string;
  spotlightQuote?: string;
  phone: string;
  dealershipName: string;
}

export const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({
  spotlightTag = 'Flagship Spotlight',
  spotlightTitle = 'The Pinnacle of Automotive Artistry.',
  spotlightSubtitle = 'Exemplary Engineering Specification',
  spotlightDescription = 'Each quarter, our curation team spotlights one vehicle that exemplifies peak mechanical execution, flawless cosmetic presentation, and unmatched performance character.',
  spotlightVehicleName = 'Porsche 911 GT3 RS Coupe (992)',
  spotlightPrice = '$289,900',
  spotlightPower = '518 HP @ 8,500 RPM',
  spotlightAcceleration = '0-100 KM/H: 3.0 SEC',
  spotlightTopSpeed = 'TOP SPEED: 296 KM/H',
  spotlightTransmission = '7-SPEED DUAL-CLUTCH PDK',
  spotlightQuote = 'Every vehicle in our collection represents the highest threshold of automotive engineering, verified telemetry, and uncompromised craftsmanship.',
  phone,
  dealershipName,
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  return (
    <section id="spotlight" className="w-full py-24 sm:py-32 bg-theme-surface border-t border-theme-border relative overflow-hidden font-inter">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-12 border-b border-theme-border text-xs font-inter font-semibold text-theme-muted uppercase tracking-wider">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-theme-primary" />
            <EditableElement
              as="span"
              id="auto-spotlight-tag"
              field="spotlightTag"
              value={spotlightTag}
              type="text"
              className="text-theme-foreground"
            />
          </div>
          <EditableElement
            as="span"
            id="auto-spotlight-sub"
            field="spotlightSubtitle"
            value={spotlightSubtitle}
            type="text"
            className="text-theme-muted"
          />
        </div>

        {/* Magazine Editorial Spotlight Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left 7 Columns: Visual Stage Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-6 group">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-theme-border bg-theme-background shadow-2xl">
              <EditableImage
                imageKey="auto-spotlight-img"
                defaultSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop"
                defaultAlt="Featured Flagship Vehicle"
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000 ease-out"
                containerClassName="w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-background/90 via-transparent to-transparent pointer-events-none" />

              {/* Corner Tag */}
              <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-theme-surface/90 backdrop-blur-md border border-theme-border text-theme-foreground font-inter text-xs font-semibold uppercase tracking-wider">
                Featured Specification
              </div>

              {/* Price Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <EditableElement
                    as="h4"
                    id="auto-spotlight-vname"
                    field="spotlightVehicleName"
                    value={spotlightVehicleName}
                    type="heading"
                    className="font-manrope text-xl sm:text-2xl font-bold text-theme-foreground tracking-tight leading-tight"
                  />
                  <div className="flex items-center gap-2 text-theme-muted text-xs font-inter mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-theme-primary" />
                    <span>Single Owner Provenance • Factory Warranty</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-theme-muted block font-medium">Offering Price</span>
                  <EditableElement
                    as="span"
                    id="auto-spotlight-price"
                    field="spotlightPrice"
                    value={spotlightPrice}
                    type="text"
                    className="font-manrope text-2xl sm:text-3xl font-extrabold text-theme-foreground tracking-tight"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Telemetry Specs & Editorial Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 font-inter">
            <div>
              <EditableElement
                as="h3"
                id="auto-spotlight-title"
                field="spotlightTitle"
                value={spotlightTitle}
                type="heading"
                className="font-manrope text-3xl sm:text-4xl font-bold text-theme-foreground tracking-tight leading-tight mb-4"
              />

              <EditableElement
                as="p"
                id="auto-spotlight-desc"
                field="spotlightDescription"
                value={spotlightDescription}
                type="text"
                className="text-base text-theme-muted font-normal leading-relaxed mb-8"
              />

              {/* Performance Telemetry Grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-4 rounded-xl bg-theme-background/80 border border-theme-border">
                  <div className="flex items-center gap-2 text-theme-muted text-xs uppercase font-medium mb-1">
                    <Zap className="w-3.5 h-3.5 text-theme-primary" />
                    <span>Peak Power</span>
                  </div>
                  <EditableElement
                    as="span"
                    id="auto-spotlight-pwr"
                    field="spotlightPower"
                    value={spotlightPower}
                    type="text"
                    className="text-sm font-bold text-theme-foreground font-manrope"
                  />
                </div>

                <div className="p-4 rounded-xl bg-theme-background/80 border border-theme-border">
                  <div className="flex items-center gap-2 text-theme-muted text-xs uppercase font-medium mb-1">
                    <Timer className="w-3.5 h-3.5 text-theme-primary" />
                    <span>Acceleration</span>
                  </div>
                  <EditableElement
                    as="span"
                    id="auto-spotlight-acc"
                    field="spotlightAcceleration"
                    value={spotlightAcceleration}
                    type="text"
                    className="text-sm font-bold text-theme-foreground font-manrope"
                  />
                </div>

                <div className="p-4 rounded-xl bg-theme-background/80 border border-theme-border">
                  <div className="flex items-center gap-2 text-theme-muted text-xs uppercase font-medium mb-1">
                    <Gauge className="w-3.5 h-3.5 text-theme-primary" />
                    <span>Top Velocity</span>
                  </div>
                  <EditableElement
                    as="span"
                    id="auto-spotlight-spd"
                    field="spotlightTopSpeed"
                    value={spotlightTopSpeed}
                    type="text"
                    className="text-sm font-bold text-theme-foreground font-manrope"
                  />
                </div>

                <div className="p-4 rounded-xl bg-theme-background/80 border border-theme-border">
                  <div className="flex items-center gap-2 text-theme-muted text-xs uppercase font-medium mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
                    <span>Gearbox</span>
                  </div>
                  <EditableElement
                    as="span"
                    id="auto-spotlight-trans"
                    field="spotlightTransmission"
                    value={spotlightTransmission}
                    type="text"
                    className="text-sm font-bold text-theme-foreground font-manrope"
                  />
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Reservation CTA */}
            <div className="pt-6 border-t border-theme-border flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <EditableButton
                buttonKey="auto-spotlight-cta"
                defaultText="Inquire on Spotlight Vehicle"
                defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I am interested in inquiring about the Spotlight ${spotlightVehicleName} listed for ${spotlightPrice}.`)}`}
                defaultOpenInNewTab={true}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold tracking-wide active:scale-98 transition shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span className="shrink-0">
                  {activeButtonOverrides['auto-spotlight-cta']?.text || 'Inquire on Spotlight Vehicle'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </EditableButton>
            </div>

          </div>

        </div>

        {/* Section Quote Banner */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-10 rounded-2xl bg-theme-background/80 border border-theme-border text-center max-w-4xl mx-auto font-inter">
          <blockquote className="text-base sm:text-xl font-normal text-theme-muted leading-relaxed italic">
            &quot;<EditableElement
              as="span"
              id="auto-spotlight-quote"
              field="spotlightQuote"
              value={spotlightQuote}
              type="text"
              className="inline text-theme-foreground"
            />&quot;
          </blockquote>
        </div>

      </div>
    </section>
  );
};
