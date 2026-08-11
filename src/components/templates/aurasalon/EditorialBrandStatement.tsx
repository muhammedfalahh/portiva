'use client';

import React from 'react';
import { Sparkles, Feather, ShieldCheck, Globe } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useScrollReveal } from './useScrollReveal';
import type { BrandHighlight } from './types';

interface EditorialBrandStatementProps {
  brandStatementHeadline: string;
  brandStatementQuote: string;
  brandStatementAuthor: string;
  brandStatementImage?: string;
  brandHighlights: BrandHighlight[];
}

export const EditorialBrandStatement: React.FC<EditorialBrandStatementProps> = ({
  brandStatementHeadline,
  brandStatementQuote,
  brandStatementAuthor,
  brandStatementImage,
  brandHighlights,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const getIcon = (index: number) => {
    switch (index % 3) {
      case 0:
        return <Feather className="w-5 h-5 text-theme-accent" />;
      case 1:
        return <ShieldCheck className="w-5 h-5 text-theme-accent" />;
      case 2:
        return <Globe className="w-5 h-5 text-theme-accent" />;
      default:
        return <Sparkles className="w-5 h-5 text-theme-accent" />;
    }
  };

  return (
    <section
      ref={ref}
      className={`w-full py-24 bg-theme-surface/30 border-y border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Editorial Whitespace Quote Block */}
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-theme-surface border border-theme-border/40 shadow-xs mb-2">
            <Sparkles className="w-5 h-5 text-theme-accent" />
          </div>

          <EditableElement
            as="h2"
            id="aura-statement-headline"
            field="brandStatementHeadline"
            value={brandStatementHeadline}
            type="heading"
            className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent"
          />

          <EditableElement
            as="p"
            id="aura-statement-quote"
            field="brandStatementQuote"
            value={brandStatementQuote}
            type="heading"
            className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light italic text-theme-foreground leading-snug tracking-tight"
          />

          <div className="flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-theme-accent/60" />
            <EditableElement
              as="p"
              id="aura-statement-author"
              field="brandStatementAuthor"
              value={brandStatementAuthor}
              type="text"
              className="font-sans text-xs font-semibold uppercase tracking-widest text-theme-muted not-italic"
            />
            <span className="w-8 h-px bg-theme-accent/60" />
          </div>

          {/* Editorial Showcase Image Frame */}
          {brandStatementImage && (
            <div className="mt-12 max-w-3xl mx-auto aspect-[21/9] rounded-2xl overflow-hidden shadow-xl border border-theme-border/40">
              <EditableImage
                imageKey="aura-brand-statement-img"
                defaultSrc={brandStatementImage}
                defaultAlt="Brand Statement Showcase"
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>
          )}
        </div>

        {/* Feature Highlights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {brandHighlights.map((highlight, idx) => (
            <div
              key={highlight.id}
              className="bg-theme-surface border border-theme-border/50 rounded-2xl p-8 hover:bg-theme-surface-hover hover:border-theme-accent/40 transition-all duration-300 shadow-xs group"
            >
              <div className="p-3 rounded-xl bg-theme-background border border-theme-border/30 w-fit mb-5 group-hover:scale-110 transition-transform">
                {getIcon(idx)}
              </div>
              <EditableElement
                as="h3"
                id={`aura-highlight-${idx}-title`}
                field="title"
                value={highlight.title}
                type="heading"
                className="font-editorial text-2xl font-semibold text-theme-foreground mb-3"
              />
              <EditableElement
                as="p"
                id={`aura-highlight-${idx}-desc`}
                field="description"
                value={highlight.description}
                type="text"
                className="font-sans text-sm text-theme-muted leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
