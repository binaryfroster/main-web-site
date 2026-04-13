"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlassCard from "@/components/ui/GlassCard";
import TiltCard from "@/components/ui/TiltCard";
import LiquidButton from "@/components/ui/LiquidButton";

const team = [
  { name: "Alex K.", role: "Founder & Lead Engineer", bio: "Full-stack developer with 7+ years of experience. Former senior engineer at a FTSE 100 company. Specializes in AI integrations and scalable architectures.", initials: "AK", color: "violet" },
  { name: "Jamie D.", role: "Backend Architect", bio: "Database whisperer and API craftsman. Built systems handling 100K+ requests/day. Expert in PostgreSQL, Node.js, and distributed systems.", initials: "JD", color: "cyan" },
  { name: "Sophie P.", role: "UI/UX Designer", bio: "Design-obsessed creative with a knack for turning complex workflows into intuitive interfaces. Background in graphic design and human-computer interaction.", initials: "SP", color: "violet" },
  { name: "Marcus R.", role: "AI/ML Engineer", bio: "Specialized in NLP, computer vision, and recommendation systems. Published researcher in applied machine learning for business automation.", initials: "MR", color: "cyan" },
  { name: "Priya S.", role: "DevOps & Cloud", bio: "Infrastructure specialist bringing reliability and performance to every deployment. AWS certified, Kubernetes enthusiast, and automation advocate.", initials: "PS", color: "violet" },
  { name: "David C.", role: "Full-Stack Developer", bio: "React expert and TypeScript advocate. Passionate about clean code, component architecture, and pixel-perfect implementations.", initials: "DC", color: "cyan" },
];

const values = [
  { icon: "🎯", title: "Quality Over Quantity", desc: "We take fewer projects and deliver higher quality. Every line of code is production-ready." },
  { icon: "🤝", title: "Full Transparency", desc: "Real-time project tracking, clear pricing, and honest communication. No surprises, no hidden fees." },
  { icon: "🔒", title: "You Own Everything", desc: "Full source code ownership, all credentials, and complete documentation on delivery." },
  { icon: "🚀", title: "Ship Fast, Ship Right", desc: "Agile sprints with regular check-ins. We move fast without cutting corners." },
];

export default function AboutPage() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".about-hero span, .about-hero h1, .about-hero p", {
      y: 40, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out", delay: 0.1,
    });

    gsap.from(".value-card", {
      scrollTrigger: { trigger: ".values-grid", start: "top 80%" },
      y: 60, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
    });

    gsap.from(".team-card", {
      scrollTrigger: { trigger: ".team-grid", start: "top 80%" },
      y: 60, opacity: 0, stagger: 0.08, duration: 0.6, ease: "power3.out",
    });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1]" aria-hidden="true">
        <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] bg-violet-600/6 rounded-full blur-[120px] animate-[float_25s_ease-in-out_infinite]" />
        <div className="absolute bottom-[20%] left-[15%] w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] animate-[float_20s_ease-in-out_infinite_reverse]" />
      </div>

      <div className="container mx-auto px-6 max-w-[1320px]">
        {/* Hero */}
        <header className="about-hero text-center mb-24 max-w-[800px] mx-auto">
          <span className="eyebrow">About Us</span>
          <h1 className="text-h1 mt-4 mb-6">A Small Team Building <span className="text-gradient">Big Things.</span></h1>
          <p className="text-xl text-[var(--text-muted)] leading-relaxed">
            Binary Froster is a 6-person technology team focused on building custom software, AI integrations, and SaaS products for businesses in the US and UK. We combine startup speed with enterprise-grade quality.
          </p>
        </header>

        {/* Values */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <span className="eyebrow">Our Values</span>
            <h2 className="text-h2 mt-4">What We Stand For</h2>
          </div>
          <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <TiltCard key={i} className="value-card">
                <GlassCard className="p-7 h-full text-center">
                  <span className="text-3xl mb-4 block">{v.icon}</span>
                  <h3 className="font-display font-semibold text-[var(--text-h)] mb-2 text-lg">{v.title}</h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{v.desc}</p>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-32">
          <div className="text-center mb-12">
            <span className="eyebrow">The Team</span>
            <h2 className="text-h2 mt-4">Meet the Humans Behind the Code</h2>
            <p className="text-[var(--text-muted)] mt-4 max-w-lg mx-auto">Every team member is a senior specialist. No junior hand-offs. No outsourcing.</p>
          </div>
          <div className="team-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <TiltCard key={i} className="team-card">
                <GlassCard className="p-7 flex flex-col items-center text-center gap-4">
                  <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-xl font-display font-bold ${member.color === "violet" ? "bg-violet-500/20 border-violet-500/30 text-violet-300" : "bg-cyan-500/20 border-cyan-500/30 text-cyan-300"}`}>
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[var(--text-h)] text-lg">{member.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium mt-0.5">{member.role}</p>
                  </div>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">{member.bio}</p>
                </GlassCard>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <GlassCard className="p-16 max-w-[800px] mx-auto border-violet-500/20">
            <h2 className="text-h2 mb-4">Want to Work With Us?</h2>
            <p className="text-[var(--text-muted)] text-lg mb-8 max-w-md mx-auto">We take on a limited number of projects at a time to ensure every client gets our full attention.</p>
            <LiquidButton href="/contact">Start a Conversation</LiquidButton>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
