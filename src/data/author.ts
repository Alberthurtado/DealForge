// Single source of truth for the site's author entity (Albert Hurtado).
// Only verified, user-provided facts live here — no invented credentials,
// awards, certifications, education, photos, or extra profiles.

export const AUTHOR = {
  name: "Albert Hurtado",
  jobTitle: "Founder / Product Lead at DealForge",
  url: "https://dealforge.es/about/albert-hurtado",
  bio: "Albert Hurtado builds DealForge, an AI-powered quoting platform for freelancers and small businesses, focused on making quote creation faster, clearer, and more professional.",
  linkedIn: "https://www.linkedin.com/in/alberthurtado/",
  // Headshot. Drop the file at public/team/albert-hurtado.jpg for it to render.
  imagePublicPath: "/team/albert-hurtado.jpg",
  imageUrl: "https://dealforge.es/team/albert-hurtado.jpg",
  expertise: [
    "quoting software",
    "sales operations",
    "CPQ",
    "CRM",
    "business automation",
    "AI for small businesses",
  ],
  // ISO 639-1 codes for schema; human labels for display.
  languageCodes: ["es", "en"],
  languageLabels: ["Spanish", "English"],
} as const;

// Person JSON-LD node. The @id is the canonical entity URL (the author page),
// so Article.author can reference the same entity across every post.
// No @context here — this is meant to be nested inside another JSON-LD graph.
export const authorPersonJsonLd = {
  "@type": "Person",
  "@id": `${AUTHOR.url}#person`,
  name: AUTHOR.name,
  url: AUTHOR.url,
  jobTitle: AUTHOR.jobTitle,
  description: AUTHOR.bio,
  worksFor: {
    "@type": "Organization",
    name: "DealForge",
    url: "https://dealforge.es",
  },
  image: AUTHOR.imageUrl,
  knowsAbout: [...AUTHOR.expertise],
  knowsLanguage: [...AUTHOR.languageCodes],
  sameAs: [AUTHOR.linkedIn],
} as const;
