'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { 
  Dumbbell, 
  Users, 
  Award, 
  Check, 
  Zap, 
  Target, 
  Trophy, 
  Clock, 
  Play, 
  Phone, 
  Mail, 
  MapPin, 
  X, 
  Sparkles, 
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import { DEFAULT_THEME, getLuminance } from '@/lib/theme.types';
import type { ButtonOverride } from '@/lib/theme.types';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export interface PricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export interface ApexFitProps {
  trainerName?: string;
  trainerTitle?: string;
  trainerBio?: string;
  trainerImage?: string;
  bannerText?: string;
  statClients?: string;
  statYears?: string;
  statCerts?: string;
  statSuccess?: string;
  pricing?: PricingTier[];
  phone?: string;
  navbarBg?: string;
  hoverStyle?: string;
}

const DEFAULT_PRICING: PricingTier[] = [
  {
    name: 'STARTER ATHLETE',
    price: '$49',
    period: '/month',
    features: [
      'Full facility & heavy iron floor access',
      '1 Baseline biomechanics assessment',
      'Locker rooms & recovery showers',
      'Community athlete chat access',
    ],
    highlighted: false,
  },
  {
    name: 'PRO PERFORMANCE',
    price: '$99',
    period: '/month',
    features: [
      'Unlimited high-output group sessions',
      'Periodized monthly training structure',
      'Weekly progress & volume check-in',
      'Targeted nutrition & macro templates',
      'Direct coach feedback via mobile',
    ],
    highlighted: true,
  },
  {
    name: 'ELITE 1-ON-1 COACHING',
    price: '$249',
    period: '/month',
    features: [
      'Dedicated 1-on-1 performance coach',
      '3 Custom sessions/week (in-person/live)',
      'Bespoke daily meal & nutrient plans',
      'Form & mechanical video breakdown',
      '24/7 Priority WhatsApp direct access',
      'Bi-weekly body scanning & metric tracking',
    ],
    highlighted: false,
  },
];

