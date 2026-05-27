/**
 * BusinessCardSkeleton
 *
 * Renders a loading placeholder that exactly mirrors the BusinessCard layout:
 *   - 16:9 image area
 *   - Two-line title block
 *   - Star row
 *   - Location line
 *   - Footer CTA hint
 *
 * The `.skeleton` class (defined in globals.css) runs the shimmer animation.
 * No framer-motion dependency — plain CSS keeps it lightweight and instant.
 */

// ─── Single skeleton card ─────────────────────────────────────────────────────

export function BusinessCardSkeleton() {
  return (
    <div
      className="rounded-lg overflow-hidden bg-parchment-warm border border-parchment-muted"
      aria-hidden="true" /* hidden from screen readers — real content will replace this */
    >
      {/* ── Image area — 16:9 ── */}
      <div className="w-full aspect-video skeleton" />

      {/* ── Card body ── */}
      <div className="p-4">
        {/* Category badge stub */}
        <div className="skeleton h-5 w-24 rounded-full mb-3" />

        {/* Business name — two lines to match long names */}
        <div className="space-y-2 mb-3">
          <div className="skeleton h-5 rounded-md w-4/5" />
          <div className="skeleton h-5 rounded-md w-3/5" />
        </div>

        {/* Star rating row */}
        <div className="skeleton h-3.5 rounded-md w-2/5 mb-2" />

        {/* Location line */}
        <div className="skeleton h-3 rounded-md w-1/3" />
      </div>

      {/* ── Footer hint ── */}
      <div className="px-4 pb-4">
        <div className="skeleton h-3 rounded-md w-1/4" />
      </div>
    </div>
  );
}

// ─── Skeleton grid ────────────────────────────────────────────────────────────

interface BusinessCardSkeletonGridProps {
  /** How many skeleton cards to render. Defaults to 6. */
  count?: number;
  /** Tailwind grid class applied to the wrapper. Matches the real grid. */
  gridClassName?: string;
}

/**
 * Renders a full grid of skeleton cards.
 *
 * Usage:
 * ```tsx
 * {isLoading ? (
 *   <BusinessCardSkeletonGrid count={8} />
 * ) : (
 *   <div className="grid ...">
 *     {businesses.map(b => <BusinessCard key={b.id} ... />)}
 *   </div>
 * )}
 * ```
 */
export function BusinessCardSkeletonGrid({
  count = 6,
  gridClassName = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
}: BusinessCardSkeletonGridProps) {
  return (
    <div
      className={gridClassName}
      role="status"
      aria-label="Loading businesses…"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: count }, (_, i) => (
        <BusinessCardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Inline skeleton primitives ───────────────────────────────────────────────
// Export raw building blocks so other pages can compose custom skeletons.

export function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-md ${className}`} />;
}

export function SkeletonCircle({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-full ${className}`} />;
}

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton rounded-lg ${className}`} />;
}
