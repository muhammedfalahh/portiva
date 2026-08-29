import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import type { PremiumTemplateCard, PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { SectionHeading, makeInternalNavigator } from './primitives';
import type { BlacklineSectionProps } from './types';

type CardsSection = Extract<PremiumTemplateSection, { type: 'cards' }>;

interface BrandBentoCardProps {
  sectionId: string;
  item: PremiumTemplateCard;
  index: number;
  definition: BlacklineSectionProps<CardsSection>['definition'];
  handle?: string;
  templateId?: string;
  mode: BlacklineSectionProps<CardsSection>['mode'];
  onNavigate?: BlacklineSectionProps<CardsSection>['onNavigate'];
}

const BRAND_BADGE_COLORS: Record<number, { pill: string; glow: string }> = {
  0: { pill: 'bg-amber-50 text-[#D97706] ring-amber-500/20', glow: 'group-hover:border-amber-500/30' },
  1: { pill: 'bg-rose-50 text-[#E11D48] ring-rose-500/20', glow: 'group-hover:border-rose-500/30' },
  2: { pill: 'bg-orange-50 text-[#EA580C] ring-orange-500/20', glow: 'group-hover:border-orange-500/30' },
  3: { pill: 'bg-blue-50 text-[#0066FF] ring-blue-500/20', glow: 'group-hover:border-blue-500/30' },
  4: { pill: 'bg-emerald-50 text-[#059669] ring-emerald-500/20', glow: 'group-hover:border-emerald-500/30' },
};

function BrandBentoCard({
  sectionId,
  item,
  index,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
}: BrandBentoCardProps) {
  const handleInternalNavigation = makeInternalNavigator(mode, onNavigate);
  const isImageTop = index % 2 === 0;
  const brandStyle = BRAND_BADGE_COLORS[index % 5] || BRAND_BADGE_COLORS[0];

  const imageBlock = (
    <div className="relative overflow-hidden rounded-[20px] bg-slate-100/80 shadow-inner transition-transform duration-500 group-hover:scale-[1.02]">
      {item.image ? (
        <EditableImage
          imageKey={item.image.key}
          defaultSrc={item.image.src}
          defaultAlt={item.image.alt}
          containerClassName="w-full"
          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="aspect-[4/3] w-full bg-slate-100" aria-hidden="true" />
      )}
    </div>
  );

  const textBlock = (
    <div className={`flex flex-col justify-between rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.03)] transition-all duration-200 ${brandStyle.glow} group-hover:shadow-[0_8px_24px_rgba(0,102,255,0.08)] sm:p-5`}>
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ${brandStyle.pill}`}>
            {item.eyebrow || 'Supercar'}
          </span>
        </div>
        <EditableElement
          as="h3"
          id={`${sectionId}-${item.id}-title`}
          field="value"
          value={item.title}
          className="font-display text-base font-bold tracking-tight text-[#0F172A]"
        />
        <EditableElement
          as="p"
          id={`${sectionId}-${item.id}-description`}
          field="value"
          value={item.description}
          className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-[#64748B]"
        />
      </div>
      <div className="mt-3.5 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span className="text-[11px] font-bold text-[#0066FF] group-hover:underline">
          Explore Model
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-[#0066FF] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </div>
  );

  return (
    <a
      href={buildHref({ targetPageId: 'store' }, definition, handle, templateId)}
      onClick={(event) => handleInternalNavigation(event, 'store')}
      className="group flex flex-col gap-3 rounded-[24px] p-1 transition-all duration-300 ease-out hover:-translate-y-1.5"
    >
      {isImageTop ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </a>
  );
}

export function BlacklineFeaturedSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: BlacklineSectionProps<CardsSection>) {
  const styleOverrides = useStyleOverrides();

  return (
    <section
      id="bl-home-featured"
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

        {/* 5-Column Asymmetric Alternating Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {section.items.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.id}
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={
                reducedMotion
                  ? undefined
                  : { type: 'spring', bounce: 0, duration: 0.44, delay: index * 0.06 }
              }
            >
              <BrandBentoCard
                sectionId={section.id}
                item={item}
                index={index}
                definition={definition}
                handle={handle}
                templateId={templateId}
                mode={mode}
                onNavigate={onNavigate}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
