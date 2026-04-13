"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
    if (theme === "light") {
      setTimeout(() => {
        setIsDark(false);
        document.documentElement.setAttribute("data-theme", "light");
      }, 0);
    } else {
      // Also check system preference on first visit
      if (!theme && window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTimeout(() => {
          setIsDark(false);
          document.documentElement.setAttribute("data-theme", "light");
        }, 0);
      }
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme ? "dark" : "light");
    localStorage.setItem("bf-theme", newTheme ? "dark" : "light");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Products", path: "/products/diet-planner" },
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
          "fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center px-6 lg:px-12 transition-all duration-350 ease-in-out " +
          (scrolled ? "glass-nav shadow-2xl" : "bg-transparent")
        }
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Binary Froster Home">
            <img
              src="/assets/logo.png"
              alt="Binary Froster Logo"
              className="w-10 h-10 object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <span className="font-display font-bold text-lg tracking-wide text-[var(--text-h)]">
              Binary Froster
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={
                  "relative text-[14px] font-medium transition-colors py-1 group " +
                  (isActive(link.path)
                    ? "text-[var(--text-h)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-h)]")
                }
              >
                {link.name}
                <span
                  className={
                    "absolute bottom-[-2px] h-[1.5px] bg-[var(--cyan-500)] rounded-full transition-all duration-250 ease-out " +
                    (isActive(link.path)
                      ? "left-0 right-0"
                      : "left-1/2 right-1/2 group-hover:left-0 group-hover:right-0")
                  }
                />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle — Liquid Glass Switch */}
            <label
              className="relative w-[52px] h-[28px] rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-inner cursor-pointer transition-colors duration-400 overflow-hidden"
              aria-label="Toggle dark/light mode"
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={!isDark}
                onChange={toggleTheme}
              />
              <div className="absolute inset-0 bg-transparent peer-checked:bg-[rgba(83,74,183,0.18)] transition-colors duration-400" />
              <div className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] peer-checked:translate-x-[24px]">
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

            <LiquidButton href="/contact" className="hidden lg:inline-flex">
              Start a Project
            </LiquidButton>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-[1100]"
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
            "absolute top-0 right-0 w-[300px] h-full bg-[var(--bg-surface)]/95 backdrop-blur-xl border-l border-[var(--glass-border)] p-8 pt-24 flex flex-col gap-6 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] " +
            (mobileOpen ? "translate-x-0" : "translate-x-full")
          }
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className={
                "text-lg font-display font-medium transition-colors py-2 border-b border-[var(--glass-border)] " +
                (isActive(link.path)
                  ? "text-[var(--cyan-500)]"
                  : "text-[var(--text-h)] hover:text-[var(--cyan-500)]")
              }
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-auto">
            <LiquidButton href="/contact" className="w-full">
              Start a Project
            </LiquidButton>
          </div>
        </div>
      </div>
    </>
  );
}
