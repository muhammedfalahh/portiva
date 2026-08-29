'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Final Shopping CTA
 * =============================================================================
 *
 * Home section 6 of 6. A deep espresso panel that closes the shopping journey:
 * serif headline, dual conversion actions, and a quiet reassurance row
 * (shipping / returns / secure checkout). High contrast, zero gimmicks.
 */

import { RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import type { StorefrontSectionProps } from './FeaturedProducts';

export function FinalCtaSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
}: StorefrontSectionProps) {
  if (section.type !== 'cta') return null;

  const buildPageHref = (pageId: string | undefined): string => {
    if (!handle || !pageId) return '#';
    const page = definition.pages.find((entry) => entry.id === pageId);
    if (!page) return `/${handle}`;
    const path = page.slug ? `/${handle}/${page.slug}` : `/${handle}`;
    if (!templateId) return path;
    return `${path}?template=${encodeURIComponent(templateId)}`;
  };

  const handleActionNavigation =
    (pageId: string | undefined) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (!pageId || !onNavigate || mode !== 'builder') return;
      event.preventDefault();
      onNavigate(pageId);
    };

  const reassurance = [
    { id: 'shipping', icon: Truck, text: 'Free shipping over $75' },
    { id: 'returns', icon: RotateCcw, text: '30-day free returns' },
    { id: 'secure', icon: ShieldCheck, text: 'Secure encrypted checkout' },
  ];

  return (
    <section className="w-full bg-theme-background py-14 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-theme-primary text-theme-primary-text shadow-[0_40px_80px_-40px_rgba(33,29,25,0.5)]">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            {/* ── Copy panel ─────────────────────────────────────────────── */}
            <div className="flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-16 lg:pl-14">
              <EditableElement
                as="p"
                id={`${section.id}-eyebrow`}
                field="value"
                value={section.eyebrow}
                className="text-[11px] font-bold uppercase tracking-[0.24em] opacity-70 sm:text-xs"
              />
              <EditableElement
                as="h2"
                id={`${section.id}-title`}
                field="value"
                value={section.title}
                className="mt-4 max-w-md break-words font-editorial-serif text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-[2.9rem]"
              />
              <EditableElement
                as="p"
                id={`${section.id}-description`}
                field="value"
                value={section.description}
                className="mt-4 max-w-md break-words text-sm leading-7 opacity-75 sm:text-base"
              />

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {section.primaryAction ? (
                  <EditableButton
                    buttonKey={`${section.id}-${section.primaryAction.id}`}
                    defaultText={section.primaryAction.label}
                    defaultHref={buildPageHref(section.primaryAction.targetPageId)}
                    onViewClick={handleActionNavigation(section.primaryAction.targetPageId)}
                    className="inline-flex items-center justify-center rounded-full bg-theme-background px-7 py-3.5 text-sm font-bold text-theme-foreground transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  />
                ) : null}
                {section.secondaryAction ? (
                  <EditableButton
                    buttonKey={`${section.id}-${section.secondaryAction.id}`}
                    defaultText={section.secondaryAction.label}
                    defaultHref={buildPageHref(section.secondaryAction.targetPageId)}
                    onViewClick={handleActionNavigation(section.secondaryAction.targetPageId)}
                    className="inline-flex items-center justify-center rounded-full border border-current px-7 py-3.5 text-sm font-bold opacity-90 transition-all duration-200 hover:bg-theme-background/10 active:scale-[0.98]"
                  />
                ) : null}
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-current/15 pt-6">
                {reassurance.map(({ id, icon: Icon, text }) => (
                  <li key={id} className="inline-flex items-center gap-2 text-xs font-semibold opacity-80 sm:text-[13px]">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} aria-hidden="true" />
                    <EditableElement
                      as="span"
                      id={`${section.id}-reassurance-${id}`}
                      field="value"
                      value={text}
                      className="whitespace-nowrap"
                    />
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Imagery panel ─────────────────────────────────────────── */}
            <div className="relative min-h-[240px] lg:min-h-full">
              {section.media ? (
                <EditableImage
                  imageKey={section.media.key}
                  defaultSrc={section.media.src}
                  defaultAlt={section.media.alt}
                  containerClassName="absolute inset-0 h-full w-full"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
              )}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-r from-theme-primary/60 via-theme-primary/10 to-transparent max-lg:from-theme-primary/40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
