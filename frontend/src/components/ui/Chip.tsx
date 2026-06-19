"use client";

import { cn } from "@/lib/cn";

interface ChipProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  variant?: "lavender" | "green";
}

export function Chip({
  label,
  active,
  onClick,
  variant = "lavender",
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        active
          ? variant === "green"
            ? "border-secondary bg-secondary text-white"
            : "border-primary bg-primary text-white"
          : "border-glass-border bg-transparent text-foreground hover:border-primary/50",
      )}
    >
      {label}
    </button>
  );
}
