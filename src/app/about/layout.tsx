import type { Metadata } from "next";

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
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us — Binary Froster | Our Team & Mission",
    description:
      "Meet the team of senior engineers, designers, and strategists building precision software for global businesses.",
    url: "/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Binary Froster — Our Team & Mission",
    description:
      "A UK & India-based team of 6–10 senior engineers building world-class software for businesses worldwide.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

