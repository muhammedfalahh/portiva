'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro - Reference Hero
 * =============================================================================
 *
 * Reproduces the supplied Nest storefront composition: a restrained editorial
 * statement, compact social proof, three pastel product cards with frosted
 * purchase rails, and a monochrome partner strip. All customer-facing copy,
 * card surfaces, images, and actions remain available to the visual builder.
 */

import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
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
  surfaceClassName: string;
  imageKey: string;
  imageSrc: string;
  imageAlt: string;
  imageContainerClassName: string;
  imageClassName: string;
}

const REVIEWERS = [
  {
    key: 'meridian-reviewer-one',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop',
    alt: 'Meridian customer portrait',
  },
  {
    key: 'meridian-reviewer-two',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=160&auto=format&fit=crop',
    alt: 'Meridian customer portrait',
  },
  {
    key: 'meridian-reviewer-three',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=160&auto=format&fit=crop',
    alt: 'Meridian customer portrait',
  },
] as const;

const PARTNER_MARKS = [
  {
    id: 'graphic-studio',
    label: 'Graphic Studio',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="m18 2 14 8v16l-14 8L4 26V10L18 2Z" />
        <path d="m18 2 8 14-8 18-8-18L18 2Zm-14 8 14 6 14-6M4 26l14-10 14 10" />
      </svg>
    ),
  },
  {
    id: 'salva-art',
    label: 'S. Salva Art Director',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <circle cx="18" cy="18" r="15" />
        <path d="M8 9c8 5 12 13 20 18M28 9c-8 5-12 13-20 18M5 18h26" />
      </svg>
    ),
  },
  {
    id: 'golden-studio',
    label: 'Golden Studio',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="M5 10 18 3l13 7v17l-13 6-13-6V10Z" />
        <path d="M9 14h18v10H9zM12 11h12M12 27h12" />
      </svg>
    ),
  },
  {
    id: 'furniture-design',
    label: 'Furniture Design',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="m18 3 13 8v14l-13 8-13-8V11l13-8Z" />
        <path d="m5 11 13 8 13-8M18 19v14M9 14v14M27 14v14" />
      </svg>
    ),
  },
  {
    id: 'travel-lookbook',
    label: 'Travel Lookbook',
    icon: (
      <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true">
        <path d="m18 2 6 5 8 3 2 8-2 8-8 3-6 5-6-5-8-3-2-8 2-8 8-3 6-5Z" />
        <path d="M13 12h10M18 12v13" />
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
      if (!pageId || !onNavigate || mode !== 'builder') return;
      event.preventDefault();
      onNavigate(pageId);
    };

  const reveal = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const cards: HeroCard[] = [
    {
      id: 'one',
      tag: section.stats?.[0]?.label || 'Women',
      title: section.stats?.[0]?.value || 'Pink Fashion',
      price: '$42.00',
      surfaceClassName: 'bg-pink-50',
      imageKey: section.media?.key || 'meridian-hero-card-one',
      imageSrc:
        section.media?.src ||
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
      imageAlt: section.media?.alt || 'Fashion model in a soft pink outfit',
      imageContainerClassName:
        'absolute inset-y-0 right-0 w-[78%] [mask-image:linear-gradient(to_right,transparent_0%,black_24%)]',
      imageClassName:
        'object-cover object-[58%_center] mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.025]',
    },
    {
      id: 'two',
      tag: section.stats?.[1]?.label || 'Kids',
      title: section.stats?.[1]?.value || 'Autumn Frock',
      price: '$56.00',
      surfaceClassName: 'bg-lime-100',
      imageKey: 'meridian-hero-card-two',
      imageSrc:
        'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?q=80&w=800&auto=format&fit=crop',
      imageAlt: 'Child in a bright yellow autumn outfit',
      imageContainerClassName:
        'absolute inset-y-0 right-0 w-[78%] [mask-image:linear-gradient(to_right,transparent_0%,black_22%)]',
      imageClassName:
        'object-cover object-[55%_center] mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.025]',
    },
    {
      id: 'three',
      tag: section.stats?.[2]?.label || 'Shoe',
      title: section.stats?.[2]?.value || 'Purple Sneakers',
      price: '$80.00',
      surfaceClassName: 'bg-violet-100',
      imageKey: 'meridian-hero-card-three',
      imageSrc:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop',
      imageAlt: 'Sculpted athletic sneaker',
      imageContainerClassName: 'absolute right-[-7%] top-[17%] h-[65%] w-[82%]',
      imageClassName:
        'object-contain mix-blend-multiply hue-rotate-[235deg] saturate-50 transition-transform duration-500 group-hover:scale-[1.04]',
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
    <section className="relative w-full overflow-hidden bg-theme-surface text-theme-foreground">
      <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-20 lg:px-0 lg:pb-24 lg:pt-28">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
          <motion.div {...reveal(0)} className="min-w-0 font-sans text-[clamp(3rem,6vw,5rem)] leading-[0.99] tracking-[-0.04em]">
            <h1 className="min-w-0">
              <EditableElement
                as="span"
                id={`${section.id}-headline-word-1`}
                field="value"
                value={headlineFirstLine}
                className="block break-words font-light text-theme-foreground/90 [overflow-wrap:anywhere]"
              />
              <EditableElement
                as="span"
                id={`${section.id}-headline-word-2`}
                field="value"
                value={headlineSecondLine}
                className="mt-2 block break-words font-extrabold text-theme-foreground [overflow-wrap:anywhere]"
              />
              <span className="sr-only"> {accessibleHeadlineLastLine}</span>
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-7 gap-y-4 sm:gap-x-9">
              <span aria-hidden="true">
                <EditableElement
                  as="span"
                  id={`${section.id}-headline-word-3`}
                  field="value"
                  value={headlineLastLine}
                  className="break-words font-light text-theme-foreground/90 [overflow-wrap:anywhere]"
                />
              </span>
              {section.primaryAction ? (
                <EditableButton
                  buttonKey={`${section.id}-${section.primaryAction.id}`}
                  defaultText={section.primaryAction.label}
                  defaultHref={buildPageHref(section.primaryAction.targetPageId)}
                  onViewClick={handleActionNavigation(section.primaryAction.targetPageId)}
                  className="inline-flex h-12 w-[180px] items-center justify-center rounded-full bg-theme-foreground text-[11px] font-semibold text-theme-surface shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:h-14 sm:w-[230px] lg:h-[60px] lg:w-[280px]"
                  contentClassName="font-medium text-theme-surface"
                />
              ) : null}
            </div>
          </motion.div>

          <motion.aside {...reveal(0.12)} className="pb-2 lg:justify-self-end" aria-label="Customer reviews">
            <div className="w-full max-w-[245px]">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3" aria-hidden="true">
                  {REVIEWERS.map((reviewer) => (
                    <EditableImage
                      key={reviewer.key}
                      imageKey={reviewer.key}
                      defaultSrc={reviewer.src}
                      defaultAlt={reviewer.alt}
                      containerClassName="h-10 w-10 rounded-full ring-2 ring-theme-surface"
                      className="object-cover"
                    />
                  ))}
                </div>
                <EditableElement
                  as="span"
                  id={`${section.id}-social-proof-count`}
                  field="value"
                  value="15K++ Positive Reviews"
                  className="max-w-24 text-[11px] font-extrabold leading-[1.2] tracking-[-0.02em] text-theme-foreground"
                />
              </div>
              <div className="mt-4 flex items-start gap-3">
                <span className="mt-2.5 h-px w-12 shrink-0 bg-theme-foreground/45" aria-hidden="true" />
                <EditableElement
                  as="p"
                  id={`${section.id}-description`}
                  field="value"
                  value={section.description || 'Fashion is part of the daily air and it changes all the time, with all the events.'}
                  className="text-[11px] leading-[1.45] text-theme-foreground/75"
                />
              </div>
            </div>
          </motion.aside>
        </div>

        <div className="mx-auto mt-20 grid max-w-[1216px] gap-8 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3 lg:gap-14">
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
                className={index === 2 ? 'sm:col-span-2 lg:col-span-1' : undefined}
              >
                <EditableElement
                  as="article"
                  id={`${section.id}-card-${card.id}`}
                  field="background"
                  value=""
                  type="container"
                  className={`group relative block h-[420px] overflow-hidden rounded-[56px] ${card.surfaceClassName} p-7 transition-transform duration-300 hover:-translate-y-1 sm:h-[440px] lg:h-[420px]`}
                >
                  <div className="relative z-10">
                    <EditableElement
                      as="span"
                      id={`${section.id}-card-${card.id}-tag`}
                      field="value"
                      value={card.tag}
                      className="inline-flex min-h-9 items-center rounded-full bg-theme-surface/90 px-6 text-[11px] font-semibold text-theme-foreground shadow-xs backdrop-blur-md"
                    />
                    <h2 className="mt-4 text-[30px] font-semibold leading-[0.95] tracking-[-0.035em] text-theme-foreground sm:text-[34px]">
                      <EditableElement
                        as="span"
                        id={`${section.id}-card-${card.id}-title-one`}
                        field="value"
                        value={titleFirstLine}
                        className="block break-words [overflow-wrap:anywhere]"
                      />
                      <EditableElement
                        as="span"
                        id={`${section.id}-card-${card.id}-title-two`}
                        field="value"
                        value={titleSecondLine}
                        className="block break-words [overflow-wrap:anywhere]"
                      />
                    </h2>
                  </div>

                  <EditableImage
                    imageKey={card.imageKey}
                    defaultSrc={card.imageSrc}
                    defaultAlt={card.imageAlt}
                    containerClassName={card.imageContainerClassName}
                    className={card.imageClassName}
                    objectFit={card.id === 'three' ? 'contain' : 'cover'}
                  />

                  <div className="absolute bottom-4 left-4 right-4 z-10 flex h-[76px] items-center justify-between rounded-full border border-theme-surface/80 bg-theme-surface/70 py-2 pl-7 pr-2 shadow-sm backdrop-blur-xl">
                    <EditableElement
                      as="span"
                      id={`${section.id}-card-${card.id}-price`}
                      field="value"
                      value={card.price}
                      className="text-sm font-extrabold tracking-[-0.02em] text-theme-foreground"
                    />
                    <EditableButton
                      buttonKey={`${section.id}-card-${card.id}-cart`}
                      defaultText={`Add ${card.title} to cart`}
                      onViewClick={() => addCardToCart(card)}
                      className="inline-flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-theme-foreground text-theme-surface shadow-sm transition-transform duration-200 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-foreground active:scale-95"
                    >
                      <ShoppingBag className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                      <span className="sr-only">Add {accessibleCardTitle} to cart</span>
                    </EditableButton>
                  </div>
                </EditableElement>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          {...reveal(0.38)}
          className="mt-24 border-y border-theme-border py-10 sm:mt-28 sm:py-12"
        >
          <div className="grid grid-cols-2 items-center gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-5 lg:gap-10">
            {PARTNER_MARKS.map((partner) => (
              <div key={partner.id} className="flex min-w-0 items-center justify-center gap-3 text-theme-foreground/80 grayscale">
                <span className="h-9 w-9 shrink-0">{partner.icon}</span>
                <EditableElement
                  as="span"
                  id={`${section.id}-partner-${partner.id}`}
                  field="value"
                  value={partner.label}
                  className="max-w-28 text-[10px] font-bold uppercase leading-[1.25] tracking-[0.16em]"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
