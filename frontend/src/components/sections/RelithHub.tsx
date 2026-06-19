"use client";

import { motion } from "framer-motion";
import { ArrowRight, Recycle, Smartphone } from "lucide-react";
import { relithContent } from "@/data/relith-content";
import { Card } from "@/components/ui";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { cn } from "@/lib/cn";

export function RelithHub() {
  const { steps, highlights, bridge } = relithContent;

  return (
    <div className="py-6 md:py-8">
      <Container>
        <SectionHeader
          compact
          label={relithContent.label}
          title={relithContent.title}
          description={relithContent.subtitle}
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground-muted md:text-base"
        >
          {relithContent.intro}
        </motion.p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <Card className="relative h-full overflow-hidden border-secondary/25 p-5 transition-shadow hover:shadow-[0_0_36px_var(--shadow-secondary)]">
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-secondary/15 to-transparent opacity-80"
                  aria-hidden
                />
                <span className="relative font-mono text-[10px] uppercase tracking-widest text-secondary-text">
                  Adım {step.step}
                </span>
                <motion.span
                  className={cn(
                    "relative mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary-text",
                    step.animate && "group-hover:rotate-180",
                  )}
                  transition={
                    step.animate
                      ? { duration: 0.6, ease: "easeInOut" }
                      : undefined
                  }
                >
                  <step.icon size={24} strokeWidth={1.5} />
                </motion.span>
                <h3 className="relative mt-4 font-display text-base font-semibold md:text-lg">
                  {step.title}
                </h3>
                <p className="relative mt-0.5 text-xs font-medium text-secondary-text">
                  {step.subtitle}
                </p>
                <p className="relative mt-3 text-sm leading-relaxed text-foreground-muted">
                  {step.body}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4"
        >
          {highlights.map((h) => (
            <div
              key={h.title}
              className="rounded-xl border border-secondary/30 bg-gradient-to-br from-secondary/10 to-transparent px-5 py-4 text-center md:py-5"
            >
              <p className="font-display text-sm font-semibold text-secondary-text md:text-base">
                {h.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-foreground-muted md:text-sm">
                {h.body}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl border border-glass-border bg-surface-container/50 p-6 md:p-8"
        >
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
            <div className="flex flex-1 flex-col items-center rounded-xl border border-primary/25 bg-primary/10 p-4 text-center">
              <Smartphone className="text-primary" size={32} strokeWidth={1.5} />
              <span className="mt-2 font-display font-semibold">MobiQ</span>
            </div>
            <ArrowRight
              className="hidden shrink-0 text-primary md:block"
              size={24}
            />
            <span className="font-mono text-lg text-primary md:hidden">↕</span>
            <div className="flex flex-1 flex-col items-center rounded-xl border border-secondary/25 bg-secondary/10 p-4 text-center">
              <Recycle className="text-secondary-text" size={32} strokeWidth={1.5} />
              <span className="mt-2 font-display font-semibold">RE-LITH</span>
            </div>
          </div>
          <h3 className="mt-6 text-center font-display text-lg font-semibold md:text-xl">
            {bridge.title}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-foreground-muted">
            {bridge.body}
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
