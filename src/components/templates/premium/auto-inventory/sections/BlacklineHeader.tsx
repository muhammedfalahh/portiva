import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, Search, ShoppingBag, ShieldCheck } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import {
  buildHref,
  usePremiumReducedMotion,
} from '@/components/templates/shared/premium-runtime';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';

function getSalesLine(definition: PremiumTemplateDefinition): {
  value: string;
  href?: string;
} | null {
  const homePage = definition.pages.find((page) => page.id === 'home') || definition.pages[0];
  const contact = homePage?.sections.find(
    (section) => section.type === 'contact',
  );
  if (!contact || contact.type !== 'contact') return null;
  const first = contact.details?.[0];
  const callAction = contact.primaryAction?.href ? contact.primaryAction : undefined;
  if (!first) return null;
  return { value: first.value, href: callAction?.href };
}

interface BlacklineHeaderProps {
  definition: PremiumTemplateDefinition;
  activePageId: string;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
}

export function BlacklineHeader({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
}: BlacklineHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const reducedMotion = usePremiumReducedMotion(mode);
  const currentPage =
    definition.pages.find((page) => page.id === activePageId) || definition.pages[0];
  const salesLine = getSalesLine(definition);

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
    setMobileNavOpen(false);
  };

  const navLinks = [
    { id: 'nav-home', label: 'Overview', href: buildHref({ targetPageId: 'home' }, definition, handle, templateId), pageId: 'home' },
    { id: 'nav-brands', label: 'Featured Fleet', href: '#bl-home-featured' },
    { id: 'nav-store', label: 'Inventory Store', href: buildHref({ targetPageId: 'store' }, definition, handle, templateId), pageId: 'store' },
    { id: 'nav-why', label: 'Why Autobahn', href: '#bl-home-why' },
    { id: 'nav-testimonials', label: 'Reviews', href: '#bl-home-testimonials' },
    { id: 'nav-gallery', label: 'Gallery', href: '#bl-home-gallery' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 text-[#0F172A] shadow-[0_1px_3px_rgba(0,0,0,0.03)] backdrop-blur-2xl transition-all">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:h-20 sm:px-6 lg:px-8">
        {/* Brand Logo with Glowing Cobalt Badge */}
        <a
          href={buildHref({ targetPageId: definition.pages[0]?.id }, definition, handle, templateId)}
          onClick={(event) =>
            handleInternalNavigation(event, definition.pages[0]?.id)
          }
          className="group flex min-w-0 items-center gap-3"
          aria-label={definition.brandName}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0052CC] via-[#0066FF] to-[#38BDF8] text-white shadow-md shadow-blue-500/30 transition-transform duration-200 group-hover:scale-105">
            <ShieldCheck className="h-5 w-5" strokeWidth={2.4} />
          </div>
          <div className="min-w-0">
            <EditableElement
              as="p"
              id="premium-brand-name"
              field="value"
              value={definition.brandName}
              className="truncate font-display text-base font-extrabold tracking-tight text-[#0F172A] sm:text-lg"
            />
            <EditableElement
              as="p"
              id="premium-brand-tagline"
              field="value"
              value={definition.navTagline}
              className="truncate text-[11px] font-medium text-[#64748B]"
            />
          </div>
        </a>

        {/* Desktop Navigation with Active Pill Highlighting */}
        <nav className="hidden items-center gap-2 lg:flex" aria-label="Primary">
          {navLinks.map((item) => {
            const isStoreLink = item.pageId === 'store';
            const isHomeLink = item.pageId === 'home';
            const isActive =
              (isHomeLink && currentPage?.id === 'home') ||
              (isStoreLink && currentPage?.id === 'store');

            return (
              <EditableElement
                key={item.id}
                as="a"
                id={item.id}
                field="label"
                value={item.label}
                href={item.href}
                onClick={(event) => {
                  if (item.pageId) handleInternalNavigation(event, item.pageId);
                }}
                className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-50 text-[#0066FF] shadow-sm'
                    : 'text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]'
                }`}
              />
            );
          })}
        </nav>

        {/* Right Actions: Search / Bag / Contact Concierge */}
        <div className="hidden items-center gap-3 sm:flex">
          <button
            type="button"
            aria-label="Search vehicles"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-slate-100 hover:text-[#0F172A]"
          >
            <Search className="h-4 w-4" strokeWidth={2.2} />
          </button>
          <a
            href={buildHref({ targetPageId: 'store' }, definition, handle, templateId)}
            onClick={(event) => handleInternalNavigation(event, 'store')}
            aria-label="View inventory catalog"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#64748B] transition-colors hover:bg-slate-100 hover:text-[#0F172A]"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2.2} />
            <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#0066FF] text-[9px] font-bold text-white shadow-sm shadow-blue-500/50">
              0
            </span>
          </a>
          {salesLine ? (
            <a
              href="#bl-home-contact"
              className="ml-1.5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-4.5 py-2 text-xs font-semibold text-white shadow-[0_2px_10px_rgba(0,102,255,0.35)] transition duration-200 ease-out hover:shadow-[0_4px_16px_rgba(0,102,255,0.5)] active:scale-[0.98]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <EditableElement
                as="span"
                id="nav-sales-number"
                field="value"
                value="Contact Concierge"
                className="text-xs font-semibold text-white"
              />
            </a>
          ) : null}
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] transition duration-150 ease-out active:scale-95 lg:hidden"
          onClick={() => setMobileNavOpen((value) => !value)}
          aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileNavOpen}
        >
          {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence initial={false}>
        {mobileNavOpen ? (
          <motion.div
            key="blackline-mobile-nav"
            initial={reducedMotion ? false : { opacity: 0, y: -8 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.28 }}
            className="overflow-hidden border-t border-black/[0.06] bg-[#FBFBFD]/95 backdrop-blur-2xl lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="mx-auto flex w-full max-w-7xl flex-col px-5 py-4 sm:px-6"
            >
              {navLinks.map((item) => (
                <EditableElement
                  key={item.id}
                  as="a"
                  id={`mobile-${item.id}`}
                  field="label"
                  value={item.label}
                  href={item.href}
                  onClick={(event) => {
                    if (item.pageId) handleInternalNavigation(event, item.pageId);
                    else setMobileNavOpen(false);
                  }}
                  className="border-b border-black/[0.04] px-2 py-3 text-sm font-medium text-[#1D1D1F] transition-colors hover:text-[#0071E3] last:border-b-0"
                />
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
