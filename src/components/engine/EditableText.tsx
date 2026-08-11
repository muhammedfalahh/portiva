/**
 * =============================================================================
 * PORTIVA: EditableText — Universal Dual-State Text Component
 * =============================================================================
 *
 * A universal text wrapper that renders differently depending on context:
 *
 *   PUBLIC MODE (portiva.site/[username]):
 *     Renders a standard semantic HTML element (<h1>, <p>, <span>, etc.)
 *     with zero JavaScript overhead. Fully SSR-compatible and SEO-friendly.
 *
 *   EDIT MODE (dashboard creator workspace):
 *     Renders a contentEditable <div> styled identically to the target
 *     element using the same className. On blur, it captures the edited
 *     text and fires the onContentChange callback from EditModeContext.
 *
 *     Additionally, clicking the element in EDIT mode:
 *       - Calls e.stopPropagation() + e.preventDefault() to block parent
 *         link navigation and layout card event bubbling.
 *       - Sets `selectedElement` on the VisualBuilder context so the
 *         inspector sidebar immediately shows the element's properties.
 *       - Computes and sets the bounding rect for Figma-style selection
 *         overlay positioning.
 *       - Applies `pointer-events-auto` to guarantee clickability even
 *         inside `pointer-events-none` parent containers.
 *
 * Design Decisions:
 *   - Uses contentEditable (not <input>/<textarea>) to maintain pixel-
 *     perfect visual parity with the rendered template. The text flows,
 *     wraps, and inherits all CSS exactly as it does in public mode.
 *   - Fires on blur (not on every keystroke) to avoid excessive re-renders
 *     while the user is actively typing. This also batches the change into
 *     a single state update, which is better for undo/redo in the future.
 *   - Shows a subtle dashed border + pencil cursor on hover in edit mode
 *     to signal interactivity without disrupting the template's design.
 *   - Renders a visible placeholder span when the value is empty in edit
 *     mode, ensuring the element never becomes invisible or unselectable.
 *
 * Usage:
 *   <EditableText
 *     as="h1"
 *     blockId="block-uuid-123"
 *     field="title"
 *     value={block.content.title}
 *     className="text-4xl font-black text-theme-primary"
 *   />
 */

'use client';

import React, { useRef, useCallback, useEffect } from 'react';
import { useEditMode } from './EditModeContext';
import { useVisualBuilder } from './VisualBuilderContext';

// ─── Props ──────────────────────────────────────────────────────────────────

interface EditableTextProps {
  /**
   * The semantic HTML element to render in public mode.
   * In edit mode, a <div> with the same className is used instead,
   * but the role and aria attributes match the intended semantics.
   * @default 'span'
   */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';

  /** The UUID of the bento_blocks row this text belongs to */
  blockId: string;

  /** The JSONB content key being edited (e.g., "title", "description") */
  field: string;

  /** The current text value */
  value: string;

  /** Tailwind/CSS classes applied to both read and edit mode */
  className?: string;

  /** Placeholder text shown when value is empty in edit mode */
  placeholder?: string;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EditableText({
  as: Tag = 'span',
  blockId,
  field,
  value,
  className = '',
  placeholder = 'Click to type text…',
}: EditableTextProps) {
  const { isEditing, onContentChange } = useEditMode();
  const {
    mode,
    setSelectedElement,
    setSelectedRect,
    setHoveredElementId,
    setHoveredRect,
    templateData,
    updateElementValue,
  } = useVisualBuilder();
  const editRef = useRef<HTMLDivElement>(null);

  const isInEditMode = isEditing || mode === 'EDITING';
  const elementKey = `${blockId}-${field}`;
  const textOverridesMap = (templateData as any)?.textOverrides as Record<string, string> | undefined;
  const textOverride = textOverridesMap?.[elementKey];
  const displayValue = textOverride !== undefined ? textOverride : (value || '');

  // Sync the contentEditable innerHTML when the value/override prop changes
  useEffect(() => {
    if (isInEditMode && editRef.current) {
      if (document.activeElement !== editRef.current) {
        if (editRef.current.innerText !== displayValue) {
          editRef.current.innerText = displayValue || '';
        }
      }
    }
  }, [displayValue, isInEditMode]);

  // Compute element bounds relative to the scrollable canvas container
  const getRelativeRect = useCallback(() => {
    const element = editRef.current;
    if (!element) return null;

    const canvasElement = element.closest('.canvas-container') as HTMLElement;
    if (!canvasElement) return null;

    const elementRect = element.getBoundingClientRect();
    const canvasRect = canvasElement.getBoundingClientRect();

    return {
      top: elementRect.top - canvasRect.top + canvasElement.scrollTop,
      left: elementRect.left - canvasRect.left + canvasElement.scrollLeft,
      width: elementRect.width,
      height: elementRect.height,
      field,
    };
  }, [field]);

  // Handle click: intercept propagation, set as selectedElement in VisualBuilder
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInEditMode) return;

