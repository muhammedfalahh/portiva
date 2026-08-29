'use client';

/**
 * FORME Studio — bespoke navigation header & comprehensive navigation drawer.
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { DARK_TONE_VARS } from './surface';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';

const sectionWrap = 'mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8';

interface NavItem {
  id: string;
  label: string;
  code: string;
  targetPageId?: string;
  anchor?: string;
}

const FORME_NAV_ITEMS: NavItem[] = [
  { id: 'nav-home', label: 'HOME', code: '//01', targetPageId: 'home', anchor: 'hero' },
  { id: 'nav-about', label: 'ABOUT', code: '//02', targetPageId: 'home', anchor: 'story' },
  { id: 'nav-services', label: 'SERVICES', code: '//03', targetPageId: 'home', anchor: 'services' },
  { id: 'nav-work', label: 'FEATURED WORK', code: '//04', targetPageId: 'home', anchor: 'explore-work' },
  { id: 'nav-archive', label: 'WORKS ARCHIVE', code: '//05', targetPageId: 'works' },
  { id: 'nav-testimonials', label: 'TESTIMONIALS', code: '//06', targetPageId: 'home', anchor: 'testimonials' },
  { id: 'nav-pricing', label: 'PRICING PLAN', code: '//07', targetPageId: 'home', anchor: 'pricing' },
  { id: 'nav-contact', label: 'CONTACT', code: '//08', targetPageId: 'home', anchor: 'contact' },
];

export function FormeHeader({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
}: {
  definition: PremiumTemplateDefinition;
  activePageId: string;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileNavOpen(false);
    };
    if (mobileNavOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileNavOpen]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    item: NavItem,
  ) => {
    event.preventDefault();
    setMobileNavOpen(false);

    const isCurrentPage = !item.targetPageId || item.targetPageId === activePageId;

    if (isCurrentPage) {
      if (item.anchor) {
        const el = document.getElementById(item.anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      if (onNavigate && mode === 'builder') {
        onNavigate(item.targetPageId || 'home');
        if (item.anchor) {
          setTimeout(() => {
            const el = document.getElementById(item.anchor!);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
      } else {
        const href = item.targetPageId
          ? buildHref({ targetPageId: item.targetPageId, href: item.anchor ? `#${item.anchor}` : undefined }, definition, handle, templateId)
          : `#${item.anchor || ''}`;
        window.location.href = href;
      }
    }
  };

  const handleTalkToUs = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    handleNavClick(event, { id: 'nav-contact', label: 'CONTACT', code: '//08', targetPageId: 'home', anchor: 'contact' });
  };

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--tone-line)] text-[var(--tone-text)] shadow-sm backdrop-blur-xl transition-colors duration-200"
      style={{
        ...DARK_TONE_VARS,
        backgroundColor: 'color-mix(in srgb, var(--theme-background) 86%, transparent)',
      }}
    >
      <div className={`${sectionWrap} flex h-18 items-center justify-between gap-4 py-4`}>
        {/* Left: Hamburger menu toggle with subtle crosshair marker */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileNavOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-none border border-[var(--tone-line)] bg-[var(--tone-wash)] text-[var(--tone-text)] hover:border-[var(--tone-text)] hover:bg-[var(--tone-wash-strong)] transition-all cursor-pointer shadow-sm active:scale-95"
            aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileNavOpen}
          >
            {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <EditableElement
            as="span"
            id="creative-nav-menu-tag"
            field="value"
            value="MENU"
            className="hidden sm:inline-block font-mono text-[11px] font-semibold uppercase tracking-widest text-[var(--tone-text)] select-none cursor-pointer"
          />
          <span className="hidden sm:inline-block font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>
        </div>

        {/* Center: Brand Name with flanking + crosshairs */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-block font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>
          <EditableElement
            as="p"
            id="premium-brand-name"
            field="value"
            value={definition.brandName}
            className="text-lg sm:text-xl font-medium uppercase tracking-tight text-[var(--tone-text)]"
          />
          <span className="hidden sm:inline-block font-mono text-xs text-[var(--tone-text-faint)] select-none">+</span>
        </div>

        {/* Right: Talk to us ↗ button */}
        <div className="flex items-center gap-3">
          <EditableButton
            buttonKey="creative-nav-talk"
            defaultText="TALK TO US ↗"
            defaultHref="#contact"
            onViewClick={handleTalkToUs}
            className="inline-flex items-center rounded-none bg-[var(--tone-strong)] px-5 py-2 text-xs font-medium uppercase tracking-wider text-[var(--tone-inverse)] hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
          >
            <span>TALK TO US ↗</span>
          </EditableButton>
        </div>
      </div>

      {/* ── Full Editorial Navigation Drawer Modal / Dropdown ── */}
      <AnimatePresence>
        {mobileNavOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-[var(--tone-line)] bg-[var(--gd0)] text-[var(--tone-text)] shadow-2xl backdrop-blur-2xl"
          >
            <div className={`${sectionWrap} py-8 sm:py-12`}>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start">
                {/* Left Column: Navigation Index Links */}
                <div className="lg:col-span-8">
                  <EditableElement
                    as="p"
                    id="creative-nav-dir-heading"
                    field="value"
                    value="// NAVIGATION DIRECTORY"
                    className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--tone-text-faint)] mb-6 select-none"
                  />

                  <nav className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                    {FORME_NAV_ITEMS.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.03 + 0.05, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <a
                          href={item.anchor ? `#${item.anchor}` : (item.targetPageId === 'works' ? '/works' : '/')}
                          onClick={(e) => handleNavClick(e, item)}
                          className="group flex items-center justify-between border-b border-[var(--tone-line)] py-3 transition-colors hover:border-[var(--tone-text)] cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <EditableElement
                              as="span"
                              id={`creative-nav-code-${item.id}`}
                              field="value"
                              value={item.code}
                              className="font-mono text-xs text-[var(--tone-text-faint)] transition-colors group-hover:text-theme-accent"
                            />
                            <EditableElement
                              as="span"
                              id={`creative-nav-label-${item.id}`}
                              field="value"
                              value={item.label}
                              className="text-base sm:text-lg font-medium tracking-tight text-[var(--tone-text)] transition-transform duration-200 group-hover:translate-x-1"
                            />
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-theme-accent" />
                        </a>
                      </motion.div>
                    ))}
                  </nav>
                </div>

                {/* Right Column: Studio Info & Direct Quick Contacts */}
                <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[var(--tone-line)] pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between space-y-6">
                  <div>
                    <EditableElement
                      as="p"
                      id="creative-nav-inquiry-heading"
                      field="value"
                      value="// DIRECT INQUIRY"
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--tone-text-faint)] mb-3 select-none"
                    />
                    <EditableButton
                      buttonKey="creative-nav-email"
                      defaultText="hello@formestudio.com"
                      defaultHref="mailto:hello@formestudio.com"
                      className="block text-lg font-medium tracking-tight text-[var(--tone-text)] underline underline-offset-4 decoration-[var(--tone-text-faint)] hover:decoration-theme-accent transition-colors bg-transparent border-0 p-0 shadow-none text-left cursor-pointer"
                    />

                    <div className="mt-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      <EditableElement
                        as="span"
                        id="creative-nav-availability"
                        field="value"
                        value="Accepting new projects"
                        className="font-mono text-xs text-[var(--tone-text-soft)]"
                      />
                    </div>
                  </div>

                  <div>
                    <EditableElement
                      as="p"
                      id="creative-nav-social-heading"
                      field="value"
                      value="// SOCIAL"
                      className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--tone-text-faint)] mb-2 select-none"
                    />
                    <div className="flex flex-wrap gap-4 text-xs font-mono uppercase tracking-wider text-[var(--tone-text-soft)]">
                      <EditableButton
                        buttonKey="creative-nav-social-ig"
                        defaultText="Instagram ↗"
                        defaultHref="https://instagram.com"
                        defaultOpenInNewTab={true}
                        className="hover:text-[var(--tone-text)] transition-colors text-xs font-mono uppercase tracking-wider text-[var(--tone-text-soft)] bg-transparent border-0 p-0 shadow-none cursor-pointer"
                      />
                      <EditableButton
                        buttonKey="creative-nav-social-li"
                        defaultText="LinkedIn ↗"
                        defaultHref="https://linkedin.com"
                        defaultOpenInNewTab={true}
                        className="hover:text-[var(--tone-text)] transition-colors text-xs font-mono uppercase tracking-wider text-[var(--tone-text-soft)] bg-transparent border-0 p-0 shadow-none cursor-pointer"
                      />
                      <EditableButton
                        buttonKey="creative-nav-social-tw"
                        defaultText="X / Twitter ↗"
                        defaultHref="https://x.com"
                        defaultOpenInNewTab={true}
                        className="hover:text-[var(--tone-text)] transition-colors text-xs font-mono uppercase tracking-wider text-[var(--tone-text-soft)] bg-transparent border-0 p-0 shadow-none cursor-pointer"
                      />
                      <EditableButton
                        buttonKey="creative-nav-social-db"
                        defaultText="Dribbble ↗"
                        defaultHref="https://dribbble.com"
                        defaultOpenInNewTab={true}
                        className="hover:text-[var(--tone-text)] transition-colors text-xs font-mono uppercase tracking-wider text-[var(--tone-text-soft)] bg-transparent border-0 p-0 shadow-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
