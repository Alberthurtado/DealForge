import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  stripe,
  PLAN_PRICE_MAP,
  getOrCreateStripeCustomer,
  getAppUrl,
} from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await request.json();
  const { plan } = body as { plan: string };

  // Validate plan
  const priceId = PLAN_PRICE_MAP[plan];
  if (!priceId) {
    return NextResponse.json(
      { error: `Plan invalido: ${plan}. Planes disponibles: pro, business` },
      { status: 400 }
    );
  }

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
        dealforge_plan: plan,
      },
      subscription_data: {
        metadata: {
          dealforge_userId: session.userId,
          dealforge_plan: plan,
        },
      },
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      locale: "es",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al crear la sesion de pago: ${message}` },
      { status: 500 }
    );
  }
}
