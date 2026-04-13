"use client";

import React, { useRef, useState } from "react";
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
}: LiquidButtonProps) {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [showSuccess] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled || isLoading) return;
    if (onClick) onClick(e);

    const btn = btnRef.current;
    if (!btn) return;

    // Ripple from click point
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);

    ripple.className = "absolute rounded-full bg-white/30 pointer-events-none z-[3]";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    ripple.style.animation = "ripple-spread 0.6s cubic-bezier(0.0, 0.0, 0.2, 1) forwards";

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  const isPrimary = variant === "primary";

  const baseClasses =
    "btn-liquid relative inline-flex items-center justify-center px-8 py-3.5 rounded-full border-[1.5px] font-body text-[15px] font-medium tracking-[0.02em] overflow-hidden isolate transition-all duration-300 " +
    (disabled || isLoading
      ? "opacity-50 cursor-not-allowed "
      : "cursor-pointer active:scale-[0.97] ") +
    (isPrimary
      ? "btn-primary border-violet-500 text-violet-300 hover:border-violet-400 hover:shadow-[0_0_30px_rgba(127,119,221,0.5),0_0_8px_rgba(127,119,221,0.2)]"
      : "btn-ghost border-[var(--glass-border)] text-[var(--text-body)] hover:text-[var(--text-h)]") +
    " " +
    className;

  const fillClasses =
    "absolute inset-0 rounded-full origin-[50%_110%] scale-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-[1]";

  const content = (
    <>
      <span
        className={
          isPrimary
            ? fillClasses + " bg-gradient-to-br from-violet-600 to-violet-500"
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
            {showSuccess ? (
              <svg className="w-5 h-5 animate-[fade-in_0.3s_ease]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
                <path d="M12 2a10 10 0 019.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
            <span>{showSuccess ? "Done!" : "Sending..."}</span>
          </>
        ) : (
          children
        )}
      </span>
      <style dangerouslySetInnerHTML={{ __html: `
        .btn-liquid:hover > span:first-child {
          transform: scaleY(2.2);
          clip-path: ellipse(80% 80% at 50% 100%) !important;
        }
        @keyframes ripple-spread {
          to { transform: scale(4); opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}} />
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
