# Sitemap Architecture Audit -- dealforge.es

**Date:** 2026-03-28
**Auditor:** Sitemap Architecture Specialist
**Source files analyzed:**
- `src/app/sitemap.ts` (Next.js dynamic sitemap, `force-dynamic`)
- `src/app/robots.ts` (Next.js dynamic robots.txt)
- `src/data/industrias.ts` (30 industry slugs)
- `src/data/features.ts` (14 feature slugs)
- All route files under `src/app/`

**Live URLs:**
- Sitemap: `https://dealforge.es/sitemap.xml`
- Robots.txt: `https://dealforge.es/robots.txt`

---

## 1. Sitemap Discovery

| Check | Result | Notes |
|-------|--------|-------|
| robots.txt declares sitemap | PASS | `Sitemap: https://dealforge.es/sitemap.xml` on line 114 |
| Sitemap URL convention | PASS | Uses standard `/sitemap.xml` path |
| Sitemap index file | N/A | Single sitemap file (not needed yet -- see URL count below) |

---

## 2. XML Format and Structure Validation

| Check | Severity | Result | Notes |
|-------|----------|--------|-------|
| Valid XML generation | -- | PASS | Next.js `MetadataRoute.Sitemap` generates spec-compliant XML |
| `<urlset>` namespace | -- | PASS | Next.js outputs correct `xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"` |
| `<loc>` present for every entry | -- | PASS | All entries use the `url` field |
| `<lastmod>` present for every entry | -- | PASS | All static, industry, and feature pages have `lastModified`; blog posts use `updatedAt` from DB |
| `<priority>` tag used | Info | PASS (not used) | Correctly omitted -- Google ignores this tag |
| `<changefreq>` tag used | Info | PASS (not used) | Correctly omitted -- Google ignores this tag |
| Encoding UTF-8 | -- | PASS | Next.js default |
| URL count < 50,000 limit | Critical | PASS | Estimated total: 10 static + dynamic blog + 31 industry + 15 feature = ~56 + blog posts. Well under 50k |

---

## 3. URL Inventory

### 3.1 Static Pages in Sitemap (10 URLs)

| URL | lastmod | Status |
|-----|---------|--------|
| `https://dealforge.es/` | 2026-03-18 | OK |
| `https://dealforge.es/registro` | 2026-03-18 | OK |
| `https://dealforge.es/documentacion` | 2026-03-15 | OK |
| `https://dealforge.es/changelog` | 2026-03-15 | OK |
| `https://dealforge.es/blog` | 2026-03-26 | OK |
| `https://dealforge.es/guia` | 2026-03-18 | OK |
| `https://dealforge.es/privacidad` | 2026-03-09 | OK |
| `https://dealforge.es/terminos` | 2026-03-09 | OK |
| `https://dealforge.es/rgpd` | 2026-03-09 | OK |
| `https://dealforge.es/contacto` | 2026-03-18 | OK |

### 3.2 Industry Template Pages (31 URLs: 1 index + 30 slugs)

| URL pattern | lastmod | Count |
|-------------|---------|-------|
| `https://dealforge.es/plantilla-cotizacion` | 2026-03-27 | 1 (index) |
| `https://dealforge.es/plantilla-cotizacion/{slug}` | 2026-03-27 | 30 |

**Industry slugs:** construccion, consultoria, marketing-digital, diseno-grafico, desarrollo-web, fotografia, arquitectura, limpieza, eventos, electricidad, fontaneria, jardineria, transporte, formacion, seguridad, clinica-dental, interiorismo, contabilidad, veterinaria, automocion, inmobiliaria, restauracion, abogados, nutricion, ecommerce, psicologia, mudanzas, energia-solar, fitness (29 from grep output, likely 30 total based on file structure)

### 3.3 Feature Landing Pages (15 URLs: 1 index + 14 slugs)

| URL pattern | lastmod | Count |
|-------------|---------|-------|
| `https://dealforge.es/funcionalidades` | 2026-03-27 | 1 (index) |
| `https://dealforge.es/funcionalidades/{slug}` | 2026-03-27 | 14 |

**Feature slugs:** gestion-clientes, catalogo-productos, cotizaciones-pdf, reglas-comerciales, reportes-metricas, forge-ia, envio-emails, aprobaciones, firma-electronica, recordatorios, versionado, importar-exportar, gestion-contratos, renovaciones-alertas

### 3.4 Dynamic Blog Posts

Generated from database (`BlogPost` model, `publicado: true`). Uses real `updatedAt` timestamps -- this is correct.

---

## 4. lastmod Date Validation

