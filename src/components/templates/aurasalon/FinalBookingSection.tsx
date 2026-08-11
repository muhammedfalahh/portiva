'use client';

import React from 'react';
import { MessageCircle, Phone, MapPin, Mail, ShieldCheck, Calendar } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type { ButtonOverride } from '@/lib/theme.types';
import { useScrollReveal } from './useScrollReveal';
import type { BookingInfo } from './types';

interface FinalBookingSectionProps {
  bookingInfo: BookingInfo;
  artistName?: string;
  phone: string;
}

export const FinalBookingSection: React.FC<FinalBookingSectionProps> = ({
  bookingInfo,
  artistName,
  phone,
}) => {
  const { ref, isVisible } = useScrollReveal(0.1);

  const builderCtx = useVisualBuilder();
  const activeButtonOverrides: Record<string, ButtonOverride> = (builderCtx?.templateData?.buttonOverrides as Record<string, ButtonOverride>) || {};

  const cleanPhone = (bookingInfo.whatsappNumber || phone || '').replace(/\D/g, '');
  const firstArtistName = artistName ? artistName.split(' ')[0] : 'Ananya';

  return (
    <EditableElement
      as="section"
      id="aura-contact-section"
      field="contactSection"
      value="Final Direct Booking & Contact Section"
      type="container"
      className={`w-full py-32 bg-theme-background border-b border-theme-border/20 relative overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Background Decorative Accent Ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-theme-accent/5 blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="bg-theme-surface border border-theme-border/50 rounded-3xl p-8 sm:p-14 shadow-2xl text-center space-y-8">
          {/* Slot availability notice badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-background border border-theme-border/40 shadow-xs">
            <Calendar className="w-4 h-4 text-theme-accent" />
            <EditableElement
              as="span"
              id="aura-booking-slots"
              field="availableSlotsNotice"
              value={bookingInfo.availableSlotsNotice}
              type="text"
              className="text-xs font-sans font-semibold text-theme-foreground tracking-wide uppercase"
            />
          </div>

          {/* Headline */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {artistName && (
              <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-theme-accent block">
                <EditableElement
                  as="span"
                  id="aura-booking-reserve-prefix"
                  field="reservePrefix"
                  value="RESERVE WITH "
                  type="text"
                  className="inline"
                />
                <EditableElement
                  as="span"
                  id="aura-booking-artist-name"
                  field="artistName"
                  value={artistName.toUpperCase()}
                  type="text"
                  className="inline"
                />
              </p>
            )}
            <EditableElement
              as="h2"
              id="aura-booking-headline"
              field="headline"
              value={bookingInfo.headline}
              type="heading"
              className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light text-theme-foreground leading-tight"
            />
            <EditableElement
              as="p"
              id="aura-booking-subheadline"
              field="subheadline"
              value={bookingInfo.subheadline}
              type="text"
              className="font-sans text-sm md:text-base text-theme-muted max-w-2xl mx-auto leading-relaxed"
            />
          </div>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <EditableButton
              buttonKey="aura-booking-whatsapp-cta"
              defaultText="Book via WhatsApp"
              defaultHref={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Hi ${firstArtistName}, I would like to check availability for my wedding date.`
              )}`}
              defaultOpenInNewTab={true}
              className="w-full sm:w-auto bg-theme-primary text-theme-background hover:bg-theme-primary-hover px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{activeButtonOverrides['aura-booking-whatsapp-cta']?.text || 'Book via WhatsApp'}</span>
            </EditableButton>

            <EditableButton
              buttonKey="aura-booking-call-cta"
              defaultText="Call Studio"
              defaultHref={`tel:${bookingInfo.phone}`}
              defaultOpenInNewTab={false}
              className="w-full sm:w-auto border border-theme-primary/30 text-theme-primary hover:bg-theme-primary hover:text-theme-background px-8 py-4 rounded-full text-xs font-sans font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{activeButtonOverrides['aura-booking-call-cta']?.text || 'Call Studio'}</span>
            </EditableButton>
          </div>

          {/* Response Guarantee Badge */}
          <div className="pt-6 border-t border-theme-border/20 flex items-center justify-center gap-2 text-xs font-sans text-theme-accent">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <EditableElement
              as="span"
              id="aura-booking-guarantee"
              field="responseGuarantee"
              value={bookingInfo.responseGuarantee}
              type="text"
            />
          </div>

          {/* Contact Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-left border-t border-theme-border/20 font-sans text-xs text-theme-muted">
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-theme-background/60 border border-theme-border/30">
              <MapPin className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
              <div>
                <EditableElement
                  as="span"
                  id="aura-booking-location-title"
                  field="locationTitle"
                  value="Studio Location"
                  type="text"
                  className="font-bold uppercase tracking-wider text-theme-foreground block mb-1"
                />
                <EditableElement
                  as="p"
                  id="aura-booking-address"
                  field="studioAddress"
                  value={bookingInfo.studioAddress}
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-theme-background/60 border border-theme-border/30">
              <Mail className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
              <div>
                <EditableElement
                  as="span"
                  id="aura-booking-email-title"
                  field="emailTitle"
                  value="Concierge Email"
                  type="text"
                  className="font-bold uppercase tracking-wider text-theme-foreground block mb-1"
                />
                <EditableElement
                  as="p"
                  id="aura-booking-email"
                  field="email"
                  value={bookingInfo.email}
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-theme-background/60 border border-theme-border/30">
              <Phone className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
              <div>
                <EditableElement
                  as="span"
                  id="aura-booking-phone-title"
                  field="phoneTitle"
                  value="Direct Line"
                  type="text"
                  className="font-bold uppercase tracking-wider text-theme-foreground block mb-1"
                />
                <EditableElement
                  as="p"
                  id="aura-booking-phone"
                  field="phone"
                  value={bookingInfo.phone}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </EditableElement>
  );
};
