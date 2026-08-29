# PORTIVA — PREMIUM TEMPLATE PLATFORM ARCHITECTURE MIGRATION

## ROLE

You are acting as a **senior frontend architect, TypeScript architect, Next.js engineer, and migration engineer** working inside the existing Portiva codebase.

This is a major architecture modernization.

You are **not** building a new application.

You are **not** redesigning Portiva.

You are **not** replacing the editor.

You are **not** replacing Next.js.

You are transforming the existing template architecture into a scalable **Template Platform** where each template is an independently isolated, typed, lazily loaded module.

The end goal is for Portiva to comfortably support:

- 10 premium templates
- 25 premium templates
- 50 premium templates
- 100+ premium templates
- potentially hundreds of templates

without continuously increasing the size and complexity of a single shared renderer.

---

# 0. ABSOLUTE RULE — DO NOT START CODING IMMEDIATELY

Before modifying anything, inspect the actual repository.

You have already been given an architecture investigation, but **do not blindly trust the investigation**.

Verify its claims against the current code.

Do not assume:

- file paths
- component names
- interfaces
- imports
- dependencies
- routes
- state architecture
- registry structure
- template IDs
- database behavior

If the repository differs from the architecture report, **the repository is the source of truth**.

Do not invent missing architecture.

---

# 1. CURRENT ARCHITECTURE YOU ARE EXPECTED TO VERIFY

The previous investigation found approximately:

- 12 free templates
- 10 premium templates

The major premium architecture currently revolves around:

```text
src/lib/premium-template-definitions.ts
```

and:

```text
src/components/templates/PremiumMultipageTemplate.tsx
```

The latter is approximately 4,270 lines.

The investigation found that premium templates currently fall into two broad groups:

### Generic premium templates

Rendered primarily through a shared generic section renderer.

### Bespoke premium templates

Currently requiring brand/template-specific rendering logic.

The investigation identified three major bespoke families:

- FORME Studio
- Meridian / LumiLens
- Saffron Dock

It also identified:

- duplicated template resolution between builder and public rendering
- static imports of templates
- no template-level dynamic loading
- template-specific code imported from lower-level architecture
- `InspectorSidebar → BentoBio`
- registry/component dependency inversion
- a large centralized premium definition file

Again:

**VERIFY ALL OF THIS BEFORE ACTING ON IT.**

---

# 2. THE REAL PROBLEM WE ARE SOLVING

Do not interpret the problem as:

> "There are too many templates."

The registry itself is not necessarily the problem.

The real problems we are trying to eliminate are:

### Problem A — Monolithic premium renderer

A single large renderer contains multiple premium visual identities.

Adding or modifying one bespoke template requires touching shared rendering infrastructure.

This increases regression risk.

### Problem B — String-based template dispatch

Template-specific behavior currently relies on logic resembling:

```ts
brandName.includes(...)
```

or:

```ts
categoryLabel === ...
```

or other runtime string detection.

This is fragile.

Template identity must become explicit.

### Problem C — No template-level code splitting

The current architecture statically imports template implementations.

Therefore unused premium template implementations can become part of the same application dependency graph even when the user only needs one template.

We need an explicit lazy-loading boundary.

### Problem D — Multiple template resolution systems

The builder and public rendering paths currently contain separate template-selection logic.

This can cause builder/public mismatches.

There must be one canonical template-resolution mechanism.

### Problem E — Dependency inversion

Lower-level infrastructure must not depend on higher-level template implementations.

The architecture must prevent:

```text
ENGINE → TEMPLATE
```

and:

```text
CORE → TEMPLATE COMPONENT
```

where the dependency direction should be the opposite.

---

# 3. TARGET ARCHITECTURE

The target architecture is a **Template Platform / microkernel-style architecture**.

Conceptually:

```text
                         PORTIVA APPLICATION
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
              PORTIVA CORE               TEMPLATE PLATFORM
                    │                           │
          ┌─────────┼─────────┐         ┌──────┴──────┐
          │         │         │         │             │
       Editor     Theme     State    Registry      Resolver
          │                           │             │
          │                           └──────┬──────┘
          │                                  │
          │                           Dynamic Loader
          │                                  │
          │              ┌───────────────────┼───────────────────┐
          │              │                   │                   │
          │           FORME              MERIDIAN           SAFFRON
          │              │                   │                   │
          │         own definition      own definition      own definition
          │         own sections        own sections        own sections
          │         own overrides       own overrides       own overrides
          │              │                   │                   │
          └──────────────┴───────────────────┴───────────────────┘
                                         │
                                  Shared SectionKit
                                         │
                                  Editor Primitives
```

The architecture should establish a stable core and independent template modules.

---

# 4. TEMPLATE MODULE CONTRACT

Create a formal, strongly typed contract for templates.

Do not blindly copy the following interface. First inspect the existing architecture and adapt it appropriately.

Conceptually:

```ts
interface TemplateModule {
  manifest: TemplateManifest;

  definition: TemplateDefinition;

  renderer: TemplateRenderer;

  sections?: SectionOverrides;

  inspector?: InspectorContributions;

  theme?: TemplateTheme;

  version: string;
}
```

