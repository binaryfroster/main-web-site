import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — Our Terms & Conditions",
  description:
    "Read Binary Froster's Terms of Service. Understand your rights, our obligations, intellectual property policies, and payment terms when working with us.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
