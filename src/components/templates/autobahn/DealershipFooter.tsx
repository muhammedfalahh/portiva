'use client';

import React from 'react';
import { Car, MapPin, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import { DEFAULT_NAV_ITEMS } from './types';

interface DealershipFooterProps {
  dealershipName: string;
  location: string;
  phone: string;
  footerDescription?: string;
  quickLinksHeader?: string;
  navItems?: { label: string; href: string }[];
}

export const DealershipFooter: React.FC<DealershipFooterProps> = ({
  dealershipName,
  location,
  phone,
  footerDescription = 'An architectural curation of high-performance luxury automobiles, certified factory allocations, and bespoke concierge acquisition.',
  quickLinksHeader = 'Navigation Directory',
  navItems = DEFAULT_NAV_ITEMS,
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const isEditMode = builderCtx?.mode === 'EDITING';

  const navList = navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;

  return (
    <footer className="w-full border-t border-theme-border bg-theme-surface text-theme-foreground font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          {/* Brand Column (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-theme-background/80 border border-theme-border text-theme-foreground flex items-center justify-center font-bold shadow-sm">
                  <Car className="w-4 h-4 text-theme-foreground" strokeWidth={2} />
                </div>
                <EditableElement
                  as="span"
                  id="auto-footer-brand"
                  field="dealershipName"
                  value={dealershipName}
                  type="heading"
                  className="font-manrope text-lg font-bold tracking-wider text-theme-foreground uppercase"
                />
              </div>

              <EditableElement
                as="p"
                id="auto-footer-description"
                field="footerDescription"
                value={footerDescription}
                type="text"
                className="text-sm text-theme-muted font-normal leading-relaxed max-w-sm"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-theme-muted">
              <MapPin className="w-3.5 h-3.5 text-theme-muted shrink-0" />
              <EditableElement
                as="span"
                id="auto-footer-location"
                field="location"
                value={location}
                type="text"
                className="inline"
              />
            </div>
          </div>

          {/* Quick Links Column (Col 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <EditableElement
              as="h4"
              id="auto-footer-quicklinks-header"
              field="quickLinksHeader"
              value={quickLinksHeader}
              type="heading"
              className="text-xs font-semibold text-theme-foreground uppercase tracking-wider mb-2 block"
            />
            <div className="flex flex-col gap-2.5">
              {navList.map((item, idx) => (
                <a
                  key={idx}
                  href={isEditMode ? undefined : item.href}
                  onClick={(e) => {
                    if (isEditMode) e.preventDefault();
                  }}
                  className="text-xs font-medium text-theme-muted hover:text-theme-foreground transition-colors block"
                >
                  <EditableElement
                    as="span"
                    id={`auto-footer-nav-${idx}`}
                    field={`navItem_${idx}`}
                    value={item.label}
                    type="text"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Portiva Platform Card (Col 4) */}
          <div className="lg:col-span-4 bg-theme-background/80 border border-theme-border rounded-2xl p-7 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-theme-primary/50 transition-all duration-300 font-inter">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-surface border border-theme-border text-theme-foreground text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
                <span>Made with portiva.site</span>
              </div>

              <h4 className="font-manrope text-base font-bold text-theme-foreground tracking-tight mb-1.5 leading-snug">
                Crafted in 60 seconds — Free forever
              </h4>

              <p className="text-xs text-theme-muted leading-relaxed font-normal">
                Build, customize, and deploy bespoke automotive showrooms instantly with AI. Fast, responsive, and completely free.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between gap-4">
              <span className="text-xs font-semibold text-theme-foreground">
                Launch your showroom
              </span>
              <a
                href="https://portiva.site"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <span>Create Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="border-t border-theme-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <EditableElement
            as="p"
            id="auto-footer-disclaimer"
            field="disclaimer"
            value={`© 2026 ${dealershipName}. All rights reserved. Precision automotive showroom.`}
            type="text"
            className="text-xs text-theme-muted"
          />

          <div className="flex items-center gap-6 text-xs font-inter">
            <a href={`tel:${phone}`} className="hover:text-theme-foreground transition text-theme-muted">
              {phone}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