The actual implementation must be determined from the existing code.

The contract should allow Portiva to understand:

- what template this is
- what version it is
- what definition/data it uses
- how it renders
- what sections it overrides
- what optional editor contributions it provides
- what theme capabilities it has

Do not create unnecessary fields.

Do not create abstractions merely because they look architecturally impressive.

---

# 5. TEMPLATE MANIFEST

Introduce a lightweight template manifest if the existing architecture does not already provide an equivalent.

The manifest may contain metadata such as:

- template ID
- display name
- category
- renderer type
- version
- capabilities
- supported pages

But:

## DO NOT DUPLICATE THE ENTIRE TEMPLATE DEFINITION.

Avoid creating overlapping sources of truth such as:

```text
manifest.ts
definition.ts
registry.ts
template-config.ts
metadata.ts
```

The ownership model must be clear.

The manifest describes the **template module**.

The definition contains the **template content/data**.

The renderer contains the **presentation**.

---

# 6. TEMPLATE DIRECTORY ARCHITECTURE

Move toward an architecture conceptually similar to:

```text
templates/
└── premium/
    ├── forme/
    │   ├── manifest.ts
    │   ├── definition.ts
    │   ├── index.tsx
    │   ├── sections/
    │   │   ├── Hero.tsx
    │   │   ├── Work.tsx
    │   │   └── ...
    │   └── ...
    │
    ├── meridian/
    │   ├── manifest.ts
    │   ├── definition.ts
    │   ├── index.tsx
    │   ├── sections/
    │   └── ...
    │
    ├── saffron/
    │   ├── manifest.ts
    │   ├── definition.ts
    │   ├── index.tsx
    │   └── ...
    │
    └── ...
```

The exact location and structure must follow the actual repository.

Do not blindly move everything.

---

# 7. IMPORTANT — DO NOT OVER-COMPONENTIZE

Do not turn a template into dozens of microscopic files.

Bad:

```text
HeroTitle.tsx
HeroSubtitle.tsx
HeroButton.tsx
HeroImage.tsx
HeroBadge.tsx
HeroBackground.tsx
HeroAnimation.tsx
HeroContainer.tsx
```

Prefer meaningful components:

```text
Hero.tsx
Work.tsx
Services.tsx
About.tsx
Contact.tsx
```

Use fewer, well-defined components.

---

# 8. ONE TEMPLATE REGISTRY

Create one canonical registry/resolution system.

Conceptually:

```text
templateId
    ↓
Template Registry
    ↓
Template Manifest
    ↓
Template Loader
    ↓
Template Module
```

The builder and public renderer must both use this mechanism.

Do NOT leave separate switch/if chains in the builder and public rendering systems.

There must be one source of truth.

---

# 9. DYNAMIC TEMPLATE LOADING

Template implementations must be independently lazy-loadable.

Desired behavior:

```text
User opens Template A
        ↓
resolve Template A
        ↓
load Template A module
        ↓
render Template A
```

Not:

```text
Application starts
        ↓
load every premium template
        ↓
choose one
```

Use the appropriate Next.js/React dynamic import mechanism.

Prefer static import expressions inside the registry where possible so bundlers can understand the dependency graph.

Conceptually:

```ts
{
  "template-a": () => import("./templates/template-a"),
  "template-b": () => import("./templates/template-b")
}
```

Avoid fully arbitrary dynamic import paths if they prevent predictable bundler chunk generation.

The final implementation must be verified against the actual production build.

Do not assume code splitting occurred merely because `import()` exists.

---

# 10. CODE-SPLIT TEMPLATE DEFINITIONS TOO

The investigation found that premium definitions currently live together in a large file.

Move toward per-template definitions:

```text
template-a/
  definition.ts

template-b/
  definition.ts

template-c/
  definition.ts
```

Opening Template A should not require parsing definitions for Templates B–J.

Preserve the existing data-driven architecture.

Do not rewrite the definition schema unnecessarily.

---

# 11. PRESERVE THE EXISTING PREMIUM DATA MODEL

The current:

```text
PremiumTemplateDefinition
pages[]
sections[]
```

architecture is useful.

Do not throw it away.

The goal is:

```text
Template Definition
        ↓
Template Module
        ↓
Section Renderer
        ↓
Editable Primitives
```

not:

```text
Old definition system
        ↓
delete everything
        ↓
new unrelated CMS model
```

If the existing model needs a small addition such as:

- renderer
- version
- schemaVersion

make that addition carefully and backwards-compatibly.

---

# 12. REMOVE BRAND STRING SNIFFING

This is non-negotiable.

Remove architecture such as:

```ts
brandName.includes("forme")
```

or equivalent brand/category detection.

Template identity must be explicit:

```text
template ID
     ↓
explicit module
     ↓
explicit renderer
```

No visual behavior should depend on guessing a template from display text.

---

# 13. PREMIUM SHELL

Extract genuinely shared premium runtime into a `PremiumShell` or equivalent architecture.

It may own:

- navigation
- page resolution
- shared page dispatch
- href construction
- shared premium layout behavior
- common editor/viewing-mode behavior

It must NOT become another giant renderer.

The shell should know how to host a template.

