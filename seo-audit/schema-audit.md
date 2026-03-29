# Schema.org Structured Data Audit -- dealforge.es

**Audit date:** 2026-03-28
**Site type:** SaaS CPQ (Configure, Price, Quote) for SMEs
**Primary language:** Spanish (es)

---

## 1. Existing Schema Detection Summary

| Page | Schema Types Found | Format |
|---|---|---|
| Root layout (`layout.tsx`) | Organization, WebSite | JSON-LD |
| Homepage (`page.tsx`) | SoftwareApplication (with Offers) | JSON-LD |
| `/blog` | Blog (with BlogPosting entries) | JSON-LD |
| `/blog/[slug]` | Article, BreadcrumbList | JSON-LD |
| `/funcionalidades` | CollectionPage (with BreadcrumbList) | JSON-LD |
| `/funcionalidades/[slug]` | WebPage (with BreadcrumbList), FAQPage | JSON-LD |
| `/plantilla-cotizacion` | CollectionPage (with BreadcrumbList) | JSON-LD |
| `/plantilla-cotizacion/[slug]` | WebPage (with BreadcrumbList), FAQPage | JSON-LD |
| `/guia` | WebPage | JSON-LD |

**Microdata:** None found.
**RDFa:** None found.
**Format consistency:** All schema uses JSON-LD -- this is correct and preferred.

---

## 2. Per-Block Validation

### 2.1 Organization (root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DealForge",
  "url": "https://dealforge.es",
  "logo": "https://dealforge.es/logo.svg",
  "description": "Sistema CPQ inteligente con IA para PYMEs...",
  "email": "info@dealforge.es",
  "sameAs": [],
  "foundingDate": "2026",
  "knowsAbout": [...]
}
```

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type is valid | PASS | |
| Required: name | PASS | |
| Required: url | PASS | |
| logo format | WARN | Google recommends `logo` be an ImageObject with `url`, `width`, and `height`, not a bare string. SVG is also not ideal -- Google prefers PNG/JPG for logo markup. |
| sameAs | WARN | Empty array. Should list actual social profiles (LinkedIn, X/Twitter, etc.) or be removed entirely. |
| foundingDate | WARN | Value is `"2026"` which is valid ISO 8601 (year only), but a full date like `"2026-01-01"` is more precise. |
| No placeholder text | PASS | |

**Verdict: PASS with warnings.**

### 2.2 WebSite (root layout)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "DealForge",
  "url": "https://dealforge.es",
  "publisher": { "@type": "Organization", ... },
  "inLanguage": "es",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://dealforge.es/blog?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type is valid | PASS | |
| SearchAction target | WARN | The URL `https://dealforge.es/blog?q={search_term_string}` is declared but is this search actually functional? If `/blog` does not accept a `?q=` query parameter, Google may flag this as a broken sitelinks search box. Verify the search endpoint works or remove the SearchAction. |
| publisher nesting | PASS | |

**Verdict: PASS with warning about SearchAction.**

