# Technical SEO Audit: dealforge.es

**Date**: 2026-03-18
**Auditor**: Claude Opus 4.6 (source code analysis)
**Stack**: Next.js 16.1.6, React 19, Vercel, Tailwind CSS 4
**Domain**: https://dealforge.es
**Overall Score**: 62/100

---

## EXECUTIVE SUMMARY

The site has a **"Deceptive pages"** flag in Google Search Console with **zero pages indexed**. This audit identifies the root causes and provides prioritized fixes. The primary issue is almost certainly the combination of unverifiable social-proof statistics on the landing page, potential Safe Browsing triggers from the lead-capture page, and missing canonical/indexability signals on several pages.

---

## CRITICAL ISSUES (Fix Immediately)

### C1. "Deceptive Site" Flag -- Likely Triggers

**Status**: FAIL
**Impact**: Zero indexation; all pages blocked from Google SERPs.

The Google Safe Browsing / Search Console "Deceptive pages" manual action is most likely triggered by one or more of the following found in the codebase:

1. **Fabricated social proof statistics on the landing page** (`src/app/page.tsx`, lines 176-178):
   ```tsx
   { value: "500+", label: "Cotizaciones creadas" },
   { value: "95%", label: "Menos tiempo" },
   { value: "3x", label: "Mas conversiones" },
   ```
   These statistics appear to be invented (the site is brand new, launched March 2026). Google's quality raters flag pages with unverifiable or misleading claims, especially on commercial pages. "500+ cotizaciones creadas" implies real user traction that does not exist.

2. **Lead magnet gate without clear value delivery** (`src/app/(public)/guia/page.tsx`): The guide download page collects name, email, and company before delivering a PDF. If the PDF content is thin or the page appears to exist primarily to collect email addresses, reviewers may flag it as deceptive.

3. **Unverifiable claims on the guide page** (lines 241-251):
   - "80% menos tiempo creando cotizaciones"
   - "3x mas deals cerrados con seguimiento"
   These are stated as facts with no source attribution.

4. **`Math.random()` in SSR output** (`src/app/page.tsx`, line 151): The homepage dashboard mockup uses `Math.random()` in a Server Component, causing the chart bar heights to change on every render. Googlebot sees different HTML on every crawl, which can trigger cloaking detection heuristics.

**Recommendations**:
- Remove or replace fabricated statistics with verifiable data (e.g., "Empieza en minutos" instead of "500+ cotizaciones creadas").
- Replace `Math.random()` with deterministic values in the dashboard mockup.
- Add source attribution to any quantitative claims, or rewrite as aspirational language (e.g., "hasta 80% mas rapido").
- After fixing, submit a reconsideration request via Google Search Console.

---

### C2. Missing Canonical Tags on Key Pages

**Status**: FAIL

Pages with canonical tags defined:
- `/` (root layout) -- `https://dealforge.es`
- `/blog` -- `https://dealforge.es/blog`
- `/blog/[slug]` -- dynamic canonical per post
- `/login` -- `https://dealforge.es/login`
- `/registro` -- `https://dealforge.es/registro`
- `/guia` -- `https://dealforge.es/guia`

**Pages MISSING canonical tags**:
- `/documentacion` -- NO canonical
- `/changelog` -- NO canonical
- `/privacidad` -- NO canonical
- `/terminos` -- NO canonical
- `/rgpd` -- NO canonical

**Impact**: Without explicit canonicals, Google may treat these pages as duplicates of each other or of the root URL, especially since the root layout sets a global canonical to `https://dealforge.es`. This means ALL legal/docs pages may inherit the homepage canonical, effectively telling Google they are all duplicates of the homepage.

**Fix**: Add `alternates.canonical` to the metadata export in each of these page files:
- `src/app/(legal)/documentacion/page.tsx` -- canonical: `https://dealforge.es/documentacion`
- `src/app/(legal)/changelog/page.tsx` -- canonical: `https://dealforge.es/changelog`
- `src/app/(legal)/privacidad/page.tsx` -- canonical: `https://dealforge.es/privacidad`
- `src/app/(legal)/terminos/page.tsx` -- canonical: `https://dealforge.es/terminos`
- `src/app/(legal)/rgpd/page.tsx` -- canonical: `https://dealforge.es/rgpd`

