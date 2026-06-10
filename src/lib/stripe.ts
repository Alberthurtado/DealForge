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

// EUR Price IDs (live). These are the original prices and the fallback for
// any currency that isn't configured yet.
export const PLAN_PRICE_MAP: Record<string, { monthly: string; annual: string }> = {
  pro: {
    monthly: "price_1T8jsoD3Nsh6V7dkMRt1yQEJ",
    annual: "price_1TGDmpD3Nsh6V7dkiNLdSrNZ",
  },
  business: {
    monthly: "price_1T8jspD3Nsh6V7dkG5A2mbTU",
    annual: "price_1TGDmpD3Nsh6V7dk5xhBybel",
  },
};

// USD/GBP Price IDs are read from env vars so they can be added after running
// scripts/stripe-multicurrency-setup.ts without a code change. If a currency
// isn't configured, getPriceId() falls back to the EUR price so checkout never
// breaks (it would just charge in EUR until the env var is set).
//
// Expected env vars (set in Vercel after running the setup script):
//   STRIPE_PRICE_PRO_USD_MONTHLY / _ANNUAL
//   STRIPE_PRICE_PRO_GBP_MONTHLY / _ANNUAL
//   STRIPE_PRICE_BUSINESS_USD_MONTHLY / _ANNUAL
//   STRIPE_PRICE_BUSINESS_GBP_MONTHLY / _ANNUAL
function envPrice(plan: string, currency: PriceCurrency, interval: BillingInterval): string | undefined {
  const key = `STRIPE_PRICE_${plan.toUpperCase()}_${currency}_${interval.toUpperCase()}`;
  return process.env[key] || undefined;
}

/**
 * Get the Stripe Price ID for a plan + interval + currency.
 * Falls back to the EUR price when the requested currency isn't configured.
 */
export function getPriceId(
  plan: string,
  interval: BillingInterval = "monthly",
  currency: PriceCurrency = "EUR"
): string {
  const eur = PLAN_PRICE_MAP[plan];
  if (!eur) throw new Error(`Plan desconocido: ${plan}`);
  if (currency === "EUR") return eur[interval];
  return envPrice(plan, currency, interval) || eur[interval];
}

// Price ID → Plan name (reverse lookup). Includes EUR prices plus any
// configured USD/GBP env prices so webhooks can resolve the plan.
export const PRICE_PLAN_MAP: Record<string, string> = (() => {
  const map: Record<string, string> = {};
  for (const [plan, prices] of Object.entries(PLAN_PRICE_MAP)) {
    map[prices.monthly] = plan;
    map[prices.annual] = plan;
    for (const currency of ["USD", "GBP"] as PriceCurrency[]) {
      for (const interval of ["monthly", "annual"] as BillingInterval[]) {
        const id = envPrice(plan, currency, interval);
        if (id) map[id] = plan;
      }
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
