/**
 * =============================================================================
 * PORTIVA: Supabase Server Client Factory
 * =============================================================================
 *
 * Provides two server-side Supabase client constructors:
 *
 *   1. createClient()        — Cookie-based session client for authenticated
 *                               server components, actions, and route handlers.
 *                               Respects RLS policies. Uses the publishable key.
 *
 *   2. createServiceClient() — Service role client for public SSR fetching
 *                               (e.g., the [username] profile page). Bypasses
 *                               RLS entirely. NEVER expose to client code. Uses the secret key.
 *
 * SECURITY NOTES:
 *   - createClient() reads/writes auth cookies via Next.js `cookies()` API.
 *     This ensures the Supabase client sees the logged-in user's session.
 *   - createServiceClient() uses SUPABASE_SECRET_KEY which has full
 *     database access. It should ONLY be used in server-side code paths
 *     that serve public, non-authenticated data.
 *   - Always prefer createClient() for any operation where user identity matters.
 */

import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';

/**
 * Create a cookie-aware Supabase client for server-side operations.
 *
 * This client inherits the authenticated user's session from cookies,
 * making it suitable for:
 *   - Server components that need user-specific data
 *   - Server actions (form handlers, mutations)
 *   - Route handlers (API routes)
 *
 * RLS policies are enforced — the client can only access rows that
 * the authenticated user is permitted to see/modify.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // The `setAll` method is called from a Server Component where
            // cookies cannot be set. This is expected when the middleware
            // is refreshing the session — the cookie will be set there instead.
          }
        },
      },
    }
  );
}

/**
 * Create a service-role Supabase client for public SSR data fetching.
 *
 * This client bypasses ALL Row-Level Security policies and has full
 * read/write access to every table. It is used exclusively for:
 *   - Public profile page rendering ([username]/page.tsx)
 *   - Static generation (generateStaticParams)
 *   - Any server-side operation that doesn't need user auth context
 *
 * WARNING: The secret key must NEVER be exposed to client-side code.
 * This function should only be called in server components, server actions,
 * or route handlers.
 */
export function createServiceClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      auth: {
        // Disable auto-refresh and session persistence since this is a
        // stateless server client with no user session to manage.
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
