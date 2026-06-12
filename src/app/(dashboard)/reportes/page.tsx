import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ReportesContent } from "@/components/reportes/reportes-content";
import { getSession } from "@/lib/auth";
import { getDashboardLang } from "@/lib/dashboard-lang";
import { REPORTES_STRINGS } from "@/lib/reportes-i18n";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reportes",
  description: "Reportes y analítica del negocio.",
};

export default async function ReportesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const lang = await getDashboardLang(session.empresaId);
  const t = REPORTES_STRINGS[lang];

  return (
    <div>
      <PageHeader
        title={t.pageTitle}
        description={t.pageDescription}
      />
      <ReportesContent />
    </div>
  );
}
