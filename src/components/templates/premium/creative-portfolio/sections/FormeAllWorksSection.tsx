'use client';

/**
 * =============================================================================
 * PORTIVA: FORME Studio — All Works Archive Section
 * =============================================================================
 *
 * Dedicated multi-page portfolio and archive section for FORME Studio.
 * Composes shadcn/ui primitives (Tabs, TabsList, TabsTrigger, Badge, Card, Button)
 * with editorial architectural layout, client-side category filtering, and
 * full Visual Builder editability.
 */

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import { formeSectionSurface } from './surface';
import { useStyleOverrides } from './useStyleOverrides';
import type { PremiumTemplateSection } from '@/lib/template-contract';
import type { FormeSectionProps } from './types';

export function FormeAllWorksSection({
  section,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  reducedMotion,
}: FormeSectionProps<Extract<PremiumTemplateSection, { type: 'cards' }>>) {
  const styleOverrides = useStyleOverrides();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const handleInternalNavigation = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    pageId?: string,
  ) => {
    if (!pageId) return;
    if (onNavigate && mode === 'builder') {
      event.preventDefault();
      onNavigate(pageId);
    }
  };

  /**
   * Derive unique filter categories dynamically from project items, preserving
   * first-appearance order while always offering 'All'.
   */
  const categories = useMemo(() => {
    const list: string[] = ['All'];
    for (const item of section.items) {
      if (item.category && !list.includes(item.category)) {
        list.push(item.category);
      }
    }
    return list;
  }, [section.items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return section.items;
    return section.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, section.items]);

  const actionHref = section.primaryAction
    ? buildHref(section.primaryAction, definition, handle, templateId)
    : '#contact';

  return (
    <section
      id="forme-all-works"
      className="relative w-full overflow-hidden py-16 sm:py-24 lg:py-32"
      style={formeSectionSurface({ sectionId: section.id, tone: 'dark', styleOverrides })}
    >
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* ── Top Section Header & Filter Toolbar ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between border-b border-[var(--tone-line)] pb-8 sm:pb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <EditableElement
                as="span"
                id={`${section.id}-eyebrow`}
                field="value"
                value={section.eyebrow || '[01] ALL PROJECTS'}
                className="font-sans text-xs sm:text-[13px] font-semibold uppercase tracking-[0.2em] text-[var(--tone-text-soft)]"
              />
              <Badge
                variant="outline"
                className="text-[10px] font-mono tracking-widest px-2.5 py-0.5 border-[var(--tone-line)] text-[var(--tone-text-soft)] bg-[var(--tone-wash)] uppercase rounded-none"
              >
                {section.items.length} Works
              </Badge>
            </div>

            <EditableElement
              as="h2"
              id={`${section.id}-title`}
              field="value"
              value={section.title || 'Complete Project Archive'}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-semibold tracking-tight leading-[1.12] text-[var(--tone-text)]"
            />

            {section.description ? (
              <div className="mt-4">
                <EditableElement
                  as="p"
                  id={`${section.id}-description`}
                  field="value"
                  value={section.description}
                  className="text-sm sm:text-base text-[var(--tone-text-soft)] leading-relaxed max-w-xl font-normal"
                />
              </div>
            ) : null}
          </div>

          {/* Right Action / Contact Button */}
          {section.primaryAction ? (
            <div className="shrink-0">
              <EditableButton
                buttonKey={`${section.id}-primary-cta`}
                defaultText={section.primaryAction.label || 'START A PROJECT ↗'}
                defaultHref={actionHref}
                onViewClick={
                  section.primaryAction.targetPageId
                    ? (event) => handleInternalNavigation(event, section.primaryAction?.targetPageId)
                    : undefined
                }
                className="inline-flex items-center justify-center gap-2 rounded-none bg-[var(--tone-strong)] px-6 py-3.5 text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--tone-inverse)] hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
              >
                <span>{section.primaryAction.label || 'START A PROJECT ↗'}</span>
                <ArrowUpRight className="h-4 w-4" />
              </EditableButton>
            </div>
          ) : null}
        </div>

        {/* ── Category Filter Tabs using shadcn Tabs ── */}
        <div className="mt-8 sm:mt-10">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="flex flex-wrap h-auto gap-2 bg-transparent p-0 justify-start">
              {categories.map((cat) => {
                const count = cat === 'All'
                  ? section.items.length
                  : section.items.filter((item) => item.category === cat).length;

                return (
                  <TabsTrigger
                    key={cat}
                    value={cat}
                    className="rounded-none border border-[var(--tone-line)] bg-[var(--tone-wash)] px-4 py-2 text-xs uppercase tracking-wider font-mono transition-all data-[state=active]:bg-[var(--tone-strong)] data-[state=active]:text-[var(--tone-inverse)] data-[state=active]:border-transparent text-[var(--tone-text-soft)] hover:text-[var(--tone-text)] hover:bg-[var(--tone-wash-strong)] shadow-none flex items-center gap-2"
                  >
                    <span>{cat}</span>
                    <span className="text-[10px] opacity-60">({count})</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* ── All Works Grid ── */}
        <motion.div
          layout
          className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 auto-rows-fr items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => {
              const itemActionHref = item.action
                ? buildHref(item.action, definition, handle, templateId)
                : '#contact';

              return (
                <motion.article
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col h-full w-full justify-between cursor-pointer border border-[var(--tone-line)] bg-[var(--tone-card)] hover:border-[var(--tone-text-soft)]/60 hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)] transition-all duration-300 rounded-none overflow-hidden"
                >
                  {/* Card Image Container: 4:3 aspect ratio provides perfect editorial balance */}
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-none bg-[var(--tone-wash)]">
                    {item.image ? (
                      <EditableImage
                        imageKey={item.image.key}
                        defaultSrc={item.image.src}
                        defaultAlt={item.image.alt}
                        className="h-full w-full object-cover object-center rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-[var(--tone-wash)]" />
                    )}

                    {/* Category overlay badge with Apple-grade frosted glass */}
                    {item.category ? (
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <Badge
                          variant="default"
                          className="rounded-none bg-black/75 text-white/95 backdrop-blur-xl text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-white/20 shadow-sm"
                        >
                          {item.category}
                        </Badge>
                      </div>
                    ) : null}

                    {/* Top right year badge */}
                    {item.meta ? (
                      <div className="absolute top-3.5 right-3.5 z-10">
                        <Badge
                          variant="outline"
                          className="rounded-none bg-black/60 text-white/90 backdrop-blur-xl text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 border border-white/15 shadow-sm"
                        >
                          {item.meta}
                        </Badge>
                      </div>
                    ) : null}
                  </div>

                  {/* Card Content & Metadata with uniform height allocation */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                    <div>
                      {/* Eyebrow */}
                      {item.eyebrow ? (
                        <div className="mb-2">
                          <EditableElement
                            as="span"
                            id={`${section.id}-${item.id}-eyebrow`}
                            field="value"
                            value={item.eyebrow}
                            className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--tone-text-faint)] block truncate"
                          />
                        </div>
                      ) : null}

                      {/* Project Title */}
                      <EditableElement
                        as="h3"
                        id={`${section.id}-${item.id}-title`}
                        field="value"
                        value={item.title}
                        className="text-lg sm:text-xl font-semibold uppercase tracking-tight text-[var(--tone-text)] group-hover:text-[var(--tone-strong)] transition-colors line-clamp-1"
                      />

                      {/* Project Description with uniform minimum line height */}
                      {item.description ? (
                        <div className="mt-2.5">
                          <EditableElement
                            as="p"
                            id={`${section.id}-${item.id}-desc`}
                            field="value"
                            value={item.description}
                            className="text-xs sm:text-[13px] text-[var(--tone-text-soft)] leading-relaxed font-normal line-clamp-2 min-h-[2.5rem]"
                          />
                        </div>
                      ) : null}
                    </div>

                    {/* Tags & Action Link aligned at card bottom */}
                    <div className="mt-auto pt-4.5 border-t border-[var(--tone-line)] flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags?.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="text-[10px] font-mono tracking-wider text-[var(--tone-text-faint)] bg-[var(--tone-wash)] px-2 py-0.5 border border-[var(--tone-line)] uppercase"
                          >
                            #{tag.text}
                          </span>
                        ))}
                      </div>

                      <EditableButton
                        buttonKey={`${section.id}-${item.id}-btn`}
                        defaultText={item.action?.label || 'View Study ↗'}
                        defaultHref={itemActionHref}
                        onViewClick={
                          item.action?.targetPageId
                            ? (e) => handleInternalNavigation(e, item.action?.targetPageId)
                            : undefined
                        }
                        className="group/btn inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--tone-text)] hover:text-[var(--tone-strong)] font-semibold transition-all shrink-0"
                      >
                        <span>{item.action?.label || 'View Study ↗'}</span>
                      </EditableButton>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state fallback if category has 0 items */}
        {filteredItems.length === 0 ? (
          <div className="mt-16 text-center py-16 border border-dashed border-[var(--tone-line)] bg-[var(--tone-wash)]">
            <Layers className="h-8 w-8 mx-auto text-[var(--tone-text-faint)] mb-3" />
            <p className="text-sm font-mono uppercase tracking-widest text-[var(--tone-text-soft)]">
              No projects found in this category
            </p>
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className="mt-4 text-xs font-mono uppercase tracking-widest underline text-[var(--tone-text)] hover:opacity-80"
            >
              Reset to All Projects
            </button>
          </div>
        ) : null}

        {/* ── Subtle Bottom Divider ── */}
        <div className="mt-16 sm:mt-24 w-full border-b border-[var(--tone-line)]" />
      </div>
    </section>
  );
}
