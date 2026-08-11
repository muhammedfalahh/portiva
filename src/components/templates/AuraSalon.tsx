'use client';

import React from 'react';
import {
  AuraSalonProps,
  PackageItem,
  DEFAULT_AURA_SALON_PROPS,
  MinimalNavigation,
  CinematicHero,
  EditorialBrandStatement,
  OurStoryPhilosophy,
  LookbookCarousel,
  EditorialServiceList,
  PackageCarousel,
  BrideTestimonials,
  SocialProofStats,
  InstagramShowcase,
  FinalBookingSection,
  MinimalFooter,
} from './aurasalon/index';

// Re-export types and defaults for external callers & testing
export type { AuraSalonProps, PackageItem };
export { DEFAULT_AURA_SALON_PROPS };

export const AuraSalon: React.FC<AuraSalonProps> = (props) => {
  // Merge incoming props with complete defaults
  const artistName = props.artistName ?? DEFAULT_AURA_SALON_PROPS.artistName;
  const brandTagline = props.brandTagline ?? props.tagline ?? DEFAULT_AURA_SALON_PROPS.brandTagline;
  const artistTitle = props.artistTitle ?? DEFAULT_AURA_SALON_PROPS.artistTitle;
  const phone = props.phone ?? DEFAULT_AURA_SALON_PROPS.phone;

  // 1. Navigation
  const brandLogoText = props.brandLogoText ?? DEFAULT_AURA_SALON_PROPS.brandLogoText;
  const navItems = props.navItems ?? DEFAULT_AURA_SALON_PROPS.navItems;
  const navCtaText = props.navCtaText ?? DEFAULT_AURA_SALON_PROPS.navCtaText;

  // 2. Hero
  const heroRating = props.heroRating ?? props.rating ?? DEFAULT_AURA_SALON_PROPS.heroRating;
  const heroBridesCount = props.heroBridesCount ?? props.bridesCount ?? DEFAULT_AURA_SALON_PROPS.heroBridesCount;
  const heroHeadline = props.heroHeadline ?? DEFAULT_AURA_SALON_PROPS.heroHeadline;
  const heroSubheadline = props.heroSubheadline ?? DEFAULT_AURA_SALON_PROPS.heroSubheadline;
  const heroImage = props.heroImage ?? DEFAULT_AURA_SALON_PROPS.heroImage;
  const heroPrimaryCtaText = props.heroPrimaryCtaText ?? DEFAULT_AURA_SALON_PROPS.heroPrimaryCtaText;
  const heroSecondaryCtaText = props.heroSecondaryCtaText ?? DEFAULT_AURA_SALON_PROPS.heroSecondaryCtaText;
  const heroBadgeTitle = props.heroBadgeTitle ?? DEFAULT_AURA_SALON_PROPS.heroBadgeTitle;
  const heroBadgeSubtitle = props.heroBadgeSubtitle ?? DEFAULT_AURA_SALON_PROPS.heroBadgeSubtitle;

  // 3. Brand Statement
  const brandStatementHeadline = props.brandStatementHeadline ?? DEFAULT_AURA_SALON_PROPS.brandStatementHeadline;
  const brandStatementQuote = props.brandStatementQuote ?? DEFAULT_AURA_SALON_PROPS.brandStatementQuote;
  const brandStatementAuthor = props.brandStatementAuthor ?? DEFAULT_AURA_SALON_PROPS.brandStatementAuthor;
  const brandStatementImage = props.brandStatementImage ?? DEFAULT_AURA_SALON_PROPS.brandStatementImage;
  const brandHighlights = props.brandHighlights ?? DEFAULT_AURA_SALON_PROPS.brandHighlights;

  // 4. Story & Philosophy
  const storyTitle = props.storyTitle ?? DEFAULT_AURA_SALON_PROPS.storyTitle;
  const storySubtitle = props.storySubtitle ?? DEFAULT_AURA_SALON_PROPS.storySubtitle;
  const storyBioText1 = props.storyBioText1 ?? DEFAULT_AURA_SALON_PROPS.storyBioText1;
  const storyBioText2 = props.storyBioText2 ?? DEFAULT_AURA_SALON_PROPS.storyBioText2;
  const artistPortraitImage = props.artistPortraitImage ?? DEFAULT_AURA_SALON_PROPS.artistPortraitImage;
  const yearsExperience = props.yearsExperience ?? DEFAULT_AURA_SALON_PROPS.yearsExperience;
  const philosophyPillars = props.philosophyPillars ?? DEFAULT_AURA_SALON_PROPS.philosophyPillars;

  // 5. Lookbook (support legacy lookbookImages array if passed)
  const lookbookTitle = props.lookbookTitle ?? DEFAULT_AURA_SALON_PROPS.lookbookTitle;
  const lookbookSubtitle = props.lookbookSubtitle ?? DEFAULT_AURA_SALON_PROPS.lookbookSubtitle;
  const lookbookItems = props.lookbookItems ?? (
    props.lookbookImages
      ? props.lookbookImages.map((img: { src: string; tag: string }, idx: number) => ({
          id: `legacy-lb-${idx}`,
          title: img.tag,
          category: 'Lookbook',
          image: img.src,
          description: 'Custom bridal artistry look',
        }))
      : DEFAULT_AURA_SALON_PROPS.lookbookItems
  );

  // 7. Services
  const servicesTitle = props.servicesTitle ?? DEFAULT_AURA_SALON_PROPS.servicesTitle;
  const servicesSubtitle = props.servicesSubtitle ?? DEFAULT_AURA_SALON_PROPS.servicesSubtitle;
  const services = props.services ?? DEFAULT_AURA_SALON_PROPS.services;

  // 8. Packages (support legacy packages array if passed)
  const packagesTitle = props.packagesTitle ?? DEFAULT_AURA_SALON_PROPS.packagesTitle;
  const packagesSubtitle = props.packagesSubtitle ?? DEFAULT_AURA_SALON_PROPS.packagesSubtitle;
  const packages: PackageItem[] = props.packages
    ? props.packages.map((pkg: PackageItem, idx: number) => ({
        id: (pkg as PackageItem).id || `legacy-pkg-${idx}`,
        name: pkg.name,
        subtitle: (pkg as PackageItem).subtitle || 'Bridal Experience Package',
        price: pkg.price,
        originalPrice: (pkg as PackageItem).originalPrice,
        isPopular: (pkg as PackageItem).isPopular ?? (idx === 1),
        features: pkg.features,
        ctaText: (pkg as PackageItem).ctaText || 'Reserve Package',
        whatsappMessage: (pkg as PackageItem).whatsappMessage,
      }))
    : DEFAULT_AURA_SALON_PROPS.packages;

  // 11. Testimonials
  const testimonialsTitle = props.testimonialsTitle ?? DEFAULT_AURA_SALON_PROPS.testimonialsTitle;
  const testimonialsSubtitle = props.testimonialsSubtitle ?? DEFAULT_AURA_SALON_PROPS.testimonialsSubtitle;
  const testimonials = props.testimonials ?? DEFAULT_AURA_SALON_PROPS.testimonials;

  // 12. Stats
  const statsTitle = props.statsTitle ?? DEFAULT_AURA_SALON_PROPS.statsTitle;
  const statsSubtitle = props.statsSubtitle ?? DEFAULT_AURA_SALON_PROPS.statsSubtitle;
  const stats = props.stats ?? DEFAULT_AURA_SALON_PROPS.stats;

  // 13. Instagram Showcase
  const instagramHandle = props.instagramHandle ?? DEFAULT_AURA_SALON_PROPS.instagramHandle;
  const instagramFollowerCount = props.instagramFollowerCount ?? DEFAULT_AURA_SALON_PROPS.instagramFollowerCount;
  const instagramPosts = props.instagramPosts ?? DEFAULT_AURA_SALON_PROPS.instagramPosts;

  // 14. Booking Info
  const bookingInfo = props.bookingInfo ?? DEFAULT_AURA_SALON_PROPS.bookingInfo;

  // 15. Footer
  const footerCopyright = props.footerCopyright ?? DEFAULT_AURA_SALON_PROPS.footerCopyright;
  const footerLinkGroups = props.footerLinkGroups ?? DEFAULT_AURA_SALON_PROPS.footerLinkGroups;

  return (
    <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-sans overflow-x-hidden selection:bg-theme-accent selection:text-theme-background">
      {/* 1. Sticky Minimal Navigation Bar */}
      <MinimalNavigation
        brandLogoText={brandLogoText}
        navItems={navItems}
        navCtaText={navCtaText}
        phone={phone}
      />

      {/* 2. Cinematic Hero Section */}
      <CinematicHero
        heroRating={heroRating}
        heroBridesCount={heroBridesCount}
        heroHeadline={heroHeadline}
        heroSubheadline={heroSubheadline}
        heroImage={heroImage}
        heroPrimaryCtaText={heroPrimaryCtaText}
        heroSecondaryCtaText={heroSecondaryCtaText}
        heroBadgeTitle={heroBadgeTitle}
        heroBadgeSubtitle={heroBadgeSubtitle}
        artistName={artistName}
        artistTitle={artistTitle}
        phone={phone}
      />

      {/* 3. Editorial Brand Statement */}
      <EditorialBrandStatement
        brandStatementHeadline={brandStatementHeadline}
        brandStatementQuote={brandStatementQuote}
        brandStatementAuthor={brandStatementAuthor}
        brandStatementImage={brandStatementImage}
        brandHighlights={brandHighlights}
      />

      {/* 4. Our Story & Artist Philosophy */}
      <OurStoryPhilosophy
        storyTitle={storyTitle}
        storySubtitle={storySubtitle}
        storyBioText1={storyBioText1}
        storyBioText2={storyBioText2}
        artistPortraitImage={artistPortraitImage}
        yearsExperience={yearsExperience}
        philosophyPillars={philosophyPillars}
        artistName={artistName}
      />

      {/* 5. Featured Transformations (Lookbook - MAX 5 CAP) */}
      <LookbookCarousel
        lookbookTitle={lookbookTitle}
        lookbookSubtitle={lookbookSubtitle}
        lookbookItems={lookbookItems}
      />

      {/* 7. Categorized Editorial Service List */}
      <EditorialServiceList
        servicesTitle={servicesTitle}
        servicesSubtitle={servicesSubtitle}
        services={services}
        phone={phone}
      />

      {/* 8. Luxury Experience Package Carousel */}
      <PackageCarousel
        packagesTitle={packagesTitle}
        packagesSubtitle={packagesSubtitle}
        packages={packages}
        phone={phone}
      />

      {/* 11. Royal Bride Testimonials */}
      <BrideTestimonials
        testimonialsTitle={testimonialsTitle}
        testimonialsSubtitle={testimonialsSubtitle}
        testimonials={testimonials}
      />

      {/* 12. Social Proof & Performance Statistics */}
      <SocialProofStats
        statsTitle={statsTitle}
        statsSubtitle={statsSubtitle}
        stats={stats}
      />

      {/* 13. Social / Instagram Media Showcase */}
      <InstagramShowcase
        instagramHandle={instagramHandle}
        instagramFollowerCount={instagramFollowerCount}
        instagramPosts={instagramPosts}
      />

      {/* 14. Final Conversion & Direct Booking Closure */}
      <FinalBookingSection
        bookingInfo={bookingInfo}
        artistName={artistName}
        phone={phone}
      />

      {/* 15. Minimal Footer */}
      <MinimalFooter
        artistName={artistName}
        brandTagline={brandTagline}
        footerCopyright={footerCopyright}
        footerLinkGroups={footerLinkGroups}
      />
    </div>
  );
};
