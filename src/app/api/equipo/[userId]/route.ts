import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

// PUT /api/equipo/[userId] — update member role
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.rol !== "ADMIN") {
    return NextResponse.json({ error: "Solo los administradores pueden cambiar roles" }, { status: 403 });
  }

  const { userId } = await params;
  const body = await request.json();
  const { rol } = body as { rol?: string };

  if (!["ADMIN", "SALES", "VIEWER"].includes(rol || "")) {
    return NextResponse.json({ error: "Rol inválido" }, { status: 400 });
  }

  // Cannot change own role
  if (userId === session.userId) {
    return NextResponse.json({ error: "No puedes cambiar tu propio rol" }, { status: 400 });
  }

  // Ensure target member belongs to same team
  const membresia = await prisma.equipoMembro.findUnique({
    where: { empresaId_usuarioId: { empresaId: session.empresaId, usuarioId: userId } },
  });

  if (!membresia) {
    return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 });
  }

  const updated = await prisma.equipoMembro.update({
    where: { empresaId_usuarioId: { empresaId: session.empresaId, usuarioId: userId } },
    data: { rol: rol as string },
  });

  return NextResponse.json({ success: true, membresia: updated });
}

// DELETE /api/equipo/[userId] — remove member from team
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  if (session.rol !== "ADMIN") {
    return NextResponse.json({ error: "Solo los administradores pueden eliminar miembros" }, { status: 403 });
  }

  const { userId } = await params;

  // Cannot remove yourself
  if (userId === session.userId) {
    return NextResponse.json({ error: "No puedes eliminarte a ti mismo del equipo" }, { status: 400 });
  }

  // Ensure target member belongs to same team
  const membresia = await prisma.equipoMembro.findUnique({
    where: { empresaId_usuarioId: { empresaId: session.empresaId, usuarioId: userId } },
  });

  if (!membresia) {
    return NextResponse.json({ error: "Miembro no encontrado" }, { status: 404 });
  }

  await prisma.equipoMembro.delete({
    where: { empresaId_usuarioId: { empresaId: session.empresaId, usuarioId: userId } },
  });

  return NextResponse.json({ success: true });
}
