import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function Card({ children, className, glow }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-xl p-6",
        glow && "shadow-[0_0_20px_var(--shadow-primary)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
