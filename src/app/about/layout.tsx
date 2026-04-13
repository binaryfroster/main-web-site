import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Our Team & Mission",
  description: "Meet the team behind Binary Froster. A small, focused team of 6-10 engineers building world-class software for US and UK businesses.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
