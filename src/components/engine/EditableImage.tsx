/**
 * =============================================================================
 * PORTIVA: EditableImage — Universal Image Wrapper for Visual Editor
 * =============================================================================
 *
 * A universal image component that integrates with the visual builder context
 * to enable per-image replacement through the inspector sidebar.
 *
 * Behavior by mode:
 *   EDITING:
 *     - Reads image src/alt/objectFit from mediaOverrides[imageKey], falling
 *       back to defaultSrc / defaultAlt / objectFit props.
 *     - Shows a semi-transparent overlay on hover with a Camera icon and
 *       "Replace Image" label, indicating the image is replaceable.
 *     - Clicking the image selects it in the VisualBuilder context (type='image'),
 *       calculates the bounding rect relative to the canvas container, and sets
 *       both selectedElement and selectedRect for overlay rendering.
 *     - Syncs the selection rect via ResizeObserver (Figma-style layout sync).
 *
 *   VIEWING:
 *     - Renders a plain <img> with the resolved src/alt/objectFit.
 *     - No hover overlays, cursor changes, or click interception.
 *
 * The component mirrors EditableElement's ref, bounding-rect, and
 * ResizeObserver patterns to maintain visual consistency across the engine.
 */

'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Camera } from 'lucide-react';
import { useVisualBuilder, type SelectedElement } from './VisualBuilderContext';
import { useWorkspaceStore } from './useWorkspaceStore';

// ─── Props ──────────────────────────────────────────────────────────────────

interface EditableImageProps {
  /** Optional ID alias for imageKey */
  id?: string;
  /** Unique identifier for this image across the template (used as the mediaOverrides key) */
  imageKey?: string;
  /** Default image URL when no override is present */
  defaultSrc: string;
  /** Default alt text for the image */
  defaultAlt?: string;
  /** Optional alt text alias */
  alt?: string;
  /** Tailwind/CSS classes applied to the <img> element */
  className?: string;
  /** Tailwind/CSS classes applied to the wrapper <div> */
  containerClassName?: string;
  /** CSS object-fit strategy for the image (default: 'cover') */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Explicit width for the wrapper container */
  width?: string | number;
  /** Explicit height for the wrapper container */
  height?: string | number;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function EditableImage({
  id,
  imageKey: propImageKey,
  defaultSrc,
  defaultAlt: propDefaultAlt = '',
  alt: propAlt,
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  width,
  height,
}: EditableImageProps) {
  const imageKey = propImageKey || id || 'editable-image';
  const defaultAlt = propAlt || propDefaultAlt || '';
  const {
    mode,
    selectedElement,
    templateData,
    setHoveredElementId,
    setSelectedElement,
    setHoveredRect,
    setSelectedRect,
    getMediaOverride,
  } = useVisualBuilder();

  const canvasZoom = useWorkspaceStore((s) => s.canvasZoom);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isEditing = mode === 'EDITING';
  const isSelected = selectedElement?.id === imageKey && selectedElement?.field === 'src';

  // ─── Resolve image properties from overrides or defaults ──────────
  const mediaOverride = getMediaOverride(imageKey);
  const resolvedSrc = mediaOverride?.src || defaultSrc;
  const resolvedAlt = mediaOverride?.alt ?? defaultAlt;
  const resolvedObjectFit = mediaOverride?.objectFit || objectFit;

  // ─── Container dimensions ─────────────────────────────────────────
  const containerStyle: React.CSSProperties = {
    ...(width !== undefined ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height !== undefined ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  // ─── Bounding rect calculation ────────────────────────────────────
  // Compute element bounds relative to the scrollable canvas container.
  // When the canvas is scaled via CSS `transform: scale()`, the browser's
  // getBoundingClientRect() returns screen-pixel values that are already
  // multiplied by the zoom factor. We divide by canvasZoom to convert
  // back to unscaled canvas-space coordinates for accurate overlay positioning.
  const getRelativeRect = useCallback(() => {
    const element = containerRef.current;
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
      field: 'src',
    };
  }, [canvasZoom]);

  // ─── Sync selection rect dynamically (Figma-style layout sync) ────
  useEffect(() => {
    if (isEditing && isSelected && containerRef.current) {
      const updateRect = () => {
        const rect = getRelativeRect();
        if (rect) {
          setSelectedRect(rect);
        }
      };

      // Sync initially
      updateRect();

      // Watch for layout shifts, image loading, or container resizing
      const observer = new ResizeObserver(() => {
        updateRect();
      });
      observer.observe(containerRef.current);

      window.addEventListener('resize', updateRect);

      return () => {
        observer.disconnect();
        window.removeEventListener('resize', updateRect);
      };
    }
  }, [isEditing, isSelected, resolvedSrc, getRelativeRect, setSelectedRect]);

  // ─── Mouse event handlers for EDITING mode ────────────────────────

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (!isEditing) return;
    e.stopPropagation();

    setIsHovered(true);

    const rect = getRelativeRect();
    if (rect) {
      setHoveredElementId(imageKey);
      setHoveredRect(rect);
    }
  };

  const handleMouseLeave = () => {
    if (!isEditing) return;
    setIsHovered(false);
    setHoveredElementId(null);
    setHoveredRect(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!isEditing) return;

    // Figma-style click interception — prevent link navigation, bubble capture
    e.preventDefault();
    e.stopPropagation();

    const rect = getRelativeRect();
    if (rect) {
      setSelectedRect(rect);
    }

    const elementPayload: SelectedElement = {
      id: imageKey,
      type: 'image',
      field: 'src',
      value: resolvedSrc,
    };

    setSelectedElement(elementPayload);
  };

  // ─── Render ───────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={containerStyle}
      className={`
        relative overflow-hidden
        ${containerClassName}
        ${isEditing ? 'cursor-crosshair select-none pointer-events-auto' : ''}
      `}
    >
      {/* Actual image */}
      <img
        src={resolvedSrc}
        alt={resolvedAlt}
        draggable={false}
        style={{ objectFit: resolvedObjectFit }}
        className={`
          block w-full h-full
          ${className}
        `}
      />

      {/* EDITING overlay — dark semi-transparent backdrop with Camera icon */}
      {isEditing && (
        <div
          className={`
            absolute inset-0 z-10 flex flex-col items-center justify-center
            bg-bg-primary/0 transition-all duration-200 ease-in-out
            ${isHovered ? 'bg-bg-primary/50' : ''}
          `}
        >
          <div
            className={`
              flex flex-col items-center gap-1.5
              transition-opacity duration-200 ease-in-out
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}
          >
            <Camera className="w-5 h-5 text-text-primary drop-shadow-md" strokeWidth={1.5} />
            <span className="text-[11px] font-medium text-text-primary/80 tracking-wide drop-shadow-md">
              Replace Image
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
