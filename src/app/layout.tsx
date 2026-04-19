import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastProvider } from "@/components/ui/toast";
import { CookieBanner } from "@/components/cookie-banner";

const inter = Inter({ subsets: ["latin"], display: "swap" });

const GA_ID = "G-97QZPF80KT";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3a9bb5",
};

export const metadata: Metadata = {
  title: {
    default: "DealForge - CPQ Inteligente para PYMEs",
    template: "%s | DealForge",
  },
  description:
    "Sistema CPQ (Configure, Price, Quote) inteligente para PYMEs. Gestiona clientes, productos y cotizaciones con asistente IA integrado.",
  keywords: [
    "CPQ", "cotizaciones", "PYMEs", "ventas", "CRM", "DealForge",
    "Configure Price Quote", "software cotizaciones", "automatizar ventas",
    "asistente IA ventas", "propuestas comerciales", "Forge IA",
  ],
  authors: [{ name: "DealForge", url: "https://dealforge.es" }],
  creator: "DealForge",
  publisher: "DealForge",
  openGraph: {
    title: "DealForge - CPQ Inteligente para PYMEs",
    description:
      "Gestiona clientes, productos y cotizaciones con asistente IA integrado.",
    siteName: "DealForge",
    locale: "es_ES",
    type: "website",
    url: "https://dealforge.es",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealForge - CPQ Inteligente para PYMEs",
    description:
      "Gestiona clientes, productos y cotizaciones con asistente IA integrado.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://dealforge.es",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "technology",
  metadataBase: new URL("https://dealforge.es"),
};

// Organization + WebSite JSON-LD (global)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DealForge",
  url: "https://dealforge.es",
  logo: {
    "@type": "ImageObject",
    url: "https://dealforge.es/icon-512.png",
    width: 512,
    height: 512,
  },
  description:
    "Sistema CPQ inteligente con IA para PYMEs. Automatiza cotizaciones comerciales.",
  email: "info@dealforge.es",
  sameAs: [
    "https://www.linkedin.com/company/dealforge",
    "https://x.com/dealforge_es",
  ],
  foundingDate: "2026-01-01",
  knowsAbout: [
    "CPQ", "Configure Price Quote", "Sales Automation",
    "Artificial Intelligence", "Small Business Software",
  ],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "DealForge",
  url: "https://dealforge.es",
  description:
    "Sistema CPQ inteligente con IA para PYMEs. Cotizaciones profesionales en minutos.",
  publisher: {
    "@type": "Organization",
    name: "DealForge",
    url: "https://dealforge.es",
  },
  inLanguage: "es",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://dealforge.es/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* DNS prefetch for third-party origins */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Organization + WebSite structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationJsonLd, webSiteJsonLd]),
          }}
        />
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: localStorage.getItem('dealforge_cookie_consent') === 'all' ? 'granted' : 'denied',
              ad_storage: 'denied',
              wait_for_update: 500,
            });
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>
        <ToastProvider>
          {children}
          <CookieBanner />
          <SpeedInsights />
        </ToastProvider>
      </body>
    </html>
  );
}
