import { NextRequest, NextResponse } from "next/server";

// ─── Types ──────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

// ─── In-memory store ────────────────────────────
const store = new Map<string, RateLimitEntry>();
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

// ─── Core check ─────────────────────────────────
export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): RateLimitResult {
  cleanup();

  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  const existing = store.get(key);

  if (!existing || now > existing.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetAt: now + windowMs,
    };
  }

  existing.count++;
  store.set(key, existing);

  if (existing.count > config.maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  return {
    allowed: true,
    remaining: config.maxRequests - existing.count,
    resetAt: existing.resetAt,
  };
}

// ─── Pre-defined configs ────────────────────────
export const RATE_LIMITS = {
  login: { maxRequests: 5, windowSeconds: 15 * 60 } as RateLimitConfig,
  registro: { maxRequests: 3, windowSeconds: 60 * 60 } as RateLimitConfig,
  approval: { maxRequests: 10, windowSeconds: 60 } as RateLimitConfig,
  assistant: { maxRequests: 10, windowSeconds: 60 } as RateLimitConfig,
  email: { maxRequests: 5, windowSeconds: 60 } as RateLimitConfig,
  apiWrite: { maxRequests: 60, windowSeconds: 60 } as RateLimitConfig,
} as const;

// ─── Helpers ────────────────────────────────────
export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimitResponse(resetAt: number): NextResponse {
  const retryAfter = Math.ceil((resetAt - Date.now()) / 1000);
  return NextResponse.json(
    { error: "Demasiadas solicitudes. Intenta de nuevo en unos minutos." },
    {
      status: 429,
      headers: { "Retry-After": String(Math.max(retryAfter, 1)) },
    }
  );
}
