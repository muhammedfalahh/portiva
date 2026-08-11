'use client';

import React, { useState, useTransition } from 'react';
import { createClient } from '@/lib/supabase/client';

/**
 * =============================================================================
 * PORTIVA: Inventory Status Workflow — Admin State Toggle
 * =============================================================================
 *
 * Dashboard component for car dealership operators to toggle vehicle listing
 * states between 'available' and 'sold'. Uses React 18's useTransition for
 * optimistic UI updates with automatic rollback on database errors.
 *
 * State Machine:
 *   available ──(Mark Sold)──→ sold
 *   sold ──(Restore Item)──→ available
 *
 * The public view automatically applies visual treatments based on state:
 *   - available: Normal display
 *   - sold: Grayscale image + opaque "SOLD" text overlay
 *   - promo: Animated promotional badge
 */

interface InventoryWorkflowProps {
  /** UUID of the dealership_inventory row */
  carId: string;
  /** Current lifecycle state from the database */
  initialStatus: 'available' | 'sold' | 'promo';
  /** Vehicle title for display in the admin row */
  carTitle: string;
}

export const InventoryStatusWorkflow: React.FC<InventoryWorkflowProps> = ({
  carId,
  initialStatus,
  carTitle,
}) => {
  const [status, setStatus] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  /**
   * Toggle between 'available' and 'sold' states.
   *
   * Uses an optimistic update pattern:
   *   1. Immediately update the UI state (feels instant)
   *   2. Send the mutation to Supabase in the background
   *   3. If the mutation fails, rollback to the previous state
   */
  const toggleInventoryState = async () => {
    const previousStatus = status;
    const targetState = status === 'sold' ? 'available' : 'sold';

    startTransition(async () => {
      // Optimistic update — set new state immediately
      setStatus(targetState);

      // Persist to database
      // Note: We use a type assertion here because the Supabase typed client's
      // generic inference can produce 'never' on chained .update().eq() calls
      // in strict TypeScript mode. The runtime behavior is correct.
      const supabase = createClient();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error } = await (supabase as any)
        .from('dealership_inventory')
        .update({ status: targetState })
        .eq('id', carId);

      if (error) {
        // Rollback on failure — restore previous state
        setStatus(previousStatus);
        alert(
          `Database synchronization transaction failed: ${error.message}`
        );
      }
    });
  };

  return (
    <div className="w-full bg-bg-secondary border border-border-default rounded-2xl p-4 flex items-center justify-between gap-4">
      {/* Vehicle Info */}
      <div className="flex flex-col">
        <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide line-clamp-1">
          {carTitle}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          {/* Status indicator dot */}
          <div
            className={`w-2 h-2 rounded-full ${
              status === 'sold'
                ? 'bg-danger'
                : 'bg-accent animate-pulse-subtle'
            }`}
          />
          <span className="text-[11px] font-bold text-text-secondary uppercase tracking-widest">
            Active State: {status}
          </span>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleInventoryState}
        disabled={isPending}
        className={`btn btn-sm text-xs font-black uppercase tracking-widest transition duration-200 ${
          status === 'sold'
            ? 'btn-danger'
            : 'btn-primary'
        } disabled:opacity-40`}
      >
        {isPending ? 'Syncing...' : status === 'sold' ? 'Restore Item' : 'Mark Sold'}
      </button>
    </div>
  );
};
