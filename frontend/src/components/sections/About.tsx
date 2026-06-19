"use client";

import { motion } from "framer-motion";
import { Recycle, Target, Users, Zap } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card } from "@/components/ui";

export function About() {
  return (
    <Section id="about" tone="accent" fillViewport>
      <Container className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <SectionHeader
              compact
              label="Kurumsal"
              title="Vizyon & Misyon"
              description="MobiQ × RE-LITH, akıllı şarj ağı ile döngüsel batarya geri dönüşümünü tek platformda birleştiren entegre bir clean-tech girişimidir."
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 max-w-xl text-sm leading-relaxed text-foreground-muted md:text-base"
            >
              Vizyonumuz, atık bataryayı şehir madeni olarak görüp temiz hammaddeye
              dönüştürürken; misyonumuz filo ve mobilite ortaklarına ölçülebilir,
              şeffaf ve sürdürülebilir enerji altyapısı sunmaktır.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="mt-6 grid gap-3 sm:grid-cols-2"
            >
              <li className="flex gap-3 rounded-xl border border-glass-border bg-surface-container p-4">
                <Target className="shrink-0 text-secondary-text" size={22} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-sm font-semibold">Ölçülebilir hedefler</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                    Pilot KPI, istasyon verisi ve süreç haritası ile şeffaf ilerleme
                  </p>
                </div>
              </li>
              <li className="flex gap-3 rounded-xl border border-glass-border bg-surface-container p-4">
                <Users className="shrink-0 text-primary" size={22} strokeWidth={1.5} />
                <div>
                  <p className="font-display text-sm font-semibold">Ortak ekosistem</p>
                  <p className="mt-1 text-xs leading-relaxed text-foreground-muted">
                    Filo, yatırımcı, operatör ve geri dönüşüm ortaklarıyla uyum
                  </p>
                </div>
              </li>
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:pl-4"
          >
            <Card glow className="p-5 md:p-7">
              <div className="mb-4 flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/15 text-secondary-text">
                  <Recycle size={18} strokeWidth={1.5} />
                </span>
                <h3 className="font-display text-lg font-semibold text-secondary-text md:text-xl">
                  Taahhüdümüz
                </h3>
              </div>
              <ul className="space-y-4 text-sm leading-relaxed text-foreground md:text-base">
                {[
                  {
                    icon: Zap,
                    text: "Kayıt olmadan canlı prototip: harita, filtre ve demo rezervasyon",
                  },
                  {
                    icon: Target,
                    text: "Ankara gerçek istasyon verisi ve şeffaf operasyonel metrikler",
                  },
                  {
                    icon: Recycle,
                    text: "RE-LITH ile %0 yakma, yeşil kimya ve kapalı döngü batarya ekonomisi",
                  },
                  {
                    icon: Users,
                    text: "Lojistik odaklı Mega DC vizyonu ve filo dostu altyapı",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="flex gap-3 border-l-2 border-primary/40 pl-4"
                  >
                    <Icon
                      className="mt-0.5 shrink-0 text-primary/70"
                      size={16}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    {text}
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
