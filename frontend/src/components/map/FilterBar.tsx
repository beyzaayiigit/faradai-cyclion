"use client";

import { Chip } from "@/components/ui";
import { useFilteredStationCount } from "@/hooks/useFilteredStations";
import {
  ALL_POWER,
  ALL_STATUS,
  selectDistrictStationCount,
  useMapStore,
} from "@/stores/mapStore";
import type { PowerType, StationStatus } from "@/types";

const statusLabels: Record<StationStatus, string> = {
  available: "Boş",
  occupied: "Dolu",
  reserved: "Rezervasyonlu",
};

export function FilterBar() {
  const filters = useMapStore((s) => s.filters);
  const selectedDistrict = useMapStore((s) => s.selectedDistrict);
  const phase = useMapStore((s) => s.phase);
  const filteredCount = useFilteredStationCount();
  const districtTotal = useMapStore(selectDistrictStationCount);
  const togglePower = useMapStore((s) => s.togglePowerFilter);
  const toggleStatus = useMapStore((s) => s.toggleStatusFilter);

  const hasFilters =
    filters.powerTypes.length > 0 || filters.statuses.length > 0;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="font-display text-base font-semibold text-foreground">
          İstasyon filtreleri
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-foreground-subtle">
          Haritadaki pinleri daraltın. Hiç seçili değilse tüm demo istasyonlar
          görünür.
        </p>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
          Güç tipi
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_POWER.map((type) => (
            <Chip
              key={type}
              label={type}
              active={filters.powerTypes.includes(type)}
              onClick={() => togglePower(type as PowerType)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
          Durum
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_STATUS.map((status) => (
            <Chip
              key={status}
              label={statusLabels[status]}
              active={filters.statuses.includes(status)}
              onClick={() => toggleStatus(status)}
              variant={status === "available" ? "green" : "lavender"}
            />
          ))}
        </div>
      </div>

      {phase === "district" && districtTotal > 0 && (
        <p className="rounded-lg border border-glass-border bg-surface-container px-3 py-2 font-mono text-[11px] text-foreground-muted">
          Haritada{" "}
          <span className="text-secondary-text">{filteredCount}</span> / {districtTotal}{" "}
          istasyon
        </p>
      )}

      {hasFilters && filteredCount === 0 && phase === "district" && (
        <p className="text-xs text-status-occupied">
          Bu filtreyle eşleşen istasyon yok. Başka bir filtre deneyin veya seçimi
          kaldırın.
        </p>
      )}
    </div>
  );
}
