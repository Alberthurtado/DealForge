# SEO Content Quality & E-E-A-T Audit -- dealforge.es

**Audit date:** 2026-03-18
**Auditor:** Content Quality Specialist (Google Sept 2025 QRG framework)
**Site type:** B2B SaaS (CPQ tool) targeting Spanish-speaking SMBs
**Current indexation:** Zero Google indexation; "Deceptive pages" flag active

---

## Executive Summary

**Overall Content Quality Score: 42/100**

DealForge has solid technical SEO scaffolding (structured data, robots.txt, sitemap, canonical tags) and genuinely useful documentation content. However, the site suffers from **critical trust signal deficiencies** that almost certainly explain the "Deceptive pages" classification and zero indexation. The primary issues are: (1) no verifiable legal entity behind the site, (2) fabricated social proof statistics, (3) inconsistent legal page URLs pointing to a Vercel staging domain, and (4) blog author attribution to an organization rather than a person. These are exactly the signals Google's Quality Raters are trained to flag under the "Deceptive" category in the September 2025 QRG.

---

## Page-by-Page Analysis

### 1. Homepage (/)

**Content Quality Score: 48/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~650 (visible text, excluding FAQ) | Meets 500-word homepage minimum |
| With FAQ section | ~1,400 | Good topical coverage |
| Readability | Accessible, short sentences, B2B appropriate | Good |
| Keyword density | Natural; "CPQ", "cotizaciones", "PYMEs", "IA" well distributed | Good |
| H1 | "Cotizaciones inteligentes con IA para PYMEs" | Strong, keyword-rich |

**Strengths:**
- Well-structured page with clear sections: Hero, Problem, Forge Showcase, Features, How It Works, Pricing, FAQ, CTA
- SoftwareApplication + HowTo + FAQPage structured data (3 schemas)
- 10 FAQ items with FAQPage schema -- good for AI citation and rich results
- Pricing transparency with 4 tiers clearly laid out
- OpenGraph and Twitter Card metadata present

**Critical Issues:**

1. **Fabricated statistics with no attribution (DECEPTIVE SIGNAL)**
   - "500+ Cotizaciones creadas" -- for a brand-new product with zero indexation, this is unverifiable
   - "95% Menos tiempo" -- no study, no methodology, no source
   - "3x Mas conversiones" -- completely unsourced
   - The guide page repeats: "80% menos tiempo", "3x mas deals cerrados"
   - **QRG classification:** These unsourced performance claims on a site with no established reputation trigger "Deceptive pages" flags. Quality raters specifically check whether statistics have credible sources.

2. **No verifiable business entity**
   - No CIF/NIF registered on any public-facing page
   - No physical address anywhere on the site
   - No identifiable founders, team members, or company registration
   - The Organization schema has `"sameAs": []` -- empty, no social profiles
   - `"foundingDate": "2026"` -- the company was founded this year, yet claims 500+ quotations created

3. **No "About" page**
   - No /sobre-nosotros or /about page exists
   - No team page, no founder bios, no company story
   - For a B2B SaaS asking companies to input commercial data, this is a major trust gap

4. **Enterprise plan links to "#"**
   - The "Contactar" CTA for the Enterprise plan has `href="#"` -- a dead link. This is a functional quality issue and signals an unfinished product.

---

### 2. Blog Index (/blog)

**Content Quality Score: 35/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~80 (static text) | Thin content; relies entirely on dynamic posts |
| Blog schema | Present (Blog + BlogPosting array) | Good |
| Canonical | Present | Good |

**Issues:**
- If no blog posts are published (which can happen with dynamic DB content), the page renders a "Proximamente" placeholder -- this is thin content that could be indexed
- No category navigation or filtering
- No author pages or author bios anywhere
- Missing accent marks throughout static text: "Articulos" instead of "Articulos", "automatizacion" instead of "automatizacion" -- grammar quality signal

---

