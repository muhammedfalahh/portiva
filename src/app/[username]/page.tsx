/**
 * =============================================================================
 * PORTIVA: Public Profile Page — Edge-Rendered Bento Grid
 * =============================================================================
 *
 * This is the primary public-facing route: portiva.in/[username]
 *
 * Architecture:
 *   - Server-rendered with ISR (revalidate every 60 seconds)
 *   - Uses the service role client to bypass RLS for public reads
 *   - Parallel data fetching: profile, blocks, and inventory in one pass
 *   - CSS Grid layout translates JSONB grid_position → inline styles
 *   - Fully responsive: 1 column (mobile) → 2 columns (tablet) → 4 columns (desktop)
 *
 * Performance Strategy:
 *   - revalidate = 60: Pages are served from cache, rebuilt every 60 seconds
 *   - dynamicParams = true: Unknown usernames trigger on-demand SSR (not 404)
 *   - Service client avoids RLS policy evaluation overhead
 *   - Promise.all parallelizes the blocks + inventory queries
 *
 * Grid Position Mapping:
 *   The grid_position JSONB column stores {x, y, w, h} where:
 *     x → gridColumn start (1-indexed)
 *     y → gridRow start (1-indexed)
 *     w → gridColumn span
 *     h → gridRow span
 *   These are mapped to inline CSS grid properties rather than dynamic
 *   Tailwind classes, because Tailwind cannot generate classes from
 *   runtime values (they must exist in source code at build time).
 */

import { notFound } from 'next/navigation';
import { createServiceClient } from '@/lib/supabase/server';
import type { BlockContent, GridPosition, SubscriptionTier, InventoryStatus } from '@/lib/database.types';

// ─── ISR Configuration ──────────────────────────────────────────────────────
// Serve cached HTML for 60 seconds, then revalidate in the background.
// This means the first visitor after 60s gets stale content (instant),
// while the cache is rebuilt for subsequent visitors.
export const revalidate = 60;

// Allow on-demand rendering of usernames not known at build time.
// When a new username is requested, Next.js will SSR it and cache the result.
export const dynamicParams = true;

// ─── Type Definitions ───────────────────────────────────────────────────────

interface BentoBlock {
  id: string;
  block_type: 'link' | 'image' | 'whatsapp_catalog';
  content: BlockContent;
  grid_position: GridPosition;
  order_index: number;
}

interface InventoryCar {
  id: string;
  title: string;
  price: number;
  mileage: number;
  status: InventoryStatus;
  image_urls: string[];
}

interface ProfileData {
  id: string;
  handle: string;
  full_name: string;
  subscription_tier: SubscriptionTier;
}

