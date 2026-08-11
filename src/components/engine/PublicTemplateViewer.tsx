/**
 * =============================================================================
 * PORTIVA: PublicTemplateViewer — Client-Side Theme & Draft Data Hydrator
 * =============================================================================
 *
 * Ensures that when a template website is viewed standalone (such as in a new
 * browser tab via "View Full Screen"), any applied theme presets or draft
 * customizations saved in localStorage are hydrated and applied seamlessly via
 * VisualBuilderProvider and ThemeProvider.
 */

'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './ThemeProvider';
import { VisualBuilderProvider } from './VisualBuilderContext';
import { TemplateData } from './useWorkspaceStore';

interface PublicTemplateViewerProps {
  handle: string;
  defaultData?: TemplateData;
  children: React.ReactNode;
}

export function PublicTemplateViewer({
  handle,
  defaultData,
  children,
}: PublicTemplateViewerProps) {
  const [data, setData] = useState<TemplateData | undefined>(defaultData);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      // 1. Try handle-specific draft from localStorage
      const handleDraft = localStorage.getItem(`portiva_draft_${handle.toLowerCase()}`);
      if (handleDraft) {
        const parsed = JSON.parse(handleDraft);
        if (parsed && parsed.theme) {
          setData(parsed);
          return;
        }
      }

      // 2. Try global preview data fallback
      const globalPreview = localStorage.getItem('portiva_preview_data');
      if (globalPreview) {
        const parsed = JSON.parse(globalPreview);
        if (parsed && parsed.theme) {
          setData(parsed);
          return;
        }
      }
    } catch (e) {
      // Ignore parsing error fallback
    }
  }, [handle]);

  if (!data) {
    return <>{children}</>;
  }

  return (
    <VisualBuilderProvider initialData={data} initialMode="VIEWING">
      <ThemeProvider theme={data.theme}>
        {children}
      </ThemeProvider>
    </VisualBuilderProvider>
  );
}