### 3. Blog Post: Como hacer cotizacion profesional (/blog/como-hacer-cotizacion-profesional-guia-completa)

**Content Quality Score: 58/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~1,350 | Below 1,500-word blog post minimum |
| Structure | H2 + H3 hierarchy, lists, checklist | Good |
| Readability | Conversational, clear, well-structured | Good |
| Article schema | Present with BreadcrumbList | Good |
| Meta title | Optimized with year "2026" | Good |
| Canonical | Present | Good |

**Strengths:**
- Natural, conversational tone that reads as genuinely written by someone with sales experience
- Good keyword coverage: "cotizacion", "presupuesto", "software de cotizaciones", "CPQ"
- Practical checklist section -- good AI citation format
- Logical flow: definition, elements, errors, tools, AI, checklist, conclusion
- CTA box at end is reasonable and not overly promotional

**Issues:**

1. **Author attribution is "DealForge" (organization, not a person)**
   - The Article schema lists author as `"@type": "Organization"` -- this is a significant E-E-A-T gap
   - Google's September 2025 QRG explicitly evaluates whether content authors have demonstrable expertise
   - No author bio, no author credentials, no author photo
   - This makes the content appear organization-published without individual accountability

2. **Below word count minimum**
   - At ~1,350 words, this falls short of the 1,500-word floor for blog posts
   - The topic "complete guide to professional quotations" warrants deeper coverage
   - Missing: real examples with numbers, case studies, industry-specific advice, template download

3. **Self-promotional bias without disclosure**
   - The article recommends DealForge as a solution without disclosing that it is published by DealForge
   - No "Disclaimer: This article is published by DealForge" notice
   - Quality raters flag promotional content masquerading as editorial

4. **No external citations**
   - "El 80% de las ventas requieren al menos 5 contactos de seguimiento" -- no source
   - No links to external authoritative sources
   - No research studies cited

---

### 4. Blog Post: Firma electronica en cotizaciones

**Content Quality Score: 62/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~1,800 | Above minimum |
| Legal references | eIDAS, Ley 6/2020, Codigo Civil | Good authority signals |
| Structure | Well-organized H2/H3, numbered lists | Good |

**Strengths:**
- Cites specific EU regulations (Regulation 910/2014 eIDAS) and Spanish law (Ley 6/2020) -- genuine expertise signal
- Distinguishes between simple, advanced, and qualified e-signatures -- shows understanding
- Practical comparison of approval vs. signature workflows
- Error checklist at end -- good AI-quotable format

**Issues:**
- Same author attribution problem (organization, not person)
- Same self-promotion without disclosure
- "Segun el Reglamento eIDAS" -- good, but no hyperlink to the actual regulation

---

### 5. Guide Landing Page (/guia)

**Content Quality Score: 40/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~450 | Thin for a standalone landing page |
| Schema | WebPage with embedded FAQPage | Good |
| Lead form | Present (email capture for PDF download) | Expected for lead magnet |

**Issues:**

1. **Fabricated statistics repeated**
   - "El 50% de los deals se los lleva quien responde primero" -- no source
   - "El 80% de las ventas requieren al menos 5 follow-ups" -- no source
   - "80% menos tiempo creando cotizaciones" -- no source

2. **Misuse of FAQPage schema**
   - The page uses FAQPage schema inside a lead magnet landing page
   - The "questions" are promotional talking points, not genuine user FAQs
   - This could be flagged as structured data misuse

3. **Thin content**
   - Most of the page is the 5 error teasers (short descriptions) + a lead form
   - Below 500-word threshold for a substantive landing page

---

### 6. Documentation (/documentacion)

**Content Quality Score: 72/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~5,500+ | Comprehensive |
| Structure | 12 major sections with 40+ subsections | Excellent |
| Table of contents | Yes (sidebar with anchor links) | Good |
| Step-by-step instructions | Yes, with numbered steps | Excellent |

