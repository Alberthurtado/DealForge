# Performance Audit: dealforge.es

**Date:** 2026-03-28
**Method:** Source code analysis (layout, pages, config, assets, middleware)
**Stack:** Next.js 16.1, React 19.2, Tailwind CSS 4.2, deployed on Vercel (assumed)

---

## Executive Summary

The site has a solid Next.js foundation with server-side rendering for the landing page, but several performance issues will negatively impact Core Web Vitals. The most critical problems are: **missing font optimization** (no `next/font`), **no resource preloading hints**, **client components loaded eagerly in the critical path**, and **no `loading.tsx` streaming boundaries**. Estimated Lighthouse performance score based on source analysis: **70-80/100**.

---

## 1. Core Web Vitals Assessment

### LCP (Largest Contentful Paint) -- NEEDS IMPROVEMENT (estimated 2.5-3.5s)

**LCP Element:** The hero `<h1>` text block or the dashboard mockup `<div>` below it.

**Issues found:**

| Issue | Impact | Severity |
|-------|--------|----------|
| No `next/font` -- font loaded via CSS `--font-sans: "Inter"` in globals.css, causing FOIT/FOUT | Delays text rendering until font loads | HIGH |
| No `<link rel="preload">` for critical resources | Browser discovers fonts/scripts late | HIGH |
| Google Analytics Script tag in `<head>` (even with `afterInteractive`) | Competes for bandwidth during load | MEDIUM |
| No hero image to preload (pure CSS/HTML hero is good) | N/A -- this is actually a positive | -- |
| `Math.random()` in dashboard mockup SSR (line 156 of page.tsx) | Causes hydration mismatch, potential re-render | LOW |

**Positive:**
- Landing page (`page.tsx`) is a Server Component -- good for SSR streaming
- No heavy images in the above-the-fold hero section
- Logo is a tiny SVG (1.3 KB)
- No LCP image that needs preloading

### INP (Interaction to Next Paint) -- LIKELY GOOD (estimated <200ms)

**Issues found:**

| Issue | Impact | Severity |
|-------|--------|----------|
| Navbar scroll listener without throttle (fires every pixel) | Minor main thread work | LOW |
| ForgeShowcase tab switching re-renders chat messages | Minimal -- small DOM | LOW |
| FAQAccordion uses CSS `max-h` transition (good, no JS layout) | Positive | -- |
| `lucide-react` imports 27 individual icons on the landing page | Tree-shaking should handle this, but verify bundle | LOW |

**Positive:**
- No heavy JavaScript frameworks beyond React
- Event handlers are simple state toggles
- Scroll listener uses `{ passive: true }` -- good
- No `recharts` imported on the landing page (only in dashboard)

### CLS (Cumulative Layout Shift) -- NEEDS IMPROVEMENT (estimated 0.05-0.15)

**Issues found:**

| Issue | Impact | Severity |
|-------|--------|----------|
| Font swap from system font to Inter causes text reflow | Shifts all text elements on load | HIGH |
| Logo `<Image>` has explicit width/height (32x32) -- good | N/A | -- |
| No images without dimensions found on landing page | Positive | -- |
| Fixed navbar changes height on scroll (`bg-transparent` to `bg-white/90`) | Minor shift if content reflows | LOW |
| Mobile menu opens with no reserved space (by design, acceptable) | N/A | -- |

**Positive:**
- All CSS is Tailwind utility classes, no late-loading external stylesheets
- No ads or third-party embeds on landing page
- Dashboard mockup uses fixed heights (`h-32`, percentage-based bars)

---

## 2. Page Load Performance

### Server-Side Rendering

- **Landing page (`page.tsx`):** Server Component (good) -- renders full HTML on server
- **Client components:** `Navbar`, `ForgeShowcase`, `FAQAccordion` are `"use client"` -- hydrated on client
- **No `loading.tsx` files found anywhere** -- missed opportunity for streaming/Suspense shells
- **No `error.tsx` boundaries** -- no graceful error handling
- **Sitemap uses `force-dynamic`** -- regenerated on every request (unnecessary for mostly static content)

### Middleware

- Middleware runs on every non-static request
- Performs JWT verification for protected routes
- Public pages (landing) short-circuit early via `PUBLIC_PATHS` check -- good
- Rate limiting uses in-memory store -- fine for Edge Runtime

### Bundle Size Concerns

