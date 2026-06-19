export type MapPhase = "country" | "province" | "district";

export type PowerType = "AC" | "DC" | "Mega DC";

export type StationStatus = "available" | "occupied" | "reserved";

export interface Station {
  id: string;
  name: string;
  province: string;
  district: string;
  lat: number;
  lng: number;
  powerType: PowerType;
  status: StationStatus;
  powerKw: number;
  queueMinutes: number;
  truckCompatible: boolean;
  operator?: string;
  address?: string;
  truckNote?: string;
}

export type MobiqAccent =
  | "primary"
  | "secondary"
  | "glow"
  | "muted"
  | "vision";

export interface MobiqCard {
  title: string;
  body: string;
  bullets: string[];
}

export interface MobiqSection {
  id: string;
  label: string;
  title: string;
  description: string;
  accent: MobiqAccent;
  cards: MobiqCard[];
}

export interface MapFilters {
  powerTypes: PowerType[];
  statuses: StationStatus[];
}

export interface Milestone {
  id: string;
  period: string;
  title: string;
  description: string;
  phase: "current" | "future" | "vision";
  /** Hangi kol öne çıkıyor */
  focus?: string;
  /** Aşama adımları */
  items?: string[];
}

export interface PilotProvince {
  id: string;
  name: string;
  path: string;
  labelX: number;
  labelY: number;
}

export interface PilotDistrict {
  id: string;
  name: string;
  provinceId: string;
  path: string;
  labelX: number;
  labelY: number;
  center: [number, number];
}
