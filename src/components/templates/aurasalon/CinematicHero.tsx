'use client';

import React, { useEffect, useState } from 'react';
import { Star, ArrowUpRight, Award } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { useReducedMotion } from './useReducedMotion';

interface CinematicHeroProps {
  heroRating: string;
  heroBridesCount: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: string;
  heroPrimaryCtaText: string;
  heroSecondaryCtaText: string;
  heroBadgeTitle?: string;
  heroBadgeSubtitle?: string;
  artistName: string;
  artistTitle: string;
  phone: string;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  heroRating,
  heroBridesCount,
  heroHeadline,
  heroSubheadline,
  heroImage,
  heroPrimaryCtaText,
  heroSecondaryCtaText,
  heroBadgeTitle = 'Couture Bridal Artistry',
  heroBadgeSubtitle = 'High-Definition Airbrush & Royal Draping',
  artistName,
  artistTitle,
  phone,
}) => {
  const [scrollY, setScrollY] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const builderCtx = useVisualBuilder();
  const isEditing = builderCtx?.mode === 'EDITING';
  const activeButtonOverrides: Record<string, ButtonOverride> = (builderCtx?.templateData?.buttonOverrides as Record<string, ButtonOverride>) || {};

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

  useEffect(() => {
    if (isEditing || prefersReducedMotion) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditing, prefersReducedMotion]);

  // Subtle background parallax scale computation
  const parallaxScale = isEditing || prefersReducedMotion ? 1 : 1 + Math.min(scrollY * 0.0003, 0.08);
  const parallaxY = isEditing || prefersReducedMotion ? 0 : scrollY * 0.12;

  return (
    <EditableElement
      as="section"
      id="aura-hero-section"
      field="heroSection"
      value="Cinematic Hero Section"
      type="container"
      className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden bg-theme-background"
    >
      {/* Background Media with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-25 dark:opacity-40">
        <div
          style={{
            transform: `translateY(${parallaxY}px) scale(${parallaxScale})`,
            transition: isEditing ? 'none' : 'transform 0.1s linear',
          }}
          className="w-full h-full"
        >
          <EditableImage
            imageKey="aura-hero-bg"
            defaultSrc={heroImage}
            defaultAlt="Bridal makeup editorial hero"
            className="w-full h-full object-cover object-center filter blur-[1px]"
            containerClassName="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-theme-background/90 via-theme-background/60 to-theme-background" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetrical Typography & Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Rating & Social Proof Pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-theme-surface/80 border border-theme-border/50 backdrop-blur-md shadow-xs">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
              <span className="w-px h-3 bg-theme-border/60" />
              <EditableElement
                as="span"
                id="aura-hero-rating"
                field="heroRating"
                value={heroRating}
                type="text"
                className="text-xs font-sans font-semibold text-theme-foreground tracking-wide"
              />
              <span className="w-px h-3 bg-theme-border/60" />
              <EditableElement
                as="span"
                id="aura-hero-brides"
                field="heroBridesCount"
                value={heroBridesCount}
                type="text"
                className="text-xs font-sans text-theme-muted tracking-wide"
              />
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <EditableElement
                as="h1"
                id="aura-hero-headline"
                field="heroHeadline"
                value={heroHeadline}
                type="heading"
                className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-theme-foreground tracking-tight leading-[0.95]"
              />
              <div className="flex items-center gap-3 pt-2 font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent">
                <span className="h-px w-10 bg-theme-accent" />
                <EditableElement
                  as="span"
                  id="aura-hero-by-prefix"
                  field="byPrefix"
                  value="BY "
                  type="text"
                  className="inline"
                />
                <EditableElement
                  as="span"
                  id="aura-hero-artist-name"
                  field="artistName"
                  value={artistName.toUpperCase()}
                  type="text"
                  className="inline"
                />
              </div>
            </div>

            {/* Subheadline & Bio Summary */}
            <EditableElement
              as="p"
              id="aura-hero-subheadline"
              field="heroSubheadline"
              value={heroSubheadline}
              type="text"
              className="font-sans text-base md:text-lg text-theme-muted max-w-xl leading-relaxed font-normal"
            />

            {/* Artist Designation Badge */}
            <div className="flex items-center gap-2 text-xs font-sans text-theme-muted/80 bg-theme-surface/40 px-3 py-1.5 rounded-md border border-theme-border/20">
              <Award className="w-4 h-4 text-theme-accent shrink-0" />
              <EditableElement
                as="span"
                id="aura-hero-artist-title"
                field="artistTitle"
                value={artistTitle}
                type="text"
                className="inline"
              />
            </div>

            {/* CTA Action Cluster */}
            <div className="pt-4 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <EditableButton
                buttonKey="aura-hero-primary-cta"
                defaultText={heroPrimaryCtaText}
                defaultHref={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  'Hi Ananya, I would like to book a private bridal consultation.'
                )}`}
                defaultOpenInNewTab={true}
                className="w-full sm:w-auto bg-theme-primary text-theme-background hover:bg-theme-primary-hover px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group"
              >
                <span>{activeButtonOverrides['aura-hero-primary-cta']?.text || heroPrimaryCtaText}</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </EditableButton>

              <EditableButton
                buttonKey="aura-hero-secondary-cta"
                defaultText={heroSecondaryCtaText}
                defaultHref="#lookbook"
                defaultOpenInNewTab={false}
                className="w-full sm:w-auto border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-theme-background px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-300 text-center"
              >
                <span>{activeButtonOverrides['aura-hero-secondary-cta']?.text || heroSecondaryCtaText}</span>
              </EditableButton>
            </div>
          </div>

          {/* Right Column: Hero Portrait Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-theme-border/40 group">
              <EditableImage
                imageKey="aura-hero-portrait-card"
                defaultSrc={heroImage}
                defaultAlt={`${artistName} bridal artistry showcase`}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-foreground/80 via-transparent to-transparent opacity-60" />

              {/* Floating Image Label Badge */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-theme-background/75 border border-theme-border/40 p-4 rounded-2xl shadow-lg z-10">
                <EditableElement
                  as="p"
                  id="aura-hero-badge-title"
                  field="heroBadgeTitle"
                  value={heroBadgeTitle}
                  type="heading"
                  className="font-editorial text-xl text-theme-foreground font-semibold"
                />
                <EditableElement
                  as="p"
                  id="aura-hero-badge-desc"
                  field="heroBadgeSubtitle"
                  value={heroBadgeSubtitle}
                  type="text"
                  className="font-sans text-xs text-theme-muted mt-0.5"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableElement>
  );
};
