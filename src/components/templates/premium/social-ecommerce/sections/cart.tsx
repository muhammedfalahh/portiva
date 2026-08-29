'use client';

/**
 * =============================================================================
 * PORTIVA: Meridian Commerce Pro — Template-Local Cart
 * =============================================================================
 *
 * A lightweight shopping-cart interaction layer scoped entirely to this
 * template module. It is deliberately NOT global state: the Portiva engine,
 * workspace store, and other templates never see it, and unmounting the
 * template discards it. This satisfies storefront interactivity (add-to-cart
 * feedback, header count, slide-over mini cart) without touching engine
 * architecture or creating a parallel theme/editor state system.
 *
 * Motion follows the fluid-interface rules: the drawer animates transform +
 * opacity only, uses a critically damped spring (no bounce — drawers are not
 * flick gestures), is dismissible at any moment (scrim click / Escape), and
 * collapses to an opacity cross-fade under reduced motion or builder mode.
 */

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Trash2, Truck, X } from 'lucide-react';
import { EditableButton } from '@/components/engine/EditableButton';

// ─── Types ──────────────────────────────────────────────────────────────────

export interface MeridianCartItem {
  /** Stable product id from the definition. */
  id: string;
  name: string;
  /** Numeric unit price parsed from the editable price string. */
  price: number;
  image?: string;
  /** Selected option label (e.g. "Midnight Black"), if any. */
  variant?: string;
  quantity: number;
}

export interface MeridianCartContextValue {
  items: MeridianCartItem[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  wishlist: string[];
  wishlistCount: number;
  addItem: (item: Omit<MeridianCartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleWishlist: (id: string) => void;
  isWishlisted: (id: string) => boolean;
}

const MeridianCartContext = createContext<MeridianCartContextValue | null>(null);

export function useMeridianCart(): MeridianCartContextValue {
  const ctx = useContext(MeridianCartContext);
  if (!ctx) throw new Error('useMeridianCart must be used inside MeridianCartProvider');
  return ctx;
}

// ─── Price Helpers ──────────────────────────────────────────────────────────

/** Parses "$1,299.00" / "$79" into a number; returns 0 when unparseable. */
export function parsePrice(value: string | undefined): number {
  if (!value) return 0;
  const cleaned = value.replace(/[^0-9.]/g, '');
  const parsed = Number.parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function formatPrice(value: number): string {
  return `$${value % 1 === 0 ? value.toFixed(0) : value.toFixed(2)}`;
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function MeridianCartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<MeridianCartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['sonnet-headphones', 'atlas-weekender']);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<MeridianCartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + quantity } : entry,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((entry) => entry.id !== id)
        : prev.map((entry) => (entry.id === id ? { ...entry, quantity } : entry)),
    );
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const isWishlisted = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { itemCount, subtotal } = useMemo(
    () =>
      items.reduce(
        (acc, entry) => ({
          itemCount: acc.itemCount + entry.quantity,
          subtotal: acc.subtotal + entry.quantity * entry.price,
        }),
        { itemCount: 0, subtotal: 0 },
      ),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      isOpen,
      wishlist,
      wishlistCount: wishlist.length,
      addItem,
      removeItem,
      setQuantity,
      openCart,
      closeCart,
      toggleWishlist,
      isWishlisted,
    }),
    [items, itemCount, subtotal, isOpen, wishlist, addItem, removeItem, setQuantity, openCart, closeCart, toggleWishlist, isWishlisted],
  );

  return (
    <MeridianCartContext.Provider value={value}>
      {children}
      <MiniCartDrawer />
    </MeridianCartContext.Provider>
  );
}

// ─── Free-Shipping Progress ─────────────────────────────────────────────────

const FREE_SHIPPING_THRESHOLD = 75;

function ShippingProgress({ subtotal }: { subtotal: number }) {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const progress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);
  const reached = remaining === 0;

  return (
    <div className="rounded-xl border border-theme-border bg-theme-background p-3">
      <div className="flex items-center gap-2 text-xs font-medium text-theme-muted">
        <Truck className="h-4 w-4 shrink-0 text-theme-accent" aria-hidden="true" />
        <span>
          {reached
            ? 'Free carbon-neutral shipping unlocked'
            : `${formatPrice(remaining)} away from free shipping`}
        </span>
      </div>
      <div
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-theme-border"
        role="progressbar"
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progress toward free shipping"
      >
        <div
          className="h-full rounded-full bg-theme-accent transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(progress * 100, reached ? 100 : 6)}%` }}
        />
      </div>
    </div>
  );
}

// ─── Mini Cart Drawer ───────────────────────────────────────────────────────

/**
 * Slide-over mini cart. Rendered once by the provider; opened from the header
 * bag button or implicitly after "Buy Now". Uses semantic dialog semantics and
 * returns focus to the document body on close.
 */