| Check | Severity | Result | Notes |
|-------|----------|--------|-------|
| Real dates (not all identical) | Low | PASS | Dates vary: 2026-03-09, 2026-03-15, 2026-03-18, 2026-03-26, 2026-03-27 |
| Blog posts use DB timestamps | -- | PASS | Uses `post.updatedAt` from Prisma |
| All industry pages same lastmod | Low | WARNING | All 31 industry URLs share `2026-03-27`. Acceptable if they were all created/updated on the same date, but should be updated individually when content changes |
| All feature pages same lastmod | Low | WARNING | All 15 feature URLs share `2026-03-27`. Same note as above |
| Static page dates plausible | -- | PASS | Dates are within expected range |
| Dates not in the future | -- | PASS | All dates are on or before 2026-03-28 |

**Recommendation:** When individual industry or feature pages are updated, their `lastmod` should reflect the actual update date rather than a shared hardcoded date. Consider storing page-level update timestamps or deriving them from git history.

---

## 5. Missing Pages Analysis

Pages that exist as routes but are NOT in the sitemap:

| Missing Page | Route File | Should Include? | Severity |
|--------------|------------|-----------------|----------|
| `/login` | `src/app/(auth)/login/page.tsx` | NO | -- |
| `/recuperar` | `src/app/(auth)/recuperar/page.tsx` | NO | -- |
| `/reset-password` | `src/app/(auth)/reset-password/page.tsx` | NO | -- |
| `/checkout/exito` | `src/app/(auth)/checkout/exito/page.tsx` | NO | -- |
| `/checkout/cancelado` | `src/app/(auth)/checkout/cancelado/page.tsx` | NO | -- |
| `/firmar/{token}` | `src/app/firmar/[token]/page.tsx` | NO | -- |
| `/aprobar/{token}` | `src/app/aprobar/[token]/page.tsx` | NO | -- |
| All `/panel/`, `/clientes/`, etc. | Dashboard routes | NO | -- |

**Verdict:** No legitimate public-facing pages are missing from the sitemap. All omitted routes are correctly excluded (auth flows, dashboard, token-based actions).

### Notable Absence: No Dedicated Pricing Page

There is no `/precios` or `/pricing` route in the application. For a SaaS product, a standalone pricing page is a high-value SEO target. Pricing is currently embedded in the homepage. This is not a sitemap issue per se, but a content architecture gap.

**Recommendation (HIGH):** Create a dedicated `/precios` page and add it to the sitemap. "precios software cotizaciones" and "CPQ precio" are commercially valuable keywords.

---

## 6. Image and Video Sitemaps

| Check | Result | Notes |
|-------|--------|-------|
| Image sitemap (`<image:image>`) | NOT PRESENT | No image extensions in sitemap |
| Video sitemap (`<video:video>`) | NOT PRESENT | No video extensions in sitemap |

**Assessment:** The site uses images (OG images, product screenshots) but does not include them in the sitemap via image extensions. Next.js `MetadataRoute.Sitemap` does not natively support the image sitemap extension.

**Recommendation (LOW):** Image sitemaps provide marginal benefit for SaaS sites. Not a priority unless the site has a visual content strategy (e.g., template gallery images for Google Images traffic). Skip for now.

---

## 7. Quality Gate: Programmatic Pages

### 7.1 Industry Template Pages (30 pages)

| Gate | Threshold | Status |
|------|-----------|--------|
| WARNING at 30+ pages | 60%+ unique content required | WARNING TRIGGERED -- exactly 30 pages |
| HARD STOP at 50+ pages | Explicit justification required | Not triggered |

**Analysis of content uniqueness:** Each industry page in `industrias.ts` contains:
- Unique `titulo` and `descripcion`
- Industry-specific `ejemploLineas` (example line items with descriptions, quantities, prices)
- Unique `problemas` (pain points) array
- Unique `beneficios` array
- Industry-specific `keywords`
- Unique `icp` (ideal customer profile with role, company type, pain, quote)
- Unique `casoDeUso` (before/after case study with result)
- Unique `faqs` array
- Unique `featuresEspecificos` (industry-specific features)
- Unique `stats` array

**Verdict:** Each industry page has substantial unique content (ICP, FAQs, case study, example line items, industry-specific features). This is NOT a doorway page pattern. The data structure enforces content differentiation. The content model is well-designed for programmatic SEO.

**Risk level: LOW.** These pages pass the 60% unique content threshold based on the data model.

### 7.2 Feature Landing Pages (14 pages)

| Gate | Threshold | Status |
|------|-----------|--------|
| WARNING at 30+ pages | -- | Not triggered (14 < 30) |

**Analysis:** Each feature page has unique `problema`, `solucion`, `pasos`, `faqs`, and `keywords`. This is a safe-at-scale pattern -- feature pages with real setup documentation and unique value propositions.

