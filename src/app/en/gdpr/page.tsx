import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../../_landing/navbar";
import { FooterEn } from "../../_landing/footer-en";

export const metadata: Metadata = {
  title: "GDPR Compliance — DealForge",
  description: "DealForge's commitment to the General Data Protection Regulation (GDPR). Security measures, data subject rights and sub-processors.",
  alternates: {
    canonical: "https://dealforge.es/en/gdpr",
    languages: {
      "es-ES": "https://dealforge.es/rgpd",
      en: "https://dealforge.es/en/gdpr",
      "x-default": "https://dealforge.es/rgpd",
    },
  },
  openGraph: {
    title: "GDPR Compliance — DealForge",
    description: "Security measures, data subject rights and sub-processors.",
    url: "https://dealforge.es/en/gdpr",
    siteName: "DealForge",
    locale: "en_GB",
    type: "website",
  },
};

const LAST_UPDATED = "9 March 2026";

const PRINCIPLES = [
  { title: "Lawfulness, fairness and transparency", desc: "We process data lawfully, fairly and transparently. Users always know what data we collect and why." },
  { title: "Purpose limitation", desc: "Data is collected for specified, explicit and legitimate purposes and not further processed in a manner incompatible with those purposes." },
  { title: "Data minimisation", desc: "We collect only the data strictly necessary for each purpose. We do not request unnecessary information." },
  { title: "Accuracy", desc: "We keep data up to date and give users tools to correct it at any time." },
  { title: "Storage limitation", desc: "Data is kept only for as long as strictly necessary and in line with the legal periods established." },
  { title: "Integrity and confidentiality", desc: "We apply technical and organizational measures to ensure data security against unauthorized processing, loss or destruction." },
  { title: "Accountability", desc: "We document and demonstrate compliance with all of these principles on an ongoing basis." },
];

const RIGHTS = [
  { right: "Right of access (Art. 15)", desc: "Obtain confirmation of whether personal data is being processed and, where so, access a copy along with the information in Article 15(1)." },
  { right: "Right to rectification (Art. 16)", desc: "Request the correction of inaccurate personal data or completion of incomplete data." },
  { right: "Right to erasure — 'right to be forgotten' (Art. 17)", desc: "Request deletion of personal data when it is no longer necessary, consent is withdrawn, you object to processing, it has been unlawfully processed, or a legal obligation must be met." },
  { right: "Right to restriction of processing (Art. 18)", desc: "Request restriction where the accuracy of the data is contested, the processing is unlawful, the data is no longer needed but you require it for legal claims, or you have exercised the right to object." },
  { right: "Right to data portability (Art. 20)", desc: "Receive your personal data in a structured, commonly used and machine-readable format (JSON or CSV) and transmit it to another controller." },
  { right: "Right to object (Art. 21)", desc: "Object to data processing based on legitimate interest or for direct marketing." },
  { right: "Right not to be subject to automated decisions (Art. 22)", desc: "Not be subject to decisions based solely on automated processing that produce legal effects or significantly affect you. The AI assistant's suggestions are purely indicative and do not constitute automated decisions." },
];