### 2.3 SoftwareApplication (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DealForge",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": [
    { "@type": "Offer", "name": "Starter", "price": "0", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Pro", "price": "29", ... },
    { "@type": "Offer", "name": "Business", "price": "79", ... }
  ]
}
```

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type is valid | PASS | |
| Required for rich results: name | PASS | |
| Required for rich results: offers.price | PASS | |
| Required for rich results: offers.priceCurrency | PASS | |
| Recommended: aggregateRating | FAIL | Missing. Google strongly recommends `aggregateRating` for SoftwareApplication rich results. Without it, the schema is less likely to generate a rich snippet. |
| Recommended: review | FAIL | Missing. No reviews are included. |
| applicationSubCategory | WARN | `"CPQ Software"` is not a controlled vocabulary term. It will not cause errors but provides no additional signal. |
| featureList values | WARN | Contain unaccented Spanish text (e.g., "Gestion" instead of "Gestion"). Minor, but should match actual site content for consistency. |
| Enterprise plan missing | INFO | The Enterprise plan (custom pricing) is not included in the Offers array. This is acceptable since there is no fixed price, but it could be included with `priceSpecification` indicating "contact for pricing". |
| downloadUrl | WARN | Points to `/registro` (registration page). For a web app, `installUrl` or just `url` would be more semantically correct. `downloadUrl` implies a downloadable binary. |

**Verdict: PASS but missing aggregateRating and review -- these are key for rich results eligibility.**

### 2.4 Blog + BlogPosting (`/blog`)

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type Blog | PASS | |
| BlogPosting entries | PASS | Dynamically generated from database |
| publisher.logo as ImageObject | PASS | |
| datePublished format | PASS | Uses `.toISOString()` |
| author type | WARN | Uses `Organization` as author. Google prefers `Person` for article authors, or at minimum a named individual. If posts are authored by the company itself, `Organization` is acceptable. |

**Verdict: PASS.**

### 2.5 Article + BreadcrumbList (`/blog/[slug]`)

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type Article | PASS | |
| headline | PASS | |
| datePublished / dateModified | PASS | ISO 8601 via `.toISOString()` |
| author | PASS | Organization type |
| publisher with logo | PASS | |
| mainEntityOfPage | PASS | |
| BreadcrumbList | PASS | 3 levels, proper positions |
| image | WARN | Conditional -- only included if `post.imagen` exists. Google requires `image` for Article rich results. Posts without images will not be eligible. |

**Verdict: PASS. Ensure all blog posts have images.**

### 2.6 CollectionPage (`/funcionalidades`, `/plantilla-cotizacion`)

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type CollectionPage | PASS | |
| BreadcrumbList | PASS | |
| Last breadcrumb missing `item` | WARN | The last `ListItem` in the breadcrumb on both pages omits the `item` property. Per Google's docs, the last item should still have an `item` URL for full compliance, though Google does accept it without. |

**Verdict: PASS.**

### 2.7 FAQPage (`/funcionalidades/[slug]`, `/plantilla-cotizacion/[slug]`)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

| Check | Result | Notes |
|---|---|---|
| @context is https | PASS | |
| @type FAQPage | PASS | |
| Structure | PASS | Properly uses Question + Answer |
| Google eligibility | **FAIL** | As of August 2023, Google restricts FAQ rich results to government and healthcare authority websites only. DealForge is a SaaS company and will NOT receive FAQ rich results. The schema is technically valid but will produce no visible benefit in search. |

**Verdict: FAIL for rich results. The schema is syntactically valid but will never generate rich results for this site. Recommend removal to reduce page weight and avoid false expectations.**

### 2.8 Homepage FAQ (faq-accordion.tsx)

The homepage FAQ section correctly does NOT include FAQPage schema. A comment in the source confirms awareness of the August 2023 restriction. This is correct.

**Verdict: PASS -- correctly omitted.**

---

## 3. Missing Schema Opportunities

### 3.1 CRITICAL -- Missing from homepage

#### A. AggregateRating for SoftwareApplication

The existing `SoftwareApplication` block has no `aggregateRating` or `review` properties. This is the single most impactful addition for rich results eligibility. Once real user reviews exist, add:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DealForge",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "47",
    "bestRating": "5",
    "worstRating": "1"
  }
}
```

**Important:** Only add this when you have genuine, verifiable user reviews. Fabricating ratings violates Google's spam policies.

#### B. BreadcrumbList for Homepage

The homepage has no `BreadcrumbList`. While a single-level breadcrumb is minimal, it establishes the root for Google's breadcrumb trail:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://dealforge.es"
    }
  ]
}
```

### 3.2 HIGH -- Missing across site

#### C. WebPage schema for `/precios` (if separate page exists) or pricing section

The pricing plans on the homepage are captured within the `SoftwareApplication` offers, which is correct. However, if a dedicated `/precios` page exists or is planned, it should have its own `WebPage` + `Offer` schema.

#### D. Service schema (alternative/complementary to SoftwareApplication)

For a SaaS CPQ product targeting SMEs in Spain, adding a `Service` schema helps Google understand DealForge as a service offering, not just a software download:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "DealForge CPQ",
  "serviceType": "SaaS CPQ Platform",
  "description": "Sistema CPQ (Configure, Price, Quote) con inteligencia artificial para PYMEs. Automatiza cotizaciones comerciales, gestiona clientes y genera PDFs profesionales.",
  "provider": {
    "@type": "Organization",
    "name": "DealForge",
    "url": "https://dealforge.es"
  },
  "areaServed": {
    "@type": "Country",
    "name": "ES"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://dealforge.es/registro",
    "serviceType": "Online"
  },
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Plan gratuito: 10 cotizaciones/mes, 5 clientes, 10 productos",
      "url": "https://dealforge.es/registro"
    },
    {
      "@type": "Offer",
      "name": "Pro",
      "price": "29",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "29",
        "priceCurrency": "EUR",
        "billingDuration": "P1M",
        "unitText": "mes"
      },
      "description": "100 cotizaciones/mes, Forge IA ilimitado, firma electronica, emails",
      "url": "https://dealforge.es/registro"
    },
    {
      "@type": "Offer",
      "name": "Business",
      "price": "79",
      "priceCurrency": "EUR",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": "79",
        "priceCurrency": "EUR",
        "billingDuration": "P1M",
        "unitText": "mes"
      },
      "description": "Todo ilimitado, contratos, renovaciones, reglas avanzadas",
      "url": "https://dealforge.es/registro"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Planes DealForge",
    "itemListElement": [
      { "@type": "Offer", "name": "Starter" },
      { "@type": "Offer", "name": "Pro" },
      { "@type": "Offer", "name": "Business" },
      { "@type": "Offer", "name": "Enterprise" }
    ]
  }
}
```

### 3.3 MEDIUM -- Missing opportunities

#### E. BreadcrumbList for `/blog` index