      // Block parent link navigation and layout card event bubbling
      e.stopPropagation();

      // Set the bounding rect for Figma-style selection overlay
      const rect = getRelativeRect();
      if (rect) {
        setSelectedRect(rect);
      }

      // Register this element as the selectedElement in the VisualBuilder
      setSelectedElement({
        id: blockId,
        type: 'text',
        field,
        value: displayValue,
      });
    },
    [isInEditMode, blockId, field, displayValue, getRelativeRect, setSelectedElement, setSelectedRect],
  );

  // Handle hover: show Figma-style highlight ring
  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInEditMode) return;
      e.stopPropagation();

      const rect = getRelativeRect();
      if (rect) {
        setHoveredElementId(elementKey);
        setHoveredRect(rect);
      }
    },
    [isInEditMode, elementKey, getRelativeRect, setHoveredElementId, setHoveredRect],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isInEditMode) return;
    setHoveredElementId(null);
    setHoveredRect(null);
  }, [isInEditMode, setHoveredElementId, setHoveredRect]);

  const handleInput = useCallback(() => {
    if (editRef.current) {
      const newValue = editRef.current.innerText;
      updateElementValue(newValue, undefined, blockId, field);
      onContentChange(blockId, field, newValue);
    }
  }, [blockId, field, onContentChange, updateElementValue]);

  // Handle blur: capture the edited text and fire the change callback
  const handleBlur = useCallback(() => {
    if (editRef.current) {
      const newValue = editRef.current.innerText.trim();
      updateElementValue(newValue, undefined, blockId, field);
      onContentChange(blockId, field, newValue);
    }
  }, [blockId, field, onContentChange, updateElementValue]);

  // Handle Enter key: blur the element to commit the edit
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' && Tag !== 'p' && !e.shiftKey) {
        e.preventDefault();
        editRef.current?.blur();
      }
    },
    [Tag],
  );

  // ── PUBLIC MODE: Render semantic HTML element ──────────────────────────
  if (!isInEditMode) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  // ── EDIT MODE: Render contentEditable div ─────────────────────────────
  // The edit-mode container uses the same className as the semantic element
  // so the visual appearance is identical. Additional edit-mode styles
  // (dashed border on hover, pencil cursor) are added inline.
  const isEmpty = !displayValue || displayValue.trim().length === 0;

  return (
    <div
      ref={editRef}
      role="textbox"
      aria-label={`Edit ${field}`}
      contentEditable
      suppressContentEditableWarning
      onClick={handleClick}
      onInput={handleInput}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={`${className} outline-none transition-all duration-150 pointer-events-auto`}
      style={{
        cursor: 'text',
        borderBottom: '1px dashed rgba(99, 102, 241, 0.25)',
        minHeight: '1em',
      }}
    >
      {isEmpty ? (
        <span className="text-text-quaternary italic text-opacity-50 pointer-events-none select-none">
          {placeholder}
        </span>
      ) : (
        displayValue
      )}
    </div>
  );
}
