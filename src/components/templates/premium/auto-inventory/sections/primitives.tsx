'use client';

/**
 * =============================================================================
 * PORTIVA: Blackline Motors — Shared Section Primitives
 * =============================================================================
 *
 * Automotive-typography heading block and sharp-edged CTA row shared by all
 * bespoke Blackline sections. Everything user-facing routes through the
 * engine primitives (EditableElement / EditableButton) so 100% visual
 * editability is preserved.
 */

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import {
  buildHref,
} from '@/components/templates/shared/premium-runtime';
import type {
  PremiumRenderMode,
  PremiumTemplateAction,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';

// ─── Section Heading ────────────────────────────────────────────────────────

interface SectionHeadingProps {
  sectionId: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  /** Visual scale of the title (section intro vs. compact blocks). */
  size?: 'md' | 'lg' | 'xl';
  align?: 'left' | 'center';
  /**
   * Semantic tag for the title. Page-leading headings (heroes) use 'h1'
   * (one per page); all other sections use 'h2'.
   */
  titleAs?: 'h1' | 'h2';
}

export function SectionHeading({
  sectionId,
  eyebrow,
  title,
  description,
  size = 'lg',
  align = 'left',
  titleAs = 'h2',
}: SectionHeadingProps) {
  const titleClass =
    size === 'xl'
      ? 'text-4xl font-extrabold tracking-[-0.035em] sm:text-5xl lg:text-6xl text-[#0F172A] leading-[1.08]'
      : size === 'lg'
        ? 'text-3xl font-extrabold tracking-[-0.03em] sm:text-4xl lg:text-5xl text-[#0F172A] leading-[1.12]'
        : 'text-2xl font-bold tracking-[-0.025em] sm:text-3xl text-[#0F172A]';

  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <div
          className={`flex items-center gap-2 ${align === 'center' ? 'justify-center' : ''}`}
        >
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#0066FF] shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
          <EditableElement
            as="p"
            id={`${sectionId}-eyebrow`}
            field="value"
            value={eyebrow}
            className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#0066FF]"
          />
        </div>
      ) : null}
      {title ? (
        <EditableElement
          as={titleAs}
          id={`${sectionId}-title`}
          field="value"
          value={title}
          className={`mt-2.5 font-display ${titleClass}`}
        />
      ) : null}
      {description ? (
        <EditableElement
          as="p"
          id={`${sectionId}-description`}
          field="value"
          value={description}
          className={`mt-3.5 max-w-2xl text-sm leading-relaxed text-[#64748B] sm:text-base ${align === 'center' ? 'mx-auto' : ''}`}
        />
      ) : null}
    </div>
  );
}

// ─── Internal Navigation Helper ─────────────────────────────────────────────

export function makeInternalNavigator(
  mode: PremiumRenderMode,
  onNavigate?: (pageId: string) => void,
) {
  return (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
  };
}

// ─── Reference Style Action Pair ──────────────────────────────────────────

interface ActionPairProps {
  sectionId: string;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  primaryAction?: PremiumTemplateAction;
  secondaryAction?: PremiumTemplateAction;
  align?: 'left' | 'center';
  variant?: 'pill' | 'default';
}

export function ActionPair({
  sectionId,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  primaryAction,
  secondaryAction,
  align = 'left',
  variant = 'pill',
}: ActionPairProps) {
  const handleInternalNavigation = makeInternalNavigator(mode, onNavigate);

  if (!primaryAction && !secondaryAction) return null;

  return (
    <div className={`flex flex-wrap items-center gap-3.5 ${align === 'center' ? 'justify-center' : ''}`}>
      {primaryAction ? (
        <EditableButton
          buttonKey={`${sectionId}-${primaryAction.id}`}
          defaultText={primaryAction.label}
          defaultHref={buildHref(primaryAction, definition, handle, templateId)}
          defaultOpenInNewTab={primaryAction.openInNewTab}
          trailingIcon={
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1"
            >
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </span>
          }
          onViewClick={
            primaryAction.targetPageId
              ? (event) => handleInternalNavigation(event, primaryAction.targetPageId)
              : undefined
          }
          className={`group inline-flex items-center gap-2 ${
            variant === 'pill' ? 'rounded-full' : 'rounded-xl'
          } bg-gradient-to-r from-[#0066FF] to-[#0052CC] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,102,255,0.3)] transition duration-200 ease-out hover:shadow-[0_6px_24px_rgba(0,102,255,0.45)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0066FF]`}
        />
      ) : null}
      {secondaryAction ? (
        <EditableButton
          buttonKey={`${sectionId}-${secondaryAction.id}`}
          defaultText={secondaryAction.label}
          defaultHref={buildHref(secondaryAction, definition, handle, templateId)}
          defaultOpenInNewTab={secondaryAction.openInNewTab}
          onViewClick={
            secondaryAction.targetPageId
              ? (event) => handleInternalNavigation(event, secondaryAction.targetPageId)
              : undefined
          }
          className={`inline-flex items-center ${
            variant === 'pill' ? 'rounded-full' : 'rounded-xl'
          } bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-7 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(245,158,11,0.25)] transition duration-200 ease-out hover:shadow-[0_6px_24px_rgba(245,158,11,0.4)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F59E0B]`}
        />
      ) : null}
    </div>
  );
}
