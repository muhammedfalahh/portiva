# Original User Request

## Initial Request — 2026-08-02T19:37:09Z

# Teamwork Project Prompt — AuraSalon Redesign

Redesign Portiva's `AuraSalon.tsx` template from the ground up into a universal, single-page, luxury Bridal MUA & Salon editorial website template inspired by high-fashion editorials (Vogue-level restraint, cinematic typography, asymmetrical layouts, subtle parallax, lookbook carousel max 5 items, before/after slider, interactive bento collage, package carousel, and strict responsiveness).

Working directory: `c:\Users\falah\Documents\Falah\Apps\portiva`  
Integrity mode: `development`

---

## Requirements

### R1. Single-Page Editorial Architecture & Layout Structure
- Refactor `AuraSalon.tsx` (and any necessary subcomponents in `src/components/templates/` or `src/components/engine/`) to adhere strictly to a single-page long-form narrative.
- Implement 15 structured, non-generic sections:
  1. Minimal Navigation (smooth-scroll anchors, scroll-triggered sticky compression & glass/blur reduction)
  2. Cinematic Hero (asymmetrical editorial layout, full viewport impact, subtle mask reveal & parallax scale)
  3. Editorial Brand Statement (generous whitespace visual pause, serif/italic statement)
  4. Our Story / Artist Philosophy (magazine-style overlapping composition)
  5. Featured Transformations (Curated Lookbook carousel — STRICT MAXIMUM OF 5 ITEMS with active focus, slide indicators `01 / 05`, drag/swipe support)
  6. Before / After Transformation Slider (interactive divider comparison tool)
  7. Editorial Service List (numbered editorial format with descriptions & pricing)
  8. Package Carousel (horizontal card collection with refined borders & hover dynamics)
  9. Artistry Process (numbered editorial steps with step labels)
  10. Fashion Editorial Bento Section (asymmetric tile collage with rich imagery & text balance)
  11. Testimonials (minimal elegant quotation carousel)
  12. Social Proof / Statistics (restrained editorial counter layout)
  13. Social / Instagram Showcase (asymmetric image strip gallery with follow CTA)
  14. Final Booking Section (dramatic minimal closure with WhatsApp, Phone, Location & Direct Book CTA)
  15. Minimal Footer (clean brand & copyright summary)

### R2. Luxury Visual Identity & Portiva Theme Integration
- Use a restrained, high-contrast palette: warm ivory, soft cream, off-white, deep charcoal, soft black, muted taupe/champagne, and subtle blush accents.
- No bright pink/purple SaaS gradients, generic 3-column card grids, glowing blobs, or heavy shadows.
- Integrate smoothly with Portiva's CSS variable theme system (`themeConfigToCSSVars`, custom properties in `@theme inline` / Tailwind v4).
- Display high-contrast editorial typography pairing (high-contrast editorial Serif headings with clean modern Sans-serif UI labels and subtle italic accents).

### R3. Interactive Motion, Parallax & Responsiveness
- Implement smooth scroll reveal transitions, subtle parallax background/image scaling, text reveal animations, and interactive controls (lookbook drag/swipe, before-after slider handle).
- Ensure mobile layout re-composes fluidly with touch targets, zero horizontal scroll overflow, optimized motion for `prefers-reduced-motion`, and performant GPU rendering.

### R4. Universal Editable Content Model
- Expose complete customizability through Portiva's visual builder context / theme props, ensuring business branding, hero copy, 5 transformation items, services, packages, process steps, testimonials, social proof, and contact details can be modified seamlessly without breaking visual layout.

---

## Acceptance Criteria

### Verification & Code Health
- [ ] `npx tsc --noEmit` passes with zero TypeScript errors across the codebase.
- [ ] `npm run build` succeeds without build or bundling failures.
- [ ] `npm run lint` passes without ESLint errors.

### Design & Layout Integrity
- [ ] `AuraSalon.tsx` renders all 15 editorial sections smoothly within a single-page architecture.
- [ ] Featured Transformations strictly caps items to a maximum of 5 in the carousel showcase.
- [ ] Before/After transformation slider functions interactively via mouse/touch dragging.
- [ ] Page scrolling incorporates subtle parallax scaling and staggered reveal animations.
- [ ] Layout complies with Portiva theme system tokens and Tailwind v4 CSS variables.
- [ ] Design avoids generic AI aesthetic patterns (no glowing blobs, no purple SaaS gradients, no repetitive rounded bento cards).
