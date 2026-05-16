/**
 * Skeleton Components — animated loading placeholders
 *
 * Usage:
 *   <SkeletonCard lines={3} />
 *   <SkeletonTable rows={5} cols={4} />
 *   <SkeletonText width="60%" />
 *   <SkeletonChart type="bar" />
 */

// ── Shared pulse animation ──
const pulse = "animate-pulse bg-gradient-to-r from-[var(--surface-border)] via-[var(--white-warm)] to-[var(--surface-border)] bg-[length:200%_100%] animate-shimmer";

const shimmerStyles = `
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .animate-shimmer { animation: shimmer 1.8s ease-in-out infinite; }
`;

// ── Skeleton Block ──
export function SkeletonBlock({ className = "", width = "100%", height = "16px", rounded = "rounded-xl" }: {
  className?: string; width?: string; height?: string; rounded?: string;
}) {
  return (
    <div
      className={`${pulse} ${rounded} ${className}`}
      style={{ width, height }}
    />
  );
}

// ── Skeleton Text Line ──
export function SkeletonText({ width = "100%", size = "sm", className = "" }: {
  width?: string; size?: "xs" | "sm" | "base" | "lg" | "xl"; className?: string;
}) {
  const heights: Record<string, string> = { xs: "10px", sm: "14px", base: "16px", lg: "20px", xl: "24px" };
  return <SkeletonBlock width={width} height={heights[size]} className={className} />;
}

// ── Skeleton Card ──
export function SkeletonCard({ lines = 4, showAvatar = false, className = "" }: {
  lines?: number; showAvatar?: boolean; className?: string;
}) {
  return (
    <div className={`shade-card p-5 space-y-4 ${className}`}>
      <style>{shimmerStyles}</style>
      {showAvatar && (
        <div className="flex items-center gap-3">
          <SkeletonBlock width="44px" height="44px" rounded="rounded-full" />
          <div className="flex-1 space-y-2">
            <SkeletonText width="50%" size="base" />
            <SkeletonText width="30%" size="xs" />
          </div>
        </div>
      )}
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonText key={i} width={`${70 + Math.random() * 30}%`} size="sm" />
      ))}
      <div className="flex gap-2 pt-2">
        <SkeletonBlock width="80px" height="36px" rounded="rounded-xl" />
        <SkeletonBlock width="80px" height="36px" rounded="rounded-xl" />
      </div>
    </div>
  );
}

// ── Skeleton Table ──
export function SkeletonTable({ rows = 5, cols = 5, className = "" }: {
  rows?: number; cols?: number; className?: string;
}) {
  return (
    <div className={`shade-card overflow-hidden ${className}`}>
      <style>{shimmerStyles}</style>
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex gap-4 pb-3 border-b border-[var(--surface-border)]">
          {Array.from({ length: cols }).map((_, i) => (
            <SkeletonBlock key={i} width={`${100 / cols}%`} height="14px" />
          ))}
        </div>
        {/* Rows */}
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex gap-4 py-2">
            {Array.from({ length: cols }).map((_, c) => (
              <SkeletonBlock key={c} width={`${100 / cols}%`} height="12px" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Skeleton KPI Grid ──
export function SkeletonKPIGrid({ count = 4, className = "" }: {
  count?: number; className?: string;
}) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <style>{shimmerStyles}</style>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="shade-card p-5 space-y-3">
          <div className="flex items-center gap-3">
            <SkeletonBlock width="40px" height="40px" rounded="rounded-xl" />
            <SkeletonText width="40%" size="xs" />
          </div>
          <SkeletonText width="60%" size="xl" />
          <SkeletonText width="80%" size="xs" />
        </div>
      ))}
    </div>
  );
}

// ── Skeleton Dashboard Layout ──
export function SkeletonDashboard({ type = "employee" }: { type?: "employee" | "admin" | "hr" }) {
  return (
    <div className="min-h-screen bg-surface-mid">
      <style>{shimmerStyles}</style>
      {/* Header skeleton */}
      <div className="h-16 border-b border-[var(--glass-border)] bg-surface-card/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SkeletonBlock width="36px" height="36px" rounded="rounded-lg" />
          <SkeletonText width="80px" size="base" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonBlock width="36px" height="36px" rounded="rounded-xl" />
          <SkeletonBlock width="36px" height="36px" rounded="rounded-xl" />
          <SkeletonBlock width="120px" height="36px" rounded="rounded-xl" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <SkeletonText width="250px" size="xl" />
          <SkeletonText width="180px" size="sm" />
        </div>

        {/* KPI Grid */}
        <SkeletonKPIGrid count={4} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SkeletonCard lines={5} />
            <SkeletonCard lines={4} />
          </div>
          <div className="space-y-6">
            <SkeletonCard lines={3} />
            <SkeletonCard lines={3} showAvatar />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Skeleton Chart ──
export function SkeletonChart({ type = "bar", height = 280, className = "" }: {
  type?: "bar" | "line" | "pie"; height?: number; className?: string;
}) {
  return (
    <div className={`shade-card p-6 ${className}`}>
      <style>{shimmerStyles}</style>
      <div className="flex items-center justify-between mb-4">
        <SkeletonText width="120px" size="base" />
        <SkeletonText width="60px" size="xs" />
      </div>
      <div className="relative" style={{ height }}>
        {type === "bar" && (
          <div className="flex items-end justify-between gap-2 h-full pb-8">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <SkeletonBlock
                  width="100%"
                  height={`${Math.random() * 60 + 20}%`}
                  rounded="rounded-t-lg"
                />
                <SkeletonText width="80%" size="xs" />
              </div>
            ))}
          </div>
        )}
        {type === "line" && (
          <div className="space-y-8 pt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <SkeletonText width="30px" size="xs" />
                <SkeletonBlock width="100%" height="3px" rounded="rounded-full" />
              </div>
            ))}
          </div>
        )}
        {type === "pie" && (
          <div className="flex items-center justify-center h-full gap-8">
            <SkeletonBlock width="160px" height="160px" rounded="rounded-full" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <SkeletonBlock width="12px" height="12px" rounded="rounded-full" />
                  <SkeletonText width="60px" size="xs" />
                  <SkeletonText width="40px" size="xs" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}