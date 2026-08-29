import React from 'react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { SectionHeading } from './primitives';
import type { BlacklineSectionProps } from './types';

type StorySection = Extract<PremiumTemplateSection, { type: 'story' }>;

const STAT_THEMES = [
  { text: 'text-[#0066FF]', glow: 'hover:border-blue-500/30 hover:shadow-blue-500/10' },
  { text: 'text-[#6366F1]', glow: 'hover:border-indigo-500/30 hover:shadow-indigo-500/10' },
  { text: 'text-[#D97706]', glow: 'hover:border-amber-500/30 hover:shadow-amber-500/10' },
  { text: 'text-[#059669]', glow: 'hover:border-emerald-500/30 hover:shadow-emerald-500/10' },
  { text: 'text-[#E11D48]', glow: 'hover:border-rose-500/30 hover:shadow-rose-500/10' },
];

export function BlacklineWhySection({
  section,
  reducedMotion,
}: BlacklineSectionProps<StorySection>) {
  const styleOverrides = useStyleOverrides();

  const stats = section.stats && section.stats.length > 0
    ? section.stats
    : [
        { id: 'stat-1', label: 'Luxury Cars in Our Fleet', value: '150+' },
        { id: 'stat-2', label: 'Satisfied Clients Worldwide', value: '8000+' },
        { id: 'stat-3', label: 'Successful Corporate Partnerships', value: '200+' },
        { id: 'stat-4', label: 'Providing Premium Services', value: '10+ Years' },
        { id: 'stat-5', label: 'Customer Ratings', value: '4.9' },
      ];

  return (
    <section
      id="bl-home-why"
      className="relative w-full bg-[#F8FAFC] py-16 sm:py-20 lg:py-24"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionHeading
            sectionId={section.id}
            eyebrow={section.eyebrow}
            title={section.title}
            description={section.description}
            size="lg"
            align="center"
          />
        </div>

        {/* 5 Multi-Chroma Metric Cards */}
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, index) => {
            const theme = STAT_THEMES[index % STAT_THEMES.length] || STAT_THEMES[0];
            return (
              <motion.div
                key={stat.id}
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={
                  reducedMotion
                    ? undefined
                    : { type: 'spring', bounce: 0, duration: 0.45, delay: index * 0.07 }
                }
                className={`flex flex-col items-center justify-center rounded-[24px] border border-slate-200/80 bg-white p-5 text-center shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1.5 ${theme.glow} hover:shadow-xl sm:p-6`}
              >
                <EditableElement
                  as="p"
                  id={`${section.id}-${stat.id}-value`}
                  field="value"
                  value={stat.value}
                  className={`font-display text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${theme.text}`}
                />
                <EditableElement
                  as="p"
                  id={`${section.id}-${stat.id}-label`}
                  field="value"
                  value={stat.label}
                  className="mt-2 text-xs font-semibold text-[#64748B] sm:text-[13px]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
