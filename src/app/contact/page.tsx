"use client";

import { useEffect, useState, useRef } from "react";
import GlassCard from "@/components/ui/GlassCard";
import LiquidButton from "@/components/ui/LiquidButton";
import TiltCard from "@/components/ui/TiltCard";
import { validateContactForm, type ContactFormData, type FormErrors } from "@/utils/validation";
import LiveChat from "@/components/chat/LiveChat";
import {
  Spotlight,
  InView,
  AnimatedGroup,
  AnimatedTooltip,
  AnimatedProgress,
  ShimmerButton,
  Magnetic,
  TextEffect,
} from "@/components/ui/premium";

// ── Reusable floating-label input ──────────────────────────────────────────
function FloatInput({
  id, label, type = "text", value, onChange, error, required,
}: {
  id: string; label: string; type?: string;
  value: string; onChange: (v: string) => void;
  error?: string; required?: boolean;
}) {
  const filled = value.length > 0;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder=" "
        required={required}
        className={
          "peer w-full h-14 bg-[var(--glass-bg)] border rounded-xl px-4 pt-5 pb-1 " +
          "text-[var(--text-h)] text-sm focus:outline-none transition-all " +
          "focus:shadow-[0_0_0_3px_rgba(0,191,191,0.12)] " +
          (error
            ? "border-red-500 focus:border-red-400"
            : "border-[var(--glass-border)] focus:border-cyan-400")
        }
      />
      <label
        htmlFor={id}
        className={
          "absolute left-4 pointer-events-none transition-all duration-200 " +
          (filled
            ? "top-2 text-[10px] text-cyan-400"
            : "top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]") +
          " peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-cyan-400 peer-focus:translate-y-0"
        }
      >
        {label}
      </label>
      {error && <p className="text-red-400 text-xs mt-1.5 ml-1" role="alert" aria-live="polite">{error}</p>}
    </div>
  );
}

// ── Reusable styled select ─────────────────────────────────────────────────
function StyledSelect({
  id, label, value, onChange, error, required, children,
}: {
  id: string; label: string;
  value: string; onChange: (v: string) => void;
  error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-medium text-[var(--text-muted)] tracking-wide">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          required={required}
          onChange={e => onChange(e.target.value)}
          className={
            "w-full h-12 bg-[var(--glass-bg)] border rounded-xl px-4 pr-10 " +
            "text-[var(--text-h)] text-sm focus:outline-none transition-all appearance-none cursor-pointer " +
            "focus:shadow-[0_0_0_3px_rgba(0,191,191,0.12)] " +
            (error
              ? "border-red-500 focus:border-red-400"
              : "border-[var(--glass-border)] focus:border-cyan-400")
          }
        >
          {children}
        </select>
        {/* Custom chevron */}
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </span>
      </div>
      {error && <p className="text-red-400 text-xs mt-1 ml-1" role="alert" aria-live="polite">{error}</p>}
    </div>
  );
}

// ── The contact info sidebar card ─────────────────────────────────────────
function InfoCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <TiltCard>
      <GlassCard className="p-5">
        <div className="flex items-start gap-4">
          <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
          <div>
            <h4 className="font-display font-medium text-[var(--text-h)] text-sm mb-1">{title}</h4>
            {children}
          </div>
        </div>
      </GlassCard>
    </TiltCard>
  );
}

