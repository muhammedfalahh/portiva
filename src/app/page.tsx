'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Globe,
  Palette,
  Shield,
  Layers,
  Sparkles,
  MousePointerClick,
} from 'lucide-react';

// ─── Animation Variants ─────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

// ─── Feature Data ────────────────────────────────────────────────────────────
const features = [
  {
    icon: Palette,
    title: 'Free + Pro Templates',
    description: 'Start free with curated single-page templates, then upgrade to premium multi-page websites built for real business use.',
  },
  {
    icon: MousePointerClick,
    title: 'Visual Page Editor',
    description: 'Edit text, images, buttons, styles, and page-specific content directly on canvas with live preview.',
  },
  {
    icon: Globe,
    title: 'Publish Fast',
    description: 'Launch polished micro-websites quickly with production-ready routing, responsive layouts, and edge delivery.',
  },
  {
    icon: Layers,
    title: 'Niche Website Systems',
    description: 'Creator, commerce, hospitality, automotive, education, beauty, fitness, and real-estate templates with stronger information architecture.',
  },
  {
    icon: Shield,
    title: 'Editor Safety First',
    description: 'Theme controls, editable media, and protected builder architecture keep customization powerful without breaking structure.',
  },
  {
    icon: Sparkles,
    title: 'Upgrade Path Built In',
    description: 'Premium template metadata, page counts, and future subscription gating are ready without fake billing flows.',
  },
];

const steps = [
  { number: '01', title: 'Choose Free or Pro', description: 'Pick fast free templates or multi-page premium website systems by niche.' },
  { number: '02', title: 'Edit Page by Page', description: 'Customize text, media, buttons, colors, and layout in visual builder.' },
  { number: '03', title: 'Publish with Clarity', description: 'Launch a serious micro-website instead of a generic link page.' },
];

