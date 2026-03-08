import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "dealforge_token";
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dealforge_dev_secret_change_me"
);

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

  // Verify JWT token
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
    return NextResponse.next();
  } catch {
    // Invalid token — clear it and redirect
    if (isProtectedAPI) {
      return NextResponse.json({ error: "Token invalido" }, { status: 401 });
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
