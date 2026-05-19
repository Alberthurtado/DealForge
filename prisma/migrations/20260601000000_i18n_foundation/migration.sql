-- Phase 0 of internationalization: foundation columns for multi-country support.
-- Adds country/currency/locale to Empresa, generic tax ID fields to Cliente,
-- and per-locale slug uniqueness to BlogPost.
-- All existing rows are backfilled implicitly via column defaults (ES, EUR, es-ES).

-- 1) Empresa: country/currency/locale + tax regime + generic vat number
ALTER TABLE "Empresa" ADD COLUMN "country" TEXT NOT NULL DEFAULT 'ES';
ALTER TABLE "Empresa" ADD COLUMN "currencyCode" TEXT NOT NULL DEFAULT 'EUR';
ALTER TABLE "Empresa" ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'es-ES';
ALTER TABLE "Empresa" ADD COLUMN "taxRegime" TEXT;
ALTER TABLE "Empresa" ADD COLUMN "vatNumber" TEXT;

-- 2) Cliente: generic country-aware tax identification (ruc kept for backward compat)
ALTER TABLE "Cliente" ADD COLUMN "taxIdType" TEXT;
ALTER TABLE "Cliente" ADD COLUMN "taxIdValue" TEXT;

-- 3) BlogPost: per-locale posts. Drop the old global slug uniqueness, allow
--    multiple posts to share the same slug across different locales.
ALTER TABLE "BlogPost" ADD COLUMN "locale" TEXT NOT NULL DEFAULT 'es-ES';
ALTER TABLE "BlogPost" DROP CONSTRAINT IF EXISTS "BlogPost_slug_key";
CREATE UNIQUE INDEX "BlogPost_slug_locale_key" ON "BlogPost"("slug", "locale");
CREATE INDEX "BlogPost_locale_idx" ON "BlogPost"("locale");
