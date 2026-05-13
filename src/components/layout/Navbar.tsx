"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import LiquidButton from "@/components/ui/LiquidButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem("bf-theme");
    const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    
    const initialTheme = theme || (systemPrefersLight ? "light" : "dark");
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialTheme === "light") {
      setIsDark(false);
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.add("light-theme");
    } else {
      setIsDark(true);
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.remove("light-theme");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    const themeStr = newIsDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", themeStr);
    
    if (newIsDark) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
    
    localStorage.setItem("bf-theme", themeStr);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={
          "fixed top-0 left-0 right-0 z-[1000] h-[80px] flex items-center px-6 lg:px-12 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] " +
          (scrolled ? "glass-nav shadow-2xl" : "bg-transparent")
        }
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0 min-w-0" aria-label="Binary Froster Home">
            <Image
              src="/assets/logo.webp"
              alt="Binary Froster Logo"
              width={48}
              height={48}
              priority
              sizes="48px"
              className="object-contain transition-transform duration-700 group-hover:scale-110 flex-shrink-0"
            />
            <span className="font-display font-bold text-lg lg:text-xl tracking-tight text-[var(--text-h)] truncate hidden sm:block">
              Binary<span className="text-gradient">Froster</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={
                  "relative text-[15px] font-medium transition-colors py-1 group " +
                  (isActive(link.path)
                    ? "text-[var(--text-h)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-h)]")
                }
              >
                {link.name}
                <span
                  className={
                    "absolute bottom-[-2px] h-[2px] bg-[var(--text-h)] rounded-none transition-all duration-300 ease-out " +
                    (isActive(link.path)
                      ? "left-0 right-0"
                      : "left-1/2 right-1/2 group-hover:left-0 group-hover:right-0")
                  }
                />
              </Link>
            ))}
          </div>

          {/* Actions — theme toggle is always visible, CTA hidden on mobile, burger only on mobile */}
          <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
            {/* Theme Toggle — Minimal Switch */}
            <label
              className="relative w-[52px] h-[28px] rounded-none bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-md cursor-pointer transition-colors duration-400 overflow-hidden flex-shrink-0"
              aria-label="Toggle dark/light mode"
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!isDark}
                onChange={toggleTheme}
              />
              <div className="absolute inset-0 bg-transparent peer-checked:bg-[var(--glass-bg-hover)] transition-colors duration-400" />
              <div className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-none bg-white/90 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[24px]">
                <Moon
                  size={12}
                  className={
                    "absolute transition-all duration-300 " +
                    (!isDark ? "opacity-0 rotate-90" : "opacity-100 rotate-0") +
                    " text-slate-800"
                  }
                  aria-hidden="true"
                />
                <Sun
                  size={12}
                  className={
                    "absolute transition-all duration-300 " +
                    (!isDark ? "opacity-100 rotate-0" : "opacity-0 -rotate-90") +
                    " text-amber-500"
                  }
                  aria-hidden="true"
                />
              </div>
            </label>

            <LiquidButton href="/contact" className="hidden lg:inline-flex" size="sm">
              Start a Project
            </LiquidButton>

      {/* Hamburger — z-index increased to stay above overlay */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[3000] flex-shrink-0"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span
                className={
                  "block w-6 h-[2px] bg-[var(--text-h)] transition-all duration-300 " +
                  (mobileOpen ? "rotate-45 translate-y-[5px]" : "")
                }
              />
              <span
                className={
                  "block w-6 h-[2px] bg-[var(--text-h)] transition-all duration-300 " +
                  (mobileOpen ? "opacity-0" : "")
                }
              />
              <span
                className={
                  "block w-6 h-[2px] bg-[var(--text-h)] transition-all duration-300 " +
                  (mobileOpen ? "-rotate-45 -translate-y-[5px]" : "")
                }
              />
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[2000] bg-[#0d0d0d]/95 backdrop-blur-[16px] flex flex-col items-center justify-center p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Watermark Logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden" aria-hidden="true">
          <span className="text-[30vw] font-display font-bold whitespace-nowrap rotate-[-15deg]">
            BINARY FROSTER
          </span>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center gap-6 mb-12 relative z-10">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={`text-5xl font-display font-extrabold tracking-tighter transition-all duration-500 ${
                isActive(link.path) ? "text-[#B8F564]" : "text-[var(--text-h)] hover:text-[#B8F564]"
              } ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${mobileOpen ? 100 + i * 40 : 0}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action & Socials */}
        <div className={`flex flex-col items-center gap-10 relative z-10 transition-all duration-500 delay-[400ms] ${mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <LiquidButton href="/contact" size="lg" onClick={() => setMobileOpen(false)}>
            Start a Project
          </LiquidButton>

          <div className="flex gap-6">
            {[
              { name: "LinkedIn", href: "https://in.linkedin.com/in/binary-froster", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
              { name: "Twitter", href: "https://x.com/Binaryfroster", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> },
              { name: "GitHub", href: "https://github.com/binaryfroster", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> },
            ].map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[#B8F564] transition-colors" aria-label={s.name}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
