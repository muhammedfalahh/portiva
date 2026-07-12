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

export default function ProfileNotFound() {
  return (
    <div className="w-full min-h-screen bg-[#08080A] text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md">
        {/* Error Code */}
        <span className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-600 to-slate-800 mb-4">
          404
        </span>

        <h1 className="text-2xl font-black tracking-tight mb-3">
          Profile Not Found
        </h1>
        <p className="text-slate-400 text-sm font-medium leading-relaxed mb-8">
          This page doesn&apos;t exist or has been removed. The username may be
          misspelled, or the creator may have deactivated their page.
        </p>

        {/* CTA: Create your own */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/30 active:scale-[0.98]"
        >
          Create your Portiva page
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>

        {/* Secondary link */}
        <Link
          href="/"
          className="mt-4 text-xs font-semibold text-slate-500 hover:text-slate-400 transition"
        >
          ← Back to Portiva
        </Link>
      </div>
    </div>
  );
}