**Strengths:**
- This is the strongest content on the site
- Genuinely useful, detailed product documentation
- Covers 12 major areas: setup, dashboard, clients, products, quotations, PDFs, rules, approvals, reports, integrations, Forge AI
- Includes practical details: SMTP configuration for Gmail/Outlook/Yahoo, CSV import formats, rule types
- Tips and warnings throughout add genuine value
- Contextual help for every feature

**Issues:**
- No metadata description for the page beyond the basic one
- Missing canonical tag (not in the alternates list)
- Could benefit from search functionality within docs
- No versioning or "last updated" date

---

### 7. Privacy Policy (/privacidad)

**Content Quality Score: 65/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~2,200 | Comprehensive for a privacy policy |
| RGPD compliance | 13 sections covering all RGPD requirements | Good |
| Last updated | "9 de marzo de 2026" | Recent |

**Strengths:**
- Comprehensive 13-section privacy policy covering all RGPD articles
- Data processor table (Supabase, Vercel, Stripe, Anthropic) with locations and guarantees
- Legal basis table mapping treatments to RGPD articles
- AEPD supervisory authority reference with address
- Cookie policy stating only essential cookies -- transparent

**Critical Issues:**

1. **Vercel staging URL in legal page (DECEPTIVE SIGNAL)**
   - Line 50: `"Sitio web: deal-forge-omega.vercel.app"` -- this is a staging/deployment URL, not the production domain
   - This directly contradicts the canonical domain `dealforge.es` used everywhere else
   - Google Quality Raters seeing `vercel.app` in a legal entity identification section will flag this as a site that is not what it claims to be
   - **This is likely a contributing factor to the "Deceptive pages" classification**

2. **No CIF/NIF, no physical address, no legal representative name**
   - Spanish LSSI-CE (Ley 34/2002, Art. 10) requires: company name, CIF, registered address, and trade registry details
   - The privacy policy identifies the controller simply as "DealForge" -- this is not a legal entity name
   - Missing: registered company name, CIF/NIF, physical registered address

3. **DPD (Data Protection Officer) contact is the same generic email**
   - DPD listed as `info@dealforge.es` -- same as general contact
   - Not necessarily invalid, but looks templated

---

### 8. Terms of Service (/terminos)

**Content Quality Score: 63/100**

| Metric | Value | Assessment |
|--------|-------|------------|
| Estimated word count | ~3,200 | Comprehensive |
| Legal framework | LSSI-CE, RGPD, LOPD-GDD, Codigo Civil, Codigo Comercio | Good |
| Sections | 20 sections | Thorough |

**Strengths:**
- Comprehensive 20-section terms covering all major areas
- Explicit AI disclaimer for Forge (Section 10)
- Consumer protection rights (14-day withdrawal period per RDL 1/2007)
- ODR platform reference (EU Regulation 524/2013)
- Clear plan comparison table

**Critical Issues:**

1. **Same Vercel staging URL** -- `deal-forge-omega.vercel.app` in the provider identification
2. **Same missing legal entity data** -- no CIF, no address, no trade registry
3. **Plan features mismatch between homepage and terms**
   - Homepage Starter: "10 cotizaciones/mes, 5 clientes, 10 productos"
   - Terms Starter: "Hasta 50 cotizaciones/mes, 25 productos"
   - This inconsistency is a trust-damaging error

---

## E-E-A-T Breakdown

### Experience: 22/100 (Weight: 20%)

| Signal | Present | Notes |
|--------|---------|-------|
| First-hand product usage examples | No | Dashboard mockup is static, not real screenshots |
| Customer testimonials | No | Zero testimonials or reviews |
| Case studies | No | No customer success stories |
| Real screenshots/videos | No | Only CSS mockups of the dashboard |
| Author with stated experience | No | "DealForge" organization author only |
| User-generated content | No | No community, no comments |

