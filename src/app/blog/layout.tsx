import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";

export const metadata: Metadata = {
  title: "Blog — Tech Insights, Tutorials & Case Studies | Binary Froster",
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
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog — Tech Insights & Tutorials | Binary Froster",
    description:
      "Technical deep-dives, case studies, and practical advice from the Binary Froster engineering team.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "Binary Froster",
    locale: "en_GB",
    images: [
      {
        url: `${SITE_URL}/assets/logo.webp`,
        width: 1024,
        height: 1024,
        alt: "Binary Froster Blog — Tech Insights & Tutorials",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Binaryfroster",
    creator: "@Binaryfroster",
    title: "Blog — Binary Froster | Tech Insights & Tutorials",
    description:
      "AI, React, SaaS, SEO, and software engineering articles from the Binary Froster team.",
    images: [`${SITE_URL}/assets/logo.webp`],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

