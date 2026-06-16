import { prisma } from "@/lib/prisma";

// ─── Resolve the owning empresa (tenant) for a record ───────────────
//
// Quotes and contracts belong to a team (equipoId) or, for personal records
// with no team, to the owner's empresa (usuario.empresaId — every user has
// one). These helpers replace the legacy hardcoded `empresa "default"` lookups
// so branding, SMTP, T&C and numbering come from the record's real tenant.

export async function empresaIdForUser(userId: string): Promise<string | null> {
  const u = await prisma.usuario.findUnique({
    where: { id: userId },
    select: { empresaId: true },
  });
  return u?.empresaId ?? null;
}

export async function empresaIdForCotizacion(
  cotizacionId: string
): Promise<string | null> {
  const c = await prisma.cotizacion.findUnique({
    where: { id: cotizacionId },
    select: { equipoId: true, usuario: { select: { empresaId: true } } },
  });
  if (!c) return null;
  return c.equipoId ?? c.usuario.empresaId;
}

export async function empresaIdForContrato(
  contratoId: string
): Promise<string | null> {
  const c = await prisma.contrato.findUnique({
    where: { id: contratoId },
    select: { equipoId: true, usuario: { select: { empresaId: true } } },
  });
  if (!c) return null;
  return c.equipoId ?? c.usuario.empresaId;
}

export async function empresaIdForFirma(
  firmaToken: string
): Promise<string | null> {
  const f = await prisma.firma.findUnique({
    where: { token: firmaToken },
    select: {
      cotizacion: { select: { equipoId: true, usuario: { select: { empresaId: true } } } },
    },
  });
  if (!f?.cotizacion) return null;
  return f.cotizacion.equipoId ?? f.cotizacion.usuario.empresaId;
}

export async function empresaIdForAprobacion(
  aprobacionToken: string
): Promise<string | null> {
  const a = await prisma.aprobacion.findUnique({
    where: { token: aprobacionToken },
    select: {
      cotizacion: { select: { equipoId: true, usuario: { select: { empresaId: true } } } },
    },
  });
  if (!a?.cotizacion) return null;
  return a.cotizacion.equipoId ?? a.cotizacion.usuario.empresaId;
}

// Fetch the full empresa branding/settings record for a quote.
export async function empresaForCotizacion(cotizacionId: string) {
  const id = await empresaIdForCotizacion(cotizacionId);
  return id ? prisma.empresa.findUnique({ where: { id } }) : null;
}

export async function empresaForContrato(contratoId: string) {
  const id = await empresaIdForContrato(contratoId);
  return id ? prisma.empresa.findUnique({ where: { id } }) : null;
}
