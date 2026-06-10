import type { Metadata } from "next";

// English marketing section. Lives at /en/* as additive routes — the Spanish
// site at the root is untouched. The lang="en" wrapper marks this subtree as
// English for assistive tech and search engines (the root <html> stays es;
// hreflang + content + URL are the primary signals Google uses).

export const metadata: Metadata = {
  metadataBase: new URL("https://dealforge.es"),
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <div lang="en">{children}</div>;
}
