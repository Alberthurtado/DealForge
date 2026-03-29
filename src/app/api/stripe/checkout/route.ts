import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  stripe,
  getPriceId,
  getOrCreateStripeCustomer,
  getAppUrl,
} from "@/lib/stripe";
import { stripeCheckoutSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { data, error } = validateBody(stripeCheckoutSchema, body);
  if (error) return error;

  const priceId = getPriceId(data.plan, data.interval);

  try {
    // Get or create Stripe customer
    const customerId = await getOrCreateStripeCustomer(
      session.userId,
      session.email,
      session.nombre
    );

    const appUrl = getAppUrl();

    // Create Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/checkout/exito?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancelado`,
      metadata: {
        dealforge_userId: session.userId,
        dealforge_plan: data.plan,
        dealforge_interval: data.interval,
      },
      subscription_data: {
        metadata: {
          dealforge_userId: session.userId,
          dealforge_plan: data.plan,
          dealforge_interval: data.interval,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      locale: "es",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    const message =
      err instanceof Error ? err.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al crear la sesión de pago: ${message}` },
      { status: 500 }
    );
  }
}
