'use client';

import React, { useState } from 'react';
import {
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Building2,
  Sparkles,
  Compass,
  Maximize2,
  Bed,
  Bath,
  CheckCircle2,
  Calendar,
  X,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

export interface PropertyItem {
  id: string;
  number: string;
  title: string;
  location: string;
  type: string;
  price: string;
  beds: string;
  baths: string;
  area: string;
  shortDesc: string;
  mainImage: string;
  gallery?: string[];
  featured?: boolean;
}

export interface EstatePrimeProps {
  propertyName?: string;
  brandName?: string;
  agentName?: string;
  agentTitle?: string;
  phone?: string;
  email?: string;
  locationMarkets?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  properties?: PropertyItem[];
  navbarBg?: string;
  hoverStyle?: string;
}

const DEFAULT_PROPERTIES: PropertyItem[] = [
  {
    id: 'p1',
    number: '01',
    title: 'The Glass Pavilion Estate',
    location: 'Aspen, Colorado',
    type: 'Architectural Residence',
    price: '$6,850,000',
    beds: '5 Beds',
    baths: '6 Baths',
    area: '7,200 SQ FT',
    shortDesc: 'A light-filled floor-to-ceiling glass sanctuary nestled in alpine landscape, featuring cantilevered stone terraces and a private wellness wing.',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    featured: true,
  },
  {
    id: 'p2',
    number: '02',
    title: 'Amalfi Coastal Sanctuary',
    location: 'Amalfi Coast, Italy',
    type: 'Coastal Villa',
    price: '€4,200,000',
    beds: '4 Beds',
    baths: '4 Baths',
    area: '4,800 SQ FT',
    shortDesc: 'Terraced sea-view villa with natural stone walls, private Mediterranean garden paths, and private coastal water access.',
    mainImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p3',
    number: '03',
    title: 'The Crest Penthouse',
    location: 'Tribeca, New York',
    type: 'Sky Residence',
    price: '$12,500,000',
    beds: '4 Beds',
    baths: '5 Baths',
    area: '5,600 SQ FT',
    shortDesc: 'Full-floor residence with warm teak millwork, 360° skyline vistas, and a private 1,200 sq ft landscaped sky terrace.',
    mainImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop',
    ],
  },
  {
    id: 'p4',
    number: '04',
    title: 'Kyoto Courtyard Compound',
    location: 'Kyoto, Japan',
    type: 'Zen Residence',
    price: '¥850,000,000',
    beds: '3 Beds',
    baths: '4 Baths',
    area: '3,900 SQ FT',
    shortDesc: 'Warm timber and tactile plaster compound built around an inner cedar courtyard garden and serene tea room.',
    mainImage: 'https://images.unsplash.com/photo-1600573472591-ee6b563aaec9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'p5',
    number: '05',
    title: 'Palm Riviera Estate',
    location: 'Palm Jumeirah, Dubai',
    type: 'Waterfront Home',
    price: 'AED 28,500,000',
    beds: '6 Beds',
    baths: '7 Baths',
    area: '9,500 SQ FT',
    shortDesc: 'Spacious beachfront estate with sunlit living spaces, private jetty, infinity reflection pool, and sunset deck.',
    mainImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop',
  },
];

const TESTIMONIALS = [
  {
    quote: "Julian's architectural insight and warm, discreet approach made finding our home an absolute joy. He helped us discover a Tribeca penthouse that truly feels like a sanctuary.",
    client: 'Harrison & Clara Sterling',
    location: 'Tribeca Residence Acquired',
  },
  {
    quote: 'Extremely knowledgeable regarding international properties. The entire transaction along the Amalfi coast was seamless, calm, and executed with utmost trust.',
    client: 'Dr. Aris Thorne',
    location: 'Amalfi Coastal Estate Acquired',
  },
  {
    quote: 'The level of care, spatial understanding, and personal guidance provided was unmatched. A true trusted property advisor for family homes.',
    client: 'Elena Rostova',
    location: 'Kyoto Compound Acquired',
  },
];

