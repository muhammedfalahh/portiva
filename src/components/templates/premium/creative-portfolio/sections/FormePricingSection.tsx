'use client';

/**
 * FORME Studio — bespoke pricing section with billing toggle.
 * Extracted verbatim from PremiumMultipageTemplate.tsx (CreativePricingSection)
 * during the template platform migration.
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { DARK_TONE_VARS, formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormePricingSection({
  section,
  definition,
  handle,
  templateId,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'pricing' }>>) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const styleOverrides = useStyleOverrides();
  const isYearly = billingCycle === 'yearly';

  const defaultPlans = [
    {
      id: 'plan-basic',
      name: 'BASIC',
      code: '//01-03',
      price: '$990',
      billing: '/month',
      yearlyPrice: '$790',
      yearlyBilling: '/month',
      subtitle: 'For teams needing ongoing creative power.',
      featuresHeader: "What's Included :",
      features: [
        { id: 'f1', text: '1 major deliverable/month' },
        { id: 'f2', text: 'Priority email support' },
        { id: 'f3', text: '2 revision cycles' },
      ],
      action: {
        id: 'choose-basic',
        label: 'CHOOSE THIS PLAN ↗',
        href: '#contact',
      },
    },
    {
      id: 'plan-pro',
      name: 'PRO',
      code: '//02-03',
      popular: true,
      featured: true,
      highlight: 'Most Popular',
      price: '$2,400',
      billing: '/month',
      yearlyPrice: '$1,920',
      yearlyBilling: '/month',
      subtitle: 'For teams needing ongoing creative power.',
      featuresHeader: "What's Included :",
      features: [
        { id: 'f1', text: '2 major deliverables/month' },
        { id: 'f2', text: 'Unlimited minor requests' },
        { id: 'f3', text: 'Slack/Notion workspace' },
        { id: 'f4', text: 'Weekly check-in' },
      ],
      action: {
        id: 'choose-pro',
        label: 'CHOOSE THIS PLAN ↗',
        href: '#contact',
      },
    },
    {
      id: 'plan-custom',
      name: 'CUSTOM',
      code: '//03-03',
      price: 'Project Based',
      billing: '',
      yearlyPrice: 'Project Based',
      yearlyBilling: '',
      subtitle: 'For brands with unique needs.',
      featuresHeader: "What's Included :",
      features: [
        { id: 'f1', text: 'Fully personalized scope' },
        { id: 'f2', text: 'Dedicated creative direction' },
        { id: 'f3', text: 'Multi-channel design support' },
        { id: 'f4', text: 'Scalable to project or retainer' },
      ],
      action: {
        id: 'choose-custom',
        label: 'CONTACT US ↗',
        href: '#contact',
      },
    },
  ];

  const plans = section.plans && section.plans.length > 0 ? section.plans : defaultPlans;

  return (
    <section
      id="pricing"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-28"
      style={formeSectionSurface({ sectionId: section.id, tone: 'light', styleOverrides })}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* ── Top Header Section: Left Social Proof + Right Headline & Billing Toggle ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 items-start"
        >
          {/* Left Column: Eyebrow + 4-Avatar Social Proof + Star Rating */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between space-y-6 sm:space-y-8">
            <div>
              <EditableElement
                as="span"
                id={`${section.id}-eyebrow`}
                field="value"
                value={section.eyebrow || '[06] PRICING PLAN'}
                className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tone-text)]"
              />
            </div>

            {/* Avatar Stack + Rating + Social Copy */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <EditableImage
                    imageKey="creative-pricing-avatar-1"
                    defaultSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                    defaultAlt="Team member 1"
                    containerClassName="inline-block h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full border border-[var(--tone-card)] shadow-xs shrink-0"
                    className="h-full w-full object-cover"
                  />
                  <EditableImage
                    imageKey="creative-pricing-avatar-2"
                    defaultSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=120&auto=format&fit=crop"
                    defaultAlt="Team member 2"
                    containerClassName="inline-block h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full border border-[var(--tone-card)] shadow-xs shrink-0"
                    className="h-full w-full object-cover"
                  />
                  <EditableImage
                    imageKey="creative-pricing-avatar-3"
                    defaultSrc="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                    defaultAlt="Team member 3"
                    containerClassName="inline-block h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full border border-[var(--tone-card)] shadow-xs shrink-0"
                    className="h-full w-full object-cover"
                  />
                  <EditableImage
                    imageKey="creative-pricing-avatar-4"
                    defaultSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                    defaultAlt="Team member 4"
                    containerClassName="inline-block h-6 w-6 sm:h-6.5 sm:w-6.5 rounded-full border border-[var(--tone-card)] shadow-xs shrink-0"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Rating Badge: Star + 4.9/5 */}
                <div className="flex items-center gap-1.5">
                  <span className="text-theme-accent text-sm select-none" aria-hidden="true">★</span>
                  <EditableElement
                    as="span"
                    id={`${section.id}-rating-val`}
                    field="value"
                    value={section.ratingValue || '4.9/5'}
                    className="font-bold text-xs sm:text-sm text-[var(--tone-text)] tracking-tight"
                  />
                </div>
              </div>

              {/* 2-line Subtext */}
              <div className="flex flex-col text-xs sm:text-[13px] text-[var(--tone-text-soft)] font-normal leading-snug">
                <EditableElement
                  as="span"
                  id={`${section.id}-social-line1`}
                  field="value"
                  value={section.socialProofLine1 || 'Trusted by teams worldwide'}
                />
                <EditableElement
                  as="span"
                  id={`${section.id}-social-line2`}
                  field="value"
                  value={section.socialProofLine2 || 'your story deserves to be next.'}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Large Multi-line Headline + Description + Toggle Switch */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-5 sm:space-y-6">
            <EditableElement
              as="h2"
              id={`${section.id}-title`}
              field="value"
              value={
                section.title ||
                'Design, Scaled to Your Needs,\nInstantly Ready When You Are.'
              }
              className="text-2xl font-normal sm:font-medium tracking-tight text-[var(--tone-text)] sm:text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] sm:leading-[1.10]"
            />

            <EditableElement
              as="p"
              id={`${section.id}-description`}
              field="value"
              value={
                section.description ||
                'Choose a one-time project or an ongoing subscription.'
              }
              className="text-xs sm:text-sm leading-relaxed text-[var(--tone-text-soft)] font-normal"
            />

            {/* Monthly / Yearly Billing Toggle Switch */}
            <div className="flex items-center gap-3 pt-2">
              <span
                onClick={() => setBillingCycle('monthly')}
                className={`cursor-pointer text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  !isYearly ? 'text-[var(--tone-text)]' : 'text-[var(--tone-text-faint)] hover:text-[var(--tone-text)]'
                }`}
              >
                <EditableElement
                  as="span"
                  id={`${section.id}-toggle-monthly`}
                  field="value"
                  value={section.billingToggleMonthly || 'Monthly'}
                />
              </span>

              {/* Physical Pill Switch (Apple design spring physics) */}
              <button
                type="button"
                role="switch"
                aria-checked={isYearly}
                onClick={() => setBillingCycle(isYearly ? 'monthly' : 'yearly')}
                className="relative inline-flex h-6.5 w-12 cursor-pointer items-center rounded-full bg-theme-accent p-0.5 transition-colors duration-200 focus:outline-none select-none"
              >
                <motion.span
                  layout
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`inline-block h-5.5 w-5.5 transform rounded-full bg-[var(--tone-card)] shadow-md transition-transform ${
                    isYearly ? 'translate-x-5.5' : 'translate-x-0'
                  }`}
                />
              </button>

              <span
                onClick={() => setBillingCycle('yearly')}
                className={`cursor-pointer text-xs sm:text-sm font-semibold transition-colors duration-200 ${
                  isYearly ? 'text-[var(--tone-text)]' : 'text-[var(--tone-text-faint)] hover:text-[var(--tone-text)]'
                }`}
              >
                <EditableElement
                  as="span"
                  id={`${section.id}-toggle-yearly`}
                  field="value"
                  value={section.billingToggleYearly || 'Yearly'}
                />
              </span>

              {/* Save 20% Badge */}
              <span className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--theme-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--theme-accent)_10%,transparent)] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium text-theme-accent select-none">
                <EditableElement
                  as="span"
                  id={`${section.id}-discount-badge`}
                  field="value"
                  value={section.yearlyDiscountBadge || 'Save 20%'}
                />
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── 3-Column Pricing Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mt-12 sm:mt-16 items-stretch">
          {plans.map((plan, index) => {
            const isFeatured = plan.featured || plan.popular || index === 1;
            const currentPrice = isYearly && plan.yearlyPrice ? plan.yearlyPrice : plan.price;
            const currentBilling = isYearly && plan.yearlyBilling !== undefined ? plan.yearlyBilling : plan.billing;

            const actionHref = definition
              ? buildHref(plan.action, definition, handle, templateId)
              : plan.action?.href || '#contact';

            return (
              <motion.article
                key={plan.id || `plan-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                style={isFeatured ? DARK_TONE_VARS : undefined}
                className={`group relative flex flex-col justify-between rounded-none p-6 sm:p-7 lg:p-8 transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[var(--gd0)] text-[var(--tone-text)] border border-[var(--tone-line)] shadow-2xl hover:border-[var(--tone-text-soft)]/50'
                    : 'bg-[var(--tone-card)] text-[var(--tone-text)] border border-[var(--tone-line)] shadow-lg hover:border-[var(--tone-text-soft)]/50 hover:shadow-2xl'
                }`}
              >
                {/* Top Half: Badges, Barcode, Price, Subtitle, Features */}
                <div className="relative z-10">
                  {/* Top Header Row: Pill Badge(s) on Left + Barcode on Right */}
                  <div className="flex items-center justify-between gap-3 pb-6 sm:pb-7">
                    <div className="flex items-center gap-2">
                      {/* Plan Name Pill Badge */}
                      <span className="rounded-full border border-[var(--tone-line)] bg-[var(--tone-wash)] px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-[var(--tone-text)] select-none">
                        <EditableElement
                          as="span"
                          id={`${section.id}-${plan.id}-name`}
                          field="value"
                          value={plan.name}
                        />
                      </span>

                      {/* Most Popular Flame Badge (if featured) */}
                      {isFeatured ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--theme-accent)_40%,transparent)] bg-[color-mix(in_srgb,var(--theme-accent)_15%,transparent)] px-2.5 py-0.5 font-sans text-[10px] sm:text-[11px] font-medium text-theme-accent select-none">
                          <span className="text-[10px]" aria-hidden="true">✦</span>
                          <EditableElement
                            as="span"
                            id={`${section.id}-${plan.id}-highlight`}
                            field="value"
                            value={plan.highlight || 'Most Popular'}
                          />
                        </span>
                      ) : null}
                    </div>

                    {/* Barcode Graphic + Index Code */}
                    <div
                      className="flex items-center gap-2 select-none opacity-80 text-[var(--tone-text)]"
                      aria-hidden="true"
                    >
                      <span className="font-mono text-[10px] tracking-wider opacity-70">
                        {plan.code || `//0${index + 1}-03`}
                      </span>
                      <div className="flex h-3.5 items-stretch gap-[1.5px] text-current">
                        <div className="w-[1px] bg-current" />
                        <div className="w-[2px] bg-current" />
                        <div className="w-[1px] bg-current" />
                        <div className="w-[3px] bg-current" />
                        <div className="w-[1px] bg-current" />
                        <div className="w-[2px] bg-current" />
                        <div className="w-[1.5px] bg-current" />
                        <div className="w-[1px] bg-current" />
                      </div>
                    </div>
                  </div>

                  {/* Price & Billing */}
                  <div className="mt-2 flex items-baseline">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`${plan.id}-${isYearly ? 'yearly' : 'monthly'}`}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-baseline"
                      >
                        <EditableElement
                          as="span"
                          id={`${section.id}-${plan.id}-price`}
                          field="value"
                          value={currentPrice}
                          className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold tracking-tight text-[var(--tone-text)]"
                        />
                        {currentBilling ? (
                          <EditableElement
                            as="span"
                            id={`${section.id}-${plan.id}-billing`}
                            field="value"
                            value={currentBilling}
                            className="ml-1 text-xs sm:text-sm font-normal text-[var(--tone-text-soft)]"
                          />
                        ) : null}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Subtitle */}
                  <div className="mt-2">
                    <EditableElement
                      as="p"
                      id={`${section.id}-${plan.id}-subtitle`}
                      field="value"
                      value={plan.subtitle || 'For teams needing ongoing creative power.'}
                      className="text-xs sm:text-sm font-normal text-[var(--tone-text-soft)]"
                    />
                  </div>

                  {/* Divider Line */}
                  <div className="my-6 sm:my-7 border-t border-[var(--tone-line)]" />

                  {/* Features Header */}
                  <div className="mb-4 sm:mb-5">
                    <EditableElement
                      as="p"
                      id={`${section.id}-${plan.id}-features-hdr`}
                      field="value"
                      value={plan.featuresHeader || "What's Included :"}
                      className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[var(--tone-text)]"
                    />
                  </div>

                  {/* Features List with Checkmark Icons */}
                  <ul className="space-y-3 sm:space-y-3.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={feature.id || `f-${fIdx}`} className="flex items-start gap-2.5">
                        {/* Circular filled check icon */}
                        <svg
                          className="h-4 w-4 shrink-0 mt-0.5 fill-current text-[var(--tone-text)]"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <EditableElement
                          as="span"
                          id={`${section.id}-${plan.id}-feature-${feature.id || fIdx}`}
                          field="value"
                          value={feature.text}
                          className={`text-xs sm:text-sm font-normal ${
                            isFeatured ? 'text-[var(--tone-text)]' : 'text-[var(--tone-text-soft)]'
                          }`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom Half: Full-Width Sharp CTA Button */}
                <div className="relative z-10 pt-8 sm:pt-10">
                  <EditableButton
                    buttonKey={`${section.id}-${plan.id}-cta`}
                    defaultText={plan.action?.label || (index === 2 ? 'CONTACT US ↗' : 'CHOOSE THIS PLAN ↗')}
                    defaultHref={actionHref}
                    className={`w-full rounded-none font-semibold text-xs sm:text-[13px] tracking-[0.14em] uppercase py-3.5 sm:py-4 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5 cursor-pointer bg-[var(--tone-strong)] text-[var(--tone-inverse)] hover:opacity-90 ${
                      isFeatured ? 'shadow-lg' : 'shadow-md'
                    }`}
                  >
                    <span>{plan.action?.label || (index === 2 ? 'CONTACT US ↗' : 'CHOOSE THIS PLAN ↗')}</span>
                  </EditableButton>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
