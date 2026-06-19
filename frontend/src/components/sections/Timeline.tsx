"use client";

import { motion } from "framer-motion";
import { ArrowRight, BatteryCharging, Recycle } from "lucide-react";
import milestones from "@/data/milestones.json";
import type { Milestone } from "@/types";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { cn } from "@/lib/cn";

const data = milestones as Milestone[];

const phaseStyles = {
  current: {
    card: "border-secondary/40 bg-secondary/5",
    badge: "bg-secondary/15 text-secondary-text",
    label: "Güncel",
    dot: "bg-secondary shadow-[0_0_16px_var(--shadow-secondary)]",
  },
  future: {
    card: "border-primary/30 bg-primary/5",
    badge: "bg-primary/15 text-primary-glow",
    label: "Planlanan",
    dot: "border-2 border-primary bg-background",
  },
  vision: {
    card: "border-primary/20 bg-primary/5",
    badge: "bg-primary/10 text-primary",
    label: "Vizyon",
    dot: "border border-primary/40 bg-primary/20",
  },
} as const;

export function Timeline() {
  return (
    <Section id="milestones" tone="muted">
      <Container>
        <SectionHeader
          compact
          label="Süreç"
          title="Süreç Haritası"
          description="Atık bataryadan akıllı şarja, yeşil geri kazanımdan ulusal enerji omurgasına — MobiQ × RE-LITH büyüme yolculuğu."
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2 rounded-full border border-glass-border bg-surface-container px-4 py-2 md:mt-6"
        >
          <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
            <BatteryCharging size={14} className="text-primary" />
            MobiQ
          </span>
          <ArrowRight size={14} className="text-primary/50" aria-hidden />
          <span className="flex items-center gap-1.5 text-xs text-foreground-muted">
            <Recycle size={14} className="text-secondary-text" />
            RE-LITH
          </span>
          <ArrowRight size={14} className="text-primary/50" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
            Kapalı döngü
          </span>
        </motion.div>

        <div className="relative mt-8 md:mt-10">
          <div
            className="absolute top-8 bottom-8 left-4 hidden w-px bg-gradient-to-b from-secondary via-primary to-primary/30 md:left-1/2 md:block md:-translate-x-px"
            aria-hidden
          />

          <ol className="relative space-y-4 md:space-y-6">
            {data.map((m, i) => {
              const style = phaseStyles[m.phase];
              const alignRight = i % 2 === 1;

              return (
                <motion.li
                  key={m.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06 }}
                  className={cn(
                    "relative md:grid md:grid-cols-2 md:gap-8",
                    alignRight && "md:[&>article]:md:col-start-2",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-6 left-4 z-10 hidden h-3 w-3 rounded-full md:left-1/2 md:block md:-translate-x-1/2",
                      style.dot,
                    )}
                    aria-hidden
                  />

                  <article
                    className={cn(
                      "glass-panel ml-0 rounded-xl border p-4 md:ml-0 md:p-5",
                      "md:max-w-lg",
                      alignRight ? "md:justify-self-end" : "md:justify-self-start",
                      style.card,
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-widest",
                          style.badge,
                        )}
                      >
                        {style.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                        {m.period}
                      </span>
                      {m.focus && (
                        <span className="rounded-full border border-glass-border bg-surface-container px-2 py-0.5 text-[10px] text-foreground-subtle">
                          {m.focus}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 font-display text-base font-semibold md:text-lg">
                      {m.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted md:text-sm">
                      {m.description}
                    </p>

                    {m.items && m.items.length > 0 && (
                      <ul className="mt-4 space-y-1.5 border-t border-glass-border pt-3">
                        {m.items.map((item, bi) => (
                          <li
                            key={`${m.id}-${bi}`}
                            className="flex gap-2 text-xs leading-relaxed text-foreground-muted md:text-sm"
                          >
                            <span
                              className={cn(
                                "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                                m.phase === "current"
                                  ? "bg-secondary"
                                  : "bg-primary",
                              )}
                              aria-hidden
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
