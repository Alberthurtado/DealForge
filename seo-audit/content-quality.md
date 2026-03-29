# DealForge.es -- Content Quality & E-E-A-T Audit

**Site:** https://dealforge.es
**Type:** CPQ SaaS for SMEs (Spain)
**Date:** 2026-03-28
**Framework:** Next.js (App Router)
**Language:** Spanish (es_ES)

---

## 1. Overall Content Quality Score

| Metric | Score |
|--------|-------|
| **Overall Content Quality** | **62 / 100** |
| E-E-A-T Composite | 48 / 100 |
| AI Citation Readiness | 71 / 100 |
| Readability | 78 / 100 |
| Technical SEO Execution | 82 / 100 |

**Verdict:** The site has solid technical SEO foundations (structured data, canonical URLs, sitemap, robots.txt) and a broad page footprint, but critically lacks E-E-A-T depth. The content reads as competent marketing copy without first-hand experience signals, named authors, social proof, or external authority markers. Under the September 2025 QRG, this pattern puts it at risk of being classified as AI-generated thin content that lacks genuine expertise.

---

## 2. E-E-A-T Breakdown

### Experience (20% weight) -- Score: 25 / 100

**What is present:**
- The guide page (`/guia`) references specific pain points ("50% of deals go to the first responder") that suggest familiarity with the sales process.
- The Forge AI showcase uses realistic demo data (quote numbers, company names, pipeline values).

**What is missing:**
- CRITICAL: Zero customer testimonials, case studies, or user stories anywhere on the site.
- No founder story, team page, or "about us" section.
- No screenshots of the actual product in use (the dashboard "mockup" is a CSS illustration, not a real screenshot).
- No customer logos, partner logos, or "trusted by" section.
- No concrete metrics from real users (e.g., "Our customers save X hours/week").
- The `/guia` page uses statistics ("50% of deals", "80% of sales require 5 follow-ups") without attributing sources.
- The `casoDeUso` (case study) data in `/data/industrias.ts` uses generic "antes/despues" narratives that read as hypothetical, not real customer experiences.

**Recommendation:** This is the single highest-priority gap. Add at minimum:
1. A real product screenshot (not a CSS mockup) on the homepage.
2. 3-5 customer testimonials with names, roles, and company names.
3. A "Sobre nosotros" / "Nuestro equipo" page with founder bios and LinkedIn links.
4. Source citations for all statistics used in marketing copy.

### Expertise (25% weight) -- Score: 50 / 100

**What is present:**
- Comprehensive feature landing pages (14 pages in `/funcionalidades/[slug]`) with problem-solution-steps-FAQ structure.
- Industry template pages (approximately 20+ pages in `/plantilla-cotizacion/[slug]`) with sector-specific examples, ICP profiles, and realistic quote line items.
- Thorough documentation page (`/documentacion`) that demonstrates deep product knowledge.
- FAQ section with 10 substantive questions covering CPQ concepts, data security, integrations, and RGPD compliance.
- Blog infrastructure in place (database-driven via Prisma).

**What is missing:**
- No named expert authors on any content. Blog posts list `post.autor` from the database, but the homepage, feature pages, and guide page have no authorship attribution.
- No credentials, certifications, or industry affiliations mentioned.
- The documentation exists but is entirely self-referential; no external expert validation.
- Feature page content in `/data/features.ts` uses a templated structure (problem 3 points, solution 4 points, 3 steps, 3-4 FAQs) that risks appearing formulaic to quality raters.
- Keywords in `features.ts` include "base de datos clientes Mexico" (Mexico reference) which is inconsistent with the Spain-targeted site.

**Recommendation:**
1. Add author bios with relevant sales/SaaS credentials.
2. Create thought leadership content (blog posts) with original data or insights.
3. Vary the structure of feature pages to avoid the cookie-cutter pattern.
4. Fix the "Mexico" keyword reference in the client management feature.

### Authoritativeness (25% weight) -- Score: 35 / 100

**What is present:**
- Clean domain (dealforge.es) with proper `.es` ccTLD for Spain market.
- Structured data (Organization, WebSite, SoftwareApplication schemas) properly implemented.
- Changelog page demonstrating active product development.
- RGPD and privacy policy pages showing regulatory awareness.

