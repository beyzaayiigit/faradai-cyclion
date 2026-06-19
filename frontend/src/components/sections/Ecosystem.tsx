"use client";

import { motion } from "framer-motion";
import { ArrowRight, Recycle, Smartphone } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";

export function Ecosystem() {
  return (
    <Section id="ecosystem">
      <Container>
        <SectionHeader
          compact
          label="Entegrasyon"
          title="MobiQ × RE-LITH Ekosistemi"
          description="Yazılım ve temiz kimyanın kapalı döngü entegrasyonu."
          align="center"
        />

        <div className="relative mx-auto mt-6 flex max-w-4xl min-h-0 flex-col items-stretch gap-4 md:mt-8 md:flex-row md:items-center md:justify-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex-1 overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-transparent p-5 text-center transition-shadow md:p-6 hover:shadow-[0_0_40px_var(--shadow-primary)]"
          >
            <div
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
              aria-hidden
            />
            <Smartphone
              className="relative mx-auto text-primary transition-transform group-hover:scale-105"
              size={44}
              strokeWidth={1.5}
            />
            <h3 className="relative mt-3 font-display text-xl font-semibold md:mt-4 md:text-2xl">MobiQ</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-foreground-muted">
              Filo yönetimi, doluluk, rezervasyon ve gerçek zamanlı rota optimizasyonu.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10 mx-auto flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-primary/50 bg-surface shadow-[0_0_24px_var(--shadow-primary)] md:mx-0"
            aria-hidden
          >
            <ArrowRight className="hidden text-primary md:block" size={22} />
            <span className="font-mono text-lg text-primary md:hidden">↕</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group relative flex-1 overflow-hidden rounded-2xl border border-secondary/25 bg-gradient-to-br from-secondary/10 to-transparent p-5 text-center transition-shadow md:p-6 hover:shadow-[0_0_40px_var(--shadow-secondary)]"
          >
            <div
              className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/10 blur-2xl"
              aria-hidden
            />
            <Recycle
              className="relative mx-auto text-secondary-text transition-transform group-hover:scale-105"
              size={44}
              strokeWidth={1.5}
            />
            <h3 className="relative mt-3 font-display text-xl font-semibold md:mt-4 md:text-2xl">RE-LITH</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-foreground-muted">
              Atık bataryadan temiz kimya ile ikinci ömür ve grid destek malzemesi.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-5 max-w-lg shrink-0 rounded-full border border-glass-border bg-surface-container px-5 py-2 text-center text-xs text-foreground-subtle md:mt-6 md:text-sm"
        >
          Batarya toplama → geri dönüşüm → şarj ağı → filo operasyonu
        </motion.p>
      </Container>
    </Section>
  );
}