export const ApexFit: React.FC<ApexFitProps> = ({
  trainerName = 'Marcus Steele',
  trainerTitle = 'Certified Strength & Conditioning Specialist',
  trainerBio = 'Former competitive athlete with 8+ years of dedicated coaching experience. Specializing in sustainable transformations, functional strength, and injury prevention for high performers.',
  trainerImage = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop',
  bannerText = 'SPRING PERFORMANCE COHORT NOW OPEN — LIMITED TO 8 ATHLETES',
  statClients = '500+ ATHLETES',
  statYears = '8+ YEARS',
  statCerts = '12 CERTIFIED',
  statSuccess = '96% OUTPUT RATE',
  pricing = DEFAULT_PRICING,
  phone = '919988776655',
  navbarBg = 'transparent',
  hoverStyle = 'color',
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}

  const activeButtonOverrides: Record<string, ButtonOverride> = builderCtx?.templateData?.buttonOverrides || {};
  const activeTheme = builderCtx?.templateData?.theme || DEFAULT_THEME;
  const isPrimaryLight = getLuminance(activeTheme.primary || '#C1FF00') > 0.45;
  const primaryBtnTextColor = isPrimaryLight ? 'text-black' : 'text-white';

  // Before/After Slider State
  const [activeTab, setActiveTab] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  // Video Modal State
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Parse YouTube link helper
  const getEmbedUrl = (url: string) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    if (url.includes('youtube.com/embed/')) return url;
    
    let videoId = '';
    try {
      if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0] || '';
      } else if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1] || '');
        videoId = urlParams.get('v') || '';
      } else if (url.includes('youtube.com/shorts/')) {
        videoId = url.split('youtube.com/shorts/')[1]?.split('?')[0] || '';
      }
    } catch (e) {
      console.error('Error parsing youtube URL', e);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  const playVideoBtnOverride = activeButtonOverrides['apex-play-video-btn'];
  const rawVideoUrl = playVideoBtnOverride?.href || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const videoUrl = getEmbedUrl(rawVideoUrl);

  // Drag handlers for Before/After Slider
  const updateSliderPos = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSliderPos(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handlePointerMove = (e: PointerEvent) => {
      updateSliderPos(e.clientX);
    };
    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, updateSliderPos]);

  // Video trigger interception in View mode
  const handleVideoContainerClick = (e: React.MouseEvent) => {
    if (builderCtx?.mode === 'EDITING') return;
    const target = e.target as HTMLElement;
    const playBtn = target.closest('.apex-play-btn');
    if (playBtn) {
      e.preventDefault();
      setIsVideoOpen(true);
    }
  };

  return (
    <div className="w-full min-h-screen bg-theme-background text-theme-foreground font-sans overflow-x-hidden selection:bg-theme-primary selection:text-black">
      
      {/* TOP ANNOUNCEMENT BANNER */}
      <div className="w-full bg-theme-surface border-b border-theme-border py-2.5 px-6 text-center z-40 relative">
        <div className="inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-theme-primary animate-ping" />
          <EditableElement
            as="span"
            id="apex-banner"
            field="bannerText"
            value={bannerText}
            type="text"
            className="text-[11px] font-mono font-bold text-theme-foreground tracking-widest uppercase"
          />
        </div>
      </div>

      {/* COMPACT MINIMALIST HEADER / NAV */}
      <header className="w-full border-b border-theme-border py-4 px-6 md:px-12 flex items-center justify-between bg-theme-background/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-theme-primary rotate-45" />
          <EditableElement
            as="span"
            id="apex-nav-brand"
            field="brand"
            value="APEX FIT // SYSTEM"
            type="text"
            className="font-display font-extrabold text-sm sm:text-base tracking-tighter text-theme-foreground uppercase"
          />
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-theme-muted uppercase">
          <a href="#programs" className="hover:text-theme-primary transition-colors">
            <EditableElement as="span" id="apex-nav-link-1" field="text" value="01 // PROGRAMS" type="text" />
          </a>
          <a href="#results" className="hover:text-theme-primary transition-colors">
            <EditableElement as="span" id="apex-nav-link-2" field="text" value="02 // RESULTS" type="text" />
          </a>
          <a href="#experience" className="hover:text-theme-primary transition-colors">
            <EditableElement as="span" id="apex-nav-link-3" field="text" value="03 // LAB" type="text" />
          </a>
          <a href="#pricing" className="hover:text-theme-primary transition-colors">
            <EditableElement as="span" id="apex-nav-link-4" field="text" value="04 // MEMBERSHIP" type="text" />
          </a>
        </div>

        <EditableButton
          buttonKey="apex-nav-cta"
          defaultText="JOIN FACILITY"
          defaultHref="#pricing"
          className={`px-4 py-2 bg-theme-primary ${primaryBtnTextColor} font-extrabold text-[11px] font-mono tracking-wider uppercase hover:opacity-90 transition-colors [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]`}
        >
          <span>{activeButtonOverrides['apex-nav-cta']?.text || 'JOIN FACILITY'}</span>
        </EditableButton>
      </header>

      {/* SECTION 01: HERO & PERFORMANCE STATEMENT */}
      <section className="relative w-full overflow-hidden py-16 md:py-28 lg:py-36 border-b border-theme-border bg-theme-background">
        {/* Subtle radial glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-theme-primary/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
            
            {/* Left Column — Oversized Typography & Info */}
            <div className="lg:col-span-7 flex flex-col items-start">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-theme-surface border border-theme-border text-theme-primary font-mono text-[10px] tracking-[0.2em] uppercase mb-6">
                <span className="w-1.5 h-1.5 bg-theme-primary" />
                <EditableElement
                  as="span"
                  id="apex-hero-eyebrow"
                  field="eyebrow"
                  value="01 // PERFORMANCE SYSTEM"
                  type="text"
                />
              </div>

              <EditableElement
                as="h1"
                id="apex-hero-heading"
                field="title"
                value="BUILD. MOVE. BECOME."
                type="heading"
                className="text-5xl sm:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tighter text-theme-foreground leading-[0.88] mb-8"
              />

              <div className="border-l-2 border-theme-primary pl-5 mb-10 max-w-xl">
                <p className="text-sm sm:text-base text-theme-muted leading-relaxed">
                  <EditableElement as="span" id="apex-hero-prefix" field="text" value="Led by " type="text" />
                  <EditableElement
                    as="span"
                    id="apex-trainer-name"
                    field="trainerName"
                    value={trainerName}
                    type="text"
                    className="text-theme-foreground font-semibold"
                  />
                  {' '}(
                  <EditableElement
                    as="span"
                    id="apex-trainer-title"
                    field="trainerTitle"
                    value={trainerTitle}
                    type="text"
                    className="text-theme-primary font-medium"
                  />
                  ).
                </p>
                <EditableElement
                  as="p"
                  id="apex-trainer-bio"
                  field="trainerBio"
                  value={trainerBio}
                  type="text"
                  className="text-theme-muted text-xs sm:text-sm mt-2 leading-relaxed"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                <EditableButton
                  buttonKey="apex-hero-cta-primary"
                  defaultText="START TRAINING"
                  defaultHref="#pricing"
                  className={`px-8 py-4 bg-theme-primary ${primaryBtnTextColor} font-extrabold text-xs font-mono tracking-widest uppercase hover:opacity-90 transition-all shadow-[0_0_30px_rgba(193,255,0,0.15)] flex items-center justify-center gap-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]`}
                >
                  <span>{activeButtonOverrides['apex-hero-cta-primary']?.text || 'START TRAINING'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </EditableButton>

                <EditableButton
                  buttonKey="apex-hero-cta-secondary"
                  defaultText="EXPLORE METHODOLOGY"
                  defaultHref="#programs"
                  className="px-8 py-4 border border-theme-border text-theme-foreground font-extrabold text-xs font-mono tracking-widest uppercase hover:bg-theme-surface hover:border-theme-primary transition-all flex items-center justify-center"
                >
                  <span>{activeButtonOverrides['apex-hero-cta-secondary']?.text || 'EXPLORE METHODOLOGY'}</span>
                </EditableButton>
              </div>

            </div>

            {/* Right Column — Grayscale High-Contrast Athlete Media */}
            <div className="lg:col-span-5 relative w-full flex justify-center">
              <div className="relative w-full max-w-md aspect-[4/5] border border-theme-border bg-theme-surface overflow-hidden [clip-path:polygon(0_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%)]">
                <EditableImage
                  imageKey="apex-hero-image"
                  defaultSrc="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
                  defaultAlt="High Contrast Athlete Training"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 hover:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full"
                />
                
                {/* Floating Status Pill */}
                <div className="absolute bottom-6 left-6 right-6 p-4 bg-theme-background/90 border border-theme-border backdrop-blur-md z-20 pointer-events-auto">
                  <div className="flex items-center justify-between mb-1">
                    <EditableElement
                      as="span"
                      id="apex-hero-status-label"
                      field="text"
                      value="FACILITY STATUS"
                      type="text"
                      className="text-[10px] font-mono font-bold uppercase tracking-widest text-theme-primary"
                    />
                    <span className="w-2 h-2 bg-theme-primary rounded-full" />
                  </div>
                  <EditableElement
                    as="p"
                    id="apex-hero-status-val"
                    field="text"
                    value="HIGH OUTPUT TRAINING ACTIVE"
                    type="text"
                    className="text-xs text-theme-foreground font-display uppercase tracking-wider font-extrabold"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Bento Stats Rail */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 border-t border-theme-border pt-12">
            <div className="p-6 bg-theme-surface border border-theme-border hover:border-theme-primary transition-all [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement
                as="span"
                id="apex-stat-1-label"
                field="text"
                value="01 // ATHLETES"
                type="text"
                className="text-[10px] font-mono tracking-widest text-theme-primary uppercase block mb-1"
              />
              <EditableElement
                as="span"
                id="apex-stat-clients"
                field="statClients"
                value={statClients}
                type="text"
                className="block text-2xl font-display font-extrabold uppercase text-theme-foreground"
              />
            </div>

            <div className="p-6 bg-theme-surface border border-theme-border hover:border-theme-primary transition-all [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement
                as="span"
                id="apex-stat-2-label"
                field="text"
                value="02 // EXPERIENCE"
                type="text"
                className="text-[10px] font-mono tracking-widest text-theme-primary uppercase block mb-1"
              />
              <EditableElement
                as="span"
                id="apex-stat-years"
                field="statYears"
                value={statYears}
                type="text"
                className="block text-2xl font-display font-extrabold uppercase text-theme-foreground"
              />
            </div>

            <div className="p-6 bg-theme-surface border border-theme-border hover:border-theme-primary transition-all [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement
                as="span"
                id="apex-stat-3-label"
                field="text"
                value="03 // CREDENTIALS"
                type="text"
                className="text-[10px] font-mono tracking-widest text-theme-primary uppercase block mb-1"
              />
              <EditableElement
                as="span"
                id="apex-stat-certs"
                field="statCerts"
                value={statCerts}
                type="text"
                className="block text-2xl font-display font-extrabold uppercase text-theme-foreground"
              />
            </div>

            <div className="p-6 bg-theme-surface border border-theme-border hover:border-theme-primary transition-all [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement
                as="span"
                id="apex-stat-4-label"
                field="text"
                value="04 // EFFICIENCY"
                type="text"
                className="text-[10px] font-mono tracking-widest text-theme-primary uppercase block mb-1"
              />
              <EditableElement
                as="span"
                id="apex-stat-success"
                field="statSuccess"
                value={statSuccess}
                type="text"
                className="block text-2xl font-display font-extrabold uppercase text-theme-foreground"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 02: PROGRAMS / TRAINING SYSTEM */}
      <section id="programs" className="w-full py-20 md:py-32 border-b border-theme-border bg-theme-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-theme-primary uppercase block mb-3">
                <EditableElement
                  as="span"
                  id="apex-programs-eyebrow"
                  field="tag"
                  value="02 // TRAINING SYSTEM"
                  type="text"
                />
              </span>
              <EditableElement
                as="h2"
                id="apex-programs-heading"
                field="title"
                value="ENGINEERED METHODOLOGY"
                type="heading"
                className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-theme-foreground"
              />
            </div>
            <EditableElement
              as="p"
              id="apex-programs-sub"
              field="description"
              value="Select a program tailored to your goals. Our coaching methodology is backed by biomechanics and proven by athletic results."
              type="text"
              className="text-theme-muted text-xs sm:text-sm max-w-md leading-relaxed"
            />
          </div>

          {/* Asymmetric Cut Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Strength - Large 2-Col Span */}
            <div className="md:col-span-2 lg:col-span-2 relative group border border-theme-border bg-theme-surface overflow-hidden flex flex-col justify-between h-[380px] md:h-[420px] [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
              <div className="absolute inset-0">
                <EditableImage
                  imageKey="apex-prog-1-img"
                  defaultSrc="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
                  defaultAlt="Strength Training"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/70 to-transparent" />
              </div>
              <div className="relative p-8 z-10">
                <EditableElement
                  as="span"
                  id="apex-prog-1-eyebrow"
                  field="tag"
                  value="01 // STRENGTH & POWER"
                  type="text"
                  className="text-[10px] font-mono font-bold tracking-widest text-theme-primary uppercase block mb-2"
                />
                <EditableElement
                  as="h3"
                  id="apex-prog-1-title"
                  field="title"
                  value="STRENGTH & CONDITIONING"
                  type="heading"
                  className="text-2xl md:text-4xl font-display font-extrabold uppercase text-theme-foreground"
                />
              </div>
              <div className="relative p-8 z-10 pt-0">
                <EditableElement
                  as="p"
                  id="apex-prog-1-desc"
                  field="description"
                  value="Build raw strength, improve mechanical power output, and develop joint resilience. Designed for athletes looking for aggressive progression."
                  type="text"
                  className="text-theme-muted text-xs sm:text-sm max-w-xl mb-4 leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-1-badge-1" field="badge1" value="INTENSITY: HIGH" type="text" />
                  </span>
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-1-badge-2" field="badge2" value="DURATION: 12 WEEKS" type="text" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Conditioning - Vertical Tall */}
            <div className="md:col-span-1 lg:col-span-1 relative group border border-theme-border bg-theme-surface overflow-hidden flex flex-col justify-between h-[380px] md:h-[420px] [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
              <div className="absolute inset-0">
                <EditableImage
                  imageKey="apex-prog-2-img"
                  defaultSrc="https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop"
                  defaultAlt="Conditioning"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/80 to-transparent" />
              </div>
              <div className="relative p-8 z-10">
                <EditableElement
                  as="span"
                  id="apex-prog-2-eyebrow"
                  field="tag"
                  value="02 // METABOLIC"
                  type="text"
                  className="text-[10px] font-mono font-bold tracking-widest text-theme-primary uppercase block mb-2"
                />
                <EditableElement
                  as="h3"
                  id="apex-prog-2-title"
                  field="title"
                  value="HIGH-OUTPUT CARDIO"
                  type="heading"
                  className="text-2xl font-display font-extrabold uppercase text-theme-foreground"
                />
              </div>
              <div className="relative p-8 z-10 pt-0">
                <EditableElement
                  as="p"
                  id="apex-prog-2-desc"
                  field="description"
                  value="Accelerate metabolic output, expand VO2 max, and incinerate body fat with structured anaerobic intervals."
                  type="text"
                  className="text-theme-muted text-xs mb-4 leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-2-badge-1" field="badge1" value="INTENSITY: MAXIMAL" type="text" />
                  </span>
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-2-badge-2" field="badge2" value="DURATION: 8 WEEKS" type="text" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Hypertrophy */}
            <div className="md:col-span-1 lg:col-span-1 relative group border border-theme-border bg-theme-surface overflow-hidden flex flex-col justify-between h-[380px] md:h-[420px] [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
              <div className="absolute inset-0">
                <EditableImage
                  imageKey="apex-prog-3-img"
                  defaultSrc="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop"
                  defaultAlt="Hypertrophy"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/80 to-transparent" />
              </div>
              <div className="relative p-8 z-10">
                <EditableElement
                  as="span"
                  id="apex-prog-3-eyebrow"
                  field="tag"
                  value="03 // HYPERTROPHY"
                  type="text"
                  className="text-[10px] font-mono font-bold tracking-widest text-theme-primary uppercase block mb-2"
                />
                <EditableElement
                  as="h3"
                  id="apex-prog-3-title"
                  field="title"
                  value="MUSCLE BUILD & RECOMP"
                  type="heading"
                  className="text-2xl font-display font-extrabold uppercase text-theme-foreground"
                />
              </div>
              <div className="relative p-8 z-10 pt-0">
                <EditableElement
                  as="p"
                  id="apex-prog-3-desc"
                  field="description"
                  value="Optimize muscle fiber recruitment, volume management, and progressive overload to sculpt lean muscle mass."
                  type="text"
                  className="text-theme-muted text-xs mb-4 leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-3-badge-1" field="badge1" value="INTENSITY: MODERATE" type="text" />
                  </span>
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-3-badge-2" field="badge2" value="DURATION: 10 WEEKS" type="text" />
                  </span>
                </div>
              </div>
            </div>

            {/* Card 4: Personal Coaching */}
            <div className="md:col-span-2 lg:col-span-2 relative group border border-theme-primary/40 bg-theme-surface overflow-hidden flex flex-col justify-between h-[380px] md:h-[420px] [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
              <div className="absolute inset-0">
                <EditableImage
                  imageKey="apex-prog-4-img"
                  defaultSrc="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop"
                  defaultAlt="Coaching"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-surface via-theme-surface/70 to-transparent" />
              </div>
              <div className="relative p-8 z-10">
                <EditableElement
                  as="span"
                  id="apex-prog-4-eyebrow"
                  field="tag"
                  value="04 // DEDICATED"
                  type="text"
                  className="text-[10px] font-mono font-bold tracking-widest text-theme-primary uppercase block mb-2"
                />
                <EditableElement
                  as="h3"
                  id="apex-prog-4-title"
                  field="title"
                  value="1-ON-1 PRIVATE COACHING"
                  type="heading"
                  className="text-2xl md:text-4xl font-display font-extrabold uppercase text-theme-foreground"
                />
              </div>
              <div className="relative p-8 z-10 pt-0">
                <EditableElement
                  as="p"
                  id="apex-prog-4-desc"
                  field="description"
                  value="Bespoke biomechanical video assessments, targeted nutritional engineering, and continuous 1-on-1 accountability."
                  type="text"
                  className="text-theme-muted text-xs sm:text-sm max-w-xl mb-4 leading-relaxed"
                />
                <div className="flex flex-wrap gap-2 font-mono text-[10px] uppercase">
                  <span className={`px-3 py-1 bg-theme-primary ${primaryBtnTextColor} font-extrabold`}>
                    <EditableElement as="span" id="apex-prog-4-badge-1" field="badge1" value="TAILORED" type="text" />
                  </span>
                  <span className="px-3 py-1 bg-theme-background border border-theme-border text-theme-foreground">
                    <EditableElement as="span" id="apex-prog-4-badge-2" field="badge2" value="FULL ACCESSIBILITY" type="text" />
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 03: TRANSFORMATIONS / RESULTS */}
      <section id="results" className="w-full py-20 md:py-32 border-b border-theme-border bg-theme-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-theme-primary uppercase block">
              <EditableElement
                as="span"
                id="apex-trans-eyebrow"
                field="tag"
                value="03 // ATHLETIC RESULTS"
                type="text"
              />
            </span>
            <EditableElement
              as="h2"
              id="apex-trans-heading"
              field="title"
              value="PROVEN TRANSFORMATIONS"
              type="heading"
              className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-theme-foreground"
            />
            <EditableElement
              as="p"
              id="apex-trans-sub"
              field="description"
              value="Real physical output. Drag the divider handle to inspect before and after transformations."
              type="text"
              className="text-theme-muted text-xs sm:text-sm leading-relaxed"
            />

            {/* Client Tabs */}
            <div className="flex items-center justify-center gap-3 pt-6">
              {[
                { id: 'apex-trans-tab-0', title: 'Sarah K. (12 WEEKS)' },
                { id: 'apex-trans-tab-1', title: 'Alex M. (24 WEEKS)' },
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveTab(idx);
                    setSliderPosition(50);
                  }}
                  className={`px-5 py-2 text-[10px] font-mono font-extrabold uppercase tracking-widest transition-all duration-200 ${
                    activeTab === idx
                      ? `bg-theme-primary ${primaryBtnTextColor} shadow-lg`
                      : 'bg-theme-surface border border-theme-border text-theme-muted hover:text-theme-foreground'
                  }`}
                >
                  <EditableElement as="span" id={item.id} field="text" value={item.title} type="text" />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Cut Comparison Slider Card */}
          <div className="relative max-w-4xl mx-auto border border-theme-border bg-theme-surface [clip-path:polygon(0_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%)]">
            <div
              ref={sliderContainerRef}
              onPointerDown={handlePointerDown}
              className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden select-none cursor-ew-resize touch-none"
              role="slider"
              aria-valuenow={Math.round(sliderPosition)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Before/After Image Comparison Slider"
            >
              {/* Bottom Layer: Before Image */}
              <div className="absolute inset-0 w-full h-full">
                <EditableImage
                  imageKey={`apex-ba-before-${activeTab}`}
                  defaultSrc={
                    activeTab === 0
                      ? 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
                      : 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop'
                  }
                  defaultAlt="Before Transformation"
                  className="w-full h-full object-cover grayscale contrast-125"
                  containerClassName="w-full h-full"
                />
              </div>

              {/* Top Layer (Clipped): After Image */}
              <div
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`,
                }}
              >
                <EditableImage
                  imageKey={`apex-ba-after-${activeTab}`}
                  defaultSrc={
                    activeTab === 0
                      ? 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop'
                      : 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop'
                  }
                  defaultAlt="After Transformation"
                  className="w-full h-full object-cover grayscale contrast-150 brightness-110"
                  containerClassName="w-full h-full"
                />
              </div>

              {/* Badge Overlay Tags */}
              <div className="absolute bottom-6 left-6 z-30 pointer-events-auto px-4 py-1 bg-theme-background/90 border border-theme-border text-theme-muted text-[10px] font-mono font-bold uppercase tracking-widest">
                <EditableElement as="span" id="apex-trans-badge-before" field="text" value="BEFORE" type="text" />
              </div>
              <div className={`absolute bottom-6 right-6 z-30 pointer-events-auto px-4 py-1 bg-theme-primary ${primaryBtnTextColor} text-[10px] font-mono font-extrabold uppercase tracking-widest`}>
                <EditableElement as="span" id="apex-trans-badge-after" field="text" value="AFTER" type="text" />
              </div>

              {/* Glass Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-theme-primary shadow-[0_0_12px_rgba(193,255,0,0.5)] z-20 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                {/* Grip Circle Handle */}
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-theme-background border-2 border-theme-primary text-theme-primary flex items-center justify-center cursor-ew-resize">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-tighter">↔</span>
                </div>
              </div>
            </div>

            {/* Slider Details Summary Footer */}
            <div className="p-8 bg-theme-surface border-t border-theme-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-1">
                <EditableElement
                  as="h3"
                  id={`apex-trans-${activeTab}-name`}
                  field="name"
                  value={activeTab === 0 ? 'Sarah Jenkins' : 'Alex Mercer'}
                  type="heading"
                  className="text-2xl font-display font-extrabold uppercase text-theme-foreground"
                />
                <EditableElement
                  as="p"
                  id={`apex-trans-${activeTab}-subtitle`}
                  field="subtitle"
                  value={activeTab === 0 ? '12-WEEK TRANSFORMATION — FAT LOSS & POWER' : '24-WEEK TRANSFORMATION — HYPERTROPHY & STRENGTH'}
                  type="text"
                  className="text-theme-primary text-[10px] font-mono font-bold uppercase tracking-widest"
                />
                <EditableElement
                  as="p"
                  id={`apex-trans-${activeTab}-result`}
                  field="result"
                  value={activeTab === 0 ? 'METRIC: -14KG FAT / +18% POWER OUTPUT' : 'METRIC: +8KG MUSCLE / SQUAT +45KG'}
                  type="text"
                  className="text-theme-muted text-xs font-semibold mt-1"
                />
              </div>

              <div className="max-w-md bg-theme-background p-5 border border-theme-border text-xs italic text-theme-foreground leading-relaxed border-l-2 border-l-theme-primary">
                <EditableElement
                  as="p"
                  id={`apex-trans-${activeTab}-quote`}
                  field="quote"
                  value={
                    activeTab === 0
                      ? '"The programming was structured with extreme precision. I completely changed my body composition and strength levels."'
                      : '"I had plateaued for years before starting here. The coaching team broke down my biomechanics and built me back up."'
                  }
                  type="text"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 04: TRAINING EXPERIENCE / VIDEO */}
      <section id="experience" className="w-full py-20 md:py-32 border-b border-theme-border bg-theme-surface/30">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-theme-primary uppercase block mb-3">
              <EditableElement
                as="span"
                id="apex-video-eyebrow"
                field="tag"
                value="04 // THE ATMOSPHERE"
                type="text"
              />
            </span>
            <EditableElement
              as="h2"
              id="apex-video-heading"
              field="title"
              value="INSIDE THE LABORATORY"
              type="heading"
              className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-theme-foreground mb-4"
            />
            <EditableElement
              as="p"
              id="apex-video-sub"
              field="description"
              value="Experience the high-output intensity, heavy iron equipment, and elite community culture."
              type="text"
              className="text-theme-muted text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Large Video Feature Container */}
          <div 
            onClick={handleVideoContainerClick}
            className="relative max-w-5xl mx-auto aspect-[16/9] md:aspect-[21/9] border border-theme-border bg-theme-surface cursor-pointer group [clip-path:polygon(0_0,100%_0,100%_calc(100%-24px),calc(100%-24px)_100%,0_100%)] overflow-hidden"
          >
            <EditableImage
              imageKey="apex-video-thumbnail"
              defaultSrc="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop"
              defaultAlt="Facility Video Preview"
              className="w-full h-full object-cover grayscale contrast-125 opacity-50 group-hover:scale-102 transition-all duration-700"
              containerClassName="w-full h-full"
            />
            
            {/* Play Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/40 group-hover:bg-black/20 transition-colors">
              <div className="apex-play-btn flex items-center justify-center">
                <EditableButton
                  buttonKey="apex-play-video-btn"
                  defaultText="WATCH PREVIEW"
                  defaultHref="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  className={`flex items-center gap-3 px-8 py-4 bg-theme-primary ${primaryBtnTextColor} font-extrabold text-xs font-mono tracking-widest uppercase hover:opacity-90 transition-all shadow-[0_0_30px_rgba(193,255,0,0.2)] [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]`}
                >
                  <Play className="w-4 h-4 fill-current shrink-0" />
                  <span>{activeButtonOverrides['apex-play-video-btn']?.text || 'WATCH PREVIEW'}</span>
                </EditableButton>
              </div>
            </div>
          </div>

          {/* Philosophy Highlights Rail */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16">
            <div className="p-6 bg-theme-surface border border-theme-border space-y-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement as="span" id="apex-video-pill-1-num" field="text" value="01 //" type="text" className="text-xs font-mono font-bold text-theme-primary block" />
              <EditableElement
                as="h4"
                id="apex-video-pill-1-title"
                field="title"
                value="BIOMECHANICAL PRECISION"
                type="heading"
                className="font-display font-extrabold uppercase text-theme-foreground"
              />
              <EditableElement
                as="p"
                id="apex-video-pill-1-desc"
                field="description"
                value="Heavy iron equipment and functional training tools optimized for maximum power transfer and longevity."
                type="text"
                className="text-theme-muted text-xs leading-relaxed"
              />
            </div>

            <div className="p-6 bg-theme-surface border border-theme-border space-y-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement as="span" id="apex-video-pill-2-num" field="text" value="02 //" type="text" className="text-xs font-mono font-bold text-theme-primary block" />
              <EditableElement
                as="h4"
                id="apex-video-pill-2-title"
                field="title"
                value="PERIODIZED VOLUME"
                type="heading"
                className="font-display font-extrabold uppercase text-theme-foreground"
              />
              <EditableElement
                as="p"
                id="apex-video-pill-2-desc"
                field="description"
                value="Data-driven training structures designed to push physical limits, eliminate plateaus, and optimize output."
                type="text"
                className="text-theme-muted text-xs leading-relaxed"
              />
            </div>

            <div className="p-6 bg-theme-surface border border-theme-border space-y-3 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]">
              <EditableElement as="span" id="apex-video-pill-3-num" field="text" value="03 //" type="text" className="text-xs font-mono font-bold text-theme-primary block" />
              <EditableElement
                as="h4"
                id="apex-video-pill-3-title"
                field="title"
                value="ATHLETIC CULTURE"
                type="heading"
                className="font-display font-extrabold uppercase text-theme-foreground"
              />
              <EditableElement
                as="p"
                id="apex-video-pill-3-desc"
                field="description"
                value="Train alongside driven athletes who hold high standards, push intensity, and demand performance."
                type="text"
                className="text-theme-muted text-xs leading-relaxed"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 05: MEMBERSHIP / PRICING */}
      <section id="pricing" className="w-full py-20 md:py-32 border-b border-theme-border bg-theme-background">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-theme-primary uppercase block mb-3">
              <EditableElement
                as="span"
                id="apex-pricing-eyebrow"
                field="tag"
                value="05 // MEMBERSHIP OPTIONS"
                type="text"
              />
            </span>
            <EditableElement
              as="h2"
              id="apex-pricing-heading"
              field="title"
              value="INVEST IN YOUR PERFORMANCE"
              type="heading"
              className="text-4xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-theme-foreground mb-4"
            />
            <EditableElement
              as="p"
              id="apex-pricing-sub"
              field="description"
              value="Select the tier aligned with your commitment level. No long-term lock-in, pause or modify anytime."
              type="text"
              className="text-theme-muted text-xs sm:text-sm leading-relaxed"
            />
          </div>

          {/* Pricing Tier Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {pricing.map((tier, idx) => (
              <div
                key={idx}
                className={`relative p-8 border flex flex-col justify-between transition-all duration-300 [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)] ${
                  tier.highlighted
                    ? 'bg-theme-surface border-theme-primary ring-1 ring-theme-primary/40 lg:scale-[1.04] z-10 shadow-[0_0_40px_rgba(193,255,0,0.1)]'
                    : 'bg-theme-surface border-theme-border hover:border-theme-border/80'
                }`}
              >
                {tier.highlighted && (
                  <EditableElement
                    as="div"
                    id="apex-tier-highlight-badge"
                    field="text"
                    value="MOST POPULAR"
                    type="text"
                    className={`absolute top-0 right-0 px-4 py-1 bg-theme-primary ${primaryBtnTextColor} text-[9px] font-mono font-extrabold uppercase tracking-widest`}
                  />
                )}

                <div>
                  <EditableElement
                    as="h3"
                    id={`apex-tier-${idx}-name`}
                    field="name"
                    value={tier.name}
                    type="heading"
                    className="text-lg font-display font-extrabold uppercase tracking-wide text-theme-foreground mb-6"
                  />
                  
                  <div className="flex items-baseline gap-1 mb-8 border-b border-theme-border pb-6">
                    <EditableElement
                      as="span"
                      id={`apex-tier-${idx}-price`}
                      field="price"
                      value={tier.price}
                      type="text"
                      className="text-5xl font-display font-extrabold text-theme-primary"
                    />
                    <EditableElement
                      as="span"
                      id={`apex-tier-${idx}-period`}
                      field="period"
                      value={tier.period}
                      type="text"
                      className="text-xs font-mono text-theme-muted uppercase tracking-wider font-bold"
                    />
                  </div>

                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, fi) => (
                      <li key={fi} className="flex items-start gap-3 text-xs text-theme-muted">
                        <Check className="w-4 h-4 text-theme-primary mt-0.5 shrink-0" />
                        <EditableElement
                          as="span"
                          id={`apex-tier-${idx}-feat-${fi}`}
                          field={`feature_${fi}`}
                          value={feature}
                          type="text"
                          className="inline leading-relaxed"
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                <EditableButton
                  buttonKey={`apex-tier-${idx}-signup`}
                  defaultText="SIGN UP NOW"
                  defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi, I want to sign up for ${tier.name} (${tier.price}/month)`)}`}
                  defaultOpenInNewTab={true}
                  className={`w-full py-4 text-xs font-mono font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    tier.highlighted
                      ? `bg-theme-primary ${primaryBtnTextColor} hover:opacity-90 shadow-[0_0_20px_rgba(193,255,0,0.2)]`
                      : 'border border-theme-border text-theme-foreground hover:bg-theme-primary hover:text-theme-background hover:border-theme-primary'
                  } [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]`}
                >
                  <Zap className="w-4 h-4" />
                  <span>{activeButtonOverrides[`apex-tier-${idx}-signup`]?.text || 'SIGN UP NOW'}</span>
                </EditableButton>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 06: FINAL CTA & BRAND STATEMENT */}
      <section className="w-full pt-20 pb-12 bg-theme-background relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Main CTA Block */}
          <div className="max-w-4xl mx-auto text-center py-20 border-b border-theme-border flex flex-col items-center">
            <EditableElement
              as="span"
              id="apex-cta-eyebrow"
              field="text"
              value="06 // CLAIM YOUR SPOT"
              type="text"
              className="text-[10px] font-mono font-bold tracking-[0.25em] text-theme-primary uppercase block mb-4"
            />

            <EditableElement
              as="h2"
              id="apex-cta-heading"
              field="title"
              value="YOUR NEXT LEVEL STARTS HERE."
              type="heading"
              className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tighter text-theme-foreground leading-[0.9] mb-6"
            />

            <EditableElement
              as="p"
              id="apex-cta-sub"
              field="description"
              value="High-performance athletic output begins with your next commitment. Join the facility today."
              type="text"
              className="text-theme-muted text-xs sm:text-sm leading-relaxed max-w-md mb-10"
            />

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <EditableButton
                buttonKey="apex-final-cta-primary"
                defaultText="CLAIM MEMBERSHIP"
                defaultHref="#pricing"
                className={`w-full sm:w-auto px-10 py-5 bg-theme-primary ${primaryBtnTextColor} font-extrabold text-xs font-mono tracking-widest uppercase hover:opacity-90 transition-all shadow-[0_0_30px_rgba(193,255,0,0.2)] flex items-center justify-center gap-2 [clip-path:polygon(0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%)]`}
              >
                <span>{activeButtonOverrides['apex-final-cta-primary']?.text || 'CLAIM MEMBERSHIP'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </EditableButton>

              <EditableButton
                buttonKey="apex-final-cta-secondary"
                defaultText="TALK TO A COACH"
                defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi, I want to talk to a coach about starting my training.`)}`}
                defaultOpenInNewTab={true}
                className="w-full sm:w-auto px-10 py-5 border border-theme-border text-theme-foreground font-extrabold text-xs font-mono tracking-widest uppercase hover:bg-theme-surface hover:border-theme-primary transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-theme-primary" />
                <span>{activeButtonOverrides['apex-final-cta-secondary']?.text || 'TALK TO A COACH'}</span>
              </EditableButton>
            </div>
          </div>

          {/* 3-Column Footer Layout (Like Artesian Kitchen / CafeCloud) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mt-16 md:mt-24 mb-12 items-stretch text-xs text-theme-muted">
            
            {/* Column 1: Brand & Contact Info (lg:col-span-4) */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <EditableElement
                  as="h3"
                  id="apex-footer-brand"
                  field="brand"
                  value="APEX FIT // SYSTEM"
                  type="heading"
                  className="text-xl font-display font-extrabold uppercase text-theme-foreground tracking-wider"
                />
                <EditableElement
                  as="p"
                  id="apex-footer-desc"
                  field="description"
                  value="High-performance athletic laboratory dedicated to strength engineering, physical output, and longevity."
                  type="text"
                  className="text-xs text-theme-muted leading-relaxed max-w-sm"
                />
              </div>

              <div className="space-y-2 text-xs text-theme-muted pt-2">
                <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-theme-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-theme-primary" />
                  <EditableElement as="span" id="apex-footer-phone" field="phone" value="+91 9988776655" type="text" />
                </a>
                <a href="mailto:train@apexfit.com" className="flex items-center gap-2 hover:text-theme-primary transition-colors">
                  <Mail className="w-3.5 h-3.5 text-theme-primary" />
                  <EditableElement as="span" id="apex-footer-email" field="email" value="train@apexfit.com" type="text" />
                </a>
                <div className="flex items-start gap-2 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-theme-primary mt-0.5 shrink-0" />
                  <EditableElement as="span" id="apex-footer-location" field="location" value="128 Performance Way, Metro Gym" type="text" />
                </div>
              </div>
            </div>

            {/* Column 2: Quick Navigation Links (lg:col-span-3) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <EditableElement
                as="span"
                id="apex-footer-links-header"
                field="text"
                value="01 // QUICK LINKS"
                type="text"
                className="text-[10px] font-mono font-bold text-theme-primary uppercase tracking-widest block"
              />
              <div className="flex flex-col gap-2.5">
                <a
                  href="#"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors text-left"
                >
                  <EditableElement as="span" id="apex-footer-link-1" field="text" value="Home / Overview" type="text" />
                </a>
                <a
                  href="#programs"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors text-left"
                >
                  <EditableElement as="span" id="apex-footer-link-2" field="text" value="Training Programs" type="text" />
                </a>
                <a
                  href="#results"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors text-left"
                >
                  <EditableElement as="span" id="apex-footer-link-3" field="text" value="Client Transformations" type="text" />
                </a>
                <a
                  href="#experience"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors text-left"
                >
                  <EditableElement as="span" id="apex-footer-link-4" field="text" value="Training Laboratory" type="text" />
                </a>
                <a
                  href="#pricing"
                  className="text-xs sm:text-sm font-medium text-theme-muted hover:text-theme-primary transition-colors text-left"
                >
                  <EditableElement as="span" id="apex-footer-link-5" field="text" value="Membership Options" type="text" />
                </a>
              </div>
            </div>

            {/* Column 3: Big Uneditable "Built with Portiva" Card (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-theme-surface border border-theme-border p-7 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-theme-primary/40 transition-all duration-300 min-h-[220px] backdrop-blur-md [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-theme-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-primary/15 border border-theme-primary/30 text-theme-primary text-[10px] font-mono font-bold tracking-widest uppercase mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Built with portiva.site</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold uppercase text-theme-foreground tracking-tight mb-2 leading-snug block">
                  Created in 60 seconds — Free forever
                </h3>

                <p className="text-xs text-theme-muted leading-relaxed block">
                  Build, customize, and publish your dream website instantly with AI. Fast, responsive, and completely free forever.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-theme-border flex items-center justify-between gap-4">
                <span className="text-xs font-mono font-bold text-theme-foreground/80 uppercase">
                  Build your website now
                </span>
                <a
                  href="https://portiva.site"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-theme-primary hover:opacity-90 ${primaryBtnTextColor} text-xs font-mono font-extrabold px-4 py-2.5 transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0 [clip-path:polygon(0_0,100%_0,100%_calc(100%-8px),calc(100%-8px)_100%,0_100%)]`}
                >
                  <span>Create Yours Free</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* Footer Copyright */}
          <div className="border-t border-theme-border pt-8 text-center text-[11px] font-mono text-theme-muted/60 flex flex-col sm:flex-row justify-between items-center gap-4">
            <EditableElement
              as="p"
              id="apex-footer-copyright"
              field="copyright"
              value={`© 2026 ${trainerName} — Apex Fit. All rights reserved.`}
              type="text"
            />
            <EditableElement
              as="p"
              id="apex-footer-engine-tag"
              field="text"
              value="Engineered for Portiva Platform."
              type="text"
            />
          </div>

        </div>
      </section>

      {/* VIDEO MODAL IFRAME */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300">
          <div className="relative w-full max-w-4xl bg-theme-surface border border-theme-border overflow-hidden shadow-2xl [clip-path:polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/60 border border-theme-border hover:bg-theme-primary hover:text-black text-white z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                src={videoUrl}
                title="Training Video"
                className="w-full h-full border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
