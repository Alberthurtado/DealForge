import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";
import { sendSystemEmail } from "@/lib/system-email";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { validateBody } from "@/lib/validate";

const requestFirmaSchema = z.object({
  signerName: z.string().min(1, "El nombre del firmante es obligatorio"),
  signerEmail: z.string().email("Email inválido"),
});

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id } = await params;
  const empresaId = session.empresaId || session.userId;

  const contrato = await prisma.contrato.findFirst({
    where: {
      id,
      OR: [
        { equipoId: empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    select: { id: true },
  });

  if (!contrato) return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });

  const firmas = await prisma.firma.findMany({
    where: { contratoId: id },
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

  const { id } = await params;

  // Check plan feature
  const features = getPlanFeatures(session.plan);
  if (!features.firmaElectronica) {
    return NextResponse.json(
      { error: "Tu plan no incluye firma electrónica. Actualiza a Pro o superior." },
      { status: 403 }
    );
  }

  const body = await request.json();
  const { data, error } = validateBody(requestFirmaSchema, body);
  if (error) return error;

  const empresaId = session.empresaId || session.userId;

  const contrato = await prisma.contrato.findFirst({
    where: {
      id,
      OR: [
        { equipoId: empresaId },
        { usuarioId: session.userId, equipoId: null },
      ],
    },
    include: {
      cliente: { select: { nombre: true } },
    },
  });

  if (!contrato) return NextResponse.json({ error: "Contrato no encontrado" }, { status: 404 });

  if (!["ACTIVO", "PENDIENTE_RENOVACION"].includes(contrato.estado)) {
    return NextResponse.json(
      { error: "Solo se puede solicitar firma en contratos activos o pendientes de renovación" },
      { status: 400 }
    );
  }

  // Create Firma record with contratoId (not cotizacionId — use dummy cotizacionId)
  // Note: cotizacionId is required by schema — we use a placeholder approach by
  // making cotizacionId point to contrato's cotizacion
  const firma = await prisma.firma.create({
    data: {
      cotizacionId: contrato.cotizacionId,
      contratoId: id,
      signerName: data.signerName,
      signerEmail: data.signerEmail,
    },
  });

  // Log activity
  await prisma.contratoActividad.create({
    data: {
      contratoId: id,
      tipo: "FIRMA_SOLICITADA",
      descripcion: `Firma electrónica solicitada a ${data.signerName} (${data.signerEmail})`,
    },
  });

  // Get empresa info for email
  const empresa = await prisma.empresa.findFirst({
    where: {
      OR: [
        { id: empresaId },
        { id: "default" },
      ],
    },
    select: { nombre: true, colorPrimario: true },
    orderBy: { createdAt: "asc" },
  });

  const origin = request.headers.get("origin") || `https://${request.headers.get("host")}`;
  const signUrl = `${origin}/firmar-contrato/${firma.token}`;
  const color = empresa?.colorPrimario || "#3a9bb5";

  // Send signature request email
  try {
    await sendSystemEmail({
      to: data.signerEmail,
      subject: `Firma electrónica requerida - Contrato ${contrato.numero}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background:#f4f4f7;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:${color};padding:24px 30px;border-radius:12px 12px 0 0;">
      <h1 style="color:white;margin:0;font-size:18px;">${empresa?.nombre || "DealForge"}</h1>
      <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:13px;">Firma electrónica requerida</p>
    </div>
    <div style="background:white;padding:30px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
      <p style="margin:0 0 16px;font-size:15px;color:#333;">Estimado/a ${data.signerName},</p>
      <p style="margin:0 0 20px;font-size:14px;color:#555;">
        Se requiere su firma electrónica para el siguiente contrato:
      </p>
      <div style="background:#f8f9fa;border-radius:8px;padding:16px;margin:0 0 24px;">
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Contrato</td><td style="padding:4px 0;text-align:right;font-weight:bold;font-size:14px;">${contrato.numero}</td></tr>
          <tr><td style="padding:4px 0;color:#888;font-size:12px;">Cliente</td><td style="padding:4px 0;text-align:right;font-size:13px;">${contrato.cliente.nombre}</td></tr>
        </table>
      </div>
      <div style="text-align:center;margin:24px 0;">
        <a href="${signUrl}" style="display:inline-block;padding:14px 40px;background:${color};color:white;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;">Firmar contrato</a>
      </div>
      <p style="margin:20px 0 0;font-size:12px;color:#888;text-align:center;">
        Haga clic en el botón para revisar y firmar el contrato de forma segura.
      </p>
    </div>
    <p style="text-align:center;font-size:11px;color:#aaa;margin:16px 0 0;">${empresa?.nombre || "DealForge"} &bull; DealForge</p>
  </div>
</body>
</html>`,
    });
  } catch {
    // Don't block response if email fails
  }

  return NextResponse.json({
    id: firma.id,
    token: firma.token,
    signerName: firma.signerName,
    signerEmail: firma.signerEmail,
    createdAt: firma.createdAt,
  }, { status: 201 });
}
