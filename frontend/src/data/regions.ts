import mapGeometry from "@/data/map-geometry.json";
import districtBounds from "@/data/district-bounds.json";

export const PILOT_PROVINCE_IDS = ["istanbul", "kocaeli", "ankara"] as const;
export const PILOT_DISTRICT_IDS = ["kadikoy", "pendik", "tuzla"] as const;
export const KOCAELI_PILOT_DISTRICT_IDS = ["gebze"] as const;
export const ANKARA_PILOT_DISTRICT_IDS = ["cankaya"] as const;

export const ISTANBUL_BOUNDS = districtBounds.istanbul as [
  [number, number],
  [number, number],
];

export const KOCAELI_BOUNDS = districtBounds.kocaeli as [
  [number, number],
  [number, number],
];

export const ANKARA_BOUNDS = districtBounds.ankara as [
  [number, number],
  [number, number],
];

/** İstasyon haritası zoom merkezleri (lng, lat) */
export const DISTRICT_CENTERS: Record<string, [number, number]> = {
  kadikoy: [29.0296, 40.9819],
  pendik: [29.2339, 40.8775],
  tuzla: [29.3003, 40.8176],
  gebze: [29.4308, 40.8028],
  cankaya: [32.85, 39.92],
};

export const turkeyMap = mapGeometry.turkey;

export function getProvinceById(id: string) {
  return turkeyMap.provinces.find((p) => p.id === id);
}
