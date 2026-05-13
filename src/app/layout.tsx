import type { Metadata, Viewport } from "next";
import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageLoader from "@/components/layout/PageLoader";
import LiveChatWrapper from "@/components/chat/LiveChatWrapper";
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans", display: "swap" });
const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-syne", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["500"], variable: "--font-mono", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  title: {
    default: "Binary Froster — AI & Custom Software Development for Worldwide Businesses",
    template: "%s | Binary Froster",
  },
  description:
    "Binary Froster is an AI & custom software development agency serving SMEs worldwide. We build web apps, SaaS platforms, e-commerce stores, ERP systems, and AI integrations. Get a free quote.",
  keywords: [
    "AI software development agency",
    "custom software development UK",
    "SaaS development company",
    "web app development agency",
    "e-commerce development",
    "ERP software development",
    "business automation AI",
    "Next.js React developers",
    "hire software agency",
    "affordable software development",
    "software agency India UK",
    "AI chatbot development",
    "offshore software development",
    "startup software agency",
    "SME technology solutions",
  ],
  authors: [{ name: "Binary Froster", url: SITE_URL }],
  creator: "Binary Froster",
  publisher: "Binary Froster",
  category: "Technology",
  classification: "Software Development Agency",
  icons: {
    icon: [
      { url: "/assets/logo.png", type: "image/png" },
    ],
    apple: "/assets/logo.png",
    shortcut: "/assets/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    alternateLocale: ["en_US", "en_IN"],
    siteName: "Binary Froster",
    title: "Binary Froster — AI & Custom Software Development",
    description:
      "Precision-built AI integrations, web apps, e-commerce, ERP, and SaaS solutions for growing businesses worldwide.",
    images: [
      {
        url: "/assets/logo.webp",
        width: 1024,
        height: 1024,
        alt: "Binary Froster — AI & Custom Software Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Binaryfroster",
    creator: "@Binaryfroster",
    title: "Binary Froster — AI & Custom Software Development",
    description:
      "Precision-built technology solutions for growing businesses worldwide. AI, web apps, SaaS, e-commerce & ERP.",
    images: ["/assets/logo.webp"],
  },
  verification: {
    // Add your Google Search Console / Bing verification tokens here
    // google: "your-google-verification-code",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#131313" },
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
  ],
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Binary Froster",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.webp`,
  description:
    "Binary Froster is an AI & custom software development agency building web apps, SaaS platforms, e-commerce stores, ERP systems, and AI integrations for SMEs worldwide.",
  foundingDate: "2023",
  email: "hello@binaryfroster.com",
  sameAs: [
    "https://in.linkedin.com/in/binary-froster",
    "https://x.com/Binaryfroster",
    "https://www.instagram.com/binaryfroster/",
  ],
  areaServed: ["GB", "US", "IN", "Worldwide"],
  knowsAbout: [
    "AI Integration",
    "Custom Software Development",
    "Web Application Development",
    "E-commerce Development",
    "SaaS Product Development",
    "ERP Systems",
    "Business Automation",
  ],
  serviceType: [
    "AI & Automation",
    "Web Development",
    "E-commerce Solutions",
    "Management Systems",
    "SaaS Development",
    "Custom Integrations",
  ],
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Binary Froster",
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Binary Froster",
  url: SITE_URL,
  logo: `${SITE_URL}/assets/logo.webp`,
  image: `${SITE_URL}/assets/logo.webp`,
  description:
    "AI & custom software development agency for SMEs worldwide. We build web apps, SaaS, e-commerce, and ERP systems.",
  email: "hello@binaryfroster.com",
  priceRange: "$$",
  currenciesAccepted: "GBP, USD, INR",
  paymentAccepted: "Bank Transfer, Stripe",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Software Development Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration & Automation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Custom Web Application Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "E-commerce Platform Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "SaaS Product Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "ERP & CRM Systems" } },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        {/* Preconnect to external image hosts for performance */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${dmSans.variable} ${syne.variable} ${jetbrains.variable} antialiased min-h-screen flex flex-col`}
      >
        <SmoothScrolling>
          <PageLoader />
          <Navbar />
          <main className="flex-grow pt-24">{children}</main>
          <LiveChatWrapper />
          <Footer />
        </SmoothScrolling>
      </body>
    </html>
  );
}

