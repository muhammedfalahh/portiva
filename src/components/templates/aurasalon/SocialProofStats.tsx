'use client';

import React from 'react';
import { EditableElement } from '@/components/engine/EditableElement';
import { useScrollReveal } from './useScrollReveal';
import type { StatItem } from './types';

interface SocialProofStatsProps {
  statsTitle?: string;
  statsSubtitle?: string;
  stats: StatItem[];
}

export const SocialProofStats: React.FC<SocialProofStatsProps> = ({
  statsTitle,
  statsSubtitle,
  stats,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="stats"
      ref={ref}
      className={`w-full py-20 bg-theme-background border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {(statsTitle || statsSubtitle) && (
          <div className="text-center space-y-3 mb-12 max-w-2xl mx-auto">
            {statsTitle && (
              <EditableElement
                as="h2"
                id="aura-stats-title"
                field="statsTitle"
                value={statsTitle}
                type="heading"
                className="font-editorial text-3xl sm:text-4xl font-light text-theme-foreground"
              />
            )}
            {statsSubtitle && (
              <EditableElement
                as="p"
                id="aura-stats-subtitle"
                field="statsSubtitle"
                value={statsSubtitle}
                type="text"
                className="font-sans text-xs uppercase tracking-widest text-theme-muted"
              />
            )}
          </div>
        )}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-theme-border/30">
          {stats.map((stat, idx) => (
            <div key={stat.id || idx} className="pt-6 sm:pt-0 sm:px-6 text-center space-y-2 first:pt-0">
              <EditableElement
                as="h3"
                id={`aura-stat-${idx}-num`}
                field="number"
                value={stat.number}
                type="heading"
                className="font-editorial text-5xl sm:text-6xl font-bold text-theme-foreground tracking-tight"
              />
              <EditableElement
                as="p"
                id={`aura-stat-${idx}-label`}
                field="label"
                value={stat.label}
                type="text"
                className="font-sans text-xs font-bold uppercase tracking-widest text-theme-accent"
              />
              <EditableElement
                as="p"
                id={`aura-stat-${idx}-subtext`}
                field="subtext"
                value={stat.subtext}
                type="text"
                className="font-sans text-xs text-theme-muted"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
