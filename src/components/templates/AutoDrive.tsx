'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Car,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

export interface VehicleItem {
  id: string;
  title: string;
  year: string;
  mileage: string;
  transmission: string;
  fuel: string;
  price: string;
  status: string;
  image: string;
  category?: string;
}

export interface AutoDriveProps {
  dealershipName?: string;
  location?: string;
  phone?: string;
  heroTagline?: string;
  heroSubheadline?: string;
  heroDescription?: string;
  heroStageBadge?: string;
  heroStageLocation?: string;
  storyWatermark?: string;
  storyCategoryTag?: string;
  quoteDirective?: string;
  specTag?: string;
  ctaBoxTitle?: string;
  ctaBoxSub?: string;
  trust1Tag?: string;
  trust2Tag?: string;
  trust3Tag?: string;
  trust4Tag?: string;
  inventoryTitle?: string;
  inventorySubtitle?: string;
  spotlightTag?: string;
  spotlightQuote?: string;
  conciergeTag?: string;
  conciergeTitle?: string;
  conciergeSub?: string;
  footerDescription?: string;
  quickLinksHeader?: string;
  navItems?: { label: string; href: string }[];
  vehicles?: VehicleItem[];
  navbarBg?: string;
  hoverStyle?: string;
}

type StoryTab = 'atelier' | 'heritage' | 'stewardship';

interface StoryChapter {
  id: StoryTab;
  tabLabel: string;
  tag: string;
  location: string;
  heading: string;
  subheading: string;
  p1: string;
  p2: string;
  quote: string;
  author: string;
  heroImage: string;
  heroAlt: string;
  secondaryImg1: string;
  secondaryImg2: string;
  details: { label: string; desc: string }[];
}

const DEFAULT_NAV_ITEMS = [
  { label: 'Inventory', href: '#inventory' },
  { label: 'Our Story', href: '#story' },
  { label: 'Performance', href: '#spotlight' },
  { label: 'Concierge', href: '#concierge' },
];

const STORY_CHAPTERS: Record<StoryTab, StoryChapter> = {
  atelier: {
    id: 'atelier',
    tabLabel: '01 / THE ATELIER',
    tag: 'SPEC. 01 / CRAFTSMANSHIP & TELEMETRY',
    location: 'MUNICH, GERMANY • EST. 1998',
    heading: 'Obsessive Engineering Precision.',
    subheading: 'Where mechanical perfection meets uncompromised artistry.',
    p1: 'Every vehicle in the AutoBahn registry undergoes an exhaustive 150-point telemetry, mechanical, and cosmetic evaluation. We measure paint micrometer depth, suspension alignment tolerances, and engine acoustic harmonics before accepting any automobile into our private collection.',
    p2: 'Our master technicians are factory-certified in Stuttgart and Affalterbach, ensuring that every engine, gearbox, and active aerodynamic system operates at peak factory specification.',
    quote: '"We do not sell cars. We curate rare engineering artifacts and guarantee absolute mechanical integrity before handover."',
    author: 'Marcus Vonberg — Chief Master Technician',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
    heroAlt: 'AutoBahn Flagship Atelier Inspection Stage',
    secondaryImg1: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
    secondaryImg2: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
    details: [
      { label: '150-Point Telemetry Audit', desc: 'Comprehensive laser & acoustic diagnostic baseline' },
      { label: 'Single-Owner Provenance', desc: '100% verified factory service history & lineage' },
      { label: 'Direct OEM Allocations', desc: 'Bespoke factory builds with Porsche, AMG, & Ferrari' },
    ],
  },
  heritage: {
    id: 'heritage',
    tabLabel: '02 / PROVENANCE',
    tag: 'SPEC. 02 / MOTORSPORT & LINEAGE',
    location: 'ZUFFENHAUSEN • AFFALTERBACH',
    heading: 'Preserving Automotive History.',
    subheading: 'Tracing the historic lineage of iconic supercars and classics.',
    p1: 'Founded in Munich on an unyielding reverence for automotive heritage, AutoBahn specializes in acquiring rare air-cooled classics, limited-production GT allocations, and historic hyper-hybrids with documented provenance.',
    p2: 'Through established relationships with private collectors and European heritage divisions, we uncover off-market allocations with racing pedigree and original factory documentation.',
    quote: '"True value lies in provenance. We trace every vehicle back to the factory floor where its story began."',
    author: 'Elena Vance — Curator of Collector Heritage',
    heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    heroAlt: 'AutoBahn Classic Heritage Vault',
    secondaryImg1: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    secondaryImg2: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
    details: [
      { label: 'Historic Chassis Tracking', desc: 'Complete ownership and track telemetry verification' },
      { label: 'Off-Market Access', desc: 'Private collector registry not available to the public' },
      { label: 'Investment Valuation', desc: 'Quarterly market analysis for private fleet owners' },
    ],
  },
  stewardship: {
    id: 'stewardship',
    tabLabel: '03 / STEWARDSHIP',
    tag: 'SPEC. 03 / PRIVATE CLIENT CARE',
    location: 'GLOBAL LOGISTICS • PRIVATE ESTATES',
    heading: 'Relationships Built for Generations.',
    subheading: 'White-glove concierge and private client asset management.',
    p1: 'Acquiring a flagship vehicle from AutoBahn is the beginning of a lifelong partnership. We oversee private transport logistics, seasonal climate-controlled storage, track-day prep, and asset management for discerning collectors worldwide.',
    p2: 'Our private delivery team handles white-glove transport in enclosed carriers, ensuring your vehicle arrives at your private residence or track facility anywhere across North America and Europe.',
    quote: '"Our commitment does not end when the transport keys are handed over. It begins there."',
    author: 'Julian Thorne — Director of Private Client Relations',
    heroImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1600&auto=format&fit=crop',
    heroAlt: 'AutoBahn White Glove Delivery Lounge',
    secondaryImg1: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    secondaryImg2: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
    details: [
      { label: 'Enclosed Global Logistics', desc: 'Climate-controlled white-glove estate delivery' },
      { label: 'Private Concierge Manager', desc: 'Dedicated 24/7 specialist for servicing & upgrades' },
      { label: 'Guaranteed Buyback Program', desc: 'Priority trade-in & resale valuation optimization' },
    ],
  },
};

