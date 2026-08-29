'use client';

/**
 * =============================================================================
 * PORTIVA: Saffron Dock — Bespoke Sections
 * =============================================================================
 *
 * Extracted verbatim from PremiumMultipageTemplate.tsx (SaffronActions,
 * SaffronStatRow, SaffronDockHero, SaffronMenuCards, SaffronStory,
 * SaffronDetail) during the template platform migration. Element ids
 * unchanged so persisted editor overrides keep resolving.
 *
 * Saffron keeps the shell's DEFAULT header/footer — only its section bodies
 * are bespoke (arch-topped imagery, editorial serif rhythm, stat rails).
 */

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import {
  MotionSection,
  buildHref,
  gridColumns,
} from '@/components/templates/shared/premium-runtime';
import type {
  PremiumRenderMode,
  PremiumTemplateAction,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';

interface SaffronSectionProps {
  section:
    | Extract<PremiumTemplateSection, { type: 'hero' }>
    | Extract<PremiumTemplateSection, { type: 'cards' }>
    | Extract<PremiumTemplateSection, { type: 'story' }>
    | Extract<PremiumTemplateSection, { type: 'detail' }>;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  reducedMotion: boolean;
}

function SaffronActions({
  sectionId,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  primaryAction,
  secondaryAction,
}: {
  sectionId: string;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  primaryAction?: PremiumTemplateAction;
  secondaryAction?: PremiumTemplateAction;
}) {
  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {primaryAction ? (
        <EditableButton
          buttonKey={`${sectionId}-${primaryAction.id}`}
          defaultText={primaryAction.label}
          defaultHref={buildHref(primaryAction, definition, handle, templateId)}
          defaultOpenInNewTab={primaryAction.openInNewTab}
          trailingIcon={<ArrowRight className="h-4 w-4" />}
          onViewClick={
            primaryAction.targetPageId
              ? (event) => handleInternalNavigation(event, primaryAction.targetPageId)
              : undefined
          }
          className="inline-flex min-h-11 items-center rounded-full bg-theme-primary px-6 py-3 text-sm font-semibold tracking-wide text-theme-background transition-all duration-200 hover:-translate-y-0.5 hover:bg-theme-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-primary"
        />
      ) : null}
      {secondaryAction ? (
        <EditableButton
          buttonKey={`${sectionId}-${secondaryAction.id}`}
          defaultText={secondaryAction.label}
          defaultHref={buildHref(secondaryAction, definition, handle, templateId)}
          defaultOpenInNewTab={secondaryAction.openInNewTab}
          trailingIcon={<ArrowUpRight className="h-4 w-4" />}
          onViewClick={
            secondaryAction.targetPageId
              ? (event) => handleInternalNavigation(event, secondaryAction.targetPageId)
              : undefined
          }
          className="inline-flex min-h-11 items-center rounded-full border border-theme-border bg-theme-surface px-6 py-3 text-sm font-semibold text-theme-foreground transition-colors duration-200 hover:border-theme-primary/40 hover:bg-theme-surface-hover"
        />
      ) : null}
    </div>
  );
}

function SaffronStatRow({
  sectionId,
  stats,
}: {
  sectionId: string;
  stats: Array<{ id: string; label: string; value: string }>;
}) {
  if (!stats.length) return null;

  return (
    <div className="grid grid-cols-3 divide-x divide-theme-border border-y border-theme-border">
      {stats.map((stat) => (
        <div key={stat.id} className="px-3 py-4 sm:px-5">
          <EditableElement
            as="p"
            id={`${sectionId}-${stat.id}-value`}
            field="value"
            value={stat.value}
            className="font-editorial text-2xl leading-none text-theme-primary sm:text-3xl"
          />
          <EditableElement
            as="p"
            id={`${sectionId}-${stat.id}-label`}
            field="value"
            value={stat.label}
            className="mt-2 break-words text-[10px] uppercase leading-4 tracking-[0.18em] text-theme-muted sm:text-[11px]"
          />
        </div>
      ))}
    </div>
  );
}

