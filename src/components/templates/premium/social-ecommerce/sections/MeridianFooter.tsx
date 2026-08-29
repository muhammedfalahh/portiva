'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 4 Deep Obsidian Footer
 * =============================================================================
 *
 * Direct translation of Reference Image 4 (bottom section):
 * - Deep obsidian background (#131722), crisp typography (#FAFAFB)
 * - Top header: Brand wordmark on left + Newsletter input capsule with arrow button on right
 * - 3 Navigation Columns: Shop, Information, Company
 * - Bottom hairline divider with Copyright & Social links
 * - 100% builder editable
 */

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type { PremiumRenderMode, PremiumTemplateDefinition } from '@/lib/template-contract';export function MeridianFooter({
  definition,
  mode,
  handle,
  templateId,
  onNavigate,
}: {
  definition: PremiumTemplateDefinition;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
}) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const buildPageHref = (pageId: string | undefined): string => {
    if (!handle || !pageId) return '#';
    const page = definition.pages.find((entry) => entry.id === pageId);
    if (!page) return `/${handle}`;
    const path = page.slug ? `/${handle}/${page.slug}` : `/${handle}`;
    if (!templateId) return path;
    return `${path}?template=${encodeURIComponent(templateId)}`;
  };

  const navigateInternal =
    (pageId: string | undefined) =>
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!pageId || !onNavigate || mode !== 'builder') return;
      event.preventDefault();
      onNavigate(pageId);
    };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  const shopLinks = [
    { id: 'f-shop-account', label: 'My account', targetPageId: 'shop' },
    { id: 'f-shop-products', label: 'All Products', targetPageId: 'shop' },
    { id: 'f-shop-wishlist', label: 'Wishlist', targetPageId: 'shop' },
    { id: 'f-shop-category', label: 'Category', targetPageId: 'shop' },
  ];

  const infoLinks = [
    { id: 'f-info-shipping', label: 'Shipping Policy', targetPageId: 'home' },
    { id: 'f-info-returns', label: 'Returns & Refunds', targetPageId: 'home' },
    { id: 'f-info-cookies', label: 'Cookies Policy', targetPageId: 'home' },
    { id: 'f-info-faq', label: 'FAQ', targetPageId: 'home' },
  ];

  const companyLinks = [
    { id: 'f-comp-about', label: 'About Us', targetPageId: 'home' },
    { id: 'f-comp-privacy', label: 'Privacy Policy', targetPageId: 'home' },
    { id: 'f-comp-terms', label: 'Terms & Conditions', targetPageId: 'home' },
    { id: 'f-comp-contact', label: 'Contact Us', targetPageId: 'home' },
  ];

  return (
    <footer className="w-full bg-[#131722] text-[#FAFAFB]">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 lg:px-8">
        
        {/* ── Top Grid: Brand & Email on Left, 3 Columns on Right ──────── */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] lg:gap-16">
          
          {/* Left: Brand Wordmark + Email Input Underline */}
          <div className="flex flex-col items-start">
            <EditableElement
              as="h3"
              id="meridian-footer-brand"
              field="value"
              value={definition.brandName || 'Nest'}
              className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl"
            />

            {/* Email Input Underline with Circular White Button */}
            <form onSubmit={handleSubscribe} className="mt-8 w-full max-w-xs">
              <div className="flex items-center border-b border-white/30 pb-2 transition-colors focus-within:border-white">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full bg-transparent text-xs text-white placeholder-white/50 focus:outline-none sm:text-sm"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-[#131722] shadow-xs transition-transform duration-200 hover:scale-105 active:scale-95"
                >
                  {subscribed ? <Check className="h-3.5 w-3.5 stroke-[2.5]" /> : <ArrowRight className="h-3.5 w-3.5 stroke-[2.5]" />}
                </button>
              </div>
            </form>
          </div>

          {/* Right: 3 Navigation Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12">
            
            {/* Column 1: Shop */}
            <div>
              <EditableElement
                as="h4"
                id="meridian-footer-col-1-title"
                field="value"
                value="Shop"
                className="text-xs font-bold text-white tracking-wide sm:text-sm"
              />
              <ul className="mt-4 space-y-2.5">
                {shopLinks.map((link) => (
                  <li key={link.id}>
                    <EditableElement
                      as="a"
                      id={`meridian-footer-${link.id}`}
                      field="value"
                      value={link.label}
                      href={buildPageHref(link.targetPageId)}
                      onClick={navigateInternal(link.targetPageId)}
                      className="text-xs text-white/60 transition-colors hover:text-white sm:text-[13px]"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Information */}
            <div>
              <EditableElement
                as="h4"
                id="meridian-footer-col-2-title"
                field="value"
                value="Information"
                className="text-xs font-bold text-white tracking-wide sm:text-sm"
              />
              <ul className="mt-4 space-y-2.5">
                {infoLinks.map((link) => (
                  <li key={link.id}>
                    <EditableElement
                      as="a"
                      id={`meridian-footer-${link.id}`}
                      field="value"
                      value={link.label}
                      href={buildPageHref(link.targetPageId)}
                      onClick={navigateInternal(link.targetPageId)}
                      className="text-xs text-white/60 transition-colors hover:text-white sm:text-[13px]"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <EditableElement
                as="h4"
                id="meridian-footer-col-3-title"
                field="value"
                value="Company"
                className="text-xs font-bold text-white tracking-wide sm:text-sm"
              />
              <ul className="mt-4 space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.id}>
                    <EditableElement
                      as="a"
                      id={`meridian-footer-${link.id}`}
                      field="value"
                      value={link.label}
                      href={buildPageHref(link.targetPageId)}
                      onClick={navigateInternal(link.targetPageId)}
                      className="text-xs text-white/60 transition-colors hover:text-white sm:text-[13px]"
                    />
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

        {/* ── Baseline: Dashed Hairline Divider & Centered Copyright ──── */}
        <div className="mt-16 border-t border-dashed border-white/20 pt-8 text-center text-xs text-white/50">
          <EditableElement
            as="p"
            id="meridian-footer-copyright"
            field="value"
            value="© NatureNest 2026"
            className="text-xs text-white/50"
          />
        </div>

      </div>
    </footer>
  );
}
