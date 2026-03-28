import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Home, BookOpen, Mail, Layers } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o ha sido movida.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="w-full py-6 px-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/logo.svg" alt="DealForge" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900">DealForge</span>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <p className="text-[#3a9bb5] font-semibold text-lg mb-2">Error 404</p>
          <h1 className="text-7xl font-extrabold text-gray-900 mb-4">
            Página no encontrada
          </h1>
          <p className="text-lg text-gray-500 mb-10">
            Lo sentimos, la página que buscas no existe o ha sido movida.
            Puede que el enlace esté incorrecto o la página haya sido eliminada.
          </p>

          {/* Navigation links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <Link
              href="/"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#3a9bb5] hover:bg-[#3a9bb5]/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center group-hover:bg-[#3a9bb5]/20 transition-colors">
                <Home className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Inicio</p>
                <p className="text-sm text-gray-500">Volver a la página principal</p>
              </div>
            </Link>

            <Link
              href="/funcionalidades"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#3a9bb5] hover:bg-[#3a9bb5]/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center group-hover:bg-[#3a9bb5]/20 transition-colors">
                <Layers className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Funcionalidades</p>
                <p className="text-sm text-gray-500">Descubre lo que ofrecemos</p>
              </div>
            </Link>

            <Link
              href="/blog"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#3a9bb5] hover:bg-[#3a9bb5]/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center group-hover:bg-[#3a9bb5]/20 transition-colors">
                <BookOpen className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Blog</p>
                <p className="text-sm text-gray-500">Artículos y recursos</p>
              </div>
            </Link>

            <Link
              href="/contacto"
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#3a9bb5] hover:bg-[#3a9bb5]/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#3a9bb5]/10 flex items-center justify-center group-hover:bg-[#3a9bb5]/20 transition-colors">
                <Mail className="w-5 h-5 text-[#3a9bb5]" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">Contacto</p>
                <p className="text-sm text-gray-500">¿Necesitas ayuda?</p>
              </div>
            </Link>
          </div>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#3a9bb5] text-white font-semibold rounded-lg hover:bg-[#2d7d94] transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} DealForge. Todos los derechos reservados.
      </footer>
    </div>
  );
}