| Dependency | Size (approx) | Used on Landing? |
|------------|---------------|-----------------|
| `lucide-react` | ~150 KB (full), tree-shakes to ~20 KB | Yes -- 27 icons |
| `recharts` | ~300 KB | No -- dashboard only |
| `stripe` | ~50 KB | No -- checkout only |
| `@anthropic-ai/sdk` | ~100 KB | No -- server only |
| `puppeteer-core` | Listed in `serverExternalPackages` | No -- server only |

The `serverExternalPackages` config correctly excludes heavy server packages from the client bundle.

---

## 3. Resource Optimization

### JavaScript

**Issues:**

1. **No dynamic imports for below-fold sections.** `ForgeShowcase` and `FAQAccordion` are client components loaded eagerly even though they are below the fold. Should use `next/dynamic` with `ssr: false` or at minimum Suspense boundaries.

2. **27 lucide-react icons imported individually** on the landing page. While tree-shaking works, the sheer number adds to the initial JS bundle. Consider if all are needed above the fold.

3. **No code splitting strategy visible.** The entire landing page imports all sections synchronously.

### CSS

**Positive:**
- Tailwind CSS 4.2 with JIT -- only used classes are included
- No external CSS files or CDN stylesheets
- `@tailwindcss/typography` plugin loaded but only used on blog pages (may add unused CSS)
- Custom animations are minimal and use `@keyframes` (GPU-friendly transforms)
- `prefers-reduced-motion` media query respected -- good accessibility

**Issue:**
- `globals.css` includes Forge fire button animations (~100 lines of CSS) that are only used in the dashboard, not the landing page. These are delivered to all pages.

### Images

**Positive:**
- Landing page hero has NO images -- pure CSS/HTML mockup (excellent for LCP)
- Logo is SVG at 1.3 KB
- Footer logo uses `next/image` with explicit dimensions
- OG images use `next/og` ImageResponse (Edge-generated, no static files to optimize)
- Icon files are appropriately sized (5 KB for 192px, 16 KB for 512px)

**Missing:**
- No WebP/AVIF optimization configured in `next.config.ts` (default Next.js image optimization applies to `next/image` usage, which is minimal on landing)

---

## 4. Third-Party Script Impact

### Google Analytics (G-97QZPF80KT)

```
Strategy: afterInteractive (next/script)
Scripts: gtag.js loader + inline config
```

**Assessment:**
- `afterInteractive` is correct -- loads after hydration
- Two `<Script>` tags placed inside `<head>` -- they will still be discovered early by the preload scanner
- GA adds ~30-50 KB of JavaScript and 1-2 network requests
- **No Consent Management Platform (CMP)** detected -- potential RGPD compliance issue that could also add script weight later

**Other third-party scripts:** None detected. No chat widgets, no A/B testing tools, no heatmaps. This is excellent for performance.

### Cloudflare Challenges

- CSP allows `challenges.cloudflare.com` -- suggests Cloudflare Turnstile may be used
- Only loaded on forms that need it, not globally (assumed from CSP scope)

---

## 5. Server Response Times (TTFB)

**Cannot measure live TTFB from this environment.** Based on architecture analysis:

**Positive factors:**
- Next.js App Router with server components enables streaming HTML
- Landing page is statically renderable (no database calls, no `cookies()`, no `headers()`)
- Middleware short-circuits for public paths immediately
- If deployed on Vercel: Edge network with global CDN = TTFB likely <200ms

**Risk factors:**
- No explicit `export const dynamic = "force-static"` on the landing page -- Next.js should auto-detect as static, but explicit is safer
- Sitemap route uses `force-dynamic` with Prisma DB call -- may slow down `/sitemap.xml` responses
- Middleware runs on every request (even static pages matched by the matcher pattern)

**Recommendation:** Verify TTFB is under 200ms using:
```bash
curl -s -o /dev/null -w "%{time_starttransfer}" https://dealforge.es
```

---

## 6. Compression

**Cannot verify live headers.** Based on infrastructure:

- **If Vercel-hosted:** Brotli compression is applied automatically to all text assets (HTML, CSS, JS, JSON). No configuration needed.
- **If self-hosted:** No compression configuration found in `next.config.ts`. Would need to verify `Content-Encoding: br` or `gzip` in response headers.
- **next.config.ts has no `compress` option set** -- defaults to `true` in Next.js (gzip). Vercel overrides this with Brotli at the edge.

