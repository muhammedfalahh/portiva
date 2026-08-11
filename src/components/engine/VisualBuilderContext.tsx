/**
 * =============================================================================
 * PORTIVA: VisualBuilderContext — Full Visual Editor State Management
 * =============================================================================
 *
 * This context serves as the global state engine for the visual builder
 * workspace. It manages:
 *   - Element selection and hover states
 *   - Text overrides (per-element text editing)
 *   - Style overrides (per-element colors, spacing, borders, typography)
 *   - Media overrides (per-image replacement)
 *   - Button overrides (per-button properties)
 *   - Theme-level color/typography/radius management
 *   - Undo/redo history stack
 *
 * It syncs directly with the centralized Zustand store.
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  ensureThemeContrast,
  type ThemeConfig,
  type ElementStyleOverride,
  type MediaOverride,
  type ButtonOverride,
  type HistoryEntry,
} from '@/lib/theme.types';
import type { BentoBioConfig } from '@/lib/bentobio';
import { useWorkspaceStore } from './useWorkspaceStore';

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface BlockContent {
  title?: string;
  url?: string;
  description?: string;
  price?: number;
  phone?: string;
  image_url?: string;
  color?: string;
  navbarBg?: string;
  hoverStyle?: string;
  [key: string]: any;
}

export interface GridPosition {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface BentoBlock {
  id: string;
  block_type: 'link' | 'image' | 'whatsapp_catalog';
  content: BlockContent;
  grid_position: GridPosition;
  order_index: number;
}

export interface TemplateData {
  profileName: string;
  profileHandle: string;
  blocks: BentoBlock[];
  theme: ThemeConfig;
  textColors: Record<string, string>;
  textOverrides?: Record<string, string>;
  styleOverrides: Record<string, ElementStyleOverride>;
  mediaOverrides: Record<string, MediaOverride>;
  buttonOverrides: Record<string, ButtonOverride>;
  bentoBioConfig?: BentoBioConfig;
}

export type EditorMode = 'VIEWING' | 'EDITING';

export interface SelectedElement {
  id: string;      // blockId or element ID (e.g. "profile-header")
  type: string;    // e.g. "text" | "heading" | "button" | "image" | "box" | "container" | "section"
  field: string;   // e.g. "title" | "description" | "brandName"
  value: string;   // The text string itself
  color?: string;  // The active text color override
}

export interface ElementRect {
  top: number;
  left: number;
  width: number;
  height: number;
  field: string;
}

// ─── Max undo history entries ───────────────────────────────────────────────
const MAX_HISTORY = 50;

// ─── Context Type ───────────────────────────────────────────────────────────

interface VisualBuilderContextValue {
  mode: EditorMode;
  hoveredElementId: string | null;
  selectedElement: SelectedElement | null;
  hoveredRect: ElementRect | null;
  selectedRect: ElementRect | null;
  templateData: TemplateData;
  setMode: (mode: EditorMode) => void;
  setHoveredElementId: (id: string | null) => void;
  setSelectedElement: (element: SelectedElement | null) => void;
  setHoveredRect: (rect: ElementRect | null) => void;
  setSelectedRect: (rect: ElementRect | null) => void;
  updateElementValue: (value: string, color?: string, targetId?: string, targetField?: string) => void;
  applyChanges: () => void;
  discardChanges: () => void;
  updateThemeColor: (slot: keyof ThemeConfig, hex: string) => void;
  resetTheme: () => void;
  applyThemePreset: (theme: Partial<ThemeConfig>) => void;
  updateBlockContent: (blockId: string, updatedContent: Record<string, any>) => void;
  setTemplateData: React.Dispatch<React.SetStateAction<TemplateData>>;

  // ─── New: Per-element style overrides ──────────────────────────────
  updateStyleOverride: (elementId: string, override: Partial<ElementStyleOverride>) => void;
  removeStyleOverride: (elementId: string) => void;
  getStyleOverride: (elementId: string) => ElementStyleOverride | undefined;

  // ─── New: Per-image media overrides ────────────────────────────────
  updateMediaOverride: (imageKey: string, override: Partial<MediaOverride>) => void;
  removeMediaOverride: (imageKey: string) => void;
  getMediaOverride: (imageKey: string) => MediaOverride | undefined;

  // ─── New: Per-button overrides ─────────────────────────────────────
  updateButtonOverride: (buttonKey: string, override: Partial<ButtonOverride>) => void;
  removeButtonOverride: (buttonKey: string) => void;
  getButtonOverride: (buttonKey: string) => ButtonOverride | undefined;

  // ─── New: Undo/Redo ────────────────────────────────────────────────
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

// ─── Context ────────────────────────────────────────────────────────────────

const VisualBuilderContext = createContext<VisualBuilderContextValue | undefined>(undefined);

export function useOptionalVisualBuilder(): VisualBuilderContextValue | null {
  return useContext(VisualBuilderContext) ?? null;
}

// ─── Provider ───────────────────────────────────────────────────────────────

interface VisualBuilderProviderProps {
  initialData: TemplateData;
  initialMode?: EditorMode;
  defaultTheme?: ThemeConfig;
  children: React.ReactNode;
  onSave?: (updatedData: TemplateData) => void;
}

function ensureOverrideMaps(data: TemplateData): TemplateData {
  return {
    ...data,
    textColors: data.textColors || {},
    textOverrides: data.textOverrides || {},
    styleOverrides: data.styleOverrides || {},
    mediaOverrides: data.mediaOverrides || {},
    buttonOverrides: data.buttonOverrides || {},
  };
}

export function VisualBuilderProvider({
  initialData,
  initialMode,
  defaultTheme,
  children,
  onSave,
}: VisualBuilderProviderProps) {
  const [mode, setModeState] = useState<EditorMode>(initialMode || 'EDITING');
  const [hoveredElementId, setHoveredElementIdState] = useState<string | null>(null);
  const [selectedElement, setSelectedElementState] = useState<SelectedElement | null>(null);
  const [originalElement, setOriginalElement] = useState<SelectedElement | null>(null);
  const [hoveredRect, setHoveredRect] = useState<ElementRect | null>(null);
  const [selectedRect, setSelectedRect] = useState<ElementRect | null>(null);
  const [templateData, setTemplateData] = useState<TemplateData>(() => ensureOverrideMaps(initialData));

  // ─── Undo/Redo History ──────────────────────────────────────────────
  const [undoStack, setUndoStack] = useState<HistoryEntry[]>([]);
  const [redoStack, setRedoStack] = useState<HistoryEntry[]>([]);
  const isUndoingRef = useRef(false);

  const pushHistory = useCallback((label: string) => {
    if (isUndoingRef.current) return;

    setUndoStack((prev) => {
      const entry: HistoryEntry = {
        timestamp: Date.now(),
        label,
          snapshot: {
            textColors: { ...templateData.textColors },
            textOverrides: JSON.parse(JSON.stringify(templateData.textOverrides || {})),
            styleOverrides: JSON.parse(JSON.stringify(templateData.styleOverrides)),
            mediaOverrides: JSON.parse(JSON.stringify(templateData.mediaOverrides)),
            buttonOverrides: JSON.parse(JSON.stringify(templateData.buttonOverrides)),
            theme: { ...templateData.theme },
            bentoBioConfig: templateData.bentoBioConfig ? JSON.parse(JSON.stringify(templateData.bentoBioConfig)) : undefined,
          },


      };
      const next = [...prev, entry];
      if (next.length > MAX_HISTORY) next.shift();
      return next;
    });
    // Clear redo stack on new action
    setRedoStack([]);
  }, [templateData]);

  const undo = useCallback(() => {
    setUndoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      const remaining = prev.slice(0, -1);

      // Push current state to redo stack
      setRedoStack((redoPrev) => [
        ...redoPrev,
        {
          timestamp: Date.now(),
          label: 'Redo',
          snapshot: {
            textColors: { ...templateData.textColors },
            textOverrides: JSON.parse(JSON.stringify(templateData.textOverrides || {})),
            styleOverrides: JSON.parse(JSON.stringify(templateData.styleOverrides)),
            mediaOverrides: JSON.parse(JSON.stringify(templateData.mediaOverrides)),
            buttonOverrides: JSON.parse(JSON.stringify(templateData.buttonOverrides)),
            theme: { ...templateData.theme },
          },
        },
      ]);

      // Restore snapshot
      isUndoingRef.current = true;
      setTemplateData((prev) => ({
        ...prev,
        textColors: last.snapshot.textColors,
        textOverrides: last.snapshot.textOverrides || {},
        styleOverrides: last.snapshot.styleOverrides,
        mediaOverrides: last.snapshot.mediaOverrides,
        buttonOverrides: last.snapshot.buttonOverrides,
        theme: last.snapshot.theme,
        bentoBioConfig: last.snapshot.bentoBioConfig,
      }));
      setTimeout(() => { isUndoingRef.current = false; }, 0);

      return remaining;
    });
  }, [templateData]);

  const redo = useCallback(() => {
    setRedoStack((prev) => {
      if (prev.length === 0) return prev;
      const last = prev[prev.length - 1];
      const remaining = prev.slice(0, -1);

      // Push current state to undo stack
      setUndoStack((undoPrev) => [
        ...undoPrev,
        {
          timestamp: Date.now(),
          label: 'Undo',
          snapshot: {
            textColors: { ...templateData.textColors },
            textOverrides: JSON.parse(JSON.stringify(templateData.textOverrides || {})),
            styleOverrides: JSON.parse(JSON.stringify(templateData.styleOverrides)),
            mediaOverrides: JSON.parse(JSON.stringify(templateData.mediaOverrides)),
            buttonOverrides: JSON.parse(JSON.stringify(templateData.buttonOverrides)),
            theme: { ...templateData.theme },
          },
        },
      ]);

      // Restore snapshot
      isUndoingRef.current = true;
      setTemplateData((prev) => ({
        ...prev,
        textColors: last.snapshot.textColors,
        textOverrides: last.snapshot.textOverrides || {},
        styleOverrides: last.snapshot.styleOverrides,
        mediaOverrides: last.snapshot.mediaOverrides,
        buttonOverrides: last.snapshot.buttonOverrides,
        theme: last.snapshot.theme,
        bentoBioConfig: last.snapshot.bentoBioConfig,
      }));
      setTimeout(() => { isUndoingRef.current = false; }, 0);

      return remaining;
    });
  }, [templateData]);

  // Sync initialData changes when switching projects
  useEffect(() => {
    if (initialData.profileHandle !== templateData.profileHandle) {
      setTemplateData(ensureOverrideMaps(initialData));
      setUndoStack([]);
      setRedoStack([]);
    }
  }, [initialData.profileHandle]);

  const onSaveRef = useRef(onSave);
  useEffect(() => {
    onSaveRef.current = onSave;
  }, [onSave]);

  // Sync to Zustand store and trigger parent onSave post-render when templateData changes
  const isInitialMountRef = useRef(true);
  useEffect(() => {
    useWorkspaceStore.getState().setTemplateData(templateData);

    // Save active templateData & theme to localStorage for cross-tab full screen preview
    try {
      if (typeof window !== 'undefined') {
        const payload = JSON.stringify(templateData);
        localStorage.setItem('portiva_preview_data', payload);
        if (templateData.profileHandle) {
          localStorage.setItem(`portiva_draft_${templateData.profileHandle.toLowerCase()}`, payload);
        }
      }
    } catch (e) {
      // Ignore quota errors if any
    }

    if (!isInitialMountRef.current) {
      onSaveRef.current?.(templateData);
    } else {
      isInitialMountRef.current = false;
    }
  }, [templateData]);

  const setHoveredElementId = useCallback((id: string | null) => {
    setHoveredElementIdState(id);
    useWorkspaceStore.getState().setHoveredElementId(id);
  }, []);

  const setSelectedElement = useCallback((element: SelectedElement | null) => {
    setSelectedElementState(element);
    setOriginalElement(element);
    
    if (element) {
      useWorkspaceStore.getState().setSelectedElement({
        id: element.id,
        type: element.type,
        value: element.value,
        parentBlockId: element.id,
        field: element.field,
        color: element.color,
      });
    } else {
      useWorkspaceStore.getState().setSelectedElement(null);
      setSelectedRect(null);
    }
  }, []);

  const setMode = useCallback((newMode: EditorMode) => {
    setModeState(newMode);
    useWorkspaceStore.getState().setBuilderMode(newMode);
    setHoveredElementId(null);
    setSelectedElement(null);
    setHoveredRect(null);
    setSelectedRect(null);
  }, [setSelectedElement, setHoveredElementId]);

  // Update selected element AND templateData in real-time
  const updateElementValue = useCallback(
    (newValue: string, newColor?: string, targetId?: string, targetField?: string) => {
      const id = targetId || selectedElement?.id;
      const field = targetField || selectedElement?.field;

      if (!id || !field) return;

      if (selectedElement && selectedElement.id === id && selectedElement.field === field) {
        const updated = {
          ...selectedElement,
          value: newValue,
          color: newColor !== undefined ? newColor : selectedElement.color,
        };

        // Set local state in the action handler
        setSelectedElementState(updated);

        // Sync back to Zustand in the action handler
        useWorkspaceStore.getState().setSelectedElement({
          id: updated.id,
          type: updated.type,
          value: updated.value,
          parentBlockId: updated.id,
          field: updated.field,
          color: updated.color,
        });
      }

      setTemplateData((prev) => {
        let updatedBlocks = [...prev.blocks];
        let updatedProfileName = prev.profileName;
        let updatedProfileHandle = prev.profileHandle;
        const updatedTextColors = { ...prev.textColors };

        const colorKey = `${id}-${field}`;
        if (newColor !== undefined) {
          if (newColor) {
            updatedTextColors[colorKey] = newColor;
          } else {
            delete updatedTextColors[colorKey];
          }
        }

        // Maintain general text overrides map
        const textKey = `${id}-${field}`;
        const updatedTextOverrides = {
          ...(prev.textOverrides || {}),
          [textKey]: newValue,
        };

        if (id === 'profile-header') {
          if (field === 'profileName') updatedProfileName = newValue;
          if (field === 'profileHandle') updatedProfileHandle = newValue;
        } else {
          updatedBlocks = updatedBlocks.map((block) => {
            if (block.id === id) {
              return {
                ...block,
                content: {
                  ...block.content,
                  [field]: newValue,
                },
              };
            }
            return block;
          });
        }

        return {
          ...prev,
          profileName: updatedProfileName,
          profileHandle: updatedProfileHandle,
          blocks: updatedBlocks,
          textColors: updatedTextColors,
          textOverrides: updatedTextOverrides,
        };
      });
    },
    [selectedElement],
  );

  // Commit changes back to the global templateData state (save to parent)
  const applyChanges = useCallback(() => {
    if (!selectedElement) return;

    if (onSave) {
      onSave(templateData);
    }

    // Deselect element
    setSelectedElement(null);
  }, [selectedElement, templateData, onSave, setSelectedElement]);

  // Revert all real-time changes back to the original element values
  const discardChanges = useCallback(() => {
    if (!selectedElement || !originalElement) return;

    const { id, field } = selectedElement;
    const origValue = originalElement.value;
    const origColor = originalElement.color;

    setTemplateData((prev) => {
      let updatedBlocks = [...prev.blocks];
      let updatedProfileName = prev.profileName;
      let updatedProfileHandle = prev.profileHandle;
      const updatedTextColors = { ...prev.textColors };

      const colorKey = `${id}-${field}`;
      if (origColor) {
        updatedTextColors[colorKey] = origColor;
      } else {
        delete updatedTextColors[colorKey];
      }

      if (id === 'profile-header') {
        if (field === 'profileName') updatedProfileName = origValue;
        if (field === 'profileHandle') updatedProfileHandle = origValue;
      } else {
        updatedBlocks = updatedBlocks.map((block) => {
          if (block.id === id) {
            return {
              ...block,
              content: {
                ...block.content,
                [field]: origValue,
              },
            };
          }
          return block;
        });
      }

      return {
        ...prev,
        profileName: updatedProfileName,
        profileHandle: updatedProfileHandle,
        blocks: updatedBlocks,
        textColors: updatedTextColors,
      };
    });

    // Deselect element
    setSelectedElement(null);
  }, [selectedElement, originalElement, setSelectedElement]);

  const updateThemeColor = useCallback((slot: keyof ThemeConfig, hex: string) => {
    pushHistory(`Theme: ${slot}`);
    setTemplateData((prev) => {
      const nextTheme = {
        ...prev.theme,
        [slot]: hex,
      };

      if (slot === 'primary') {
        nextTheme.primaryHover = hex + 'CC'; // approximate hover shade
      }
      if (slot === 'surface') {
        nextTheme.surfaceHover = hex + 'E6';
      }

      return {
        ...prev,
        theme: nextTheme,
      };
    });
  }, [pushHistory]);

  const resetTheme = useCallback(() => {
    if (!defaultTheme) return;
    pushHistory('Reset theme');
    setTemplateData((prev) => ({
      ...prev,
      theme: { ...defaultTheme },
    }));
  }, [defaultTheme, pushHistory]);

  const applyThemePreset = useCallback((presetColors: Partial<ThemeConfig>) => {
    pushHistory('Apply theme preset');
    setTemplateData((prev) => {
      const nextTheme: ThemeConfig = {
        ...prev.theme,
        ...presetColors,
      };

      // Fallback hovers ONLY if not explicitly provided in the preset
      if (presetColors.primary && !presetColors.primaryHover) {
        nextTheme.primaryHover = presetColors.primary;
      }
      if (presetColors.accent && !presetColors.accentHover) {
        nextTheme.accentHover = presetColors.accent;
      }
      if (presetColors.surface && !presetColors.surfaceHover) {
        nextTheme.surfaceHover = presetColors.surface;
      }

      const safeTheme = ensureThemeContrast(nextTheme);

      return {
        ...prev,
        theme: safeTheme,
      };
    });
  }, [pushHistory]);

  const updateBlockContent = useCallback((blockId: string, updatedContent: Record<string, any>) => {
    setTemplateData((prev) => {
      const exists = prev.blocks.some((b) => b.id === blockId);
      if (exists) {
        return {
          ...prev,
          blocks: prev.blocks.map((block) => {
            if (block.id === blockId) {
              return {
                ...block,
                content: {
                  ...block.content,
                  ...updatedContent,
                },
              };
            }
            return block;
          }),
        };
      }
      return {
        ...prev,
        blocks: [
          ...prev.blocks,
          {
            id: blockId,
            block_type: 'whatsapp_catalog',
            content: updatedContent,
            grid_position: { x: 1, y: 1, w: 4, h: 1 },
            order_index: prev.blocks.length,
          },
        ],
      };
    });
  }, []);

  // ─── Style Override Methods ─────────────────────────────────────────

  const updateStyleOverride = useCallback((elementId: string, override: Partial<ElementStyleOverride>) => {
    pushHistory(`Style: ${elementId}`);
    setTemplateData((prev) => {
      const existing = prev.styleOverrides[elementId] || {};
      return {
        ...prev,
        styleOverrides: {
          ...prev.styleOverrides,
          [elementId]: { ...existing, ...override },
        },
      };
    });
  }, [pushHistory]);

  const removeStyleOverride = useCallback((elementId: string) => {
    pushHistory(`Remove style: ${elementId}`);
    setTemplateData((prev) => {
      const next = { ...prev.styleOverrides };
      delete next[elementId];
      return { ...prev, styleOverrides: next };
    });
  }, [pushHistory]);

  const getStyleOverride = useCallback((elementId: string) => {
    return templateData.styleOverrides[elementId];
  }, [templateData.styleOverrides]);

  // ─── Media Override Methods ─────────────────────────────────────────

  const updateMediaOverride = useCallback((imageKey: string, override: Partial<MediaOverride>) => {
    pushHistory(`Media: ${imageKey}`);
    setTemplateData((prev) => {
      const existing = prev.mediaOverrides[imageKey] || { src: '' };
      return {
        ...prev,
        mediaOverrides: {
          ...prev.mediaOverrides,
          [imageKey]: { ...existing, ...override },
        },
      };
    });
  }, [pushHistory]);

  const removeMediaOverride = useCallback((imageKey: string) => {
    pushHistory(`Remove media: ${imageKey}`);
    setTemplateData((prev) => {
      const next = { ...prev.mediaOverrides };
      delete next[imageKey];
      return { ...prev, mediaOverrides: next };
    });
  }, [pushHistory]);

  const getMediaOverride = useCallback((imageKey: string) => {
    return templateData.mediaOverrides[imageKey];
  }, [templateData.mediaOverrides]);

  // ─── Button Override Methods ────────────────────────────────────────

  const updateButtonOverride = useCallback((buttonKey: string, override: Partial<ButtonOverride>) => {
    pushHistory(`Button: ${buttonKey}`);
    setTemplateData((prev) => {
      const existing = prev.buttonOverrides[buttonKey] || {};
      return {
        ...prev,
        buttonOverrides: {
          ...prev.buttonOverrides,
          [buttonKey]: { ...existing, ...override },
        },
      };
    });
  }, [pushHistory]);

  const removeButtonOverride = useCallback((buttonKey: string) => {
    pushHistory(`Remove button: ${buttonKey}`);
    setTemplateData((prev) => {
      const next = { ...prev.buttonOverrides };
      delete next[buttonKey];
      return { ...prev, buttonOverrides: next };
    });
  }, [pushHistory]);

  const getButtonOverride = useCallback((buttonKey: string) => {
    return templateData.buttonOverrides[buttonKey];
  }, [templateData.buttonOverrides]);

  return (
    <VisualBuilderContext.Provider
      value={{
        mode,
        hoveredElementId,
        selectedElement,
        hoveredRect,
        selectedRect,
        templateData,
        setMode,
        setHoveredElementId,
        setSelectedElement,
        setHoveredRect,
        setSelectedRect,
        updateElementValue,
        applyChanges,
        discardChanges,
        updateThemeColor,
        resetTheme,
        applyThemePreset,
        updateBlockContent,
        setTemplateData,
        // New override methods
        updateStyleOverride,
        removeStyleOverride,
        getStyleOverride,
        updateMediaOverride,
        removeMediaOverride,
        getMediaOverride,
        updateButtonOverride,
        removeButtonOverride,
        getButtonOverride,
        // Undo/redo
        undo,
        redo,
        canUndo: undoStack.length > 0,
        canRedo: redoStack.length > 0,
      }}
    >
      {children}
    </VisualBuilderContext.Provider>
  );
}

export function useVisualBuilder() {
  const context = useContext(VisualBuilderContext);
  if (context === undefined) {
    return {
      mode: 'VIEWING' as const,
      hoveredElementId: null,
      selectedElement: null,
      hoveredRect: null,
      selectedRect: null,
      setMode: () => {},
      setHoveredElementId: () => {},
      setSelectedElement: () => {},
      setHoveredRect: () => {},
      setSelectedRect: () => {},
      templateData: {
        profileName: 'Bruno Erdison',
        profileHandle: 'bruno',
        theme: {
          background: '#F7F4EB',
          foreground: '#0A3C2F',
          primary: '#0A3C2F',
          surface: '#FAF7F2',
          border: '#E5E0D5',
          muted: '#5C6662',
          primaryHover: '#06281F',
          surfaceHover: '#EFEAE0',
          accent: '#E52B2B',
          accentHover: '#C92222',
        },
        textColors: {},
        styleOverrides: {},
        mediaOverrides: {},
        buttonOverrides: {},
        blocks: [],
      },
      updateTemplateData: () => {},
      setTemplateData: () => {},
      updateElementValue: () => {},
      applyChanges: () => {},
      discardChanges: () => {},
      updateThemeColor: () => {},
      resetTheme: () => {},
      applyThemePreset: () => {},
      updateBlockContent: () => {},
      // Override methods
      updateStyleOverride: () => {},
      removeStyleOverride: () => {},
      getStyleOverride: (key: string) => undefined,
      updateMediaOverride: () => {},
      removeMediaOverride: () => {},
      getMediaOverride: (key: string) => undefined,
      updateButtonOverride: () => {},
      removeButtonOverride: () => {},
      getButtonOverride: (key: string) => undefined,
      // Rect registration & field helpers
      registerElementRect: () => {},
      unregisterElementRect: () => {},
      updateFieldText: () => {},
      getFieldText: (key: string) => undefined,
      updateFieldStyle: () => {},
      getFieldStyle: (key: string) => undefined,
      // History
      undo: () => {},
      redo: () => {},
      canUndo: false,
      canRedo: false,
    };
  }
  return context;
}
