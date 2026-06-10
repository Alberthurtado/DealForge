import Image from "next/image";
import Link from "next/link";

// Full English footer, mirroring the Spanish home footer. Links point to
// English pages where they exist. Legal pages are still Spanish-only for now
// (no English versions yet) — kept here so the links exist; English legal
// pages are a planned follow-up. A language link sends visitors to the
// Spanish site.
export function FooterEn() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.svg" alt="DealForge" width={28} height={28} className="rounded-md brightness-200" />
              <span className="font-bold text-white text-lg">DealForge</span>
            </div>
            <p className="text-sm leading-relaxed">
              AI quoting software (CPQ) for small businesses. Professional quotes in minutes.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/en/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/en/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/en/free-quote-generator" className="hover:text-white transition-colors">Free quote generator</Link></li>
              <li><Link href="/login?lang=en" className="hover:text-white transition-colors">Log in</Link></li>
              <li><Link href="/registro?lang=en" className="hover:text-white transition-colors">Start free</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/en/what-is-cpq" className="hover:text-white transition-colors">What is CPQ?</Link></li>
              <li><Link href="/en/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/" className="hover:text-white transition-colors">Español 🇪🇸</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacidad" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terminos" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/rgpd" className="hover:text-white transition-colors">GDPR</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} DealForge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
