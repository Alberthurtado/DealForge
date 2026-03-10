import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/_landing/navbar";

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
  { label: "RGPD", href: "/rgpd" },
];

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>

      {/* Footer simplificado */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <Image src="/logo.svg" alt="DealForge" width={24} height={24} className="rounded-md brightness-200" />
              <span className="font-bold text-white text-sm">DealForge</span>
            </Link>

            <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
              {LEGAL_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
              <a href="mailto:info@dealforge.es" className="hover:text-white transition-colors">
                Contacto
              </a>
            </nav>

            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} DealForge
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
