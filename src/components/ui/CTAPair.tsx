"use client";

import React from "react";
import Link from "next/link";
import { Magnetic } from "@/components/ui/premium";

interface CTAPairProps {
  primary: [string, string]; // [text, href]
  secondary: [string, string]; // [text, href]
  className?: string;
}

export default function CTAPair({ primary, secondary, className = "" }: CTAPairProps) {
  const [pText, pHref] = primary;
  const [sText, sHref] = secondary;

  return (
    <div className={`flex flex-wrap gap-4 items-center justify-center ${className}`}>
      {/* Primary button: reversed solid #0d0d0d text on #B8F564 background for contrast > 12:1 */}
      <Magnetic intensity={0.3} className="hero-btn">
        <Link
          href={pHref}
          className="inline-flex px-8 py-3.5 bg-[#B8F564] text-[#0d0d0d] text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.02] no-underline"
        >
          {pText}
        </Link>
      </Magnetic>

      {/* Secondary button: transparent border style */}
      <Magnetic intensity={0.3} className="hero-btn">
        <Link
          href={sHref}
          className="inline-flex px-8 py-3.5 bg-transparent text-[var(--text-h)] text-sm font-bold tracking-wide transition-all duration-300 hover:underline no-underline"
        >
          {sText}
        </Link>
      </Magnetic>
    </div>
  );
}
