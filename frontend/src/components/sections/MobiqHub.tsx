"use client";

import { motion } from "framer-motion";
import {
  Battery,
  Cpu,
  Leaf,
  Recycle,
  Sparkles,
  Zap,
} from "lucide-react";
import mobiqData from "@/data/mobiq-content.json";
import type { MobiqAccent, MobiqSection } from "@/types";
import { Card } from "@/components/ui";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { cn } from "@/lib/cn";

const data = mobiqData as {
  introTitle: string;
  introSubtitle: string;
  sections: MobiqSection[];
};

const accentStyles: Record<
  MobiqAccent,
  { border: string; glow: string; icon: string; gradient: string }
> = {
  primary: {
    border: "border-primary/30",
    glow: "from-primary/15",
    icon: "text-primary bg-primary/15",
    gradient: "from-primary/20 to-transparent",
  },
  secondary: {
    border: "border-secondary/30",
    glow: "from-secondary/15",
    icon: "text-secondary-text bg-secondary/15",
    gradient: "from-secondary/15 to-transparent",
  },
  glow: {
    border: "border-primary-glow/30",
    glow: "from-primary-glow/15",
    icon: "text-primary-glow bg-primary/15",
    gradient: "from-primary-glow/20 to-transparent",
  },
  muted: {
    border: "border-glass-border",
    glow: "from-surface-container",
    icon: "text-foreground-muted bg-surface-container",
    gradient: "from-surface-container to-transparent",
  },
  vision: {
    border: "border-secondary/40",
    glow: "from-secondary/20",
    icon: "text-secondary-text bg-secondary/10",
    gradient: "from-secondary/20 via-primary/10 to-transparent",
  },
};

const sectionIcons = [Zap, Battery, Cpu, Sparkles, Leaf, Recycle];

function ContentCard({
  title,
  body,
  bullets,
  accent,
  index,
}: {
  title: string;
  body: string;
  bullets: string[];
  accent: MobiqAccent;
  index: number;
}) {
  const style = accentStyles[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06 }}
      className="group h-full"
    >
      <Card
        className={cn(
          "relative h-full overflow-hidden border p-5 transition-shadow duration-300 md:p-6",
          style.border,
          "hover:shadow-[0_0_32px_var(--shadow-primary)]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b opacity-70 transition-opacity group-hover:opacity-100",
            style.gradient,
          )}
          aria-hidden
        />
        <h4 className="relative font-display text-lg font-semibold md:text-xl">
          {title}
        </h4>
        <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">
          {body}
        </p>
        {bullets.length > 0 && (
          <ul className="relative mt-4 space-y-2 border-t border-glass-border pt-4">
            {bullets.map((b, bi) => (
              <li
                key={`${title}-${bi}`}
                className="flex gap-2 text-xs leading-relaxed text-foreground-muted md:text-sm"
              >
                <span
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    accent === "secondary" || accent === "vision"
                      ? "bg-secondary"
                      : "bg-primary",
                  )}
                  aria-hidden
                />
                {b}
              </li>
            ))}
          </ul>
        )}
      </Card>
    </motion.div>
  );
}

export function MobiqHub() {
  return (
    <div className="py-6 md:py-8">
      <Container>
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary md:text-[11px]">
            {data.introTitle}
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-foreground to-primary-glow bg-clip-text text-transparent">
              {data.introSubtitle}
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground-muted md:text-base">
            Elektrikli mobilite ekosisteminin temellerinden akıllı şarj
            istasyonlarına — MobiQ Energy Hub ile enerjinin yolculuğu.
          </p>
        </motion.header>

        <div className="space-y-12 md:space-y-16">
          {data.sections.map((section, si) => {
            const Icon = sectionIcons[si] ?? Zap;
            const style = accentStyles[section.accent];
            return (
              <section key={section.id} aria-labelledby={`mobiq-${section.id}`}>
                <div className="mb-5 flex items-start gap-3 md:mb-6">
                  <span
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      style.icon,
                    )}
                  >
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <SectionHeader
                    compact
                    label={section.label}
                    title={section.title}
                    description={section.description}
                    className="flex-1"
                  />
                </div>
                <div
                  className={cn(
                    "grid gap-4",
                    section.cards.length === 1
                      ? "md:grid-cols-1"
                      : section.cards.length === 2
                        ? "md:grid-cols-2"
                        : "md:grid-cols-2 lg:grid-cols-3",
                  )}
                >
                  {section.cards.map((card, ci) => (
                    <ContentCard
                      key={card.title}
                      {...card}
                      accent={section.accent}
                      index={ci}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
