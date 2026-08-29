/**
 * =============================================================================
 * PORTIVA: Engine — Barrel Export
 * =============================================================================
 *
 * Pure editor primitives ONLY. Heavier engine chrome (WorkspaceContainer,
 * WorkspaceLayout, InspectorSidebar, ZoomControls, store) must be imported
 * directly from its file so tree-shaking stays predictable and this barrel
 * can never transitively pull template code.
 */

export { ThemeProvider } from './ThemeProvider';
export { PublicTemplateViewer } from './PublicTemplateViewer';
export { EditModeProvider, useEditMode } from './EditModeContext';
export type { ContentChangeHandler } from './EditModeContext';
export { EditableText } from './EditableText';
export { ThemedBentoCard } from './ThemedBentoCard';

// ─── Visual Builder Primitives ──────────────────────────────────────────────
export { VisualBuilderProvider, useVisualBuilder, useOptionalVisualBuilder } from './VisualBuilderContext';
export type { BentoBlock, BlockContent, GridPosition, TemplateData, SelectedElement } from './VisualBuilderContext';
export { EditableElement } from './EditableElement';
export { EditableButton } from './EditableButton';
export { EditableImage } from './EditableImage';

// ─── Type Re-exports ────────────────────────────────────────────────────────
export type {
  ElementStyleOverride,
  MediaOverride,
  ButtonOverride,
  HistoryEntry,
  ExtendedThemeConfig,
} from '@/lib/theme.types';
