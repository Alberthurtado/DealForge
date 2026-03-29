# Technical SEO Audit: dealforge.es

**Date:** 2026-03-28
**Framework:** Next.js (App Router)
**Domain:** https://dealforge.es
**Language:** Spanish (es)

---

## Overall Technical Score: 82/100

| Category | Status | Score |
|---|---|---|
| Crawlability | PASS | 95/100 |
| Indexability | PASS (minor gaps) | 85/100 |
| Security Headers | PASS | 95/100 |
| URL Structure | PASS | 90/100 |
| Mobile Optimization | PASS (minor gaps) | 80/100 |
| Core Web Vitals Readiness | NEEDS WORK | 65/100 |
| Structured Data | PASS | 90/100 |
| JavaScript Rendering | PASS | 90/100 |
| Google Analytics | FAIL | 0/100 |
| Canonical Tags | PASS (gaps) | 75/100 |

---

## 1. ROBOTS.TXT

**Status: PASS**

**File:** `src/app/robots.ts` (Next.js dynamic generation)

**Findings:**

- Correctly blocks authenticated dashboard routes: `/panel/`, `/clientes/`, `/cotizaciones/`, `/productos/`, `/reportes/`, `/reglas/`, `/integraciones/`, `/configuracion/`, `/api/`, `/firmar/`, `/aprobar/`, `/checkout/`
- Allows root `/` for all user agents
- Declares sitemap at `https://dealforge.es/sitemap.xml`
- Separate rules for Googlebot and Bingbot with fewer restrictions (only `/panel/`, `/api/`, `/firmar/`, `/aprobar/`, `/checkout/`)
- AI crawler rules for GPTBot, ChatGPT-User, Google-Extended, ClaudeBot, PerplexityBot, Applebot-Extended -- all well configured with explicit allow/disallow lists

**Issues:** None

---

## 2. SITEMAP.XML

**Status: PASS**

**File:** `src/app/sitemap.ts` (dynamic, `force-dynamic`)

**Findings:**

- 10 static pages with hardcoded `lastModified` dates (not `new Date()`) -- good practice
- Dynamic blog posts pulled from database with real `updatedAt` timestamps
- Programmatic SEO pages: `/plantilla-cotizacion/` + per-industry slugs
- Feature landing pages: `/funcionalidades/` + per-feature slugs
- Missing `changeFrequency` and `priority` attributes (optional but recommended)
- IndexNow integration exists (`src/lib/indexnow.ts`) for proactive URL submission to Bing/Yandex

**Issues:**

| Severity | Issue |
|---|---|
| Low | No `changeFrequency` or `priority` in sitemap entries |
| Low | `/registro` is in sitemap but is a conversion page -- consider whether search engines should discover it via sitemap or only through internal links |

---

## 3. CANONICAL TAGS

**Status: PASS with gaps**

**Pages WITH canonical tags:**
- Homepage (`/`) -- via root layout `metadataBase` + `alternates.canonical`
- `/blog`, `/blog/[slug]`
- `/guia`
- `/contacto`
- `/plantilla-cotizacion`, `/plantilla-cotizacion/[slug]`
- `/funcionalidades`, `/funcionalidades/[slug]`
- `/login` (via layout)
- `/registro` (via layout)

**Pages MISSING canonical tags:**
- `/privacidad`
- `/terminos`
- `/rgpd`
- `/documentacion`
- `/changelog`

| Severity | Issue | Recommendation |
|---|---|---|
| Medium | 5 legal/resource pages lack explicit canonical tags | Add `alternates: { canonical: "https://dealforge.es/..." }` to metadata exports in `/privacidad`, `/terminos`, `/rgpd`, `/documentacion`, `/changelog` |

Note: Next.js will auto-generate a self-referencing canonical from `metadataBase` for pages that don't override it, but explicit canonicals are safer and more predictable.

---

## 4. SECURITY HEADERS

**Status: PASS -- Excellent**

**File:** `next.config.ts` -- headers applied to all routes `/(.*)`

