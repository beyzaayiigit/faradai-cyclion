import { cn } from "@/lib/cn";

type Status = "available" | "occupied" | "reserved";

const styles: Record<Status, string> = {
  available: "bg-secondary/20 text-secondary-text border-secondary/40",
  occupied: "bg-status-occupied/20 text-status-occupied border-status-occupied/40",
  reserved: "bg-status-reserved/20 text-status-reserved border-status-reserved/40",
};

const labels: Record<Status, string> = {
  available: "Boş",
  occupied: "Dolu",
  reserved: "Rezervasyonlu",
};

export function Badge({ status }: { status: Status }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-widest",
        styles[status],
      )}
    >
      {labels[status]}
    </span>
  );
}