**What is missing:**
- CRITICAL: No external social proof whatsoever -- no review scores, no G2/Capterra presence, no press mentions, no partner logos.
- Organization schema `sameAs` array is empty (`sameAs: []`), confirming no social media profiles are linked.
- No backlink-worthy content (original research, industry reports, calculators, free tools).
- No "as seen in" or media mentions section.
- `foundingDate: "2026"` in structured data indicates a very new company, which is not inherently a problem but makes the absence of any authority signals more damaging.
- The blog appears to have no published posts (the empty state "Proximamente" is visible in the code).

**Recommendation:**
1. Populate the blog with at least 10-15 high-quality articles before expecting SEO traction.
2. Create linkable assets (CPQ ROI calculator, industry benchmark reports, free quote templates for download).
3. Establish social media presence and update the `sameAs` array.
4. Pursue review site listings (G2, Capterra, GetApp) as early as possible.
5. Add an "Integraciones" or "Partners" section to the homepage.

### Trustworthiness (30% weight) -- Score: 58 / 100

**What is present:**
- Contact page with email (info@dealforge.es), location (Barcelona, Spain), and response time commitment (under 24h).
- Privacy policy with 13 sections, RGPD compliance page, and terms of service -- all dated and structured.
- Contact form with clear purpose.
- Pricing transparency with all 4 tiers fully detailed.
- "Sin tarjeta de credito" (no credit card) messaging on CTAs.
- HTTPS enforced (implicit from the codebase).
- Proper robots.txt blocking dashboard/API/sensitive routes.

**What is missing:**
- No company registration number (CIF/NIF) visible on the site -- required by Spanish commercial law (LSSI-CE).
- No physical address beyond "Barcelona, Espana" -- LSSI requires a complete registered address.
- No phone number.
- No trust badges (SSL badge, RGPD compliance badge, payment processor logos).
- Footer lacks "Aviso Legal" page, which is legally required for Spanish websites.
- No cookie consent banner implementation visible in the codebase.
- No customer review/rating aggregation.
- Contact form does not mention data processing consent (RGPD Article 7 requirement).

**Recommendation:**
1. LEGALLY REQUIRED: Add CIF, full registered address, and "Aviso Legal" page per LSSI-CE.
2. LEGALLY REQUIRED: Implement cookie consent banner (LSSI + RGPD).
3. Add trust badges and payment processor logos (Stripe logo, etc.).
4. Add a phone number or at least a scheduling link for demos.

---

## 3. Content Depth & Thin Content Analysis

### Page-by-Page Assessment

| Page | Est. Word Count | Minimum | Verdict | Notes |
|------|----------------|---------|---------|-------|
| **Homepage** (`/`) | ~350 visible text words | 500 | BELOW MINIMUM | Much of the "content" is UI chrome, KPI labels, and feature card titles. The actual readable prose (H1 + paragraphs + problem descriptions + FAQ) is borderline thin. |
| **Feature index** (`/funcionalidades`) | ~120 | 500 | THIN | This is essentially a link grid with 1-sentence descriptions per feature. No substantive content. |
| **Feature detail** (`/funcionalidades/[slug]`) | ~400-600 per page | 800 (service page) | BELOW MINIMUM | Structured content (problem, solution, steps, FAQ) but text is short-form. Each solution point has a title + 1-2 sentence description. |
| **Template index** (`/plantilla-cotizacion`) | ~100 | 500 | VERY THIN | Just a grid of industry links with minimal text. |
| **Template detail** (`/plantilla-cotizacion/[slug]`) | ~500-700 | 800 (service page) | BELOW MINIMUM | Has good structure (problems, benefits, ICP, case study, FAQs, example quote) but individual text blocks are very short. |
| **Guide** (`/guia`) | ~450 | 500 (landing page) | BORDERLINE | Good lead magnet structure but the "5 errors" are previews with 1-2 sentences each. |
| **Contact** (`/contacto`) | ~100 | N/A | ACCEPTABLE | Contact pages do not need heavy content. |
| **Blog index** (`/blog`) | ~50 (empty state) | N/A | EMPTY | No blog posts published. This is a significant content gap. |
| **Blog detail** (`/blog/[slug]`) | DB-driven | 1,500 | UNKNOWN | Depends on actual post content quality. |
| **Documentation** (`/documentacion`) | ~3,000+ | N/A | STRONG | Most substantive content on the site. |
| **Privacy / Terms / RGPD** | ~1,500+ each | N/A | ADEQUATE | Legal content is thorough. |
| **Changelog** | ~500+ | N/A | ADEQUATE | Shows product activity. |

