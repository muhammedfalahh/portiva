'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { EditableButton } from '@/components/engine/EditableButton';
import { Badge } from '@/components/ui/badge';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { makeInternalNavigator } from './primitives';
import type { BlacklineSectionProps } from './types';

type HeroSection = Extract<PremiumTemplateSection, { type: 'hero' }>;

export function BlacklineHero({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: BlacklineSectionProps<HeroSection>) {
  const styleOverrides = useStyleOverrides();
  const handleInternalNavigation = makeInternalNavigator(mode, onNavigate);
  const [searchQuery, setSearchQuery] = useState('');

  const rawTitle = section.title || 'We are the best car dealer you will find.';

  // Split title to style "We are" in vibrant orange accent matching the reference image
  const titleParts = useMemo(() => {
    const match = rawTitle.match(/^(we are\s*)(.*)$/i);
    if (match) {
      return {
        prefix: match[1],
        rest: match[2],
      };
    }
    return {
      prefix: '',
      rest: rawTitle,
    };
  }, [rawTitle]);

  const searchLabel = section.description || 'Find your dream vehicle right now:';

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'builder') return;

    // Smooth scroll to featured cars or navigate to store
    const featuredEl = document.getElementById('bl-home-featured');
    if (featuredEl) {
      featuredEl.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate('store');
    }
  };

  const primaryAction = section.primaryAction || {
    id: 'book-now',
    label: 'View Our Cars',
    targetPageId: 'store',
  };

  const secondaryAction = section.secondaryAction || {
    id: 'contact-cta',
    label: 'Get In Touch',
    href: '#contact',
  };

  const heroImageSrc =
    section.media?.src ||
    'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop';
  const heroImageAlt =
    section.media?.alt || 'Dynamic orange performance sports coupe on mountain pass';

  const stats =
    section.stats && section.stats.length > 0
      ? section.stats
      : [
          { id: 'h1', label: '0-100 KM/H', value: '2.9s' },
          { id: 'h2', label: 'TOP VELOCITY', value: '325 KM/H' },
          { id: 'h3', label: 'CERTIFIED', value: '150-PT' },
        ];

  const surface = blacklineSurface({ sectionId: section.id, tone: 'base', styleOverrides });
  const sectionOverride = styleOverrides ? (styleOverrides as Record<string, any>)[`${section.id}-section`] : undefined;
  // Ensure the hero canvas always uses an obsidian backdrop for guaranteed text visibility
  const heroSurfaceStyle: React.CSSProperties = {
    ...surface,
    backgroundColor: sectionOverride?.backgroundColor || '#080C14',
    backgroundImage: sectionOverride?.backgroundColor ? undefined : 'none',
    color: '#FFFFFF',
  };

  return (
    <section
      className="relative w-full min-h-[88vh] sm:min-h-[90vh] lg:min-h-[94vh] max-h-[1100px] flex items-center overflow-hidden bg-[#080C14] text-white"
      style={heroSurfaceStyle}
    >
      {/* ── 1. Full-Bleed Cinematic Background Image Canvas ── */}
      <div className="absolute inset-0 z-0 bg-[#080C14]">
        {section.media ? (
          <EditableImage
            imageKey={section.media.key || `${section.id}-image`}
            defaultSrc={heroImageSrc}
            defaultAlt={heroImageAlt}
            containerClassName="w-full h-full absolute inset-0"
            className="w-full h-full object-cover object-[center_35%] lg:object-[25%_center] filter brightness-[0.88] contrast-[1.08]"
          />
        ) : (
          <img
            src={heroImageSrc}
            alt={heroImageAlt}
            className="w-full h-full object-cover object-[center_35%] lg:object-[25%_center] filter brightness-[0.88] contrast-[1.08]"
          />
        )}

        {/* Cinematic High-Contrast Multi-Layer Gradient Scrims */}
        {/* Right-Side Content Contrast Scrim */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full lg:w-3/5 bg-gradient-to-t from-[#080C14] via-[#080C14]/90 to-[#080C14]/60 lg:bg-gradient-to-l lg:from-[#080C14] lg:via-[#080C14]/95 lg:to-transparent pointer-events-none z-[1]"
        />

        {/* Global Cinematic Depth Vignette */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#080C14] via-black/30 to-black/50 pointer-events-none z-[1]"
        />

        {/* Ambient Radial Lighting Glows */}
        <div
          aria-hidden="true"
          className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#0066FF]/15 blur-3xl pointer-events-none z-[1]"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-1/4 left-1/4 h-80 w-80 rounded-full bg-[#FF5500]/12 blur-3xl pointer-events-none z-[1]"
        />

        {/* Subtle Fine Technical Grid Overlay */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_60%,transparent_100%)] pointer-events-none z-[1]"
        />
      </div>

      {/* ── 2. Top-Right Telemetry Watermark ── */}
      <div
        aria-hidden="true"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 hidden md:flex items-center gap-3 text-[11px] font-mono tracking-widest text-white/60 z-10 select-none uppercase drop-shadow-md"
      >
        <span className="h-2 w-2 rounded-full bg-[#FF5500] animate-pulse" />
        <span>AUTOBAHN PRO // LAT 47.5162° N • ELEV 1,420M</span>
      </div>

      {/* ── 3. Main Hero Interactive Content Grid ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column Dynamic Car Stage Spacer (Desktop) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-end min-h-[460px]">
            {/* Floating Subtle Telemetry Capsule */}
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={reducedMotion ? undefined : { duration: 0.6, delay: 0.3 }}
              className="self-start inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-black/60 px-4 py-2.5 backdrop-blur-xl shadow-2xl"
            >
              <ShieldCheck className="h-4 w-4 text-[#0066FF]" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase drop-shadow-sm">
                150-PT TELEMETRY AUDIT VERIFIED
              </span>
            </motion.div>
          </div>

          {/* Right Column: High-Contrast Hero Content Matching Reference (Cols 7-12) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, x: 24 }}
              animate={reducedMotion ? undefined : { opacity: 1, x: 0 }}
              transition={
                reducedMotion
                  ? undefined
                  : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
              }
              className="max-w-2xl bg-black/35 sm:bg-black/25 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none p-6 sm:p-8 lg:p-0 rounded-3xl border border-white/15 lg:border-none shadow-2xl lg:shadow-none"
            >
              {/* Optional Eyebrow Badge */}
              {section.eyebrow ? (
                <div className="mb-4 inline-flex items-center">
                  <Badge
                    variant="outline"
                    className="gap-2 border-white/30 bg-black/50 text-white backdrop-blur-md px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider shadow-md"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-[#FF5500]" />
                    <EditableElement
                      as="span"
                      id={`${section.id}-eyebrow`}
                      field="value"
                      value={section.eyebrow}
                      className="inline text-white"
                    />
                  </Badge>
                </div>
              ) : null}

              {/* ── Main Headline (2-Color High-Contrast Typography) ── */}
              <div className="mb-6 sm:mb-8">
                {titleParts.prefix ? (
                  <h1 className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                    <span className="text-[#FF5500] font-black drop-shadow-[0_2px_12px_rgba(255,85,0,0.4)]">
                      {titleParts.prefix}
                    </span>
                    <EditableElement
                      as="span"
                      id={`${section.id}-title`}
                      field="value"
                      value={rawTitle}
                      className="text-white inline font-black"
                    >
                      {titleParts.rest}
                    </EditableElement>
                  </h1>
                ) : (
                  <EditableElement
                    as="h1"
                    id={`${section.id}-title`}
                    field="value"
                    value={rawTitle}
                    className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4.2rem] font-black tracking-tight text-white leading-[1.06] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
                  />
                )}
              </div>

              {/* ── Dual CTA Action Row (View Our Cars ↗ & Get In Touch ›) ── */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                {/* Primary CTA: Solid Deep Blue Pill Button */}
                <EditableButton
                  buttonKey={`${section.id}-${primaryAction.id}`}
                  defaultText={primaryAction.label || 'View Our Cars'}
                  defaultHref={buildHref(primaryAction, definition, handle, templateId)}
                  trailingIcon={<ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2.8} />}
                  onViewClick={(event) => {
                    if (primaryAction.targetPageId) {
                      handleInternalNavigation(event, primaryAction.targetPageId);
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#0066FF] hover:bg-[#0052CC] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-[0_4px_24px_rgba(0,102,255,0.6)] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                />

                {/* Secondary CTA: Crisp White Link with Caret */}
                <EditableButton
                  buttonKey={`${section.id}-${secondaryAction.id}`}
                  defaultText={secondaryAction.label || 'Get In Touch'}
                  defaultHref={buildHref(secondaryAction, definition, handle, templateId)}
                  trailingIcon={
                    <ChevronRight
                      className="h-4 w-4 text-white group-hover:translate-x-1 transition-transform"
                      strokeWidth={2.8}
                    />
                  }
                  onViewClick={(event) => {
                    if (secondaryAction.targetPageId) {
                      handleInternalNavigation(event, secondaryAction.targetPageId);
                    }
                  }}
                  className="group inline-flex items-center gap-1.5 px-4 py-4 text-sm sm:text-base font-bold text-white hover:text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-colors duration-200 cursor-pointer"
                />
              </div>

              {/* ── Dream Vehicle Search Capsule Module ── */}
              <div className="mt-9 sm:mt-12">
                {/* Search Label */}
                <EditableElement
                  as="p"
                  id={`${section.id}-description`}
                  field="value"
                  value={searchLabel}
                  className="text-base sm:text-lg font-bold text-white tracking-wide mb-3.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                />

                {/* High-Contrast Frosted Search Capsule */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="group relative flex w-full max-w-xl items-center justify-between rounded-full border border-white/35 bg-black/50 p-2 pl-6 sm:pl-7 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-300 hover:bg-black/60 hover:border-white/50 focus-within:bg-black/75 focus-within:border-[#0066FF] focus-within:shadow-[0_8px_36px_rgba(0,102,255,0.4)]"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by car make, model, etc."
                    className="w-full bg-transparent font-sans text-sm sm:text-base font-medium text-white placeholder:text-white/80 outline-none pr-3"
                  />

                  {/* Circular Deep Blue Search Action Button */}
                  <button
                    type="submit"
                    aria-label="Search Inventory"
                    className="flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#0066FF] hover:bg-[#0052CC] text-white shadow-[0_0_24px_rgba(0,102,255,0.7)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Search className="h-4.5 w-4.5 sm:h-5 sm:w-5 text-white" strokeWidth={2.6} />
                  </button>
                </form>
              </div>

              {/* ── Futuristic Telemetry Quick Specs Footer ── */}
              <div className="mt-9 flex flex-wrap items-center gap-4 sm:gap-6 border-t border-white/20 pt-5">
                {stats.map((stat) => (
                  <div key={stat.id} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-white/75 drop-shadow-sm">
                      <EditableElement
                        as="span"
                        id={`${section.id}-${stat.id}-label`}
                        field="value"
                        value={stat.label}
                        className="inline"
                      />
                      :
                    </span>
                    <EditableElement
                      as="span"
                      id={`${section.id}-${stat.id}-value`}
                      field="value"
                      value={stat.value}
                      className="font-mono text-xs sm:text-sm font-bold text-white tracking-tight drop-shadow-md"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
