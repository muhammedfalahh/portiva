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
  category: string;
  engine?: string;
  power?: string;
  drivetrain?: string;
  highlightTag?: string;
}

export type StoryTab = 'atelier' | 'heritage' | 'stewardship';

export interface StoryChapter {
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

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  vehicle: string;
  city: string;
  rating: number;
  quote: string;
  avatar?: string;
}

export interface ServiceItem {
  id: string;
  iconName: 'car' | 'search' | 'shield' | 'banknote' | 'truck' | 'sparkles';
  title: string;
  tag: string;
  description: string;
  features: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  category: string;
}

export interface AutoDriveProps {
  dealershipName?: string;
  tagline?: string;
  location?: string;
  phone?: string;
  email?: string;
  openingHours?: string;
  
  // Hero section
  heroTagline?: string;
  heroSubheadline?: string;
  heroDescription?: string;
  heroStageBadge?: string;
  heroStageLocation?: string;
  heroAuditCount?: string;

  // Trust Ribbon
  trust1Tag?: string;
  trust1Title?: string;
  trust1Desc?: string;
  trust2Tag?: string;
  trust2Title?: string;
  trust2Desc?: string;
  trust3Tag?: string;
  trust3Title?: string;
  trust3Desc?: string;
  trust4Tag?: string;
  trust4Title?: string;
  trust4Desc?: string;

  // Inventory section
  inventoryTitle?: string;
  inventorySubtitle?: string;
  inventoryDescription?: string;
  vehicles?: VehicleItem[];

  // Spotlight section
  spotlightTag?: string;
  spotlightTitle?: string;
  spotlightSubtitle?: string;
  spotlightDescription?: string;
  spotlightVehicleName?: string;
  spotlightPrice?: string;
  spotlightPower?: string;
  spotlightAcceleration?: string;
  spotlightTopSpeed?: string;
  spotlightTransmission?: string;
  spotlightQuote?: string;

  // Why Us
  whyTitle?: string;
  whySubtitle?: string;
  whyDescription?: string;

  // Services
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: ServiceItem[];

  // Finance
  financeTitle?: string;
  financeSubtitle?: string;
  financeDescription?: string;

  // Trade In
  tradeInTitle?: string;
  tradeInSubtitle?: string;
  tradeInDescription?: string;

  // Story
  storyWatermark?: string;
  storyCategoryTag?: string;
  quoteDirective?: string;
  specTag?: string;
  ctaBoxTitle?: string;
  ctaBoxSub?: string;

  // Testimonials
  testimonialsTitle?: string;
  testimonialsSubtitle?: string;
  testimonials?: TestimonialItem[];

  // Gallery
  galleryTitle?: string;
  gallerySubtitle?: string;
  galleryItems?: GalleryItem[];

  // Contact & Concierge
  conciergeTag?: string;
  conciergeTitle?: string;
  conciergeSub?: string;
  contactAddress?: string;
  contactHours?: string;

  // Footer
  footerDescription?: string;
  quickLinksHeader?: string;
  navItems?: { label: string; href: string }[];
  navbarBg?: string;
  hoverStyle?: string;
  activePageId?: string;
  onNavigate?: (pageId: string) => void;
}

