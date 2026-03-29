import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// ─── Stripe Client ──────────────────────────────
export const stripe = new Stripe(process.env.STRIPE_API_KEY || "", {
  typescript: true,
});

// ─── Plan → Price ID mapping ────────────────────
// Monthly prices from stripe-setup.ts, annual from stripe-add-annual.ts
export type BillingInterval = "monthly" | "annual";

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

/**
 * Get the Stripe Price ID for a given plan and billing interval.
 */
export function getPriceId(plan: string, interval: BillingInterval = "monthly"): string {
  const planPrices = PLAN_PRICE_MAP[plan];
  if (!planPrices) throw new Error(`Plan desconocido: ${plan}`);
  return planPrices[interval];
}

// Price ID → Plan name (reverse lookup for all price IDs)
export const PRICE_PLAN_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(PLAN_PRICE_MAP).flatMap(([plan, prices]) => [
    [prices.monthly, plan],
    [prices.annual, plan],
  ])
);

// ─── Helpers ────────────────────────────────────

/**
 * Get or create a Stripe customer for a user.
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
 * Get the app URL for redirects
 */
export function getAppUrl(): string {
  return process.env.APP_URL || "http://localhost:3000";
}
