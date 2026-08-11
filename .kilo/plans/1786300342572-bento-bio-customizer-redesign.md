# Bento Bio Customizer — Implementation Plan

Filename: .kilo/plans/1786300342572-bento-bio-customizer-redesign.md

## Summary

Redesign the Bento Bio template's customizer/editor panel only. Deliver a visual, beginner-friendly, progressive-disclosure customizer that feels like a modern design tool (Canva/Figma/Framer inspired) while preserving Portiva's existing editor architecture (VisualBuilderContext, Editable primitives, Zustand workspace store, theme system).

This plan keeps changes isolated to the Bento Bio inspector and adds a small set of focused UI components under `src/components/engine/` to avoid touching other templates or global systems.

## Scope

- Replace the current Bento-specific customizer UI inside `InspectorSidebar.tsx` (the `BentoBioInspectorPanel` function) with a redesigned, visual panel.
- Primary focus: Cards management (visual card manager, drag-reorder, add, duplicate, hide/show, delete, edit) and improved Design/Theme/Layout sections for Bento Bio.
- Preserve all underlying state mutations and editor APIs (useVisualBuilder methods: `setTemplateData`, `applyThemePreset`, `updateThemeColor`, `updateMediaOverride`, `updateStyleOverride`, `updateButtonOverride`, etc.).
- Do NOT modify other templates, shared global components, or replace core editor primitives.

## Files To Add / Edit (minimal set)

Edit:
- `src/components/engine/InspectorSidebar.tsx` — Replace/redirect existing `BentoBioInspectorPanel` content to new components (keep exported name). Keep header and sidebar shell. Minimal edits outside the Bento panel.

Add (new small components grouped into one file to keep diffs small):
- `src/components/engine/BentoCustomizer.tsx` — New file exporting a default `BentoCustomizer` component and internal subcomponents:
  - CardManager (visual list)
  - CardItem (compact preview + actions)
  - CardEditor (progressive editor for selected card)
  - CardTypePicker (visual card-type selector used by +Add Card)
  - LayoutPicker (visual layout size picker for Bento grid)

(Alternative: split into multiple files if preferred, but this single file keeps the refactor minimal.)

## High-level UX Layout (Inspector Sidebar) — Top-level navigation

Replace the 3-tab micro UI with a clear top-level navigation inside the existing Bento panel (visually styled buttons). Tabs (left-to-right):

- Content (maps existing Profile tab)
- Cards (new visual manager — highest priority)
- Design (surface / typography / spacing groups)
- Theme (presets + custom theme controls)
- Layout (Bento grid & card size selection)
- Advanced (less-frequent settings; JSON export/import, reset, accessibility)

Icons: reuse `lucide-react` (already in repo and used in InspectorSidebar). Keep consistent sizes and tooltips.

## Card Manager (UX & Behavior)

Goals:
- Show a vertical scrollable list of visual card representations (compact previews) that look like the real cards.
- Provide primary actions inline: Edit (select), Duplicate, Hide/Show (eye), Delete, Drag handle.
- Support keyboard actions (Up/Down buttons) as accessible alternative to drag-and-drop.
- Add Card opens a visual card-type selector (CardTypePicker) — not a big form.
- Card preview updates live as you edit its properties.

Implementation details:
- Card list should include hidden cards with a muted visual state and the ability to toggle visibility.
- Use the existing Bento config shape; do not change storage schema. Use `setTemplateData` via the same updateConfig approach already in `BentoBioInspectorPanel`.
- For reordering, implement a native HTML5 drag-and-drop implementation (no new DnD library). This keeps bundle size small and avoids introducing new global state:
  - CardItem: `draggable={true}`
  - onDragStart: set `dataTransfer` with dragged card id, add `dragging` css class
  - onDragOver: preventDefault and compute insert index (track hovered card index in local state)
  - onDrop: reorder array using the existing `boxes` array and call `updateConfig((prev) => ({... prev, boxes: reordered}))`
  - onDragEnd: clear drag state
