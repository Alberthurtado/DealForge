# Schema.org Structured Data Audit -- dealforge.es

**Audit date:** 2026-03-18
**Audited by:** Claude Opus 4.6 (Schema.org Specialist)
**Source:** Next.js application source code at `C:\Nexus\src\app\`

---

## Table of Contents

1. [Global Schema (Root Layout)](#1-global-schema-root-layout)
2. [Homepage](#2-homepage-httpsdealgorgees)
3. [Guide Page](#3-guide-page-httpsdealgorgeesgua)
4. [Blog Index](#4-blog-index-httpsdealgorgeeslog)
5. [Blog Post (slug)](#5-blog-post-slug-page)
6. [Summary of Issues](#6-summary-of-issues)
7. [Recommended JSON-LD Additions](#7-recommended-json-ld-additions)

---

## 1. Global Schema (Root Layout)

**File:** `src/app/layout.tsx`

### Detected JSON-LD Blocks

**Block 1: Organization**
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
  "knowsAbout": ["CPQ", "Configure Price Quote", ...]
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type is valid | PASS | |
| Required: `name` | PASS | |
| Recommended: `url` | PASS | |
| Recommended: `logo` | WARN | Google requires logo as ImageObject with `url`, `width`, `height` properties for rich results. Raw URL string works but is suboptimal. |
| `sameAs` | WARN | Empty array. Should be omitted or populated with social media profile URLs. |
| `foundingDate` | WARN | Value `"2026"` -- ISO 8601 recommends `"2026-01-01"` format. |
| Google Rich Results eligible | PARTIAL | Organization/Logo can trigger knowledge panel. Needs `logo` as ImageObject. |

**Block 2: WebSite**
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
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type is valid | PASS | |
| Required: `name`, `url` | PASS | |
| SearchAction | WARN | The search URL `dealforge.es/blog?q=...` must actually work as a search endpoint. Verify the blog page handles the `q` query parameter; if not, this is misleading and Google may ignore it. |
| Google Sitelinks Searchbox eligible | CONDITIONAL | Only works if the search endpoint is functional. |

---

## 2. Homepage -- https://dealforge.es

**File:** `src/app/page.tsx`

### Detected JSON-LD Blocks

**Block 1: SoftwareApplication**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "DealForge",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://dealforge.es",
  "offers": [
    { "@type": "Offer", "name": "Starter", "price": "0", "priceCurrency": "EUR" },
    { "@type": "Offer", "name": "Pro", "price": "29", ... },
    { "@type": "Offer", "name": "Business", "price": "79", ... }
  ],
  ...
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type is valid | PASS | |
| Required for Rich Results: `name` | PASS | |
| Required for Rich Results: `offers.price` | PASS | |
| Required for Rich Results: `offers.priceCurrency` | PASS | |
| Missing (Required): `aggregateRating` or `review` | FAIL | Google requires EITHER `aggregateRating` OR `review` for SoftwareApplication rich results. Without one, no star rating snippet will appear. |
| `applicationSubCategory` | INFO | Not an official schema.org property. Will be silently ignored. |
| `isAccessibleForFree` | PASS | Valid property. |
| `featureList` | PASS | Valid property. |

**Block 2: HowTo** -- DEPRECATED
```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "Como crear una cotizacion profesional con DealForge",
  "step": [...]
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @type: HowTo | **FAIL -- DEPRECATED** | Google removed HowTo rich results in September 2023. This schema block serves no SEO purpose and should be removed to keep structured data clean. |

