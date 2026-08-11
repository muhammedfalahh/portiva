/**
 * =============================================================================
 * PORTIVA: EditableButton — Interactive Button Wrapper for Visual Editor
 * =============================================================================
 *
 * A universal button component that provides 100% button customization within
 * the Portiva visual builder. It mirrors EditableElement's hover/selection
 * overlay pattern but specialises in ButtonOverride properties:
 *
 *   1. Text override — users can change the button label via the inspector.
 *   2. Link override — custom href + openInNewTab per button instance.
 *   3. Style overrides — backgroundColor, color, borderColor, borderRadius,
 *      borderWidth, fontSize, fontWeight, padding — all per-button.
 *   4. Hover state overrides — hoverBackgroundColor, hoverColor,
 *      hoverBorderColor — applied via onMouseEnter/onMouseLeave in VIEW mode.
 *
 * Modes:
 *   EDITING  — Click is intercepted (no navigation). The button is registered
 *              as a SelectedElement (type='button') so the sidebar inspector
 *              can render the button-specific editing panel. Hover/selection
 *              bounding rects are calculated relative to the canvas container
 *              and fed to the overlay system.
 *   VIEWING  — The button renders as an `<a>` tag (when href is set) or a
 *              `<button>` tag (when no href). Style overrides and hover color
 *              transitions are applied inline.
 *
 * Bounding rect calculation follows the same zoom-aware approach used by
 * EditableElement: screen-pixel values from getBoundingClientRect() are
 * divided by canvasZoom to produce unscaled canvas-space coordinates.
 */

'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useVisualBuilder, type SelectedElement } from './VisualBuilderContext';
import { useWorkspaceStore } from './useWorkspaceStore';
import type { ButtonOverride } from '@/lib/theme.types';

// ─── Props ──────────────────────────────────────────────────────────────────