**Assessment:** The site has virtually no first-hand experience signals. There is no evidence that real customers have used this product. The statistics ("500+ cotizaciones creadas", "3x mas conversiones") are unattributable. For a brand new SaaS in 2026 with zero indexation, these claims actively damage trust rather than build it.

### Expertise: 45/100 (Weight: 25%)

| Signal | Present | Notes |
|--------|---------|-------|
| Technical accuracy | Mostly | Blog posts cite correct EU regulations |
| Domain knowledge | Yes | Documentation shows deep product knowledge |
| Author credentials | No | No identifiable expert authors |
| Depth of content | Mixed | Docs excellent; blog below minimum; homepage adequate |
| Industry-specific insights | Limited | Generic sales advice, no CPQ-specific expertise demonstrated |

**Assessment:** The documentation demonstrates genuine technical expertise in CPQ software. The e-signature blog post shows knowledge of eIDAS and Spanish law. However, the complete absence of identifiable experts or authors prevents this expertise from being attributed to any person.

### Authoritativeness: 12/100 (Weight: 25%)

| Signal | Present | Notes |
|--------|---------|-------|
| External citations/backlinks | No | Zero indexation implies zero backlinks |
| Mentions on other sites | No | No evidence of external recognition |
| Industry awards or recognition | No | None |
| Social media presence | No | `sameAs: []` -- empty |
| Third-party reviews (G2, Capterra) | No | None found |
| Author authority in field | No | No identifiable authors |
| Press coverage | No | None |
| Wikipedia or knowledge panel | No | None |

**Assessment:** The site has zero external authority signals. No social media profiles, no third-party reviews, no press coverage, no external links, no indexation. For a B2B SaaS, this is the single largest gap. Google cannot verify any authority claims.

### Trustworthiness: 18/100 (Weight: 30%)

| Signal | Present | Notes |
|--------|---------|-------|
| HTTPS | Yes | Standard for Vercel deployments |
| Privacy policy | Yes | Comprehensive RGPD-compliant |
| Terms of service | Yes | Comprehensive |
| Contact information | Partial | Email only; no phone, no address, no form |
| Legal entity identification | **No** | No CIF, no registered address, no legal name |
| Consistent domain in legal pages | **No** | `deal-forge-omega.vercel.app` in Privacy + Terms |
| Transparent statistics | **No** | Fabricated/unsourced numbers |
| Refund policy | Yes | 14-day withdrawal period documented |
| Cookie consent | N/A | Only essential cookies -- stated transparently |
| AEPD reference | Yes | Correct address and phone |
| Stripe PCI DSS | Yes | Payment security documented |

**Assessment:** This is the most critical failure area and the most likely cause of the "Deceptive pages" flag. Despite having well-written legal pages, the site fails the most basic trust test: **who is behind this?** No legal entity name, no CIF/NIF, no physical address, no identifiable humans. The Vercel staging URL in legal pages creates a direct contradiction with the `dealforge.es` domain. Unsourced statistics on a new site with no track record are a classic deception signal.

---

## AI Citation Readiness Score: 55/100

| Factor | Score | Notes |
|--------|-------|-------|
| Quotable facts with sources | 20/100 | Statistics exist but none are sourced |
| Structured data quality | 75/100 | Multiple schema types, well-implemented |
| Clear content hierarchy | 80/100 | Good H1-H3 structure across all pages |
| FAQ schema | 85/100 | 10 FAQs on homepage, 3 on guide page |
| Definition-style content | 60/100 | Blog explains CPQ, e-signatures; could be more definition-focused |
| Lists and tables | 70/100 | Good use throughout docs and legal pages |
| Freshness signals | 45/100 | Legal pages dated; blog posts undated in seed |

**What AI systems would cite:**
- The FAQ answers are well-structured and quotable
- The e-signature blog post's legal framework section (eIDAS, Ley 6/2020)
- The documentation's step-by-step instructions
- Pricing information (well-structured schema)