export function SaffronDockHero({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: SaffronSectionProps) {
  if (section.type !== 'hero') return null;

  return (
    <section className="relative w-full overflow-hidden bg-theme-background pt-12 pb-16 sm:pt-16 sm:pb-20">
      <div className="pointer-events-none absolute -top-32 right-[8%] h-80 w-80 rounded-full bg-theme-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-[4%] h-72 w-96 rounded-full bg-theme-accent/10 blur-[110px]" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <motion.div
          className="lg:col-span-7"
          initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? undefined : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-theme-primary" />
            <EditableElement
              as="p"
              id={`${section.id}-eyebrow`}
              field="value"
              value={section.eyebrow}
              className="text-[11px] font-semibold uppercase tracking-[0.3em] text-theme-primary"
            />
          </div>

          <EditableElement
            as="h1"
            id={`${section.id}-title`}
            field="value"
            value={section.title}
            className="mt-5 max-w-xl font-editorial text-4xl font-medium normal-case leading-[1.08] tracking-tight text-theme-foreground sm:text-5xl lg:text-6xl"
          />

          <EditableElement
            as="p"
            id={`${section.id}-description`}
            field="value"
            value={section.description}
            className="mt-5 max-w-lg text-sm leading-7 text-theme-muted sm:text-base"
          />

          <div className="mt-8">
            <SaffronActions
              sectionId={section.id}
              definition={definition}
              handle={handle}
              templateId={templateId}
              mode={mode}
              onNavigate={onNavigate}
              primaryAction={section.primaryAction}
              secondaryAction={section.secondaryAction}
            />
          </div>

          <div className="mt-10 max-w-lg">
            <SaffronStatRow sectionId={section.id} stats={section.stats || []} />
          </div>
        </motion.div>

        <motion.div
          className="relative lg:col-span-5"
          initial={reducedMotion ? undefined : { opacity: 0, y: 24 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={reducedMotion ? undefined : { duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            aria-hidden="true"
            className="absolute -inset-3 translate-x-4 translate-y-4 rounded-b-[2rem] rounded-t-[999px] border border-theme-primary/25"
          />
          <div className="group relative overflow-hidden rounded-b-[2rem] rounded-t-[999px] border border-theme-border bg-theme-surface shadow-2xl shadow-black/30">
            {section.media ? (
              <EditableImage
                imageKey={section.media.key}
                defaultSrc={section.media.src}
                defaultAlt={section.media.alt}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-[4/5] w-full bg-theme-surface" />
            )}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
          <EditableElement
            as="p"
            id={`${section.id}-media-caption`}
            field="value"
            value={section.media?.caption || section.media?.alt || ''}
            className="mx-auto mt-6 max-w-xs text-center font-editorial text-base italic text-theme-muted"
          />
        </motion.div>
      </div>
    </section>
  );
}

export function SaffronMenuCards({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: SaffronSectionProps) {
  if (section.type !== 'cards') return null;

  return (
    <MotionSection className="py-12 sm:py-16" reduced={reducedMotion}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-theme-primary" />
              <EditableElement
                as="p"
                id={`${section.id}-eyebrow`}
                field="value"
                value={section.eyebrow}
                className="text-[11px] font-semibold uppercase tracking-[0.28em] text-theme-primary"
              />
            </div>
            <EditableElement
              as="h2"
              id={`${section.id}-title`}
              field="value"
              value={section.title}
              className="mt-4 font-editorial text-3xl font-medium leading-[1.15] tracking-tight text-theme-foreground sm:text-4xl lg:text-5xl"
            />
          </div>
          <EditableElement
            as="p"
            id={`${section.id}-description`}
            field="value"
            value={section.description}
            className="max-w-md text-sm leading-7 text-theme-muted"
          />
        </div>

        <div className={`grid gap-6 ${gridColumns(section.columns)}`}>
          {section.items.map((item) => (
            <motion.article
              key={item.id}
              initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
              whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={reducedMotion ? undefined : { once: true, amount: 0.2 }}
              transition={reducedMotion ? undefined : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-theme-border bg-theme-surface p-4 pb-6 transition-all duration-300 hover:-translate-y-1 hover:border-theme-primary/40"
            >
              {item.image ? (
                <div className="relative overflow-hidden rounded-b-[1.25rem] rounded-t-[7rem] border border-theme-border/60">
                  <EditableImage
                    imageKey={item.image.key}
                    defaultSrc={item.image.src}
                    defaultAlt={item.image.alt}
                    className="aspect-[4/3.4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.price ? (
                    <span className="absolute right-3 top-3 rounded-full bg-theme-primary px-3 py-1.5 text-xs font-bold text-theme-background shadow-lg shadow-black/25">
                      {item.price}
                    </span>
                  ) : null}
                </div>
              ) : null}

              <div className={`flex flex-1 flex-col ${item.image ? 'px-2 pt-5' : 'px-2 pt-2'}`}>
                {item.eyebrow ? (
                  <EditableElement
                    as="p"
                    id={`${section.id}-${item.id}-eyebrow`}
                    field="value"
                    value={item.eyebrow}
                    className="text-[10px] font-semibold uppercase tracking-[0.24em] text-theme-primary"
                  />
                ) : null}
                <EditableElement
                  as="h3"
                  id={`${section.id}-${item.id}-title`}
                  field="value"
                  value={item.title}
                  className="mt-2 break-words font-editorial text-2xl font-medium leading-snug tracking-tight text-theme-foreground"
                />
                <EditableElement
                  as="p"
                  id={`${section.id}-${item.id}-description`}
                  field="value"
                  value={item.description}
                  className="mt-2 flex-1 break-words text-sm leading-6 text-theme-muted"
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  {item.meta ? (
                    <EditableElement
                      as="span"
                      id={`${section.id}-${item.id}-meta`}
                      field="value"
                      value={item.meta}
                      className="rounded-full border border-theme-border px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-theme-muted"
                    />
                  ) : item.price && !item.image ? (
                    <EditableElement
                      as="span"
                      id={`${section.id}-${item.id}-price`}
                      field="value"
                      value={item.price}
                      className="font-editorial text-xl text-theme-primary"
                    />
                  ) : (
                    <span />
                  )}
                  {item.action ? (
                    <EditableButton
                      buttonKey={`${section.id}-${item.id}-action`}
                      defaultText={item.action.label}
                      defaultHref={buildHref(item.action, definition, handle, templateId)}
                      onViewClick={
                        onNavigate && mode === 'builder'
                          ? (event) => {
                              event.preventDefault();
                              if (item.action?.targetPageId) onNavigate(item.action.targetPageId);
                            }
                          : undefined
                      }
                    />
                  ) : null}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </MotionSection>
  );
}

export function SaffronStory({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: SaffronSectionProps) {
  if (section.type !== 'story') return null;

  return (
    <MotionSection className="py-12 sm:py-16" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 lg:order-1">
          <div
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 h-full w-full rounded-[1.75rem] border border-theme-accent/30"
          />
          <div className="group relative overflow-hidden rounded-[1.75rem] border border-theme-border bg-theme-surface shadow-2xl shadow-black/30">
            {section.media ? (
              <EditableImage
                imageKey={section.media.key}
                defaultSrc={section.media.src}
                defaultAlt={section.media.alt}
                className="aspect-[4/3.2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="aspect-[4/3.2] w-full bg-theme-surface" />
            )}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-theme-primary" />
            <EditableElement
              as="p"
              id={`${section.id}-eyebrow`}
              field="value"
              value={section.eyebrow}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-theme-primary"
            />
          </div>
          <EditableElement
            as="h2"
            id={`${section.id}-title`}
            field="value"
            value={section.title}
            className="mt-4 break-words font-editorial text-3xl font-medium leading-[1.15] tracking-tight text-theme-foreground sm:text-4xl"
          />
          <EditableElement
            as="p"
            id={`${section.id}-description`}
            field="value"
            value={section.description}
            className="mt-4 max-w-lg text-sm leading-7 text-theme-muted"
          />
          <div className="mt-6 space-y-4 border-l-2 border-theme-primary/40 pl-5">
            {section.body.map((paragraph) => (
              <EditableElement
                key={paragraph.id}
                as="p"
                id={`${section.id}-${paragraph.id}-text`}
                field="value"
                value={paragraph.text}
                className="break-words font-editorial text-lg italic leading-relaxed text-theme-foreground/90"
              />
            ))}
          </div>
          {section.primaryAction || section.secondaryAction ? (
            <div className="mt-8">
              <SaffronActions
                sectionId={section.id}
                definition={definition}
                handle={handle}
                templateId={templateId}
                mode={mode}
                onNavigate={onNavigate}
                primaryAction={section.primaryAction}
                secondaryAction={section.secondaryAction}
              />
            </div>
          ) : null}
        </div>
      </div>
    </MotionSection>
  );
}

export function SaffronDetail({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: SaffronSectionProps) {
  if (section.type !== 'detail') return null;

  return (
    <MotionSection className="py-12 sm:py-16" reduced={reducedMotion}>
      <div className="mx-auto grid w-full max-w-7xl items-start gap-12 px-5 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:px-8">
        <div className="relative overflow-hidden rounded-b-[2rem] rounded-t-[999px] border border-theme-border bg-theme-surface shadow-2xl shadow-black/30">
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

        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-theme-primary" />
            <EditableElement
              as="p"
              id={`${section.id}-eyebrow`}
              field="value"
              value={section.eyebrow}
              className="text-[11px] font-semibold uppercase tracking-[0.28em] text-theme-primary"
            />
          </div>
          <EditableElement
            as="h1"
            id={`${section.id}-title`}
            field="value"
            value={section.title}
            className="mt-4 break-words font-editorial text-4xl font-medium leading-[1.1] tracking-tight text-theme-foreground sm:text-5xl"
          />
          <EditableElement
            as="p"
            id={`${section.id}-description`}
            field="value"
            value={section.description}
            className="mt-4 max-w-xl break-words text-sm leading-7 text-theme-muted sm:text-base"
          />

          {section.specs && section.specs.length ? (
            <div className="mt-8">
              {section.specs.map((spec) => (
                <div
                  key={spec.id}
                  className="flex items-baseline justify-between gap-6 border-b border-theme-border py-4 first:border-t"
                >
                  <EditableElement
                    as="p"
                    id={`${section.id}-${spec.id}-label`}
                    field="value"
                    value={spec.label}
                    className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] text-theme-muted"
                  />
                  <EditableElement
                    as="p"
                    id={`${section.id}-${spec.id}-value`}
                    field="value"
                    value={spec.value}
                    className="break-words text-right font-editorial text-lg text-theme-foreground"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-8">
            <SaffronActions
              sectionId={section.id}
              definition={definition}
              handle={handle}
              templateId={templateId}
              mode={mode}
              onNavigate={onNavigate}
              primaryAction={section.primaryAction}
              secondaryAction={section.secondaryAction}
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
