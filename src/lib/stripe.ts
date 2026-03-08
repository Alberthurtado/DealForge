import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

// ─── Stripe Client ──────────────────────────────
export const stripe = new Stripe(process.env.STRIPE_API_KEY || "", {
  typescript: true,
});

// ─── Plan → Price ID mapping ────────────────────
// Generados con scripts/stripe-setup.ts
export const PLAN_PRICE_MAP: Record<string, string> = {
  pro: "price_1T8jsoD3Nsh6V7dkMRt1yQEJ",
  business: "price_1T8jspD3Nsh6V7dkG5A2mbTU",
};

// Price ID → Plan name (reverse lookup)
export const PRICE_PLAN_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(PLAN_PRICE_MAP).map(([plan, priceId]) => [priceId, plan])
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