**What prevents citation:**
- No external validation of claims
- Organization-level authorship (no person to attribute to)
- No hyperlinks to authoritative sources for statistics

---

## Content Freshness Assessment

| Page | Last Updated Signal | Assessment |
|------|-------------------|------------|
| Homepage | None | No date visible |
| Blog posts | `publishedAt: new Date()` (dynamic) | Date shown in UI but set at seed time |
| Guide | None | No date visible |
| Documentation | None | No "last updated" signal |
| Privacy | "9 de marzo de 2026" | Current |
| Terms | "9 de marzo de 2026" | Current |

---

## Thin Content Detection

| Page | Status | Detail |
|------|--------|--------|
| Blog index with 0 posts | THIN | Renders "Proximamente" with ~30 words of content |
| Guide landing | BORDERLINE | ~450 words; mostly teaser content for a PDF download |
| Blog post 1 | BORDERLINE | ~1,350 words vs. 1,500 minimum |
| Blog post 2 | OK | ~1,800 words |
| Homepage | OK | ~1,400 words with FAQ |
| Documentation | STRONG | ~5,500+ words |
| Privacy | OK | ~2,200 words |
| Terms | OK | ~3,200 words |

---

## AI-Generated Content Assessment (Sept 2025 QRG Criteria)

The blog content shows markers of **human-guided AI generation** -- which is acceptable under current guidelines IF it demonstrates genuine E-E-A-T. Specific observations:

**Positive signals (suggest human editing):**
- Conversational Spanish tone with colloquial expressions ("Seamos honestos", "las cuentas hablan solas")
- Practical, specific advice rather than generic filler
- Correct legal citations (eIDAS regulation number, specific Spanish laws)
- Product-specific knowledge woven naturally into content

**Concerning signals:**
- Repetitive article structure across both blog posts (intro problem, numbered lists, tool comparison, checklist, conclusion)
- Both articles follow identical templated patterns
- Some generic phrasing in feature descriptions on homepage ("Base de datos completa con contactos, historial y segmentacion por sector")
- Placeholder-like quality in some feature descriptions

**Assessment:** The content quality itself is acceptable and would not be flagged as low-quality AI content in isolation. The trust and authority failures are far more damaging than any content quality issues.

---

## Priority Recommendations

### P0 -- Critical (Likely causing "Deceptive pages" flag)

1. **Add verifiable legal entity information to ALL legal pages**
   - Register the business (or add existing registration details)
   - Add CIF/NIF, registered business name, physical address to Privacy, Terms, and RGPD pages
   - This is legally required under LSSI-CE Art. 10 for operating in Spain

2. **Replace `deal-forge-omega.vercel.app` with `dealforge.es` in Privacy and Terms pages**
   - Files: `src/app/(legal)/privacidad/page.tsx` line 50
   - Files: `src/app/(legal)/terminos/page.tsx` line 57
   - The staging domain in legal identification sections is a direct trust violation

3. **Remove or properly source ALL statistics**
   - Either cite a credible source for every number, or remove them entirely
   - "500+ Cotizaciones creadas" -- remove if not verifiable
   - "95% Menos tiempo" / "3x Mas conversiones" -- remove or qualify as "up to" with methodology
   - "80% menos tiempo" on guide page -- same treatment
   - "El 50% de los deals..." / "El 80% de las ventas..." in blog -- cite Harvard Business Review, InsideSales.com, or similar

4. **Fix pricing inconsistency between homepage and Terms**
   - Homepage Starter: 10 cot/mes, 5 clients, 10 products
   - Terms Starter: 50 cot/mes, 25 products
   - These must match exactly

### P1 -- High (Trust and E-E-A-T gaps)

5. **Create an About page (/sobre-nosotros)**
   - Include founder/team names, photos, and professional backgrounds
   - State company mission and founding story
   - Link to LinkedIn profiles (and populate `sameAs` in Organization schema)