**Block 3: FAQPage** (via `faq-accordion.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } },
    ...
  ]
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @type: FAQPage | **FAIL -- RESTRICTED** | Since August 2023, FAQPage rich results are restricted to **government and healthcare authority sites only**. DealForge is a SaaS product site and will NOT receive FAQ rich results from Google. This block should be removed. |

### Missing Schema Opportunities (Homepage)

1. **BreadcrumbList** -- Not present. Recommended for all pages.
2. **WebPage** -- No explicit WebPage schema. Adding one helps Google understand page purpose.

---

## 3. Guide Page -- https://dealforge.es/guia

**File:** `src/app/(public)/guia/page.tsx`

### Detected JSON-LD Blocks

**Block 1: WebPage with nested FAQPage**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Guia: 5 Errores en tus Cotizaciones...",
  "url": "https://dealforge.es/guia",
  "publisher": { "@type": "Organization", ... },
  "mainEntity": {
    "@type": "FAQPage",
    "mainEntity": [...]
  }
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type: WebPage | PASS | |
| Required: `name` | PASS | |
| `url` | PASS | Absolute URL. |
| `publisher.logo` as ImageObject | PASS | Correctly uses `ImageObject` with `url` property. |
| Nested FAQPage | **FAIL -- RESTRICTED** | Same restriction as above. FAQPage rich results are only for government/healthcare sites. This nested schema should be removed. |
| Nesting structure | WARN | A WebPage with `mainEntity` of FAQPage is structurally odd. If FAQ is removed, `mainEntity` should reference the guide content itself. |

### Missing Schema Opportunities (Guide Page)

1. **BreadcrumbList** -- Not present. Should have Home > Guia.
2. The guide is a lead magnet / downloadable resource. A **DigitalDocument** or **CreativeWork** schema could describe the downloadable PDF asset.

---

## 4. Blog Index -- https://dealforge.es/blog

**File:** `src/app/(public)/blog/page.tsx`

### Detected JSON-LD Blocks

**Block 1: Blog with nested BlogPosting items**
```json
{
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Blog DealForge",
  "url": "https://dealforge.es/blog",
  "publisher": { "@type": "Organization", ... },
  "blogPost": [
    { "@type": "BlogPosting", "headline": "...", "datePublished": "...", ... }
  ]
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type: Blog | PASS | Valid schema.org type. |
| `name`, `url` | PASS | |
| `publisher.logo` as ImageObject | PASS | |
| Nested BlogPosting items | PASS | Dynamic from database. Structure is correct. |
| `blogPost[].author` | WARN | Author is typed as `Organization` but uses `post.autor` field. If the author is a person's name, this should be `@type: Person`. |
| `blogPost[].image` | WARN | Conditionally included. If no image is set, the post will lack `image`, which is required by Google for Article rich results. |
| Google Rich Results eligible | PARTIAL | Blog type itself does not trigger rich results. Individual BlogPosting items need `image` and `author` to be eligible. |

### Missing Schema Opportunities (Blog Index)

1. **BreadcrumbList** -- Not present. Should have Home > Blog.
2. **CollectionPage** or **WebPage** wrapping the Blog for broader page-level semantics.

---

## 5. Blog Post (slug page)

**File:** `src/app/(public)/blog/[slug]/page.tsx`

### Detected JSON-LD Blocks

**Block 1: Article**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "...",
  "description": "...",
  "url": "https://dealforge.es/blog/...",
  "datePublished": "...",
  "dateModified": "...",
  "author": { "@type": "Organization", "name": "...", "url": "..." },
  "publisher": { "@type": "Organization", ..., "logo": { "@type": "ImageObject", ... } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "..." },
  "image": { "@type": "ImageObject", "url": "..." }
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type: Article | PASS | |
| Required: `headline` | PASS | |
| Required: `image` | WARN | Conditionally included. If `post.imagen` is null, `image` is missing entirely. Google **requires** `image` for Article rich results. |
| Required: `datePublished` | WARN | Conditionally set from `post.publishedAt?.toISOString()`. If null, this is `undefined` and will be missing from the JSON. |
| Required: `author.name` | PASS | |
| `author.@type` | WARN | Uses `Organization`. Google's documentation recommends `Person` when the author is an individual. If `post.autor` contains a person name (e.g., "Juan Garcia"), this should be `@type: Person`. |
| `publisher.logo` | PASS | Correct ImageObject format. |
| `mainEntityOfPage` | PASS | |
| Google Article Rich Results eligible | CONDITIONAL | Only if `image` and `datePublished` are present. |

**Block 2: BreadcrumbList**
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://dealforge.es" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://dealforge.es/blog" },
    { "@type": "ListItem", "position": 3, "name": "...", "item": "https://dealforge.es/blog/..." }
  ]
}
```

| Check | Result | Notes |
|-------|--------|-------|
| @context is `https://schema.org` | PASS | |
| @type: BreadcrumbList | PASS | |
| All items have `position`, `name`, `item` | PASS | |
| URLs are absolute | PASS | |
| Google Rich Results eligible | PASS | This is well-formed and should trigger breadcrumb rich results. |

