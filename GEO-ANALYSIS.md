# GEO Analysis — DealForge (dealforge.es / /en)

**Generative Engine Optimization audit · February 2026**
Scope: codebase inspection (Next.js 16 App Router) + production page fetches. Bilingual ES (`/`) + EN (`/en`).

---

## 1. GEO Readiness Score: **69 / 100**

| Criterion | Weight | Score | Notes |
|-----------|--------|-------|-------|
| Citability | 25% | 19/25 | Strong definitions, self-contained blocks, Q-headings; stats often vaguely sourced ("industry studies") |
| Structural readability | 20% | 18/20 | Clean H1→H2→H3, question headings, lists, tables, FAQ blocks |
| Multi-modal content | 15% | 6/15 | **Weakest area** — blog posts have no images/charts/video; only the home walkthrough is interactive |
| Authority & brand signals | 20% | 9/20 | Org schema + dates ✓, but **no named author/byline**, thin `sameAs`, no Wikipedia/Reddit/YouTube presence |
| Technical accessibility | 20% | 17/20 | SSR ✓, AI crawlers allowed ✓, llms.txt ✓, sitemap ✓; missing OAI-SearchBot + RSL |

---

## 2. Platform Breakdown

| Platform | Score | Why |
|----------|-------|-----|
| **Google AI Overviews** | 73/100 | Best-positioned: full SSR, rich JSON-LD (Article/FAQ/Breadcrumb/Org), clean structure, hreflang. Needs traditional ranking strength + more sourced stats. |
| **ChatGPT (web search)** | 62/100 | Entity signals thin. ChatGPT leans on Wikipedia (47.9%) + authoritative sources — DealForge has neither yet. llms.txt helps. |
| **Perplexity** | 57/100 | Perplexity leans heavily on Reddit (46.7%). Zero community footprint = low. Content quality is good but undiscovered socially. |

> Only ~11% of domains are cited by *both* ChatGPT and Google AIO for the same query. DealForge is currently a **Google-AIO-leaning** profile; ChatGPT/Perplexity require off-site entity work, not more on-page content.

---

## 3. AI Crawler Access Status

Source: [src/app/robots.ts](src/app/robots.ts) (dynamic `robots.txt`).

| Crawler | Status | |
|---------|--------|---|
| GPTBot | ✅ Allowed | |
| ChatGPT-User | ✅ Allowed | |
| ClaudeBot | ✅ Allowed | |
| anthropic-ai | ✅ Allowed | |
| PerplexityBot | ✅ Allowed | |
| Google-Extended | ✅ Allowed | |
| Applebot-Extended | ✅ Allowed | |
| Grok / Meta / FacebookBot / Cohere / CCBot | ✅ Allowed | |
| **OAI-SearchBot** | ❌ **Missing** | OpenAI's dedicated *search* bot — distinct from GPTBot. Add it. |

Private paths (`/api/`, dashboard, `/firmar/`, `/checkout/`…) are correctly disallowed for all bots. **Verdict: excellent, one gap (OAI-SearchBot).**

---

## 4. llms.txt Status

✅ **Present and well-structured** — [src/app/llms.txt/route.ts](src/app/llms.txt/route.ts). Bilingual, with description, audience, use-cases, pricing, key pages, FAQ.

Recommendations:
- Add the **English blog index** + 3-4 cornerstone posts (e.g. `what-is-cpq-how-it-works`, `how-to-create-professional-quote-complete-guide`) to the English page list — they're the most citable assets and aren't linked.
- Add a one-line `> ` summary under each cornerstone link (the format rewards per-link descriptions).
- Consider a separate `llms-full.txt` with expanded definitions for the CPQ/quoting glossary terms.

---

## 5. Brand Mention Analysis

Brand mentions correlate **3× more strongly** with AI visibility than backlinks (Ahrefs, Dec 2025). Current `sameAs` ([layout.tsx:94](src/app/layout.tsx)): **LinkedIn + X only**.

| Signal | Correlation | DealForge status |
|--------|-------------|------------------|
| YouTube mentions | ~0.737 (strongest) | ❌ Absent — highest-leverage gap |
| Reddit mentions | High | ❌ Absent — gates Perplexity |
| Wikipedia / Wikidata | High | ❌ Absent — gates ChatGPT |
| LinkedIn | Moderate | ✅ Present (in `sameAs`) |
| X / Twitter | Low–Moderate | ✅ Present |

This is the **single biggest lever** for ChatGPT/Perplexity visibility and is entirely off-site work — no code change fixes it.

---

## 6. Passage-Level Citability (optimal 134–167 words)

Verified live (HTTP 200, SSR-rendered):

