import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/app/_landing/navbar";
import { FooterEn } from "@/app/_landing/footer-en";
import { AUTHOR, authorPersonJsonLd } from "@/data/author";
import { Linkedin, ArrowRight, Flame } from "lucide-react";

// Render the real headshot only when the file actually exists in /public,
// otherwise fall back to initials — so the page never shows a broken image.
const hasPhoto = fs.existsSync(
  path.join(process.cwd(), "public", AUTHOR.imagePublicPath.replace(/^\//, ""))
);

export const metadata: Metadata = {
  title: `${AUTHOR.name} — Founder / Product Lead`,
  description: AUTHOR.bio,
  alternates: { canonical: AUTHOR.url },
  openGraph: {
    title: `${AUTHOR.name} — DealForge`,
    description: AUTHOR.bio,
    url: AUTHOR.url,
    siteName: "DealForge",
    type: "profile",
  },
};

// ProfilePage wrapping the canonical Person entity (Google's recommended
// pattern for author/profile pages).
const profileJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateModified: new Date().toISOString(),
  mainEntity: authorPersonJsonLd,
};

const initials = AUTHOR.name
  .split(" ")
  .map((w) => w[0])
  .join("");

export default function AuthorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileJsonLd) }}
      />
      <Navbar locale="en" altHref="/" />

      <div className="min-h-screen bg-white">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {hasPhoto ? (
              <Image
                src={AUTHOR.imagePublicPath}
                alt={`${AUTHOR.name} — ${AUTHOR.jobTitle}`}
                width={112}
                height={112}
                priority
                className="w-28 h-28 flex-shrink-0 rounded-2xl object-cover border border-gray-100 shadow-sm"
              />
            ) : (
              <div
                aria-hidden="true"
                className="w-24 h-24 flex-shrink-0 rounded-2xl bg-[#3a9bb5]/10 text-[#3a9bb5] flex items-center justify-center text-2xl font-bold"
              >
                {initials}
              </div>
            )}
            <div className="text-center sm:text-left">
              <h1 className="text-3xl font-bold text-gray-900">{AUTHOR.name}</h1>
              <p className="mt-1 text-[#3a9bb5] font-semibold">{AUTHOR.jobTitle}</p>
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <a
                  href={AUTHOR.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[#3a9bb5] border border-gray-200 hover:border-[#3a9bb5] rounded-lg px-3 py-1.5 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <span className="text-sm text-gray-400">
                  Writes in {AUTHOR.languageLabels.join(" and ")}
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">About</h2>
            <p className="text-gray-600 leading-relaxed">{AUTHOR.bio}</p>
          </section>

          {/* Expertise */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Areas of expertise</h2>
            <div className="flex flex-wrap gap-2">
              {AUTHOR.expertise.map((topic) => (
                <span
                  key={topic}
                  className="text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </section>

          {/* Articles */}
          <section className="mt-10">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Articles by {AUTHOR.name}</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Albert writes practical guides on quoting, pricing and sales automation for small
              businesses on the DealForge blog.
            </p>
            <Link
              href="/en/blog"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3a9bb5] hover:underline"
            >
              Read the blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          {/* CTA */}
          <div className="mt-14 p-8 bg-gradient-to-br from-[#3a9bb5]/5 to-[#3a9bb5]/10 rounded-2xl border border-[#3a9bb5]/10 text-center">
            <Flame className="w-8 h-8 text-[#3a9bb5] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              Try the product Albert is building
            </h3>
            <p className="text-sm text-gray-600 mb-4 max-w-md mx-auto">
              DealForge helps freelancers and small businesses create professional quotes in
              minutes. Start free today.
            </p>
            <Link
              href="/registro?lang=en"
              className="inline-flex items-center gap-2 bg-[#3a9bb5] hover:bg-[#2d7d94] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors shadow-lg shadow-[#3a9bb5]/25"
            >
              <Flame className="w-4 h-4" />
              Create a free account
            </Link>
          </div>
        </main>
      </div>

      <FooterEn />
    </>
  );
}
