/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Product View Model Helpers
 * =============================================================================
 *
 * Maps contract `cards` items onto a storefront-friendly view model using the
 * documented field mapping (see definition.ts header). Values stay verbatim
 * strings so every label remains editor-editable; only prices are parsed for
 * cart arithmetic.
 */

import type { PremiumTemplateCard } from '@/lib/template-contract';

export interface MeridianProduct {
  id: string;
  category: string;
  name: string;
  detail: string;
  price: string;
  compareAt?: string;
  badge?: string;
  rating?: string;
  reviews?: string;
  soldCount?: string;
  imageSrc?: string;
  imageAlt?: string;
  hoverImageSrc?: string;
}

export function toMeridianProduct(item: PremiumTemplateCard): MeridianProduct {
  return {
    id: item.id,
    category: item.eyebrow ?? '',
    name: item.title,
    detail: item.description,
    price: item.price ?? '',
    ...(item.meta ? { compareAt: item.meta } : {}),
    ...(item.status ? { badge: item.status } : {}),
    ...(item.metrics && item.metrics.length > 0 ? { rating: item.metrics[0].value } : {}),
    ...(item.tags && item.tags.length > 0 ? { reviews: item.tags[0].text } : {}),
    ...(item.tags && item.tags.length > 1 ? { soldCount: item.tags[1].text } : {}),
    ...(item.image ? { imageSrc: item.image.src, imageAlt: item.image.alt } : {}),
    ...(item.secondaryImage ? { hoverImageSrc: item.secondaryImage.src } : {}),
  };
}
