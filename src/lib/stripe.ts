import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// ─── Stripe Client ──────────────────────────────
export const stripe = new Stripe(process.env.STRIPE_API_KEY || "", {
  typescript: true,
});

// ─── Plan → Price ID mapping ────────────────────
// Monthly prices from stripe-setup.ts, annual from stripe-add-annual.ts
export type BillingInterval = "monthly" | "annual";
export type PriceCurrency = "EUR" | "USD" | "GBP";

// Live Stripe Price IDs per plan × currency × interval. Price IDs are NOT
// secrets (they're used client-side in Checkout), so they live in code just
// like the original EUR prices did. USD/GBP created via
// scripts/stripe-multicurrency-setup.ts.
export const PRICE_ID_MATRIX: Record<string, Record<PriceCurrency, { monthly: string; annual: string }>> = {
  pro: {
    EUR: { monthly: "price_1T8jsoD3Nsh6V7dkMRt1yQEJ", annual: "price_1TGDmpD3Nsh6V7dkiNLdSrNZ" },
    USD: { monthly: "price_1TgmoID3Nsh6V7dkjAymbFHC", annual: "price_1TgmoID3Nsh6V7dkwIeSG4iY" },
    GBP: { monthly: "price_1TgmoID3Nsh6V7dkBtQzm2Ji", annual: "price_1TgmoID3Nsh6V7dkLXa8KCgQ" },
  },
  business: {
    EUR: { monthly: "price_1T8jspD3Nsh6V7dkG5A2mbTU", annual: "price_1TGDmpD3Nsh6V7dk5xhBybel" },
    USD: { monthly: "price_1TgmoJD3Nsh6V7dkRj2jyC3w", annual: "price_1TgmoJD3Nsh6V7dkvMckG4NE" },
    GBP: { monthly: "price_1TgmoJD3Nsh6V7dkKfu5jZjd", annual: "price_1TgmoKD3Nsh6V7dkZwr0hAM1" },
  },
};

// EUR-only view, kept for any code/tooling that referenced the old shape.
export const PLAN_PRICE_MAP: Record<string, { monthly: string; annual: string }> = {
  pro: PRICE_ID_MATRIX.pro.EUR,
  business: PRICE_ID_MATRIX.business.EUR,
};

/**
 * Get the Stripe Price ID for a plan + interval + currency.
 * Falls back to the EUR price if a currency somehow isn't mapped.
 */
export function getPriceId(
  plan: string,
  interval: BillingInterval = "monthly",
  currency: PriceCurrency = "EUR"
): string {
  const byCurrency = PRICE_ID_MATRIX[plan];
  if (!byCurrency) throw new Error(`Plan desconocido: ${plan}`);
  return (byCurrency[currency] || byCurrency.EUR)[interval];
}

// Price ID → Plan name (reverse lookup across all currencies) so webhooks can
// resolve the plan regardless of the currency the customer paid in.
export const PRICE_PLAN_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [plan, byCurrency] of Object.entries(PRICE_ID_MATRIX)) {
    for (const prices of Object.values(byCurrency)) {
      map[prices.monthly] = plan;
      map[prices.annual] = plan;
    }
  }
  return map;
})();

// ─── Helpers ────────────────────────────────────

/**
 * Get or create a Stripe customer for a user (legacy — stored on Usuario).
 * Stores the stripeCustomerId in the DB.
 */
export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  nombre: string
): Promise<string> {
  // Check if user already has a Stripe customer
  const user = await prisma.usuario.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (user?.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: nombre,
    metadata: { dealforge_userId: userId },
  });

  // Save to DB
  await prisma.usuario.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

/**
 * Get or create a Stripe customer for a team (empresa).
 * Stores the stripeCustomerId on the Empresa record.
 */
export async function getOrCreateStripeCustomerForEmpresa(
  empresaId: string,
  email: string,
  nombre: string
): Promise<string> {
  const empresa = await prisma.empresa.findUnique({
    where: { id: empresaId },
    select: { stripeCustomerId: true, nombre: true },
  });

  if (empresa?.stripeCustomerId) {
    return empresa.stripeCustomerId;
  }

  // Create new Stripe customer
  const customer = await stripe.customers.create({
    email,
    name: empresa?.nombre || nombre,
    metadata: { dealforge_empresaId: empresaId },
  });

  // Save to Empresa
  await prisma.empresa.update({
    where: { id: empresaId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

/**
 * Get the app URL for redirects
 */
export function getAppUrl(): string {
  return process.env.APP_URL || "http://localhost:3000";
}
