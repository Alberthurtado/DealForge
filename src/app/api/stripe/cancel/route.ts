import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { stripe, getPriceId } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (session.rol !== "ADMIN") {
    return NextResponse.json(
      { error: "Solo el administrador puede cambiar la suscripción" },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const targetPlan: "pro" | "starter" = body.targetPlan ?? "starter";

  if (!["pro", "starter"].includes(targetPlan)) {
    return NextResponse.json({ error: "Plan destino inválido" }, { status: 400 });
  }

  // Resolve subscription — empresa first, then legacy usuario
  let stripeSubscriptionId: string | null = null;
  let currentPlan = "starter";
  let isEmpresaLevel = false;

  if (session.empresaId) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: session.empresaId },
      select: { stripeSubscriptionId: true, plan: true },
    });
    stripeSubscriptionId = empresa?.stripeSubscriptionId ?? null;
    currentPlan = empresa?.plan || "starter";
    isEmpresaLevel = true;
  }

  if (!stripeSubscriptionId) {
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId },
      select: { stripeSubscriptionId: true, plan: true },
    });
    stripeSubscriptionId = user?.stripeSubscriptionId ?? null;
    currentPlan = user?.plan || "starter";
    isEmpresaLevel = false;
  }

  if (!stripeSubscriptionId) {
    return NextResponse.json(
      { error: "No tienes una suscripción activa" },
      { status: 400 }
    );
  }

  if (currentPlan === "starter") {
    return NextResponse.json(
      { error: "Ya estás en el plan Starter" },
      { status: 400 }
    );
  }

  if (targetPlan === "pro" && currentPlan === "pro") {
    return NextResponse.json(
      { error: "Ya estás en el plan Pro" },
      { status: 400 }
    );
  }

  try {
    if (targetPlan === "starter") {
      // Cancel at end of billing period → plan goes to Starter when it expires
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
    } else if (targetPlan === "pro") {
      // Downgrade to Pro: swap price with no proration (takes effect next cycle)
      const subscription = await stripe.subscriptions.retrieve(stripeSubscriptionId);
      const currentItemId = subscription.items.data[0]?.id;

      if (!currentItemId) {
        return NextResponse.json(
          { error: "No se encontró el item de suscripción" },
          { status: 500 }
        );
      }

      // Detect current billing interval (monthly vs annual)
      const currentPriceId = subscription.items.data[0]?.price?.id;
      const currentPrice = await stripe.prices.retrieve(currentPriceId);
      const interval =
        currentPrice.recurring?.interval === "year" ? "annual" : "monthly";

      const newPriceId = getPriceId("pro", interval);

      await stripe.subscriptions.update(stripeSubscriptionId, {
        items: [{ id: currentItemId, price: newPriceId }],
        proration_behavior: "none",
        cancel_at_period_end: false,
      });

      // Update plan in DB immediately (they'll be billed at Pro rate next cycle)
      if (isEmpresaLevel && session.empresaId) {
        await prisma.empresa.update({
          where: { id: session.empresaId },
          data: { plan: "pro", planStatus: "active" },
        });
      } else {
        await prisma.usuario.update({
          where: { id: session.userId },
          data: { plan: "pro", planStatus: "active" },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Stripe cancel/downgrade error:", error);
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json(
      { error: `Error al procesar el cambio: ${message}` },
      { status: 500 }
    );
  }
}
