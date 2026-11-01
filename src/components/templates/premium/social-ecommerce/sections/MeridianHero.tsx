'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro - Reference Hero
 * =============================================================================
 *
 * Pixel-perfect reproduction of the reference Nest storefront hero section:
 * - Headline typography ("Sustainably Stylish. Naturally You") with inline pill CTA.
 * - Customer review stack and editorial quote with horizontal accent rule.
 * - Three pastel category bento cards with frosted floating purchase rails.
 * - High-fidelity partner logo ribbon across the base.
 */

import { motion } from 'framer-motion';
import { EditableButton } from '@/components/engine/EditableButton';
import { EditableElement } from '@/components/engine/EditableElement';
import { EditableImage } from '@/components/engine/EditableImage';
import { useVisualBuilder } from '@/components/engine/VisualBuilderContext';
import type {
  PremiumRenderMode,
  PremiumTemplateDefinition,
  PremiumTemplateSection,
} from '@/lib/template-contract';
import { parsePrice, useMeridianCart } from './cart';
import styles from './MeridianLanding.module.css';

interface MeridianHeroProps {
  section: Extract<PremiumTemplateSection, { type: 'hero' }>;
  definition: PremiumTemplateDefinition;
  mode: PremiumRenderMode;
  handle?: string;
  templateId?: string;
  onNavigate?: (pageId: string) => void;
  reducedMotion: boolean;
}

interface HeroCard {
  id: string;
  tag: string;
  title: string;
  price: string;
  cardClassName: string;
  imageKey: string;
  imageSrc: string;
  imageAlt: string;
  imageContainerClassName: string;
  imageClassName: string;
}

function BasketIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10h16l-1.5 9.5a2 2 0 0 1-2 1.5H7.5a2 2 0 0 1-2-1.5L4 10Z" />
      <path d="m9 10 3-6 3 6" />
      <path d="M10 14v4M14 14v4" />
    </svg>
  );
}

const REVIEWERS = [
  {
    key: 'meridian-reviewer-one',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop',
    alt: 'Customer avatar 1',
  },
  {
    key: 'meridian-reviewer-two',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop',
    alt: 'Customer avatar 2',
  },
  {
    key: 'meridian-reviewer-three',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop',
    alt: 'Customer avatar 3',
  },
] as const;

