import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-space" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Binary Froster — AI & Custom Software Development for US & UK Businesses",
    template: "%s | Binary Froster",
  },
  description: "Binary Froster builds AI integrations, web apps, e-commerce platforms, and SaaS products for small and medium businesses in the US and UK. Get a free quote.",
  keywords: ["AI development", "custom software", "web development", "SaaS", "UK", "US", "e-commerce", "automation"],
  authors: [{ name: "Binary Froster" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Binary Froster",
    title: "Binary Froster — AI & Custom Software Development",
    description: "Precision-built technology solutions for growing businesses in the US and UK.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Binary Froster — AI & Custom Software Development",
    description: "Precision-built technology solutions for growing businesses in the US and UK.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060A1A" },
    { media: "(prefers-color-scheme: light)", color: "#F8F9FF" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased min-h-screen flex flex-col`}>
        <SmoothScrolling>
          <PageLoader />
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}
