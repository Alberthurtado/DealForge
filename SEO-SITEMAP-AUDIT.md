# Sitemap Audit Report -- dealforge.es

**Date:** 2026-03-18
**Source analyzed:** `src/app/sitemap.ts` (dynamic, force-dynamic), `src/app/robots.ts`
**Sitemap URL:** https://dealforge.es/sitemap.xml
**Robots.txt URL:** https://dealforge.es/robots.txt

---

## 1. Robots.txt Validation

| Check | Result |
|-------|--------|
| Sitemap declared | PASS -- `Sitemap: https://dealforge.es/sitemap.xml` |
| Correct sitemap URL | PASS -- matches the Next.js route |
| Dashboard pages disallowed | PASS -- `/panel/`, `/clientes/`, `/cotizaciones/`, etc. |
| API routes disallowed | PASS -- `/api/` blocked for all agents |
| `/reset-password` disallowed | PASS -- blocked for generic user-agent |
| `/firmar/` disallowed | FAIL -- not blocked; token URLs are crawlable |
| `/aprobar/` disallowed | FAIL -- not blocked; token URLs are crawlable |
| `/checkout/` disallowed | FAIL -- `/checkout/exito` and `/checkout/cancelado` are not blocked |
| `/recuperar` disallowed | FAIL -- password recovery page is crawlable |

### Robots.txt Issues

1. **HIGH -- `/firmar/` and `/aprobar/` not disallowed.** These are token-based signature/approval pages. If any links leak (email clients, referrer headers), Googlebot could attempt to crawl them. Add `Disallow: /firmar/` and `Disallow: /aprobar/` for all user agents.

2. **MEDIUM -- `/checkout/` not disallowed.** Post-payment pages (`/checkout/exito`, `/checkout/cancelado`) serve no SEO purpose and should be blocked.

3. **LOW -- `/recuperar` not disallowed.** Password recovery pages have no indexing value. Currently only `/reset-password` is blocked.

---

## 2. Sitemap XML Format Validation

The sitemap is generated dynamically by Next.js `MetadataRoute.Sitemap`. Next.js produces valid XML automatically, so structural XML validity is not a concern.

| Check | Result |
|-------|--------|
| Valid XML structure | PASS -- Next.js generates compliant XML |
| UTF-8 encoding | PASS -- Next.js default |
| Namespace declaration | PASS -- Next.js includes `xmlns` |
| URL count < 50,000 | PASS -- ~10 static + N blog posts (well under limit) |
| No sitemap index needed | PASS -- single file is sufficient |

---

## 3. URL Inventory -- What the Sitemap Contains

### Static Pages (10 entries)

| URL | lastmod | changeFrequency | priority |
|-----|---------|-----------------|----------|
| `/` | `new Date()` (runtime) | weekly | 1.0 |
| `/login` | `new Date()` (runtime) | monthly | 0.5 |
| `/registro` | `new Date()` (runtime) | monthly | 0.7 |
| `/documentacion` | `new Date()` (runtime) | weekly | 0.8 |
| `/changelog` | `new Date()` (runtime) | weekly | 0.6 |
| `/privacidad` | 2026-03-09 | yearly | 0.3 |
| `/terminos` | 2026-03-09 | yearly | 0.3 |
| `/rgpd` | 2026-03-09 | yearly | 0.3 |
| `/blog` | `new Date()` (runtime) | daily | 0.9 |
| `/guia` | `new Date()` (runtime) | weekly | 0.9 |

### Dynamic Pages

| URL Pattern | lastmod | changeFrequency | priority |
|-------------|---------|-----------------|----------|
| `/blog/[slug]` | `post.updatedAt` (from DB) | monthly | 0.7 |

---

## 4. Deprecated Tag Analysis

### `priority` -- INFO: Can Remove

Google, Bing, and Yandex all ignore the `priority` tag. It has never influenced crawl behavior. Every static page in this sitemap sets a priority value. These can be safely removed to reduce payload size and avoid false confidence in their effect.

**Recommendation:** Remove all `priority` values from `sitemap.ts`.

### `changeFrequency` -- INFO: Can Remove

Google has confirmed it ignores `changefreq`. Every entry in this sitemap sets a `changeFrequency` value. These add no SEO value.

**Recommendation:** Remove all `changeFrequency` values from `sitemap.ts`.

---

## 5. `lastmod` Date Analysis

| Check | Result |
|-------|--------|
| Legal pages (privacidad, terminos, rgpd) | PASS -- hardcoded `2026-03-09`, appears accurate |
| Blog posts | PASS -- uses `post.updatedAt` from database (real dates) |
| Homepage, login, registro, docs, changelog, blog index, guia | FAIL -- uses `new Date()` |

### Critical Issue: `new Date()` as lastmod

Seven pages use `new Date()`, which means **every time the sitemap is requested, these pages report today's date as their last modification**. This is equivalent to having no `lastmod` at all -- it tells Google the page changes on every request, which:

- Erodes trust in all `lastmod` values across the sitemap
- Wastes crawl budget (Google may re-crawl unchanged pages)
- Defeats the purpose of `lastmod` (signaling actual content changes)

Since the sitemap is `force-dynamic`, every request generates fresh timestamps.

**Recommendation:** Replace `new Date()` with actual last-modified dates. Options:
1. Hardcode dates and update them when content actually changes
2. Use git commit dates via a build-time script
3. At minimum, use a fixed build-time date rather than runtime `new Date()`

---

## 6. Missing Pages Analysis

### Pages That Exist in App Router but Are NOT in Sitemap

