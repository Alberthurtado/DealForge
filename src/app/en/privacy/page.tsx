import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";

export const metadata: Metadata = {
  title: "Privacy Policy — DealForge",
  description: "DealForge privacy policy. How we collect, use and protect your personal data under the GDPR.",
  alternates: {
    canonical: "https://dealforge.es/en/privacy",
    languages: {
      "es-ES": "https://dealforge.es/privacidad",
      en: "https://dealforge.es/en/privacy",
      "x-default": "https://dealforge.es/privacidad",
    },
  },
  openGraph: {
    title: "Privacy Policy — DealForge",
    description: "How we collect, use and protect your personal data under the GDPR.",
    url: "https://dealforge.es/en/privacy",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const LAST_UPDATED = "9 March 2026";

export default function EnPrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar locale="en" altHref="/privacidad" />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="prose-legal">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
              <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            {/* Language note */}
            <div className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-900">
                This is an English translation provided for convenience. In the event of any
                discrepancy, the{" "}
                <Link href="/privacidad" className="font-medium underline hover:text-amber-700">
                  Spanish version
                </Link>{" "}
                prevails.
              </p>
            </div>

            {/* Index */}
            <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Contents</h2>
              <ol className="space-y-1.5 text-sm text-[#3a9bb5]">
                <li><a href="#controller" className="hover:underline">1. Data controller</a></li>
                <li><a href="#data" className="hover:underline">2. Data we collect</a></li>
                <li><a href="#purposes" className="hover:underline">3. Purposes of processing</a></li>
                <li><a href="#legal-basis" className="hover:underline">4. Legal basis</a></li>
                <li><a href="#recipients" className="hover:underline">5. Recipients and processors</a></li>
                <li><a href="#transfers" className="hover:underline">6. International transfers</a></li>
                <li><a href="#retention" className="hover:underline">7. Retention periods</a></li>
                <li><a href="#rights" className="hover:underline">8. Your rights</a></li>
                <li><a href="#cookies" className="hover:underline">9. Cookies</a></li>
                <li><a href="#minors" className="hover:underline">10. Minors</a></li>
                <li><a href="#security" className="hover:underline">11. Security measures</a></li>
                <li><a href="#changes" className="hover:underline">12. Changes</a></li>
                <li><a href="#authority" className="hover:underline">13. Supervisory authority</a></li>
              </ol>
            </nav>

            <div className="space-y-10 text-gray-600 leading-relaxed">

              <section id="controller">
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Data controller</h2>
                <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100">
                  <p><strong className="text-gray-900">Controller:</strong> Albert Hurtado Sanz</p>
                  <p><strong className="text-gray-900">Tax ID (NIF):</strong> 38844142V</p>
                  <p><strong className="text-gray-900">Address:</strong> Carrer Granollers 45, 08173 Sant Cugat del Vallès, Barcelona, Spain</p>
                  <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
                  <p><strong className="text-gray-900">Website:</strong> <a href="https://dealforge.es" className="text-[#3a9bb5] hover:underline">dealforge.es</a></p>
                  <p><strong className="text-gray-900">Data Protection contact:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
                </div>
              </section>

              <section id="data">
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Data we collect</h2>
                <p className="mb-4">We only collect the data needed to provide our service. Data is obtained directly from the user when registering and using the platform:</p>

                <h3 className="text-base font-semibold text-gray-800 mb-2">2.1. Registration and account data</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Password (stored with bcrypt hashing, never in plain text)</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">2.2. Company data</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Company name, tax/VAT number</li>
                  <li>Billing address, city, country</li>
                  <li>Phone, contact email, website</li>
                  <li>Logo (if uploaded voluntarily)</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">2.3. Business data</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Client and contact information that the user enters into the platform</li>
                  <li>Products, prices and generated quotes</li>
                  <li>Activity history within the platform</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">2.4. Payment data</h3>
                <p>Payment data (credit card, bank details) is handled directly by <strong>Stripe, Inc.</strong> under the PCI DSS Level 1 standard. DealForge does not store, process or have access to full card data.</p>

                <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">2.5. Technical data</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address (in server logs, not linked to the user profile)</li>
                  <li>Browser type and operating system (standard HTTP headers)</li>
                </ul>
              </section>

              <section id="purposes">
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Purposes of processing</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Service delivery:</strong> Enabling access, product configuration, quote generation and use of the AI assistant (Forge).</li>
                  <li><strong className="text-gray-800">Account management:</strong> Authentication, password recovery, profile management.</li>
                  <li><strong className="text-gray-800">Billing and payments:</strong> Processing subscriptions and issuing invoices through Stripe.</li>
                  <li><strong className="text-gray-800">Service communications:</strong> Transactional notifications (account confirmation, plan changes, quote approvals, security alerts).</li>
                  <li><strong className="text-gray-800">Product improvement:</strong> Aggregated, anonymized analysis of platform usage to improve features.</li>
                  <li><strong className="text-gray-800">Legal compliance:</strong> Data retention in line with applicable tax and legal obligations.</li>
                </ul>
              </section>

              <section id="legal-basis">
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Legal basis for processing</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Processing</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Legal basis (Art. 6 GDPR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-3 border border-gray-200">Provision of the CPQ service</td><td className="p-3 border border-gray-200">Performance of a contract (Art. 6(1)(b))</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Payments and billing</td><td className="p-3 border border-gray-200">Performance of a contract (Art. 6(1)(b))</td></tr>
                      <tr><td className="p-3 border border-gray-200">Service notifications</td><td className="p-3 border border-gray-200">Performance of a contract (Art. 6(1)(b))</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Retention of tax data</td><td className="p-3 border border-gray-200">Legal obligation (Art. 6(1)(c))</td></tr>
                      <tr><td className="p-3 border border-gray-200">Product improvement (anonymized analytics)</td><td className="p-3 border border-gray-200">Legitimate interest (Art. 6(1)(f))</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Marketing communications</td><td className="p-3 border border-gray-200">Consent (Art. 6(1)(a))</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="recipients">
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Recipients and processors</h2>
                <p className="mb-4">We do not sell, rent or share your personal data with third parties for commercial purposes. Data is shared only with the following processors, which are necessary to deliver the service:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Provider</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Purpose</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Location</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Safeguards</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Supabase (AWS)</td><td className="p-3 border border-gray-200">PostgreSQL database</td><td className="p-3 border border-gray-200">EU (eu-west-1, Ireland)</td><td className="p-3 border border-gray-200">Data in the EU, encryption at rest</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Vercel, Inc.</td><td className="p-3 border border-gray-200">Application hosting and deployment</td><td className="p-3 border border-gray-200">US / EU (Edge)</td><td className="p-3 border border-gray-200">EU-US Data Privacy Framework, SCCs</td></tr>
                      <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Stripe, Inc.</td><td className="p-3 border border-gray-200">Payment processing</td><td className="p-3 border border-gray-200">US / EU</td><td className="p-3 border border-gray-200">PCI DSS Level 1, EU-US DPF, SCCs</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Anthropic, PBC</td><td className="p-3 border border-gray-200">AI assistant (Forge) — query processing</td><td className="p-3 border border-gray-200">US</td><td className="p-3 border border-gray-200">SCCs, data not used for training</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm">All processors have signed agreements ensuring GDPR compliance under Article 28.</p>
              </section>

              <section id="transfers">
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. International data transfers</h2>
                <p className="mb-3">Some of our providers are based in the United States. These transfers are made with the following appropriate safeguards under Article 46 GDPR:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">EU-US Data Privacy Framework (DPF):</strong> Stripe and Vercel are certified under the EU-US Data Privacy Framework, recognized as adequate by the European Commission (Adequacy Decision of 10 July 2023).</li>
                  <li><strong className="text-gray-800">Standard Contractual Clauses (SCCs):</strong> All US providers have signed the Standard Contractual Clauses approved by the European Commission (Decision 2021/914).</li>
                  <li><strong className="text-gray-800">Supplementary measures:</strong> Encryption in transit (TLS 1.2+) and at rest for all transferred data.</li>
                </ul>
              </section>

              <section id="retention">
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Retention periods</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Account data:</strong> For as long as the contractual relationship lasts. After cancellation, kept blocked for the applicable legal periods.</li>
                  <li><strong className="text-gray-800">Tax and billing data:</strong> 5 years under Spanish tax law (Art. 70, General Tax Act 58/2003).</li>
                  <li><strong className="text-gray-800">Business data (quotes, clients):</strong> 6 years under Art. 30 of the Spanish Commercial Code.</li>
                  <li><strong className="text-gray-800">Technical logs:</strong> Maximum 12 months.</li>
                  <li><strong className="text-gray-800">Consents:</strong> For the duration of processing and the limitation periods for possible legal actions.</li>
                </ul>
                <p className="mt-3">Once these periods expire, data is securely and irreversibly deleted.</p>
              </section>

              <section id="rights">
                <h2 className="text-xl font-bold text-gray-900 mb-4">8. Your rights</h2>
                <p className="mb-4">Under the GDPR, you may exercise the following rights at any time:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong className="text-gray-800">Access (Art. 15):</strong> Obtain confirmation of whether we process your data and access a copy.</li>
                  <li><strong className="text-gray-800">Rectification (Art. 16):</strong> Request the correction of inaccurate or incomplete data.</li>
                  <li><strong className="text-gray-800">Erasure (Art. 17):</strong> Request the deletion of your data when it is no longer necessary, you withdraw consent, or you object to processing.</li>
                  <li><strong className="text-gray-800">Restriction (Art. 18):</strong> Request the restriction of processing in certain circumstances.</li>
                  <li><strong className="text-gray-800">Portability (Art. 20):</strong> Receive your data in a structured, commonly used, machine-readable format (JSON/CSV).</li>
                  <li><strong className="text-gray-800">Objection (Art. 21):</strong> Object to processing based on legitimate interest or for direct marketing.</li>
                </ul>
                <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-5">
                  <p className="text-sm"><strong className="text-gray-900">How to exercise your rights:</strong> Email <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline font-medium">info@dealforge.es</a> stating your name, the email associated with your account and the right you wish to exercise. We respond within a maximum of 30 days. Requests are free unless manifestly unfounded or excessive.</p>
                </div>
              </section>

              <section id="cookies">
                <h2 className="text-xl font-bold text-gray-900 mb-4">9. Cookies</h2>
                <p className="mb-3">DealForge uses exclusively <strong>essential, technical cookies</strong> needed for the platform to work:</p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li><strong className="text-gray-800">Session cookie (JWT):</strong> User authentication. Stored as an HttpOnly, Secure, SameSite=Lax cookie. Expires on logout or after 7 days.</li>
                </ul>
                <p>On the public marketing site we additionally use analytics cookies (Google Analytics) subject to your consent via the cookie banner. The logged-in application uses only essential cookies.</p>
              </section>

              <section id="minors">
                <h2 className="text-xl font-bold text-gray-900 mb-4">10. Minors</h2>
                <p>DealForge is a B2B service aimed at businesses and professionals. It is not intended for anyone under 18. We do not knowingly collect personal data from minors. If we detect that a minor has registered, we will delete their account and personal data immediately. If you are a parent or legal guardian and believe a minor has provided personal data, contact us at <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>.</p>
              </section>

              <section id="security">
                <h2 className="text-xl font-bold text-gray-900 mb-4">11. Security measures</h2>
                <p className="mb-3">We implement appropriate technical and organizational measures under Article 32 GDPR:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Encryption in transit:</strong> All communications use HTTPS with TLS 1.2 or higher.</li>
                  <li><strong className="text-gray-800">Encryption at rest:</strong> The database uses AES-256 encryption at rest (Supabase/AWS).</li>
                  <li><strong className="text-gray-800">Password hashing:</strong> Passwords are stored with salted bcrypt hashing, making them unrecoverable.</li>
                  <li><strong className="text-gray-800">Session tokens:</strong> JWTs signed with a secret key, with time-based expiry.</li>
                  <li><strong className="text-gray-800">Security headers:</strong> HSTS, X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy.</li>
                  <li><strong className="text-gray-800">Least-privilege principle:</strong> Each system component accesses only the data strictly necessary.</li>
                </ul>
              </section>

              <section id="changes">
                <h2 className="text-xl font-bold text-gray-900 mb-4">12. Changes to this policy</h2>
                <p>We reserve the right to update this Privacy Policy to reflect changes in our practices or for legal reasons. For substantial changes, we will notify you at least 30 days in advance by email or via an in-app notice. The date of the last update is shown at the top of this document.</p>
              </section>

              <section id="authority">
                <h2 className="text-xl font-bold text-gray-900 mb-4">13. Supervisory authority</h2>
                <p className="mb-3">If you believe the processing of your personal data infringes applicable law, you have the right to lodge a complaint with a supervisory authority. As the controller is established in Spain, the competent authority is:</p>
                <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100">
                  <p><strong className="text-gray-900">Spanish Data Protection Agency (AEPD)</strong></p>
                  <p>C/ Jorge Juan, 6 — 28001 Madrid, Spain</p>
                  <p>Web: <span className="text-[#3a9bb5]">www.aepd.es</span></p>
                </div>
                <p className="mt-3">EEA and UK users may also contact their local data protection authority. In any case, we kindly ask that you contact us first at <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a> so we can try to resolve any issue amicably.</p>
              </section>

              {/* CTA */}
              <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-2">Questions about our privacy policy?</p>
                <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">info@dealforge.es</a>
                <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
                  <Link href="/en/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
                  <span>|</span>
                  <Link href="/en/gdpr" className="hover:text-gray-600 transition-colors">GDPR Compliance</Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
      <FooterEn />
    </div>
  );
}
