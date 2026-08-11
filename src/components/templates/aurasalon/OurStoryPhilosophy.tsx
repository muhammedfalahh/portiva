'use client';

import React from 'react';
import { Award } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useScrollReveal } from './useScrollReveal';
import type { PhilosophyPillar } from './types';

interface OurStoryPhilosophyProps {
  storyTitle: string;
  storySubtitle: string;
  storyBioText1: string;
  storyBioText2: string;
  artistPortraitImage: string;
  yearsExperience: string;
  philosophyPillars: PhilosophyPillar[];
  artistName: string;
}

export const OurStoryPhilosophy: React.FC<OurStoryPhilosophyProps> = ({
  storyTitle,
  storySubtitle,
  storyBioText1,
  storyBioText2,
  artistPortraitImage,
  yearsExperience,
  philosophyPillars,
  artistName,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <EditableElement
      as="section"
      id="aura-story-section"
      field="storySection"
      value="Our Story & Philosophy Section"
      type="container"
      className={`w-full py-28 bg-theme-background border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Magazine-Style Overlapping Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-theme-border/40 group">
              <EditableImage
                imageKey="aura-story-portrait"
                defaultSrc={artistPortraitImage}
                defaultAlt={`${artistName} portrait`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                containerClassName="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-theme-foreground/70 via-transparent to-transparent opacity-40" />
            </div>

            {/* Overlapping Floating Badge */}
            <div className="absolute -bottom-6 -right-4 sm:bottom-8 sm:-right-8 bg-theme-surface border border-theme-border/60 p-6 rounded-2xl shadow-xl max-w-xs backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-theme-accent/15 text-theme-accent">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <EditableElement
                    as="p"
                    id="aura-story-experience"
                    field="yearsExperience"
                    value={yearsExperience}
                    type="text"
                    className="font-editorial text-2xl font-bold text-theme-foreground"
                  />
                  <EditableElement
                    as="p"
                    id="aura-story-experience-label"
                    field="experienceLabel"
                    value="Mastery & Expertise"
                    type="text"
                    className="font-sans text-xs text-theme-muted uppercase tracking-wider"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Biography & Philosophy Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="space-y-3">
              <EditableElement
                as="span"
                id="aura-story-eyebrow"
                field="storyEyebrow"
                value="BEHIND THE CRAFT"
                type="text"
                className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent block"
              />
              <EditableElement
                as="h2"
                id="aura-story-title"
                field="storyTitle"
                value={storyTitle}
                type="heading"
                className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light text-theme-foreground leading-tight"
              />
              <EditableElement
                as="p"
                id="aura-story-subtitle"
                field="storySubtitle"
                value={storySubtitle}
                type="text"
                className="font-sans text-sm md:text-base text-theme-accent italic"
              />
            </div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 font-sans text-sm md:text-base text-theme-muted leading-relaxed">
              <EditableElement
                as="p"
                id="aura-story-bio-1"
                field="storyBioText1"
                value={storyBioText1}
                type="text"
              />
              <EditableElement
                as="p"
                id="aura-story-bio-2"
                field="storyBioText2"
                value={storyBioText2}
                type="text"
              />
            </div>

            {/* Philosophy Pillars List */}
            <div className="pt-6 border-t border-theme-border/30 space-y-6">
              <EditableElement
                as="h3"
                id="aura-story-pillars-heading"
                field="pillarsHeading"
                value="THREE PILLARS OF OUR ARTISTRY"
                type="heading"
                className="font-sans text-xs font-bold uppercase tracking-widest text-theme-foreground"
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {philosophyPillars.map((pillar, idx) => (
                  <div
                    key={pillar.id}
                    className="p-5 rounded-2xl bg-theme-surface/50 border border-theme-border/40 hover:border-theme-accent/40 transition-colors"
                  >
                    <EditableElement
                      as="span"
                      id={`aura-pillar-${idx}-number`}
                      field="number"
                      value={pillar.number}
                      type="text"
                      className="font-editorial text-xl font-bold text-theme-accent block mb-1"
                    />
                    <EditableElement
                      as="h4"
                      id={`aura-pillar-${idx}-title`}
                      field="title"
                      value={pillar.title}
                      type="heading"
                      className="font-editorial text-lg font-semibold text-theme-foreground mb-2"
                    />
                    <EditableElement
                      as="p"
                      id={`aura-pillar-${idx}-desc`}
                      field="description"
                      value={pillar.description}
                      type="text"
                      className="font-sans text-xs text-theme-muted leading-relaxed"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableElement>
  );
};
