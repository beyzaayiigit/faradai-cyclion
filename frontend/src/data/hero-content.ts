import type { LucideIcon } from "lucide-react";
import { BatteryCharging, MapPin, Recycle } from "lucide-react";

export const heroContent = {
  badge: "MobiQ × RE-LITH · Kapalı Döngü Enerji Platformu",
  h1Line1: "Akıllı şarj ağından döngüsel batarya geri dönüşümüne —",
  h1Line2: "tek entegre enerji ekosistemi",
  tagline:
    "Bugünün atık bataryalarını, yarının temiz enerji altyapısına dönüştürüyoruz.",
  description:
    "MobiQ, filo ve bireysel kullanıcılar için istasyon ağı, doluluk ve rezervasyonu yönetir. RE-LITH, ömrünü tamamlamış bataryaları yeşil kimya ile ikinci ömre veya battery-grade hammaddeye dönüştürür. Üretimden şarja, geri dönüşümden yeni depolamaya kapalı döngü.",
  stats: [
    { icon: MapPin as LucideIcon, label: "Canlı istasyon", value: "105+ · Ankara" },
    {
      icon: BatteryCharging as LucideIcon,
      label: "Akıllı şarj",
      value: "Rezervasyon & filo",
    },
    {
      icon: Recycle as LucideIcon,
      label: "Yeşil geri dönüşüm",
      value: "%0 yakma · RE-LITH",
    },
  ],
  ctaPrimary: { label: "Canlı Prototipi Dene", tab: "map" as const },
  ctaSecondary: { label: "Ekosistemi Keşfet", tab: "mobiq" as const },
  ctaTertiary: { label: "Süreç Haritası", section: "milestones" as const },
};