export function MiniCartDrawer() {
  const { items, isOpen, itemCount, subtotal, removeItem, setQuantity, closeCart } = useMeridianCart();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', onKeyDown);

    // Sheet semantics: freeze background scrolling while the cart is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  const springTransition = reducedMotion
    ? { duration: 0.2, ease: 'easeOut' as const }
    : { type: 'spring' as const, bounce: 0, duration: 0.4 };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Shopping cart">
          {/* Scrim */}
          <motion.button
            type="button"
            aria-label="Close cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeCart}
            className="absolute inset-0 h-full w-full cursor-default bg-[#211D19]/45 backdrop-blur-[2px]"
          />

          {/* Panel — grabbable mid-flight; a rightward flick dismisses, and the
              exit spring continues from the dragged position (never snaps). */}
          <motion.aside
            initial={reducedMotion ? { opacity: 0 } : { x: '100%' }}
            animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
            transition={springTransition}
            drag={reducedMotion ? false : 'x'}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: 0, right: 0.55 }}
            dragMomentum={false}
            onDragEnd={(_event, info) => {
              if (info.offset.x > 90 || info.velocity.x > 480) closeCart();
            }}
            className="absolute inset-y-0 right-0 flex w-full max-w-md touch-pan-y flex-col border-l border-theme-border bg-theme-surface shadow-2xl"
          >
            {/* Drag handle — telegraphs the dismiss gesture direction */}
            <div className="flex justify-center pt-3" aria-hidden="true">
              <span className="h-1 w-10 rounded-full bg-theme-border" />
            </div>

            <header className="flex items-center justify-between border-b border-theme-border px-5 py-4">
              <h2 className="inline-flex items-center gap-2 font-editorial-serif text-xl text-theme-foreground">
                <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                Your Cart
                <span className="text-sm font-sans text-theme-muted">({itemCount})</span>
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-theme-border text-theme-muted transition-colors hover:bg-theme-surface-hover hover:text-theme-foreground"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
                <ShoppingBag className="h-10 w-10 text-theme-muted/50" aria-hidden="true" />
                <p className="font-editorial-serif text-xl text-theme-foreground">Your cart is empty</p>
                <p className="text-sm leading-6 text-theme-muted">
                  Browse best sellers and find something you will use every day.
                </p>
                <EditableButton
                  buttonKey="meridian-cart-empty-cta"
                  defaultText="Continue Shopping"
                  className="mt-2 inline-flex items-center rounded-full bg-theme-primary px-5 py-2.5 text-sm font-semibold text-theme-primary-text transition-all hover:bg-theme-primary-hover active:scale-[0.97]"
                />
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
                  <ShippingProgress subtotal={subtotal} />
                  <ul className="space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex gap-3 rounded-xl border border-theme-border bg-theme-background p-3"
                      >
                        {item.image ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={item.image}
                            alt=""
                            loading="lazy"
                            className="h-20 w-20 shrink-0 rounded-lg object-cover"
                          />
                        ) : null}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-theme-foreground">{item.name}</p>
                          {item.variant ? (
                            <p className="mt-0.5 text-xs text-theme-muted">{item.variant}</p>
                          ) : null}
                          <p className="mt-1 text-sm font-semibold tabular-nums text-theme-foreground">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div className="inline-flex items-center rounded-full border border-theme-border">
                              <button
                                type="button"
                                aria-label={`Decrease quantity of ${item.name}`}
                                onClick={() => setQuantity(item.id, item.quantity - 1)}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-theme-muted transition-all hover:text-theme-foreground active:scale-90"
                              >
                                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                              <span className="w-6 text-center text-xs font-semibold tabular-nums text-theme-foreground">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                aria-label={`Increase quantity of ${item.name}`}
                                onClick={() => setQuantity(item.id, item.quantity + 1)}
                                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-theme-muted transition-all hover:text-theme-foreground active:scale-90"
                              >
                                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </div>
                            <button
                              type="button"
                              aria-label={`Remove ${item.name} from cart`}
                              onClick={() => removeItem(item.id)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-theme-muted transition-all hover:bg-theme-surface-hover hover:text-theme-accent active:scale-90"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <footer className="space-y-3 border-t border-theme-border px-5 py-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-theme-muted">Subtotal</span>
                    <span className="text-lg font-bold tabular-nums text-theme-foreground">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <p className="text-xs leading-5 text-theme-muted">
                    Taxes calculated at checkout · 30-day free returns · Secure encrypted payment.
                  </p>
                  <EditableButton
                    buttonKey="meridian-cart-continue"
                    defaultText="Continue Shopping"
                    className="inline-flex w-full items-center justify-center rounded-full border border-theme-border bg-theme-surface px-5 py-3 text-sm font-semibold text-theme-foreground transition-all hover:bg-theme-surface-hover active:scale-[0.98]"
                  />
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