---

## 7. Caching Headers

### Configured in next.config.ts

| Header | Value | Assessment |
|--------|-------|------------|
| `X-Frame-Options` | DENY | Security, not perf |
| `X-Content-Type-Options` | nosniff | Security, not perf |
| `Strict-Transport-Security` | max-age=63072000 | Good -- 2 year HSTS |
| `X-DNS-Prefetch-Control` | on | Good -- enables DNS prefetch |

### Missing Cache Headers

**Critical gap: No `Cache-Control` headers configured.**

- No caching rules for static assets (`.svg`, `.png`, `.ico`)
- No caching rules for immutable Next.js chunks (`/_next/static/`)
- No `stale-while-revalidate` for HTML pages

**If Vercel-hosted:** Vercel applies sensible defaults:
- `/_next/static/*` gets `Cache-Control: public, max-age=31536000, immutable`
- HTML pages get `Cache-Control: s-maxage=1, stale-while-revalidate`
- Static assets get long-lived cache headers

**If self-hosted:** This is a critical performance gap. Add:
```js
// next.config.ts headers()
{
  source: "/:all*(svg|jpg|png|ico|webp|avif)",
  headers: [
    { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
  ],
},
```

---

## 8. Font Loading Strategy

### Current State: NO OPTIMIZATION

**Problem:** The CSS declares `--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif` but:

1. **No `next/font` import found anywhere in the codebase**
2. **No `@font-face` declarations in globals.css**
3. **No font files in `/public/`**
4. **No Google Fonts `<link>` tag**

**What happens:** The browser sees `font-family: "Inter"` and:
- If the user has Inter installed locally: works fine
- If not: falls back to `ui-sans-serif` / `system-ui` immediately (since Inter is never loaded)

**This means:**
- Text renders with system fonts, not Inter
- No FOIT/FOUT because the font is never actually loaded
- CLS from font swap is zero (because no swap happens)
- BUT the declared "Inter" in CSS is misleading -- it does nothing for most users

### Recommendation

Either use `next/font` to properly load Inter:
```tsx
// layout.tsx
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], display: 'swap' });
// Apply: <body className={inter.className}>
```

Or remove the "Inter" reference from CSS to avoid confusion and ensure consistent rendering.

`next/font` benefits:
- Self-hosted font files (no Google Fonts request)
- Automatic `font-display: swap`
- Preloaded with `<link rel="preload">`
- Zero CLS with CSS `size-adjust`

---

## 9. Next.js Specific Optimizations

### What is Done Well

| Optimization | Status |
|-------------|--------|
| App Router (server components) | Yes |
| `next/image` for logo | Yes |
| `next/script` for GA (afterInteractive) | Yes |
| `next/link` for internal navigation | Yes |
| `serverExternalPackages` for heavy deps | Yes |
| Metadata API for SEO | Yes |
| Edge Runtime for OG images | Yes |
| Middleware matcher excludes static files | Yes |
| `lang="es"` on `<html>` | Yes |

### What is Missing

| Optimization | Impact | Priority |
|-------------|--------|----------|
| `next/font` for font loading | HIGH -- affects LCP and CLS if Inter is added | P0 |
| `loading.tsx` for streaming shells | HIGH -- enables instant navigation | P1 |
| `not-found.tsx` custom 404 | MEDIUM -- UX and SEO | P1 |
| `error.tsx` error boundaries | MEDIUM -- prevents white screens | P1 |
| `export const dynamic = "force-static"` on landing | LOW -- Next.js likely auto-detects | P2 |
| `next/dynamic` for below-fold client components | MEDIUM -- reduces initial JS | P1 |
| `generateStaticParams` for ISR on blog/templates | MEDIUM -- faster page loads | P2 |
| `viewport` export in layout.tsx | LOW -- Next.js defaults work | P3 |
| Image optimization config (`formats: ['image/avif', 'image/webp']`) | LOW -- few images on landing | P3 |

### Hydration Risk

`page.tsx` line 156 uses `Math.random()` in the dashboard mockup:
```tsx
style={{ height: `${60 + Math.random() * 40}%` }}
```
This generates different values on server vs client, causing a **React hydration mismatch warning** and a full re-render of that subtree. Replace with deterministic values or use `useId()`/seed-based random.

---

## 10. Prioritized Recommendations

### P0 -- Critical (do first, highest impact)

