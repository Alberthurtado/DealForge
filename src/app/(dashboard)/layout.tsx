import { Sidebar } from "@/components/layout/sidebar";
import { AssistantPanel } from "@/components/assistant/assistant-panel";
import { getSession } from "@/lib/auth";
import { getPlanFeatures } from "@/lib/plan-limits";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const features = session ? getPlanFeatures(session.plan) : undefined;

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
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
