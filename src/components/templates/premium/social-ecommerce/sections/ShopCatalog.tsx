'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Shop Catalog
 * =============================================================================
 *
 * The dedicated Store/Shop page. Built for a catalog that grows far beyond the
 * seed data: live text search, category filter chips, sort control, result
 * count, and an empty state with a clear reset. Product discovery flows left
 * to right: find → filter → compare → add.
 */

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import { MeridianReveal } from './MeridianSection';
import { ProductCard } from './ProductCard';
import type { StorefrontSectionProps } from './FeaturedProducts';
import { parsePrice } from './cart';
import { toMeridianProduct as toMeridianProductLite } from './products';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';

const SORT_OPTIONS: Array<{ value: SortKey; label: string }> = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export function ShopCatalog({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: StorefrontSectionProps) {
  if (section.type !== 'cards') return null;

  return (
    <CatalogBody
      key={section.id}
      section={section}
      definition={definition}
      handle={handle}
      templateId={templateId}
      mode={mode}
      onNavigate={onNavigate}
      reducedMotion={reducedMotion}
    />
  );
}

function CatalogBody({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: StorefrontSectionProps & { section: Extract<PremiumTemplateSection, { type: 'cards' }> }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortKey>('featured');

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const item of section.items) {
      const product = toMeridianProductLite(item);
      if (product.category) set.add(product.category);
    }
    return ['All', ...Array.from(set).sort()];
  }, [section.items]);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = section.items.filter((item) => {
      const product = toMeridianProductLite(item);
      if (category !== 'All' && product.category !== category) return false;
      if (!normalizedQuery) return true;
      const haystack = `${product.name} ${product.detail} ${product.category}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });

    const sorted = [...filtered];
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => (parseFloat(b.metrics?.[0]?.value ?? '0') || 0) - (parseFloat(a.metrics?.[0]?.value ?? '0') || 0));
        break;
      case 'reviews':
        sorted.sort((a, b) => parseReviewCount(b.tags?.[0]?.text) - parseReviewCount(a.tags?.[0]?.text));
        break;
      default:
        break;
    }
    return sorted;
  }, [section.items, query, category, sort]);

  const filtersActive = query.trim() !== '' || category !== 'All' || sort !== 'featured';

  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('featured');
  };

  return (
    <MeridianReveal className="w-full bg-theme-background py-12 sm:py-16" reducedMotion={reducedMotion}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Page intro ─────────────────────────────────────────────────── */}
        <div className="max-w-2xl">
          <EditableElement
            as="p"
            id={`${section.id}-eyebrow`}
            field="value"
            value={section.eyebrow}
            className="text-[11px] font-bold uppercase tracking-[0.24em] text-theme-accent sm:text-xs"
          />
          <EditableElement
            as="h1"
            id={`${section.id}-title`}
            field="value"
            value={section.title}
            className="mt-3 font-editorial-serif text-4xl leading-[1.06] tracking-tight text-theme-foreground sm:text-5xl"
          />
          <EditableElement
            as="p"
            id={`${section.id}-description`}
            field="value"
            value={section.description}
            className="mt-4 break-words text-sm leading-7 text-theme-muted sm:text-base"
          />
        </div>

        {/* ── Toolbar: search · categories · sort ──────────────────────── */}
        <div className="sticky top-[92px] z-20 -mx-4 mt-8 border-y border-theme-border bg-theme-background/95 px-4 py-3 backdrop-blur-lg sm:-mx-6 sm:px-6 lg:top-[100px] lg:-mx-8 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <label className="relative block w-full max-w-xs">
              <span className="sr-only">Search products</span>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-theme-muted"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="h-10 w-full rounded-full border border-theme-border bg-theme-surface pl-10 pr-9 text-sm text-theme-foreground placeholder:text-theme-muted focus:border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent/25"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-theme-muted transition-all hover:bg-theme-surface-hover hover:text-theme-foreground active:scale-90"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              ) : null}
            </label>

            {/* Category chips */}
            <nav aria-label="Product categories" className="-mb-1 overflow-x-auto pb-1 no-scrollbar">
              <ul className="flex items-center gap-2">
                {categories.map((entry) => {
                  const isActive = entry === category;
                  return (
                    <li key={entry}>
                      <button
                        type="button"
                        onClick={() => setCategory(entry)}
                        aria-pressed={isActive}
                        className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 active:scale-[0.96] ${
                          isActive
                            ? 'border-theme-primary bg-theme-primary text-theme-primary-text'
                            : 'border-theme-border bg-theme-surface text-theme-muted hover:border-theme-muted/50 hover:text-theme-foreground'
                        }`}
                      >
                        {entry}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Sort */}
            <label className="relative inline-flex shrink-0 items-center gap-2 self-start lg:self-auto">
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-theme-muted" aria-hidden="true" />
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                aria-label="Sort products"
                className="h-10 cursor-pointer appearance-none rounded-full border border-theme-border bg-theme-surface pl-4 pr-9 text-sm font-medium text-theme-foreground focus:border-theme-accent focus:outline-none focus:ring-2 focus:ring-theme-accent/25"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {/* ── Result count ────────────────────────────────────────────────── */}
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-theme-muted" role="status">
          Showing {visibleItems.length} of {section.items.length} products
        </p>

        {/* ── Grid / empty state ─────────────────────────────────────────── */}
        {visibleItems.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout={!reducedMotion}
                initial={reducedMotion ? undefined : { opacity: 0, y: 14 }}
                whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard
                  item={item}
                  sectionId={section.id}
                  definition={definition}
                  handle={handle}
                  templateId={templateId}
                  mode={mode}
                  onNavigate={onNavigate}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-2xl border border-dashed border-theme-border bg-theme-surface px-6 py-16 text-center">
            <p className="font-editorial-serif text-2xl text-theme-foreground">No matches found</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-theme-muted">
              Try a different search term or clear the active filters to see the full catalog.
            </p>
            {filtersActive ? (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex items-center rounded-full bg-theme-primary px-5 py-2.5 text-sm font-semibold text-theme-primary-text transition-all hover:bg-theme-primary-hover active:scale-[0.97]"
              >
                Clear all filters
              </button>
            ) : null}
          </div>
        )}
      </div>
    </MeridianReveal>
  );
}

function parseReviewCount(text: string | undefined): number {
  if (!text) return 0;
  const match = text.replace(/,/g, '').match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}
