"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LiquidButton from "@/components/ui/LiquidButton";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import { processSteps, differentiators, portfolioItems } from "@/data/landing";

// ── Premium UI ──────────────────────────────────────────────────────────────
import {
  NumberTicker,
  Marquee,
  TextReveal,
  TypewriterEffect,
  AnimatedGroup,
  InView,
  TextEffect,
  Magnetic,
} from "@/components/ui/premium";

gsap.registerPlugin(ScrollTrigger);

// Respect OS reduced-motion preference for GSAP
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const TECH_STRIP = [
  "Next.js", "React", "TypeScript", "Node.js", "Python",
  "FastAPI", "PostgreSQL", "MongoDB", "AWS", "Stripe", "OpenAI", "GSAP",
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Skip heavy entrance animations when user prefers reduced motion
    if (prefersReducedMotion()) {
      gsap.set([".hero-eyebrow", ".hero-word", ".hero-sub", ".hero-btn", ".scroll-indicator"], { clearProps: "all" });
      return;
    }

    // ── Hero Entrance ──
    const heroTL = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        gsap.set([".hero-eyebrow", ".hero-word", ".hero-sub", ".hero-btn", ".scroll-indicator"], { clearProps: "all" });
      },
    });

    heroTL
      .from(".hero-eyebrow", { y: -30, opacity: 0, duration: 0.5, ease: "back.out(2)" })
      .from(".hero-word", {
        y: 80, rotationX: -60, opacity: 0,
        transformPerspective: 600, stagger: 0.07, duration: 0.7, ease: "power3.out"
      }, "-=0.2")
      .from(".hero-sub", { y: 30, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .from(".hero-btn", { y: 20, opacity: 0, scale: 0.9, stagger: 0.1, duration: 0.5, ease: "back.out(1.5)" }, "-=0.2")
      .from(".scroll-indicator", { opacity: 0, y: -10, duration: 0.5, ease: "power2.out" }, "-=0.1");

    // ── Scroll indicator fade on scroll ──
    gsap.to(".scroll-indicator", {
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "100px top", scrub: true },
      opacity: 0, pointerEvents: "none",
    });

    // Refresh ScrollTrigger after all images in the container load
    const images = containerRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      let loaded = 0;
      const total = images.length;
      const onLoad = () => { if (++loaded >= total) ScrollTrigger.refresh(); };
      images.forEach((img) => {
        if (img.complete) { onLoad(); }
        else { img.addEventListener("load", onLoad, { once: true }); }
      });
    }
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col pb-24 overflow-x-hidden outline-none noise-overlay">

      {/* ═══════ 1. HERO ═══════ */}
      <section ref={heroRef} className="hero relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Background Layer 0 — base colour */}
        <div className="absolute inset-0 z-[0] bg-[var(--bg-base)] transition-colors duration-700">
          <div className="absolute inset-0 bg-[var(--bg-base)] pointer-events-none transition-colors duration-700" />
        </div>

        {/* Content Wrapper */}
        <div className="container relative z-10 mx-auto px-6 pt-32 pb-12 w-full max-w-[1200px]">
          <div className="relative w-full grid grid-cols-1 lg:grid-cols-[52%_44%] gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[560px]">

            {/* Text Content — left column */}
            <div className="hero-text-box flex flex-col items-start text-left z-20 lg:pr-6">

              <span className="hero-eyebrow inline-flex items-center gap-2 px-4 py-1.5 border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] text-[12px] uppercase tracking-[0.12em] font-semibold font-mono">
                Now Available · Worldwide Clients
              </span>

              <h1 className="hero-h1 text-h1 mt-8 mb-2 flex flex-wrap justify-start gap-[0.25em]">
                {"We Build Software".split(" ").map((w, i) => (
                  <span key={i} className="hero-word inline-block">{w}</span>
                ))}
              </h1>
              <div className="hero-word text-h1 mb-2">
                That <span className="text-[var(--text-muted)]">Thinks.</span>
              </div>

              {/* Typewriter Effect - overflow hidden to prevent spill */}
              <div className="mt-4 mb-8 w-full overflow-hidden">
                <TypewriterEffect
                  words={[
                    { text: "AI" },
                    { text: "Automation", className: "text-[var(--text-muted)]" },
                    { text: "Web" },
                    { text: "E-commerce", className: "text-[var(--text-muted)]" },
                    { text: "SaaS" },
                  ]}
                  className="text-xl md:text-2xl font-display"
                />
              </div>

              <p className="hero-sub text-base md:text-lg text-[var(--text-muted)] mb-10 max-w-[500px] leading-relaxed">
                Custom-built technology solutions for growing businesses worldwide.
                From AI integrations to full e-commerce platforms — we build it, you own it.
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                {/* Primary */}
                <Magnetic intensity={0.3} className="hero-btn">
                  <Link href="/contact" className="inline-flex px-8 py-3.5 bg-[var(--text-h)] text-[var(--bg-base)] text-sm font-semibold tracking-wide border border-[var(--text-h)] hover:bg-transparent hover:text-[var(--text-h)] transition-colors no-underline">
                    Start a Project →
                  </Link>
                </Magnetic>

                {/* Secondary — Ghost */}
                <Magnetic intensity={0.3} className="hero-btn">
                  <LiquidButton href="/portfolio" size="md" variant="ghost">
                    View Our Work
                  </LiquidButton>
                </Magnetic>
              </div>
            </div>

            {/* Image Content — right column */}
            <div className="hero-img-box z-10">
              <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-none overflow-hidden shadow-2xl border border-[var(--glass-border)] group">
                <Image
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
                  alt="Business System Dark"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hero-img-dark object-cover transition-opacity duration-[1200ms] group-hover:scale-105"
                />
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                  alt="Team Collaboration Light"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="hero-img-light object-cover transition-opacity duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--bg-base)]/50 to-transparent pointer-events-none transition-colors duration-700" />
                {/* Glass overlay badge */}
                <div className="absolute bottom-4 left-4 px-4 py-2 rounded-xl bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-xs text-[var(--text-body)] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="text-[var(--cyan-400)] font-semibold">Live</span> · Dashboard Preview
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[var(--text-muted)]" aria-hidden="true">
          <span className="text-xs tracking-widest uppercase font-mono">Scroll to explore</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-bounce">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
          </svg>
        </div>
      </section>

      {/* ═══════ 1.5 STATS + TECH STRIP ═══════ */}
      <section className="container mx-auto px-6 max-w-[1320px] mt-16">
        {/* Stats Row */}
        <InView>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { value: 15, suffix: "+", label: "Projects Delivered" },
              { value: 99, suffix: "%", label: "Client Satisfaction" },
              { value: 6,  suffix: "",  label: "Expert Team Members" },
              { value: 3,  suffix: "+", label: "Years of Delivery" },
            ].map(({ value, suffix, label }) => (
              <GlassCard key={label} className="p-8 text-center hover:border-[var(--glass-border-h)] transition-all group">
                <div className="flex items-end justify-center gap-0.5">
                  <NumberTicker
                    value={value}
                    className="text-4xl md:text-5xl font-display font-bold text-[var(--text-h)] tabular-nums"
                  />
                  <span className="text-3xl md:text-4xl font-display font-bold text-[var(--cyan-400)]">{suffix}</span>
                </div>
                <p className="text-[var(--text-muted)] text-sm mt-3 group-hover:text-[var(--text-body)] transition-colors">{label}</p>
              </GlassCard>
            ))}
          </div>
        </InView>

        {/* Tech Marquee */}
        <div className="mb-4">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest text-center mb-5 font-mono">Our Tech Stack</p>
          <Marquee pauseOnHover className="[--duration:30s]">
            {TECH_STRIP.map((tech) => (
              <div key={tech} className="mx-4 px-6 py-3 border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-muted)] text-xs font-mono whitespace-nowrap hover:border-[var(--glass-border-h)] hover:text-[var(--text-body)] transition-all duration-300">
                {tech}
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ── Section Divider ── */}
      <div className="section-divider max-w-[1320px] mx-auto" />

      {/* ═══════ 2. PORTFOLIO BENTO ═══════ */}
      <section className="container mx-auto px-6 max-w-[1320px]" id="portfolio">
        <InView>
          <div className="flex justify-between items-end mb-14">
            <div>
              <span className="eyebrow">Our Work</span>
              <TextEffect className="text-h2 mt-4" preset="blur" per="word">
                Projects That Prove It
              </TextEffect>
              <p className="text-[var(--text-muted)] mt-4 max-w-lg leading-relaxed">A selection from our demo portfolio — real systems built to showcase our capabilities.</p>
            </div>
            <LiquidButton href="/portfolio" variant="ghost" className="hidden md:inline-flex" size="md">View All Work</LiquidButton>
          </div>
        </InView>
        <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px] md:auto-rows-[320px]">
          {portfolioItems.map((proj, i) => (
            <Link 
              key={i}
              href={`/portfolio#${proj.title.toLowerCase().replace(/\s/g,'-')}`} 
              className={`${i === 0 ? "bento-lg md:col-span-2" : "bento-md"} ${proj.size === "wide" ? "md:col-span-2" : ""} h-full cursor-pointer group`}
            >
              <TiltCard className="h-full">
                <GlassCard className="h-full p-2 relative glass-clip bg-[var(--glass-bg)]">
                  <Image src={proj.img} alt={proj.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover rounded-xl transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/40 to-transparent opacity-80" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-semibold" style={{ background: 'var(--badge-cat-bg)', color: 'var(--badge-cat-text)', border: '1px solid var(--badge-cat-border)' }}>{proj.cat}</span>
                      {proj.tags.map(t => <span key={t} className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[var(--glass-bg)] text-[var(--text-muted)] border border-[var(--glass-border)]">{t}</span>)}
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-[var(--text-h)] mb-1.5">{proj.title}</h3>
                    <p className="text-[var(--text-muted)] text-sm md:translate-y-4 md:opacity-0 transition-all duration-300 md:group-hover:translate-y-0 md:group-hover:opacity-100 leading-relaxed">{proj.desc}</p>
                    <span className="inline-flex items-center gap-1 mt-2 text-xs text-[var(--cyan-400)] md:translate-y-3 md:opacity-0 transition-all duration-300 delay-75 md:group-hover:translate-y-0 md:group-hover:opacity-100 font-semibold">
                      View Case Study
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </span>
                  </div>
                </GlassCard>
              </TiltCard>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section Divider ── */}
      <div className="section-divider max-w-[1320px] mx-auto" />

      {/* ═══════ 3. DIFFERENTIATORS ═══════ */}
      <section className="container mx-auto px-6 max-w-[1320px]">
        <div className="relative z-10">
          {/* Ambient orb - removed */}

          <InView>
            <div className="diff-header text-center mb-20 px-6">
              <span className="eyebrow">Our Edge</span>
              <TextEffect className="text-h2 mt-4" preset="blur" per="word">
                Why We Are Different
              </TextEffect>
              <p className="text-[var(--text-muted)] mt-5 max-w-[700px] mx-auto leading-relaxed text-base">
                We do not just build websites. We engineer scalable platforms designed to give you complete control and a technological advantage.{" "}
                <strong className="text-[var(--text-h)] font-medium">Unlike traditional agencies, we provide 100% code ownership, zero license fees, and AI-driven performance that scales with your ambition.</strong>
              </p>
            </div>
          </InView>

          <AnimatedGroup
            preset="blur-slide"
            className="diff-grid grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6"
          >
            {differentiators.map((diff, i) => (
              <GlassCard key={i} className="diff-card p-8 hover:border-[var(--glass-border-h)] transition-all duration-500 group h-full flex flex-col items-start text-left">
                <div className="w-14 h-14 rounded-none bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:rotate-[-3deg] transition-transform duration-300 relative overflow-hidden p-2.5">
                  <Image src={diff.icon} alt={diff.title} fill className="object-contain p-2.5" />
                </div>
                <h3 className="text-lg font-display font-semibold text-[var(--text-h)] mb-3">{diff.title}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed">{diff.desc}</p>
              </GlassCard>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* ── Section Divider ── */}
      <div className="section-divider max-w-[1320px] mx-auto" />

      {/* ═══════ 4. PROCESS TIMELINE ═══════ */}
      <section className="container mx-auto px-6 max-w-[1320px]">
        <InView>
          <div className="process-timeline relative z-10">
            <div className="text-center mb-20">
              <span className="eyebrow">Our Process</span>
              <TextEffect className="text-h2 mt-4" preset="slide" per="word">
                How We Work
              </TextEffect>
              <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto leading-relaxed">A structured process that keeps your project on track, on budget, and on time.</p>
            </div>
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute top-8 left-[5%] right-[5%] h-[1px] bg-[var(--glass-border)]" aria-hidden="true" />
              <AnimatedGroup
                preset="slide"
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative"
              >
                {processSteps.map((step) => (
                  <div key={step.n} className="process-step text-center group">
                    <div className="w-16 h-16 mx-auto rounded-none bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-2xl mb-5 relative z-10 hover:border-[var(--glass-border-h)] transition-all duration-300 overflow-visible group-hover:scale-105">
                      <div className="relative w-8 h-8">
                        <Image src={step.icon} alt={step.name} fill className="object-contain" />
                      </div>
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[var(--badge-cat-bg)] border border-[var(--badge-cat-border)] flex items-center justify-center text-[10px] font-mono font-bold text-[var(--badge-cat-text)]">{step.n}</span>
                    </div>
                    <h4 className="font-display font-semibold text-[var(--text-h)] text-sm mb-1.5">{step.name}</h4>
                    <p className="text-[var(--text-muted)] text-xs leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </AnimatedGroup>
            </div>
          </div>
        </InView>
      </section>

      {/* ── Section Divider ── */}
      <div className="section-divider max-w-[1320px] mx-auto" />

      {/* ═══════ 5. TEXT REVEAL CTA ═══════ */}
      <InView>
        <section className="container mx-auto px-6 max-w-[800px] text-center relative">
          {/* Ambient orb - removed */}
          <TextReveal
            text="Ready to build something extraordinary? We take on a limited number of projects each month to ensure every client gets our full attention."
            className="text-2xl md:text-3xl font-display font-semibold leading-snug text-[var(--text-h)] mb-12"
          />
          <div className="flex gap-4 justify-center flex-wrap">
            <Magnetic intensity={0.3}>
              <Link href="/contact" className="inline-flex px-8 py-3.5 bg-[var(--text-h)] text-[var(--bg-base)] text-sm font-semibold tracking-wide border border-[var(--text-h)] hover:bg-transparent hover:text-[var(--text-h)] transition-colors no-underline">
                Start a Project →
              </Link>
            </Magnetic>
            <LiquidButton href="/about" variant="ghost" size="md">Meet the Team</LiquidButton>
          </div>
        </section>
      </InView>

    </div>
  );
}
