'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type { FooterLinkGroup } from './types';

interface MinimalFooterProps {
  artistName?: string;
  brandTagline: string;
  footerCopyright: string;
  footerLinkGroups: FooterLinkGroup[];
}

export const MinimalFooter: React.FC<MinimalFooterProps> = ({
  artistName,
  brandTagline,
  footerCopyright,
  footerLinkGroups,
}) => {
  const defaultNavLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Services', href: '#services' },
    { label: 'Packages', href: '#packages' },
    { label: 'Bride Reviews', href: '#reviews' },
    { label: 'Direct Booking', href: '#contact' },
  ];

  const displayLinks =
    footerLinkGroups && footerLinkGroups.length > 0 && footerLinkGroups[0]?.links
      ? footerLinkGroups[0].links
      : defaultNavLinks;

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <EditableElement
      as="footer"
      id="aura-footer-section"
      field="footerSection"
      value="Footer Section"
      type="container"
      className="w-full bg-theme-surface border-t border-theme-border/30 pt-16 pb-12 font-sans text-theme-foreground"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 items-stretch">
          {/* Column 1: Brand Info (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-full bg-theme-background border border-theme-border/40 shadow-xs">
                  <Sparkles className="w-4 h-4 text-theme-accent" />
                </div>
                <EditableElement
                  as="h3"
                  id="aura-footer-brand-title"
                  field="brandLogoText"
                  value="AURA SALON"
                  type="heading"
                  className="font-editorial text-2xl sm:text-3xl font-bold uppercase tracking-widest text-theme-foreground"
                />
              </div>

              {artistName && (
                <EditableElement
                  as="p"
                  id="aura-footer-byline"
                  field="artistByline"
                  value={`BY ${artistName.toUpperCase()}`}
                  type="text"
                  className="text-xs font-bold uppercase tracking-wider text-theme-accent"
                />
              )}

              <EditableElement
                as="p"
                id="aura-footer-tagline"
                field="brandTagline"
                value={brandTagline}
                type="text"
                className="text-xs sm:text-sm text-theme-muted max-w-sm leading-relaxed"
              />

              <EditableElement
                as="p"
                id="aura-footer-badge"
                field="footerBadge"
                value="Paris & Mumbai Trained Couture Bridal Studio"
                type="text"
                className="text-[11px] text-theme-accent font-semibold uppercase tracking-wider pt-1"
              />
            </div>
          </div>

          {/* Column 2: Quick Navigation Links (lg:col-span-3) */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <EditableElement
              as="h4"
              id="aura-footer-nav-heading"
              field="navHeading"
              value="Quick Navigation"
              type="heading"
              className="text-xs font-bold uppercase tracking-widest text-theme-accent block"
            />
            <nav className="flex flex-col gap-2.5">
              {displayLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-foreground transition-colors text-left py-0.5 inline-block"
                >
                  <EditableElement
                    as="span"
                    id={`aura-footer-nav-link-${idx}`}
                    field={`nav_link_${idx}`}
                    value={link.label}
                    type="text"
                    className="inline"
                  />
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Big "Built with Portiva" Card (lg:col-span-5) */}
          <div className="lg:col-span-5 bg-theme-background/60 border border-theme-border/50 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-theme-accent/40 transition-all duration-300 min-h-[220px] backdrop-blur-md">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-theme-accent/15 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-accent/15 border border-theme-accent/30 text-theme-accent text-xs font-mono font-bold tracking-widest uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Built with portiva.site</span>
              </div>

              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-theme-foreground tracking-tight mb-2 leading-snug block">
                Created in 60 seconds — Free forever
              </h3>

              <p className="font-sans text-xs sm:text-sm text-theme-muted leading-relaxed block">
                Build, customize, and publish your dream website instantly with AI. Fast, responsive, and completely free forever.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-theme-border/20 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-theme-foreground/80">
                Build your website now
              </span>
              <a
                href="https://portiva.site"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-theme-primary hover:bg-theme-primary-hover text-theme-background text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 uppercase tracking-wider font-sans"
              >
                <span>Create Yours Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-theme-border/20 pt-8 flex items-center justify-between gap-4 text-xs text-theme-muted">
          <EditableElement
            as="p"
            id="aura-footer-copyright"
            field="footerCopyright"
            value={footerCopyright}
            type="text"
            className="text-center sm:text-left"
          />
        </div>
      </div>
    </EditableElement>
  );
};

