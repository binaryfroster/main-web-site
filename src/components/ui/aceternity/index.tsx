"use client";

import { motion } from "framer-motion";
import { useRef, ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

// ─── Background Beams ─────────────────────────────────────────────────────────
export function BackgroundBeams({ className }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
    "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
  ];

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <svg
        className="pointer-events-none absolute z-0 h-full w-full"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((path, index) => (
          <motion.path
            key={`path-` + index}
            d={path}
            stroke={`url(#linearGradient-${index})`}
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        ))}
        <defs>
          {paths.map((_, index) => (
            <motion.linearGradient
              id={`linearGradient-${index}`}
              key={`gradient-${index}`}
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{ x1: ["0%", "100%"], x2: ["0%", "95%"], y1: ["0%", "100%"], y2: ["0%", "90%"] }}
              transition={{ duration: 10 + index * 1.7, repeat: Infinity, repeatType: "loop" }}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="32.5%" stopColor="#6344F5" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}

// ─── Spotlight ────────────────────────────────────────────────────────────────
interface SpotlightProps {
  className?: string;
  fill?: string;
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] h-[169%] w-[138%] opacity-0 lg:w-[84%]",
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501" transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill} fillOpacity="0.21" />
      </g>
      <defs>
        <filter id="filter" x="0.860352" y="0.838989" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}

// ─── 3D Card ──────────────────────────────────────────────────────────────────
interface CardContainerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

export function CardContainer({ children, className, containerClassName }: CardContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setRotateX(-y * 15);
    setRotateY(x * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      className={cn("flex items-center justify-center", containerClassName)}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={containerRef}
        className={cn("relative flex items-center justify-center", className)}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("[transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]", className)}>
      {children}
    </div>
  );
}

export function CardItem({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: unknown;
}) {
  return (
    <Tag
      className={cn("w-fit transition duration-200 ease-linear", className)}
      style={{
        transform: `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── Typewriter Effect ────────────────────────────────────────────────────────
interface TypewriterEffectProps {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}

export function TypewriterEffect({ words, className, cursorClassName }: TypewriterEffectProps) {
  const wordsArray = words.map((w) => ({ ...w, text: w.text.split("") }));

  return (
    <div className={cn("flex space-x-1 text-base font-bold sm:text-xl md:text-3xl lg:text-5xl", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{ width: "0%" }}
        whileInView={{ width: "fit-content" }}
        transition={{ duration: 2, ease: "linear", delay: 1 }}
      >
        <div className="flex whitespace-nowrap" style={{ whiteSpace: "nowrap" }}>
          {wordsArray.map((word, wIdx) => (
            <span key={`word-${wIdx}`} className="inline-block">
              {word.text.map((char, cIdx) => (
                <span key={`${wIdx}-${cIdx}`} className={cn("text-[var(--text-h)]", word.className)}>
                  {char}
                </span>
              ))}
              {wIdx < wordsArray.length - 1 && <span>&nbsp;&nbsp;</span>}
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("block h-4 w-[4px] rounded-sm bg-blue-500 sm:h-6 xl:h-12", cursorClassName)}
      />
    </div>
  );
}

// ─── Hover Border Gradient ────────────────────────────────────────────────────
interface HoverBorderGradientProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  containerClassName?: string;
  from?: string;
  to?: string;
  duration?: number;
  children: ReactNode;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  from = "#AE48FF",
  to = "#18CCFC",
  duration = 1,
  ...props
}: HoverBorderGradientProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex h-min w-fit flex-col flex-nowrap items-center justify-center gap-10 overflow-hidden rounded-full border bg-black/20 p-px decoration-clone",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-fit rounded-[inherit] bg-black px-4 py-2 text-white",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className="absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          background: hovered
            ? `conic-gradient(from 0deg, ${from}, ${to}, ${from})`
            : `conic-gradient(from 0deg, transparent, transparent)`,
        }}
        animate={{ rotate: hovered ? 360 : 0 }}
        transition={{ duration, repeat: hovered ? Infinity : 0, ease: "linear" }}
      />
      <div className="absolute inset-[2px] z-[1] rounded-[inherit] bg-black" />
    </Tag>
  );
}
