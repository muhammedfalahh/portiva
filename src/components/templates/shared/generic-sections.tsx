'use client';

/**
 * =============================================================================
 * PORTIVA: SectionKit — Shared Generic Premium Section Renderers
 * =============================================================================
 *
 * Generic implementations of the premium section types. Extracted verbatim
 * from PremiumMultipageTemplate.tsx (GenericSectionRenderer and its delegated
 * generic-path bodies) during the template platform migration.
 *
 * Template modules compose these via renderGenericSection() and may override
 * any individual section with a bespoke implementation. Element ids are
 * identical to the legacy renderer so persisted editor overrides keep working.
 */

import React from 'react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { ActionRow, MotionSection, SectionHeader, gridColumns } from './premium-runtime';
import { GenericContactSection } from './generic-contact';

// ─── Section Props ──────────────────────────────────────────────────────────

export interface GenericSectionProps {
  section: PremiumTemplateSection;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  reducedMotion: boolean;
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function GenericHeroSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: GenericSectionProps) {
  if (section.type !== 'hero') return null;
  return (
    <MotionSection className="py-8 sm:py-10" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-center lg:px-8">
        <div className="space-y-6">
          <SectionHeader section={section} />
          <ActionRow
            sectionId={section.id}
            definition={definition}
            handle={handle}
            templateId={templateId}
            onNavigate={onNavigate}
            mode={mode}
            primaryAction={section.primaryAction}
            secondaryAction={section.secondaryAction}
          />
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-theme-border bg-theme-surface">
          {section.media ? (
            <EditableImage imageKey={section.media.key} defaultSrc={section.media.src} defaultAlt={section.media.alt} className="aspect-[4/4.6] w-full object-cover" />
          ) : (
            <div className="aspect-[4/4.6] w-full bg-theme-surface" />
          )}
        </div>
      </div>
    </MotionSection>
  );
}

// ─── Cards ──────────────────────────────────────────────────────────────────