---

### C3. Sitemap Includes Login Page (noindex Conflict)

**Status**: FAIL

The sitemap (`src/app/sitemap.ts`, line 18-22) includes `/login` with `priority: 0.5`, but the login page has `robots: { index: false }` (see `src/app/(auth)/login/layout.tsx`, line 7).

Including a noindex page in the sitemap sends conflicting signals to Google and wastes crawl budget. Google may also view this as an attempt to manipulate indexation.

**Fix**: Remove `/login` from the sitemap.

---

## HIGH PRIORITY ISSUES

### H1. Sitemap Uses `force-dynamic` -- Unreliable lastModified

**Status**: WARNING

`src/app/sitemap.ts` uses `export const dynamic = "force-dynamic"` and sets `lastModified: new Date()` for most pages. This means every time Googlebot fetches the sitemap, all pages appear "just modified." This degrades the trust signal of `<lastmod>` and can waste crawl budget as Google re-crawls pages that have not actually changed.

**Fix**: Use actual last-modified dates or fixed dates. Remove `force-dynamic` and use ISR with a `revalidate` period instead.

---

### H2. Missing OpenGraph Images

**Status**: FAIL

- The root homepage has no `og:image` defined (neither in root layout metadata nor in `page.tsx` metadata).
- The guide page references `https://dealforge.es/og-guia.png` but this file does NOT exist in `public/`. The file is not in the `public/` directory.
- No root-level `opengraph-image.tsx` or `opengraph-image.png` exists in `src/app/`.
- Only `src/app/(public)/blog/opengraph-image.tsx` exists (for blog pages).

**Impact**: Social shares show no image preview. Google Discover requires OG images. Missing images reduce CTR.

**Fix**:
- Create `src/app/opengraph-image.tsx` (or add a static `public/og-image.png`) for the homepage.
- Create `public/og-guia.png` or update the guide page metadata to reference a valid image.

---

### H3. Security Headers -- Good but CSP has `unsafe-eval`

**Status**: PASS with caveat

The `next.config.ts` sets excellent security headers:
- HSTS with preload (2 years) -- PASS
- X-Frame-Options: DENY -- PASS
- X-Content-Type-Options: nosniff -- PASS
- Referrer-Policy: strict-origin-when-cross-origin -- PASS
- Permissions-Policy restrictive -- PASS
- CSP present -- PASS (with caveat)

**Caveat**: The CSP includes `'unsafe-eval'` in `script-src`. This is common with Next.js in development but should be investigated for production. If it can be removed, do so.

---

### H4. Blog Content Rendered via `dangerouslySetInnerHTML`

**Status**: WARNING

`src/app/(public)/blog/[slug]/page.tsx`, line 244:
```tsx
dangerouslySetInnerHTML={{ __html: post.contenido }}
```

Blog post content is rendered as raw HTML from the database. If any blog post contains malicious content, scripts, or hidden SEO spam, it could trigger the "Deceptive pages" flag for the entire domain.

**Fix**: Sanitize blog content server-side before rendering. Use a library like `sanitize-html` or DOMPurify. The site already has `src/lib/sanitize.ts` -- verify it is used for blog content insertion.

---

## MEDIUM PRIORITY ISSUES

### M1. Missing Viewport Meta Tag in Source

**Status**: LIKELY PASS

No explicit `<meta name="viewport">` was found in any source file. However, Next.js 14+ automatically injects a default viewport meta tag. Verify in production that `<meta name="viewport" content="width=device-width, initial-scale=1">` is present in the rendered HTML.

---

### M2. `force-dynamic` on Blog Pages

**Status**: WARNING

