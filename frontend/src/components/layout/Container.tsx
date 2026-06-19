import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--width-container)] px-6 md:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
