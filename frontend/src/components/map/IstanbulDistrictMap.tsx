"use client";

import {
  ISTANBUL_BOUNDS,
  PILOT_DISTRICT_IDS,
} from "@/data/regions";
import { DistrictMapView } from "./DistrictMapView";

export function IstanbulDistrictMap() {
  return (
    <DistrictMapView
      provinceName="İstanbul"
      bounds={ISTANBUL_BOUNDS}
      dataUrl="/data/istanbul-districts.geojson"
      pilotIds={PILOT_DISTRICT_IDS}
      layerPrefix="istanbul"
      hint={
        <>
          Parlak ilçelere tıklayın:{" "}
          <span className="text-primary">Kadıköy</span>,{" "}
          <span className="text-primary">Pendik</span>,{" "}
          <span className="text-primary">Tuzla</span>
        </>
      }
    />
  );
}