export default function EnGdprPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar locale="en" altHref="/rgpd" />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="prose-legal">
            {/* Header */}
            <div className="mb-12">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">GDPR Compliance</h1>
              <p className="text-sm text-gray-500 bg-gray-50 inline-block px-3 py-1 rounded-lg">
                Last updated: {LAST_UPDATED}
              </p>
            </div>

            {/* Language note */}
            <div className="mb-12 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-900">
                This is an English translation provided for convenience. In the event of any
                discrepancy, the{" "}
                <Link href="/rgpd" className="font-medium underline hover:text-amber-700">
                  Spanish version
                </Link>{" "}
                prevails.
              </p>
            </div>

            {/* Intro */}
            <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-6 mb-12">
              <p className="text-gray-700 leading-relaxed">
                DealForge is firmly committed to compliance with <strong>Regulation (EU) 2016/679</strong> (the General Data Protection Regulation — GDPR) and Spanish <strong>Organic Law 3/2018</strong> of 5 December on the Protection of Personal Data and Guarantee of Digital Rights (LOPD-GDD). This page details the technical, organizational and legal measures we implement to protect the personal data of our users and their clients.
              </p>
            </div>

            {/* Index */}
            <nav className="mb-12 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Contents</h2>
              <ol className="space-y-1.5 text-sm text-[#3a9bb5]">
                <li><a href="#principles" className="hover:underline">1. Processing principles</a></li>
                <li><a href="#legal-bases" className="hover:underline">2. Legal bases by processing type</a></li>
                <li><a href="#technical" className="hover:underline">3. Technical security measures</a></li>
                <li><a href="#organizational" className="hover:underline">4. Organizational security measures</a></li>
                <li><a href="#subprocessors" className="hover:underline">5. Sub-processors</a></li>
                <li><a href="#rights" className="hover:underline">6. Data subject rights</a></li>
                <li><a href="#ropa" className="hover:underline">7. Record of processing activities</a></li>
                <li><a href="#breaches" className="hover:underline">8. Data breach notification</a></li>
                <li><a href="#dpia" className="hover:underline">9. Data protection impact assessment (DPIA)</a></li>
                <li><a href="#transfers" className="hover:underline">10. International transfers</a></li>
                <li><a href="#cookies" className="hover:underline">11. Cookie policy</a></li>
                <li><a href="#processor" className="hover:underline">12. DealForge as a processor</a></li>
                <li><a href="#dpo" className="hover:underline">13. Data Protection contact</a></li>
              </ol>
            </nav>

            <div className="space-y-10 text-gray-600 leading-relaxed">

              <section id="principles">
                <h2 className="text-xl font-bold text-gray-900 mb-4">1. Data processing principles</h2>
                <p className="mb-4">All personal data processing carried out by DealForge is governed by the principles set out in Article 5 GDPR:</p>
                <div className="grid gap-3">
                  {PRINCIPLES.map((p) => (
                    <div key={p.title} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm mb-1">{p.title}</p>
                      <p className="text-sm">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="legal-bases">
                <h2 className="text-xl font-bold text-gray-900 mb-4">2. Legal bases by processing type</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Processing activity</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Data processed</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Legal basis</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Retention</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-3 border border-gray-200">User registration</td><td className="p-3 border border-gray-200">Name, email, password (hash)</td><td className="p-3 border border-gray-200">Contract (6(1)(b))</td><td className="p-3 border border-gray-200">Contract duration + legal periods</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">CPQ service delivery</td><td className="p-3 border border-gray-200">Company, products, clients, quotes</td><td className="p-3 border border-gray-200">Contract (6(1)(b))</td><td className="p-3 border border-gray-200">Contract duration + 30 days</td></tr>
                      <tr><td className="p-3 border border-gray-200">Payment processing</td><td className="p-3 border border-gray-200">Email, plan, Stripe ID</td><td className="p-3 border border-gray-200">Contract (6(1)(b))</td><td className="p-3 border border-gray-200">5 years (tax obligation)</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">AI assistant (Forge)</td><td className="p-3 border border-gray-200">Queries in page context</td><td className="p-3 border border-gray-200">Contract (6(1)(b))</td><td className="p-3 border border-gray-200">Conversations not stored</td></tr>
                      <tr><td className="p-3 border border-gray-200">Transactional notifications</td><td className="p-3 border border-gray-200">Email, name</td><td className="p-3 border border-gray-200">Contract (6(1)(b))</td><td className="p-3 border border-gray-200">Contract duration</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Tax data</td><td className="p-3 border border-gray-200">Tax ID, billing address, invoices</td><td className="p-3 border border-gray-200">Legal obligation (6(1)(c))</td><td className="p-3 border border-gray-200">5 years (tax law)</td></tr>
                      <tr><td className="p-3 border border-gray-200">Service improvement</td><td className="p-3 border border-gray-200">Aggregated, anonymized data</td><td className="p-3 border border-gray-200">Legitimate interest (6(1)(f))</td><td className="p-3 border border-gray-200">Indefinite (anonymous data)</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="technical">
                <h2 className="text-xl font-bold text-gray-900 mb-4">3. Technical security measures</h2>
                <p className="mb-4">Under Article 32 GDPR, we implement the following technical security measures:</p>

                <h3 className="text-base font-semibold text-gray-800 mb-2">3.1. Encryption</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong className="text-gray-800">In transit:</strong> All communications use HTTPS with TLS 1.2 or higher. HSTS (HTTP Strict Transport Security) is applied with the preload directive.</li>
                  <li><strong className="text-gray-800">At rest:</strong> The PostgreSQL database (Supabase/AWS) uses AES-256 encryption at rest for all data volumes.</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">3.2. Authentication and access control</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><strong className="text-gray-800">Password hashing:</strong> bcrypt with a random per-user salt. Passwords are never stored in plain text and cannot be recovered.</li>
                  <li><strong className="text-gray-800">Session tokens:</strong> JWTs (JSON Web Tokens) signed with a 256-bit secret key, with configurable time-based expiry.</li>
                  <li><strong className="text-gray-800">Secure cookies:</strong> HttpOnly, Secure, SameSite=Lax — inaccessible from client-side JavaScript.</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">3.3. HTTP security headers</h3>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">X-Frame-Options: DENY</code> — Clickjacking protection.</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">X-Content-Type-Options: nosniff</code> — MIME sniffing prevention.</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Referrer-Policy: strict-origin-when-cross-origin</code> — Referrer information control.</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Permissions-Policy</code> — Restriction of access to camera, microphone and geolocation.</li>
                  <li><code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Strict-Transport-Security</code> — HSTS with a 2-year max-age, includeSubDomains and preload.</li>
                </ul>

                <h3 className="text-base font-semibold text-gray-800 mb-2">3.4. Infrastructure</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Database hosted in the EU region (eu-west-1, Ireland) of AWS via Supabase.</li>
                  <li>Automatic daily database backups.</li>
                  <li>Deployment on Vercel with a global edge network and function isolation.</li>
                  <li>Environment variables encrypted on the server — never exposed to the client.</li>
                </ul>
              </section>

              <section id="organizational">
                <h2 className="text-xl font-bold text-gray-900 mb-4">4. Organizational security measures</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Least-privilege principle:</strong> Each system component and team member accesses only the data strictly necessary for their function.</li>
                  <li><strong className="text-gray-800">Environment separation:</strong> Development, testing and production environments are isolated. Production data is never used in development.</li>
                  <li><strong className="text-gray-800">Code review:</strong> All code that accesses personal data is reviewed before deployment to production.</li>
                  <li><strong className="text-gray-800">Vulnerability management:</strong> Continuous monitoring of dependencies and security updates.</li>
                  <li><strong className="text-gray-800">Infrastructure access control:</strong> Access to databases and servers restricted with multi-factor authentication.</li>
                </ul>
              </section>

              <section id="subprocessors">
                <h2 className="text-xl font-bold text-gray-900 mb-4">5. Sub-processors</h2>
                <p className="mb-4">Under Article 28(2) GDPR, we disclose the authorized sub-processors with which we share personal data:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Sub-processor</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Service</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Data processed</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Location</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Safeguards</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-gray-200 font-medium text-gray-800">Supabase, Inc.<br /><span className="text-xs text-gray-500">(on AWS)</span></td>
                        <td className="p-3 border border-gray-200">PostgreSQL database</td>
                        <td className="p-3 border border-gray-200">All application data</td>
                        <td className="p-3 border border-gray-200">EU (Ireland, eu-west-1)</td>
                        <td className="p-3 border border-gray-200">Data in the EU, AES-256 at rest, signed DPA</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200 font-medium text-gray-800">Vercel, Inc.</td>
                        <td className="p-3 border border-gray-200">Web hosting and serverless execution</td>
                        <td className="p-3 border border-gray-200">HTTP requests, access logs</td>
                        <td className="p-3 border border-gray-200">US and EU (Edge)</td>
                        <td className="p-3 border border-gray-200">EU-US DPF, SCCs (Decision 2021/914), DPA</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200 font-medium text-gray-800">Stripe, Inc.</td>
                        <td className="p-3 border border-gray-200">Payment processing</td>
                        <td className="p-3 border border-gray-200">Email, name, card data (handled by Stripe)</td>
                        <td className="p-3 border border-gray-200">US and EU</td>
                        <td className="p-3 border border-gray-200">PCI DSS Level 1, EU-US DPF, SCCs, DPA</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200 font-medium text-gray-800">Anthropic, PBC</td>
                        <td className="p-3 border border-gray-200">AI model for the Forge assistant</td>
                        <td className="p-3 border border-gray-200">User queries in page context</td>
                        <td className="p-3 border border-gray-200">US</td>
                        <td className="p-3 border border-gray-200">SCCs, data not used for training, zero-retention API</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm">All sub-processors have signed Data Processing Agreements (DPAs) compliant with Article 28 GDPR. Users will be notified in advance of any change to the list of sub-processors.</p>
              </section>

              <section id="rights">
                <h2 className="text-xl font-bold text-gray-900 mb-4">6. Data subject rights</h2>
                <p className="mb-4">Under Articles 15 to 22 GDPR, data subjects may exercise the following rights:</p>

                <div className="space-y-3 mb-6">
                  {RIGHTS.map((d) => (
                    <div key={d.right} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm mb-1">{d.right}</p>
                      <p className="text-sm">{d.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-[#3a9bb5]/5 border border-[#3a9bb5]/20 rounded-xl p-5">
                  <p className="text-sm font-semibold text-gray-900 mb-2">How to exercise your rights</p>
                  <p className="text-sm mb-2">Email <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline font-medium">info@dealforge.es</a> stating:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Your full name and the email associated with your account.</li>
                    <li>The right you wish to exercise.</li>
                    <li>A copy of an identity document so we can verify your identity.</li>
                  </ul>
                  <p className="text-sm mt-2"><strong>Response time:</strong> Maximum 30 days from receipt of the request. Extendable by 2 months for complex or numerous requests, informing the data subject within the first month.</p>
                  <p className="text-sm mt-1"><strong>Cost:</strong> Free, except for manifestly unfounded or excessive requests (Art. 12(5) GDPR).</p>
                </div>
              </section>

              <section id="ropa">
                <h2 className="text-xl font-bold text-gray-900 mb-4">7. Record of processing activities (ROPA)</h2>
                <p className="mb-4">Under Article 30 GDPR, DealForge maintains an up-to-date Record of Processing Activities. A summary follows:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Activity</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Categories of data subjects</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Categories of data</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Erasure period</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-3 border border-gray-200">User management</td><td className="p-3 border border-gray-200">Registered users</td><td className="p-3 border border-gray-200">Identifying, contact</td><td className="p-3 border border-gray-200">Cancellation + legal periods</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">Sales management (CPQ)</td><td className="p-3 border border-gray-200">User&apos;s clients</td><td className="p-3 border border-gray-200">Identifying, commercial</td><td className="p-3 border border-gray-200">Cancellation + 6 years (Commercial Code)</td></tr>
                      <tr><td className="p-3 border border-gray-200">Billing</td><td className="p-3 border border-gray-200">Users on a paid plan</td><td className="p-3 border border-gray-200">Identifying, financial</td><td className="p-3 border border-gray-200">5 years (tax law)</td></tr>
                      <tr className="bg-gray-50"><td className="p-3 border border-gray-200">AI assistant</td><td className="p-3 border border-gray-200">Active users</td><td className="p-3 border border-gray-200">Queries (not stored)</td><td className="p-3 border border-gray-200">Not retained</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="breaches">
                <h2 className="text-xl font-bold text-gray-900 mb-4">8. Data breach notification</h2>
                <p className="mb-3">DealForge has a security breach management protocol under Articles 33 and 34 GDPR:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Detection:</strong> Continuous infrastructure monitoring for the early detection of security incidents.</li>
                  <li><strong className="text-gray-800">Notification to the authority:</strong> In the event of a breach that may pose a risk to data subjects&apos; rights and freedoms, we will notify the competent supervisory authority within a maximum of <strong>72 hours</strong> of detection (Art. 33 GDPR).</li>
                  <li><strong className="text-gray-800">Notification to those affected:</strong> If the breach may entail a high risk to rights and freedoms, we will inform affected data subjects without undue delay (Art. 34 GDPR).</li>
                  <li><strong className="text-gray-800">Documentation:</strong> Every breach is documented in detail, including: the nature of the breach, the categories and number of data subjects affected, likely consequences and measures taken.</li>
                  <li><strong className="text-gray-800">Remediation:</strong> Immediate implementation of corrective measures to contain the breach and prevent recurrence.</li>
                </ul>
              </section>

              <section id="dpia">
                <h2 className="text-xl font-bold text-gray-900 mb-4">9. Data Protection Impact Assessment (DPIA)</h2>
                <p className="mb-3">Under Article 35 GDPR, DealForge has carried out an Impact Assessment in relation to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Use of Artificial Intelligence (Forge):</strong> The AI assistant processes user queries within the platform context. The impact has been assessed and the following mitigations implemented:
                    <ul className="list-disc pl-6 mt-1 space-y-1">
                      <li>Queries are not stored or used to train AI models.</li>
                      <li>No personal data of the user&apos;s clients is sent to the AI model — only the current page context.</li>
                      <li>Responses are purely indicative and do not generate automated decisions with legal effects.</li>
                    </ul>
                  </li>
                  <li><strong className="text-gray-800">Processing of business data:</strong> The processing of client and quote data takes place in the EU with the security measures described in sections 3 and 4.</li>
                </ul>
              </section>

              <section id="transfers">
                <h2 className="text-xl font-bold text-gray-900 mb-4">10. International data transfers</h2>
                <p className="mb-3">When personal data is transferred outside the European Economic Area (EEA), the following safeguards apply under Chapter V GDPR:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-gray-800">Adequacy decision:</strong> Transfers to the US rely on the EU-US Data Privacy Framework (European Commission Adequacy Decision of 10 July 2023) for certified providers (Stripe, Vercel).</li>
                  <li><strong className="text-gray-800">Standard Contractual Clauses (SCCs):</strong> As an additional safeguard, all US providers have signed the SCCs approved by the European Commission (Implementing Decision 2021/914).</li>
                  <li><strong className="text-gray-800">Supplementary measures:</strong> Encryption of data in transit and at rest, pseudonymisation where possible, and a case-by-case assessment of the destination country&apos;s legal framework.</li>
                </ul>
                <p className="mt-3 text-sm">The main database is hosted in the EU (Ireland). Only the hosting (Vercel), payment (Stripe) and AI (Anthropic) services may involve transfers to the US, always with the safeguards described.</p>
              </section>

              <section id="cookies">
                <h2 className="text-xl font-bold text-gray-900 mb-4">11. Cookie policy</h2>
                <p className="mb-3">The logged-in application uses exclusively technical, strictly necessary cookies:</p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Cookie</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Type</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Purpose</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Duration</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Ownership</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr><td className="p-3 border border-gray-200 font-mono text-xs">session</td><td className="p-3 border border-gray-200">Essential technical</td><td className="p-3 border border-gray-200">User authentication (JWT)</td><td className="p-3 border border-gray-200">7 days or logout</td><td className="p-3 border border-gray-200">First-party</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-900">On the public marketing site we additionally use analytics cookies (Google Analytics), which are only set after you give consent via the cookie banner. The logged-in application uses only essential cookies.</p>
                </div>
              </section>

              <section id="processor">
                <h2 className="text-xl font-bold text-gray-900 mb-4">12. DealForge as a processor</h2>
                <p className="mb-3">When our users enter their own clients&apos; data into the platform, DealForge acts as a <strong>processor</strong> (Art. 28 GDPR) and the user as controller. In this case:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>DealForge processes the data solely to provide the contracted service, in accordance with the user&apos;s instructions.</li>
                  <li>We do not use the user&apos;s clients&apos; data for our own purposes or share it with unauthorized third parties.</li>
                  <li>We guarantee the same technical and organizational security measures described in this document.</li>
                  <li>We assist the user in meeting their obligations as controller, including handling data subject rights requests.</li>
                  <li>On termination of the service, we delete or return the data according to the user&apos;s choice.</li>
                </ul>
                <p className="mt-3 text-sm">Users who process their clients&apos; personal data through DealForge must ensure they have an appropriate legal basis and inform their data subjects in accordance with the GDPR.</p>
              </section>

              <section id="dpo">
                <h2 className="text-xl font-bold text-gray-900 mb-4">13. Data Protection contact</h2>
                <p>For any question relating to the processing of personal data or the exercise of your rights, you can contact our data protection point of contact:</p>
                <div className="bg-gray-50 rounded-xl p-5 text-sm space-y-1 border border-gray-100 mt-3">
                  <p><strong className="text-gray-900">Data Protection — DealForge</strong></p>
                  <p><strong className="text-gray-900">Email:</strong> <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] hover:underline">info@dealforge.es</a></p>
                </div>
                <p className="mt-4 text-sm">If you believe we have not handled your request appropriately, you may lodge a complaint with the <strong>Spanish Data Protection Agency (AEPD)</strong> — <span className="text-[#3a9bb5]">www.aepd.es</span> — C/ Jorge Juan, 6 — 28001 Madrid, Spain. EEA and UK users may also contact their local data protection authority.</p>
              </section>

              {/* CTA */}
              <div className="mt-16 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm mb-2">Questions about our GDPR compliance?</p>
                <a href="mailto:info@dealforge.es" className="text-[#3a9bb5] font-semibold hover:underline">info@dealforge.es</a>
                <div className="mt-6 flex justify-center gap-4 text-sm text-gray-400">
                  <Link href="/en/privacy" className="hover:text-gray-600 transition-colors">Privacy Policy</Link>
                  <span>|</span>
                  <Link href="/en/terms" className="hover:text-gray-600 transition-colors">Terms of Service</Link>
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
