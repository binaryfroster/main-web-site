"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";

const posts = [
  { slug: "why-ai-chatbots-are-the-new-homepage", title: "Why AI Chatbots Are the New Homepage", cat: "AI & Business", date: "Apr 10, 2026", read: "5 min read", excerpt: "How GPT-powered chatbots are replacing static FAQ pages and increasing customer engagement by 300%.", tags: ["AI", "Business"] },
  { slug: "building-an-erp-system-from-scratch", title: "Building an ERP System from Scratch", cat: "Engineering", date: "Apr 5, 2026", read: "12 min read", excerpt: "Lessons from building a custom enterprise resource planning system for a 200-person manufacturing company.", tags: ["ERP", "Backend"] },
  { slug: "the-real-cost-of-poor-seo", title: "The Real Cost of Poor SEO", cat: "Marketing", date: "Mar 28, 2026", read: "7 min read", excerpt: "A data-driven breakdown of how much money UK businesses leave on the table with subpar search optimization.", tags: ["SEO", "Marketing"] },
  { slug: "nextjs-vs-remix-vs-astro", title: "Next.js vs Remix vs Astro in 2026", cat: "Engineering", date: "Mar 20, 2026", read: "10 min read", excerpt: "An honest comparison of modern React frameworks — and when you should use each one.", tags: ["React", "Frontend"] },
  { slug: "cutting-ecommerce-load-times", title: "How We Cut E-commerce Load Times by 70%", cat: "Case Study", date: "Mar 12, 2026", read: "8 min read", excerpt: "A technical deep-dive into performance optimization for a Stripe-powered UK marketplace.", tags: ["Performance", "E-commerce"] },
  { slug: "ai-diet-planner-behind-the-scenes", title: "AI Diet Planner: Behind the Scenes", cat: "Product", date: "Mar 5, 2026", read: "6 min read", excerpt: "How we built a personalized nutrition engine using GPT-4 and why accuracy matters more than speed.", tags: ["AI", "SaaS"] },
];

export default function BlogPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heroAnim = gsap.from(".blog-hero span, .blog-hero h1, .blog-hero p", {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.1,
    });

    gsap.from(".blog-card", {
      scrollTrigger: { trigger: ".blog-grid", start: "top 85%" },
      y: 60, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
    });

    return () => {
      heroAnim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.set(".blog-hero span, .blog-hero h1, .blog-hero p, .blog-card", { clearProps: "all" });
    };
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute top-[15%] left-[20%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] animate-[float_22s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1000px]">
        {/* Hero */}
        <header className="blog-hero text-center mb-16 max-w-[700px] mx-auto">
          <span className="eyebrow">Blog</span>
          <h1 className="text-h1 mt-4 mb-4">Insights &amp; <span className="text-gradient">Tutorials</span></h1>
          <p className="text-[var(--text-muted)] text-lg">Technical deep-dives, case studies, and practical advice from the team building Binary Froster.</p>
        </header>

        {/* Blog Grid */}
        <div className="blog-grid flex flex-col gap-6">
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} className="block">
              <TiltCard className="blog-card h-full">
                <GlassCard className="p-7 hover:border-violet-500/30 transition-colors cursor-pointer group h-full">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-violet-500/15 text-violet-300 border border-violet-500/20">{post.cat}</span>
                        <span className="text-[11px] text-[var(--text-hint)]">{post.date}</span>
                        <span className="text-[11px] text-[var(--text-hint)]">·</span>
                        <span className="text-[11px] text-[var(--text-hint)]">{post.read}</span>
                      </div>
                      <h2 className="font-display font-semibold text-xl text-[var(--text-h)] mb-2 group-hover:text-violet-300 transition-colors">{post.title}</h2>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex gap-2 mt-3">
                        {post.tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 border border-[var(--glass-border)] text-[var(--text-muted)]">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-sm text-violet-300 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Read →</span>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <GlassCard className="p-12 max-w-[600px] mx-auto">
            <h3 className="text-h3 mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6">One email per week. Technical insights and project updates. No spam.</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-grow bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full px-5 py-3 text-[var(--text-h)] placeholder-[var(--text-hint)] focus:outline-none focus:border-cyan-500 text-sm" />
              <LiquidButton>Subscribe</LiquidButton>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
