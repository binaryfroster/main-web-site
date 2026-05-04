"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // TODO: Connect to email service (Mailchimp, Resend, etc.) before production launch
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <footer className="border-t border-[var(--glass-border)] bg-[var(--bg-surface)] py-16 relative overflow-hidden">
      {/* Ambient gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-[200px] right-[-100px] w-[500px] h-[500px] rounded-full bg-violet-800/8 blur-[80px]" />
        <div className="absolute -top-[150px] left-[20%] w-[400px] h-[400px] rounded-full bg-cyan-600/5 blur-[100px]" />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 max-w-[1320px] relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm text-text-muted">
          
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/assets/logo.png"
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
                { name: "Instagram", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>, href: "https://www.instagram.com/binaryfroster/" },
              ].map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  title={s.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono text-text-muted hover:text-white hover:bg-white/10 hover:scale-110 hover:rotate-[8deg] transition-all duration-200"
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
                  Client Portal <span className="text-[9px] uppercase tracking-widest bg-white/10 px-1.5 py-0.5 rounded text-white/80">Coming Soon</span>
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
              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-grow bg-[var(--bg-elevated)] border border-[var(--glass-border)] border-r-0 rounded-l-lg px-3 py-2 text-[var(--text-h)] text-sm focus:outline-none focus:border-[var(--cyan-500)] placeholder-[var(--text-hint)]"
                  required
                />
                <button type="submit" className="px-3 py-2 bg-violet-500/20 border border-violet-500/30 rounded-r-lg text-violet-200 hover:bg-violet-500/30 transition-colors text-sm">
                  →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--text-muted)] tracking-wider">
          <p>© {new Date().getFullYear()} Binary Froster. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