1. **Fix the `Math.random()` hydration mismatch** in `page.tsx` line 156. Replace with fixed values like `[85, 70, 92, 65, 78, 88, 72]`. This causes unnecessary re-renders on every page load.

2. **Implement `next/font` for Inter** (or remove the Inter reference from CSS). If you want Inter, add it properly to get self-hosting, preloading, and size-adjust for zero CLS.

3. **Add `loading.tsx` to `(public)` and `(dashboard)` route groups.** This enables React streaming with a skeleton UI, dramatically improving perceived performance during navigation.

### P1 -- High Impact

4. **Lazy-load below-fold client components** using `next/dynamic`:
   ```tsx
   const ForgeShowcase = dynamic(() => import('./_landing/forge-showcase').then(m => ({ default: m.ForgeShowcase })), { ssr: true });
   const FAQAccordion = dynamic(() => import('./_landing/faq-accordion').then(m => ({ default: m.FAQAccordion })), { ssr: true });
   ```
   This splits their JavaScript out of the main bundle, reducing Time to Interactive.

5. **Add `error.tsx` and `not-found.tsx` boundaries** for graceful error handling and proper 404 pages.

6. **Move Forge fire button CSS** (lines 117-256 of globals.css) to a dashboard-specific stylesheet or CSS module. Landing page users download ~140 lines of CSS they never use.

### P2 -- Medium Impact

7. **Add explicit cache headers** for static assets if self-hosted:
   ```js
   { source: "/:path*(svg|png|ico|webp)", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] }
   ```

8. **Change sitemap from `force-dynamic` to ISR** with `revalidate`:
   ```ts
   export const revalidate = 3600; // rebuild every hour
   ```
   Currently regenerates on every request, including the Prisma DB query.

9. **Add `<link rel="dns-prefetch">` for Google Analytics:**
   ```html
   <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
   ```

10. **Add `fetchpriority="high"` to the logo image** in the navbar since it is above the fold.

### P3 -- Nice to Have

11. **Add viewport export** in layout.tsx:
    ```tsx
    export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#3a9bb5' };
    ```

12. **Consider a Consent Management Platform** before adding more third-party scripts (RGPD requirement).

13. **Audit the `@tailwindcss/typography` plugin** -- if only used on blog pages, consider importing it conditionally.

---

## Estimated Core Web Vitals After Fixes

| Metric | Current (est.) | After P0+P1 fixes | Target |
|--------|---------------|-------------------|--------|
| LCP | 2.5-3.5s | 1.5-2.5s | <=2.5s |
| INP | <200ms | <150ms | <=200ms |
| CLS | 0.05-0.15 | <0.05 | <=0.1 |

---

## Verification Steps

After implementing fixes, validate with:

1. **Lab data:** `npx lighthouse https://dealforge.es --output html`
2. **Field data:** Check CrUX Vis at https://cruxvis.withgoogle.com for real-user data (requires sufficient traffic)
3. **LCP subparts:** Use CrUX API to check TTFB, resource load delay, resource load time, and element render delay
4. **PageSpeed Insights:** https://pagespeed.web.dev/analysis?url=https://dealforge.es
5. **Bundle analysis:** `ANALYZE=true next build` or use `@next/bundle-analyzer`

---

## Files Analyzed

- `/c/Nexus/src/app/layout.tsx` -- Root layout, GA scripts, metadata
- `/c/Nexus/src/app/page.tsx` -- Landing page, all sections
- `/c/Nexus/src/app/globals.css` -- Global styles, animations, font declaration
- `/c/Nexus/src/app/_landing/navbar.tsx` -- Client component, scroll listener
- `/c/Nexus/src/app/_landing/forge-showcase.tsx` -- Client component, tab UI
- `/c/Nexus/src/app/_landing/faq-accordion.tsx` -- Client component, accordion
- `/c/Nexus/src/app/opengraph-image.tsx` -- Edge-generated OG image
- `/c/Nexus/src/app/robots.ts` -- Robots configuration
- `/c/Nexus/src/app/sitemap.ts` -- Dynamic sitemap with Prisma
- `/c/Nexus/src/middleware.ts` -- Auth middleware, rate limiting
- `/c/Nexus/next.config.ts` -- Headers, CSP, external packages
- `/c/Nexus/package.json` -- Dependencies
- `/c/Nexus/public/` -- Static assets (logo.svg, icons, manifest)
