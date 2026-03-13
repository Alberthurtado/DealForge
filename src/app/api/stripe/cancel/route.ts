import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const user = await prisma.usuario.findUnique({
    where: { id: session.userId },
    select: { stripeSubscriptionId: true, plan: true },
  });

  if (!user?.stripeSubscriptionId) {
    return NextResponse.json(
      { error: "No tienes una suscripción activa" },
      { status: 400 }
    );
  }

  if (user.plan === "starter") {
    return NextResponse.json(
      { error: "Ya estás en el plan Starter" },
      { status: 400 }
    );
  }

  try {
    // Cancel at period end — user keeps access until billing cycle ends
    await stripe.subscriptions.update(user.stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    await prisma.usuario.update({
      where: { id: session.userId },
      data: { planStatus: "canceling" },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stripe cancel error:", error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al cancelar: ${message}` },
      { status: 500 }
    );
  }
}
