'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Product Detail Page
 * =============================================================================
 *
 * Section: conversion-focused PDP. Swappable gallery (main + thumbnails),
 * editable pricing/rating row, option variants, quantity stepper, Add-to-Cart
 * / Buy-Now with cart feedback, highlights, trust rows, specification and
 * shipping accordions. Every visible string is an engine-editable element;
 * functional controls (stepper, thumbs, options) are plain interactive
 * elements so editor selection is never blocked.
 */

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Minus, Plus, RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import type {
  PremiumTemplateAction,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { parsePrice, useMeridianCart } from './cart';
import type { StorefrontSectionProps } from './FeaturedProducts';

type DetailSection = Extract<PremiumTemplateSection, { type: 'detail' }>;

export function ProductDetail({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: StorefrontSectionProps) {
  const cart = useMeridianCart();
  const [justAdded, setJustAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    if (section.type !== 'detail') return {};
    return Object.fromEntries(
      (section.options ?? []).map((option) => [option.id, option.values[0]?.id ?? '']),
    );
  });

  const galleryImages = useMemo<DetailGalleryEntry[]>(() => {
    if (section.type !== 'detail') return [];
    const entries: DetailGalleryEntry[] = [];
    if (section.media) {
      entries.push({ key: section.media.key, src: section.media.src, alt: section.media.alt });
    }
    for (const shot of section.gallery ?? []) {
      entries.push({ key: shot.key, src: shot.src, alt: shot.alt });
    }
    return entries;
  }, [section]);

  if (section.type !== 'detail') return null;

  const meta = section.productMeta;
  const activeShot =
    galleryImages[Math.min(activeImageIndex, Math.max(galleryImages.length - 1, 0))] ?? null;

  const buildPageHref = (pageId: string | undefined): string => {
    if (!handle || !pageId) return '#';
    const page = definition.pages.find((entry) => entry.id === pageId);
    if (!page) return `/${handle}`;
    const path = page.slug ? `/${handle}/${page.slug}` : `/${handle}`;
    if (!templateId) return path;
    return `${path}?template=${encodeURIComponent(templateId)}`;
  };

  const navigateInternal =
    (pageId: string | undefined) =>
    (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (!pageId || !onNavigate || mode !== 'builder') return;
      event.preventDefault();
      onNavigate(pageId);
    };

  const selectedVariantLabels = (section.options ?? [])
    .map((option) => {
      const selectedId = selectedOptions[option.id];
      return option.values.find((value) => value.id === selectedId)?.value;
    })
    .filter((label): label is string => Boolean(label))
    .join(', ');

  const addCurrentSelection = () => {
    cart.addItem(
      {
        id: section.id,
        name: section.title,
        price: parsePrice(meta?.price),
        ...(activeShot?.src ? { image: activeShot.src } : {}),
        ...(selectedVariantLabels ? { variant: selectedVariantLabels } : {}),
      },
      quantity,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  const handleAddToCart = () => addCurrentSelection();

  const handleBuyNow = () => {
    addCurrentSelection();
    if (mode !== 'builder') cart.openCart();
  };

  const ratingValue = meta?.rating ? Number.parseFloat(meta.rating) : Number.NaN;

  return (
    <div className="w-full bg-theme-background py-10 sm:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Breadcrumb ─────────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="text-xs text-theme-muted sm:text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <EditableElement
                as="a"
                id={`${section.id}-breadcrumb-home`}
                field="value"
                value="Home"
                href={buildPageHref('home')}
                onClick={navigateInternal('home')}
                className="transition-colors hover:text-theme-foreground"
              />
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <EditableElement
                as="a"
                id={`${section.id}-breadcrumb-shop`}
                field="value"
                value="Shop"
                href={buildPageHref('shop')}
                onClick={navigateInternal('shop')}
                className="transition-colors hover:text-theme-foreground"
              />
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <EditableElement
                as="span"
                id={`${section.id}-breadcrumb-current`}
                field="value"
                value={section.title}
                className="font-medium text-theme-foreground"
              />
            </li>
          </ol>
        </nav>

        <div className="mt-7 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)] lg:gap-14">
          {/* ── Gallery ──────────────────────────────────────────────────── */}
          <div className="min-w-0">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-theme-border bg-theme-surface">
              {activeShot ? (
                /* Cross-fade between shots — opacity only, instant under
                   reduced motion or on the frozen builder canvas. The frame
                   owns the square ratio; stacked shots fade within it. */
                <AnimatePresence initial={false}>
                  <motion.div
                    key={activeShot.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion || mode === 'builder' ? 0 : 0.25, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <EditableImage
                      imageKey={section.media?.key ?? `${section.id}-main`}
                      defaultSrc={activeShot.src}
                      defaultAlt={activeShot.alt}
                      containerClassName="h-full w-full"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="h-full w-full bg-theme-surface-hover" aria-hidden="true" />
              )}
            </div>

            {galleryImages.length > 1 ? (
              <ul className="mt-3 flex gap-3" role="listbox" aria-label="Product views">
                {galleryImages.map((shot, index) => (
                  <li key={shot.key}>
                    <div
                      role="option"
                      aria-selected={index === activeImageIndex}
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          setActiveImageIndex(index);
                        }
                      }}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-16 w-16 cursor-pointer overflow-hidden rounded-lg border transition-all duration-200 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:h-[72px] sm:w-[72px] ${
                        index === activeImageIndex
                          ? 'border-theme-foreground ring-1 ring-theme-foreground'
                          : 'border-theme-border hover:border-theme-muted'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* ── Buy panel ────────────────────────────────────────────────── */}
          <div className="min-w-0">
            {/* Category · rating */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <EditableElement
                as="p"
                id={`${section.id}-category`}
                field="value"
                value={section.eyebrow}
                className="text-[11px] font-bold uppercase tracking-[0.22em] text-theme-accent"
              />
              {Number.isFinite(ratingValue) ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="inline-flex gap-0.5 text-theme-accent" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((index) => (
                      <Star
                        key={index}
                        className={`h-3.5 w-3.5 ${index < Math.round(ratingValue) ? 'fill-current' : ''}`}
                      />
                    ))}
                  </span>
                  <EditableElement
                    as="span"
                    id={`${section.id}-rating-value`}
                    field="value"
                    value={`${meta?.rating ?? ''} (${meta?.reviewCount ?? ''})`}
                    className="text-xs font-semibold tabular-nums text-theme-muted"
                  />
                </span>
              ) : null}
            </div>

            <EditableElement
              as="h1"
              id={`${section.id}-title`}
              field="value"
              value={section.title}
              className="mt-3 break-words font-editorial-serif text-4xl leading-[1.06] tracking-tight text-theme-foreground sm:text-[2.75rem]"
            />

            {/* Price row */}
            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <EditableElement
                as="span"
                id={`${section.id}-price`}
                field="value"
                value={meta?.price ?? ''}
                className="text-3xl font-bold tracking-tight tabular-nums text-theme-foreground"
              />
              {meta?.compareAt ? (
                <EditableElement
                  as="span"
                  id={`${section.id}-compare-at-price`}
                  field="value"
                  value={meta.compareAt}
                  className="text-base font-medium tabular-nums text-theme-muted line-through"
                />
              ) : null}
              {meta?.badge ? (
                <EditableElement
                  as="span"
                  id={`${section.id}-badge`}
                  field="value"
                  value={meta.badge}
                  className="rounded-full bg-theme-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-theme-accent-text"
                />
              ) : null}
            </div>

            <EditableElement
              as="p"
              id={`${section.id}-description`}
              field="value"
              value={section.description}
              className="mt-5 break-words text-sm leading-7 text-theme-muted sm:text-[15px]"
            />

            {/* Highlights */}
            {section.highlights && section.highlights.length > 0 ? (
              <ul className="mt-5 space-y-2.5">
                {section.highlights.map((highlight) => (
                  <li key={highlight.id} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-theme-accent" strokeWidth={2.4} aria-hidden="true" />
                    <EditableElement
                      as="p"
                      id={`${section.id}-${highlight.id}`}
                      field="value"
                      value={highlight.text}
                      className="break-words text-sm leading-6 text-theme-foreground"
                    />
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Options */}
            {(section.options ?? []).map((option) => (
              <fieldset key={option.id} className="mt-6">
                <legend className="text-xs font-bold uppercase tracking-[0.18em] text-theme-muted">
                  <EditableElement
                    as="span"
                    id={`${section.id}-${option.id}-label`}
                    field="value"
                    value={option.label}
                  />
                </legend>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {option.values.map((value) => {
                    const isSelected = selectedOptions[option.id] === value.id;
                    return (
                      <button
                        key={value.id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() =>
                          setSelectedOptions((prev) => ({ ...prev, [option.id]: value.id }))
                        }
                        className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-[0.96] ${
                          isSelected
                            ? 'border-theme-primary bg-theme-primary text-theme-primary-text'
                            : 'border-theme-border bg-theme-surface text-theme-foreground hover:border-theme-muted'
                        }`}
                      >
                        <EditableElement
                          as="span"
                          id={`${section.id}-${option.id}-${value.id}`}
                          field="value"
                          value={value.value}
                        />
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}

            {/* Quantity + actions */}
            <div className="mt-7 flex flex-wrap items-stretch gap-3">
              <div className="inline-flex h-[52px] items-center rounded-full border border-theme-border bg-theme-surface">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="inline-flex h-full w-12 items-center justify-center rounded-l-full text-theme-muted transition-all hover:text-theme-foreground active:scale-90"
                >
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span aria-live="polite" className="w-8 text-center text-sm font-bold tabular-nums text-theme-foreground">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((value) => Math.min(99, value + 1))}
                  className="inline-flex h-full w-12 items-center justify-center rounded-r-full text-theme-muted transition-all hover:text-theme-foreground active:scale-90"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="relative min-w-0 flex-1 basis-52">
                <ActionButton
                  section={section}
                  action={section.primaryAction}
                  defaultLabel="Add to Cart"
                  onViewClick={handleAddToCart}
                  className="inline-flex h-[52px] w-full items-center justify-center rounded-full bg-theme-primary px-6 text-sm font-bold text-theme-primary-text shadow-sm transition-all duration-200 hover:bg-theme-primary-hover active:scale-[0.98]"
                />
                <AnimatePresence>
                  {justAdded ? (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                      className="pointer-events-none absolute -right-2 -top-2 z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-theme-accent text-theme-accent-text shadow"
                    >
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="mt-3">
              <ActionButton
                section={section}
                action={section.secondaryAction}
                defaultLabel="Buy Now"
                onViewClick={handleBuyNow}
                className="inline-flex h-[52px] w-full items-center justify-center rounded-full border border-theme-foreground bg-transparent px-6 text-sm font-bold text-theme-foreground transition-all duration-200 hover:bg-theme-foreground hover:text-theme-background active:scale-[0.98]"
              />
            </div>

            {/* Trust rows */}
            <ul className="mt-7 space-y-3 border-t border-theme-border pt-6">
              <TrustRow
                sectionId={section.id}
                id="shipping"
                icon={<Truck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
                defaultText="Free carbon-neutral shipping over $75 — arrives in 2–5 business days."
              />
              <TrustRow
                sectionId={section.id}
                id="returns"
                icon={<RotateCcw className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
                defaultText="30-day free returns with a prepaid label. No restocking fees."
              />
              <TrustRow
                sectionId={section.id}
                id="secure"
                icon={<ShieldCheck className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />}
                defaultText="Secure encrypted checkout and a 2-year warranty on every order."
              />
            </ul>
          </div>
        </div>

        {/* ── Accordions ─────────────────────────────────────────────────── */}
        <div className="mx-auto mt-14 max-w-3xl space-y-3 sm:mt-20">
          <details className="group rounded-xl border border-theme-border bg-theme-surface open:pb-5">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-theme-foreground [&::-webkit-details-marker]:hidden">
              Specifications
              <ChevronDown className="h-4 w-4 shrink-0 text-theme-muted transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
            </summary>
            {(section.specs ?? []).length > 0 ? (
              <dl className="grid gap-x-8 border-t border-theme-border px-5 pt-4 sm:grid-cols-2">
                {(section.specs ?? []).map((spec) => (
                  <div key={spec.id} className="flex items-baseline justify-between gap-4 border-b border-theme-border py-3 last:border-b-0 sm:border-b">
                    <dt className="shrink-0 text-xs font-semibold uppercase tracking-[0.14em] text-theme-muted">
                      <EditableElement
                        as="span"
                        id={`${section.id}-${spec.id}-label`}
                        field="value"
                        value={spec.label}
                      />
                    </dt>
                    <dd>
                      <EditableElement
                        as="span"
                        id={`${section.id}-${spec.id}-value`}
                        field="value"
                        value={spec.value}
                        className="block break-words text-right text-sm font-semibold text-theme-foreground"
                      />
                    </dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </details>

          <details className="group rounded-xl border border-theme-border bg-theme-surface open:pb-5">
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-bold uppercase tracking-[0.14em] text-theme-foreground [&::-webkit-details-marker]:hidden">
              Shipping &amp; Returns
              <ChevronDown className="h-4 w-4 shrink-0 text-theme-muted transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <div className="space-y-3 border-t border-theme-border px-5 pt-4">
              <EditableElement
                as="p"
                id={`${section.id}-shipping-copy`}
                field="value"
                value="Orders placed before 2 PM ship the same business day from our nearest warehouse. Standard delivery takes 2–5 business days and is free on orders over $75; express options are shown at checkout."
                className="break-words text-sm leading-7 text-theme-muted"
              />
              <EditableElement
                as="p"
                id={`${section.id}-returns-copy`}
                field="value"
                value="Not the right fit? Start a return within 30 days of delivery for a full refund. We email you a prepaid label — drop the parcel at any partner point and keep nothing but the memory."
                className="break-words text-sm leading-7 text-theme-muted"
              />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

// ─── Local helpers ──────────────────────────────────────────────────────────

interface DetailGalleryEntry {
  key: string;
  src: string;
  alt: string;
}

function ActionButton({
  section,
  action,
  defaultLabel,
  onViewClick,
  className,
}: {
  section: DetailSection;
  action?: PremiumTemplateAction;
  defaultLabel: string;
  onViewClick: () => void;
  className: string;
}) {
  return (
    <EditableButton
      buttonKey={`${section.id}-${action?.id ?? defaultLabel.toLowerCase().replace(/\s+/g, '-')}`}
      defaultText={action?.label ?? defaultLabel}
      onViewClick={onViewClick}
      className={className}
    />
  );
}

function TrustRow({
  sectionId,
  id,
  icon,
  defaultText,
}: {
  sectionId: string;
  id: string;
  icon: React.ReactNode;
  defaultText: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-theme-border bg-theme-surface text-theme-accent">
        {icon}
      </span>
      <EditableElement
        as="p"
        id={`${sectionId}-trust-${id}`}
        field="value"
        value={defaultText}
        className="min-w-0 break-words pt-1.5 text-[13px] leading-6 text-theme-muted"
      />
    </li>
  );
}
