/**
 * =============================================================================
 * PORTIVA: Nitec — The Modern E-Commerce / Tech Brand Template
 * =============================================================================
 *
 * Aesthetic: Soft, futuristic, Apple-inspired glassmorphism.
 * Color Palette: Warm off-white/beige background (#F4F4EE) with stark black text and vibrant accents.
 * Typography: Geometric, highly legible sans-serif.
 * Features:
 *   - Soft, diffused drop shadows (floating 3D space effect)
 *   - Pill-shaped buttons and completely rounded bento boxes
 *   - Micro-components: color selector dots, star rating pills, arrow buttons
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, Heart, ArrowRight, Star, ArrowUpRight, Play, Check } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';

export interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image_url: string;
  badge?: string;
  colors?: string[];
  rating?: number;
}

export interface NitecProps {
  brandName?: string;
  tagline?: string;
  searchPlaceholder?: string;
  userName?: string;
  userAvatar?: string;
  heroProduct?: {
    title: string;
    badge: string;
    description: string;
    image_url: string;
    ctaText: string;
  };
  products?: ProductItem[];
  statsText?: string;
  statsLabel?: string;
}

export const Nitec: React.FC<NitecProps> = ({
  brandName = 'nitec.',
  tagline = 'Music is Classic',
  searchPlaceholder = 'Search products...',
  userName = 'Ryman Alex',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
  heroProduct = {
    title: 'Sequoia Inspiring Musico.',
    badge: '01 Clear Sounds',
    description: 'Making your dream music come true stay with Sequios Sounds!',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop',
    ctaText: 'View All Products'
  },
  products = [
    {
      id: 'prod-1',
      title: 'New Gen X-Bud',
      subtitle: 'True wireless active noise cancellation.',
      price: '₹4,999',
      image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop',
      badge: 'Trending'
    },
    {
      id: 'prod-2',
      title: 'Light Grey Surface Headphone',
      subtitle: 'Boosted with heavy bass and spatial audio.',
      price: '₹14,999',
      image_url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=400&auto=format&fit=crop',
      badge: 'Premium Edition'
    }
  ],
  statsText = '5m+',
  statsLabel = 'Downloads & 4.6 reviews'
}) => {
  const [activeColor, setActiveColor] = useState(0);
  const colorDots = ['#3b82f6', '#f97316', '#22c55e', '#ef4444', '#06b6d4'];

  let templateData: any = { theme: { background: '#F4F4EE', surface: '#ffffff', primary: '#171715' }, textColors: {}, buttonOverrides: {} };
  try {
    const builder = useVisualBuilder();
    if (builder && builder.templateData) {
      templateData = {
        ...templateData,
        ...builder.templateData,
        theme: {
          ...templateData.theme,
          ...(builder.templateData.theme || {})
        },
        buttonOverrides: builder.templateData.buttonOverrides || {}
      };
    }
  } catch (e) {
    // Fail-safe default fallback
  }

  return (
    <EditableElement
      as="div"
      id="nitec-page"
      field="background"
      type="background"
      value=""
      defaultColor={templateData.theme.background}
      className="w-full min-h-screen bg-[#F4F4EE] text-[#171715] p-4 sm:p-6 md:p-8 font-sans selection:bg-[#171715] selection:text-white flex flex-col items-center"
    >
      
      {/* ─── Apple-Inspired Navigation Bar ───────────────────────────────── */}
      <EditableElement
        as="header"
        id="nitec-header"
        field="background"
        type="box"
        value=""
        defaultColor="rgba(255, 255, 255, 0.7)"
        className="w-full max-w-6xl bg-white/70 border border-[#E3E3DC] p-3 rounded-[32px] flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.02)] backdrop-blur-xl mb-6"
      >
        <div className="flex items-center gap-6 pl-4">
          <EditableElement
            as="span"
            id="nitec-brand"
            field="brandName"
            value={brandName}
            type="text"
            className="font-black text-xl tracking-tight font-sans"
          />
          
          {/* Pill-Shaped Search Bar */}
          <div className="hidden md:flex items-center bg-[#F4F4EE]/60 border border-[#E3E3DC] rounded-full px-4 py-1.5 w-60 justify-between">
            <EditableElement
              as="span"
              id="nitec-search"
              field="searchPlaceholder"
              value={searchPlaceholder}
              type="text"
              className="text-xs font-semibold text-[#8E8E88] flex-1 cursor-text"
            />
            <Search className="w-3.5 h-3.5 text-[#8E8E88]" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Micro Action Buttons */}
          <EditableButton
            buttonKey="nitec-nav-cart"
            defaultText=""
            className="w-10 h-10 rounded-full bg-white hover:bg-[#F4F4EE] border border-[#E3E3DC] flex items-center justify-center text-[#171715] transition shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#171715]" />
          </EditableButton>
          <EditableButton
            buttonKey="nitec-nav-favorites"
            defaultText=""
            className="w-10 h-10 rounded-full bg-white hover:bg-[#F4F4EE] border border-[#E3E3DC] flex items-center justify-center text-[#171715] transition shadow-sm cursor-pointer"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
          </EditableButton>

          {/* User Profile Info Card */}
          <div className="flex items-center gap-2 border border-[#E3E3DC] bg-white rounded-full p-1 pl-3 pr-1 shadow-sm">
            <EditableElement
              as="span"
              id="nitec-username"
              field="userName"
              value={userName}
              type="text"
              className="text-xs font-bold hidden sm:inline-block text-[#5E5E58]"
            />
            <EditableImage
              imageKey="nitec-user-avatar"
              defaultSrc={userAvatar}
              defaultAlt={userName}
              className="w-full h-full object-cover"
              containerClassName="w-8 h-8 rounded-full overflow-hidden block"
            />
          </div>
        </div>
      </EditableElement>

      {/* ─── Bento Grid Layout ──────────────────────────────────────────── */}
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* HERO COMPONENT: Main Product Highlight */}
        <EditableElement
          as="div"
          id="nitec-hero"
          field="background"
          type="box"
          value=""
          defaultColor="#ffffff"
          className="col-span-1 md:col-span-3 bg-white border border-[#E3E3DC] rounded-[48px] p-8 md:p-10 flex flex-col md:flex-row justify-between gap-8 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] group"
        >
          {/* Content details */}
          <div className="flex flex-col justify-between z-10 max-w-sm">
            <div>
              <span className="inline-flex items-center bg-[#F4F4EE] border border-[#E3E3DC] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full text-[#5E5E58] mb-8">
                ⚙️&nbsp;
                <EditableElement
                  as="span"
                  id="nitec-hero-tagline"
                  field="tagline"
                  value={tagline}
                  type="text"
                  className="inline"
                />
              </span>
              <EditableElement
                as="h2"
                id="nitec-hero-title"
                field="heroProductTitle"
                value={heroProduct.title}
                type="heading"
                className="text-3xl sm:text-5xl font-black tracking-tight text-[#171715] leading-tight mb-4 block"
              />
              <div className="flex items-start gap-3 mt-4">
                <EditableElement
                  as="span"
                  id="nitec-hero-badge-num"
                  field="heroProductBadgeNumber"
                  value="01"
                  type="text"
                  className="text-2xl font-black text-indigo-600 inline-block"
                />
                <div className="flex flex-col gap-0.5">
                  <EditableElement
                    as="span"
                    id="nitec-hero-badge-lbl"
                    field="heroProductBadgeLabel"
                    value={heroProduct.badge}
                    type="text"
                    className="text-xs font-bold text-[#171715] block"
                  />
                  <EditableElement
                    as="p"
                    id="nitec-hero-desc"
                    field="heroProductDescription"
                    value={heroProduct.description}
                    type="text"
                    className="text-xs text-[#8E8E88] font-semibold leading-relaxed block"
                  />
                </div>
              </div>
            </div>

            {/* Pill-Shaped CTA Button */}
            <EditableButton
              buttonKey="nitec-hero-cta"
              defaultText={heroProduct.ctaText}
              className="bg-[#171715] hover:bg-black text-[#F4F4EE] font-black text-xs px-6 py-3.5 rounded-full flex items-center justify-between mt-12 transition duration-200 active:scale-[0.98] w-48 shadow-md cursor-pointer"
            >
              <span>{templateData.buttonOverrides['nitec-hero-cta']?.text || heroProduct.ctaText}</span>
              <span className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center ml-2">
                <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </span>
            </EditableButton>
          </div>

          {/* Floating Product Image with soft drop shadow */}
          <div className="flex-1 flex items-center justify-center relative min-h-[260px] md:min-h-[auto]">
            {/* Soft backdrop glow */}
            <div className="absolute w-56 h-56 rounded-full bg-indigo-500/10 blur-[60px]" />
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="w-full max-w-[280px] z-10"
            >
              <EditableImage
                imageKey="nitec-hero-image"
                defaultSrc={heroProduct.image_url}
                defaultAlt={heroProduct.title}
                className="w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(99,102,241,0.15)]"
                containerClassName="w-full h-full overflow-visible block"
                objectFit="contain"
              />
            </motion.div>
          </div>

          {/* Floating Social Icons */}
          <div className="absolute bottom-6 left-10 hidden md:flex items-center gap-3">
            <EditableElement
              as="span"
              id="nitec-social-follow"
              field="followLabel"
              value="Follow:"
              type="text"
              className="text-[10px] font-black text-[#8E8E88] uppercase tracking-wider"
            />
            <EditableElement
              as="span"
              id="nitec-social-tw"
              field="followTW"
              value="TW"
              type="text"
              className="text-xs font-black hover:text-black cursor-pointer text-[#8E8E88]"
            />
            <EditableElement
              as="span"
              id="nitec-social-ig"
              field="followIG"
              value="IG"
              type="text"
              className="text-xs font-black hover:text-black cursor-pointer text-[#8E8E88]"
            />
            <EditableElement
              as="span"
              id="nitec-social-in"
              field="followIN"
              value="IN"
              type="text"
              className="text-xs font-black hover:text-black cursor-pointer text-[#8E8E88]"
            />
          </div>
        </EditableElement>

        {/* SIDEBAR: micro-interactions & collections */}
        <div className="col-span-1 flex flex-col gap-6">
          
          {/* Micro 1: Popular Colors Selection */}
          <EditableElement
            as="div"
            id="nitec-colors-section"
            field="background"
            type="box"
            value=""
            defaultColor="#ffffff"
            className="bg-white border border-[#E3E3DC] p-6 rounded-[36px] shadow-[0_15px_35px_rgba(0,0,0,0.02)] flex flex-col gap-4"
          >
            <EditableElement
              as="span"
              id="nitec-colors-title"
              field="title"
              value="Popular Colors"
              type="text"
              className="text-[10px] font-black uppercase text-[#8E8E88] tracking-widest"
            />
            <div className="flex items-center gap-3">
              {colorDots.map((color, index) => (
                <div
                  key={index}
                  onClick={() => setActiveColor(index)}
                  className="relative focus:outline-none transition active:scale-90"
                >
                  <EditableButton
                    buttonKey={`nitec-color-dot-${index}`}
                    defaultText=""
                    defaultStyle={{ backgroundColor: color }}
                    className="w-8 h-8 rounded-full border border-white flex items-center justify-center shadow-sm"
                  >
                    {activeColor === index && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </EditableButton>
                </div>
              ))}
            </div>
          </EditableElement>

          {/* Micro 2: Trending Secondary Product Card */}
          {products[0] && (
            <EditableElement
              as="div"
              id="nitec-secondary-product-card"
              field="background"
              type="box"
              value=""
              defaultColor="#ffffff"
              className="bg-white border border-[#E3E3DC] rounded-[40px] p-5 shadow-[0_15px_35px_rgba(0,0,0,0.02)] flex flex-col justify-between gap-4 h-[240px] group cursor-pointer hover:border-slate-800 transition"
            >
              <div className="relative w-full h-28 bg-[#F4F4EE] rounded-[24px] overflow-hidden flex items-center justify-center">
                <EditableImage
                  imageKey="nitec-secondary-product-image"
                  defaultSrc={products[0].image_url}
                  defaultAlt={products[0].title}
                  className="w-20 h-20 object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] group-hover:scale-105 transition"
                  containerClassName="w-full h-full flex items-center justify-center"
                  objectFit="contain"
                />
                <EditableElement
                  as="span"
                  id="nitec-secondary-product-badge"
                  field="product1Badge"
                  value={products[0].badge || ""}
                  type="text"
                  className="absolute top-2.5 left-2.5 bg-indigo-500 text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full z-20 cursor-text"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <EditableElement
                    as="h4"
                    id="nitec-secondary-product-title"
                    field="product1Title"
                    value={products[0].title}
                    type="text"
                    className="text-xs font-black text-[#171715] block"
                  />
                  <EditableElement
                    as="span"
                    id="nitec-secondary-product-price"
                    field="product1Price"
                    value={products[0].price}
                    type="text"
                    className="text-xs font-black text-indigo-600 block mt-0.5"
                  />
                </div>
                <EditableButton
                  buttonKey="nitec-secondary-product-btn"
                  defaultText=""
                  className="w-8 h-8 rounded-full bg-[#171715] text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </EditableButton>
              </div>
            </EditableElement>
          )}
        </div>

        {/* BOTTOM ROW: details, reviews, product grids */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* Card 1: Downloads & Reviews Stats */}
          <EditableElement
            as="div"
            id="nitec-stats-card"
            field="background"
            type="box"
            value=""
            defaultColor="#ffffff"
            className="bg-white border border-[#E3E3DC] rounded-[36px] p-6 flex flex-col justify-between h-[160px] shadow-sm"
          >
            <EditableElement
              as="span"
              id="nitec-stats-title"
              field="title"
              value="Global Reach"
              type="text"
              className="text-[10px] font-black uppercase text-[#8E8E88] tracking-widest"
            />
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <EditableElement
                  as="span"
                  id="nitec-stats-value"
                  field="statsText"
                  value={statsText}
                  type="text"
                  className="text-3xl font-black text-[#171715]"
                />
                <span className="inline-flex items-center gap-0.5 bg-yellow-100 text-yellow-800 border border-yellow-200 text-[8px] font-black px-1.5 py-0.5 rounded-full">
                  <Star className="w-2 h-2 fill-current text-yellow-800" />
                  <EditableElement
                    as="span"
                    id="nitec-stats-rating"
                    field="ratingValue"
                    value="4.8"
                    type="text"
                    className="inline"
                  />
                </span>
              </div>
              <EditableElement
                as="p"
                id="nitec-stats-label"
                field="statsLabel"
                value={statsLabel}
                type="text"
                className="text-[10px] text-[#8E8E88] font-bold block"
              />
            </div>
          </EditableElement>

          {/* Card 2: Interactive Audio Player Widget */}
          <EditableElement
            as="div"
            id="nitec-audio-card"
            field="background"
            type="box"
            value=""
            defaultColor="#171715"
            className="bg-[#171715] border border-black rounded-[36px] p-6 flex flex-col justify-between h-[160px] text-[#F4F4EE] shadow-md relative overflow-hidden group"
          >
            {/* Background design */}
            <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 rounded-full bg-white/5 blur-xl group-hover:bg-white/10 transition" />
            <div className="flex justify-between items-start">
              <EditableElement
                as="span"
                id="nitec-audio-streaming"
                field="streamingLabel"
                value="Now Streaming"
                type="text"
                className="text-[9px] font-black uppercase text-[#8E8E88] tracking-widest"
              />
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping" />
            </div>
            <div className="flex items-center gap-4">
              <EditableButton
                buttonKey="nitec-audio-play-btn"
                defaultText=""
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition active:scale-95 cursor-pointer shrink-0"
              >
                <Play className="w-4 h-4 fill-current ml-0.5 text-black" />
              </EditableButton>
              <div>
                <EditableElement
                  as="h4"
                  id="nitec-audio-title"
                  field="audioTitle"
                  value="Release: Musico"
                  type="text"
                  className="text-xs font-black text-white block"
                />
                <EditableElement
                  as="p"
                  id="nitec-audio-subtitle"
                  field="audioSubtitle"
                  value="Active Studio Session"
                  type="text"
                  className="text-[10px] text-[#8E8E88] font-semibold block"
                />
              </div>
            </div>
          </EditableElement>

          {/* Card 3: Brand Statement */}
          <EditableElement
            as="div"
            id="nitec-vision-card"
            field="background"
            type="box"
            value=""
            defaultColor="#ffffff"
            className="bg-white border border-[#E3E3DC] rounded-[36px] p-6 flex flex-col justify-between h-[160px] shadow-sm"
          >
            <EditableElement
              as="span"
              id="nitec-vision-title"
              field="title"
              value="Our Vision"
              type="text"
              className="text-[10px] font-black uppercase text-[#8E8E88] tracking-widest"
            />
            <EditableElement
              as="p"
              id="nitec-vision-desc"
              field="description"
              value="We design premium acoustic ecosystems for minimalists and purists."
              type="text"
              className="text-xs font-bold text-[#5E5E58] leading-relaxed"
            />
          </EditableElement>
        </div>

        {/* Card 4: Right Big Feature Product */}
        {products[1] && (
          <EditableElement
            as="div"
            id="nitec-feature-product-card"
            field="background"
            type="box"
            value=""
            defaultColor="#ffffff"
            className="col-span-1 bg-white border border-[#E3E3DC] rounded-[48px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] flex flex-col justify-between h-[340px] group cursor-pointer hover:border-slate-800 transition"
          >
            <div className="relative w-full h-[180px] bg-[#F4F4EE] rounded-[36px] overflow-hidden flex items-center justify-center">
              <EditableImage
                imageKey="nitec-feature-product-image"
                defaultSrc={products[1].image_url}
                defaultAlt={products[1].title}
                className="w-36 h-36 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.06)] group-hover:scale-105 transition"
                containerClassName="w-full h-full flex items-center justify-center"
                objectFit="contain"
              />
              <EditableElement
                as="span"
                id="nitec-feature-product-badge"
                field="product2Badge"
                value={products[1].badge || ""}
                type="text"
                className="absolute top-3.5 left-3.5 bg-[#171715] text-[#F4F4EE] text-[8px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full z-20 cursor-text"
              />
            </div>
            <div>
              <EditableElement
                as="h4"
                id="nitec-feature-product-title"
                field="product2Title"
                value={products[1].title}
                type="text"
                className="text-sm font-black text-[#171715] line-clamp-1 block"
              />
              <EditableElement
                as="p"
                id="nitec-feature-product-subtitle"
                field="product2Subtitle"
                value={products[1].subtitle}
                type="text"
                className="text-[10px] text-[#8E8E88] font-semibold line-clamp-1 mb-2 block"
              />
              <div className="flex justify-between items-center pt-2 border-t border-[#E3E3DC]">
                <EditableElement
                  as="span"
                  id="nitec-feature-product-price"
                  field="product2Price"
                  value={products[1].price}
                  type="text"
                  className="text-sm font-black text-indigo-600 inline-block"
                />
                <EditableButton
                  buttonKey="nitec-feature-product-btn"
                  defaultText="View Info"
                  className="text-xs font-black uppercase flex items-center gap-1 cursor-pointer"
                >
                  <span>{templateData.buttonOverrides['nitec-feature-product-btn']?.text || "View Info"}</span>
                  <ArrowRight className="w-3 h-3 text-[#171715]" />
                </EditableButton>
              </div>
            </div>
          </EditableElement>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full max-w-6xl border-t border-[#E3E3DC] py-8 text-center text-[10px] font-black uppercase tracking-widest text-[#8E8E88] mt-12">
        <EditableElement
          as="span"
          id="nitec-footer-copyright"
          field="copyright"
          value={`© 2026 ${brandName} Powered by Portiva.`}
          type="text"
        />
      </footer>
    </EditableElement>
  );
};
