'use client';

import React from 'react';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Truck,
  HeartHandshake,
  DollarSign,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';

interface WhyChooseUsProps {
  whyTitle?: string;
  whySubtitle?: string;
  whyDescription?: string;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  whyTitle = 'The Standard of Dealership Integrity.',
  whySubtitle = 'Why Clients Trust Our Showroom',
  whyDescription = 'We operate with complete financial and mechanical transparency. Every vehicle in our fleet is hand-selected, verified, and backed by verifiable documentation.',
}) => {
  const pillars = [
    {
      id: '01',
      badge: 'Mechanical Integrity',
      title: '150-Point Pre-Purchase Diagnostic',
      desc: 'Our certified master technicians inspect chassis alignment, electronic control modules, transmission hydraulics, and paint depth to ensure zero undisclosed defects.',
      stat: '100%',
      statLabel: 'Inspected Fleet',
      icon: ShieldCheck,
    },
    {
      id: '02',
      badge: 'Financial Transparency',
      title: 'Fixed Pricing, Zero Hidden Fees',
      desc: 'No sudden dealer doc markups, mandatory accessory fees, or deceptive dealer prep charges. What you see is the absolute handover price.',
      stat: '$0',
      statLabel: 'Hidden Markups',
      icon: DollarSign,
    },
    {
      id: '03',
      badge: 'Seamless Exchange',
      title: 'Instant Trade-In Valuation & Equity Rollover',
      desc: 'Get a binding market-value appraisal for your current car in minutes. Roll your equity directly into any showroom model with simplified paperwork.',
      stat: '< 30m',
      statLabel: 'Appraisal Time',
      icon: TrendingUp,
    },
    {
      id: '04',
      badge: 'Lifetime Stewardship',
      title: 'Enclosed Handover & Ongoing Care',
      desc: 'White-glove doorstep delivery anywhere across the country in climate-controlled transport, supported by direct VIP concierge for future servicing.',
      stat: '5★',
      statLabel: 'Client Rating',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="why-us" className="w-full py-24 sm:py-32 bg-theme-background border-t border-theme-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-theme-primary" />
            <EditableElement
              as="span"
              id="auto-why-subtitle"
              field="whySubtitle"
              value={whySubtitle}
              type="text"
              className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
            />
          </div>

          <EditableElement
            as="h2"
            id="auto-why-title"
            field="whyTitle"
            value={whyTitle}
            type="heading"
            className="font-manrope text-3xl sm:text-5xl font-bold text-theme-foreground tracking-tight leading-tight mb-4"
          />

          <EditableElement
            as="p"
            id="auto-why-desc"
            field="whyDescription"
            value={whyDescription}
            type="text"
            className="text-base text-theme-muted font-normal leading-relaxed"
          />
        </div>

        {/* Asymmetrical 2x2 Bento Pillar Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 font-inter">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="p-8 sm:p-10 rounded-2xl bg-theme-background/80 border border-theme-border hover:border-theme-primary/50 hover:bg-theme-background transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-theme-surface border border-theme-border text-theme-foreground">
                      {item.badge}
                    </span>
                    <span className="text-xs text-theme-muted font-medium">
                      Pillar {item.id}
                    </span>
                  </div>

                  <EditableElement
                    as="h3"
                    id={`auto-why-item-title-${idx}`}
                    field={`whyItemTitle_${idx}`}
                    value={item.title}
                    type="heading"
                    className="font-manrope text-xl sm:text-2xl font-bold text-theme-foreground tracking-tight mb-3 transition-colors"
                  />

                  <EditableElement
                    as="p"
                    id={`auto-why-item-desc-${idx}`}
                    field={`whyItemDesc_${idx}`}
                    value={item.desc}
                    type="text"
                    className="text-sm text-theme-muted leading-relaxed font-normal mb-8"
                  />
                </div>

                <div className="pt-6 border-t border-theme-border flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-theme-foreground font-medium">
                    <Icon className="w-4 h-4 text-theme-primary" />
                    <span>Verified Commitment</span>
                  </div>

                  <div className="text-right">
                    <span className="text-lg sm:text-xl font-bold font-manrope text-theme-foreground block leading-none">
                      {item.stat}
                    </span>
                    <span className="text-xs text-theme-muted uppercase mt-0.5 block">
                      {item.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