- Keep existing up/down arrow methods (handleBoxMove) as keyboard-friendly fallback.
- Show drop position indicator (thin separator) during drag over; animate small transform.

Card item UI:
- Left: 84×56 visual preview (static rendering of card content based on `box.type` and `variant` — simplified but visually matching the canvas), with muted/hidden overlay if applicable.
- Middle: Title, subtitle, small badges (badge text), a micro copy of important content such as price or artist.
- Right: actions in a consistent order — visibility toggle (Eye/EyeOff with aria-label & tooltip), drag handle (GripVertical), overflow (•••) for duplicate/delete/more.
- Hover reveals secondary actions; primary action is Edit/select (clicking the row selects the card and scrolls the CardEditor into view).

CardTypePicker (Add Card):
- Full-width popover/grid showing supported Bento card types (icons + label + 1-line description)
- Clicking a tile calls the same `addBox(type)` method already present in the current inspector. Use the same `createBox` factory defined in the existing panel.
- Default the new card to inherit theme defaults and the template's `linkVariant`/`boxStyle`.

## Card Editor (Progressive Disclosure)

When a card is selected (activeCardIdx), reveal a focused CardEditor section next to/under the manager.

Layout of CardEditor:
- Header: Card type, mini-preview, quick actions (duplicate, delete, hide)
- Sections (collapsible):
  - Content (visible by default): Title, Subtitle, URL, Image upload (ImageFileUploader already exists), CTA text — show only fields relevant to the card type.
  - Appearance (collapsed): Variant selector (visual tiles), Card size (visual grid tiles mapping to col-span-1/col-span-2), Rotation toggle, Badge, Icon picker
  - Layout (collapsed/optional): Padding presets, Compact / Spacious toggles (affects internal padding / text sizes). Keep few smart defaults only.
  - Advanced (collapsed): id, isLocked, JSON preview (read-only) + Reset to template defaults

Rules:
- Only show relevant inputs for the card type (contextual settings). Use explicit human labels.
- Replace technical inputs (border radius px, shadow CSS) with visual tokens (None / Soft / Medium / Strong), corner presets (Sharp / Soft / Round) etc.
- Changes call `handleBoxChange(id, key, value)` which uses `setTemplateData` to update `bentoBioConfig.boxes` (preserve existing behavior).

## Design / Theme / Layout Tabs

Design tab (appearance groups):
- Appearance: Card Surface style (glass / solid / outline / soft) + Noise intensity + Avatar ring (visual tiles)
- Typography: Font selection (use `FONT_OPTIONS` from `theme.types`), base heading/body size slider (small set of choices)
- Effects: Shadow presets (None / Soft / Medium / Strong) — map to existing CSS class set in `surfaceClasses` or `BentoCard` classes
- Spacing: Card gap presets (Compact / Default / Spacious)

Theme tab (visual identity):
- Presets grid (visual swatches) — reuse `BENTO_BIO_PRESETS` array and call `applyPreset(preset.id)` (existing helper) which uses `applyThemePreset` and `updateConfig`.
- Show a visual theme preview row (small bar showing background/surface/foreground/primary/border)
- Button: Customize Theme (opens the small theme color controls already present in the InspectorSidebar — reuse `updateThemeColor`)

Layout tab:
- Bento grid presets (2-column default, 1-column mobile preview toggle) and Card Size Picker (visual tiles: 1x1, 2x1, 2x2/featured) that maps to allowed colSpan values — update boxes' `variant` or a dedicated `size` key (use `variant` mapping since Bento uses `variant` and type to determine colSpan).
- Provide a safe subset of choices (Square, Wide, Tall, Featured) so users can't break the design.

Advanced tab:
- JSON export/import (read-only preview + copy) — useful for power users
- Reset: reset Bento to DEFAULT_BENTO_CONFIG (preserve existing template defaults)
- Accessibility checks: color contrast hint for theme primary vs background using `ensureThemeContrast` (existing helper used in `VisualBuilderContext`) — show warning if contrast fails

