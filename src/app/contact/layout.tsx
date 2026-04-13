import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description: "Get in touch with Binary Froster. Fill out the project inquiry form and we'll respond within 24 hours. Free consultation.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
