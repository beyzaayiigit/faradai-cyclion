"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout/Container";
import { heroContent } from "@/data/hero-content";
import {
  discoverPlatform,
  scrollToPlatformTab,
  scrollToSection,
} from "@/hooks/useActiveSection";

export function Hero() {
  const { stats, ctaPrimary, ctaSecondary, ctaTertiary } = heroContent;

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] flex-col overflow-x-hidden pt-[var(--header-height)]"
    >
      <motion.div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(26,68,148,0.22),transparent_42%),radial-gradient(ellipse_at_80%_20%,rgba(20,184,166,0.16),transparent_45%),radial-gradient(ellipse_at_50%_90%,rgba(34,197,94,0.14),transparent_50%)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-primary/22 blur-3xl"
        animate={{ scale: [1, 1.1, 1], opacity: [0.45, 0.65, 0.45] }}
        transition={{ duration: 8, repeat: Infinity }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-24 bottom-1/4 h-72 w-72 rounded-full bg-tertiary/20 blur-3xl"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-secondary/12 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.4, 0.25] }}
        transition={{ duration: 12, repeat: Infinity }}
        aria-hidden
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
        <Container className="py-3 md:py-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary-text">
              {heroContent.badge}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 max-w-4xl font-display text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:mt-5 md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-br from-primary via-primary-glow to-tertiary bg-clip-text text-transparent">
              {heroContent.h1Line1}
            </span>
            <br />
            <span className="text-foreground">{heroContent.h1Line2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-4 max-w-2xl text-base italic leading-relaxed text-primary md:text-lg"
          >
            {heroContent.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-3 max-w-2xl text-base leading-relaxed text-foreground-muted md:text-lg"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap gap-3 md:mt-8 md:gap-4"
          >
            <Button
              type="button"
              onClick={() => scrollToPlatformTab(ctaPrimary.tab)}
            >
              {ctaPrimary.label}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => scrollToPlatformTab(ctaSecondary.tab)}
            >
              {ctaSecondary.label}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => scrollToSection(ctaTertiary.section)}
            >
              {ctaTertiary.label}
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-5 hidden gap-3 sm:grid sm:grid-cols-3 md:mt-6"
          >
            {stats.map((s) => (
              <li
                key={s.label}
                className="glass-panel flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <s.icon size={20} strokeWidth={1.5} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                    {s.label}
                  </p>
                  <p className="font-display text-sm font-semibold">{s.value}</p>
                </div>
              </li>
            ))}
          </motion.ul>
        </Container>
      </div>

      <button
        type="button"
        onClick={() => discoverPlatform()}
        className="relative z-10 mx-auto mb-4 flex shrink-0 flex-col items-center gap-0.5 text-foreground-muted transition-colors hover:text-primary md:mb-5"
        aria-label="Platformu keşfet — MobiQ sekmesine git"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Keşfet</span>
        <ArrowDown className="animate-bounce" size={20} aria-hidden />
      </button>
    </section>
  );
}
