import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies, headers } from "next/headers";
import { hashApiKey, isValidApiKeyFormat } from "@/lib/api-key";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "dealforge_token";

function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "FATAL: JWT_SECRET no está definido. Configura la variable de entorno JWT_SECRET."
    );
  }
  return new TextEncoder().encode(secret);
}

const JWT_SECRET = getJwtSecret();

export interface JWTPayload {
  userId: string;
  email: string;
  plan: string;
  nombre: string;
  empresaId: string;
  rol: string;  // ADMIN | SALES | VIEWER
}

// ─── Password hashing ───────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── JWT Token ──────────────────────────────────
export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

// ─── API Key session resolution ─────────────────
async function getSessionFromApiKey(rawKey: string): Promise<JWTPayload | null> {
  if (!isValidApiKeyFormat(rawKey)) return null;
  const hash = hashApiKey(rawKey);
  const user = await prisma.usuario.findUnique({
    where: { apiKeyHash: hash },
    select: {
      id: true,
      email: true,
      plan: true,
      nombre: true,
      activo: true,
      empresaId: true,
      miembros: { select: { rol: true, empresaId: true }, take: 1 },
      empresa: { select: { plan: true } },
    },
  });
  if (!user || !user.activo) return null;

  const membresia = user.miembros[0];
  const empresaId = membresia?.empresaId || user.empresaId;
  const rol = membresia?.rol || "ADMIN";
  const plan = user.empresa?.plan || user.plan;

  return { userId: user.id, email: user.email, plan, nombre: user.nombre, empresaId, rol };
}

// ─── Session helpers ────────────────────────────
export async function getSession(): Promise<JWTPayload | null> {
  // Check for API key forwarded by middleware
  const headerStore = await headers();
  const apiKey = headerStore.get("x-dealforge-api-key");
  if (apiKey) return getSessionFromApiKey(apiKey);

  // Fallback to cookie-based JWT
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = await verifyToken(token);

  // Backfill empresaId/rol for old tokens that don't have them
  if (session && !session.empresaId) {
    const user = await prisma.usuario.findUnique({
      where: { id: session.userId },
      select: {
        empresaId: true,
        miembros: { select: { rol: true, empresaId: true }, take: 1 },
        empresa: { select: { plan: true } },
      },
    });
    if (user) {
      const membresia = user.miembros[0];
      session.empresaId = membresia?.empresaId || user.empresaId;
      session.rol = membresia?.rol || "ADMIN";
      session.plan = user.empresa?.plan || session.plan;
    }
  }

  return session;
}

export function getCookieName(): string {
  return COOKIE_NAME;
}
