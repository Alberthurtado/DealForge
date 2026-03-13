import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión — DealForge",
  description:
    "Accede a tu cuenta de DealForge. Sistema CPQ con IA para crear cotizaciones profesionales en minutos.",
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://dealforge.es/login",
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
