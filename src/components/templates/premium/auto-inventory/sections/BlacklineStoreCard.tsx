'use client';

/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Store Listing Card (light pole)
 * =============================================================================
 *
 * Marketplace-style vehicle card for the Store inventory grid, matching the
 * reference design: white rounded card, light image well, favorite toggle,
 * paint-swatch dots, price with a circular "+" enquire action.
 *
 * Editor contract: title, meta, status, price, and the "+" button all route
 * through engine primitives; the heart is a view-mode toggle (canvas CSS
 * disables it while editing). All shades derive from --bl-* / theme tokens.
 */

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
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
import { statusBadgeClass } from './BlacklineVehicleCard';

interface BlacklineStoreCardProps {
  sectionId: string;
  item: PremiumTemplateCard;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
}

export function BlacklineStoreCard({
  sectionId,
  item,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
}: BlacklineStoreCardProps) {
  const [saved, setSaved] = useState(false);
  const handleInternalNavigation = makeInternalNavigator(mode, onNavigate);
  const action: PremiumTemplateAction | undefined = item.action;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--bl-line)] bg-[var(--bl-panel)] shadow-[0_1px_3px_rgba(0,0,0,0.06)] transition-[box-shadow,border-color,transform] duration-300 ease-out hover:-translate-y-1 hover:border-[var(--bl-line-strong)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]">
      {/* Image well */}
      <div className="relative overflow-hidden bg-[var(--bl-wash)]">
        {item.image ? (
          <EditableImage
            imageKey={item.image.key}
            defaultSrc={item.image.src}
            defaultAlt={item.image.alt}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="aspect-[4/3] w-full" aria-hidden="true" />
        )}

        {item.status ? (
          <div className="pointer-events-none absolute left-3 top-3">
            <EditableElement
              as="span"
              id={`${sectionId}-${item.id}-status`}
              field="value"
              value={item.status}
              className={`${statusBadgeClass(item.status)} uppercase tracking-[0.12em] shadow-sm`}
            />
          </div>
        ) : null}

        {/* Favorite toggle (view-mode interaction) */}
        <button
          type="button"
          onClick={() => setSaved((value) => !value)}
          aria-pressed={saved}
          aria-label={`Save ${item.title}`}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--bl-line)] bg-[color-mix(in_srgb,var(--theme-foreground)_86%,transparent)] backdrop-blur-sm transition duration-150 ease-out hover:scale-105 active:scale-90"
        >
          <Heart
            aria-hidden="true"
            strokeWidth={2}
            className={`h-4 w-4 transition-colors duration-150 ${
              saved
                ? 'fill-current text-theme-accent'
                : 'text-[var(--bl-text-soft)]'
            }`}
          />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <EditableElement
          as="h3"
          id={`${sectionId}-${item.id}-title`}
          field="value"
          value={item.title}
          className="break-words text-[15px] font-semibold leading-snug tracking-[-0.01em] text-[var(--bl-text)] sm:text-base"
        />

        {item.meta ? (
          <EditableElement
            as="p"
            id={`${sectionId}-${item.id}-meta`}
            field="value"
            value={item.meta}
            className="mt-1 break-words text-xs text-[var(--bl-text-soft)]"
          />
        ) : null}

        {/* Paint swatches (decorative automotive paint collection) */}
        <div className="mt-3.5 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#FACC15] shadow-sm" title="Giallo Auge (Yellow)" />
          <span className="h-3 w-3 rounded-full bg-[#EF4444] shadow-sm" title="Rosso Corsa (Red)" />
          <span className="h-3 w-3 rounded-full bg-[#0066FF] shadow-sm" title="Blu Cepheus (Blue)" />
          <span className="h-3 w-3 rounded-full bg-[#0F172A] shadow-sm" title="Nero Nemesis (Black)" />
          <span className="h-3 w-3 rounded-full border border-slate-300 bg-white shadow-sm" title="Bianco Pearl (White)" />
        </div>

        {/* Price + add action */}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          {item.price ? (
            <EditableElement
              as="p"
              id={`${sectionId}-${item.id}-price`}
              field="value"
              value={item.price}
              className="font-display text-lg font-extrabold tabular-nums tracking-tight text-[#0F172A] sm:text-xl"
            />
          ) : (
            <span />
          )}
          {action ? (
            <EditableButton
              buttonKey={`${sectionId}-${item.id}-${action.id}`}
              defaultText="+"
              defaultHref={buildHref(action, definition, handle, templateId)}
              defaultOpenInNewTab={action.openInNewTab}
              onViewClick={
                action.targetPageId
                  ? (event) => handleInternalNavigation(event, action.targetPageId)
                  : undefined
              }
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] text-xl font-bold leading-none text-white shadow-md shadow-blue-500/30 transition duration-200 ease-out hover:scale-110 hover:shadow-lg hover:shadow-blue-500/45 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