export const DEFAULT_NAV_ITEMS = [
  { label: 'Inventory', href: '#inventory' },
  { label: 'Spotlight', href: '#spotlight' },
  { label: 'Services', href: '#services' },
  { label: 'Trade-In', href: '#trade-in' },
  { label: 'Our Story', href: '#story' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Showroom', href: '#gallery' },
  { label: 'Finance', href: '#finance' },
  { label: 'Contact', href: '#contact' },
];

export const DEFAULT_VEHICLES: VehicleItem[] = [
  {
    id: 'car-1',
    title: 'Porsche 911 GT3 RS Coupe',
    year: '2024',
    mileage: '1,850 km',
    transmission: '7-Speed PDK',
    fuel: 'Petrol / 4.0L NA',
    price: '$289,900',
    status: 'Available',
    category: 'Performance',
    engine: '4.0L Boxer-6',
    power: '518 HP',
    drivetrain: 'RWD',
    highlightTag: 'Certified Track Spec',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-2',
    title: 'Mercedes-AMG GT Black Series',
    year: '2023',
    mileage: '4,200 km',
    transmission: '7-Speed Dual-Clutch',
    fuel: 'Petrol / Biturbo V8',
    price: '$325,000',
    status: 'Available',
    category: 'Performance',
    engine: '4.0L V8 Biturbo',
    power: '720 HP',
    drivetrain: 'RWD',
    highlightTag: 'Collector Grade',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-3',
    title: 'Porsche Taycan Turbo S Cross Turismo',
    year: '2024',
    mileage: '1,100 km',
    transmission: '2-Speed Auto',
    fuel: 'All-Electric (93 kWh)',
    price: '$188,500',
    status: 'Available',
    category: 'Electric & Hybrid',
    engine: 'Dual Permanent Electric Motors',
    power: '750 HP',
    drivetrain: 'AWD',
    highlightTag: 'Zero Emissions / 0-100: 2.6s',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-4',
    title: 'Lamborghini Urus Performante Edition',
    year: '2024',
    mileage: '3,400 km',
    transmission: '8-Speed Auto',
    fuel: 'Twin-Turbo V8',
    price: '$279,900',
    status: 'Reserved',
    category: 'Premium SUVs',
    engine: '4.0L Twin-Turbo V8',
    power: '657 HP',
    drivetrain: 'All-Wheel Drive',
    highlightTag: 'Full Carbon Package',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-5',
    title: 'BMW M8 Competition Gran Coupe',
    year: '2024',
    mileage: '5,600 km',
    transmission: '8-Speed M Steptronic',
    fuel: 'TwinPower Turbo V8',
    price: '$134,800',
    status: 'Available',
    category: 'Luxury Sedans',
    engine: '4.4L Twin-Turbo V8',
    power: '617 HP',
    drivetrain: 'M xDrive AWD',
    highlightTag: 'Executive Tourer',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 'car-6',
    title: 'Audi RS6 Avant Carbon Black Edition',
    year: '2023',
    mileage: '7,900 km',
    transmission: '8-Speed Tiptronic',
    fuel: 'Mild Hybrid Twin-Turbo',
    price: '$142,500',
    status: 'Available',
    category: 'Certified Pre-Owned',
    engine: '4.0L V8 Twin-Turbo MHEV',
    power: '591 HP',
    drivetrain: 'Quattro AWD',
    highlightTag: 'Single Owner / Factory Warranty',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop',
  },
];

export const STORY_CHAPTERS: Record<StoryTab, StoryChapter> = {
  atelier: {
    id: 'atelier',
    tabLabel: 'Inspection & Certification',
    tag: 'Mechanical & Cosmetic Certification',
    location: 'Certified Master Facility • Handover Stage',
    heading: 'Obsessive Mechanical & Cosmetic Calibration.',
    subheading: 'Where engineering integrity meets uncompromised presentation.',
    p1: 'Every vehicle entering the showroom registry undergoes an exhaustive 150-point technical, diagnostic, and cosmetic certification. We inspect chassis tolerances, acoustic engine harmonics, transmission fluid viscosity, and micron paint depth before approving any vehicle for client handover.',
    p2: 'Our master technicians are certified across premier automotive marques, ensuring every dynamic system, active aerodynamic component, and engine calibration matches original factory tolerance.',
    quote: '"We do not merely sell automobiles. We curate certified machinery and guarantee absolute mechanical transparency before handover."',
    author: 'Chief Master Diagnostic Technician',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop',
    heroAlt: 'Showroom Atelier Diagnostic Stage',
    secondaryImg1: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
    secondaryImg2: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=800&auto=format&fit=crop',
    details: [
      { label: '150-Point Technical Audit', desc: 'Comprehensive acoustic, electronic, and structural diagnostic baseline.' },
      { label: '100% Verified Provenance', desc: 'Verified single or low-owner service histories with complete maintenance records.' },
      { label: 'Factory Diagnostic Calibration', desc: 'Pre-delivery software updates, wheel alignment, and full fluid service completed.' },
    ],
  },
  heritage: {
    id: 'heritage',
    tabLabel: 'Provenance & Sourcing',
    tag: 'Vehicle Sourcing & Lineage',
    location: 'Global Sourcing Network • Private Collections',
    heading: 'Curating Vehicles with Documented Lineage.',
    subheading: 'Accessing off-market allocations, rare configurations, and immaculate pre-owned editions.',
    p1: 'Founded on an uncompromising passion for automotive excellence, our dealership specializes in sourcing verified pre-owned gems, rare specification builds, and performance models with unbroken service provenance.',
    p2: 'Through an extensive network of private collectors, premier corporate fleets, and verified dealer exchanges, we secure off-market vehicles matching our clients\' exact criteria.',
    quote: '"True confidence begins with provenance. We trace every vehicle back to its delivery day and stand behind its history."',
    author: 'Director of Vehicle Acquisition',
    heroImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1600&auto=format&fit=crop',
    heroAlt: 'Dealership Heritage Showcase Vault',
    secondaryImg1: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop',
    secondaryImg2: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800&auto=format&fit=crop',
    details: [
      { label: 'Chassis & Title Verification', desc: 'Clear titles guaranteed with zero accidental damage or mileage discrepancies.' },
      { label: 'Bespoke Sourcing Requests', desc: 'Custom search mandates for rare colors, specific packages, and special editions.' },
      { label: 'Transparent Market Valuation', desc: 'Fair, data-backed vehicle pricing aligned with real-time auction and retail benchmarks.' },
    ],
  },
  stewardship: {
    id: 'stewardship',
    tabLabel: 'Client Stewardship',
    tag: 'White-Glove Handover & Care',
    location: 'Enclosed Logistics • Nationwide Delivery',
    heading: 'Client Partnerships Built for the Long Run.',
    subheading: 'White-glove handover, custom financing, and ongoing ownership support.',
    p1: 'Acquiring your vehicle is only the start of our relationship. We oversee enclosed door-to-door transport, tailored auto financing, fast insurance binding, and priority trade-in appraisal when you are ready for your next vehicle.',
    p2: 'Our private logistics fleet delivers vehicles directly to your residence, business, or track facility in spotless condition with all documentation finalized.',
    quote: '"Our commitment does not conclude when the keys are handed over. That is where lifetime client care begins."',
    author: 'Head of Client Experience',
    heroImage: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1600&auto=format&fit=crop',
    heroAlt: 'Showroom Delivery & Handover Lounge',
    secondaryImg1: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
    secondaryImg2: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800&auto=format&fit=crop',
    details: [
      { label: 'Enclosed Doorstep Delivery', desc: 'Climate-controlled nationwide transport straight to your home or office.' },
      { label: 'Dedicated Account Specialist', desc: 'One point of contact for service scheduling, accessories, and warranty support.' },
      { label: 'Guaranteed Trade-In Buyback', desc: 'Transparent trade valuation with equity rollover toward your next upgrade.' },
    ],
  },
};

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    iconName: 'car',
    tag: 'Sales & Acquisition',
    title: 'Certified Vehicle Sales',
    description: 'Browse our curated collection of certified pre-owned and delivery-mileage premium vehicles, each fully inspected and road-ready.',
    features: ['150-Point Diagnostic Certification', 'CarFax / AutoCheck Complete Report', 'Clean Title Guarantee'],
  },
  {
    id: 'srv-2',
    iconName: 'search',
    tag: 'Bespoke Sourcing',
    title: 'Bespoke Vehicle Sourcing',
    description: 'Can’t find the exact specification you want? Our acquisition team leverages nationwide dealer and collector networks to locate your dream car.',
    features: ['Exact Color & Option Matching', 'Off-Market Inventory Access', 'Pre-Purchase Inspection Included'],
  },
  {
    id: 'srv-3',
    iconName: 'banknote',
    tag: 'Finance & Leasing',
    title: 'Tailored Auto Financing',
    description: 'Competitive finance rates, flexible loan terms from 24 to 84 months, and rapid pre-approval with leading automotive lending partners.',
    features: ['Instant Pre-Qualification', 'Custom Down Payment Terms', 'Lease & Purchase Options'],
  },
  {
    id: 'srv-4',
    iconName: 'sparkles',
    tag: 'Trade-In Valuation',
    title: 'Trade-In Valuation & Upgrade',
    description: 'Get top-dollar market value for your current vehicle with same-day appraisal and seamless equity rollover toward any showroom model.',
    features: ['Live Market-Value Appraisal', 'Instant Equity Transfer', 'Hassle-Free Title Transfer'],
  },
  {
    id: 'srv-5',
    iconName: 'shield',
    tag: 'Extended Protection',
    title: 'Extended Warranty & Protection',
    description: 'Comprehensive mechanical coverage, roadside assistance, ceramic paint protection, and wheel/tire safeguards for total peace of mind.',
    features: ['Up to 5-Year Powertrain Warranty', '24/7 Roadside Assistance', 'Nationwide Service Acceptance'],
  },
  {
    id: 'srv-6',
    iconName: 'truck',
    tag: 'White-Glove Delivery',
    title: 'White-Glove Enclosed Delivery',
    description: 'Nationwide enclosed transport ensures your newly acquired vehicle arrives at your doorstep in pristine, ready-to-drive condition.',
    features: ['Enclosed Transport Carriers', 'Real-Time GPS Tracking', 'Direct-to-Driveway Handover'],
  },
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Alexander Mitchell',
    role: 'Private Collector & Entrepreneur',
    vehicle: 'Porsche 911 GT3 RS',
    city: 'San Francisco, CA',
    rating: 5,
    quote: 'The digital showroom experience was completely transparent. The 150-point inspection document and high-definition video walkthrough gave me total confidence. The enclosed delivery arrived right on schedule.',
  },
  {
    id: 'test-2',
    name: 'Sarah Jenkins',
    role: 'Managing Director',
    vehicle: 'Porsche Taycan Turbo S',
    city: 'Austin, TX',
    rating: 5,
    quote: 'Trading in my previous SUV and securing financing took under an hour via WhatsApp. The team valued my trade generously and delivered the EV fully charged to my driveway.',
  },
  {
    id: 'test-3',
    name: 'Vikram Malhotra',
    role: 'Architect & Design Director',
    vehicle: 'BMW M8 Competition Coupe',
    city: 'Chicago, IL',
    rating: 5,
    quote: 'Impeccable attention to detail. No pushy sales tactics, just honest mechanical knowledge, pristine paintwork, and a handover experience that felt like an executive private lounge.',
  },
];

export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Diagnostic Inspection Bay',
    subtitle: '150-Point Technical Verification',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&auto=format&fit=crop',
    category: 'Atelier',
  },
  {
    id: 'gal-2',
    title: 'Main Showroom Floor',
    subtitle: 'Climate-Controlled Exhibition',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200&auto=format&fit=crop',
    category: 'Showroom',
  },
  {
    id: 'gal-3',
    title: 'Cockpit & Leather Craftsmanship',
    subtitle: 'Interior Detail & Sanitization',
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200&auto=format&fit=crop',
    category: 'Details',
  },
  {
    id: 'gal-4',
    title: 'Client Handover Lounge',
    subtitle: 'Private Key Ceremony',
    image: 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200&auto=format&fit=crop',
    category: 'Experience',
  },
  {
    id: 'gal-5',
    title: 'Electric Architecture Stage',
    subtitle: 'EV Diagnostics & Battery Health',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop',
    category: 'Technology',
  },
  {
    id: 'gal-6',
    title: 'Enclosed Nationwide Logistics',
    subtitle: 'White-Glove Doorstep Transport',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1200&auto=format&fit=crop',
    category: 'Logistics',
  },
];