export default function ContactPage() {
  const [budget, setBudget] = useState(5000);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [bookForm, setBookForm] = useState({ name: "", email: "", product: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: "", email: "", company: "", service: "", desc: "", heard: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const budgetPct = ((budget - 500) / (50000 - 500)) * 100;

  const budgetLabel = () => {
    if (budget < 1000) return "Under £1,000";
    if (budget >= 50000) return "£50,000+";
    const low = Math.floor(budget / 1000) * 1000;
    const high = low + 2000;
    return `£${low.toLocaleString()} – £${high.toLocaleString()}`;
  };


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBookModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const validate = (): boolean => {
    const newErrors = validateContactForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      Object.keys(newErrors).forEach(field => {
        const el = document.getElementById(`field-${field}`);
        if (el) {
          el.style.animation = "shake 0.5s ease-in-out";
          setTimeout(() => { if (el) el.style.animation = ""; }, 500);
        }
      });
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          budget: budgetLabel(),
          message: formData.desc,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Network error — please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen relative">

      {/* ── Background ───────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        <div className="absolute top-0 w-full h-[600px] bg-gradient-to-b from-cyan-500/6 to-transparent blur-[100px]" />
        <div className="absolute top-[30%] left-[60%] w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      {/* ── Spotlight ─────────────────────────────────────── */}
      <Spotlight className="-top-40 left-0 md:left-60 z-[1]" fill="cyan" />

      {/* ── Hero Header ──────────────────────────────────── */}
      <div className="pt-36 pb-16 text-center contact-elem">
        <span className="eyebrow">Get in Touch</span>
        <h1 className="text-h1 mt-4 mb-4">
          Let&apos;s Build Something Together.
        </h1>
        <p className="text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed">
          Tell us about your project and we&apos;ll get back to you within 24 hours.
          No commitments — just a friendly conversation.
        </p>
      </div>

      {/* ── Main Grid ────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-[1200px] pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

          {/* LEFT — contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4 lg:sticky lg:top-28">

            <AnimatedGroup preset="slide" className="contact-elem flex flex-col gap-4">
              <InfoCard icon="📧" title="Email">
                <a href="mailto:binaryfroster@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm break-all">
                  binaryfroster@gmail.com
                </a>
              </InfoCard>

              <InfoCard icon="⏱️" title="Response Time">
                <p className="text-[var(--text-muted)] text-sm">Within 24 hours (Mon–Fri)</p>
              </InfoCard>

              <InfoCard icon="🌍" title="Coverage">
                <p className="text-[var(--text-muted)] text-sm">Serving clients worldwide</p>
                <p className="text-[var(--text-muted)] text-xs mt-1 opacity-70">
                  UK: 9am–6pm GMT &nbsp;|&nbsp; India: 10am–7pm IST
                </p>
              </InfoCard>
            </AnimatedGroup>

            {/* Book a call */}
            <div className="contact-elem">
              <GlassCard className="p-5">
                <p className="text-[var(--text-body)] text-sm mb-4 leading-relaxed">
                  Prefer to talk? Book a free 30-min discovery call — no obligation.
                </p>
                <LiquidButton 
                  variant="ghost" 
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setBookModalOpen(true);
                  }}
                >
                  📞 &nbsp;Book a Call
                </LiquidButton>
              </GlassCard>
            </div>

            {/* Socials */}
            <InView>
              <div className="contact-elem">
                <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-widest font-medium">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { name: "LinkedIn", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, color: "hover:border-[#0A66C2]/60 hover:text-[#0A66C2]", href: "https://in.linkedin.com/in/binary-froster" },
                    { name: "GitHub", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, color: "hover:border-[var(--glass-border-h)] hover:text-[var(--text-h)]", href: "#" },
                    { name: "Twitter/X", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, color: "hover:border-[var(--glass-border-h)] hover:text-[var(--text-h)]", href: "https://x.com/Binaryfroster" },
                    { name: "Instagram", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, color: "hover:border-[#E1306C]/60 hover:text-[#E1306C]", href: "https://www.instagram.com/binaryfroster/" },
                  ].map((s) => (
                    <AnimatedTooltip key={s.name} content={s.name} side="top">
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] transition-all text-xs font-semibold font-mono ${s.color}`}
                        aria-label={s.name}
                      >
                        {s.icon}
                      </a>
                    </AnimatedTooltip>
                  ))}
                </div>
              </div>
            </InView>
          </div>

          {/* RIGHT — form */}
          <div className="lg:col-span-3 contact-elem">
            <GlassCard className="p-8 md:p-10">
              {submitted ? (
                /* ── Success State ─────────────────────── */
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                    <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-[var(--text-h)] mb-3">Message Sent! 🎉</h3>
                  <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out. We&apos;ll review your inquiry and get back to you within 24 hours.
                  </p>
                  <LiquidButton variant="ghost" onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", company: "", service: "", desc: "", heard: "" });
                  }}>
                    Send Another Message
                  </LiquidButton>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="text-xl font-display font-semibold text-[var(--text-h)]">Project Inquiry</h2>
                    <p className="text-[var(--text-muted)] text-sm mt-1">Fill in the details below and we&apos;ll be in touch.</p>
                  </div>

                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>

                    {/* Name & Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div id="field-name">
                        <FloatInput
                          id="name" label="Full Name" value={formData.name}
                          onChange={v => updateField("name", v)} error={errors.name} required
                        />
                      </div>
                      <div id="field-email">
                        <FloatInput
                          id="email" label="Email Address" type="email" value={formData.email}
                          onChange={v => updateField("email", v)} error={errors.email} required
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <FloatInput
                      id="company" label="Company / Organisation (optional)"
                      value={formData.company || ""} onChange={v => updateField("company", v)}
                    />

                    {/* Service */}
                    <div id="field-service">
                      <StyledSelect
                        id="service" label="Service Needed"
                        value={formData.service} onChange={v => updateField("service", v)} error={errors.service}
                      >
                        <option value="" className="bg-[var(--bg-surface)]">Select a service…</option>
                        <option value="landing" className="bg-[var(--bg-surface)]">Landing Page / Website</option>
                        <option value="ecom" className="bg-[var(--bg-surface)]">E-commerce Platform</option>
                        <option value="ai" className="bg-[var(--bg-surface)]">AI Integration / Chatbot</option>
                        <option value="mgmt" className="bg-[var(--bg-surface)]">Management System (ERP/LMS/Hospital)</option>
                        <option value="voice" className="bg-[var(--bg-surface)]">Voice Automation</option>
                        <option value="diet" className="bg-[var(--bg-surface)]">AI Diet Planner (subscribe)</option>
                        <option value="saas" className="bg-[var(--bg-surface)]">Full SaaS Development</option>
                        <option value="custom" className="bg-[var(--bg-surface)]">Custom / Not sure</option>
                      </StyledSelect>
                    </div>

                    {/* Budget Slider */}
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-medium text-[var(--text-muted)] tracking-wide">
                          Estimated Budget
                        </label>
                        <span className="text-sm text-cyan-400 font-mono font-medium">{budgetLabel()}</span>
                      </div>
                      {/* Animated Progress Track */}
                      <div className="relative">
                        <AnimatedProgress
                          value={budgetPct}
                          max={100}
                          barClassName="bg-gradient-to-r from-cyan-500 to-violet-500"
                        />
                        <input
                          type="range" min="500" max="50000" step="500" value={budget}
                          onChange={e => setBudget(parseInt(e.target.value))}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          aria-label="Estimated budget"
                        />
                        {/* Thumb indicator */}
                        <div
                          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.4)] border-2 border-cyan-400 transition-all pointer-events-none"
                          style={{ left: `calc(${budgetPct}% - 10px)` }}
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-[var(--text-muted)]">
                        <span>£500</span><span>£50,000+</span>
                      </div>
                    </div>

                    {/* Project description */}
                    <div id="field-desc" className="relative">
                      <textarea
                        id="desc" rows={4} value={formData.desc}
                        onChange={e => updateField("desc", e.target.value)}
                        placeholder=" "
                        className={
                          "peer w-full bg-[var(--glass-bg)] border rounded-xl px-4 pt-7 pb-3 " +
                          "text-[var(--text-h)] text-sm focus:outline-none transition-all resize-none " +
                          "focus:shadow-[0_0_0_3px_rgba(0,191,191,0.12)] " +
                          (errors.desc ? "border-red-500" : "border-[var(--glass-border)] focus:border-cyan-400")
                        }
                      />
                      <label
                        htmlFor="desc"
                        className="absolute left-4 top-4 text-sm text-[var(--text-muted)] transition-all duration-200 pointer-events-none peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-cyan-400 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]"
                      >
                        Tell us about your project…
                      </label>
                      {errors.desc && <p className="text-red-400 text-xs mt-1.5 ml-1" role="alert" aria-live="polite">{errors.desc}</p>}
                    </div>

                    {/* How heard */}
                    <StyledSelect
                      id="heard" label="How did you hear about us?"
                      value={formData.heard || ""} onChange={v => updateField("heard", v)}
                    >
                      <option value="" className="bg-[var(--bg-surface)]">Select…</option>
                      <option value="google" className="bg-[var(--bg-surface)]">Google Search</option>
                      <option value="linkedin" className="bg-[var(--bg-surface)]">LinkedIn</option>
                      <option value="twitter" className="bg-[var(--bg-surface)]">Twitter/X</option>
                      <option value="referral" className="bg-[var(--bg-surface)]">Referral</option>
                      <option value="freelance" className="bg-[var(--bg-surface)]">Freelance Platform</option>
                      <option value="other" className="bg-[var(--bg-surface)]">Other</option>
                    </StyledSelect>

                    <Magnetic intensity={0.2} className="w-full">
                      <ShimmerButton
                        type="submit"
                        disabled={isSubmitting}
                        background="radial-gradient(ellipse at bottom, #1a1552 0%, #060A1A 100%)"
                        className="w-full px-8 py-3.5 text-sm font-medium mt-1"
                      >
                        {isSubmitting ? "Sending…" : "Send Message →"}
                      </ShimmerButton>
                    </Magnetic>

                    <p className="text-center text-xs text-[var(--text-muted)]">
                      🔒 Your data is safe. We never share your information.
                    </p>

                    {submitError && (
                      <div role="alert" className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                        <svg className="flex-shrink-0 mt-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                        {submitError}
                      </div>
                    )}
                  </form>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* ── Live Chat Widget ────────────────────────────── */}
      <LiveChat />

      {/* Book a Call Modal */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[var(--bg-overlay)] backdrop-blur-md" onClick={() => setBookModalOpen(false)} />
          <div className="relative z-[101] w-full max-w-md animate-[slide-up_0.3s_ease-out]">
            <GlassCard className="p-6 md:p-8">
              <button 
                onClick={() => setBookModalOpen(false)} 
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-[var(--text-muted)] hover:text-[var(--text-h)] hover:bg-white/10 transition-all"
                aria-label="Close modal"
              >
                ✕
              </button>
              <h3 className="text-xl font-display font-medium text-[var(--text-h)] mb-2">Request a Call</h3>
              <p className="text-sm text-[var(--text-muted)] mb-6">Enter your details and we&apos;ll setup a time.</p>
              <form onSubmit={(e) => {
                e.preventDefault();
                const subject = encodeURIComponent(`Call Request: ${bookForm.product}`);
                const body = encodeURIComponent(`Name: ${bookForm.name}\nEmail: ${bookForm.email}\nProduct Type: ${bookForm.product}\n\nI would like to book a call regarding this product.`);
                window.location.href = `mailto:binaryfroster@gmail.com?subject=${subject}&body=${body}`;
                setBookModalOpen(false);
                setBookForm({ name: "", email: "", product: "" });
              }} className="flex flex-col gap-5">
                <FloatInput 
                  id="bookName" 
                  label="Full Name" 
                  required 
                  value={bookForm.name} 
                  onChange={(v) => setBookForm({ ...bookForm, name: v })} 
                />
                <FloatInput 
                  id="bookEmail" 
                  type="email" 
                  label="Email Address" 
                  required 
                  value={bookForm.email} 
                  onChange={(v) => setBookForm({ ...bookForm, email: v })} 
                />
                <StyledSelect 
                  id="bookProduct" 
                  label="Type of Product" 
                  value={bookForm.product} 
                  onChange={(v) => setBookForm({ ...bookForm, product: v })} 
                  required
                >
                  <option value="" disabled>Select a product...</option>
                  <option value="Web Application">Web Application</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="AI Diet Planner">AI Diet Planner</option>
                  <option value="Other">Other</option>
                </StyledSelect>
                <LiquidButton type="submit" className="w-full mt-2">
                  Request Call
                </LiquidButton>
              </form>
            </GlassCard>
          </div>
        </div>
      )}

    </div>
  );
}
