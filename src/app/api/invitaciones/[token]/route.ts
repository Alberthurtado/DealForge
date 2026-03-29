import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getSession, createToken, getCookieName, hashPassword } from "@/lib/auth";

// GET /api/invitaciones/[token] — get invitation info (public, for the invite landing page)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitacion = await prisma.invitacion.findUnique({
    where: { token },
    include: {
      empresa: { select: { nombre: true, logoUrl: true } },
    },
  });

  if (!invitacion) {
    return NextResponse.json({ error: "Invitación no encontrada" }, { status: 404 });
  }

  if (invitacion.usadaAt) {
    return NextResponse.json({ error: "Esta invitación ya ha sido usada" }, { status: 410 });
  }

  if (new Date() > invitacion.expiresAt) {
    return NextResponse.json({ error: "Esta invitación ha expirado" }, { status: 410 });
  }

  return NextResponse.json({
    email: invitacion.email,
    rol: invitacion.rol,
    empresaNombre: invitacion.empresa.nombre,
    empresaLogoUrl: invitacion.empresa.logoUrl,
    expiresAt: invitacion.expiresAt,
  });
}

// POST /api/invitaciones/[token] — accept invitation
// Body: { action: "join" } if user is logged in, or { action: "register", nombre, password } for new users
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  const invitacion = await prisma.invitacion.findUnique({
    where: { token },
    include: {
      empresa: { select: { id: true, nombre: true, plan: true } },
    },
  });

  if (!invitacion || invitacion.usadaAt || new Date() > invitacion.expiresAt) {
    return NextResponse.json({ error: "Invitación inválida o expirada" }, { status: 410 });
  }

  const body = await request.json();
  const { action, nombre, password } = body as {
    action: "join" | "register";
    nombre?: string;
    password?: string;
  };

  let userId: string;
  let userEmail: string;
  let userNombre: string;

  if (action === "join") {
    // User is already logged in — verify session
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Debes iniciar sesión primero" }, { status: 401 });
    }
    if (session.email !== invitacion.email) {
      return NextResponse.json(
        { error: `Esta invitación es para ${invitacion.email}` },
        { status: 403 }
      );
    }
    userId = session.userId;
    userEmail = session.email;
    userNombre = session.nombre;
  } else if (action === "register") {
    // New user — create account
    if (!nombre || !password) {
      return NextResponse.json({ error: "Nombre y contraseña requeridos" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 });
    }

    // Check if email already exists
    const existing = await prisma.usuario.findUnique({ where: { email: invitacion.email } });
    if (existing) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con este email. Inicia sesión primero." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const newUser = await prisma.usuario.create({
      data: {
        nombre,
        email: invitacion.email,
        passwordHash,
        plan: invitacion.empresa.plan,
        empresaId: invitacion.empresaId,
      },
    });
    userId = newUser.id;
    userEmail = newUser.email;
    userNombre = newUser.nombre;
  } else {
    return NextResponse.json({ error: "Acción inválida" }, { status: 400 });
  }

  // Add to team (upsert in case they were previously removed)
  await prisma.equipoMembro.upsert({
    where: { empresaId_usuarioId: { empresaId: invitacion.empresaId, usuarioId: userId } },
    update: { rol: invitacion.rol },
    create: {
      empresaId: invitacion.empresaId,
      usuarioId: userId,
      rol: invitacion.rol,
    },
  });

  // Update user's empresaId to the invited empresa
  await prisma.usuario.update({
    where: { id: userId },
    data: { empresaId: invitacion.empresaId },
  });

  // Mark invitation as used
  await prisma.invitacion.update({
    where: { token },
    data: { usadaAt: new Date() },
  });

  // Create new JWT for the user with the team context
  const jwtToken = await createToken({
    userId,
    email: userEmail,
    plan: invitacion.empresa.plan,
    nombre: userNombre,
    empresaId: invitacion.empresaId,
    rol: invitacion.rol,
  });

  const response = NextResponse.json({
    success: true,
    empresaNombre: invitacion.empresa.nombre,
  });

  response.cookies.set(getCookieName(), jwtToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