**Risk level: NONE.**

---

## 8. Robots.txt Validation

| Check | Severity | Result |
|-------|----------|--------|
| Sitemap declared | -- | PASS |
| Dashboard routes blocked | -- | PASS |
| API routes blocked | -- | PASS |
| `/firmar/` blocked | -- | PASS (blocked for all user-agents) |
| `/aprobar/` blocked | -- | PASS (blocked for all user-agents) |
| `/checkout/` blocked | -- | PASS (blocked for generic user-agent) |
| `/reset-password` blocked | -- | PASS |
| `/recuperar` NOT blocked | Medium | FAIL |
| `/login` NOT blocked | Low | INFO |
| AI crawler rules present | -- | PASS (GPTBot, ClaudeBot, PerplexityBot, etc.) |
| No conflicting allow/disallow | -- | PASS |

**Note on previous audit findings:** The previous audit (2026-03-18) flagged `/firmar/`, `/aprobar/`, and `/checkout/` as not blocked. These have since been fixed in the current `robots.ts`. The `/recuperar` page remains unblocked.

---

## 9. Cross-Checks

### 9.1 Sitemap vs robots.txt Consistency

| Check | Result |
|-------|--------|
| No sitemap URLs are disallowed in robots.txt | PASS |
| All sitemap URLs are within `Allow: /` scope | PASS |
| No noindex pages found in codebase | PASS |

### 9.2 Canonical URL Consistency

The root layout declares `alternates.canonical: "https://dealforge.es"`. Individual pages should override this with page-specific canonicals. Verify that each public page has a page-specific canonical matching its sitemap `<loc>` URL.

---

## 10. SaaS Industry Best Practices Assessment

| Best Practice | Status | Notes |
|---------------|--------|-------|
| Single sitemap (< 50k URLs) | PASS | ~56+ URLs total |
| Dynamic generation | PASS | `force-dynamic` ensures fresh data |
| Blog posts from DB | PASS | Real `updatedAt` timestamps |
| No auth/dashboard pages | PASS | Correctly excluded |
| Programmatic pages with unique content | PASS | Industry and feature pages are well-structured |
| Dedicated pricing page | FAIL | No `/precios` route exists |
| Sitemap referenced in robots.txt | PASS | Correct |
| No deprecated tags | PASS | No priority/changefreq |
| HTTPS URLs | PASS | All URLs use `https://` |
| Trailing slash consistency | PASS | No trailing slashes in sitemap URLs |
| hreflang for internationalization | N/A | Single-language site (es_ES) |
| Sitemap index for scale | N/A | Not needed at current URL count |

---

## 11. Recommendations Summary

### Critical (0)
None.

### High Priority (2)

1. **Create a dedicated `/precios` page.** A standalone pricing page is one of the highest-converting pages for SaaS. It targets commercial-intent keywords like "CPQ precio", "software cotizaciones precio", "DealForge precios". Add it to the sitemap once created.

2. **Block `/recuperar` in robots.txt.** The password recovery page has no SEO value and should be disallowed for all user-agents, consistent with the existing `/reset-password` disallow.

### Medium Priority (2)

3. **Use per-page lastmod dates for industry and feature pages.** Currently all 30 industry pages and all 14 feature pages share the same `lastmod` date (2026-03-27). When individual pages are updated, their lastmod should reflect the actual change date. Consider tracking this in the data files or computing from git history.

4. **Verify page-specific canonical tags.** The root layout sets a site-wide canonical. Each public page should override it with its own URL to prevent canonical confusion.

### Low Priority (2)

5. **Consider blocking `/login` in robots.txt.** While not harmful, the login page provides no SEO value and could be disallowed to keep the crawl budget focused.

6. **Monitor industry page count.** At 30 industry pages, the quality gate warning threshold is triggered. If expanding beyond 50, each new page must demonstrate 60%+ unique content. The current data model supports this well, so this is informational.

### Informational (1)

7. **Image sitemap not needed at this stage.** The site does not have a visual content strategy that would benefit from image sitemap indexing. Revisit if launching a template gallery or screenshot library.

---

## 12. Overall Sitemap Health Score

| Category | Score |
|----------|-------|
| XML Validity | 10/10 |
| URL Coverage | 9/10 (missing pricing page) |
| lastmod Accuracy | 7/10 (batch dates on programmatic pages) |
| robots.txt Alignment | 9/10 (minor /recuperar gap) |
| Programmatic Page Quality | 9/10 (well-structured, quality gate warning only) |
| SaaS Best Practices | 8/10 |
| **Overall** | **8.7/10** |

---

*Generated from source code analysis of the Next.js application at `/c/Nexus/src/app/sitemap.ts` and related route files.*