| Page | Should Be in Sitemap? | Verdict |
|------|----------------------|---------|
| `/firmar/[token]` | NO -- private token URLs | CORRECT -- not included |
| `/aprobar/[token]` | NO -- private token URLs | CORRECT -- not included |
| `/panel` | NO -- authenticated dashboard | CORRECT -- not included |
| `/clientes`, `/clientes/[id]`, etc. | NO -- authenticated | CORRECT -- not included |
| `/cotizaciones`, `/cotizaciones/nueva`, etc. | NO -- authenticated | CORRECT -- not included |
| `/productos`, `/productos/nuevo`, etc. | NO -- authenticated | CORRECT -- not included |
| `/reportes` | NO -- authenticated | CORRECT -- not included |
| `/reglas` | NO -- authenticated | CORRECT -- not included |
| `/configuracion` | NO -- authenticated | CORRECT -- not included |
| `/integraciones` | NO -- authenticated | CORRECT -- not included |
| `/checkout/exito` | NO -- post-payment transient page | CORRECT -- not included |
| `/checkout/cancelado` | NO -- post-payment transient page | CORRECT -- not included |
| `/reset-password` | NO -- password reset flow | CORRECT -- not included |
| `/recuperar` | Debatable | See below |

### Verdict on `/recuperar`

The `/recuperar` (password recovery) page is a utility page with no SEO value. It is correctly excluded from the sitemap. However, it should also be blocked in `robots.txt` alongside `/reset-password`.

### No Missing Public Pages

All known public-facing pages are included in the sitemap. No gaps found.

---

## 7. Pages That Should NOT Be in Sitemap

| Check | Result |
|-------|--------|
| `/firmar/[token]` excluded | PASS |
| `/aprobar/[token]` excluded | PASS |
| `/login` included | WARNING -- see below |

### Warning: `/login` in Sitemap

The `/login` page is included with `priority: 0.5`. Login pages are generally low-value for SEO. While not harmful, it provides no search ranking benefit. Google will discover it through internal links regardless.

**Recommendation:** Consider removing `/login` from the sitemap. Keep `/registro` since signup pages can have SEO value for branded queries.

---

## 8. Sitemap vs Crawlable Pages Comparison

### Pages in Sitemap That Might Return Non-200 Status

Since the sitemap is generated from a hardcoded list (not from actual route validation), there is a risk of stale entries if pages are removed. Current risk is low given the small number of static pages.

| Check | Result |
|-------|--------|
| Static page routes exist in app router | PASS -- all 10 static URLs map to real `page.tsx` files |
| Blog post slugs validated | PASS -- queried from DB with `publicado: true` filter |
| No orphaned URLs | PASS |

### Crawl Gaps (pages a crawler would find but sitemap omits)

No public pages are missing from the sitemap. All authenticated pages are correctly excluded.

---

## 9. Location Page Quality Gate

| Check | Result |
|-------|--------|
| Location pages detected | NONE |
| Quality gate triggered | N/A |

No location-based pages exist. No doorway page risk.

---

## 10. Summary of Findings

### Critical (fix immediately)

| # | Issue | File | Line(s) |
|---|-------|------|---------|
| 1 | Seven pages use `new Date()` for lastmod, making all lastmod values untrustworthy | `src/app/sitemap.ts` | 13, 19, 24, 31, 37, 62, 67 |

### High Priority

| # | Issue | File |
|---|-------|------|
| 2 | `/firmar/` and `/aprobar/` not blocked in robots.txt -- token URLs could be crawled | `src/app/robots.ts` |
| 3 | `/checkout/` paths not blocked in robots.txt | `src/app/robots.ts` |

### Low Priority / Informational

| # | Issue | File |
|---|-------|------|
| 4 | `priority` tags used on all entries -- ignored by all major search engines | `src/app/sitemap.ts` |
| 5 | `changeFrequency` tags used on all entries -- ignored by Google | `src/app/sitemap.ts` |
| 6 | `/login` included in sitemap (low SEO value) | `src/app/sitemap.ts` |
| 7 | `/recuperar` not blocked in robots.txt | `src/app/robots.ts` |

---

## 11. Recommended Fixes

### Fix 1: Replace `new Date()` with real lastmod dates

```typescript
// Instead of:
lastModified: new Date(),

// Use hardcoded dates updated when content changes:
lastModified: new Date("2026-03-15"),

// Or remove lastmod for pages without a meaningful date
```

### Fix 2: Add disallow rules to robots.ts

```typescript
disallow: [
  "/panel/",
  "/clientes/",
  "/cotizaciones/",
  "/productos/",
  "/reportes/",
  "/reglas/",
  "/integraciones/",
  "/configuracion/",
  "/api/",
  "/reset-password",
  "/recuperar",       // ADD
  "/firmar/",         // ADD
  "/aprobar/",        // ADD
  "/checkout/",       // ADD
],
```

### Fix 3: Remove deprecated tags (optional cleanup)

```typescript
// Simplified sitemap entry:
{
  url: `${baseUrl}/blog`,
  lastModified: new Date("2026-03-18"),
}
// No priority, no changeFrequency needed
```

### Fix 4: Consider removing `/login` from sitemap

Low-value auth pages do not benefit from sitemap inclusion.

---

## 12. Overall Sitemap Health Score

| Category | Score |
|----------|-------|
| XML Validity | 10/10 |
| URL Coverage | 9/10 (no missing public pages) |
| lastmod Accuracy | 3/10 (7 of 10 static entries use fake dates) |
| Deprecated Tags | 5/10 (present but harmless) |
| robots.txt Alignment | 6/10 (token URLs not blocked) |
| **Overall** | **6.5/10** |

The sitemap structure is sound and URL coverage is complete. The two actionable issues are (1) fixing lastmod dates to reflect real modification times and (2) adding disallow rules for token-based and transient pages in robots.txt.
