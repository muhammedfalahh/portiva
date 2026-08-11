'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Check,
  Star,
  Menu,
  X,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';

// ─── SVG Social Icons ───────────────────────────────────────────────────────
const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
  </svg>
);

// ─── Interfaces ─────────────────────────────────────────────────────────────
export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  format: string;
  price: string;
  description: string;
  features: string[];
  image: string;
  nextDate?: string;
  isPopular?: boolean;
}

export interface ResourceItem {
  id: string;
  title: string;
  tag: string;
  readTime: string;
  description: string;
  link: string;
}

export interface TestimonialItem {
  id?: string;
  name: string;
  roleOrSubject: string;
  quote: string;
  rating: string;
  image?: string;
}

export interface CredibilityStat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface MentorXProps {
  instructorName?: string;
  instructorTitle?: string;
  tagline?: string;
  bio?: string;
  instructorImage?: string;
  whatsappPhone?: string;
  email?: string;
  location?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  courses?: ProgramItem[];
  resources?: ResourceItem[];
  testimonials?: TestimonialItem[];
  stats?: CredibilityStat[];
  processSteps?: ProcessStep[];
  eventTitle?: string;
  eventDate?: string;
  eventImage?: string;
}

// ─── Default Data ───────────────────────────────────────────────────────────
const DEFAULT_PROGRAMS: ProgramItem[] = [
  {
    id: 'program-1',
    title: 'Leadership Reset & Executive Clarity',
    category: 'EXECUTIVE MENTORSHIP',
    level: 'Senior Leaders & Founders',
    duration: '4 Weeks',
    format: 'Live Intensive + 1-on-1',
    price: '$1,499',
    nextDate: 'Dec 05, 2026',
    isPopular: true,
    description: 'Rebuild your strategic decision-making framework, eliminate high-stakes pressure burnout, and command authority with confident execution.',
    features: [
      'Weekly 1-on-1 executive coaching sessions',
      'High-stakes decision matrix framework',
      'Direct WhatsApp priority audio clearance',
      'Boardroom communication & pitch prep',
      'Lifetime access to executive playbooks',
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'program-2',
    title: 'Career Clarity & Positioning',
    category: 'CAREER STRATEGY',
    level: 'Mid to Executive Level',
    duration: '6 Weeks',
    format: 'Cohort + Private Audit',
    price: '$2,100',
    nextDate: 'Dec 09, 2026',
    isPopular: false,
    description: 'Position your personal brand for executive roles, negotiate high-value compensation, and map out your next 3-year career trajectory.',
    features: [
      'Complete career trajectory diagnosis',
      'Executive positioning & LinkedIn audit',
      'Salary negotiation battle-tested scripts',
      'Access to private mentor alumni network',
      'Personalized career strategy roadmap',
    ],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'program-3',
    title: 'High-Stakes Communication',
    category: 'PUBLIC SPEAKING & INFLUENCE',
    level: 'All Professional Levels',
    duration: '3 Weeks',
    format: 'Masterclass & Feedback Labs',
    price: '$999',
    nextDate: 'Jan 15, 2027',
    isPopular: false,
    description: 'Master boardroom presentations, executive storytelling, and persuasive communication that moves teams and key stakeholders.',
    features: [
      'Live presentation review & video analysis',
      'Persuasive storytelling blueprint',
      'Handling tough audience questions under pressure',
      'Lifetime access to speech templates',
      'Direct slide & deck feedback',
    ],
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop',
  },
];

const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'The Executive Decision Matrix Playbook',
    tag: 'FRAMEWORK',
    readTime: '12 MIN READ',
    description: 'A practical 5-step blueprint for evaluating high-risk decisions under uncertainty without endless deliberation.',
    link: '#',
  },
  {
    id: 'res-2',
    title: 'Boardroom Influence & Communication Guide',
    tag: 'GUIDE',
    readTime: '8 MIN READ',
    description: 'Key verbal and non-verbal techniques used by top C-suite executives to align teams and get immediate buy-in.',
    link: '#',
  },
  {
    id: 'res-3',
    title: 'Personal Brand Blueprint for Leaders',
    tag: 'BLUEPRINT',
    readTime: '15 MIN READ',
    description: 'How to establish domain authority, publish insight-driven content, and attract career opportunities effortlessly.',
    link: '#',
  },
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Marcus Vance',
    roleOrSubject: 'VP of Product at Horizon Labs',
    quote: 'Working with this program was the single best career decision I made this year. I gained complete strategic clarity on my leadership approach and expanded my team without burnout.',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-2',
    name: 'Elena Rostova',
    roleOrSubject: 'Founder & CEO at ScaleUp Inc',
    quote: 'The framework-driven approach completely eliminated guess-work from our executive decision making. Outstanding depth, immediate clarity, and practical high-value execution.',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  },
  {
    id: 'test-3',
    name: 'David Chen',
    roleOrSubject: 'Director of Engineering',
    quote: 'Immediate return on investment. The clarity, structure, and 1-on-1 accountability changed how I communicate with stakeholders and lead high-stakes projects permanently.',
    rating: '5.0',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
  },
];