Both `src/app/(public)/blog/page.tsx` and `src/app/(public)/blog/[slug]/page.tsx` use `export const dynamic = "force-dynamic"`. This means:
- Every page view triggers a database query.
- Googlebot sees a fresh render every time (no caching).
- TTFB is higher than necessary.

**Fix**: Use ISR (`export const revalidate = 3600`) instead of `force-dynamic` for blog pages. Blog content does not change on every request.

---

### M3. Blog Images Use `<img>` Instead of `next/image`

**Status**: WARNING

In `src/app/(public)/blog/page.tsx` (line 169) and `[slug]/page.tsx` (line 237), blog post images use raw `<img>` tags instead of Next.js `<Image>`. This means:
- No automatic WebP/AVIF conversion
- No lazy loading optimization
- No responsive srcset
- Larger LCP times on image-heavy blog posts

**Fix**: Use `next/image` with `fill` or explicit dimensions for blog images.

---

### M4. No `<h1>` in Legal Pages Layout

**Status**: PASS (individual pages have `<h1>`)

Each legal page (privacidad, terminos, rgpd, documentacion, changelog) has its own `<h1>`. The legal layout is a wrapper only. No issue here.

---

### M5. Homepage Uses Client Components for Above-the-Fold Content

**Status**: WARNING

The Navbar (`src/app/_landing/navbar.tsx`) is a `"use client"` component that is the first thing rendered above the fold. While the homepage itself is a Server Component, the Navbar requires client-side JavaScript to render properly (scroll listener, mobile menu toggle).

The ForgeShowcase and FAQAccordion are also `"use client"` components, but they are below the fold and less impactful.

**Impact**: Minimal for LCP since the hero section is server-rendered. The Navbar may flash or shift on load (potential CLS issue).

---

## LOW PRIORITY ISSUES

### L1. Login Page Has Canonical but Is noindex

**Status**: INFO

`/login` has both `canonical: "https://dealforge.es/login"` and `robots: { index: false }`. The canonical is redundant since the page is noindex. Not harmful, just unnecessary.

---

### L2. Structured Data on Homepage -- Multiple JSON-LD Blocks

**Status**: PASS

The homepage correctly includes:
- Organization (root layout)
- WebSite with SearchAction (root layout)
- SoftwareApplication with Offers (page.tsx)
- HowTo (page.tsx)
- FAQPage (faq-accordion.tsx)

All are well-structured. One minor note: the SearchAction target `https://dealforge.es/blog?q={search_term_string}` should actually work -- verify that the blog page handles a `q` query parameter, or remove the SearchAction.

---

### L3. Web Manifest Missing `id` Field

**Status**: INFO

`public/site.webmanifest` lacks the `id` field recommended for PWA identification. Not critical for SEO.

---

### L4. `llms.txt` and `llms-full.txt` Present

**Status**: PASS

Good practice for AI crawler discoverability. The `llms.txt` file provides structured context about the site.

---

### L5. robots.txt Allows All Crawlers on `/`

**Status**: PASS

The robots.ts file is well-structured:
- Default user-agent allows `/`, blocks dashboard/API routes.
- Specific rules for Googlebot, Bingbot.
- AI crawler rules for GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended.
- Sitemap reference present.

No issues found.

---

## CATEGORY SCORES

| Category | Score | Status |
|---|---|---|
| 1. Crawlability | 70/100 | Sitemap conflict (login noindex), force-dynamic |
| 2. Indexability | 40/100 | Zero indexation, missing canonicals on 5 pages, "Deceptive" flag |
| 3. Security | 90/100 | Excellent headers, minor CSP `unsafe-eval` |
| 4. URL Structure | 95/100 | Clean URLs, no redirect chains in code |
| 5. Mobile | 85/100 | Responsive Tailwind, `html lang="es"`, no explicit viewport (auto) |
| 6. Core Web Vitals | 70/100 | Math.random CLS risk, client Navbar, raw `<img>` in blog |
| 7. Structured Data | 90/100 | Rich JSON-LD (Organization, WebSite, SoftwareApplication, HowTo, FAQPage, Article, BreadcrumbList) |
| 8. JavaScript Rendering | 80/100 | SSR via Next.js, only interactive components are client |

