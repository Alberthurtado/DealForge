import { NextRequest, NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from "@/lib/rate-limit";

// Session lifetime (kept in sync with src/lib/auth.ts). The cookie is
// re-issued on activity so active users stay logged in indefinitely.
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days
// Only re-sign the token once it's older than this, to avoid re-signing
// on every single request.
const SESSION_REFRESH_AFTER_SECONDS = 60 * 60 * 24; // 1 day

// Inlined from api-key.ts to avoid importing Node.js crypto in Edge middleware
const API_KEY_PREFIX = "dfk_";
const API_KEY_LENGTH = 44;

const COOKIE_NAME = "dealforge_token";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("FATAL: JWT_SECRET no está definido.");
  }
  return new TextEncoder().encode(secret);
}

const JWT_SECRET = getJwtSecret();

// Routes that require authentication
const PROTECTED_PREFIXES = [
  "/panel",
  "/clientes",
  "/cotizaciones",
  "/productos",
  "/reportes",
  "/reglas",
  "/integraciones",
  "/configuracion",
  "/contratos",
];

// API routes that require authentication (except auth endpoints)
const PROTECTED_API_PREFIXES = [
  "/api/empresa",
  "/api/clientes",
  "/api/productos",
  "/api/cotizaciones",
  "/api/reportes",
  "/api/reglas",
  "/api/assistant",
  "/api/email",
  "/api/integraciones",
  "/api/stripe/checkout",
  "/api/stripe/portal",
  "/api/contratos",
];

// ─── Role-based access control (M3) ───
// Roles: ADMIN (full), SALES (manage business data), VIEWER (read-only).
// Enforced centrally for write methods on protected APIs, using the rol claim
// in the JWT (no DB call). Legacy tokens without a rol claim default to ADMIN
// (matches the login fallback) so existing solo-admin sessions aren't locked out.
const WRITE_METHODS = ["POST", "PUT", "DELETE", "PATCH"];
// Writes under these prefixes require ADMIN (company settings, billing).
const ADMIN_ONLY_WRITE_PREFIXES = ["/api/empresa", "/api/stripe"];
// POSTs that don't mutate business data — allowed for any authenticated role.
// (assistant is gated at the tool layer so VIEWER can read but not write via AI.)
const READONLY_POST_PREFIXES = ["/api/reglas/validar", "/api/assistant"];

// Always public
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/registro",
];

const PUBLIC_PREFIXES = [
  "/api/auth/",
  "/verificar/",           // Email verification redirect
  "/verificar-email",      // "Check your email" page
  "/verificar-error",      // Verification error page
  "/api/stripe/webhook", // Stripe webhooks — no auth needed
  "/api/pdf-preview/",   // PDF preview for Puppeteer — HMAC protected
  "/api/leads",          // Lead capture — public
  "/api/contacto",       // Contact form — public
  "/api/cron/",          // Cron jobs — CRON_SECRET protected
  "/e3e045fe-",          // IndexNow key verification
  "/aprobar/",
  "/checkout/",          // Post-checkout pages
  "/_next/",
  "/logo",
  "/favicon",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public paths
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();
  for (const prefix of PUBLIC_PREFIXES) {
    if (pathname.startsWith(prefix)) return NextResponse.next();
  }

  // Check if the route needs protection
  const isProtectedPage = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isProtectedAPI = PROTECTED_API_PREFIXES.some((p) => pathname.startsWith(p));

  if (!isProtectedPage && !isProtectedAPI) return NextResponse.next();

  // ─── API Key auth (Bearer token) — only for API routes ───
  if (isProtectedAPI) {
    const authHeader = request.headers.get("authorization");
    if (authHeader?.startsWith("Bearer ")) {
      const apiKey = authHeader.slice(7);

      // Validate format (no DB call in middleware)
      if (!apiKey.startsWith(API_KEY_PREFIX) || apiKey.length !== API_KEY_LENGTH) {
        return NextResponse.json({ error: "API key inválida" }, { status: 401 });
      }

      // Rate limit API key requests (120/min keyed by first 16 chars of key)
      const keyId = apiKey.substring(0, 16);
      const limit = checkRateLimit(`api-key:${keyId}`, RATE_LIMITS.apiKeyAuth);
      if (!limit.allowed) return rateLimitResponse(limit.resetAt);

      // Forward raw key to route handler via header (resolved in getSession())
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-dealforge-api-key", apiKey);
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
  }

  // ─── Cookie-based JWT auth ───
  const token = request.cookies.get(COOKIE_NAME)?.value;

  if (!token) {
    if (isProtectedAPI) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }
    // Redirect pages to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Rate limit write operations on protected APIs (60/min per IP)
    if (isProtectedAPI && WRITE_METHODS.includes(request.method)) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const limit = checkRateLimit(`api-write:${ip}`, { maxRequests: 60, windowSeconds: 60 });
      if (!limit.allowed) return rateLimitResponse(limit.resetAt);
    }

    // ─── Role guard: block VIEWER from writes; restrict settings/billing to ADMIN ───
    if (isProtectedAPI && WRITE_METHODS.includes(request.method)) {
      const rol = typeof payload.rol === "string" && payload.rol ? payload.rol : "ADMIN";
      const isReadOnlyPost = READONLY_POST_PREFIXES.some((p) => pathname.startsWith(p));
      if (!isReadOnlyPost) {
        const needsAdmin = ADMIN_ONLY_WRITE_PREFIXES.some((p) => pathname.startsWith(p));
        if (needsAdmin && rol !== "ADMIN") {
          return NextResponse.json(
            { error: "Solo los administradores pueden realizar esta acción." },
            { status: 403 }
          );
        }
        if (!needsAdmin && rol === "VIEWER") {
          return NextResponse.json(
            { error: "Tu rol (solo lectura) no permite esta acción." },
            { status: 403 }
          );
        }
      }
    }

    const response = NextResponse.next();

    // ─── Sliding session ───
    // Re-issue the token (and cookie) with a fresh 30-day window when the
    // current one is older than a day. This keeps active users logged in
    // indefinitely without re-signing on every request. We only do this on
    // page navigations (GET) to avoid touching API write responses.
    if (request.method === "GET") {
      const issuedAt = typeof payload.iat === "number" ? payload.iat : 0;
      const ageSeconds = Math.floor(Date.now() / 1000) - issuedAt;
      if (ageSeconds > SESSION_REFRESH_AFTER_SECONDS) {
        // Re-sign with the same custom claims, fresh iat/exp.
        const { iat: _iat, exp: _exp, ...claims } = payload;
        void _iat;
        void _exp;
        const freshToken = await new SignJWT(claims)
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("30d")
          .sign(JWT_SECRET);
        response.cookies.set(COOKIE_NAME, freshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: SESSION_MAX_AGE_SECONDS,
        });
      }
    }

    return response;
  } catch {
    // Invalid token — clear it and redirect
    if (isProtectedAPI) {
      return NextResponse.json({ error: "Token inválido" }, { status: 401 });
    }
    const loginUrl = new URL("/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all paths except static files
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.svg|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico)$).*)",
  ],
};
