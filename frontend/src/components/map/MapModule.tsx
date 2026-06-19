"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { useMapStore } from "@/stores/mapStore";
import { TurkeyMap } from "./TurkeyMap";
import { ProvinceMap } from "./ProvinceMap";
import { StationMap } from "./StationMap";
import { FilterBar } from "./FilterBar";
import { StationDrawer } from "./StationDrawer";
import { MapUiSync } from "./MapUiSync";

const phaseHints: Record<string, ReactNode> = {
  country: (
    <>
      <span className="text-primary">İstanbul</span>,{" "}
      <span className="text-primary">Kocaeli</span> veya{" "}
      <span className="text-primary">Ankara</span> iline tıklayarak başlayın.
    </>
  ),
  province: <>Parlak ilçelere tıklayın.</>,
  district: <>İstasyon pinlerine tıklayarak detay görün.</>,
};

interface MapModuleProps {
  embedded?: boolean;
}

export function MapModule({ embedded = false }: MapModuleProps) {
  const phase = useMapStore((s) => s.phase);
  const goBack = useMapStore((s) => s.goBack);
  const reset = useMapStore((s) => s.reset);

  const inner = (
    <>
      <MapUiSync />
      <div
        className={
          embedded
            ? "flex h-full min-h-0 flex-1 flex-col overflow-hidden bg-surface-container/30"
            : "flex h-full min-h-0 flex-1 flex-col overflow-hidden border-y border-glass-border bg-surface-container/30"
        }
      >
        <Container className="shrink-0 py-4 md:py-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Canlı İstasyon Haritası
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                Ankara <span className="text-secondary-text">gerçek istasyon</span>{" "}
                verisi · İstanbul/Kocaeli{" "}
                <span className="text-foreground">pilot demo</span>
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                {phaseHints[phase]}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {phase !== "country" && (
                <Button variant="ghost" onClick={goBack}>
                  <ArrowLeft size={16} className="mr-2 inline" />
                  Geri
                </Button>
              )}
              {phase !== "country" && (
                <Button variant="secondary" onClick={reset}>
                  <RotateCcw size={16} className="mr-2 inline" />
                  Sıfırla
                </Button>
              )}
            </div>
          </div>
        </Container>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="relative min-h-0 flex-1 overflow-hidden">
            {phase === "district" && (
              <div className="absolute top-2 right-2 left-2 z-20 max-h-[30%] overflow-y-auto overscroll-y-contain rounded-lg border border-glass-border glass-panel p-3 lg:hidden">
                <FilterBar />
              </div>
            )}

            <AnimatePresence mode="wait" initial={false}>
              {phase === "country" && (
                <motion.div
                  key="country"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex items-center justify-center p-4 pb-6 md:p-6"
                >
                  <div className="h-full w-full max-w-5xl">
                    <TurkeyMap />
                  </div>
                </motion.div>
              )}
              {phase === "province" && (
                <motion.div
                  key="province"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 p-3 md:p-4"
                >
                  <ProvinceMap />
                </motion.div>
              )}
              {phase === "district" && (
                <motion.div
                  key="district"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0"
                >
                  <StationMap />
                </motion.div>
              )}
            </AnimatePresence>

            <StationDrawer />
          </div>

          <aside className="hidden w-72 shrink-0 flex-col justify-start overflow-y-auto overscroll-y-contain border-l border-glass-border bg-surface-container/20 p-5 lg:flex">
            {phase === "district" && <FilterBar />}
            {phase !== "district" && (
              <p className="text-sm leading-relaxed text-foreground-muted">
                {phaseHints[phase]}
              </p>
            )}
          </aside>
        </div>
      </div>
    </>
  );

  if (embedded) {
    return inner;
  }

  return (
    <Section id="map" locked>
      {inner}
    </Section>
  );
}
