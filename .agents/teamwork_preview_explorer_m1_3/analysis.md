# AuraSalon Redesign — Interactive Components Architecture & Implementation Specs

**Explorer ID**: Explorer 3 (Milestone 1)  
**Target Template**: `AuraSalon.tsx` (Luxury Editorial Bridal & Salon Website)  
**Working Directory**: `c:\Users\falah\Documents\Falah\Apps\portiva\.agents\teamwork_preview_explorer_m1_3`  
**Date**: 2026-08-03  

---

## Executive Summary

This report provides the technical blueprint and architecture for the interactive components required in the AuraSalon luxury redesign. The redesigned template transforms `AuraSalon.tsx` from a simple static template into a 15-section editorial showcase featuring interactive media components, gesture-aware carousels, split-screen image comparison tools, glassmorphic floating navigation, and motion safety controls.

All interactive components are engineered with three core principles:
1. **Editorial Elegance**: Seamless 60fps micro-interactions, dark luxury aesthetic, and gold/taupe accenting.
2. **VisualBuilder Engine Compatibility**: Zero disruption to Portiva's inline text (`EditableElement`) and image replacement (`EditableImage`) overlays during editing mode.
3. **Accessibility & Motion Safety**: Built-in fallbacks for `prefers-reduced-motion` and `prefers-reduced-transparency`.

---

## 1. Existing Utilities & Subcomponent Catalog Inspection

### Inspection Findings
- **`src/utils/AssetPipeline.ts`**: Handles client-side canvas WebP compression and R2 image upload proxying. Contains no UI or motion utilities.
- **`src/components/widgets/WhatsAppCatalogWidget.tsx`**: Provides a standalone click-to-chat WhatsApp commerce card with pre-filled message encoding.
- **`src/components/engine/ThemedBentoCard.tsx`**: Demonstrates dynamic theming and bento block structure, but is designed for generic user dashboard blocks.
- **`src/components/templates/` (Existing Templates)**: None of the existing templates (`SnapMaster`, `LuxeUniversal`, `Nitec`, etc.) contain gesture-enabled image carousels, before/after split sliders, or sticky glass navigation compression.

### Subcomponent Strategy
To keep `AuraSalon.tsx` clean, maintainable, and modular, all 6 interactive subcomponents will be implemented as modular React components in a co-located directory or subcomponents within `src/components/templates/aurasalon/`:
- `MinimalNavigation.tsx`
- `LookbookCarousel.tsx`
- `BeforeAfterSlider.tsx`
- `FashionEditorialBento.tsx`
- `PackageCarousel.tsx`
- `useScrollReveal.ts` / `useReducedMotion.ts` (or integrated motion hooks)

---

## 2. Detailed Interactive Component Specifications

---

### Component 1: Lookbook Carousel (`LookbookCarousel`)

#### Objective
A curated editorial showcase displaying bridal transformations with active slide focus, numerical slide indicators (`01 / 05`), pointer drag/touch swipe support, and a **STRICT MAXIMUM CAP OF 5 ITEMS**.

#### Visual & Behavioral Specs
- **Active Focus Slide**: The center/active slide scales up (`scale-100 opacity-100 shadow-2xl`), while adjacent slides scale down slightly (`scale-95 opacity-50 filter saturate-50`) to create depth.
- **Numerical Counter**: Rendered in editorial serif typography (e.g. `01 / 05`). Indices are 1-based and zero-padded.
- **5-Item Strict Cap**: Regardless of how many items exist in `lookbookImages` prop data, the component enforces `.slice(0, 5)` at the data level.

#### State Architecture
```typescript
interface LookbookItem {
  id: string;
  src: string;
  tag: string;
  title?: string;
  description?: string;
}

interface LookbookCarouselProps {
  items: LookbookItem[];
  autoPlayInterval?: number; // default 5000ms
}
```

- **State Hooks**:
  - `activeIndex`: `number` (0 to `displayItems.length - 1`)
  - `isDragging`: `boolean`
  - `dragStartX`: `number`
  - `dragOffset`: `number` (px delta during active drag)
  - `isHovered`: `boolean` (pauses auto-play)

#### Touch & Drag Mechanics
```typescript
const handlePointerDown = (e: React.PointerEvent) => {
  if (isEditing) return; // Prevent drag during VisualBuilder edit mode
  setIsDragging(true);
  setDragStartX(e.clientX);
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
};

const handlePointerMove = (e: React.PointerEvent) => {
  if (!isDragging) return;
  const deltaX = e.clientX - dragStartX;
  setDragOffset(deltaX);
};

const handlePointerUp = (e: React.PointerEvent) => {
  if (!isDragging) return;
  setIsDragging(false);
  if (dragOffset < -50) {
    nextSlide();
  } else if (dragOffset > 50) {
    prevSlide();
  }
  setDragOffset(0);
};
```