## Accessibility

- Every icon-only button must have `aria-label` and a short tooltip.
- Focusable controls must have visible focus ring (existing utility classes used by project).
- Drag-and-drop must provide keyboard alternatives (up/down buttons, and keyboard accessible reorder actions exposed in overflow menu).
- Provide textual descriptions for all visual tiles (use aria-label and titles).

## Performance

- Keep heavy rendering out of the card list: CardItem preview should be light-weight — render simplified markup (image tag + trimmed text) and avoid editable primitives there.
- Memoize CardList and CardItem to prevent unnecessary re-renders.
- Use local component state for drag-over indices and collapse expensive panels by default.

## Implementation Tasks (ordered)

1. Add new file `src/components/engine/BentoCustomizer.tsx` implementing:
   - `BentoCustomizer` (default export) — uses `useVisualBuilder()` and encapsulates the new UI.
   - `CardManager` — renders card list and `+ Add card` button.
   - `CardItem` — renders the preview, drag handlers, and actions.
   - `CardTypePicker` — visual selector for card types.
   - `CardEditor` — progressive editing UI for the selected card.
   - `LayoutPicker` — small visual grid selector.

   Implementation notes:
   - Use the same `createBox`, `addBox`, `handleBoxChange`, `handleBoxDelete`, `handleBoxDuplicate`, `handleBoxMove` functions currently inside `BentoBioInspectorPanel`. Prefer pulling those helper functions into `BentoCustomizer` and reuse them directly.
   - Ensure `boxes` includes hidden items: `const boxes = (resolvedConfig.boxes || DEFAULT_BENTO_BOXES);` (do not filter out `isHidden` here).
   - Export small helper `renderCompactPreview(box, config)` used by `CardItem` to show small visual preview.

2. Modify `InspectorSidebar.tsx`:
   - Replace the internal `BentoBioInspectorPanel` implementation (lines ~2401 onward) with a small wrapper that imports and renders `<BentoCustomizer />`. Keep the same function name exported (so other code referencing `BentoBioInspectorPanel` remains valid).
   - Preserve the outer sidebar shell and header — only internal content changes.

3. Implement native drag-and-drop and keyboard reorder handling in `CardManager`:
   - Native DnD handlers described earlier.
   - Fall back to `handleBoxMove(id, 'up'|'down')` (existing behavior) for keyboard/aria support.

4. Implement the `CardTypePicker` UI using the same supported types currently used by the code when calling `createBox` (link_card, media_card, stats_card, quote_card, utility_card, social_card, announcement_card, product_card, music_card). Use icons and short descriptions. Ensure accessibility attributes.

5. Implement `CardEditor` progressive UI for the selected card. Show only relevant inputs per `type`. For image fields reuse existing `ImageFileUploader` and `ImageFileUploader`/`updateMediaOverride` semantics used elsewhere in `InspectorSidebar`.

6. Implement Design / Theme / Layout panels inside `BentoCustomizer` or by reusing small portions of InspectorSidebar's existing Theme controls (color pickers). Reuse `applyPreset` logic already present.

7. Add unit / manual validation hooks and console-friendly debug logs during development.

8. Run TypeScript and Build verification, iterate until clean.

## Acceptance / Validation Checklist (must be executed manually after implementation)

Automated checks:
- `npx tsc --noEmit` — passes
- `npm run build` — passes (the project builds)

Manual checks in the running app (dev server):
- Bento Bio template loads correctly in WorkspaceContainer when selected.
- Open the Inspector Sidebar and select Bento Bio template; new customizer appears.
- Top-level tabs exist and are immediately understandable: Content | Cards | Design | Theme | Layout | Advanced
- Cards tab (Card Manager):
  - Shows visual previews for each card, including hidden cards (muted)
  - Clicking a card selects it and opens the CardEditor
  - + Add Card opens the visual CardTypePicker; adding a card inserts it at the end and selects it
  - Duplicate creates a new copy with unique id and `Copy` suffix
  - Hide/Show toggles `isHidden` and updates canvas preview immediately
  - Delete removes the card (with a confirmation in overflow menu)
  - Reorder via drag-and-drop updates the visual canvas order immediately
  - Keyboard reorder via up/down buttons works (and updates preview)
