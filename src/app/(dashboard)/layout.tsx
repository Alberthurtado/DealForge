import { Sidebar } from "@/components/layout/sidebar";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";
import { getDashboardLang } from "@/lib/dashboard-lang";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const features = session ? getPlanFeatures(session.plan) : undefined;

  // Dashboard language follows the company's configured locale.
  const lang = await getDashboardLang(session?.empresaId);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          lang={lang}
          user={
            session
              ? { nombre: session.nombre, email: session.email, plan: session.plan, features }
              : null
          }
        />
        <main className="flex-1 overflow-y-auto bg-gray-50" role="main">
          {children}
        </main>
      </div>
      <AssistantPanel userId={session?.userId} />
    </>
  );
}
