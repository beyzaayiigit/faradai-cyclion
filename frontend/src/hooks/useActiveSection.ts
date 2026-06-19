"use client";

import { useEffect, useState } from "react";
import type { PlatformTab } from "@/stores/platformStore";
import { usePlatformStore } from "@/stores/platformStore";

export const SECTION_IDS = [
  "hero",
  "platform",
  "mobiq",
  "relith",
  "map",
  "milestones",
  "about",
  "contact",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export type PlatformTabId = PlatformTab;

export const NAV_SECTION_IDS = SECTION_IDS.filter((id) => id !== "hero");

export const SECTION_NAV_EVENT = "section-navigate";

function getHeaderOffset(): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(
    "--header-height",
  );
  const parsed = parseFloat(raw);
  return Number.isFinite(parsed) ? parsed : 64;
}

function isPlatformTab(id: string): id is PlatformTabId {
  return id === "mobiq" || id === "relith" || id === "map";
}

export function getActiveSectionId(): SectionId {
  const header = getHeaderOffset();
  const probeY = header + Math.min(120, (window.innerHeight - header) * 0.22);

  const platformEl = document.getElementById("platform");
  if (platformEl) {
    const { top, bottom } = platformEl.getBoundingClientRect();
    if (top <= probeY && bottom > probeY) {
      return usePlatformStore.getState().activeTab;
    }
  }

  for (const id of SECTION_IDS) {
    if (isPlatformTab(id)) continue;
    const el = document.getElementById(id);
    if (!el) continue;

    const { top, bottom } = el.getBoundingClientRect();
    if (top <= probeY && bottom > probeY) {
      return id;
    }
  }

  let best: SectionId = "hero";
  let bestScore = -1;

  for (const id of SECTION_IDS) {
    if (isPlatformTab(id)) continue;
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, header);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visible = Math.max(0, visibleBottom - visibleTop);

    if (visible < 8) continue;

    const nearTop = rect.top <= header + 100 ? 250 : 0;
    const score = visible + nearTop;

    if (score > bestScore) {
      bestScore = score;
      best = id;
    }
  }

  if (platformEl) {
    const rect = platformEl.getBoundingClientRect();
    const visibleTop = Math.max(rect.top, header);
    const visibleBottom = Math.min(rect.bottom, window.innerHeight);
    const visible = Math.max(0, visibleBottom - visibleTop);
    const nearTop = rect.top <= header + 100 ? 250 : 0;
    const score = visible + nearTop;
    if (score > bestScore && score > 0) {
      return usePlatformStore.getState().activeTab;
    }
  }

  return best;
}

/** Sayfayı hedefin üst kenarını header altına hizalar (scroll-margin destekli). */
export function scrollElementToTop(
  el: HTMLElement,
  behavior: ScrollBehavior = "smooth",
) {
  const header = getHeaderOffset();
  const marginTop = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const offset = Math.max(header, marginTop);
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior });
}

/** Sekme animasyonu sonrası tekrar hizala */
export function scrollPlatformIntoView(behavior: ScrollBehavior = "smooth") {
  const platform = document.getElementById("platform");
  if (!platform) return;

  const run = () => scrollElementToTop(platform, behavior);
  run();
  requestAnimationFrame(() => {
    requestAnimationFrame(run);
  });
}

export function scrollToSection(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;

  window.dispatchEvent(new CustomEvent(SECTION_NAV_EVENT, { detail: id }));
  scrollElementToTop(el);

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
  }
}

export function scrollToPlatformTab(tab: PlatformTabId) {
  usePlatformStore.getState().setActiveTab(tab);

  window.dispatchEvent(new CustomEvent(SECTION_NAV_EVENT, { detail: tab }));

  if (window.location.hash !== `#${tab}`) {
    window.history.pushState(null, "", `#${tab}`);
  }

  scrollPlatformIntoView();
}

/** Hero “Keşfet” → platforma kaydır + sekme kayma / keşif animasyonu */
export function discoverPlatform() {
  usePlatformStore.getState().discoverToMobiq();

  window.dispatchEvent(new CustomEvent(SECTION_NAV_EVENT, { detail: "mobiq" }));

  if (window.location.hash !== "#mobiq") {
    window.history.pushState(null, "", "#mobiq");
  }

  scrollPlatformIntoView();
}

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>("hero");
  const activeTab = usePlatformStore((s) => s.activeTab);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setActive(getActiveSectionId());
      });
    };

    const onNavigate = (e: Event) => {
      const id = (e as CustomEvent<SectionId>).detail;
      if (SECTION_IDS.includes(id)) setActive(id);
    };

    const onHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (isPlatformTab(hash)) {
        usePlatformStore.getState().setActiveTab(hash);
        setActive(hash);
        scrollPlatformIntoView("instant");
      } else {
        const asSection = hash as SectionId;
        if (SECTION_IDS.includes(asSection)) {
          setActive(asSection);
          const el = document.getElementById(asSection);
          if (el) scrollElementToTop(el, "instant");
        } else {
          update();
        }
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", onHash);
    window.addEventListener(SECTION_NAV_EVENT, onNavigate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener(SECTION_NAV_EVENT, onNavigate);
    };
  }, []);

  useEffect(() => {
    setActive(getActiveSectionId());
  }, [activeTab]);

  return active;
}
