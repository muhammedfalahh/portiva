export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface BrandHighlight {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface LookbookItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  badge?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  transformationDetails: string;
  clientQuote?: string;
}

export interface ServiceItem {
  id: string;
  category: 'Bridal Couture' | 'Pre-Wedding & Engagement' | 'Editorial & Red Carpet' | 'Hair Artistry';
  name: string;
  tagline: string;
  price: string;
  duration: string;
  description: string;
  features: string[];
  image: string;
}

export interface PackageItem {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  isPopular?: boolean;
  features: string[];
  ctaText?: string;
  whatsappMessage?: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  duration?: string;
}

export interface BentoCard {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gridSpan: string;
  tag: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface TestimonialItem {
  id: string;
  brideName: string;
  weddingLocation: string;
  weddingDate: string;
  rating: number;
  quote: string;
  image: string;
  packageUsed?: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  subtext: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  likes: string;
  link: string;
  tag: string;
}

export interface BookingInfo {
  headline: string;
  subheadline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  studioAddress: string;
  responseGuarantee: string;
  availableSlotsNotice: string;
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}

export interface AuraSalonProps {
  // Global & Brand Identity
  artistName?: string;
  brandTagline?: string;
  artistTitle?: string;
  phone?: string;

  // Backward compatibility legacy props
  rating?: string;
  bridesCount?: string;
  tagline?: string;
  lookbookImages?: { src: string; tag: string }[];

  // 1. Navigation
  brandLogoText?: string;
  navItems?: NavItem[];
  navCtaText?: string;

  // 2. Cinematic Hero
  heroRating?: string;
  heroBridesCount?: string;
  heroHeadline?: string;
  heroSubheadline?: string;
  heroImage?: string;
  heroPrimaryCtaText?: string;
  heroSecondaryCtaText?: string;
  heroBadgeTitle?: string;
  heroBadgeSubtitle?: string;

  // 3. Editorial Brand Statement
  brandStatementHeadline?: string;
  brandStatementQuote?: string;
  brandStatementAuthor?: string;
  brandStatementImage?: string;
  brandHighlights?: BrandHighlight[];

  // 4. Our Story / Artist Philosophy
  storyTitle?: string;
  storySubtitle?: string;
  storyBioText1?: string;
  storyBioText2?: string;
  artistPortraitImage?: string;
  artistSignatureImage?: string;
  yearsExperience?: string;
  philosophyPillars?: PhilosophyPillar[];

  // 5. Featured Transformations (Lookbook - max 5 items)
  lookbookTitle?: string;
  lookbookSubtitle?: string;
  lookbookItems?: LookbookItem[];

  // 6. Before / After Transformation Slider
  beforeAfterTitle?: string;
  beforeAfterSubtitle?: string;
  beforeAfterItems?: BeforeAfterItem[];

  // 7. Editorial Service List
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: ServiceItem[];

  // 8. Package Carousel
  packagesTitle?: string;
  packagesSubtitle?: string;
  packages?: PackageItem[];

  // 9. Artistry Process
  processTitle?: string;
  processSubtitle?: string;
  processSteps?: ProcessStep[];

  // 10. Fashion Editorial Bento Section
  bentoTitle?: string;
  bentoSubtitle?: string;
  bentoCards?: BentoCard[];

  // 11. Testimonials
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonials?: TestimonialItem[];

  // 12. Social Proof / Statistics
  statsTitle?: string;
  statsSubtitle?: string;
  stats?: StatItem[];

  // 13. Social / Instagram Showcase
  instagramHandle?: string;
  instagramFollowerCount?: string;
  instagramPosts?: InstagramPost[];

  // 14. Final Booking Section
  bookingInfo?: BookingInfo;

  // 15. Minimal Footer
  footerCopyright?: string;
  footerLinkGroups?: FooterLinkGroup[];

