'use client';

/**
 * FORME Studio — bespoke project/service cards section.
 * Extracted verbatim from PremiumMultipageTemplate.tsx (CreativeCardsSection)
 * during the template platform migration.
 */

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import {
  MotionSection,
  SectionHeader,
  buildHref,
  cardLayoutClass,
  gridColumns,
} from '@/components/templates/shared/premium-runtime';
import type { PremiumTemplateCard, PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

function mediaAspectClass(
  style: string,
  layout?: PremiumTemplateCard['layout'],
) {
  if (style === 'project') {
    if (layout === 'feature') return 'aspect-[16/10]';
    if (layout === 'portrait') return 'aspect-[4/5]';
    if (layout === 'landscape') return 'aspect-[16/10]';
    return 'aspect-[4/3]';
  }
  if (style === 'agency') {
    return layout === 'feature' ? 'aspect-[16/10]' : 'aspect-[4/3]';
  }
  return 'aspect-[4/3]';
}

export function FormeCardsSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'cards' }>>) {
  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };

  const isProjectSection = section.style === 'project';
  const isServiceSection = section.style === 'agency';
  const sectionClassName = isProjectSection
    ? 'grid gap-4 md:grid-cols-2 xl:grid-cols-12'
    : `grid gap-4 ${gridColumns(section.columns)}`;

  return (
    <MotionSection className="py-10 sm:py-14 lg:py-16" reduced={reducedMotion}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader section={section} compact={isProjectSection} />
          <EditableElement
            as="p"
            id={`${section.id}-rail-note`}
            field="value"
            value={isProjectSection ? 'Featured selection from current identity, campaign, and digital presentation work.' : 'Built to give clients a clear commercial view of scope, disciplines, and approach.'}
            className="max-w-sm text-xs uppercase tracking-[0.22em] text-theme-muted lg:text-right"
          />
        </div>
        <div className={sectionClassName}>
          {section.items.map((item, index) => {
            const cardClass = isProjectSection
              ? `group overflow-hidden rounded-[1.8rem] border border-theme-border bg-theme-surface ${cardLayoutClass(item, section.columns)} ${item.layout === 'feature' ? 'xl:col-span-7' : 'xl:col-span-5'}`
              : 'group overflow-hidden rounded-[1.8rem] border border-theme-border bg-theme-surface';
            const imageAspect = mediaAspectClass(section.style || 'project', item.layout);
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={cardClass}
              >
                {item.image ? (
                  <div className="overflow-hidden border-b border-theme-border bg-theme-background">
                    <EditableImage
                      imageKey={item.image.key}
                      defaultSrc={item.image.src}
                      defaultAlt={item.image.alt}
                      className={`${imageAspect} w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]`}
                    />
                  </div>
                ) : null}
                <div className={isProjectSection ? 'space-y-5 p-5 sm:p-6' : 'space-y-5 p-5'}>
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-theme-muted">
                    {item.eyebrow ? (
                      <EditableElement
                        as="span"
                        id={`${section.id}-${item.id}-eyebrow`}
                        field="value"
                        value={item.eyebrow}
                        className="text-[11px] uppercase tracking-[0.22em] text-theme-muted"
                      />
                    ) : null}
                    {item.client ? (
                      <EditableElement
                        as="span"
                        id={`${section.id}-${item.id}-client`}
                        field="value"
                        value={item.client}
                        className="text-[11px] uppercase tracking-[0.22em] text-theme-muted"
                      />
                    ) : null}
                    {item.year ? (
                      <EditableElement
                        as="span"
                        id={`${section.id}-${item.id}-year`}
                        field="value"
                        value={item.year}
                        className="text-[11px] uppercase tracking-[0.22em] text-theme-muted"
                      />
                    ) : null}
                    {item.status ? (
                      <EditableElement
                        as="span"
                        id={`${section.id}-${item.id}-status`}
                        field="value"
                        value={item.status}
                        className="rounded-full border border-theme-border bg-theme-background px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-theme-muted"
                      />
                    ) : null}
                  </div>
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                    <div>
                      <EditableElement
                        as="h3"
                        id={`${section.id}-${item.id}-title`}
                        field="value"
                        value={item.title}
                        className="text-2xl font-semibold tracking-[-0.04em] text-theme-foreground"
                      />
                      <EditableElement
                        as="p"
                        id={`${section.id}-${item.id}-description`}
                        field="value"
                        value={item.description}
                        className="mt-3 max-w-2xl text-sm leading-7 text-theme-muted"
                      />
                    </div>
                    {item.meta ? (
                      <EditableElement
                        as="p"
                        id={`${section.id}-${item.id}-meta`}
                        field="value"
                        value={item.meta}
                        className="text-xs uppercase tracking-[0.22em] text-theme-muted lg:max-w-44 lg:text-right"
                      />
                    ) : null}
                  </div>
                  {item.tags && item.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <EditableElement
                          key={tag.id}
                          as="span"
                          id={`${section.id}-${item.id}-${tag.id}`}
                          field="value"
                          value={tag.text}
                          className="rounded-full border border-theme-border bg-theme-background px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-theme-muted"
                        />
                      ))}
                    </div>
                  ) : null}
                  {item.metrics && item.metrics.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-3">
                      {item.metrics.map((metric) => (
                        <div key={metric.id} className="rounded-[1.2rem] border border-theme-border bg-theme-background px-4 py-4">
                          <EditableElement
                            as="p"
                            id={`${section.id}-${item.id}-${metric.id}-value`}
                            field="value"
                            value={metric.value}
                            className="text-lg font-semibold tracking-[-0.03em] text-theme-foreground"
                          />
                          <EditableElement
                            as="p"
                            id={`${section.id}-${item.id}-${metric.id}-label`}
                            field="value"
                            value={metric.label}
                            className="mt-2 text-[11px] uppercase tracking-[0.2em] text-theme-muted"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {item.bulletPoints && item.bulletPoints.length > 0 ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {item.bulletPoints.map((point) => (
                        <div key={point.id} className="flex items-start gap-3 rounded-[1.2rem] border border-theme-border bg-theme-background px-4 py-4">
                          <Sparkles className="mt-0.5 h-4 w-4 text-theme-primary" />
                          <EditableElement
                            as="p"
                            id={`${section.id}-${item.id}-${point.id}`}
                            field="value"
                            value={point.text}
                            className="text-sm leading-6 text-theme-foreground"
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {isServiceSection && item.action ? (
                    <div className="flex flex-wrap gap-3 pt-1">
                      <EditableButton
                        buttonKey={`${section.id}-${item.id}-${item.action.id}`}
                        defaultText={item.action.label}
                        defaultHref={buildHref(item.action, definition, handle, templateId)}
                        defaultOpenInNewTab={item.action.openInNewTab}
                        trailingIcon={<ArrowRight className="h-4 w-4" />}
                        onViewClick={
                          item.action.targetPageId
                            ? (event) => handleInternalNavigation(event, item.action?.targetPageId)
                            : undefined
                        }
                        className="inline-flex items-center rounded-full border border-theme-border bg-theme-background px-4 py-2 text-sm font-semibold text-theme-foreground transition-colors duration-200 hover:bg-theme-surface-hover"
                      />
                    </div>
                  ) : null}
                  {isProjectSection && item.action ? (
                    <div className="flex items-center justify-between gap-4 pt-1">
                      <EditableButton
                        buttonKey={`${section.id}-${item.id}-${item.action.id}`}
                        defaultText={item.action.label}
                        defaultHref={buildHref(item.action, definition, handle, templateId)}
                        defaultOpenInNewTab={item.action.openInNewTab}
                        trailingIcon={<ArrowUpRight className="h-4 w-4" />}
                        onViewClick={
                          item.action.targetPageId
                            ? (event) => handleInternalNavigation(event, item.action?.targetPageId)
                            : undefined
                        }
                        className="inline-flex items-center rounded-full border border-theme-border bg-theme-background px-4 py-2 text-sm font-semibold text-theme-foreground transition-transform duration-200 hover:-translate-y-0.5"
                      />
                      {item.category ? (
                        <EditableElement
                          as="p"
                          id={`${section.id}-${item.id}-category`}
                          field="value"
                          value={item.category}
                          className="text-xs uppercase tracking-[0.22em] text-theme-muted"
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