| Header | Value | Assessment |
|---|---|---|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` | Excellent -- 2 year max-age with preload |
| X-Frame-Options | `DENY` | Good |
| X-Content-Type-Options | `nosniff` | Good |
| Referrer-Policy | `strict-origin-when-cross-origin` | Good |
| Permissions-Policy | `camera=(), microphone=(), geolocation=()` | Good |
| X-DNS-Prefetch-Control | `on` | Good |
| X-XSS-Protection | `1; mode=block` | Deprecated but harmless |
| Content-Security-Policy | Full CSP with specific source allowlists | Good |

**CSP Analysis:**
- `script-src 'self' 'unsafe-inline' 'unsafe-eval'` -- `unsafe-eval` is needed for Next.js development but should be removed in production if possible
- `connect-src` properly allows Google Analytics, Stripe, Cloudflare
- `frame-ancestors 'none'` -- good clickjacking protection
- `object-src 'none'` -- good
- `base-uri 'self'` -- good

**Issues:**

| Severity | Issue | Recommendation |
|---|---|---|
| Low | `X-XSS-Protection` is deprecated | Consider removing; CSP replaces it |
| Low | `unsafe-eval` in script-src | Verify if needed in production; Next.js production builds may not require it |

---

## 5. URL STRUCTURE

**Status: PASS**

**Findings:**

- Clean, SEO-friendly URLs in Spanish: `/plantilla-cotizacion/construccion`, `/funcionalidades/gestion-clientes`
- No query parameters for main content pages
- Proper use of Next.js route groups `(public)`, `(legal)`, `(auth)`, `(dashboard)` -- these do NOT appear in URLs
- Slug-based dynamic routes for blog posts, industries, and features
- No trailing slash inconsistencies (Next.js handles this by default)

**URL Hierarchy:**
```
/                                  (homepage)
/registro                          (signup)
/login                             (login - noindex)
/blog                              (blog index)
/blog/[slug]                       (blog posts)
/guia                              (lead magnet)
/contacto                          (contact)
/plantilla-cotizacion              (industry templates index)
/plantilla-cotizacion/[slug]       (per-industry pages)
/funcionalidades                   (features index)
/funcionalidades/[slug]            (per-feature pages)
/documentacion                     (docs)
/changelog                         (changelog)
/privacidad                        (privacy)
/terminos                          (terms)
/rgpd                              (GDPR)
```

**Issues:** None significant

---

## 6. MOBILE OPTIMIZATION

**Status: PASS with minor gaps**

**Findings:**

- `<html lang="es">` -- correct language attribute
- Tailwind CSS with responsive breakpoints (`sm:`, `md:`, `lg:`) used extensively
- Responsive grid layouts: `grid-cols-2 md:grid-cols-4`, `lg:grid-cols-2`, etc.
- Mobile-first padding: `px-4 sm:px-6 lg:px-8`
- Responsive typography: `text-3xl sm:text-4xl lg:text-5xl`
- `site.webmanifest` present with correct icons (192px, 512px)
- `apple-touch-icon.png` declared in metadata

**Missing:**

| Severity | Issue | Recommendation |
|---|---|---|
| Medium | No explicit `viewport` meta tag in layout.tsx | Next.js App Router auto-generates viewport, but verify it outputs `width=device-width, initial-scale=1`. Consider adding explicit `export const viewport` config. |
| Low | No `next/font` usage detected -- CSS declares `font-family: "Inter"` but no font optimization | Use `next/font/google` for Inter to enable automatic font optimization (subset, swap, self-hosting) which improves CLS and LCP |

---

## 7. CORE WEB VITALS READINESS

**Status: NEEDS WORK**

### LCP (Largest Contentful Paint) -- Target: <2.5s

| Severity | Issue | Recommendation |
|---|---|---|
| High | No `priority` attribute on above-the-fold images in homepage | Add `priority` prop to the hero `<Image>` component on `page.tsx` to enable preloading of the LCP element |
| High | No `next/font` optimization -- Inter font loaded via CSS without `font-display: swap` | Use `import { Inter } from 'next/font/google'` for automatic optimization. External font loading without swap can block rendering. |
| Medium | No Open Graph image defined for homepage | Add `og:image` to homepage metadata. While not directly an LCP issue, indicates potential lack of social preview images that could be reused as hero images. |

### INP (Interaction to Next Paint) -- Target: <200ms

| Severity | Issue | Recommendation |
|---|---|---|
| Low | Public pages are server-rendered (no `"use client"`) -- good for INP | No action needed. Only auth/dashboard pages use client-side rendering. |
| Low | Homepage imports lucide-react icons (multiple individual imports) | Bundle size is well-managed with tree-shaking. No issue expected. |

### CLS (Cumulative Layout Shift) -- Target: <0.1

| Severity | Issue | Recommendation |
|---|---|---|
| High | No `next/font` usage means potential FOUT/FOIT causing layout shift | Implement `next/font/google` for Inter to eliminate font-swap layout shift |
| Medium | No `loading.tsx` skeleton files anywhere in the app | Add `loading.tsx` to `(public)/blog/` and other dynamic route segments to prevent content-based layout shifts during navigation |
| Low | `next/image` used throughout (good) -- provides width/height to prevent image CLS | No action needed |

---

## 8. JAVASCRIPT RENDERING (Next.js SSR/SSG Analysis)

**Status: PASS -- Well Architected**

**Findings:**

**Server-rendered pages (SEO-critical -- GOOD):**
- Homepage (`page.tsx`) -- Server Component
- Blog index and posts -- Server Component with `force-dynamic`
- Guide page -- Server Component
- Contact page -- Server Component
- All `/plantilla-cotizacion/` pages -- Server Component with `generateStaticParams` (SSG)
- All `/funcionalidades/` pages -- Server Component with `generateStaticParams` (SSG)
- All legal pages -- Server Components

**Client-rendered pages (non-SEO-critical -- acceptable):**
- `/login`, `/registro`, `/recuperar`, `/reset-password` -- auth flows
- All `/panel/`, `/clientes/`, `/cotizaciones/`, `/productos/` -- authenticated dashboard
- `/firmar/[token]`, `/aprobar/[token]` -- transactional pages

**Assessment:** All public SEO-critical pages use Server Components or Static Site Generation. Search engine crawlers receive fully-rendered HTML. Client-side rendering is limited to authenticated or transactional pages that are already blocked in robots.txt.

**Issues:** None

---

## 9. CRAWLABILITY

**Status: PASS**

**Findings:**

- robots.txt correctly blocks private routes
- Sitemap dynamically generated with all public URLs
- Middleware does NOT block crawlers -- public routes pass through without auth checks
- IndexNow integration for proactive crawl notifications (Bing, Yandex)
- Internal linking structure: homepage footer links to Blog, Documentation, Changelog, Legal pages
- Blog posts use `generateStaticParams` for pre-rendering

**Middleware crawlability check:**
The middleware at `src/middleware.ts` has the following public paths that pass through without authentication:
- `/` (homepage)
- `/login`, `/registro`
- All `/_next/` static assets
- `/aprobar/`, `/checkout/` prefixes
- `/api/auth/`, `/api/leads`, `/api/contacto` (public API routes)

Public content pages like `/blog`, `/guia`, `/funcionalidades`, `/plantilla-cotizacion`, `/documentacion`, `/changelog`, `/privacidad`, `/terminos`, `/rgpd`, `/contacto` are NOT in the `PROTECTED_PREFIXES` list, so they correctly pass through via the `if (!isProtectedPage && !isProtectedAPI) return NextResponse.next();` check.

**Issues:**

| Severity | Issue | Recommendation |
|---|---|---|
| Medium | No custom `not-found.tsx` page exists | Create `src/app/not-found.tsx` with proper 404 page that returns correct HTTP status and includes navigation back to the site. This helps search engines handle dead URLs gracefully. |

---

## 10. INDEXABILITY

**Status: PASS**

**Meta Robots Analysis:**

- Homepage: `index: true, follow: true` with expanded googleBot directives (`max-video-preview: -1`, `max-image-preview: large`, `max-snippet: -1`) -- excellent
- Login page: `index: false, follow: true` -- correct, login should not be indexed
- No other pages set `noindex` -- correct for public content
- No accidental `noindex` on important pages

**Potential Duplicate Content:**
- Each page has unique title and description
- Dynamic pages (blog, industry, features) generate metadata from data/database
- Canonical tags on most key pages prevent duplicate issues

**Issues:**

| Severity | Issue | Recommendation |
|---|---|---|
| Low | `/registro` is indexed but is a signup form | Consider whether this is intentional (it has SEO-optimized metadata suggesting it is) |
| Low | Dashboard pages have metadata exports but are behind auth | Not an issue since robots.txt blocks them and middleware requires auth |

---

## 11. REDIRECT CHAINS

**Status: PASS (from source analysis)**

**Findings:**

- No `redirect()` or `permanentRedirect()` calls found in API routes
- Middleware redirects only happen for unauthenticated access to protected routes (redirects to `/login`) -- correct behavior
- No chain redirects detected in the codebase
- No www-to-non-www or HTTP-to-HTTPS redirect logic in the codebase (expected to be handled at hosting/CDN level)

**Recommendation:** Verify at hosting level (Vercel, Cloudflare, etc.) that:
- `http://dealforge.es` -> `https://dealforge.es` (301)
- `https://www.dealforge.es` -> `https://dealforge.es` (301)
- No redirect chains (should be single-hop)