- Card Editor:
  - Content fields show only relevant fields (title, subtitle, image, url etc.)
  - Image replacement uses existing ImageFileUploader and updates preview immediately
  - Appearance options (variant, size, badge) update the preview
  - Advanced exposes id, isLocked and JSON preview
- Design tab: Surface, Noise, Avatar ring controls update preview
- Theme tab: Presets show visual swatches and `Apply` sets theme + updates preview. Color pickers update theme with live feedback.
- Layout tab: Card size choices update card visuals (col-spans) in the canvas
- Advanced tab: Reset to default and JSON export copy works
- Existing editable primitives still work on the canvas: clicking text/image should allow inline editing as before
- Other templates remain unchanged (Smoke-test: open a non-Bento template and ensure Inspector shows previous behavior)
- No circular imports or duplicate state objects introduced

## Implementation Notes & Safety

- Keep the Bento-specific UI in a new file and import it from `InspectorSidebar.tsx` to minimize risk of touching unrelated code.
- Use `useVisualBuilder()` inside the new `BentoCustomizer` so we do not create extra Zustand stores or duplicate state.
- Memoize CardItem and CardManager to minimize re-renders when editing a card.
- Avoid using the Editable* primitives inside the manager preview (renders should be static) to avoid interfering with selection state — use them only on the canvas and in the CardEditor when appropriate.
- Keep transformations to `templateData.bentoBioConfig.boxes` only — do not modify top-level workspace store shape.

## Risks & Mitigations

Risk: Drag-and-drop can be brittle across browsers.
- Mitigation: Use native HTML5 DnD with simple handlers and keep keyboard reorder (up/down) as parity.

Risk: New UI introduces regressions to other templates.
- Mitigation: Keep all new components local to engine and ensure `InspectorSidebar` changes are only executed when `isBentoBioTemplate` is true (same condition as today). Do not change global inspector behavior.

Risk: Increase in bundle size & render cost.
- Mitigation: Keep previews lightweight and memoized; do not import heavy third-party libs.

## Rollout / Backout

- Implement behind an if-check that only renders the new `BentoCustomizer` when `isBentoBioTemplate` is true (this is already the case in `InspectorSidebar`). If a problem is detected, revert `InspectorSidebar` to the previous `BentoBioInspectorPanel` implementation (keep a commit with old panel intact as a quick rollback).

## Deliverable Checklist for the implementer

- [ ] Add `src/components/engine/BentoCustomizer.tsx` and implement components described above
- [ ] Update `src/components/engine/InspectorSidebar.tsx` to import and render `BentoCustomizer` inside `BentoBioInspectorPanel`
- [ ] Ensure `boxes` list includes hidden items in manager
- [ ] Implement native DnD + keyboard reorder fallback
- [ ] Preserve & reuse `createBox`, `addBox`, `handleBoxChange`, `handleBoxDelete`, `handleBoxDuplicate`, and `applyPreset` logic
- [ ] Add accessible labels, tooltips and keyboard support for all actions
- [ ] Run `npx tsc --noEmit` and `npm run build` and fix any type/build errors
- [ ] Perform the Manual Acceptance checklist end-to-end

## Notes / Non-goals

- This plan does not change the Bento canvas rendering, editable primitives, or the core VisualBuilderContext.
- It does not add a global drag-and-drop library; we will implement a lightweight HTML5 DnD solution.
- We intentionally keep theme and design controls limited to commonly-used options; do not expose raw CSS.

---

If you want, I can now produce a patch that implements this plan (adds the new `BentoCustomizer.tsx` and updates `InspectorSidebar.tsx`) and run the TypeScript/build checks. Recommended: implement in a single focused commit and run `npx tsc --noEmit` during development.
