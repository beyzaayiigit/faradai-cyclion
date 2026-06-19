"use client";

import { useMemo, useCallback } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import type { Station, StationStatus } from "@/types";
import { DISTRICT_CENTERS } from "@/data/regions";
import { MAP_BASE_STYLE } from "@/lib/mapTheme";
import { useFilteredStations } from "@/hooks/useFilteredStations";
import { useMapStore } from "@/stores/mapStore";

const statusColor: Record<StationStatus, string> = {
  available: "#22c55e",
  occupied: "#ef4444",
  reserved: "#f59e0b",
};

function StationPin({
  station,
  onClick,
}: {
  station: Station;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="group flex h-10 w-10 items-center justify-center"
      aria-label={station.name}
    >
      <span
        className="h-4 w-4 rounded-full border-2 border-surface transition-transform group-hover:scale-125"
        style={{
          backgroundColor: statusColor[station.status],
          boxShadow: `0 0 12px ${statusColor[station.status]}88`,
        }}
      />
    </button>
  );
}

export function StationMap() {
  const selectedDistrict = useMapStore((s) => s.selectedDistrict);
  const selectStation = useMapStore((s) => s.selectStation);
  const stations = useFilteredStations();

  const center = useMemo((): [number, number] => {
    if (selectedDistrict && DISTRICT_CENTERS[selectedDistrict]) {
      return DISTRICT_CENTERS[selectedDistrict];
    }
    return [29.0, 41.0];
  }, [selectedDistrict]);

  const onMarkerClick = useCallback(
    (station: Station) => {
      selectStation(station);
    },
    [selectStation],
  );

  return (
    <div className="h-full w-full min-h-0">
      <Map
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: 12,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle={MAP_BASE_STYLE}
        attributionControl={false}
      >
        {stations.map((station) => (
          <Marker
            key={station.id}
            longitude={station.lng}
            latitude={station.lat}
            anchor="center"
          >
            <StationPin station={station} onClick={() => onMarkerClick(station)} />
          </Marker>
        ))}
      </Map>
    </div>
  );
}
