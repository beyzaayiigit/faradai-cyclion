"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, LogIn, LogOut, Truck, X } from "lucide-react";
import { Badge, Button } from "@/components/ui";
import { useSectionInView } from "@/hooks/useSectionInView";
import { useAuthStore } from "@/stores/authStore";
import { useMapStore } from "@/stores/mapStore";
import { LoginModal } from "./LoginModal";
import { cn } from "@/lib/cn";

export function StationDrawer() {
  const mapInView = useSectionInView("map", 0.15);
  const drawerOpen = useMapStore((s) => s.drawerOpen);
  const station = useMapStore((s) => s.selectedStation);
  const setDrawerOpen = useMapStore((s) => s.setDrawerOpen);
  const selectStation = useMapStore((s) => s.selectStation);
  const simulateReservation = useMapStore((s) => s.simulateReservation);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const userEmail = useAuthStore((s) => s.userEmail);
  const logout = useAuthStore((s) => s.logout);

  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setDrawerOpen(false);
        selectStation(null);
        setLoginOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setDrawerOpen, selectStation]);

  const showDrawer = mapInView && drawerOpen && station !== null;

  return (
    <>
      <LoginModal
        open={loginOpen && mapInView}
        onClose={() => setLoginOpen(false)}
      />
      <AnimatePresence>
        {showDrawer && station && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => {
                setDrawerOpen(false);
                selectStation(null);
              }}
              aria-hidden
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="station-drawer-title"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className={cn(
                "z-50 flex flex-col border-l border-glass-border glass-panel",
                "absolute inset-y-0 right-0 w-full max-w-[400px]",
                "max-lg:fixed max-lg:inset-0 max-lg:max-w-none",
              )}
            >
              <div className="flex items-center justify-between border-b border-glass-border p-4">
                <h2
                  id="station-drawer-title"
                  className="font-display text-lg font-semibold"
                >
                  İstasyon Detayı
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setDrawerOpen(false);
                    selectStation(null);
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-surface-container"
                  aria-label="Kapat"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                <p className="mb-4 rounded-lg border border-glass-border bg-surface-container/50 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                  {station.province === "ankara"
                    ? "Ankara · gerçek istasyon verisi"
                    : "Pilot demo · MobiQ hub simülasyonu"}
                </p>

                <Badge status={station.status} />
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {station.name}
                </h3>

                {station.operator && (
                  <p className="mt-2 text-sm text-foreground-muted">
                    Operatör:{" "}
                    <span className="text-foreground">{station.operator}</span>
                  </p>
                )}

                <dl className="mt-6 space-y-4">
                  {station.address && (
                    <div>
                      <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                        Adres
                      </dt>
                      <dd className="text-sm leading-relaxed text-foreground-muted">
                        {station.address}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                      Kuyruk tahmini
                    </dt>
                    <dd className="font-mono text-lg text-secondary-text">
                      {station.queueMinutes} dk
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                      Güç
                    </dt>
                    <dd className="font-mono text-lg">{station.powerKw} kW</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-foreground-subtle">
                      Tip
                    </dt>
                    <dd className="text-sm">{station.powerType}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck
                      size={18}
                      className={
                        station.truckCompatible
                          ? "text-secondary-text"
                          : "text-foreground-subtle"
                      }
                    />
                    <span className="text-sm">
                      Tır girişi:{" "}
                      {station.truckCompatible ? (
                        <span className="inline-flex items-center gap-1 text-secondary-text">
                          Evet <Check size={14} />
                        </span>
                      ) : (
                        "Hayır"
                      )}
                    </span>
                  </div>
                  {station.truckNote && !station.truckCompatible && (
                    <p className="text-xs leading-relaxed text-foreground-subtle">
                      {station.truckNote}
                    </p>
                  )}
                </dl>

                {station.status !== "reserved" && (
                  <div className="mt-8 space-y-3">
                    <p className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2 text-xs leading-relaxed text-foreground-muted">
                      <span className="font-medium text-foreground">Rezervasyon henüz aktif değil.</span>{" "}
                      Bu bölüm yalnızca ilerideki platform deneyimini gösteren bir demo akışıdır.
                    </p>
                    {isAuthenticated ? (
                      <>
                        <p className="text-xs text-foreground-subtle">
                          Demo oturumu: {userEmail}
                        </p>
                        <Button
                          className="w-full"
                          onClick={() => simulateReservation(station.id)}
                        >
                          Demo Rezervasyon Yap
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full"
                          onClick={logout}
                        >
                          <LogOut size={16} className="mr-2 inline" />
                          Demo Oturumunu Kapat
                        </Button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-foreground-muted">
                          Rezervasyon akışını denemek için demo girişi yapabilirsiniz.
                        </p>
                        <Button
                          className="w-full"
                          onClick={() => setLoginOpen(true)}
                        >
                          <LogIn size={16} className="mr-2 inline" />
                          Demo: Giriş Yap
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