It should not know every visual detail of every template.

---

# 14. SECTION KIT

Turn genuinely reusable section-rendering architecture into a shared `SectionKit` or equivalent.

Potential section types may include:

- hero
- products
- services
- gallery
- testimonials
- pricing
- FAQ
- contact
- footer

Inspect the actual repository and actual section types first.

The conceptual behavior should be:

```text
template.sections?.[section.type]
    ??
SectionKit[section.type]
```

A premium template can override a shared section when it genuinely needs bespoke visual treatment.

---

# 15. HYBRID TEMPLATE MODEL

Do NOT force every premium template into the generic renderer.

Use:

### Shared sections where appropriate

and:

### Template-specific sections where visual identity requires them.

For example:

```text
FORME
 ├── default Navbar
 ├── custom Hero
 ├── default Testimonials
 ├── custom WorkGrid
 └── default Footer
```

A premium template should be able to be highly unique without modifying global rendering infrastructure.

---

# 16. GENERIC PREMIUM TEMPLATES

Generic premium templates should share SectionKit implementations.

Do NOT duplicate the generic renderer for every template.

Each template still owns:

- definition
- manifest
- identity
- content
- configuration

but not duplicated generic rendering infrastructure.

---

# 17. BESPOKE PREMIUM TEMPLATES

Bespoke templates should have their own modules.

For example:

```text
FORME
  ↓
forme/index.tsx
  ↓
forme/sections/*
```

The bespoke module can use shared engine primitives and SectionKit sections.

It can override specific sections.

But it must not modify a central premium renderer.

---

# 18. EDITOR ENGINE MUST REMAIN BELOW TEMPLATES

The final dependency direction should be:

```text
APP / ROUTES
      ↓
TEMPLATE PLATFORM
      ↓
TEMPLATE
      ↓
TEMPLATE-LOCAL COMPONENTS
      ↓
ENGINE PRIMITIVES
      ↓
SHARED UTILITIES
```

The engine must NEVER import:

- templates
- template registry
- route components
- WorkspaceContainer
- template-specific components

---

# 19. REMOVE ENGINE → TEMPLATE DEPENDENCIES

If the audit finds something like:

```text
InspectorSidebar → BentoBio
```

do not simply move the import.

Find out why the engine needs BentoBio-specific behavior.

Create a generic extension/contribution mechanism.

Conceptually:

```text
Template
   ↓
Inspector Contributions
   ↓
Inspector
```

rather than:

```text
Inspector
   ↓
BentoBio
```

Do not redesign the entire InspectorSidebar.

Extract the smallest generic API required.

---

# 20. FIX REGISTRY → COMPONENT DEPENDENCIES

If a registry currently imports actual React template components, determine whether this creates an architectural inversion.

Pure metadata can remain in a lower-level/core location.

Component-aware template registration belongs at the appropriate higher layer.

Distinguish:

```text
pure metadata
```

from:

```text
component implementation
```

Do not move files blindly.

Trace all consumers first.

---

# 21. BARREL FILE SAFETY

Inspect relevant:

```text
index.ts
index.tsx
```

files.

Do not allow a generic engine barrel to indirectly import templates.

Prefer narrow imports when a broad barrel introduces higher-level dependencies.

---

# 22. NO TEMPLATE → TEMPLATE IMPORTS

A template must never import another template.

This must remain true:

```text
FORME ───X──→ Meridian
Meridian ─X──→ Saffron
Saffron ──X──→ FORME
```

If two templates need the same functionality, extract genuinely generic functionality into shared infrastructure.

---

# 23. PRESERVE EDITOR PRIMITIVES

Do NOT replace existing editor primitives merely because template-specific JSX would be easier without them.

Preserve existing:

- EditableElement
- EditableImage
- EditableButton
- VisualBuilderContext
- Zustand state
- theme system
- override architecture

Every editable element must remain editable.

---

# 24. PRESERVE ELEMENT IDS

Existing template element IDs are important.

Do not casually regenerate them.

They may be referenced by:

- override maps
- editor state
- saved content
- theme relationships

If an architecture migration changes IDs, stop and assess migration impact.

Do not silently break persisted/editor data.

---

# 25. TEMPLATE VERSIONING

Design the architecture so template schema/versioning can exist.

Distinguish between:

```text
template version
```

and:

```text
content/schema version
```

Do not immediately build a huge migration framework.

But establish the correct extension point.

---

# 26. DO NOT MIX THIS WITH A DATABASE REWRITE

This migration is primarily about template architecture.

Do NOT simultaneously redesign Portiva's entire persistence architecture.

Do NOT introduce a new Supabase schema simply because it might be useful later.

Do NOT implement:

- new draft database architecture
- new publish pipeline
- new autosave system
- database migration system

unless the current architecture absolutely requires a minimal compatibility change.

Persistence modernization is a separate project.

---

# 27. THEME SYSTEM

Do not create a new template-specific theme state system.

Use Portiva's existing theme architecture.

Desired conceptual flow:

```text
Global Theme
     ↓
Template
     ↓
Section
     ↓
Element
     ↓
Optional Override
```

Global theme changes must continue to propagate.

Individual overrides must continue to work.

