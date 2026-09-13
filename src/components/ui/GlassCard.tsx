import { cn } from "@/utils/cn";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className, hover = false, glow = false }: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl",
        hover && "glass-card-hover cursor-pointer",
        glow && "gold-glow",
        className
      )}
    >
      {children}
    </div>
  );
}
