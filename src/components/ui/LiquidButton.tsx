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

    ripple.className = "absolute rounded-none bg-white/10 pointer-events-none z-[3]";
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
    sm: "px-6 py-2.5 text-[13px]",
    md: "px-8 py-3.5 text-sm",
    lg: "px-10 py-4 text-sm",
  };

  const baseClasses =
    "relative inline-flex items-center justify-center border font-body font-bold tracking-[0.04em] overflow-hidden transition-all duration-300 rounded-none " +
    sizeClasses[size] + " " +
    (disabled || isLoading
      ? "opacity-50 cursor-not-allowed "
      : "cursor-pointer active:scale-[0.98] ") +
    (isPrimary
      ? "bg-[var(--text-h)] border-[var(--text-h)] text-[var(--bg-base)] hover:bg-transparent hover:text-[var(--text-h)] "
      : "border-[var(--glass-border)] bg-transparent text-[var(--text-h)] hover:border-[var(--glass-border-h)] hover:bg-[var(--glass-bg-hover)] ") +
    className;

  const content = (
    <>
      <span
        className={
          "relative z-[2] transition-colors duration-300 flex items-center gap-2"
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
