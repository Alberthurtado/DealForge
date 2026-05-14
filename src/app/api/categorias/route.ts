import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { categoriaCreateSchema } from "@/lib/validations";
import { validateBody } from "@/lib/validate";

// Build an owner filter that returns the categorías visible to the current
// session: the user's own + their team's shared ones.
function ownerFilter(session: { userId: string; empresaId?: string | null }) {
  return session.empresaId
    ? {
        OR: [
          { equipoId: session.empresaId },
          { usuarioId: session.userId, equipoId: null },
        ],
      }
    : { usuarioId: session.userId };
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const categorias = await prisma.categoria.findMany({
    where: ownerFilter(session),
    include: {
      _count: {
        select: {
          productos: {
            where: session.empresaId
              ? {
                  OR: [
                    { equipoId: session.empresaId },
                    { usuarioId: session.userId, equipoId: null },
                  ],
                }
              : { usuarioId: session.userId },
          },
        },
      },
    },
    orderBy: { nombre: "asc" },
  });

  return NextResponse.json(categorias);
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  try {
    const body = await req.json();
    const { data, error } = validateBody(categoriaCreateSchema, body);
    if (error) return error;

    // Reuse if this user already has a categoría with the same name (case-insensitive).
    const existing = await prisma.categoria.findFirst({
      where: {
        nombre: { equals: data.nombre, mode: "insensitive" },
        ...ownerFilter(session),
      },
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const categoria = await prisma.categoria.create({
      data: {
        nombre: data.nombre,
        usuarioId: session.userId,
        equipoId: session.empresaId || null,
      },
    });

    return NextResponse.json(categoria, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear la categoria" }, { status: 500 });
  }
}
