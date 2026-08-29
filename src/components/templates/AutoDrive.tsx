'use client';

import React, { useState, useEffect } from 'react';
import {
  AutoDriveProps,
  VehicleItem,
  StoryChapter,
  TestimonialItem,
  ServiceItem,
  GalleryItem,
  DEFAULT_NAV_ITEMS,
  DEFAULT_VEHICLES,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS,
  DEFAULT_GALLERY,
  STORY_CHAPTERS,
  ShowroomNav,
  HeroShowroom,
  TrustProofRibbon,
  InventoryDiscovery,
  InventoryStore,
  FeaturedSpotlight,
  DealershipServices,
  FinanceEstimator,
  TradeInUpgrade,
  DreamVehicleMarquee,
  DealershipStory,
  CustomerTestimonials,
  ShowroomGallery,
  LocationContact,
  DealershipFooter,
} from './autobahn/index';

// Re-export types and defaults for external callers & testing
export type {
  AutoDriveProps,
  VehicleItem,
  StoryChapter,
  TestimonialItem,
  ServiceItem,
  GalleryItem,
};
export {
  DEFAULT_NAV_ITEMS,
  DEFAULT_VEHICLES,
  DEFAULT_SERVICES,
  DEFAULT_TESTIMONIALS,
  DEFAULT_GALLERY,
  STORY_CHAPTERS,
};