The blog index page has no `BreadcrumbList`. Add:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Inicio",
      "item": "https://dealforge.es"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://dealforge.es/blog"
    }
  ]
}
```

#### F. WebPage for `/guia` (lead magnet page)

The `/guia` page has a basic `WebPage` schema. It could be enhanced with `speakable` and `mainEntity` properties to better describe the downloadable guide:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Guia: 5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
  "description": "Descarga gratis la guia con los 5 errores mas comunes en cotizaciones comerciales.",
  "url": "https://dealforge.es/guia",
  "mainEntity": {
    "@type": "DigitalDocument",
    "name": "5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
    "description": "Guia gratuita sobre errores comunes en cotizaciones comerciales y como solucionarlos.",
    "encodingFormat": "application/pdf",
    "isAccessibleForFree": true,
    "author": {
      "@type": "Organization",
      "name": "DealForge",
      "url": "https://dealforge.es"
    }
  }
}
```

### 3.4 LOW -- Nice to have

#### G. Sitelinks SearchBox verification

The `WebSite` schema declares a `SearchAction` targeting `https://dealforge.es/blog?q={search_term_string}`. If this search endpoint does not actually work, remove the `potentialAction` block entirely. A broken search action can cause Google to ignore the entire WebSite schema.

#### H. Organization logo improvement

Replace the bare string logo with an `ImageObject` and use a raster format:

```json
"logo": {
  "@type": "ImageObject",
  "url": "https://dealforge.es/logo.png",
  "width": 512,
  "height": 512
}
```

Google explicitly recommends logos be at least 112x112px in PNG, JPG, or WebP format (not SVG).

---

## 4. Issues to Fix

### Priority 1 -- Fix Now

| Issue | Location | Action |
|---|---|---|
| Remove FAQPage schema | `/funcionalidades/[slug]`, `/plantilla-cotizacion/[slug]` | Delete the FAQPage JSON-LD block. FAQ rich results are restricted to government/healthcare sites since August 2023. |
| Fix Organization logo format | Root `layout.tsx` | Change from bare SVG string to ImageObject with PNG/JPG URL, width, and height. |
| Verify SearchAction endpoint | Root `layout.tsx` | Confirm `/blog?q=` actually works. If not, remove `potentialAction` from WebSite schema. |

### Priority 2 -- Add When Ready

| Issue | Location | Action |
|---|---|---|
| Add AggregateRating to SoftwareApplication | `page.tsx` (homepage) | Add once genuine user reviews exist. Do NOT fabricate. |
| Add BreadcrumbList to `/blog` index | `/blog/page.tsx` | Add 2-level breadcrumb (Inicio > Blog). |
| Fix `downloadUrl` semantics | `page.tsx` (homepage) | Change `downloadUrl` to just rely on `url` for a web-based SaaS. |
| Add last breadcrumb `item` URL | `/funcionalidades`, `/plantilla-cotizacion` and their child pages | Add the `item` property to the final ListItem in each BreadcrumbList. |

### Priority 3 -- Strategic Additions

| Issue | Location | Action |
|---|---|---|
| Add Service schema | Homepage or new `/precios` page | Adds SaaS service context alongside SoftwareApplication. |
| Populate `sameAs` array | Root `layout.tsx` | Add social media profile URLs once they exist. |
| Enhance `/guia` with DigitalDocument | `/guia/page.tsx` | Better describes the lead magnet for search engines. |

---

## 5. Schema Coverage Matrix

| Schema Type | Present | Valid | Rich Results Eligible |
|---|---|---|---|
| Organization | Yes | Yes (warnings) | Yes -- Knowledge Panel |
| WebSite | Yes | Yes (verify SearchAction) | Yes -- Sitelinks Search Box |
| SoftwareApplication | Yes | Yes | Partial -- needs aggregateRating |
| Blog | Yes | Yes | N/A (no specific rich result) |
| Article / BlogPosting | Yes | Yes | Yes -- if image present |
| BreadcrumbList | Yes (some pages) | Yes | Yes |
| CollectionPage | Yes | Yes | N/A |
| WebPage | Yes | Yes | N/A |
| FAQPage | Yes (should remove) | Valid but restricted | No -- not eligible |
| Service | No | -- | N/A |
| AggregateRating | No | -- | Needed for SoftwareApp |
| Review | No | -- | Needed for SoftwareApp |

---

## 6. Summary

**Overall assessment:** The site has solid schema foundation with JSON-LD across all public pages. The main issues are:

1. **FAQPage schema should be removed** from feature and template pages -- it will never generate rich results for a SaaS site.
2. **SoftwareApplication is missing AggregateRating** -- this is the highest-impact addition once real reviews are available.
3. **Organization logo should use ImageObject with PNG** instead of a bare SVG string.
4. **SearchAction endpoint needs verification** -- if `/blog?q=` does not work, remove it.
5. **BreadcrumbList is inconsistent** -- present on article pages but missing from the blog index and homepage.

The site correctly avoids deprecated schema types (HowTo, SpecialAnnouncement) and correctly omits FAQPage from the homepage. The pricing/offer schema within SoftwareApplication is well-structured with proper UnitPriceSpecification for recurring billing.