#### VisualBuilder Compatibility
Each slide wraps its image in `<EditableImage imageKey={`aura-lookbook-${idx}`} defaultSrc={item.src} />` and tags in `<EditableElement id={`aura-lookbook-${idx}-tag`} />`. In `EDITING` mode, dragging is disabled so users can select text/images without triggering a slide change. Manual prev/next navigation controls allow the creator to navigate through slides in edit mode.

---

### Component 2: Before/After Comparison Slider (`BeforeAfterSlider`)

#### Objective
An interactive split-screen image comparison tool allowing visitors to drag a vertical handle left or right to reveal "Before" (un-stylized/raw) vs. "After" (bridal glam) images.

#### Visual & Behavioral Specs
- **Dual Layering**:
  - Base layer: "Before" image displayed at 100% container width.
  - Overlay layer: "After" image clipped dynamically using CSS `clip-path: inset(0 ${100 - sliderPosition}% 0 0)` or `width: ${sliderPosition}%`.
- **Divider Handle**:
  - A vertical 2px high-contrast glass border line (`bg-white/80 shadow-[0_0_12px_rgba(0,0,0,0.5)]`).
  - Centered circular touch grip button with a metallic border and dual chevron icons (`<ChevronsLeftRight className="w-4 h-4 text-theme-foreground" />`).
- **Labels**: "Before" badge pinned bottom-left, "After" badge pinned bottom-right.

#### State Architecture
```typescript
interface BeforeAfterProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
}
```

- **State Hooks**:
  - `sliderPosition`: `number` (0 to 100, default 50)
  - `isDragging`: `boolean`
  - `containerRef`: `useRef<HTMLDivElement>(null)`

#### Event Handling & Calculations
```typescript
const updatePosition = useCallback((clientX: number) => {
  if (!containerRef.current) return;
  const rect = containerRef.current.getBoundingClientRect();
  const offsetX = clientX - rect.left;
  const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
  setSliderPosition(percentage);
}, []);

// Unified Mouse + Touch Global Drag Listeners
useEffect(() => {
  if (!isDragging) return;

  const handlePointerMove = (e: PointerEvent) => {
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', handlePointerUp);
  return () => {
    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  };
}, [isDragging, updatePosition]);
```

#### Keyboard Accessibility
The divider handle has `tabIndex={0}` and supports keyboard navigation:
- `ArrowLeft` / `ArrowDown`: `setSliderPosition(p => Math.max(0, p - 2))`
- `ArrowRight` / `ArrowUp`: `setSliderPosition(p => Math.min(100, p + 2))`

---

### Component 3: Fashion Editorial Bento Section (`FashionEditorialBento`)

#### Objective
An asymmetric multi-tile collage balancing high-fashion bridal photography with typography, signature technique highlights, and luxury badges.

#### Grid Layout & Cell Blueprint (5 Asymmetric Tiles)
1. **Tile 1 — Main Hero Editorial Portrait (Col Span 12, LG Span 7, Row Span 2)**:
   - Features full-height portrait photography with `EditableImage`.
   - Dark gradient overlay with floating quote and italicized artist note.
2. **Tile 2 — Artist Philosophy Quote Card (Col Span 12, LG Span 5)**:
   - Warm ivory surface (`bg-theme-surface`) with double quotation graphics and signature typography.
3. **Tile 3 — Signature Artistry Techniques (Col Span 12, LG Span 5)**:
   - List of 3 core pillars: HD Airbrush, Architectural Hairstyling, Silk Draping.
4. **Tile 4 — Detail Artistry Close-up (Col Span 6, LG Span 4)**:
   - High-resolution close-up image with hover zoom (`group-hover:scale-105 transition-transform duration-700`).
5. **Tile 5 — Recognition & Accolades Badge (Col Span 6, LG Span 3)**:
   - Dark champagne backdrop, 5-star rating graphic, and "Vogue India Featured MUA" badge.

#### Animation & Dynamics
- Scroll reveal entrance staggered per tile using `animate-fade-in-up` with CSS `animation-delay: 100ms`, `200ms`, `300ms`.
- Fully editable text and images via `EditableElement` and `EditableImage`.

---

### Component 4: Package Carousel (`PackageCarousel`)

#### Objective
A horizontal card slider for bridal pricing packages with refined borders, hover dynamics, active package highlight, and WhatsApp booking integration.

#### Visual & Behavioral Specs
- **Card Containers**: Rounded cards (`rounded-3xl border border-theme-border/40 bg-theme-surface/50 backdrop-blur-md`).
- **Featured Package**: The primary package ("Royal Bridal") features a subtle gold/primary glow border, elevated transform (`md:scale-105`), and "Most Popular" badge.
- **Horizontal Navigation**:
  - Responsive scroll container (`overflow-x-auto scrollbar-none snap-x snap-mandatory flex gap-6`).
  - Scroll position detection: updates `canScrollLeft` and `canScrollRight`.
  - Desktop control arrows (`ChevronLeft`, `ChevronRight`) to smoothly scroll left/right by card width (`320px`).
