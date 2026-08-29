'use client';

/**
 * =============================================================================
 * PORTIVA: Generic Contact Section
 * =============================================================================
 *
 * Generic-path contact/footer section. Extracted verbatim from the legacy
 * monolith's CreativeContactSection (which served as the shared renderer for
 * all non-bespoke premium templates).
 *
 * NOTE (pre-existing legacy behaviour, intentionally preserved): fallback
 * defaults are FORME-flavoured ('FORME®' wordmark, formestudio copyright,
 * formestudio email). Definitions omitting those fields render these
 * fallbacks today; changing that is a visual redesign outside migration scope.
 */

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { buildHref } from './premium-runtime';

export interface GenericContactSectionProps {
  section: Extract<PremiumTemplateSection, { type: 'contact' }>;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode?: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  /** Legacy behaviour: OS/builder reduced motion switches scrollTo to 'auto'. */
  reducedMotion?: boolean;
}

export function GenericContactSection({
  section,
  definition,
  handle,
  templateId,
  mode = 'public',
  onNavigate,
  reducedMotion = false,
}: GenericContactSectionProps) {
  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };

  const defaultNavColumns = [
    {
      id: 'col-general',
      title: 'GENERAL',
      links: [
        { id: 'l-home', label: 'Home', href: '#hero' },
        { id: 'l-about', label: 'About', href: '#about' },
        { id: 'l-services', label: 'Services', href: '#services' },
        { id: 'l-portfolio', label: 'Portfolio', href: '#explore-work' },
        { id: 'l-testimonial', label: 'Testimonial', href: '#testimonials' },
      ],
    },
    {
      id: 'col-services',
      title: 'SERVICES',
      links: [
        { id: 'l-basic', label: 'Basic Plan', href: '#pricing' },
        { id: 'l-pro', label: 'Pro Plan', href: '#pricing' },
        { id: 'l-custom', label: 'Custom Plan', href: '#pricing' },
      ],
    },
    {
      id: 'col-social',
      title: 'SOCIAL MEDIA',
      links: [
        { id: 'l-ig', label: 'Instagram', href: 'https://instagram.com' },
        { id: 'l-wa', label: 'Whatsapp', href: 'https://whatsapp.com' },
        { id: 'l-li', label: 'Linkedin', href: 'https://linkedin.com' },
        { id: 'l-fb', label: 'Facebook', href: 'https://facebook.com' },
      ],
    },
  ];

  const navColumns =
    section.navColumns && section.navColumns.length > 0
      ? section.navColumns
      : defaultNavColumns;

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden bg-[#08080A] text-white pt-20 sm:pt-28 pb-12 sm:pb-16 border-t border-white/10 select-none"
    >
      {/* Ambient ethereal glow at bottom right */}
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 sm:h-[32rem] sm:w-[32rem] bg-gradient-to-tl from-white/[0.08] via-white/[0.02] to-transparent blur-3xl select-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Upper Tier: 3-Column Navigation Matrix + Direct Email Inquiry ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start">
          {/* Left: 3-Column Navigation Matrix (GENERAL, SERVICES, SOCIAL MEDIA) */}
          <div className="lg:col-span-7 xl:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {navColumns.map((col) => (
              <div key={col.id} className="flex flex-col">
                <EditableElement
                  as="p"
                  id={`${section.id}-${col.id}-title`}
                  field="value"
                  value={col.title}
                  className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-5 sm:mb-6 select-none"
                />
                <ul className="space-y-3 sm:space-y-3.5">
                  {col.links.map((link) => {
                    const targetPageId = 'targetPageId' in link ? (link as { targetPageId?: string }).targetPageId : undefined;
                    const href = targetPageId
                      ? buildHref({ targetPageId, href: link.href }, definition, handle, templateId)
                      : link.href || '#';

                    return (
                      <li key={link.id}>
                        <EditableElement
                          as="a"
                          id={`${section.id}-${col.id}-${link.id}`}
                          field="label"
                          value={link.label}
                          href={href}
                          onClick={
                            targetPageId
                              ? (e) => handleInternalNavigation(e, targetPageId)
                              : undefined
                          }
                          className="block text-sm sm:text-base font-medium text-white/85 hover:text-white transition-colors duration-200"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Right: Direct Email Inquiry */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-start lg:pl-4">
            <EditableElement
              as="p"
              id={`${section.id}-cta-eyebrow`}
              field="value"
              value={section.eyebrow || "LET'S BRING YOUR VISION TO LIFE"}
              className="font-sans text-[11px] sm:text-xs font-medium uppercase tracking-[0.18em] text-white/60 mb-3 sm:mb-4 select-none"
            />
            <div>
              <EditableElement
                as="a"
                id={`${section.id}-email-cta`}
                field="value"
                value={section.email || section.title || 'hello@formestudio.com'}
                href={`mailto:${section.email || section.title || 'hello@formestudio.com'}`}
                className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] xl:text-[3.15rem] font-medium tracking-tight text-white underline underline-offset-8 decoration-1 decoration-white/60 hover:decoration-white transition-all break-all sm:break-normal"
              />
            </div>
          </div>
        </div>

        {/* ── Middle Rail: Monospace Design Tagline + Technical Coordinate & Barcode ── */}
        <div className="mt-16 sm:mt-24 mb-12 sm:mb-16 border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
          <EditableElement
            as="span"
            id={`${section.id}-tagline`}
            field="value"
            value={section.tagline || '// Creating Clarity Through Design.'}
            className="font-mono text-xs text-white/40 tracking-wider"
          />

          {/* Technical Coordinate & Barcode */}
          <div className="flex items-center gap-2 text-white/40 select-none" aria-hidden="true">
            <span className="font-mono text-xs tracking-wider">20-25°</span>
            <div className="flex h-3.5 items-stretch gap-[1.5px] text-current">
              <div className="w-[1.5px] bg-current" />
              <div className="w-[3px] bg-current" />
              <div className="w-[1px] bg-current" />
              <div className="w-[2px] bg-current" />
              <div className="w-[4px] bg-current" />
              <div className="w-[1.5px] bg-current" />
              <div className="w-[1px] bg-current" />
              <div className="w-[3px] bg-current" />
            </div>
          </div>
        </div>

        {/* ── Lower Tier: Brand Wordmark, Address, Hours, Legal & Scroll-to-Top ── */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-end">
          {/* Left Column: Huge Brand Wordmark & Copyright */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col">
            <EditableElement
              as="h2"
              id={`${section.id}-brand-wordmark`}
              field="value"
              value={section.brandWordmark || 'FORME®'}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tight text-white leading-none select-none font-sans"
            />
            <EditableElement
              as="p"
              id={`${section.id}-copyright`}
              field="value"
              value={section.copyright || '© 2025 formestudio, All rights reserved'}
              className="font-mono text-xs text-white/50 mt-4 sm:mt-6 tracking-wide"
            />
          </div>

          {/* Middle Column: Location Address */}
          <div className="lg:col-span-3 xl:col-span-3">
            <EditableElement
              as="div"
              id={`${section.id}-address`}
              field="value"
              value={section.address || '4575 MAISONEWTON AVE.\nMANCHESTER, 30150'}
              className="font-mono text-xs sm:text-[13px] font-semibold text-white/80 uppercase tracking-wider leading-relaxed whitespace-pre-line"
            />
          </div>

          {/* Right-Middle Column: Studio Hours */}
          <div className="lg:col-span-3 xl:col-span-3">
            <EditableElement
              as="div"
              id={`${section.id}-hours`}
              field="value"
              value={section.hours || 'MONDAY - FRIDAY\n09.00 AM — 17.00 PM'}
              className="font-mono text-xs sm:text-[13px] font-semibold text-white/80 uppercase tracking-wider leading-relaxed whitespace-pre-line"
            />
          </div>

          {/* Far-Right Column: Smooth Scroll-to-Top Button & Legal Links */}
          <div className="lg:col-span-2 xl:col-span-2 flex flex-col items-start lg:items-end justify-between gap-6">
            {/* Smooth Scroll to Top Pill/Circle Button */}
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                })
              }
              aria-label="Scroll back to top"
              className="group flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white transition-all duration-200 hover:border-white hover:bg-white/10 active:scale-95 cursor-pointer shadow-lg"
            >
              <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 stroke-[1.5] text-white transition-transform group-hover:-translate-y-0.5" />
            </button>

            {/* Legal Links */}
            <div className="flex items-center gap-5 sm:gap-6 text-xs sm:text-sm font-medium text-white/70">
              <EditableElement
                as="a"
                id={`${section.id}-terms`}
                field="value"
                value="Terms & Condition"
                href="#terms"
                className="hover:text-white transition-colors"
              />
              <EditableElement
                as="a"
                id={`${section.id}-privacy`}
                field="value"
                value="Privacy Policy"
                href="#privacy"
                className="hover:text-white transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
