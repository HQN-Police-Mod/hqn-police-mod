import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { sectors } from "@/data/sectors";
import { Shield, Search, Target, Car } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "القطاعات",
  description: "تعرف على قطاعات HQN POLICE MOD الأمنية",
};

const iconMap: Record<string, React.ElementType> = {
  Shield,
  Search,
  Target,
  Car,
};

export default function SectorsPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">القطاعات</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4 gold-text">
            الأجهزة الأمنية
          </h1>
          <p className="text-[#8A8070] text-lg">
            منظومة أمنية متكاملة من {sectors.length} قطاعات متخصصة — اختر مسارك الأمني
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <SectionHeader
          badge="القطاعات"
          title="اختر قطاعك"
          subtitle="كل قطاع له هويته المستقلة ورتبه الواضحة ومهامه المحددة"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sectors.map((sector) => {
            const IconComp = iconMap[sector.icon] ?? Shield;
            const c = sector.color; // كود اللون المحدد لكل قطاع

            return (
              <GlassCard key={sector.id} className="p-6 flex flex-col overflow-hidden relative" hover>

                {/* شريط اللون العلوي */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-xl"
                  style={{ background: c }}
                />

                {/* Header — icon + badge فقط */}
                <div className="flex items-center justify-between mb-4 mt-2">
                  {/* أيقونة بلون القطاع */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${c}18`,
                      border: `1px solid ${c}40`,
                    }}
                  >
                    <IconComp size={20} style={{ color: c }} />
                  </div>
                  <Badge variant={sector.isOpen ? "green" : "red"}>
                    {sector.isOpen ? "مفتوح" : "مغلق"}
                  </Badge>
                </div>

                {/* Description — hidden, replaced by large name */}
                {/* اسم القطاع الكبير يملأ المساحة */}
                <div className="flex-1 flex items-center justify-center py-6">
                  <h2
                    className="heading-ar text-2xl font-black text-center leading-relaxed"
                    style={{ color: c }}
                  >
                    {sector.nameAr}
                  </h2>
                </div>

                {/* Footer */}
                <div
                  className="flex items-center justify-between pt-4"
                  style={{ borderTop: `1px solid ${c}20` }}
                >
                  {sector.memberCount && (
                    <span className="text-[#5A5045] text-xs">
                      {sector.memberCount} عضو
                    </span>
                  )}
                  {!sector.isOpen && (
                    <span className="text-[#5A5045] text-xs mr-auto">التقديم مغلق حالياً</span>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