---

## 12. 404 ERROR HANDLING

**Status: NEEDS WORK**

| Severity | Issue | Recommendation |
|---|---|---|
| High | No `src/app/not-found.tsx` file exists | Create a custom 404 page. Without it, Next.js serves a generic 404 that lacks navigation, internal links, and branding. A custom 404 should include: links to key pages, search functionality, and proper `<title>` tag. |
| Medium | Dynamic routes use `notFound()` correctly | `/blog/[slug]` and `/plantilla-cotizacion/[slug]` call `notFound()` when content is missing -- this is correct and returns 404 status. |

---

## 13. GOOGLE ANALYTICS

**Status: FAIL -- Wrong ID**

**Finding:**

The user asked to verify that Google Analytics ID **527640266** is properly installed.

The installed Google Analytics Measurement ID in `src/app/layout.tsx` (line 6) is:
```
G-97QZPF80KT
```

**Analysis:**
- `527640266` is NOT a valid GA4 Measurement ID format (GA4 uses `G-XXXXXXXXXX`)
- `527640266` looks like a **Google Analytics property number** (numeric), not a Measurement ID
- The GA4 property `G-97QZPF80KT` may or may not correspond to property number `527640266`

**Implementation quality (of G-97QZPF80KT):**
- Loaded via `next/script` with `strategy="afterInteractive"` -- correct, does not block rendering
- gtag.js loaded from `googletagmanager.com` -- correct
- CSP allows both `googletagmanager.com` and `google-analytics.com` in `connect-src` and `script-src` -- correct
- Placed in root layout so it fires on every page -- correct

