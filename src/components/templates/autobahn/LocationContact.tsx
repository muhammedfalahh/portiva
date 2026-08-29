'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Mail,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';

interface LocationContactProps {
  conciergeTag?: string;
  conciergeTitle?: string;
  conciergeSub?: string;
  location: string;
  phone: string;
  email?: string;
  contactAddress?: string;
  contactHours?: string;
  dealershipName: string;
}

export const LocationContact: React.FC<LocationContactProps> = ({
  conciergeTag = 'Private Concierge & Visit Scheduling',
  conciergeTitle = 'Connect with Our Senior Acquisition Team.',
  conciergeSub = 'Arrange a private showroom viewing, request a comprehensive vehicle inspection report, or initiate a custom factory allocation.',
  location,
  phone,
  email = 'concierge@autobahnpro.com',
  contactAddress = '100 Automotive Boulevard, Motor City District',
  contactHours = 'Monday – Saturday: 09:00 – 19:00 • Sunday: By VIP Appointment Only',
  dealershipName,
}) => {
  let builderCtx: ReturnType<typeof useVisualBuilder> | null = null;
  try {
    builderCtx = useVisualBuilder();
  } catch {}
  const activeButtonOverrides: Record<string, ButtonOverride> =
    builderCtx?.templateData?.buttonOverrides || {};

  return (
    <section id="contact" className="w-full py-24 sm:py-32 bg-theme-background border-t border-theme-border font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Contact Container Box */}
        <div className="p-8 sm:p-14 lg:p-16 rounded-2xl bg-theme-surface border border-theme-border shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left 6 Columns: Narrative & Direct Actions */}
            <div className="lg:col-span-6 flex flex-col gap-6 font-inter">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-theme-primary" />
                <EditableElement
                  as="span"
                  id="auto-contact-tag"
                  field="conciergeTag"
                  value={conciergeTag}
                  type="text"
                  className="text-theme-muted font-inter text-xs font-semibold tracking-wider uppercase"
                />
              </div>

              <EditableElement
                as="h2"
                id="auto-contact-title"
                field="conciergeTitle"
                value={conciergeTitle}
                type="heading"
                className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-bold text-theme-foreground tracking-tight leading-tight"
              />

              <EditableElement
                as="p"
                id="auto-contact-sub"
                field="conciergeSub"
                value={conciergeSub}
                type="text"
                className="text-base text-theme-muted font-normal leading-relaxed"
              />

              {/* Direct Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <EditableButton
                  buttonKey="auto-contact-whatsapp"
                  defaultText="WhatsApp VIP Concierge"
                  defaultHref={`https://wa.me/${phone}?text=${encodeURIComponent(`Hi ${dealershipName}, I am reaching out to discuss a vehicle acquisition.`)}`}
                  defaultOpenInNewTab={true}
                  className="px-7 py-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-theme-primary-text text-xs font-semibold tracking-wide active:scale-98 transition shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>
                    {activeButtonOverrides['auto-contact-whatsapp']?.text || 'WhatsApp VIP Concierge'}
                  </span>
                </EditableButton>

                <EditableButton
                  buttonKey="auto-contact-call"
                  defaultText="Call Showroom Desk"
                  defaultHref={`tel:${phone}`}
                  className="px-7 py-4 rounded-xl bg-theme-background border border-theme-border text-theme-foreground text-xs font-semibold tracking-wide hover:bg-theme-surface transition flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-theme-muted" />
                  <span>{activeButtonOverrides['auto-contact-call']?.text || 'Call Showroom Desk'}</span>
                </EditableButton>
              </div>

              <div className="flex items-center gap-2 text-xs font-inter text-theme-muted pt-2">
                <ShieldCheck className="w-4 h-4 text-theme-primary" />
                <span>Strict Confidentiality & Direct Specialist Attention</span>
              </div>
            </div>

            {/* Right 6 Columns: Address, Hours & Visit Details */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 font-inter">
              
              {/* Card 1: Showroom Location */}
              <div className="p-6 rounded-2xl bg-theme-background/80 border border-theme-border flex flex-col justify-between group hover:border-theme-primary/50 transition-colors">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-theme-surface border border-theme-border flex items-center justify-center text-theme-primary mb-4">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1">
                    Showroom Facility
                  </h3>
                  <EditableElement
                    as="p"
                    id="auto-contact-addr"
                    field="contactAddress"
                    value={contactAddress}
                    type="text"
                    className="font-manrope text-sm font-bold text-theme-foreground mb-1"
                  />
                  <EditableElement
                    as="p"
                    id="auto-contact-loc"
                    field="location"
                    value={location}
                    type="text"
                    className="text-xs text-theme-muted"
                  />
                </div>
              </div>

              {/* Card 2: Operating Hours */}
              <div className="p-6 rounded-2xl bg-theme-background/80 border border-theme-border flex flex-col justify-between group hover:border-theme-primary/50 transition-colors">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-theme-surface border border-theme-border flex items-center justify-center text-theme-primary mb-4">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1">
                    Showroom Hours
                  </h3>
                  <EditableElement
                    as="p"
                    id="auto-contact-hours"
                    field="contactHours"
                    value={contactHours}
                    type="text"
                    className="text-xs text-theme-foreground leading-relaxed font-medium"
                  />
                </div>
              </div>

              {/* Card 3: Direct Phone */}
              <div className="p-6 rounded-2xl bg-theme-background/80 border border-theme-border flex flex-col justify-between group hover:border-theme-primary/50 transition-colors">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-theme-surface border border-theme-border flex items-center justify-center text-theme-primary mb-4">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1">
                    Direct Line
                  </h3>
                  <a
                    href={`tel:${phone}`}
                    className="font-manrope text-sm font-bold text-theme-foreground hover:text-theme-muted transition-colors block"
                  >
                    {phone}
                  </a>
                  <span className="text-xs text-theme-muted mt-1 block">
                    Available during showroom hours
                  </span>
                </div>
              </div>

              {/* Card 4: Direct Email */}
              <div className="p-6 rounded-2xl bg-theme-background/80 border border-theme-border flex flex-col justify-between group hover:border-theme-primary/50 transition-colors">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-theme-surface border border-theme-border flex items-center justify-center text-theme-primary mb-4">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-semibold text-theme-muted uppercase tracking-wider mb-1">
                    Electronic Inquiries
                  </h3>
                  <EditableElement
                    as="p"
                    id="auto-contact-email"
                    field="email"
                    value={email}
                    type="text"
                    className="text-xs font-inter text-theme-foreground break-all"
                  />
                  <span className="text-xs text-theme-muted mt-1 block">
                    Response within 2 hours
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
