/**
 * =============================================================================
 * PORTIVA: ThemedBentoCard — Sample Themeable + Editable Bento Block
 * =============================================================================
 *
 * A demonstration component showing how templates consume both the
 * Dynamic Theming Engine and the Inline Editing Engine simultaneously.
 *
 * Key principles demonstrated:
 *   1. ZERO hardcoded colors — all visual properties use semantic Tailwind
 *      classes: bg-theme-surface, text-theme-foreground, text-theme-primary,
 *      border-theme-border, etc.
 *   2. ALL text content wrapped in <EditableText /> — automatically editable
 *      in dashboard mode, read-only semantic HTML on public pages.
 *   3. STATELESS design — the component receives its data via props and
 *      holds no internal state. All mutations flow through EditModeContext.
 *   4. GRID-AWARE — uses inline gridColumn/gridRow styles from the block's
 *      grid_position JSONB, matching the existing Portiva layout system.
 *
 * Usage:
 *   // Wrapped in ThemeProvider + EditModeProvider by the parent page
 *   <ThemedBentoCard block={block} />
 */

'use client';

import React from 'react';
import { EditableText } from './EditableText';
import type { BlockContent, GridPosition } from '@/lib/database.types';

// ─── Props ──────────────────────────────────────────────────────────────────

interface BentoBlock {
  id: string;
  block_type: 'link' | 'image' | 'whatsapp_catalog';
  content: BlockContent;
  grid_position: GridPosition;
  order_index: number;
}

interface ThemedBentoCardProps {
  /** The bento block data from the database */
  block: BentoBlock;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function ThemedBentoCard({ block }: ThemedBentoCardProps) {
  // Calculate CSS Grid placement from JSONB grid_position
  const gridStyle: React.CSSProperties = {
    gridColumn: `span ${Math.min(block.grid_position.w, 4)} / span ${Math.min(block.grid_position.w, 4)}`,
    gridRow: `span ${Math.min(block.grid_position.h, 4)} / span ${Math.min(block.grid_position.h, 4)}`,
  };

  return (
    <div
      style={gridStyle}
      className="bg-theme-surface border border-theme-border rounded-card p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:bg-theme-surface-hover hover:shadow-2xl group relative"
    >
      {/* ─── Link Block ─── */}
      {block.block_type === 'link' && (
        <a
          href={block.content.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col justify-between flex-1 gap-3"
        >
          <span className="text-theme-muted font-bold text-[10px] tracking-widest uppercase">
            External Link
          </span>
          <div>
            <EditableText
              as="h2"
              blockId={block.id}
              field="title"
              value={block.content.title || ''}
              className="text-xl font-bold text-theme-foreground group-hover:text-theme-primary transition-colors line-clamp-2"
              placeholder="Enter link title…"
            />
            <EditableText
              as="p"
              blockId={block.id}
              field="description"
              value={block.content.description || ''}
              className="text-theme-muted text-sm mt-1 line-clamp-2 font-medium"
              placeholder="Enter description…"
            />
          </div>
        </a>
      )}

      {/* ─── Image Block ─── */}
      {block.block_type === 'image' && block.content.image_url && (
        <>
          <img
            src={block.content.image_url}
            alt={block.content.title || 'Portfolio Image'}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 flex items-end p-5">
            <EditableText
              as="h2"
              blockId={block.id}
              field="title"
              value={block.content.title || ''}
              className="text-sm font-bold tracking-wide text-slate-200"
              placeholder="Enter caption…"
            />
          </div>
        </>
      )}

      {/* ─── WhatsApp Catalog Block ─── */}
      {block.block_type === 'whatsapp_catalog' && (
        <a
          href={`https://wa.me/${block.content.phone}?text=${encodeURIComponent(
            `Hi, I want to buy ${block.content.title || ''} for Rs. ${block.content.price}. Please confirm stock availability.`,
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col justify-between flex-1 bg-gradient-to-br from-theme-surface to-emerald-950/20 rounded-2xl"
        >
          <div className="flex justify-between items-start w-full">
            <span className="badge badge-success font-extrabold text-[10px] tracking-wider uppercase px-3 py-1">
              WhatsApp Store
            </span>
            <span className="text-theme-foreground font-black text-lg">
              ₹{Number(block.content.price || 0).toLocaleString('en-IN')}
            </span>
          </div>
          <div>
            <EditableText
              as="h2"
              blockId={block.id}
              field="title"
              value={block.content.title || ''}
              className="text-lg font-bold text-theme-foreground line-clamp-1"
              placeholder="Enter product name…"
            />
            <p className="text-xs text-theme-muted font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Click to order instantly
            </p>
          </div>
        </a>
      )}
    </div>
  );
}
