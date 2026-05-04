import { notFound } from "next/navigation";
import Link from "next/link";
import { posts } from "@/lib/blogData";
import GlassCard from "@/components/ui/GlassCard";

// Generate static routes at build time
export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };
  
  return {
    title: `${post.title} | Binary Froster`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
        {/* Background Ambient */}
        <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
          <div className="absolute top-[10%] right-[20%] w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[120px] animate-[float_20s_ease-in-out_infinite]" />
        </div>

        <div className="container mx-auto px-6 max-w-[800px]">
          <Link href="/blog" className="inline-flex items-center text-sm text-[var(--text-muted)] hover:text-cyan-400 transition-colors mb-10 group">
            <span className="mr-2 transform group-hover:-translate-x-1 transition-transform">←</span> 
            Back to Blog
          </Link>

          <header className="mb-12 animate-[slide-up_0.5s_ease-out]">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-2.5 py-1 rounded text-[11px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/20">{post.cat}</span>
              <span className="text-[12px] text-[var(--text-hint)]">{post.date}</span>
              <span className="text-[12px] text-[var(--text-hint)]">·</span>
              <span className="text-[12px] text-[var(--text-hint)]">{post.read}</span>
            </div>
            
            <h1 className="text-h2 md:text-[clamp(36px,5vw,56px)] leading-[1.1] mb-6">{post.title}</h1>
            
            <div className="flex gap-2 flex-wrap">
              {post.tags.map(t => (
                <span key={t} className="px-2.5 py-1 rounded text-[11px] font-mono bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)]">
                  {t}
                </span>
              ))}
            </div>
          </header>

          <div className="animate-[slide-up_0.6s_ease-out_0.1s_both]">
            <GlassCard className="p-8 md:p-12 blog-content !backdrop-blur-md">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </GlassCard>
          </div>
          
        </div>
    </div>
  );
}
