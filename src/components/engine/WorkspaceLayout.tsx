'use client';

import React, { useState, useEffect } from 'react';
import { useVisualBuilder } from './VisualBuilderContext';
import { useWorkspaceStore } from './useWorkspaceStore';
import { InspectorSidebar } from './InspectorSidebar';
import { ZoomControls } from './ZoomControls';
import { Eye, Pencil, Monitor, Smartphone, ArrowLeft, Play, Sliders, Undo2, Redo2, ExternalLink } from 'lucide-react';
import { motion, MotionConfig } from 'framer-motion';
import { getPageSummaries } from '@/components/templates/platform';
import type { TemplateManifestPage } from '@/lib/template-contract';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  onPublish: () => void;
  isPublishing: boolean;
  onBack: () => void;
}

export function WorkspaceLayout({
  children,
  onPublish,
  isPublishing,
  onBack,
}: WorkspaceLayoutProps) {
  const { mode, setMode, templateData, hoveredRect, selectedRect, undo, redo, canUndo, canRedo, setTemplateData } = useVisualBuilder();
  const canvasZoom = useWorkspaceStore((s) => s.canvasZoom);
   const currentProjectId = useWorkspaceStore((s) => s.currentProjectId);
   const projectsList = useWorkspaceStore((s) => s.projectsList);
   const activeProject = projectsList.find((project) => project.id === currentProjectId) || null;
   const activeTemplateId = activeProject?.templateId ?? null;
  const [canvasViewMode, setCanvasViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCanvasHovered, setIsCanvasHovered] = useState(false);

  // Page summaries resolve through the platform (manifest first, definition
  // fallback), so the switcher works for every premium template without
  // pulling template implementations into the engine bundle.
  const [activePages, setActivePages] = useState<TemplateManifestPage[]>([]);
  useEffect(() => {
    let alive = true;
    if (!activeTemplateId) {
      setActivePages([]);
      return;
    }
    getPageSummaries(activeTemplateId)
      .then((pages) => {
        if (alive) setActivePages(pages);
      })
      .catch(() => {
        if (alive) setActivePages([]);
      });
    return () => {
      alive = false;
    };
  }, [activeTemplateId]);

  const isEditing = mode === 'EDITING';

  useEffect(() => {
    if (!isEditing) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
      } else if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y')
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEditing, undo, redo]);

  return (
    <div className="flex-1 flex flex-col bg-bg-primary text-text-primary font-sans h-screen overflow-hidden relative">
      
      {/* ─── Top Toolbar (48px height) ────────────────────────────────────────────── */}
      <header className="w-full h-12 border-b border-border-subtle bg-bg-primary px-4 flex justify-between items-center z-20 shrink-0">
        
        {/* Left group */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="btn-ghost btn-icon btn-sm transition-all duration-150 cursor-pointer"
            title="Back to Templates"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="w-px h-5 bg-border-subtle mx-1" />
          
          <span className="text-xs font-medium text-text-primary hidden sm:inline-block">Project Workspace</span>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover transition duration-150 cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Inspector</span>
          </button>
        </div>

        {/* Center group */}
        <div className="flex items-center gap-2">
          {/* Undo/Redo Buttons (Only in Edit Mode) */}
          {isEditing && (
            <div className="hidden xs:flex items-center gap-1">
              <button
                onClick={undo}
                disabled={!canUndo}
                className="btn-ghost btn-icon btn-sm disabled:opacity-30 transition-all duration-150 cursor-pointer"
                title="Undo (Ctrl+Z)"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={redo}
                disabled={!canRedo}
                className="btn-ghost btn-icon btn-sm disabled:opacity-30 transition-all duration-150 cursor-pointer"
                title="Redo (Ctrl+Shift+Z / Ctrl+Y)"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {isEditing && <div className="w-px h-4 bg-border-subtle mx-1 hidden xs:block" />}

          {activePages.length > 0 && (
            <div className="hidden lg:flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary px-2 py-1">
              <span className="px-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-tertiary">Pages</span>
              <select
                value={templateData.activePageId || activePages[0]?.id || ''}
                onChange={(event) =>
                  setTemplateData((prev) => ({
                    ...prev,
                    activePageId: event.target.value,
                    textOverrides: {
                      ...(prev.textOverrides || {}),
                      'template-page-activePageId': event.target.value,
                    },
                  }))
                }
                className="rounded-full border border-border-subtle bg-bg-primary px-3 py-1.5 text-xs font-medium text-text-primary outline-none"
              >
                {activePages.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Mode Toggle */}
          <div className="glass-light p-1 rounded-full flex items-center gap-1">
            <button
              onClick={() => setMode('VIEWING')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                mode === 'VIEWING' ? 'bg-accent text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Viewing</span>
            </button>
            
            <button
              onClick={() => setMode('EDITING')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                mode === 'EDITING' ? 'bg-accent text-white shadow-sm' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Editing</span>
            </button>
          </div>
        </div>

        {/* Right group */}
        <div className="flex items-center gap-2">
          {/* Desktop vs Mobile Canvas Switcher */}
          <div className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setCanvasViewMode('desktop')}
              className={`btn-ghost btn-icon btn-sm transition-all duration-150 cursor-pointer ${
                canvasViewMode === 'desktop' ? 'bg-bg-active text-text-primary' : 'text-text-secondary'
              }`}
              title="Desktop viewport"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCanvasViewMode('mobile')}
              className={`btn-ghost btn-icon btn-sm transition-all duration-150 cursor-pointer ${
                canvasViewMode === 'mobile' ? 'bg-bg-active text-text-primary' : 'text-text-secondary'
              }`}
              title="Mobile viewport"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-5 bg-border-subtle mx-1 hidden sm:block" />

          {/* View Full Screen / Preview Button */}
          <button
            onClick={() => {
              const handle = templateData?.profileHandle || 'bruno';
              try {
                if (typeof window !== 'undefined' && templateData) {
                  const payload = JSON.stringify(templateData);
                  localStorage.setItem('portiva_preview_data', payload);
                  localStorage.setItem(`portiva_draft_${handle.toLowerCase()}`, payload);
                }
              } catch (e) {}

              const targetUrl = `${window.location.origin}/${handle}`;
              const win = window.open(targetUrl, '_blank');
              if (!win) {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(() => {});
                }
              }
            }}
            className="btn-ghost btn-sm hidden sm:flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
            title="Open website in full screen new tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Preview</span>
          </button>

          <button
            onClick={onPublish}
            disabled={isPublishing}
            className="btn-primary btn-sm flex items-center gap-1.5 transition-all duration-150 cursor-pointer"
          >
            {isPublishing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span className="text-xs font-medium">Compiling</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-medium">Publish</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ─── Main visual layout area ────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Left Properties Inspector */}
        <InspectorSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Mobile Inspector Drawer & Backdrop */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-30 flex flex-col justify-end">
            <div 
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 glass-strong cursor-pointer"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full h-[80vh] bg-bg-secondary rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-border-subtle flex flex-col overflow-hidden z-40"
            >
              <div className="w-full flex justify-center pt-3 pb-2 shrink-0 cursor-pointer" onClick={() => setIsSidebarOpen(false)}>
                <div className="w-8 h-1 rounded-full bg-border-strong" />
              </div>
              <div className="flex-1 overflow-auto">
                <InspectorSidebar isOpen={true} onClose={() => setIsSidebarOpen(false)} mobileDrawerMode />
              </div>
            </motion.div>
          </div>
        )}

        {/* Main Canvas Workspace Container */}
        <main 
          className="flex-1 bg-bg-secondary p-4 sm:p-8 flex items-center justify-center overflow-auto relative select-none"
          style={{
            backgroundImage: 'radial-gradient(circle, #1C1C21 0.8px, transparent 0.8px)',
            backgroundSize: '20px 20px',
          }}
          onMouseEnter={() => setIsCanvasHovered(true)}
          onMouseLeave={() => setIsCanvasHovered(false)}
        >
          {/* HUD Badge */}
          <div 
            className={`absolute top-4 left-4 pointer-events-none select-none text-[10px] font-mono tracking-wider text-text-quaternary transition-opacity duration-300 ${
              isCanvasHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            GRID: 20px | MODE: {mode} | VIEWPORT: {canvasViewMode.toUpperCase()} | ZOOM: {Math.round(canvasZoom * 100)}%
          </div>

          {/* Interactive Bounding simulated canvas wrapper */}
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              relative bg-bg-primary transition-all duration-300 flex flex-col shrink-0
              ${canvasViewMode === 'mobile' 
                ? 'w-full max-w-[375px] h-[812px] rounded-[32px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-[8px] border-bg-tertiary overflow-hidden' 
                : 'w-full max-w-[1280px] xl:max-w-[1400px] h-[calc(100vh-120px)] min-h-[680px] aspect-[16/10] rounded-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)] border border-border-subtle overflow-hidden'
              }
              ${isEditing ? 'cursor-crosshair' : 'cursor-default'}
            `}
            style={{
              transform: `scale(${canvasZoom})`,
              transformOrigin: 'center top',
              willChange: 'transform',
            }}
          >
            {/* Desktop Browser Window Chrome Header Bar */}
            {canvasViewMode === 'desktop' && (
              <div className="w-full h-9 bg-bg-secondary border-b border-border-subtle px-4 flex items-center justify-between shrink-0 select-none z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80 border border-[#E0443E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80 border border-[#DEA123]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80 border border-[#1AAB29]" />
                </div>
                <div className="glass-light px-4 py-1 rounded-md text-[11px] font-mono text-text-tertiary flex items-center gap-1.5 border border-border-subtle max-w-[280px] truncate">
                  <span className="text-text-quaternary">https://</span>
                  <span className="text-text-secondary font-medium">portiva.in/{templateData?.profileHandle || 'bruno'}</span>
                </div>
                <div className="w-12 text-[10px] font-mono text-text-quaternary text-right uppercase tracking-wider">
                  16:10 Viewport
                </div>
              </div>
            )}

            {/* Scrollable Web Page Canvas */}
            <div className="canvas-container flex-1 w-full overflow-y-auto overflow-x-hidden relative">
              <div className="w-full min-h-full">
                <MotionConfig reducedMotion={isEditing ? 'always' : 'user'}>
                  {children}
                </MotionConfig>
              </div>

              {/* ─── HOVER & SELECTION OVERLAYS ─── */}
              {isEditing && (
                <div className="absolute inset-0 pointer-events-none z-50">
                  {/* 1. Hover Highlight Overlay */}
                  {hoveredRect && !selectedRect && (
                    <div
                      style={{
                        position: 'absolute',
                        top: hoveredRect.top,
                        left: hoveredRect.left,
                        width: hoveredRect.width,
                        height: hoveredRect.height,
                      }}
                      className="border-[1.5px] border-accent/50 rounded-md pointer-events-none transition-all duration-75"
                    />
                  )}

                  {/* 2. Selection Highlight Overlay */}
                  {selectedRect && (
                    <div
                      style={{
                        position: 'absolute',
                        top: selectedRect.top,
                        left: selectedRect.left,
                        width: selectedRect.width,
                        height: selectedRect.height,
                      }}
                      className="border-2 border-accent rounded-md pointer-events-none transition-all duration-75"
                    >
                      {/* Label tag */}
                      <span className="absolute -top-7 left-0 glass-strong text-text-secondary text-[10px] font-mono px-2 py-1 rounded shadow-sm">
                        {selectedRect.field}
                      </span>

                      {/* Circular corner handles */}
                      <div className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-accent rounded-full shadow-sm" />
                      <div className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-accent rounded-full shadow-sm" />
                      <div className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white border-2 border-accent rounded-full shadow-sm" />
                      <div className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white border-2 border-accent rounded-full shadow-sm" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* ─── FLOATING ZOOM CONTROLS ─── */}
          <ZoomControls />
        </main>
      </div>
    </div>
  );
}
