"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAPair from "@/components/ui/CTAPair";
import { TypewriterEffect } from "@/components/ui/premium";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (prefersReducedMotion()) {
      gsap.set([".hero-eyebrow", ".hero-word", ".hero-sub", ".hero-btn", ".hero-trust", ".scroll-indicator"], { clearProps: "all" });
      return;
    }

    const heroTL = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        gsap.set([".hero-eyebrow", ".hero-word", ".hero-sub", ".hero-btn", ".hero-trust", ".scroll-indicator"], { clearProps: "all" });
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
      // FIX 03 — subtle fade-in animation (200ms delay after CTA buttons)
      .from(".hero-trust", { opacity: 0, y: 10, duration: 0.5, ease: "power2.out" }, "+=0.2")
      .from(".scroll-indicator", { opacity: 0, y: -10, duration: 0.5, ease: "power2.out" }, "-=0.1");

    gsap.to(".scroll-indicator", {
      scrollTrigger: { trigger: heroRef.current, start: "top top", end: "100px top", scrub: true },
      opacity: 0, pointerEvents: "none",
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="hero relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden">

      {/* Background Layer 0 — base colour */}
      <div className="absolute inset-0 z-[0] bg-[var(--bg-base)] transition-colors duration-700">
        <div className="absolute inset-0 bg-[var(--bg-base)] pointer-events-none transition-colors duration-700" />
      </div>

      {/* Bottom Fade for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-base)] to-transparent z-[5] pointer-events-none" />

      {/* Content Wrapper */}
      <div className="container relative z-10 mx-auto px-6 lg:px-12 pt-32 pb-12 w-full max-w-[1320px]">
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

            <CTAPair
              primary={["Start Your Project →", "/contact"]}
              secondary={["View Our Work", "/portfolio"]}
              className="mb-6"
            />

            {/* FIX 03 — Hero Trust Micro-Strip */}
            <div className="hero-trust flex flex-wrap gap-2.5 items-center mt-2">
              {[
                "Fixed Price Guarantee",
                "100% Code Ownership",
                "Direct Dev Communication",
                "HIPAA Compliant",
              ].map((pill, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 bg-[#111111] border border-[#1e1e1e] rounded-none px-[14px] py-[5px] text-[0.75rem]"
                >
                  <span className="text-[#B8F564] font-bold">✓</span>
                  <span className="text-[#888888] font-medium">{pill}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Image Content — right column */}
          <div className="hero-img-box z-10">
            <div className="relative w-full aspect-[4/3] lg:aspect-[4/5] rounded-none overflow-hidden shadow-2xl border border-[var(--glass-border)] group">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"
                alt="Business System Dark"
                fill
                priority
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
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-none bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] text-xs text-[var(--text-body)] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-[var(--cyan-400)] font-semibold">Live</span> · Dashboard Preview
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-[10] flex flex-col items-center gap-2 text-[var(--text-h)] opacity-60 hover:opacity-100 transition-opacity cursor-pointer" aria-hidden="true" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
        <span className="text-[10px] tracking-[0.2em] uppercase font-mono font-bold">Explore</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-bounce">
          <path d="M7 13l5 5 5-5" />
        </svg>
      </div>
    </section>
  );
}
