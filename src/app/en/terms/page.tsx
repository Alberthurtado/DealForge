import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";

export const metadata: Metadata = {
  title: "Terms of Service — DealForge",
  description: "Terms and conditions of use for the DealForge CPQ platform. Subscription terms, plans, payments and responsibilities.",
  alternates: {
    canonical: "https://dealforge.es/en/terms",
    languages: {
      "es-ES": "https://dealforge.es/terminos",
      en: "https://dealforge.es/en/terms",
      "x-default": "https://dealforge.es/terminos",
    },
  },
  openGraph: {
    title: "Terms of Service — DealForge",
    description: "Subscription terms, plans, payments and responsibilities.",
    url: "https://dealforge.es/en/terms",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const LAST_UPDATED = "9 March 2026";

export default function EnTermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar locale="en" altHref="/terminos" />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="prose-legal">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Terms of Service</h1>
              <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            {/* Language note */}
            <div className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-900">
                This is an English translation provided for convenience. In the event of any
                discrepancy, the{" "}
                <Link href="/terminos" className="font-medium underline hover:text-amber-700">
                  Spanish version
                </Link>{" "}
                prevails.
              </p>
            </div>

            {/* Index */}
            <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Contents</h2>
              <ol className="space-y-1.5 text-sm text-[#3a9bb5]">
                <li><a href="#provider" className="hover:underline">1. Provider identification</a></li>
                <li><a href="#scope" className="hover:underline">2. Purpose and scope</a></li>
                <li><a href="#acceptance" className="hover:underline">3. Acceptance of terms</a></li>
                <li><a href="#service" className="hover:underline">4. Service description</a></li>
                <li><a href="#account" className="hover:underline">5. Registration and user account</a></li>
                <li><a href="#plans" className="hover:underline">6. Plans, pricing and billing</a></li>
                <li><a href="#refunds" className="hover:underline">7. Right of withdrawal and refunds</a></li>
                <li><a href="#obligations" className="hover:underline">8. User obligations</a></li>
                <li><a href="#prohibited" className="hover:underline">9. Prohibited uses</a></li>
                <li><a href="#ai" className="hover:underline">10. Use of the AI assistant (Forge)</a></li>
                <li><a href="#ip" className="hover:underline">11. Intellectual property</a></li>
                <li><a href="#user-data" className="hover:underline">12. User data and content</a></li>
                <li><a href="#availability" className="hover:underline">13. Service availability</a></li>
                <li><a href="#liability" className="hover:underline">14. Limitation of liability</a></li>
                <li><a href="#indemnity" className="hover:underline">15. Indemnification</a></li>
                <li><a href="#termination" className="hover:underline">16. Suspension and termination</a></li>
                <li><a href="#changes" className="hover:underline">17. Changes to the terms</a></li>
                <li><a href="#law" className="hover:underline">18. Governing law and jurisdiction</a></li>
                <li><a href="#disputes" className="hover:underline">19. Alternative dispute resolution</a></li>
                <li><a href="#contact" className="hover:underline">20. Contact</a></li>
              </ol>
            </nav>

            <div className="space-y-10 text-gray-600 leading-relaxed">

              <section id="provider">
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Provider identification</h2>
                <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100">
                  <p><strong className="text-gray-900">Provider:</strong> Albert Hurtado Sanz (sole trader)</p>
                  <p><strong className="text-gray-900">Tax ID (NIF):</strong> 38844142V</p>
                  <p><strong className="text-gray-900">Address:</strong> Carrer Granollers 45, 08173 Sant Cugat del Vallès, Barcelona, Spain</p>
                  <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
                  <p><strong className="text-gray-900">Website:</strong> <a href="https://dealforge.es" className="text-[#3a9bb5] hover:underline">dealforge.es</a></p>
                </div>
                <p className="mt-3 text-sm">In compliance with Article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE).</p>
              </section>

              <section id="scope">
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Purpose and scope</h2>
                <p>These Terms of Service govern access to and use of the DealForge platform, an AI-assisted configure-price-quote (CPQ) software-as-a-service (SaaS) aimed at businesses and self-employed professionals.</p>
                <p className="mt-3">These terms constitute a binding contract between the user (the &quot;User&quot;) and DealForge (the &quot;Provider&quot;).</p>
              </section>

              <section id="acceptance">
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Acceptance of terms</h2>
                <p>By registering on the platform, the User declares that they have read, understood and fully accepted these Terms of Service, as well as the <Link href="/en/privacy" className="text-[#3a9bb5] hover:underline">Privacy Policy</Link>. If you do not agree with these terms, you must not use the service.</p>
                <p className="mt-3">If the User acts on behalf of a company or organization, they declare that they have authority to bind that entity to these terms.</p>
              </section>

              <section id="service">
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Service description</h2>
                <p className="mb-3">DealForge provides the following main features:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Product management:</strong> Product catalog with variants, categories and configurable pricing.</li>
                  <li><strong className="text-gray-800">Client management:</strong> Database of clients and contacts with sales history.</li>
                  <li><strong className="text-gray-800">Quote generation:</strong> Creation, sending and tracking of professional proposals in PDF.</li>
                  <li><strong className="text-gray-800">Business rules:</strong> Rules engine for discounts, margins and automatic approvals.</li>
                  <li><strong className="text-gray-800">Approval flow:</strong> Email-based approval system with a secure link.</li>
                  <li><strong className="text-gray-800">AI assistant (Forge):</strong> Built-in assistant that helps with navigation and platform operations.</li>
                  <li><strong className="text-gray-800">Analytics dashboard:</strong> Pipeline, conversion and revenue metrics.</li>
                </ul>
              </section>

              <section id="account">
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Registration and user account</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Registration requires a name, a valid email address and a password.</li>
                  <li>The User guarantees the truthfulness, accuracy and currency of the data provided.</li>
                  <li>The User is solely responsible for keeping their access credentials confidential.</li>
                  <li>The User must immediately notify DealForge of any unauthorized use of their account at <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>.</li>
                  <li>Each account is personal and non-transferable. Sharing credentials is prohibited.</li>
                  <li>DealForge reserves the right to suspend accounts with false or fraudulent data.</li>
                </ul>
              </section>

              <section id="plans">
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Plans, pricing and billing</h2>
                <h3 className="text-base font-semibold text-gray-800 mb-3">6.1. Available plans</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Plan</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Price</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Key features</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Starter</td><td className="p-3 border border-gray-200">Free</td><td className="p-3 border border-gray-200">Up to 10 quotes/month, 5 clients, 10 products, basic Forge AI</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Pro</td><td className="p-3 border border-gray-200">$29/£25/€29 per month</td><td className="p-3 border border-gray-200">100 quotes/month, 50 clients, 200 products, unlimited Forge AI, e-signature, branded PDF</td></tr>
                      <tr><td className="p-3 border border-gray-200 font-medium text-gray-800">Business</td><td className="p-3 border border-gray-200">$79/£69/€79 per month</td><td className="p-3 border border-gray-200">Unlimited quotes, clients and products, priority Forge AI, approvals, advanced rules, contract management, renewals and alerts</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200 font-medium text-gray-800">Enterprise</td><td className="p-3 border border-gray-200">Custom</td><td className="p-3 border border-gray-200">Tailored solution with integrations, dedicated SLA and premium support</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm mb-4">The plan prices shown exclude applicable taxes (VAT). In quotes generated with DealForge, the user can choose whether to include tax and configure the applicable rate. DealForge reserves the right to change its plan prices with at least 30 days&apos; notice.</p>

                <h3 className="text-base font-semibold text-gray-800 mb-2">6.2. Billing and payment</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payments are processed securely through <strong>Stripe, Inc.</strong>, compliant with the PCI DSS Level 1 standard.</li>
                  <li>Billing is monthly, charged automatically at the start of each period.</li>
                  <li>The User can change plan (upgrade or downgrade) at any time. Changes apply from the next billing cycle.</li>
                  <li>In the event of non-payment, DealForge may restrict access to paid features after a 7-day grace period.</li>
                </ul>
              </section>

              <section id="refunds">
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Right of withdrawal and refunds</h2>
                <p className="mb-3">Under Article 103 of Spanish Royal Legislative Decree 1/2007 (General Law for the Protection of Consumers and Users):</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Withdrawal period:</strong> The User has 14 calendar days from subscribing to a paid plan to exercise the right of withdrawal without justification.</li>
                  <li><strong className="text-gray-800">Procedure:</strong> To withdraw, email <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a> stating your wish to withdraw from the contract.</li>
                  <li><strong className="text-gray-800">Refund:</strong> The amount is refunded within a maximum of 14 days from receipt of the request, using the same payment method as the original transaction.</li>
                  <li><strong className="text-gray-800">Exclusion:</strong> The right of withdrawal does not apply if the service has been fully performed with the User&apos;s express consent and acknowledgement that the right is lost once the service has been performed.</li>
                </ul>
                <p className="mt-3">After the withdrawal period, no refunds are issued for the current period. Cancellation of the subscription takes effect at the end of the current billing period.</p>
              </section>

              <section id="obligations">
                <h2 className="text-xl font-bold text-gray-900 mb-4">8. User obligations</h2>
                <p className="mb-3">The User undertakes to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the service in accordance with the law, public order and these terms.</li>
                  <li>Provide truthful information and keep it up to date.</li>
                  <li>Not share access credentials with third parties.</li>
                  <li>Ensure they hold the necessary rights over the data and content they enter into the platform.</li>
                  <li>Comply with data protection law regarding their own clients&apos; data entered into the system.</li>
                  <li>Not attempt to access restricted areas of the system or other users&apos; accounts.</li>
                </ul>
              </section>

              <section id="prohibited">
                <h2 className="text-xl font-bold text-gray-900 mb-4">9. Prohibited uses</h2>
                <p className="mb-3">The following is expressly prohibited:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Using the service for unlawful or fraudulent activities or those infringing third-party rights.</li>
                  <li>Attempting to access, modify or destroy other users&apos; data.</li>
                  <li>Reverse-engineering, decompiling or disassembling any part of the software.</li>
                  <li>Using bots, scrapers or other automated means to access the service without prior authorization.</li>
                  <li>Intentionally overloading the service infrastructure.</li>
                  <li>Reselling, sublicensing or redistributing access to the service without written authorization.</li>
                  <li>Introducing content that is defamatory, offensive, discriminatory or incites hatred.</li>
                  <li>Using the AI assistant (Forge) to generate misleading or fraudulent content or content that violates third-party rights.</li>
                </ul>
              </section>

              <section id="ai">
                <h2 className="text-xl font-bold text-gray-900 mb-4">10. Use of the AI assistant (Forge)</h2>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                  <p className="text-sm text-amber-900"><strong>Important notice:</strong> The Forge AI assistant is a support tool. Its responses are indicative and do not constitute professional advice of any kind (legal, tax, financial or commercial).</p>
                </div>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Forge uses Anthropic (Claude) language models to process the User&apos;s queries within the platform context.</li>
                  <li>AI-generated responses may contain inaccuracies. The User is responsible for verifying any information before making decisions based on it.</li>
                  <li>DealForge does not guarantee the accuracy, completeness or suitability of responses generated by Forge.</li>
                  <li>Queries to the AI assistant are processed via the Anthropic API. Data sent to the model is not used to train third-party AI models.</li>
                  <li>Use of the assistant is subject to limits according to the contracted plan.</li>
                </ul>
              </section>

              <section id="ip">
                <h2 className="text-xl font-bold text-gray-900 mb-4">11. Intellectual property</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">DealForge&apos;s:</strong> The platform, its source code, design, brand, logos, texts and other elements are the exclusive property of DealForge and protected by intellectual and industrial property law.</li>
                  <li><strong className="text-gray-800">The User&apos;s:</strong> The User retains full ownership of all data, content and documents they enter or generate on the platform (products, clients, quotes, etc.).</li>
                  <li><strong className="text-gray-800">Limited license:</strong> DealForge grants the User a limited, non-exclusive, non-transferable and revocable license to access and use the platform in accordance with these terms and the contracted plan.</li>
                </ul>
              </section>

              <section id="user-data">
                <h2 className="text-xl font-bold text-gray-900 mb-4">12. User data and content</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Data entered by the User is their exclusive property.</li>
                  <li>DealForge acts as a processor in relation to the User&apos;s client data, under Article 28 GDPR.</li>
                  <li>The User can export their data at any time through the platform features.</li>
                  <li>After termination, DealForge will keep the data for 30 days to facilitate export, after which it is securely deleted, unless there is a legal retention obligation.</li>
                </ul>
              </section>

              <section id="availability">
                <h2 className="text-xl font-bold text-gray-900 mb-4">13. Service availability</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>DealForge uses its best efforts to keep the platform operational 24/7.</li>
                  <li>No specific availability (SLA) is guaranteed on the Starter, Pro and Business plans. Enterprise plans may include custom service-level agreements.</li>
                  <li>The service may be temporarily interrupted for maintenance, updates or force majeure, notifying the User where possible.</li>
                  <li>DealForge is not liable for interruptions caused by third-party infrastructure providers, network failures or events beyond our reasonable control.</li>
                </ul>
              </section>

              <section id="liability">
                <h2 className="text-xl font-bold text-gray-900 mb-4">14. Limitation of liability</h2>
                <p className="mb-3">To the maximum extent permitted by applicable law:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>DealForge provides the service &quot;as is&quot; and &quot;as available&quot;, without implied warranties of merchantability, fitness for a particular purpose or non-infringement.</li>
                  <li>DealForge&apos;s total aggregate liability to the User for any reason will not exceed the total amount paid by the User during the 12 months prior to the event giving rise to the claim.</li>
                  <li>DealForge is not liable for indirect, incidental, special, consequential or punitive damages, including loss of profit, data, business opportunities or goodwill.</li>
                  <li>These limitations do not apply in cases of willful misconduct or gross negligence, nor do they exclude liabilities that cannot be limited under Spanish law.</li>
                </ul>
              </section>

              <section id="indemnity">
                <h2 className="text-xl font-bold text-gray-900 mb-4">15. Indemnification</h2>
                <p>The User undertakes to indemnify and hold DealForge harmless against any claim, damage, liability, cost or expense (including reasonable legal fees) arising from the User&apos;s breach of these terms or misuse of the platform.</p>
              </section>

              <section id="termination">
                <h2 className="text-xl font-bold text-gray-900 mb-4">16. Suspension and termination</h2>
                <h3 className="text-base font-semibold text-gray-800 mb-2">16.1. By the User</h3>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>The User can cancel their account at any time from the platform settings or by contacting <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>.</li>
                  <li>Cancellation of a paid plan takes effect at the end of the current billing period.</li>
                  <li>The User has 30 days after cancellation to export their data.</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">16.2. By DealForge</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>DealForge may suspend or cancel access to the service in the event of a breach of these terms, fraudulent use, repeated non-payment, or at the request of a competent authority.</li>
                  <li>In the event of suspension, the User will be notified by email with a description of the reason and, where possible, a reasonable period to remedy the situation.</li>
                  <li>Suspension does not release the User from their outstanding payment obligations.</li>
                </ul>
              </section>

              <section id="changes">
                <h2 className="text-xl font-bold text-gray-900 mb-4">17. Changes to the terms</h2>
                <p>DealForge reserves the right to amend these Terms of Service. Substantial changes will be communicated at least 30 days in advance by email or in-app notification. Continued use of the service after the changes take effect implies acceptance of the new terms. If the User does not agree with the changes, they may cancel their account before the changes take effect.</p>
              </section>

              <section id="law">
                <h2 className="text-xl font-bold text-gray-900 mb-4">18. Governing law and jurisdiction</h2>
                <p className="mb-3">These Terms of Service are governed by Spanish law, in particular:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Law 34/2002 of 11 July on Information Society Services (LSSI-CE).</li>
                  <li>Royal Legislative Decree 1/2007 of 16 November, General Law for the Protection of Consumers and Users.</li>
                  <li>Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPD-GDD).</li>
                  <li>The Spanish Civil Code and Commercial Code.</li>
                </ul>
                <p>For any dispute arising from these terms, the parties submit to the competent courts under applicable procedural law. If the User is a consumer, the courts of their place of residence will have jurisdiction.</p>
              </section>

              <section id="disputes">
                <h2 className="text-xl font-bold text-gray-900 mb-4">19. Alternative dispute resolution</h2>
                <p className="mb-3">Before initiating any legal action, the parties undertake to try to resolve the dispute amicably:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Prior claim:</strong> The User may send their claim to <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a>. DealForge will respond within a maximum of 30 days.</li>
                  <li><strong className="text-gray-800">ODR platform:</strong> Under Regulation (EU) 524/2013, we inform you of the European Commission&apos;s online dispute resolution platform: <span className="text-[#3a9bb5]">https://ec.europa.eu/consumers/odr</span></li>
                  <li><strong className="text-gray-800">Mediation:</strong> The parties may submit the dispute to mediation under Spanish Law 5/2012 of 6 July on mediation in civil and commercial matters.</li>
                </ul>
              </section>

              <section id="contact">
                <h2 className="text-xl font-bold text-gray-900 mb-4">20. Contact</h2>
                <p>For any question relating to these Terms of Service, you can contact us at:</p>
                <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100 mt-3">
                  <p><strong className="text-gray-900">DealForge</strong></p>
                  <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
                </div>
              </section>

              {/* CTA */}
              <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-2">Questions about our terms?</p>
                <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">info@dealforge.es</a>
                <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
                  <Link href="/en/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
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
