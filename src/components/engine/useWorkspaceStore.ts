/**
 * =============================================================================
 * PORTIVA: useWorkspaceStore — Centralized Zustand State System
 * =============================================================================
 *
 * Implements the flagship global state engine for the visual builder workspace.
 * Tracks active tabs, current loaded project, editing mode, template queries,
 * selected categories, hovered elements, selected canvas node properties,
 * and the active bento template configuration data.
 */

import { create } from 'zustand';
import { ThemeConfig, ElementStyleOverride, MediaOverride, ButtonOverride } from '@/lib/theme.types';
import type { BentoBioConfig } from '@/lib/bentobio';

export interface BentoBlock {
  id: string;
  block_type: 'link' | 'image' | 'whatsapp_catalog';
  content: Record<string, any>;
  grid_position: { x: number; y: number; w: number; h: number };
  order_index: number;
}

export interface ProfileData {
  full_name: string;
  handle: string;
  subscription_tier: 'free' | 'pro' | 'business';
}

export interface TemplateData {
  templateId?: string;
  profileName: string;
  profileHandle: string;
  activePageId?: string;
  blocks: BentoBlock[];
  theme: ThemeConfig;
  textColors: Record<string, string>;
  textOverrides?: Record<string, string>;
  styleOverrides: Record<string, ElementStyleOverride>;
  mediaOverrides: Record<string, MediaOverride>;
  buttonOverrides: Record<string, ButtonOverride>;
  bentoBioConfig?: BentoBioConfig;
}

export interface ProjectItem {
  id: string;
  name: string;
  templateId: string;
  subDomain: string;
  isLive: boolean;
  data: TemplateData;
}

export interface WorkspaceState {
  // Core environment states
  activeTab: 'projects' | 'templates' | 'builder';
  currentProjectId: string | null;
  builderMode: 'VIEWING' | 'EDITING';
  templateSearchQuery: string;
  selectedCategory: string;
  
  // Interactive canvas states
  hoveredElementId: string | null;
  selectedElement: {
    id: string; // parent block id
    type: string; // 'text' | 'color' | 'image' | 'box' | 'container' | 'background' | 'button' | 'section'
    value: string;
    parentBlockId: string;
    field: string; // child node key
    color?: string;
  } | null;

  // Canvas zoom state (hardware-accelerated transform scale)
  canvasZoom: number; // 0.5 to 2.0, default 1.0
  
  // Template data model
  templateData: TemplateData;
  projectsList: ProjectItem[];

  // Environment Mutators
  setActiveTab: (tab: 'projects' | 'templates' | 'builder') => void;
  setCurrentProjectId: (id: string | null) => void;
  setBuilderMode: (mode: 'VIEWING' | 'EDITING') => void;
  setTemplateSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  
  // Interactive Mutators
  setHoveredElementId: (id: string | null) => void;
  setSelectedElement: (element: WorkspaceState['selectedElement']) => void;
  setTemplateData: (data: TemplateData | ((prev: TemplateData) => TemplateData)) => void;

  // Canvas zoom mutators
  setCanvasZoom: (value: number) => void;
  resetCanvasZoom: () => void;
  
  // Project list mutators
  setProjectsList: (projects: ProjectItem[]) => void;
  addProject: (project: ProjectItem) => void;
  updateProjectData: (projectId: string, data: TemplateData) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeTab: 'projects',
  currentProjectId: null,
  builderMode: 'EDITING',
  templateSearchQuery: '',
  selectedCategory: 'all',
  hoveredElementId: null,
  selectedElement: null,
  canvasZoom: 1.0,
  templateData: {
    templateId: undefined,
    profileName: '',
    profileHandle: '',
    activePageId: undefined,
    blocks: [],
    theme: {
      background: '#0c0c0e',
      foreground: '#f4f4ee',
      primary: '#DC2626',
      primaryHover: '#EF4444',
      surface: '#121215',
      surfaceHover: '#18181b',
      border: '#1e1e24',
      muted: '#6b7280',
      accent: '#DC2626',
      accentHover: '#EF4444',
    },
    textColors: {},
    textOverrides: {},
    styleOverrides: {},
    mediaOverrides: {},
    buttonOverrides: {},
  },
  projectsList: [],

  setActiveTab: (tab) => set({ activeTab: tab }),
  setCurrentProjectId: (id) => set({ currentProjectId: id }),
  setBuilderMode: (mode) => set({ builderMode: mode }),
  setTemplateSearchQuery: (query) => set({ templateSearchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setHoveredElementId: (id) => set({ hoveredElementId: id }),
  setSelectedElement: (element) => set({ selectedElement: element }),
  setCanvasZoom: (value) => set({ canvasZoom: Math.min(2.0, Math.max(0.5, value)) }),
  resetCanvasZoom: () => set({ canvasZoom: 1.0 }),
  setTemplateData: (data) => set((state) => {
    const nextData = typeof data === 'function' ? data(state.templateData) : data;
    if (state.templateData === nextData) return state;
    return { templateData: nextData };
  }),
  
  setProjectsList: (projects) => set({ projectsList: projects }),
  addProject: (project) => set((state) => ({ projectsList: [...state.projectsList, project] })),
  updateProjectData: (projectId, data) => set((state) => {
    const project = state.projectsList.find((p) => p.id === projectId);
    if (project && project.data === data) return state;
    return {
      projectsList: state.projectsList.map((p) => p.id === projectId ? { ...p, data } : p),
    };
  }),
}));
