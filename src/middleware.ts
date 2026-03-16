import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { checkRateLimit, rateLimitResponse, RATE_LIMITS } from "@/lib/rate-limit";

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
  "/api/blog",
];

// Always public
const PUBLIC_PATHS = [
  "/",
  "/login",
  "/registro",
];

const PUBLIC_PREFIXES = [
  "/api/auth/",
  "/api/stripe/webhook", // Stripe webhooks — no auth needed
  "/api/pdf-preview/",   // PDF preview for Puppeteer — HMAC protected
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
    await jwtVerify(token, JWT_SECRET);

    // Rate limit write operations on protected APIs (60/min per IP)
    if (isProtectedAPI && ["POST", "PUT", "DELETE", "PATCH"].includes(request.method)) {
      const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const limit = checkRateLimit(`api-write:${ip}`, { maxRequests: 60, windowSeconds: 60 });
      if (!limit.allowed) return rateLimitResponse(limit.resetAt);
    }

    return NextResponse.next();
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
