/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Content Definition
 * =============================================================================
 *
 * Full e-commerce storefront redesign based on the reference design system:
 *   home    — hero (with 3 pastel category bento cards & partner ribbon),
 *             editorial bento ("Top Product Of The Month"), conscious styling
 *             philosophy & accordions, trust banner, favorite picks product grid,
 *             verified reviews carousel, and closing shopping CTA.
 *   shop    — full browsable catalog with search / filter / sort toolbar.
 *   product — conversion-focused product detail page + related products.
 *
 * Product-card data mapping (all fields optional in the contract, all values
 * remain editor-editable):
 *   eyebrow      → category
 *   title        → product name
 *   description  → one-line detail
 *   price        → current price
 *   meta         → compare-at price (struck through when present)
 *   status       → badge label ("Best Seller", "-20%", "New")
 *   metrics[0]   → rating value ("4.8")
 *   tags[0]      → review count text ("447 reviews")
 *   tags[1]      → sold count text ("1608 Sold")
 *   image        → primary product shot
 *   secondaryImage → alternate view revealed on hover
 */

import type {
  PremiumTemplateCard,
  PremiumTemplateDefinition,
} from '@/lib/template-contract';

const img = (key: string, src: string, alt: string) => ({ key, src, alt });

const UNSPLASH = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?q=80&w=${w}&auto=format&fit=crop`;

interface ProductSeed {
  id: string;
  category: string;
  name: string;
  detail: string;
  price: string;
  compareAt?: string;
  badge?: string;
  rating: string;
  reviews: string;
  soldCount?: string;
  imageId: string;
  hoverImageId?: string;
}

function product(seed: ProductSeed): PremiumTemplateCard {
  return {
    id: seed.id,
    eyebrow: seed.category,
    title: seed.name,
    description: seed.detail,
    price: seed.price,
    ...(seed.compareAt ? { meta: seed.compareAt } : {}),
    ...(seed.badge ? { status: seed.badge } : {}),
    metrics: [{ id: `${seed.id}-rating`, label: 'rating', value: seed.rating }],
    tags: [
      { id: `${seed.id}-reviews`, text: seed.reviews },
      ...(seed.soldCount ? [{ id: `${seed.id}-sold`, text: seed.soldCount }] : []),
    ],
    image: img(
      `meridian-${seed.id}`,
      UNSPLASH(seed.imageId),
      seed.name,
    ),
    ...(seed.hoverImageId
      ? {
          secondaryImage: img(
            `meridian-${seed.id}-alt`,
            UNSPLASH(seed.hoverImageId),
            `${seed.name} — alternate view`,
          ),
        }
      : {}),
  };
}

export const CATALOG: PremiumTemplateCard[] = [
  // ── Favorite Picks Collection ───────────────────────────────────────────
  product({
    id: 'towel-bucket-set',
    category: 'Home',
    name: 'Towel Bucket Set',
    detail: 'Plush organic honeycomb weave basket set.',
    price: '$26',
    compareAt: '$35',
    badge: 'Popular',
    rating: '4.8',
    reviews: '1,608 reviews',
    soldCount: '1608 Sold',
    imageId: 'photo-1616627547584-bf28cee262db',
    hoverImageId: 'photo-1584100936595-c0654b55a2e2',
  }),
  product({
    id: 'fashionable-cap',
    category: 'Accessories',
    name: 'Fashionable Cap',
    detail: 'Structured cotton canvas two-tone athletic cap.',
    price: '$36',
    badge: 'Best Seller',
    rating: '4.8',
    reviews: '2,230 reviews',
    soldCount: '2230 Sold',
    imageId: 'photo-1588850561407-ed78c282e89b',
    hoverImageId: 'photo-1575428652377-a2d80e2277fc',
  }),
  product({
    id: 'lime-headphone',
    category: 'Accessories',
    name: 'Headphone',
    detail: 'Wireless studio acoustic headphones with soft cushions.',
    price: '$26',
    compareAt: '$38',
    badge: '-30%',
    rating: '4.8',
    reviews: '979 reviews',
    soldCount: '979 Sold',
    imageId: 'photo-1505740420928-5e560c06d30e',
    hoverImageId: 'photo-1583394838336-acd977736f90',
  }),
  product({
    id: 'sash-jewellery',
    category: 'Women',
    name: 'Sash Worn Jewellery',
    detail: 'Artisan hand-dyed mulberry silk drape and brooch.',
    price: '$26',
    rating: '4.8',
    reviews: '1,522 reviews',
    soldCount: '1522 Sold',
    imageId: 'photo-1601924994987-69e26d50dc26',
    hoverImageId: 'photo-1535632066927-ab7c9ab60908',
  }),
  product({
    id: 'table-lamp',
    category: 'Home',
    name: 'Table Lamp',
    detail: 'Ceramic fluted pedestal table lamp with warm ambient glow.',
    price: '$26',
    compareAt: '$45',
    badge: 'New',
    rating: '4.8',
    reviews: '1,058 reviews',
    soldCount: '1058 Sold',
    imageId: 'photo-1507473885765-e6ed057f782c',
    hoverImageId: 'photo-1513506003901-1e6a229e2d15',
  }),
  product({
    id: 'children-headband',
    category: 'Women',
    name: 'Children Headband',
    detail: 'Soft organic floral knot headband with gentle stretch.',
    price: '$26',
    badge: 'Trending',
    rating: '4.8',
    reviews: '3,093 reviews',
    soldCount: '3093 Sold',
    imageId: 'photo-1535632066927-ab7c9ab60908',
    hoverImageId: 'photo-1601924994987-69e26d50dc26',
  }),
  product({
    id: 'brown-leather-shoe',
    category: 'Men',
    name: 'Brown Leather Shoe',
    detail: 'Hand-burnished Italian calfskin derby dress shoes.',
    price: '$26',
    compareAt: '$38',
    badge: '-15%',
    rating: '4.8',
    reviews: '777 reviews',
    soldCount: '777 Sold',
    imageId: 'photo-1533867617858-e7b97e060509',
    hoverImageId: 'photo-1549298916-b41d501d3772',
  }),
  product({
    id: 'pink-blouse',
    category: 'Women',
    name: 'Pink Blouse',
    detail: 'Pastel fleece collared pullover sweater with ribbed cuffs.',
    price: '$26',
    badge: 'Popular',
    rating: '4.8',
    reviews: '867 reviews',
    soldCount: '867 Sold',
    imageId: 'photo-1434389677669-e08b4cac3105',
    hoverImageId: 'photo-1515886657613-9f3515b0c78f',
  }),

  // ── Additional Catalog Items for Browsing ────────────────────────────────
  product({
    id: 'cozy-hoodie',
    category: 'Hoodie',
    name: 'Organic Relaxed Hoodie',
    detail: 'Heavyweight brushed organic cotton hoodie.',
    price: '$64',
    compareAt: '$85',
    badge: 'Staff Pick',
    rating: '4.9',
    reviews: '1,420 reviews',
    soldCount: '1420 Sold',
    imageId: 'photo-1556905055-8f358a7a47b2',
  }),
  product({
    id: 'woven-handbag',
    category: 'Bags',
    name: 'Azure Woven Handbag',
    detail: 'Upcycled ocean yarn structured shoulder handbag.',
    price: '$120',
    compareAt: '$145',
    badge: 'Top Pick',
    rating: '4.9',
    reviews: '850 reviews',
    soldCount: '850 Sold',
    imageId: 'photo-1584917865442-de89df76afd3',
  }),
  product({
    id: 'atlas-weekender',
    category: 'Bags',
    name: 'Atlas Weekender Bag',
    detail: 'Full-grain leather, sized for three-day trips.',
    price: '$248',
    compareAt: '$310',
    badge: '-20%',
    rating: '4.9',
    reviews: '212 reviews',
    soldCount: '212 Sold',
    imageId: 'photo-1553062407-98eeb64c6a62',
    hoverImageId: 'photo-1547949003-9792a18a2601',
  }),
  product({
    id: 'purple-sneakers',
    category: 'Footwear',
    name: 'Purple Knit Sneakers',
    detail: 'Engineered breathable knit athletic trainer with sculpted sole.',
    price: '$80',
    compareAt: '$105',
    badge: 'New',
    rating: '4.9',
    reviews: '620 reviews',
    soldCount: '620 Sold',
    imageId: 'photo-1542291026-7eec264c27ff',
  }),
];

export const socialEcommerceDefinition: PremiumTemplateDefinition = {
  brandName: 'Nest',
  categoryLabel: 'E-Commerce',
  navTagline: 'Sustainably Modern Goods',
  footerHeadline: 'Sustainably Stylish. Naturally You.',
  footerDescription:
    'Step into conscious fashion and considered everyday essentials crafted with sustainable materials and timeless design.',
  footerLinks: [
    { id: 'footer-shop', label: 'All Products', targetPageId: 'shop' },
    { id: 'footer-product', label: 'Featured Item', targetPageId: 'product' },
    { id: 'footer-home', label: 'Home', targetPageId: 'home' },
  ],
  pages: [
    // ─── HOME — Complete Reference Architecture ─────────────────────────────
    {
      id: 'home',
      label: 'Home',
      slug: '',
      description: 'Storefront landing — hero bento, monthly showcase, philosophy, trust, and favorite picks.',
      sections: [
        {
          type: 'hero',
          id: 'meridian-hero',
          eyebrow: 'Sustainably Crafted',
          title: 'Sustainably Stylish. Naturally You',
          description:
            'Fashion is part of the daily air and it changes all the time, with all the events.',
          primaryAction: {
            id: 'explore-products',
            label: 'Explore Products',
            targetPageId: 'shop',
          },
          secondaryAction: {
            id: 'browse-collection',
            label: 'Browse Collection',
            targetPageId: 'product',
          },
          stats: [
            {
              id: 'hero-card-1',
              label: 'Women',
              value: 'Pink Fashion',
            },
            {
              id: 'hero-card-2',
              label: 'Kids',
              value: 'Autumn Frock',
            },
            {
              id: 'hero-card-3',
              label: 'Footwear',
              value: 'Purple Sneakers',
            },
          ],
          media: img(
            'meridian-hero-women',
            UNSPLASH('photo-1515886657613-9f3515b0c78f', 800),
            'Fashion model holding bags in soft pink dress',
          ),
        },
        {
          type: 'cards',
          id: 'meridian-editorial-bento',
          eyebrow: 'Curated Merchandising',
          title: 'Top Product Of The Month',
          description:
            'Made from upcycled ocean plastic, this minimalist collection redefines functional and sustainable daily fashion.',
          style: 'product',
          items: [
            {
              id: 'bento-item-1',
              eyebrow: 'Tailoring',
              title: 'Pink Plaid Ensemble',
              description: 'Tailored pastel suit with matching structured carry.',
              price: '$66.00',
              image: img('meridian-bento-1', UNSPLASH('photo-1509631179647-0177331693ae', 800), 'Model in pink plaid suit with bag'),
            },
            {
              id: 'bento-item-2',
              eyebrow: 'Handbags',
              title: 'Woven Azure Tote',
              description: 'Textured woven artisan handbag.',
              price: '$120.00',
              image: img('meridian-bento-2', UNSPLASH('photo-1584917865442-de89df76afd3', 800), 'Blue woven handbag in sand setting'),
            },
            {
              id: 'bento-item-3',
              eyebrow: 'Outerwear',
              title: 'Canary Sun Jacket',
              description: 'Vibrant cropped casual outerwear.',
              price: '$56.00',
              image: img('meridian-bento-3', UNSPLASH('photo-1534528741775-53994a69daeb', 800), 'Woman in yellow jacket and sunglasses'),
            },
            {
              id: 'bento-item-4',
              eyebrow: 'Suits',
              title: 'Crimson Urban Blazer',
              description: 'Statement wool-blend tailored suit.',
              price: '$80.00',
              image: img('meridian-bento-4', UNSPLASH('photo-1506794778202-cad84cf45f1d', 800), 'Man in red tailored suit in colorful alley'),
            },
          ],
          primaryAction: {
            id: 'explore-edit',
            label: 'Explore Collection',
            targetPageId: 'shop',
          },
        },
        {
          type: 'story',
          id: 'meridian-philosophy',
          eyebrow: 'Our Philosophy',
          title: 'Conscious Looks, Daily Confidence',
          description:
            'Step into fashion that not only looks good but feels right. Every piece in our collection is made with love and thoughtful craftsmanship.',
          media: img(
            'meridian-philosophy-photo',
            UNSPLASH('photo-1617137984095-74e4e5e3613f', 1200),
            'Man in pastel pink suit with yellow tie against vibrant architectural backdrop',
          ),
          body: [
            {
              id: 'philosophy-1',
              text: 'Master outfit building and personal aesthetics with versatile layering essentials designed for effortless daily confidence.',
            },
            {
              id: 'philosophy-2',
              text: 'Learn sustainable branding, ethical supply chains, and transparent retail craftsmanship from industry artisans.',
            },
            {
              id: 'philosophy-3',
              text: 'Design with purpose and planet in mind, utilizing circular regenerative organic fibers and zero-waste patterns.',
            },
          ],
          points: [
            { id: 'pt-1', text: 'Styling Basics' },
            { id: 'pt-2', text: 'Fashion Business' },
            { id: 'pt-3', text: 'Sustainable Fashion' },
          ],
        },
        {
          type: 'cards',
          id: 'meridian-why-shop',
          eyebrow: 'Guaranteed Peace of Mind',
          title: 'Shop With Complete Confidence',
          description:
            'Every purchase is backed by flexible payment options, effortless 30-day returns, and around-the-clock customer support.',
          style: 'product',
          items: [
            {
              id: 'trust-payment',
              eyebrow: 'Flexible Checkout',
              title: 'Payment Method',
              description: 'We offer flexible payment options, to make checkout seamless and secure.',
            },
            {
              id: 'trust-returns',
              eyebrow: 'Hassle-Free',
              title: 'Return policy',
              description: 'You can return any product within 30 days for an instant full refund.',
            },
            {
              id: 'trust-support',
              eyebrow: 'Always Here',
              title: 'Customer Support',
              description: 'Our friendly customer support team is available 24/7 to assist you.',
            },
          ],
        },
        {
          type: 'cards',
          id: 'meridian-featured-products',
          eyebrow: 'Curated Catalog',
          title: 'Favorite Picks',
          description:
            'Step into fashion that not only looks good but feels right. Every piece in our collection is made with love.',
          style: 'product',
          items: CATALOG.slice(0, 8),
          primaryAction: {
            id: 'shop-all-products',
            label: 'Explore All Products',
            targetPageId: 'shop',
          },
        },
        {
          type: 'testimonials',
          id: 'meridian-reviews',
          eyebrow: 'Verified Community',
          title: 'Loved By Thousands Worldwide',
          description:
            'Real reviews from real buyers. See what customers have to say about their experience with Nest.',
          communityBadge: 'Verified purchases only',
          communityLine1: '15,000+ verified reviews',
          communityLine2: 'across 28 countries',
          stats: [
            { id: 'review-stat-average', label: 'Average rating', value: '4.8' },
            { id: 'review-stat-count', label: 'Verified reviews', value: '15k+', suffix: '' },
            { id: 'review-stat-reorder', label: 'Customer retention', value: '94%' },
          ],
          items: [
            {
              id: 'review-thomas',
              quote:
                'Amazing shopping experience! The website is easy to navigate, and checkout was super. Order arrived earlier than expected and was beautifully packaged! Highly recommend this store for quality and service!',
              name: 'Thomas R.',
              role: 'Australia · Verified Buyer',
              tag: 'Verified purchase',
              year: '2026',
              image: img('meridian-avatar-thomas', UNSPLASH('photo-1507003211169-0a1dd7228f2d', 300), 'Thomas R.'),
            },
            {
              id: 'review-rebeka',
              quote:
                'The product quality is outstanding! I’ve ordered a few eco-friendly clothing items, and they’re exactly as described. Comfortable, stylish, and sustainable—what more could I ask for? Will definitely shop again.',
              name: 'Rebeka Yasmin',
              role: 'UAE · Verified Buyer',
              tag: 'Verified purchase',
              year: '2026',
              image: img('meridian-avatar-rebeka', UNSPLASH('photo-1494790108377-be9c29b29330', 300), 'Rebeka Yasmin'),
            },
            {
              id: 'review-adam',
              quote:
                'Great variety of products and exceptional craftsmanship. The fabrics feel luxurious and hold up beautifully in daily wear. Customer support was also wonderfully helpful when I needed size advice!',
              name: 'Adam Ward',
              role: 'New York · Verified Buyer',
              tag: 'Verified purchase',
              year: '2026',
              image: img('meridian-avatar-adam', UNSPLASH('photo-1500648767791-00dcc994a43e', 300), 'Adam Ward'),
            },
          ],
        },
        {
          type: 'cta',
          id: 'meridian-final-cta',
          eyebrow: 'Join the Movement',
          title: 'Start With What You Will Love Every Day',
          description:
            'Best sellers ship within 24 hours. Enjoy free carbon-neutral shipping on orders over $75 and 30-day effortless returns.',
          primaryAction: {
            id: 'final-shop-now',
            label: 'Start Shopping',
            targetPageId: 'shop',
          },
          secondaryAction: {
            id: 'final-discover',
            label: 'Explore Best Sellers',
            targetPageId: 'product',
          },
          media: img(
            'meridian-final-cta-image',
            UNSPLASH('photo-1483985988355-763728e1935b', 1200),
            'Customer carrying shopping bags in warm sunset city light',
          ),
        },
      ],
    },

    // ─── SHOP — Full Browsable Catalog ──────────────────────────────────────
    {
      id: 'shop',
      label: 'Shop',
      slug: 'shop',
      description: 'Browse the full catalog with live search, category filter pills, and sorting.',
      sections: [
        {
          type: 'cards',
          id: 'meridian-shop-catalog',
          eyebrow: 'All Products',
          title: 'Explore Our Catalog',
          description:
            'Every sustainably made product in our collection, ready to ship within 24 hours. Filter by category or search below.',
          style: 'product',
          items: CATALOG,
        },
      ],
    },

    // ─── PRODUCT — High Conversion PDP ──────────────────────────────────────
    {
      id: 'product',
      label: 'Product',
      slug: 'product',
      description: 'Product detail — interactive gallery, options, rating, and related picks.',
      sections: [
        {
          type: 'detail',
          id: 'meridian-product-detail',
          eyebrow: 'Home & Living · Best Seller',
          title: 'Towel Bucket Set',
          description:
            'Plush honeycomb-weave towels woven from 100% certified organic long-staple Turkish cotton. Highly absorbent, fast-drying, and beautifully packaged in a handmade storage basket.',
          productMeta: {
            price: '$26',
            compareAt: '$35',
            badge: 'Best Seller',
            rating: '4.8',
            reviewCount: '1,608 reviews',
          },
          highlights: [
            { id: 'highlight-fabric', text: '100% GOTS-certified organic long-staple Turkish cotton' },
            { id: 'highlight-weight', text: 'Ultra-absorbent 650 GSM honeycomb waffle weave' },
            { id: 'highlight-storage', text: 'Includes handwoven natural reed storage basket' },
            { id: 'highlight-dyes', text: 'Oeko-Tex Standard 100 certified non-toxic botanical dyes' },
          ],
          specs: [
            { id: 'spec-material', label: 'Material', value: '100% Organic Cotton' },
            { id: 'spec-weight', label: 'Density', value: '650 GSM Plush' },
            { id: 'spec-includes', label: 'Set Includes', value: '2 Bath, 2 Hand, 2 Face Towels + Basket' },
            { id: 'spec-care', label: 'Care', value: 'Machine wash warm, tumble dry low' },
            { id: 'spec-origin', label: 'Crafted In', value: 'Denizli, Turkey' },
            { id: 'spec-warranty', label: 'Guarantee', value: '30-day money-back guarantee' },
          ],
          options: [
            {
              id: 'option-color',
              label: 'Colorway',
              values: [
                { id: 'color-butter', value: 'Warm Honey' },
                { id: 'color-blush', value: 'Soft Terracotta' },
                { id: 'color-oat', value: 'Natural Oat' },
              ],
            },
          ],
          media: img(
            'meridian-pdp-main',
            UNSPLASH('photo-1616627547584-bf28cee262db', 1200),
            'Towel Bucket Set with warm folded towels in a basket',
          ),
          gallery: [
            img(
              'meridian-pdp-view-2',
              UNSPLASH('photo-1584100936595-c0654b55a2e2', 800),
              'Close-up texture of organic honeycomb waffle towel',
            ),
            img(
              'meridian-pdp-view-3',
              UNSPLASH('photo-1507473885765-e6ed057f782c', 800),
              'Ceramic table lamp and towel styling in bathroom setting',
            ),
            img(
              'meridian-pdp-view-4',
              UNSPLASH('photo-1434389677669-e08b4cac3105', 800),
              'Neatly stacked pastel folded cotton essentials',
            ),
          ],
          primaryAction: {
            id: 'pdp-add-to-cart',
            label: 'Add to Cart',
          },
          secondaryAction: {
            id: 'pdp-buy-now',
            label: 'Buy Now',
          },
        },
        {
          type: 'cards',
          id: 'meridian-related-products',
          eyebrow: 'Complete the Collection',
          title: 'Frequently Bought Together',
          description: 'Complementary everyday essentials curated by our stylists.',
          style: 'product',
          items: [
            CATALOG[1], // fashionable-cap
            CATALOG[2], // lime-headphone
            CATALOG[4], // table-lamp
            CATALOG[7], // pink-blouse
          ],
        },
      ],
    },
  ],
};