  // Engine props
  navbarBg?: string;
  hoverStyle?: string;
}

export const DEFAULT_AURA_SALON_PROPS: Required<
  Omit<AuraSalonProps, 'navbarBg' | 'hoverStyle' | 'rating' | 'bridesCount' | 'lookbookImages' | 'tagline'>
> & { navbarBg: string; hoverStyle: string; tagline?: string } = {
  artistName: 'Ananya Sharma',
  brandTagline: 'Couture Bridal & Editorial Hair & Makeup',
  artistTitle: 'Master Bridal Makeup Artist & Hair Stylist',
  phone: '919876543210',

  // 1. Navigation
  brandLogoText: 'AURA SALON',
  navItems: [
    { id: 'nav-story', label: 'Our Story', href: '#story' },
    { id: 'nav-lookbook', label: 'Lookbook', href: '#lookbook' },
    { id: 'nav-services', label: 'Services', href: '#services' },
    { id: 'nav-packages', label: 'Packages', href: '#packages' },
    { id: 'nav-reviews', label: 'Reviews', href: '#reviews' },
    { id: 'nav-contact', label: 'Contact', href: '#contact' },
  ],
  navCtaText: 'Reserve Experience',

  // 2. Cinematic Hero
  heroRating: '4.98 / 5.0 (240+ Reviews)',
  heroBridesCount: '150+ Royal Brides Styled',
  heroHeadline: 'Ethereal Elegance. Timeless Artistry.',
  heroSubheadline:
    'Bespoke luxury bridal makeup & high-fashion hair styling tailored for modern brides and royal celebrations across India and worldwide.',
  heroImage:
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop',
  heroPrimaryCtaText: 'Book Private Consultation',
  heroSecondaryCtaText: 'Explore Lookbook',
  heroBadgeTitle: 'Couture Bridal Artistry',
  heroBadgeSubtitle: 'High-Definition Airbrush & Royal Draping',

  // 3. Editorial Brand Statement
  brandStatementHeadline: 'A Celebration of Natural Beauty & Couture Precision',
  brandStatementQuote:
    '“Makeup should never be a mask; it is an intimate illumination of a bride’s innate grandeur.”',
  brandStatementAuthor: 'Ananya Sharma — Creative Director',
  brandStatementImage:
    'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1000&auto=format&fit=crop',
  brandHighlights: [
    {
      id: 'high-1',
      title: 'HD Airbrush Perfection',
      description: 'Sweat-proof, 24-hour ultra-weightless perfection for high-definition photography.',
    },
    {
      id: 'high-2',
      title: 'Bespoke Skin Architecture',
      description: 'Custom luxury skincare prep using organic botanical elixirs for radiant glow.',
    },
    {
      id: 'high-3',
      title: 'Global On-Location Suite',
      description: 'Dedicated mobile luxury suite for destination weddings across the globe.',
    },
  ],

  // 4. Our Story / Artist Philosophy
  storyTitle: 'The Artist Behind The Brush',
  storySubtitle: 'Over a decade of sculpting ethereal bridal silhouettes',
  storyBioText1:
    'Trained in Paris and Mumbai, Ananya Sharma brings 12+ years of high-fashion editorial experience into the luxury bridal domain. Her signature style fuses classic royal heritage with luminous, skin-first modern aesthetics.',
  storyBioText2:
    'Having styled celebrity brides, fashion covers, and couture runway shows, Ananya treats every bride as a canvas of unique storytelling, ensuring complete harmony with jewelry, draping, and event lighting.',
  artistPortraitImage:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  artistSignatureImage:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400&auto=format&fit=crop',
  yearsExperience: '12+ Years of Artistry',
  philosophyPillars: [
    { id: 'phil-1', number: '01', title: 'Skin First Architecture', description: 'Deep botanical skin prep creating seamless luminosity without heavy layering.' },
    { id: 'phil-2', number: '02', title: 'Structural Hair Design', description: 'Sculpted hair contours designed to support heavy maang tikkas and dupattas effortlessly.' },
    { id: 'phil-3', number: '03', title: 'Harmonized Color Palette', description: 'Color theory matched precisely to embroidery weave, gemstones, and event lighting.' },
  ],

  // 5. Featured Transformations (Lookbook - max 5 items)
  lookbookTitle: 'The Lookbook',
  lookbookSubtitle: 'Curated editorial transformations across royal wedding celebrations',
  lookbookItems: [
    {
      id: 'lb-1',
      title: 'South Indian Royal Bride',
      category: 'Traditional Heritage',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      description: 'Classic matte base, kohl-rimmed defined eyes, and fresh jasmine floral braid.',
      badge: 'Featured',
    },
    {
      id: 'lb-2',
      title: 'Bengaluru Sunset Wedding',
      category: 'Contemporary Glam',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=800&auto=format&fit=crop',
      description: 'Dewy glass skin, champagne shimmer lid, and soft sculpted waves.',
    },
    {
      id: 'lb-3',
      title: 'Udaipur Royal Palace Reception',
      category: 'Editorial Glam',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop',
      description: 'Smokey bronze eyeshadow paired with deep berry velvet lip.',
    },
    {
      id: 'lb-4',
      title: 'Minimalist Destination Bride',
      category: 'Pastel Elegance',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=800&auto=format&fit=crop',
      description: 'Soft peach blush tones with feather-light airbrush skin.',
    },
    {
      id: 'lb-5',
      title: 'Cocktail & Sangeet Night',
      category: 'High-Gloss Glamour',
      image: 'https://images.unsplash.com/photo-1559357430-2e6cb1a5f280?q=80&w=800&auto=format&fit=crop',
      description: 'Winged liner precision with Hollywood glam retro curls.',
    },
  ],

  // 6. Before / After Transformation Slider
  beforeAfterTitle: 'Before & After Artistry',
  beforeAfterSubtitle: 'Slide to witness the seamless enhancement of natural features',
  beforeAfterItems: [
    {
      id: 'ba-1',
      title: 'Royal Pheras Transformation',
      category: 'HD Airbrush Bridal',
      beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      transformationDetails: 'Color correction, HD airbrush foundation, custom lash extensions, & antique gold draping.',
      clientQuote: '“I felt like royalty. The skin felt so light yet lasted through 14 hours of ceremony!”',
    },
    {
      id: 'ba-2',
      title: 'Sangeet Glam Transformation',
      category: 'High Fashion Editorial',
      beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=800&auto=format&fit=crop',
      transformationDetails: 'Sculpted cheek contours, graphic winged eye, and crown braid setting.',
      clientQuote: '“The photos looked straight out of Vogue India!”',
    },
  ],

  // 7. Editorial Service List
  servicesTitle: 'Bespoke Services',
  servicesSubtitle: 'Tailored beauty experiences for weddings, editorials, and special occasions',
  services: [
    {
      id: 'srv-1',
      category: 'Bridal Couture',
      name: 'The Signature Royal Bridal Suite',
      tagline: 'Complete D-day transformation with dedicated touch-up artist',
      price: '$999',
      duration: '4.5 Hours',
      description: 'Includes full HD airbrush makeup, luxury lash extension, custom hair sculpting, dupatta setting & saree draping.',
      features: ['2 Pre-wedding trial sessions', 'Ultra HD Airbrush Foundation', 'Saree & Dupatta Draping', 'Mother/Sister quick touch-up kit', 'On-site presence till Pheras'],
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'srv-2',
      category: 'Pre-Wedding & Engagement',
      name: 'Engagement & Mehendi Glamour',
      tagline: 'Luminous glow crafted for sunlit pre-wedding festivities',
      price: '$599',
      duration: '3.0 Hours',
      description: 'Fresh dewy skin finish, waterproof eye makeup, and soft boho braid styling ideal for vibrant celebrations.',
      features: ['Skin prep consultation', 'Waterproof eye makeup', 'Boho braid / floral hair setup', 'Touch-up essential kit'],
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'srv-3',
      category: 'Editorial & Red Carpet',
      name: 'Fashion Editorial & Campaign Styling',
      tagline: 'High-definition runway lookbook styling for models & covers',
      price: '$750 / day',
      duration: 'Full Day',
      description: 'Fast-paced look transitions, skin reflection control, and avant-garde hair design for commercial shoots.',
      features: ['Multi-look palette shifts', 'Studio light reflective calibration', 'Continuous set touch-ups', 'Hair ornament integration'],
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=600&auto=format&fit=crop',
    },
    {
      id: 'srv-4',
      category: 'Hair Artistry',
      name: 'Couture Hair Sculpting & Extension Setting',
      tagline: 'Intricate floral braid & royal hair structures',
      price: '$350',
      duration: '2.0 Hours',
      description: 'Architectural hair styling built to support heavy jewelry pieces and traditional fresh floral ornaments.',
      features: ['Hair volume extension blending', 'Fresh flower wiring & pinning', 'Crown structure padding', 'Humidity-shield spray finish'],
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=600&auto=format&fit=crop',
    },
  ],

  // 8. Package Carousel
  packagesTitle: 'Luxury Experience Packages',
  packagesSubtitle: 'Complete multi-event packages engineered for peace of mind',
  packages: [
    {
      id: 'pkg-1',
      name: 'Essential Glow',
      subtitle: 'Single Main Event Experience',
      price: '$499',
      features: [
        '1 Bridal trial session',
        'HD airbrush makeup base',
        'Custom hairstyling & hair extensions',
        'Dupatta & jewelry placement',
        'Emergency touch-up kit',
      ],
      ctaText: 'Book Essential Package',
      whatsappMessage: 'Hi Ananya, I would like to book the Essential Glow Package ($499).',
    },
    {
      id: 'pkg-2',
      name: 'Royal Bridal Suite',
      subtitle: 'Most Preferred for Main Wedding + Reception',
      price: '$999',
      originalPrice: '$1,200',
      isPopular: true,
      features: [
        '2 Comprehensive trial sessions',
        'Ultra HD Airbrush base for Wedding & Reception',
        'Advanced draping & jewelry coordination',
        'Mother & Sister touch-up service included',
        'Dedicated on-site assistant till Pheras',
        'Premium mink lashes & hair extensions',
      ],
      ctaText: 'Reserve Royal Suite',
      whatsappMessage: 'Hi Ananya, I want to reserve the Royal Bridal Suite Package ($999).',
    },
    {
      id: 'pkg-3',
      name: 'Grand Entourage Destination',
      subtitle: 'Full Multi-Day Wedding Celebration (Bridal + 4 Bridesmaids)',
      price: '$1,899',
      originalPrice: '$2,400',
      features: [
        'Bridal Makeup + 4 Bridesmaids for 3 Events',
        'HD airbrush base for all members',
        'Mehendi, Sangeet & Pheras styling',
        'Complete travel & on-location team setup',
        'Unlimited touch-up support throughout all events',
        'Deluxe skincare gift hamper for bride',
      ],
      ctaText: 'Book Grand Entourage',
      whatsappMessage: 'Hi Ananya, I want to inquire about the Grand Entourage Destination Package ($1,899).',
    },
  ],

  // 9. Artistry Process
  processTitle: 'The Four-Step Artistry Journey',
  processSubtitle: 'From initial consultation to D-day perfection',
  processSteps: [
    {
      stepNumber: '01',
      title: 'Vision & Skin Analysis',
      subtitle: '6-8 Months Prior',
      description: 'In-depth consultation mapping your wedding outfits, skin type, jewelry hues, and facial architecture.',
      duration: '45 Mins',
    },
    {
      stepNumber: '02',
      title: 'The Trial Session',
      subtitle: '2-3 Months Prior',
      description: 'Hands-on trial session executing two complete looks under high-definition photography lighting.',
      duration: '3 Hours',
    },
    {
      stepNumber: '03',
      title: 'Custom Palette Blueprint',
      subtitle: '2 Weeks Prior',
      description: 'Finalizing hair ornament placement, floral wiring, drape pleating specs, and personalized skin prep regimen.',
      duration: '1 Hour',
    },
    {
      stepNumber: '04',
      title: 'D-Day On-Site Perfection',
      subtitle: 'Wedding Day',
      description: 'On-location luxury suite setup 4 hours prior to ceremony with continuous touch-up support.',
      duration: 'Full Day Support',
    },
  ],

  // 10. Fashion Editorial Bento Section
  bentoTitle: 'Editorial Highlights',
  bentoSubtitle: 'Discover the artistry, studio space, and bespoke cosmetics',
  bentoCards: [
    {
      id: 'bento-1',
      title: 'Vogue India Cover Feature',
      subtitle: 'High Fashion Recognition',
      description: 'Awarded Top 10 Luxury Bridal Artists in South Asia by Vogue Weddings.',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
      gridSpan: 'col-span-1 md:col-span-2 row-span-2',
      tag: 'Editorial Distinction',
    },
    {
      id: 'bento-2',
      title: 'Clean Botanical Skincare',
      subtitle: 'Pure Organic Elixirs',
      description: 'We exclusively use dermatologically tested, cruelty-free luxury skincare.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
      gridSpan: 'col-span-1 row-span-1',
      tag: 'Skincare Standard',
    },
    {
      id: 'bento-3',
      title: 'Destination Luxury Suite',
      subtitle: 'Worldwide Mobility',
      description: 'Fully equipped mobile studio with ring lights & steam drapers traveling across Italy, Dubai, and Thailand.',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
      gridSpan: 'col-span-1 row-span-1',
      tag: 'Global Mobility',
    },
  ],

  // 11. Testimonials
  testimonialsTitle: 'Words From Our Royal Brides',
  testimonialsSubtitle: 'Unedited reflections of joy and elegance from real brides',
  testimonials: [
    {
      id: 'test-1',
      brideName: 'Priya Narang',
      weddingLocation: 'The Leela Palace, Udaipur',
      weddingDate: 'December 2025',
      rating: 5,
      quote:
        'Ananya transformed me into the exact bride I always envisioned — regal yet soft. My makeup lasted through emotional pheras and non-stop dancing without a single creasing moment!',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      packageUsed: 'Royal Bridal Suite',
    },
    {
      id: 'test-2',
      brideName: 'Meera Reddy',
      weddingLocation: 'JW Marriott, Bengaluru',
      weddingDate: 'November 2025',
      rating: 5,
      quote:
        'The skin prep before makeup was unbelievable. Even under 4K video cameras, my skin looked glowing and weightless. Best decision of my wedding planning!',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
      packageUsed: 'Grand Entourage Destination',
    },
    {
      id: 'test-3',
      brideName: 'Dr. Radhika Sen',
      weddingLocation: 'Taj Bengal, Kolkata',
      weddingDate: 'January 2026',
      rating: 5,
      quote:
        'Ananya’s eye for color matching with traditional Bengali sarees and gold ornaments is unmatched. Calm, punctual, and an absolute artist.',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop',
      packageUsed: 'Royal Bridal Suite',
    },
  ],

  // 12. Social Proof / Statistics
  statsTitle: 'Artistry By Numbers',
  statsSubtitle: 'A track record of excellence in luxury bridal styling',
  stats: [
    { id: 'stat-1', number: '150+', label: 'Brides Styled', subtext: 'Across 12 countries' },
    { id: 'stat-2', number: '12+', label: 'Years Experience', subtext: 'Editorial & Bridal' },
    { id: 'stat-3', number: '4.98', label: 'Client Rating', subtext: 'Based on 240+ reviews' },
    { id: 'stat-4', number: '100%', label: 'On-Time Record', subtext: 'Punctuality guaranteed' },
  ],

  // 13. Social / Instagram Showcase
  instagramHandle: '@aurasalon.official',
  instagramFollowerCount: '48.5K Editorial Followers',
  instagramPosts: [
    {
      id: 'ig-1',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=400&auto=format&fit=crop',
      caption: 'Royal South Indian Bride lookbook highlight',
      likes: '2.4k',
      link: 'https://instagram.com',
      tag: '#BridalGlam',
    },
    {
      id: 'ig-2',
      image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=400&auto=format&fit=crop',
      caption: 'Sunset pheras glow step-by-step skin prep',
      likes: '1.8k',
      link: 'https://instagram.com',
      tag: '#AirbrushMakeup',
    },
    {
      id: 'ig-3',
      image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=400&auto=format&fit=crop',
      caption: 'Smokey bronze eyeshadow for Udaipur reception',
      likes: '3.1k',
      link: 'https://instagram.com',
      tag: '#EditorialBridal',
    },
    {
      id: 'ig-4',
      image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=400&auto=format&fit=crop',
      caption: 'Soft pastel lehenga makeup pairing',
      likes: '2.9k',
      link: 'https://instagram.com',
      tag: '#PastelBride',
    },
  ],

  // 14. Final Booking Section
  bookingInfo: {
    headline: 'Secure Your Date For An Unforgettable Bridal Experience',
    subheadline: 'Peak wedding season slots fill 6-8 months in advance. Reach out directly to lock in your date.',
    phone: '+91 98765 43210',
    whatsappNumber: '919876543210',
    email: 'concierge@aurasalon.com',
    studioAddress: 'Suite 402, Jubilee Hills, Hyderabad & Mobile Global Suite',
    responseGuarantee: 'Guaranteed response within 2 hours for active wedding inquiries',
    availableSlotsNotice: 'Currently accepting dates for 2026/2027 Wedding Season',
  },

  // 15. Minimal Footer
  footerCopyright: '© 2026 AURA SALON BY ANANYA SHARMA. ALL RIGHTS RESERVED.',
  footerLinkGroups: [
    {
      title: 'Navigation',
      links: [
        { label: 'Our Story', href: '#story' },
        { label: 'Lookbook', href: '#lookbook' },
        { label: 'Services', href: '#services' },
        { label: 'Packages', href: '#packages' },
      ],
    },
    {
      title: 'Experience',
      links: [
        { label: 'Bride Testimonials', href: '#reviews' },
        { label: 'Instagram Showcase', href: '#instagram' },
      ],
    },
    {
      title: 'Legal & Contact',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Direct Booking', href: '#contact' },
      ],
    },
  ],

  navbarBg: 'transparent',
  hoverStyle: 'color',
};
