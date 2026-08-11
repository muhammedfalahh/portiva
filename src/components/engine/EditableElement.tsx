/**
 * =============================================================================
 * PORTIVA: EditableElement — Universal Interactive & Inline-Editable Wrapper
 * =============================================================================
 *
 * This wrapper intercepts events and calculates bounding coordinates for absolute
 * hover/selection overlay rendering. It also applies per-element style overrides
 * from the VisualBuilderContext, enabling users to customize background colors,
 * borders, spacing, and other visual properties on any wrapped element.
 *
 * Enhanced Text Editing Features:
 *   1. Full Inline contentEditable editing on canvas for all text/heading elements.
 *   2. Real-time text override resolution from templateData.textOverrides.
 *   3. Dual synchronization with VisualBuilderContext and EditModeContext.
 *   4. Preserves 100% of original semantic HTML tags, fonts, styles, and layout.
 */

'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useVisualBuilder, type SelectedElement } from './VisualBuilderContext';
import { useEditMode } from './EditModeContext';
import { useWorkspaceStore } from './useWorkspaceStore';
import { styleOverrideToCSSProperties, styleOverrideToHoverCSS } from '@/lib/theme.types';

// ─── Props ──────────────────────────────────────────────────────────────────

interface EditableElementProps {
  /** The HTML tag to render */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'a' | 'div' | 'header' | 'footer' | 'section' | 'nav' | 'main' | 'article' | 'aside';
  /** Unique ID of the block or section containing the text */
  id: string;
  /** Field name of the text payload (e.g. "title", "description", "background") */
  field: string;
  /** Current text value */
  value: string;
  /** Type identifier for inspector rendering (default: 'text') */
  type?: string;
  /** Extra CSS/Tailwind classes */
  className?: string;
  /** Optional custom child components */
  children?: React.ReactNode;
  /** Default color hex if no override is set in the database */
  defaultColor?: string;
  /** Additional inline styles (merged with overrides) */
  style?: React.CSSProperties;
  /** Optional href for anchor tags */
  href?: string;
  /** Optional target attribute */
  target?: string;
  /** Optional rel attribute */
  rel?: string;
  /** Optional click handler */
  onClick?: (e: React.MouseEvent<any>) => void;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EditableElement({
  as: Tag = 'span',
  id,
  field,
  value,
  type = 'text',
  className = '',
  children,
  defaultColor,
  style: propStyle,
  href,
  target,
  rel,
  onClick: onClickProp,
}: EditableElementProps) {
  const {
    mode,
    selectedElement,
    templateData,
    setHoveredElementId,
    setSelectedElement,
    setHoveredRect,
    setSelectedRect,
    getStyleOverride,
    updateElementValue,
  } = useVisualBuilder();

  const { isEditing: isEditModeActive, onContentChange } = useEditMode();
  const canvasZoom = useWorkspaceStore((s) => s.canvasZoom);

  const elementRef = useRef<HTMLElement | null>(null);
  const [isHoveredLocal, setIsHoveredLocal] = useState(false);

  const isInEditMode = mode === 'EDITING' || isEditModeActive;
  const isBgType = type === 'box' || type === 'container' || type === 'background' || type === 'section';
  const isEditableText = isInEditMode && !isBgType;

  const isSelected = selectedElement?.id === id && selectedElement?.field === field;

  // Resolve text override from templateData.textOverrides, falling back to value prop
  const elementKey = `${id}-${field}`;
  const textOverridesMap = (templateData as any)?.textOverrides as Record<string, string> | undefined;
  const textColorsMap = (templateData as any)?.textColors as Record<string, string> | undefined;

  const textOverride = textOverridesMap?.[elementKey];
  const displayValue = textOverride !== undefined ? textOverride : (value || '');

  // Get text color override from textColors map
  const colorOverride = textColorsMap?.[elementKey];
  const activeColor = colorOverride || defaultColor || '';

  // Get per-element style overrides
  const styleOverride = getStyleOverride(elementKey);
  const overrideCSS = styleOverrideToCSSProperties(styleOverride);
  const hoverCSS = styleOverrideToHoverCSS(styleOverride);

  // Build the final style object
  const customStyle: React.CSSProperties = {
    ...(propStyle || {}),
    ...(colorOverride
      ? (isBgType ? { backgroundColor: colorOverride } : { color: colorOverride })
      : {}),
    ...overrideCSS,
    ...(isHoveredLocal && !isInEditMode ? hoverCSS : {}),
  };

  // Compute element bounds relative to the scrollable canvas container.
  const getRelativeRect = useCallback(() => {
    const element = elementRef.current;
    if (!element) return null;

    const canvasElement = element.closest('.canvas-container') as HTMLElement;
    if (!canvasElement) return null;

    const elementRect = element.getBoundingClientRect();
    const canvasRect = canvasElement.getBoundingClientRect();
    const zoom = canvasZoom || 1;

    return {
      top: (elementRect.top - canvasRect.top + canvasElement.scrollTop) / zoom,
      left: (elementRect.left - canvasRect.left + canvasElement.scrollLeft) / zoom,
      width: elementRect.width / zoom,
      height: elementRect.height / zoom,
      field,
    };
  }, [field, canvasZoom]);

  // Sync selection rect dynamically when size or layout changes
  useEffect(() => {
    if (isInEditMode && isSelected && elementRef.current) {
      const updateRect = () => {
        const rect = getRelativeRect();
        if (rect) {
          setSelectedRect(rect);
        }
      };

      updateRect();

      const observer = new ResizeObserver(() => {
        updateRect();
      });
      observer.observe(elementRef.current);

      window.addEventListener('resize', updateRect);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateRect);
      };
    }
  }, [isInEditMode, isSelected, displayValue, getRelativeRect, setSelectedRect]);

  // Sync innerText on the DOM element when text overrides change externally
  useEffect(() => {
    if (isEditableText && elementRef.current) {
      if (document.activeElement !== elementRef.current) {
        if (elementRef.current.innerText !== displayValue) {
          elementRef.current.innerText = displayValue;
        }
      }
    }
  }, [displayValue, isEditableText]);

  // Mouse event handlers for EDITING mode
  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHoveredLocal(true);
    if (!isInEditMode) return;
    e.stopPropagation();

    const rect = getRelativeRect();
    if (rect) {
      setHoveredElementId(elementKey);
      setHoveredRect(rect);
    }
  };

  const handleMouseLeave = () => {
    setIsHoveredLocal(false);
    if (!isInEditMode) return;
    setHoveredElementId(null);
    setHoveredRect(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClickProp) {
      onClickProp(e);
    }

    if (!isInEditMode) return;

    // Stop bubbling to container cards
    e.stopPropagation();

    const rect = getRelativeRect();
    if (rect) {
      setSelectedRect(rect);
    }

    const elementPayload: SelectedElement = {
      id,
      type,
      field,
      value: displayValue,
      color: activeColor,
    };

    setSelectedElement(elementPayload);

    // Prevent default only on container boxes to allow focus for inline editing
    if (isBgType) {
      e.preventDefault();
    }
  };

  // Inline contentEditable event handlers
  const handleInput = useCallback(() => {
    if (!isEditableText || !elementRef.current) return;
    const newText = elementRef.current.innerText;
    updateElementValue(newText, activeColor);
    if (onContentChange) {
      onContentChange(id, field, newText);
    }
  }, [isEditableText, activeColor, updateElementValue, onContentChange, id, field]);

  const handleBlur = useCallback(() => {
    if (!isEditableText || !elementRef.current) return;
    const newText = elementRef.current.innerText.trim();
    updateElementValue(newText, activeColor);
    if (onContentChange) {
      onContentChange(id, field, newText);
    }
  }, [isEditableText, activeColor, updateElementValue, onContentChange, id, field]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isEditableText) return;
      // Single-line headings & spans blur on Enter (unless Shift is pressed)
      if (e.key === 'Enter' && Tag !== 'p' && Tag !== 'article' && !e.shiftKey) {
        e.preventDefault();
        elementRef.current?.blur();
      }
    },
    [isEditableText, Tag],
  );

  const editModeClasses = isEditableText
    ? 'cursor-text outline-none hover:outline-dashed hover:outline-1 hover:outline-accent/30 focus:ring-2 focus:ring-accent/30 focus:rounded-sm pointer-events-auto select-text'
    : isBgType && isInEditMode
    ? 'cursor-crosshair select-none pointer-events-auto'
    : '';

  return (
    <Tag
      ref={elementRef as any}
      href={href}
      target={target}
      rel={rel}
      contentEditable={isEditableText ? true : undefined}
      suppressContentEditableWarning={isEditableText ? true : undefined}
      onClick={handleClick}
      onInput={handleInput}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={customStyle}
      className={`relative transition-all duration-75 ${className} ${editModeClasses}`}
    >
      {children || displayValue}
    </Tag>
  );
}
