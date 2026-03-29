import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// GET /api/equipo — list all members + pending invitations of the current team
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (!session.empresaId) return NextResponse.json({ error: "Sin equipo" }, { status: 400 });

  const [miembros, invitaciones, empresa] = await Promise.all([
    prisma.equipoMembro.findMany({
      where: { empresaId: session.empresaId },
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            email: true,
            activo: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.invitacion.findMany({
      where: {
        empresaId: session.empresaId,
        usadaAt: null,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.empresa.findUnique({
      where: { id: session.empresaId },
      select: { plan: true, nombre: true },
    }),
  ]);

  // Max members per plan
  const planLimits: Record<string, number> = {
    starter: 1,
    pro: 5,
    business: 20,
    enterprise: 0, // unlimited
  };
  const plan = empresa?.plan || "starter";
  const maxMiembros = planLimits[plan] ?? 1;

  return NextResponse.json({
    miembros: miembros.map((m) => ({
      id: m.id,
      usuarioId: m.usuarioId,
      nombre: m.usuario.nombre,
      email: m.usuario.email,
      rol: m.rol,
      activo: m.usuario.activo,
      createdAt: m.createdAt,
      isCurrentUser: m.usuarioId === session.userId,
    })),
    invitaciones: invitaciones.map((i) => ({
      id: i.id,
      email: i.email,
      rol: i.rol,
      expiresAt: i.expiresAt,
      createdAt: i.createdAt,
    })),
    plan,
    maxMiembros,
    canInvite: session.rol === "ADMIN" && (maxMiembros === 0 || miembros.length < maxMiembros),
    currentUserRol: session.rol,
  });
}
