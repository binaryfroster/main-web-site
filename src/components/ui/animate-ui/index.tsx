"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useId, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ─── Animated Tabs ────────────────────────────────────────────────────────────
interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export function AnimatedTabs({ tabs, className, tabClassName, contentClassName }: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? "");
  const id = useId();

  return (
    <div className={cn("w-full", className)}>
      {/* Tab list */}
      <div className="relative flex gap-1 rounded-xl bg-white/5 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "relative flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none",
              activeTab === tab.id ? "text-white" : "text-white/50 hover:text-white/80",
              tabClassName
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId={`${id}-tab-indicator`}
                className="absolute inset-0 rounded-lg bg-white/10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className={cn("mt-4", contentClassName)}>
        <AnimatePresence mode="wait">
          {tabs.map(
            (tab) =>
              tab.id === activeTab && (
                <motion.div
                  key={tab.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {tab.content}
                </motion.div>
              )
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Animated Tooltip ─────────────────────────────────────────────────────────
interface AnimatedTooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  side?: "top" | "bottom" | "left" | "right";
}

export function AnimatedTooltip({ children, content, className, side = "top" }: AnimatedTooltipProps) {
  const [visible, setVisible] = useState(false);

  const sideStyles = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const initialY = { top: 6, bottom: -6, left: 0, right: 0 };
  const initialX = { left: 6, right: -6, top: 0, bottom: 0 };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            className={cn(
              "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-white/10 bg-black/90 px-3 py-1.5 text-xs text-white shadow-xl backdrop-blur-sm",
              sideStyles[side],
              className
            )}
            initial={{ opacity: 0, y: initialY[side], x: initialX[side], scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: initialY[side], x: initialX[side], scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Animated Progress ────────────────────────────────────────────────────────
interface AnimatedProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  label?: string;
  showValue?: boolean;
}

export function AnimatedProgress({
  value,
  max = 100,
  className,
  barClassName,
  label,
  showValue = false,
}: AnimatedProgressProps) {
  const pct = Math.min(100, (value / max) * 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="mb-1 flex justify-between text-xs text-white/70">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={cn("h-full rounded-full bg-gradient-to-r from-[#6344F5] to-[#18CCFC]", barClassName)}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Animated Input ───────────────────────────────────────────────────────────
interface AnimatedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function AnimatedInput({ label, error, containerClassName, className, ...props }: AnimatedInputProps) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(props.defaultValue ?? props.value));
  const id = useId();

  return (
    <div className={cn("relative w-full", containerClassName)}>
      <input
        id={id}
        className={cn(
          "peer w-full rounded-xl border bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder-transparent",
          focused ? "border-[#6344F5]" : "border-white/10",
          error ? "border-red-500" : "",
          className
        )}
        placeholder={label ?? " "}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          setHasValue(Boolean(e.target.value));
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      />
      {label && (
        <motion.label
          htmlFor={id}
          animate={focused || hasValue ? { y: -24, scale: 0.8, x: 0 } : { y: 0, scale: 1, x: 4 }}
          className="pointer-events-none absolute left-4 top-3.5 origin-left text-sm text-white/50 transition-colors peer-focus:text-[#6344F5]"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          {label}
        </motion.label>
      )}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-red-400"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Counting Number ──────────────────────────────────────────────────────────
// Re-export from magic but with animate-ui style
export { NumberTicker as CountingNumber } from "../magic/index";

// ─── Checkbox Reveal ──────────────────────────────────────────────────────────
interface CheckboxRevealProps {
  label: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export function CheckboxReveal({ label, defaultChecked = false, onChange, className }: CheckboxRevealProps) {
  const [checked, setChecked] = useState(defaultChecked);
  const id = useId();

  const handleChange = () => {
    const next = !checked;
    setChecked(next);
    onChange?.(next);
  };

  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-center gap-3", className)}>
      <button
        id={id}
        role="checkbox"
        aria-checked={checked}
        onClick={handleChange}
        className="relative h-5 w-5 rounded border border-white/20 bg-white/5 focus:outline-none"
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute inset-0 h-full w-full text-[#6344F5]"
              viewBox="0 0 16 16"
              fill="none"
            >
              <rect width="16" height="16" rx="3" fill="currentColor" fillOpacity="0.2" />
              <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
      <span className="text-sm text-white/80">{label}</span>
    </label>
  );
}
