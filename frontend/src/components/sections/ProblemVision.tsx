"use client";

import { motion } from "framer-motion";
import { BatteryWarning, Truck, Zap } from "lucide-react";
import { Card } from "@/components/ui";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";

const items = [
  {
    icon: BatteryWarning,
    title: "Derin Batarya Krizi",
    text: "Elektrikli filo büyüdükçe atık batarya hacmi katlanarak artıyor; mevcut geri dönüşüm kapasitesi yetersiz kalıyor.",
    accent: "from-primary/20 to-transparent",
  },
  {
    icon: Truck,
    title: "Lojistik Şarj Çıkmazı",
    text: "Ağır ticari araçlar için uygun Mega DC altyapısı sınırlı; filo yöneticileri doluluk ve bekleme süresini öngöremiyor.",
    accent: "from-secondary/15 to-transparent",
  },
  {
    icon: Zap,
    title: "Vizyon: Kapalı Döngü",
    text: "MobiQ yazılımı ve RE-LITH temiz kimyası ile batarya → şarj → geri dönüşüm döngüsünü tek ekosistemde birleştiriyoruz.",
    accent: "from-primary-glow/20 to-transparent",
  },
];

export function ProblemVision() {
  return (
    <Section id="problem" tone="accent">
      <Container>
        <SectionHeader
          compact
          label="Bağlam"
          title="Problem & Vizyon"
          description="Enerji dönüşümünde hem çevresel hem operasyonel kırılma noktalarını hedefliyoruz."
        />

        <div className="mt-6 grid min-h-0 gap-4 md:mt-8 md:grid-cols-3 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <Card className="relative h-full overflow-hidden p-4 md:p-5">
                <div
                  className={cn(
                    "pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b opacity-60 transition-opacity group-hover:opacity-100",
                    item.accent,
                  )}
                  aria-hidden
                />
                <item.icon
                  className="relative text-primary transition-transform group-hover:scale-110"
                  size={28}
                  strokeWidth={1.5}
                />
                <h3 className="relative mt-3 font-display text-lg font-semibold md:text-xl">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-foreground-muted">
                  {item.text}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