export const EstatePrime: React.FC<EstatePrimeProps> = ({
  propertyName,
  brandName: brandNameProp,
  agentName = 'Julian Vance',
  agentTitle = 'Principal Property Advisor',
  phone = '+1 (555) 382-9100',
  email = 'advisory@vanceestates.com',
  locationMarkets = 'New York · Aspen · Amalfi · Kyoto · Dubai',
  heroHeadline = 'Discover spaces worth coming home to.',
  heroSubtitle = 'Independent property advisory representing light-filled architectural residences, coastal sanctuaries, and private family compounds worldwide.',
  properties = DEFAULT_PROPERTIES,
}) => {
  const brandName = propertyName || brandNameProp || 'Vance Private Estates';
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> = builderCtx?.templateData?.buttonOverrides || {};

  // Interactive States
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number>(0);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [activeModalProperty, setActiveModalProperty] = useState<PropertyItem | null>(null);

  const featuredStoryProperty = properties.find((p) => p.id === 'p3') || properties[2] || properties[0];
  const galleryImages = featuredStoryProperty.gallery || [
    featuredStoryProperty.mainImage,
    'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1200&auto=format&fit=crop',
  ];

  return (
    <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-sans selection:bg-theme-primary/20 selection:text-theme-primary overflow-x-hidden transition-colors duration-300">
      
      {/* ─── NAVIGATION ─── */}
      <header className="sticky top-0 z-40 w-full bg-theme-background/90 backdrop-blur-md border-b border-theme-border/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          {/* Brand & Agent Name */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-theme-surface border border-theme-border/60 flex items-center justify-center font-serif text-xs font-semibold text-theme-foreground shadow-sm">
              <EditableElement
                as="span"
                id="estate-brand-initials"
                field="brandInitials"
                value="JV"
                type="text"
              />
            </div>
            <div className="flex flex-col">
              <EditableElement
                as="span"
                id="estate-brand-name"
                field="brandName"
                value={brandName}
                type="heading"
                className="text-sm font-semibold tracking-wide font-serif text-theme-foreground"
              />
              <EditableElement
                as="span"
                id="estate-agent-title-sub"
                field="agentTitle"
                value={agentTitle}
                type="text"
                className="text-[11px] text-theme-muted tracking-wide"
              />
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide text-theme-muted">
            <a href="#properties" className="hover:text-theme-foreground transition-colors duration-200">
              <EditableElement
                as="span"
                id="estate-nav-link-1"
                field="navLink1"
                value="Residences"
                type="text"
              />
            </a>
            <a href="#editorial-story" className="hover:text-theme-foreground transition-colors duration-200">
              <EditableElement
                as="span"
                id="estate-nav-link-2"
                field="navLink2"
                value="Editorial Feature"
                type="text"
              />
            </a>
            <a href="#approach" className="hover:text-theme-foreground transition-colors duration-200">
              <EditableElement
                as="span"
                id="estate-nav-link-3"
                field="navLink3"
                value="The Advisor"
                type="text"
              />
            </a>
            <a href="#testimonials" className="hover:text-theme-foreground transition-colors duration-200">
              <EditableElement
                as="span"
                id="estate-nav-link-4"
                field="navLink4"
                value="Client Stories"
                type="text"
              />
            </a>
          </nav>

          {/* Right Header Action */}
          <div>
            <EditableButton
              buttonKey="estate-btn-nav-inquire"
              defaultText="Inquire"
              defaultHref="#inquire"
              className="px-6 py-2.5 text-xs font-medium border border-theme-border/60 hover:border-theme-foreground/50 text-theme-foreground bg-theme-surface transition-all duration-300 rounded-full shadow-sm"
            >
              <span>{activeButtonOverrides['estate-btn-nav-inquire']?.text || 'Inquire'}</span>
            </EditableButton>
          </div>
        </div>
      </header>

      {/* ─── SECTION 01: HERO / AGENT INTRODUCTION ─── */}
      <section className="relative w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Hero Left Content Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Micro Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-theme-surface border border-theme-border/50 rounded-full mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-theme-primary animate-pulse" />
                <EditableElement
                  as="span"
                  id="estate-hero-eyebrow"
                  field="heroEyebrow"
                  value="Curated Residence Portfolio"
                  type="text"
                  className="text-xs font-medium text-theme-muted tracking-wide"
                />
              </div>

              {/* Serif Warm Headline */}
              <EditableElement
                as="h1"
                id="estate-hero-headline"
                field="heroHeadline"
                value={heroHeadline}
                type="heading"
                className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-theme-foreground leading-[1.15] mb-6"
              />

              {/* Supporting Subtitle */}
              <EditableElement
                as="p"
                id="estate-hero-subtitle"
                field="heroSubtitle"
                value={heroSubtitle}
                type="text"
                className="text-sm md:text-base text-theme-muted leading-relaxed max-w-xl mb-10 font-normal"
              />
            </div>

            {/* CTAs & Metadata Footer */}
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <EditableButton
                  buttonKey="estate-btn-hero-explore"
                  defaultText="Explore Residences"
                  defaultHref="#properties"
                  className="px-8 py-4 bg-theme-foreground text-theme-background text-xs font-medium tracking-wide hover:opacity-90 transition-all duration-300 rounded-full shadow-md inline-flex items-center gap-3"
                >
                  <span>{activeButtonOverrides['estate-btn-hero-explore']?.text || 'Explore Residences'}</span>
                  <ArrowRight className="w-4 h-4" />
                </EditableButton>

                <EditableButton
                  buttonKey="estate-btn-hero-contact"
                  defaultText="Schedule Conversation"
                  defaultHref={`mailto:${email}?subject=${encodeURIComponent('Private Property Advisory Inquiry')}`}
                  className="px-8 py-4 bg-theme-surface border border-theme-border/60 text-theme-foreground text-xs font-medium tracking-wide hover:border-theme-foreground/50 transition-all duration-300 rounded-full shadow-sm"
                >
                  <span>{activeButtonOverrides['estate-btn-hero-contact']?.text || 'Schedule Conversation'}</span>
                </EditableButton>
              </div>

              {/* Hero Footer Meta */}
              <div className="pt-6 border-t border-theme-border/40 flex items-center justify-between text-xs text-theme-muted">
                <div>
                  <EditableElement
                    as="span"
                    id="estate-hero-agent-name"
                    field="agentName"
                    value={agentName}
                    type="text"
                    className="font-serif font-semibold text-theme-foreground block text-sm"
                  />
                  <EditableElement
                    as="span"
                    id="estate-hero-agent-title"
                    field="agentTitle"
                    value={agentTitle}
                    type="text"
                  />
                </div>
                <div className="text-right font-mono text-[11px]">
                  <EditableElement
                    as="span"
                    id="estate-hero-meta-label"
                    field="heroMetaLabel"
                    value="PORTFOLIO"
                    type="text"
                    className="block text-theme-foreground font-semibold"
                  />
                  <EditableElement
                    as="span"
                    id="estate-hero-meta-value"
                    field="heroMetaValue"
                    value="05 Curated Homes"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Column (Editable Image & Overlay Text) */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] w-full bg-theme-surface border border-theme-border/50 rounded-3xl overflow-hidden shadow-xl group">
              <EditableImage
                imageKey="estate-hero-image"
                defaultSrc={properties[0].mainImage}
                defaultAlt="Flagship Property Showcase"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                containerClassName="w-full h-full relative"
              />
              
              {/* Soft Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10" />

              {/* Text Box On Top of Hero Image (Fully Editable) */}
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-theme-surface/95 backdrop-blur-md border border-theme-border/40 rounded-2xl text-theme-foreground shadow-lg z-20">
                <div className="flex justify-between items-start mb-1.5">
                  <EditableElement
                    as="span"
                    id="estate-hero-card-badge"
                    field="heroCardBadge"
                    value={`Residence ${properties[0].number}`}
                    type="text"
                    className="text-[11px] font-mono tracking-wide text-theme-muted uppercase"
                  />
                  <EditableElement
                    as="span"
                    id="estate-hero-card-price"
                    field="heroCardPrice"
                    value={properties[0].price}
                    type="text"
                    className="text-sm font-semibold text-theme-primary font-mono"
                  />
                </div>
                <EditableElement
                  as="h3"
                  id="estate-hero-card-title"
                  field="heroCardTitle"
                  value={properties[0].title}
                  type="heading"
                  className="text-lg font-serif font-normal text-theme-foreground mb-1"
                />
                <div className="flex items-center gap-2 text-xs text-theme-muted">
                  <MapPin className="w-3.5 h-3.5 text-theme-primary" />
                  <EditableElement
                    as="span"
                    id="estate-hero-card-loc"
                    field="heroCardLoc"
                    value={properties[0].location}
                    type="text"
                  />
                  <span>·</span>
                  <EditableElement
                    as="span"
                    id="estate-hero-card-area"
                    field="heroCardArea"
                    value={properties[0].area}
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 02: FEATURED PROPERTIES (EXACTLY 5 FLAGSHIP COLLECTION) ─── */}
      <section id="properties" className="w-full border-t border-theme-border/30 bg-theme-surface/40 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-theme-border/30">
            <div>
              <EditableElement
                as="span"
                id="estate-section2-tag"
                field="collectionTag"
                value="01 / The Collection"
                type="text"
                className="text-xs font-mono tracking-wider text-theme-muted uppercase block mb-2"
              />
              <EditableElement
                as="h2"
                id="estate-section2-title"
                field="collectionTitle"
                value="Homes Worth Exploring"
                type="heading"
                className="text-3xl md:text-5xl font-serif font-normal text-theme-foreground tracking-tight"
              />
            </div>
            <EditableElement
              as="p"
              id="estate-section2-sub"
              field="collectionSubtitle"
              value="Hand-selected for architectural warmth, natural light, and location distinction."
              type="text"
              className="text-sm text-theme-muted max-w-md mt-4 md:mt-0 leading-relaxed font-normal"
            />
          </div>

          {/* Asymmetric Editorial Bento Grid for 5 Properties */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* PROPERTY 01 (Hero Showcase Card — 12 Columns) */}
            {properties[0] && (
              <div className="lg:col-span-12 group bg-theme-surface border border-theme-border/50 rounded-3xl hover:shadow-xl transition-all duration-500 overflow-hidden shadow-sm">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <EditableImage
                      imageKey="estate-prop-1-image"
                      defaultSrc={properties[0].mainImage}
                      defaultAlt={properties[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      containerClassName="w-full h-full relative"
                    />
                    {/* Badge Overlay on Image (Editable Text) */}
                    <div className="absolute top-4 left-4 bg-theme-surface/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-theme-border/40 text-[11px] font-mono text-theme-foreground shadow-sm z-10">
                      <EditableElement
                        as="span"
                        id="estate-prop-1-badge"
                        field="prop1Badge"
                        value={`Residence ${properties[0].number}`}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-5 p-8 md:p-12 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-xs text-theme-muted font-mono mb-4">
                        <EditableElement
                          as="span"
                          id="estate-prop-1-type"
                          field="prop1Type"
                          value={properties[0].type}
                          type="text"
                        />
                        <EditableElement
                          as="span"
                          id="estate-prop-1-price"
                          field="prop1Price"
                          value={properties[0].price}
                          type="text"
                          className="text-theme-primary font-bold text-base"
                        />
                      </div>

                      <EditableElement
                        as="h3"
                        id="estate-prop-1-title"
                        field="prop1Title"
                        value={properties[0].title}
                        type="heading"
                        className="text-2xl md:text-3xl font-serif font-normal text-theme-foreground tracking-tight mb-3"
                      />

                      <div className="flex items-center gap-2 text-xs text-theme-muted mb-6">
                        <MapPin className="w-3.5 h-3.5 text-theme-primary" />
                        <EditableElement
                          as="span"
                          id="estate-prop-1-loc"
                          field="prop1Loc"
                          value={properties[0].location}
                          type="text"
                        />
                      </div>

                      <EditableElement
                        as="p"
                        id="estate-prop-1-desc"
                        field="prop1Desc"
                        value={properties[0].shortDesc}
                        type="text"
                        className="text-sm text-theme-muted leading-relaxed mb-8"
                      />
                    </div>

                    <div>
                      <div className="grid grid-cols-3 gap-3 py-4 border-y border-theme-border/40 text-xs text-theme-muted font-mono mb-6">
                        <div>
                          <EditableElement
                            as="span"
                            id="estate-prop-1-beds-lbl"
                            field="prop1BedsLbl"
                            value="Beds"
                            type="text"
                            className="block text-[10px] uppercase text-theme-muted"
                          />
                          <EditableElement
                            as="span"
                            id="estate-prop-1-beds-val"
                            field="prop1BedsVal"
                            value={properties[0].beds}
                            type="text"
                            className="font-semibold text-theme-foreground"
                          />
                        </div>
                        <div>
                          <EditableElement
                            as="span"
                            id="estate-prop-1-baths-lbl"
                            field="prop1BathsLbl"
                            value="Baths"
                            type="text"
                            className="block text-[10px] uppercase text-theme-muted"
                          />
                          <EditableElement
                            as="span"
                            id="estate-prop-1-baths-val"
                            field="prop1BathsVal"
                            value={properties[0].baths}
                            type="text"
                            className="font-semibold text-theme-foreground"
                          />
                        </div>
                        <div>
                          <EditableElement
                            as="span"
                            id="estate-prop-1-area-lbl"
                            field="prop1AreaLbl"
                            value="Area"
                            type="text"
                            className="block text-[10px] uppercase text-theme-muted"
                          />
                          <EditableElement
                            as="span"
                            id="estate-prop-1-area-val"
                            field="prop1AreaVal"
                            value={properties[0].area}
                            type="text"
                            className="font-semibold text-theme-foreground"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setActiveModalProperty(properties[0])}
                        className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-theme-foreground group-hover:text-theme-primary transition-colors"
                      >
                        <EditableElement
                          as="span"
                          id="estate-prop-1-cta"
                          field="prop1Cta"
                          value="Explore Residence Details"
                          type="text"
                        />
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROPERTIES 02 & 03 (6 Columns Each) */}
            {properties.slice(1, 3).map((prop, idx) => (
              <div
                key={prop.id}
                className="lg:col-span-6 group bg-theme-surface border border-theme-border/50 rounded-3xl hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <EditableImage
                    imageKey={`estate-prop-${idx + 2}-image`}
                    defaultSrc={prop.mainImage}
                    defaultAlt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    containerClassName="w-full h-full relative"
                  />
                  {/* Badge & Price Overlays (Editable Text) */}
                  <div className="absolute top-4 left-4 bg-theme-surface/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-theme-border/40 text-[11px] font-mono text-theme-foreground shadow-sm z-10">
                    <EditableElement
                      as="span"
                      id={`estate-prop-${idx + 2}-badge`}
                      field={`prop${idx + 2}Badge`}
                      value={`Residence ${prop.number}`}
                      type="text"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-theme-surface/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-theme-border/40 text-xs font-mono font-bold text-theme-primary shadow-sm z-10">
                    <EditableElement
                      as="span"
                      id={`estate-prop-${idx + 2}-price`}
                      field={`prop${idx + 2}Price`}
                      value={prop.price}
                      type="text"
                    />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs text-theme-muted font-mono mb-2">
                      <EditableElement
                        as="span"
                        id={`estate-prop-${idx + 2}-type`}
                        field={`prop${idx + 2}Type`}
                        value={prop.type}
                        type="text"
                      />
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-theme-primary" />
                        <EditableElement
                          as="span"
                          id={`estate-prop-${idx + 2}-loc`}
                          field={`prop${idx + 2}Loc`}
                          value={prop.location}
                          type="text"
                        />
                      </span>
                    </div>

                    <EditableElement
                      as="h3"
                      id={`estate-prop-${idx + 2}-title`}
                      field={`prop${idx + 2}Title`}
                      value={prop.title}
                      type="heading"
                      className="text-xl font-serif font-normal text-theme-foreground tracking-tight mb-3"
                    />

                    <EditableElement
                      as="p"
                      id={`estate-prop-${idx + 2}-desc`}
                      field={`prop${idx + 2}Desc`}
                      value={prop.shortDesc}
                      type="text"
                      className="text-xs text-theme-muted leading-relaxed mb-6"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-theme-muted font-mono pt-4 border-t border-theme-border/40">
                      <span>
                        <EditableElement
                          as="span"
                          id={`estate-prop-${idx + 2}-specs`}
                          field={`prop${idx + 2}Specs`}
                          value={`${prop.beds} · ${prop.baths} · ${prop.area}`}
                          type="text"
                        />
                      </span>
                      <button
                        onClick={() => setActiveModalProperty(prop)}
                        className="inline-flex items-center gap-1.5 font-medium text-theme-foreground group-hover:text-theme-primary transition-colors text-[11px] tracking-wide"
                      >
                        <EditableElement
                          as="span"
                          id={`estate-prop-${idx + 2}-cta`}
                          field={`prop${idx + 2}Cta`}
                          value="Explore"
                          type="text"
                        />
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* PROPERTIES 04 & 05 (6 Columns Each) */}
            {properties.slice(3, 5).map((prop, idx) => (
              <div
                key={prop.id}
                className="lg:col-span-6 group bg-theme-surface border border-theme-border/50 rounded-3xl hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <EditableImage
                    imageKey={`estate-prop-${idx + 4}-image`}
                    defaultSrc={prop.mainImage}
                    defaultAlt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    containerClassName="w-full h-full relative"
                  />
                  <div className="absolute top-4 left-4 bg-theme-surface/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-theme-border/40 text-[11px] font-mono text-theme-foreground shadow-sm z-10">
                    <EditableElement
                      as="span"
                      id={`estate-prop-${idx + 4}-badge`}
                      field={`prop${idx + 4}Badge`}
                      value={`Residence ${prop.number}`}
                      type="text"
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-theme-surface/95 backdrop-blur-md px-3.5 py-1 rounded-full border border-theme-border/40 text-xs font-mono font-bold text-theme-primary shadow-sm z-10">
                    <EditableElement
                      as="span"
                      id={`estate-prop-${idx + 4}-price`}
                      field={`prop${idx + 4}Price`}
                      value={prop.price}
                      type="text"
                    />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs text-theme-muted font-mono mb-2">
                      <EditableElement
                        as="span"
                        id={`estate-prop-${idx + 4}-type`}
                        field={`prop${idx + 4}Type`}
                        value={prop.type}
                        type="text"
                      />
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-theme-primary" />
                        <EditableElement
                          as="span"
                          id={`estate-prop-${idx + 4}-loc`}
                          field={`prop${idx + 4}Loc`}
                          value={prop.location}
                          type="text"
                        />
                      </span>
                    </div>

                    <EditableElement
                      as="h3"
                      id={`estate-prop-${idx + 4}-title`}
                      field={`prop${idx + 4}Title`}
                      value={prop.title}
                      type="heading"
                      className="text-xl font-serif font-normal text-theme-foreground tracking-tight mb-3"
                    />

                    <EditableElement
                      as="p"
                      id={`estate-prop-${idx + 4}-desc`}
                      field={`prop${idx + 4}Desc`}
                      value={prop.shortDesc}
                      type="text"
                      className="text-xs text-theme-muted leading-relaxed mb-6"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-theme-muted font-mono pt-4 border-t border-theme-border/40">
                      <span>
                        <EditableElement
                          as="span"
                          id={`estate-prop-${idx + 4}-specs`}
                          field={`prop${idx + 4}Specs`}
                          value={`${prop.beds} · ${prop.baths} · ${prop.area}`}
                          type="text"
                        />
                      </span>
                      <button
                        onClick={() => setActiveModalProperty(prop)}
                        className="inline-flex items-center gap-1.5 font-medium text-theme-foreground group-hover:text-theme-primary transition-colors text-[11px] tracking-wide"
                      >
                        <EditableElement
                          as="span"
                          id={`estate-prop-${idx + 4}-cta`}
                          field={`prop${idx + 4}Cta`}
                          value="Explore"
                          type="text"
                        />
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ─── SECTION 03: FEATURED PROPERTY EDITORIAL STORY (DEEP DIVE) ─── */}
      <section id="editorial-story" className="w-full border-t border-theme-border/30 py-24 bg-theme-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="mb-12">
            <EditableElement
              as="span"
              id="estate-story-section-tag"
              field="storySectionTag"
              value="02 / Editorial Feature"
              type="text"
              className="text-xs font-mono tracking-wider text-theme-muted uppercase block mb-2"
            />
            <EditableElement
              as="h2"
              id="estate-story-heading"
              field="storyHeading"
              value="Architectural Focus: The Crest Penthouse"
              type="heading"
              className="text-3xl md:text-5xl font-serif font-normal text-theme-foreground tracking-tight"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Gallery Left Switcher (Using EditableImage for Full Editor Replacement Capability!) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/10] w-full bg-theme-surface border border-theme-border/50 rounded-3xl overflow-hidden shadow-lg">
                <EditableImage
                  imageKey="estate-story-main-image"
                  defaultSrc={galleryImages[selectedGalleryIndex] || galleryImages[0]}
                  defaultAlt="Penthouse Gallery Feature"
                  className="w-full h-full object-cover transition-all duration-500"
                  containerClassName="w-full h-full relative"
                />
                {/* Text Badge Overlay (Editable) */}
                <div className="absolute top-4 left-4 bg-theme-surface/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-theme-border/40 text-[10px] font-mono text-theme-foreground shadow-sm z-10">
                  <EditableElement
                    as="span"
                    id="estate-story-view-badge"
                    field="storyViewBadge"
                    value={`View ${selectedGalleryIndex + 1} of ${galleryImages.length}`}
                    type="text"
                  />
                </div>
              </div>

              {/* Gallery Thumbnails (Each uses EditableImage for instant editor replacement!) */}
              <div className="grid grid-cols-4 gap-3">
                {galleryImages.map((imgUrl, gIdx) => (
                  <button
                    key={gIdx}
                    onClick={() => setSelectedGalleryIndex(gIdx)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all duration-300 ${
                      selectedGalleryIndex === gIdx
                        ? 'border-theme-foreground ring-2 ring-theme-foreground/30 opacity-100'
                        : 'border-theme-border/40 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <EditableImage
                      imageKey={`estate-story-thumb-${gIdx}`}
                      defaultSrc={imgUrl}
                      defaultAlt={`Thumb ${gIdx}`}
                      className="w-full h-full object-cover"
                      containerClassName="w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Editorial Story Right Description */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono text-theme-primary mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <EditableElement
                    as="span"
                    id="estate-story-location"
                    field="storyLocation"
                    value="Tribeca, New York"
                    type="text"
                  />
                </div>

                <EditableElement
                  as="h3"
                  id="estate-story-title"
                  field="storyTitle"
                  value={featuredStoryProperty.title}
                  type="heading"
                  className="text-2xl md:text-4xl font-serif font-normal text-theme-foreground tracking-tight mb-4"
                />

                <EditableElement
                  as="p"
                  id="estate-story-body"
                  field="storyBody"
                  value="Perched above historic Tribeca, this landmark penthouse offers panoramic skyline vistas, custom teak millwork, floor-to-ceiling glass, and a 1,200 sq ft private landscaped sky terrace designed for serene daily living and entertaining."
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed mb-8 font-normal"
                />

                {/* Key Spec Grid (All Labels & Values Editable) */}
                <div className="grid grid-cols-2 gap-4 py-6 border-y border-theme-border/40 mb-8">
                  <div>
                    <EditableElement
                      as="span"
                      id="estate-story-spec1-lbl"
                      field="storySpec1Lbl"
                      value="Bedrooms"
                      type="text"
                      className="block text-[10px] font-mono text-theme-muted uppercase"
                    />
                    <EditableElement
                      as="span"
                      id="estate-story-spec1-val"
                      field="storySpec1Val"
                      value="04 Suites"
                      type="text"
                      className="text-sm font-semibold text-theme-foreground"
                    />
                  </div>
                  <div>
                    <EditableElement
                      as="span"
                      id="estate-story-spec2-lbl"
                      field="storySpec2Lbl"
                      value="Bathrooms"
                      type="text"
                      className="block text-[10px] font-mono text-theme-muted uppercase"
                    />
                    <EditableElement
                      as="span"
                      id="estate-story-spec2-val"
                      field="storySpec2Val"
                      value="05 Spa Baths"
                      type="text"
                      className="text-sm font-semibold text-theme-foreground"
                    />
                  </div>
                  <div>
                    <EditableElement
                      as="span"
                      id="estate-story-spec3-lbl"
                      field="storySpec3Lbl"
                      value="Interior Area"
                      type="text"
                      className="block text-[10px] font-mono text-theme-muted uppercase"
                    />
                    <EditableElement
                      as="span"
                      id="estate-story-spec3-val"
                      field="storySpec3Val"
                      value="5,600 SQ FT"
                      type="text"
                      className="text-sm font-semibold text-theme-foreground"
                    />
                  </div>
                  <div>
                    <EditableElement
                      as="span"
                      id="estate-story-spec4-lbl"
                      field="storySpec4Lbl"
                      value="Outdoor Space"
                      type="text"
                      className="block text-[10px] font-mono text-theme-muted uppercase"
                    />
                    <EditableElement
                      as="span"
                      id="estate-story-spec4-val"
                      field="storySpec4Val"
                      value="1,200 SQ FT Terrace"
                      type="text"
                      className="text-sm font-semibold text-theme-foreground"
                    />
                  </div>
                </div>
              </div>

              <div>
                <EditableButton
                  buttonKey="estate-btn-story-inquire"
                  defaultText="Request Private Dossier"
                  defaultHref={`mailto:${email}?subject=${encodeURIComponent(`Dossier Request: ${featuredStoryProperty.title}`)}`}
                  className="w-full py-4 bg-theme-foreground text-theme-background text-xs font-medium tracking-wide hover:opacity-90 transition-all duration-300 rounded-full text-center block shadow-md"
                >
                  <span>{activeButtonOverrides['estate-btn-story-inquire']?.text || 'Request Private Dossier'}</span>
                </EditableButton>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 04: AGENT & APPROACH (PERSONAL BRANDING & STATS) ─── */}
      <section id="approach" className="w-full border-t border-theme-border/30 py-24 bg-theme-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Agent Portrait Image (EditableImage) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full bg-theme-surface border border-theme-border/50 rounded-3xl overflow-hidden shadow-xl">
                <EditableImage
                  imageKey="estate-agent-portrait"
                  defaultSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                  defaultAlt="Julian Vance Advisor Portrait"
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>

            {/* Agent Bio & Philosophy Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <EditableElement
                  as="span"
                  id="estate-approach-section-tag"
                  field="approachSectionTag"
                  value="03 / The Advisor"
                  type="text"
                  className="text-xs font-mono tracking-wider text-theme-muted uppercase block mb-2"
                />
                
                <EditableElement
                  as="h2"
                  id="estate-approach-title"
                  field="approachTitle"
                  value="The Art of Finding Home"
                  type="heading"
                  className="text-3xl md:text-5xl font-serif font-normal text-theme-foreground tracking-tight mb-6"
                />

                <EditableElement
                  as="p"
                  id="estate-approach-p1"
                  field="approachP1"
                  value="We believe real estate is not merely a transaction—it is an architectural backdrop for life. Operating independently across prime international markets, we represent buyers and sellers with total discretion, personal attention, and uncompromised standards."
                  type="text"
                  className="text-sm md:text-base text-theme-muted leading-relaxed mb-6 font-normal"
                />

                <EditableElement
                  as="p"
                  id="estate-approach-p2"
                  field="approachP2"
                  value="From confidential off-market penthouses in New York to architectural compounds in Kyoto and coastal sanctuaries in the Mediterranean, every residence in our portfolio undergoes thorough spatial evaluation before presentation."
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed mb-10"
                />
              </div>

              {/* 4 Key Stat Boxes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8 border-y border-theme-border/40 mb-8">
                <div className="bg-theme-surface p-4 rounded-2xl border border-theme-border/40 shadow-sm">
                  <EditableElement
                    as="span"
                    id="estate-stat-1-val"
                    field="stat1Val"
                    value="12+"
                    type="text"
                    className="text-2xl md:text-3xl font-serif font-normal text-theme-foreground block mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-stat-1-lbl"
                    field="stat1Lbl"
                    value="Years Advisory"
                    type="text"
                    className="text-[11px] text-theme-muted tracking-wide block"
                  />
                </div>

                <div className="bg-theme-surface p-4 rounded-2xl border border-theme-border/40 shadow-sm">
                  <EditableElement
                    as="span"
                    id="estate-stat-2-val"
                    field="stat2Val"
                    value="$450M+"
                    type="text"
                    className="text-2xl md:text-3xl font-serif font-normal text-theme-foreground block mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-stat-2-lbl"
                    field="stat2Lbl"
                    value="Homes Represented"
                    type="text"
                    className="text-[11px] text-theme-muted tracking-wide block"
                  />
                </div>

                <div className="bg-theme-surface p-4 rounded-2xl border border-theme-border/40 shadow-sm">
                  <EditableElement
                    as="span"
                    id="estate-stat-3-val"
                    field="stat3Val"
                    value="06"
                    type="text"
                    className="text-2xl md:text-3xl font-serif font-normal text-theme-foreground block mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-stat-3-lbl"
                    field="stat3Lbl"
                    value="Prime Markets"
                    type="text"
                    className="text-[11px] text-theme-muted tracking-wide block"
                  />
                </div>

                <div className="bg-theme-surface p-4 rounded-2xl border border-theme-border/40 shadow-sm">
                  <EditableElement
                    as="span"
                    id="estate-stat-4-val"
                    field="stat4Val"
                    value="98%"
                    type="text"
                    className="text-2xl md:text-3xl font-serif font-normal text-theme-foreground block mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-stat-4-lbl"
                    field="stat4Lbl"
                    value="Direct Referrals"
                    type="text"
                    className="text-[11px] text-theme-muted tracking-wide block"
                  />
                </div>
              </div>

              <div>
                <EditableButton
                  buttonKey="estate-btn-approach-action"
                  defaultText="Schedule Private Consultation"
                  defaultHref={`mailto:${email}`}
                  className="px-8 py-4 bg-theme-foreground text-theme-background text-xs font-medium tracking-wide hover:opacity-90 transition-all duration-300 rounded-full shadow-md inline-flex items-center gap-3"
                >
                  <span>{activeButtonOverrides['estate-btn-approach-action']?.text || 'Schedule Private Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </EditableButton>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 05: CLIENT TRUST / TESTIMONIALS (LARGE PULL QUOTE) ─── */}
      <section id="testimonials" className="w-full border-t border-theme-border/30 py-24 bg-theme-background">
        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
          
          <EditableElement
            as="span"
            id="estate-testimonials-section-tag"
            field="testimonialsSectionTag"
            value="04 / Client Stories"
            type="text"
            className="text-xs font-mono tracking-wider text-theme-muted uppercase block mb-8"
          />

          <div className="bg-theme-surface border border-theme-border/50 rounded-3xl p-8 md:p-14 shadow-md min-h-[260px] flex flex-col justify-center items-center">
            <motion.blockquote
              key={activeTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl md:text-3xl font-serif font-normal text-theme-foreground leading-relaxed italic max-w-4xl mb-8"
            >
              “<EditableElement
                as="span"
                id={`estate-testimonial-${activeTestimonial}-quote`}
                field={`testimonial${activeTestimonial}Quote`}
                value={TESTIMONIALS[activeTestimonial].quote}
                type="text"
              />”
            </motion.blockquote>

            <div className="text-xs text-theme-muted font-sans">
              <EditableElement
                as="span"
                id={`estate-testimonial-${activeTestimonial}-client`}
                field={`testimonial${activeTestimonial}Client`}
                value={TESTIMONIALS[activeTestimonial].client}
                type="text"
                className="font-serif font-semibold text-theme-foreground block text-base mb-1"
              />
              <EditableElement
                as="span"
                id={`estate-testimonial-${activeTestimonial}-loc`}
                field={`testimonial${activeTestimonial}Loc`}
                value={TESTIMONIALS[activeTestimonial].location}
                type="text"
                className="text-theme-primary font-mono text-[11px]"
              />
            </div>
          </div>

          {/* Testimonial Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))}
              className="p-3 border border-theme-border/60 hover:border-theme-foreground/50 text-theme-foreground transition-colors rounded-full bg-theme-surface shadow-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <EditableElement
              as="span"
              id="estate-testimonial-counter"
              field="testimonialCounter"
              value={`0${activeTestimonial + 1} / 0${TESTIMONIALS.length}`}
              type="text"
              className="text-xs font-mono text-theme-muted"
            />

            <button
              onClick={() => setActiveTestimonial((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))}
              className="p-3 border border-theme-border/60 hover:border-theme-foreground/50 text-theme-foreground transition-colors rounded-full bg-theme-surface shadow-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* ─── SECTION 06: FINAL CONTACT / INQUIRY & FOOTER ─── */}
      <section id="inquire" className="w-full border-t border-theme-border/30 py-24 bg-theme-surface/40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-theme-border/30">
            
            <div className="lg:col-span-7">
              <EditableElement
                as="span"
                id="estate-cta-section-tag"
                field="ctaSectionTag"
                value="05 / Start a Conversation"
                type="text"
                className="text-xs font-mono tracking-wider text-theme-muted uppercase block mb-4"
              />

              <EditableElement
                as="h2"
                id="estate-cta-heading"
                field="ctaHeading"
                value="Let's find your place."
                type="heading"
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-theme-foreground tracking-tight mb-6 leading-tight"
              />

              <EditableElement
                as="p"
                id="estate-cta-sub"
                field="ctaSub"
                value="Whether acquiring a flagship residence, exploring off-market portfolios, or seeking strategic valuation advice, we welcome direct conversation."
                type="text"
                className="text-sm md:text-base text-theme-muted leading-relaxed max-w-xl mb-8 font-normal"
              />

              <div className="flex flex-wrap items-center gap-4">
                <EditableButton
                  buttonKey="estate-btn-cta-start"
                  defaultText="Start a Conversation"
                  defaultHref={`mailto:${email}?subject=${encodeURIComponent('Private Real Estate Inquiry')}`}
                  className="px-8 py-4 bg-theme-foreground text-theme-background text-xs font-medium tracking-wide hover:opacity-90 transition-all duration-300 rounded-full shadow-md inline-flex items-center gap-3"
                >
                  <Mail className="w-4 h-4" />
                  <span>{activeButtonOverrides['estate-btn-cta-start']?.text || 'Start a Conversation'}</span>
                </EditableButton>

                <EditableButton
                  buttonKey="estate-btn-cta-call"
                  defaultText="Call Directly"
                  defaultHref={`tel:${phone}`}
                  className="px-8 py-4 bg-theme-surface border border-theme-border/60 text-theme-foreground text-xs font-medium tracking-wide hover:border-theme-foreground/50 transition-all duration-300 rounded-full shadow-sm inline-flex items-center gap-3"
                >
                  <Phone className="w-4 h-4 text-theme-primary" />
                  <span>{activeButtonOverrides['estate-btn-cta-call']?.text || 'Call Directly'}</span>
                </EditableButton>
              </div>
            </div>

            {/* Direct Contact Info Grid */}
            <div className="lg:col-span-5 bg-theme-surface p-8 md:p-10 border border-theme-border/50 rounded-3xl shadow-sm">
              <EditableElement
                as="h3"
                id="estate-contact-header"
                field="contactHeader"
                value="Private Office Details"
                type="text"
                className="text-xs font-mono tracking-wider text-theme-muted uppercase mb-6 pb-4 border-b border-theme-border/40 block"
              />

              <div className="space-y-6 text-xs text-theme-muted font-mono">
                <div>
                  <EditableElement
                    as="span"
                    id="estate-contact-lbl-1"
                    field="contactLbl1"
                    value="Principal Advisor"
                    type="text"
                    className="block text-[10px] text-theme-muted uppercase mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-contact-agent"
                    field="agentName"
                    value={agentName}
                    type="text"
                    className="font-serif font-semibold text-theme-foreground text-sm block"
                  />
                  <EditableElement
                    as="span"
                    id="estate-contact-agent-title"
                    field="agentTitle"
                    value={agentTitle}
                    type="text"
                  />
                </div>

                <div>
                  <EditableElement
                    as="span"
                    id="estate-contact-lbl-2"
                    field="contactLbl2"
                    value="Direct Telephone"
                    type="text"
                    className="block text-[10px] text-theme-muted uppercase mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-contact-phone"
                    field="phone"
                    value={phone}
                    type="text"
                    className="font-semibold text-theme-foreground block"
                  />
                </div>

                <div>
                  <EditableElement
                    as="span"
                    id="estate-contact-lbl-3"
                    field="contactLbl3"
                    value="Confidential Email"
                    type="text"
                    className="block text-[10px] text-theme-muted uppercase mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-contact-email"
                    field="email"
                    value={email}
                    type="text"
                    className="font-semibold text-theme-foreground block"
                  />
                </div>

                <div>
                  <EditableElement
                    as="span"
                    id="estate-contact-lbl-4"
                    field="contactLbl4"
                    value="Market Coverage"
                    type="text"
                    className="block text-[10px] text-theme-muted uppercase mb-1"
                  />
                  <EditableElement
                    as="span"
                    id="estate-contact-markets"
                    field="locationMarkets"
                    value={locationMarkets}
                    type="text"
                    className="text-theme-foreground block"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 7. CafeCloud-style 3-Column Luxury Footer with "Built with Portiva" Card ─── */}
      <footer className="w-full border-t border-theme-border/40 pt-16 pb-12 px-6 md:px-12 bg-theme-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 items-stretch">
            
            {/* Column 1: Brand Info (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <EditableElement
                  as="h3"
                  id="estate-footer-brand"
                  field="brandName"
                  value={brandName}
                  type="heading"
                  className="text-xl sm:text-2xl font-serif font-normal tracking-tight text-theme-foreground"
                />
                <EditableElement
                  as="p"
                  id="estate-footer-desc"
                  field="footerDesc"
                  value="Independent property advisory representing light-filled architectural residences, coastal sanctuaries, and private family compounds worldwide."
                  type="text"
                  className="text-xs sm:text-sm text-theme-muted leading-relaxed max-w-sm font-normal"
                />
              </div>
            </div>

            {/* Column 2: Quick Navigation Links (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <EditableElement
                as="span"
                id="estate-footer-nav-title"
                field="footerNavTitle"
                value="Quick Navigation"
                type="text"
                className="text-xs font-mono font-bold text-theme-primary uppercase tracking-widest block"
              />
              <div className="flex flex-col gap-2.5">
                <a
                  href="#properties"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-foreground transition-colors text-left"
                >
                  <EditableElement
                    as="span"
                    id="estate-footer-link-1"
                    field="footerLink1"
                    value="Residences Collection"
                    type="text"
                  />
                </a>
                <a
                  href="#editorial-story"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-foreground transition-colors text-left"
                >
                  <EditableElement
                    as="span"
                    id="estate-footer-link-2"
                    field="footerLink2"
                    value="Editorial Feature"
                    type="text"
                  />
                </a>
                <a
                  href="#approach"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-foreground transition-colors text-left"
                >
                  <EditableElement
                    as="span"
                    id="estate-footer-link-3"
                    field="footerLink3"
                    value="The Advisor"
                    type="text"
                  />
                </a>
                <a
                  href="#testimonials"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-foreground transition-colors text-left"
                >
                  <EditableElement
                    as="span"
                    id="estate-footer-link-4"
                    field="footerLink4"
                    value="Client Stories"
                    type="text"
                  />
                </a>
                <a
                  href="#inquire"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-foreground transition-colors text-left"
                >
                  <EditableElement
                    as="span"
                    id="estate-footer-link-5"
                    field="footerLink5"
                    value="Start a Conversation"
                    type="text"
                  />
                </a>
              </div>
            </div>

            {/* Column 3: Big "Built with Portiva" Card (lg:col-span-5) — Uneditable Platform Branding */}
            <div className="lg:col-span-5 bg-theme-surface border border-theme-border/50 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-md relative overflow-hidden group hover:border-theme-primary/40 transition-all duration-300 min-h-[220px]">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-theme-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-mono font-bold tracking-wider uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Built with portiva.site</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-normal text-theme-foreground tracking-tight mb-2 leading-snug block">
                  Created in 60 seconds — Free forever
                </h3>

                <p className="text-xs sm:text-sm text-theme-muted leading-relaxed block font-normal">
                  Build, customize, and publish your dream website instantly with AI. Fast, responsive, and completely free.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-theme-border/40 flex items-center justify-between gap-4">
                <span className="text-xs font-medium text-theme-foreground">
                  Build your website now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-theme-foreground hover:opacity-90 text-theme-background text-xs font-semibold px-4 py-2.5 rounded-full transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Create Yours Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-theme-border/40 pt-8 flex items-center justify-between gap-4 text-xs text-theme-muted">
            <EditableElement
              as="p"
              id="estate-footer-copyright"
              field="footerText"
              value={`© 2026 ${brandName}. All Rights Reserved.`}
              type="text"
              className="text-xs text-theme-muted"
            />
          </div>
        </div>
      </footer>

      {/* ─── PROPERTY DETAIL MODAL ─── */}
      <AnimatePresence>
        {activeModalProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-theme-surface border border-theme-border/50 rounded-3xl p-6 md:p-10 text-theme-foreground shadow-2xl"
            >
              <button
                onClick={() => setActiveModalProperty(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full border border-theme-border/50 hover:border-theme-foreground/50 bg-theme-background text-theme-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-xs font-mono text-theme-muted uppercase mb-2">
                <EditableElement
                  as="span"
                  id={`estate-modal-${activeModalProperty.id}-badge`}
                  field={`modal${activeModalProperty.id}Badge`}
                  value={`Residence ${activeModalProperty.number} · ${activeModalProperty.type}`}
                  type="text"
                />
              </div>

              <EditableElement
                as="h2"
                id={`estate-modal-${activeModalProperty.id}-title`}
                field={`modal${activeModalProperty.id}Title`}
                value={activeModalProperty.title}
                type="heading"
                className="text-2xl md:text-4xl font-serif font-normal tracking-tight mb-2"
              />

              <div className="flex items-center gap-3 text-xs font-mono text-theme-muted mb-6">
                <EditableElement
                  as="span"
                  id={`estate-modal-${activeModalProperty.id}-price`}
                  field={`modal${activeModalProperty.id}Price`}
                  value={activeModalProperty.price}
                  type="text"
                  className="text-theme-primary font-bold text-base"
                />
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-theme-primary" />
                  <EditableElement
                    as="span"
                    id={`estate-modal-${activeModalProperty.id}-loc`}
                    field={`modal${activeModalProperty.id}Loc`}
                    value={activeModalProperty.location}
                    type="text"
                  />
                </span>
              </div>

              {/* Modal Image (EditableImage for Full Inspector Replacement) */}
              <div className="aspect-[16/9] w-full bg-theme-background mb-6 overflow-hidden rounded-2xl border border-theme-border/40 relative">
                <EditableImage
                  imageKey={`estate-modal-image-${activeModalProperty.id}`}
                  defaultSrc={activeModalProperty.mainImage}
                  defaultAlt={activeModalProperty.title}
                  className="w-full h-full object-cover"
                  containerClassName="w-full h-full"
                />
              </div>

              <EditableElement
                as="p"
                id={`estate-modal-${activeModalProperty.id}-desc`}
                field={`modal${activeModalProperty.id}Desc`}
                value={activeModalProperty.shortDesc}
                type="text"
                className="text-sm text-theme-muted leading-relaxed mb-6 font-normal"
              />

              <div className="grid grid-cols-3 gap-4 py-4 border-y border-theme-border/40 text-xs font-mono text-theme-muted mb-8">
                <div>
                  <span className="block text-[10px] uppercase text-theme-muted">Bedrooms</span>
                  <EditableElement
                    as="span"
                    id={`estate-modal-${activeModalProperty.id}-beds`}
                    field={`modal${activeModalProperty.id}Beds`}
                    value={activeModalProperty.beds}
                    type="text"
                    className="font-semibold text-theme-foreground"
                  />
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-theme-muted">Bathrooms</span>
                  <EditableElement
                    as="span"
                    id={`estate-modal-${activeModalProperty.id}-baths`}
                    field={`modal${activeModalProperty.id}Baths`}
                    value={activeModalProperty.baths}
                    type="text"
                    className="font-semibold text-theme-foreground"
                  />
                </div>
                <div>
                  <span className="block text-[10px] uppercase text-theme-muted">Surface Area</span>
                  <EditableElement
                    as="span"
                    id={`estate-modal-${activeModalProperty.id}-area`}
                    field={`modal${activeModalProperty.id}Area`}
                    value={activeModalProperty.area}
                    type="text"
                    className="font-semibold text-theme-foreground"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={`mailto:${email}?subject=${encodeURIComponent(`Inquiry regarding ${activeModalProperty.title}`)}`}
                  className="px-8 py-3.5 bg-theme-foreground text-theme-background text-xs font-medium tracking-wide hover:opacity-90 transition-all rounded-full shadow-md"
                >
                  <EditableElement
                    as="span"
                    id={`estate-modal-${activeModalProperty.id}-cta-showing`}
                    field={`modal${activeModalProperty.id}CtaShowing`}
                    value="Inquire for Private Showing"
                    type="text"
                  />
                </a>
                <button
                  onClick={() => setActiveModalProperty(null)}
                  className="px-6 py-3.5 border border-theme-border/60 text-xs font-medium tracking-wide hover:border-theme-foreground/50 transition-all rounded-full"
                >
                  <EditableElement
                    as="span"
                    id={`estate-modal-${activeModalProperty.id}-cta-close`}
                    field={`modal${activeModalProperty.id}CtaClose`}
                    value="Close"
                    type="text"
                  />
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
