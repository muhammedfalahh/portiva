'use client';

/**
 * FORME Studio — bespoke hero with client logo strip.
 * Extracted verbatim from PremiumMultipageTemplate.tsx (CreativeHero +
 * monochrome client logos) during the template platform migration.
 *
 * Surface: DARK pole opening the page, dissolving organically into the light
 * story section via the shared surface system (sections/surface.ts).
 */

import { motion } from 'framer-motion';
import { ArrowUpRight, Globe } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

function CloudWatchLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M22 24H10C6.686 24 4 21.314 4 18c0-3.032 2.253-5.54 5.207-5.932C10.09 7.636 13.682 4 18 4c4.97 0 9 4.03 9 9 0 .34-.02.673-.058 1.002C29.13 14.86 31 17.214 31 20c0 2.21-1.79 4-4 4h-5z" />
    </svg>
  );
}

function BoltshiftLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M17.5 2l4 7.5L10 17h5.5l-1.5 8 7.5-10h-5.5L18 8z" />
    </svg>
  );
}

function EpicuriousLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <path d="M8 8h16a2 2 0 012 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a2 2 0 012-2z" />
      <path d="M6 14h14a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1a2 2 0 012-2z" opacity="0.85" />
      <path d="M4 20h12a2 2 0 012 2v1a2 2 0 01-2 2H4a2 2 0 01-2-2v-1a2 2 0 012-2z" opacity="0.7" />
    </svg>
  );
}

function NietzscheLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className}>
      <circle cx="16" cy="16" r="3" />
      <path d="M16 2v6M16 24v6M2 16h6M24 16h6M6.1 6.1l4.24 4.24M21.66 21.66l4.24 4.24M6.1 25.9l4.24-4.24M21.66 10.34l4.24-4.24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function QuotientLogo({ className = 'h-6 w-auto' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="3" className={className}>
      <circle cx="16" cy="15" r="10" />
      <path d="M17 18l7 7" strokeLinecap="round" />
    </svg>
  );
}

