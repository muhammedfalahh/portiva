'use client';

import React, { useState, useEffect } from 'react';
import {
  Car,
  MapPin,
  Phone,
  MessageSquare,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { DEFAULT_NAV_ITEMS } from './types';

interface ShowroomNavProps {
  dealershipName: string;
  location: string;
  phone: string;
  navItems?: { label: string; href: string }[];
  currentView?: 'home' | 'store';
  onNavigate?: (pageId: string) => void;
}

export const ShowroomNav: React.FC<ShowroomNavProps> = ({
  dealershipName,
  location,
  phone,
  navItems = DEFAULT_NAV_ITEMS,
  currentView = 'home',
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};
  const isEditMode = builderCtx?.mode === 'EDITING';

  useEffect(() => {
    const handleScroll = () => {
      const canvasEl = document.querySelector('.canvas-container');
      const scrollY = canvasEl ? canvasEl.scrollTop : window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    const canvasContainer = document.querySelector('.canvas-container');
    if (canvasContainer) {
      canvasContainer.addEventListener('scroll', handleScroll, { passive: true });
    }

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (canvasContainer) {
        canvasContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const navList = navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
      {/* Floating Glassmorphism Island */}
      <div
        className={`max-w-7xl mx-auto pointer-events-auto rounded-2xl lg:rounded-full transition-all duration-300 ${
          isScrolled
            ? 'bg-theme-background/95 backdrop-blur-2xl border border-theme-border shadow-xl py-2 sm:py-2.5 px-3 sm:px-5'
            : 'bg-theme-background/85 backdrop-blur-xl border border-theme-border/80 shadow-lg py-2.5 sm:py-3 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Dealership Identity Logo & Location */}
          <a
            href={isEditMode ? undefined : '#'}
            onClick={(e) => {
              if (isEditMode) e.preventDefault();
              else if (onNavigate) {
                e.preventDefault();
                onNavigate('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-primary rounded-xl cursor-pointer"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-theme-surface border border-theme-border flex items-center justify-center font-bold shadow-md group-hover:scale-105 group-hover:border-theme-primary/60 transition-all duration-300 shrink-0">
              <Car className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-theme-foreground" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <EditableElement
                  as="span"
                  id="auto-dealer-name"
                  field="dealershipName"
                  value={dealershipName}
                  type="heading"
                  className="text-xs sm:text-sm font-manrope font-bold tracking-wider text-theme-foreground uppercase leading-tight"
                />
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-inter font-bold bg-theme-primary/15 text-theme-primary border border-theme-primary/30 uppercase tracking-wider">
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-1 text-theme-muted text-[10px] sm:text-[11px] font-inter font-normal mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-theme-muted shrink-0" />
                <EditableElement
                  as="span"
                  id="auto-location"
                  field="location"
                  value={location}
                  type="text"
                  className="inline truncate max-w-[110px] sm:max-w-[180px]"
                />
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Showroom Navigation"
            className="hidden xl:flex items-center gap-1 text-xs font-inter font-medium text-theme-muted"
          >
            {navList.map((item, idx) => {
              return (
                <a
                  key={idx}
                  href={isEditMode ? undefined : item.href}
                  onClick={(e: React.MouseEvent) => {
                    if (isEditMode) {
                      e.preventDefault();
                      return;
                    }
                    if (item.href === '#store' && onNavigate) {
                      e.preventDefault();
                      onNavigate('store');
                      return;
                    }
                    if (currentView === 'store' && item.href.startsWith('#') && item.href !== '#store') {
                      if (onNavigate) {
                        e.preventDefault();
                        onNavigate('home');
                        setTimeout(() => {
                          const target = document.querySelector(item.href);
                          target?.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    isEditMode
                      ? 'cursor-pointer text-theme-muted hover:text-theme-foreground hover:bg-theme-surface'
                      : 'text-theme-muted hover:text-theme-foreground hover:bg-theme-surface cursor-pointer'
                  }`}
                >
                  <EditableElement
                    as="span"
                    id={`auto-nav-item-${idx}`}
                    field={`navItem_${idx}`}
                    value={item.label}
                    type="text"
                  />
                </a>
              );
            })}
          </nav>

          {/* Quick Contact Actions & Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
            
            {/* Quick Call Button (Desktop) */}
            <a
              href={`tel:${phone}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-theme-border bg-theme-surface hover:bg-theme-surface-hover text-theme-muted hover:text-theme-foreground text-xs font-inter font-medium transition-all duration-200 cursor-pointer"
              aria-label={`Call dealership at ${phone}`}
            >
              <Phone className="w-3 h-3 text-theme-muted" />
              <span>{phone}</span>
            </a>

            {/* Primary Header CTA */}
            <EditableButton
              buttonKey="auto-header-cta"
              defaultText="Browse Fleet"
              defaultHref="#inventory"
              defaultOpenInNewTab={false}
              className="px-4 sm:px-5 py-1.5 sm:py-2 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-inter font-semibold tracking-wide active:scale-95 transition-all duration-200 shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>{activeButtonOverrides['auto-header-cta']?.text || 'Browse Fleet'}</span>
              <ArrowRight className="w-3 h-3" />
            </EditableButton>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-foreground hover:bg-theme-surface-hover transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Glassmorphism Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden max-w-7xl mx-auto mt-2 rounded-2xl bg-theme-background/98 backdrop-blur-2xl border border-theme-border overflow-hidden shadow-2xl p-4 sm:p-5 pointer-events-auto"
          >
            <div className="flex flex-col gap-3 font-inter">
              <div className="grid grid-cols-2 gap-1.5 pb-3.5 border-b border-theme-border">
                {navList.map((item, idx) => (
                  <a
                    key={idx}
                    href={isEditMode ? undefined : item.href}
                    onClick={(e: React.MouseEvent) => {
                      if (isEditMode) {
                        e.preventDefault();
                        return;
                      }
                      setIsMobileMenuOpen(false);
                      if (item.href === '#store' && onNavigate) {
                        e.preventDefault();
                        onNavigate('store');
                        return;
                      }
                      if (currentView === 'store' && item.href.startsWith('#') && item.href !== '#store') {
                        if (onNavigate) {
                          e.preventDefault();
                          onNavigate('home');
                          setTimeout(() => {
                            const target = document.querySelector(item.href);
                            target?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }
                    }}
                    className="text-xs font-medium text-theme-muted hover:text-theme-foreground py-2 px-2.5 rounded-lg hover:bg-theme-surface transition-colors cursor-pointer"
                  >
                    <EditableElement
                      as="span"
                      id={`auto-nav-item-mobile-${idx}`}
                      field={`navItem_${idx}`}
                      value={item.label}
                      type="text"
                    />
                  </a>
                ))}
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 pt-1">
                <a
                  href={`tel:${phone}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-theme-surface border border-theme-border text-theme-foreground text-xs font-semibold flex items-center justify-center gap-2 hover:bg-theme-surface-hover transition"
                >
                  <Phone className="w-3.5 h-3.5 text-theme-muted" />
                  <span className="text-xs">{phone}</span>
                </a>
                <a
                  href={`https://wa.me/${phone}?text=${encodeURIComponent('Hi, I am interested in viewing your available vehicle inventory.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
