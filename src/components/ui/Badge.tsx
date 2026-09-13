import { cn } from "@/utils/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "green" | "red" | "blue" | "gray";
  className?: string;
}

const variants = {
  gold: "bg-[#C9A84C]/15 text-[#E8C96A] border border-[#C9A84C]/30",
  green: "bg-green-500/15 text-green-400 border border-green-500/30",
  red: "bg-red-500/15 text-red-400 border border-red-500/30",
  blue: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  gray: "bg-white/10 text-gray-300 border border-white/15",
};

export function Badge({ children, variant = "gold", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
