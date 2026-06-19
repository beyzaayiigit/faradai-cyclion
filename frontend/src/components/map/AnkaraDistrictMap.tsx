"use client";

import {
  ANKARA_BOUNDS,
  ANKARA_PILOT_DISTRICT_IDS,
} from "@/data/regions";
import { DistrictMapView } from "./DistrictMapView";

export function AnkaraDistrictMap() {
  return (
    <DistrictMapView
      provinceName="Ankara"
      bounds={ANKARA_BOUNDS}
      dataUrl="/data/ankara-districts.geojson"
      pilotIds={ANKARA_PILOT_DISTRICT_IDS}
      layerPrefix="ankara"
      hint={
        <>
          Parlak ilçeye tıklayın:{" "}
          <span className="text-primary">Çankaya</span>
          <span className="mt-1 block text-[10px] text-foreground-subtle">
            105+ gerçek istasyon · diğer ilçeler bilgi amaçlı
          </span>
        </>
      }
    />
  );
}
