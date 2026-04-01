import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getSmtpConfig } from "@/lib/email";
import nodemailer from "nodemailer";

// POST /api/equipo/invitar — send invitation to a new team member
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.rol !== "ADMIN") {
    return NextResponse.json({ error: "Solo los administradores pueden invitar miembros" }, { status: 403 });
  }

  const body = await request.json();
  const { email, rol, compartirDatos } = body as { email?: string; rol?: string; compartirDatos?: string[] };

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }

  const rolValido = ["ADMIN", "SALES", "VIEWER"].includes(rol || "SALES") ? (rol as string) : "SALES";

  // Check plan limits
  const [empresa, miembrosCount] = await Promise.all([
    prisma.empresa.findUnique({ where: { id: session.empresaId }, select: { plan: true, nombre: true } }),
    prisma.equipoMembro.count({ where: { empresaId: session.empresaId } }),
  ]);

  const planLimits: Record<string, number> = {
    starter: 1,
    pro: 5,
    business: 20,
    enterprise: 0,
  };
  const plan = empresa?.plan || "starter";
  const maxMiembros = planLimits[plan] ?? 1;

  if (maxMiembros > 0 && miembrosCount >= maxMiembros) {
    return NextResponse.json(
      {
        error: "PLAN_LIMIT_REACHED",
        message: `Tu plan ${plan} permite un máximo de ${maxMiembros} miembro(s). Mejora tu plan para agregar más usuarios.`,
      },
      { status: 403 }
    );
  }

  // Check if already a member
  const existingUser = await prisma.usuario.findUnique({
    where: { email },
    include: { miembros: { where: { empresaId: session.empresaId } } },
  });

  if (existingUser?.miembros.length) {
    return NextResponse.json({ error: "Este usuario ya es miembro del equipo" }, { status: 409 });
  }

  // Cancel any existing pending invitations for this email
  await prisma.invitacion.updateMany({
    where: { empresaId: session.empresaId, email, usadaAt: null },
    data: { usadaAt: new Date() },
  });

  // Create invitation
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  // Validate compartirDatos
  const VALID_COMPARTIR = ["clientes", "productos", "cotizaciones", "contratos"];
  const compartirValidado = Array.isArray(compartirDatos)
    ? compartirDatos.filter(k => VALID_COMPARTIR.includes(k))
    : [];

  const invitacion = await prisma.invitacion.create({
    data: {
      empresaId: session.empresaId,
      email,
      rol: rolValido,
      expiresAt,
      invitadoPorId: session.userId,
      compartirDatos: compartirValidado.length > 0 ? JSON.stringify(compartirValidado) : null,
    },
  });

  // Send invitation email
  const appUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || "https://app.dealforge.es";
  const inviteUrl = `${appUrl}/invitacion/${invitacion.token}`;
  const empresaNombre = empresa?.nombre || "un equipo";

  const smtpConfig = await getSmtpConfig();
  if (smtpConfig) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpConfig.smtpHost,
        port: smtpConfig.smtpPort,
        secure: smtpConfig.smtpPort === 465,
        auth: { user: smtpConfig.smtpUser, pass: smtpConfig.smtpPass },
      });

      const rolLabel = rolValido === "ADMIN" ? "Administrador" : rolValido === "SALES" ? "Vendedor" : "Observador";

      await transporter.sendMail({
        from: `"${smtpConfig.nombre}" <${smtpConfig.smtpUser}>`,
        to: email,
        subject: `Invitación para unirte a ${empresaNombre} en DealForge`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3a9bb5;">Te han invitado a unirte a DealForge</h2>
            <p>Has sido invitado a unirte al equipo <strong>${empresaNombre}</strong> en DealForge como <strong>${rolLabel}</strong>.</p>
            <p>DealForge es una plataforma de cotizaciones y CPQ para equipos de ventas.</p>
            <div style="margin: 30px 0;">
              <a href="${inviteUrl}" style="background-color: #3a9bb5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
                Aceptar invitación
              </a>
            </div>
            <p style="color: #999; font-size: 13px;">O copia este enlace: ${inviteUrl}</p>
            <p style="color: #666; font-size: 14px;">Este enlace expira en 7 días.</p>
            <p style="color: #666; font-size: 14px;">Si no esperabas esta invitación, puedes ignorar este email.</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Failed to send invitation email:", err);
      // Don't fail the request if email fails
    }
  }

  return NextResponse.json({
    success: true,
    invitacion: {
      id: invitacion.id,
      email: invitacion.email,
      rol: invitacion.rol,
      expiresAt: invitacion.expiresAt,
      inviteUrl: process.env.NODE_ENV === "development" ? inviteUrl : undefined,
    },
  });
}