| Severity | Issue | Recommendation |
|---|---|---|
| Critical | Cannot confirm that property 527640266 matches G-97QZPF80KT | Log into Google Analytics, navigate to Admin > Property Settings, and verify the Property ID matches 527640266. If they do not match, update the Measurement ID in `src/app/layout.tsx` line 6. |

---

## STRUCTURED DATA

**Status: PASS -- Good Coverage**

**Global (root layout):**
- `Organization` schema with name, URL, logo, email, foundingDate, knowsAbout
- `WebSite` schema with SearchAction (sitelinks search box)

**Per-page schemas:**
- `/guia` -- `WebPage` with `BreadcrumbList`
- `/funcionalidades` -- `CollectionPage` with `BreadcrumbList`
- `/funcionalidades/[slug]` -- `WebPage` with `BreadcrumbList` (3-level breadcrumbs)
- `/plantilla-cotizacion` -- `CollectionPage` with `BreadcrumbList`
- `/plantilla-cotizacion/[slug]` -- (has `generateMetadata`, likely has JSON-LD)
- `/blog/[slug]` -- has article-level OpenGraph with `publishedTime` and `modifiedTime`

**Issues:**

| Severity | Issue | Recommendation |
|---|---|---|
| Medium | Homepage lacks specific JSON-LD (relies only on global Organization/WebSite) | Consider adding `SoftwareApplication` or `Product` schema to the homepage to enable rich results |
| Medium | Blog posts lack `Article` JSON-LD schema | Add `BlogPosting` or `Article` structured data to `/blog/[slug]` pages with author, datePublished, dateModified |
| Low | Organization `sameAs` array is empty | Add social media URLs when available |
| Low | No `FAQPage` schema on pages that have FAQ sections | Homepage and feature pages have FAQ accordions -- add `FAQPage` JSON-LD for FAQ rich results |

