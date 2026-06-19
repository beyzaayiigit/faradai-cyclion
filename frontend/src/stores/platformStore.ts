"use client";

import { create } from "zustand";

export type PlatformTab = "mobiq" | "relith" | "map";
export type PanelMotion = "slide" | "discover";

interface PlatformState {
  activeTab: PlatformTab;
  panelEnterKey: number;
  panelMotion: PanelMotion;
  setActiveTab: (tab: PlatformTab) => void;
  discoverToMobiq: () => void;
}

export const usePlatformStore = create<PlatformState>((set) => ({
  activeTab: "mobiq",
  panelEnterKey: 0,
  panelMotion: "slide",
  setActiveTab: (tab) =>
    set({ activeTab: tab, panelMotion: "slide" }),
  discoverToMobiq: () =>
    set((s) => ({
      activeTab: "mobiq",
      panelMotion: "discover",
      panelEnterKey: s.panelEnterKey + 1,
    })),
}));
