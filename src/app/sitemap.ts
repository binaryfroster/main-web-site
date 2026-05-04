import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";
  const now = new Date();

  // Static pages with their priority/change frequency
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Blog post slugs — mirrors the posts array in blog/page.tsx
  const blogSlugs = [
    "rise-of-autonomous-ai-agents",
    "data-streaming-vs-batch-processing",
    "web-performance-core-vitals",
    "zero-trust-cloud-architecture",
    "ai-driven-cybersecurity",
    "why-ai-chatbots-are-the-new-homepage",
    "building-an-erp-system-from-scratch",
    "the-real-cost-of-poor-seo",
    "nextjs-vs-remix-vs-astro",
    "cutting-ecommerce-load-times",
    "ai-diet-planner-behind-the-scenes",
    "migrating-to-postgresql",
    "future-of-saas-pricing",
    "mastering-tailwind-css",
    "web-accessibility-guide",
    "automating-customer-support",
    "graphql-vs-rest",
    "building-scalable-microservices",
    "ui-animation-principles",
    "serverless-architecture",
    "effective-remote-teams",
    "intro-to-typescript",
    "optimizing-react-performance",
    "design-systems",
    "machine-learning-in-production",
    "cybersecurity-basics",
    "state-management",
    "agile-methodology",
    "progressive-web-apps",
    "open-source-contributions",
    "ci-cd-pipelines",
    "user-research-methods",
    "kubernetes-for-beginners",
    "content-marketing-strategy",
    "web3-and-blockchain",
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${siteUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
