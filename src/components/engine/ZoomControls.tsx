'use client';

import React, { useCallback } from 'react';
import { Minus, Plus, Maximize2 } from 'lucide-react';
import { useWorkspaceStore } from './useWorkspaceStore';

const ZOOM_MIN = 0.5;
const ZOOM_MAX = 2.0;
const ZOOM_STEP = 0.1;

export function ZoomControls() {
  const canvasZoom = useWorkspaceStore((s) => s.canvasZoom);
  const setCanvasZoom = useWorkspaceStore((s) => s.setCanvasZoom);
  const resetCanvasZoom = useWorkspaceStore((s) => s.resetCanvasZoom);

  const zoomPercent = Math.round(canvasZoom * 100);

  const handleDecrement = useCallback(() => {
    setCanvasZoom(Math.round((canvasZoom - ZOOM_STEP) * 10) / 10);
  }, [canvasZoom, setCanvasZoom]);

  const handleIncrement = useCallback(() => {
    setCanvasZoom(Math.round((canvasZoom + ZOOM_STEP) * 10) / 10);
  }, [canvasZoom, setCanvasZoom]);

  const handleSliderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCanvasZoom(parseFloat(e.target.value));
    },
    [setCanvasZoom],
  );

  const handleResetDoubleClick = useCallback(() => {
    resetCanvasZoom();
  }, [resetCanvasZoom]);

  const handleFitToScreen = useCallback(() => {
    // Basic fit-to-screen logic: reset for now, or could calculate actual fit based on viewport
    resetCanvasZoom();
  }, [resetCanvasZoom]);

  const percentage = ((canvasZoom - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN)) * 100;

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="flex items-center gap-2 px-3 py-2 rounded-badge glass-strong shadow-lg">
        
        {/* ── Minus Button ─────────────────────────────────────────────── */}
        <button
          onClick={handleDecrement}
          disabled={canvasZoom <= ZOOM_MIN}
          className="btn-ghost btn-icon btn-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          aria-label="Zoom out"
        >
          <Minus className="w-4 h-4" />
        </button>

        {/* ── Range Slider ─────────────────────────────────────────────── */}
        <div className="relative w-24 h-5 flex items-center">
          <div className="absolute w-full h-[3px] bg-bg-tertiary rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-accent transition-all duration-150 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <input
            type="range"
            min={ZOOM_MIN}
            max={ZOOM_MAX}
            step={ZOOM_STEP}
            value={canvasZoom}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Canvas zoom level"
          />
        </div>

        {/* ── Plus Button ──────────────────────────────────────────────── */}
        <button
          onClick={handleIncrement}
          disabled={canvasZoom >= ZOOM_MAX}
          className="btn-ghost btn-icon btn-sm text-text-secondary hover:text-text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 cursor-pointer"
          aria-label="Zoom in"
        >
          <Plus className="w-4 h-4" />
        </button>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div className="w-px h-4 bg-border-subtle mx-1" />

        {/* ── Percentage Indicator Pill ──────────────────────────────── */}
        <button
          onDoubleClick={handleResetDoubleClick}
          className="min-w-[48px] text-center text-[11px] font-mono text-text-secondary hover:text-text-primary transition-colors cursor-pointer select-none tabular-nums"
          title="Double-click to reset to 100%"
          aria-label={`Zoom level: ${zoomPercent}%. Double-click to reset.`}
        >
          {zoomPercent}%
        </button>

        <div className="w-px h-4 bg-border-subtle mx-1" />

        {/* ── Fit to Screen ──────────────────────────────────────────── */}
        <button
          onClick={handleFitToScreen}
          className="btn-ghost btn-icon btn-sm text-text-secondary hover:text-text-primary transition-all duration-150 cursor-pointer"
          title="Fit to Screen"
          aria-label="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
