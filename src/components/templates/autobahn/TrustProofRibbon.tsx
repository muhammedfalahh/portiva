'use client';

import React from 'react';
import { ShieldCheck, FileCheck2, Truck, Sparkles, CheckCircle2 } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';

interface TrustProofRibbonProps {
  trust1Tag?: string;
  trust1Title?: string;
  trust1Desc?: string;
  trust2Tag?: string;
  trust2Title?: string;
  trust2Desc?: string;
  trust3Tag?: string;
  trust3Title?: string;
  trust3Desc?: string;
  trust4Tag?: string;
  trust4Title?: string;
  trust4Desc?: string;
}

export const TrustProofRibbon: React.FC<TrustProofRibbonProps> = ({
  trust1Tag = 'Certification',
  trust1Title = '150-Point Diagnostic Audit',
  trust1Desc = 'Laser chassis alignment, acoustic engine telemetry, and micron paint thickness verified before showroom entry.',
  trust2Tag = 'Provenance',
  trust2Title = '100% Verified Provenance',
  trust2Desc = 'Clean title guarantees, full factory maintenance documentation, and zero structural damage guarantee on every vehicle.',
  trust3Tag = 'Logistics',
  trust3Title = 'White-Glove Enclosed Delivery',
  trust3Desc = 'Climate-controlled enclosed logistics straight to your driveway, office, or track garage across the continent.',
  trust4Tag = 'Warranty',
  trust4Title = 'Comprehensive Vehicle Protection',
  trust4Desc = 'Custom extended powertrain warranties, 24/7 roadside assistance, and seamless trade-in buyback pathways.',
}) => {
  const trustCards = [
    {
      id: '1',
      icon: ShieldCheck,
      tagField: 'trust1Tag',
      titleField: 'trust1Title',
      descField: 'trust1Desc',
      tag: trust1Tag,
      title: trust1Title,
      desc: trust1Desc,
    },
    {
      id: '2',
      icon: FileCheck2,
      tagField: 'trust2Tag',
      titleField: 'trust2Title',
      descField: 'trust2Desc',
      tag: trust2Tag,
      title: trust2Title,
      desc: trust2Desc,
    },
    {
      id: '3',
      icon: Truck,
      tagField: 'trust3Tag',
      titleField: 'trust3Title',
      descField: 'trust3Desc',
      tag: trust3Tag,
      title: trust3Title,
      desc: trust3Desc,
    },
    {
      id: '4',
      icon: Sparkles,
      tagField: 'trust4Tag',
      titleField: 'trust4Title',
      descField: 'trust4Desc',
      tag: trust4Tag,
      title: trust4Title,
      desc: trust4Desc,
    },
  ];

  return (
    <section className="w-full bg-theme-surface border-y border-theme-border py-12 sm:py-16 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-6 sm:p-7 rounded-2xl bg-theme-background/80 border border-theme-border hover:border-theme-primary/50 hover:bg-theme-background transition-all duration-300 flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <EditableElement
                      as="span"
                      id={`auto-trust-${card.id}-tag`}
                      field={card.tagField}
                      value={card.tag}
                      type="text"
                      className="text-theme-muted font-inter text-xs font-semibold uppercase tracking-wider block"
                    />
                    <div className="w-8 h-8 rounded-lg bg-theme-surface border border-theme-border flex items-center justify-center text-theme-primary group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <EditableElement
                    as="h3"
                    id={`auto-trust-${card.id}-title`}
                    field={card.titleField}
                    value={card.title}
                    type="heading"
                    className="font-manrope text-base sm:text-lg font-bold text-theme-foreground tracking-tight mb-2 group-hover:text-theme-foreground transition-colors"
                  />

                  <EditableElement
                    as="p"
                    id={`auto-trust-${card.id}-desc`}
                    field={card.descField}
                    value={card.desc}
                    type="text"
                    className="text-xs sm:text-sm text-theme-muted leading-relaxed font-normal"
                  />
                </div>

                <div className="mt-5 pt-3 border-t border-theme-border/60 flex items-center gap-1.5 text-xs font-inter font-medium text-theme-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-theme-primary" />
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
