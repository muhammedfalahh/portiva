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
import { PublicTemplateViewer } from '@/components/engine/PublicTemplateViewer';
import { renderTemplateRoute } from './route-renderer';

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

  try {
    const supabase = createServiceClient();
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, handle')
      .eq('handle', lowercaseHandle)
      .eq('is_moderated', false)
      .single<{ full_name: string; handle: string }>();

    if (profile) {
      return {
        title: `${profile.full_name} — Portiva`,
        description: `Visit ${profile.full_name}'s page on Portiva. Explore their links, portfolio, and products.`,
      };
    }
  } catch (err) {
    // Ignore Supabase connection error fallback
  }

  if (lowercaseHandle === 'cafedemo' || lowercaseHandle === 'artisankitchen') {
    return {
      title: 'The Artisan Kitchen — Café & Cloud Kitchen',
      description: 'Premium café experience with artisan coffee and freshly prepared dishes.',
    };
  }

  const displayName = lowercaseHandle === 'bruno' ? 'Bruno Erdison' : 'Alex Morgan';
  return {
    title: `${displayName} — Creative Portfolio`,
    description: `Visit ${displayName}'s portfolio page on Portiva.`,
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

  let profile: ProfileData | null = null;
  const supabase = createServiceClient();

  try {
    const { data } = await supabase
      .from('profiles')
      .select('id, handle, full_name, subscription_tier')
      .eq('handle', lowercaseHandle)
      .eq('is_moderated', false)
      .single<ProfileData>();
    profile = data;
  } catch (err) {
    profile = null;
  }

  if (!profile) {
    const renderedTemplate = await renderTemplateRoute(lowercaseHandle);
    if (renderedTemplate) {
      return renderedTemplate;
    }
    notFound();
  }

  const resolvedProfile = profile;

  // ── Step 2: Parallel data fetch for blocks and inventory ──────────────
  // Promise.all ensures both queries execute concurrently, reducing
  // total latency to max(blocks_query, inventory_query) instead of sum.
  const [blocksResult, inventoryResult] = await Promise.all([
    supabase
      .from('bento_blocks')
      .select('id, block_type, content, grid_position, order_index')
      .eq('profile_id', resolvedProfile.id)
      .order('order_index', { ascending: true }),
    supabase
      .from('dealership_inventory')
      .select('id, title, price, mileage, status, image_urls')
      .eq('profile_id', resolvedProfile.id)
      .order('created_at', { ascending: false }),
  ]);

  const blocks = (blocksResult.data || []) as BentoBlock[];
  const inventory = (inventoryResult.data || []) as InventoryCar[];

  // ── Step 3: Render ────────────────────────────────────────────────────
  return (
    <PublicTemplateViewer handle={lowercaseHandle}>
      <div className="w-full min-h-screen bg-bg-primary text-text-primary flex flex-col items-center p-6 md:p-12 font-sans selection:bg-accent/40">
        {/* ═══ Profile Header ═══ */}
        <header className="w-full max-w-4xl flex flex-col items-center mb-12">
          {/* Avatar: Gradient initial circle */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center font-bold text-3xl shadow-2xl mb-4 text-text-primary ring-4 ring-accent/20">
            {resolvedProfile.full_name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-3xl font-black tracking-tight">
            {resolvedProfile.full_name}
          </h1>
          <p className="text-accent-hover font-medium text-sm mt-1">
            @{resolvedProfile.handle}
          </p>
        </header>

        {/* ═══ Bento Grid ═══ */}
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
          {/* ─── Bento Block Renderer ─── */}
          {blocks.map((block) => {
            const gridStyle: React.CSSProperties = {
              gridColumn: `span ${Math.min(block.grid_position.w, 4)} / span ${Math.min(block.grid_position.w, 4)}`,
              gridRow: `span ${Math.min(block.grid_position.h, 4)} / span ${Math.min(block.grid_position.h, 4)}`,
            };

            return (
              <div
                key={block.id}
                style={gridStyle}
                className="bg-bg-secondary border border-border-subtle rounded-card p-6 flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 hover:border-border-default hover:shadow-2xl group relative"
              >
                {/* ─── Link Block ─── */}
                {block.block_type === 'link' && (
                  <a
                    href={block.content.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 p-6 flex flex-col justify-between z-10"
                  >
                    <span className="text-text-tertiary font-bold text-[10px] tracking-widest uppercase">
                      External Link
                    </span>
                    <div>
                      <h2 className="text-xl font-bold group-hover:text-accent-hover transition-colors line-clamp-1">
                        {block.content.title}
                      </h2>
                      <p className="text-text-secondary text-sm mt-1 line-clamp-1 font-medium">
                        {block.content.description}
                      </p>
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
                      <h2 className="text-sm font-bold tracking-wide text-text-primary">
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
                    className="absolute inset-0 p-6 flex flex-col justify-between z-10 bg-gradient-to-br from-bg-secondary to-[#0D1E14]"
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className="text-success font-extrabold text-[10px] tracking-wider uppercase bg-success/10 border border-success/20 px-3 py-1 rounded-badge">
                        WhatsApp Store
                      </span>
                      <span className="text-text-primary font-black text-lg">
                        ₹{Number(block.content.price || 0).toLocaleString('en-IN')}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-text-primary line-clamp-1">
                        {block.content.title}
                      </h2>
                      <p className="text-xs text-text-secondary font-medium mt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        Click to order instantly
                      </p>
                    </div>
                  </a>
                )}
              </div>
            );
          })}

          {/* ─── Dealership Inventory Cards ─── */}
          {resolvedProfile.subscription_tier === 'business' &&
            inventory.map((car) => (
              <div
                key={car.id}
                style={{ gridColumn: 'span 2 / span 2', gridRow: 'span 2 / span 2' }}
                className="bg-bg-secondary border border-border-subtle rounded-card overflow-hidden flex flex-col shadow-xl group hover:border-border-default transition duration-300"
              >
                <div className="relative w-full h-44 bg-bg-tertiary overflow-hidden">
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
                    <div className="w-full h-full flex items-center justify-center text-text-tertiary font-bold text-sm">
                      No Images
                    </div>
                  )}

                  {car.status === 'sold' && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center z-20">
                      <span className="border-4 border-red-500 text-red-500 font-black tracking-widest text-2xl uppercase px-6 py-1.5 rounded-xl transform -rotate-6">
                        SOLD
                      </span>
                    </div>
                  )}

                  {car.status === 'promo' && (
                    <div className="absolute top-4 left-4 bg-accent text-white font-black text-[9px] tracking-widest uppercase px-3 py-1 rounded-badge z-10 shadow-md animate-pulse">
                      PROMO FEATURE
                    </div>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between bg-bg-secondary">
                  <div>
                    <h2 className="text-xl font-bold text-text-primary tracking-tight">
                      {car.title}
                    </h2>
                    <p className="text-xs text-text-secondary mt-1 font-medium">
                      {car.mileage.toLocaleString()} km registered
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-border-subtle">
                    <span className="text-2xl font-black text-accent-hover">
                      ₹{Number(car.price).toLocaleString('en-IN')}
                    </span>
                    <button
                      disabled={car.status === 'sold'}
                      className="bg-bg-elevated hover:bg-accent active:scale-95 disabled:bg-bg-hover disabled:text-text-tertiary disabled:scale-100 text-text-primary font-bold text-xs px-4 py-2.5 rounded-button transition-all"
                    >
                      {car.status === 'sold' ? 'Unavailable' : 'Contact Dealer'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* ═══ Free Tier Branding Footer ═══ */}
        {resolvedProfile.subscription_tier === 'free' && (
          <footer className="mt-16 text-center z-10">
            <a
              href="https://portiva.in"
              className="badge badge-neutral bg-bg-secondary/80 hover:bg-bg-hover border border-border-subtle text-xs font-semibold text-text-secondary px-5 py-2.5 rounded-badge backdrop-blur-md transition shadow-md inline-flex items-center gap-2"
            >
              <span>Built in 60 seconds with</span>
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-400 to-pink-400 font-mono tracking-tighter">
                PORTIVA
              </span>
            </a>
          </footer>
        )}
      </div>
    </PublicTemplateViewer>
  );
}
