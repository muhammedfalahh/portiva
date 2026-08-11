# Project: AuraSalon Redesign

## Architecture
- Single-page long-form editorial website template (`AuraSalon.tsx`) for luxury MUA & Salon.
- Modularized section components in `src/components/templates/aurasalon/`.
- Portiva Theme System integration (`themeConfigToCSSVars`, Tailwind v4 `@theme inline`, custom properties).
- Editable content model fully bound to VisualBuilderContext / props.

## Code Layout
- `src/components/templates/AuraSalon.tsx`: Main template entry point.
- `src/components/templates/aurasalon/`:
  - `types.ts`: `AuraSalonProps` and `DEFAULT_AURA_SALON_PROPS`
  - `MinimalNavigation.tsx` (Smooth scroll anchors, glass compression, active section tracking)
  - `CinematicHero.tsx` (Asymmetrical layout, parallax scaling, artist title & hero media)
  - `EditorialBrandStatement.tsx` (Whitespace pause, italic quote statement, highlight cards)
  - `OurStoryPhilosophy.tsx` (Overlapping composition, portrait, bio, 3 philosophy pillars)
  - `LookbookCarousel.tsx` (STRICT MAX 5 ITEMS CAP, 01/05 counter, pointer drag handling)
  - `BeforeAfterSlider.tsx` (Interactive split-screen clip-path slider, unclipped badges, keyboard accessibility)
  - `EditorialServiceList.tsx` (4 numbered categories, pricing, features, WhatsApp buttons)
  - `PackageCarousel.tsx` (Snap scroll cards, mount/resize scroll check, WhatsApp CTAs)
  - `ArtistryProcess.tsx` (Numbered 4-step roadmap)
  - `FashionEditorialBento.tsx` (Asymmetric 5-tile bento collage)
  - `BrideTestimonials.tsx` (Minimal quotation carousel)
  - `SocialProofStats.tsx` (Restrained editorial counter metrics layout)
  - `InstagramShowcase.tsx` (Asymmetric image strip gallery with follow CTA)
  - `FinalBookingSection.tsx` (Dramatic minimal closure block with phone/location/WhatsApp CTAs)
  - `MinimalFooter.tsx` (Clean brand summary, link columns, legal links, copyright text)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Architecture & Schema | Audit current `AuraSalon.tsx`, define 15 section content types & props interface | none | DONE |
| 2 | Component Implementation | Implement all 15 editorial sections, lookbook (max 5 items), before/after slider, bento, packages | M1 | DONE |
| 3 | Visual Styling & Motion | Luxury theme variables, high-contrast serif/sans typography, scroll reveal & parallax | M2 | DONE |
| 4 | Verification & Audit | Type checking, build, linting, interactive challenger tests, forensic audit | M3 | DONE |

## Interface Contracts
### AuraSalon Template Content Model (`AuraSalonProps`)
- Comprehensive customizable props for all 15 sections including navigation, hero, brand statement, story, lookbook (max 5 items), before/after slider, services, packages, process steps, bento tiles, testimonials, stats, instagram, final booking, and minimal footer.
- Default fallback content (`DEFAULT_AURA_SALON_PROPS`) provided when props are omitted.
