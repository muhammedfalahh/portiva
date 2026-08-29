'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Car,
  Search,
  Banknote,
  Sparkles,
  Shield,
  Truck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { ServiceItem, DEFAULT_SERVICES } from './types';

interface DealershipServicesProps {
  servicesTitle?: string;
  servicesSubtitle?: string;
  services?: ServiceItem[];
  phone: string;
  dealershipName: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  car: Car,
  search: Search,
  banknote: Banknote,
  sparkles: Sparkles,
  shield: Shield,
  truck: Truck,
};

export const DealershipServices: React.FC<DealershipServicesProps> = ({
  servicesTitle = 'Comprehensive Automotive Services',
  servicesSubtitle = 'Dealership Capabilities & Client Care',
  services = DEFAULT_SERVICES,
  phone,
  dealershipName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};
  const isEditMode = builderCtx?.mode === 'EDITING';

  const serviceList = services && services.length > 0 ? services : DEFAULT_SERVICES;

  // Responsive items-per-view calculator
  useEffect(() => {
    const updateItemsPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, serviceList.length - itemsPerView);

  // Keep index within bounds on resize
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  }, [maxIndex]);

  return (
    <section id="services" className="w-full py-24 sm:py-32 bg-theme-background border-t border-theme-border relative overflow-hidden font-inter">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Carousel Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-theme-primary" />
              <EditableElement
                as="span"
                id="auto-services-subtitle"
                field="servicesSubtitle"
                value={servicesSubtitle}
                type="text"
                className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
              />
            </div>

            <EditableElement
              as="h2"
              id="auto-services-title"
              field="servicesTitle"
              value={servicesTitle}
              type="heading"
              className="font-manrope text-3xl sm:text-5xl font-bold text-theme-foreground tracking-tight leading-tight"
            />
          </div>

          {/* Header Action & Carousel Controls */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 self-start lg:self-end">
            <EditableButton
              buttonKey="auto-services-header-cta"
              defaultText="Inquire on Services"
              defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I would like to inquire about your dealership services.`)}`}
              defaultOpenInNewTab={true}
              className="px-6 py-3 rounded-xl bg-theme-surface border border-theme-border text-theme-foreground text-xs font-semibold hover:bg-theme-surface-hover transition cursor-pointer"
            >
              <span>
                {activeButtonOverrides['auto-services-header-cta']?.text || 'Inquire on Services'}
              </span>
            </EditableButton>

            {/* Prev / Next Carousel Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Service Slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-hover active:scale-95 text-theme-foreground flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-theme-muted" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Service Slide"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-surface-hover active:scale-95 text-theme-foreground flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-theme-muted" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden py-2 -my-2">
          <motion.div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {serviceList.map((service, idx) => {
              const Icon = iconMap[service.iconName] || Car;

              return (
                <div
                  key={service.id}
                  className="px-2.5 sm:px-3 shrink-0"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="h-full p-6 sm:p-8 rounded-2xl bg-theme-surface border border-theme-border hover:border-theme-primary/50 hover:bg-theme-surface-hover transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl relative overflow-hidden font-inter">
                    
                    <div>
                      {/* Service Icon & Badge */}
                      <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                        <div className="w-12 h-12 rounded-xl bg-theme-background/80 border border-theme-border flex items-center justify-center text-theme-primary group-hover:scale-105 transition-all duration-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-theme-background/80 text-theme-muted border border-theme-border tracking-wide">
                          {service.tag}
                        </span>
                      </div>

                      {/* Service Title */}
                      <EditableElement
                        as="h3"
                        id={`auto-srv-title-${idx}`}
                        field={`serviceTitle_${idx}`}
                        value={service.title}
                        type="heading"
                        className="font-manrope text-lg sm:text-xl font-bold text-theme-foreground tracking-tight mb-3 group-hover:text-theme-foreground transition-colors"
                      />

                      {/* Service Description */}
                      <EditableElement
                        as="p"
                        id={`auto-srv-desc-${idx}`}
                        field={`serviceDesc_${idx}`}
                        value={service.description}
                        type="text"
                        className="text-xs sm:text-sm text-theme-muted leading-relaxed font-normal mb-6"
                      />

                      {/* Feature Checklist */}
                      <div className="space-y-2.5 pt-4 border-t border-theme-border/60 mb-6">
                        {service.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2.5 text-xs text-theme-foreground font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-theme-primary shrink-0" />
                            <span className="line-clamp-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Pathway */}
                    <div className="pt-4 border-t border-theme-border/60 flex items-center justify-between relative z-10">
                      <a
                        href={isEditMode ? undefined : `https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I am interested in your ${service.title} service.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (isEditMode) e.preventDefault();
                        }}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-theme-primary hover:text-theme-primary-hover transition-colors cursor-pointer group/link"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Schedule Service</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>

                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Carousel Pagination Progress Dots */}
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentIndex(dotIdx)}
              aria-label={`Jump to slide ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === dotIdx
                  ? 'w-7 bg-theme-primary'
                  : 'w-2 bg-theme-border hover:bg-theme-muted/50'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

