"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState<string | null>(null);
  const [subLoading, setSubLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    setSubError(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubError(data.error || "Failed to subscribe. Try again.");
      } else {
        setSubscribed(true);
      }
    } catch {
      setSubError("Network error. Please try again.");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-surface)] py-20 relative overflow-hidden noise-overlay">
      {/* Ambient gradient - removed for minimalist design */}
      
      <div className="container mx-auto px-6 lg:px-12 max-w-[1320px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 text-sm text-text-muted">
          
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/logo.webp"
                alt="Binary Froster Logo"
                width={40}
                height={40}
                sizes="40px"
                className="object-contain"
              />
              <span className="font-display font-bold text-lg text-[var(--text-h)]">Binary Froster</span>
            </div>
            <p className="leading-relaxed mb-6 text-sm">
              Precision-Built Technology for Growing Businesses.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { name: "LinkedIn", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, href: "https://in.linkedin.com/in/binary-froster" },
                { name: "Twitter", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, href: "https://x.com/Binaryfroster" },
                { name: "GitHub", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, href: "https://github.com/binaryfroster" },
                { name: "Instagram", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, href: "https://www.instagram.com/binaryfroster/" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-none bg-[var(--glass-bg)] border border-[var(--glass-border)] flex items-center justify-center text-[10px] font-mono text-[var(--text-muted)] hover:text-[var(--text-h)] hover:bg-[var(--glass-bg-hover)] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          
          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-display text-[var(--text-h)] font-semibold mb-4 uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-2.5">
              {["Home", "Services", "Portfolio", "About", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <Link href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="hover:text-cyan-400 transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <span className="text-sm text-[var(--text-muted)] cursor-not-allowed opacity-70 flex items-center gap-2">
                  Client Portal <span className="text-[9px] uppercase tracking-widest bg-[var(--glass-bg)] px-1.5 py-0.5 rounded-none text-[var(--text-muted)] border border-[var(--glass-border)]">Coming Soon</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div>
            <h4 className="font-display text-[var(--text-h)] font-semibold mb-4 uppercase tracking-widest text-xs">Services</h4>
            <ul className="space-y-2.5">
              {["AI & Automation", "Web Development", "E-commerce", "Management Systems", "Custom Integrations"].map((svc) => (
                <li key={svc}>
                  <Link href="/services" className="hover:text-cyan-400 transition-colors text-sm">{svc}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact + Newsletter */}
          <div>
            <h4 className="font-display text-[var(--text-h)] font-semibold mb-4 uppercase tracking-widest text-xs">Contact</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm">
                <span className="text-base">📧</span>
                <a href="mailto:binaryfroster@gmail.com" className="hover:text-cyan-400 transition-colors">binaryfroster@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-base">⏱️</span>
                Mon–Fri, 9am–6pm UK/IST
              </li>
              <li className="flex items-center gap-2 text-sm">
                <span className="text-base">🌍</span>
                Serving clients worldwide
              </li>
            </ul>

            {/* Newsletter */}
            <p className="text-xs text-[var(--text-muted)] mb-2">Get tech tips in your inbox</p>
            {subscribed ? (
              <div className="flex items-center gap-2 text-cyan-400 text-sm">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                Subscribed!
              </div>
            ) : (
              <>
                <form onSubmit={handleSubscribe} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="flex-grow bg-[var(--bg-elevated)] border border-[var(--glass-border)] border-r-0 rounded-none px-3 py-2 text-[var(--text-h)] text-sm focus:outline-none focus:border-[var(--text-h)] placeholder-[var(--text-hint)]"
                    required
                    disabled={subLoading}
                  />
                  <button
                    type="submit"
                    disabled={subLoading}
                    className="px-3 py-2 bg-[var(--badge-cat-bg)] border border-[var(--badge-cat-border)] rounded-none text-[var(--badge-cat-text)] hover:bg-[var(--glass-bg-hover)] transition-colors text-sm disabled:opacity-60"
                  >
                    {subLoading ? "…" : "→"}
                  </button>
                </form>
                {subError && (
                  <p className="text-red-400 text-[11px] mt-1">{subError}</p>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-20 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)] tracking-wider">
          <p className="font-mono">© 2026 Binary Froster. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-[var(--text-h)] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[var(--text-h)] transition-colors">Terms of Service</Link>
            <Link href="/cookie-policy" className="hover:text-[var(--text-h)] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
