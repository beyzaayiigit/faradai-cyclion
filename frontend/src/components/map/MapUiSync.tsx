"use client";

import { useEffect, useRef } from "react";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useMapStore } from "@/stores/mapStore";

/** Harita bölümünden çıkınca çekmece / seçimi temizle */
export function MapUiSync() {
  const mapInView = useSectionInView("map", 0.15);
  const dismissUi = useMapStore((s) => s.dismissUi);
  const wasInView = useRef(false);

  useEffect(() => {
    if (wasInView.current && !mapInView) {
      dismissUi();
    }
    wasInView.current = mapInView;
  }, [mapInView, dismissUi]);

  return null;
}