### Thin Content Risk Summary

**14 feature landing pages** and **~20 industry template pages** represent approximately 34 programmatically generated pages. While each follows a structured template, they risk being flagged as "scaled content" under the September 2025 QRG if:
- The text within each section is too short (currently 1-3 sentences per block).
- The page structure is identical across all pages (it is: hero > problem > solution > steps > FAQ > CTA).
- No unique media, screenshots, or interactive elements differentiate pages.

**Recommendation:** Expand the prose on feature and template detail pages to at least 800 words each. Add unique content per page (actual product screenshots for features, downloadable PDF templates for industry pages).

---

## 4. Readability Assessment

**Language:** Spanish
**Estimated Flesch-Szigriszt readability:** 65-75 (Fairly Easy to Normal)

**Positive signals:**
- Short sentences throughout (mostly under 20 words).
- Simple vocabulary appropriate for SME business owners.
- Good use of bold text for emphasis.
- Bullet points and lists used extensively.
- Section headings are clear and descriptive.

**Issues:**
- Several instances of untranslated English jargon: "deals", "follow-up", "pipeline", "CPQ", "CRM", "CSV", "SSO/SAML", "SLA". While some are industry-standard, an SME audience in Spain may not understand all of these.
- Missing accent marks in blog page content: "Articulos" should be "Articulos" (actually should be "Art\u00edculos"), "Proximamente" should be "Pr\u00f3ximamente", "automatizacion" should be "automatizaci\u00f3n". These appear in the blog index page and reduce perceived quality.
- The FAQ answers are dense single paragraphs that could benefit from line breaks.

**Recommendation:**
1. Fix accent marks throughout (search for missing tildes on common words).
2. Add a glossary or inline explanations for English SaaS terms.
3. Break up FAQ answers longer than 3 sentences into shorter paragraphs.

---

## 5. AI Citation Readiness

**Score: 71 / 100**

AI search engines (Google AI Overviews, ChatGPT Browse, Perplexity) favor content that is:

### What the site does well:
- **Structured data:** SoftwareApplication, Organization, WebSite, BreadcrumbList, FAQPage, CollectionPage, Article, and Blog schemas are all properly implemented. This is above average.
- **Clear hierarchy:** H1 > H2 > H3 heading structure is consistent across all pages.
- **Quotable facts:** Pricing is clearly stated (0 EUR, 29 EUR/month, 79 EUR/month). Feature lists are explicit. This makes it easy for AI to extract and cite.
- **robots.txt allows AI crawlers:** GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and Applebot-Extended are all explicitly permitted on public pages.
- **Canonical URLs:** Every page has `alternates.canonical` set correctly.

### What is missing:
- **No definitive statements that AI would want to cite.** The content is marketing copy, not informational. AI search engines are more likely to cite a page that says "CPQ software automates the configure-price-quote process for B2B sales teams" than one that says "Cotizaciones inteligentes con IA para PYMEs."
- **No original data or statistics.** AI search engines heavily favor pages with unique, citable data points.
- **Empty blog.** Blog posts with educational content ("What is CPQ?", "How to automate quotes for SMEs") would be the primary vector for AI citations.
- **FAQPage schema removed from homepage FAQ** (comment in code: "Google restricted to gov/health since Aug 2023"). While this is correct for Google rich results, the FAQ structured data is still valuable for AI citation extraction. Consider keeping the JSON-LD even without expecting Google rich results.
- **No "What is CPQ?" or glossary-style content** that would serve as a definitive reference for AI to cite.

