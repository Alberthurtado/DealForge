import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Clock } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contacto — DealForge",
  description:
    "Contacta con DealForge. Solicita una demo, resuelve tus dudas o consulta sobre el plan Enterprise. Respuesta en menos de 24h.",
  keywords: [
    "contacto DealForge", "demo CPQ", "soporte DealForge",
    "cotizaciones software contacto",
  ],
  openGraph: {
    title: "Contacto — DealForge",
    description: "Contacta con DealForge. Respuesta en menos de 24h.",
    url: "https://dealforge.es/contacto",
  },
  alternates: { canonical: "https://dealforge.es/contacto" },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md" />
            <span className="font-bold text-gray-900 text-lg">DealForge</span>
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold text-[#3a9bb5] hover:text-[#2d7d94] transition-colors"
          >
            Prueba gratis &rarr;
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            ¿Hablamos?
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Cuéntanos qué necesitas y te responderemos lo antes posible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#3a9bb5]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Email</h3>
                  <a href="mailto:info@dealforge.es" className="text-sm text-[#3a9bb5] hover:underline">
                    info@dealforge.es
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#3a9bb5]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Ubicación</h3>
                  <p className="text-sm text-gray-500">Barcelona, España</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#3a9bb5]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Tiempo de respuesta</h3>
                  <p className="text-sm text-gray-500">Menos de 24 horas laborables</p>
                </div>
              </div>
            </div>

            {/* FAQ quicklinks */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Antes de escribir...</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/documentacion" className="text-[#3a9bb5] hover:underline">
                    Documentación completa &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-[#3a9bb5] hover:underline">
                    Preguntas frecuentes &rarr;
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-[#3a9bb5] hover:underline">
                    Blog y recursos &rarr;
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right — Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DealForge. Todos los derechos reservados.
            {" · "}
            <Link href="/privacidad" className="hover:text-gray-600 underline">Privacidad</Link>
            {" · "}
            <Link href="/terminos" className="hover:text-gray-600 underline">Términos</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