Do not create unnecessary template-specific theme stores.

---

# 28. DO NOT OVER-TOKENIZE

Do not create a massive design-token system simply because we're creating a template platform.

Create reusable semantic tokens where the existing architecture benefits from them.

Allow intentional template-specific visual values.

The goal is consistency where appropriate, not forcing every premium template to look identical.

---

# 29. FREE TEMPLATES

Do NOT rewrite the free template system as part of this migration.

Free templates may remain hand-written JSX.

The long-term contract should be capable of supporting them, but migration should be:

```text
wrap first
refactor later
```

Only migrate a free template when there is an actual reason to touch it.

Do not destabilize the free template catalog.

---

# 30. MIGRATION STRATEGY — STRANGLER FIG

Do not rewrite the premium system in one operation.

Use a strangler migration.

Initially:

```text
Old Renderer
    │
    ├── Template A → OLD
    ├── Template B → OLD
    ├── Template C → OLD
    └── ...
```

Then progressively:

```text
New Resolver
    │
    ├── Template A → NEW
    ├── Template B → OLD
    ├── Template C → OLD
```

Eventually:

```text
New Resolver
    │
    ├── Template A → NEW
    ├── Template B → NEW
    ├── Template C → NEW
    └── ...
```

Only then delete the old renderer.

---

# 31. PHASE 0 — BASELINE AND SAFETY

Before changing architecture:

### Inspect

Read:

- package.json
- next.config
- tsconfig
- template registry
- premium definitions
- premium renderer
- WorkspaceContainer
- VisualCanvas
- route renderer
- editor primitives
- theme system
- relevant stores
- InspectorSidebar
- barrel files

### Run:

```bash
npx tsc --noEmit
```

and:

```bash
npm run build
```

if feasible.

Record:

- existing TypeScript errors
- existing build errors
- existing warnings
- current bundle information

Do not misattribute pre-existing errors to this migration.

---

# 32. PHASE 0 — IMPORT GRAPH

Inspect the relevant dependency graph.

Specifically determine:

```text
engine → templates?
registry → components?
WorkspaceContainer → templates?
route-renderer → templates?
template → registry?
template → WorkspaceContainer?
template → engine barrel?
Inspector → template?
```

If a circular dependency exists:

```text
STOP
```

Fix the dependency direction before proceeding.

---

# 33. PHASE 0 — TYPESCRIPT SAFETY

If:

```text
typescript.ignoreBuildErrors
```

is currently enabled, investigate the existing state.

The goal is ultimately to have TypeScript function as a real safety net.

If there are unrelated pre-existing errors:

1. document them
2. isolate migration errors
3. do not pretend they are fixed
4. do not introduce new errors

If safely feasible, make `ignoreBuildErrors` strict before the main migration.

If not, do not allow the migration to become a giant unrelated type-cleanup project.

---

# 34. PHASE 1 — BUILD THE TEMPLATE CONTRACT

Implement the smallest stable version of:

```text
TemplateManifest
TemplateModule
TemplateResolver
TemplateRegistry
```

Do not migrate every template yet.

Create the contract first.

Then prove it with one template.

---

# 35. PHASE 1 — FIRST TEMPLATE PILOT

Use:

```text
premium_auto_inventory
```

as the first pilot **if repository inspection confirms it is the safest generic premium candidate**.

If inspection shows another generic premium template is clearly safer, choose that one and explain why.

The pilot must prove:

```text
template ID
    ↓
registry
    ↓
resolver
    ↓
dynamic loader
    ↓
template definition
    ↓
template renderer
    ↓
editor
```

and:

```text
template ID
    ↓
same resolver
    ↓
public renderer
```

---

# 36. PHASE 1 ACCEPTANCE CRITERIA

The pilot is successful only when:

```text
[x] Template has isolated module
[x] Template has explicit identity
[x] No brand string sniffing is needed
[x] Builder resolves it through the new resolver
[x] Public renderer resolves it through the new resolver
[x] Template definition is isolated
[x] Template code is lazy-loadable
[x] Existing editing works
[x] Existing theme behavior works
[x] Existing page navigation works
[x] Existing route works
[x] TypeScript has no new errors
[x] Production build succeeds
[x] No circular dependency exists
```

> **STATUS: PHASE 1 COMPLETED.**
> Pilot: `premium_auto_inventory` → `src/components/templates/premium/auto-inventory/`
> (manifest.ts + definition.ts + renderer.tsx + index.ts).
> Platform core: `src/components/templates/platform/`
> (template-contract in `src/lib/template-contract.ts`, registry, resolver, loaders, manifests).
> Builder (`WorkspaceContainer`) and public renderer (`app/[username]/route-renderer`)
> both resolve through the canonical resolver. Verified: `npx tsc --noEmit` clean.

Do not migrate the next template until these are satisfied.

---

# 37. PHASE 2 — BESPOKE PILOT

After the generic template succeeds, migrate the actual FORME template ID confirmed from the repository.

This is the hardest test.

It must prove the architecture supports:

- custom sections
- bespoke layout
- template-specific visual behavior
- animations
- navigation
- editor integration
- custom presentation
- SectionKit overrides

without modifying the global premium renderer.

