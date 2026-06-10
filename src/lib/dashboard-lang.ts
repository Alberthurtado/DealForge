// Server-only helper to resolve the dashboard language from a company's
// configured locale. Kept separate from dashboard-i18n.ts (which is imported
// by client components) so Prisma never gets pulled into the client bundle.

import { prisma } from "@/lib/prisma";
import { resolveDashboardLang, type DashboardLang } from "@/lib/dashboard-i18n";

export async function getDashboardLang(
  empresaId: string | null | undefined
): Promise<DashboardLang> {
  if (!empresaId) return "es";
  const empresa = await prisma.empresa.findUnique({
    where: { id: empresaId },
    select: { locale: true },
  });
  return resolveDashboardLang(empresa?.locale);
}
