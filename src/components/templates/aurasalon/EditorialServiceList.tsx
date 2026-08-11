'use client';

import React, { useState } from 'react';
import { Clock, Check, MessageCircle } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { useScrollReveal } from './useScrollReveal';
import type { ServiceItem } from './types';

interface EditorialServiceListProps {
  servicesTitle: string;
  servicesSubtitle: string;
  services: ServiceItem[];
  phone: string;
}

export const EditorialServiceList: React.FC<EditorialServiceListProps> = ({
  servicesTitle,
  servicesSubtitle,
  services,
  phone,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const cleanPhone = phone ? phone.replace(/\D/g, '') : '';

  const builderCtx = useVisualBuilder();
  const activeButtonOverrides: Record<string, ButtonOverride> = (builderCtx?.templateData?.buttonOverrides as Record<string, ButtonOverride>) || {};

  const categories = ['All', 'Bridal Couture', 'Pre-Wedding & Engagement', 'Editorial & Red Carpet', 'Hair Artistry'];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category.toLowerCase().includes(activeCategory.toLowerCase().slice(0, 5)));

  return (
    <EditableElement
      as="section"
      id="aura-services-section"
      field="servicesSection"
      value="Bespoke Services Section"
      type="container"
      className={`w-full py-28 bg-theme-surface/30 border-b border-theme-border/20 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <EditableElement
              as="span"
              id="aura-services-eyebrow"
              field="servicesEyebrow"
              value="COUTURE OFFERINGS"
              type="text"
              className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent block mb-2"
            />
            <EditableElement
              as="h2"
              id="aura-services-title"
              field="servicesTitle"
              value={servicesTitle}
              type="heading"
              className="font-editorial text-4xl sm:text-5xl font-light text-theme-foreground"
            />
            <EditableElement
              as="p"
              id="aura-services-sub"
              field="servicesSubtitle"
              value={servicesSubtitle}
              type="text"
              className="font-sans text-sm text-theme-muted mt-2"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-sans font-semibold uppercase tracking-wider transition-all ${
                  activeCategory === cat
                    ? 'bg-theme-primary text-theme-background shadow-xs'
                    : 'bg-theme-surface border border-theme-border/40 text-theme-muted hover:text-theme-foreground'
                }`}
              >
                <EditableElement
                  as="span"
                  id={`aura-services-cat-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  field="categoryName"
                  value={cat}
                  type="text"
                  className="inline"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Service Grid */}
        <div className="space-y-12">
          {filteredServices.map((service, idx) => (
            <div
              key={service.id || idx}
              className="bg-theme-surface border border-theme-border/50 rounded-3xl p-6 sm:p-10 hover:border-theme-accent/40 transition-all duration-300 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group"
            >
              {/* Left Column: Media Showcase */}
              <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden border border-theme-border/30">
                <EditableImage
                  imageKey={`aura-service-img-${idx}`}
                  defaultSrc={service.image}
                  defaultAlt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-foreground/60 via-transparent to-transparent opacity-40" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-theme-background/80 backdrop-blur-md border border-theme-border/40 text-[10px] font-sans font-bold uppercase tracking-widest text-theme-foreground z-10">
                  <EditableElement
                    as="span"
                    id={`aura-service-${idx}-number-badge`}
                    field="badgeNumber"
                    value={`0${idx + 1}`}
                    type="text"
                    className="inline"
                  />
                </div>
              </div>

              {/* Right Column: Detailed Editorial Description */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <EditableElement
                      as="span"
                      id={`aura-service-${idx}-category`}
                      field="category"
                      value={service.category}
                      type="text"
                      className="font-sans text-xs font-bold uppercase tracking-widest text-theme-accent block"
                    />
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs font-sans text-theme-muted">
                        <Clock className="w-3.5 h-3.5 text-theme-accent" />
                        <EditableElement
                          as="span"
                          id={`aura-service-${idx}-duration`}
                          field="duration"
                          value={service.duration}
                          type="text"
                        />
                      </div>
                      <EditableElement
                        as="span"
                        id={`aura-service-${idx}-price`}
                        field="price"
                        value={service.price}
                        type="heading"
                        className="font-editorial text-2xl sm:text-3xl font-bold text-theme-foreground"
                      />
                    </div>
                  </div>

                  <EditableElement
                    as="h3"
                    id={`aura-service-${idx}-name`}
                    field="name"
                    value={service.name}
                    type="heading"
                    className="font-editorial text-3xl font-semibold text-theme-foreground mb-2"
                  />

                  <EditableElement
                    as="p"
                    id={`aura-service-${idx}-tagline`}
                    field="tagline"
                    value={service.tagline}
                    type="text"
                    className="font-sans text-sm text-theme-accent italic mb-3"
                  />

                  <EditableElement
                    as="p"
                    id={`aura-service-${idx}-desc`}
                    field="description"
                    value={service.description}
                    type="text"
                    className="font-sans text-sm text-theme-muted leading-relaxed mb-6"
                  />

                  {/* Feature Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-theme-border/20">
                    {service.features.map((feat, fi) => (
                      <div key={fi} className="flex items-center gap-2.5 text-xs font-sans text-theme-foreground/90">
                        <Check className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                        <EditableElement
                          as="span"
                          id={`aura-service-${idx}-feat-${fi}`}
                          field={`feature_${fi}`}
                          value={feat}
                          type="text"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Inquiry CTA */}
                <div className="pt-2">
                  <EditableButton
                    buttonKey={`aura-service-${idx}-cta`}
                    defaultText="Inquire for Service"
                    defaultHref={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Hi Ananya, I would like to inquire about the service "${service.name}" (${service.price}).`
                    )}`}
                    defaultOpenInNewTab={true}
                    className="inline-flex items-center gap-2 border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-theme-background px-6 py-2.5 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{activeButtonOverrides[`aura-service-${idx}-cta`]?.text || 'Inquire for Service'}</span>
                  </EditableButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </EditableElement>
  );
};
