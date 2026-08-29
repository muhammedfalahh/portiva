'use client';

/**
 * =============================================================================
 * PORTIVA: Shared Premium Runtime — Shell & Primitives
 * =============================================================================
 *
 * Generic hosting runtime for premium template modules. Extracted verbatim
 * from PremiumMultipageTemplate.tsx during the template platform migration.
 *
 * The shell owns: page resolution context, default navigation header with
 * mobile drawer, page-meta strip, standard footer, and builder-mode motion
 * freezing. It knows how to HOST a template — never how any specific template
 * looks. Brand-specific headers/footers belong in template modules.
 */

import React, { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, Play, X } from 'lucide-react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import type {
  PremiumRenderMode,
  PremiumRendererProps,
  PremiumTemplateAction,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';

/** Minimal shape every premium section shares for header rendering. */
export interface SectionHeaderFields {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export function buildHref(
  action: { targetPageId?: string; href?: string },
  definition: PremiumTemplateDefinition,
  handle?: string,
  templateId?: string,
) {
  if (action.href) return action.href;
  if (!action.targetPageId || !handle) return '#';
  const page = definition.pages.find((entry) => entry.id === action.targetPageId);
  if (!page) return `/${handle}`;
  const path = page.slug ? `/${handle}/${page.slug}` : `/${handle}`;
  if (!templateId) return path;
  const params = new URLSearchParams({ template: templateId });
  return `${path}?${params.toString()}`;
}

export function gridColumns(columns: 2 | 3 | 4 | undefined) {
  if (columns === 2) return 'md:grid-cols-2';
  if (columns === 4) return 'md:grid-cols-2 xl:grid-cols-4';
  return 'md:grid-cols-2 xl:grid-cols-3';
}

export function cardLayoutClass(
  item: { layout?: 'feature' | 'landscape' | 'portrait' | 'stacked' | 'stat' },
  columns: 2 | 3 | 4 | undefined,
) {
  if (item.layout === 'feature') {
    return columns === 4 ? 'md:col-span-2 xl:col-span-2' : 'md:col-span-2';
  }
  if (item.layout === 'landscape') {
    return columns === 4 ? 'xl:col-span-2' : '';
  }
  return '';
}

// ─── Motion / Header / Action Primitives ────────────────────────────────────

export function MotionSection({
  children,
  className,
  reduced,
}: {
  children: React.ReactNode;
  className?: string;
  reduced: boolean;
}) {
  if (reduced) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}

export function SectionHeader({
  section,
  compact = false,
}: {
  section: SectionHeaderFields;
  compact?: boolean;
}) {
  return (
    <div className={compact ? 'max-w-2xl' : 'max-w-3xl'}>
      <EditableElement
        as="p"
        id={`${section.id}-eyebrow`}
        field="value"
        value={section.eyebrow}
        className="text-[11px] font-semibold uppercase tracking-[0.28em] text-theme-muted"
      />
      <EditableElement
        as="h2"
        id={`${section.id}-title`}
        field="value"
        value={section.title}
        className="mt-4 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-theme-foreground sm:text-4xl lg:text-5xl"
      />
      <EditableElement
        as="p"
        id={`${section.id}-description`}
        field="value"
        value={section.description}
        className="mt-4 max-w-2xl text-sm leading-7 text-theme-muted sm:text-base"
      />
    </div>
  );
}

export function ActionRow({
  sectionId,
  definition,
  handle,
  templateId,
  onNavigate,
  mode,
  primaryAction,
  secondaryAction,
}: {
  sectionId: string;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
  mode: PremiumRenderMode;
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
    <div className="flex flex-wrap gap-3">
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
          className="inline-flex items-center rounded-full bg-theme-foreground px-5 py-3 text-sm font-semibold text-theme-background transition-transform duration-200 hover:-translate-y-0.5"
        />
      ) : null}
      {secondaryAction ? (
        <EditableButton
          buttonKey={`${sectionId}-${secondaryAction.id}`}
          defaultText={secondaryAction.label}
          defaultHref={buildHref(secondaryAction, definition, handle, templateId)}
          defaultOpenInNewTab={secondaryAction.openInNewTab}
          trailingIcon={secondaryAction.href ? <ArrowUpRight className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          onViewClick={
            secondaryAction.targetPageId
              ? (event) => handleInternalNavigation(event, secondaryAction.targetPageId)
              : undefined
          }
          className="inline-flex items-center rounded-full border border-theme-border bg-theme-surface px-5 py-3 text-sm font-semibold text-theme-foreground transition-colors duration-200 hover:bg-theme-surface-hover"
        />
      ) : null}
    </div>
  );
}

// ─── Default Navigation Header ──────────────────────────────────────────────

interface DefaultHeaderProps {
  definition: PremiumTemplateDefinition;
  activePageId: string;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
}

/**
 * Standard premium header: brand mark, page pill navigation, category chip,
 * mobile drawer. Element ids match the legacy renderer exactly so existing
 * editor overrides keep resolving (nav-${page.id}, premium-brand-name, ...).
 */
