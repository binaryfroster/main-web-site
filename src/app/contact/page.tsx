"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import GlassCard from "@/components/ui/GlassCard";
import LiquidButton from "@/components/ui/LiquidButton";
import TiltCard from "@/components/ui/TiltCard";

import { validateContactForm, type ContactFormData, type FormErrors } from "@/utils/validation";

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
      {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error}</p>}
    </div>
  );
}

// ── Reusable styled select ─────────────────────────────────────────────────
function StyledSelect({
  id, label, value, onChange, error, children,
}: {
  id: string; label: string;
  value: string; onChange: (v: string) => void;
  error?: string; children: React.ReactNode;
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
      {error && <p className="text-red-400 text-xs mt-1 ml-1">{error}</p>}
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
  const [chatOpen, setChatOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<ContactFormData>({
    name: "", email: "", company: "", service: "", desc: "", heard: "",
  });
  const [chatMessages, setChatMessages] = useState([
    { from: "bot", text: "Hi! 👋 How can we help you today?", time: "just now" }
  ]);
  const [chatInput, setChatInput] = useState("");
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
    const anim = gsap.from(".contact-elem", {
      y: 40, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power3.out", delay: 0.1,
    });
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setChatOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      anim.kill();
      gsap.set(".contact-elem", { clearProps: "all" });
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
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;
    setChatMessages(prev => [...prev, { from: "user", text: chatInput, time: "now" }]);
    setChatInput("");
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        from: "bot",
        text: "Thanks for reaching out! One of our team members will get back to you shortly. In the meantime, feel free to fill out the project inquiry form for a detailed estimate.",
        time: "just now"
      }]);
    }, 1500);
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

      {/* ── Hero Header ──────────────────────────────────── */}
      <div className="pt-36 pb-16 text-center contact-elem">
        <span className="eyebrow">Get in Touch</span>
        <h1 className="text-h1 mt-4 mb-4">Let&apos;s Build Something Together.</h1>
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

            <div className="contact-elem flex flex-col gap-4">
              <InfoCard icon="📧" title="Email">
                <a href="mailto:hello@binaryfroster.com" className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm break-all">
                  hello@binaryfroster.com
                </a>
              </InfoCard>

              <InfoCard icon="⏱️" title="Response Time">
                <p className="text-[var(--text-muted)] text-sm">Within 24 hours (Mon–Fri)</p>
              </InfoCard>

              <InfoCard icon="🌍" title="Coverage">
                <p className="text-[var(--text-muted)] text-sm">Serving UK &amp; US clients</p>
                <p className="text-[var(--text-muted)] text-xs mt-1 opacity-70">
                  UK: 9am–6pm GMT &nbsp;|&nbsp; US: 9am–5pm EST
                </p>
              </InfoCard>
            </div>

            {/* Book a call */}
            <div className="contact-elem">
              <GlassCard className="p-5">
                <p className="text-[var(--text-body)] text-sm mb-4 leading-relaxed">
                  Prefer to talk? Book a free 30-min discovery call — no obligation.
                </p>
                <LiquidButton variant="ghost" href="#" className="w-full">
                  📞 &nbsp;Book a Call
                </LiquidButton>
              </GlassCard>
            </div>

            {/* Socials */}
            <div className="contact-elem">
              <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-widest font-medium">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { name: "LinkedIn", initial: "in", color: "hover:border-[#0A66C2]/60 hover:text-[#0A66C2]" },
                  { name: "GitHub", initial: "GH", color: "hover:border-white/40 hover:text-white" },
                  { name: "Twitter/X", initial: "𝕏", color: "hover:border-white/40 hover:text-white" },
                  { name: "Instagram", initial: "IG", color: "hover:border-[#E1306C]/60 hover:text-[#E1306C]" },
                ].map((s) => (
                  <a
                    key={s.name}
                    href="#"
                    className={`w-10 h-10 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[var(--text-muted)] transition-all text-xs font-semibold font-mono ${s.color}`}
                    aria-label={s.name}
                  >
                    {s.initial}
                  </a>
                ))}
              </div>
            </div>
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
                      value={formData.company} onChange={v => updateField("company", v)}
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
                      {/* Gradient track */}
                      <div className="relative h-2 rounded-full bg-white/10">
                        <div
                          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all"
                          style={{ width: `${budgetPct}%` }}
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
                      {errors.desc && <p className="text-red-400 text-xs mt-1.5 ml-1">{errors.desc}</p>}
                    </div>

                    {/* How heard */}
                    <StyledSelect
                      id="heard" label="How did you hear about us?"
                      value={formData.heard} onChange={v => updateField("heard", v)}
                    >
                      <option value="" className="bg-[var(--bg-surface)]">Select…</option>
                      <option value="google" className="bg-[var(--bg-surface)]">Google Search</option>
                      <option value="linkedin" className="bg-[var(--bg-surface)]">LinkedIn</option>
                      <option value="twitter" className="bg-[var(--bg-surface)]">Twitter/X</option>
                      <option value="referral" className="bg-[var(--bg-surface)]">Referral</option>
                      <option value="freelance" className="bg-[var(--bg-surface)]">Freelance Platform</option>
                      <option value="other" className="bg-[var(--bg-surface)]">Other</option>
                    </StyledSelect>

                    <LiquidButton type="submit" isLoading={isSubmitting} className="w-full mt-1">
                      Send Message →
                    </LiquidButton>

                    <p className="text-center text-xs text-[var(--text-muted)]">
                      🔒 Your data is safe. We never share your information.
                    </p>
                  </form>
                </>
              )}
            </GlassCard>
          </div>
        </div>
      </div>

      {/* ── Live Chat Widget ────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-3">
        {chatOpen && (
          <div className="w-80 h-[420px] bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden animate-[slide-up_0.35s_cubic-bezier(0.16,1,0.3,1)]">
            {/* Header */}
            <div className="p-4 border-b border-[var(--glass-border)] flex items-center gap-3 flex-shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/40 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-200">
                BF
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-h)]">Binary Froster Support</p>
                <p className="text-xs text-green-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                  Online now
                </p>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="ml-auto w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-h)] transition-colors text-sm"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
              {chatMessages.map((msg, i) => (
                <div key={i} className={msg.from === "bot" ? "self-start max-w-[85%]" : "self-end max-w-[85%]"}>
                  <div className={
                    msg.from === "bot"
                      ? "bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl rounded-bl-none px-3.5 py-2.5"
                      : "bg-violet-500/20 border border-violet-500/30 rounded-2xl rounded-br-none px-3.5 py-2.5"
                  }>
                    <p className="text-sm text-[var(--text-body)] leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] text-[var(--text-muted)] mt-1 block">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div className="p-3 border-t border-[var(--glass-border)] flex gap-2 flex-shrink-0">
              <input
                type="text"
                placeholder="Type a message…"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleChatSend()}
                className="flex-grow bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-3.5 py-2.5 text-[var(--text-h)] text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
              <button
                onClick={handleChatSend}
                className="w-10 h-10 flex-shrink-0 bg-violet-500/20 border border-violet-500/30 rounded-xl text-violet-200 hover:bg-violet-500/30 active:scale-95 transition-all flex items-center justify-center"
                aria-label="Send message"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-[var(--glass-bg)] backdrop-blur-md border border-[var(--glass-border)] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:border-cyan-400/40 hover:shadow-[0_8px_32px_rgba(0,191,191,0.15)] transition-all group relative"
          aria-label={chatOpen ? "Close chat" : "Open chat"}
        >
          {chatOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[var(--text-muted)]" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-cyan-400">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
          )}
          {!chatOpen && (
            <>
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyan-400" />
            </>
          )}
        </button>
      </div>

    </div>
  );
}
