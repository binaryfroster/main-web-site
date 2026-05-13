"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";
import Image from "next/image";
import { posts } from "@/lib/blogData";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  // Newsletter
  const [nlEmail, setNlEmail] = useState("");
  const [nlSubscribed, setNlSubscribed] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);
  const [nlLoading, setNlLoading] = useState(false);

  const handleNlSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nlEmail) return;
    setNlLoading(true);
    setNlError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: nlEmail, source: "blog" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNlError(data.error || "Failed to subscribe. Try again.");
      } else {
        setNlSubscribed(true);
      }
    } catch {
      setNlError("Network error. Please try again.");
    } finally {
      setNlLoading(false);
    }
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  useGSAP(() => {
    gsap.from(".blog-card", {
      scrollTrigger: { trigger: ".blog-grid", start: "top 85%", once: true },
      y: 60, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
      clearProps: "all",
    });
  }, { scope: containerRef, dependencies: [currentPage] });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="min-h-screen pt-32 pb-24 relative overflow-hidden">
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
          {currentPosts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`} className="block">
              <TiltCard className="blog-card h-full">
                <GlassCard className="p-5 hover:border-violet-500/30 transition-colors cursor-pointer group h-full !backdrop-blur-md">
                  <div className="flex flex-col md:flex-row md:items-stretch gap-6 h-full">
                    <div className="w-full md:w-1/3 aspect-video md:aspect-auto relative rounded-none overflow-hidden flex-shrink-0">
                      <Image src={`/blog/${post.slug}-hero.webp`} alt={post.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                    </div>
                    <div className="flex-grow flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded-none text-[10px] font-mono" style={{background: 'var(--badge-cat-bg)', color: 'var(--badge-cat-text)', border: '1px solid var(--badge-cat-border)'}}>{post.cat}</span>
                        <span className="text-[11px] text-[var(--text-hint)]">{post.date}</span>
                        <span className="text-[11px] text-[var(--text-hint)]">·</span>
                        <span className="text-[11px] text-[var(--text-hint)]">{post.read}</span>
                      </div>
                      <h2 className="font-display font-semibold text-xl text-[var(--text-h)] mb-2 group-hover:text-[var(--cyan-500)] transition-colors">{post.title}</h2>
                      <p className="text-[var(--text-muted)] text-sm leading-relaxed">{post.excerpt}</p>
                      <div className="flex gap-2 mt-3">
                        {post.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-none text-[10px] font-mono bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)]">{t}</span>)}
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex items-center md:items-end justify-start md:justify-center">
                      <span className="text-sm text-[var(--cyan-500)] font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Read →</span>
                    </div>
                  </div>
                </GlassCard>
              </TiltCard>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-none border border-[var(--glass-border)] text-[var(--text-muted)] disabled:opacity-50 hover:bg-[var(--glass-bg)] transition-colors"
            >
              Previous
            </button>
            <span className="text-sm text-[var(--text-muted)]">
              Page {currentPage} of {totalPages}
            </span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-none border border-[var(--glass-border)] text-[var(--text-muted)] disabled:opacity-50 hover:bg-[var(--glass-bg)] transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 text-center">
          <GlassCard className="p-12 max-w-[600px] mx-auto !backdrop-blur-md">
            <h3 className="text-h3 mb-3">Subscribe to Our Newsletter</h3>
            <p className="text-[var(--text-muted)] text-sm mb-6">One email per week. Technical insights and project updates. No spam.</p>
            {nlSubscribed ? (
              <div className="flex items-center gap-2 justify-center text-cyan-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                Subscribed! We&apos;ll be in touch.
              </div>
            ) : (
              <>
                <form onSubmit={handleNlSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={nlEmail}
                    onChange={(e) => setNlEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={nlLoading}
                    className="flex-grow min-w-0 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-none px-5 py-3 text-[var(--text-h)] placeholder-[var(--text-hint)] focus:outline-none focus:border-cyan-500 text-sm disabled:opacity-60"
                  />
                  <LiquidButton type="submit" className="flex-shrink-0" disabled={nlLoading}>
                    {nlLoading ? "Subscribing…" : "Subscribe"}
                  </LiquidButton>
                </form>
                {nlError && (
                  <p className="text-red-400 text-sm mt-3">{nlError}</p>
                )}
              </>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
