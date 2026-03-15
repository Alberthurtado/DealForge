import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getPlanFeatures, planFeatureResponse } from "@/lib/plan-limits";
import { firmaRequestSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";
import { sendSystemEmail, isSystemEmailConfigured } from "@/lib/system-email";
import { buildSignatureRequestEmail } from "@/lib/signature-email";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;

  const owned = await prisma.cotizacion.findFirst({ where: { id, usuarioId: session.userId }, select: { id: true } });
  if (!owned) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  const firmas = await prisma.firma.findMany({
    where: { cotizacionId: id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(firmas);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  // Check plan
  const user = await prisma.usuario.findUnique({ where: { id: session.userId }, select: { plan: true } });
  const features = getPlanFeatures(user?.plan || "starter");
  if (!features.firmaElectronica) return planFeatureResponse("firmaElectronica");

  const { id } = await params;

  const body = await request.json();
  const { data, error } = validateBody(firmaRequestSchema, body);
  if (error) return error;

  // Verify quote belongs to user and is in valid state
  const cotizacion = await prisma.cotizacion.findFirst({
    where: { id, usuarioId: session.userId },
    include: { cliente: { select: { nombre: true } } },
  });

  if (!cotizacion) return NextResponse.json({ error: "Cotización no encontrada" }, { status: 404 });

  if (!["ENVIADA", "NEGOCIACION"].includes(cotizacion.estado)) {
    return NextResponse.json(
      { error: "Solo se puede solicitar firma en cotizaciones enviadas o en negociación" },
      { status: 400 }
    );
  }

  // Create firma record
  const firma = await prisma.firma.create({
    data: {
      cotizacionId: id,
      signerName: data.signerName,
      signerEmail: data.signerEmail,
    },
  });

  // Log activity
  await prisma.actividad.create({
    data: {
      cotizacionId: id,
      tipo: "FIRMA_SOLICITADA",
      descripcion: `Firma solicitada a ${data.signerName} (${data.signerEmail})`,
    },
  });

  // Send email (non-blocking)
  if (isSystemEmailConfigured()) {
    const empresa = await prisma.empresa.findUnique({
      where: { id: "default" },
      select: { nombre: true, colorPrimario: true },
    });

    const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;

    const html = buildSignatureRequestEmail({
      baseUrl: origin,
      token: firma.token,
      cotizacion: {
        numero: cotizacion.numero,
        total: cotizacion.total,
        moneda: cotizacion.moneda,
        cliente: cotizacion.cliente.nombre,
      },
      signerName: data.signerName,
      empresa: {
        nombre: empresa?.nombre || "DealForge",
        colorPrimario: empresa?.colorPrimario || "#3a9bb5",
      },
    });

    sendSystemEmail({
      to: data.signerEmail,
      subject: `Firma requerida: ${cotizacion.numero}`,
      html,
    }).catch((err) => console.error("[firma] Error sending email:", err));
  }

  return NextResponse.json(firma, { status: 201 });
}