const PARTNER_MARKS = [
  {
    id: 'graphic-studio',
    labelLine1: 'GRAPHIC',
    labelLine2: 'STUDIO',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-9 w-9" aria-hidden="true">
        {/* Faceted geometric icosahedron / multifaceted hexagon */}
        <polygon points="20,3 36,12 36,28 20,37 4,28 4,12" />
        <line x1="20" y1="3" x2="20" y2="37" />
        <line x1="4" y1="12" x2="36" y2="28" />
        <line x1="4" y1="28" x2="36" y2="12" />
        <line x1="20" y1="3" x2="4" y2="28" />
        <line x1="20" y1="3" x2="36" y2="28" />
        <line x1="20" y1="37" x2="4" y2="12" />
        <line x1="20" y1="37" x2="36" y2="12" />
      </svg>
    ),
  },
  {
    id: 'salva-art',
    labelLine1: 'S. SALVA',
    labelLine2: 'ART DIRECTOR',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-9 w-9" aria-hidden="true">
        <circle cx="20" cy="20" r="17" />
        <line x1="8" y1="32" x2="32" y2="8" strokeWidth="1.2" />
        <text x="13" y="19" fill="currentColor" stroke="none" fontSize="8.5" fontWeight="bold" fontFamily="serif" textAnchor="middle">S</text>
        <text x="27" y="31" fill="currentColor" stroke="none" fontSize="8.5" fontWeight="bold" fontFamily="serif" textAnchor="middle">A</text>
      </svg>
    ),
  },
  {
    id: 'golden-studio',
    labelLine1: 'GOLDEN',
    labelLine2: 'STUDIO',
    icon: (
      <svg viewBox="0 0 84 40" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-9 w-20" aria-hidden="true">
        {/* Hexagonal studio seal */}
        <polygon points="12,4 72,4 82,20 72,36 12,36 2,20" />
        <polygon points="15,8 69,8 77,20 69,32 15,32 7,20" strokeWidth="0.8" />
        <line x1="18" y1="12" x2="66" y2="12" strokeWidth="0.75" />
        <line x1="18" y1="28" x2="66" y2="28" strokeWidth="0.75" />
        <path d="M28 17h28M28 23h28" />
      </svg>
    ),
  },
  {
    id: 'furniture-design',
    labelLine1: 'FURNITURE',
    labelLine2: 'DESIGN',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-9 w-9" aria-hidden="true">
        {/* Isometric 3D slatted cube */}
        <path d="M20 4 L36 13 L20 22 L4 13 Z" />
        <path d="M4 13 L4 27 L20 36 L20 22 Z" />
        <path d="M36 13 L36 27 L20 36 L20 22 Z" />
        <line x1="4" y1="16.5" x2="20" y2="25.5" strokeWidth="0.9" />
        <line x1="4" y1="20" x2="20" y2="29" strokeWidth="0.9" />
        <line x1="4" y1="23.5" x2="20" y2="32.5" strokeWidth="0.9" />
        <line x1="20" y1="25.5" x2="36" y2="16.5" strokeWidth="0.9" />
        <line x1="20" y1="29" x2="36" y2="20" strokeWidth="0.9" />
        <line x1="20" y1="32.5" x2="36" y2="23.5" strokeWidth="0.9" />
      </svg>
    ),
  },
  {
    id: 'travel-lookbook',
    labelLine1: 'TRAVEL',
    labelLine2: 'LOOKBOOK',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-9 w-9" aria-hidden="true">
        {/* 8-pointed diamond star seal with letter T */}
        <polygon points="20,2 25,12 36,8 30,19 38,28 27,27 20,38 13,27 2,28 10,19 4,8 15,12" />
        <circle cx="20" cy="20" r="10" strokeWidth="0.9" />
        <text x="20" y="24" fill="currentColor" stroke="none" fontSize="11" fontWeight="bold" fontFamily="serif" textAnchor="middle">T</text>
      </svg>
    ),
  },
] as const;

function splitCardTitle(value: string): [string, string] {
  const [firstWord, ...remainingWords] = value.trim().split(/\s+/);
  return [firstWord || value, remainingWords.join(' ')];
}