const DEFAULT_FEATURED_VEHICLES: VehicleItem[] = [
  {
    id: 'car-1',
    title: 'Porsche 911 GT3 RS',
    year: '2024',
    mileage: '1,200 mi',
    transmission: '7-Speed PDK',
    fuel: 'Gasoline',
    price: '$289,900',
    status: 'Available',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-2',
    title: 'Mercedes-AMG GT Black Series',
    year: '2023',
    mileage: '3,400 mi',
    transmission: '7-Speed DCT',
    fuel: 'Gasoline',
    price: '$319,500',
    status: 'Available',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-3',
    title: 'Porsche Taycan Turbo S',
    year: '2024',
    mileage: '800 mi',
    transmission: '2-Speed Auto',
    fuel: 'Electric',
    price: '$188,800',
    status: 'Available',
    category: 'Electric',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-4',
    title: 'Lamborghini Urus Performante',
    year: '2024',
    mileage: '2,100 mi',
    transmission: '8-Speed Auto',
    fuel: 'Gasoline',
    price: '$269,900',
    status: 'Reserved',
    category: 'Luxury SUV',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-5',
    title: 'Ferrari F8 Tributo',
    year: '2023',
    mileage: '1,500 mi',
    transmission: '7-Speed F1 DCT',
    fuel: 'Gasoline',
    price: '$345,000',
    status: 'Available',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-6',
    title: 'Aston Martin DBS Superleggera',
    year: '2024',
    mileage: '900 mi',
    transmission: '8-Speed Auto',
    fuel: 'Gasoline',
    price: '$315,800',
    status: 'Available',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
  },
];

