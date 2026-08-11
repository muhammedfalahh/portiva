/**
 * =============================================================================
 * PORTIVA: LuxeUniversal — Premium Editorial E-Commerce Landing Page Template
 * =============================================================================
 *
 * A clean, modern, editorial e-commerce landing page template designed for
 * universal product categories — fashion, watches, electronics, beauty,
 * home decor, accessories, jewelry, skincare, and beyond.
 *
 * Design Philosophy:
 *   - Clean, warm-neutral editorial aesthetic
 *   - Generous whitespace and balanced typography
 *   - Soft rounded corners and subtle shadows
 *   - Premium product cards with elegant hover effects
 *   - Minimal visual clutter with maximum impact
 *   - Inspired by leading premium e-commerce experiences
 *
 * Architecture:
 *   - 100% Theme System Integration (bg-theme-*, text-theme-*, border-theme-*)
 *   - Dynamic product management via VisualBuilderContext ('luxe-products' block)
 *   - Hard-capped at 8 visible products per template instance
 *   - VisualBuilderContext integration for inline block updates
 *
 * Sections:
 *   1. Sticky Navbar
 *   2. Editorial Hero (Converse backdrop slider)
 *   3. Curated Promo Cards
 *   4. Featured Products (dynamic, max 8)
 *   5. Promotional Bento Grid
 *   6. Why Choose Us
 *   7. Customer Reviews
 *   8. FAQ Accordion
 *   9. Newsletter
 *  10. Contact / Get in Touch
 *  11. Premium Footer
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Star,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Search,
  Menu,
  X,
  ArrowRight,
  ArrowUp,
  Eye,
  Truck,
  ShieldCheck,
  RotateCcw,
  Award,
  Heart,
  Package,
  Send,
  Mail,
  Phone,
  MapPin,
  Plus,
  Check,
  Sparkles,
  MessageCircle,
  Share2,
  Navigation,
  ExternalLink,
  Quote,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  discountPrice?: string;
  discountBadge?: string;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'NEW' | 'BEST SELLER' | 'LIMITED EDITION' | 'SALE' | string;
  tags?: string[];
  ctaText?: string;
  ctaLink?: string;
  hidden?: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  role?: string;
  image: string;
  rating: number;
  review: string;
  verified?: boolean;
  purchasedProduct?: string;
}

export interface ContactCardItem {
  id: string;
  type: 'whatsapp' | 'instagram' | 'x' | 'googlemaps' | 'phone' | 'address' | 'email';
  title: string;
  value: string;
  link?: string;
  description?: string;
  hidden?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface LuxeUniversalProps {
  brandName?: string;
  navItems?: { label: string; href: string }[];
  heroBadge?: string;
  heroHeadline?: string;
  heroSubtitle?: string;
  heroDescription?: string;
  heroImage?: string;
  heroPrimaryCta?: string;
  heroSecondaryCta?: string;
  trustPillars?: { title: string; description: string; icon: string }[];
  products?: ProductItem[];
  reviews?: ReviewItem[];
  faqs?: FAQItem[];
  navbarBg?: 'transparent' | 'surface' | 'glass';
  hoverStyle?: 'color' | 'underline' | 'pill' | 'border-bottom';
}

// ─── Default Data ───────────────────────────────────────────────────────────

const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Classic Gazelle Collection',
    description: 'Classic indoor-ready Gazelle with premium suede upper, earthy tones, and signature contrast stripes.',
    price: '$229.96',
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-2',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Muted Green Edition',
    description: 'Sleek Gazelle Indoor in muted green with crisp black/white accents and gum outsole.',
    price: '$329.96',
    rating: 5.0,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-3',
    name: 'Zoom Vomero',
    subtitle: 'Green/Purple Colorway',
    description: 'Bold Zoom Vomero 5 runner with eye-catching green/purple colorway, breathable mesh upper, and dual Zoom Air cushioning.',
    price: '$169.99',
    rating: 4.8,
    reviewCount: 210,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-4',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Vintage Suede Edition',
    description: 'Classic indoor-ready Gazelle with premium suede upper, crisp black/white contrast stripes, and timeless retro appeal.',
    price: '$219.96',
    rating: 4.9,
    reviewCount: 76,
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-5',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Subtle Muted Gum',
    description: 'Sleek Gazelle Indoor in subtle muted green with crisp black/white accents and gum outsole.',
    price: '$249.96',
    rating: 4.7,
    reviewCount: 53,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-6',
    name: 'Zoom Vomero',
    subtitle: 'Navy/Blue Colorway',
    description: 'Bold Zoom Vomero runner featuring breathable mesh upper, eye-catching navy/blue colorway.',
    price: '$169.99',
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-7',
    name: 'Zoom Vomero',
    subtitle: 'Light Bone/Cream',
    description: 'Premium Zoom Vomero runner featuring breathable mesh upper and light bone/cream accents.',
    price: '$189.96',
    rating: 4.8,
    reviewCount: 95,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
  {
    id: 'prod-8',
    name: 'Gazelle Indoor Shoes',
    subtitle: 'Triple White Edition',
    description: 'Minimalist Gazelle Indoor in pristine white leather with subtle contrast stitching and durable rubber sole.',
    price: '$199.96',
    rating: 4.9,
    reviewCount: 118,
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop',
    badge: "Men's Sneakers",
    ctaText: 'Buy Now',
  },
];

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Julian Vance',
    role: 'Architect & Collector',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review: 'The build quality is unlike anything else. From packaging to performance, every single detail radiates craftsmanship and care.',
    verified: true,
    purchasedProduct: 'Verified Purchase • Gazelle Indoor Suede',
  },
  {
    id: 'rev-2',
    name: 'Sophia Laurent',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review: 'An absolute masterpiece of minimalism and luxury. Delivery was swift with beautiful white-glove packaging.',
    verified: true,
    purchasedProduct: 'Verified Purchase • Samba OG Triple White',
  },
  {
    id: 'rev-3',
    name: 'Marcus Thorne',
    role: 'Product Designer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review: 'I examine design details for a living. The proportions, finishing, and comfort on these sneakers are simply flawless.',
    verified: true,
    purchasedProduct: 'Verified Purchase • Zoom Vomero Runner',
  },
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is your shipping policy?',
    answer: 'We offer complimentary worldwide shipping on all orders. Standard delivery takes 3–5 business days, with express options available at checkout.',
  },
  {
    id: 'faq-2',
    question: 'Can I return or exchange my purchase?',
    answer: 'Yes, we offer a 30-day hassle-free return policy. If you are not satisfied, return shipping is complimentary and refunds are processed within 48 hours.',
  },
  {
    id: 'faq-3',
    question: 'What warranty do you provide?',
    answer: 'All products come with a comprehensive 2-year warranty covering manufacturing defects and material quality issues.',
  },
  {
    id: 'faq-4',
    question: 'Are my payment details secure?',
    answer: 'Absolutely. All transactions are processed through bank-grade 256-bit SSL encryption with PCI-DSS Level 1 compliance.',
  },
  {
    id: 'faq-5',
    question: 'How can I track my order?',
    answer: 'Once your order ships, you will receive a confirmation email with a tracking number and real-time delivery updates.',
  },
];

export const DEFAULT_CONTACT_CARDS: ContactCardItem[] = [
  {
    id: 'card-1',
    type: 'whatsapp',
    title: 'WhatsApp Support',
    value: '+1 (555) 123-4567',
    link: 'https://wa.me/15551234567',
    description: 'Instant chat assistance with customer care',
    hidden: false,
  },
  {
    id: 'card-2',
    type: 'instagram',
    title: 'Instagram',
    value: '@ourbrand',
    link: 'https://instagram.com',
    description: 'Follow our official handle for new drops',
    hidden: false,
  },
  {
    id: 'card-3',
    type: 'x',
    title: 'X.com (Twitter)',
    value: '@ourbrand',
    link: 'https://x.com',
    description: 'Latest updates & community announcements',
    hidden: false,
  },
  {
    id: 'card-4',
    type: 'googlemaps',
    title: 'Google Maps Location',
    value: '123 Premium Ave, NY 10001',
    link: 'https://maps.google.com',
    description: 'Find directions to our flagship store',
    hidden: false,
  },
  {
    id: 'card-5',
    type: 'phone',
    title: 'Phone Support',
    value: '+1 (555) 000-0000',
    link: 'tel:+15550000000',
    description: 'Mon - Fri, 9am - 6pm EST',
    hidden: false,
  },
  {
    id: 'card-6',
    type: 'email',
    title: 'Email Us',
    value: 'hello@example.com',
    link: 'mailto:hello@example.com',
    description: 'We reply within 24 business hours',
    hidden: false,
  },
  {
    id: 'card-7',
    type: 'address',
    title: 'Flagship Address',
    value: '123 Premium Avenue, Suite 100',
    link: '#',
    description: 'New York, NY 10001',
    hidden: false,
  },
];



const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const HandshakeIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2-2" />
    <path d="m14 14 2.5 2.5" />
    <path d="M12.5 12.5 15 15" />
    <path d="M10 10 7.5 7.5" />
    <path d="m7 11 2 2a1 1 0 0 0 1.4 0l1.9-1.9" />
    <path d="M2 18 8 12" />
    <path d="m17 7 5 5" />
    <path d="m17.5 11.5 2.5-2.5" />
  </svg>
);

const PeopleIllustration: React.FC<{ className?: string }> = ({ className = 'w-full h-auto' }) => (
  <svg className={className} viewBox="0 0 300 160" fill="none">
    <path d="M45 160V120C45 108 54 100 65 100H85C96 100 105 108 105 120V160" fill="#E52B2B" />
    <circle cx="75" cy="70" r="22" fill="#F7F4EB" stroke="#1A1A1A" strokeWidth="3" />
    <path d="M55 58C60 52 70 50 78 52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="68" cy="68" r="2.5" fill="#1A1A1A" />
    <circle cx="82" cy="68" r="2.5" fill="#1A1A1A" />
    <path d="M68 80C72 84 78 84 82 80" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M45 115L30 85M30 85L22 92" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

    <path d="M115 160V110C115 98 124 90 135 90H165C176 90 185 98 185 110V160" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
    <circle cx="150" cy="60" r="24" fill="#F7F4EB" stroke="#1A1A1A" strokeWidth="3" />
    <path d="M132 46C140 40 155 40 165 44" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="142" cy="58" r="2.5" fill="#1A1A1A" />
    <circle cx="158" cy="58" r="2.5" fill="#1A1A1A" />
    <path d="M142 70C148 76 154 76 158 70" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <path d="M185 105L202 75M202 75L210 82" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

    <path d="M195 160V120C195 108 204 100 215 100H235C246 100 255 108 255 120V160" fill="#0A3C2F" />
    <circle cx="225" cy="72" r="22" fill="#F7F4EB" stroke="#1A1A1A" strokeWidth="3" />
    <path d="M210 60C215 54 228 54 235 58" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
    <circle cx="218" cy="70" r="2.5" fill="#1A1A1A" />
    <circle cx="232" cy="70" r="2.5" fill="#1A1A1A" />
    <path d="M218 82C222 85 228 85 232 82" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M255 115L270 90M270 90L278 98" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

function getContactCardTypeDetails(type: string) {
  switch (type) {
    case 'whatsapp':
      return {
        icon: MessageCircle,
        label: 'WhatsApp',
        badgeBg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
        hoverBorder: 'hover:border-emerald-500/40',
      };
    case 'instagram':
      return {
        icon: InstagramIcon,
        label: 'Instagram',
        badgeBg: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
        hoverBorder: 'hover:border-pink-500/40',
      };
    case 'x':
      return {
        icon: Share2,
        label: 'X.com',
        badgeBg: 'bg-sky-500/10 text-sky-600 border-sky-500/20',
        hoverBorder: 'hover:border-sky-500/40',
      };
    case 'googlemaps':
      return {
        icon: Navigation,
        label: 'Google Maps',
        badgeBg: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
        hoverBorder: 'hover:border-amber-500/40',
      };
    case 'phone':
      return {
        icon: Phone,
        label: 'Phone',
        badgeBg: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
        hoverBorder: 'hover:border-blue-500/40',
      };
    case 'address':
      return {
        icon: MapPin,
        label: 'Address',
        badgeBg: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
        hoverBorder: 'hover:border-purple-500/40',
      };
    case 'email':
    default:
      return {
        icon: Mail,
        label: 'Email',
        badgeBg: 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20',
        hoverBorder: 'hover:border-indigo-500/40',
      };
  }
}

interface HeroSlideItem {
  id: string;
  badge: string;
  headline: string;
  image: string;
  alt: string;
}

const DEFAULT_HERO_SLIDES: HeroSlideItem[] = [
  {
    id: 'slide-1',
    badge: 'NEW COLLECTION / 2026',
    headline: 'Sneakers That\nDefy Your Every\nday Look',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
    alt: 'Premium retro high-top sneakers on model, squatting stance',
  },
  {
    id: 'slide-2',
    badge: 'LIMITED CO-LAB / MAISON',
    headline: 'Crafted for Comfort,\nDesigned for\nTimeless Elegance',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1200&auto=format&fit=crop',
    alt: 'Classic vintage yellow sneakers close up',
  },
  {
    id: 'slide-3',
    badge: 'ESTABLISHED CLASSIC / 1990',
    headline: 'Step Into\na World of\nEndless Style',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop',
    alt: 'Minimalist designer shoes on warm background',
  }
];

// ─── Animation Presets ──────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' as any },
  transition: { duration: 0.55, ease: 'easeOut' as const },
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

// ─── Main Component ─────────────────────────────────────────────────────────

export const LuxeUniversal: React.FC<LuxeUniversalProps> = ({
  brandName = 'MAISON',
  navItems = [
    { label: 'Shop', href: '#products' },
    { label: 'About', href: '#why-us' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  heroHeadline = 'Elegance in Every Detail',
  heroSubtitle = 'Premium products curated for those who appreciate quality, craftsmanship, and timeless design.',
  heroImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
  heroPrimaryCta = 'Shop Collection',
  heroSecondaryCta = 'Learn More',
  reviews,
  faqs,
}) => {
  // ── Visual Builder Context ──────────────────────────────────────────────
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {
    // Safe fallback when rendered outside provider
  }

  const activeButtonOverrides: Record<string, ButtonOverride> = builderCtx?.templateData?.buttonOverrides || {};
  const isEditMode = builderCtx?.mode === 'EDITING';

  const reviewsList = reviews && reviews.length > 0 ? reviews : DEFAULT_REVIEWS;
  const faqsList = faqs && faqs.length > 0 ? faqs : DEFAULT_FAQS;

  // ── State ───────────────────────────────────────────────────────────────
  const [productList] = useState<ProductItem[]>(DEFAULT_PRODUCTS);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [whyUsSlideIndex, setWhyUsSlideIndex] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // ── Contact Cards Sync from VisualBuilderContext ───────────────────────
  const contactBlock = builderCtx?.templateData?.blocks?.find((b) => b.id === 'luxe-contact');
  const contactCardsFromStore: ContactCardItem[] | null =
    contactBlock?.content?.cards && Array.isArray(contactBlock.content.cards)
      ? contactBlock.content.cards
      : null;

  const rawContactCards = contactCardsFromStore || DEFAULT_CONTACT_CARDS;
  const visibleContactCards = useMemo(() => {
    return rawContactCards.filter((c) => !c.hidden);
  }, [rawContactCards]);

  // ── Product Sync from VisualBuilderContext ──────────────────────────────
  const prodBlock = builderCtx?.templateData?.blocks?.find((b) => b.id === 'luxe-products');
  const productsFromStore: ProductItem[] | null =
    prodBlock?.content?.products && Array.isArray(prodBlock.content.products)
      ? prodBlock.content.products
      : null;
  const layoutModeFromStore: string | null = prodBlock?.content?.layoutMode || null;

  const rawProducts = productsFromStore || productList;
  const layoutMode = (layoutModeFromStore as 'grid' | 'bento' | 'carousel' | 'spotlight') || 'grid';

  // Hard-capped at maximum 6 visible products for 3x2 grid reflow
  const visibleProducts = useMemo(() => {
    return rawProducts.filter((p) => !p.hidden).slice(0, 6);
  }, [rawProducts]);

  // Responsive grid class
  const productGridClass = useMemo(() => {
    const count = visibleProducts.length;
    if (layoutMode === 'spotlight' || count === 1) {
      return 'grid grid-cols-1 max-w-xl mx-auto';
    }
    if (count === 2) {
      return 'grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto';
    }
    if (count === 3 || count === 6) {
      return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6';
    }
    return 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';
  }, [visibleProducts.length, layoutMode]);

  // ── Scroll Effects ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 600);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Canvas Editor Viewport Helper for Quick View Modal ──────────────────
  const [scrollOffset, setScrollOffset] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isCanvasEditor, setIsCanvasEditor] = useState(false);

  useEffect(() => {
    if (!selectedProduct) return;

    const updatePosition = () => {
      const container = document.querySelector('.canvas-container');
      if (container) {
        setIsCanvasEditor(true);
        setScrollOffset(container.scrollTop);
        setContainerHeight(container.clientHeight);
      } else {
        setIsCanvasEditor(false);
      }
    };

    updatePosition();

    const container = document.querySelector('.canvas-container') || window;
    container.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition, { passive: true });

    return () => {
      container.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [selectedProduct]);

  // ── Toast Notification ─────────────────────────────────────────────────
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ── Contact Form Submit ────────────────────────────────────────────────
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  // ═════════════════════════════════════════════════════════════════════════
  // JSX RENDER
  // ═════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen w-full bg-theme-background text-theme-foreground overflow-x-hidden flex flex-col items-center relative">

      {/* ── SCROLL PROGRESS BAR ──────────────────────────────────────── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent">
        <div
          className="h-full bg-theme-primary/60 transition-[width] duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── TOAST NOTIFICATION ───────────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[70] bg-theme-foreground text-theme-background px-5 py-2.5 rounded-full text-sm font-medium shadow-lg flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>



      {/* ════════════════════════════════════════════════════════════════
          SECTION 2: STICKY NAVBAR
          ════════════════════════════════════════════════════════════ */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-theme-surface/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] border-b border-theme-border/40 text-theme-foreground'
            : 'bg-transparent text-white'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 py-3.5 flex lg:grid lg:grid-cols-3 items-center justify-between">
          {/* Column 1: Brand Logo + Brand Name */}
          <div className="flex items-center gap-2.5 justify-start min-w-0">
            <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 flex items-center justify-center bg-black/40 shadow-sm">
              <EditableImage
                id="luxe-brand-logo"
                imageKey="luxe-navbar-logo"
                defaultSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop"
                alt="Brand Logo"
                containerClassName="w-8 h-8 rounded-full overflow-hidden shrink-0"
                className="w-full h-full object-cover rounded-full"
                objectFit="cover"
              />
            </div>
            <EditableElement
              as="span"
              id="luxe-brand"
              field="brandName"
              value={brandName}
              type="heading"
              className={`text-xl font-bold tracking-tight transition-colors duration-300 truncate ${
                scrolled ? 'text-theme-foreground' : 'text-[#FBF9F6]'
              }`}
            />
          </div>

          {/* Column 2: Desktop Navigation (Perfectly centered in the middle of the navbar) */}
          <div className="hidden lg:flex items-center justify-center gap-8">
            {navItems.map((item, idx) => (
              <EditableElement
                key={idx}
                as="a"
                id="luxe-navbar-item"
                field={`navItem${idx}`}
                value={item.label}
                type="text"
                href={isEditMode ? undefined : item.href}
                onClick={(e: React.MouseEvent) => {
                  if (isEditMode) e.preventDefault();
                }}
                className={`text-[13px] font-medium relative whitespace-nowrap ${
                  isEditMode
                    ? 'cursor-pointer border-b border-transparent hover:border-accent/40'
                    : `transition-colors duration-300 after:absolute after:bottom-[-2px] after:left-0 after:h-[1.5px] after:w-0 hover:after:w-full after:transition-all after:duration-300 ${
                        scrolled
                          ? 'after:bg-theme-primary text-theme-muted hover:text-theme-foreground'
                          : 'after:bg-white text-[#EFECE8] hover:text-white'
                      }`
                } ${scrolled ? 'text-theme-muted' : 'text-[#EFECE8]'}`}
              />
            ))}
          </div>

          {/* Column 3: Right Header Action Area */}
          <div className="flex items-center justify-end gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-theme-foreground' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden bg-theme-surface border-t border-theme-border/40 overflow-hidden"
            >
              <div className="px-6 py-5 flex flex-col gap-1">
                {navItems.map((item, idx) => (
                  <EditableElement
                    key={idx}
                    as="a"
                    id="luxe-navbar-item-mobile"
                    field={`navItem${idx}`}
                    value={item.label}
                    type="text"
                    href={isEditMode ? undefined : item.href}
                    onClick={(e: React.MouseEvent) => {
                      if (isEditMode) e.preventDefault();
                      else setIsMobileMenuOpen(false);
                    }}
                    className="text-sm font-medium text-theme-foreground py-2.5 border-b border-theme-border/30 hover:text-theme-primary transition-colors cursor-pointer"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3: EDITORIAL HERO (Converse-Inspired Redesign)
          ════════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        className="w-full h-screen min-h-[600px] relative overflow-hidden flex flex-col justify-between -mt-[68px] pt-[68px]"
      >
        {/* Carousel Backdrop Images (Fully Editable background images per slide) */}
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHeroSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="absolute inset-0 cursor-pointer"
            >
              {/* Premium dark gradient overlay for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/40 to-black/10 sm:from-black/75 sm:via-black/45 sm:to-transparent pointer-events-none z-0" />

              <EditableImage
                id={`luxe-hero-slide-${activeHeroSlide}-image`}
                imageKey={`luxe-hero-slide-${activeHeroSlide}-image`}
                defaultSrc={DEFAULT_HERO_SLIDES[activeHeroSlide].image}
                defaultAlt={DEFAULT_HERO_SLIDES[activeHeroSlide].alt}
                containerClassName="w-full h-full absolute inset-0 cursor-pointer pointer-events-auto z-10"
                className="w-full h-full object-cover"
                objectFit="cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Content (Floating over backdrop - pointer-events-none allows backdrop click selection) */}
        <div className="max-w-7xl w-full mx-auto px-6 flex-1 flex items-center relative z-20 select-none pointer-events-none">
          <div className="w-full max-w-3xl pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHeroSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col items-start gap-5 sm:gap-6 pointer-events-none"
              >
                <div className="pointer-events-auto">
                  <EditableElement
                    as="span"
                    id={DEFAULT_HERO_SLIDES[activeHeroSlide].id}
                    field="badge"
                    value={DEFAULT_HERO_SLIDES[activeHeroSlide].badge}
                    type="text"
                    className="text-[11px] font-semibold tracking-widest text-[#F5EFE6]/80 uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-sm cursor-pointer"
                  />
                </div>

                <div className="pointer-events-auto">
                  <EditableElement
                    as="h1"
                    id={DEFAULT_HERO_SLIDES[activeHeroSlide].id}
                    field="headline"
                    value={DEFAULT_HERO_SLIDES[activeHeroSlide].headline}
                    type="heading"
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#FBF9F6] font-bold tracking-tight leading-[1.08] drop-shadow-sm whitespace-pre-line cursor-pointer"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2 pointer-events-auto">
                  <EditableButton
                    buttonKey={`luxe_hero_slide_${activeHeroSlide}_btn`}
                    defaultText="View Store"
                    defaultHref="#products"
                    className="bg-[#F5EFE6] text-[#2A2927] hover:bg-white text-sm font-semibold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg flex items-center gap-2 cursor-pointer"
                  >
                    <span>{activeButtonOverrides[`luxe_hero_slide_${activeHeroSlide}_btn`]?.text || 'View Store'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </EditableButton>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Floating Carousel Navigation (Anchored bottom right relative to screen/section) */}
        <div className="absolute bottom-20 right-6 sm:bottom-24 sm:right-12 flex items-center gap-3 z-20">
          {/* Circular indicator */}
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full border border-white/20 text-white text-xs font-semibold select-none bg-black/20 backdrop-blur-sm shadow-md">
            <span className="relative z-10">0{activeHeroSlide + 1}</span>
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.5"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="transparent"
                stroke="white"
                strokeWidth="1.5"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - (activeHeroSlide + 1) / 3)}
                className="transition-all duration-300"
              />
            </svg>
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => setActiveHeroSlide((prev) => (prev === 0 ? 2 : prev - 1))}
            className="w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition cursor-pointer border border-white/10 shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setActiveHeroSlide((prev) => (prev === 2 ? 0 : prev + 1))}
            className="w-11 h-11 rounded-full bg-black/80 hover:bg-black text-white flex items-center justify-center transition cursor-pointer border border-white/10 shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Anchored Trust Bar (Translucent backdrop at bottom of screen - clean editable text pillars) */}
        <div className="w-full bg-black/35 backdrop-blur-sm py-4 border-t border-white/10 z-10 relative">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-6 text-xs font-medium text-white/80">
            {/* Trust Pillar 1 */}
            <EditableElement
              as="span"
              id="luxe-trust-pillar-0"
              field="text"
              value="Complimentary Worldwide Delivery"
              type="text"
              className="text-xs font-medium text-white/90 tracking-wide"
            />

            {/* Trust Pillar 2 */}
            <EditableElement
              as="span"
              id="luxe-trust-pillar-1"
              field="text"
              value="Two-Year Extended Warranty"
              type="text"
              className="text-xs font-medium text-white/90 tracking-wide"
            />

            {/* Trust Pillar 3 */}
            <EditableElement
              as="span"
              id="luxe-trust-pillar-2"
              field="text"
              value="30-Day Hassle-Free Returns"
              type="text"
              className="text-xs font-medium text-white/90 tracking-wide"
            />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3.5: CURATED EDITORIAL PROMO CARDS (Converse-Inspired 1:1 Redesign)
          ════════════════════════════════════════════════════════════ */}
      <section id="promo-cards" className="w-full max-w-7xl px-6 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 — Puma */}
          <div className="relative rounded-[32px] overflow-hidden h-[580px] p-8 flex flex-col justify-between group border border-theme-border/20 shadow-sm">
            {/* Background Image backdrop */}
            <div className="absolute inset-0 w-full h-full z-0 select-none">
              <EditableImage
                imageKey="luxe-newsection-card1-bg"
                defaultSrc="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
                defaultAlt="Card 1 background sneaker"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 z-10 pointer-events-none" />

            {/* Top Brand Logo */}
            <div className="relative z-20 mx-auto w-12 h-6 flex items-center justify-center invert opacity-80 group-hover:opacity-100 transition-opacity">
              <EditableImage
                imageKey="luxe-brand-logo-1"
                defaultSrc="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/puma.svg"
                defaultAlt="Puma Logo"
                className="w-full h-full object-contain"
                objectFit="contain"
              />
            </div>

            {/* Bottom Copy */}
            <div className="relative z-20 flex flex-col items-start gap-2">
              <EditableElement
                as="h3"
                id="luxe-newsection-card1-title"
                field="title"
                value="PUMA CLASSICS"
                type="heading"
                className="text-[#FBF9F6] text-xl font-bold tracking-tight"
              />
              <EditableElement
                as="p"
                id="luxe-newsection-card1-desc"
                field="description"
                value="Comfortable, durable, and always in style. Engineered for everyday movement."
                type="text"
                className="text-[#EFECE8]/80 text-xs leading-relaxed max-w-[260px]"
              />
            </div>
          </div>

          {/* Card 2 — Nike / Adidas */}
          <div className="relative rounded-[32px] overflow-hidden h-[580px] p-8 flex flex-col justify-between group border border-theme-border/20 shadow-sm">
            {/* Background Image backdrop */}
            <div className="absolute inset-0 w-full h-full z-0 select-none">
              <EditableImage
                imageKey="luxe-newsection-card2-bg"
                defaultSrc="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop"
                defaultAlt="Card 2 background sneaker"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 z-10 pointer-events-none" />

            {/* Top Brand Logo */}
            <div className="relative z-20 mx-auto w-12 h-6 flex items-center justify-center invert opacity-80 group-hover:opacity-100 transition-opacity">
              <EditableImage
                imageKey="luxe-brand-logo-2"
                defaultSrc="https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nike.svg"
                defaultAlt="Nike Logo"
                className="w-full h-full object-contain"
                objectFit="contain"
              />
            </div>

            {/* Bottom Copy */}
            <div className="relative z-20 flex flex-col items-start gap-2">
              <EditableElement
                as="h3"
                id="luxe-newsection-card2-title"
                field="title"
                value="NIKE SELECTS"
                type="heading"
                className="text-[#FBF9F6] text-xl font-bold tracking-tight"
              />
              <EditableElement
                as="p"
                id="luxe-newsection-card2-desc"
                field="description"
                value="Fresh drops and iconic retro silhouettes designed to stand the test of time."
                type="text"
                className="text-[#EFECE8]/80 text-xs leading-relaxed max-w-[260px]"
              />
            </div>
          </div>

          {/* Card 3 — Style-Stack */}
          <div className="relative rounded-[32px] overflow-hidden h-[580px] p-8 flex flex-col justify-between group border border-theme-border/20 shadow-sm">
            {/* Background Image backdrop */}
            <div className="absolute inset-0 w-full h-full z-0 select-none">
              <EditableImage
                imageKey="luxe-newsection-card3-bg"
                defaultSrc="https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=800&auto=format&fit=crop"
                defaultAlt="Card 3 background style-stack"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/15 z-10 pointer-events-none" />

            {/* Spacer for top layout alignment */}
            <div className="w-full h-6" />

            {/* Bottom Copy */}
            <div className="relative z-20 flex flex-col items-start gap-2">
              <EditableElement
                as="h3"
                id="luxe-newsection-card3-title"
                field="title"
                value="STYLE-STACK"
                type="heading"
                className="text-[#FBF9F6] text-xl font-bold tracking-tight"
              />
              <EditableElement
                as="p"
                id="luxe-newsection-card3-desc"
                field="description"
                value="Elevate your streetwear collection with timeless, premium sneaker designs."
                type="text"
                className="text-[#EFECE8]/80 text-xs leading-relaxed max-w-[260px]"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4: FEATURED PRODUCTS (Dynamic, Max 8)
          ════════════════════════════════════════════════════════════ */}
      <section id="products" className="w-full max-w-6xl mx-auto px-6 py-10 md:py-16">
        <motion.div {...fadeUp}>
          <div className="flex flex-col items-center justify-center mb-12 md:mb-16">
            <EditableElement
              as="h2"
              id="luxe-products"
              field="productsHeading"
              value="Newly Dropped Collections"
              type="heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center tracking-tight text-theme-foreground mb-4"
            />
            <EditableElement
              as="p"
              id="luxe-products"
              field="productsSubtitle"
              value="These sneakers drops to timeless classics, we bring you authentic kicks built for style and comfort and"
              type="text"
              className="text-xs sm:text-sm text-theme-muted/80 text-center max-w-xl mx-auto whitespace-pre-line leading-relaxed"
            />
          </div>
        </motion.div>

        {/* Carousel Layout */}
        {layoutMode === 'carousel' ? (
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
              >
                {visibleProducts.map((product) => (
                  <div key={product.id} className="w-full shrink-0 px-1">
                    <ProductCardRender
                      product={product}
                      onKnowMore={() => setSelectedProduct(product)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel Nav */}
            <button
              onClick={() => setCarouselIndex((prev) => Math.max(0, prev - 1))}
              disabled={carouselIndex === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-theme-surface/95 backdrop-blur border border-theme-border/50 text-theme-foreground flex items-center justify-center hover:bg-theme-primary hover:text-white transition disabled:opacity-30 cursor-pointer shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCarouselIndex((prev) => Math.min(visibleProducts.length - 1, prev + 1))}
              disabled={carouselIndex >= visibleProducts.length - 1}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-theme-surface/95 backdrop-blur border border-theme-border/50 text-theme-foreground flex items-center justify-center hover:bg-theme-primary hover:text-white transition disabled:opacity-30 cursor-pointer shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          /* Grid / Bento / Spotlight */
          <div className={productGridClass}>
            {visibleProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                {...staggerItem}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                className={
                  layoutMode === 'bento' && idx === 0
                    ? 'sm:col-span-2 sm:row-span-2'
                    : ''
                }
              >
                <ProductCardRender
                  product={product}
                  index={idx}
                  isBentoLead={layoutMode === 'bento' && idx === 0}
                  onKnowMore={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5: WHY CHOOSE US (3 MINIMALIST MODERN CARDS)
          ════════════════════════════════════════════════════════════ */}
      <section id="why-us" className="w-full max-w-7xl px-6 py-14 md:py-20">
        <motion.div {...fadeUp}>
          <div className="flex flex-col items-center justify-center mb-10 md:mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-mono font-bold tracking-widest uppercase mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <EditableElement
                as="span"
                id="luxe-why-us"
                field="badge"
                value="THE PORTIVA PROMISE"
                type="text"
              />
            </div>
            <EditableElement
              as="h2"
              id="luxe-why-us"
              field="heading"
              value="Why Choose Us"
              type="heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center tracking-tight text-theme-foreground mb-3"
            />
            <EditableElement
              as="p"
              id="luxe-why-us"
              field="subtitle"
              value="Uncompromising quality, seamless global delivery, and white-glove customer care."
              type="text"
              className="text-xs sm:text-sm text-theme-muted text-center max-w-xl mx-auto leading-relaxed"
            />
          </div>
        </motion.div>

        {/* 3 Minimalist Modern Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {[
            {
              id: 'shipping',
              icon: Truck,
              badge: 'GLOBAL LOGISTICS',
              title: 'Free Worldwide Express Delivery',
              desc: 'Every single order includes complimentary express insured shipping with real-time GPS tracking to over 140 countries.',
              stat: '2–4 Business Days Transit',
            },
            {
              id: 'returns',
              icon: RotateCcw,
              badge: 'HASSLE-FREE',
              title: '30-Day Easy Returns & Exchanges',
              desc: 'Try your purchase in the comfort of your home. Free returns and exchanges with zero restocking fees.',
              stat: 'Pre-paid Return Label Included',
            },
            {
              id: 'authenticity',
              icon: Award,
              badge: '100% AUTHENTIC',
              title: 'Verified Master Craftsmanship',
              desc: 'Hand-inspected by master artisans. Every sneaker arrives with a certificate of authenticity and serial verification.',
              stat: 'Serial Inspection Certificate',
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                {...staggerItem}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-theme-surface border border-theme-border/60 rounded-[32px] p-7 flex flex-col justify-between hover:border-theme-primary/40 hover:shadow-xl transition-all duration-300 min-h-[260px] group relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-theme-primary bg-theme-primary/10 border border-theme-primary/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      <EditableElement
                        as="span"
                        id="luxe-why-us"
                        field={`pillar_${pillar.id}_badge`}
                        value={pillar.badge}
                        type="text"
                      />
                    </span>
                  </div>

                  <EditableElement
                    as="h3"
                    id="luxe-why-us"
                    field={`pillar_${pillar.id}_title`}
                    value={pillar.title}
                    type="heading"
                    className="text-xl font-bold text-theme-foreground tracking-tight mb-2 group-hover:text-theme-primary transition-colors block"
                  />
                  <EditableElement
                    as="p"
                    id="luxe-why-us"
                    field={`pillar_${pillar.id}_desc`}
                    value={pillar.desc}
                    type="text"
                    className="text-xs sm:text-sm text-theme-muted leading-relaxed block"
                  />
                </div>

                <div className="pt-4 mt-6 border-t border-theme-border/50 flex items-center justify-between text-xs font-semibold text-theme-foreground/80">
                  <EditableElement
                    as="span"
                    id="luxe-why-us"
                    field={`pillar_${pillar.id}_stat`}
                    value={pillar.stat}
                    type="text"
                  />
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════════════
          SECTION 8: CUSTOMER REVIEWS (EDITORIAL & MODERN HIERARCHY)
          ════════════════════════════════════════════════════════════ */}
      <section id="reviews" className="w-full max-w-7xl px-6 py-16 md:py-24">
        <motion.div {...fadeUp}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/10 border border-theme-primary/20 text-theme-primary text-xs font-mono font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <EditableElement
                  as="span"
                  id="luxe-reviews"
                  field="badge"
                  value="Testimonials & Proof"
                  type="text"
                />
              </div>
              <EditableElement
                as="h2"
                id="luxe-reviews"
                field="heading"
                value="Loved by Collectors & Tastemakers"
                type="heading"
                className="text-3xl sm:text-4xl md:text-5xl font-serif font-black tracking-tighter text-theme-foreground mt-1"
              />
              <EditableElement
                as="p"
                id="luxe-reviews"
                field="subtitle"
                value="Read genuine feedback from our global community of footwear enthusiasts."
                type="text"
                className="text-xs sm:text-sm text-theme-muted mt-2 max-w-lg"
              />
            </div>

            {/* Metric Social Proof Badge */}
            <div className="flex items-center gap-4 bg-theme-surface border border-theme-border/60 p-4 rounded-2xl shadow-sm shrink-0">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <EditableElement
                    as="span"
                    id="luxe-reviews"
                    field="rating_score"
                    value="4.9 / 5.0"
                    type="text"
                    className="text-sm font-black text-theme-foreground ml-1.5 font-mono inline"
                  />
                </div>
                <EditableElement
                  as="span"
                  id="luxe-reviews"
                  field="rating_count_text"
                  value="Based on 1,420+ Verified Reviews"
                  type="text"
                  className="text-[11px] font-bold text-theme-muted mt-1 block"
                />
              </div>
              <div className="h-9 w-px bg-theme-border/60 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <Check className="w-4 h-4" />
                <EditableElement
                  as="span"
                  id="luxe-reviews"
                  field="verified_status_text"
                  value="100% Verified"
                  type="text"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Asymmetric Hierarchy Grid: Featured Hero Card (Left) + 2 Stacked Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Featured Hero Testimonial Card (Index 0) */}
          {reviewsList[0] && (
            <motion.div
              {...staggerItem}
              transition={{ duration: 0.45 }}
              className="lg:col-span-7 bg-theme-surface border border-theme-border/60 rounded-[32px] p-8 sm:p-10 shadow-lg relative overflow-hidden flex flex-col justify-between group hover:border-theme-primary/40 transition-all duration-300 min-h-[380px]"
            >
              {/* Background Glow Accent */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-theme-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-theme-primary/10 text-theme-primary flex items-center justify-center border border-theme-primary/20">
                    <Quote className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full uppercase flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <EditableElement
                      as="span"
                      id="luxe-reviews"
                      field={`review_${reviewsList[0].id}_product`}
                      value={reviewsList[0].purchasedProduct || 'Verified Purchase'}
                      type="text"
                    />
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array(reviewsList[0].rating || 5).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-xl sm:text-2xl font-serif font-medium leading-relaxed text-theme-foreground italic tracking-tight mb-8">
                  &ldquo;<EditableElement
                    as="span"
                    id="luxe-reviews"
                    field={`review_${reviewsList[0].id}_text`}
                    value={reviewsList[0].review}
                    type="text"
                  />&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-theme-border/60">
                <div className="flex items-center gap-4">
                  <img
                    src={reviewsList[0].image}
                    alt={reviewsList[0].name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-theme-primary/20 shadow-sm"
                  />
                  <div>
                    <EditableElement
                      as="h3"
                      id="luxe-reviews"
                      field={`review_${reviewsList[0].id}_name`}
                      value={reviewsList[0].name}
                      type="heading"
                      className="text-base font-bold text-theme-foreground tracking-tight block"
                    />
                    <EditableElement
                      as="p"
                      id="luxe-reviews"
                      field={`review_${reviewsList[0].id}_role`}
                      value={reviewsList[0].role || ''}
                      type="text"
                      className="text-xs font-semibold text-theme-muted block"
                    />
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <span className="text-[10px] font-mono uppercase font-bold text-theme-primary bg-theme-primary/10 px-3 py-1 rounded-full border border-theme-primary/20">
                    <EditableElement
                      as="span"
                      id="luxe-reviews"
                      field="featured_badge_text"
                      value="FEATURED REVIEW"
                      type="text"
                    />
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Right Column: Stacked Reviews 2 & 3 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {reviewsList.slice(1, 3).map((review, idx) => (
              <motion.div
                key={review.id}
                {...staggerItem}
                transition={{ duration: 0.45, delay: (idx + 1) * 0.1 }}
                className="bg-theme-surface border border-theme-border/50 rounded-[28px] p-7 flex flex-col justify-between hover:border-theme-primary/40 hover:shadow-md transition-all duration-300 flex-1 relative overflow-hidden group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {Array(review.rating || 5).fill(0).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-theme-muted bg-theme-background border border-theme-border/60 px-2.5 py-0.5 rounded-full">
                      <EditableElement
                        as="span"
                        id="luxe-reviews"
                        field={`review_${review.id}_product`}
                        value={review.purchasedProduct || 'Verified Buyer'}
                        type="text"
                      />
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-theme-foreground/90 font-medium leading-relaxed mb-6">
                    &ldquo;<EditableElement
                      as="span"
                      id="luxe-reviews"
                      field={`review_${review.id}_text`}
                      value={review.review}
                      type="text"
                    />&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-theme-border/50">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-xl object-cover border border-theme-border/60"
                  />
                  <div>
                    <EditableElement
                      as="p"
                      id="luxe-reviews"
                      field={`review_${review.id}_name`}
                      value={review.name}
                      type="text"
                      className="text-sm font-bold text-theme-foreground block"
                    />
                    <EditableElement
                      as="p"
                      id="luxe-reviews"
                      field={`review_${review.id}_role`}
                      value={review.role || ''}
                      type="text"
                      className="text-xs text-theme-muted block"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 9: FAQ ACCORDION
          ════════════════════════════════════════════════════════════ */}
      <section id="faq" className="w-full max-w-3xl px-6 py-14 md:py-20 mx-auto">
        <motion.div {...fadeUp}>
          <div className="text-center mb-10">
            <EditableElement
              as="h2"
              id="luxe-faq"
              field="heading"
              value="Frequently Asked Questions"
              type="heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-theme-foreground"
            />
            <EditableElement
              as="p"
              id="luxe-faq"
              field="subtitle"
              value="Everything you need to know about our products and services."
              type="text"
              className="text-sm text-theme-muted mt-3"
            />
          </div>
        </motion.div>

        <div className="flex flex-col">
          {faqsList.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <motion.div
                key={faq.id}
                {...staggerItem}
                transition={{ duration: 0.4 }}
                className="border-b border-theme-border/50"
              >
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between py-5 text-left group cursor-pointer"
                >
                  <EditableElement
                    as="span"
                    id="luxe-faq"
                    field={`faq_${faq.id}_question`}
                    value={faq.question}
                    type="text"
                    className="text-sm font-semibold text-theme-foreground pr-4 group-hover:text-theme-primary transition-colors block text-left flex-1"
                  />
                  <div className={`w-7 h-7 rounded-full border border-theme-border/60 flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen ? 'bg-theme-primary border-theme-primary rotate-180' : 'group-hover:border-theme-primary/50'}`}>
                    <ChevronDown className={`w-4 h-4 transition-colors ${isOpen ? 'text-white' : 'text-theme-muted'}`} />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <EditableElement
                        as="p"
                        id="luxe-faq"
                        field={`faq_${faq.id}_answer`}
                        value={faq.answer}
                        type="text"
                        className="text-sm text-theme-muted leading-relaxed pb-5 pr-10 block"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>



      {/* ════════════════════════════════════════════════════════════════
          SECTION 10: CONNECT & SOCIAL CHANNELS
          ════════════════════════════════════════════════════════════ */}
      <section id="contact" className="w-full max-w-6xl mx-auto px-6 py-10 md:py-16">
        <motion.div {...fadeUp}>
          <div className="flex flex-col items-center justify-center mb-10 md:mb-14 text-center">
            <EditableElement
              as="h2"
              id="luxe-contact"
              field="heading"
              value="Connect With Us"
              type="heading"
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center tracking-tight text-theme-foreground mb-4"
            />
            <EditableElement
              as="p"
              id="luxe-contact"
              field="subtitle"
              value="Reach out directly via your preferred channel, social platform, or store location."
              type="text"
              className="text-xs sm:text-sm text-theme-muted/80 text-center max-w-xl mx-auto whitespace-pre-line leading-relaxed"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-fr">
          {visibleContactCards.map((card, idx) => {
            const details = getContactCardTypeDetails(card.type);
            const Icon = details.icon;
            const styleIndex = idx % 7;

            if (styleIndex === 0) {
              return (
                <motion.a
                  key={card.id || idx}
                  href={card.link || '#'}
                  target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="md:col-span-8 bg-theme-background text-theme-foreground p-7 sm:p-9 rounded-[32px] border border-theme-border/60 flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[260px]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 bg-theme-primary text-theme-background px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-theme-background animate-pulse" />
                        <span>INSTANT CHAT • ACTIVE</span>
                      </div>
                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black tracking-tighter leading-[1.05] text-theme-primary mt-4">
                        {card.title || 'better now closer'}
                      </h3>
                      <p className="text-sm sm:text-base font-bold text-theme-foreground/90 mt-2">
                        {card.value}
                      </p>
                    </div>

                    {/* Avatar Group */}
                    <div className="hidden sm:flex items-center -space-x-3 shrink-0">
                      <div className="w-10 h-10 rounded-full bg-theme-accent text-white font-bold flex items-center justify-center border-2 border-theme-background text-xs">
                        MF
                      </div>
                      <div className="w-10 h-10 rounded-full bg-theme-primary text-theme-background font-bold flex items-center justify-center border-2 border-theme-background text-xs">
                        JS
                      </div>
                      <div className="w-10 h-10 rounded-full bg-theme-surface text-theme-foreground font-bold flex items-center justify-center border-2 border-theme-background text-xs">
                        AK
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-theme-border/50">
                    <span className="text-xs font-bold text-theme-muted">{card.description || 'Tap to open chat support'}</span>
                    <div className="w-10 h-10 rounded-full bg-theme-primary text-theme-background flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.a>
              );
            }

            if (styleIndex === 1) {
              return (
                <motion.a
                  key={card.id || idx}
                  href={card.link || '#'}
                  target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="md:col-span-4 bg-theme-primary text-theme-background p-7 rounded-[32px] border border-theme-primary flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[260px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-theme-background/15 border border-theme-background/30 flex items-center justify-center text-theme-background">
                      <HandshakeIcon className="w-6 h-6" />
                    </div>
                    <span className="bg-theme-background/20 text-theme-background border border-theme-background/30 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase">
                      {details.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-theme-background mt-3 mb-1 group-hover:opacity-90 transition-opacity">
                      {card.title}
                    </h3>
                    <p className="text-sm font-semibold text-theme-background/80 break-all">
                      {card.value}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-theme-background font-bold pt-3 border-t border-theme-background/20">
                    <span>{card.description || 'Follow handle'}</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            }

            if (styleIndex === 2) {
              return (
                <motion.a
                  key={card.id || idx}
                  href={card.link || '#'}
                  target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="md:col-span-4 bg-theme-accent text-white p-6 rounded-[32px] flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[240px]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      24/7 ACTIVE • 09:00-18:00
                    </span>
                    <Phone className="w-5 h-5 text-white" />
                  </div>

                  <div className="bg-theme-surface text-theme-accent p-4 rounded-[22px] shadow-sm my-3 border border-theme-border/20">
                    <h3 className="text-lg font-black italic tracking-tight text-theme-accent">
                      {card.title}
                    </h3>
                    <p className="text-sm font-bold text-theme-foreground mt-0.5">
                      {card.value}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-white/90">
                    <span>{card.description || 'Call support'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            }

            if (styleIndex === 3) {
              return (
                <motion.a
                  key={card.id || idx}
                  href={card.link || '#'}
                  target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="md:col-span-4 bg-theme-surface text-theme-foreground p-7 rounded-[32px] border border-theme-border flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[240px]"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-theme-accent/10 flex items-center justify-center text-theme-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="bg-theme-accent/10 text-theme-accent border border-theme-accent/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase">
                      {details.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black tracking-tight text-theme-foreground mt-3 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-sm font-semibold text-theme-muted">
                      {card.value}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs font-bold text-theme-accent pt-3 border-t border-theme-border/60">
                    <span>{card.description || 'Get directions'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.a>
              );
            }

            if (styleIndex === 4) {
              return (
                <motion.a
                  key={card.id || idx}
                  href={card.link || '#'}
                  target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="md:col-span-4 md:row-span-2 bg-theme-background text-theme-accent p-7 sm:p-8 rounded-[32px] border border-theme-border flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[460px]"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-theme-accent text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase">
                        [ {card.link ? card.link.replace('https://', '') : 'x.com'} ]
                      </span>
                      <Icon className="w-5 h-5 text-theme-accent" />
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-serif font-black tracking-tighter leading-[1.1] text-theme-accent mt-6 mb-3">
                      Bring People Together
                    </h3>
                    <p className="text-base font-bold text-theme-foreground">
                      {card.title}: {card.value}
                    </p>
                    {card.description && (
                      <p className="text-xs text-theme-muted mt-2 leading-relaxed">
                        {card.description}
                      </p>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-theme-border/60 flex flex-col gap-3">
                    <PeopleIllustration className="w-full h-auto max-h-36" />
                    <div className="flex items-center justify-between text-xs font-bold text-theme-accent">
                      <span>Connect with team</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.a>
              );
            }

            if (styleIndex === 5) {
              return (
                <motion.a
                  key={card.id || idx}
                  href={card.link || '#'}
                  target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  {...staggerItem}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="md:col-span-4 bg-theme-surface text-theme-foreground p-6 rounded-[32px] border border-theme-border flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[220px]"
                >
                  <div className="flex flex-col gap-2">
                    <div className="self-start bg-theme-primary text-theme-background px-3 py-1.5 rounded-2xl rounded-tl-none text-xs font-mono font-bold shadow-sm">
                      Hi! Where are you?
                    </div>
                    <div className="self-end bg-theme-accent text-white px-3.5 py-1.5 rounded-2xl rounded-tr-none text-xs font-bold shadow-sm">
                      I&apos;ll be in touch
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-theme-border/60 flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-theme-foreground">{card.title}</h3>
                      <p className="text-xs text-theme-muted">{card.value}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-theme-primary text-theme-background flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                  </div>
                </motion.a>
              );
            }

            return (
              <motion.a
                key={card.id || idx}
                href={card.link || '#'}
                target={card.link && card.link.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
                {...staggerItem}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                className="md:col-span-4 bg-theme-primary text-theme-background p-6 rounded-[32px] border border-theme-primary flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all duration-300 min-h-[220px]"
              >
                <div className="flex items-center justify-between">
                  <div className="bg-theme-background/20 text-theme-background border border-theme-background/30 px-3 py-1 rounded-full text-xs font-mono font-bold">
                    I&apos;ll be in touch
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 rounded-full bg-theme-accent border border-theme-primary" />
                    <div className="w-7 h-7 rounded-full bg-theme-surface border border-theme-primary" />
                    <div className="w-7 h-7 rounded-full bg-theme-background border border-theme-primary" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-bold text-theme-background mb-0.5">{card.title}</h3>
                  <p className="text-xs text-theme-background/80 font-semibold">{card.value}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 12: PREMIUM FOOTER
          ════════════════════════════════════════════════════════════ */}
      <footer className="w-full border-t border-theme-border/50 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12 items-stretch">
            {/* Brand Column (col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-4">
                <EditableElement
                  as="span"
                  id="luxe-footer"
                  field="brandName"
                  value={brandName}
                  type="heading"
                  className="text-xl font-bold tracking-tight text-theme-foreground"
                />
                <EditableElement
                  as="p"
                  id="luxe-footer"
                  field="description"
                  value="Premium products curated with care. Quality, craftsmanship, and timeless design for the modern individual."
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed"
                />
              </div>
            </div>

            {/* Navigation Column (Navbar Links) (col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-3">
              <EditableElement
                as="h4"
                id="luxe-footer"
                field="quickLinksHeader"
                value="Navigation"
                type="heading"
                className="text-xs font-bold text-theme-foreground uppercase tracking-wider mb-1 block"
              />
              <div className="flex flex-col gap-2.5">
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors block"
                  >
                    <EditableElement
                      as="span"
                      id="luxe-footer"
                      field={`navLink_${idx}`}
                      value={item.label}
                      type="text"
                    />
                  </a>
                ))}
              </div>
            </div>

            {/* Big "Made with portiva.site" Section (col-span-5) - Static & Non-Editable */}
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
                  Build, customize, and publish your dream store instantly with AI. Fast, responsive, and completely free forever.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-theme-border/50 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-theme-foreground/80">
                  Build your store now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-theme-primary hover:bg-theme-primary/90 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Create Yours Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar (Copyright only) */}
          <div className="border-t border-theme-border/50 pt-6 flex items-center justify-between">
            <EditableElement
              as="p"
              id="luxe-footer"
              field="copyright"
              value={`© ${new Date().getFullYear()} ${brandName}. All rights reserved.`}
              type="text"
              className="text-xs text-theme-muted"
            />
          </div>
        </div>
      </footer>

      {/* ── BACK TO TOP BUTTON ───────────────────────────────────────── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-full bg-theme-surface border border-theme-border/60 shadow-lg flex items-center justify-center text-theme-foreground hover:bg-theme-primary hover:text-white hover:border-theme-primary transition-all cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── QUICK VIEW & KNOW MORE EDITABLE MODAL ─────────────────────────── */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${isCanvasEditor ? 'absolute' : 'fixed'} inset-x-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4`}
            style={{
              top: isCanvasEditor ? scrollOffset : 0,
              height: isCanvasEditor ? containerHeight : '100%',
            }}
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-theme-surface rounded-3xl shadow-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto border border-theme-border/60 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Image */}
                <div className="relative aspect-square bg-theme-background rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none overflow-hidden">
                  <EditableImage
                    imageKey={`luxe-prod-${selectedProduct.id}-img`}
                    defaultSrc={selectedProduct.image}
                    defaultAlt={selectedProduct.name}
                    className="w-full h-full object-cover"
                    containerClassName="w-full h-full"
                    objectFit="cover"
                  />
                  {selectedProduct.badge && (
                    <span className="absolute top-4 left-4 text-[10px] font-semibold tracking-wider text-white bg-theme-primary px-3 py-1 rounded-full uppercase z-10 pointer-events-none">
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                {/* Details (Fully Editable in Edit Mode) */}
                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-4 right-4 w-8 h-8 rounded-full bg-theme-background/80 flex items-center justify-center text-theme-muted hover:text-theme-foreground transition cursor-pointer z-10"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1 mb-3">
                      {Array(Math.round(selectedProduct.rating || 5)).fill(0).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-theme-muted ml-1">({selectedProduct.reviewCount || 10})</span>
                    </div>

                    <EditableElement
                      as="h2"
                      id={`luxe-prod-${selectedProduct.id}`}
                      field="name"
                      value={selectedProduct.name}
                      type="heading"
                      className="text-xl font-bold text-theme-foreground tracking-tight"
                    />

                    <EditableElement
                      as="p"
                      id={`luxe-prod-${selectedProduct.id}`}
                      field="subtitle"
                      value={selectedProduct.subtitle || 'Handcrafted Edition'}
                      type="text"
                      className="text-sm text-theme-muted mt-1"
                    />

                    <EditableElement
                      as="p"
                      id={`luxe-prod-${selectedProduct.id}`}
                      field="description"
                      value={selectedProduct.description}
                      type="text"
                      className="text-sm text-theme-muted mt-3 leading-relaxed"
                    />

                    <div className="flex items-baseline gap-2 mt-4">
                      <EditableElement
                        as="span"
                        id={`luxe-prod-${selectedProduct.id}`}
                        field="price"
                        value={selectedProduct.discountPrice || selectedProduct.price}
                        type="text"
                        className="text-2xl font-bold text-theme-primary"
                      />
                    </div>
                  </div>

                  {/* Single Clean Editable Button */}
                  <div className="mt-6 pt-4 border-t border-theme-border/60">
                    <EditableButton
                      buttonKey={`luxe_prod_modal_${selectedProduct.id}_btn`}
                      defaultText="Inquire Product"
                      defaultHref="#contact"
                      className="w-full bg-theme-primary hover:bg-theme-primary-hover text-white text-xs font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                    >
                      <span>Inquire Product</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </EditableButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

// ─── Sub-Component: Premium Product Card ────────────────────────────────────

interface ProductCardRenderProps {
  product: ProductItem;
  index?: number;
  isBentoLead?: boolean;
  onKnowMore: () => void;
}

function ProductCardRender({
  product,
  index = 0,
  isBentoLead = false,
  onKnowMore,
}: ProductCardRenderProps) {
  return (
    <div className={`flex flex-col gap-3 ${isBentoLead ? 'h-full' : ''}`}>
      
      {/* 1. Image Container */}
      <div className="aspect-square w-full rounded-[20px] bg-[#F2EFF0] flex items-center justify-center relative group overflow-hidden select-none">
        <EditableImage
          imageKey={`luxe-prod-${product.id}-img`}
          defaultSrc={product.image}
          defaultAlt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          containerClassName="w-full h-full"
          objectFit="cover"
        />

        {/* Quick View Overlay */}
        <button
          onClick={onKnowMore}
          className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
        >
          <span className="bg-white/95 backdrop-blur text-slate-800 text-[11px] font-semibold px-4 py-2 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-white transition">
            <Eye className="w-3.5 h-3.5" />
            Know More
          </span>
        </button>
      </div>

      {/* 2. Details Area */}
      <div className="flex flex-col flex-1 px-0.5">
        
        {/* Price & Category Badge Row */}
        <div className="flex items-center justify-between select-none">
          <EditableElement
            as="span"
            id={`luxe-prod-${product.id}`}
            field="price"
            value={product.price}
            type="text"
            className="text-lg sm:text-xl font-bold text-theme-foreground tracking-tight"
          />
          <span className="text-[9px] font-bold text-[#5C5346] bg-[#E5DFD3] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {product.badge || "Men's Sneakers"}
          </span>
        </div>

        {/* Product Name */}
        <EditableElement
          as="h3"
          id={`luxe-prod-${product.id}`}
          field="name"
          value={product.name}
          type="heading"
          className="text-sm sm:text-base font-bold text-theme-foreground tracking-tight leading-snug mt-1.5"
        />

        {/* Product Description */}
        <EditableElement
          as="p"
          id={`luxe-prod-${product.id}`}
          field="description"
          value={product.description}
          type="text"
          className="text-[11px] text-theme-muted leading-relaxed mt-1 flex-1"
        />

        {/* Single "Know More" Action Button */}
        <button
          type="button"
          onClick={onKnowMore}
          className="w-full bg-[#7D664D] hover:bg-[#6D5840] text-white text-xs font-semibold py-2.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm mt-3.5"
        >
          <span>Know More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
}

export default LuxeUniversal;