export function MeridianHero({
  section,
  definition,
  mode,
  handle,
  templateId,
  onNavigate,
  reducedMotion,
}: MeridianHeroProps) {
  const cart = useMeridianCart();
  const { templateData, getMediaOverride } = useVisualBuilder();
  const textOverrides = (templateData as { textOverrides?: Record<string, string> }).textOverrides;

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
      if (!pageId || mode !== 'builder') return;
      event.preventDefault();
      onNavigate?.(pageId);
    };

  const reveal = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: false as const,
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const cards: HeroCard[] = [
    {
      id: 'one',
      tag: section.stats?.[0]?.label || 'Women',
      title: section.stats?.[0]?.value || 'Pink Fashion',
      price: '$42.00',
      cardClassName: styles.cardPink,
      imageKey: section.media?.key || 'meridian-hero-card-one',
      imageSrc:
        section.media?.src ||
        'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop',
      imageAlt: section.media?.alt || 'Fashion model in a soft pink outfit',
      imageContainerClassName: styles.modelImage,
      imageClassName: styles.modelImageElement,
    },
    {
      id: 'two',
      tag: section.stats?.[1]?.label || 'Chocolates',
      title: section.stats?.[1]?.value || 'Autumn Frock',
      price: '$56.00',
      cardClassName: styles.cardLime,
      imageKey: 'meridian-hero-card-two',
      imageSrc:
        'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=800&auto=format&fit=crop',
      imageAlt: 'Child in a bright yellow autumn outfit',
      imageContainerClassName: styles.modelImage,
      imageClassName: styles.modelImageElement,
    },
    {
      id: 'three',
      tag: section.stats?.[2]?.label || 'Shoe',
      title: section.stats?.[2]?.value || 'Purple Sneakers',
      price: '$80.00',
      cardClassName: styles.cardLilac,
      imageKey: 'meridian-hero-card-three',
      imageSrc:
        'https://pngimg.com/uploads/running_shoes/running_shoes_PNG5816.png',
      imageAlt: 'Sculpted athletic sneaker',
      imageContainerClassName: styles.shoeImage,
      imageClassName: styles.shoeImageElement,
    },
  ];

  const headlineWords = section.title.trim().split(/\s+/);
  const headlineFirstLine = headlineWords[0] || 'Sustainably';
  const headlineLastLine = headlineWords.length > 1 ? headlineWords.at(-1) || '' : '';
  const headlineSecondLine = headlineWords.length > 2 ? headlineWords.slice(1, -1).join(' ') : '';
  const accessibleHeadlineLastLine =
    textOverrides?.[`${section.id}-headline-word-3-value`] ?? headlineLastLine;

  const addCardToCart = (card: HeroCard) => {
    if (mode === 'builder') return;
    const [defaultFirstLine, defaultSecondLine] = splitCardTitle(card.title);
    const titleFirstLine =
      textOverrides?.[`${section.id}-card-${card.id}-title-one-value`] ??
      defaultFirstLine;
    const titleSecondLine =
      textOverrides?.[`${section.id}-card-${card.id}-title-two-value`] ??
      defaultSecondLine;
    const price =
      textOverrides?.[`${section.id}-card-${card.id}-price-value`] ?? card.price;
    const image = getMediaOverride(card.imageKey)?.src || card.imageSrc;

    cart.addItem({
      id: `hero-${card.id}`,
      name: [titleFirstLine, titleSecondLine].filter(Boolean).join(' '),
      price: parsePrice(price),
      image,
    });
    cart.openCart();
  };

  return (
    <EditableElement
      as="section"
      id={section.id}
      field="background"
      value=""
      type="section"
      className={styles.hero}
    >
      <div className={styles.heroFrame}>
        {/* ── Top Row: Headline (Left) & Social Proof / Quote (Right) ───── */}
        <div className={styles.heroTop}>
          {/* Left: Editorial Headline & Inline Pill CTA */}
          <motion.div {...reveal(0)} className={styles.headlineBlock}>
            <h1 className={styles.headline}>
              <EditableElement
                as="span"
                id={`${section.id}-headline-word-1`}
                field="value"
                value={headlineFirstLine}
                className={styles.headlineLight}
              />
              <EditableElement
                as="span"
                id={`${section.id}-headline-word-2`}
                field="value"
                value={headlineSecondLine}
                className={styles.headlineBold}
              />
              <span className={styles.visuallyHidden}> {accessibleHeadlineLastLine}</span>
            </h1>

            {/* Third Line: "You" + "Explore Products" Button */}
            <div className={styles.headlineLastRow}>
              <span aria-hidden="true" className={styles.headlineLastWrap}>
                <EditableElement
                  as="span"
                  id={`${section.id}-headline-word-3`}
                  field="value"
                  value={headlineLastLine}
                  className={styles.headlineLast}
                />
              </span>
              {section.primaryAction ? (
                <EditableButton
                  buttonKey={`${section.id}-${section.primaryAction.id}`}
                  defaultText={section.primaryAction.label}
                  defaultHref={buildPageHref(section.primaryAction.targetPageId)}
                  onViewClick={handleActionNavigation(section.primaryAction.targetPageId)}
                  className={styles.heroCta}
                  contentClassName={styles.heroCtaContent}
                />
              ) : null}
            </div>
          </motion.div>

          {/* Right: Reviewers Avatar Stack & Editorial Statement */}
          <motion.aside {...reveal(0.12)} className={styles.reviewAside} aria-label="Customer reviews">
            <div>
              {/* Overlapping Avatars + 15K++ Positive Reviews */}
              <div className={styles.reviewTop}>
                <div className={styles.reviewAvatars} aria-hidden="true">
                  {REVIEWERS.map((reviewer) => (
                    <EditableImage
                      key={reviewer.key}
                      imageKey={reviewer.key}
                      defaultSrc={reviewer.src}
                      defaultAlt={reviewer.alt}
                      containerClassName={styles.reviewAvatar}
                      className={styles.reviewAvatarImage}
                    />
                  ))}
                </div>
                <EditableElement
                  as="span"
                  id={`${section.id}-social-proof-count`}
                  field="value"
                  value="15K++ Positive Reviews"
                  className={styles.reviewCount}
                />
              </div>

              {/* Horizontal Line Accent + Description Quote */}
              <div className={styles.reviewQuote}>
                <span className={styles.reviewRule} aria-hidden="true" />
                <EditableElement
                  as="p"
                  id={`${section.id}-description`}
                  field="value"
                  value={section.description || 'Fashion is part of the daily air and it changes all the time, with all the events.'}
                  className={styles.reviewText}
                />
              </div>
            </div>
          </motion.aside>
        </div>

        {/* ── Middle: Three Pastel Product Bento Cards ──────────────────── */}
        <div className={styles.cardsGrid}>
          {cards.map((card, index) => {
            const [titleFirstLine, titleSecondLine] = splitCardTitle(card.title);
            const accessibleCardTitle = [
              textOverrides?.[`${section.id}-card-${card.id}-title-one-value`] ?? titleFirstLine,
              textOverrides?.[`${section.id}-card-${card.id}-title-two-value`] ?? titleSecondLine,
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <motion.div
                key={card.id}
                {...reveal(0.18 + index * 0.06)}
                className={styles.cardMotion}
              >
                <EditableElement
                  as="article"
                  id={`${section.id}-card-${card.id}`}
                  field="background"
                  value=""
                  type="container"
                  className={`${styles.productCard} ${card.cardClassName}`}
                >
                  {/* Top Left: Category Pill & Two-Line Title */}
                  <div className={styles.cardCopy}>
                    <EditableElement
                      as="span"
                      id={`${section.id}-card-${card.id}-tag`}
                      field="value"
                      value={card.tag}
                      className={styles.cardTag}
                    />
                    <h2 className={styles.cardTitle}>
                      <EditableElement
                        as="span"
                        id={`${section.id}-card-${card.id}-title-one`}
                        field="value"
                        value={titleFirstLine}
                        className={styles.cardTitleLine}
                      />
                      <EditableElement
                        as="span"
                        id={`${section.id}-card-${card.id}-title-two`}
                        field="value"
                        value={titleSecondLine}
                        className={styles.cardTitleLine}
                      />
                    </h2>
                  </div>

                  {/* Card Main Image */}
                  <EditableImage
                    imageKey={card.imageKey}
                    defaultSrc={card.imageSrc}
                    defaultAlt={card.imageAlt}
                    containerClassName={card.imageContainerClassName}
                    className={card.imageClassName}
                    objectFit={card.id === 'three' ? 'contain' : 'cover'}
                  />

                  {/* Bottom: Floating Frosted Purchase Rail */}
                  <div className={styles.purchaseRail}>
                    <EditableElement
                      as="span"
                      id={`${section.id}-card-${card.id}-price`}
                      field="value"
                      value={card.price}
                      className={styles.price}
                    />
                    <EditableButton
                      buttonKey={`${section.id}-card-${card.id}-cart`}
                      defaultText={`Add ${card.title} to cart`}
                      onViewClick={() => addCardToCart(card)}
                      className={styles.cartButton}
                    >
                      <BasketIcon className={styles.basketIcon} />
                      <span className={styles.visuallyHidden}>Add {accessibleCardTitle} to cart</span>
                    </EditableButton>
                  </div>
                </EditableElement>
              </motion.div>
            );
          })}
        </div>

        {/* ── Bottom: Partner Marks Ribbon ──────────────────────────────── */}
        <motion.div
          {...reveal(0.36)}
          className={styles.partners}
        >
          <div className={styles.partnerGrid}>
            {PARTNER_MARKS.map((partner) => (
              <div
                key={partner.id}
                className={styles.partner}
              >
                <span className={`${styles.partnerIcon} ${partner.id === 'golden-studio' ? styles.partnerWideIcon : ''}`}>
                  {partner.icon}
                </span>
                {partner.labelLine1 ? (
                  <div className={styles.partnerCopy}>
                    <EditableElement
                      as="span"
                      id={`${section.id}-partner-${partner.id}-1`}
                      field="value"
                      value={partner.labelLine1}
                      className={styles.partnerName}
                    />
                    <EditableElement
                      as="span"
                      id={`${section.id}-partner-${partner.id}-2`}
                      field="value"
                      value={partner.labelLine2}
                      className={styles.partnerMeta}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </EditableElement>
  );
}
