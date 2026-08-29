import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ShieldCheck, Car } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { EditableButton } from '@/components/engine/EditableButton';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { blacklineSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import { SectionHeading, makeInternalNavigator } from './primitives';
import type { BlacklineSectionProps } from './types';

type ContactSection = Extract<PremiumTemplateSection, { type: 'contact' }>;

const CURRENT_YEAR = new Date().getFullYear();

export function BlacklineContactSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: BlacklineSectionProps<ContactSection>) {
  const styleOverrides = useStyleOverrides();
  const handleInternalNavigation = makeInternalNavigator(mode, onNavigate);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section
      id="bl-home-contact"
      className="relative w-full bg-white pt-16 sm:pt-20 lg:pt-24"
      style={blacklineSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
      aria-labelledby={`${section.id}-title`}
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          {/* Left Column: Heading + Cutout Vehicle */}
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, x: -16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46 }}
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div>
              <SectionHeading
                sectionId={section.id}
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
                size="xl"
              />
            </div>

            {/* Cutout Vehicle Image */}
            <div className="mt-8 flex justify-center lg:mt-12">
              {section.media ? (
                <EditableImage
                  imageKey={section.media.key}
                  defaultSrc={section.media.src}
                  defaultAlt={section.media.alt}
                  containerClassName="w-full max-w-md"
                  className="aspect-[16/11] w-full object-contain drop-shadow-xl filter transition-transform duration-500 hover:scale-105"
                />
              ) : null}
            </div>
          </motion.div>

          {/* Right Column: Private Consultation Form Card */}
          <motion.div
            initial={reducedMotion ? undefined : { opacity: 0, x: 16 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={reducedMotion ? undefined : { type: 'spring', bounce: 0, duration: 0.46, delay: 0.08 }}
            className="rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-xl sm:p-8 lg:col-span-6"
          >
            <div className="mb-6">
              <h3 className="font-display text-xl font-bold tracking-tight text-[#0F172A]">
                <span className="text-[#0066FF]">Private Consultation</span> · Concierge Desk
              </h3>
              <p className="mt-1 text-xs text-[#64748B]">
                Specify your vehicle allocation or inquiry. A dedicated automotive specialist will respond promptly.
              </p>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center rounded-2xl bg-blue-50/80 py-12 text-center text-[#0066FF]">
                <CheckCircle2 className="h-10 w-10 text-[#0066FF]" />
                <p className="mt-3 text-base font-bold text-[#0F172A]">Inquiry Received</p>
                <p className="mt-1 text-xs text-[#64748B]">
                  Our dealership concierge will connect with you within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569]">First Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marcus"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] shadow-inner transition focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569]">Last Name*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vance"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] shadow-inner transition focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                    />
                  </div>
                </div>

                {/* Email & Subject */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569]">Email Address*</label>
                    <input
                      type="email"
                      required
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] shadow-inner transition focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569]">Subject / Allocation*</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lamborghini Revuelto Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] shadow-inner transition focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-semibold text-[#475569]">Your Message*</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your acquisition timeline or test drive preference..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-[#0F172A] placeholder-[#94A3B8] shadow-inner transition focus:border-[#0066FF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] py-3.5 text-xs font-bold text-white shadow-md shadow-blue-500/25 transition duration-200 ease-out hover:shadow-lg hover:shadow-blue-500/40 hover:scale-[1.01] active:scale-[0.98]"
                  >
                    Request Private Consultation
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Directory Footer */}
        <footer className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-slate-200/80 py-8 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-[#0066FF] shadow-sm">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <EditableElement
              as="p"
              id={`${section.id}-legal-brand`}
              field="value"
              value={`${definition.brandName} · Westfield Motor District`}
              className="text-xs font-semibold text-[#64748B]"
            />
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center gap-6">
            {definition.footerLinks.map((link) => {
              const href = buildHref(link, definition, handle, templateId);
              return (
                <EditableElement
                  key={link.id}
                  as="a"
                  id={`${section.id}-footer-link-${link.id}`}
                  field="label"
                  value={link.label}
                  href={href}
                  onClick={(event) => {
                    if (!link.targetPageId || !onNavigate || mode !== 'builder') return;
                    event.preventDefault();
                    handleInternalNavigation(event, link.targetPageId);
                  }}
                  className="text-xs font-medium text-[#64748B] transition-colors hover:text-[#0066FF]"
                />
              );
            })}
            <EditableElement
              as="p"
              id={`${section.id}-legal-copyright`}
              field="value"
              value={`© ${CURRENT_YEAR} ${definition.brandName}. All Rights Reserved.`}
              className="text-xs text-[#94A3B8]"
            />
          </nav>
        </footer>
      </div>
    </section>
  );
}
