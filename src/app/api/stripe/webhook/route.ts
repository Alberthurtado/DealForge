import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICE_PLAN_MAP } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

// Disable body parsing — Stripe needs the raw body for signature verification
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (webhookSecret) {
      // Verify signature in production
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } else {
      // In development without webhook secret, parse directly
      console.warn(
        "STRIPE_WEBHOOK_SECRET not set — skipping signature verification"
      );
      event = JSON.parse(body) as Stripe.Event;
    }
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(invoice);
        break;
      }

      default:
        // Unhandled event type — ignore silently
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Error processing webhook ${event.type}:`, error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

// ─── Handlers ──────────────────────────────────────

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const empresaId = session.metadata?.dealforge_empresaId;
  const userId = session.metadata?.dealforge_userId;
  const plan = session.metadata?.dealforge_plan;

  if (!plan) {
    console.error("Checkout completed but missing plan metadata:", session.id);
    return;
  }

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer?.id;

  // Get subscription details for period end
  let currentPeriodEnd: Date | null = null;
  let priceId: string | null = null;

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId) as Stripe.Subscription;
    const itemPeriodEnd = subscription.items?.data?.[0]?.current_period_end;
    if (itemPeriodEnd) {
      currentPeriodEnd = new Date(itemPeriodEnd * 1000);
    }
    priceId = subscription.items.data[0]?.price.id || null;
  }

  // Update empresa-level billing (preferred)
  if (empresaId) {
    await prisma.empresa.update({
      where: { id: empresaId },
      data: {
        plan,
        planStatus: "active",
        stripeCustomerId: customerId || undefined,
        stripeSubscriptionId: subscriptionId || undefined,
        stripePriceId: priceId,
        currentPeriodEnd,
      },
    });
    console.log(`Empresa ${empresaId} upgraded to ${plan}`);
  }

  // Also update user-level for legacy compatibility
  if (userId) {
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        plan,
        planStatus: "active",
        stripeCustomerId: customerId || undefined,
        stripeSubscriptionId: subscriptionId || undefined,
        stripePriceId: priceId,
        currentPeriodEnd,
      },
    });
    console.log(`User ${userId} upgraded to ${plan}`);
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const empresaId = subscription.metadata?.dealforge_empresaId;
  const userId = subscription.metadata?.dealforge_userId;

  const priceId = subscription.items.data[0]?.price.id;
  const plan = priceId ? PRICE_PLAN_MAP[priceId] : null;
  const status = subscription.status; // active, past_due, canceled, etc.

  const planStatus = status === "active" ? "active" : status === "past_due" ? "past_due" : "canceled";
  const currentPeriodEnd = new Date((subscription.items?.data?.[0]?.current_period_end || 0) * 1000);

  // Update empresa-level billing (preferred)
  if (empresaId) {
    const updateData: Record<string, unknown> = {
      planStatus,
      currentPeriodEnd,
      stripePriceId: priceId || undefined,
      stripeSubscriptionId: subscription.id,
    };
    if (plan) updateData.plan = plan;

    await prisma.empresa.update({ where: { id: empresaId }, data: updateData });
    console.log(`Empresa ${empresaId} subscription updated: ${status}`);
  }

  // Also update user-level for legacy compatibility
  if (userId) {
    const updateData: Record<string, unknown> = {
      planStatus,
      currentPeriodEnd,
      stripePriceId: priceId || undefined,
      stripeSubscriptionId: subscription.id,
    };
    if (plan) updateData.plan = plan;

    await prisma.usuario.update({ where: { id: userId }, data: updateData });
    console.log(`User ${userId} subscription updated: ${status}`);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const empresaId = subscription.metadata?.dealforge_empresaId;
  const userId = subscription.metadata?.dealforge_userId;

  if (empresaId) {
    await prisma.empresa.update({
      where: { id: empresaId },
      data: {
        plan: "starter",
        planStatus: "canceled",
        stripeSubscriptionId: null,
        stripePriceId: null,
        currentPeriodEnd: null,
      },
    });
    console.log(`Empresa ${empresaId} subscription deleted — reverted to starter`);
  }

  if (userId) {
    await prisma.usuario.update({
      where: { id: userId },
      data: {
        plan: "starter",
        planStatus: "canceled",
        stripeSubscriptionId: null,
        stripePriceId: null,
        currentPeriodEnd: null,
      },
    });
    console.log(`User ${userId} subscription deleted — reverted to starter`);
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId =
    typeof invoice.customer === "string"
      ? invoice.customer
      : invoice.customer?.id;

  if (!customerId) return;

  // Try empresa-level first
  const empresa = await prisma.empresa.findFirst({
    where: { stripeCustomerId: customerId },
  });
  if (empresa) {
    await prisma.empresa.update({
      where: { id: empresa.id },
      data: { planStatus: "past_due" },
    });
    console.log(`Payment failed for empresa ${empresa.id} — marked as past_due`);
    return;
  }

  // Fall back to user-level
  const user = await prisma.usuario.findFirst({
    where: { stripeCustomerId: customerId },
  });
  if (user) {
    await prisma.usuario.update({
      where: { id: user.id },
      data: { planStatus: "past_due" },
    });
    console.log(`Payment failed for user ${user.id} — marked as past_due`);
  }
}
