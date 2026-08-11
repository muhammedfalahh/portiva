'use client';

import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { useScrollReveal } from './useScrollReveal';
import type { ProcessStep } from './types';

interface ArtistryProcessProps {
  processTitle: string;
  processSubtitle: string;
  processSteps: ProcessStep[];
}

export const ArtistryProcess: React.FC<ArtistryProcessProps> = ({
  processTitle,
  processSubtitle,
  processSteps,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section
      id="process"
      ref={ref}
      className={`w-full py-28 bg-theme-surface/30 border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent">
            THE ARTISTRY ROADMAP
          </span>
          <EditableElement
            as="h2"
            id="aura-process-title"
            field="processTitle"
            value={processTitle}
            type="heading"
            className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
          />
          <EditableElement
            as="p"
            id="aura-process-sub"
            field="processSubtitle"
            value={processSubtitle}
            type="text"
            className="font-sans text-sm text-theme-muted"
          />
        </div>

        {/* 4-Step Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {processSteps.map((step, idx) => (
            <div
              key={step.stepNumber || idx}
              className="bg-theme-surface border border-theme-border/50 rounded-3xl p-8 hover:border-theme-accent/40 transition-all duration-300 shadow-xs flex flex-col justify-between group relative"
            >
              {/* Connector line for desktop layout */}
              {idx < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-px bg-theme-border/50 z-10" />
              )}

              <div>
                {/* Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-editorial text-4xl font-bold text-theme-accent">
                    {step.stepNumber}
                  </span>
                  {step.duration && (
                    <div className="flex items-center gap-1 text-[11px] font-sans text-theme-muted bg-theme-background px-2.5 py-1 rounded-full border border-theme-border/30">
                      <Clock className="w-3 h-3 text-theme-accent" />
                      <EditableElement
                        as="span"
                        id={`aura-step-${idx}-duration`}
                        field="duration"
                        value={step.duration}
                        type="text"
                      />
                    </div>
                  )}
                </div>

                <EditableElement
                  as="span"
                  id={`aura-step-${idx}-sub`}
                  field="subtitle"
                  value={step.subtitle}
                  type="text"
                  className="font-sans text-xs font-bold uppercase tracking-widest text-theme-accent block mb-1"
                />

                <EditableElement
                  as="h3"
                  id={`aura-step-${idx}-title`}
                  field="title"
                  value={step.title}
                  type="heading"
                  className="font-editorial text-2xl font-semibold text-theme-foreground mb-3"
                />

                <EditableElement
                  as="p"
                  id={`aura-step-${idx}-desc`}
                  field="description"
                  value={step.description}
                  type="text"
                  className="font-sans text-xs text-theme-muted leading-relaxed"
                />
              </div>

              <div className="pt-6 mt-6 border-t border-theme-border/20 flex items-center gap-2 text-xs font-sans text-theme-muted">
                <CheckCircle2 className="w-4 h-4 text-theme-accent shrink-0" />
                <span>Phase {idx + 1} Milestone</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
