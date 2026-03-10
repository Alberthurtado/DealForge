import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe, getAppUrl } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // Get user's Stripe customer ID
  const user = await prisma.usuario.findUnique({
    where: { id: session.userId },
    select: { stripeCustomerId: true },
  });

  if (!user?.stripeCustomerId) {
    return NextResponse.json(
      { error: "No tienes una suscripción activa" },
      { status: 400 }
    );
  }

  try {
    const appUrl = getAppUrl();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${appUrl}/configuracion`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error) {
    console.error("Stripe portal error:", error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al abrir el portal: ${message}` },
      { status: 500 }
    );
  }
}