const DEFAULT_STATS: CredibilityStat[] = [
  { value: '12+', label: 'Years Mentoring' },
  { value: '500+', label: 'Leaders Coached' },
  { value: '98%', label: 'Retention & Success' },
  { value: '4.9/5', label: 'Average Client Rating' },
];

const DEFAULT_PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Diagnostic & Strategic Audit',
    description: 'We evaluate your current baseline, identify friction points, and define clear, high-impact milestones.',
  },
  {
    number: '02',
    title: 'Custom Execution Roadmap',
    description: 'Build a bespoke 90-day action plan tailored to your specific leadership, career, or skill objectives.',
  },
  {
    number: '03',
    title: 'High-Stakes 1-on-1 Coaching',
    description: 'Participate in structured sessions with real-time feedback, video reviews, and priority WhatsApp clearance.',
  },
  {
    number: '04',
    title: 'Mastery & Sustained Scale',
    description: 'Execute under pressure with battle-tested frameworks, measuring real-world outcomes at every stage.',
  },
];

// ─── Framer Motion Animation Presets (from Valkyri Luxe Store Reference) ───

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

const imageReveal = {
  initial: { opacity: 0, scale: 1.05 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-40px' as any },
  transition: { duration: 0.8, ease: EASE_CURVE },
};

// ─── Component ──────────────────────────────────────────────────────────────

export const MentorX: React.FC<MentorXProps> = ({
  instructorName = 'James Dalton',
  instructorTitle = 'EXECUTIVE MENTOR & STRATEGIST',
  tagline = 'Gain Clarity. Build Stronger Leadership.',
  bio = 'I work with executives and team leaders who want to think clearly, make better decisions, and guide their teams without pressure.',
  instructorImage = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop',
  whatsappPhone = '+1234567890',
  email = 'james@daltonmentorship.com',
  location = 'New York • Global Hybrid Studio',
  instagramUrl = 'https://instagram.com',
  youtubeUrl = 'https://youtube.com',
  courses = DEFAULT_PROGRAMS,
  resources = DEFAULT_RESOURCES,
  testimonials = DEFAULT_TESTIMONIALS,
  stats = DEFAULT_STATS,
  processSteps = DEFAULT_PROCESS_STEPS,
  eventTitle = 'Leadership Reset',
  eventDate = 'December 20, 2026',
  eventImage = 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop',
}) => {
  // Visual builder context (wrapped for SSR safety)
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch { /* SSR / missing provider fallback */ }

  const isEditing = builderCtx?.mode === 'EDITING';

  // ── Local State ──
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  // ── Header scroll effect ──
  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Helpers ──
  const cleanPhone = whatsappPhone.replace(/[^0-9]/g, '');
  const buildWhatsAppLink = (message: string) =>
    `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

  const nextTestimonial = () =>
    setActiveTestimonialIndex((p) => (p + 1) % testimonials.length);
  const prevTestimonial = () =>
    setActiveTestimonialIndex((p) => (p - 1 + testimonials.length) % testimonials.length);

  // ════════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════════

  return (
    <div
      className={`mentrox-root w-full min-h-screen bg-theme-background text-theme-foreground selection:bg-theme-primary/30 selection:text-theme-primary-text overflow-x-hidden relative font-sans transform-gpu transition-colors duration-300 ${
        isEditing ? 'is-editing' : ''
      }`}
    >
      {/* ── Font & Scoped Styles ── */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      />
      <style>{`
        .mentrox-root {
          font-family: 'Plus Jakarta Sans', 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Floating Hero Event Card motion */
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .hero-floating-card {
          animation: heroFloat 6s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }

        /* Smooth scroll */
        .mentrox-root { scroll-behavior: smooth; }
      `}</style>

      {/* ═══════════════════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
          headerScrolled
            ? 'bg-theme-background/90 backdrop-blur-lg border-b border-theme-border shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-[72px] flex items-center justify-between">
          {/* Replaceable Logo + Brand Name */}
          <div className="flex items-center gap-3">
            <EditableImage
              imageKey="mentor-nav-logo"
              defaultSrc={instructorImage}
              defaultAlt={instructorName}
              className="w-9 h-9 rounded-full object-cover shrink-0 border border-theme-border shadow-sm"
              containerClassName="w-9 h-9 rounded-full shrink-0"
            />
            <EditableElement
              as="span"
              id="mentor-nav-name"
              field="instructorName"
              value={instructorName}
              type="text"
              className="font-semibold text-[15px] text-theme-foreground tracking-tight"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'About', id: 'about' },
              { label: 'Programs', id: 'programs' },
              { label: 'Process', id: 'process' },
              { label: 'Resources', id: 'resources' },
              { label: 'Testimonials', id: 'testimonials' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[13px] font-medium text-theme-muted hover:text-theme-foreground transition-colors duration-200"
              >
                <EditableElement
                  as="span"
                  id={`mentor-nav-${item.id}`}
                  field={`nav_${item.id}`}
                  value={item.label}
                  type="text"
                />
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <EditableButton
              buttonKey="mentor-btn-nav-connect"
              defaultText="Let's Connect →"
              defaultHref={buildWhatsAppLink(`Hi ${instructorName}, I would like to schedule a discovery call.`)}
              defaultOpenInNewTab={true}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-theme-surface hover:bg-theme-surface-hover border border-theme-border text-theme-foreground text-[13px] font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] shadow-sm cursor-pointer"
            />
          </div>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full bg-theme-surface border border-theme-border text-theme-foreground hover:bg-theme-surface-hover transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 bg-theme-background/95 backdrop-blur-xl border-b border-theme-border flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {[
              { label: 'About', id: 'about' },
              { label: 'Programs', id: 'programs' },
              { label: 'Process', id: 'process' },
              { label: 'Resources', id: 'resources' },
              { label: 'Testimonials', id: 'testimonials' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-theme-muted py-2 hover:text-theme-foreground transition-colors"
              >
                <EditableElement
                  as="span"
                  id={`mentor-mob-nav-${item.id}`}
                  field={`mob_nav_${item.id}`}
                  value={item.label}
                  type="text"
                />
              </a>
            ))}
            <div className="pt-3 mt-1 border-t border-theme-border">
              <EditableButton
                buttonKey="mentor-btn-mobile-connect"
                defaultText="Let's Connect →"
                defaultHref={buildWhatsAppLink(`Hi ${instructorName}, I would like to schedule a discovery call.`)}
                defaultOpenInNewTab={true}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3 rounded-full bg-theme-primary text-theme-primary-text text-sm font-semibold transition-all duration-200 hover:bg-theme-primary-hover active:scale-[0.98] shadow-sm cursor-pointer"
              />
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1 — CINEMATIC HERO (Framer Motion Valkyri Style)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-end overflow-hidden transform-gpu">
        {/* Background Portrait */}
        <motion.div className="absolute inset-0 z-0" {...imageReveal}>
          <EditableImage
            imageKey="mentor-hero-portrait"
            defaultSrc={instructorImage}
            defaultAlt={instructorName}
            className="w-full h-full object-cover object-top"
            containerClassName="w-full h-full"
          />
          {/* Masking gradients */}
          <div className="absolute inset-0 bg-gradient-to-r from-theme-background via-theme-background/85 to-theme-background/25 lg:to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-background via-theme-background/40 to-theme-background/30 pointer-events-none" />
          <div className="absolute bottom-0 left-[30%] w-[500px] h-[350px] bg-[radial-gradient(ellipse_at_center,var(--theme-primary,rgba(36,75,255,0.15)),transparent_70%)] pointer-events-none opacity-40" />
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10 px-6 sm:px-8 pb-16 lg:pb-24 pt-36 lg:pt-48 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* ── Text Column ── */}
          <div className="lg:col-span-7 xl:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: EASE_CURVE }}
            >
              <EditableElement
                as="span"
                id="mentor-hero-title-label"
                field="instructorTitle"
                value={instructorTitle}
                type="text"
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-theme-primary block mb-5"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.2, ease: EASE_CURVE }}
            >
              <EditableElement
                as="h1"
                id="mentor-hero-tagline"
                field="tagline"
                value={tagline}
                type="heading"
                className="text-[clamp(2.75rem,6.5vw,5.5rem)] font-extrabold tracking-[-0.02em] text-theme-foreground leading-[1.05] mb-7 max-w-[640px]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE_CURVE }}
            >
              <EditableElement
                as="p"
                id="mentor-hero-bio"
                field="bio"
                value={bio}
                type="text"
                className="text-[17px] sm:text-lg text-theme-muted font-normal leading-[1.7] max-w-lg mb-10"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.4, ease: EASE_CURVE }}
            >
              <EditableButton
                buttonKey="mentor-btn-hero-primary"
                defaultText="Free Discovery Call →"
                defaultHref={buildWhatsAppLink(`Hi ${instructorName}, I want to book a free discovery call.`)}
                defaultOpenInNewTab={true}
                className="inline-flex items-center gap-3 px-7 py-3 rounded-full bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text font-semibold text-[15px] transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] shadow-lg cursor-pointer"
              />
            </motion.div>
          </div>

          {/* ── Floating Event Card ── */}
          <div className="lg:col-span-5 xl:col-span-4 flex lg:justify-end">
            <motion.div
              {...slideRight}
              transition={{ duration: 0.7, delay: 0.35, ease: EASE_CURVE }}
              className="w-full max-w-[300px] rounded-2xl bg-theme-surface/90 backdrop-blur-sm border border-theme-border p-4 shadow-xl hero-floating-card hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-pulse" />
                <EditableElement
                  as="span"
                  id="mentor-hero-event-label"
                  field="eventLabel"
                  value="Next Event"
                  type="text"
                  className="text-[10px] font-medium tracking-[0.15em] uppercase text-theme-muted"
                />
              </div>

              <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 group">
                <EditableImage
                  imageKey="mentor-hero-event-img"
                  defaultSrc={eventImage}
                  defaultAlt={eventTitle}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3">
                  <EditableElement
                    as="span"
                    id="mentor-hero-event-date"
                    field="eventDate"
                    value={eventDate}
                    type="text"
                    className="text-[11px] font-medium text-white"
                  />
                </div>
              </div>

              <EditableElement
                as="h3"
                id="mentor-hero-event-title"
                field="eventTitle"
                value={eventTitle}
                type="heading"
                className="text-lg font-semibold text-theme-foreground leading-tight"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2 — AUTHORITY BAR (Stats Strip — Framer Motion Staggered Scale)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full border-y border-theme-border bg-theme-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 sm:py-14 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6">
          {stats.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' as any }}
              transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE_CURVE }}
              className={`text-center md:text-left ${
                idx > 0 ? 'md:border-l md:border-theme-border md:pl-8' : ''
              }`}
            >
              <EditableElement
                as="span"
                id={`mentor-stat-value-${idx}`}
                field={`stat_${idx}_val`}
                value={st.value}
                type="text"
                className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-theme-foreground tracking-tight block leading-none"
              />
              <EditableElement
                as="span"
                id={`mentor-stat-label-${idx}`}
                field={`stat_${idx}_lbl`}
                value={st.label}
                type="text"
                className="text-[11px] font-medium text-theme-muted uppercase tracking-[0.15em] mt-2 block"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 3 — PHILOSOPHY & APPROACH (Framer Motion Directional Split)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="about" className="w-full py-24 sm:py-32 bg-theme-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Section Header */}
          <motion.div className="mb-14 sm:mb-20" {...fadeUp}>
            <EditableElement
              as="span"
              id="mentor-about-label"
              field="aboutLabel"
              value="Philosophy & Experience"
              type="text"
              className="text-[11px] font-medium tracking-[0.2em] uppercase text-theme-primary block mb-5"
            />
            <EditableElement
              as="h2"
              id="mentor-about-headline"
              field="aboutHeadline"
              value="I help leaders think clearer, lead better, and move forward."
              type="heading"
              className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-[-0.015em] text-theme-foreground leading-[1.12] max-w-3xl mb-6"
            />
            <EditableElement
              as="p"
              id="mentor-about-sub"
              field="aboutSub"
              value="Great leadership isn't about having all the answers—it's about building the clarity to ask the right questions and execute under pressure."
              type="text"
              className="text-lg text-theme-muted font-normal leading-relaxed max-w-2xl"
            />
          </motion.div>

          {/* Feature Card + Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Approach Card (Framer Motion Slide Left) */}
            <motion.div
              {...slideLeft}
              className="lg:col-span-7 bg-gradient-to-br from-theme-primary via-theme-primary to-theme-primary-hover text-theme-primary-text rounded-2xl p-8 sm:p-10 flex flex-col justify-between min-h-[340px] relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-out hover:-translate-y-1 group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <ShieldCheck className="w-5 h-5 text-theme-primary-text" />
                </div>
                <EditableElement
                  as="h3"
                  id="mentor-bento-card1-title"
                  field="bentoCard1Title"
                  value="First-Principles Mentorship"
                  type="heading"
                  className="text-2xl sm:text-3xl font-bold text-theme-primary-text mb-4 leading-tight"
                />
                <EditableElement
                  as="p"
                  id="mentor-bento-card1-body"
                  field="bentoCard1Body"
                  value="We bypass superficial tactics. Every mentorship module is engineered around your specific challenges, giving you lifetime frameworks for decision-making, influence, and team alignment."
                  type="text"
                  className="text-theme-primary-text/90 text-base font-normal leading-relaxed"
                />
              </div>

              <div className="pt-6 mt-8 border-t border-white/20 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-medium tracking-[0.1em] uppercase text-theme-primary-text/80">
                <EditableElement
                  as="span"
                  id="mentor-bento-tag-1"
                  field="bentoTag1"
                  value="Executive Strategy"
                  type="text"
                />
                <EditableElement
                  as="span"
                  id="mentor-bento-tag-2"
                  field="bentoTag2"
                  value="Direct 1-on-1 Guidance"
                  type="text"
                />
                <EditableElement
                  as="span"
                  id="mentor-bento-tag-3"
                  field="bentoTag3"
                  value="Actionable Outcomes"
                  type="text"
                />
              </div>
            </motion.div>

            {/* About Image (Framer Motion Slide Right) */}
            <motion.div
              {...slideRight}
              className="lg:col-span-5 relative rounded-2xl overflow-hidden min-h-[300px] lg:min-h-[340px] border border-theme-border group shadow-md hover:shadow-xl transition-all duration-300"
            >
              <EditableImage
                imageKey="mentor-about-img"
                defaultSrc="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop"
                defaultAlt="Mentorship session"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                containerClassName="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 4 — PROGRAMS & PRICING (Framer Motion Staggered Scale Cards)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="programs" className="w-full py-24 sm:py-32 bg-theme-surface border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16" {...fadeUp}>
            <div>
              <EditableElement
                as="span"
                id="mentor-programs-label"
                field="programsLabel"
                value="Mentorship Programs"
                type="text"
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-theme-primary block mb-4"
              />
              <EditableElement
                as="h2"
                id="mentor-programs-section-title"
                field="programsSectionTitle"
                value="Transformative Programs & Rates"
                type="heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-foreground tracking-tight"
              />
            </div>
            <EditableElement
              as="p"
              id="mentor-programs-section-sub"
              field="programsSectionSub"
              value="High-impact mentorship tracks engineered to produce measurable career, leadership, and decision-making breakthroughs."
              type="text"
              className="text-theme-muted text-sm max-w-md font-normal leading-relaxed"
            />
          </motion.div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {courses.map((program, idx) => {
              const isFeatured = program.isPopular || idx === 0;
              return (
                <motion.div
                  key={program.id || idx}
                  initial={{ opacity: 0, y: 32, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' as any }}
                  transition={{ duration: 0.6, delay: idx * 0.12, ease: EASE_CURVE }}
                  className={`rounded-2xl p-7 sm:p-8 flex flex-col justify-between border transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) hover:-translate-y-1.5 hover:shadow-xl ${
                    isFeatured
                      ? 'bg-theme-background border-2 border-theme-primary shadow-lg'
                      : 'bg-theme-background border border-theme-border hover:border-theme-primary/40'
                  }`}
                >
                  <div>
                    {/* Category + Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-semibold tracking-[0.12em] uppercase text-theme-primary bg-theme-primary/10 px-3 py-1 rounded-full border border-theme-primary/20">
                        <EditableElement
                          as="span"
                          id={`mentor-prog-cat-${idx}`}
                          field={`prog_${idx}_cat`}
                          value={program.category}
                          type="text"
                        />
                      </span>
                      {isFeatured && (
                        <span className="text-[10px] font-semibold tracking-wider uppercase text-theme-primary-text bg-theme-primary px-3 py-1 rounded-full shadow-sm">
                          <EditableElement
                            as="span"
                            id={`mentor-prog-popular-${idx}`}
                            field={`prog_${idx}_popular`}
                            value="Popular"
                            type="text"
                          />
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <EditableElement
                      as="h3"
                      id={`mentor-prog-title-${idx}`}
                      field={`prog_${idx}_title`}
                      value={program.title}
                      type="heading"
                      className="text-xl sm:text-2xl font-bold text-theme-foreground mb-2 leading-tight"
                    />

                    {/* Duration / Format */}
                    <p className="text-xs font-medium text-theme-muted mb-5">
                      <EditableElement
                        as="span"
                        id={`mentor-prog-level-${idx}`}
                        field={`prog_${idx}_level`}
                        value={`${program.duration} · ${program.format}`}
                        type="text"
                      />
                    </p>

                    {/* Price */}
                    <div className="mb-5 pb-5 border-b border-theme-border flex items-baseline gap-2">
                      <EditableElement
                        as="span"
                        id={`mentor-prog-price-${idx}`}
                        field={`prog_${idx}_price`}
                        value={program.price}
                        type="text"
                        className="text-3xl sm:text-4xl font-bold text-theme-foreground tracking-tight"
                      />
                      <EditableElement
                        as="span"
                        id={`mentor-prog-price-suffix-${idx}`}
                        field={`prog_${idx}_price_suffix`}
                        value="/ program"
                        type="text"
                        className="text-xs font-medium text-theme-muted"
                      />
                    </div>

                    {/* Description */}
                    <EditableElement
                      as="p"
                      id={`mentor-prog-desc-${idx}`}
                      field={`prog_${idx}_desc`}
                      value={program.description}
                      type="text"
                      className="text-theme-muted text-sm font-normal leading-relaxed mb-6"
                    />

                    {/* Features */}
                    <div className="mb-8">
                      <EditableElement
                        as="span"
                        id="mentor-programs-included-label"
                        field="programsIncludedLabel"
                        value="What's included:"
                        type="text"
                        className="text-[11px] font-semibold tracking-[0.1em] text-theme-muted uppercase block mb-4"
                      />
                      <ul className="space-y-2.5">
                        {program.features.map((feat, fidx) => (
                          <li
                            key={fidx}
                            className="flex items-start gap-2.5 text-[13px] text-theme-foreground font-normal"
                          >
                            <span className="w-4 h-4 rounded-full bg-theme-primary/15 text-theme-primary flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="w-2.5 h-2.5" />
                            </span>
                            <EditableElement
                              as="span"
                              id={`mentor-prog-${idx}-feat-${fidx}`}
                              field={`prog_${idx}_feat_${fidx}`}
                              value={feat}
                              type="text"
                            />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* CTA */}
                  <EditableButton
                    buttonKey={`mentor-btn-prog-enroll-${idx}`}
                    defaultText="Enroll in Program →"
                    defaultHref={buildWhatsAppLink(
                      `Hi ${instructorName}, I want to enroll in the ${program.title} program.`,
                    )}
                    defaultOpenInNewTab={true}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer ${
                      isFeatured
                        ? 'bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text shadow-md'
                        : 'bg-theme-surface-hover border border-theme-border text-theme-foreground hover:bg-theme-primary hover:text-theme-primary-text'
                    }`}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 5 — PROCESS / HOW WE WORK (Framer Motion Sequential Reveal)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="process" className="w-full py-24 sm:py-32 bg-theme-background border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16" {...fadeUp}>
            <div>
              <EditableElement
                as="span"
                id="mentor-process-label"
                field="processLabel"
                value="How We Work Together"
                type="text"
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-theme-primary block mb-4"
              />
              <EditableElement
                as="h2"
                id="mentor-process-title"
                field="processTitle"
                value="The 4-Step Transformation Path"
                type="heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-foreground tracking-tight"
              />
            </div>
            <EditableElement
              as="p"
              id="mentor-process-sub"
              field="processSub"
              value="A structured, battle-tested methodology designed to move ambitious leaders from strategic friction to peak execution."
              type="text"
              className="text-theme-muted text-sm max-w-md font-normal leading-relaxed"
            />
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' as any }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: EASE_CURVE }}
                className="bg-theme-surface border border-theme-border rounded-2xl p-7 sm:p-8 hover:border-theme-primary/40 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) hover:-translate-y-1 hover:shadow-lg flex flex-col group"
              >
                {/* Decorative Step Number */}
                <EditableElement
                  as="span"
                  id={`mentor-process-step-num-${idx}`}
                  field={`proc_${idx}_num`}
                  value={st.number}
                  type="text"
                  className="text-[4rem] sm:text-[5rem] font-extrabold leading-none text-theme-foreground/5 select-none mb-2 block group-hover:text-theme-primary/20 transition-colors duration-500"
                />

                <EditableElement
                  as="h3"
                  id={`mentor-process-step-title-${idx}`}
                  field={`proc_${idx}_title`}
                  value={st.title}
                  type="heading"
                  className="text-lg font-semibold text-theme-foreground mb-3"
                />
                <EditableElement
                  as="p"
                  id={`mentor-process-step-desc-${idx}`}
                  field={`proc_${idx}_desc`}
                  value={st.description}
                  type="text"
                  className="text-theme-muted text-sm font-normal leading-relaxed"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6 — TESTIMONIALS (Framer Motion Directional + Scale)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="testimonials" className="w-full py-24 sm:py-32 bg-theme-surface border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left — Section Header */}
            <motion.div className="lg:col-span-4" {...slideLeft}>
              <EditableElement
                as="span"
                id="mentor-testi-label"
                field="testiLabel"
                value="Client Results"
                type="text"
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-theme-primary block mb-4"
              />
              <EditableElement
                as="h2"
                id="mentor-testi-header"
                field="testiHeader"
                value="Trusted by leaders who wanted more clarity."
                type="heading"
                className="text-3xl sm:text-4xl font-bold text-theme-foreground tracking-tight leading-tight mb-6"
              />
              <EditableElement
                as="p"
                id="mentor-testi-sub"
                field="testiSub"
                value="Read how executive coaching and strategic mentorship helped leaders navigate critical crossroads and achieve breakthrough outcomes."
                type="text"
                className="text-theme-muted text-sm font-normal leading-relaxed mb-8"
              />

              {/* Carousel Controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-theme-muted tabular-nums mr-1">
                  {String(activeTestimonialIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
                </span>
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 rounded-full border border-theme-border text-theme-foreground flex items-center justify-center hover:bg-theme-surface-hover transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="w-10 h-10 rounded-full bg-theme-primary text-theme-primary-text flex items-center justify-center hover:bg-theme-primary-hover transition-all duration-200 active:scale-95 shadow-sm"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Right — Active Testimonial Card */}
            <motion.div className="lg:col-span-8" {...scaleUp}>
              <div className="bg-theme-background rounded-2xl p-8 sm:p-10 lg:p-12 border border-theme-border shadow-md transition-all duration-500 ease-out">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                  <EditableElement
                    as="span"
                    id={`mentor-testi-rating-${activeTestimonialIndex}`}
                    field={`testi_${activeTestimonialIndex}_rating`}
                    value={testimonials[activeTestimonialIndex]?.rating || '5.0'}
                    type="text"
                    className="text-sm font-medium text-theme-foreground ml-2"
                  />
                </div>

                {/* Quote */}
                <EditableElement
                  as="p"
                  id={`mentor-testi-quote-${activeTestimonialIndex}`}
                  field={`testi_${activeTestimonialIndex}_quote`}
                  value={`"${testimonials[activeTestimonialIndex]?.quote || ''}"`}
                  type="text"
                  className="text-xl sm:text-2xl lg:text-[1.7rem] font-medium text-theme-foreground leading-[1.55] mb-10"
                />

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-theme-border">
                  {testimonials[activeTestimonialIndex]?.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-theme-primary shadow-sm">
                      <img
                        src={testimonials[activeTestimonialIndex].image}
                        alt={testimonials[activeTestimonialIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <EditableElement
                      as="span"
                      id={`mentor-testi-name-${activeTestimonialIndex}`}
                      field={`testi_${activeTestimonialIndex}_name`}
                      value={testimonials[activeTestimonialIndex]?.name || ''}
                      type="text"
                      className="text-base font-semibold text-theme-foreground block"
                    />
                    <EditableElement
                      as="span"
                      id={`mentor-testi-role-${activeTestimonialIndex}`}
                      field={`testi_${activeTestimonialIndex}_role`}
                      value={testimonials[activeTestimonialIndex]?.roleOrSubject || ''}
                      type="text"
                      className="text-xs font-medium text-theme-primary block mt-0.5"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7 — RESOURCES & INSIGHTS (Framer Motion Bento Stagger)
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="resources" className="w-full py-24 sm:py-32 bg-theme-background border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {/* Header */}
          <motion.div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 sm:mb-16" {...fadeUp}>
            <div>
              <EditableElement
                as="span"
                id="mentor-resources-label"
                field="resourcesLabel"
                value="Insights & Playbooks"
                type="text"
                className="text-[11px] font-medium tracking-[0.2em] uppercase text-theme-primary block mb-4"
              />
              <EditableElement
                as="h2"
                id="mentor-resources-title"
                field="resourcesTitle"
                value="Featured Resources"
                type="heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-foreground tracking-tight"
              />
            </div>
            <EditableElement
              as="p"
              id="mentor-resources-sub"
              field="resourcesSub"
              value="Curated frameworks and strategic playbooks designed to help ambitious leaders master high-stakes situations."
              type="text"
              className="text-theme-muted text-sm max-w-md font-normal leading-relaxed"
            />
          </motion.div>

          {/* Bento Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {resources.map((res, idx) => {
              const colClass =
                idx === 0
                  ? 'md:col-span-5'
                  : idx === 1
                    ? 'md:col-span-7'
                    : 'md:col-span-12';
              const isWide = idx === 2;

              return (
                <motion.div
                  key={res.id || idx}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' as any }}
                  transition={{ duration: 0.55, delay: idx * 0.12, ease: EASE_CURVE }}
                  className={`${colClass} bg-theme-surface border border-theme-border rounded-2xl p-7 sm:p-8 hover:border-theme-primary/40 transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1) hover:-translate-y-1 hover:shadow-xl group ${
                    isWide
                      ? 'md:flex md:items-center md:justify-between md:gap-10'
                      : 'flex flex-col justify-between'
                  }`}
                >
                  <div className={isWide ? 'flex-1' : ''}>
                    <div className="flex items-center justify-between mb-5">
                      <span className="px-3 py-1 rounded-full bg-theme-primary/10 text-theme-primary text-[10px] font-semibold tracking-[0.1em] uppercase border border-theme-primary/20">
                        <EditableElement
                          as="span"
                          id={`mentor-res-tag-${idx}`}
                          field={`res_${idx}_tag`}
                          value={res.tag}
                          type="text"
                        />
                      </span>
                      <span className="text-[11px] font-medium text-theme-muted flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <EditableElement
                          as="span"
                          id={`mentor-res-time-${idx}`}
                          field={`res_${idx}_time`}
                          value={res.readTime}
                          type="text"
                        />
                      </span>
                    </div>

                    <EditableElement
                      as="h3"
                      id={`mentor-res-title-${idx}`}
                      field={`res_${idx}_title`}
                      value={res.title}
                      type="heading"
                      className={`font-bold text-theme-foreground mb-3 group-hover:text-theme-primary transition-colors duration-300 ${
                        idx === 1 ? 'text-2xl' : 'text-xl'
                      }`}
                    />

                    <EditableElement
                      as="p"
                      id={`mentor-res-desc-${idx}`}
                      field={`res_${idx}_desc`}
                      value={res.description}
                      type="text"
                      className={`text-theme-muted text-sm font-normal leading-relaxed ${
                        isWide ? '' : 'mb-6'
                      }`}
                    />
                  </div>

                  <div className={isWide ? 'shrink-0 mt-4 md:mt-0' : 'mt-4'}>
                    <EditableButton
                      buttonKey={`mentor-btn-res-${idx}`}
                      defaultText="Read Playbook →"
                      defaultHref={buildWhatsAppLink(
                        `Hi ${instructorName}, I would like to request the resource: ${res.title}.`,
                      )}
                      defaultOpenInNewTab={true}
                      className="inline-flex items-center text-xs font-semibold text-theme-primary hover:text-theme-primary-hover transition-colors duration-200 cursor-pointer"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 8 — FINAL CTA (Framer Motion Expressive Reveal)
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="w-full py-28 sm:py-36 bg-gradient-to-b from-theme-surface via-theme-surface to-theme-primary/20 border-t border-theme-border relative overflow-hidden transform-gpu">
        {/* Ambient radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[radial-gradient(ellipse_at_center,var(--theme-primary,rgba(36,75,255,0.12)),transparent_70%)] pointer-events-none opacity-40" />

        <motion.div className="max-w-3xl mx-auto px-6 text-center relative z-10" {...fadeUp}>
          <EditableElement
            as="h2"
            id="mentor-final-cta-title"
            field="finalCtaTitle"
            value="Ready to Move Forward?"
            type="heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-theme-foreground mb-6 leading-tight"
          />

          <EditableElement
            as="p"
            id="mentor-final-cta-sub"
            field="finalCtaSub"
            value="Let's build the clarity behind your next step. Book a private discovery session or talk directly on WhatsApp."
            type="text"
            className="text-theme-muted text-lg sm:text-xl max-w-xl mx-auto mb-10 font-normal leading-relaxed"
          />

          <motion.div className="flex justify-center" {...scaleUp}>
            <EditableButton
              buttonKey="mentor-btn-final-connect"
              defaultText="Let's Connect →"
              defaultHref={buildWhatsAppLink(
                `Hi ${instructorName}, I want to start my mentorship journey.`,
              )}
              defaultOpenInNewTab={true}
              className="inline-flex items-center gap-3.5 px-8 py-3.5 rounded-full bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text font-semibold text-base transition-all duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98] shadow-xl cursor-pointer"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          FOOTER (Framer Motion Staggered Columns)
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="w-full py-16 bg-theme-background border-t border-theme-border">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start mb-12">

            {/* Column 1: Brand & Copyright (lg:col-span-4) */}
            <motion.div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4" {...fadeUp}>
              <div className="flex items-center gap-3">
                <EditableImage
                  imageKey="mentor-footer-logo"
                  defaultSrc={instructorImage}
                  defaultAlt={instructorName}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-theme-border shadow-sm"
                  containerClassName="w-8 h-8 rounded-full shrink-0"
                />
                <EditableElement
                  as="span"
                  id="mentor-footer-brand-name"
                  field="instructorName"
                  value={instructorName}
                  type="text"
                  className="font-semibold text-base text-theme-foreground tracking-tight"
                />
              </div>

              <EditableElement
                as="p"
                id="mentor-footer-bio-summary"
                field="footerBioSummary"
                value="Executive mentorship and strategic coaching engineered for leaders, founders, and ambitious career professionals."
                type="text"
                className="text-xs text-theme-muted leading-relaxed max-w-sm"
              />

              <div className="pt-2">
                <EditableElement
                  as="p"
                  id="mentor-footer-copy"
                  field="footerCopy"
                  value={`© 2026 ${instructorName}. All rights reserved.`}
                  type="text"
                  className="text-xs font-medium text-theme-muted"
                />
              </div>
            </motion.div>

            {/* Column 2: Navigation & Social (lg:col-span-3) */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' as any }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE_CURVE }}
              className="lg:col-span-3 space-y-6"
            >
              <div>
                <EditableElement
                  as="span"
                  id="mentor-footer-nav-title"
                  field="footerNavTitle"
                  value="NAVIGATION"
                  type="text"
                  className="text-[10px] font-bold tracking-[0.15em] text-theme-muted uppercase block mb-3"
                />
                <div className="flex flex-col gap-2.5 text-xs font-medium text-theme-muted">
                  {[
                    { label: 'About', id: 'about' },
                    { label: 'Programs', id: 'programs' },
                    { label: 'Process', id: 'process' },
                    { label: 'Resources', id: 'resources' },
                    { label: 'Testimonials', id: 'testimonials' },
                  ].map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="hover:text-theme-foreground transition-colors duration-200 w-fit"
                    >
                      <EditableElement
                        as="span"
                        id={`mentor-footer-nav-${item.id}`}
                        field={`footer_nav_${item.id}`}
                        value={item.label}
                        type="text"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-5 pt-2">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-theme-muted hover:text-theme-foreground transition-colors duration-200 flex items-center gap-1.5 text-xs"
                >
                  <InstagramIcon className="w-4 h-4" />
                  <EditableElement
                    as="span"
                    id="mentor-footer-social-ig"
                    field="footerSocialIg"
                    value="Instagram"
                    type="text"
                  />
                </a>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-theme-muted hover:text-theme-foreground transition-colors duration-200 flex items-center gap-1.5 text-xs"
                >
                  <YoutubeIcon className="w-4 h-4" />
                  <EditableElement
                    as="span"
                    id="mentor-footer-social-yt"
                    field="footerSocialYt"
                    value="YouTube"
                    type="text"
                  />
                </a>
              </div>
            </motion.div>

            {/* Column 3: Protected "Built with Portiva" Card (lg:col-span-5) - NON-EDITABLE BY DESIGN */}
            <motion.div
              {...scaleUp}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE_CURVE }}
              className="lg:col-span-5 bg-theme-surface/80 border border-theme-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-theme-primary/40 transition-all duration-300 min-h-[200px] backdrop-blur-md"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-theme-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/15 border border-theme-primary/30 text-theme-primary text-[10px] font-mono font-bold tracking-widest uppercase mb-3">
                  <Sparkles className="w-3 h-3" />
                  <span>Built with portiva.site</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-theme-foreground tracking-tight mb-1.5 leading-snug block">
                  Created in 60 seconds — Free forever
                </h3>

                <p className="text-xs text-theme-muted leading-relaxed block">
                  Build, customize, and publish your dream website instantly with AI. Fast, responsive, and completely free forever.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-theme-border flex items-center justify-between gap-4">
                <span className="text-xs font-semibold text-theme-foreground/80">
                  Build your website now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Create Yours Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

          </div>
        </div>
      </footer>
    </div>
  );
};
