import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Cuenta Gratis — DealForge",
  description:
    "Registrate gratis en DealForge. Crea cotizaciones profesionales con IA, gestiona clientes y productos. Sin tarjeta de credito.",
  keywords: [
    "registro DealForge", "crear cuenta CPQ", "software cotizaciones gratis",
    "CPQ gratis", "crear presupuestos online",
  ],
  openGraph: {
    title: "Crear Cuenta Gratis — DealForge",
    description:
      "Registrate gratis y empieza a crear cotizaciones profesionales con IA en minutos.",
    url: "https://dealforge.es/registro",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
  },
  alternates: {
    canonical: "https://dealforge.es/registro",
  },
};

export default function RegistroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
