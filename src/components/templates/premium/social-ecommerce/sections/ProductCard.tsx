'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Reference 3 Product Card
 * =============================================================================
 *
 * Direct translation of Reference Image 3 (Favorite Picks card):
 * - Light neutral background (#F5F6F8), rounded-2xl
 * - Top row: Amber Star rating (★ 4.8) + Interactive Wishlist Heart (♡ / ❤️)
 * - Clean centered product photography
 * - Product title on left, bold price on right
 * - Full-width outlined pill button ("Add To Cart 🛍️")
 * - Micro subtext: "1608 Sold" / "2230 Sold"
 * - 100% builder editable
 */

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Heart, ShoppingBag, Star } from 'lucide-react';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableImage } from '@/components/engine/EditableImage';
import { buildHref } from '@/components/templates/shared/premium-runtime';
import type {
  PremiumRenderMode,
  PremiumTemplateCard,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';
import { parsePrice, useMeridianCart } from './cart';
import { toMeridianProduct } from './products';

export interface ProductCardProps {
  item: PremiumTemplateCard;
  sectionId: string;
  definition: PremiumTemplateDefinition;
  handle?: string;
  templateId?: string;
  mode: PremiumRenderMode;
  onNavigate?: (pageId: string) => void;
  productPageId?: string;
  compact?: boolean;
}

export function ProductCard({
  item,
  sectionId,
  definition,
  handle,
  templateId,
  mode,
  onNavigate,
  productPageId = 'product',
  compact = false,
}: ProductCardProps) {
  const product = toMeridianProduct(item);
  const cart = useMeridianCart();
  const [justAdded, setJustAdded] = useState(false);
  const feedbackTimer = useRef<number | null>(null);

  const detailPage = definition.pages.find((page) => page.id === productPageId);
  const detailHref =
    detailPage && handle
      ? buildHref({ targetPageId: detailPage.id }, definition, handle, templateId)
      : '#';

  const handleDetailNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate || mode !== 'builder') return;
    event.preventDefault();
    onNavigate(detailPage?.id ?? 'product');
  };

  const handleAddToCart = () => {
    cart.addItem({
      id: product.id,
      name: product.name,
      price: parsePrice(product.price),
      ...(product.imageSrc ? { image: product.imageSrc } : {}),
    });
    setJustAdded(true);
    if (feedbackTimer.current !== null) window.clearTimeout(feedbackTimer.current);
    feedbackTimer.current = window.setTimeout(() => setJustAdded(false), 1600);
  };

  const isFavorited = cart.isWishlisted(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    cart.toggleWishlist(product.id);
  };

  return (
    <article className="group flex h-full flex-col transition-all duration-300 ease-out hover:-translate-y-1">
      {/* ── Top Photo & Badges Box ────────────────────────────────────── */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[28px] bg-[#F5F6F8] p-4 sm:p-5 flex flex-col justify-between shadow-2xs">
        
        {/* Top Badges: Rating on Left, Heart on Right */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            <EditableElement
              as="span"
              id={`${sectionId}-${item.id}-rating`}
              field="value"
              value={product.rating ?? '4.8'}
              className="text-xs font-bold text-[#12151C]"
            />
          </div>

          <button
            type="button"
            onClick={handleWishlistToggle}
            aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#12151C]/70 transition-transform duration-200 hover:scale-110 active:scale-90"
          >
            <Heart
              className={`h-4 w-4 ${
                isFavorited
                  ? 'fill-[#E84E38] text-[#E84E38]'
                  : 'text-[#12151C]/80 group-hover:text-[#12151C]'
              }`}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* Product Image (Centered Cutout) */}
        <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-8 pointer-events-none">
          {product.imageSrc ? (
            <EditableImage
              imageKey={item.image?.key ?? `meridian-${item.id}`}
              defaultSrc={product.imageSrc}
              defaultAlt={product.imageAlt ?? product.name}
              containerClassName="h-full w-full flex items-center justify-center"
              className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-[#EBECEF] rounded-lg" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* ── Product Info & Actions ────────────────────────────────────── */}
      <div className="flex flex-col pt-3.5">
        {/* Title & Price Row */}
        <div className="flex items-baseline justify-between gap-2">
          <EditableElement
            as="a"
            id={`${sectionId}-${item.id}-name`}
            field="value"
            value={product.name}
            href={detailHref}
            onClick={handleDetailNavigation}
            className="truncate text-xs font-bold text-[#12151C] transition-colors hover:text-[#E86343] sm:text-sm"
          />
          <EditableElement
            as="span"
            id={`${sectionId}-${item.id}-price`}
            field="value"
            value={product.price}
            className="text-xs font-bold text-[#12151C] sm:text-sm"
          />
        </div>

        {/* Full-width Outlined Add to Cart Pill Button */}
        <div className="mt-3 relative">
          <EditableButton
            buttonKey={`meridian-add-${sectionId}-${item.id}`}
            defaultText="Add To Cart"
            onViewClick={handleAddToCart}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D1D5DB] bg-transparent py-2 text-[11px] font-medium text-[#12151C] transition-all duration-200 hover:border-[#12151C] hover:bg-[#12151C] hover:text-white active:scale-[0.98] sm:text-xs"
            contentClassName="inline-flex items-center gap-1.5 font-medium"
            trailingIcon={<ShoppingBag className="h-3.5 w-3.5" />}
          />
          <AnimatePresence>
            {justAdded ? (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
                className="absolute -right-1 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#E84E38] text-white shadow-xs"
              >
                <Check className="h-3 w-3" strokeWidth={2.5} />
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Sold count subtext */}
        <div className="mt-1 text-center">
          <EditableElement
            as="span"
            id={`${sectionId}-${item.id}-sold`}
            field="value"
            value={product.soldCount ?? '1608 Sold'}
            className="text-[10px] font-normal text-[#9CA3AF] sm:text-[11px]"
          />
        </div>
      </div>
    </article>
  );
}

