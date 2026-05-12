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
              src="/assets/logo.png"
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

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[1100] flex-shrink-0"
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

      {/* Mobile Drawer */}
      <div
        className={
          "fixed inset-0 z-[999] lg:hidden transition-opacity duration-300 " +
          (mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")
        }
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={
            "absolute top-0 right-0 w-[300px] h-full bg-[var(--bg-surface)]/97 backdrop-blur-2xl border-l border-[var(--glass-border)] p-8 pt-24 flex flex-col gap-5 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[-20px_0_60px_rgba(0,0,0,0.3)] " +
            (mobileOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={
                "text-lg font-display font-medium py-2 border-b border-[var(--glass-border)] transition-all duration-300 ease-out " +
                (isActive(link.path)
                  ? "text-[var(--text-h)]"
                  : "text-[var(--text-h)] hover:text-[var(--text-muted)]") +
                (mobileOpen ? " opacity-100 translate-x-0" : " opacity-0 translate-x-4")
              }
              style={{ transitionDelay: `${mobileOpen ? 150 + i * 50 : 0}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-auto">
            <LiquidButton href="/contact" className="w-full" size="sm">
              Start a Project
            </LiquidButton>
          </div>
        </div>
      </div>
    </>
  );
}
