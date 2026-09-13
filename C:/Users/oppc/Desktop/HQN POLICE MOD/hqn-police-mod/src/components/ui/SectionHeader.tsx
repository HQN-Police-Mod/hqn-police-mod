import { cn } from "@/utils/cn";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  center?: boolean;
  className?: string;
}

export function SectionHeader({ title, subtitle, badge, center = true, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", center && "text-center", className)}>
      {badge && (
        <span className="badge-gold mb-4 inline-block">{badge}</span>
      )}
      <h2 className="heading-ar text-3xl md:text-4xl font-bold gold-text mb-4">{title}</h2>
      {subtitle && (
        <p className="text-[#B0A890] text-lg max-w-2xl leading-relaxed" style={center ? { margin: "0 auto" } : {}}>
          {subtitle}
        </p>
      )}
      <div className="section-divider mt-6 max-w-xs" style={center ? { margin: "1.5rem auto 0" } : {}} />
    </div>
  );
}
