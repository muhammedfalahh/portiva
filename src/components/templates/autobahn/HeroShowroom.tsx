'use client';

import React from 'react';
import {
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  Car,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

interface HeroShowroomProps {
  dealershipName: string;
  location: string;
  phone: string;
  heroTagline?: string;
  heroSubheadline?: string;
  heroDescription?: string;
  heroStageBadge?: string;
  heroStageLocation?: string;
  heroAuditCount?: string;
}

export const HeroShowroom: React.FC<HeroShowroomProps> = ({
  dealershipName,
  location,
  phone,
  heroTagline = 'Engineered For The Driven.',
  heroSubheadline = 'The Precision Showroom Collection',
  heroDescription = 'Explore our hand-curated registry of certified performance, luxury, and modern automobiles. Every vehicle undergoes a comprehensive 150-point technical verification before handover.',
  heroStageBadge = 'Showroom Flagship',
  heroStageLocation = 'Verified Inventory Registry',
  heroAuditCount = '150-Point Audit',
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  return (
    <section className="relative w-full min-h-screen lg:h-screen min-h-[100dvh] flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 overflow-hidden bg-theme-background text-theme-foreground">
      
      {/* ─── Background Cinematic Image Canvas ─── */}
      <div className="absolute inset-0 z-0 bg-theme-background">
        <motion.div
          initial={{ scale: 1.04, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <EditableImage
            imageKey="auto-hero-stage-img"
            defaultSrc="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
            defaultAlt="Autobahn Showroom Flagship Vehicle Stage"
            className="w-full h-full object-cover object-[center_40%] lg:object-[28%_center]"
            containerClassName="w-full h-full absolute inset-0"
          />
        </motion.div>

        {/* Multi-Stage Cinematic Dark Gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-theme-background via-theme-background/65 to-theme-background/25 pointer-events-none z-[1]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-theme-background/95 via-theme-background/50 to-transparent pointer-events-none z-[1] hidden sm:block"
        />
      </div>

      {/* ─── Main Hero Content Grid (Elevated to Primary Visual Zone) ─── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 flex flex-col justify-center flex-1 my-auto py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Left 8-Column Content Block */}
          <div className="lg:col-span-8 flex flex-col gap-4 sm:gap-6 font-inter">
            
            {/* Stage Badges & Audit Tags */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-2.5 sm:gap-3.5"
            >
              <div className="inline-flex items-center gap-2 border border-theme-border bg-theme-surface/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-theme-primary" />
                <EditableElement
                  as="span"
                  id="auto-hero-audit-count"
                  field="heroAuditCount"
                  value={heroAuditCount}
                  type="text"
                  className="text-xs font-semibold tracking-wide text-theme-foreground"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-theme-muted bg-theme-surface/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-theme-border">
                <EditableElement
                  as="span"
                  id="auto-hero-stage-badge"
                  field="heroStageBadge"
                  value={heroStageBadge}
                  type="text"
                  className="inline text-theme-foreground"
                />
                <span className="text-theme-border">•</span>
                <EditableElement
                  as="span"
                  id="auto-hero-stage-location"
                  field="heroStageLocation"
                  value={heroStageLocation}
                  type="text"
                  className="inline text-theme-muted"
                />
              </div>
            </motion.div>

            {/* Main Showroom Headline */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <EditableElement
                as="h1"
                id="auto-hero-headline"
                field="heroTagline"
                value={heroTagline}
                type="heading"
                className="font-manrope text-4xl sm:text-6xl lg:text-[4.2rem] xl:text-[4.75rem] font-bold tracking-tight text-theme-foreground leading-[1.04]"
              />
            </motion.div>

            {/* Subheadline & Description */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-2xl flex flex-col gap-2 font-inter"
            >
              <EditableElement
                as="p"
                id="auto-hero-subheadline"
                field="heroSubheadline"
                value={heroSubheadline}
                type="text"
                className="text-sm sm:text-base font-semibold text-theme-muted uppercase tracking-wider"
              />
              <EditableElement
                as="p"
                id="auto-hero-description"
                field="heroDescription"
                value={heroDescription}
                type="text"
                className="text-base sm:text-lg text-theme-muted font-normal leading-relaxed"
              />
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 font-inter"
            >
              <EditableButton
                buttonKey="auto-hero-primary-cta"
                defaultText="Explore Inventory"
                defaultHref="#inventory"
                className="group relative inline-flex items-center justify-center gap-2.5 bg-theme-primary text-theme-primary-text px-8 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide hover:bg-theme-primary-hover active:scale-98 transition-all duration-300 cursor-pointer shadow-lg"
              >
                <span className="relative z-10">
                  {activeButtonOverrides['auto-hero-primary-cta']?.text || 'Explore Inventory'}
                </span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </EditableButton>

              <EditableButton
                buttonKey="auto-hero-secondary-cta"
                defaultText="Book VIP Consultation"
                defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I would like to schedule a private showroom consultation or test drive.`)}`}
                defaultOpenInNewTab={true}
                className="group inline-flex items-center justify-center gap-2.5 border border-theme-border bg-theme-surface hover:bg-theme-surface-hover px-7 py-4 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-theme-foreground active:scale-98 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <span>
                  {activeButtonOverrides['auto-hero-secondary-cta']?.text || 'Book VIP Consultation'}
                </span>
                <ArrowUpRight className="h-4 w-4 text-theme-muted group-hover:text-theme-foreground transition-colors" />
              </EditableButton>
            </motion.div>

          </div>

        </div>
      </div>

      {/* ─── Bottom Key Highlights Bar (Cleanly Anchored at Bottom) ─── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12 font-inter">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-5 border-t border-theme-border text-xs text-theme-muted"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-theme-primary shrink-0" />
            <span className="font-medium text-xs text-theme-foreground">150-Point Inspected</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-theme-primary shrink-0" />
            <span className="font-medium text-xs text-theme-foreground">Clean Title Guaranteed</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-theme-primary shrink-0" />
            <span className="font-medium text-xs text-theme-foreground">Instant Finance Pre-Approval</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Car className="w-4 h-4 text-theme-primary shrink-0" />
            <span className="font-medium text-xs text-theme-foreground">Enclosed Nationwide Delivery</span>
          </div>
        </motion.div>
      </div>

    </section>
  );
};
