"use client";

import React, { useRef } from "react";
import Link from "next/link";

interface LiquidButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function LiquidButton({
  children,
  href,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
  isLoading = false,
  disabled = false,
  size = "lg",
}: LiquidButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || isLoading) return;
    if (onClick) onClick(e);

    const btn = btnRef.current;
    if (!btn) return;

    // Ripple from click point
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const rippleSize = Math.max(rect.width, rect.height);

    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none z-[3]";
    ripple.style.width = rippleSize + "px";
    ripple.style.height = rippleSize + "px";
    ripple.style.left = (e.clientX - rect.left - rippleSize / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - rippleSize / 2) + "px";
    ripple.style.animation = "ripple-spread 0.6s cubic-bezier(0.0, 0.0, 0.2, 1) forwards";

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  const isPrimary = variant === "primary";

  const sizeClasses = {
    sm: "px-6 py-2.5 text-[14px]",
    md: "px-8 py-3.5 text-[16px]",
    lg: "px-10 py-[18px] text-[17px]",
  };

  const baseClasses =
    "btn-liquid relative inline-flex items-center justify-center rounded-full border-[2px] font-body font-bold tracking-[0.04em] overflow-hidden isolate transition-all duration-300 " +
    sizeClasses[size] + " " +
    (disabled || isLoading
      ? "opacity-50 cursor-not-allowed "
      : "cursor-pointer active:scale-[0.95] ") +
    (isPrimary
      ? "btn-primary bg-[var(--violet-600)] border-[var(--violet-400)] text-[var(--btn-primary-text)] shadow-[0_0_25px_rgba(139,92,246,0.4)] hover:border-[var(--cyan-400)] hover:bg-[var(--violet-500)] hover:shadow-[0_0_45px_rgba(34,211,238,0.6),0_0_15px_rgba(34,211,238,0.4)] hover:brightness-110 "
      : "btn-ghost border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-h)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:text-[var(--cyan-500)] hover:border-[var(--cyan-500)] hover:bg-[var(--glass-bg-hover)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] ") +
    className;

  const fillClasses =
    "absolute inset-0 rounded-full origin-[50%_110%] scale-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-[1]";

  const content = (
    <>
      <span
        className={
          isPrimary
            ? fillClasses + " bg-gradient-to-br from-violet-500 to-violet-700"
            : fillClasses + " bg-white/10"
        }
        style={{ clipPath: "ellipse(55% 60% at 50% 100%)" }}
      />
      <span
        className={
          "relative z-[2] transition-colors duration-400 delay-50 flex items-center gap-2 " +
          (isPrimary ? "group-hover:text-white" : "")
        }
      >
        {isLoading ? (
          <>
            <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
              <path d="M12 2a10 10 0 019.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          children
        )}
      </span>
    </>
  );

  if (href && !isLoading) {
    return (
      <Link
        href={href}
        className={baseClasses + " group"}
        onClick={handleClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses + " group"}
      onClick={handleClick as unknown as React.MouseEventHandler<HTMLButtonElement>}
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      disabled={disabled || isLoading}
    >
      {content}
    </button>
  );
}
