# AuraSalon Redesign Master Plan

## Goal
Redesign `AuraSalon.tsx` into a luxury 15-section single-page editorial bridal MUA & salon website template matching all requirements in `ORIGINAL_REQUEST.md`.

## Execution Phasing

### Phase 1: Exploration & Technical Architecture (Milestone 1)
- Dispatch Explorers (`teamwork_preview_explorer`) to analyze:
  1. Current `AuraSalon.tsx` structure and existing subcomponents/widgets.
  2. VisualBuilderContext bindings and editable content props in Portiva engine.
  3. Tailwind v4 theme configuration and CSS variables setup in `globals.css` and `theme.types.ts`.
- Deliver output: `analysis.md` outlining the architecture, prop interface, and modular layout plan.

### Phase 2: Implementation & Refactoring (Milestone 2 & 3)
- Dispatch Worker (`teamwork_preview_worker`) to:
  1. Refactor/implement `AuraSalon.tsx` and subcomponents for all 15 required sections.
  2. Enforce lookbook carousel max 5 items limit.
  3. Build interactive Before/After comparison slider handle.
  4. Build Fashion Editorial Bento Section, Package Carousel, Service List, Artistry Process, etc.
  5. Apply luxury visual palette (warm ivory, soft cream, charcoal, muted taupe) and editorial typography.
  6. Add parallax, scroll reveal, drag/swipe gestures, and prefers-reduced-motion fallback.

### Phase 3: Review & Empirical Challenger Verification
- Dispatch Reviewers (`teamwork_preview_reviewer`) to review code quality, responsiveness, theme compatibility, and requirement adherence.
- Dispatch Challengers (`teamwork_preview_challenger`) to stress-test Before/After slider dragging, touch event handling, lookbook 5-item capping, and responsive layout boundaries.

### Phase 4: Forensic Integrity Audit & Final Verification (Milestone 4)
- Dispatch Forensic Auditor (`teamwork_preview_auditor`) to verify zero cheating / genuine implementation.
- Have Worker run and verify `npx tsc --noEmit`, `npm run build`, and `npm run lint`.
- Submit completion report to Sentinel.