export function DefaultPremiumHeader({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
}: DefaultHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navPages = definition.pages.slice(0, 7);
  const currentPage =
    definition.pages.find((page) => page.id === activePageId) || definition.pages[0];

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId || !onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(pageId);
    setMobileNavOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-theme-border/70 bg-theme-background/88 text-theme-foreground backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-theme-border bg-theme-surface text-sm font-semibold text-theme-foreground">
            <EditableElement as="span" id="premium-brand-mark" field="label" value={definition.brandName.slice(0, 1)} className="text-sm font-semibold" />
          </div>
          <div className="min-w-0">
            <EditableElement as="p" id="premium-brand-name" field="value" value={definition.brandName} className="truncate text-base font-semibold tracking-tight text-theme-foreground" />
            <EditableElement as="p" id="premium-brand-tagline" field="value" value={definition.navTagline} className="truncate text-xs text-theme-muted" />
          </div>
        </div>
        <nav className="hidden items-center gap-1 lg:flex">
          {navPages.map((page) => {
            const href = buildHref({ targetPageId: page.id }, definition, handle, templateId);
            const isActive = page.id === currentPage?.id;
            return (
              <EditableElement
                key={page.id}
                as="a"
                id={`nav-${page.id}`}
                field="label"
                value={page.label}
                href={href}
                onClick={(event) => handleInternalNavigation(event, page.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-theme-foreground text-theme-background'
                    : 'text-theme-muted hover:bg-theme-surface hover:text-theme-foreground'
                }`}
              />
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-theme-border bg-theme-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-theme-muted md:inline-flex">
            {definition.categoryLabel}
          </span>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-theme-border bg-theme-surface text-theme-foreground lg:hidden"
            onClick={() => setMobileNavOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {mobileNavOpen ? (
        <div className="animate-in border-t border-theme-border bg-theme-background text-theme-foreground shadow-lg slide-in-from-top-1 duration-200">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-4 sm:px-6 lg:px-8">
            {navPages.map((page) => {
              const href = buildHref({ targetPageId: page.id }, definition, handle, templateId);
              return (
                <EditableElement
                  key={page.id}
                  as="a"
                  id={`nav-mobile-${page.id}`}
                  field="label"
                  value={page.label}
                  href={href}
                  onClick={(event) => handleInternalNavigation(event, page.id)}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    page.id === currentPage?.id
                      ? 'bg-theme-foreground text-theme-background'
                      : 'border border-theme-border bg-theme-surface text-theme-foreground'
                  }`}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </header>
  );
}

/**
 * Shared reduced-motion rule for premium sections: MotionConfig handles
 * reducedMotion='user' at runtime on the client, keeping SSR and initial
 * hydration markup 100% deterministic.
 */
export function usePremiumReducedMotion(mode?: PremiumRenderMode): boolean {
  return false;
}

// ─── Premium Shell ──────────────────────────────────────────────────────────

export interface PremiumShellProps extends PremiumRendererProps {
  /** Section elements rendered inside <main> by the owning template module. */
  children?: React.ReactNode;
  /** Replace the entire default header (bespoke templates provide their own). */
  header?: React.ReactNode;
  /** Suppress the page-description meta strip above sections. */
  hidePageMeta?: boolean;
  /** Override the main element's padding class (defaults to legacy 'pb-20'). */
  mainClassName?: string;
  /** Suppress the standard footer entirely (legacy creative behaviour). */
  hideFooter?: boolean;
}

/**
 * Hosts one page of a premium template. Sections are provided as children by
 * the owning template module — the shell never dispatches on template identity.
 */
export function PremiumShell({
  definition,
  activePageId,
  mode,
  handle,
  templateId,
  onNavigate,
  header,
  hidePageMeta = false,
  mainClassName,
  hideFooter = false,
  children,
}: PremiumShellProps) {
  const sectionWrap = 'mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8';

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-full bg-theme-background text-theme-foreground">
        {header ?? (
          <DefaultPremiumHeader
            definition={definition}
            activePageId={activePageId}
            mode={mode}
            handle={handle}
            templateId={templateId}
            onNavigate={onNavigate}
          />
        )}

      <main className={mainClassName ?? 'pb-20'}>
        {!hidePageMeta ? (
          <PageMetaStrip definition={definition} activePageId={activePageId} sectionWrap={sectionWrap} />
        ) : null}

        {children}
      </main>

      {!hideFooter && definition.footerHeadline ? (
        <footer className="border-t border-theme-border py-10">
          <div className={`${sectionWrap} grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end`}>
            <div className="max-w-2xl">
              <EditableElement as="h2" id="footer-headline" field="value" value={definition.footerHeadline} className="text-2xl font-semibold tracking-tight text-theme-foreground sm:text-3xl" />
              <EditableElement as="p" id="footer-description" field="value" value={definition.footerDescription} className="mt-3 text-sm leading-7 text-theme-muted" />
            </div>
            <nav className="flex flex-wrap gap-2 lg:justify-end">
              {definition.footerLinks.map((link) => {
                const href = buildHref(link, definition, handle, templateId);
                return (
                  <EditableElement
                    key={link.id}
                    as="a"
                    id={`footer-link-${link.id}`}
                    field="label"
                    value={link.label}
                    href={href}
                    onClick={(event) => {
                      if (!link.targetPageId || !onNavigate || mode !== 'builder') return;
                      event.preventDefault();
                      onNavigate(link.targetPageId);
                    }}
                    className="rounded-full border border-theme-border bg-theme-surface px-4 py-2 text-sm font-medium text-theme-muted hover:text-theme-foreground"
                  />
                );
              })}
            </nav>
          </div>
        </footer>
      ) : null}
      </div>
    </MotionConfig>
  );
}

function PageMetaStrip({
  definition,
  activePageId,
  sectionWrap,
}: {
  definition: PremiumTemplateDefinition;
  activePageId: string;
  sectionWrap: string;
}) {
  const currentPage = useMemo(
    () => definition.pages.find((page) => page.id === activePageId) || definition.pages[0],
    [activePageId, definition.pages],
  );
  if (!currentPage) return null;
  return (
    <div className={`${sectionWrap} py-8 sm:py-10`}>
      <EditableElement
        as="p"
        id={`page-meta-${currentPage.id}`}
        field="value"
        value={currentPage.description}
        className="max-w-2xl text-xs uppercase tracking-[0.22em] text-theme-muted sm:text-sm"
      />
    </div>
  );
}
