import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/rate-limit";

// Rate limit: 5 cotizaciones gratis / hora / IP
const LIMIT = { maxRequests: 5, windowSeconds: 60 * 60 };

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = checkRateLimit(`generador-gratis:${ip}`, LIMIT);
  if (!limit.allowed) return rateLimitResponse(limit.resetAt);

  try {
    const body = await request.json().catch(() => ({}));
    const email: string | null = body?.emisorEmail ?? null;

    // Captura opcional de lead (si el usuario ha dejado email)
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      try {
        const existing = await prisma.lead.findFirst({
          where: { email, recurso: "generador-gratis" },
        });
        if (!existing) {
          await prisma.lead.create({
            data: {
              nombre: "Usuario generador",
              email,
              origen: "generador-gratis",
              recurso: "generador-gratis",
              ip,
            },
          });
        }
      } catch {
        // Silencioso — no bloqueamos la generación por fallo de lead
      }
    }

    return NextResponse.json({
      ok: true,
      remaining: limit.remaining,
      resetAt: limit.resetAt,
    });
  } catch {
    return NextResponse.json({ error: "Error al generar" }, { status: 500 });
  }
}
