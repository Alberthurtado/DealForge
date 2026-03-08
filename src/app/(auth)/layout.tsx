import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0f9ff] via-[#f8fffe] to-white flex flex-col">
      {/* Minimal header */}
      <header className="flex items-center justify-center py-8">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.svg"
            alt="DealForge"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="font-bold text-xl text-gray-900">DealForge</span>
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 pb-16">
        {children}
      </main>

      {/* Minimal footer */}
      <footer className="py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} DealForge. Todos los derechos
        reservados.
      </footer>
    </div>
  );
}
