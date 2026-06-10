"use client";

import { useState, useEffect } from "react";
import { Menu, X, Flame } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Locale = "es" | "en";

interface NavLink {
  label: string;
  href: string;
}

const NAV_CONFIG: Record<
  Locale,
  { links: NavLink[]; login: string; cta: string; home: string }
> = {
  es: {
    home: "/",
    links: [
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Forge IA", href: "#forge" },
      { label: "Precios", href: "/precios" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "#faq" },
    ],
    login: "Acceder",
    cta: "Prueba Gratis",
  },
  en: {
    home: "/en",
    links: [
      { label: "Features", href: "/en/features" },
      { label: "Pricing", href: "/en/pricing" },
      { label: "What is CPQ?", href: "/en/what-is-cpq" },
      { label: "Contact", href: "/en/contact" },
    ],
    login: "Log in",
    cta: "Start Free",
  },
};

interface Props {
  locale?: Locale;
  // URL of the current page in the other language, for the language switcher.
  altHref?: string;
}

export function Navbar({ locale = "es", altHref }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cfg = NAV_CONFIG[locale];
  // Keep the language through the auth flow for English visitors.
  const authSuffix = locale === "en" ? "?lang=en" : "";
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  // Default switch target: the other language's home, unless the page provides
  // its exact counterpart via altHref.
  const switchHref = altHref ?? NAV_CONFIG[otherLocale].home;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={cfg.home} className="flex items-center gap-2.5">
            <Image src="/logo.svg" alt="DealForge" width={32} height={32} className="rounded-lg" />
            <span className="font-bold text-lg text-gray-900">DealForge</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {cfg.links.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTAs + language switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LangSwitcher locale={locale} switchHref={switchHref} />
            <Link
              href={`/login${authSuffix}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 px-4 py-2 transition-colors"
            >
              {cfg.login}
            </Link>
            <Link
              href={`/registro${authSuffix}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#3a9bb5] hover:bg-[#2d7d94] px-5 py-2.5 rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
            >
              <Flame className="w-4 h-4" />
              {cfg.cta}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {cfg.links.map((link) =>
              link.href.startsWith("#") ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <div className="px-3 py-1">
                <LangSwitcher locale={locale} switchHref={switchHref} />
              </div>
              <Link
                href={`/login${authSuffix}`}
                className="block text-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
              >
                {cfg.login}
              </Link>
              <Link
                href={`/registro${authSuffix}`}
                className="block text-center px-3 py-2.5 text-sm font-semibold text-white bg-[#3a9bb5] rounded-lg"
              >
                {cfg.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitcher({ locale, switchHref }: { locale: Locale; switchHref: string }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-gray-200 overflow-hidden text-xs font-semibold">
      <span
        className={`px-2.5 py-1.5 ${
          locale === "es" ? "bg-[#3a9bb5] text-white" : "text-gray-500"
        }`}
      >
        {locale === "es" ? "ES" : (
          <Link href={switchHref} className="hover:text-gray-900">ES</Link>
        )}
      </span>
      <span
        className={`px-2.5 py-1.5 ${
          locale === "en" ? "bg-[#3a9bb5] text-white" : "text-gray-500"
        }`}
      >
        {locale === "en" ? "EN" : (
          <Link href={switchHref} className="hover:text-gray-900">EN</Link>
        )}
      </span>
    </div>
  );
}
