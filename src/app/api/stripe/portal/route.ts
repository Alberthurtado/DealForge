import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe, getAppUrl } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (session.rol !== "ADMIN") {
    return NextResponse.json({ error: "Solo el administrador puede gestionar la suscripción" }, { status: 403 });
  }

  // Try empresa-level customer first, then fall back to user-level (legacy)
  let stripeCustomerId: string | null | undefined;

  if (session.empresaId) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: session.empresaId },
      select: { stripeCustomerId: true },
    });
    stripeCustomerId = empresa?.stripeCustomerId;
  }

  if (!stripeCustomerId) {
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId },
      select: { stripeCustomerId: true },
    });
    stripeCustomerId = user?.stripeCustomerId;
  }

  if (!stripeCustomerId) {
    return NextResponse.json(
      { error: "No tienes una suscripción activa" },
      { status: 400 }
    );
  }

  try {
    const appUrl = getAppUrl();

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
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
