'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import { 
  Menu, X, Clock, MapPin, Phone, MessageCircle, 
  Sparkles, ShieldCheck, Heart, Coffee, Truck,
  ChevronLeft, ChevronRight, ArrowRight
} from 'lucide-react';

// Intersection Observer reveal hook
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '40px' }
    );

    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return { ref, isVisible };
};

const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export interface FeaturedDish {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  image_url: string;
  badge?: string;
}

export interface CafeCloudProps {
  brandName?: string;
  navItems?: string[];
  heroTitle?: string;
  heroDescription?: string;
  heroImage?: string;
  openingHours?: string;
  deliveryBadge?: string;
  featuredTitle?: string;
  featuredDescription?: string;
  dish1?: FeaturedDish;
  dish2?: FeaturedDish;
  dish3?: FeaturedDish;
  aboutTitle?: string;
  aboutDescription?: string;
  aboutImage?: string;
  galleryImages?: string[];
  phone?: string;
  whatsapp?: string;
  address?: string;
  mapLocation?: string;
  businessHours?: string;
  email?: string;
  footerDescription?: string;
  copyright?: string;
}

export const CafeCloud: React.FC<CafeCloudProps> = ({
  brandName = 'ARTISAN CAFÉ & KITCHEN',
  heroTitle = 'Fresh Ingredients, Thoughtfully Prepared Daily',
  heroDescription = 'Welcome to your neighborhood destination for artisan coffee, freshly baked goods, and savory kitchen classics. Experience quality in every bite.',
  heroImage = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
  openingHours = 'Open Daily: 8:00 AM – 10:00 PM',
  deliveryBadge = '🛵 Fast Local Delivery Available',
  featuredTitle = 'Signature Highlights',
  featuredDescription = 'Handpicked customer favorites crafted with premium seasonal ingredients.',
  dish1 = {
    title: 'Signature Espresso Roast',
    description: 'Rich, smooth single-origin espresso with chocolate and caramel notes.',
    price: '$4.50',
    originalPrice: '$5.50',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    badge: 'BESTSELLER'
  },
  dish2 = {
    title: 'Artisan Avocado Toast',
    description: 'Freshly smashed avocado on sourdough with poached eggs and radish.',
    price: '$12.90',
    originalPrice: '',
    image_url: 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?auto=format&fit=crop&w=600&q=80',
    badge: 'FRESH'
  },
  dish3 = {
    title: 'House Pastry & Berry Bowl',
    description: 'Freshly baked buttery croissant served with seasonal organic berries.',
    price: '$9.50',
    originalPrice: '$11.00',
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    badge: 'DAILY SPECIAL'
  },
  aboutTitle = 'Crafted With Care & Passion',
  aboutDescription = 'Founded with a love for honest food and exceptional coffee, we take pride in sourcing sustainable local ingredients. Whether you are grabbing a quick morning coffee or enjoying a relaxed meal, we welcome you to our space.',
  aboutImage = 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
  galleryImages = [
    'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
  ],
  phone = '+1 (555) 234-5678',
  whatsapp = '+15552345678',
  address = '456 Gourmet Boulevard, Suite 100, Cityville',
  mapLocation = '456 Gourmet Boulevard, Suite 100, Cityville',
  businessHours = 'Mon – Sun: 8:00 AM – 10:00 PM',
  footerDescription = 'Creating memorable coffee and dining experiences with passion and care.',
  copyright = '© 2026 Artisan Café & Kitchen. All rights reserved.'
}) => {
  let templateData: any = { theme: { background: '#FAFAF7', surface: '#1C1510', primary: '#B8860B' } };
  let builder: any = null;
  try {
    builder = useVisualBuilder();
    if (builder && builder.templateData) {
      templateData = {
        ...templateData,
        ...builder.templateData,
        theme: { ...templateData.theme, ...(builder.templateData.theme || {}) }
      };
    }
  } catch (e) { /* Public mode fallback */ }

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [gallerySlide, setGallerySlide] = useState(0);

  const prevSlide = () => setGallerySlide(prev => (prev === 0 ? 3 : prev - 1));
  const nextSlide = () => setGallerySlide(prev => (prev === 3 ? 0 : prev + 1));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentMapLocation = templateData?.textOverrides?.['cafe-contact-mapLocation'] 
    || templateData?.blocks?.find((b: any) => b.id === 'cafe-contact')?.content?.mapLocation 
    || mapLocation 
    || address;

  const dishes = [dish1, dish2, dish3];

  // Dynamic Theme Variables & Semantic Tokens
  const theme = templateData?.theme || {};
  const themePrimary = theme.primary || '#B8860B';
  const themeSurface = theme.surface || '#1C1510';
  const themeBackground = theme.background || '#FAFAF7';
  const themeText = theme.text || theme.foreground || '#1C1510';
  const themeMuted = theme.muted || '#71717a';
  const themeBorder = theme.border || '#e4e4e7';
  
  // Container, Card, Hero & Footer Semantic Tokens
  const themeCardBg = theme.cardBg || '#FFFFFF';
  const themeCardText = theme.cardText || theme.foreground || '#1C1510';
  const themeCardMuted = theme.cardMuted || theme.muted || '#71717a';
  const themeHeroBg = theme.heroBg || theme.surface || '#1C1510';
  const themeHeroText = theme.heroText || '#FAFAF7';
  const themeFooterBg = theme.footerBg || theme.surface || '#1C1510';
  const themeFooterText = theme.footerText || '#FAFAF7';

  // Section style resolver for per-section background and text color overrides
  const getSectionStyle = (sectionId: string, defaultBg: string, defaultColor: string) => {
    const bgOverride = 
      builder?.getStyleOverride?.(`${sectionId}-section`)?.backgroundColor ||
      builder?.getStyleOverride?.(sectionId)?.backgroundColor ||
      builder?.getStyleOverride?.(`${sectionId}-bg`)?.backgroundColor ||
      builder?.getStyleOverride?.(`${sectionId}-background`)?.backgroundColor ||
      templateData?.styleOverrides?.[`${sectionId}-section`]?.backgroundColor ||
      templateData?.styleOverrides?.[sectionId]?.backgroundColor ||
      (templateData as any)?.textColors?.[`${sectionId}-bg`] ||
      defaultBg;

    const colorOverride = 
      builder?.getStyleOverride?.(`${sectionId}-section`)?.color ||
      builder?.getStyleOverride?.(sectionId)?.color ||
      builder?.getStyleOverride?.(`${sectionId}-color`)?.color ||
      templateData?.styleOverrides?.[`${sectionId}-section`]?.color ||
      templateData?.styleOverrides?.[sectionId]?.color ||
      (templateData as any)?.textColors?.[`${sectionId}-color`] ||
      defaultColor;

    return {
      backgroundColor: bgOverride,
      color: colorOverride,
    };
  };

  const heroStyle = getSectionStyle('cafe-hero', 'var(--theme-hero-bg)', 'var(--theme-hero-text)');
  const featuredStyle = getSectionStyle('cafe-featured', 'var(--theme-background)', 'var(--theme-text)');
  const storyStyle = getSectionStyle('cafe-about', 'var(--theme-surface)', 'var(--theme-hero-text)');
  const bentoStyle = getSectionStyle('cafe-bento', 'var(--theme-background)', 'var(--theme-text)');
  const galleryStyle = getSectionStyle('cafe-gallery', 'var(--theme-surface)', 'var(--theme-hero-text)');
  const contactStyle = getSectionStyle('cafe-contact', 'var(--theme-surface)', 'var(--theme-hero-text)');
  const footerStyle = getSectionStyle('cafe-footer', 'var(--theme-footer-bg)', 'var(--theme-footer-text)');

  return (
    <div 
      className="min-h-screen bg-theme-background text-theme-surface font-sans selection:bg-theme-primary selection:text-white"
      style={{
        '--theme-background': themeBackground,
        '--theme-surface': themeSurface,
        '--theme-primary': themePrimary,
        '--theme-text': themeText,
        '--theme-muted': themeMuted,
        '--theme-border': themeBorder,
        '--theme-card-bg': themeCardBg,
        '--theme-card-text': themeCardText,
        '--theme-card-muted': themeCardMuted,
        '--theme-hero-bg': themeHeroBg,
        '--theme-hero-text': themeHeroText,
        '--theme-footer-bg': themeFooterBg,
        '--theme-footer-text': themeFooterText,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .bg-theme-background { background-color: var(--theme-background); }
        .bg-theme-surface { background-color: var(--theme-surface); }
        .bg-theme-primary { background-color: var(--theme-primary); }
        .bg-theme-card { background-color: var(--theme-card-bg); }
        .text-theme-surface { color: var(--theme-surface); }
        .text-theme-background { color: var(--theme-background); }
        .text-theme-primary { color: var(--theme-primary); }
        .text-theme-card { color: var(--theme-card-text); }
        .text-theme-card-muted { color: var(--theme-card-muted); }
        .border-theme-primary { border-color: var(--theme-primary); }
        .border-theme-surface { border-color: var(--theme-surface); }
        .border-theme-card { border-color: var(--theme-border); }
      `}} />

      {/* ─── 1. Header / Navigation ─────────────────────────────────── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-theme-background/95 backdrop-blur-md border-b border-theme-surface/10 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo / Business Name */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => scrollTo('hero')}
          >
            <div className={`w-9 h-9 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform ${
              scrolled ? 'bg-theme-primary/10 text-theme-primary' : 'bg-white/10 text-white'
            }`}>
              <Coffee className="w-5 h-5" />
            </div>
            <EditableElement 
              as="span" 
              id="cafe-nav" 
              field="brand" 
              value={brandName} 
              type="text" 
              className={`text-lg font-extrabold tracking-tight transition-colors ${
                scrolled ? 'text-theme-surface' : 'text-theme-background'
              }`}
            />
          </div>
          
          {/* Desktop Nav Links */}
          <div className={`hidden md:flex items-center gap-1 text-sm font-semibold rounded-full px-1.5 py-1 ${
            scrolled ? 'bg-theme-surface/5' : 'bg-white/10 backdrop-blur-sm'
          }`}>
            {['Highlights', 'Our Story', 'Why Us', 'Gallery', 'Visit Us'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollTo(item === 'Our Story' ? 'story' : item === 'Why Us' ? 'features' : item === 'Visit Us' ? 'contact' : item.toLowerCase())} 
                className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  scrolled ? 'text-theme-surface/75 hover:text-theme-primary hover:bg-theme-surface/5' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Header Action Button */}
          <div className="hidden md:block">
            <EditableButton 
              buttonKey="cafe-nav-order" 
              defaultText="Order Now" 
              className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                scrolled 
                  ? 'bg-theme-primary text-theme-background hover:opacity-90' 
                  : 'bg-theme-background text-theme-surface hover:bg-white'
              }`}
            />
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className={`md:hidden p-2 cursor-pointer ${scrolled ? 'text-theme-surface' : 'text-theme-background'}`} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-theme-background/98 backdrop-blur-xl pt-24 px-6 flex flex-col space-y-6 md:hidden">
          <button onClick={() => scrollTo('highlights')} className="text-xl font-bold text-left py-2 border-b border-theme-surface/10">Highlights</button>
          <button onClick={() => scrollTo('story')} className="text-xl font-bold text-left py-2 border-b border-theme-surface/10">Our Story</button>
          <button onClick={() => scrollTo('features')} className="text-xl font-bold text-left py-2 border-b border-theme-surface/10">Why Us</button>
          <button onClick={() => scrollTo('gallery')} className="text-xl font-bold text-left py-2 border-b border-theme-surface/10">Gallery</button>
          <button onClick={() => scrollTo('contact')} className="text-xl font-bold text-left py-2 border-b border-theme-surface/10">Visit Us</button>
          <EditableButton 
            buttonKey="cafe-nav-order-mobile" 
            defaultText="Order Now" 
            className="bg-theme-primary text-theme-background px-6 py-4 rounded-xl font-bold text-center w-full uppercase tracking-wider text-sm mt-4 shadow-md cursor-pointer"
          />
        </div>
      )}

      {/* ─── 2. Hero Section (Dark green with arch transition) ──────── */}
      <section id="hero" className="relative overflow-hidden" style={heroStyle}>
        {/* Hero Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-28 min-h-[520px] md:min-h-[640px] flex items-center">
          
          {/* Left-Aligned Text Column (Overlaps the image card on the left) */}
          <div className="relative z-20 text-left max-w-xl md:max-w-2xl lg:max-w-3xl space-y-6">
            
            {/* Tagline / Delivery Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-theme-background px-4 py-1.5 rounded-full font-semibold text-xs tracking-wide backdrop-blur-sm border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
              <EditableElement 
                as="span" 
                id="cafe-hero" 
                field="deliveryBadge" 
                value={deliveryBadge} 
                type="text" 
              />
            </div>

            {/* Large Display Heading */}
            <EditableElement 
              as="h1" 
              id="cafe-hero" 
              field="title" 
              value={heroTitle} 
              type="heading" 
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight text-theme-background drop-shadow-md" 
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" } as React.CSSProperties}
            />

            {/* Description Paragraph */}
            <EditableElement 
              as="p" 
              id="cafe-hero" 
              field="description" 
              value={heroDescription} 
              type="text" 
              className="text-sm sm:text-base md:text-lg text-theme-background/85 leading-relaxed font-medium max-w-xl" 
            />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <EditableButton 
                buttonKey="cafe-hero-cta" 
                defaultText="Explore Bestsellers" 
                className="bg-theme-primary text-theme-background px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-lg hover:shadow-xl" 
              />
              <EditableButton 
                buttonKey="cafe-hero-secondary" 
                defaultText="Our Craft Story" 
                className="bg-white/10 text-theme-background border border-white/20 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-all cursor-pointer backdrop-blur-sm" 
              />
            </div>

            {/* Operating Hours Pill */}
            <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-theme-background/70">
              <Clock className="w-4 h-4 text-theme-primary shrink-0" />
              <EditableElement 
                as="span" 
                id="cafe-hero" 
                field="openingHours" 
                value={openingHours} 
                type="text" 
              />
            </div>
          </div>

          {/* Center-Right Rectangle Card with Sharp Zero-Gap Border Overflowing Right */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-[35%] w-[480px] xl:w-[560px] z-10">
            <div className="relative rounded-none p-0 border-2 sm:border-4 border-theme-primary/60 shadow-2xl bg-black/40 overflow-hidden group">
              <div className="aspect-[4/3] w-full relative">
                <EditableImage 
                  imageKey="cafe-hero-hero_image" 
                  defaultSrc={heroImage} 
                  defaultAlt="Café Cloud Dish" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
            </div>
          </div>

        </div>

        {/* SVG Concave Arch Bottom Transition (Blends into section below) */}
        <div className="relative w-full overflow-hidden leading-none z-20">
          <svg 
            viewBox="0 0 1440 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block" 
            preserveAspectRatio="none"
          >
            <path 
              d="M0 200V120C0 120 200 0 720 0C1240 0 1440 120 1440 120V200H0Z" 
              fill={featuredStyle.backgroundColor || "var(--theme-background)"} 
            />
          </svg>
        </div>
      </section>

      {/* ─── 3. Featured / Bestseller Section (Cream bg, matching arch) ─ */}
      <section id="highlights" className="pb-20 pt-4 px-6" style={featuredStyle}>
        <div className="max-w-5xl mx-auto">
          {/* Centered serif heading */}
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <EditableElement 
              as="h2" 
              id="cafe-featured" 
              field="title" 
              value={featuredTitle} 
              type="heading" 
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-theme-surface leading-tight" 
              style={{ fontFamily: "'Georgia', 'Times New Roman', serif" } as React.CSSProperties}
            />
            <EditableElement 
              as="p" 
              id="cafe-featured" 
              field="description" 
              value={featuredDescription} 
              type="text" 
              className="text-sm text-theme-surface/55 mt-3" 
            />
          </Reveal>

          {/* 3 Featured Food Image Cards — center large, sides smaller */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 items-end">
            {dishes.map((dish, i) => {
              const isCenter = i === 1;
              return (
                <Reveal key={i} delay={i * 120} className="flex flex-col items-center">
                  <div className={`w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-md group cursor-pointer relative ${
                    isCenter ? 'aspect-[4/5]' : 'aspect-square'
                  }`}>
                    <EditableImage 
                      imageKey={`cafe-dish-${i+1}-image_url`} 
                      defaultSrc={dish.image_url} 
                      defaultAlt={dish.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    {/* Overlay gradient with title + price */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <EditableElement 
                        as="span" 
                        id={`cafe-dish-${i+1}`} 
                        field="title" 
                        value={dish.title} 
                        type="heading" 
                        className="text-white font-bold text-sm leading-tight" 
                      />
                      <EditableElement 
                        as="span" 
                        id={`cafe-dish-${i+1}`} 
                        field="price" 
                        value={dish.price} 
                        type="text" 
                        className="text-white/80 font-bold text-xs mt-1" 
                      />
                    </div>
                    {/* Badge */}
                    {dish.badge && (
                      <div className="absolute top-3 left-3 bg-theme-primary text-theme-background px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider shadow-lg">
                        <EditableElement 
                          as="span" 
                          id={`cafe-dish-${i+1}`} 
                          field="badge" 
                          value={dish.badge} 
                          type="text" 
                        />
                      </div>
                    )}
                  </div>
                  {/* Title and price below the card */}
                  <div className="mt-3 text-center">
                    <EditableElement 
                      as="h3" 
                      id={`cafe-dish-${i+1}`} 
                      field="title" 
                      value={dish.title} 
                      type="heading" 
                      className="font-bold text-sm text-theme-surface leading-snug" 
                    />
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <EditableElement 
                        as="span" 
                        id={`cafe-dish-${i+1}`} 
                        field="price" 
                        value={dish.price} 
                        type="text" 
                        className="font-bold text-theme-primary text-sm" 
                      />
                      {dish.originalPrice && (
                        <EditableElement 
                          as="span" 
                          id={`cafe-dish-${i+1}`} 
                          field="originalPrice" 
                          value={dish.originalPrice} 
                          type="text" 
                          className="text-[11px] text-theme-surface/40 line-through" 
                        />
                      )}
                    </div>
                    <EditableButton 
                      buttonKey={`cafe-dish-${i+1}-btn`} 
                      defaultText="Order" 
                      className="mt-2 bg-theme-surface text-theme-background px-5 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-theme-primary transition-colors cursor-pointer" 
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 4. About / Our Story Section (1:1 Architectural Layout) ─────── */}
      <section id="story" className="py-24 px-6 md:px-12 border-t border-current/10 relative" style={storyStyle}>
        <div className="max-w-6xl mx-auto relative pl-8 md:pl-16">
          
          {/* Vertical Sidebar Text (Left edge) */}
          <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-2 text-[10px] uppercase font-bold tracking-widest opacity-50 select-none pointer-events-none">
            <span className="-rotate-90 origin-top-left translate-y-12 whitespace-nowrap">
              <EditableElement as="span" id="cafe-about" field="brand_vertical" value={brandName} type="text" />
            </span>
            <span className="-rotate-90 origin-bottom-left -translate-y-12 whitespace-nowrap hidden sm:inline">
              Scroll to read more
            </span>
          </div>

          {/* Top Divider Line */}
          <div className="w-full h-[1.5px] bg-current/20 mb-8" />

          {/* Upper Grid (2 Columns: Title + Intro on Left | Image on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mb-14">
            
            {/* Left Column: Stacked Big Headline & Subtitle & First Paragraphs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.88] text-current">
                  <EditableElement as="span" id="cafe-about" field="title_line1" value="Our" type="heading" className="block" />
                  <EditableElement as="span" id="cafe-about" field="title_line2" value="Story" type="heading" className="block" />
                </h2>
              </div>

              {/* Horizontal line under the "Our Story" title */}
              <div className="w-full h-[1.5px] bg-current/20 my-6" />

              <EditableElement 
                as="h3" 
                id="cafe-about" 
                field="subtitle" 
                value="From our kitchen to your table" 
                type="heading" 
                className="text-xl sm:text-2xl font-bold text-current leading-tight" 
              />

              <div className="space-y-4 text-xs sm:text-sm opacity-80 leading-relaxed font-normal">
                <EditableElement 
                  as="p" 
                  id="cafe-about" 
                  field="description" 
                  value={aboutDescription} 
                  type="text" 
                />
                <EditableElement 
                  as="p" 
                  id="cafe-about" 
                  field="story_paragraph_2" 
                  value="We continue to refine our recipes, source organic produce directly from certified local partners, and bring warm hospitality to every guest we serve." 
                  type="text" 
                />
              </div>
            </div>

            {/* Right Column: Featured Image with Caption */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div className="relative w-full aspect-[4/3] sm:aspect-square overflow-hidden shadow-sm border border-current/15">
                <EditableImage 
                  imageKey="cafe-about-image_url" 
                  defaultSrc={aboutImage} 
                  defaultAlt="Our story space" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="mt-2 text-right">
                <EditableElement 
                  as="span" 
                  id="cafe-about" 
                  field="image_caption" 
                  value="Our main kitchen & café located in Cityville" 
                  type="text" 
                  className="text-[11px] opacity-60 font-medium tracking-wide" 
                />
              </div>
            </div>
          </div>

          {/* Lower Grid (2 Columns: Badge Box on Left | Paragraphs on Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Certification / Stamp Box */}
            <div className="lg:col-span-5">
              <div className="bg-theme-card border border-theme-card p-8 flex flex-col items-center justify-center text-center shadow-sm aspect-square max-w-[280px] mx-auto lg:mx-0">
                <div className="w-44 h-44 rounded-full border-2 border-theme-primary/80 flex flex-col items-center justify-center p-4 relative">
                  <div className="w-8 h-8 text-theme-primary mb-1 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <span className="text-[9px] font-black tracking-widest text-theme-card uppercase">ARTISAN KITCHEN</span>
                  <div className="w-12 h-[1px] bg-theme-primary/60 my-1.5" />
                  <span className="text-[8px] font-bold tracking-wider text-theme-primary uppercase">100% CERTIFIED FRESH</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Story Paragraphs */}
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm opacity-80 leading-relaxed font-normal">
              <EditableElement 
                as="p" 
                id="cafe-about" 
                field="story_paragraph_3" 
                value="Every morning, our kitchen comes alive with the aroma of freshly roasted beans and warm pastries baking in our stone oven." 
                type="text" 
              />
              <EditableElement 
                as="p" 
                id="cafe-about" 
                field="story_paragraph_4" 
                value="We are proudly committed to zero artificial additives, 100% sustainable packaging, and supporting local farming communities to deliver pure quality to you and your family." 
                type="text" 
              />
            </div>

          </div>

        </div>
      </section>

      {/* ─── 5. Why Choose Us / Bento Grid Section (Fully Editable) ────── */}
      <section id="features" className="py-24 border-y border-theme-surface/10 px-6" style={bentoStyle}>
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <Reveal className="mb-12 text-left sm:text-center max-w-2xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-theme-surface mb-3">
              <EditableElement as="span" id="cafe-bento" field="section_title" value="Why guests love us." type="heading" />
            </h2>
          </Reveal>

          {/* Bento Grid */}
          <div className="space-y-6">
            
            {/* Top Row: 2 Asymmetric Cards (60% | 40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Top-Left Card (Fresh & Organic Sourcing + Bar Chart Graphic) */}
              <Reveal className="lg:col-span-7 bg-theme-card p-8 md:p-10 rounded-3xl border border-theme-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative group">
                <div className="space-y-3 mb-6 max-w-md">
                  <EditableElement 
                    as="h3" 
                    id="cafe-bento" 
                    field="card1_title" 
                    value="Fresh & organic sourcing." 
                    type="heading" 
                    className="text-2xl sm:text-3xl font-extrabold text-theme-card leading-snug" 
                  />
                  <EditableElement 
                    as="p" 
                    id="cafe-bento" 
                    field="card1_desc" 
                    value="We source organic produce and single-origin coffee beans daily from certified local partners, ensuring uncompromised flavor in every dish." 
                    type="text" 
                    className="text-xs sm:text-sm text-theme-card-muted leading-relaxed" 
                  />
                </div>

                {/* Visual Graphic Element at bottom (Bar Chart Graphic with Editable Label) */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-theme-card-muted mb-2">
                    <EditableElement as="span" id="cafe-bento" field="card1_bar_label" value="Daily Freshness Score" type="text" />
                  </div>
                  <div className="flex items-end gap-2 pt-2 overflow-hidden">
                    {[25, 18, 22, 20, 30, 45, 60, 75, 95, 100].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end h-20">
                        <div 
                          className={`w-full rounded-t-md transition-all duration-500 ${
                            i >= 7 ? 'bg-theme-primary' : 'bg-emerald-400/80'
                          }`} 
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Top-Right Card (Handcrafted Excellence + Floating Stat Card) */}
              <Reveal delay={150} className="lg:col-span-5 bg-theme-card p-8 md:p-10 rounded-3xl border border-theme-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
                <div className="space-y-3 mb-6">
                  <EditableElement 
                    as="h3" 
                    id="cafe-bento" 
                    field="card2_title" 
                    value="Handcrafted excellence." 
                    type="heading" 
                    className="text-2xl sm:text-3xl font-extrabold text-theme-card leading-snug" 
                  />
                  <EditableElement 
                    as="p" 
                    id="cafe-bento" 
                    field="card2_desc" 
                    value="Every recipe is perfected by our master chefs and baristas with uncompromised care." 
                    type="text" 
                    className="text-xs sm:text-sm text-theme-card-muted leading-relaxed" 
                  />
                </div>

                {/* Floating Big Stat Card Element (Fully Editable) */}
                <div className="mt-4 bg-theme-background border border-theme-card rounded-2xl p-5 shadow-md self-end w-full max-w-[280px]">
                  <span className="text-xs text-theme-surface/70 font-semibold block mb-1">
                    <EditableElement as="span" id="cafe-bento" field="stat_label" value="Happy Guests Served" type="text" />
                  </span>
                  <div className="text-3xl font-black text-theme-surface tracking-tight">
                    <EditableElement as="span" id="cafe-bento" field="stat_number" value="50,000+" type="text" />
                  </div>
                  <div className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[11px] font-bold mt-2">
                    <EditableElement as="span" id="cafe-bento" field="stat_rating" value="↑ 4.9 ★ Rating" type="text" />
                  </div>
                </div>
              </Reveal>

            </div>

            {/* Bottom Row: 3 Equal/Flexible Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Bottom-Left Card (Fast Local Delivery + Toggle Card) */}
              <Reveal delay={200} className="bg-theme-card p-8 rounded-3xl border border-theme-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
                <div className="space-y-3 mb-6">
                  <EditableElement 
                    as="h3" 
                    id="cafe-bento" 
                    field="card3_title" 
                    value="Fast local delivery." 
                    type="heading" 
                    className="text-xl sm:text-2xl font-extrabold text-theme-card leading-snug" 
                  />
                  <EditableElement 
                    as="p" 
                    id="cafe-bento" 
                    field="card3_desc" 
                    value="Hot, fresh meals delivered straight to your door or ready for instant pickup." 
                    type="text" 
                    className="text-xs sm:text-sm text-theme-card-muted leading-relaxed" 
                  />
                </div>

                {/* Platform Badge / Switch Card Element (Fully Editable) */}
                <div className="mt-4 bg-theme-background border border-theme-card rounded-2xl p-4 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-theme-primary shrink-0" />
                    <EditableElement as="span" id="cafe-bento" field="card3_badge_title" value="Doorstep Delivery" type="text" className="text-xs font-bold text-theme-surface" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <EditableElement as="span" id="cafe-bento" field="card3_badge_status" value="ACTIVE" type="text" className="text-[10px] font-extrabold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-md" />
                    <div className="w-7 h-3.5 bg-emerald-500 rounded-full p-0.5 flex justify-end">
                      <div className="w-2.5 h-2.5 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Bottom-Middle Card (Dietary Friendly + 3 Editable White Icon Cards) */}
              <Reveal delay={250} className="bg-theme-card p-8 rounded-3xl border border-theme-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
                <div className="space-y-3 mb-6">
                  <EditableElement 
                    as="h3" 
                    id="cafe-bento" 
                    field="card4_title" 
                    value="Dietary friendly." 
                    type="heading" 
                    className="text-xl sm:text-2xl font-extrabold text-theme-card leading-snug" 
                  />
                  <EditableElement 
                    as="p" 
                    id="cafe-bento" 
                    field="card4_desc" 
                    value="Vegan, gluten-free, and nut-free options clearly marked and safely prepared." 
                    type="text" 
                    className="text-xs sm:text-sm text-theme-card-muted leading-relaxed" 
                  />
                </div>

                {/* 3 Editable Icon Chips */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="flex-1 h-14 bg-theme-background border border-theme-card rounded-2xl shadow-md flex flex-col items-center justify-center text-emerald-600 font-extrabold text-[9px] px-1 text-center">
                    <Sparkles className="w-4 h-4 mb-0.5" />
                    <EditableElement as="span" id="cafe-bento" field="card4_chip1_text" value="VEGAN" type="text" />
                  </div>
                  <div className="flex-1 h-14 bg-theme-background border border-theme-card rounded-2xl shadow-md flex flex-col items-center justify-center text-amber-600 font-extrabold text-[9px] px-1 text-center">
                    <ShieldCheck className="w-4 h-4 mb-0.5" />
                    <EditableElement as="span" id="cafe-bento" field="card4_chip2_text" value="GLUTEN" type="text" />
                  </div>
                  <div className="flex-1 h-14 bg-theme-background border border-theme-card rounded-2xl shadow-md flex flex-col items-center justify-center text-theme-primary font-extrabold text-[9px] px-1 text-center">
                    <Heart className="w-4 h-4 mb-0.5" />
                    <EditableElement as="span" id="cafe-bento" field="card4_chip3_text" value="ORGANIC" type="text" />
                  </div>
                </div>
              </Reveal>

              {/* Bottom-Right Card (Seamless Ordering + Fully Editable Progress Bars) */}
              <Reveal delay={300} className="bg-theme-card p-8 rounded-3xl border border-theme-card shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
                <div className="space-y-3 mb-6">
                  <EditableElement 
                    as="h3" 
                    id="cafe-bento" 
                    field="card5_title" 
                    value="Seamless ordering." 
                    type="heading" 
                    className="text-xl sm:text-2xl font-extrabold text-theme-card leading-snug" 
                  />
                  <EditableElement 
                    as="p" 
                    id="cafe-bento" 
                    field="card5_desc" 
                    value="Order in seconds via WhatsApp or online with instant kitchen confirmation." 
                    type="text" 
                    className="text-xs sm:text-sm text-theme-card-muted leading-relaxed" 
                  />
                </div>

                {/* Progress Bars (Fully Editable Titles & Values) */}
                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-theme-card mb-1">
                      <EditableElement as="span" id="cafe-bento" field="card5_p1_label" value="WhatsApp Order" type="text" />
                      <EditableElement as="span" id="cafe-bento" field="card5_p1_value" value="Instant" type="text" className="text-emerald-600" />
                    </div>
                    <div className="w-full h-2 bg-theme-surface/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full w-[95%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-theme-card-muted mb-1">
                      <EditableElement as="span" id="cafe-bento" field="card5_p2_label" value="Store Pickup" type="text" />
                      <EditableElement as="span" id="cafe-bento" field="card5_p2_value" value="10 Mins" type="text" />
                    </div>
                    <div className="w-full h-2 bg-theme-surface/10 rounded-full overflow-hidden">
                      <div className="h-full bg-theme-surface/40 rounded-full w-[75%]" />
                    </div>
                  </div>
                </div>
              </Reveal>

            </div>

          </div>
        </div>
      </section>

      {/* ─── 6. Aesthetic Image Carousel Gallery (4 Editable Slides) ──── */}
      <section id="gallery" className="w-full py-24 px-6 overflow-hidden" style={galleryStyle}>
        <div className="max-w-7xl mx-auto">
          {/* Header & Controls Bar */}
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-theme-primary font-bold text-xs uppercase tracking-widest block mb-2">
                <EditableElement as="span" id="cafe-gallery" field="kicker" value="Atmosphere & Craft" type="text" />
              </span>
              <EditableElement 
                as="h2" 
                id="cafe-gallery-heading" 
                field="title" 
                value="A Glimpse Inside" 
                type="heading" 
                className="text-4xl sm:text-5xl font-black tracking-tight text-current" 
              />
              <EditableElement 
                as="p" 
                id="cafe-gallery" 
                field="description" 
                value="Step inside our space and experience the passion, warmth, and detail behind every cup and plate." 
                type="text" 
                className="text-sm opacity-80 mt-2 max-w-md leading-relaxed" 
              />
            </div>

            {/* Carousel Nav Controls */}
            <div className="flex items-center gap-4 self-start md:self-end">
              <span className="text-xs font-mono font-bold opacity-60">
                0{gallerySlide + 1} / 04
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={prevSlide} 
                  className="w-12 h-12 rounded-full border border-current/20 bg-current/5 text-current flex items-center justify-center shadow-sm hover:bg-theme-primary hover:border-theme-primary hover:text-white transition-all cursor-pointer"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextSlide} 
                  className="w-12 h-12 rounded-full border border-current/20 bg-current/5 text-current flex items-center justify-center shadow-sm hover:bg-theme-primary hover:border-theme-primary hover:text-white transition-all cursor-pointer"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Reveal>

          {/* Carousel Track Container */}
          <div className="relative overflow-hidden pt-2 pb-6">
            <div 
              className="flex transition-transform duration-700 ease-out gap-6"
              style={{ transform: `translateX(-${gallerySlide * 35}%)` }}
            >
              {[
                { title: 'Artisan Coffee Bar', tag: 'ESPRESSO CRAFT', defaultImg: galleryImages[0] || 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80' },
                { title: 'Fresh Daily Bakery', tag: 'KITCHEN & OVEN', defaultImg: galleryImages[1] || 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80' },
                { title: 'Warm Café Ambiance', tag: 'OUR SPACE', defaultImg: galleryImages[2] || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80' },
                { title: 'Handcrafted Drinks', tag: 'SIGNATURE MENU', defaultImg: galleryImages[3] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80' },
              ].map((slide, i) => (
                <div 
                  key={i} 
                  className={`w-[85vw] sm:w-[55vw] lg:w-[42vw] shrink-0 rounded-3xl overflow-hidden border border-current/10 shadow-lg group relative aspect-[16/9] bg-current/5 transition-all duration-500 ${
                    gallerySlide === i ? 'ring-2 ring-theme-primary/50 scale-[1.01]' : 'opacity-90'
                  }`}
                >
                  <EditableImage 
                    imageKey={`cafe-gallery-image-${i}`} 
                    defaultSrc={slide.defaultImg} 
                    defaultAlt={slide.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />

                  {/* Top Badge: Slide Number (Editable) */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider border border-white/20">
                    <EditableElement as="span" id="cafe-gallery" field={`slide_${i+1}_num`} value={`0${i + 1}`} type="text" />
                  </div>

                  {/* Bottom Overlay Content (All Texts Fully Editable) */}
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent text-white flex flex-col justify-end">
                    <span className="text-[10px] font-extrabold tracking-widest text-theme-primary uppercase mb-1">
                      <EditableElement as="span" id="cafe-gallery" field={`slide_${i+1}_tag`} value={slide.tag} type="text" />
                    </span>
                    <EditableElement 
                      as="h3" 
                      id="cafe-gallery" 
                      field={`slide_${i+1}_title`} 
                      value={slide.title} 
                      type="heading" 
                      className="text-lg sm:text-xl font-bold leading-tight text-white" 
                    />
                    <EditableElement 
                      as="p" 
                      id="cafe-gallery" 
                      field={`slide_${i+1}_desc`} 
                      value={i === 0 ? 'Single-origin beans roasted daily' : i === 1 ? 'Fresh croissants & sourdough breads' : i === 2 ? 'Cozy seating & warm neighborhood vibes' : 'Seasonal fruit smoothies & matcha'} 
                      type="text" 
                      className="text-xs text-white/80 mt-1 leading-snug" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar & Indicators */}
          <div className="flex items-center justify-between mt-8 max-w-xs mx-auto">
            <div className="flex items-center gap-2 w-full justify-center">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setGallerySlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    gallerySlide === idx ? 'w-10 bg-theme-primary' : 'w-3 bg-current/20 hover:bg-current/40'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. Contact & Location Section (Redesigned with Live Dynamic Google Maps) ─── */}
      <section id="contact" className="py-24 px-6 relative overflow-hidden" style={contactStyle}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Contact Details Column */}
          <Reveal className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-theme-primary font-bold text-xs uppercase tracking-widest block mb-2">
                <EditableElement as="span" id="cafe-contact" field="kicker" value="Visit & Connect" type="text" />
              </span>
              <EditableElement 
                as="h2" 
                id="cafe-contact" 
                field="heading" 
                value="We'd Love To Serve You" 
                type="heading" 
                className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-theme-background leading-tight" 
              />
              <EditableElement 
                as="p" 
                id="cafe-contact" 
                field="subheading" 
                value="Stop by for a fresh meal, call ahead for instant pickup, or order online for fast doorstep delivery." 
                type="text" 
                className="text-sm sm:text-base text-theme-background/75 leading-relaxed max-w-lg" 
              />
            </div>

            {/* 4 Interactive Contact Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Phone Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 backdrop-blur-sm hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-theme-primary/20 flex items-center justify-center text-theme-primary shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-theme-background/50 block font-semibold uppercase tracking-wider">Phone</span>
                  <EditableElement as="span" id="cafe-contact" field="phone" value={phone} type="text" className="font-extrabold text-sm text-theme-background block mt-0.5" />
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 backdrop-blur-sm hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-theme-background/50 block font-semibold uppercase tracking-wider">WhatsApp</span>
                  <EditableElement as="span" id="cafe-contact" field="whatsapp" value={whatsapp} type="text" className="font-extrabold text-sm text-theme-background block mt-0.5" />
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 backdrop-blur-sm hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-theme-background/50 block font-semibold uppercase tracking-wider">Location Address</span>
                  <EditableElement as="span" id="cafe-contact" field="address" value={address} type="text" className="font-bold text-xs text-theme-background leading-snug block mt-0.5" />
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5 backdrop-blur-sm hover:border-white/25 transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-theme-background/50 block font-semibold uppercase tracking-wider">Opening Hours</span>
                  <EditableElement as="span" id="cafe-contact" field="businessHours" value={businessHours} type="text" className="font-bold text-xs text-theme-background leading-snug block mt-0.5" />
                </div>
              </div>

            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-colors flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <EditableElement as="span" id="cafe-contact" field="btn_whatsapp_text" value="Chat on WhatsApp" type="text" />
              </a>

              <a 
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`} 
                className="bg-white/10 text-theme-background px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition-colors flex items-center gap-2 cursor-pointer border border-white/15"
              >
                <Phone className="w-4 h-4 text-theme-primary" />
                <EditableElement as="span" id="cafe-contact" field="btn_phone_text" value="Call Us Now" type="text" />
              </a>
            </div>
          </Reveal>

          {/* Interactive Live Google Maps Card */}
          <Reveal delay={200} className="lg:col-span-6">
            <div className="bg-white/5 border border-white/15 rounded-3xl p-3 sm:p-4 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              {/* Map Header Bar */}
              <div className="flex items-center justify-between px-3 py-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-theme-background tracking-wide">Live Location Map</span>
                </div>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(currentMapLocation)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-extrabold text-theme-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Open Directions</span>
                </a>
              </div>

              {/* Live Google Maps Iframe */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-inner border border-white/10 bg-black/40">
                <iframe
                  title="Google Maps Location"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={
                    currentMapLocation.includes('google.com/maps/embed')
                      ? currentMapLocation
                      : `https://maps.google.com/maps?q=${encodeURIComponent(currentMapLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
                  }
                  className="w-full h-full"
                />
              </div>

              {/* Editable Location Query Footer Bar */}
              <div className="mt-3 px-3.5 py-2.5 flex items-center justify-between text-xs text-theme-background/70 bg-white/5 rounded-xl border border-white/10 gap-3">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <MapPin className="w-4 h-4 text-theme-primary shrink-0" />
                  <EditableElement 
                    as="span" 
                    id="cafe-contact" 
                    field="mapLocation" 
                    value={currentMapLocation} 
                    type="text" 
                    className="truncate font-medium text-theme-background text-xs" 
                  />
                </div>
                <span className="text-[9px] text-theme-primary uppercase font-black tracking-wider shrink-0 bg-theme-primary/10 px-2 py-0.5 rounded">
                  Map Location
                </span>
              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ─── 8. Valkyrie Luxe Style Footer with "Built with Portiva" Card ─── */}
      <footer className="w-full border-t border-white/10 pt-16 pb-12 px-6" style={footerStyle}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 items-stretch">
            
            {/* Column 1: Brand Info (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <EditableElement
                  as="h3"
                  id="cafe-footer"
                  field="brand"
                  value={brandName}
                  type="heading"
                  className="text-xl sm:text-2xl font-black tracking-tight text-theme-background"
                />
                <EditableElement
                  as="p"
                  id="cafe-footer"
                  field="description"
                  value={footerDescription}
                  type="text"
                  className="text-xs sm:text-sm text-theme-background/70 leading-relaxed max-w-sm"
                />
              </div>
            </div>

            {/* Column 2: Quick Navigation Links (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-xs font-extrabold text-theme-primary uppercase tracking-widest block">
                Quick Navigation
              </span>
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => scrollTo('hero')}
                  className="text-xs sm:text-sm font-semibold text-theme-background/70 hover:text-theme-primary transition-colors text-left cursor-pointer"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollTo('featured')}
                  className="text-xs sm:text-sm font-semibold text-theme-background/70 hover:text-theme-primary transition-colors text-left cursor-pointer"
                >
                  Featured Menu
                </button>
                <button
                  onClick={() => scrollTo('story')}
                  className="text-xs sm:text-sm font-semibold text-theme-background/70 hover:text-theme-primary transition-colors text-left cursor-pointer"
                >
                  Our Story
                </button>
                <button
                  onClick={() => scrollTo('why-us')}
                  className="text-xs sm:text-sm font-semibold text-theme-background/70 hover:text-theme-primary transition-colors text-left cursor-pointer"
                >
                  Why Guests Love Us
                </button>
                <button
                  onClick={() => scrollTo('gallery')}
                  className="text-xs sm:text-sm font-semibold text-theme-background/70 hover:text-theme-primary transition-colors text-left cursor-pointer"
                >
                  Gallery
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-xs sm:text-sm font-semibold text-theme-background/70 hover:text-theme-primary transition-colors text-left cursor-pointer"
                >
                  Visit & Contact
                </button>
              </div>
            </div>

            {/* Column 3: Big "Built with Portiva" Card (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-theme-primary/40 transition-all duration-300 min-h-[220px] backdrop-blur-md">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-theme-primary/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-primary/20 border border-theme-primary/30 text-theme-primary text-xs font-mono font-bold tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Built with portiva.site</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-theme-background tracking-tight mb-2 leading-snug block">
                  Created in 60 seconds — Free forever
                </h3>

                <p className="text-xs sm:text-sm text-theme-background/75 leading-relaxed block">
                  Build, customize, and publish your dream website instantly with AI. Fast, responsive, and completely free forever.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-theme-background/80">
                  Build your website now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-theme-primary hover:bg-theme-primary/90 text-theme-background text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Create Yours Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex items-center justify-between gap-4 text-xs text-theme-background/60">
            <EditableElement
              as="p"
              id="cafe-footer"
              field="copyright"
              value={copyright}
              type="text"
              className="text-xs text-theme-background/60"
            />
          </div>
        </div>
      </footer>
    </div>
  );
};
