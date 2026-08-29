'use client';

import React from 'react';
import {
  TrendingUp,
  FileCheck,
  KeyRound,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

interface TradeInUpgradeProps {
  tradeInTitle?: string;
  tradeInSubtitle?: string;
  tradeInDescription?: string;
  phone: string;
  dealershipName: string;
}

export const TradeInUpgrade: React.FC<TradeInUpgradeProps> = ({
  tradeInTitle = 'Trade In & Elevate Your Drive.',
  tradeInSubtitle = 'Fair-Market Valuation & Seamless Upgrade',
  tradeInDescription = 'Receive a competitive, data-backed valuation for your current automobile within 30 minutes. Apply your equity seamlessly toward any certified showroom inventory.',
  phone,
  dealershipName,
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  const steps = [
    {
      num: '01',
      icon: FileCheck,
      title: 'Submit Vehicle Details',
      desc: 'Send us your vehicle make, model, year, current mileage, and condition photos via our WhatsApp concierge.',
    },
    {
      num: '02',
      icon: TrendingUp,
      title: 'Receive Certified Valuation',
      desc: 'Our senior acquisition appraisers provide a binding fair-market cash or trade offer based on real-time market data.',
    },
    {
      num: '03',
      icon: KeyRound,
      title: 'Roll Equity & Drive Away',
      desc: 'Transfer your equity toward your new vehicle with zero paperwork friction. We handle all title transfers and payoff logistics.',
    },
  ];

  return (
    <section id="trade-in" className="w-full py-24 sm:py-32 bg-theme-surface border-t border-theme-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trade-In Banner Box */}
        <div className="p-8 sm:p-14 lg:p-16 rounded-2xl bg-theme-background/80 border border-theme-border shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Left 5 Columns: Title & CTAs */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-theme-surface border border-theme-border text-theme-foreground uppercase tracking-wider self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-theme-primary" />
                <span>Fast Appraisal Pathway</span>
              </div>

              <EditableElement
                as="h2"
                id="auto-trade-title"
                field="tradeInTitle"
                value={tradeInTitle}
                type="heading"
                className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-foreground tracking-tight leading-tight"
              />

              <EditableElement
                as="p"
                id="auto-trade-desc"
                field="tradeInDescription"
                value={tradeInDescription}
                type="text"
                className="text-base text-theme-muted font-normal leading-relaxed"
              />

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <EditableButton
                  buttonKey="auto-trade-cta"
                  defaultText="Value My Trade-In"
                  defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I would like to get a trade-in appraisal for my current vehicle.`)}`}
                  defaultOpenInNewTab={true}
                  className="px-8 py-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold tracking-wide active:scale-98 transition shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>{activeButtonOverrides['auto-trade-cta']?.text || 'Value My Trade-In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </EditableButton>
              </div>

              <div className="flex items-center gap-2 text-xs font-inter text-theme-muted pt-2">
                <ShieldCheck className="w-4 h-4 text-theme-primary" />
                <span>No Obligation • 7-Day Guaranteed Offer Price</span>
              </div>
            </div>

            {/* Right 7 Columns: 3-Step Process Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.num}
                    className="p-6 rounded-2xl bg-theme-surface border border-theme-border flex flex-col justify-between group hover:border-theme-primary/50 hover:bg-theme-surface-hover transition-all duration-300 shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-black font-manrope text-theme-primary">
                          {step.num}
                        </span>
                        <div className="w-9 h-9 rounded-xl bg-theme-background/80 border border-theme-border flex items-center justify-center text-theme-primary">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      <h3 className="text-base font-bold font-manrope text-theme-foreground tracking-tight mb-2">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-theme-muted font-normal leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-theme-border/60 flex items-center gap-1.5 text-xs font-inter font-medium text-theme-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-theme-primary" />
                      <span>Streamlined</span>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