6. **Add real human authors to blog posts**
   - Change author from Organization to Person in Article schema
   - Add author bio section with credentials and photo to each post
   - Create author pages if more than one writer

7. **Add contact page with physical address and phone number**
   - Currently only `info@dealforge.es` exists as contact
   - Add a proper contact form, phone number, and physical address
   - A B2B SaaS handling commercial data needs more than an email

8. **Fix Enterprise plan dead link**
   - `href="#"` on the Enterprise "Contactar" button must link to a real contact method

9. **Add canonical tags to pages that are missing them**
   - Documentation, Privacy, Terms, RGPD, Changelog lack canonical alternates

### P2 -- Medium (Content quality improvements)

10. **Expand blog post 1 to 1,500+ words minimum**
    - Add real examples with actual numbers
    - Add industry-specific variations (services vs. products)
    - Include a downloadable template reference

11. **Add external authoritative links to blog content**
    - Link to BOE for eIDAS transposition
    - Link to AEPD guidance documents
    - Link to EU eIDAS regulation text

12. **Expand guide landing page content to 600+ words**
    - Add more preview content from the actual guide
    - Include a partial table of contents of the PDF

13. **Add "last updated" dates to documentation page**

14. **Fix missing accent marks in blog index page**
    - "Articulos" should be "Articulos" (with accent on the 'i')
    - "automatizacion" needs accent
    - Multiple instances across the blog page static text

15. **Add social media profiles and populate `sameAs` in Organization schema**
    - Create LinkedIn company page, Twitter/X account minimum
    - Add URLs to schema

### P3 -- Low (Polish and optimization)

16. **Add third-party trust badges when available**
    - Stripe verification badge
    - Register on G2/Capterra and solicit early reviews
    - Consider SOC2 or similar compliance certification

17. **Add a changelog link to the homepage navigation**
    - Currently only in footer; shows product actively maintained

18. **Consider adding a comparison page** (vs. Excel, vs. other CPQ tools)
    - Delegate to `seo-competitor-pages` sub-skill for content standards

19. **Add hreflang tags if targeting multiple Spanish-speaking markets**
    - Currently `es_ES` locale only; consider `es` generic

---

## Summary of Scores

| Metric | Score |
|--------|-------|
| **Overall Content Quality** | **42/100** |
| Experience | 22/100 |
| Expertise | 45/100 |
| Authoritativeness | 12/100 |
| Trustworthiness | 18/100 |
| **Weighted E-E-A-T** | **23.6/100** |
| AI Citation Readiness | 55/100 |

**Weighted E-E-A-T calculation:**
(22 x 0.20) + (45 x 0.25) + (12 x 0.25) + (18 x 0.30) = 4.4 + 11.25 + 3.0 + 5.4 = **24.05/100**

---

## Root Cause Analysis: "Deceptive Pages" Flag

Based on this audit, the "Deceptive pages" classification most likely stems from the combination of:

1. **No verifiable legal entity** -- The site operates under a brand name ("DealForge") with no registered company, CIF, or physical address disclosed. For a B2B SaaS operating in the EU/Spain and claiming RGPD compliance, this is a fundamental credibility failure.

2. **Inconsistent domain identity** -- Legal pages reference `deal-forge-omega.vercel.app` while the site operates on `dealforge.es`. This makes the site appear to be misrepresenting its identity.

3. **Unsourced performance claims** -- Statistics like "500+ cotizaciones creadas" and "3x mas conversiones" on a brand-new, unindexed site are classic deception patterns that Quality Raters are specifically trained to identify.

4. **Zero external validation** -- No backlinks, no social presence, no reviews, no press. Google has no third-party signals to corroborate any claims made on the site.

Addressing P0 items 1-4 should be the immediate priority before requesting reconsideration or submitting a new Search Console verification.

---

*Audit generated following Google September 2025 Quality Rater Guidelines framework. Content minimums are topical coverage floors, not ranking factors.*
