"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Viewport bölümlerinde daha sıkı dikey boşluk */
  compact?: boolean;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
  className,
  compact = false,
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
      className={cn("shrink-0", centered && "text-center", className)}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-primary md:px-4 md:py-1.5 md:text-[11px]",
          centered && "mx-auto",
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_8px_var(--secondary)]" />
        {label}
      </span>
      <h2
        className={cn(
          "font-display font-bold tracking-tight",
          compact
            ? "mt-3 text-2xl md:text-3xl lg:text-4xl"
            : "mt-5 text-3xl md:text-4xl lg:text-5xl",
          centered && "mx-auto max-w-3xl",
        )}
      >
        <span className="bg-gradient-to-r from-primary via-primary-glow to-tertiary bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-foreground-muted",
            compact
              ? "mt-2 text-sm leading-relaxed md:text-base"
              : "mt-4 text-base leading-relaxed md:text-lg",
            centered && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
      <div
        className={cn(
          "h-px bg-gradient-to-r from-primary via-secondary to-transparent",
          compact ? "mt-4 w-16" : "mt-8 w-24",
          centered && "mx-auto",
        )}
        aria-hidden
      />
    </motion.header>
  );
}