**Strong, already-citable blocks:**
- `what-is-cpq-how-it-works` → "**CPQ stands for Configure, Price, Quote…**" — textbook definition pattern in the first 40 words. High extraction value.
- `how-to-calculate-profit-margins-in-quotes` → the **margin vs. markup** block with the formula `Sale price = Direct cost ÷ (1 - Target margin)` and a worked `$600 → $1,000` example. Self-contained, quotable, unique data.
- `security-company-quotes-guide` & `accounting-bookkeeping-service-quotes-guide` → price-range tables ($14–20/hr, £-converted to $) — tables are preferentially cited.

**Needs tightening:**
- Stat in `what-is-cpq-how-it-works`: *"According to industry studies… 7 times more likely to close"* — **attribute to a named source** (e.g. Harvard Business Review / InsideSales lead-response study) or AI engines will skip it.
- Several intros open with a narrative anecdote ("There's a scene that plays out…") before the answer. Add a **40–60 word direct answer** above the story for the H2 to be extractable.

---

## 7. Server-Side Rendering Check

✅ **Pass.** Next.js 16 App Router with server components. All public marketing/blog/resource pages render HTML server-side (confirmed: fetched `/en/pricing`, `/en/blog/*`, `/en/quote-template/*` all return full content + JSON-LD without JS execution). AI crawlers (which don't run JS) get the complete page.

The only client-only component on a key page is the **home hero walkthrough** (`"use client"`), but it's decorative — the textual value of `/en` is server-rendered around it. No action needed.

---

## 8. Top 5 Highest-Impact Changes

1. **Build entity presence (off-site).** Create a Wikidata item + seed authentic Reddit/YouTube mentions. Unlocks ChatGPT (Wikipedia-dependent) and Perplexity (Reddit-dependent) — the two platforms where DealForge currently scores lowest. *Highest impact, no code.*
2. **Add a named human author with credentials** to blog posts (replace `author: Organization "DealForge"` with a `Person` who has a bio + `sameAs` LinkedIn). Authority is a 20% criterion and currently the largest on-page deficit. → `src/data/blog-en.ts` + `src/app/en/blog/[slug]/page.tsx:96`.
3. **Add multi-modal elements to blog posts** (diagrams for the CPQ flow, charts for margin/price-range tables). +156% selection rate for multi-modal content; this is the weakest scored category (6/15).
4. **Source every statistic.** Replace "industry studies"/"according to studies" with named, linked sources. Converts weak citability signals into strong ones across the whole blog.
5. **Add `OAI-SearchBot` to robots.ts** and add cornerstone blog links to `llms.txt`. Five-minute fixes that close the two technical gaps.

---

## 9. Schema Recommendations (for AI discoverability)

Current coverage is strong: Organization + WebSite (global), Article + BreadcrumbList (blog), FAQPage + WebApplication + Offer (marketing). Gaps:

- **`Article.author` → `Person`** with `jobTitle`, `description`, `sameAs`. (Currently Organization — no E-E-A-T person signal.)
- **`HowTo` schema** on the procedural posts ("how to create a professional quote", "how to calculate margins") — these are step-by-step and HowTo is well-suited for AIO.
- **`SoftwareApplication` + `AggregateRating`/`Offer`** on `/en/pricing` and `/en/features` (you have WebApplication elsewhere; unify on the pricing page with the multi-currency offers now defaulting to USD).
- **`DefinedTerm` / `DefinedTermSet`** for the glossary (`/glosario`) — strong for definitional AI queries.
- **Expand global `sameAs`** to include YouTube + (eventually) Wikipedia/Wikidata once they exist.

---

## 10. Content Reformatting Suggestions

| Page | Change |
|------|--------|
| All blog intros | Insert a **40–60 word direct answer block** immediately under the first H2, before the anecdote. The narrative hook can follow. |
| `what-is-cpq-how-it-works` | Move the "7× more likely to close" stat into a callout with a **named, linked source**. Add a CPQ-flow diagram (Configure → Price → Quote). |
| `how-to-calculate-profit-margins-in-quotes` | The worked example is excellent — promote it into a **standalone "Quick answer" box** at the top (it's the most quotable passage on the site). |
| Price-range posts (security, accounting, photography) | Keep the tables; add a one-sentence **lead-in stating the range** ("UK/US guarding rates run $14–45/hour depending on shift and licensing") so the figure is extractable without the table. |
| `/en` home | Add 2–3 **question-based H2s** ("What is DealForge?", "How does AI quoting work?") with self-contained answers — currently benefit-led headers, less query-matched. |
| Marketing FAQ blocks | Already strong. Ensure each answer is ≤167 words and leads with the answer (most do). |

---

### Summary

DealForge has an **above-average technical GEO foundation** (SSR, comprehensive schema, AI-crawler access, bilingual llms.txt, clean structure) and genuinely citable long-form content. The score is capped at 69 by two things that on-page work can't fix: **(a) no off-site entity/brand footprint** (Wikipedia/Reddit/YouTube) — the dominant signal for ChatGPT & Perplexity — and **(b) no named human authorship** for E-E-A-T. Close the five quick wins in §8, then invest in the off-site entity work in §5; that path moves the ChatGPT/Perplexity scores most.
