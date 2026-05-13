import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";

export const metadata: Metadata = {
  title: "About Us — Meet the Binary Froster Team",
  description:
    "Binary Froster is a UK & India-based software agency of 6–10 senior engineers. We build AI, web, and SaaS solutions for SMEs worldwide. Discover our story, values, and team.",
  keywords: [
    "software development agency team",
    "UK software developers",
    "India software agency",
    "Binary Froster team",
    "who we are software agency",
    "AI development company UK",
    "dedicated software engineers",
    "offshore development team",
  ],
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Us — Binary Froster | Our Team & Mission",
    description:
      "Meet the team of senior engineers, designers, and strategists building precision software for global businesses.",
    url: `${SITE_URL}/about`,
    type: "website",
    siteName: "Binary Froster",
    locale: "en_GB",
    images: [{ url: `${SITE_URL}/assets/logo.webp`, width: 1024, height: 1024, alt: "Binary Froster Team" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Binaryfroster",
    creator: "@Binaryfroster",
    title: "About Binary Froster — Our Team & Mission",
    description:
      "A UK & India-based team of 6–10 senior engineers building world-class software for businesses worldwide.",
    images: [`${SITE_URL}/assets/logo.webp`],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

