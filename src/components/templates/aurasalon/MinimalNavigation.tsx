'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import type { NavItem } from './types';

interface MinimalNavigationProps {
  brandLogoText: string;
  navItems: NavItem[];
  navCtaText: string;
  phone: string;
}

export const MinimalNavigation: React.FC<MinimalNavigationProps> = ({
  brandLogoText,
  navItems,
  navCtaText,
  phone,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

  const builderCtx = useVisualBuilder();
  const activeButtonOverrides: Record<string, ButtonOverride> = (builderCtx?.templateData?.buttonOverrides as Record<string, ButtonOverride>) || {};

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Track active section anchor
      const sectionIds = navItems.map((item) => item.href.replace('#', '')).filter(Boolean);
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <EditableElement
      as="header"
      id="aura-navbar-header"
      field="navbarHeader"
      value="Aura Salon Navigation Bar"
      type="container"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 bg-theme-background/95 backdrop-blur-md border-b border-theme-border/30 shadow-xs'
          : 'py-5 bg-theme-background/80 backdrop-blur-sm border-b border-theme-border/15'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group focus:outline-none">
          <div className="p-1.5 rounded-full bg-theme-surface border border-theme-border/40 shadow-xs group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-theme-accent transition-transform duration-300 group-hover:rotate-12" />
          </div>
          <EditableElement
            as="span"
            id="aura-nav-logo"
            field="brandLogoText"
            value={brandLogoText}
            type="heading"
            className="font-editorial text-2xl md:text-3xl tracking-widest uppercase font-bold text-theme-foreground group-hover:text-theme-primary transition-colors"
          />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xs font-sans font-medium uppercase tracking-[0.2em] transition-all duration-200 relative py-1.5 ${
                  isActive
                    ? 'text-theme-foreground font-semibold'
                    : 'text-theme-muted hover:text-theme-foreground'
                }`}
              >
                <EditableElement
                  as="span"
                  id={`aura-nav-item-${item.id}`}
                  field="label"
                  value={item.label}
                  type="text"
                  className="inline-block"
                />
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-theme-accent rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <EditableButton
            buttonKey="aura-nav-cta"
            defaultText={navCtaText}
            defaultHref={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              'Hi Ananya, I would like to reserve a private consultation for my upcoming wedding.'
            )}`}
            defaultOpenInNewTab={true}
            className="hidden sm:inline-flex bg-theme-primary text-theme-background hover:bg-theme-primary-hover px-6 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span>{activeButtonOverrides['aura-nav-cta']?.text || navCtaText}</span>
          </EditableButton>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-theme-foreground hover:bg-theme-surface/50 transition-colors focus:outline-none border border-theme-border/20"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-theme-background/95 backdrop-blur-xl border-b border-theme-border/40 p-6 flex flex-col gap-5 shadow-2xl animate-fade-in z-50">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <a
                key={`mobile-${item.id}`}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm font-sans font-medium uppercase tracking-widest text-theme-foreground hover:text-theme-accent py-2 border-b border-theme-border/10 transition-colors"
              >
                <EditableElement
                  as="span"
                  id={`aura-mobile-nav-item-${item.id}`}
                  field="label"
                  value={item.label}
                  type="text"
                  className="inline-block"
                />
              </a>
            ))}
          </nav>
          <EditableButton
            buttonKey="aura-mobile-nav-cta"
            defaultText={navCtaText}
            defaultHref={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              'Hi Ananya, I would like to reserve a private consultation.'
            )}`}
            defaultOpenInNewTab={true}
            className="w-full text-center bg-theme-primary text-theme-background hover:bg-theme-primary-hover py-3 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all"
          >
            <span>{activeButtonOverrides['aura-mobile-nav-cta']?.text || navCtaText}</span>
          </EditableButton>
        </div>
      )}
    </EditableElement>
  );
};

