/**
 * =============================================================================
 * PORTIVA: Profile Loading Skeleton
 * =============================================================================
 *
 * Displays an animated skeleton while the profile page is being rendered
 * on the server. This provides instant visual feedback to the user,
 * preventing layout shift when the real content loads.
 *
 * The skeleton mirrors the exact layout structure of the profile page:
 *   - Circular avatar placeholder
 *   - Name and handle text bars
 *   - 6 bento grid cells with shimmer animation
 */

export default function ProfileLoading() {
  return (
    <div className="w-full min-h-screen bg-[#08080A] text-slate-100 flex flex-col items-center p-6 md:p-12 font-sans animate-pulse">
      {/* Header Skeleton */}
      <header className="w-full max-w-4xl flex flex-col items-center mb-12">
        {/* Avatar placeholder */}
        <div className="w-24 h-24 rounded-full bg-slate-800 mb-4" />
        {/* Name placeholder */}
        <div className="h-8 w-48 bg-slate-800 rounded-lg mb-2" />
        {/* Handle placeholder */}
        <div className="h-4 w-32 bg-slate-800/60 rounded-md" />
      </header>

      {/* Bento Grid Skeleton */}
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[160px]">
        {/* Skeleton cells with varied spans to mimic real content */}
        <div className="col-span-2 row-span-1 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
        <div className="col-span-1 row-span-1 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
        <div className="col-span-1 row-span-2 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
        <div className="col-span-1 row-span-1 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
        <div className="col-span-2 row-span-1 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
        <div className="col-span-2 row-span-2 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
        <div className="col-span-2 row-span-1 bg-slate-800/40 rounded-[32px] border border-slate-800/30" />
      </div>
    </div>
  );
}