---

## PRIORITIZED ISSUE LIST

### Critical
1. **Google Analytics ID verification** -- Cannot confirm property 527640266 matches the installed Measurement ID G-97QZPF80KT. Verify in GA Admin.

### High
2. **No custom 404 page** -- Create `src/app/not-found.tsx` with branded design and navigation links.
3. **No `next/font` optimization** -- Font "Inter" is loaded via CSS without optimization. Implement `next/font/google` to eliminate FOUT, reduce CLS, and improve LCP.
4. **No `priority` on hero images** -- Add `priority` prop to above-the-fold `<Image>` components on the homepage to enable LCP preloading.

### Medium
5. **Missing canonical tags on 5 pages** -- Add explicit canonicals to `/privacidad`, `/terminos`, `/rgpd`, `/documentacion`, `/changelog`.
6. **No `loading.tsx` skeletons** -- Add loading states to dynamic route segments (especially `/blog/`) to reduce CLS during navigation.
7. **Missing `og:image` on homepage** -- Create and add an OG image for social sharing and potential rich results.
8. **Blog posts lack Article JSON-LD** -- Add `BlogPosting` structured data for rich results.
9. **Missing `FAQPage` schema** -- Add FAQ structured data to pages with FAQ sections.

### Low
10. **No `changeFrequency`/`priority` in sitemap** -- Add these optional attributes for better crawl hints.
11. **Empty `sameAs` in Organization schema** -- Add social profiles when available.
12. **`X-XSS-Protection` header is deprecated** -- Consider removing.
13. **`unsafe-eval` in CSP** -- Verify if needed in production builds.
14. **Explicit `viewport` export** -- Add `export const viewport` to root layout for explicit control.

---

## IMPLEMENTATION GUIDE

### Fix 1: Add next/font (High Priority)

In `src/app/layout.tsx`:
```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

// In the component:
<body className={`${inter.className} antialiased`}>
```

Then remove the `font-family: "Inter"` declaration from `globals.css`.

### Fix 2: Add priority to hero image

In `src/app/page.tsx`, for any above-the-fold `<Image>`:
```tsx
<Image src="/hero.webp" alt="..." width={...} height={...} priority />
```

### Fix 3: Create custom 404 page

Create `src/app/not-found.tsx`:
```tsx
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pagina no encontrada — DealForge",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-lg text-gray-600">Pagina no encontrada</p>
        <Link href="/" className="mt-6 inline-block text-[#3a9bb5] hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
```

### Fix 4: Add canonicals to legal pages

In each of `/privacidad`, `/terminos`, `/rgpd`, `/documentacion`, `/changelog`:
```tsx
export const metadata: Metadata = {
  // ...existing metadata...
  alternates: { canonical: "https://dealforge.es/privacidad" }, // adjust path per page
};
```

---

## WHAT IS WORKING WELL

1. **SSR/SSG architecture** -- All public pages are server-rendered, ensuring search engines receive complete HTML
2. **robots.txt** -- Comprehensive rules covering all crawlers including AI bots
3. **Security headers** -- Industry-leading configuration with HSTS preload, full CSP, frame protection
4. **Sitemap** -- Dynamic generation with real lastModified dates
5. **IndexNow** -- Proactive crawl notification for Bing/Yandex
6. **Structured data** -- Organization, WebSite, BreadcrumbList, CollectionPage schemas
7. **Programmatic SEO** -- Industry and feature landing pages with unique metadata
8. **Middleware** -- Correctly allows public pages through without auth
9. **Spanish-language SEO** -- Proper `lang="es"`, `locale: "es_ES"`, Spanish keywords
10. **OpenGraph/Twitter metadata** -- Well-configured on all major pages
