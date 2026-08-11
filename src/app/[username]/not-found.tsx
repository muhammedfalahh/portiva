/**
 * =============================================================================
 * PORTIVA: Profile Not Found Page
 * =============================================================================
 *
 * Custom 404 page displayed when:
 *   - The username slug doesn't match any profile in the database
 *   - The matching profile has been flagged by content moderation (is_moderated = true)
 *
 * Design: Matches the dark theme of the main profile page with a clear
 * call-to-action to create a new Portiva page.
 */

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ProfileNotFound() {
  return (
    <div className="w-full min-h-screen bg-bg-primary text-text-primary flex flex-col items-center justify-center p-6 font-sans">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/[0.08] rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Error Code */}
        <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-text-quaternary to-bg-hover mb-4">
          404
        </span>

        <h1 className="text-2xl font-black tracking-tight text-text-primary mb-3">
          Profile Not Found
        </h1>
        <p className="text-text-secondary text-sm font-medium leading-relaxed mb-8">
          This page doesn&apos;t exist or has been removed. The username may be
          misspelled, or the creator may have deactivated their page.
        </p>

        {/* CTA: Create your own */}
        <Link
          href="/"
          className="btn btn-primary inline-flex items-center gap-2"
        >
          Create your Portiva page
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Secondary link */}
        <Link
          href="/"
          className="mt-4 text-xs font-semibold text-text-tertiary hover:text-text-secondary transition"
        >
          ← Back to Portiva
        </Link>
      </div>
    </div>
  );
}
