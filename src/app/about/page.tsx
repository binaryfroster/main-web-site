"use client";

import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";
import {
  AnimatedGroup,
  InView,
  TextEffect,
  NumberTicker,
  Magnetic,
} from "@/components/ui/premium";

import Image from "next/image";
import Link from "next/link";


const team = [
  {
    name: "Shivam Dube",
    role: "Founder & Backend Architect",
    bio: "Full-stack developer and the driving force behind Binary Froster. Specializes in scalable backend architectures, API design, and AI integrations. Passionate about building production-grade systems that solve real business problems.",
    initials: "SD",
    color: "violet",
    img: "/team/shivam.png",
    linkedin: "https://www.linkedin.com/in/shivam-dube/",
  },
  {
    name: "Digvijay Kadam",
    role: "UI/UX Designer",
    bio: "Design-obsessed creative who transforms complex workflows into intuitive, beautiful interfaces. Expert in Figma, design systems, and user research. Ensures every pixel serves a purpose.",
    initials: "DK",
    color: "cyan",
    img: "/team/digvijay.png",
    linkedin: "https://www.linkedin.com/in/kadamdigvijay/",
  },
  {
    name: "Jawad Khan",
    role: "Mobile App Developer",
    bio: "Cross-platform mobile specialist building performant apps with React Native and Flutter. Focused on smooth animations, offline-first architectures, and seamless user experiences across iOS and Android.",
    initials: "JK",
    color: "violet",
    img: "/team/jawad.png",
    linkedin: "https://www.linkedin.com/in/jawad-khan-hakim/",
  },
  {
    name: "Pruthviraj Chougale",
    role: "AI Engineer",
    bio: "Machine learning and AI specialist with expertise in NLP, computer vision, and LLM integrations. Builds intelligent automation pipelines that give businesses a competitive edge.",
    initials: "PC",
    color: "cyan",
    img: "/team/pruthviraj.png",
    linkedin: "https://www.linkedin.com/in/pruthviraj-chougale-3333a9240/",
  },
  {
    name: "Rugved Kulkarni",
    role: "Full-Stack Developer",
    bio: "React and TypeScript advocate who bridges frontend elegance with backend robustness. Passionate about clean code, component architecture, and delivering pixel-perfect implementations at speed.",
    initials: "RK",
    color: "violet",
    img: "/team/rugved.png",
    linkedin: "https://www.linkedin.com/in/rugved-kulkarni-038315342/",
  },
  {
    name: "Prithviraj Indulkar",
    role: "Cloud & DevOps",
    bio: "Infrastructure specialist bringing reliability and performance to every deployment. Expert in AWS, Docker, Kubernetes, and CI/CD pipelines. Ensures every product scales seamlessly from day one.",
    initials: "PI",
    color: "cyan",
    img: "/team/prithviraj_i.png",
    linkedin: "https://www.linkedin.com/in/prithviraj-indulkar/",
  },
];

const values = [
  { icon: "🎯", title: "Quality Over Quantity", desc: "We take fewer projects and deliver higher quality. Every line of code is production-ready." },
  { icon: "🤝", title: "Full Transparency", desc: "Real-time project tracking, clear pricing, and honest communication. No surprises, no hidden fees." },
  { icon: "🔒", title: "You Own Everything", desc: "Full source code ownership, all credentials, and complete documentation on delivery." },
  { icon: "🚀", title: "Ship Fast, Ship Right", desc: "Agile sprints with regular check-ins. We move fast without cutting corners." },
];

