import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { posts } from "@/lib/blogData";
import GlassCard from "@/components/ui/GlassCard";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.binaryfroster.com";

// Generate static routes at build time
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate full SEO metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found | Binary Froster" };

  const heroImage = `${SITE_URL}/blog/${slug}-hero.webp`;

  return {
    title: `${post.title} | Binary Froster Blog`,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: "Binary Froster", url: SITE_URL }],
    alternates: {
      canonical: `${SITE_URL}/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      siteName: "Binary Froster",
      locale: "en_GB",
      publishedTime: post.date,
      tags: post.tags,
      images: [
        {
          url: heroImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Binaryfroster",
      creator: "@Binaryfroster",
      title: post.title,
      description: post.excerpt,
      images: [heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // JSON-LD Article schema for rich results
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/blog/${slug}-hero.webp`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Binary Froster",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Binary Froster",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/assets/logo.webp`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
    keywords: post.tags.join(", "),
    articleSection: post.cat,
  };

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* JSON-LD Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Background Ambient */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-violet-500/5 rounded-none blur-[120px] animate-[float_20s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-[800px]">
        <Link href="/blog" className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-[#B8F564] transition-colors mb-10 group">
          <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
          Back to Blog
        </Link>

        <header className="mb-12 animate-[slide-up_0.5s_ease-out]">
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="px-2.5 py-1 rounded-none text-[11px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/20">{post.cat}</span>
            <span className="text-[12px] text-[var(--text-hint)]">{post.date}</span>
            <span className="text-[12px] text-[var(--text-hint)]">·</span>
            <span className="text-[12px] text-[var(--text-hint)]">{post.read}</span>
          </div>

          <h1 className="text-h2 md:text-[clamp(36px,5vw,56px)] leading-[1.1] mb-6">{post.title}</h1>

          <p className="text-[var(--text-muted)] text-base leading-relaxed mb-6 max-w-[640px]">
            {post.excerpt}
          </p>

          <div className="flex gap-2 flex-wrap">
            {post.tags.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-none text-[11px] font-mono bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)]">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="animate-[slide-up_0.6s_ease-out_0.1s_both]">
          <GlassCard className="p-8 md:p-12 blog-content">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </GlassCard>
        </div>

        {/* Back CTA */}
        <div className="mt-12 pt-8 border-t border-[var(--glass-border)] flex items-center justify-between flex-wrap gap-4">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-[#B8F564] transition-colors group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span>
            All Articles
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-medium border border-[var(--glass-border)] px-5 py-2 text-[var(--text-muted)] hover:border-[#B8F564] hover:text-[#B8F564] transition-all">
            Start a Project →
          </Link>
        </div>
      </div>
    </div>
  );
}
