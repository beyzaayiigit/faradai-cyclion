"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PILOT_PROVINCE_IDS, turkeyMap } from "@/data/regions";
import { mapColors } from "@/lib/mapTheme";
import { useMapStore } from "@/stores/mapStore";
import { cn } from "@/lib/cn";

const c = mapColors.turkey;

export function TurkeyMap() {
  const selectProvince = useMapStore((s) => s.selectProvince);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full rounded-lg border border-glass-border bg-[linear-gradient(180deg,#dce8f4,#c8d9ea)]">
      <svg
        viewBox={turkeyMap.viewBox}
        className="h-full max-h-full w-full"
        role="img"
        aria-label="Türkiye ili haritası — pilot illere tıklayın"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="label-halo" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="1.2"
              floodColor="#ffffff"
              floodOpacity="0.95"
            />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor={c.glow}
              floodOpacity="0.55"
            />
          </filter>
        </defs>

        <motion.path
          d={turkeyMap.outline}
          fill={c.outlineFill}
          stroke={c.outlineStroke}
          strokeWidth={0.75}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {turkeyMap.provinces.map((p) => {
          const isPilot = (PILOT_PROVINCE_IDS as readonly string[]).includes(
            p.id,
          );
          const isHovered = hoveredId === p.id;
          const showLabel = isPilot || isHovered;

          return (
            <g key={p.id}>
              <motion.path
                d={p.path}
                className={cn(
                  "transition-[fill,stroke] duration-200",
                  isPilot ? "cursor-pointer" : "cursor-default",
                )}
                fill={
                  isPilot
                    ? isHovered
                      ? c.provincePilotHover
                      : c.provincePilot
                    : isHovered
                      ? c.provinceDefaultHover
                      : c.provinceDefault
                }
                stroke={isPilot ? c.strokePilot : c.strokeDefault}
                strokeWidth={isPilot ? 1.4 : 0.6}
                filter={isPilot && isHovered ? "url(#glow)" : undefined}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => isPilot && selectProvince(p.id)}
              />
              {showLabel && (
                <text
                  x={p.labelX}
                  y={p.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  filter="url(#label-halo)"
                  fill={isPilot ? mapColors.labelLight : mapColors.labelDark}
                  fontSize={isPilot ? 13 : 11}
                  fontWeight={600}
                  className="pointer-events-none select-none"
                  style={{ fontFamily: "var(--font-montserrat), system-ui, sans-serif" }}
                >
                  {p.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
