import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";
import { ContactForm } from "../../(public)/contacto/contact-form";

export const metadata: Metadata = {
  title: "Contact — DealForge | Talk to us about quoting software",
  description:
    "Get in touch with the DealForge team. Request a demo, ask about the Enterprise plan, or get help. We reply within 48 working hours.",
  alternates: {
    canonical: "https://dealforge.es/en/contact",
    languages: {
      "es-ES": "https://dealforge.es/contacto",
      en: "https://dealforge.es/en/contact",
      "x-default": "https://dealforge.es/contacto",
    },
  },
  openGraph: {
    title: "Contact — DealForge",
    description: "Request a demo or ask us anything about DealForge.",
    url: "https://dealforge.es/en/contact",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

export default function EnContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar locale="en" altHref="/contacto" />

      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            Talk to us
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Questions about DealForge, a demo, or the Enterprise plan? Send us a message.
          </p>
        </div>
      </section>

      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_1.4fr] gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <a href="mailto:info@dealforge.es" className="text-sm text-[#3a9bb5] hover:underline">
                  info@dealforge.es
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">What to expect</h3>
                <p className="text-sm text-gray-500">
                  A real reply from the team — no bots, no canned responses.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#3a9bb5]/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Response time</h3>
                <p className="text-sm text-gray-500">Under 48 working hours</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <ContactForm lang="en" />
          </div>
        </div>
      </section>

      <FooterEn />
    </div>
  );
}
