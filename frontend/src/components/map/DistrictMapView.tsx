"use client";

import { useCallback, useMemo, useState } from "react";
import Map, { Layer, Source } from "react-map-gl/maplibre";
import type {
  ExpressionSpecification,
  FillLayerSpecification,
  LineLayerSpecification,
  SymbolLayerSpecification,
  MapLayerMouseEvent,
} from "maplibre-gl";
import { MAP_BASE_STYLE, mapColors } from "@/lib/mapTheme";
import { useMapStore } from "@/stores/mapStore";

type Bounds = [[number, number], [number, number]];

interface DistrictMapViewProps {
  provinceName: string;
  bounds: Bounds;
  dataUrl: string;
  pilotIds: readonly string[];
  layerPrefix: string;
  hint: React.ReactNode;
}

function buildPilotMatch(
  pilotIds: readonly string[],
  pilotValue: string | number,
  defaultValue: string | number,
) {
  const expression: unknown[] = ["match", ["get", "id"]];
  for (const id of pilotIds) {
    expression.push(id, pilotValue);
  }
  expression.push(defaultValue);
  return expression as ExpressionSpecification;
}

export function DistrictMapView({
  provinceName,
  bounds,
  dataUrl,
  pilotIds,
  layerPrefix,
  hint,
}: DistrictMapViewProps) {
  const selectDistrict = useMapStore((s) => s.selectDistrict);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const pilotSet = useMemo(() => new Set(pilotIds), [pilotIds]);

  const fillLayerId = `${layerPrefix}-districts-fill`;
  const labelLayerId = `${layerPrefix}-districts-label`;

  const fillPaint = useMemo(
    () => ({
      "fill-color": [
        "case",
        ["==", ["get", "id"], hoveredId ?? ""],
        mapColors.district.hover,
        buildPilotMatch(
          pilotIds,
          mapColors.district.pilot,
          mapColors.district.default,
        ),
      ],
    }),
    [hoveredId, pilotIds],
  );

  const linePaint = useMemo(
    () => ({
      "line-color": buildPilotMatch(
        pilotIds,
        mapColors.district.linePilot,
        mapColors.district.lineDefault,
      ),
      "line-width": buildPilotMatch(
        pilotIds,
        mapColors.district.lineWidthPilot,
        mapColors.district.lineWidthDefault,
      ),
    }),
    [pilotIds],
  );

  const labelLayout = useMemo(
    () => ({
      "text-field": ["get", "name"],
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        8,
        10,
        11,
        13,
        14,
        15,
      ],
      "text-anchor": "center",
      "text-max-width": 10,
      "text-allow-overlap": false,
      "text-ignore-placement": false,
    }),
    [],
  );

  const labelPaint = useMemo(
    () => ({
      "text-color": buildPilotMatch(
        pilotIds,
        mapColors.labelLight,
        mapColors.labelDark,
      ),
      "text-halo-color": mapColors.labelHalo,
      "text-halo-width": 1.8,
    }),
    [pilotIds],
  );

  const onClick = useCallback(
    (e: MapLayerMouseEvent) => {
      const id = e.features?.[0]?.properties?.id;
      if (typeof id === "string" && pilotSet.has(id)) {
        selectDistrict(id);
      }
    },
    [pilotSet, selectDistrict],
  );

  const onMouseMove = useCallback(
    (e: MapLayerMouseEvent) => {
      const id = e.features?.[0]?.properties?.id;
      const districtId = typeof id === "string" ? id : null;
      setHoveredId(districtId);
      e.target.getCanvas().style.cursor =
        districtId && pilotSet.has(districtId) ? "pointer" : "default";
    },
    [pilotSet],
  );

  const onMouseLeave = useCallback((e: MapLayerMouseEvent) => {
    setHoveredId(null);
    e.target.getCanvas().style.cursor = "default";
  }, []);

  return (
    <div className="flex h-full w-full min-h-0 flex-col overflow-hidden">
      <h3 className="shrink-0 text-center font-display text-lg font-semibold text-primary md:text-xl">
        {provinceName}
      </h3>
      <p className="mb-2 shrink-0 text-center text-xs text-foreground-muted md:text-sm">
        {hint}
      </p>
      <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-glass-border bg-surface-container/40">
        <Map
          initialViewState={{
            bounds,
            fitBoundsOptions: { padding: 32 },
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={MAP_BASE_STYLE}
          attributionControl={false}
          interactiveLayerIds={[fillLayerId]}
          onClick={onClick}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <Source id={`${layerPrefix}-districts`} type="geojson" data={dataUrl}>
            <Layer
              id={fillLayerId}
              type="fill"
              paint={fillPaint as FillLayerSpecification["paint"]}
            />
            <Layer
              id={`${layerPrefix}-districts-line`}
              type="line"
              paint={linePaint as LineLayerSpecification["paint"]}
            />
            <Layer
              id={labelLayerId}
              type="symbol"
              layout={labelLayout as SymbolLayerSpecification["layout"]}
              paint={labelPaint as SymbolLayerSpecification["paint"]}
            />
          </Source>
        </Map>
      </div>
    </div>
  );
}