- **WhatsApp Integration**:
  - Primary CTA button uses `wa.me/${phone}?text=${encodeURIComponent(...)` to initiate instant booking conversations.

#### State Architecture
```typescript
const [canScrollLeft, setCanScrollLeft] = useState(false);
const [canScrollRight, setCanScrollRight] = useState(true);
const scrollRef = useRef<HTMLDivElement>(null);

const checkScroll = useCallback(() => {
  if (!scrollRef.current) return;
  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
  setCanScrollLeft(scrollLeft > 10);
  setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
}, []);
```

---

### Component 5: Minimal Navigation (`MinimalNavigation`)

#### Objective
A glassmorphic sticky header with smooth-scroll section anchors, scroll-triggered height compression, glass/blur reduction, and mobile drawer menu.

#### Behavior & Transitions
- **Unscrolled State (Top of Page)**:
  - Padding: `py-6`
  - Background: `bg-transparent` or `bg-theme-background/30`
  - Border: `border-transparent`
- **Scrolled State (`window.scrollY > 40px`)**:
  - Padding: `py-3`
  - Background: `bg-theme-background/80 backdrop-blur-lg border-b border-theme-border/30`
  - Height compression transition: `transition-all duration-300`
- **Active Anchor Highlighting**:
  - Listens to scroll positions for `#hero`, `#lookbook`, `#before-after`, `#editorial-bento`, `#packages`, `#contact`.
  - Active section gets a subtle underline indicator or accent color.

#### State Architecture
```typescript
const [isScrolled, setIsScrolled] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
const [activeSection, setActiveSection] = useState('hero');

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 40);
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

---

### Component 6: Motion, Scroll Reveals, Parallax & `prefers-reduced-motion` Safety

#### 1. Scroll Reveals (`useScrollReveal`)
Uses an `IntersectionObserver` to trigger fade-in and slide-up transitions as sections scroll into viewport.

```typescript
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Check reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

#### 2. Subtle Parallax Scale
For hero images and bento photography backgrounds, a subtle scroll listener calculates:
`transform: translateY(${scrollY * 0.08}px) scale(${1 + scrollY * 0.0002})`
*Safety Guard*: Parallax is strictly disabled when `isEditing === true` or `prefers-reduced-motion: reduce` is active.

#### 3. `prefers-reduced-motion` CSS & JS Safety
- Global CSS fallback: `@media (prefers-reduced-motion: reduce)` sets `animation: none !important; transition: none !important; transform: none !important;`.
- Smooth scroll fallbacks: `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }`.

---

## 3. Component Architecture & Event Flow Summary Matrix

| Component | State Variables | Touch/Drag Events | Key Constraints |
| :--- | :--- | :--- | :--- |
| **Lookbook Carousel** | `activeIndex`, `isDragging`, `dragOffset` | `PointerDown`, `PointerMove`, `PointerUp` | **STRICT MAX 5 ITEMS** (`.slice(0,5)`), counter `01 / 05` |
| **Before/After Slider** | `sliderPosition` (0-100), `isDragging` | `PointerDown`, global `PointerMove`, `PointerUp`, Keyboard Arrows | Dual image clip-path, central glass circular grip handle |
| **Editorial Bento** | Hover states | Hover zoom | 5 asymmetric tiles balancing text & imagery |
| **Package Carousel** | `scrollRef`, `canScrollLeft`, `canScrollRight` | Snap scroll, desktop pointer drag | WhatsApp `wa.me` CTA, featured package glow |
| **Minimal Navigation** | `isScrolled`, `mobileMenuOpen`, `activeSection` | Scroll listener | Sticky compression (`py-6` -> `py-3`), glass reduction |
| **Motion Safety** | `isVisible`, `prefersReducedMotion` | `IntersectionObserver`, `scroll` | Instantly visible if reduced-motion or edit mode |

---

## 4. Verification & Testing Strategy

1. **Type Safety & Build Verification**:
   - Run `npx tsc --noEmit` to verify all props and subcomponents have strict TypeScript typing.
2. **Carousel 5-Item Cap Verification**:
   - Pass an array of 8 lookbook items to `LookbookCarousel` and verify that only 5 items render and indicator displays `01 / 05`.
3. **Before/After Touch Drag Verification**:
   - Drag slider handle across 0%, 50%, and 100% boundary positions on desktop and mobile touch viewports.
4. **Visual Builder Interactivity Test**:
   - Toggle builder context mode `EDITING` vs `VIEWING`: ensure clicking on text or images in edit mode opens editing sidebar without triggering drag gestures.
5. **Accessibility / Motion Test**:
   - Emulate `prefers-reduced-motion: reduce` in browser dev tools to verify all transitions and parallax transforms gracefully fall back to instant static displays.

---
