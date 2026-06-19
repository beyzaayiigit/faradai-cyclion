import { cn } from "@/lib/cn";

type SectionTone = "default" | "muted" | "accent";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
  /** Harita: sabit yükseklik, flex zinciri */
  locked?: boolean;
  /** Header altında tam viewport; içerik dikey ortalı */
  fillViewport?: boolean;
}

const toneClasses: Record<SectionTone, string> = {
  default: "section-wash",
  muted: "section-muted",
  accent: "section-accent",
};

export function Section({
  id,
  children,
  className,
  tone = "default",
  locked = false,
  fillViewport = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-[var(--header-height)] overflow-x-hidden",
        locked &&
          "flex h-[var(--section-viewport)] flex-col overflow-hidden",
        fillViewport &&
          "flex min-h-[var(--section-viewport)] flex-col justify-center py-10 md:py-14",
        !locked &&
          !fillViewport &&
          "flex flex-col justify-start py-12 md:py-16",
        toneClasses[tone],
        className,
      )}
    >
      {locked ? (
        <div className="flex h-full min-h-0 w-full flex-1 flex-col">{children}</div>
      ) : (
        children
      )}
    </section>
  );
}
