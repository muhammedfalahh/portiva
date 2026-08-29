'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Storefront Navigation
 * =============================================================================
 *
 * Professional ecommerce navigation: announcement bar, brand wordmark,
 * page-aware link row, search/account/cart actions, and an intentional mobile
 * drawer (not a shrunken desktop row). The bag button opens the template-local
 * mini cart and carries a live count badge with a subtle pop on change.
 *
 * Every visible string is an editable engine element; in EDITING mode all
 * navigation is intercepted so element selection always wins.
 */

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';
import { useMeridianCart } from './cart';

interface MeridianHeaderProps {
  definition: PremiumTemplateDefinition;
  activePageId: string;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
}

interface NavEntry {
  pageId: string;
  id: string;
  label: string;
}

const NAV_ENTRIES: NavEntry[] = [
  { pageId: 'home', id: 'home', label: 'Home' },
  { pageId: 'shop', id: 'services', label: 'Services' },
  { pageId: 'shop', id: 'blog', label: 'Blog' },
  { pageId: 'home#contact', id: 'contact', label: 'Contact' },
  { pageId: 'home#about', id: 'about', label: 'About Us' },
];

export function MeridianHeader({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
}: MeridianHeaderProps) {
  const cart = useMeridianCart();
  const prefersReducedMotion = useReducedMotion();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollTick = useRef<number | null>(null);

  useEffect(() => {
    let subscribed = true;
    const onScroll = () => {
      if (scrollTick.current !== null) return;
      scrollTick.current = window.requestAnimationFrame(() => {
        scrollTick.current = null;
        if (subscribed) setScrolled(window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      subscribed = false;
      if (scrollTick.current !== null) window.cancelAnimationFrame(scrollTick.current);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileNavOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileNavOpen]);

  const buildPageHref = (pageTarget: string): string => {
    if (!handle) return '#';
    const [pageId, hash] = pageTarget.split('#');
    const page = definition.pages.find((entry) => entry.id === pageId);
    const basePath = page ? (page.slug ? `/${handle}/${page.slug}` : `/${handle}`) : `/${handle}`;
    const hashPart = hash ? `#${hash}` : '';
    if (!templateId) return `${basePath}${hashPart}`;
    return `${basePath}?template=${encodeURIComponent(templateId)}${hashPart}`;
  };

  const navigate = (event: React.MouseEvent, pageTarget: string) => {
    const [pageId] = pageTarget.split('#');
    if (mode !== 'builder') return;
    event.preventDefault();
    onNavigate?.(pageId);
    setMobileNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full text-theme-foreground">
      {/* ── Main Top Bar ──────────────────────────────────────────────────── */}
      <div
        className={`relative bg-theme-surface/90 backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-300 ${
          scrolled
            ? 'border-b border-theme-border shadow-xs'
            : 'border-b border-theme-border/40'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="mx-auto flex h-14 w-full max-w-[1280px] items-center justify-between gap-4 px-4 sm:h-16 sm:px-6 lg:px-0"
        >
          {/* Left: Brand Logo Wordmark */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileNavOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-theme-border/60 text-theme-foreground transition-colors hover:bg-theme-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-foreground lg:hidden"
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="meridian-mobile-navigation"
            >
              {mobileNavOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
            <EditableElement
              as="a"
              id="meridian-brand-wordmark"
              field="value"
              value={definition.brandName || 'Nest'}
              href={buildPageHref('home')}
              onClick={(event) => navigate(event, 'home')}
              className="min-w-0 truncate font-sans text-lg font-bold tracking-[-0.035em] text-theme-foreground sm:text-xl"
            />
          </div>

          {/* Center: Editorial Nav Links */}
          <ul className="hidden items-center gap-10 lg:flex">
            {NAV_ENTRIES.map((entry) => {
              const isActive =
                (entry.id === 'home' && activePageId === 'home') ||
                (entry.id === 'services' && activePageId === 'shop');
              return (
                <li key={entry.id}>
                  <EditableElement
                    as="a"
                    id={`meridian-nav-${entry.id}`}
                    field="value"
                    value={entry.label}
                    href={buildPageHref(entry.pageId)}
                    onClick={(event) => navigate(event, entry.pageId)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative text-[11px] font-medium transition-colors duration-200 ${
                      isActive
                        ? 'font-semibold text-theme-foreground'
                        : 'text-theme-muted hover:text-theme-foreground'
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Right: Actions (Search, Sign In, Wishlist, Bag) */}
          <div className="flex items-center gap-0.5 sm:gap-1">
            {/* Search */}
            <a
              href={buildPageHref('shop')}
              onClick={(event) => navigate(event, 'shop')}
              aria-label="Search catalog"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-theme-foreground/80 transition-colors hover:bg-theme-surface-hover hover:text-theme-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-foreground lg:h-9 lg:w-9"
            >
              <Search className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
            </a>

            {/* Sign in / User */}
            <button
              type="button"
              aria-label="Sign in"
              className="hidden h-11 items-center gap-1.5 rounded-full px-2 text-[11px] font-medium text-theme-foreground/80 transition-colors hover:bg-theme-surface-hover hover:text-theme-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-foreground sm:inline-flex lg:h-9"
            >
              <User className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              <EditableElement
                as="span"
                id="meridian-sign-in"
                field="value"
                value="Sign in"
              />
            </button>

            {/* Wishlist Icon */}
            <button
              type="button"
              aria-label={`Wishlist (${cart.wishlistCount} items)`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-theme-foreground/80 transition-colors hover:bg-theme-surface-hover hover:text-theme-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-foreground lg:h-9 lg:w-9"
            >
              <Heart className={`h-4 w-4 ${cart.wishlistCount > 0 ? 'fill-theme-accent text-theme-accent' : ''}`} strokeWidth={1.7} aria-hidden="true" />
              {cart.wishlistCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-theme-accent text-[10px] font-bold text-theme-accent-text shadow-xs">
                  {cart.wishlistCount}
                </span>
              ) : null}
            </button>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={() => {
                if (mode !== 'builder') cart.openCart();
              }}
              aria-label={`Open bag, ${cart.itemCount} items`}
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-theme-foreground/90 transition-colors hover:bg-theme-surface-hover hover:text-theme-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-foreground lg:h-9 lg:w-9"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              <AnimatePresence mode="popLayout" initial={false}>
                {cart.itemCount > 0 ? (
                  <motion.span
                    key={cart.itemCount}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.35 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-theme-accent text-[9px] font-bold leading-none text-theme-accent-text shadow-xs"
                  >
                    {cart.itemCount}
                  </motion.span>
                ) : (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-theme-accent text-[9px] font-bold leading-none text-theme-accent-text shadow-xs">
                    0
                  </span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* ── Mobile drawer ─────────────────────────────────────────────── */}
        <AnimatePresence initial={false}>
          {mobileNavOpen ? (
            <motion.div
              id="meridian-mobile-navigation"
              initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={mode === 'builder' || prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              className="absolute inset-x-0 top-full overflow-hidden border-t border-theme-border bg-theme-surface/95 shadow-lg backdrop-blur-xl lg:hidden"
            >
              <ul className="space-y-1 px-4 py-4 sm:px-6">
                {NAV_ENTRIES.map((entry) => {
                  const isActive =
                    (entry.id === 'home' && activePageId === 'home') ||
                    (entry.id === 'services' && activePageId === 'shop');
                  return (
                    <li key={entry.id}>
                      <EditableElement
                        as="a"
                        id={`meridian-nav-mobile-${entry.id}`}
                        field="value"
                        value={entry.label}
                        href={buildPageHref(entry.pageId)}
                        onClick={(event) => navigate(event, entry.pageId)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                          isActive
                            ? 'bg-theme-surface text-theme-foreground'
                            : 'text-theme-muted hover:bg-theme-surface hover:text-theme-foreground'
                        }`}
                      />
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
