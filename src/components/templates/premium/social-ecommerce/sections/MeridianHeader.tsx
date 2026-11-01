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
import styles from './MeridianLanding.module.css';

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
    <header className={styles.header}>
      {/* ── Main Top Bar ──────────────────────────────────────────────────── */}
      <div
        className={`${styles.headerBar} ${scrolled ? styles.headerBarScrolled : ''}`}
      >
        <nav
          aria-label="Main Navigation"
          className={styles.nav}
        >
          {/* Left: Brand Logo Wordmark */}
          <div className={styles.brandGroup}>
            <button
              type="button"
              onClick={() => setMobileNavOpen((value) => !value)}
              className={styles.menuButton}
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileNavOpen}
              aria-controls="meridian-mobile-navigation"
            >
              {mobileNavOpen ? <X className={styles.actionIcon} aria-hidden="true" /> : <Menu className={styles.actionIcon} aria-hidden="true" />}
            </button>
            <EditableElement
              as="a"
              id="meridian-brand-wordmark"
              field="value"
              value={definition.brandName || 'Nest'}
              href={buildPageHref('home')}
              onClick={(event) => navigate(event, 'home')}
              className={styles.brand}
            />
          </div>

          {/* Center: Editorial Nav Links */}
          <ul className={styles.desktopNav}>
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
                    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                  />
                </li>
              );
            })}
          </ul>

          {/* Right: Actions (Search, Sign In, Wishlist, Bag) */}
          <div className={styles.actions}>
            {/* Search */}
            <a
              href={buildPageHref('shop')}
              onClick={(event) => navigate(event, 'shop')}
              aria-label="Search catalog"
              className={styles.action}
            >
              <Search className={styles.actionIcon} strokeWidth={1.7} aria-hidden="true" />
            </a>

            {/* Sign in / User */}
            <button
              type="button"
              aria-label="Sign in"
              className={styles.signIn}
            >
              <User className={styles.actionIcon} strokeWidth={1.7} aria-hidden="true" />
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
              className={styles.action}
            >
              <Heart className={styles.actionIcon} fill={cart.wishlistCount > 0 ? 'currentColor' : 'none'} strokeWidth={1.7} aria-hidden="true" />
              {cart.wishlistCount > 0 ? (
                <span className={styles.badge}>
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
              className={styles.action}
            >
              <ShoppingBag className={styles.actionIcon} strokeWidth={1.7} aria-hidden="true" />
              <AnimatePresence mode="popLayout" initial={false}>
                {cart.itemCount > 0 ? (
                  <motion.span
                    key={cart.itemCount}
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', bounce: 0, duration: 0.35 }}
                    className={styles.badge}
                  >
                    {cart.itemCount}
                  </motion.span>
                ) : (
                  <span className={styles.badge}>
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
              className={styles.mobileNav}
            >
              <ul className={styles.mobileNavList}>
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
                        className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`}
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