---

## PRIORITIZED ACTION PLAN

### Phase 1: Lift the "Deceptive Pages" Flag (Do This Week)

1. **Remove fabricated statistics** from the homepage (`src/app/page.tsx`, lines 174-185). Replace with generic value propositions or remove the stats section entirely until you have real data.

2. **Replace `Math.random()` on line 151** with fixed values (e.g., `[65, 80, 50, 90, 60, 85, 75]`). This eliminates the cloaking signal.

3. **Rewrite unverifiable claims** on the guide page (`src/app/(public)/guia/page.tsx`, lines 241-251). Change "80% menos tiempo" to "hasta un 80% menos tiempo*" with a footnote, or replace with non-quantitative language.

4. **Verify blog content sanitization**. Ensure `src/lib/sanitize.ts` is used when blog posts are created/updated via the API.

5. **Submit a reconsideration request** in Google Search Console after deploying fixes.

### Phase 2: Fix Indexability (This Week)

6. **Add canonical tags** to all 5 legal/docs pages (documentacion, changelog, privacidad, terminos, rgpd).

7. **Remove `/login` from the sitemap** (`src/app/sitemap.ts`).

8. **Replace `force-dynamic` with ISR** on the sitemap (`revalidate = 3600`) and set real `lastModified` dates.

### Phase 3: Optimize (Next 2 Weeks)

9. **Create OG images**: root `opengraph-image.tsx` and `public/og-guia.png`.

10. **Switch blog pages from `force-dynamic` to ISR** with `revalidate = 3600`.

11. **Replace raw `<img>` tags** in blog pages with `next/image`.

12. **Remove `unsafe-eval` from CSP** if possible in production.

---

## FILES REFERENCED

| File | Relevance |
|---|---|
| `C:\Nexus\src\app\robots.ts` | robots.txt configuration |
| `C:\Nexus\src\app\sitemap.ts` | Sitemap generation (login conflict, force-dynamic) |
| `C:\Nexus\src\app\layout.tsx` | Root metadata, global canonical, structured data |
| `C:\Nexus\src\app\page.tsx` | Homepage -- fabricated stats, Math.random, structured data |
| `C:\Nexus\src\app\(public)\guia\page.tsx` | Lead magnet page -- unverifiable claims |
| `C:\Nexus\src\app\(public)\guia\lead-form.tsx` | Lead form (email gate) |
| `C:\Nexus\src\app\(public)\blog\page.tsx` | Blog index -- force-dynamic, raw img tags |
| `C:\Nexus\src\app\(public)\blog\[slug]\page.tsx` | Blog posts -- dangerouslySetInnerHTML, missing sanitization check |
| `C:\Nexus\src\app\(auth)\login\layout.tsx` | Login noindex (conflicts with sitemap) |
| `C:\Nexus\src\app\(legal)\privacidad\page.tsx` | Missing canonical |
| `C:\Nexus\src\app\(legal)\terminos\page.tsx` | Missing canonical |
| `C:\Nexus\src\app\(legal)\rgpd\page.tsx` | Missing canonical |
| `C:\Nexus\src\app\(legal)\documentacion\page.tsx` | Missing canonical |
| `C:\Nexus\src\app\(legal)\changelog\page.tsx` | Missing canonical |
| `C:\Nexus\next.config.ts` | Security headers, CSP |
| `C:\Nexus\src\middleware.ts` | Auth middleware (public pages pass through correctly) |
| `C:\Nexus\src\app\_landing\navbar.tsx` | Client component above fold |
| `C:\Nexus\src\app\_landing\faq-accordion.tsx` | FAQPage structured data |
| `C:\Nexus\public\site.webmanifest` | PWA manifest |
| `C:\Nexus\public\llms.txt` | AI crawler context file |
| `C:\Nexus\vercel.json` | Cron config only |