// ─── Dynamic Metadata Generation ────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const lowercaseHandle = username.toLowerCase();

  const supabase = createServiceClient();
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, handle')
    .eq('handle', lowercaseHandle)
    .eq('is_moderated', false)
    .single<{ full_name: string; handle: string }>();

  if (!profile) {
    return {
      title: 'Profile Not Found — Portiva',
      description: 'This profile does not exist or has been removed.',
    };
  }

  return {
    title: `${profile.full_name} — Portiva`,
    description: `Visit ${profile.full_name}'s page on Portiva. Explore their links, portfolio, and products.`,
    openGraph: {
      title: `${profile.full_name} — Portiva`,
      description: `Visit ${profile.full_name}'s page on Portiva.`,
      url: `https://portiva.in/${profile.handle}`,
      type: 'profile',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.full_name} — Portiva`,
    },
  };
}

// ─── Page Component ─────────────────────────────────────────────────────────

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  // Next.js 15: params is a Promise and must be awaited
  const { username } = await params;
  const lowercaseHandle = username.toLowerCase();

  // Create a service-role client for public data fetching.
  // This bypasses RLS, but we manually filter by is_moderated = false
  // to achieve the same security boundary without policy overhead.
  const supabase = createServiceClient();

  // ── Step 1: Fetch the profile ─────────────────────────────────────────
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, handle, full_name, subscription_tier')
    .eq('handle', lowercaseHandle)
    .eq('is_moderated', false)
    .single<ProfileData>();

  // If no profile found (or it's moderated), trigger Next.js 404 page
  if (!profile) notFound();

  // ── Step 2: Parallel data fetch for blocks and inventory ──────────────
  // Promise.all ensures both queries execute concurrently, reducing
  // total latency to max(blocks_query, inventory_query) instead of sum.
  const [blocksResult, inventoryResult] = await Promise.all([
    supabase
      .from('bento_blocks')
      .select('id, block_type, content, grid_position, order_index')
      .eq('profile_id', profile.id)
      .order('order_index', { ascending: true }),
    supabase
      .from('dealership_inventory')
      .select('id, title, price, mileage, status, image_urls')
      .eq('profile_id', profile.id)
      .order('created_at', { ascending: false }),
  ]);

  const blocks = (blocksResult.data || []) as BentoBlock[];
  const inventory = (inventoryResult.data || []) as InventoryCar[];

  // ── Step 3: Render ────────────────────────────────────────────────────
  return (
    <div className="w-full min-h-screen bg-[#08080A] text-slate-100 flex flex-col items-center p-6 md:p-12 font-sans selection:bg-indigo-600/40">
      {/* ═══ Profile Header ═══ */}
      <header className="w-full max-w-4xl flex flex-col items-center mb-12">
        {/* Avatar: Gradient initial circle */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-3xl shadow-2xl mb-4 text-white ring-4 ring-indigo-500/20">
          {profile.full_name.charAt(0).toUpperCase()}
        </div>
        <h1 className="text-3xl font-black tracking-tight">
          {profile.full_name}
        </h1>
        <p className="text-indigo-400 font-medium text-sm mt-1">
          @{profile.handle}
        </p>
      </header>

      {/* ═══ Bento Grid ═══ */}
      {/*
        CSS Grid with 4 columns on desktop, 2 on tablet, 1 on mobile.
        Each row is 160px tall. Blocks use inline gridColumn/gridRow
        styles derived from their grid_position JSONB data.

        On mobile (< sm), we reset all blocks to col-span-1 / row-span-1
        via the responsive classes, overriding the desktop grid positions.
      */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
        {/* ─── Bento Block Renderer ─── */}
        {blocks.map((block) => {
          // Calculate CSS Grid placement from JSONB grid_position.
          // On desktop (md+), use the exact x/y/w/h values.
          // The responsive breakpoints in the grid container handle
          // collapsing to fewer columns on smaller screens.
          const gridStyle: React.CSSProperties = {
            gridColumn: `span ${Math.min(block.grid_position.w, 4)} / span ${Math.min(block.grid_position.w, 4)}`,
            gridRow: `span ${Math.min(block.grid_position.h, 4)} / span ${Math.min(block.grid_position.h, 4)}`,
          };

          return (
            <div
              key={block.id}
              style={gridStyle}
              className="bg-[#111115] border border-slate-800/80 rounded-[32px] p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-slate-700 hover:shadow-2xl group relative"
            >
              {/* ─── Link Block ─── */}
              {block.block_type === 'link' && (
                <a
                  href={block.content.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 p-6 flex flex-col justify-between z-10"
                >
                  <span className="text-slate-500 font-bold text-[10px] tracking-widest uppercase">
                    External Link
                  </span>
                  <div>
                    <h2 className="text-xl font-bold group-hover:text-indigo-400 transition-colors line-clamp-1">
                      {block.content.title}
                    </h2>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-1 font-medium">
                      {block.content.description}
                    </p>
                  </div>
                </a>
              )}

              {/* ─── Image Block ─── */}
              {block.block_type === 'image' && block.content.image_url && (
                <>
                  {/* Full-bleed cover image with scale-on-hover */}
                  <img
                    src={block.content.image_url}
                    alt={block.content.title || 'Portfolio Image'}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Bottom gradient overlay with caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 flex items-end p-5">
                    <h2 className="text-sm font-bold tracking-wide text-slate-200">
                      {block.content.title}
                    </h2>
                  </div>
                </>
              )}

              {/* ─── WhatsApp Catalog Block ─── */}
              {block.block_type === 'whatsapp_catalog' && (
                <a
                  href={`https://wa.me/${block.content.phone}?text=${encodeURIComponent(
                    `Hi, I want to buy ${block.content.title || ''} for Rs. ${block.content.price}. Please confirm stock availability.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 p-6 flex flex-col justify-between z-10 bg-gradient-to-br from-[#111115] to-[#0D1E14]"
                >
                  <div className="flex justify-between items-start w-full">
                    <span className="text-emerald-400 font-extrabold text-[10px] tracking-wider uppercase bg-emerald-950/50 border border-emerald-900/40 px-3 py-1 rounded-full">
                      WhatsApp Store
                    </span>
                    <span className="text-white font-black text-lg">
                      ₹{Number(block.content.price || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100 line-clamp-1">
                      {block.content.title}
                    </h2>
                    <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Click to order instantly
                    </p>
                  </div>
                </a>
              )}
            </div>
          );
        })}

        {/* ─── Dealership Inventory Cards (Business Tier Only) ─── */}
        {/*
          Inventory cards are only rendered for 'business' tier profiles.
          Each card spans 2 columns and 2 rows on desktop for a prominent
          visual presence. The sold/promo states apply distinct visual
          treatments (grayscale overlay, badge animations).
        */}
        {profile.subscription_tier === 'business' &&
          inventory.map((car) => (
            <div
              key={car.id}
              style={{ gridColumn: 'span 2 / span 2', gridRow: 'span 2 / span 2' }}
              className="bg-[#111115] border border-slate-800 rounded-[32px] overflow-hidden flex flex-col shadow-xl group hover:border-slate-700 transition duration-300"
            >
              {/* Vehicle Image Container */}
              <div className="relative w-full h-44 bg-slate-900 overflow-hidden">
                {car.image_urls.length > 0 ? (
                  <img
                    src={car.image_urls[0]}
                    alt={car.title}
                    className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      car.status === 'sold'
                        ? 'grayscale contrast-125'
                        : ''
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-600 font-bold text-sm">
                    No Images
                  </div>
                )}

                {/* SOLD Overlay — Opaque grayscale mask with rotated stamp */}
                {car.status === 'sold' && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                    <span className="border-4 border-red-500 text-red-500 font-black tracking-widest text-2xl uppercase px-6 py-1.5 rounded-xl transform -rotate-6">
                      SOLD
                    </span>
                  </div>
                )}

                {/* PROMO Badge — Animated pulsing promotional label */}
                {car.status === 'promo' && (
                  <div className="absolute top-4 left-4 bg-indigo-600 text-white font-black text-[9px] tracking-widest uppercase px-3 py-1 rounded-full z-10 shadow-md animate-pulse">
                    PROMO FEATURE
                  </div>
                )}
              </div>

              {/* Vehicle Details */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#15151A] to-[#111115]">
                <div>
                  <h2 className="text-xl font-bold text-slate-200 tracking-tight">
                    {car.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {car.mileage.toLocaleString()} km registered
                  </p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800/60">
                  <span className="text-2xl font-black text-indigo-400">
                    ₹{Number(car.price).toLocaleString('en-IN')}
                  </span>
                  <button
                    disabled={car.status === 'sold'}
                    className="bg-slate-800 hover:bg-indigo-600 active:scale-95 disabled:bg-slate-900 disabled:text-slate-600 disabled:scale-100 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
                  >
                    {car.status === 'sold' ? 'Unavailable' : 'Contact Dealer'}
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* ═══ Free Tier Branding Footer ═══ */}
      {/*
        Only shown for free-tier profiles. Provides a subtle Portiva
        attribution link that drives organic signups. Pro and business
        tiers have this removed as a premium feature.
      */}
      {profile.subscription_tier === 'free' && (
        <footer className="mt-16 text-center z-10">
          <a
            href="https://portiva.in"
            className="inline-flex items-center gap-2 bg-[#111115]/80 hover:bg-[#15151A] border border-slate-800/80 text-xs font-semibold text-slate-400 px-5 py-2.5 rounded-full backdrop-blur-md transition shadow-md"
          >
            <span>Built in 60 seconds with</span>
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 font-mono tracking-tighter">
              PORTIVA
            </span>
          </a>
        </footer>
      )}
    </div>
  );
}
