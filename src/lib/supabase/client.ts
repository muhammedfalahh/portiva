/**
 * =============================================================================
 * PORTIVA: Supabase Browser Client Factory
 * =============================================================================
 *
 * Creates a Supabase client for use in React Client Components ('use client').
 *
 * This client:
 *   - Uses the public publishable key (safe to expose in browser code)
 *   - Automatically manages auth session cookies via createBrowserClient
 *   - Respects Row-Level Security policies (user can only access their own data)
 *   - Handles token refresh transparently in the background
 *
 * Usage:
 *   import { createClient } from '@/lib/supabase/client';
 *   const supabase = createClient();
 *   const { data } = await supabase.from('profiles').select('*');
 */

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/lib/database.types';

/**
 * Create a browser-side Supabase client for client components.
 *
 * This is the ONLY Supabase client that should be used in 'use client'
 * components. It reads/writes auth cookies in the browser and maintains
 * the user's session across page navigations.
 *
 * The publishable key is intentionally public — all data protection is handled
 * by PostgreSQL Row-Level Security policies on the server.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
