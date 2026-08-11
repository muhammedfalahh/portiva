/**
 * =============================================================================
 * PORTIVA: EditModeContext — Editing State Provider
 * =============================================================================
 *
 * A React context that controls whether template components render in
 * "read-only" mode (public profile pages) or "editable" mode (dashboard
 * creator workspace).
 *
 * Architecture:
 *   - The dashboard page wraps its template preview in:
 *       <EditModeProvider isEditing={true} onContentChange={handler}>
 *         <TemplateComponent />
 *       </EditModeProvider>
 *
 *   - The public [username] page either omits the provider entirely (the
 *     context defaults to read-only) or wraps with isEditing={false}.
 *
 *   - Individual EditableText components consume this context to decide
 *     whether to render a semantic HTML element or a contentEditable div.
 *
 * The onContentChange callback signature:
 *   (blockId: string, field: string, value: string | number) => void
 *
 *   - blockId: The UUID of the bento_blocks row being edited
 *   - field:   The JSONB content key being modified (e.g., "title", "price")
 *   - value:   The new value from the inline editor
 *
 * This allows the dashboard to capture all inline edits and batch them
 * into a single JSONB update payload for the Supabase content column.
 */

'use client';

import React, { createContext, useContext, useCallback } from 'react';

// ─── Types ──────────────────────────────────────────────────────────────────

/** Callback signature for capturing inline content edits */
export type ContentChangeHandler = (
  blockId: string,
  field: string,
  value: string | number,
) => void;

interface EditModeContextValue {
  /** Whether components should render as editable */
  isEditing: boolean;
  /** Callback invoked when an EditableText value changes */
  onContentChange: ContentChangeHandler;
}

interface EditModeProviderProps {
  /** Enable editing mode for all descendant EditableText components */
  isEditing: boolean;
  /** Handler to capture content changes. Required when isEditing is true. */
  onContentChange?: ContentChangeHandler;
  children: React.ReactNode;
}

// ─── Context ────────────────────────────────────────────────────────────────

/**
 * Default context: read-only mode with a no-op change handler.
 * Components that consume this context without a provider wrapping them
 * will safely render in public/read-only mode.
 */
const EditModeContext = createContext<EditModeContextValue>({
  isEditing: false,
  onContentChange: () => {},
});

// ─── Provider ───────────────────────────────────────────────────────────────

export function EditModeProvider({
  isEditing,
  onContentChange,
  children,
}: EditModeProviderProps) {
  // Stabilize the no-op fallback so it doesn't cause unnecessary re-renders
  const stableNoOp = useCallback(() => {}, []);

  const value: EditModeContextValue = {
    isEditing,
    onContentChange: onContentChange ?? stableNoOp,
  };

  return (
    <EditModeContext.Provider value={value}>
      {children}
    </EditModeContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

/**
 * Access the current editing context.
 *
 * @returns { isEditing, onContentChange }
 *
 * @example
 * const { isEditing, onContentChange } = useEditMode();
 * if (isEditing) {
 *   // Render contentEditable
 * }
 */
export function useEditMode(): EditModeContextValue {
  return useContext(EditModeContext);
}
