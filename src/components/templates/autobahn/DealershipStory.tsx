'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { StoryTab, STORY_CHAPTERS } from './types';

interface DealershipStoryProps {
  storyWatermark?: string;
  storyCategoryTag?: string;
  quoteDirective?: string;
  specTag?: string;
  ctaBoxTitle?: string;
  ctaBoxSub?: string;
  phone: string;
  dealershipName: string;
}

export const DealershipStory: React.FC<DealershipStoryProps> = ({
  storyWatermark = 'YOUR DREAM RIDE',
  storyCategoryTag = 'Showroom Philosophy & Heritage',
  quoteDirective = 'Diagnostic Directive',
  specTag = 'Specification & Discipline',
  ctaBoxTitle = 'Experience The Showroom Atelier',
  ctaBoxSub = 'Connect with our senior vehicle curators to arrange a private consultation, view off-market allocations, or initiate a custom factory order.',
  phone,
  dealershipName,
}) => {
  const [activeTab, setActiveTab] = useState<StoryTab>('atelier');

  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  const activeChapter = STORY_CHAPTERS[activeTab];

  return (
    <section id="story" className="w-full relative py-28 sm:py-36 bg-theme-background border-t border-theme-border overflow-hidden text-theme-foreground font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Metadata Header & Location Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 mb-12 border-b border-theme-border text-xs font-inter font-semibold text-theme-muted uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-theme-primary" />
            <EditableElement
              as="span"
              id="auto-story-meta-tag"
              field="metaTag"
              value={activeChapter.tag}
              type="text"
              className="inline text-theme-foreground"
            />
          </div>
          <EditableElement
            as="span"
            id="auto-story-meta-location"
            field="metaLocation"
            value={activeChapter.location}
            type="text"
            className="inline text-theme-muted"
          />
        </div>

        {/* Editorial Title & Lead Narrative */}
        <div className="max-w-4xl mb-14">
          <EditableElement
            as="span"
            id="auto-story-category-tag"
            field="storyCategoryTag"
            value={storyCategoryTag}
            type="text"
            className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase block mb-4"
          />
          <EditableElement
            as="h2"
            id="auto-story-main-heading"
            field="title"
            value="Crafted Beyond Velocity."
            type="heading"
            className="font-manrope text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-theme-foreground leading-[1.05]"
          />
          <EditableElement
            as="p"
            id="auto-story-lead-para"
            field="subtitle"
            value="We do not merely acquire automobiles. We curate rare engineering artifacts and steward lifelong relationships for discerning collectors worldwide."
            type="text"
            className="text-theme-muted text-lg sm:text-xl font-normal leading-relaxed mt-6 max-w-3xl"
          />
        </div>

        {/* Interactive Chapter Selector */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 mb-16 scrollbar-none border-b border-theme-border font-inter">
          {(['atelier', 'heritage', 'stewardship'] as StoryTab[]).map((tabKey) => {
            const ch = STORY_CHAPTERS[tabKey];
            const isActive = activeTab === tabKey;
            return (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`px-5 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  isActive
                    ? 'bg-theme-primary text-theme-primary-text shadow-md scale-[1.02]'
                    : 'bg-theme-surface text-theme-muted hover:text-theme-foreground border border-theme-border'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-theme-primary-text' : 'bg-theme-muted/40'
                  }`}
                />
                <EditableElement
                  as="span"
                  id={`auto-story-tab-${tabKey}`}
                  field={`storyTab_${tabKey}`}
                  value={ch.tabLabel}
                  type="text"
                  className="inline"
                />
              </button>
            );
          })}
        </div>

        {/* Asymmetrical 12-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 font-inter">
          
          {/* Left 7 Columns: Hero Image Stage with Translucent Floating Quote */}
          <div className="lg:col-span-7 flex flex-col gap-8 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-theme-border bg-theme-surface shadow-2xl">
              <EditableImage
                imageKey={`auto-story-${activeChapter.id}-hero`}
                defaultSrc={activeChapter.heroImage}
                defaultAlt={activeChapter.heroAlt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                containerClassName="w-full h-full absolute inset-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-background/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-6 left-6 px-3.5 py-1.5 rounded-full bg-theme-background/85 backdrop-blur-md border border-theme-border text-xs font-semibold text-theme-foreground tracking-wide">
                {activeChapter.tag}
              </div>
            </div>

            {/* Floating Editorial Quote Card */}
            <div className="relative lg:-mt-24 lg:ml-8 z-20 bg-theme-surface/95 backdrop-blur-xl border border-theme-border p-7 sm:p-9 rounded-2xl shadow-2xl transition-all duration-500 text-theme-foreground">
              <div className="flex items-center gap-2 text-theme-primary font-inter text-xs font-semibold tracking-wider uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <EditableElement
                  as="span"
                  id="auto-story-quote-directive"
                  field="quoteDirective"
                  value={quoteDirective}
                  type="text"
                  className="inline text-theme-primary"
                />
              </div>
              <blockquote className="text-base sm:text-lg font-normal text-theme-foreground leading-relaxed italic mb-4">
                <EditableElement
                  as="span"
                  id={`auto-story-${activeChapter.id}-quote`}
                  field="quote"
                  value={activeChapter.quote}
                  type="text"
                  className="inline text-theme-foreground"
                />
              </blockquote>
              <div className="text-xs font-inter text-theme-muted">
                <EditableElement
                  as="span"
                  id={`auto-story-${activeChapter.id}-author`}
                  field="author"
                  value={activeChapter.author}
                  type="text"
                  className="inline text-theme-muted"
                />
              </div>
            </div>

          </div>

          {/* Right 5 Columns: Narrative Copy & Micro-Detail Checklist */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2 font-inter">
            <div>
              <EditableElement
                as="span"
                id="auto-story-spec-tag"
                field="specTag"
                value={specTag}
                type="text"
                className="text-theme-muted font-inter text-xs font-semibold tracking-wider block uppercase mb-3"
              />

              <EditableElement
                as="h3"
                id={`auto-story-${activeChapter.id}-heading`}
                field="chapterHeading"
                value={activeChapter.heading}
                type="heading"
                className="font-manrope text-2xl sm:text-3xl font-bold text-theme-foreground tracking-tight leading-snug mb-6"
              />

              <div className="space-y-5 text-theme-muted text-sm sm:text-base font-normal leading-relaxed mb-10">
                <EditableElement
                  as="p"
                  id={`auto-story-${activeChapter.id}-p1`}
                  field="paragraph1"
                  value={activeChapter.p1}
                  type="text"
                  className="block text-theme-muted"
                />
                <EditableElement
                  as="p"
                  id={`auto-story-${activeChapter.id}-p2`}
                  field="paragraph2"
                  value={activeChapter.p2}
                  type="text"
                  className="block text-theme-muted"
                />
              </div>

              {/* 3 Detail Indicators */}
              <div className="border-t border-theme-border pt-6 space-y-6 mb-10">
                {activeChapter.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-4 group/item">
                    <div className="w-8 h-8 rounded-xl bg-theme-surface border border-theme-border flex items-center justify-center text-theme-foreground shrink-0 group-hover/item:border-theme-primary transition-all">
                      <CheckCircle2 className="w-4 h-4 text-theme-primary" />
                    </div>
                    <div>
                      <EditableElement
                        as="h4"
                        id={`auto-story-${activeChapter.id}-detail-label-${idx}`}
                        field={`detailLabel_${idx}`}
                        value={detail.label}
                        type="heading"
                        className="font-manrope text-sm font-bold text-theme-foreground tracking-tight mb-0.5"
                      />
                      <EditableElement
                        as="p"
                        id={`auto-story-${activeChapter.id}-detail-desc-${idx}`}
                        field={`detailDesc_${idx}`}
                        value={detail.desc}
                        type="text"
                        className="text-xs text-theme-muted font-normal leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary Dual Offset Gallery */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-theme-border">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-theme-border bg-theme-surface group/sub">
                <EditableImage
                  imageKey={`auto-story-${activeChapter.id}-sec1`}
                  defaultSrc={activeChapter.secondaryImg1}
                  defaultAlt="Inspection Atelier Detail"
                  className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full absolute inset-0"
                />
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-theme-border bg-theme-surface group/sub">
                <EditableImage
                  imageKey={`auto-story-${activeChapter.id}-sec2`}
                  defaultSrc={activeChapter.secondaryImg2}
                  defaultAlt="Telemetry Diagnostics Detail"
                  className="w-full h-full object-cover group-hover/sub:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full absolute inset-0"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Section Call to Action Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl bg-theme-surface border border-theme-border font-inter">
          <div className="max-w-xl">
            <EditableElement
              as="h4"
              id="auto-story-cta-box-title"
              field="ctaBoxTitle"
              value={ctaBoxTitle}
              type="heading"
              className="font-manrope text-xl sm:text-2xl font-bold text-theme-foreground tracking-tight mb-2"
            />
            <EditableElement
              as="p"
              id="auto-story-cta-box-sub"
              field="ctaBoxSub"
              value={ctaBoxSub}
              type="text"
              className="text-xs sm:text-sm text-theme-muted font-normal leading-relaxed"
            />
          </div>

          <EditableButton
            buttonKey="auto-story-cta"
            defaultText="Schedule Private Atelier Visit"
            defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I would like to schedule a private showroom and atelier visit.`)}`}
            defaultOpenInNewTab={true}
            className="px-7 py-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold tracking-wide active:scale-98 transition shadow-lg shrink-0 flex items-center gap-3 group cursor-pointer"
          >
            <span>
              {activeButtonOverrides['auto-story-cta']?.text || 'Schedule Private Atelier Visit'}
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </EditableButton>
        </div>

      </div>
    </section>
  );
};
