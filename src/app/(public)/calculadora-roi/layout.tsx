import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calculadora ROI CPQ — DealForge",
  description:
    "Calcula cuánto puedes ahorrar automatizando tus cotizaciones con un CPQ. Descubre el ROI real de DealForge: horas ahorradas, ingresos extra y retorno de inversión.",
  keywords: [
    "calculadora ROI CPQ",
    "ROI automatización ventas",
    "retorno inversión CPQ",
    "ahorro cotizaciones automatizadas",
    "CPQ ROI calculator",
    "DealForge ROI",
  ],
  openGraph: {
    title: "Calculadora ROI CPQ — DealForge",
    description:
      "Calcula cuánto puedes ahorrar automatizando tus cotizaciones con un CPQ. Horas ahorradas, ingresos extra y retorno de inversión.",
    url: "https://dealforge.es/calculadora-roi",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "https://dealforge.es/og-calculadora-roi.png",
        width: 1200,
        height: 630,
        alt: "Calculadora ROI CPQ — DealForge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora ROI CPQ — DealForge",
    description:
      "Calcula cuánto puedes ahorrar automatizando tus cotizaciones con un CPQ.",
    images: ["https://dealforge.es/og-calculadora-roi.png"],
  },
  alternates: { canonical: "https://dealforge.es/calculadora-roi" },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Calculadora ROI CPQ",
    description:
      "Calcula cuánto puedes ahorrar automatizando tus cotizaciones con un CPQ. Descubre el ROI real de DealForge.",
    url: "https://dealforge.es/calculadora-roi",
    publisher: {
      "@type": "Organization",
      name: "DealForge",
      url: "https://dealforge.es",
      logo: { "@type": "ImageObject", url: "https://dealforge.es/logo.svg" },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://dealforge.es",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculadora ROI CPQ",
        item: "https://dealforge.es/calculadora-roi",
      },
    ],
  },
];

export default function CalculadoraRoiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {children}
    </>
  );
}
