"use client";

import { useShallow } from "zustand/react/shallow";
import {
  selectFilteredStationCount,
  selectFilteredStations,
  useMapStore,
} from "@/stores/mapStore";

/** Filtrelenmiş istasyon listesi (dizi referansı shallow karşılaştırılır). */
export function useFilteredStations() {
  return useMapStore(useShallow(selectFilteredStations));
}

export function useFilteredStationCount() {
  return useMapStore(selectFilteredStationCount);
}