// ─── Landing Page Component ──────────────────────────────────────────────────
export default function Home() {
  const [handle, setHandle] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');

  const handleClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle || handle.length < 3) {
      setSearchMessage('Handle must be at least 3 characters.');
      return;
    }

    const cleanHandle = handle.toLowerCase().replace(/[^a-z0-9-]/g, '');
    if (cleanHandle !== handle.toLowerCase()) {
      setSearchMessage('Only lowercase letters, numbers, and hyphens allowed.');
      return;
    }

    setIsSearching(true);
    setSearchMessage('');

    setTimeout(() => {
      setIsSearching(false);
      setSearchMessage(`✓ @${cleanHandle} is available! Redirecting...`);
      setTimeout(() => {
        window.location.href = `/dashboard?handle=${cleanHandle}`;
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary font-sans relative overflow-hidden flex flex-col">

      {/* ═══════════════════════════════════════════════════════════════════
          NAVIGATION
          ═══════════════════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 w-full">
        <div className="glass-strong">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center shadow-sm">
                <span className="font-display font-black text-white text-base leading-none">P</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-text-primary">
                Portiva
              </span>
            </Link>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              <a href="#features" className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md">
                Features
              </a>
              <a href="#how-it-works" className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md">
                How It Works
              </a>
              <a href="#pricing" className="px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-md">
                Pricing
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors hidden sm:block"
              >
                Log in
              </Link>
              <Link
                href="#claim"
                className="btn btn-primary btn-sm"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-28 sm:pt-36 pb-20 flex flex-col items-center text-center">
          {/* Headline — emphasis through weight, not gradient */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-[-0.03em] leading-[1.08] max-w-3xl mb-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Build niche websites with free and premium templates
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-text-secondary max-w-xl leading-relaxed mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Portiva is a visual micro-website builder for creators and businesses.
            Start free, upgrade to multi-page templates, and publish without code.
          </motion.p>

          {/* CTA Group — claim handle is the conversion action */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 mb-12"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link href="#claim" className="btn btn-primary btn-lg shadow-glow">
              Claim Your Handle
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/dashboard" className="btn btn-secondary btn-lg">
              Browse Templates
            </Link>
          </motion.div>

          {/* Trust line — concrete, not repeating the headline */}
          <motion.p
            className="text-sm text-text-quaternary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            No credit card required · Free plan available · Publishes in seconds
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            LIVE PREVIEW SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <div className="max-w-5xl mx-auto px-6 pb-32">
          <motion.div
            className="relative rounded-2xl border border-border-default bg-bg-secondary overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border-subtle bg-bg-tertiary">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FDBC40]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-bg-primary/80 rounded-md px-3 py-1 text-[11px] text-text-tertiary font-mono">
                  portiva.in/your-name
                </div>
              </div>
            </div>

            {/* Bento Grid Preview */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[140px]">
                {/* Link Block */}
                <div className="col-span-2 row-span-1 bg-bg-tertiary border border-border-subtle rounded-xl p-5 flex flex-col justify-between group hover:border-border-default transition-all duration-200 cursor-pointer">
                  <span className="text-text-quaternary font-semibold text-[10px] tracking-widest uppercase">External Link</span>
                  <div>
                    <h3 className="text-base font-semibold text-text-primary group-hover:text-accent-hover transition-colors">
                      My Portfolio ↗
                    </h3>
                    <p className="text-text-tertiary text-xs mt-0.5 line-clamp-1">
                      View my latest design and development work
                    </p>
                  </div>
                </div>

                {/* Image Block */}
                <div className="col-span-1 row-span-2 bg-bg-tertiary border border-border-subtle rounded-xl overflow-hidden group relative">
                  <div className="absolute inset-0 bg-accent-subtle flex items-center justify-center">
                    <span className="text-text-quaternary text-xs font-mono">Image</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/80 via-transparent to-transparent z-10 flex items-end p-4">
                    <div>
                      <span className="text-accent-hover font-bold text-[9px] tracking-widest uppercase">Portfolio</span>
                      <h3 className="text-xs font-semibold text-text-primary mt-0.5">Studio Shot</h3>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Block */}
                <div className="col-span-1 row-span-2 bg-gradient-to-br from-bg-tertiary to-[#0D1E14] border border-border-subtle rounded-xl p-5 flex flex-col justify-between group hover:border-success/30 transition-all duration-200 cursor-pointer">
                  <div className="flex justify-between items-start w-full">
                    <span className="badge badge-success text-[9px]">Store</span>
                    <span className="text-text-primary font-bold text-sm">₹8,999</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary line-clamp-1">Mechanical Keyboard</h3>
                    <p className="text-[10px] text-text-tertiary mt-1">Tap to order via WhatsApp</p>
                    <div className="w-full py-2 mt-2.5 bg-success hover:bg-whatsapp-hover text-white font-bold text-[10px] rounded-lg flex items-center justify-center transition-colors">
                      Order Now
                    </div>
                  </div>
                </div>

                {/* Stats Block */}
                <div className="col-span-2 row-span-1 bg-bg-tertiary border border-border-subtle rounded-xl p-5 flex items-center gap-4 group hover:border-border-default transition-all duration-200">
                  <div className="w-10 h-10 rounded-lg bg-accent-subtle border border-accent/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-accent-hover" />
                  </div>
                  <div>
                    <span className="text-accent-hover font-bold text-[9px] tracking-widest uppercase">Performance</span>
                    <h3 className="text-sm font-semibold text-text-primary mt-0.5">Sub-200ms Load Time</h3>
                    <p className="text-text-tertiary text-xs">Global edge CDN delivery</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURES SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="features" className="relative py-24 sm:py-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              className="badge badge-accent mb-4 inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Features
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Everything you need to build
            </motion.h2>
            <motion.p
              className="text-text-secondary text-lg max-w-xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Powerful features that make website creation effortless for everyone.
            </motion.p>
          </div>

          {/* Features Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={staggerChild}
                className="card group p-6"
              >
                <div className="w-10 h-10 rounded-lg bg-accent-subtle border border-accent/15 flex items-center justify-center mb-4 group-hover:bg-accent-muted transition-colors">
                  <feature.icon className="w-5 h-5 text-accent-hover" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WORKS SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="how-it-works" className="relative py-24 sm:py-32 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              className="badge badge-accent mb-4 inline-flex"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              How It Works
            </motion.span>
            <motion.h2
              className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Three steps to your website
            </motion.h2>
            <motion.p
              className="text-text-secondary text-lg max-w-xl mx-auto"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Get from zero to a published website in under a minute.
            </motion.p>
          </div>

          {/* Steps */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {steps.map((step) => (
              <motion.div key={step.number} variants={staggerChild} className="relative text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-subtle border border-accent/20 mb-5">
                  <span className="font-display font-bold text-accent-hover text-sm">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CLAIM YOUR HANDLE — CTA SECTION
          ═══════════════════════════════════════════════════════════════════ */}
      <section id="claim" className="relative py-24 sm:py-32 border-t border-border-subtle">
        <div className="max-w-2xl mx-auto px-6 text-center">
          {/* Ambient Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden" aria-hidden="true">
            <div className="w-[500px] h-[300px] bg-accent/[0.06] rounded-full blur-[120px]" />
          </div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-tight mb-4">
              Ready to build?
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto">
              Claim your unique Portiva link and start creating your website today.
            </p>

            {/* Handle Claim Form */}
            <form
              onSubmit={handleClaim}
              className="card p-2 flex items-center shadow-lg max-w-md mx-auto"
            >
              <span className="text-text-tertiary font-medium pl-4 pr-1 text-sm select-none whitespace-nowrap">
                portiva.in/
              </span>
              <input
                type="text"
                placeholder="your-name"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                className="bg-transparent border-0 outline-none text-text-primary text-sm font-medium flex-1 py-2.5 min-w-0"
                disabled={isSearching}
              />
              <button
                type="submit"
                disabled={isSearching}
                className="btn btn-primary btn-sm ml-1 whitespace-nowrap"
              >
                {isSearching ? (
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Checking
                  </span>
                ) : (
                  'Claim Page'
                )}
              </button>
            </form>

            <AnimatePresence mode="wait">
              {searchMessage && (
                <motion.p
                  key={searchMessage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className={`text-sm font-medium mt-4 ${
                    searchMessage.includes('✓') ? 'text-success' : 'text-accent-hover'
                  }`}
                >
                  {searchMessage}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-border-subtle py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-brand flex items-center justify-center">
              <span className="font-display font-black text-white text-xs leading-none">P</span>
            </div>
            <span className="text-sm font-medium text-text-tertiary">
              © 2026 Portiva
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-text-tertiary">
            <a href="#" className="hover:text-text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-text-secondary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
