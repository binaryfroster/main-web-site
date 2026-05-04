"use client";

import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";
import {
  BackgroundBeams,
  Spotlight,
  AnimatedGroup,
  InView,
  TextEffect,
  NumberTicker,
  ShimmerButton,
  Magnetic,
} from "@/components/ui/premium";

import Image from "next/image";
import Link from "next/link";

const team = [
  { name: "Alex K.", role: "Founder & Lead Engineer", bio: "Full-stack developer with 7+ years of experience. Former senior engineer at a FTSE 100 company. Specializes in AI integrations and scalable architectures.", initials: "AK", color: "violet", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256" },
  { name: "Jamie D.", role: "Backend Architect", bio: "Database whisperer and API craftsman. Built systems handling 100K+ requests/day. Expert in PostgreSQL, Node.js, and distributed systems.", initials: "JD", color: "cyan", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256" },
  { name: "Sophie P.", role: "UI/UX Designer", bio: "Design-obsessed creative with a knack for turning complex workflows into intuitive interfaces. Background in graphic design and human-computer interaction.", initials: "SP", color: "violet", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=256&h=256" },
  { name: "Marcus R.", role: "AI/ML Engineer", bio: "Specialized in NLP, computer vision, and recommendation systems. Published researcher in applied machine learning for business automation.", initials: "MR", color: "cyan", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256" },
  { name: "Priya S.", role: "DevOps & Cloud", bio: "Infrastructure specialist bringing reliability and performance to every deployment. AWS certified, Kubernetes enthusiast, and automation advocate.", initials: "PS", color: "violet", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" },
  { name: "David C.", role: "Full-Stack Developer", bio: "React expert and TypeScript advocate. Passionate about clean code, component architecture, and pixel-perfect implementations.", initials: "DC", color: "cyan", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=256&h=256" },
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
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">

      {/* ── Background ─────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <BackgroundBeams className="opacity-30" />
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-[120px] animate-[float_25s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-[float_20s_ease-in-out_infinite_reverse]" />
      </div>
      <Spotlight className="absolute -top-40 left-20 z-[1]" fill="violet" />

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
                  <NumberTicker value={value} className="text-4xl font-display font-bold text-white tabular-nums" />
                  <span className="text-3xl font-display font-bold text-[var(--cyan-400)]">{suffix}</span>
                </div>
                <p className="text-[var(--text-muted)] text-sm mt-2">{label}</p>
              </GlassCard>
            ))}
          </div>
        </InView>

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

        {/* ── Team ───────────────────────────────────────────────────── */}
        <section className="mb-32">
          <InView>
            <div className="text-center mb-12">
              <span className="eyebrow">The Team</span>
              <TextEffect className="text-h2 mt-4" preset="blur" per="word">
                Meet the Humans Behind the Code
              </TextEffect>
              <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto">Every team member is a senior specialist. No junior hand-offs. No outsourcing.</p>
            </div>
          </InView>
          <AnimatedGroup
            preset="scale"
            className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member, i) => (
              <TiltCard key={i} className="team-card">
                <GlassCard className="p-7 flex flex-col items-center text-center gap-4 hover:border-cyan-400/30 transition-all">
                  <div className={`relative w-20 h-20 rounded-full border-2 overflow-hidden flex items-center justify-center text-xl font-display font-bold ${member.color === "violet" ? "bg-violet-500/20 border-violet-500/30 text-violet-300" : "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"}`}>
                    {member.img ? (
                      <Image src={member.img} alt={member.name} fill className="object-cover" sizes="80px" />
                    ) : (
                      member.initials
                    )}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[var(--text-h)] text-lg">{member.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{member.bio}</p>
                </GlassCard>
              </TiltCard>
            ))}
          </AnimatedGroup>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <InView>
          <section className="text-center">
            <GlassCard className="p-16 max-w-[800px] mx-auto border-violet-500/20 hover:border-violet-500/40 transition-all">
              <TextEffect className="text-h2 mb-4" preset="fade" per="word">
                Want to Work With Us?
              </TextEffect>
              <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md mx-auto">
                We take on a limited number of projects at a time to ensure every client gets our full attention.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Magnetic intensity={0.3}>
                  <ShimmerButton
                    background="radial-gradient(ellipse at bottom, #1a1552 0%, #060A1A 100%)"
                    className="px-8 py-3.5 text-sm font-medium"
                  >
                    <Link href="/contact" className="text-inherit no-underline">Start a Conversation →</Link>
                  </ShimmerButton>
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