interface EditableButtonProps {
  /** Unique identifier for this button across the entire template */
  buttonKey: string;
  /** Default button label text when no override exists */
  defaultText: string;
  /** Default link destination (renders as <a> in VIEW mode) */
  defaultHref?: string;
  /** Whether the link opens in a new tab by default */
  defaultOpenInNewTab?: boolean;
  /** Extra Tailwind/CSS classes applied to the outer element */
  className?: string;
  /** Default inline styles applied before any overrides */
  defaultStyle?: React.CSSProperties;
  /** Optional custom child content (rendered instead of text label) */
  children?: React.ReactNode;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Builds a CSSProperties object from a ButtonOverride, excluding hover-state
 * and non-CSS properties (text, href, openInNewTab).
 */
function buttonOverrideToCSSProperties(
  override: ButtonOverride | undefined,
): React.CSSProperties {
  if (!override) return {};

  const result: Record<string, unknown> = {};

  if (override.backgroundColor) result.backgroundColor = override.backgroundColor;
  if (override.color) result.color = override.color;
  if (override.borderColor) {
    result.borderColor = override.borderColor;
    result.borderStyle = 'solid';
  }
  if (override.borderRadius) result.borderRadius = override.borderRadius;
  if (override.borderWidth) {
    result.borderWidth = override.borderWidth;
    result.borderStyle = 'solid';
  }
  if (override.fontSize) result.fontSize = override.fontSize;
  if (override.fontWeight) result.fontWeight = override.fontWeight;
  if (override.padding) result.padding = override.padding;

  return result as React.CSSProperties;
}

/**
 * Extracts hover-state color properties from a ButtonOverride and returns
 * them as a CSSProperties object for onMouseEnter application.
 */
function buttonOverrideToHoverCSS(
  override: ButtonOverride | undefined,
): React.CSSProperties {
  if (!override) return {};

  const result: Record<string, unknown> = {};

  if (override.hoverBackgroundColor) result.backgroundColor = override.hoverBackgroundColor;
  if (override.hoverColor) result.color = override.hoverColor;
  if (override.hoverBorderColor) result.borderColor = override.hoverBorderColor;

  return result as React.CSSProperties;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EditableButton({
  buttonKey,
  defaultText,
  defaultHref,
  defaultOpenInNewTab = false,
  className = '',
  defaultStyle,
  children,
}: EditableButtonProps) {
  const {
    mode,
    selectedElement,
    templateData,
    setHoveredElementId,
    setSelectedElement,
    setHoveredRect,
    setSelectedRect,
  } = useVisualBuilder();

  const canvasZoom = useWorkspaceStore((s) => s.canvasZoom);

  const elementRef = useRef<HTMLElement | null>(null);
  const [isHoveredView, setIsHoveredView] = useState(false);

  const isEditing = mode === 'EDITING';
  const isSelected =
    selectedElement?.id === buttonKey && selectedElement?.type === 'button';

  // ─── Resolve overrides ──────────────────────────────────────────────

  const override: ButtonOverride | undefined =
    (templateData?.buttonOverrides as Record<string, ButtonOverride>)?.[buttonKey];

  const resolvedText = override?.text ?? defaultText;
  const resolvedHref = override?.href ?? defaultHref;
  const resolvedOpenInNewTab = override?.openInNewTab ?? defaultOpenInNewTab;

  // Merge default inline styles with override styles
  const overrideCSS = buttonOverrideToCSSProperties(override);
  const baseStyle: React.CSSProperties = { ...defaultStyle, ...overrideCSS };

  // Hover-state styles for VIEW mode
  const hoverCSS = buttonOverrideToHoverCSS(override);
  const hasHoverOverrides = Object.keys(hoverCSS).length > 0;

  // The active inline style — applies hover overrides when hovered in VIEW mode
  const activeStyle: React.CSSProperties =
    !isEditing && isHoveredView && hasHoverOverrides
      ? { ...baseStyle, ...hoverCSS, transition: 'all 150ms ease' }
      : { ...baseStyle, transition: 'all 150ms ease' };

  // ─── Bounding rect calculation (zoom-aware, canvas-relative) ────────

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
      field: buttonKey,
    };
  }, [buttonKey, canvasZoom]);

  // ─── Sync selection rect on resize/layout changes ───────────────────

  useEffect(() => {
    if (isEditing && isSelected && elementRef.current) {
      const updateRect = () => {
        const rect = getRelativeRect();
        if (rect) {
          setSelectedRect(rect);
        }
      };

      // Sync initially
      updateRect();

      // Watch for wraps, font rendering, or size alterations
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
  }, [isEditing, isSelected, resolvedText, getRelativeRect, setSelectedRect]);

  // ─── EDITING mode: mouse event handlers ─────────────────────────────

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isEditing) return;
    e.stopPropagation();

    const rect = getRelativeRect();
    if (rect) {
      setHoveredElementId(`btn-${buttonKey}`);
      setHoveredRect(rect);
    }
  };

  const handleMouseLeave = () => {
    if (isEditing) {
      setHoveredElementId(null);
      setHoveredRect(null);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing) return;

    // Prevent navigation and bubble propagation in edit mode
    e.preventDefault();
    e.stopPropagation();

    const rect = getRelativeRect();
    if (rect) {
      setSelectedRect(rect);
    }

    const elementPayload: SelectedElement = {
      id: buttonKey,
      type: 'button',
      field: buttonKey,
      value: resolvedText,
      color: override?.backgroundColor,
    };

    setSelectedElement(elementPayload);
  };

  // ─── VIEW mode: hover state handlers ────────────────────────────────

  const handleViewMouseEnter = () => {
    if (!isEditing) {
      setIsHoveredView(true);
    }
  };

  const handleViewMouseLeave = () => {
    if (!isEditing) {
      setIsHoveredView(false);
    }
  };

  // ─── Shared props ───────────────────────────────────────────────────

  const sharedProps = {
    ref: elementRef as React.Ref<HTMLAnchorElement & HTMLButtonElement>,
    style: activeStyle,
    className: `
      relative transition-all duration-75
      ${className}
      ${isEditing ? 'cursor-crosshair select-none pointer-events-auto outline-2 outline-accent/40' : ''}
    `,
    onMouseEnter: isEditing ? handleMouseEnter : handleViewMouseEnter,
    onMouseLeave: isEditing ? handleMouseLeave : handleViewMouseLeave,
    onClick: isEditing ? handleClick : undefined,
  };

  const content = children || resolvedText;

  // ─── Render ─────────────────────────────────────────────────────────

  if (isEditing) {
    // In EDIT mode, always render a <button> to prevent any navigation.
    // The click handler intercepts events and registers the button for
    // inspector selection instead.
    return (
      <button type="button" {...sharedProps}>
        {content}
      </button>
    );
  }

  // In VIEW mode, render as <a> when a valid href exists, else <button>
  if (resolvedHref) {
    return (
      <a
        {...sharedProps}
        href={resolvedHref}
        target={resolvedOpenInNewTab ? '_blank' : undefined}
        rel={resolvedOpenInNewTab ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...sharedProps}>
      {content}
    </button>
  );
}
