"use client";

import dynamic from "next/dynamic";

export const MapModule = dynamic(
  () => import("./MapModule").then((m) => m.MapModule),
  {
    ssr: false,
    loading: () => (
      <section
        id="map"
        className="flex h-[var(--section-viewport)] scroll-mt-[var(--header-height)] items-center justify-center overflow-hidden border-y border-glass-border bg-surface-container/30"
      >
        <p className="font-mono text-sm text-foreground-subtle">Harita yükleniyor…</p>
      </section>
    ),
  },
);