**Recommendation:**
1. Create a definitive "What is CPQ" guide page (2,000+ words) targeting AI citation.
2. Add a glossary page for CPQ/sales terminology in Spanish.
3. Publish blog content with original data, comparisons, and how-to guides.
4. Consider restoring FAQPage schema on the homepage for AI consumption (even if Google won't show rich results).

---

## 6. Content Uniqueness Assessment

**Risk Level: MEDIUM**

### Positive signals:
- Feature page content in `/data/features.ts` contains specific, detailed text (e.g., "El detector de duplicados compara RFC, email y nombre de empresa") that is unlikely to match other sites.
- Industry template content includes realistic quote examples with Spanish-market pricing (EUR, IVA 21%).
- The Forge AI showcase is product-specific and not generic.

### Concerns:
- The 14 feature pages follow an identical template structure. While the content within is unique per page, the repetitive skeleton (3 problem points, 4 solution points, 3 steps, 3-4 FAQs) could trigger duplicate/template detection.
- The ~20 industry template pages similarly follow one template. The ICP persona structure (`cargo`, `empresaTipo`, `dolor`, `cita`) is a clear programmatic pattern.
- Marketing phrases are repeated across multiple pages: "Sin tarjeta de credito", "Empieza gratis", "en minutos", "profesionales". While normal for SaaS, the high frequency across 34+ programmatic pages could dilute perceived uniqueness.
- The guide page (`/guia`) uses common sales statistics without attribution, which both reduces E-E-A-T and makes the content less distinguishable.

### AI-Generated Content Quality Check (Sept 2025 QRG):

| Marker | Present? | Severity |
|--------|----------|----------|
| Generic phrasing, lack of specificity | Partially | Medium -- Feature descriptions are specific, but CTAs and section headers are generic |
| No original insight or unique perspective | Yes | High -- No content offers a viewpoint that only DealForge could provide |
| No first-hand experience signals | Yes | High -- See Experience section above |
| Factual inaccuracies | Minor | Low -- "Mexico" keyword in Spain-targeted feature page |
| Repetitive structure across pages | Yes | High -- All feature pages and all template pages follow identical layouts |

**Recommendation:** Add at least one unique content block per programmatic page (e.g., an "Expert tip" callout, a related blog post, a product screenshot specific to that feature, or a comparison table with alternatives).

---

## 7. Heading Structure & Keyword Usage

### Homepage Heading Hierarchy:

```
H1: Cotizaciones inteligentes con IA para PYMEs
  H2: El proceso de cotizaciones esta roto
  H2: Conoce a Forge, tu asistente comercial
  H2: Todo lo que necesitas para cotizar mejor
  H2: Empieza en 3 pasos
  H2: Planes pensados para PYMEs
  H2: Preguntas frecuentes
  H2: Empieza a cotizar mas rapido hoy
```

**Assessment:** Clean single-H1 structure with logical H2 progression. Good.

### Feature Page Heading Hierarchy (each):

```
H1: [Feature title -- e.g., "Gestion de Clientes para PYMEs | CRM integrado..."]
  H2: [Problem title]
  H2: [Solution title]
  H2: Como funciona
    H3: [Step titles]
  H2: Preguntas frecuentes
    H3: [FAQ questions]
  H2: Empieza a usar [feature] hoy
```

**Assessment:** Well-structured. However, the H1 tags include pipe-separated titles that are very long (e.g., "Gestion de Clientes para PYMEs | CRM integrado en tu CPQ -- DealForge"). H1 should be shorter and more readable; the full SEO title belongs in the `<title>` tag.

### Keyword Optimization:

**Primary target keywords identified:**
- "CPQ" / "CPQ PYMEs" -- present in homepage H1 and meta title
- "cotizaciones" -- heavily used throughout
- "software cotizaciones" -- in meta keywords but not in headings
- "Forge IA" -- branded term, well-represented

**Issues:**
- The homepage H1 does not contain the word "CPQ" directly -- it says "Cotizaciones inteligentes con IA para PYMEs" while the meta title says "CPQ Inteligente con IA para PYMEs". This is a missed opportunity for alignment.
- "Configure Price Quote" (the English expansion of CPQ) appears only in meta keywords, never in visible content. Spanish users searching for the English term will not find matching on-page content.
- Industry template pages target long-tail keywords well (e.g., "cotizacion construccion", "presupuesto obra") but the parent page `/plantilla-cotizacion` is too thin to rank for "plantilla cotizacion."

**Recommendation:**
1. Include "CPQ" in the homepage H1 or in the first visible paragraph.
2. Add a brief explanation of "CPQ (Configure, Price, Quote)" early on the homepage for both user understanding and keyword coverage.
3. Expand the `/plantilla-cotizacion` index page with explanatory content about what a quote template should include.

---

## 8. Meta Titles & Descriptions

| Page | Meta Title | Length | Meta Description | Length | Verdict |
|------|-----------|--------|-----------------|--------|---------|
| Homepage | "DealForge - CPQ Inteligente con IA para PYMEs \| Cotizaciones en Minutos" | 72 chars | "DealForge es el sistema CPQ con inteligencia artificial que automatiza cotizaciones para PYMEs..." | 196 chars | Title slightly over 60 char ideal. Description good but long (may truncate). |
| `/funcionalidades` | "Funcionalidades -- DealForge" | 29 chars | "Descubre todas las funcionalidades de DealForge: cotizaciones CPQ, catalogo de productos..." | 162 chars | Title too short and generic. Should include primary keyword. |
| `/funcionalidades/[slug]` | "[Feature titulo] \| DealForge" | Varies | Feature `descripcion` field | Varies | Good -- dynamic and specific. |
| `/plantilla-cotizacion` | "Plantillas de Cotizacion por Sector -- DealForge" | 50 chars | "Plantillas de cotizacion profesionales para mas de 20 sectores..." | 144 chars | Good length and keyword coverage. |
| `/blog` | "Blog -- DealForge" | 18 chars | "Articulos sobre ventas, CPQ, automatizacion comercial..." | 133 chars | Title too short. Missing accent on "Articulos". |
| `/guia` | "Guia Gratis: 5 Errores en tus Cotizaciones que te Hacen Perder Ventas -- DealForge" | 84 chars | Appropriate | 144 chars | Title is too long (84 chars). Will be truncated in SERPs. |
| `/contacto` | "Contacto -- DealForge" | 22 chars | "Contacta con DealForge. Solicita una demo..." | 118 chars | Acceptable for a contact page. |
| `/documentacion` | "Documentacion -- DealForge" | 27 chars | Very long (>160 chars) | 185 chars | Description too long. |

**Key Issues:**
1. The root layout `<title>` template is `%s | DealForge`, but individual pages use inconsistent separators ("--" vs "|").
2. Missing accent marks in several meta descriptions ("Articulos", "automatizacion").
3. The homepage title at 72 characters will likely be rewritten by Google.
4. The `/guia` title at 84 characters will definitely be truncated.

**Recommendation:**
1. Standardize title separator to `|` across all pages.
2. Keep all titles under 60 characters.
3. Keep all descriptions between 120-155 characters.
4. Fix accent marks in all meta content.

---

## 9. Internal Linking Quality

### Linking Structure:

**Homepage outbound internal links:**
- `/registro` (multiple CTAs -- 3 instances)
- `/login` (1 instance in navbar)
- `/funcionalidades/[slug]` (14 feature cards)
- `/contacto` (1 instance for Enterprise plan)
- `/blog`, `/documentacion`, `/changelog` (footer)
- `/privacidad`, `/terminos`, `/rgpd` (footer)
- `#funcionalidades`, `#forge`, `#precios`, `#faq` (anchor links in navbar)

**Positive signals:**
- The homepage links to all 14 feature detail pages via the features grid.
- Feature detail pages include breadcrumbs (Inicio > Funcionalidades > [Feature]).
- Industry template pages include breadcrumbs (Inicio > Plantillas > [Industry]).
- Blog post pages include breadcrumbs (Inicio > Blog > [Post]).
- Footer provides consistent navigation to key sections.

**Issues:**
1. **No cross-linking between feature pages.** Each `/funcionalidades/[slug]` page links to `/funcionalidades` (parent) and `/registro`, but never to related features. For example, "Firma Electronica" should link to "Gestion de Contratos" and vice versa.
2. **No cross-linking between industry template pages.** Each template page is isolated; related industries are not suggested.
3. **No links from the homepage to the blog, guide, or template pages.** The blog is only accessible from the footer. The `/guia` and `/plantilla-cotizacion` pages have zero inbound links from the homepage.
4. **Feature index page (`/funcionalidades`) is not linked from the main navbar.** The navbar links to `#funcionalidades` (an anchor on the homepage) instead of `/funcionalidades`.
5. **The contact page links to `/documentacion`, `/blog`, and `/#faq` but not to specific feature pages** where users might find answers to their questions.
6. **No contextual internal links within content blocks.** The feature page descriptions and FAQ answers are plain text without links to other relevant pages.
7. **Blog post CTA is generic** -- always links to `/registro` rather than to related feature pages or other blog posts.

### Internal Link Distribution (estimated):

| Page | Inbound Internal Links |
|------|----------------------|
| `/registro` | 15+ (every CTA on every page) |
| Homepage (`/`) | 10+ (logos, breadcrumbs) |
| `/funcionalidades/[slug]` | 1 each (homepage grid only) |
| `/plantilla-cotizacion/[slug]` | 1 each (template index only) |
| `/blog` | 2 (footer + contact page) |
| `/guia` | 0 from main pages |
| `/plantilla-cotizacion` | 0 from homepage |

**Recommendation:**
1. Add a "Related features" or "You might also like" section to each feature detail page, linking to 2-3 related features.
2. Add a "Related industries" section to each template page.
3. Link to `/funcionalidades`, `/plantilla-cotizacion`, `/blog`, and `/guia` from the homepage (not just the footer).
4. Add the blog and features index to the main navbar.
5. Add contextual links within FAQ answers and feature descriptions (e.g., when mentioning "firma electronica" in the contracts page, link to `/funcionalidades/firma-electronica`).
6. Add "Recommended reading" links at the end of blog posts to related feature pages and other blog posts.

---

## 10. Priority Action Items

### P0 -- Legal Compliance (Immediate)

1. Add CIF/NIF, full registered address, and "Aviso Legal" page (LSSI-CE requirement).
2. Implement cookie consent banner (LSSI + RGPD requirement).
3. Add data processing consent checkbox to the contact form.

### P1 -- Critical E-E-A-T Gaps (Next 2 Weeks)

4. Add real product screenshots to the homepage (replace CSS mockup).
5. Create an "Sobre nosotros" / team page with founder credentials.
6. Add at least 3 customer testimonials with names and companies (or beta user quotes).
7. Fix missing accent marks across all meta descriptions and visible content.
8. Fix "Mexico" keyword reference in `features.ts` (line 107: should target Spain).

### P2 -- Content Depth (Next 4 Weeks)

9. Expand feature detail pages to 800+ words each (currently ~400-600).
10. Expand industry template pages to 800+ words each (currently ~500-700).
11. Publish at least 5 blog posts targeting informational queries ("Que es CPQ", "Como hacer una cotizacion profesional", "Errores comunes en presupuestos").
12. Create a definitive "Que es un CPQ" pillar page (2,000+ words) for AI citation.
13. Add unique content elements per programmatic page to differentiate them.

### P3 -- Internal Linking & Structure (Next 4 Weeks)

14. Add cross-links between related feature pages.
15. Add cross-links between related industry template pages.
16. Link to `/funcionalidades`, `/plantilla-cotizacion`, `/blog`, and `/guia` from the homepage body (not just footer).
17. Add contextual links within FAQ answers and content blocks.
18. Add blog and features to the main navbar.

### P4 -- Authority Building (Ongoing)

19. Populate `sameAs` in Organization schema with social media profiles.
20. Create linkable assets (CPQ ROI calculator, downloadable templates).
21. Register on G2, Capterra, and GetApp.
22. Pursue guest posts or PR mentions in Spanish SaaS/business publications.

---

## Appendix: Files Analyzed

- `/c/Nexus/src/app/page.tsx` -- Homepage
- `/c/Nexus/src/app/layout.tsx` -- Root layout (meta, structured data)
- `/c/Nexus/src/app/(public)/funcionalidades/page.tsx` -- Features index
- `/c/Nexus/src/app/(public)/funcionalidades/[slug]/page.tsx` -- Feature detail template
- `/c/Nexus/src/app/(public)/plantilla-cotizacion/page.tsx` -- Template index
- `/c/Nexus/src/app/(public)/plantilla-cotizacion/[slug]/page.tsx` -- Template detail
- `/c/Nexus/src/app/(public)/blog/page.tsx` -- Blog index
- `/c/Nexus/src/app/(public)/blog/[slug]/page.tsx` -- Blog post detail
- `/c/Nexus/src/app/(public)/guia/page.tsx` -- Lead magnet guide
- `/c/Nexus/src/app/(public)/contacto/page.tsx` -- Contact page
- `/c/Nexus/src/app/_landing/navbar.tsx` -- Navigation
- `/c/Nexus/src/app/_landing/forge-showcase.tsx` -- AI assistant demo
- `/c/Nexus/src/app/_landing/faq-accordion.tsx` -- FAQ component
- `/c/Nexus/src/app/robots.ts` -- Robots configuration
- `/c/Nexus/src/app/sitemap.ts` -- Sitemap generation
- `/c/Nexus/src/data/features.ts` -- Feature page data (14 features, 1235 lines)
- `/c/Nexus/src/data/industrias.ts` -- Industry template data (~20 industries, 1799 lines)
- `/c/Nexus/src/app/(legal)/privacidad/page.tsx` -- Privacy policy
- `/c/Nexus/src/app/(legal)/changelog/page.tsx` -- Changelog
- `/c/Nexus/src/app/(legal)/documentacion/page.tsx` -- Documentation
