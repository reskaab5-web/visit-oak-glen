/**
 * IP-based sliding-window rate limiter.
 *
 * Uses an in-process Map — reliable on Render's long-lived Node server.
 * NOTE: resets on cold-start and does NOT share state across multiple
 * instances. If you scale to multiple servers, swap the store for
 * Upstash Redis (@upstash/ratelimit) without changing the call sites.
 *
 * Usage:
 *   const result = rateLimit(`contact:${ip}`, { windowMs: 15 * 60_000, max: 5 });
 *   if (!result.allowed) return 429;
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RateLimitOptions {
  /** Size of the sliding window in milliseconds. */
  windowMs: number;
  /** Maximum number of requests allowed per window per key. */
  max: number;
}

export interface RateLimitResult {
  /** Whether this request is within the limit. */
  allowed: boolean;
  /** Requests remaining in the current window (0 when blocked). */
  remaining: number;
  /** Unix timestamp (ms) when the oldest recorded request ages out. */
  resetAt: number;
}

// ─── Store ────────────────────────────────────────────────────────────────────

interface Entry {
  /** Timestamps (ms) of requests within the current window. */
  timestamps: number[];
}

const store = new Map<string, Entry>();

// Prune keys whose timestamps are all expired — runs when the store
// grows large to prevent unbounded memory use on a busy server.
function pruneStore(windowMs: number): void {
  if (store.size < 500) return;
  const cutoff = Date.now() - windowMs;
  for (const [key, entry] of store.entries()) {
    if (entry.timestamps.every((t) => t < cutoff)) {
      store.delete(key);
    }
  }
}

// ─── Core function ────────────────────────────────────────────────────────────

export function rateLimit(
  key: string,
  options: RateLimitOptions,
): RateLimitResult {
  const { windowMs, max } = options;
  const now         = Date.now();
  const windowStart = now - windowMs;

  pruneStore(windowMs);

  const entry = store.get(key) ?? { timestamps: [] };

  // Drop timestamps that have aged out of the window
  entry.timestamps = entry.timestamps.filter((t) => t > windowStart);

  const allowed = entry.timestamps.length < max;

  if (allowed) {
    entry.timestamps.push(now);
  }

  store.set(key, entry);

  // Reset time = when the oldest in-window timestamp will age out
  const oldest = entry.timestamps[0] ?? now;
  const resetAt = oldest + windowMs;

  return {
    allowed,
    remaining: Math.max(0, max - entry.timestamps.length),
    resetAt,
  };
}

// ─── IP extraction helper ─────────────────────────────────────────────────────

/**
 * Extract the best available client IP from a Next.js request.
 * Handles Render / Vercel / plain Node forwarding headers.
 */
export function getClientIp(req: Request): string {
  // x-forwarded-for may be a comma-separated list; first entry is the client
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();

  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();

  // Fallback — all requests share one bucket (safe but imprecise)
  return "unknown";
}