export const AutoDrive: React.FC<AutoDriveProps> = ({
  dealershipName = 'AUTOBAHN',
  location = 'Munich, Germany',
  phone = '+491234567890',
  heroTagline = 'Precision in Motion.',
  heroSubheadline = 'The Autobahn Collection.',
  heroDescription = 'An architectural curation of high-performance luxury automobiles, factory-direct allocations, and bespoke concierge acquisition.',
  heroStageBadge = '[ 01 ] FLAGSHIP SHOWCASE',
  heroStageLocation = 'MUNICH • GERMANY',
  storyWatermark = 'AUTOBAHN ATELIER',
  storyCategoryTag = '[ OUR PHILOSOPHY & HERITAGE ]',
  quoteDirective = 'CRAFTSMANSHIP DIRECTIVE',
  specTag = '[ SPECIFICATION & DISCIPLINE ]',
  ctaBoxTitle = 'Experience The AutoBahn Atelier',
  ctaBoxSub = 'Connect with our senior vehicle curators to arrange a private consultation, view off-market allocations, or initiate a custom factory order.',
  trust1Tag = '01 / ORIGIN',
  trust2Tag = '02 / ALLOCATION',
  trust3Tag = '03 / LOGISTICS',
  trust4Tag = '04 / REGISTRY',
  inventoryTitle = 'Featured Inventory',
  inventorySubtitle = 'Curated Registry',
  spotlightTag = 'Engineering Excellence',
  spotlightQuote = 'Every vehicle in our collection represents the pinnacle of automotive engineering, performance, and uncompromised craftsmanship.',
  conciergeTag = 'Private Concierge',
  conciergeTitle = 'Acquire Your Next Vehicle',
  conciergeSub = 'Connect directly with our senior acquisition specialists to reserve inventory, arrange trade-in valuation, or initiate a custom factory order.',
  footerDescription = 'An architectural curation of high-performance luxury automobiles, factory-direct allocations, and bespoke concierge acquisition.',
  quickLinksHeader = 'Navigation',
  navItems = DEFAULT_NAV_ITEMS,
  vehicles = DEFAULT_FEATURED_VEHICLES,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<StoryTab>('atelier');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> = builderCtx?.templateData?.buttonOverrides || {};
  const isEditMode = builderCtx?.mode === 'EDITING';

  const navItemsList = navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS;

  // Limit featured vehicles to exactly 6 items as specified in design rules
  const displayVehicles = (selectedCategory === 'All'
    ? vehicles
    : vehicles.filter((v) => v.category === selectedCategory)
  ).slice(0, 6);

  const activeChapter = STORY_CHAPTERS[activeTab];

  return (
    <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-sans selection:bg-theme-primary/20 overflow-x-hidden antialiased">
      
      {/* ─── 1. Minimalist Navigation Header ─── */}
      <header className="w-full border-b border-theme-border/40 sticky top-0 z-50 bg-theme-surface/90 backdrop-blur-md text-theme-foreground">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between gap-6">
          {/* Dealership Logo & Handle */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-theme-primary text-theme-background flex items-center justify-center font-bold shadow-sm">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <EditableElement
                as="h1"
                id="auto-dealer-name"
                field="dealershipName"
                value={dealershipName}
                type="heading"
                className="text-sm font-extrabold tracking-widest text-theme-foreground uppercase"
              />
              <div className="flex items-center gap-1 text-theme-muted text-[11px] font-medium">
                <MapPin className="w-3 h-3 text-theme-primary" />
                <EditableElement
                  as="span"
                  id="auto-location"
                  field="location"
                  value={location}
                  type="text"
                  className="inline"
                />
              </div>
            </div>
          </a>

          {/* Smooth Scroll Navigation Links */}
          <nav className="hidden md:flex items-center gap-9 text-xs font-medium tracking-wider">
            {navItemsList.map((item, idx) => (
              <a
                key={idx}
                href={isEditMode ? undefined : item.href}
                onClick={(e: React.MouseEvent) => {
                  if (isEditMode) e.preventDefault();
                }}
                className={`uppercase tracking-wider transition-colors duration-200 ${
                  isEditMode
                    ? 'cursor-pointer text-theme-foreground hover:text-theme-primary border-b border-transparent hover:border-theme-primary'
                    : 'text-theme-muted hover:text-theme-foreground'
                }`}
              >
                <EditableElement
                  as="span"
                  id={`auto-nav-item-${idx}`}
                  field={`navItem${idx}`}
                  value={item.label}
                  type="text"
                />
              </a>
            ))}
          </nav>

          {/* Primary Action CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <EditableButton
              buttonKey="auto-header-cta"
              defaultText="Book Test Drive"
              defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent('Hi, I would like to book a private test drive appointment.')}`}
              defaultOpenInNewTab={true}
              className="px-5 py-2.5 rounded-full bg-theme-primary text-theme-background text-xs font-bold tracking-wide hover:bg-theme-primary-hover transition shadow-sm cursor-pointer"
            >
              <span>{activeButtonOverrides['auto-header-cta']?.text || 'Book Test Drive'}</span>
            </EditableButton>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-theme-foreground hover:text-theme-primary transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-theme-surface border-t border-theme-border/40 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-2">
                {navItemsList.map((item, idx) => (
                  <a
                    key={idx}
                    href={isEditMode ? undefined : item.href}
                    onClick={(e: React.MouseEvent) => {
                      if (isEditMode) e.preventDefault();
                      else setIsMobileMenuOpen(false);
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-theme-foreground py-2.5 border-b border-theme-border/30 hover:text-theme-primary transition-colors cursor-pointer"
                  >
                    <EditableElement
                      as="span"
                      id={`auto-nav-item-mobile-${idx}`}
                      field={`navItem${idx}`}
                      value={item.label}
                      type="text"
                    />
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 2. Cinematic Editorial Hero Showcase ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 sm:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-4xl">
          <EditableElement
            as="h2"
            id="auto-hero-headline"
            field="heroTagline"
            value={heroTagline}
            type="heading"
            className="text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-theme-foreground leading-[1.03]"
          />
          <EditableElement
            as="p"
            id="auto-hero-subheadline"
            field="heroSubheadline"
            value={heroSubheadline}
            type="heading"
            className="text-theme-muted text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight mt-1 leading-[1.08]"
          />

          <EditableElement
            as="p"
            id="auto-hero-description"
            field="heroDescription"
            value={heroDescription}
            type="text"
            className="text-theme-muted text-base sm:text-lg font-light leading-relaxed max-w-2xl mt-8"
          />
        </div>

        {/* Widescreen 21:9 Hero Stage Image */}
        <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mt-12 border border-theme-border/40 relative group bg-theme-surface">
          <EditableImage
            imageKey="auto-hero-stage-img"
            defaultSrc="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop"
            defaultAlt="Autobahn Flagship Supercar Stage"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000 ease-out"
            containerClassName="w-full h-full absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-background via-transparent to-transparent opacity-70 pointer-events-none" />

          {/* Minimal Corner Caption */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-xs text-theme-muted font-mono tracking-wider z-10 pointer-events-none">
            <div className="pointer-events-auto">
              <EditableElement
                as="span"
                id="auto-hero-stage-badge"
                field="heroStageBadge"
                value={heroStageBadge}
                type="text"
                className="inline font-mono tracking-wider text-theme-muted"
              />
            </div>
            <div className="pointer-events-auto">
              <EditableElement
                as="span"
                id="auto-hero-stage-location"
                field="heroStageLocation"
                value={heroStageLocation}
                type="text"
                className="inline font-mono tracking-wider text-theme-muted"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Flagship "Our Story" Editorial Experience (Apple / Porsche / Linear Aesthetics) ─── */}
      <section id="story" className="w-full relative py-28 sm:py-36 bg-theme-background border-t border-theme-border/40 overflow-hidden text-theme-foreground">
        
        {/* Subtle Ambient Background Watermark */}
        <EditableElement
          as="div"
          id="auto-story-watermark"
          field="storyWatermark"
          value={storyWatermark}
          type="text"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-[12vw] font-mono font-extrabold tracking-[0.25em] whitespace-nowrap text-theme-foreground"
        />

        {/* Ambient Architectural Hairline Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--theme-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--theme-border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-30" />

        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          
          {/* Top Metadata Header & Location Indicator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-12 border-b border-theme-border/40 text-xs font-mono text-theme-muted tracking-widest uppercase">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-theme-accent animate-pulse" />
              <EditableElement
                as="span"
                id="auto-story-meta-tag"
                field="metaTag"
                value={activeChapter.tag}
                type="text"
                className="inline text-theme-muted"
              />
            </div>
            <EditableElement
              as="span"
              id="auto-story-meta-location"
              field="metaLocation"
              value={activeChapter.location}
              type="text"
              className="inline text-theme-muted"
            />
          </div>

          {/* Editorial Title & Lead Narrative */}
          <div className="max-w-4xl mb-14">
            <EditableElement
              as="span"
              id="auto-story-category-tag"
              field="storyCategoryTag"
              value={storyCategoryTag}
              type="text"
              className="text-theme-muted font-mono text-xs tracking-[0.2em] uppercase block mb-4"
            />
            <EditableElement
              as="h2"
              id="auto-story-main-heading"
              field="title"
              value="Crafted Beyond Velocity."
              type="heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-theme-foreground leading-[1.05]"
            />
            <EditableElement
              as="p"
              id="auto-story-lead-para"
              field="subtitle"
              value="We do not merely acquire automobiles. We curate rare engineering artifacts and steward lifelong relationships for discerning collectors worldwide."
              type="text"
              className="text-theme-muted text-lg sm:text-xl font-light leading-relaxed mt-6 max-w-3xl"
            />
          </div>

          {/* Interactive Chapter Selector (Atelier / Provenance / Stewardship) */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-16 scrollbar-none border-b border-theme-border/40">
            {(['atelier', 'heritage', 'stewardship'] as StoryTab[]).map((tabKey) => {
              const ch = STORY_CHAPTERS[tabKey];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`px-5 py-3 rounded-full text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                    isActive
                      ? 'bg-theme-primary text-theme-background font-semibold shadow-lg scale-[1.02]'
                      : 'bg-theme-surface text-theme-muted hover:text-theme-foreground hover:bg-theme-surface-hover border border-theme-border/40'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-theme-background' : 'bg-theme-muted/40'}`} />
                  <EditableElement
                    as="span"
                    id={`auto-story-tab-${tabKey}`}
                    field={`storyTab_${tabKey}`}
                    value={ch.tabLabel}
                    type="text"
                    className="inline"
                  />
                </button>
              );
            })}
          </div>

          {/* Asymmetrical 12-Column Editorial Magazine Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
            
            {/* Left 7 Columns: Widescreen Hero Stage with Overlapping Translucent Panel */}
            <div className="lg:col-span-7 flex flex-col gap-8 relative group">
              
              {/* Primary Large-Format Photography */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-theme-border/40 bg-theme-surface shadow-2xl">
                <EditableImage
                  imageKey={`auto-story-${activeChapter.id}-hero`}
                  defaultSrc={activeChapter.heroImage}
                  defaultAlt={activeChapter.heroAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  containerClassName="w-full h-full absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-background via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Minimalist Image Corner Tag */}
                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-theme-surface/80 backdrop-blur-md border border-theme-border/40 text-[10px] font-mono text-theme-foreground tracking-widest uppercase">
                  {activeChapter.tag}
                </div>
              </div>

              {/* Floating Editorial Quote Card (Overlapping Visual Layer) */}
              <div className="relative lg:-mt-24 lg:ml-8 z-20 bg-theme-surface/95 backdrop-blur-xl border border-theme-border/40 p-7 sm:p-9 rounded-2xl shadow-2xl transition-all duration-500 text-theme-foreground">
                <div className="flex items-center gap-2 text-theme-accent font-mono text-[11px] tracking-widest uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <EditableElement
                    as="span"
                    id="auto-story-quote-directive"
                    field="quoteDirective"
                    value={quoteDirective}
                    type="text"
                    className="inline text-theme-accent"
                  />
                </div>
                <blockquote className="text-base sm:text-lg font-light text-theme-foreground leading-relaxed italic mb-4">
                  <EditableElement
                    as="span"
                    id={`auto-story-${activeChapter.id}-quote`}
                    field="quote"
                    value={activeChapter.quote}
                    type="text"
                    className="inline text-theme-foreground"
                  />
                </blockquote>
                <div className="text-xs font-mono text-theme-muted tracking-wider">
                  <EditableElement
                    as="span"
                    id={`auto-story-${activeChapter.id}-author`}
                    field="author"
                    value={activeChapter.author}
                    type="text"
                    className="inline text-theme-muted"
                  />
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Refined Editorial Copy & Craftsmanship Micro-Details */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
              
              <div>
                <EditableElement
                  as="span"
                  id="auto-story-spec-tag"
                  field="specTag"
                  value={specTag}
                  type="text"
                  className="text-theme-muted font-mono text-xs tracking-widest block uppercase mb-3"
                />
                
                <EditableElement
                  as="h3"
                  id={`auto-story-${activeChapter.id}-heading`}
                  field="chapterHeading"
                  value={activeChapter.heading}
                  type="heading"
                  className="text-2xl sm:text-3xl font-normal text-theme-foreground tracking-tight leading-snug mb-6"
                />

                <div className="space-y-5 text-theme-muted text-sm font-light leading-relaxed mb-10">
                  <EditableElement
                    as="p"
                    id={`auto-story-${activeChapter.id}-p1`}
                    field="paragraph1"
                    value={activeChapter.p1}
                    type="text"
                    className="block text-theme-muted"
                  />
                  <EditableElement
                    as="p"
                    id={`auto-story-${activeChapter.id}-p2`}
                    field="paragraph2"
                    value={activeChapter.p2}
                    type="text"
                    className="block text-theme-muted"
                  />
                </div>

                {/* 3 Refined Micro-Detail Indicators with Hairline Dividers */}
                <div className="border-t border-theme-border/40 pt-6 space-y-6 mb-10">
                  {activeChapter.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-4 group/item">
                      <div className="w-7 h-7 rounded-lg bg-theme-surface border border-theme-border/40 flex items-center justify-center text-theme-foreground shrink-0 group-hover/item:border-theme-primary transition-all">
                        <CheckCircle2 className="w-3.5 h-3.5 text-theme-accent" />
                      </div>
                      <div>
                        <EditableElement
                          as="h4"
                          id={`auto-story-${activeChapter.id}-detail-label-${idx}`}
                          field={`detailLabel_${idx}`}
                          value={detail.label}
                          type="heading"
                          className="text-sm font-medium text-theme-foreground tracking-tight mb-0.5"
                        />
                        <EditableElement
                          as="p"
                          id={`auto-story-${activeChapter.id}-detail-desc-${idx}`}
                          field={`detailDesc_${idx}`}
                          value={detail.desc}
                          type="text"
                          className="text-xs text-theme-muted font-light leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Secondary Offset Dual-Image Gallery */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-theme-border/40">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-theme-border/40 bg-theme-surface group/sub">
                  <EditableImage
                    imageKey={`auto-story-${activeChapter.id}-sec1`}
                    defaultSrc={activeChapter.secondaryImg1}
                    defaultAlt="Cockpit & Leather Engineering Detail"
                    className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                  />
                </div>
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-theme-border/40 bg-theme-surface group/sub">
                  <EditableImage
                    imageKey={`auto-story-${activeChapter.id}-sec2`}
                    defaultSrc={activeChapter.secondaryImg2}
                    defaultAlt="Telemetry & Performance Detail"
                    className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                  />
                </div>
              </div>

            </div>

          </div>

          {/* Restrained Trust Ribbon (4 Horizontal Columns with Hairline Separation) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-theme-border/40 mb-16">
            <div className="p-6 rounded-2xl bg-theme-surface/50 border border-theme-border/40 hover:border-theme-primary/40 transition-all">
              <EditableElement
                as="span"
                id="auto-story-trust-1-tag"
                field="trust1Tag"
                value={trust1Tag}
                type="text"
                className="text-theme-muted font-mono text-xs tracking-widest block mb-3"
              />
              <EditableElement
                as="h4"
                id="auto-story-trust-1-title"
                field="trust1Title"
                value="Uncompromised Origin"
                type="heading"
                className="text-base font-medium text-theme-foreground tracking-tight mb-2"
              />
              <EditableElement
                as="p"
                id="auto-story-trust-1-desc"
                field="trust1Desc"
                value="Every vehicle carries 100% verified factory documentation, service history, and chassis telemetry."
                type="text"
                className="text-xs text-theme-muted font-light leading-relaxed"
              />
            </div>

            <div className="p-6 rounded-2xl bg-theme-surface/50 border border-theme-border/40 hover:border-theme-primary/40 transition-all">
              <EditableElement
                as="span"
                id="auto-story-trust-2-tag"
                field="trust2Tag"
                value={trust2Tag}
                type="text"
                className="text-theme-muted font-mono text-xs tracking-widest block mb-3"
              />
              <EditableElement
                as="h4"
                id="auto-story-trust-2-title"
                field="trust2Title"
                value="Bespoke OEM Build Slots"
                type="heading"
                className="text-base font-medium text-theme-foreground tracking-tight mb-2"
              />
              <EditableElement
                as="p"
                id="auto-story-trust-2-desc"
                field="trust2Desc"
                value="Direct manufacturing channels for factory-custom supercar allocations across Europe."
                type="text"
                className="text-xs text-theme-muted font-light leading-relaxed"
              />
            </div>

            <div className="p-6 rounded-2xl bg-theme-surface/50 border border-theme-border/40 hover:border-theme-primary/40 transition-all">
              <EditableElement
                as="span"
                id="auto-story-trust-3-tag"
                field="trust3Tag"
                value={trust3Tag}
                type="text"
                className="text-theme-muted font-mono text-xs tracking-widest block mb-3"
              />
              <EditableElement
                as="h4"
                id="auto-story-trust-3-title"
                field="trust3Title"
                value="White-Glove Transport"
                type="heading"
                className="text-base font-medium text-theme-foreground tracking-tight mb-2"
              />
              <EditableElement
                as="p"
                id="auto-story-trust-3-desc"
                field="trust3Desc"
                value="Climate-controlled enclosed logistics delivered straight to your private estate or track facility."
                type="text"
                className="text-xs text-theme-muted font-light leading-relaxed"
              />
            </div>

            <div className="p-6 rounded-2xl bg-theme-surface/50 border border-theme-border/40 hover:border-theme-primary/40 transition-all">
              <EditableElement
                as="span"
                id="auto-story-trust-4-tag"
                field="trust4Tag"
                value={trust4Tag}
                type="text"
                className="text-theme-muted font-mono text-xs tracking-widest block mb-3"
              />
              <EditableElement
                as="h4"
                id="auto-story-trust-4-title"
                field="trust4Title"
                value="Private Off-Market Access"
                type="heading"
                className="text-base font-medium text-theme-foreground tracking-tight mb-2"
              />
              <EditableElement
                as="p"
                id="auto-story-trust-4-desc"
                field="trust4Desc"
                value="Exclusive access to unlisted collector inventory and priority trade-in valuation."
                type="text"
                className="text-xs text-theme-muted font-light leading-relaxed"
              />
            </div>
          </div>

          {/* Section Call-to-Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-3xl bg-theme-surface border border-theme-border/40">
            <div className="max-w-xl">
              <EditableElement
                as="h4"
                id="auto-story-cta-box-title"
                field="ctaBoxTitle"
                value={ctaBoxTitle}
                type="heading"
                className="text-xl sm:text-2xl font-normal text-theme-foreground tracking-tight mb-2"
              />
              <EditableElement
                as="p"
                id="auto-story-cta-box-sub"
                field="ctaBoxSub"
                value={ctaBoxSub}
                type="text"
                className="text-xs sm:text-sm text-theme-muted font-light leading-relaxed"
              />
            </div>
            
            <EditableButton
              buttonKey="auto-story-cta"
              defaultText="Schedule Private Atelier Visit"
              defaultHref="#concierge"
              className="px-7 py-4 rounded-full bg-theme-primary text-theme-background text-xs font-bold tracking-wide hover:bg-theme-primary-hover transition-all shadow-xl shrink-0 flex items-center gap-3 group cursor-pointer"
            >
              <span>{activeButtonOverrides['auto-story-cta']?.text || 'Schedule Private Atelier Visit'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </EditableButton>
          </div>

        </div>
      </section>

      {/* ─── 4. Curated Fleet Showcase (Exactly 6 Featured Vehicles) ─── */}
      <section id="inventory" className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-theme-border/40">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <EditableElement
              as="span"
              id="auto-inventory-subtitle"
              field="inventorySubtitle"
              value={inventorySubtitle}
              type="text"
              className="text-theme-muted font-mono text-xs tracking-widest uppercase block mb-3"
            />
            <EditableElement
              as="h3"
              id="auto-inventory-title"
              field="inventoryTitle"
              value={inventoryTitle}
              type="heading"
              className="text-3xl sm:text-5xl font-normal text-theme-foreground tracking-tight"
            />
          </div>

          {/* Restrained Category Tabs */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Performance', 'Electric', 'Luxury SUV'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-theme-primary text-theme-background font-semibold'
                    : 'bg-theme-surface text-theme-muted hover:text-theme-foreground border border-theme-border/40'
                }`}
              >
                <EditableElement
                  as="span"
                  id={`auto-inventory-cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  field={`category_${cat}`}
                  value={cat}
                  type="text"
                  className="inline"
                />
              </button>
            ))}
          </div>
        </div>

        {/* 6 Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVehicles.map((vehicle, idx) => {
            const blockId = `auto-b${idx + 2}`;
            return (
              <div
                key={vehicle.id}
                className="bg-theme-surface border border-theme-border/40 rounded-2xl overflow-hidden flex flex-col group hover:border-theme-primary/40 transition-all duration-500"
              >
                {/* Vehicle Image Stage */}
                <div className="relative aspect-[16/10] overflow-hidden bg-theme-background">
                  <EditableImage
                    imageKey={`${blockId}-image`}
                    defaultSrc={vehicle.image}
                    defaultAlt={vehicle.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                    containerClassName="w-full h-full"
                  />
                </div>

                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <EditableElement
                        as="h4"
                        id={blockId}
                        field="title"
                        value={vehicle.title}
                        type="heading"
                        className="text-lg font-medium text-theme-foreground tracking-tight line-clamp-1"
                      />
                      <EditableElement
                        as="span"
                        id={blockId}
                        field="price"
                        value={vehicle.price}
                        type="text"
                        className="text-base font-normal text-theme-primary whitespace-nowrap"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
                      <EditableElement
                        as="span"
                        id={`${blockId}-year`}
                        field="year"
                        value={vehicle.year}
                        type="text"
                        className="inline"
                      />
                      <span className="text-theme-muted/50">•</span>
                      <EditableElement
                        as="span"
                        id={`${blockId}-mileage`}
                        field="mileage"
                        value={vehicle.mileage}
                        type="text"
                        className="inline"
                      />
                      <span className="text-theme-muted/50">•</span>
                      <EditableElement
                        as="span"
                        id={`${blockId}-transmission`}
                        field="transmission"
                        value={vehicle.transmission}
                        type="text"
                        className="inline"
                      />
                      <span className="text-theme-muted/50">•</span>
                      <EditableElement
                        as="span"
                        id={`${blockId}-fuel`}
                        field="fuel"
                        value={vehicle.fuel}
                        type="text"
                        className="inline"
                      />
                    </div>
                  </div>

                  <EditableButton
                    buttonKey={`${blockId}-inquiry`}
                    defaultText="Inquire on Vehicle"
                    defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi, I am interested in acquiring the ${vehicle.title} (${vehicle.year}) listed for ${vehicle.price}.`)}`}
                    defaultOpenInNewTab={true}
                    className="w-full py-3 rounded-xl bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-medium tracking-wide hover:bg-theme-primary hover:text-theme-background transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>
                      {activeButtonOverrides[`${blockId}-inquiry`]?.text || 'Inquire on Vehicle'}
                    </span>
                  </EditableButton>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 5. Atmospheric Full-Width Brand Spotlight ─── */}
      <section id="spotlight" className="w-full relative py-32 overflow-hidden border-t border-theme-border/40">
        <div className="absolute inset-0 z-0">
          <EditableImage
            imageKey="auto-spotlight-bg"
            defaultSrc="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1600&auto=format&fit=crop"
            defaultAlt="Autobahn Performance Backdrop"
            className="w-full h-full object-cover opacity-25"
            containerClassName="w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-theme-background via-transparent to-theme-background pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10 text-center">
          <EditableElement
            as="span"
            id="auto-spotlight-tag"
            field="spotlightTag"
            value={spotlightTag}
            type="text"
            className="text-theme-muted font-mono text-xs tracking-widest uppercase block mb-6"
          />
          <blockquote className="text-2xl sm:text-4xl lg:text-5xl font-light text-theme-foreground leading-relaxed tracking-tight">
            &quot;<EditableElement
              as="span"
              id="auto-spotlight-quote"
              field="spotlightQuote"
              value={spotlightQuote}
              type="text"
              className="inline text-theme-foreground"
            />&quot;
          </blockquote>
        </div>
      </section>

      {/* ─── 6. Interactive Lead Concierge Section ─── */}
      <section id="concierge" className="w-full max-w-7xl mx-auto px-6 sm:px-8 py-24 border-t border-theme-border/40">
        <div className="bg-theme-surface border border-theme-border/40 rounded-3xl p-8 sm:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="max-w-xl">
            <EditableElement
              as="span"
              id="auto-concierge-tag"
              field="conciergeTag"
              value={conciergeTag}
              type="text"
              className="text-theme-muted font-mono text-xs tracking-widest uppercase block mb-3"
            />
            <EditableElement
              as="h3"
              id="auto-concierge-title"
              field="conciergeTitle"
              value={conciergeTitle}
              type="heading"
              className="text-3xl sm:text-4xl font-normal text-theme-foreground tracking-tight mb-4"
            />
            <EditableElement
              as="p"
              id="auto-concierge-sub"
              field="conciergeSub"
              value={conciergeSub}
              type="text"
              className="text-theme-muted text-sm font-light leading-relaxed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <EditableButton
              buttonKey="auto-concierge-call"
              defaultText="Call Concierge"
              defaultHref={`tel:${phone}`}
              className="px-6 py-3.5 rounded-full bg-theme-surface border border-theme-border/60 text-theme-foreground text-xs font-semibold tracking-wide hover:bg-theme-surface-hover transition text-center cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 inline mr-2" />
              <span>{activeButtonOverrides['auto-concierge-call']?.text || 'Call Concierge'}</span>
            </EditableButton>

            <EditableButton
              buttonKey="auto-concierge-whatsapp"
              defaultText="WhatsApp Reservation"
              defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent('Hi, I am reaching out from your website to discuss vehicle acquisition.')}`}
              defaultOpenInNewTab={true}
              className="px-6 py-3.5 rounded-full bg-theme-accent text-white text-xs font-bold tracking-wide hover:bg-theme-accent-hover transition text-center shadow-md cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 inline mr-2" />
              <span>{activeButtonOverrides['auto-concierge-whatsapp']?.text || 'WhatsApp Reservation'}</span>
            </EditableButton>
          </div>
        </div>
      </section>

      {/* ─── 7. Premium Valkyrie-Style Luxury Footer with Portiva Card ─── */}
      <footer className="w-full border-t border-theme-border/40 mt-16 bg-theme-surface/60">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-stretch">
            
            {/* Brand Column (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-theme-primary text-theme-background flex items-center justify-center font-bold shadow-sm">
                    <Car className="w-4 h-4" />
                  </div>
                  <EditableElement
                    as="span"
                    id="auto-footer-brand"
                    field="dealershipName"
                    value={dealershipName}
                    type="heading"
                    className="text-lg font-extrabold tracking-widest text-theme-foreground uppercase"
                  />
                </div>
                <EditableElement
                  as="p"
                  id="auto-footer-description"
                  field="footerDescription"
                  value={footerDescription}
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-theme-muted">
                <MapPin className="w-3.5 h-3.5 text-theme-primary shrink-0" />
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

            {/* Navigation / Quick Links Column (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <EditableElement
                as="h4"
                id="auto-footer-quicklinks-header"
                field="quickLinksHeader"
                value={quickLinksHeader}
                type="heading"
                className="text-xs font-mono font-bold text-theme-foreground uppercase tracking-wider mb-2 block"
              />
              <div className="flex flex-col gap-3">
                {navItemsList.map((item, idx) => (
                  <a
                    key={idx}
                    href={isEditMode ? undefined : item.href}
                    onClick={(e) => {
                      if (isEditMode) e.preventDefault();
                    }}
                    className="text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors block"
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

            {/* Big "Made with portiva.site" Section (col-span-5) */}
            <div className="lg:col-span-5 bg-theme-surface border border-theme-border/70 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden group hover:border-theme-primary/40 transition-all duration-300 min-h-[220px]">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-theme-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-mono font-bold tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Made with portiva.site</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-foreground tracking-tight mb-2 leading-snug block">
                  Created in 60 seconds — Free forever
                </h3>

                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed block">
                  Build, customize, and publish your dream automotive showcase instantly with AI. Fast, responsive, and completely free forever.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-theme-border/50 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-theme-foreground/80">
                  Build your site now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-theme-primary hover:bg-theme-primary/90 text-theme-background text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Create Yours Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar (Copyright & Phone) */}
          <div className="border-t border-theme-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
            <EditableElement
              as="p"
              id="auto-footer-disclaimer"
              field="disclaimer"
              value={`© 2026 ${dealershipName}. All rights reserved.`}
              type="text"
              className="text-xs text-theme-muted"
            />

            <div className="flex items-center gap-6 font-mono text-[11px] tracking-wider">
              <a href={`tel:${phone}`} className="hover:text-theme-foreground transition text-theme-foreground">
                {phone}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
