"use client";

import { create } from "zustand";
import type {
  MapFilters,
  MapPhase,
  PowerType,
  Station,
  StationStatus,
} from "@/types";
import stationsData from "@/data/stations.json";

const ALL_POWER: PowerType[] = ["AC", "DC", "Mega DC"];
const ALL_STATUS: StationStatus[] = ["available", "occupied", "reserved"];

interface MapState {
  phase: MapPhase;
  selectedProvince: string | null;
  selectedDistrict: string | null;
  selectedStation: Station | null;
  drawerOpen: boolean;
  stations: Station[];
  filters: MapFilters;
  setPhase: (phase: MapPhase) => void;
  selectProvince: (id: string) => void;
  selectDistrict: (id: string) => void;
  selectStation: (station: Station | null) => void;
  setDrawerOpen: (open: boolean) => void;
  togglePowerFilter: (type: PowerType) => void;
  toggleStatusFilter: (status: StationStatus) => void;
  simulateReservation: (stationId: string) => void;
  goBack: () => void;
  reset: () => void;
  dismissUi: () => void;
  getFilteredStations: () => Station[];
}

function applyFilterChange(
  state: MapState,
  patch: Partial<MapFilters>,
): Partial<MapState> {
  const filters = { ...state.filters, ...patch };
  const next = { ...state, filters };
  const visible = selectFilteredStations(next);
  const selectedStillVisible =
    state.selectedStation &&
    visible.some((st) => st.id === state.selectedStation?.id);

  if (!selectedStillVisible) {
    return { filters, selectedStation: null, drawerOpen: false };
  }
  return { filters };
}

export function selectFilteredStations(state: MapState): Station[] {
  let list = state.stations;
  if (state.phase === "district" && state.selectedDistrict) {
    list = list.filter((s) => s.district === state.selectedDistrict);
  } else if (state.phase === "province" && state.selectedProvince) {
    list = list.filter((s) => s.province === state.selectedProvince);
  }
  return list.filter((s) => matchesFilters(s, state.filters));
}

export function selectFilteredStationCount(state: MapState): number {
  return selectFilteredStations(state).length;
}

export function selectDistrictStationCount(state: MapState): number {
  if (state.phase !== "district" || !state.selectedDistrict) return 0;
  return state.stations.filter((s) => s.district === state.selectedDistrict)
    .length;
}

function matchesFilters(station: Station, filters: MapFilters): boolean {
  const powerOk =
    filters.powerTypes.length === 0 ||
    filters.powerTypes.includes(station.powerType);
  const statusOk =
    filters.statuses.length === 0 ||
    filters.statuses.includes(station.status);
  return powerOk && statusOk;
}

export const useMapStore = create<MapState>((set, get) => ({
  phase: "country",
  selectedProvince: null,
  selectedDistrict: null,
  selectedStation: null,
  drawerOpen: false,
  stations: stationsData as Station[],
  filters: { powerTypes: [], statuses: [] },

  setPhase: (phase) => set({ phase }),

  selectProvince: (id) =>
    set({
      selectedProvince: id,
      selectedDistrict: null,
      phase: "province",
      selectedStation: null,
      drawerOpen: false,
    }),

  selectDistrict: (id) =>
    set({
      selectedDistrict: id,
      phase: "district",
      selectedStation: null,
      drawerOpen: false,
    }),

  selectStation: (station) =>
    set({ selectedStation: station, drawerOpen: station !== null }),

  setDrawerOpen: (open) => set({ drawerOpen: open }),

  togglePowerFilter: (type) =>
    set((s) => {
      const has = s.filters.powerTypes.includes(type);
      const powerTypes = has
        ? s.filters.powerTypes.filter((t) => t !== type)
        : [...s.filters.powerTypes, type];
      return applyFilterChange(s, { powerTypes });
    }),

  toggleStatusFilter: (status) =>
    set((s) => {
      const has = s.filters.statuses.includes(status);
      const statuses = has
        ? s.filters.statuses.filter((t) => t !== status)
        : [...s.filters.statuses, status];
      return applyFilterChange(s, { statuses });
    }),

  simulateReservation: (stationId) =>
    set((s) => ({
      stations: s.stations.map((st) =>
        st.id === stationId ? { ...st, status: "reserved" as const } : st,
      ),
      selectedStation:
        s.selectedStation?.id === stationId
          ? { ...s.selectedStation, status: "reserved" }
          : s.selectedStation,
    })),

  goBack: () => {
    const { phase } = get();
    if (phase === "district") {
      set({
        phase: "province",
        selectedDistrict: null,
        selectedStation: null,
        drawerOpen: false,
      });
    } else if (phase === "province") {
      set({
        phase: "country",
        selectedProvince: null,
        selectedDistrict: null,
        selectedStation: null,
        drawerOpen: false,
      });
    }
  },

  reset: () =>
    set({
      phase: "country",
      selectedProvince: null,
      selectedDistrict: null,
      selectedStation: null,
      drawerOpen: false,
    }),

  dismissUi: () =>
    set({
      drawerOpen: false,
      selectedStation: null,
    }),

  getFilteredStations: () => selectFilteredStations(get()),
}));

export { ALL_POWER, ALL_STATUS };
