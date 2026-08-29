'use client';

/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Professional Vehicle Card
 * =============================================================================
 *
 * Shared dealership vehicle card used by both the Home "Featured Stock"
 * grid and the Store inventory grid. Anatomy (top → bottom):
 *
 *   image (4/3) + status badge overlay
 *   title (display) + meta line (year · body)
 *   spec row: mileage / fuel / transmission in a hairline 3-col grid
 *   price bar: tabular-numeral price + enquire/details action
 *
 * Every text node, image, and button routes through engine primitives.
 * Structured `metrics` rows map directly onto Portiva's future dynamic
 * inventory fields (dealership_inventory), so cards survive CMS data.
 */

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { EditableButton } from '@/components/engine/EditableButton';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import type {
  PremiumRenderMode,
  PremiumTemplateAction,
  PremiumTemplateCard,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';
import { makeInternalNavigator } from './primitives';

interface BlacklineVehicleCardProps {
  sectionId: string;
  item: PremiumTemplateCard;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
}

/** Maps listing status vocabulary to the platform's semantic badge classes. */
export function statusBadgeClass(status?: string): string {
  const normalized = status?.toLowerCase() ?? '';
  if (normalized.includes('reserv') || normalized.includes('hold')) return 'badge badge-warning';
  if (normalized.includes('sold')) return 'badge badge-neutral';
  if (normalized.includes('incoming') || normalized.includes('soon')) return 'badge badge-accent';
  return 'badge badge-success';
}

export function BlacklineVehicleCard({
  sectionId,
  item,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
}: BlacklineVehicleCardProps) {
  const handleInternalNavigation = makeInternalNavigator(mode, onNavigate);
  const action: PremiumTemplateAction | undefined = item.action;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-none border border-theme-border bg-theme-surface transition-[border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--theme-foreground)_24%,transparent)]">
      {/* Image */}
      <div className="relative overflow-hidden bg-theme-background">
        {item.image ? (
          <EditableImage
            imageKey={item.image.key}
            defaultSrc={item.image.src}
            defaultAlt={item.image.alt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-[4/3] w-full bg-theme-background" aria-hidden="true" />
        )}
        {item.status ? (
          <div className="pointer-events-none absolute left-4 top-4">
            <EditableElement
              as="span"
              id={`${sectionId}-${item.id}-status`}
              field="value"
              value={item.status}
              className={`${statusBadgeClass(item.status)} uppercase tracking-[0.14em] shadow-sm`}
            />
          </div>
        ) : null}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {item.meta ? (
          <EditableElement
            as="p"
            id={`${sectionId}-${item.id}-meta`}
            field="value"
            value={item.meta}
            className="font-mono text-[10px] uppercase tracking-[0.26em] text-theme-muted"
          />
        ) : null}

        <EditableElement
          as="h3"
          id={`${sectionId}-${item.id}-title`}
          field="value"
          value={item.title}
          className="mt-2 break-words font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-theme-foreground sm:text-xl"
        />

        <EditableElement
          as="p"
          id={`${sectionId}-${item.id}-description`}
          field="value"
          value={item.description}
          className="mt-2 line-clamp-2 min-h-[2.5rem] break-words text-[13px] leading-6 text-theme-muted"
        />

        {/* Spec sheet */}
        {item.metrics && item.metrics.length > 0 ? (
          <dl className="mt-5 grid grid-cols-3 divide-x divide-theme-border border-y border-theme-border">
            {item.metrics.slice(0, 3).map((metric, index) => (
              <div
                key={metric.id}
                className={`px-3 py-2.5 ${index === 0 ? 'pl-0' : ''} ${index === 2 ? 'pr-0' : ''}`}
              >
                <dt>
                  <EditableElement
                    as="p"
                    id={`${sectionId}-${item.id}-${metric.id}-label`}
                    field="value"
                    value={metric.label}
                    className="font-mono text-[9px] uppercase tracking-[0.18em] text-theme-muted"
                  />
                </dt>
                <dd>
                  <EditableElement
                    as="p"
                    id={`${sectionId}-${item.id}-${metric.id}-value`}
                    field="value"
                    value={metric.value}
                    className="mt-1 truncate text-xs font-semibold tabular-nums text-theme-foreground"
                  />
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {/* Price + action bar */}
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          {item.price ? (
            <EditableElement
              as="p"
              id={`${sectionId}-${item.id}-price`}
              field="value"
              value={item.price}
              className="font-display text-xl font-bold tabular-nums tracking-[-0.02em] text-theme-foreground sm:text-2xl"
            />
          ) : (
            <span />
          )}
          {action ? (
            <EditableButton
              buttonKey={`${sectionId}-${item.id}-${action.id}`}
              defaultText={action.label}
              defaultHref={buildHref(action, definition, handle, templateId)}
              defaultOpenInNewTab={action.openInNewTab}
              trailingIcon={
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                </span>
              }
              onViewClick={
                action.targetPageId
                  ? (event) => handleInternalNavigation(event, action.targetPageId)
                  : undefined
              }
              className="inline-flex items-center gap-1.5 rounded-none px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-theme-muted transition duration-150 ease-out hover:text-theme-accent active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-accent"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