export function FormeHero({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'hero' }>>) {
  const styleOverrides = useStyleOverrides();

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };

  const contactHref = buildHref({ targetPageId: 'contact' }, definition, handle, templateId);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden pt-6 sm:pt-10 pb-16 sm:pb-24 lg:pb-28"
      style={formeSectionSurface({ sectionId: section.id, tone: 'dark', styleOverrides })}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Top Row: Left Office Image Card + Right Headline Area ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 lg:items-start">
          {/* Left Column: Office / Studio Workspace Card */}
          <div className="lg:col-span-4 xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="group overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-2xl transition-all duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black/40">
                <EditableImage
                  imageKey={section.media?.key || 'creative-hero-office-image'}
                  defaultSrc={section.media?.src || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop'}
                  defaultAlt={section.media?.alt || 'Creative studio team workstation'}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between border-t border-[var(--tone-line)] bg-[var(--tone-card)] px-4 py-3 text-xs">
                <EditableElement
                  as="span"
                  id={`${section.id}-office-caption`}
                  field="value"
                  value="FORME STUDIO"
                  className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--tone-text)]"
                />
                <EditableElement
                  as="span"
                  id={`${section.id}-office-meta`}
                  field="value"
                  value="20-25°"
                  className="font-mono text-[11px] font-normal text-[var(--tone-text-faint)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Right Column: Category Eyebrow, Trust Badge, Big Dominant Headline */}
          <div className="lg:col-span-8 xl:col-span-9 flex flex-col justify-between gap-4 pb-4 sm:pb-6">
            {/* Metadata Sub-Bar */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center justify-between gap-4"
            >
              {/* Left: Bracketed Eyebrow */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-normal text-theme-accent">⌖</span>
                <EditableElement
                  as="span"
                  id={`${section.id}-eyebrow`}
                  field="value"
                  value={section.eyebrow || '[ INCREDIBLE AGENCY ]'}
                  className="font-mono text-xs font-medium uppercase tracking-widest text-theme-accent"
                />
              </div>

              {/* Right: Trust Label */}
              <div className="flex items-center gap-2.5">
                <EditableElement
                  as="span"
                  id={`${section.id}-trust-label`}
                  field="value"
                  value="[ 1K+ PEOPLE TRUST US ]"
                  className="font-mono text-[11px] font-normal uppercase tracking-wider text-[var(--tone-text-soft)]"
                />
              </div>
            </motion.div>

            {/* Main Refined Headline - lighter thickness */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <EditableElement
                as="h1"
                id={`${section.id}-title`}
                field="value"
                value={section.title || 'Simple Lines, Bold Ideas,\nTimeless Brands.'}
                className="max-w-4xl text-4xl font-normal sm:font-medium tracking-tight text-[var(--tone-text)] sm:text-5xl md:text-6xl lg:text-[4.6rem] xl:text-[5.2rem] lg:leading-[1.04]"
              />
            </motion.div>

            {/* Copyright Tag */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.16 }}
              className="flex justify-end pt-3"
            >
              <EditableElement
                as="span"
                id={`${section.id}-copyright`}
                field="value"
                value="©2025"
                className="font-mono text-xs font-normal text-[var(--tone-text-faint)]"
              />
            </motion.div>
          </div>
        </div>

        {/* ── Middle Row: Narrative Copy + 3 Bento Showcase Cards ── */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-10 lg:items-end">
          {/* Left Column: Globe Icon, Paragraph Description, Company Trust */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 xl:col-span-3 space-y-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-none border border-[var(--tone-line)] bg-[var(--tone-wash)] text-[var(--tone-text)] transition-colors hover:border-[var(--tone-text)]">
              <Globe className="h-4 w-4 stroke-[1.5]" />
            </div>

            <EditableElement
              as="p"
              id={`${section.id}-description`}
              field="value"
              value={section.description || "We don't just design. We strip away the noise, leaving only what matters: timeless visuals, and brands that breathe."}
              className="max-w-sm text-sm font-normal leading-relaxed text-[var(--tone-text-soft)] sm:text-base"
            />

            <EditableElement
              as="p"
              id={`${section.id}-company-trust`}
              field="value"
              value="150+ COMPANY TRUST US"
              className="font-mono text-xs font-normal uppercase tracking-widest text-[var(--tone-text-faint)]"
            />
          </motion.div>

          {/* Right Column: 3 Showcase Bento Cards in Framed Grid with Corner Crosshairs */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="relative p-1">
              {/* Corner Crosshairs */}
              <span className="absolute -top-3.5 -left-3.5 font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>
              <span className="absolute -top-3.5 -right-3.5 font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>
              <span className="absolute -bottom-3.5 -left-3.5 font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>
              <span className="absolute -bottom-3.5 -right-3.5 font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Card 1: Poster / Graphic Design Spread */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3 }}
                  className="group relative aspect-[4/3.2] overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-xl transition-all duration-300 hover:border-[var(--tone-text-soft)]/50 cursor-pointer"
                >
                  <EditableImage
                    imageKey="creative-hero-bento-1"
                    defaultSrc="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop"
                    defaultAlt="Brand collateral and editorial poster layout"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Card 2: 3D Inflated / Tactile Packaging Mock */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3 }}
                  className="group relative aspect-[4/3.2] overflow-hidden rounded-none border border-[var(--tone-line)] bg-[var(--tone-card)] shadow-xl transition-all duration-300 hover:border-[var(--tone-text-soft)]/50 cursor-pointer"
                >
                  <EditableImage
                    imageKey="creative-hero-bento-2"
                    defaultSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop"
                    defaultAlt="3D packaging typography product mock"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>

                {/* Card 3: Solid Accent CTA Card "LETS COLLABORATE" */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => handleInternalNavigation(e, 'contact')}
                  className="group relative aspect-[4/3.2] overflow-hidden rounded-none bg-theme-accent p-5 sm:p-6 text-theme-accent-text shadow-xl transition-all duration-300 hover:brightness-105 hover:shadow-2xl flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex justify-end">
                    <ArrowUpRight className="h-9 w-9 stroke-[1.25] text-theme-accent-text transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div className="text-left">
                    <EditableButton
                      buttonKey={`${section.id}-cta-btn`}
                      defaultText="LETS\nCOLLABORATE"
                      defaultHref={contactHref}
                      onViewClick={(e) => handleInternalNavigation(e, 'contact')}
                      className="text-left font-medium sm:font-semibold text-xl sm:text-2xl leading-[1.02] tracking-normal uppercase text-theme-accent-text hover:opacity-95 block"
                    >
                      <span className="block leading-[1.02]">LETS<br />COLLABORATE</span>
                    </EditableButton>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-end gap-2 pt-4 text-xs font-mono uppercase tracking-widest text-[var(--tone-text-soft)]">
              <span className="inline-block h-1.5 w-1.5 rounded-none bg-theme-accent animate-pulse" />
              <EditableElement
                as="span"
                id={`${section.id}-scroll-indicator`}
                field="value"
                value="SCROLL DOWN"
                className="font-mono text-xs font-normal uppercase tracking-widest text-[var(--tone-text-soft)]"
              />
            </div>
          </div>
        </div>

        {/* ── Bottom Row: Client Logos Monochrome Ticker ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-18 rounded-none border border-[var(--tone-line)] backdrop-blur-md relative overflow-hidden bg-[color-mix(in_srgb,var(--tone-card)_60%,transparent)]"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-[var(--tone-line)]">
            {/* Logo 1: CloudWatch */}
            <div className="flex items-center justify-center gap-3 py-6 px-4 text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] transition-colors group cursor-pointer">
              <CloudWatchLogo className="h-6 w-auto text-[var(--tone-text-soft)] group-hover:text-[var(--tone-text)] transition-transform duration-200 group-hover:scale-105" />
              <EditableElement
                as="span"
                id="creative-logo-1"
                field="value"
                value="CloudWatch"
                className="text-base sm:text-lg font-medium tracking-tight text-[var(--tone-text)]"
              />
            </div>

            {/* Logo 2: Boltshift */}
            <div className="flex items-center justify-center gap-3 py-6 px-4 text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] transition-colors group cursor-pointer">
              <BoltshiftLogo className="h-6 w-auto text-[var(--tone-text-soft)] group-hover:text-[var(--tone-text)] transition-transform duration-200 group-hover:scale-105" />
              <EditableElement
                as="span"
                id="creative-logo-2"
                field="value"
                value="Boltshift"
                className="text-base sm:text-lg font-medium tracking-tight text-[var(--tone-text)]"
              />
            </div>

            {/* Logo 3: Epicurious */}
            <div className="flex items-center justify-center gap-3 py-6 px-4 text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] transition-colors group cursor-pointer">
              <EpicuriousLogo className="h-6 w-auto text-[var(--tone-text-soft)] group-hover:text-[var(--tone-text)] transition-transform duration-200 group-hover:scale-105" />
              <EditableElement
                as="span"
                id="creative-logo-3"
                field="value"
                value="Epicurious"
                className="text-base sm:text-lg font-medium tracking-tight text-[var(--tone-text)]"
              />
            </div>

            {/* Logo 4: Nietzsche */}
            <div className="flex items-center justify-center gap-3 py-6 px-4 text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] transition-colors group cursor-pointer">
              <NietzscheLogo className="h-6 w-auto text-[var(--tone-text-soft)] group-hover:text-[var(--tone-text)] transition-transform duration-200 group-hover:scale-105" />
              <EditableElement
                as="span"
                id="creative-logo-4"
                field="value"
                value="Nietzsche"
                className="text-base sm:text-lg font-medium tracking-tight text-[var(--tone-text)]"
              />
            </div>

            {/* Logo 5: Quotient */}
            <div className="flex items-center justify-center gap-3 py-6 px-4 text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] transition-colors group col-span-2 sm:col-span-1 cursor-pointer">
              <QuotientLogo className="h-6 w-auto text-[var(--tone-text-soft)] group-hover:text-[var(--tone-text)] transition-transform duration-200 group-hover:scale-105" />
              <EditableElement
                as="span"
                id="creative-logo-5"
                field="value"
                value="Quotient"
                className="text-base sm:text-lg font-medium tracking-tight text-[var(--tone-text)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