---

# 38. BESPOKE ACCEPTANCE CRITERION

The following should become possible:

> I want to change FORME's Hero.

The developer should primarily touch:

```text
templates/premium/forme/
```

and not:

```text
PremiumMultipageTemplate.tsx
```

or a central global renderer.

That is one of the most important success criteria of the migration.

> **STATUS: PHASE 2 COMPLETED.**
> FORME (`premium_creative_portfolio`) → `src/components/templates/premium/creative-portfolio/`
> (manifest.ts + definition.ts + renderer.tsx + index.ts + sections/*).
> Bespoke header (FormeHeader), bespoke hero with client-logo strip, interactive
> services accordion, explore-work grid, project cards, testimonial carousel,
> pricing toggle, story, detail, and contact-as-footer all live template-locally.
> Composed via PremiumShell (`header` override, `hidePageMeta`, `hideFooter`,
> `mainClassName: pb-0`) + SectionKit fallback for non-bespoke section types.
> Brand string sniffing removed from the resolution path — the monolith's
> `isCreativeStudio` branch is no longer on FORME's render path.
> FORME definition slice deleted from `lib/premium-template-definitions.ts`;
> manifest promoted from legacy list to `MODULE_MANIFESTS`.
> Element ids preserved verbatim (creative-home-*, creative-nav-talk,
> premium-brand-name, nav-mobile-*).
> Verified: `npx tsc --noEmit` clean; `npm run build` passes; production chunks
> isolate the module (forme content in its own ~11KB chunk, blackline in its
> own ~8KB chunk); runtime smoke tests: `/forme` 200 (hero + footer rendered),
> `/blacklinemotors` 200, `/dashboard` 200. No engine→template imports.

---

# 39. PHASE 3 — MERIDIAN

Migrate the Meridian/LumiLens family.

This validates that the contract is not accidentally designed around FORME.

If the architecture only works elegantly for FORME, the contract is wrong.

Fix the abstraction before migrating further.

> **STATUS: PHASE 3 COMPLETED.**
> Meridian/LumiLens (`premium_social_ecommerce`) →
> `src/components/templates/premium/social-ecommerce/`
> (manifest.ts + definition.ts + renderer.tsx + index.ts +
> sections/MeridianHeader.tsx + sections/MeridianHero.tsx).
> Proves the contract generalizes: entirely different header grammar
> (circular action buttons / centered wordmark / menu-pill), splayed 7-photo
> collage hero with speech-bubble badges, SectionKit fallback for all other
> section types, suppressed meta strip + footer (`pb-0` main).
> No template→template imports; no shared code was extracted from FORME's
> folder — both modules compose the same lower-level shared runtime instead.
> Definition slice deleted from `lib/premium-template-definitions.ts`;
> manifest promoted to `MODULE_MANIFESTS` (7 legacy premiums remain).
> Element ids preserved verbatim (meridian-brand-name, meridian-menu-label,
> meridian-drawer-link-1..4, meridian-hero-shop-cta, meridian-home-hero-*).
> Verified: `npx tsc --noEmit` clean; `npm run build` passes; template chunks
> lazy-only (none in initial build manifest); runtime smoke tests:
> `/meridianshop` 200 (brand + hero rendered), `/forme` 200,
> `/blacklinemotors` 200, `/dashboard` 200.
> Note: Turbopack co-locates some module code into shared async chunks across
> dynamic-import parent graphs; per-template chunk purity is revisited in
> Phase 7. Initial-payload isolation holds.

---

# 40. PHASE 4 — SAFFRON DOCK

Migrate Saffron Dock.

This gives us three genuinely different bespoke implementations.

At this point the architecture should support:

```text
Generic
Bespoke A
Bespoke B
Bespoke C
```

without modifying global template dispatch logic.

> **STATUS: PHASE 4 COMPLETED.**
> Saffron Dock (`premium_cafe_cloud_kitchen`) →
> `src/components/templates/premium/saffron-cloud-kitchen/`
> (manifest.ts + definition.ts + renderer.tsx + index.ts +
> sections/SaffronSections.tsx: SaffronActions, SaffronStatRow,
> SaffronDockHero, SaffronMenuCards, SaffronStory, SaffronDetail).
> Third bespoke family: bespoke section bodies over the shell's DEFAULT
> header/footer (no meta strip, pb-0 main). Proves bespoke ≠ custom chrome.
> Definition slice deleted from central file; manifest promoted.
> Element ids preserved verbatim (cafe-premium-*).
> Verified: tsc clean, build passes, `/saffrondock` 200 with brand rendered.

---

# 41. PHASE 5 — REMAINING PREMIUM TEMPLATES

Migrate the remaining premium templates.

Generic templates should use the shared SectionKit.

Bespoke templates should have isolated implementations.

Do not duplicate generic infrastructure.

> **STATUS: PHASE 5 COMPLETED.**
> Six generic premiums migrated as manifest + definition + shared renderer:
>
> - `premium/bridal-salon/` (Lina Atelier Pro)
> - `premium/fitness-coach/` (Forge Method Pro)
> - `premium/real-estate-agent/` (Harbor Crest Pro)
> - `premium/skill-educator/` (Atlas Skill Lab Pro)
> - `premium/boutique-agency/` (Tangent Bureau Pro)
> - `premium/personal-brand/` (Mika Vale Pro)
>
> New shared host: `templates/shared/GenericPremiumRenderer.tsx` — PremiumShell
> + SectionKit for every section; generic modules contain ZERO rendering code.
> Definitions moved verbatim (scripted slice); all 10 premium manifests now
> module-owned in MODULE_MANIFESTS. Element ids preserved verbatim.
> Verified: tsc clean, build passes, all six handles render 200 with brand.

# 42. PHASE 6 — REMOVE THE OLD MONOLITH

Only after all premium templates are migrated:

Search the entire repository for:

```text
PremiumMultipageTemplate
```

and verify there are no remaining runtime dependencies.

Only then delete the old monolithic renderer.

Do not delete it early.

Do not leave two competing architectures indefinitely.

> **STATUS: PHASE 6 COMPLETED.**
> Deleted:
> - `src/components/templates/PremiumMultipageTemplate.tsx` (~4.1k lines)
> - `src/lib/premium-template-definitions.ts`
> - `loadLegacyPremiumModule()` from platform/loaders.tsx
> - Strangler fallback branch from platform/resolver.ts
> - `LEGACY_PREMIUM_MANIFESTS` from premium-manifests.ts + registry.ts
> Verified: zero runtime imports of deleted files remain (only historical
> comments); tsc clean; build passes; full route matrix green.

# 43. PHASE 7 — VERIFY REAL CODE SPLITTING

After migration, inspect the production build.

Verify that template-specific code is actually separated into appropriate chunks.

The requirement is:

> The implementation of unused templates should not be included in the initial route payload merely because those templates exist.

Shared runtime code is expected.

Do not optimize for an arbitrary number of requests.

Optimize for correct dependency isolation and lazy loading.

> **STATUS: PHASE 7 COMPLETED.**
> Baseline metrics recorded (production build, Turbopack):
>
> | Metric | Value |
> |---|---|
> | Client chunks total | 50 files / ~2,035 KB |
> | Largest shared chunks | 222 / 143 / 141 / 130 KB |
> | blackline chunk | ~8 KB isolated |
> | forme chunk | ~69 KB isolated |
> | meridian chunk | ~14 KB isolated (+1 shared async co-location) |
> | saffron chunk | ~22 KB isolated |
> | bridal/fitness/realestate/educator/agency/creator | ~8 KB each, isolated |
> | Initial payload template leakage | NONE (verified against build-manifest) |
> | Monolith marker (`isCreativeStudio`) | absent from entire build |
> | Build time | compile ~4–6s, static gen <2s |
>
> Known note: Turbopack co-locates some module copies into shared async chunks
> across dynamic-import parent graphs (meridian appears twice). All such chunks
> are lazy-only; initial-payload isolation is exact. Chunk purity can be
> revisited if Turbopack chunking improves or budgets demand it.

---

# 44. PERFORMANCE BUDGETS

First measure.

Do not invent arbitrary limits.

Establish baseline metrics for:

- initial JS
- template chunk sizes
- build time
- development HMR
- route loading
- template loading

Then introduce reasonable budgets based on real measurements.

Use ratcheting:

```text
baseline
   ↓
measure
   ↓
set reasonable budget
   ↓
warn
   ↓
improve
   ↓
enforce
```

Do not destroy good architecture merely to hit an arbitrary 60 KB number.

---

# 45. DEPENDENCY GOVERNANCE

After the architecture is stable, introduce dependency-boundary enforcement.

`dependency-cruiser` or an equivalent tool may be used if appropriate.

Rules should prevent:

```text
engine → template
core → template component
template → template
template → registry
template → WorkspaceContainer
```

and circular dependency paths.

Do not add a dependency merely because it sounds architecturally sophisticated.

If a lightweight existing tool already solves the problem, prefer it.

---

# 46. TEMPLATE DEVELOPER EXPERIENCE

Once the architecture is stable, make adding Template #11 straightforward.

Desired workflow:

```text
create template folder
        ↓
create manifest
        ↓
create definition
        ↓
create renderer
        ↓
register module
        ↓
template available
```

Eventually, a generator may automate this.

But:

**DO NOT build the generator until the Template Contract has stabilized.**

---

# 47. OPTIONAL FUTURE GENERATOR

After migration, consider:

```bash
pnpm create:template my-template
```

which could generate:

```text
my-template/
├── manifest.ts
├── definition.ts
├── index.tsx
├── sections/
└── theme.ts
```

This is future infrastructure.

Do not allow it to delay the core migration.

---

# 48. VERSIONING AND ELEMENT IDS

Template modules should have a concept of versioning.

If future template changes can affect:

- section structure
- element IDs
- persisted content
- editor overrides

then the architecture should have a place for:

```text
schemaVersion
```

and migrations.

Do not implement a massive migration engine unless required now.

But do not design yourself into a corner.

---

# 49. DO NOT CHANGE PERSISTENCE AS PART OF THIS

The current investigation found that persistence is still relatively limited/simulated.

Do not use this migration as an excuse to redesign persistence.

Do not introduce a new:

```text
sites
draft
published
JSONB
autosave
publish pipeline
```

architecture unless specifically required later.

Keep this project focused.

---

# 50. VISUAL REGRESSION

The migration is architectural, so existing visual behavior must remain stable.

For every migrated premium template verify:

### Desktop

- layout
- typography
- spacing
- colors
- imagery
- navigation
- sections

### Tablet

- responsive layout
- navigation
- spacing
- image behavior

### Mobile

- stacking
- typography
- navigation
- overflow
- touch targets
- section order

Do not redesign templates during migration.

---

# 51. EDITOR REGRESSION

For every migrated premium template verify:

```text
[ ] Text selection
[ ] Text editing
[ ] Image selection
[ ] Image replacement
[ ] Button editing
[ ] Link editing
[ ] Theme changes
[ ] Individual overrides
[ ] Undo
[ ] Redo
[ ] Page switching
[ ] Editor selection
[ ] Editing mode
[ ] Viewing mode
```

Existing editor behavior must remain intact.

---

# 52. ANIMATION REGRESSION

Do not redesign animations.

Verify:

### Viewing mode

- animations work
- links work
- buttons work
- navigation works

### Editing mode

- selection works
- clicks do not unexpectedly navigate
- animations do not interfere with editing

---

# 53. RESPONSIVE REGRESSION

Do not treat:

> "it works on mobile"

as sufficient.

Verify actual behavior, especially:

- navigation
- grids
- images
- typography
- overflow
- sections
- buttons
- editor panels
- page switching

---

# 54. NO UNRELATED REFACTORING

Do NOT use this migration as an excuse to:

- rename everything
- reorganize the entire repository
- rewrite the editor
- rewrite Zustand
- rewrite routing
- redesign the dashboard
- rewrite all free templates
- replace Next.js
- replace Tailwind
- replace Framer Motion
- replace Supabase
- install unnecessary dependencies

The goal is architecture modernization, not a general rewrite.

---

# 55. NO TYPESCRIPT SHORTCUTS

Never use:

```ts
any
```

to bypass architectural problems.

Never use:

```ts
@ts-ignore
```

or:

```ts
@ts-expect-error
```

as migration shortcuts.

Never weaken an interface merely to make the compiler stop complaining.

If an existing editor primitive needs a new generic capability:

1. inspect all consumers
2. make the prop optional when possible
3. preserve backwards compatibility
4. test affected templates

---

# 56. FAILURE CONTAINMENT

A fundamental success condition is:

```text
Bug in Template A
       ↓
Template A affected
       ↓
Template B unaffected
Template C unaffected
Template D unaffected
```

Similarly:

```text
Visual change in Template A
       ↓
Template A changes
       ↓
Template B remains unchanged
```

This is a core reason for the entire migration.

---

# 57. STOP CONDITIONS

Immediately stop the current phase if you encounter:

- circular dependency
- widespread TypeScript errors
- compilation freeze
- hydration errors
- broken editor
- broken template routing
- unrelated template regression
- unexpected static import explosion
- dynamic import cycle
- corrupted template definitions

Do not stack more changes on top of a broken phase.

Restore the last known working state.

Identify the root cause.

Fix it.

Then continue.

---

# 58. REQUIRED VERIFICATION AFTER EACH PHASE

At minimum:

```bash
npx tsc --noEmit
```

and:

```bash
npm run build
```

where feasible.

If development verification is available:

```bash
npm run dev
```

Then test the relevant routes.

Do not proceed to the next migration phase if the current phase has unresolved failures.

---

# 59. FINAL ARCHITECTURE

The final system should conceptually resemble:

```text
                         PORTIVA
                            │
          ┌─────────────────┴─────────────────┐
          │                                   │
     PORTIVA CORE                       TEMPLATE PLATFORM
          │                                   │
    ┌─────┼─────┐                     ┌───────┴────────┐
    │     │     │                     │                │
 Editor Theme State               Registry          Resolver
    │                                 │                │
    │                                 └───────┬────────┘
    │                                         │
    │                                  Dynamic Loader
    │                                         │
    │                ┌────────────────────────┼──────────────────┐
    │                │                        │                  │
    │             Template A              Template B          Template C
    │                │                        │                  │
    │            definition                definition          definition
    │            sections                  sections            sections
    │            renderer                  renderer            renderer
    │                │                        │                  │
    └────────────────┴────────────────────────┴──────────────────┘
                                             │
                                        SectionKit
                                             │
                                      Editor Primitives
```

Dependency direction:

```text
APP / ROUTES
     ↓
TEMPLATE PLATFORM
     ↓
TEMPLATE
     ↓
TEMPLATE-LOCAL COMPONENTS
     ↓
EDITOR / ENGINE PRIMITIVES
     ↓
SHARED UTILITIES
```

Never:

```text
ENGINE → TEMPLATE
```

Never:

```text
TEMPLATE A → TEMPLATE B
```

Never:

```text
TEMPLATE → REGISTRY
```

Never:

```text
ENGINE → ROUTE
```

---

# 60. HOW TO ADD TEMPLATE #101

At the end of this migration, answer:

> "If I want to add Premium Template #101, what files do I need to create or modify?"

The ideal result is close to:

```text
templates/premium/template-101/
    manifest.ts
    definition.ts
    index.tsx
    sections/
```

plus one explicit registration entry if the chosen registry architecture requires it.

There should be **no need to modify**:

```text
PremiumMultipageTemplate.tsx
```

because it should no longer exist.

There should be **no need to edit**:

```text
WorkspaceContainer
```

for every new template.

There should be **no need to edit**:

```text
route-renderer
```

for every new template.

There should be **no brand-name condition** added to a global renderer.

That is the scalability test.

---

# 61. FINAL ACCEPTANCE CRITERIA

## ARCHITECTURE

```text
[ ] Template contract exists
[ ] Template identity is explicit
[ ] One canonical resolver exists
[ ] Builder and public renderer use the same resolver
[ ] Premium templates are independently isolated
[ ] Premium definitions are independently loadable
[ ] Template implementations are lazy-loadable
[ ] No brand string sniffing
[ ] No template-to-template dependencies
[ ] No engine-to-template dependencies
[ ] No circular dependencies
[ ] No unsafe engine barrel dependency
```

## PREMIUM RENDERING

```text
[ ] PremiumShell exists where genuinely useful
[ ] SectionKit exists where genuinely useful
[ ] Generic sections remain reusable
[ ] Bespoke sections can override generic sections
[ ] Bespoke templates don't modify global renderer
[ ] PremiumMultipageTemplate is eventually removed
```

## EDITOR

```text
[ ] Existing editor primitives preserved
[ ] Text editing works
[ ] Image editing works
[ ] Button editing works
[ ] Links work
[ ] Theme changes work
[ ] Individual overrides work
[ ] Undo/redo works
[ ] Editing mode works
[ ] Viewing mode works
```

## PERFORMANCE

```text
[ ] Unused template implementations are not part of initial template payload
[ ] Template definitions are appropriately split
[ ] Production chunks verified
[ ] Baseline metrics recorded
[ ] No unnecessary dependencies added
```

## REGRESSION

```text
[ ] Free templates still work
[ ] Premium templates still work
[ ] Existing routes still work
[ ] Dashboard still works
[ ] Mobile still works
[ ] No hydration errors
[ ] No runtime import errors
[ ] No compilation freeze
```

## ENGINEERING

```text
[ ] npx tsc --noEmit verified
[ ] npm run build verified
[ ] npm run dev verified where applicable
[ ] No new TypeScript errors
[ ] No any used as a shortcut
[ ] No ts-ignore
[ ] No ts-expect-error
[ ] Dependency boundaries verified
```

---

# 62. FINAL REPORT REQUIRED FROM YOU

When the migration is complete, do NOT simply say:

> "Done."

Provide a structured report:

## 1. Executive Summary

What changed.

## 2. Old Architecture

Show the old architecture.

## 3. New Architecture

Show the new architecture.

## 4. Template Contract

Show the actual final contract.

## 5. Registry

Explain the final registry.

## 6. Resolver

Explain the final resolver.

## 7. Dynamic Loading

Explain exactly how templates are lazy-loaded.

## 8. SectionKit

Explain what is shared and what is bespoke.

## 9. Template Isolation

Explain how Template A is isolated from Template B.

## 10. Dependency Direction

Explain the final dependency graph.

## 11. Files Created

List them.

## 12. Files Modified

List them and explain why.

## 13. Files Deleted

List them and explain why.

## 14. Old Renderer

Explain when and why `PremiumMultipageTemplate` was removed.

## 15. Editor Compatibility

Explain what was verified.

## 16. Performance

Provide actual before/after measurements where available.

## 17. Tests

Report actual commands and results.

## 18. Remaining Technical Debt

Be honest.

## 19. Adding Template #101

Give exact steps.

---

# 63. MOST IMPORTANT RULE

Do not optimize for:

> "How much code can you change?"

Optimize for:

> **"How safely can Portiva evolve into a template platform while preserving everything that already works?"**

The migration must be:

**incremental, typed, reversible, testable, isolated, and measurable.**

Do not sacrifice Portiva's existing editor architecture for theoretical cleanliness.

Do not sacrifice template individuality for generic abstraction.

Do not sacrifice correctness for speed.

Do not sacrifice maintainability for a quick migration.

---

# 64. FINAL QUALITY BAR

At the end, ask yourself:

> If Portiva had 100 premium templates tomorrow, would adding Template #101 require opening a giant shared renderer?

If yes, the architecture is not finished.

Ask:

> Can a developer modify Template A without creating meaningful regression risk for Template B?

If no, the architecture is not finished.

Ask:

> Can the builder and public website resolve the same template through the same system?

If no, the architecture is not finished.

Ask:

> Can the editor still edit everything it edited before?

If no, the architecture is not finished.

Ask:

> Is the engine completely independent of specific templates?

If no, the architecture is not finished.

Ask:

> Does the production build actually demonstrate template-level code splitting?

If no, the architecture is not finished.

And finally:

> Does the new system make Portiva easier to extend **without making it harder to understand**?

If no, stop and reassess the abstraction.

**This is the standard for the migration.**
