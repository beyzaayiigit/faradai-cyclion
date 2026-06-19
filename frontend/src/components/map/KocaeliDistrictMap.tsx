"use client";

import {
  KOCAELI_BOUNDS,
  KOCAELI_PILOT_DISTRICT_IDS,
} from "@/data/regions";
import { DistrictMapView } from "./DistrictMapView";

export function KocaeliDistrictMap() {
  return (
    <DistrictMapView
      provinceName="Kocaeli"
      bounds={KOCAELI_BOUNDS}
      dataUrl="/data/kocaeli-districts.geojson"
      pilotIds={KOCAELI_PILOT_DISTRICT_IDS}
      layerPrefix="kocaeli"
      hint={
        <>
          <span className="text-primary">Gebze</span> ilçesine tıklayarak istasyon
          haritasına geçin
        </>
      }
    />
  );
}
