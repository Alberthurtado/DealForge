import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: {
    default: "DealForge - CPQ Inteligente para PYMEs",
    template: "%s | DealForge",
  },
  description:
    "Sistema CPQ (Configure, Price, Quote) inteligente para PYMEs. Gestiona clientes, productos y cotizaciones con asistente IA integrado.",
  keywords: ["CPQ", "cotizaciones", "PYMEs", "ventas", "CRM", "DealForge"],
  authors: [{ name: "DealForge", url: "https://dealforge.es" }],
  openGraph: {
    title: "DealForge - CPQ Inteligente para PYMEs",
    description:
      "Gestiona clientes, productos y cotizaciones con asistente IA integrado.",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  metadataBase: new URL("https://dealforge.es"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
