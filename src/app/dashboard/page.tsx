/**
 * =============================================================================
 * PORTIVA: Creator Dashboard Page Router
 * =============================================================================
 *
 * Serves as the primary entry point for the creator dashboard space.
 * Delegates layout rendering to the unified WorkspaceContainer component.
 */

'use client';

import React from 'react';
import { WorkspaceContainer } from '@/components/engine/WorkspaceContainer';

export default function Dashboard() {
  return <WorkspaceContainer />;
}