### Missing Schema Opportunities (Blog Post)

1. None critical. This page has the most complete schema implementation.
2. Minor: could add `wordCount`, `articleSection`, `inLanguage: "es"` for richer semantics.

---

## 6. Summary of Issues

### Critical Issues (Must Fix)

| # | Page | Issue | Impact |
|---|------|-------|--------|
| 1 | Homepage | **HowTo schema is deprecated** -- Google removed HowTo rich results Sept 2023 | Dead schema; no SEO benefit; adds bloat |
| 2 | Homepage | **FAQPage schema is restricted** -- Only for govt/healthcare since Aug 2023 | Will never trigger rich results for a SaaS site |
| 3 | Guide | **Nested FAQPage schema is restricted** -- Same restriction | Will never trigger rich results |

### High-Priority Issues

| # | Page | Issue | Impact |
|---|------|-------|--------|
| 4 | Homepage | SoftwareApplication missing `aggregateRating` or `review` | Cannot trigger star-rating rich snippet |
| 5 | Blog Post | Article `image` is conditionally omitted | Posts without images lose Article rich results eligibility |
| 6 | Blog Post | Article `datePublished` is conditionally omitted | Posts without publishedAt lose rich results eligibility |
| 7 | Blog Post | `author` typed as Organization -- may be incorrect | Google prefers Person for individual authors |

### Medium-Priority Issues

| # | Page | Issue | Impact |
|---|------|-------|--------|
| 8 | Global | Organization `logo` is a plain URL string | Should be ImageObject with width/height for better parsing |
| 9 | Global | Organization `sameAs` is an empty array | Either populate with social profiles or remove |
| 10 | Global | Organization `foundingDate` is `"2026"` | Should be ISO 8601: `"2026-01-01"` |
| 11 | Global | WebSite SearchAction -- verify blog search works | If `/blog?q=` is not functional, remove SearchAction |
| 12 | Homepage | No BreadcrumbList schema | Missed opportunity for breadcrumb rich results |
| 13 | Blog Index | No BreadcrumbList schema | Missed opportunity |
| 14 | Guide | No BreadcrumbList schema | Missed opportunity |
| 15 | Blog Index | `blogPost[].author` typed as Organization | May be incorrect if author is a person |

### Low-Priority / Informational

| # | Page | Issue | Impact |
|---|------|-------|--------|
| 16 | Homepage | `applicationSubCategory` is not a schema.org property | Silently ignored; harmless |
| 17 | Blog Post | Could add `wordCount`, `articleSection`, `inLanguage` | Richer semantics, marginal SEO benefit |

---

## 7. Recommended JSON-LD Additions

### 7.1 Fix: Remove HowTo and FAQPage from Homepage

In `src/app/page.tsx`, delete the entire `howTo` object (lines 686-720) and its corresponding `<script>` tag.

In `src/app/_landing/faq-accordion.tsx`, delete the `<script type="application/ld+json">` block (lines 112-130). The FAQ content is still visible to users and crawlers as HTML; the structured data block simply should not claim FAQPage status.

### 7.2 Fix: Remove nested FAQPage from Guide Page

In `src/app/(public)/guia/page.tsx`, remove the `mainEntity` property from the `jsonLd` object (lines 52-59). Keep the WebPage schema itself.

### 7.3 Fix: Improve Organization logo in layout.tsx

Replace the `logo` string with an ImageObject:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "DealForge",
  "url": "https://dealforge.es",
  "logo": {
    "@type": "ImageObject",
    "url": "https://dealforge.es/logo.svg",
    "width": 512,
    "height": 512
  },
  "description": "Sistema CPQ inteligente con IA para PYMEs. Automatiza cotizaciones comerciales.",
  "email": "info@dealforge.es",
  "foundingDate": "2026-01-01",
  "knowsAbout": [
    "CPQ", "Configure Price Quote", "Sales Automation",
    "Artificial Intelligence", "Small Business Software"
  ]
}
```

Note: `sameAs` removed (was empty). `foundingDate` changed to ISO 8601.

### 7.4 Add: BreadcrumbList for Homepage

Add to `src/app/page.tsx` inside the `StructuredData` component:

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

### 7.5 Add: BreadcrumbList for Blog Index

Add to `src/app/(public)/blog/page.tsx`:

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

### 7.6 Add: BreadcrumbList for Guide Page

Add to `src/app/(public)/guia/page.tsx`:

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
      "name": "Guia",
      "item": "https://dealforge.es/guia"
    }
  ]
}
```

