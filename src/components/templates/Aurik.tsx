/**
 * =============================================================================
 * PORTIVA: Aurik — The Luxury / Editorial Product Template (Interactive Canvas)
 * =============================================================================
 *
 * Aesthetic: Swiss precision, brutalist elegance, editorial minimalism.
 * Default Palette: Monochromatic (stark white background, pure black text)
 *                  with an aggressive crimson red accent color.
 * Typography: Massive bold sans-serif mixed with wide tracking monospaced text.
 * Features:
 *   - Strict sharp-edged grid layout (no rounded corners)
 *   - Thin dividing lines (border-theme-border)
 *   - Edge-to-edge high-resolution hero product shot
 *
 * THEMING ARCHITECTURE:
 *   This template uses ZERO hardcoded color values. All colors reference
 *   semantic Tailwind classes (bg-theme-background, text-theme-foreground,
 *   text-theme-primary, border-theme-border, etc.) driven by CSS custom properties.
 *
 * FIGMA-STYLE CANVAS INTEGRATION:
 *   All user-facing text elements are wrapped in <EditableElement />.
 *   Clicking elements on the canvas selects them in the properties inspector,
 *   and hovered elements show visual bounding boxes.
 */

'use client';

import React from 'react';
import { Search, User, Menu, ChevronRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

// ─── Props ──────────────────────────────────────────────────────────────────

export interface SpecItem {
  label: string;
  value: string;
}

export interface AurikProps {
  brandName?: string;
  navItems?: string[];
  heroTitle?: string;
  heroBadge?: string;
  heroDescription?: string;
  heroImage?: string;
  editorialHeading?: string;
  editorialText?: string;
  editorialImageLeft?: string;
  editorialImageRight?: string;
  specs?: SpecItem[];
  ctaText?: string;
  footerBadge?: string;
  footerTitle?: string;
  footerCta?: string;
  navbarBg?: string;
  hoverStyle?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export const Aurik: React.FC<AurikProps> = ({
  brandName = 'AURIK',
  navItems = ['PRODUCT', 'ABOUT', 'CONTACT'],
  heroTitle = 'MEET THE UA-01: A NEW ERA IN INNOVATION',
  heroBadge = 'LIMITED EDITION',
  heroDescription = 'OUR INSPIRATION FLOWS FROM THE REALMS OF ENGINEERING, MOTORSPORT, AND THE ICONS OF CONTEMPORARY DESIGN.',
  heroImage = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
  editorialHeading = 'SWISS PRECISION ENGINEERING',
  editorialText = 'EXPERTLY CRAFTED FOR THOSE WHO EXPLORE THE WORLD EVERY DAY WITH PRECISION AND STYLE IN MIND. INTEGRATING STATE-OF-ART CHRONOGRAPH MECHANICAL MOVEMENTS WITH STARK BRUTALIST AESTHETICS.',
  editorialImageLeft = 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=400&auto=format&fit=crop',
  editorialImageRight = 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
  specs = [
    { label: 'MOVEMENT', value: 'CALIBER UA-01 AUTOMATIC' },
    { label: 'CASE DIAMETER', value: '41 MM' },
    { label: 'WATER RESISTANCE', value: '100 METERS (10 ATM)' },
    { label: 'POWER RESERVE', value: '72 HOURS' },
    { label: 'MATERIAL', value: 'GRADE 5 SATIN TITANIUM' }
  ],
  ctaText = 'SEE DETAILS',
  footerBadge = 'LAUNCH EDITION',
  footerTitle = 'PRECISION REDEFINED.',
  footerCta = 'INQUIRE NOW',
  navbarBg = 'transparent',
  hoverStyle = 'color'
}) => {
  // Resolve builder context safely for button text overrides
  let activeButtonOverrides: Record<string, ButtonOverride> = {};
  try {
    const builder = useVisualBuilder();
    if (builder && builder.templateData) {
      activeButtonOverrides = builder.templateData.buttonOverrides || {};
    }
  } catch {
    // Fail-safe default fallback
  }

  const resolvedCtaText = activeButtonOverrides['editorial_cta_btn']?.text ?? ctaText;
  const resolvedFooterCta = activeButtonOverrides['footer_cta_btn']?.text ?? footerCta;

  // Resolve header background layout class
  let navbarBgClass = 'border-b border-theme-border px-6 py-6';
  if (navbarBg === 'surface') {
    navbarBgClass = 'bg-theme-surface border-b border-theme-border px-8 py-6 shadow-sm';
  } else if (navbarBg === 'glass') {
    navbarBgClass = 'bg-theme-background/80 backdrop-blur-xl border-b border-theme-border px-8 py-6 sticky top-0';
  }

  // Resolve link hover animation classes
  let linkHoverClass = 'hover:text-theme-primary';
  if (hoverStyle === 'underline') {
    linkHoverClass = 'hover:underline';
  } else if (hoverStyle === 'pill') {
    linkHoverClass = 'px-3 py-1.5 rounded-full border border-[#2d2d3a]/30 hover:border-theme-primary/30 hover:bg-theme-primary/5 hover:text-theme-primary';
  } else if (hoverStyle === 'border-bottom') {
    linkHoverClass = 'pb-1 border-b border-transparent hover:border-theme-primary hover:text-theme-primary';
  }

  return (
    <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-sans selection:bg-theme-primary selection:text-white flex flex-col items-center">
      
      {/* ─── Editorial Header Navigation ────────────────────────────────── */}
      <header className={`w-full max-w-6xl flex justify-between items-center z-10 font-mono transition-all duration-300 ${navbarBgClass}`}>
        <div className="flex items-center">
          <EditableElement
            as="span"
            id="profile-header"
            field="profileName"
            value={brandName}
            type="heading"
            className="font-black text-2xl tracking-tighter text-theme-foreground"
          />
        </div>

        {/* Precise Minimal Links */}
        <div className="hidden md:flex items-center gap-10 text-xs font-black tracking-widest">
          {navItems.map((item, idx) => (
            <EditableElement
              key={idx}
              as="span"
              id={`header-nav-item-${idx}`}
              field={`item_${idx}`}
              value={item}
              type="text"
              className={`${linkHoverClass} transition cursor-pointer`}
            />
          ))}
        </div>

        <div className="flex items-center gap-6">
          <EditableButton
            buttonKey="nav_search_btn"
            defaultText=""
            className="text-theme-foreground hover:text-theme-primary transition"
          >
            <Search className="w-4 h-4" />
          </EditableButton>
          <EditableButton
            buttonKey="nav_user_btn"
            defaultText=""
            className="text-theme-foreground hover:text-theme-primary transition"
          >
            <User className="w-4 h-4" />
          </EditableButton>
          
          {/* Brutalist Sharp double line menu */}
          <EditableButton
            buttonKey="nav_menu_btn"
            defaultText=""
            className="text-theme-foreground hover:text-theme-primary transition p-1"
          >
            <Menu className="w-5 h-5" />
          </EditableButton>
        </div>
      </header>

      {/* ─── Hero Section with Large Clean Layout ───────────────────────── */}
      <main className="w-full max-w-6xl flex flex-col items-center">
        
        <section className="w-full px-6 pt-16 pb-12 text-center flex flex-col items-center">
          {/* Main Title */}
          <EditableElement
            as="h1"
            id="hero-title"
            field="heroTitle"
            value={heroTitle}
            type="heading"
            className="text-4xl sm:text-7xl font-black tracking-tighter uppercase leading-[1.05] max-w-4xl text-center mb-8"
          />

          {/* Badge & Description row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 max-w-2xl mb-12 font-mono">
            <EditableElement
              as="span"
              id="hero-logo-y"
              field="heroLogoY"
              value="Y"
              type="text"
              className="w-8 h-8 rounded-full bg-theme-primary text-white flex items-center justify-center text-[10px] font-black shrink-0 shadow-md"
            />
            <EditableElement
              as="p"
              id="hero-description"
              field="heroDescription"
              value={heroDescription}
              type="text"
              className="text-[10px] sm:text-xs font-bold tracking-wider text-theme-muted leading-relaxed text-center sm:text-left"
            />
          </div>

          {/* Massive Edge-to-Edge Product shot */}
          <div className="w-full h-[320px] sm:h-[500px] border border-theme-border overflow-hidden relative block">
            <EditableImage
              imageKey="hero_image"
              defaultSrc={heroImage}
              defaultAlt="Hero luxury watch"
              className="grayscale contrast-125 pointer-events-none"
              containerClassName="w-full h-full"
            />
            {/* Absolute positioning of the badge details */}
            <div className="absolute top-6 left-6 z-10" onClick={(e) => e.stopPropagation()}>
              <EditableElement
                as="div"
                id="hero-badge"
                field="heroBadge"
                value={heroBadge}
                type="text"
                className="bg-theme-primary text-white text-[9px] font-mono tracking-widest px-3 py-1 uppercase font-black"
              />
            </div>
          </div>
        </section>

        {/* ─── Editorial Spec/Layout split columns ────────────────────────── */}
        <section className="w-full grid grid-cols-1 md:grid-cols-2 border-t border-theme-border">
          
          {/* Column A: Statement & Side Visual */}
          <div className="p-6 sm:p-12 border-b md:border-b-0 md:border-r border-theme-border flex flex-col justify-between gap-12">
            <div>
              <EditableElement
                as="span"
                id="editorial-badge"
                field="editorialBadge"
                value="• CRAFTED FOR EVERYDAY EXPLORERS."
                type="text"
                className="text-[10px] font-mono tracking-[0.2em] text-theme-primary uppercase block mb-4"
              />
              <EditableElement
                as="p"
                id="editorial-description"
                field="editorialDescription"
                value={editorialText}
                type="text"
                className="text-sm font-semibold tracking-wide text-theme-muted leading-relaxed max-w-sm uppercase font-mono mb-8"
              />

              {/* Bold CTA */}
              <EditableButton
                buttonKey="editorial_cta_btn"
                defaultText={ctaText}
                className="bg-theme-primary hover:bg-theme-foreground text-white font-mono font-black text-xs tracking-widest px-6 py-4 flex items-center gap-2 transition duration-200"
              >
                <span>{resolvedCtaText}</span>
                <ChevronRight className="w-4 h-4" />
              </EditableButton>
            </div>

            {/* Left mechanical details shot */}
            <EditableImage
              imageKey="editorial_image_left"
              defaultSrc={editorialImageLeft}
              defaultAlt="Watch gears engineering"
              className="grayscale contrast-125 hover:scale-102 transition duration-500 pointer-events-none"
              containerClassName="w-full h-[240px] border border-theme-border overflow-hidden block"
            />
          </div>

          {/* Column B: Spec details list & Large Image */}
          <div className="p-6 sm:p-12 flex flex-col justify-between gap-12 bg-theme-surface">
            <div>
              <EditableElement
                as="span"
                id="specs-heading"
                field="specsHeading"
                value={editorialHeading}
                type="text"
                className="text-[10px] font-mono tracking-[0.2em] text-theme-muted uppercase block mb-6"
              />

              {/* Specifications List */}
              <div className="flex flex-col border-b border-theme-border">
                {specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center py-4 border-t border-theme-border text-xs font-mono"
                  >
                    <EditableElement
                      as="span"
                      id={`spec-label-${idx}`}
                      field={`spec_${idx}_label`}
                      value={spec.label}
                      type="text"
                      className="text-theme-muted tracking-wider font-bold"
                    />
                    <EditableElement
                      as="span"
                      id={`spec-value-${idx}`}
                      field={`spec_${idx}_value`}
                      value={spec.value}
                      type="text"
                      className="text-theme-foreground font-black tracking-widest"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right clean watch details shot */}
            <EditableImage
              imageKey="editorial_image_right"
              defaultSrc={editorialImageRight}
              defaultAlt="Minimalist design face"
              className="grayscale contrast-125 hover:scale-102 transition duration-500 pointer-events-none"
              containerClassName="w-full h-[240px] border border-theme-border overflow-hidden block"
            />
          </div>
        </section>

        {/* ─── Brutalist Banner Footer CTA ────────────────────────────────── */}
        <section className="w-full border-t border-theme-border py-16 text-center flex flex-col items-center gap-4 bg-theme-background">
          <EditableElement
            as="span"
            id="footer-badge"
            field="footerBadge"
            value={footerBadge}
            type="text"
            className="text-[10px] font-mono tracking-[0.25em] text-theme-primary uppercase"
          />
          <EditableElement
            as="h2"
            id="footer-title"
            field="footerTitle"
            value={footerTitle}
            type="heading"
            className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-none max-w-xl"
          />
          <EditableButton
            buttonKey="footer_cta_btn"
            defaultText={footerCta}
            className="mt-4 border border-theme-foreground px-8 py-4 text-xs font-mono font-black uppercase tracking-widest hover:bg-theme-foreground hover:text-theme-background transition duration-200"
          >
            <span>{resolvedFooterCta}</span>
          </EditableButton>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl border-t border-theme-border py-8 text-center text-[10px] font-mono tracking-widest text-theme-muted mt-12">
        <EditableElement
          as="span"
          id="footer-copyright"
          field="footerCopyright"
          value={`© 2026 ${brandName} BY PORTIVA.`}
          type="text"
          className="inline"
        />
      </footer>
    </div>
  );
};
