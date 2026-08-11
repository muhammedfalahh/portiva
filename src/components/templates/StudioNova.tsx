'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Minus,
  Check,
  Star,
  TrendingUp,
  Sparkles,
  Mail,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface ServiceItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  price: string;
  deliverables: string[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  metric: string;
  description: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface StudioNovaProps {
  studioName?: string;
  tagline?: string;
  location?: string;
  availability?: string;
  logoImage?: string;
  heroImage?: string;
  aboutImage?: string;
  faqImage?: string;
  services?: ServiceItem[];
  caseStudies?: CaseStudyItem[];
  testimonials?: TestimonialItem[];
  faqs?: FAQItem[];
  processSteps?: ProcessStep[];
  email?: string;
  phone?: string;
  inquiryUrl?: string;
  navbarBg?: string;
  hoverStyle?: string;
}

// ─── Framer Motion Presets & Easing ──────────────────────────────────────────

const EASE_CURVE = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as any },
  transition: { duration: 0.6, ease: EASE_CURVE },
};

const scaleUp = {
  initial: { opacity: 0, scale: 0.94, y: 20 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: '-40px' as any },
  transition: { duration: 0.6, ease: EASE_CURVE },
};

const slideLeft = {
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' as any },
  transition: { duration: 0.65, ease: EASE_CURVE },
};

const slideRight = {
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: '-40px' as any },
  transition: { duration: 0.65, ease: EASE_CURVE },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.08,
    },
  },
  viewport: { once: true, margin: '-40px' as any },
};

// ─── Default Data Sets ──────────────────────────────────────────────────────

const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'svc-1',
    number: '01',
    name: 'Performance Marketing & Paid Media',
    tagline: 'Multi-Channel Acquisition & Scale',
    description: 'Data-backed media buying across Meta, Google Search/YouTube, TikTok & Programmatic. We engineer high-ROAS campaign architectures designed for immediate positive cashflow.',
    price: 'Retainers from $3,500/mo',
    deliverables: ['Custom Ad Funnel Creation', 'Real-Time ROAS Telemetry', 'A/B Creative Testing', 'ROAS Guarantee Framework'],
  },
  {
    id: 'svc-2',
    number: '02',
    name: 'Brand Strategy & Visual Identity',
    tagline: 'Positioning & Creative Distinction',
    description: 'Transforming commodity brands into category leaders. Comprehensive brand systems, verbal identity, editorial guidelines, and high-impact visual design assets.',
    price: 'Projects from $6,000',
    deliverables: ['Brand Architecture', 'Visual Identity System', 'Tone of Voice Guide', 'Campaign Design System'],
  },
  {
    id: 'svc-3',
    number: '03',
    name: 'Creative Direction & Content Engine',
    tagline: 'High-Converting Performance Assets',
    description: 'Art-directed UGC ads, motion graphics, high-contrast video assets, and editorial copy engineered specifically to capture attention and drive purchase intent.',
    price: 'Packages from $4,000/mo',
    deliverables: ['Performance Video Ads', 'Static Ad Variations', 'Short-Form Reel Studio', 'Conversion Copywriting'],
  },
  {
    id: 'svc-4',
    number: '04',
    name: 'Web Architecture & Conversion Design',
    tagline: 'High-Speed Next.js Storefronts & Landing Pages',
    description: 'Custom React & Next.js web applications engineered for sub-second load speeds, seamless mobile UX, and maximum conversion rates across all traffic sources.',
    price: 'Projects from $7,500',
    deliverables: ['Custom Next.js Storefront', 'CRO Optimization Pass', 'Headless CMS Integration', 'Core Web Vitals 99+'],
  },
  {
    id: 'svc-5',
    number: '05',
    name: 'SEO & Organic Search Dominance',
    tagline: 'Authority Building & High-Intent Traffic',
    description: 'Technical search optimization, programmatic SEO engines, and editorial content strategies that capture non-branded search demand and dominate Google rankings.',
    price: 'Retainers from $3,000/mo',
    deliverables: ['Technical SEO Audits', 'Programmatic Content Plan', 'High-Domain Backlink Engine', 'Keyword Dominance Strategy'],
  },
  {
    id: 'svc-6',
    number: '06',
    name: 'Lifecycle & Marketing Automation',
    tagline: 'Retention, LTV & Email/SMS Systems',
    description: 'Maximized customer lifetime value through targeted Klaviyo automation flows, behavioral SMS triggers, and VIP loyalty marketing funnels.',
    price: 'Retainers from $2,500/mo',
    deliverables: ['Klaviyo Flow Architecture', 'SMS Behavioral Triggers', 'Customer LTV Optimization', 'VIP Retention Program'],
  },
];

