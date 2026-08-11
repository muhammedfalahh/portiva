/**
 * =============================================================================
 * PORTIVA: Snap Master — Premium Universal Portfolio Template
 * =============================================================================
 *
 * A fully redesigned, premium single-page portfolio template suitable for
 * developers, designers, freelancers, agencies, creators, and professionals
 * of any kind. Retains the original Snap Master identity while delivering
 * a modern, animation-rich, responsive experience.
 *
 * Sections (13):
 *   1.  Sticky Glassmorphic Navbar (scroll hide/show + active section)
 *   2.  Split Hero (heading, description, CTAs, portrait image)
 *   3.  Stats / Metrics (4 animated reveal cards)
 *   4.  About (image, bio, rotating badge, highlights)
 *   5.  Services (4 icon-based cards)
 *   6.  Featured Projects (3 image cards with hover effects)
 *   7.  Experience Timeline (3 vertical items)
 *   8.  Skills (tag cloud)
 *   9.  Testimonials (3 star-rated cards)
 *   10. FAQ (animated accordion, 4 items)
 *   11. CTA Banner (full-width gradient)
 *   12. Contact (info cards + CTA button)
 *   13. Footer (multi-column with links)
 *
 * Animation: IntersectionObserver-based scroll reveal, CSS transitions,
 *   staggered card delays, accordion transitions, navbar scroll behavior.
 *
 * Images: 5 total (1 hero, 1 about, 3 projects). Everything else is
 *   typography, icons, gradients, spacing, and modern UI components.
 *
 * Editor: Every text, image, and button uses EditableElement / EditableImage /
 *   EditableButton with descriptive id + field names for the visual builder.
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import {
  Menu, X, ArrowRight, ArrowUpRight,
  Layers, Palette, Code, Zap,
  ChevronDown, Star, MapPin, Mail, Phone, Maximize2, ExternalLink,
} from 'lucide-react';

// ─── Helper: Time-Based Smooth Custom Cursor ────────────────────────────────
function SmoothCursor({ isEditing }: { isEditing: boolean }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (isEditing) return;
    if (window.matchMedia?.('(pointer: coarse)').matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const render = () => {
      const time = Date.now();
      const hue = (time / 35) % 360;

      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      const activeColor = `hsl(${hue}, 90%, 65%)`;
      const activeGlow = `0 0 24px hsla(${hue}, 90%, 60%, 0.7)`;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0px) translate(-50%, -50%) scale(${
          isMouseDown ? 0.6 : 1
        })`;
        dotRef.current.style.backgroundColor = activeColor;
        dotRef.current.style.boxShadow = activeGlow;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0px) translate(-50%, -50%) scale(${
          isHovered ? 1.7 : isMouseDown ? 0.8 : 1
        })`;
        ringRef.current.style.borderColor = activeColor;
        ringRef.current.style.boxShadow = isHovered ? activeGlow : 'none';
      }

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animFrameId);
    };
  }, [isEditing]);

  if (isEditing) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out"
        style={{ willChange: 'transform, background-color, box-shadow' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-transparent pointer-events-none z-[9998] transition-transform duration-150 ease-out"
        style={{ willChange: 'transform, border-color, box-shadow' }}
      />
    </>
  );
}

// ─── Helper: IntersectionObserver Scroll-Reveal Wrapper ─────────────────────
function RevealOnScroll({
  children,
  className = '',
  delay = 0,
  variant = 'fade-up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'blur-in';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getInitialTransform = () => {
    switch (variant) {
      case 'fade-down': return 'translateY(-40px)';
      case 'fade-left': return 'translateX(-40px)';
      case 'fade-right': return 'translateX(40px)';
      case 'scale-up': return 'scale(0.92)';
      case 'blur-in': return 'none';
      default: return 'translateY(40px)';
    }
  };

  const getInitialFilter = () => {
    return variant === 'blur-in' ? 'blur(12px)' : 'none';
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(),
        filter: isVisible ? 'none' : getInitialFilter(),
        willChange: 'transform, opacity, filter',
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, filter 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Props Interface ────────────────────────────────────────────────────────

export interface SnapMasterProps {
  // Profile
  fullName?: string;
  handle?: string;

  // Navbar
  navbarBg?: string;
  hoverStyle?: string;

  // Hero
  heroImage?: string;
  heroHeading?: string;
  heroSubtitle?: string;
  heroDescription?: string;

  // Stats
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  stat4Value?: string;
  stat4Label?: string;

  // About
  aboutImage?: string;
  aboutDescription?: string;
  aboutBadgeText?: string;
  aboutHighlight1Value?: string;
  aboutHighlight1Label?: string;
  aboutHighlight2Value?: string;
  aboutHighlight2Label?: string;

  // Services
  service1Title?: string;
  service1Description?: string;
  service2Title?: string;
  service2Description?: string;
  service3Title?: string;
  service3Description?: string;
  service4Title?: string;
  service4Description?: string;

  // Projects
  project1Title?: string;
  project1Category?: string;
  project1Description?: string;
  project1Image?: string;
  project2Title?: string;
  project2Category?: string;
  project2Description?: string;
  project2Image?: string;
  project3Title?: string;
  project3Category?: string;
  project3Description?: string;
  project3Image?: string;

  // Timeline
  timeline1Year?: string;
  timeline1Title?: string;
  timeline1Description?: string;
  timeline2Year?: string;
  timeline2Title?: string;
  timeline2Description?: string;
  timeline3Year?: string;
  timeline3Title?: string;
  timeline3Description?: string;

  // Skills
  skill1?: string;
  skill2?: string;
  skill3?: string;
  skill4?: string;
  skill5?: string;
  skill6?: string;
  skill7?: string;
  skill8?: string;

  // Testimonials
  testimonial1Name?: string;
  testimonial1Role?: string;
  testimonial1Quote?: string;
  testimonial2Name?: string;
  testimonial2Role?: string;
  testimonial2Quote?: string;
  testimonial3Name?: string;
  testimonial3Role?: string;
  testimonial3Quote?: string;

  // FAQ
  faq1Question?: string;
  faq1Answer?: string;
  faq2Question?: string;
  faq2Answer?: string;
  faq3Question?: string;
  faq3Answer?: string;
  faq4Question?: string;
  faq4Answer?: string;

  // Contact
  contactSubtitle?: string;
  contactTitle?: string;
  contactDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
  contactCard1Label?: string;
  contactCard2Label?: string;
  contactCard3Label?: string;

  // Footer
  footerBrandName?: string;
  footerDescription?: string;
  footerQuickLinksTitle?: string;
  footerContactTitle?: string;
  footerCopyright?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export const SnapMaster: React.FC<SnapMasterProps> = ({
  fullName = 'Bruno Erdison',
  handle = 'bruno',
  navbarBg = 'glass',
  hoverStyle = 'pill',

  heroImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  heroHeading = 'UI/UX Interaction Designer',
  heroSubtitle = 'Based in Poland',
  heroDescription = "Work for money and design for love! I'm Bruno, an UI/UX Interaction Designer based in Poland",

  stat1Value = '8',
  stat1Label = 'YEARS OF EXPERIENCE',
  stat2Value = '100%',
  stat2Label = 'SATISFACTION CLIENTS',
  stat3Value = '+ 80',
  stat3Label = 'CLIENTS ON WORLDWIDE',
  stat4Value = '675',
  stat4Label = 'PROJECTS DONE',

  aboutImage = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  aboutDescription = 'With over 8 years of experience in design and development, I bring a unique blend of creativity and technical expertise to every project. My approach combines strategic thinking with meticulous execution to deliver solutions that not only meet expectations but consistently exceed them.',
  aboutBadgeText = 'CREATE • DESIGN • BUILD • SHIP • ',
  aboutHighlight1Value = '10+',
  aboutHighlight1Label = 'Years of Experience',
  aboutHighlight2Value = '200+',
  aboutHighlight2Label = 'Projects Completed',

  service1Title = 'Website Design',
  service1Description = 'Comprehensive research and strategic planning to define clear objectives, target audiences, and actionable roadmaps for your project.',
  service2Title = 'Mobile Application Design',
  service2Description = 'Crafting visually stunning and user-centric designs that communicate your brand story and engage your audience effectively.',
  service3Title = 'Animation',
  service3Description = 'Building robust, scalable, and performant solutions using modern technologies, clean architecture, and industry best practices.',
  service4Title = 'Growth & Analytics',
  service4Description = 'Data-driven optimization strategies to maximize your digital presence, improve conversion rates, and accelerate business growth.',

  project1Title = 'Nova Dashboard',
  project1Category = 'Web Application',
  project1Description = 'A comprehensive analytics dashboard with real-time data visualization, user management, and custom reporting tools.',
  project1Image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
  project2Title = 'Meridian Brand',
  project2Category = 'Brand Identity',
  project2Description = 'Complete brand identity redesign including visual language, guidelines, and digital asset creation for a tech startup.',
  project2Image = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600&auto=format&fit=crop',
  project3Title = 'Pulse Platform',
  project3Category = 'Mobile App',
  project3Description = 'Cross-platform mobile application for health and wellness tracking with social features and AI-powered insights.',
  project3Image = 'https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=600&auto=format&fit=crop',

  timeline1Year = '2024',
  timeline1Title = 'Lead Creative Director',
  timeline1Description = 'Leading a team of designers and developers at a top creative agency, delivering award-winning digital experiences for global brands.',
  timeline2Year = '2022',
  timeline2Title = 'Senior Product Designer',
  timeline2Description = 'Drove product design strategy for a Series B startup, increasing user engagement by 340% through iterative design improvements.',
  timeline3Year = '2020',
  timeline3Title = 'Freelance Consultant',
  timeline3Description = 'Launched independent practice serving clients across tech, finance, and healthcare with end-to-end design and development solutions.',

  skill1 = 'UI/UX Design',
  skill2 = 'Web Development',
  skill3 = 'Brand Strategy',
  skill4 = 'React & Next.js',
  skill5 = 'Product Design',
  skill6 = 'Motion Design',
  skill7 = 'Data Analytics',
  skill8 = 'User Research',

  testimonial1Name = 'Sarah Chen',
  testimonial1Role = 'CEO, TechStart Inc.',
  testimonial1Quote = 'Working with them was an absolute game-changer for our business. The attention to detail and creative vision exceeded all of our expectations.',
  testimonial2Name = 'Marcus Rivera',
  testimonial2Role = 'Product Lead, Innovate Labs',
  testimonial2Quote = 'Exceptional quality and professionalism throughout the entire project. They transformed our vision into a product that our users genuinely love.',
  testimonial3Name = 'Elena Kowalski',
  testimonial3Role = 'Founder, DesignCraft Studio',
  testimonial3Quote = 'The strategic approach and technical expertise brought our project to life in ways we never imagined possible. Truly outstanding work.',

  faq1Question = 'How do you approach new projects?',
  faq1Answer = 'Every project begins with a thorough discovery phase where I understand your goals, audience, and constraints. From there, I develop a strategic roadmap and iterate continuously based on feedback to ensure the final result exceeds expectations.',
  faq2Question = 'What is your typical project timeline?',
  faq2Answer = 'Timelines vary based on scope and complexity. A typical project runs 4–12 weeks from kickoff to delivery, with regular check-ins and milestone reviews throughout the process to keep everything on track.',
  faq3Question = 'Do you offer ongoing support after launch?',
  faq3Answer = 'Absolutely. I provide post-launch support packages that include maintenance, performance optimization, and iterative improvements to ensure long-term success and continuous growth for your project.',
  faq4Question = 'How can we get started working together?',
  faq4Answer = 'Simply reach out through the contact section below or send me an email. I will schedule a free consultation call to discuss your project requirements and determine if we are a good fit for collaboration.',

  contactSubtitle = 'GET IN TOUCH',
  contactTitle = "Let's Work Together",
  contactDescription = "Have a project in mind or just want to chat? I'm always open to discussing new opportunities and creative challenges.",
  contactEmail = 'hello@brunoerdison.com',
  contactPhone = '+68 3568 89 86',
  contactLocation = 'Warsaw, Poland',
  contactCard1Label = 'Email',
  contactCard2Label = 'Phone',
  contactCard3Label = 'Location',

  footerBrandName,
  footerDescription = 'Creating exceptional digital experiences through design, development, and strategic thinking.',
  footerQuickLinksTitle = 'Quick Links',
  footerContactTitle = 'Contact',
  footerCopyright = '© 2024 All rights reserved. Crafted with passion.',
}) => {
  const actualFooterBrandName = footerBrandName || fullName;
  // ── Visual Builder Context ──────────────────────────────────────────────
  const { templateData, mode } = useVisualBuilder();
  const isEditing = mode === 'EDITING';

  // ── State ───────────────────────────────────────────────────────────────
  const [navVisible, setNavVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const lastScrollYRef = useRef(0);

  // ── Navbar: hide on scroll down, show on scroll up ──────────────────────
  useEffect(() => {
    if (isEditing) return;
    const handleScroll = () => {
      const y = window.scrollY;
      setNavVisible(y < lastScrollYRef.current || y < 100);
      lastScrollYRef.current = y;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isEditing]);

  // ── Active section tracking via IntersectionObserver ─────────────────────
  useEffect(() => {
    if (isEditing) return;
    const sections = document.querySelectorAll('section[id^="snap-"]');
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.25, rootMargin: '-100px 0px -50% 0px' },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isEditing]);

  // ── Helpers ─────────────────────────────────────────────────────────────
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navSections = [
    { id: 'snap-about', label: 'About', field: 'navItem0' },
    { id: 'snap-services', label: 'Services', field: 'navItem1' },
    { id: 'snap-projects', label: 'Projects', field: 'navItem2' },
    { id: 'snap-testimonials', label: 'Testimonials', field: 'navItem3' },
    { id: 'snap-contact', label: 'Contact', field: 'navItem4' },
  ];

  // Navbar bg class
  let navBgClass = 'bg-theme-background/80 backdrop-blur-xl border-b border-theme-border/50 shadow-lg shadow-black/10';
  if (navbarBg === 'transparent') {
    navBgClass = 'bg-transparent';
  } else if (navbarBg === 'surface') {
    navBgClass = 'bg-theme-surface border-b border-theme-border shadow-sm';
  }

  const effectiveNavVisible = isEditing || navVisible;

  // Data arrays for mapped rendering
  const stats = [
    { vField: 'stat1Value', lField: 'stat1Label', value: stat1Value, label: stat1Label },
    { vField: 'stat2Value', lField: 'stat2Label', value: stat2Value, label: stat2Label },
    { vField: 'stat3Value', lField: 'stat3Label', value: stat3Value, label: stat3Label },
    { vField: 'stat4Value', lField: 'stat4Label', value: stat4Value, label: stat4Label },
  ];

  const services = [
    { icon: <Layers className="w-5 h-5" />, tField: 'service1Title', dField: 'service1Description', title: service1Title, desc: service1Description },
    { icon: <Palette className="w-5 h-5" />, tField: 'service2Title', dField: 'service2Description', title: service2Title, desc: service2Description },
    { icon: <Code className="w-5 h-5" />, tField: 'service3Title', dField: 'service3Description', title: service3Title, desc: service3Description },
    { icon: <Zap className="w-5 h-5" />, tField: 'service4Title', dField: 'service4Description', title: service4Title, desc: service4Description },
  ];

  const projects = [
    { catField: 'project1Category', tField: 'project1Title', dField: 'project1Description', imgKey: 'project1Image', cat: project1Category, title: project1Title, desc: project1Description, img: project1Image },
    { catField: 'project2Category', tField: 'project2Title', dField: 'project2Description', imgKey: 'project2Image', cat: project2Category, title: project2Title, desc: project2Description, img: project2Image },
    { catField: 'project3Category', tField: 'project3Title', dField: 'project3Description', imgKey: 'project3Image', cat: project3Category, title: project3Title, desc: project3Description, img: project3Image },
  ];

  const timelineItems = [
    { yField: 'timeline1Year', tField: 'timeline1Title', dField: 'timeline1Description', year: timeline1Year, title: timeline1Title, desc: timeline1Description },
    { yField: 'timeline2Year', tField: 'timeline2Title', dField: 'timeline2Description', year: timeline2Year, title: timeline2Title, desc: timeline2Description },
    { yField: 'timeline3Year', tField: 'timeline3Title', dField: 'timeline3Description', year: timeline3Year, title: timeline3Title, desc: timeline3Description },
  ];

  const skills = [
    { field: 'skill1', value: skill1 }, { field: 'skill2', value: skill2 },
    { field: 'skill3', value: skill3 }, { field: 'skill4', value: skill4 },
    { field: 'skill5', value: skill5 }, { field: 'skill6', value: skill6 },
    { field: 'skill7', value: skill7 }, { field: 'skill8', value: skill8 },
  ];

  const testimonials = [
    { qField: 'testimonial1Quote', nField: 'testimonial1Name', rField: 'testimonial1Role', quote: testimonial1Quote, name: testimonial1Name, role: testimonial1Role },
    { qField: 'testimonial2Quote', nField: 'testimonial2Name', rField: 'testimonial2Role', quote: testimonial2Quote, name: testimonial2Name, role: testimonial2Role },
    { qField: 'testimonial3Quote', nField: 'testimonial3Name', rField: 'testimonial3Role', quote: testimonial3Quote, name: testimonial3Name, role: testimonial3Role },
  ];

  const faqItems = [
    { qField: 'faq1Question', aField: 'faq1Answer', q: faq1Question, a: faq1Answer },
    { qField: 'faq2Question', aField: 'faq2Answer', q: faq2Question, a: faq2Answer },
    { qField: 'faq3Question', aField: 'faq3Answer', q: faq3Question, a: faq3Answer },
    { qField: 'faq4Question', aField: 'faq4Answer', q: faq4Question, a: faq4Answer },
  ];

  // ════════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════════

  return (
    <EditableElement
      as="div"
      id="page"
      field="background"
      type="background"
      value=""
      defaultColor={templateData.theme.background}
      className="w-full min-h-screen bg-theme-background text-theme-foreground font-sans selection:bg-theme-primary/40 selection:text-white overflow-x-hidden"
    >
      {/* Time-Based Smooth Custom Cursor */}
      <SmoothCursor isEditing={isEditing} />

      {/* ═══════════════════════════════════════════════════════════════════
          1. STICKY NAVBAR
          ═══════════════════════════════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBgClass} ${
          effectiveNavVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <EditableElement
              as="span"
              id="profile-header"
              field="profileName"
              value={fullName}
              type="heading"
              className="font-black text-base sm:text-lg tracking-tight text-theme-foreground"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navSections.map((item, idx) => (
              <a
                key={idx}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-4 py-2 text-[11px] font-semibold tracking-wider uppercase rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-theme-primary/15 text-theme-primary'
                    : 'text-theme-muted hover:text-theme-foreground'
                }`}
              >
                <EditableElement
                  as="span"
                  id="port-nav"
                  field={item.field}
                  value={item.label}
                  type="text"
                  className=""
                />
              </a>
            ))}
          </nav>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <EditableButton
              buttonKey="nav-cta"
              defaultText="Let's Talk"
              className="hidden md:inline-flex px-5 py-2 text-[11px] font-bold tracking-wider uppercase bg-theme-primary text-theme-background rounded-full hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
            />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-theme-foreground hover:text-theme-primary transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-theme-background/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-7 md:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {navSections.map((item, idx) => (
          <a
            key={idx}
            href={`#${item.id}`}
            onClick={(e) => handleNavClick(e, item.id)}
            className="text-2xl font-bold text-theme-foreground hover:text-theme-primary transition-colors duration-300"
          >
            {item.label}
          </a>
        ))}
        <EditableButton
          buttonKey="nav-cta"
          defaultText="Let's Talk"
          className="mt-4 px-8 py-3 text-sm font-bold tracking-wider uppercase bg-theme-primary text-theme-background rounded-full"
        />
      </div>

      {/* ── Main Content ── */}
      <main className="w-full flex flex-col items-center">

        {/* ═══════════════════════════════════════════════════════════════════
            2. HERO SECTION (1:1 Design Replica of Reference Image Layout)
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-home" className="w-full max-w-6xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-40 md:pb-24 relative">
          {/* Subtle ambient lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-theme-primary/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Top Centered Header Stack */}
          <RevealOnScroll variant="blur-in" className="flex flex-col items-center text-center mb-12 sm:mb-16">
            <EditableElement
              as="h2"
              id="profile-header"
              field="profileName"
              value={fullName}
              type="heading"
              className="text-2xl sm:text-4xl lg:text-5xl font-serif text-theme-foreground font-normal tracking-tight"
            />
            <EditableElement
              as="h1"
              id="port-hero"
              field="heroHeading"
              value={heroHeading}
              type="heading"
              className="text-3xl sm:text-5xl lg:text-6xl font-serif text-theme-foreground font-normal tracking-tight mt-1 sm:mt-2"
            />
            <EditableElement
              as="span"
              id="port-hero"
              field="heroSubtitle"
              value={heroSubtitle}
              type="text"
              className="text-2xl sm:text-4xl lg:text-5xl font-serif text-theme-foreground font-normal tracking-tight mt-1 sm:mt-2"
            />
          </RevealOnScroll>

          {/* 3-Column Layout: Left (Bio/Contact/Services), Center (Oval Portrait), Right (4 Stats) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-4 items-center relative z-10">

            {/* LEFT COLUMN: Biography, Contact, Services */}
            <RevealOnScroll variant="fade-right" className="lg:col-span-3 flex flex-col gap-8 text-left order-2 lg:order-1">
              {/* Biography Block */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-hero"
                  field="bioLabel"
                  value="BIOGRAPHY"
                  type="text"
                  className="text-[10px] font-mono tracking-[0.25em] text-theme-muted uppercase mb-2 block"
                />
                <EditableElement
                  as="p"
                  id="port-hero"
                  field="heroDescription"
                  value={heroDescription}
                  type="text"
                  className="text-xs sm:text-sm text-theme-foreground/90 font-medium leading-relaxed"
                />
              </div>

              {/* Contact Block */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-hero"
                  field="contactLabel"
                  value="CONTACT"
                  type="text"
                  className="text-[10px] font-mono tracking-[0.25em] text-theme-muted uppercase mb-2 block"
                />
                <EditableElement
                  as="span"
                  id="port-contact"
                  field="contactLocation"
                  value={contactLocation}
                  type="text"
                  className="text-xs sm:text-sm text-theme-foreground/90 font-medium block"
                />
                <EditableElement
                  as="span"
                  id="port-contact"
                  field="contactEmail"
                  value={contactEmail}
                  type="text"
                  className="text-xs sm:text-sm text-theme-foreground/90 font-medium block mt-0.5"
                />
                <EditableElement
                  as="span"
                  id="port-contact"
                  field="contactPhone"
                  value={contactPhone}
                  type="text"
                  className="text-xs sm:text-sm text-theme-foreground/90 font-medium block mt-0.5"
                />
              </div>

              {/* Services Block */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-hero"
                  field="servicesLabel"
                  value="SERVICES"
                  type="text"
                  className="text-[10px] font-mono tracking-[0.25em] text-theme-muted uppercase mb-2 block"
                />
                <div className="flex flex-col gap-1">
                  <EditableElement
                    as="span"
                    id="port-services"
                    field="service1Title"
                    value={service1Title}
                    type="text"
                    className="text-xs sm:text-sm text-theme-foreground/90 font-medium block"
                  />
                  <EditableElement
                    as="span"
                    id="port-services"
                    field="service2Title"
                    value={service2Title}
                    type="text"
                    className="text-xs sm:text-sm text-theme-foreground/90 font-medium block"
                  />
                  <EditableElement
                    as="span"
                    id="port-services"
                    field="service3Title"
                    value={service3Title}
                    type="text"
                    className="text-xs sm:text-sm text-theme-foreground/90 font-medium block"
                  />
                </div>
              </div>
            </RevealOnScroll>

            {/* CENTER COLUMN: Oval Capsule Portrait Image + Wavy Accent Lines */}
            <RevealOnScroll variant="scale-up" delay={0.12} className="lg:col-span-6 flex justify-center order-1 lg:order-2 relative px-2 sm:px-6">
              {/* Left Decorative Wavy Lines */}
              <div className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 opacity-25 text-theme-primary pointer-events-none hidden sm:block">
                <svg width="40" height="80" viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0,10 Q20,0 40,10 T80,10" />
                  <path d="M0,25 Q20,15 40,25 T80,25" />
                  <path d="M0,40 Q20,30 40,40 T80,40" />
                  <path d="M0,55 Q20,45 40,55 T80,55" />
                </svg>
              </div>

              {/* Right Decorative Wavy Lines */}
              <div className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 opacity-25 text-theme-primary pointer-events-none hidden sm:block">
                <svg width="40" height="80" viewBox="0 0 40 80" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M0,10 Q20,20 40,10 T80,10" />
                  <path d="M0,25 Q20,35 40,25 T80,25" />
                  <path d="M0,40 Q20,50 40,40 T80,40" />
                  <path d="M0,55 Q20,65 40,55 T80,55" />
                </svg>
              </div>

              {/* Oval Capsule Frame */}
              <div className="relative p-2.5 rounded-[260px] border border-theme-border/50 bg-theme-surface/10 backdrop-blur-sm shadow-2xl group hover:border-theme-primary/40 transition-colors duration-500">
                <EditableImage
                  imageKey="heroImage"
                  defaultSrc={heroImage}
                  defaultAlt={fullName}
                  containerClassName="w-[260px] sm:w-[320px] lg:w-[340px] h-[360px] sm:h-[440px] lg:h-[460px] rounded-[240px] overflow-hidden border border-theme-border/60"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </RevealOnScroll>

            {/* RIGHT COLUMN: 4 Stacked Metrics (Stats) */}
            <RevealOnScroll variant="fade-left" delay={0.2} className="lg:col-span-3 flex flex-col gap-6 lg:gap-7 text-left lg:text-right order-3">
              {/* Stat 1 */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-stats"
                  field="stat1Label"
                  value={stat1Label}
                  type="text"
                  className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-theme-muted uppercase block"
                />
                <EditableElement
                  as="h3"
                  id="port-stats"
                  field="stat1Value"
                  value={stat1Value}
                  type="heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-theme-foreground font-normal tracking-tight mt-1"
                />
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-stats"
                  field="stat2Label"
                  value={stat2Label}
                  type="text"
                  className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-theme-muted uppercase block"
                />
                <EditableElement
                  as="h3"
                  id="port-stats"
                  field="stat2Value"
                  value={stat2Value}
                  type="heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-theme-foreground font-normal tracking-tight mt-1"
                />
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-stats"
                  field="stat3Label"
                  value={stat3Label}
                  type="text"
                  className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-theme-muted uppercase block"
                />
                <EditableElement
                  as="h3"
                  id="port-stats"
                  field="stat3Value"
                  value={stat3Value}
                  type="heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-theme-foreground font-normal tracking-tight mt-1"
                />
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col">
                <EditableElement
                  as="span"
                  id="port-stats"
                  field="stat4Label"
                  value={stat4Label}
                  type="text"
                  className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] text-theme-muted uppercase block"
                />
                <EditableElement
                  as="h3"
                  id="port-stats"
                  field="stat4Value"
                  value={stat4Value}
                  type="heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-serif text-theme-foreground font-normal tracking-tight mt-1"
                />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            4. ABOUT
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-about" className="w-full max-w-6xl px-6 py-20 md:py-28 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image Column */}
            <RevealOnScroll variant="fade-right" className="relative">
              <EditableImage
                imageKey="aboutImage"
                defaultSrc={aboutImage}
                defaultAlt="About"
                containerClassName="w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden border border-theme-border/50 shadow-xl p-1 bg-theme-surface/10"
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Rotating Badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
                <EditableElement
                  as="div"
                  id="port-about"
                  field="aboutBadgeText"
                  value={aboutBadgeText}
                  type="text"
                  className="absolute inset-0 animate-[spin_16s_linear_infinite] flex items-center justify-center"
                >
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <path id="snapBadgePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="none" />
                    <text className="text-[7px] font-black tracking-[0.2em] fill-theme-primary font-mono">
                      <textPath href="#snapBadgePath" startOffset="0%">
                        {aboutBadgeText}
                      </textPath>
                    </text>
                  </svg>
                </EditableElement>
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-theme-primary flex items-center justify-center z-10 shadow-lg hover:scale-110 transition-transform duration-300">
                  <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-theme-background" />
                </div>
              </div>
            </RevealOnScroll>

            {/* Text Column */}
            <RevealOnScroll variant="fade-left" delay={0.15} className="flex flex-col gap-5">
              <EditableElement
                as="span"
                id="port-about"
                field="aboutSubtitle"
                value="ABOUT ME"
                type="text"
                className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
              />
              <EditableElement
                as="h2"
                id="port-about"
                field="aboutTitle"
                value="Turning Ideas Into Reality"
                type="heading"
                className="text-3xl sm:text-4xl font-black tracking-tight"
              />
              <div className="w-12 h-0.5 bg-theme-primary/50" />
              <EditableElement
                as="p"
                id="port-about"
                field="aboutDescription"
                value={aboutDescription}
                type="text"
                className="text-sm sm:text-base text-theme-muted leading-relaxed"
              />
              {/* Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="border border-theme-border/50 bg-theme-surface/30 rounded-xl p-5 flex flex-col gap-1 hover:border-theme-primary/30 transition-colors duration-300">
                  <EditableElement
                    as="span"
                    id="port-about"
                    field="aboutHighlight1Value"
                    value={aboutHighlight1Value}
                    type="heading"
                    className="text-2xl sm:text-3xl font-black text-theme-primary tracking-tighter"
                  />
                  <EditableElement
                    as="span"
                    id="port-about"
                    field="aboutHighlight1Label"
                    value={aboutHighlight1Label}
                    type="text"
                    className="text-[10px] font-semibold tracking-wider uppercase text-theme-muted"
                  />
                </div>
                <div className="border border-theme-border/50 bg-theme-surface/30 rounded-xl p-5 flex flex-col gap-1 hover:border-theme-primary/30 transition-colors duration-300">
                  <EditableElement
                    as="span"
                    id="port-about"
                    field="aboutHighlight2Value"
                    value={aboutHighlight2Value}
                    type="heading"
                    className="text-2xl sm:text-3xl font-black text-theme-primary tracking-tighter"
                  />
                  <EditableElement
                    as="span"
                    id="port-about"
                    field="aboutHighlight2Label"
                    value={aboutHighlight2Label}
                    type="text"
                    className="text-[10px] font-semibold tracking-wider uppercase text-theme-muted"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            5. SERVICES
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-services" className="w-full max-w-6xl px-6 py-20 md:py-28 scroll-mt-24">
          <RevealOnScroll variant="blur-in" className="text-center mb-14">
            <EditableElement
              as="span"
              id="port-services"
              field="servicesSubtitle"
              value="WHAT I DO"
              type="text"
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
            />
            <EditableElement
              as="h2"
              id="port-services"
              field="servicesTitle"
              value="Services & Expertise"
              type="heading"
              className="text-3xl sm:text-4xl font-black tracking-tight mt-3 block"
            />
            <div className="w-12 h-0.5 bg-theme-primary/50 mx-auto mt-4" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
            {services.map((svc, idx) => (
              <RevealOnScroll
                key={idx}
                variant="scale-up"
                delay={idx * 0.1}
                className="border border-theme-border/50 bg-theme-surface/20 backdrop-blur-sm rounded-2xl p-7 sm:p-8 hover:border-theme-primary/30 hover:bg-theme-surface/40 hover:-translate-y-1 transition-all duration-500 group"
              >
                <div className="w-11 h-11 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center mb-5 text-theme-primary group-hover:bg-theme-primary/20 group-hover:scale-110 transition-all duration-500">
                  {svc.icon}
                </div>
                <EditableElement
                  as="h3"
                  id="port-services"
                  field={svc.tField}
                  value={svc.title}
                  type="heading"
                  className="text-lg font-bold tracking-tight mb-3"
                />
                <EditableElement
                  as="p"
                  id="port-services"
                  field={svc.dField}
                  value={svc.desc}
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed"
                />
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            6. FEATURED PROJECTS
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-projects" className="w-full max-w-6xl px-6 py-20 md:py-28 scroll-mt-24">
          <RevealOnScroll variant="blur-in" className="text-center mb-14">
            <EditableElement
              as="span"
              id="port-projects"
              field="projectsSubtitle"
              value="SELECTED WORK"
              type="text"
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
            />
            <EditableElement
              as="h2"
              id="port-projects"
              field="projectsTitle"
              value="Featured Projects"
              type="heading"
              className="text-3xl sm:text-4xl font-black tracking-tight mt-3 block"
            />
            <div className="w-12 h-0.5 bg-theme-primary/50 mx-auto mt-4" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <RevealOnScroll
                key={idx}
                variant="fade-up"
                delay={idx * 0.12}
                className="group rounded-2xl overflow-hidden border border-theme-border/50 bg-theme-surface/20 hover:border-theme-primary/30 hover:shadow-xl hover:shadow-theme-primary/10 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <EditableImage
                    imageKey={proj.imgKey}
                    defaultSrc={proj.img}
                    defaultAlt={proj.title}
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-background/80 via-transparent to-transparent opacity-60 pointer-events-none" />
                </div>
                {/* Content */}
                <div className="p-6">
                  <EditableElement
                    as="span"
                    id={`port-project-${idx + 1}`}
                    field="projectCategory"
                    value={proj.cat}
                    type="text"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary"
                  />
                  <EditableElement
                    as="h3"
                    id={`port-project-${idx + 1}`}
                    field="projectTitle"
                    value={proj.title}
                    type="heading"
                    className="text-lg font-bold tracking-tight mt-2 block"
                  />
                  <EditableElement
                    as="p"
                    id={`port-project-${idx + 1}`}
                    field="projectDescription"
                    value={proj.desc}
                    type="text"
                    className="text-xs sm:text-sm text-theme-muted leading-relaxed mt-2 line-clamp-3 block"
                  />
                  <EditableButton
                    buttonKey={`project-${idx + 1}-btn`}
                    defaultText="View Project"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-theme-primary hover:gap-3 transition-all duration-300"
                  >
                    <span>{(templateData.buttonOverrides as Record<string, any>)?.[`project-${idx + 1}-btn`]?.text || 'View Project'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </EditableButton>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            7. EXPERIENCE / TIMELINE
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-experience" className="w-full max-w-6xl px-6 py-20 md:py-28 scroll-mt-24">
          <RevealOnScroll variant="blur-in" className="text-center mb-14">
            <EditableElement
              as="span"
              id="port-timeline"
              field="timelineSubtitle"
              value="JOURNEY"
              type="text"
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
            />
            <EditableElement
              as="h2"
              id="port-timeline"
              field="timelineTitle"
              value="Experience & Background"
              type="heading"
              className="text-3xl sm:text-4xl font-black tracking-tight mt-3 block"
            />
            <div className="w-12 h-0.5 bg-theme-primary/50 mx-auto mt-4" />
          </RevealOnScroll>

          <div className="max-w-2xl mx-auto">
            {timelineItems.map((item, idx) => (
              <RevealOnScroll
                key={idx}
                variant="fade-left"
                delay={idx * 0.12}
                className={`relative pl-8 sm:pl-10 ${
                  idx < timelineItems.length - 1 ? 'pb-12 border-l-2 border-theme-border/50' : 'border-l-2 border-transparent'
                }`}
              >
                {/* Dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-theme-primary border-[3px] border-theme-background shadow-md shadow-theme-primary/30" />
                {/* Year Badge */}
                <EditableElement
                  as="span"
                  id="port-timeline"
                  field={item.yField}
                  value={item.year}
                  type="text"
                  className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase text-theme-primary bg-theme-primary/10 border border-theme-primary/20 rounded-full"
                />
                <EditableElement
                  as="h4"
                  id="port-timeline"
                  field={item.tField}
                  value={item.title}
                  type="heading"
                  className="text-lg font-bold tracking-tight mt-3 block"
                />
                <EditableElement
                  as="p"
                  id="port-timeline"
                  field={item.dField}
                  value={item.desc}
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed mt-2 block"
                />
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            8. SKILLS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-6xl px-6 py-16 md:py-20">
          <RevealOnScroll variant="blur-in" className="text-center mb-10">
            <EditableElement
              as="span"
              id="port-skills"
              field="skillsSubtitle"
              value="EXPERTISE"
              type="text"
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
            />
            <EditableElement
              as="h2"
              id="port-skills"
              field="skillsTitle"
              value="Skills & Technologies"
              type="heading"
              className="text-3xl sm:text-4xl font-black tracking-tight mt-3 block"
            />
          </RevealOnScroll>

          <RevealOnScroll variant="scale-up" delay={0.1} className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, idx) => (
              <EditableElement
                key={idx}
                as="span"
                id="port-skills"
                field={skill.field}
                value={skill.value}
                type="text"
                className="px-5 py-2.5 rounded-full border border-theme-border/50 bg-theme-surface/30 text-sm font-medium text-theme-foreground hover:border-theme-primary/40 hover:bg-theme-primary/5 hover:text-theme-primary hover:scale-105 transition-all duration-300 cursor-default"
              />
            ))}
          </RevealOnScroll>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            9. TESTIMONIALS
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-testimonials" className="w-full max-w-6xl px-6 py-20 md:py-28 scroll-mt-24">
          <RevealOnScroll variant="blur-in" className="text-center mb-14">
            <EditableElement
              as="span"
              id="port-testimonials"
              field="testimonialsSubtitle"
              value="TESTIMONIALS"
              type="text"
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
            />
            <EditableElement
              as="h2"
              id="port-testimonials"
              field="testimonialsTitle"
              value="What Clients Say"
              type="heading"
              className="text-3xl sm:text-4xl font-black tracking-tight mt-3 block"
            />
            <div className="w-12 h-0.5 bg-theme-primary/50 mx-auto mt-4" />
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <RevealOnScroll
                key={idx}
                variant="scale-up"
                delay={idx * 0.1}
                className="border border-theme-border/50 bg-theme-surface/20 backdrop-blur-sm rounded-2xl p-7 flex flex-col justify-between hover:border-theme-primary/30 hover:bg-theme-surface/40 hover:-translate-y-1 transition-all duration-500"
              >
                {/* Stars */}
                <div>
                  <div className="flex gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-theme-primary text-theme-primary" />
                    ))}
                  </div>
                  <EditableElement
                    as="p"
                    id="port-testimonials"
                    field={t.qField}
                    value={t.quote}
                    type="text"
                    className="text-sm text-theme-muted leading-relaxed italic"
                  />
                </div>
                {/* Author */}
                <div className="mt-6 pt-5 border-t border-theme-border/40 flex flex-col gap-0.5">
                  <EditableElement
                    as="span"
                    id="port-testimonials"
                    field={t.nField}
                    value={t.name}
                    type="text"
                    className="text-sm font-bold text-theme-foreground"
                  />
                  <EditableElement
                    as="span"
                    id="port-testimonials"
                    field={t.rField}
                    value={t.role}
                    type="text"
                    className="text-xs text-theme-muted"
                  />
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            10. FAQ
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full max-w-6xl px-6 py-20 md:py-28">
          <RevealOnScroll variant="blur-in" className="text-center mb-14">
            <EditableElement
              as="span"
              id="port-faq"
              field="faqSubtitle"
              value="FAQ"
              type="text"
              className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
            />
            <EditableElement
              as="h2"
              id="port-faq"
              field="faqTitle"
              value="Frequently Asked Questions"
              type="heading"
              className="text-3xl sm:text-4xl font-black tracking-tight mt-3 block"
            />
            <div className="w-12 h-0.5 bg-theme-primary/50 mx-auto mt-4" />
          </RevealOnScroll>

          <div className="max-w-2xl mx-auto">
            {faqItems.map((faq, idx) => {
              const isOpen = isEditing || openFaq === idx;
              return (
                <RevealOnScroll key={idx} variant="fade-up" delay={idx * 0.08}>
                  <div className="border-b border-theme-border/40">
                    {/* Question row */}
                    <button
                      onClick={() => !isEditing && setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex justify-between items-center py-5 sm:py-6 text-left group"
                      aria-expanded={isOpen}
                    >
                      <EditableElement
                        as="span"
                        id="port-faq"
                        field={faq.qField}
                        value={faq.q}
                        type="text"
                        className="text-sm sm:text-base font-semibold text-theme-foreground group-hover:text-theme-primary transition-colors duration-300 pr-4"
                      />
                      <ChevronDown
                        className={`w-5 h-5 text-theme-muted shrink-0 transition-transform duration-400 ${
                          isOpen ? 'rotate-180 text-theme-primary' : ''
                        }`}
                      />
                    </button>
                    {/* Answer panel */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isOpen ? 'max-h-60 opacity-100 pb-5' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <EditableElement
                        as="p"
                        id="port-faq"
                        field={faq.aField}
                        value={faq.a}
                        type="text"
                        className="text-sm text-theme-muted leading-relaxed"
                      />
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            11. CTA BANNER
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-20 md:py-28 relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-theme-primary/5 via-transparent to-theme-primary/3 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-theme-primary/5 rounded-full blur-[150px] pointer-events-none" />

          <RevealOnScroll variant="blur-in" className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <EditableElement
              as="h2"
              id="port-cta"
              field="ctaHeading"
              value="Ready to Start Your Next Project?"
              type="heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
            />
            <EditableElement
              as="p"
              id="port-cta"
              field="ctaDescription"
              value="Let's collaborate to create something extraordinary. Whether you have a clear vision or just a spark of an idea, I'm here to help bring it to life."
              type="text"
              className="text-base sm:text-lg text-theme-muted leading-relaxed mt-5 max-w-xl mx-auto block"
            />
            <div className="mt-8">
              <EditableButton
                buttonKey="cta-btn"
                defaultText="Start a Conversation"
                defaultHref="#snap-contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 text-sm font-bold tracking-wider uppercase bg-theme-primary text-theme-background rounded-full hover:opacity-90 hover:shadow-xl hover:shadow-theme-primary/20 transition-all duration-300 active:scale-[0.97]"
              >
                <span>{(templateData.buttonOverrides as Record<string, any>)?.[ 'cta-btn']?.text || 'Start a Conversation'}</span>
                <ArrowRight className="w-4 h-4" />
              </EditableButton>
            </div>
          </RevealOnScroll>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            12. CONTACT
            ═══════════════════════════════════════════════════════════════════ */}
        <section id="snap-contact" className="w-full max-w-6xl px-6 py-20 md:py-28 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Text */}
            <RevealOnScroll variant="fade-right" className="flex flex-col gap-5">
              <EditableElement
                as="span"
                id="port-contact"
                field="contactSubtitle"
                value="GET IN TOUCH"
                type="text"
                className="text-[11px] font-bold tracking-[0.3em] uppercase text-theme-primary"
              />
              <EditableElement
                as="h2"
                id="port-contact"
                field="contactTitle"
                value="Let's Work Together"
                type="heading"
                className="text-3xl sm:text-4xl font-black tracking-tight"
              />
              <div className="w-12 h-0.5 bg-theme-primary/50" />
              <EditableElement
                as="p"
                id="port-contact"
                field="contactDescription"
                value="Have a project in mind or just want to chat? I'm always open to discussing new opportunities and creative challenges."
                type="text"
                className="text-sm sm:text-base text-theme-muted leading-relaxed"
              />
              <div className="mt-4">
                <EditableButton
                  buttonKey="contact-btn"
                  defaultText="Send Message"
                  defaultHref={`mailto:${contactEmail}`}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold tracking-wide bg-theme-primary text-theme-background rounded-full hover:opacity-90 transition-all duration-300 active:scale-[0.97]"
                >
                  <span>{(templateData.buttonOverrides as Record<string, any>)?.[ 'contact-btn']?.text || 'Send Message'}</span>
                  <ArrowRight className="w-4 h-4" />
                </EditableButton>
              </div>
            </RevealOnScroll>

            {/* Right Column: Info Cards */}
            <RevealOnScroll variant="fade-left" delay={0.15} className="flex flex-col gap-4">
              {/* Email */}
              <div className="border border-theme-border/50 bg-theme-surface/20 rounded-2xl p-6 flex items-start gap-4 hover:border-theme-primary/30 hover:bg-theme-surface/40 transition-all duration-500 group">
                <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center shrink-0 text-theme-primary group-hover:bg-theme-primary/20 group-hover:scale-110 transition-all duration-500">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <EditableElement
                    as="span"
                    id="port-contact"
                    field="contactCard1Label"
                    value={contactCard1Label}
                    type="text"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-muted"
                  />
                  <EditableElement
                    as="span"
                    id="port-contact"
                    field="contactEmail"
                    value={contactEmail}
                    type="text"
                    className="text-sm font-semibold text-theme-foreground"
                  />
                </div>
              </div>
              {/* Phone */}
              <div className="border border-theme-border/50 bg-theme-surface/20 rounded-2xl p-6 flex items-start gap-4 hover:border-theme-primary/30 hover:bg-theme-surface/40 transition-all duration-500 group">
                <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center shrink-0 text-theme-primary group-hover:bg-theme-primary/20 group-hover:scale-110 transition-all duration-500">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <EditableElement
                    as="span"
                    id="port-contact"
                    field="contactCard2Label"
                    value={contactCard2Label}
                    type="text"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-muted"
                  />
                  <EditableElement
                    as="span"
                    id="port-contact"
                    field="contactPhone"
                    value={contactPhone}
                    type="text"
                    className="text-sm font-semibold text-theme-foreground"
                  />
                </div>
              </div>
              {/* Location */}
              <div className="border border-theme-border/50 bg-theme-surface/20 rounded-2xl p-6 flex items-start gap-4 hover:border-theme-primary/30 hover:bg-theme-surface/40 transition-all duration-500 group">
                <div className="w-10 h-10 rounded-xl bg-theme-primary/10 border border-theme-primary/20 flex items-center justify-center shrink-0 text-theme-primary group-hover:bg-theme-primary/20 group-hover:scale-110 transition-all duration-500">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <EditableElement
                    as="span"
                    id="port-contact"
                    field="contactCard3Label"
                    value={contactCard3Label}
                    type="text"
                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-theme-muted"
                  />
                  <EditableElement
                    as="span"
                    id="port-contact"
                    field="contactLocation"
                    value={contactLocation}
                    type="text"
                    className="text-sm font-semibold text-theme-foreground"
                  />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          13. FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="w-full border-t border-theme-border/40">
        <div className="max-w-6xl mx-auto px-6 py-14 md:py-16">
          <RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
              {/* Brand Column */}
              <div className="flex flex-col gap-4 md:col-span-1">
                <EditableElement
                  as="span"
                  id="port-footer"
                  field="footerBrandName"
                  value={actualFooterBrandName}
                  type="heading"
                  className="font-black text-lg tracking-tight text-theme-foreground"
                />
                <EditableElement
                  as="p"
                  id="port-footer"
                  field="footerDescription"
                  value={footerDescription}
                  type="text"
                  className="text-sm text-theme-muted leading-relaxed"
                />
                {/* Social buttons */}
                <div className="flex items-center gap-2 mt-2">
                  <EditableButton
                    buttonKey="footer-social-1"
                    defaultText="GH"
                    defaultHref="#"
                    defaultOpenInNewTab
                    className="w-9 h-9 rounded-full border border-theme-border/50 bg-theme-surface/30 flex items-center justify-center text-xs font-bold text-theme-muted hover:border-theme-primary/40 hover:text-theme-primary hover:bg-theme-primary/5 transition-all duration-300"
                  />
                  <EditableButton
                    buttonKey="footer-social-2"
                    defaultText="IN"
                    defaultHref="#"
                    defaultOpenInNewTab
                    className="w-9 h-9 rounded-full border border-theme-border/50 bg-theme-surface/30 flex items-center justify-center text-xs font-bold text-theme-muted hover:border-theme-primary/40 hover:text-theme-primary hover:bg-theme-primary/5 transition-all duration-300"
                  />
                  <EditableButton
                    buttonKey="footer-social-3"
                    defaultText="𝕏"
                    defaultHref="#"
                    defaultOpenInNewTab
                    className="w-9 h-9 rounded-full border border-theme-border/50 bg-theme-surface/30 flex items-center justify-center text-xs font-bold text-theme-muted hover:border-theme-primary/40 hover:text-theme-primary hover:bg-theme-primary/5 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Quick Links Column */}
              <div className="flex flex-col gap-3">
                <EditableElement
                  as="span"
                  id="port-footer"
                  field="footerQuickLinksTitle"
                  value={footerQuickLinksTitle}
                  type="text"
                  className="text-[10px] font-bold tracking-[0.3em] uppercase text-theme-muted mb-1"
                />
                {[
                  { field: 'footerLink1', value: 'About', href: '#snap-about' },
                  { field: 'footerLink2', value: 'Services', href: '#snap-services' },
                  { field: 'footerLink3', value: 'Projects', href: '#snap-projects' },
                  { field: 'footerLink4', value: 'Contact', href: '#snap-contact' },
                ].map((link, idx) => (
                  <a key={idx} href={link.href} onClick={(e) => handleNavClick(e, link.href.slice(1))} className="group">
                    <EditableElement
                      as="span"
                      id="port-footer"
                      field={link.field}
                      value={link.value}
                      type="text"
                      className="text-sm text-theme-muted group-hover:text-theme-primary transition-colors duration-300"
                    />
                  </a>
                ))}
              </div>

              {/* Contact Column */}
              <div className="flex flex-col gap-3">
                <EditableElement
                  as="span"
                  id="port-footer"
                  field="footerContactTitle"
                  value={footerContactTitle}
                  type="text"
                  className="text-[10px] font-bold tracking-[0.3em] uppercase text-theme-muted mb-1"
                />
                <EditableElement
                  as="span"
                  id="port-contact"
                  field="contactEmail"
                  value={contactEmail}
                  type="text"
                  className="text-sm text-theme-muted"
                />
                <EditableElement
                  as="span"
                  id="port-contact"
                  field="contactPhone"
                  value={contactPhone}
                  type="text"
                  className="text-sm text-theme-muted"
                />
                <EditableElement
                  as="span"
                  id="port-contact"
                  field="contactLocation"
                  value={contactLocation}
                  type="text"
                  className="text-sm text-theme-muted"
                />
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-12 pt-6 border-t border-theme-border/30 text-center">
              <EditableElement
                as="p"
                id="port-footer"
                field="footerCopyright"
                value={footerCopyright}
                type="text"
                className="text-xs text-theme-muted"
              />
            </div>
          </RevealOnScroll>
        </div>
      </footer>

    </EditableElement>
  );
};
