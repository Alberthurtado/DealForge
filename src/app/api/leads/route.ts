import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, RATE_LIMITS, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const limit = checkRateLimit(`lead:${ip}`, RATE_LIMITS.approval);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  try {
    const body = await request.json();
    const { nombre, email, empresa, cargo, origen, recurso, utmSource, utmMedium, utmCampaign, utmContent } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Email no válido" },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = await prisma.lead.findFirst({
      where: { email, recurso: recurso || "guia" },
    });

    if (existing) {
      // Don't error — just return success (idempotent)
      return NextResponse.json({ ok: true, id: existing.id });
    }

    const lead = await prisma.lead.create({
      data: {
        nombre,
        email,
        empresa: empresa || null,
        cargo: cargo || null,
        origen: origen || "guia",
        recurso: recurso || "guia-cotizaciones",
        utmSource: utmSource || null,
        utmMedium: utmMedium || null,
        utmCampaign: utmCampaign || null,
        utmContent: utmContent || null,
        ip,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id });
  } catch {
    return NextResponse.json(
      { error: "Error al registrar" },
      { status: 500 }
    );
  }
}

// GET — list leads (protected, requires auth)
export async function GET(request: NextRequest) {
  // Simple API key check for webhook/admin access
  const authHeader = request.headers.get("authorization");
  const apiKey = process.env.LEADS_API_KEY;

  if (!apiKey || authHeader !== `Bearer ${apiKey}`) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return NextResponse.json({ leads });
}