export const AutoDrive: React.FC<AutoDriveProps> = ({
  dealershipName = 'AUTOBAHN PRO',
  location = 'Munich, Germany',
  phone = '+49 89 1234 5678',
  email = 'concierge@autobahnpro.com',
  contactAddress = '100 Motor City Boulevard, Flagship District',
  contactHours = 'Monday – Saturday: 09:00 – 19:00 • Sunday: VIP Appointment Only',

  // Hero section
  heroTagline = 'Engineered For The Driven.',
  heroSubheadline = 'The Precision Showroom Collection',
  heroDescription = 'Explore our hand-curated registry of certified performance, luxury, and modern automobiles. Every vehicle undergoes a comprehensive 150-point technical verification before handover.',
  heroStageBadge = 'Showroom Flagship',
  heroStageLocation = 'Verified Inventory Registry',
  heroAuditCount = '150-Point Audit',

  // Trust Ribbon
  trust1Tag = 'Certification',
  trust1Title = '150-Point Diagnostic Audit',
  trust1Desc = 'Laser chassis alignment, acoustic engine telemetry, and micron paint thickness verified before showroom entry.',
  trust2Tag = 'Provenance',
  trust2Title = '100% Verified Provenance',
  trust2Desc = 'Clean title guarantees, full factory maintenance documentation, and zero structural damage guarantee on every vehicle.',
  trust3Tag = 'Logistics',
  trust3Title = 'White-Glove Enclosed Delivery',
  trust3Desc = 'Climate-controlled enclosed logistics straight to your driveway, office, or track garage across the continent.',
  trust4Tag = 'Warranty',
  trust4Title = 'Comprehensive Vehicle Protection',
  trust4Desc = 'Custom extended powertrain warranties, 24/7 roadside assistance, and seamless trade-in buyback pathways.',

  // Inventory section
  inventoryTitle = 'Featured Inventory',
  inventorySubtitle = 'Curated Vehicle Registry',
  inventoryDescription = 'Every vehicle in our collection has passed our comprehensive 150-point diagnostic audit. Ready for immediate worldwide delivery or in-person viewing.',
  vehicles = DEFAULT_VEHICLES,

  // Spotlight section
  spotlightTag = 'Flagship Spotlight',
  spotlightTitle = 'The Pinnacle of Automotive Artistry.',
  spotlightSubtitle = 'Exemplary Engineering Specification',
  spotlightDescription = 'Each quarter, our curation team spotlights one vehicle that exemplifies peak mechanical execution, flawless cosmetic presentation, and unmatched performance character.',
  spotlightVehicleName = 'Porsche 911 GT3 RS Coupe (992)',
  spotlightPrice = '$289,900',
  spotlightPower = '518 HP @ 8,500 RPM',
  spotlightAcceleration = '0-100 KM/H: 3.0 SEC',
  spotlightTopSpeed = 'TOP SPEED: 296 KM/H',
  spotlightTransmission = '7-SPEED DUAL-CLUTCH PDK',
  spotlightQuote = 'Every vehicle in our collection represents the highest threshold of automotive engineering, verified telemetry, and uncompromised craftsmanship.',

  // Why Us
  whyTitle = 'The Standard of Dealership Integrity.',
  whySubtitle = 'Why Clients Trust Our Showroom',
  whyDescription = 'We operate with complete financial and mechanical transparency. Every vehicle in our fleet is hand-selected, verified, and backed by verifiable documentation.',

  // Services
  servicesTitle = 'Comprehensive Automotive Services',
  servicesSubtitle = 'Dealership Capabilities & Client Care',
  services = DEFAULT_SERVICES,

  // Finance
  financeTitle = 'Tailored Vehicle Finance Calculator',
  financeSubtitle = 'Competitive Rates & Flexible Terms',
  financeDescription = 'Estimate your monthly payments in seconds. Our finance specialists work with premier national and regional lenders to secure optimized rates tailored to your structure.',

  // Trade In
  tradeInTitle = 'Trade In & Elevate Your Drive.',
  tradeInSubtitle = 'Fair-Market Valuation & Seamless Upgrade',
  tradeInDescription = 'Receive a competitive, data-backed valuation for your current automobile within 30 minutes. Apply your equity seamlessly toward any certified showroom inventory.',

  // Story
  storyWatermark = 'YOUR DREAM RIDE',
  storyCategoryTag = 'Showroom Philosophy & Heritage',
  quoteDirective = 'Diagnostic Directive',
  specTag = 'Specification & Discipline',
  ctaBoxTitle = 'Experience The Showroom Atelier',
  ctaBoxSub = 'Connect with our senior vehicle curators to arrange a private consultation, view off-market allocations, or initiate a custom factory order.',

  // Testimonials
  testimonialsTitle = 'Client Deliveries & Verified Reviews',
  testimonialsSubtitle = 'Stories of Acquisition Excellence',
  testimonials = DEFAULT_TESTIMONIALS,

  // Gallery
  galleryTitle = 'The Showroom & Atelier Gallery',
  gallerySubtitle = 'Facility, Diagnostics & Deliveries',
  galleryItems = DEFAULT_GALLERY,

  // Contact & Concierge
  conciergeTag = 'Private Concierge & Visit Scheduling',
  conciergeTitle = 'Connect with Our Senior Acquisition Team.',
  conciergeSub = 'Arrange a private showroom viewing, request a comprehensive vehicle inspection report, or initiate a custom factory allocation.',

  // Footer
  footerDescription = 'An architectural curation of high-performance luxury automobiles, certified factory allocations, and bespoke concierge acquisition.',
  quickLinksHeader = 'Navigation Directory',
  navItems = DEFAULT_NAV_ITEMS,
  activePageId,
  onNavigate,
}) => {
  const [currentView, setCurrentView] = useState<'home' | 'store'>('home');

  useEffect(() => {
    // In builder mode (identified by onNavigate), strictly respect activePageId from the platform
    if (onNavigate) {
      setCurrentView((activePageId as 'home' | 'store') || 'home');
      return;
    }
    
    // In public mode, fallback to hash routing for client-side transitions
    const handleHash = () => {
      if (window.location.hash === '#store') setCurrentView('store');
      else if (window.location.hash === '' || window.location.hash === '#home') {
        setCurrentView((activePageId as 'home' | 'store') || 'home');
      }
    };
    
    if (!window.location.hash && activePageId) {
      setCurrentView(activePageId as 'home' | 'store');
    } else {
      handleHash();
    }

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [activePageId, onNavigate]);

  if (currentView === 'store') {
    return (
      <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-inter selection:bg-theme-primary selection:text-theme-background overflow-x-clip antialiased">
        <ShowroomNav
          dealershipName={dealershipName}
          location={location}
          phone={phone}
          navItems={navItems}
          currentView="store"
          onNavigate={onNavigate}
        />
        <div className="pt-20 sm:pt-24">
          <InventoryStore
            inventoryTitle="Available Showroom Inventory"
            inventorySubtitle="Complete Vehicle Registry"
            inventoryDescription="Filter and search across our complete inventory of verified performance and luxury vehicles."
            vehicles={vehicles}
            phone={phone}
            dealershipName={dealershipName}
            onNavigate={onNavigate}
          />
        </div>
        <DealershipFooter
          dealershipName={dealershipName}
          location={location}
          phone={phone}
          footerDescription={footerDescription}
          quickLinksHeader={quickLinksHeader}
          navItems={navItems}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-inter selection:bg-theme-primary selection:text-theme-background overflow-x-clip antialiased">
      
      {/* 1. Sticky Floating Glassmorphism Showroom Navigation */}
      <ShowroomNav
        dealershipName={dealershipName}
        location={location}
        phone={phone}
        navItems={navItems}
        currentView="home"
        onNavigate={onNavigate}
      />

      {/* 2. Full-Bleed Cinematic Hero Showcase */}
      <HeroShowroom
        dealershipName={dealershipName}
        location={location}
        phone={phone}
        heroTagline={heroTagline}
        heroSubheadline={heroSubheadline}
        heroDescription={heroDescription}
        heroStageBadge={heroStageBadge}
        heroStageLocation={heroStageLocation}
        heroAuditCount={heroAuditCount}
      />

      {/* 3. Credibility & Trust Proof Ribbon */}
      <TrustProofRibbon
        trust1Tag={trust1Tag}
        trust1Title={trust1Title}
        trust1Desc={trust1Desc}
        trust2Tag={trust2Tag}
        trust2Title={trust2Title}
        trust2Desc={trust2Desc}
        trust3Tag={trust3Tag}
        trust3Title={trust3Title}
        trust3Desc={trust3Desc}
        trust4Tag={trust4Tag}
        trust4Title={trust4Title}
        trust4Desc={trust4Desc}
      />

      {/* 4. Interactive Vehicle Discovery & Inventory Grid */}
      <InventoryDiscovery
        inventoryTitle={inventoryTitle}
        inventorySubtitle={inventorySubtitle}
        inventoryDescription={inventoryDescription}
        vehicles={vehicles}
        phone={phone}
        dealershipName={dealershipName}
        onNavigate={onNavigate}
      />

      {/* 5. Magazine-Spread Flagship Spotlight */}
      <FeaturedSpotlight
        spotlightTag={spotlightTag}
        spotlightTitle={spotlightTitle}
        spotlightSubtitle={spotlightSubtitle}
        spotlightDescription={spotlightDescription}
        spotlightVehicleName={spotlightVehicleName}
        spotlightPrice={spotlightPrice}
        spotlightPower={spotlightPower}
        spotlightAcceleration={spotlightAcceleration}
        spotlightTopSpeed={spotlightTopSpeed}
        spotlightTransmission={spotlightTransmission}
        spotlightQuote={spotlightQuote}
        phone={phone}
        dealershipName={dealershipName}
      />

      {/* 6. Automotive Dealership Services */}
      <DealershipServices
        servicesTitle={servicesTitle}
        servicesSubtitle={servicesSubtitle}
        services={services}
        phone={phone}
        dealershipName={dealershipName}
      />

      {/* 7. High-Conversion Trade-In & Appraisal Section */}
      <TradeInUpgrade
        tradeInTitle={tradeInTitle}
        tradeInSubtitle={tradeInSubtitle}
        tradeInDescription={tradeInDescription}
        phone={phone}
        dealershipName={dealershipName}
      />

      {/* 8. Dedicated Animated Dream Vehicle Ribbon Section */}
      <DreamVehicleMarquee marqueeText={storyWatermark} />

      {/* 9. Atelier, Provenance & Stewardship Chapters */}
      <DealershipStory
        storyWatermark={storyWatermark}
        storyCategoryTag={storyCategoryTag}
        quoteDirective={quoteDirective}
        specTag={specTag}
        ctaBoxTitle={ctaBoxTitle}
        ctaBoxSub={ctaBoxSub}
        phone={phone}
        dealershipName={dealershipName}
      />

      {/* 9. Verified Owner Testimonials */}
      <CustomerTestimonials
        testimonialsTitle={testimonialsTitle}
        testimonialsSubtitle={testimonialsSubtitle}
        testimonials={testimonials}
      />

      {/* 10. Showroom & Atelier Photography Gallery */}
      <ShowroomGallery
        galleryTitle={galleryTitle}
        gallerySubtitle={gallerySubtitle}
        galleryItems={galleryItems}
      />

      {/* 11. Interactive Auto Finance Calculator */}
      <FinanceEstimator
        financeTitle={financeTitle}
        financeSubtitle={financeSubtitle}
        financeDescription={financeDescription}
        phone={phone}
        dealershipName={dealershipName}
      />

      {/* 12. Location, Operating Hours & Contact Concierge */}
      <LocationContact
        conciergeTag={conciergeTag}
        conciergeTitle={conciergeTitle}
        conciergeSub={conciergeSub}
        location={location}
        phone={phone}
        email={email}
        contactAddress={contactAddress}
        contactHours={contactHours}
        dealershipName={dealershipName}
      />

      {/* 14. Dealership Footer with Portiva Platform Card */}
      <DealershipFooter
        dealershipName={dealershipName}
        location={location}
        phone={phone}
        footerDescription={footerDescription}
        quickLinksHeader={quickLinksHeader}
        navItems={navItems}
      />

    </div>
  );
};
