import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Insights & Tutorials",
  description: "Technical insights, development tutorials, and business advice from the Binary Froster team.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