function GenericCardsSection({ section, reducedMotion }: GenericSectionProps) {
  if (section.type !== 'cards') return null;
  return (
    <MotionSection className="py-8 sm:py-10" reduced={reducedMotion}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className={`grid gap-4 ${gridColumns(section.columns)}`}>
          {section.items.map((item) => (
            <article key={item.id} className="rounded-[1.75rem] border border-theme-border bg-theme-surface p-5">
              {item.image ? (
                <div className="overflow-hidden rounded-[1.25rem] border border-theme-border bg-theme-background">
                  <EditableImage imageKey={item.image.key} defaultSrc={item.image.src} defaultAlt={item.image.alt} className="aspect-[4/3] w-full object-cover" />
                </div>
              ) : null}
              <div className="mt-4 space-y-3">
                {item.eyebrow ? (
                  <EditableElement as="p" id={`${section.id}-${item.id}-eyebrow`} field="value" value={item.eyebrow} className="text-[11px] uppercase tracking-[0.18em] text-theme-muted" />
                ) : null}
                <EditableElement as="h3" id={`${section.id}-${item.id}-title`} field="value" value={item.title} className="text-xl font-semibold text-theme-foreground" />
                <EditableElement as="p" id={`${section.id}-${item.id}-description`} field="value" value={item.description} className="text-sm leading-6 text-theme-muted" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

// ─── Story ──────────────────────────────────────────────────────────────────

function GenericStorySection({ section, reducedMotion }: GenericSectionProps) {
  if (section.type !== 'story') return null;
  return (
    <MotionSection className="py-10 sm:py-14 lg:py-16" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start lg:px-8">
        <div className="space-y-6">
          <SectionHeader section={section} />
          {section.stats && section.stats.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {section.stats.map((stat) => (
                <div key={stat.id} className="rounded-[1.4rem] border border-theme-border bg-theme-surface px-4 py-4">
                  <EditableElement
                    as="p"
                    id={`${section.id}-${stat.id}-value`}
                    field="value"
                    value={stat.value}
                    className="text-2xl font-semibold tracking-[-0.04em] text-theme-foreground"
                  />
                  <EditableElement
                    as="p"
                    id={`${section.id}-${stat.id}-label`}
                    field="value"
                    value={stat.label}
                    className="mt-2 text-[11px] uppercase tracking-[0.22em] text-theme-muted"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="space-y-6">
          {section.media ? (
            <div className="overflow-hidden rounded-[2rem] border border-theme-border bg-theme-surface">
              <EditableImage
                imageKey={section.media.key}
                defaultSrc={section.media.src}
                defaultAlt={section.media.alt}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
          ) : null}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)]">
            <div className="space-y-4">
              {section.body.map((paragraph) => (
                <EditableElement
                  key={paragraph.id}
                  as="p"
                  id={`${section.id}-${paragraph.id}`}
                  field="value"
                  value={paragraph.text}
                  className="text-sm leading-7 text-theme-muted sm:text-base"
                />
              ))}
            </div>
            {section.points && section.points.length > 0 ? (
              <div className="space-y-3 border-l border-theme-border pl-0 lg:pl-6">
                {section.points.map((point) => (
                  <div key={point.id} className="rounded-[1.25rem] border border-theme-border bg-theme-surface px-4 py-4">
                    <EditableElement
                      as="p"
                      id={`${section.id}-${point.id}`}
                      field="value"
                      value={point.text}
                      className="text-sm leading-6 text-theme-foreground"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </MotionSection>
  );
}

// ─── Detail ─────────────────────────────────────────────────────────────────

function GenericDetailSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: GenericSectionProps) {
  if (section.type !== 'detail') return null;
  return (
    <MotionSection className="py-10 sm:py-14 lg:py-16" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:px-8">
        <div className="space-y-6">
          <SectionHeader section={section} />
          {section.specs && section.specs.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {section.specs.map((spec) => (
                <div key={spec.id} className="rounded-[1.4rem] border border-theme-border bg-theme-surface px-4 py-4">
                  <EditableElement
                    as="p"
                    id={`${section.id}-${spec.id}-label`}
                    field="value"
                    value={spec.label}
                    className="text-[11px] uppercase tracking-[0.22em] text-theme-muted"
                  />
                  <EditableElement
                    as="p"
                    id={`${section.id}-${spec.id}-value`}
                    field="value"
                    value={spec.value}
                    className="mt-2 text-base font-semibold tracking-[-0.02em] text-theme-foreground"
                  />
                </div>
              ))}
            </div>
          ) : null}
          <ActionRow
            sectionId={section.id}
            definition={definition}
            handle={handle}
            templateId={templateId}
            onNavigate={onNavigate}
            mode={mode}
            primaryAction={section.primaryAction}
            secondaryAction={section.secondaryAction}
          />
        </div>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-[2rem] border border-theme-border bg-theme-surface">
            {section.media ? (
              <EditableImage
                imageKey={section.media.key}
                defaultSrc={section.media.src}
                defaultAlt={section.media.alt}
                className="aspect-[4/4.6] w-full object-cover"
              />
            ) : (
              <div className="aspect-[4/4.6] w-full bg-theme-surface" />
            )}
          </div>
          <EditableElement
            as="p"
            id={`${section.id}-caption`}
            field="value"
            value="Use this section for challenge, approach, and outcome framing before deeper supporting visuals below."
            className="text-xs uppercase tracking-[0.22em] text-theme-muted"
          />
        </div>
      </div>
    </MotionSection>
  );
}

// ─── Testimonials / Pricing / FAQ / CTA ─────────────────────────────────────

function GenericTestimonialsSection({ section, reducedMotion }: GenericSectionProps) {
  if (section.type !== 'testimonials') return null;
  return (
    <MotionSection className="py-8 sm:py-10" reduced={reducedMotion}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="grid gap-4 lg:grid-cols-3">
          {section.items.map((item) => (
            <article key={item.id} className="rounded-[1.75rem] border border-theme-border bg-theme-surface p-5">
              <EditableElement as="p" id={`${section.id}-${item.id}-quote`} field="value" value={item.quote} className="text-sm leading-7 text-theme-foreground" />
              <div className="mt-5">
                <EditableElement as="p" id={`${section.id}-${item.id}-name`} field="value" value={item.name} className="text-sm font-semibold text-theme-foreground" />
                <EditableElement as="p" id={`${section.id}-${item.id}-role`} field="value" value={item.role} className="text-xs text-theme-muted" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function GenericPricingSection({ section, reducedMotion }: GenericSectionProps) {
  if (section.type !== 'pricing') return null;
  return (
    <MotionSection className="py-8 sm:py-10" reduced={reducedMotion}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="grid gap-4 lg:grid-cols-3">
          {section.plans.map((plan) => (
            <article key={plan.id} className="rounded-[1.75rem] border border-theme-border bg-theme-surface p-5">
              <EditableElement as="h3" id={`${section.id}-${plan.id}-name`} field="value" value={plan.name} className="text-xl font-semibold text-theme-foreground" />
              <EditableElement as="p" id={`${section.id}-${plan.id}-price`} field="value" value={plan.price} className="mt-4 text-3xl font-semibold text-theme-foreground" />
              <EditableElement as="p" id={`${section.id}-${plan.id}-billing`} field="value" value={plan.billing} className="mt-1 text-sm text-theme-muted" />
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function GenericFaqSection({ section, reducedMotion }: GenericSectionProps) {
  if (section.type !== 'faq') return null;
  return (
    <MotionSection className="py-8 sm:py-10" reduced={reducedMotion}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:px-6 lg:px-8">
        <SectionHeader section={section} />
        <div className="space-y-3">
          {section.items.map((item) => (
            <article key={item.id} className="rounded-[1.5rem] border border-theme-border bg-theme-surface px-5 py-4">
              <EditableElement as="p" id={`${section.id}-${item.id}-question`} field="value" value={item.question} className="text-base font-semibold text-theme-foreground" />
              <EditableElement as="p" id={`${section.id}-${item.id}-answer`} field="value" value={item.answer} className="mt-3 text-sm leading-7 text-theme-muted" />
            </article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

function GenericCtaSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: GenericSectionProps) {
  if (section.type !== 'cta') return null;
  return (
    <MotionSection className="py-8 sm:py-10" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl gap-6 overflow-hidden rounded-[2rem] border border-theme-border bg-theme-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-center lg:px-8">
        <div>
          <SectionHeader section={section} compact />
          <div className="mt-6">
            <ActionRow
              sectionId={section.id}
              definition={definition}
              handle={handle}
              templateId={templateId}
              onNavigate={onNavigate}
              mode={mode}
              primaryAction={section.primaryAction}
              secondaryAction={section.secondaryAction}
            />
          </div>
        </div>
        <div className="overflow-hidden rounded-[1.7rem] border border-theme-border bg-theme-background">
          {section.media ? (
            <EditableImage imageKey={section.media.key} defaultSrc={section.media.src} defaultAlt={section.media.alt} className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="aspect-[4/3] w-full bg-theme-background" />
          )}
        </div>
      </div>
    </MotionSection>
  );
}

// ─── Dispatcher ─────────────────────────────────────────────────────────────

/**
 * Renders one premium section with the shared generic implementation.
 * Returns null for unknown section types (legacy parity).
 */
export function renderGenericSection(props: GenericSectionProps): React.ReactNode {
  switch (props.section.type) {
    case 'hero':
      return <GenericHeroSection {...props} />;
    case 'cards':
      return <GenericCardsSection {...props} />;
    case 'story':
      return <GenericStorySection {...props} />;
    case 'detail':
      return <GenericDetailSection {...props} />;
    case 'contact':
      return (
        <GenericContactSection
          section={props.section}
          definition={props.definition}
          handle={props.handle}
          templateId={props.templateId}
          mode={props.mode}
          onNavigate={props.onNavigate}
          reducedMotion={props.reducedMotion}
        />
      );
    case 'testimonials':
      return <GenericTestimonialsSection {...props} />;
    case 'gallery':
      return null;
    case 'pricing':
      return <GenericPricingSection {...props} />;
    case 'faq':
      return <GenericFaqSection {...props} />;
    case 'cta':
      return <GenericCtaSection {...props} />;
    default:
      return null;
  }
}
