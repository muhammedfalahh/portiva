'use client';

/**
 * FORME Studio — bespoke contact and footer section.
 * Clean, editorial, and fully aligned with the visual identity.
 * Suppresses standard shell footer (this component serves as the page footer).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

const defaultNavColumns = [
  {
    id: 'col-pages',
    title: 'PAGES',
    links: [
      { id: 'l-home', label: 'Home', href: '#hero', targetPageId: 'home' },
      { id: 'l-about', label: 'About', href: '#story', targetPageId: 'home' },
      { id: 'l-services', label: 'Services', href: '#services', targetPageId: 'home' },
      { id: 'l-portfolio', label: 'Featured Work', href: '#explore-work', targetPageId: 'home' },
      { id: 'l-archive', label: 'Works Archive', href: '#', targetPageId: 'works' },
    ],
  },
  {
    id: 'col-services',
    title: 'PACKAGES',
    links: [
      { id: 'l-basic', label: 'Basic Plan', href: '#pricing', targetPageId: 'home' },
      { id: 'l-pro', label: 'Pro Plan', href: '#pricing', targetPageId: 'home' },
      { id: 'l-custom', label: 'Custom Enterprise', href: '#pricing', targetPageId: 'home' },
      { id: 'l-reviews', label: 'Client Reviews', href: '#testimonials', targetPageId: 'home' },
    ],
  },
  {
    id: 'col-social',
    title: 'CONNECT',
    links: [
      { id: 'l-ig', label: 'Instagram ↗', href: 'https://instagram.com' },
      { id: 'l-li', label: 'LinkedIn ↗', href: 'https://linkedin.com' },
      { id: 'l-tw', label: 'Twitter / X ↗', href: 'https://x.com' },
      { id: 'l-db', label: 'Dribbble ↗', href: 'https://dribbble.com' },
    ],
  },
];

export function FormeContactSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'contact' }>>) {
  const styleOverrides = useStyleOverrides();

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: { href?: string; targetPageId?: string },
  ) => {
    if (link.targetPageId) {
      if (onNavigate && mode === 'builder') {
        event.preventDefault();
        onNavigate(link.targetPageId);
        if (link.href && link.href.startsWith('#') && link.href !== '#') {
          setTimeout(() => {
            const el = document.getElementById(link.href!.replace('#', ''));
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
        return;
      }
    }

    if (link.href && link.href.startsWith('#') && link.href !== '#') {
      const el = document.getElementById(link.href.replace('#', ''));
      if (el) {
        event.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navColumns =
    section.navColumns && section.navColumns.length > 0
      ? section.navColumns
      : defaultNavColumns;

  return (
    <footer
      id="contact"
      className="relative w-full overflow-hidden pt-16 sm:pt-24 pb-12 sm:pb-16"
      style={formeSectionSurface({ sectionId: section.id, tone: 'dark', styleOverrides })}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Upper Tier: Direct Email CTA + 3-Column Navigation Matrix ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14 items-start pb-12 sm:pb-16"
        >
          {/* Left Column: Direct Email Inquiry CTA & Availability */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-4">
            <EditableElement
              as="p"
              id={`${section.id}-cta-eyebrow`}
              field="value"
              value={section.eyebrow || "LET'S BRING YOUR VISION TO LIFE"}
              className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tone-text-faint)]"
            />
            <div>
              <EditableElement
                as="a"
                id={`${section.id}-email-cta`}
                field="value"
                value={section.email || section.title || 'hello@formestudio.com'}
                href={`mailto:${section.email || section.title || 'hello@formestudio.com'}`}
                className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium tracking-tight text-[var(--tone-text)] underline underline-offset-8 decoration-1 decoration-[var(--tone-line)] hover:decoration-theme-accent transition-all break-all sm:break-normal"
              />
            </div>
            <EditableElement
              as="p"
              id={`${section.id}-description`}
              field="value"
              value={section.description || 'Direct inquiry line for new commissions, brand systems, and editorial direction.'}
              className="text-xs sm:text-sm text-[var(--tone-text-soft)] leading-relaxed max-w-md font-normal pt-1"
            />
            <div className="flex items-center gap-2 pt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-xs text-[var(--tone-text-soft)]">
                Available for new commissions
              </span>
            </div>
          </div>

          {/* Right Column: 3-Column Navigation Matrix (PAGES, PACKAGES, CONNECT) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10">
            {navColumns.map((col) => (
              <div key={col.id} className="flex flex-col">
                <EditableElement
                  as="p"
                  id={`${section.id}-${col.id}-title`}
                  field="value"
                  value={col.title}
                  className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tone-text-faint)] mb-4 sm:mb-5 select-none"
                />
                <ul className="space-y-2.5 sm:space-y-3">
                  {col.links.map((link) => {
                    const targetPageId = 'targetPageId' in link ? (link as { targetPageId?: string }).targetPageId : undefined;
                    const href = targetPageId
                      ? buildHref({ targetPageId, href: link.href }, definition, handle, templateId)
                      : link.href || '#';

                    const isExternal = link.href && link.href.startsWith('http');

                    return (
                      <li key={link.id}>
                        <EditableElement
                          as="a"
                          id={`${section.id}-${col.id}-${link.id}`}
                          field="label"
                          value={link.label}
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          onClick={(e) => handleLinkClick(e, link)}
                          className="block text-xs sm:text-sm font-medium text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] transition-colors duration-200"
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Lower Tier: Divider + Wordmark + Tagline + Copyright + Scroll-to-Top ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-[var(--tone-line)] pt-8 sm:pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          {/* Brand Wordmark & Tagline */}
          <div className="flex flex-wrap items-baseline gap-4">
            <EditableElement
              as="h2"
              id={`${section.id}-brand-wordmark`}
              field="value"
              value={section.brandWordmark || 'FORME®'}
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--tone-text)] select-none font-sans"
            />
            <EditableElement
              as="span"
              id={`${section.id}-tagline`}
              field="value"
              value={section.tagline || '// Simple lines, bold ideas, timeless brands.'}
              className="font-mono text-xs text-[var(--tone-text-faint)] tracking-wider"
            />
          </div>

          {/* Copyright & Scroll-to-Top Button */}
          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            <EditableElement
              as="p"
              id={`${section.id}-copyright`}
              field="value"
              value={section.copyright || '© 2025 FORME Studio. All rights reserved.'}
              className="font-mono text-xs text-[var(--tone-text-faint)] tracking-wide"
            />

            {/* Smooth Scroll to Top Circle Button */}
            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: reducedMotion ? 'auto' : 'smooth',
                })
              }
              aria-label="Scroll back to top"
              className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-[var(--tone-line)] bg-[var(--tone-wash)] backdrop-blur-md transition-all duration-200 hover:border-[var(--tone-text)] hover:bg-[var(--tone-wash-strong)] active:scale-95 cursor-pointer shadow-sm shrink-0"
            >
              <ArrowUp className="h-4 w-4 stroke-[1.5] transition-transform group-hover:-translate-y-0.5 text-[var(--tone-text)]" />
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
