import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Tech Insights, Tutorials & Case Studies",
  description:
    "Explore Binary Froster's technical blog: AI development, React & Next.js guides, SaaS strategies, business automation, SEO case studies, and software engineering deep-dives.",
  keywords: [
    "software development blog",
    "AI tutorials",
    "Next.js React guides",
    "SaaS business tips",
    "web development articles",
    "tech blog UK",
    "software engineering insights",
    "e-commerce optimisation",
    "ERP development guide",
    "programming case studies",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Tech Insights & Tutorials | Binary Froster",
    description:
      "Technical deep-dives, case studies, and practical advice from the team building Binary Froster.",
    url: "/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Binary Froster | Tech Insights & Tutorials",
    description:
      "AI, React, SaaS, SEO, and software engineering articles from the Binary Froster team.",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

