"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { BatteryCharging, Map, Recycle } from "lucide-react";
import { MobiqHub } from "@/components/sections/MobiqHub";
import { RelithHub } from "@/components/sections/RelithHub";
import { cn } from "@/lib/cn";
import {
  scrollPlatformIntoView,
  scrollToPlatformTab,
  type PlatformTabId,
} from "@/hooks/useActiveSection";
import {
  mapPanelFade,
  tabPanelDiscover,
  tabPanelSlide,
} from "@/components/sections/platform-panel-motion";
import { usePlatformStore, type PlatformTab } from "@/stores/platformStore";

const MapModule = dynamic(
  () => import("@/components/map/MapModule").then((m) => m.MapModule),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[var(--section-viewport)] min-h-[420px] items-center justify-center bg-surface-container/30">
        <p className="font-mono text-sm text-foreground-subtle">Harita yükleniyor…</p>
      </div>
    ),
  },
);

const tabs: {
  id: PlatformTab;
  label: string;
  icon: typeof Map;
}[] = [
  { id: "mobiq", label: "MobiQ", icon: BatteryCharging },
  { id: "relith", label: "RE-LITH", icon: Recycle },
  { id: "map", label: "Harita", icon: Map },
];

function syncTabFromHash(scroll: boolean) {
  const hash = window.location.hash.replace("#", "") as PlatformTabId;
  if (hash === "mobiq" || hash === "relith" || hash === "map") {
    usePlatformStore.getState().setActiveTab(hash);
    if (scroll) scrollPlatformIntoView("instant");
  }
}

export function PlatformTabs() {
  const activeTab = usePlatformStore((s) => s.activeTab);
  const panelEnterKey = usePlatformStore((s) => s.panelEnterKey);
  const panelMotion = usePlatformStore((s) => s.panelMotion);
  const mobiqMotion =
    panelMotion === "discover" ? tabPanelDiscover : tabPanelSlide;

  useEffect(() => {
    syncTabFromHash(true);
    const onHash = () => syncTabFromHash(true);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <section
      id="platform"
      className="relative scroll-mt-[var(--header-height)] border-b border-glass-border platform-shell"
    >
      <div
        className="sticky top-[var(--header-height)] z-30 border-b border-glass-border bg-[linear-gradient(180deg,rgba(242,247,252,0.95),rgba(220,232,244,0.92))] backdrop-blur-xl"
        role="tablist"
        aria-label="Platform bölümleri"
      >
        <div className="mx-auto flex max-w-[var(--width-container)] gap-1 px-4 py-2 md:gap-2 md:px-6 lg:px-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                onClick={() => scrollToPlatformTab(tab.id)}
                className={cn(
                  "relative flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors md:flex-none md:px-6",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-foreground-muted hover:bg-surface-container hover:text-foreground",
                )}
              >
                <Icon size={18} strokeWidth={1.5} aria-hidden />
                <span>{tab.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="platform-tab-indicator"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                    aria-hidden
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "mobiq" && (
          <motion.div
            key={`mobiq-${panelEnterKey}`}
            id="mobiq"
            role="tabpanel"
            aria-labelledby="tab-mobiq"
            {...mobiqMotion}
            onAnimationComplete={() => {
              if (usePlatformStore.getState().panelMotion === "discover") {
                usePlatformStore.setState({ panelMotion: "slide" });
              }
            }}
          >
            <MobiqHub />
          </motion.div>
        )}
        {activeTab === "relith" && (
          <motion.div
            key={`relith-${panelEnterKey}`}
            id="relith"
            role="tabpanel"
            aria-labelledby="tab-relith"
            {...tabPanelSlide}
          >
            <RelithHub />
          </motion.div>
        )}
        {activeTab === "map" && (
          <motion.div
            key={`map-${panelEnterKey}`}
            id="map"
            role="tabpanel"
            aria-labelledby="tab-map"
            {...mapPanelFade}
            className="h-[var(--section-viewport)] min-h-[420px] overflow-hidden"
          >
            <MapModule embedded />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