### 7.7 Fix: Blog Post Article schema -- ensure required fields always present

In `src/app/(public)/blog/[slug]/page.tsx`, update the `articleJsonLd` to always include fallback values:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "<post.titulo>",
  "description": "<post.extracto>",
  "url": "https://dealforge.es/blog/<post.slug>",
  "datePublished": "<post.publishedAt?.toISOString() || post.createdAt.toISOString()>",
  "dateModified": "<post.updatedAt.toISOString()>",
  "author": {
    "@type": "Person",
    "name": "<post.autor>",
    "url": "https://dealforge.es"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DealForge",
    "url": "https://dealforge.es",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dealforge.es/logo.svg",
      "width": 512,
      "height": 512
    }
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://dealforge.es/blog/<post.slug>"
  },
  "image": {
    "@type": "ImageObject",
    "url": "<post.imagen || 'https://dealforge.es/opengraph-image'>"
  },
  "inLanguage": "es",
  "keywords": "<tags.join(', ')>"
}
```

Key changes:
- `author` changed from Organization to Person (unless the author is literally the company)
- `image` always present with fallback to the OG image
- `datePublished` falls back to `createdAt` if `publishedAt` is null
- Added `inLanguage`

### 7.8 Fix: Blog Index -- author type in nested BlogPosting

In `src/app/(public)/blog/page.tsx`, change the author mapping from:

```json
"author": { "@type": "Organization", "name": "<post.autor>" }
```

to:

```json
"author": { "@type": "Person", "name": "<post.autor>", "url": "https://dealforge.es" }
```

### 7.9 Recommended: Improved Guide Page WebPage schema

Replace the current `jsonLd` in `src/app/(public)/guia/page.tsx` with:

```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Guia: 5 Errores en tus Cotizaciones que te Hacen Perder Ventas",
  "description": "Descarga gratis la guia con los 5 errores mas comunes en cotizaciones comerciales y aprende como solucionarlos para cerrar mas ventas.",
  "url": "https://dealforge.es/guia",
  "inLanguage": "es",
  "isPartOf": {
    "@type": "WebSite",
    "name": "DealForge",
    "url": "https://dealforge.es"
  },
  "publisher": {
    "@type": "Organization",
    "name": "DealForge",
    "url": "https://dealforge.es",
    "logo": {
      "@type": "ImageObject",
      "url": "https://dealforge.es/logo.svg",
      "width": 512,
      "height": 512
    }
  },
  "about": {
    "@type": "Thing",
    "name": "Errores comunes en cotizaciones comerciales"
  },
  "significantLink": "https://dealforge.es/registro"
}
```

---

## Overall Score

| Page | Schema Blocks | Valid | Deprecated/Restricted | Missing Opportunities |
|------|:---:|:---:|:---:|:---:|
| Global (layout) | 2 | 2 (with warnings) | 0 | -- |
| Homepage | 3 | 1 | 2 (HowTo + FAQPage) | BreadcrumbList |
| Guide | 1 | 0.5 (has nested FAQPage) | 1 (FAQPage) | BreadcrumbList |
| Blog Index | 1 | 1 (with warnings) | 0 | BreadcrumbList |
| Blog Post | 2 | 2 (with warnings) | 0 | -- |
| **TOTAL** | **9** | **6.5** | **3** | **3** |

### Priority Action Items

1. **Remove** the HowTo schema from homepage (deprecated, zero value)
2. **Remove** all three FAQPage schema blocks (restricted, zero value for SaaS)
3. **Add** BreadcrumbList to homepage, blog index, and guide page
4. **Fix** Organization logo format (ImageObject with dimensions)
5. **Fix** Article schema to always include `image` and `datePublished`
6. **Review** author type -- use Person if authors are individuals
7. **Verify** that `/blog?q=` search actually works, or remove SearchAction