const DEFAULT_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'cs-1',
    title: 'Aura Skincare Co.',
    client: 'Aura Luxury Beauty',
    industry: 'D2C E-Commerce',
    category: 'Performance & Brand Redesign',
    metric: '+340% Revenue Growth ($4.2M Scale)',
    description: 'Replaced a generic Shopify layout with a custom conversion engine and launched targeted Meta & TikTok video ad campaigns.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cs-2',
    title: 'Fintech Neo Platform',
    client: 'Neo Capital Tech',
    industry: 'Financial Technology',
    category: 'Paid Acquisition & Funnel',
    metric: '4.8x Blended Campaign ROAS',
    description: 'Scalable paid search and display acquisition strategy targeting high-net-worth mobile app users across North America.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cs-3',
    title: 'Luxe Automotive Group',
    client: 'Autobahn Performance',
    industry: 'High-End Retail',
    category: 'Full Digital Strategy',
    metric: '$18.5M Direct Sales Pipeline',
    description: 'Editorial brand experience, hyper-targeted local geo-ads, and an interactive digital showcase platform.',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'cs-4',
    title: 'Veloce Motion Labs',
    client: 'Veloce Studio',
    industry: 'Creative Tech & SaaS',
    category: 'Social Content & Organic Growth',
    metric: '14M+ Organic Impressions',
    description: 'Short-form video content strategy and viral brand campaign series driving 80k+ new monthly active users.',
    image: 'https://images.unsplash.com/photo-1542744094-3a3121699449?q=80&w=800&auto=format&fit=crop',
  },
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    name: 'Michel Marks',
    role: 'Chief Marketing Officer',
    company: 'Nova Health',
    quote: 'Studio Nova completely transformed our customer acquisition pipeline. Our CAC dropped by 42% while monthly revenue doubled within 90 days of launch.',
    rating: '4.9',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 't-2',
    name: 'Sarah Mitchell',
    role: 'VP of Growth',
    company: 'Apex Digital',
    quote: 'The rare agency that understands both world-class brand aesthetic and hard-nosed performance metrics. They didn’t just run ads—they elevated our brand equity.',
    rating: '5.0',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: 't-3',
    name: 'David Chen',
    role: 'Founder & CEO',
    company: 'Lumina Tech',
    quote: 'Working with Studio Nova was the highest leverage decision we made this year. Their strategic clarity and speed of execution are unmatched.',
    rating: '4.9',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
  },
];

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Can you redesign my existing product or marketing funnel?',
    answer: 'Yes! We specialize in comprehensive brand and marketing funnel overhauls. We audit your existing conversion bottlenecks, optimize ad creative, and rebuild high-converting web assets tailored to your growth targets.',
  },
  {
    id: 'faq-2',
    question: 'What services does Studio Nova offer?',
    answer: 'We provide full-service digital marketing capabilities including performance marketing (Meta, Google, TikTok), brand strategy & visual identity, high-converting video/ad content, custom web development, SEO, and email automation.',
  },
  {
    id: 'faq-3',
    question: 'How do you ensure design quality and ROAS performance?',
    answer: 'We ensure design quality through a structured, detail-focused approach that blends creative art direction with quantitative data analysis. Every campaign begins with a clear understanding of your unit economics and target CAC.',
  },
  {
    id: 'faq-4',
    question: 'What is your typical project timeline and retainer model?',
    answer: 'Brand & web builds typically take 4–6 weeks. Performance marketing retainers operate on a monthly basis with clear quarterly growth KPIs and real-time dashboard reporting.',
  },
  {
    id: 'faq-5',
    question: 'How do we get started with Studio Nova?',
    answer: 'Simply click "Start a Project" or schedule a strategy call. We will conduct an initial 30-minute discovery session to analyze your current marketing stack and propose a customized growth roadmap.',
  },
];

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '001',
    title: 'Discovery & Audit',
    subtitle: 'Data & Market Analysis',
    description: 'We dive deep into your target audience, unit economics, customer friction points, and competitor positioning to establish a clear baseline.',
  },
  {
    number: '002',
    title: 'Strategy & Architecture',
    subtitle: 'Growth Blueprints',
    description: 'Designing the campaign infrastructure, custom web assets, messaging frameworks, and channel attribution models for maximum ROAS.',
  },
  {
    number: '003',
    title: 'Creative & Execution',
    subtitle: 'Art & Performance',
    description: 'Rapid production of high-converting ad variants, editorial copy, and lightning-fast web storefronts deployed across primary acquisition channels.',
  },
  {
    number: '004',
    title: 'Optimization & Scale',
    subtitle: 'Compound Revenue Growth',
    description: 'Continuous A/B testing, audience expansion, budget scaling, and lifecycle retention loops to turn early traction into market dominance.',
  },
];

// ─── Main Component ─────────────────────────────────────────────────────────