const stats = [
  { value: 15, suffix: "+", label: "Projects Delivered" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
  { value: 6,  suffix: "",  label: "Expert Team Members" },
  { value: 3,  suffix: "+", label: "Years Operating" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden noise-overlay">

      {/* ── Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
      </div>

      <div className="container mx-auto px-6 max-w-[1320px]">

        {/* ── Hero ───────────────────────────────────────────────────── */}
        <header className="about-hero text-center mb-20 max-w-[800px] mx-auto">
          <span className="eyebrow">About Us</span>
          <h1 className="text-h1 mt-4 mb-6">
            A Small Team Building Big Things.
          </h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed">
            Binary Froster is a 6-person technology team focused on building custom software, AI integrations,
            and SaaS products for businesses worldwide, with a strong footprint in the UK and India.
            We combine startup speed with enterprise-grade quality.
          </p>
        </header>

        {/* ── Stats ──────────────────────────────────────────────────── */}
        <InView>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {stats.map(({ value, suffix, label }) => (
              <GlassCard key={label} className="p-6 text-center">
                <div className="flex items-end justify-center gap-0.5">
                  <NumberTicker value={value} className="text-4xl font-display font-bold text-[var(--text-h)] tabular-nums" />
                  <span className="text-3xl font-display font-bold text-[var(--cyan-400)]">{suffix}</span>
                </div>
                <p className="text-[var(--text-muted)] text-sm mt-2">{label}</p>
              </GlassCard>
            ))}
          </div>
        </InView>

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ── Values ─────────────────────────────────────────────────── */}
        <section className="mb-32">
          <InView>
            <div className="text-center mb-12">
              <span className="eyebrow">Our Values</span>
              <TextEffect className="text-h2 mt-4" preset="slide" per="word">
                What We Stand For
              </TextEffect>
            </div>
          </InView>
          <AnimatedGroup
            preset="blur-slide"
            className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((v, i) => (
              <TiltCard key={i} className="value-card">
                <GlassCard className="p-7 h-full text-center hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all">
                  <span className="text-3xl mb-4 block">{v.icon}</span>
                  <h3 className="font-display font-semibold text-[var(--text-h)] mb-2 text-lg">{v.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{v.desc}</p>
                </GlassCard>
              </TiltCard>
            ))}
          </AnimatedGroup>
        </section>

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ── Team ───────────────────────────────────────────────────── */}
        <section className="mb-32">
          <InView>
            <div className="text-center mb-12">
              <span className="eyebrow">The Founders</span>
              <TextEffect className="text-h2 mt-4" preset="blur" per="word">
                Meet the Humans Behind the Code
              </TextEffect>
              <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto">Every team member is a specialist. No junior hand-offs. No outsourcing.</p>
            </div>
          </InView>
          <AnimatedGroup
            preset="scale"
            className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, i) => (
              <TiltCard key={i} className="team-card">
                <GlassCard className="p-8 flex flex-col items-center text-center gap-5 hover:border-[var(--cyan-400)]/25 hover:shadow-[0_0_40px_rgba(93,220,220,0.06)] transition-all duration-500 relative group">
                  <div className={`relative w-24 h-24 rounded-full border-2 border-[var(--glass-border-h)] overflow-hidden flex items-center justify-center text-xl font-display font-bold bg-[var(--badge-cat-bg)] text-[var(--text-h)]`}>
                    {member.img ? (
                      <Image src={member.img} alt={member.name} fill className="object-cover" sizes="96px" />
                    ) : (
                      member.initials
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[var(--text-h)] text-lg">{member.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{member.bio}</p>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] hover:text-[#0A66C2] transition-colors mt-auto pt-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                </GlassCard>
              </TiltCard>
            ))}
          </AnimatedGroup>
        </section>

        {/* ── Section Divider ── */}
        <div className="section-divider" />

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <InView>
          <section className="text-center">
            <GlassCard className="p-16 max-w-[800px] mx-auto border-[var(--violet-500)]/15 hover:border-[var(--violet-500)]/30 transition-all duration-500 animate-breathe">
              <TextEffect className="text-h2 mb-4" preset="fade" per="word">
                Want to Work With Us?
              </TextEffect>
              <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md mx-auto">
                We take on a limited number of projects at a time to ensure every client gets our full attention.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Magnetic intensity={0.3}>
                  <Link href="/contact" className="inline-flex justify-center px-8 py-3.5 bg-[var(--text-h)] text-[var(--bg-base)] text-sm font-semibold tracking-wide border border-[var(--text-h)] hover:bg-transparent hover:text-[var(--text-h)] transition-colors no-underline">
                    Start a Conversation →
                  </Link>
                </Magnetic>
                <LiquidButton href="/portfolio" variant="ghost" size="md">See Our Work</LiquidButton>
              </div>
            </GlassCard>
          </section>
        </InView>

      </div>
    </div>
  );
}

