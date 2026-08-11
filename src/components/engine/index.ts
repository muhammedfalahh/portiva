/**
 * =============================================================================
 * PORTIVA: Engine — Barrel Export
 * =============================================================================
 *
 * Central export point for the Dynamic Theming, Inline Editing, and Visual
 * Builder Engines.
 */

export { ThemeProvider } from './ThemeProvider';
export { PublicTemplateViewer } from './PublicTemplateViewer';
export { EditModeProvider, useEditMode } from './EditModeContext';
export type { ContentChangeHandler } from './EditModeContext';
export { EditableText } from './EditableText';
export { ThemedBentoCard } from './ThemedBentoCard';

// ─── Visual Builder Components ──────────────────────────────────────────────
export { VisualBuilderProvider, useVisualBuilder } from './VisualBuilderContext';
export type { BentoBlock, BlockContent, GridPosition, TemplateData, SelectedElement } from './VisualBuilderContext';
export { EditableElement } from './EditableElement';
export { EditableButton } from './EditableButton';
export { EditableImage } from './EditableImage';
export { InspectorSidebar } from './InspectorSidebar';
export { WorkspaceLayout } from './WorkspaceLayout';
export { WorkspaceContainer } from './WorkspaceContainer';
export { ZoomControls } from './ZoomControls';
export { useWorkspaceStore } from './useWorkspaceStore';

// ─── Type Re-exports ────────────────────────────────────────────────────────
export type {
  ElementStyleOverride,
  MediaOverride,
  ButtonOverride,
  HistoryEntry,
  ExtendedThemeConfig,
} from '@/lib/theme.types';
