import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() — the universal class merge utility.
 * Required by Magic UI, Aceternity UI, Motion Primitives, Cult UI, and Animate UI.
 * Usage: cn("base-class", condition && "conditional-class", "always-added")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