export const StudioNova: React.FC<StudioNovaProps> = ({
  studioName = 'Studio Nova',
  tagline = 'Strategy • Creative • Performance Marketing',
  location = 'NYC / Global Digital Agency',
  availability = 'Accepting Q3/Q4 Brand Retainers',
  logoImage = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop',
  heroImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
  aboutImage = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
  faqImage = 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=800&auto=format&fit=crop',
  services = DEFAULT_SERVICES,
  caseStudies = DEFAULT_CASE_STUDIES,
  testimonials = DEFAULT_TESTIMONIALS,
  faqs = DEFAULT_FAQS,
  processSteps = DEFAULT_PROCESS_STEPS,
  email = 'hello@studionova.agency',
  phone = '+1 (555) 892-4011',
  inquiryUrl = 'https://calendly.com',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(2);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const maxServiceIndex = Math.max(0, services.length - 2);
  const handlePrevService = () => {
    setCurrentServiceIndex((prev) => (prev === 0 ? maxServiceIndex : prev - 1));
  };
  const handleNextService = () => {
    setCurrentServiceIndex((prev) => (prev === maxServiceIndex ? 0 : prev + 1));
  };

  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> = builderCtx?.templateData?.buttonOverrides || {};

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F7F4] text-[#121214] font-sans antialiased overflow-x-hidden selection:bg-[#FF4D17] selection:text-white">
      {/* ─── 1. Header & Navigation ────────────────────────────────────────────── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_CURVE }}
        className="sticky top-0 z-50 w-full bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#121214]/10 transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <EditableImage
              imageKey="studio-nav-logo"
              defaultSrc={logoImage}
              defaultAlt={`${studioName} logo`}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover"
              containerClassName="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#121214]/15 shadow-xs flex items-center justify-center"
              objectFit="cover"
            />
            <EditableElement
              as="a"
              id="studio-logo"
              field="studioName"
              value={`${studioName}®`}
              type="heading"
              className="text-2xl font-extrabold tracking-tight text-[#121214] hover:text-[#FF4D17] transition-colors"
            />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#121214]/80">
            <motion.a whileHover={{ y: -1, color: '#FF4D17' }} href="#about" className="transition-colors">
              <EditableElement as="span" id="studio-nav-0" field="navAbout" value="About" type="text" />
            </motion.a>
            <motion.a whileHover={{ y: -1, color: '#FF4D17' }} href="#services" className="transition-colors">
              <EditableElement as="span" id="studio-nav-1" field="navServices" value="Services" type="text" />
            </motion.a>
            <motion.a whileHover={{ y: -1, color: '#FF4D17' }} href="#work" className="transition-colors">
              <EditableElement as="span" id="studio-nav-2" field="navWork" value="Work" type="text" />
            </motion.a>
            <motion.a whileHover={{ y: -1, color: '#FF4D17' }} href="#process" className="transition-colors">
              <EditableElement as="span" id="studio-nav-3" field="navProcess" value="Process" type="text" />
            </motion.a>
            <motion.a whileHover={{ y: -1, color: '#FF4D17' }} href="#testimonials" className="transition-colors">
              <EditableElement as="span" id="studio-nav-4" field="navTestimonials" value="Testimonials" type="text" />
            </motion.a>
            <motion.a whileHover={{ y: -1, color: '#FF4D17' }} href="#faq" className="transition-colors">
              <EditableElement as="span" id="studio-nav-5" field="navFaq" value="FAQ" type="text" />
            </motion.a>
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <EditableButton
                buttonKey="studio-btn-nav"
                defaultText="Start a Project"
                defaultHref="#contact"
                className="px-5 py-2.5 rounded-full bg-[#121214] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF4D17] transition-all duration-300 shadow-sm"
              >
                <span>{activeButtonOverrides['studio-btn-nav']?.text || 'Start a Project'}</span>
              </EditableButton>
            </motion.div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#121214] hover:bg-[#121214]/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: EASE_CURVE }}
              className="md:hidden bg-[#F8F7F4] border-b border-[#121214]/10 px-6 py-6 space-y-4 overflow-hidden"
            >
              <nav className="flex flex-col space-y-3 font-medium text-base">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4D17]">
                  <EditableElement as="span" id="studio-mob-nav-0" field="navAbout" value="About" type="text" />
                </a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4D17]">
                  <EditableElement as="span" id="studio-mob-nav-1" field="navServices" value="Services" type="text" />
                </a>
                <a href="#work" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4D17]">
                  <EditableElement as="span" id="studio-mob-nav-2" field="navWork" value="Work" type="text" />
                </a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4D17]">
                  <EditableElement as="span" id="studio-mob-nav-3" field="navProcess" value="Process" type="text" />
                </a>
                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4D17]">
                  <EditableElement as="span" id="studio-mob-nav-4" field="navTestimonials" value="Testimonials" type="text" />
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#FF4D17]">
                  <EditableElement as="span" id="studio-mob-nav-5" field="navFaq" value="FAQ" type="text" />
                </a>
              </nav>
              <div className="pt-4 border-t border-[#121214]/10 flex flex-col gap-3">
                <EditableButton
                  buttonKey="studio-btn-nav-mobile"
                  defaultText="Start a Project"
                  defaultHref="#contact"
                  className="w-full text-center py-3 rounded-full bg-[#121214] text-white font-bold uppercase tracking-wider hover:bg-[#FF4D17]"
                >
                  <span>{activeButtonOverrides['studio-btn-nav-mobile']?.text || 'Start a Project'}</span>
                </EditableButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ─── 2. Hero Section ───────────────────────────────────────────────────── */}
      <section className="w-full max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-16 md:pb-28">
        {/* Top Marker */}
        <motion.div
          {...fadeUp}
          className="flex items-center justify-between text-xs font-mono text-[#121214]/60 uppercase tracking-widest border-b border-[#121214]/15 pb-4 mb-8"
        >
          <EditableElement as="span" id="studio-hero-marker-l" field="heroMarkerL" value="( Digital Marketing & Growth Studio )" type="text" />
          <EditableElement as="span" id="studio-hero-marker-r" field="heroMarkerR" value="( 001 )" type="text" />
        </motion.div>

        {/* Hero Top Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-12">
          {/* Left Column: Brand Name & Service Bullet Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: EASE_CURVE }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <EditableElement
                as="h1"
                id="studio-hero-title"
                field="studioName"
                value={studioName}
                type="heading"
                className="text-6xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-[#121214] leading-[0.95]"
              />
              <EditableElement
                as="p"
                id="studio-hero-eyebrow"
                field="heroEyebrow"
                value="● Growth & Creative Engineering"
                type="text"
                className="text-xs font-mono tracking-widest text-[#FF4D17] uppercase font-bold"
              />
            </div>

            {/* Left Services List */}
            <div className="pt-4 border-t border-[#121214]/10 space-y-3 font-medium text-sm sm:text-base text-[#121214]/80">
              <motion.div whileHover={{ x: 6 }} className="flex items-center justify-between py-2 border-b border-[#121214]/5 cursor-pointer">
                <EditableElement as="span" id="studio-hero-bullet-0" field="bullet0" value="Performance Marketing" type="text" className="hover:text-[#FF4D17] transition-colors" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D17] shadow-sm shadow-[#FF4D17]/50" />
              </motion.div>
              <motion.div whileHover={{ x: 6 }} className="flex items-center justify-between py-2 border-b border-[#121214]/5 cursor-pointer">
                <EditableElement as="span" id="studio-hero-bullet-1" field="bullet1" value="Brand Identity & Strategy" type="text" className="hover:text-[#FF4D17] transition-colors" />
                <EditableElement as="span" id="studio-hero-bullet-1-num" field="bullet1Num" value="02" type="text" className="text-xs text-[#121214]/40 font-mono" />
              </motion.div>
              <motion.div whileHover={{ x: 6 }} className="flex items-center justify-between py-2 border-b border-[#121214]/5 cursor-pointer">
                <EditableElement as="span" id="studio-hero-bullet-2" field="bullet2" value="Creative Content Engine" type="text" className="hover:text-[#FF4D17] transition-colors" />
                <EditableElement as="span" id="studio-hero-bullet-2-num" field="bullet2Num" value="03" type="text" className="text-xs text-[#121214]/40 font-mono" />
              </motion.div>
              <motion.div whileHover={{ x: 6 }} className="flex items-center justify-between py-2 border-b border-[#121214]/5 cursor-pointer">
                <EditableElement as="span" id="studio-hero-bullet-3" field="bullet3" value="Conversion Web Development" type="text" className="hover:text-[#FF4D17] transition-colors" />
                <EditableElement as="span" id="studio-hero-bullet-3-num" field="bullet3Num" value="04" type="text" className="text-xs text-[#121214]/40 font-mono" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Motion Portrait & Giant Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EASE_CURVE }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-[#121214]/10 bg-[#121214]/5">
              <EditableImage
                imageKey="studio-hero-img"
                defaultSrc={heroImage}
                defaultAlt="Digital agency campaign hero"
                className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
              {/* Floating Stat Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE_CURVE }}
                className="absolute bottom-6 left-6 right-6 bg-[#121214]/90 backdrop-blur-md rounded-2xl p-4 text-white flex items-center justify-between border border-white/10 z-30 pointer-events-auto shadow-xl"
              >
                <div className="space-y-0.5">
                  <EditableElement
                    as="p"
                    id="studio-hero-badge-tag"
                    field="badgeTag"
                    value="Average Client Scale"
                    type="text"
                    className="text-xs font-mono text-[#FF4D17] uppercase tracking-wider font-semibold block"
                  />
                  <EditableElement
                    as="p"
                    id="studio-hero-badge-val"
                    field="badgeVal"
                    value="4.8x ROAS Across All Paid Media"
                    type="text"
                    className="text-base sm:text-lg font-bold text-white leading-tight block"
                  />
                </div>
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="w-10 h-10 rounded-full bg-[#FF4D17] flex items-center justify-center text-white shrink-0 ml-3"
                >
                  <TrendingUp className="w-5 h-5" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Giant Responsive Accent Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 0.95, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_CURVE }}
          className="mt-8 pt-4"
        >
          <EditableElement
            as="h2"
            id="studio-hero-giant-word"
            field="tagline"
            value="Studio"
            type="heading"
            className="text-[80px] sm:text-[140px] md:text-[180px] lg:text-[220px] font-black tracking-tighter text-[#FF4D17] leading-none text-right uppercase select-none opacity-95"
          />
        </motion.div>

        {/* Positioning Sub-Hero Bar */}
        <motion.div
          {...fadeUp}
          className="mt-8 pt-8 border-t border-[#121214]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <EditableElement
            as="p"
            id="studio-hero-positioning"
            field="heroPositioning"
            value="We build high-converting performance marketing systems, art-directed brand creative, and lightning-fast web storefronts for category-defining companies."
            type="text"
            className="text-lg sm:text-xl font-medium text-[#121214]/80 max-w-2xl leading-relaxed"
          />

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <EditableButton
                buttonKey="studio-btn-hero-primary"
                defaultText="Book Strategy Call"
                defaultHref="#contact"
                className="px-7 py-4 rounded-full bg-[#FF4D17] text-white font-bold text-sm uppercase tracking-wider hover:bg-[#121214] transition-all duration-300 shadow-lg shadow-[#FF4D17]/30 flex items-center gap-2"
              >
                <span>{activeButtonOverrides['studio-btn-hero-primary']?.text || 'Book Strategy Call'}</span>
                <ArrowRight className="w-4 h-4" />
              </EditableButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <EditableButton
                buttonKey="studio-btn-hero-secondary"
                defaultText="View Selected Work"
                defaultHref="#work"
                className="px-7 py-4 rounded-full border border-[#121214]/30 text-[#121214] font-bold text-sm uppercase tracking-wider hover:bg-[#121214] hover:text-white transition-all duration-300 flex items-center gap-2"
              >
                <span>{activeButtonOverrides['studio-btn-hero-secondary']?.text || 'View Selected Work'}</span>
              </EditableButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── 3. Client Logos Bar (Monochrome Editorial Ticker) ───────────────── */}
      <motion.section {...fadeUp} className="w-full bg-[#121214] text-white py-12 border-y border-[#121214]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <EditableElement
              as="p"
              id="studio-logos-label"
              field="logosLabel"
              value="TRUSTED BY FAST-GROWING BRANDS & VENTURE CAPITAL TEAMS"
              type="text"
              className="text-xs font-mono text-white/50 uppercase tracking-widest shrink-0"
            />
            <div className="w-full flex flex-wrap items-center justify-between gap-8 md:gap-12 opacity-70">
              <motion.div whileHover={{ scale: 1.08, color: '#FF4D17' }}>
                <EditableElement as="span" id="studio-logo-brand-0" field="brand0" value="ORIVO®" type="text" className="text-xl font-extrabold tracking-tighter text-white transition-colors cursor-default" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, color: '#FF4D17' }}>
                <EditableElement as="span" id="studio-logo-brand-1" field="brand1" value="STARVIX" type="text" className="text-xl font-extrabold tracking-tighter text-white transition-colors cursor-default" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, color: '#FF4D17' }}>
                <EditableElement as="span" id="studio-logo-brand-2" field="brand2" value="VISLYERA" type="text" className="text-xl font-extrabold tracking-tighter text-white transition-colors cursor-default" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, color: '#FF4D17' }}>
                <EditableElement as="span" id="studio-logo-brand-3" field="brand3" value="NEO.CAPITAL" type="text" className="text-xl font-extrabold tracking-tighter text-white transition-colors cursor-default" />
              </motion.div>
              <motion.div whileHover={{ scale: 1.08, color: '#FF4D17' }}>
                <EditableElement as="span" id="studio-logo-brand-4" field="brand4" value="AURA.BEAUTY" type="text" className="text-xl font-extrabold tracking-tighter text-white transition-colors cursor-default" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ─── 4. About / Agency Brand Philosophy ───────────────────────────────── */}
      <section id="about" className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        {/* Section Header Markers */}
        <motion.div {...fadeUp} className="flex items-center justify-between text-xs font-mono text-[#121214]/60 uppercase tracking-widest border-b border-[#121214]/15 pb-4 mb-16">
          <EditableElement as="span" id="studio-about-marker-l" field="aboutMarkerL" value="( About Us )" type="text" />
          <EditableElement as="span" id="studio-about-marker-r" field="aboutMarkerR" value="( 001 )" type="text" />
        </motion.div>

        {/* Center Frame Visual with Dot Grid Background */}
        <div className="relative max-w-4xl mx-auto text-center space-y-12">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#121214_1px,transparent_1px)] [background-size:16px_16px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -4, y: 30 }}
            whileInView={{ opacity: 1, rotate: -2, y: 0 }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE_CURVE }}
            className="relative inline-block mx-auto"
          >
            <div className="p-3 bg-white rounded-2xl shadow-2xl border border-[#121214]/10 max-w-xs sm:max-w-sm mx-auto">
              <EditableImage
                imageKey="studio-about-img"
                defaultSrc={aboutImage}
                defaultAlt="Digital agency strategists"
                className="w-full h-64 sm:h-72 object-cover rounded-xl"
                containerClassName="w-full h-full"
                objectFit="cover"
              />
              <div className="pt-3 pb-1 text-center">
                <EditableElement as="span" id="studio-about-img-caption" field="aboutImgCaption" value="NEW YORK • LONDON • REMOTE" type="text" className="text-xs font-mono text-[#121214]/60 uppercase" />
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeUp} className="space-y-6 max-w-3xl mx-auto">
            <EditableElement
              as="p"
              id="studio-about-quote"
              field="aboutQuote"
              value="We are a forward-thinking digital agency dedicated to helping brands grow, evolve, and stand out in a competitive market. Our team combines creativity, strategy, and technology to deliver impactful solutions tailored to each client’s unique goals."
              type="text"
              className="text-2xl sm:text-3xl md:text-4xl font-serif leading-relaxed text-[#121214]/90 text-center tracking-tight"
            />
          </motion.div>
        </div>
      </section>

      {/* ─── 5. Services Section (Universal Capabilities Carousel Engine) ─────── */}
      <section id="services" className="w-full bg-[#121214] text-white py-24 md:py-32 relative overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="w-[600px] h-[600px] rounded-full bg-[#FF4D17]/30 blur-3xl absolute -top-40 -left-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header Markers */}
          <motion.div {...fadeUp} className="flex items-center justify-between text-xs font-mono text-white/50 uppercase tracking-widest border-b border-white/10 pb-4 mb-12">
            <EditableElement as="span" id="studio-svc-marker-l" field="svcMarkerL" value="( Core Capabilities Engine )" type="text" />
            <EditableElement as="span" id="studio-svc-marker-r" field="svcMarkerR" value="( 002 )" type="text" />
          </motion.div>

          {/* Section Header & Carousel Control Bar */}
          <motion.div {...fadeUp} className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <EditableElement
                as="h2"
                id="studio-services-title"
                field="servicesHeading"
                value="Services & Engine•"
                type="heading"
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
              />
              <EditableElement
                as="p"
                id="studio-services-subtitle"
                field="servicesSubtitle"
                value="End-to-end digital growth capabilities engineered to scale acquisition, elevate creative, and dominate search."
                type="text"
                className="text-base sm:text-lg text-white/70 max-w-xl"
              />
            </div>

            {/* Carousel Control Bar */}
            <div className="flex items-center gap-6 shrink-0">
              <div className="text-sm font-mono text-white/60 tracking-wider">
                <span className="text-[#FF4D17] font-bold text-base">0{currentServiceIndex + 1}</span>
                <span className="text-white/40"> / </span>
                <span>0{services.length}</span>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handlePrevService}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#FF4D17] hover:border-[#FF4D17] transition-all duration-300 shadow-md group focus:outline-none cursor-pointer"
                  aria-label="Previous Service"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={handleNextService}
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-white hover:bg-[#FF4D17] hover:border-[#FF4D17] transition-all duration-300 shadow-md group focus:outline-none cursor-pointer"
                  aria-label="Next Service"
                >
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Interactive Progress Line */}
          <div className="w-full h-1 bg-white/10 rounded-full mb-10 overflow-hidden">
            <motion.div
              className="h-full bg-[#FF4D17] rounded-full shadow-sm shadow-[#FF4D17]"
              animate={{ width: `${((currentServiceIndex + 1) / services.length) * 100}%` }}
              transition={{ duration: 0.5, ease: EASE_CURVE }}
            />
          </div>

          {/* Carousel Slide Viewport - 2 Square Cards at a Time */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{ translateX: `-${currentServiceIndex * 50}%` }}
              transition={{ duration: 0.55, ease: EASE_CURVE }}
            >
              {services.map((svc, idx) => (
                <motion.div
                  key={svc.id || idx}
                  whileHover={{ y: -6, borderColor: 'rgba(255,77,23,0.6)' }}
                  transition={{ duration: 0.3 }}
                  className="w-full md:w-[calc(50%-12px)] shrink-0 aspect-square rounded-3xl bg-[#16161D] border border-white/10 hover:bg-[#1A1A24] transition-colors shadow-2xl p-7 sm:p-9 flex flex-col justify-between group"
                >
                  {/* Top Row: Stage Badge & Price Tag */}
                  <div className="flex items-center justify-between">
                    <EditableElement
                      as="span"
                      id={`studio-svc-${idx}-stage`}
                      field="stage"
                      value={`STAGE ${svc.number || `0${idx + 1}`}`}
                      type="text"
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#FF4D17] text-white"
                    />
                    <EditableElement
                      as="span"
                      id={`studio-svc-${idx}-price`}
                      field="price"
                      value={svc.price}
                      type="text"
                      className="text-xs font-mono text-white/50"
                    />
                  </div>

                  {/* Middle Content: Title, Tagline, & Description */}
                  <div className="space-y-3 my-auto">
                    <div>
                      <EditableElement
                        as="h3"
                        id={`studio-svc-${idx}-name`}
                        field="name"
                        value={svc.name}
                        type="heading"
                        className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-[#FF4D17] transition-colors leading-tight"
                      />
                      <EditableElement
                        as="p"
                        id={`studio-svc-${idx}-tagline`}
                        field="tagline"
                        value={svc.tagline}
                        type="text"
                        className="text-xs font-mono text-[#FF4D17] uppercase tracking-wider font-semibold mt-1"
                      />
                    </div>

                    <EditableElement
                      as="p"
                      id={`studio-svc-${idx}-desc`}
                      field="description"
                      value={svc.description}
                      type="text"
                      className="text-xs sm:text-sm text-white/75 leading-relaxed line-clamp-3"
                    />
                  </div>

                  {/* Bottom Row: Key Deliverables Chips & Inquire Button */}
                  <div className="pt-4 border-t border-white/10 space-y-4">
                    <div className="flex flex-wrap gap-1.5">
                      {svc.deliverables.slice(0, 3).map((item, dIdx) => (
                        <span key={dIdx} className="inline-flex items-center gap-1 text-[11px] font-mono text-white/80 bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                          <Check className="w-3 h-3 text-[#FF4D17]" />
                          <EditableElement as="span" id={`studio-svc-${idx}-d-${dIdx}`} field={`deliv_${dIdx}`} value={item} type="text" />
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <EditableElement as="span" id={`studio-svc-${idx}-footer-num`} field="footerNum" value={`SERVICE 0${idx + 1}`} type="text" className="text-xs font-mono text-white/40" />
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <EditableButton
                          buttonKey={`studio-btn-svc-${idx}`}
                          defaultText="Inquire Capability"
                          defaultHref="#contact"
                          className="px-4 py-2 rounded-full bg-[#FF4D17] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-[#121214] transition-all flex items-center gap-1.5 shadow-md shadow-[#FF4D17]/30"
                        >
                          <span>Inquire Capability</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </EditableButton>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Interactive Navigation Dots */}
          <div className="mt-8 flex items-center justify-center gap-3">
            {services.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentServiceIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  currentServiceIndex === idx
                    ? 'w-10 bg-[#FF4D17]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. Work / Case Studies Section ──────────────────────────────────── */}
      <section id="work" className="w-full max-w-7xl mx-auto px-6 py-24 md:py-32">
        <motion.div {...fadeUp} className="flex items-center justify-between text-xs font-mono text-[#121214]/60 uppercase tracking-widest border-b border-[#121214]/15 pb-4 mb-16">
          <EditableElement as="span" id="studio-work-marker-l" field="workMarkerL" value="( Selected Case Studies )" type="text" />
          <EditableElement as="span" id="studio-work-marker-r" field="workMarkerR" value="( 003 )" type="text" />
        </motion.div>

        <motion.div {...fadeUp} className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <EditableElement
              as="h2"
              id="studio-work-title"
              field="workHeading"
              value="Featured Work•"
              type="heading"
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#121214]"
            />
            <EditableElement
              as="p"
              id="studio-work-sub"
              field="workSub"
              value="Proven campaign outcomes, custom storefront redesigns, and growth engineering for ambitious global brands."
              type="text"
              className="text-base sm:text-lg text-[#121214]/70 mt-2 max-w-xl"
            />
          </div>

          <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
            <EditableButton
              buttonKey="studio-btn-work-all"
              defaultText="Request Full Portfolio"
              defaultHref="#contact"
              className="px-6 py-3 rounded-full border border-[#121214]/30 text-[#121214] font-bold text-xs uppercase tracking-wider hover:bg-[#121214] hover:text-white transition-all shrink-0 flex items-center gap-2"
            >
              <span>{activeButtonOverrides['studio-btn-work-all']?.text || 'Request Full Portfolio'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </EditableButton>
          </motion.div>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((cs, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={cs.id || idx}
                {...(isEven ? slideLeft : slideRight)}
                whileHover={{ y: -4 }}
                className="group relative rounded-3xl bg-white border border-[#121214]/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className={`lg:col-span-7 h-[340px] sm:h-[420px] relative overflow-hidden bg-[#121214]/5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <EditableImage
                    imageKey={`studio-cs-${idx}-img`}
                    defaultSrc={cs.image}
                    defaultAlt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    objectFit="cover"
                  />
                  <EditableElement
                    as="div"
                    id={`studio-cs-${idx}-metric`}
                    field="metric"
                    value={cs.metric}
                    type="text"
                    className="absolute top-6 left-6 bg-[#121214] text-white px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase border border-white/10 shadow-lg"
                  />
                </div>

                <div className={`lg:col-span-5 p-8 sm:p-12 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="space-y-2">
                    <EditableElement
                      as="span"
                      id={`studio-cs-${idx}-cat`}
                      field="category"
                      value={`${cs.category} • ${cs.industry}`}
                      type="text"
                      className="text-xs font-mono text-[#FF4D17] uppercase tracking-wider font-bold block"
                    />
                    <EditableElement
                      as="h3"
                      id={`studio-cs-${idx}-title`}
                      field="title"
                      value={cs.title}
                      type="heading"
                      className="text-3xl sm:text-4xl font-extrabold text-[#121214] group-hover:text-[#FF4D17] transition-colors"
                    />
                  </div>

                  <EditableElement
                    as="p"
                    id={`studio-cs-${idx}-desc`}
                    field="description"
                    value={cs.description}
                    type="text"
                    className="text-base text-[#121214]/75 leading-relaxed"
                  />

                  <div className="pt-4 flex items-center justify-between border-t border-[#121214]/10">
                    <EditableElement as="span" id={`studio-cs-${idx}-client`} field="client" value={`CLIENT: ${cs.client}`} type="text" className="text-xs font-mono text-[#121214]/50" />
                    <motion.a
                      whileHover={{ x: 3 }}
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF4D17] hover:text-[#121214] transition-colors"
                    >
                      <EditableElement as="span" id={`studio-cs-${idx}-cta`} field="ctaText" value="View Case Study" type="text" />
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── 7. Results & Social Proof Stats ─────────────────────────────────── */}
      <motion.section {...fadeUp} className="w-full bg-[#FF4D17] text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...staggerContainer} className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/20">
            <motion.div {...scaleUp} className="pt-6 lg:pt-0">
              <EditableElement as="p" id="studio-stat-0-val" field="stat0Val" value="$120M+" type="text" className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2" />
              <EditableElement as="p" id="studio-stat-0-label" field="stat0Label" value="Client Revenue Generated" type="text" className="text-xs font-mono uppercase tracking-widest text-white/80" />
            </motion.div>
            <motion.div {...scaleUp} className="pt-6 lg:pt-0 lg:pl-8">
              <EditableElement as="p" id="studio-stat-1-val" field="stat1Val" value="4.8x" type="text" className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2" />
              <EditableElement as="p" id="studio-stat-1-label" field="stat1Label" value="Average Blended ROAS" type="text" className="text-xs font-mono uppercase tracking-widest text-white/80" />
            </motion.div>
            <motion.div {...scaleUp} className="pt-6 lg:pt-0 lg:pl-8">
              <EditableElement as="p" id="studio-stat-2-val" field="stat2Val" value="150+" type="text" className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2" />
              <EditableElement as="p" id="studio-stat-2-label" field="stat2Label" value="Global Growth Campaigns" type="text" className="text-xs font-mono uppercase tracking-widest text-white/80" />
            </motion.div>
            <motion.div {...scaleUp} className="pt-6 lg:pt-0 lg:pl-8">
              <EditableElement as="p" id="studio-stat-3-val" field="stat3Val" value="98.4%" type="text" className="text-4xl sm:text-6xl font-black tracking-tight text-white mb-2" />
              <EditableElement as="p" id="studio-stat-3-label" field="stat3Label" value="Client Retainer Retention" type="text" className="text-xs font-mono uppercase tracking-widest text-white/80" />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ─── 8. Work Process Section ──────────────────────────────────────────── */}
      <section id="process" className="w-full bg-[#0B0B0E] text-white py-28 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-25 flex items-center justify-center">
          <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FF4D17]/30 to-purple-600/20 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="flex items-center justify-between text-xs font-mono text-white/50 uppercase tracking-widest border-b border-white/10 pb-4 mb-16">
            <EditableElement as="span" id="studio-proc-marker-l" field="procMarkerL" value="( Our System )" type="text" />
            <EditableElement as="span" id="studio-proc-marker-r" field="procMarkerR" value="( 005 )" type="text" />
          </motion.div>

          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <EditableElement
              as="h2"
              id="studio-process-title"
              field="processHeading"
              value="Work Process"
              type="heading"
              className="text-5xl sm:text-7xl font-extrabold tracking-tight text-white"
            />
            <EditableElement
              as="p"
              id="studio-proc-sub"
              field="procSub"
              value="A structured 4-stage engine that moves from quantitative audit to compound revenue scale."
              type="text"
              className="text-base sm:text-lg text-white/70"
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => {
              const tiltAngle = idx % 2 === 0 ? -2 : 2;

              return (
                <motion.div
                  key={step.number || idx}
                  initial={{ opacity: 0, y: 30, rotate: tiltAngle }}
                  whileInView={{ opacity: 1, y: 0, rotate: tiltAngle / 2 }}
                  whileHover={{ rotate: 0, y: -8, borderColor: 'rgba(255,77,23,0.6)' }}
                  viewport={{ once: true, margin: '-40px' as any }}
                  transition={{ duration: 0.5, ease: EASE_CURVE }}
                  className="p-8 rounded-3xl bg-[#141419] border border-white/10 shadow-xl transition-colors duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <EditableElement as="span" id={`studio-proc-${idx}-num`} field="number" value={step.number} type="text" className="text-4xl font-extrabold font-serif text-[#FF4D17] block" />

                    <div>
                      <EditableElement
                        as="h3"
                        id={`studio-proc-${idx}-title`}
                        field="title"
                        value={step.title}
                        type="heading"
                        className="text-xl font-bold text-white mb-1"
                      />
                      <EditableElement as="p" id={`studio-proc-${idx}-sub`} field="subtitle" value={step.subtitle} type="text" className="text-xs font-mono text-white/50 uppercase tracking-wider" />
                    </div>

                    <EditableElement
                      as="p"
                      id={`studio-proc-${idx}-desc`}
                      field="description"
                      value={step.description}
                      type="text"
                      className="text-sm text-white/75 leading-relaxed"
                    />
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                    <EditableElement as="span" id={`studio-proc-${idx}-stage`} field="stageLabel" value={`STAGE ${step.number}`} type="text" />
                    <Check className="w-4 h-4 text-[#FF4D17]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── 9. Testimonials Section ──────────────────────────────────────────── */}
      <section id="testimonials" className="w-full bg-[#F8F7F4] text-[#121214] py-28 md:py-36 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div {...fadeUp} className="flex items-center justify-between text-xs font-mono text-[#121214]/60 uppercase tracking-widest border-b border-[#121214]/15 pb-4 mb-16">
            <EditableElement as="span" id="studio-test-marker-l" field="testMarkerL" value="( Client Endorsements )" type="text" />
            <EditableElement as="span" id="studio-test-marker-r" field="testMarkerR" value="( 006 )" type="text" />
          </motion.div>

          <div className="relative">
            <motion.div {...scaleUp}>
              <EditableElement
                as="h2"
                id="studio-test-watermark"
                field="testWatermark"
                value="Testimonials•"
                type="heading"
                className="text-[70px] sm:text-[130px] md:text-[170px] lg:text-[210px] font-black tracking-tighter text-[#121214]/10 leading-none text-center select-none uppercase"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-16 sm:-mt-28 relative z-20">
              {testimonials.map((t, idx) => {
                const tilts = [-2, 1, -1];
                const tilt = tilts[idx % tilts.length];

                return (
                  <motion.div
                    key={t.id || idx}
                    initial={{ opacity: 0, y: 35, rotate: tilt }}
                    whileInView={{ opacity: 1, y: 0, rotate: tilt }}
                    whileHover={{ y: -6, scale: 1.02, rotate: 0 }}
                    viewport={{ once: true, margin: '-40px' as any }}
                    transition={{ duration: 0.6, ease: EASE_CURVE }}
                    className="p-8 rounded-3xl bg-white border border-[#121214]/10 shadow-2xl flex flex-col justify-between space-y-6"
                  >
                    <div className="flex items-center gap-4">
                      <EditableImage
                        imageKey={`studio-t-avatar-${idx}`}
                        defaultSrc={t.avatar}
                        defaultAlt={t.name}
                        className="w-12 h-12 rounded-full object-cover border border-[#121214]/10"
                        containerClassName="shrink-0"
                        objectFit="cover"
                      />
                      <div>
                        <EditableElement
                          as="h4"
                          id={`studio-t-${idx}-name`}
                          field="name"
                          value={t.name}
                          type="heading"
                          className="text-base font-bold text-[#121214]"
                        />
                        <EditableElement as="p" id={`studio-t-${idx}-role`} field="roleCompany" value={`${t.role}, ${t.company}`} type="text" className="text-xs text-[#121214]/60" />
                      </div>
                    </div>

                    <EditableElement
                      as="p"
                      id={`studio-t-${idx}-quote`}
                      field="quote"
                      value={`"${t.quote}"`}
                      type="text"
                      className="text-sm sm:text-base font-medium text-[#121214]/85 leading-relaxed italic"
                    />

                    <div className="flex items-center justify-between pt-4 border-t border-[#121214]/10">
                      <div className="flex items-center gap-1 text-[#FF4D17]">
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                        <Star className="w-4 h-4 fill-current" />
                      </div>
                      <EditableElement as="span" id={`studio-t-${idx}-rating`} field="rating" value={`★ ${t.rating}`} type="text" className="text-xs font-mono font-bold text-[#FF4D17]" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. Asked Questions (FAQ) Section ─────────────────────────────────── */}
      <section id="faq" className="w-full bg-[#FF4D17] text-white py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div {...fadeUp} className="flex items-center justify-between text-xs font-mono text-white/80 uppercase tracking-widest border-b border-white/20 pb-4 mb-12">
            <EditableElement as="span" id="studio-faq-marker-l" field="faqMarkerL" value="( Asked Question )" type="text" />
            <EditableElement as="span" id="studio-faq-marker-r" field="faqMarkerR" value="( 006 )" type="text" />
          </motion.div>

          <motion.div {...fadeUp} className="mb-16">
            <EditableElement
              as="h2"
              id="studio-faq-title"
              field="faqHeading"
              value="Asked Questions•"
              type="heading"
              className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter text-white leading-none"
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div {...slideLeft} className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 max-w-md mx-auto lg:mx-0">
                <EditableImage
                  imageKey="studio-faq-img"
                  defaultSrc={faqImage}
                  defaultAlt="Digital agency creative"
                  className="w-full h-[360px] sm:h-[440px] object-cover"
                  containerClassName="w-full h-full"
                  objectFit="cover"
                />
              </div>
            </motion.div>

            <motion.div {...slideRight} className="lg:col-span-7 space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id || idx}
                    className="border-b border-white/30 pb-4 pt-2 transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between text-left group py-2 focus:outline-none cursor-pointer"
                    >
                      <EditableElement
                        as="span"
                        id={`studio-faq-${idx}-q`}
                        field="question"
                        value={faq.question}
                        type="heading"
                        className="text-lg sm:text-xl font-bold text-white group-hover:text-white/80 transition-colors pr-4"
                      />
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-[#FF4D17] transition-all"
                      >
                        {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: EASE_CURVE }}
                          className="mt-3 pr-8 overflow-hidden"
                        >
                          <EditableElement
                            as="p"
                            id={`studio-faq-${idx}-a`}
                            field="answer"
                            value={faq.answer}
                            type="text"
                            className="text-sm sm:text-base text-white/90 leading-relaxed font-light pb-2"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 11. Final CTA Section ────────────────────────────────────────────── */}
      <section id="contact" className="w-full bg-[#121214] text-white py-28 md:py-36">
        <motion.div {...scaleUp} className="max-w-7xl mx-auto px-6 text-center space-y-8">
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <EditableElement
              as="div"
              id="studio-cta-badge"
              field="ctaBadge"
              value="LET’S WORK TOGETHER"
              type="text"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-xs font-mono font-bold tracking-widest text-[#FF4D17] uppercase"
            />
          </motion.div>

          <EditableElement
            as="h2"
            id="studio-cta-title"
            field="ctaTitle"
            value="Have a Growth Problem Worth Solving?"
            type="heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight"
          />

          <EditableElement
            as="p"
            id="studio-cta-subtitle"
            field="ctaSubtitle"
            value="Book a 30-minute growth strategy session with our agency partners. We’ll audit your current ad stack and outline a clear scaling roadmap."
            type="text"
            className="text-base sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed"
          />

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
              <EditableButton
                buttonKey="studio-btn-cta-main"
                defaultText="Book Strategy Call"
                defaultHref={inquiryUrl}
                defaultOpenInNewTab={true}
                className="w-full sm:w-auto px-9 py-5 rounded-full bg-[#FF4D17] text-white font-extrabold text-sm uppercase tracking-wider hover:bg-white hover:text-[#121214] transition-all duration-300 shadow-xl shadow-[#FF4D17]/30 flex items-center justify-center gap-2"
              >
                <span>{activeButtonOverrides['studio-btn-cta-main']?.text || 'Book Strategy Call'}</span>
                <ArrowRight className="w-5 h-5" />
              </EditableButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }} className="w-full sm:w-auto">
              <EditableButton
                buttonKey="studio-btn-cta-email"
                defaultText="Direct Email Inquiry"
                defaultHref={`mailto:${email}`}
                className="w-full sm:w-auto px-9 py-5 rounded-full border border-white/20 text-white font-extrabold text-sm uppercase tracking-wider hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail className="w-5 h-5 text-[#FF4D17]" />
                <span>{activeButtonOverrides['studio-btn-cta-email']?.text || 'Direct Email Inquiry'}</span>
              </EditableButton>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ─── 12. Footer (CafeCloud Style with Protected "Built with Portiva" Card) ─ */}
      <motion.footer {...fadeUp} className="w-full bg-[#0B0B0E] text-white border-t border-white/10 pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-12 items-stretch">
            {/* Column 1: Brand Info (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <EditableElement
                  as="h3"
                  id="studio-footer-brand"
                  field="studioName"
                  value={`${studioName}®`}
                  type="heading"
                  className="text-xl sm:text-2xl font-black tracking-tight text-white"
                />
                <EditableElement
                  as="p"
                  id="studio-footer-desc"
                  field="footerDesc"
                  value="Universal digital marketing, performance advertising, and conversion engineering for high-growth brands worldwide."
                  type="text"
                  className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-sm"
                />
              </div>
              <EditableElement as="div" id="studio-footer-loc" field="footerLoc" value="NYC • LONDON • TOKYO • REMOTE" type="text" className="text-xs font-mono text-white/40" />
            </div>

            {/* Column 2: Quick Navigation Links (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <EditableElement as="span" id="studio-footer-nav-head" field="navHead" value="Quick Navigation" type="text" className="text-xs font-mono font-extrabold text-[#FF4D17] uppercase tracking-widest block" />
              <div className="flex flex-col gap-2.5 text-xs sm:text-sm font-semibold text-white/70">
                <a href="#about" className="hover:text-[#FF4D17] transition-colors text-left"><EditableElement as="span" id="studio-footer-link-0" field="link0" value="About" type="text" /></a>
                <a href="#services" className="hover:text-[#FF4D17] transition-colors text-left"><EditableElement as="span" id="studio-footer-link-1" field="link1" value="Services" type="text" /></a>
                <a href="#work" className="hover:text-[#FF4D17] transition-colors text-left"><EditableElement as="span" id="studio-footer-link-2" field="link2" value="Work" type="text" /></a>
                <a href="#process" className="hover:text-[#FF4D17] transition-colors text-left"><EditableElement as="span" id="studio-footer-link-3" field="link3" value="Process" type="text" /></a>
                <a href="#testimonials" className="hover:text-[#FF4D17] transition-colors text-left"><EditableElement as="span" id="studio-footer-link-4" field="link4" value="Testimonials" type="text" /></a>
                <a href="#faq" className="hover:text-[#FF4D17] transition-colors text-left"><EditableElement as="span" id="studio-footer-link-5" field="link5" value="FAQ" type="text" /></a>
              </div>
            </div>

            {/* Column 3: Protected "Built with Portiva" Card (lg:col-span-5) - NON-EDITABLE BY DESIGN */}
            <motion.div
              whileHover={{ borderColor: 'rgba(255,77,23,0.4)', y: -3 }}
              transition={{ duration: 0.3 }}
              className="lg:col-span-5 bg-white/5 border border-white/10 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group min-h-[220px] backdrop-blur-md"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FF4D17]/20 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF4D17]/20 border border-[#FF4D17]/30 text-[#FF4D17] text-xs font-mono font-bold tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Built with portiva.site</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2 leading-snug block">
                  Created in 60 seconds — Free forever
                </h3>

                <p className="text-xs sm:text-sm text-white/75 leading-relaxed block">
                  Build, customize, and publish your dream website instantly with AI. Fast, responsive, and completely free forever.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-white/80">
                  Build your website now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#FF4D17] hover:bg-[#FF4D17]/90 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Create Yours Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex items-center justify-between gap-4 text-xs text-white/50">
            <EditableElement
              as="p"
              id="studio-footer-copy"
              field="footerCopy"
              value={`© 2026 ${studioName}. All rights reserved.`}
              type="text"
              className="text-xs text-white/60"
            />
          </div>
        </div>
      </motion.footer>
    </div>
  );
};
