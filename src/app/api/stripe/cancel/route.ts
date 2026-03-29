import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (session.rol !== "ADMIN") {
    return NextResponse.json({ error: "Solo el administrador puede cancelar la suscripción" }, { status: 403 });
  }

  // Try empresa-level subscription first, then fall back to user-level (legacy)
  let stripeSubscriptionId: string | null | undefined;
  let plan: string = "starter";
  let isEmpresaLevel = false;

  if (session.empresaId) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: session.empresaId },
      select: { stripeSubscriptionId: true, plan: true },
    });
    stripeSubscriptionId = empresa?.stripeSubscriptionId;
    plan = empresa?.plan || "starter";
    isEmpresaLevel = true;
  }

  if (!stripeSubscriptionId) {
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId },
      select: { stripeSubscriptionId: true, plan: true },
    });
    stripeSubscriptionId = user?.stripeSubscriptionId;
    plan = user?.plan || "starter";
    isEmpresaLevel = false;
  }

  if (!stripeSubscriptionId) {
    return NextResponse.json(
      { error: "No tienes una suscripción activa" },
      { status: 400 }
    );
  }

  if (plan === "starter") {
    return NextResponse.json(
      { error: "Ya estás en el plan Starter" },
      { status: 400 }
    );
  }

  try {
    // Cancel at period end — user keeps access until billing cycle ends
    await stripe.subscriptions.update(stripeSubscriptionId, {
      cancel_at_period_end: true,
    });

    if (isEmpresaLevel && session.empresaId) {
      await prisma.empresa.update({
        where: { id: session.empresaId },
        data: { planStatus: "canceling" },
      });
    } else {
      await prisma.usuario.update({
        where: { id: session.userId },
        data: { planStatus: "canceling" },
      });
    }

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
