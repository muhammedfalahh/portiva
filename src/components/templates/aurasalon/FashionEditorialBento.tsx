'use client';

import React from 'react';
import { Award, Sparkles, Star, CheckCircle, Feather } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useScrollReveal } from './useScrollReveal';
import type { BentoCard } from './types';

interface FashionEditorialBentoProps {
  bentoTitle: string;
  bentoSubtitle: string;
  bentoCards: BentoCard[];
}

export const FashionEditorialBento: React.FC<FashionEditorialBentoProps> = ({
  bentoTitle,
  bentoSubtitle,
  bentoCards,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const card1 = bentoCards[0] || {
    id: 'bento-1',
    title: 'Vogue India Cover Feature',
    subtitle: 'High Fashion Recognition',
    description: 'Awarded Top 10 Luxury Bridal Artists in South Asia by Vogue Weddings.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop',
    tag: 'Editorial Distinction',
  };

  const card2 = bentoCards[1] || {
    id: 'bento-2',
    title: 'Clean Botanical Skincare',
    subtitle: 'Pure Organic Elixirs',
    description: 'We exclusively use dermatologically tested, cruelty-free luxury skincare.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop',
    tag: 'Skincare Standard',
  };

  const card3 = bentoCards[2] || {
    id: 'bento-3',
    title: 'Destination Luxury Suite',
    subtitle: 'Worldwide Mobility',
    description: 'Fully equipped mobile studio traveling across Italy, Dubai, and Thailand.',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
    tag: 'Global Mobility',
  };

  return (
    <section
      id="editorial"
      ref={ref}
      className={`w-full py-28 bg-theme-background border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent">
            HIGH-FASHION COLLAGE
          </span>
          <EditableElement
            as="h2"
            id="aura-bento-title"
            field="bentoTitle"
            value={bentoTitle}
            type="heading"
            className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
          />
          <EditableElement
            as="p"
            id="aura-bento-sub"
            field="bentoSubtitle"
            value={bentoSubtitle}
            type="text"
            className="font-sans text-sm text-theme-muted"
          />
        </div>

        {/* Asymmetric 5-Tile Bento Grid Blueprint */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Tile 1: Main Hero Editorial Portrait (MD: Col Span 7, Row Span 2) */}
          <div className="md:col-span-7 relative min-h-[420px] rounded-3xl overflow-hidden border border-theme-border/40 shadow-xl group">
            <EditableImage
              imageKey="aura-bento-tile-1"
              defaultSrc={card1.image}
              defaultAlt={card1.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              containerClassName="w-full h-full absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-foreground/90 via-theme-foreground/30 to-transparent" />

            <div className="absolute top-6 left-6 px-3.5 py-1 rounded-full bg-theme-background/80 backdrop-blur-md border border-theme-border/40 text-[10px] font-sans font-bold uppercase tracking-widest text-theme-foreground">
              <EditableElement
                as="span"
                id="aura-bento-1-tag"
                field="tag"
                value={card1.tag}
                type="text"
              />
            </div>

            <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
              <EditableElement
                as="span"
                id="aura-bento-1-sub"
                field="subtitle"
                value={card1.subtitle}
                type="text"
                className="font-sans text-xs font-bold uppercase tracking-widest text-theme-accent block"
              />
              <EditableElement
                as="h3"
                id="aura-bento-1-title"
                field="title"
                value={card1.title}
                type="heading"
                className="font-editorial text-3xl sm:text-4xl font-semibold text-white"
              />
              <EditableElement
                as="p"
                id="aura-bento-1-desc"
                field="description"
                value={card1.description}
                type="text"
                className="font-sans text-sm text-white/80 max-w-lg"
              />
            </div>
          </div>

          {/* Tile 2: Artist Philosophy Quote Card (MD: Col Span 5) */}
          <div className="md:col-span-5 bg-theme-surface border border-theme-border/50 rounded-3xl p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-theme-background border border-theme-border/30 w-fit">
                <Feather className="w-5 h-5 text-theme-accent" />
              </div>
              <p className="font-sans text-xs font-bold uppercase tracking-widest text-theme-accent">
                PHILOSOPHY NOTE
              </p>
              <blockquote className="font-editorial text-2xl font-light italic text-theme-foreground leading-snug">
                “True bridal makeup enhances every facial plane naturally without compromising on definition.”
              </blockquote>
            </div>
            <p className="font-sans text-xs font-semibold text-theme-muted uppercase tracking-wider pt-6 border-t border-theme-border/20">
              — Ananya Sharma
            </p>
          </div>

          {/* Tile 3: Signature Artistry Techniques (MD: Col Span 5) */}
          <div className="md:col-span-5 bg-theme-surface border border-theme-border/50 rounded-3xl p-8 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-theme-accent" />
                <span className="font-sans text-xs font-bold uppercase tracking-widest text-theme-accent">
                  COUTURE TECH SPECS
                </span>
              </div>
              <ul className="space-y-3 font-sans text-xs text-theme-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-theme-accent shrink-0" />
                  <span>24-Hour Ultra-HD Sweat & Tear Resistant Foundation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-theme-accent shrink-0" />
                  <span>Micro-Draping Pleat Pinning for Heavy Lehengas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-theme-accent shrink-0" />
                  <span>Custom Hand-Wired Fresh Floral Hair Sculpting</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tile 4: Detail Artistry Close-up Image (MD: Col Span 4) */}
          <div className="md:col-span-4 relative min-h-[260px] rounded-3xl overflow-hidden border border-theme-border/40 shadow-xs group">
            <EditableImage
              imageKey="aura-bento-tile-2"
              defaultSrc={card2.image}
              defaultAlt={card2.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              containerClassName="w-full h-full absolute inset-0"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-theme-foreground/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <EditableElement
                as="h4"
                id="aura-bento-2-title"
                field="title"
                value={card2.title}
                type="heading"
                className="font-editorial text-2xl font-semibold text-white"
              />
              <EditableElement
                as="p"
                id="aura-bento-2-desc"
                field="description"
                value={card2.description}
                type="text"
                className="font-sans text-xs text-white/80 line-clamp-2"
              />
            </div>
          </div>

          {/* Tile 5: Vogue Accolades Badge (MD: Col Span 3) */}
          <div className="md:col-span-3 bg-theme-primary text-theme-background rounded-3xl p-8 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Award className="w-8 h-8 text-theme-accent" />
              <div className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
              </div>
            </div>
            <div>
              <EditableElement
                as="h4"
                id="aura-bento-3-title"
                field="title"
                value={card3.title}
                type="heading"
                className="font-editorial text-2xl font-semibold text-theme-background mb-1"
              />
              <EditableElement
                as="p"
                id="aura-bento-3-desc"
                field="description"
                value={card3.description}
                type="text"
                className="font-sans text-xs text-theme-background/80"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
