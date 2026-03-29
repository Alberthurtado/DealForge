import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { ReportesContent } from "@/components/reportes/reportes-content";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Reportes",
  description: "Reportes y analítica del negocio.",
};

export default async function ReportesPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div>
      <PageHeader
        title="Reportes"
        description="Analítica en tiempo real de tu negocio"
      />
      <ReportesContent />
    </div>
  );
}
