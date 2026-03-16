import { NextResponse } from "next/server";
import { sendSystemEmail } from "@/lib/system-email";
import { buildSellerFollowUpEmail } from "@/lib/reminder-email";

export async function GET() {
  const html = buildSellerFollowUpEmail({
    baseUrl: "https://dealforge.es",
    cotizacionId: "test-123",
    cotizacion: {
      numero: "COT-2026-0042",
      total: 15750.00,
      moneda: "EUR",
      cliente: "TechCorp Solutions S.L.",
      fechaEmision: new Date("2026-03-10"),
      estado: "ENVIADA",
    },
    vendedorNombre: "Albert",
    diasSinActividad: 5,
    empresa: { nombre: "DealForge Demo", colorPrimario: "#3a9bb5" },
  });

  const result = await sendSystemEmail({
    to: "albert.hurtado.sanz@hp.com",
    subject: "[TEST] Seguimiento pendiente: COT-2026-0042 — TechCorp Solutions",
    html,
  });

  return NextResponse.json(result);
}
