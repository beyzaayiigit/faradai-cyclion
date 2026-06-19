"use client";

import { useMapStore } from "@/stores/mapStore";
import { AnkaraDistrictMap } from "./AnkaraDistrictMap";
import { IstanbulDistrictMap } from "./IstanbulDistrictMap";
import { KocaeliDistrictMap } from "./KocaeliDistrictMap";

export function ProvinceMap() {
  const selectedProvince = useMapStore((s) => s.selectedProvince);

  if (selectedProvince === "kocaeli") {
    return <KocaeliDistrictMap />;
  }

  if (selectedProvince === "ankara") {
    return <AnkaraDistrictMap />;
  }

  return <IstanbulDistrictMap />;
}
