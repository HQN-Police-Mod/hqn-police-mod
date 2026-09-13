import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import { Shield, Users, Star, Zap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  {
    icon: Shield,
    title: "أنظمة أمنية واقعية",
    description: "منظومة أمنية مبنية على الواقع، من إجراءات التوقيف حتى التحقيق الجنائي.",
  },
  {
    icon: Users,
    title: "مجتمع متماسك",
    description: "مجتمع من اللاعبين المحترفين الملتزمين بمعايير اللعب العالية.",
  },
  {
    icon: Star,
    title: "إدارة محترفة",
    description: "فريق إداري خبير يضمن بيئة عادلة ومنظمة لجميع اللاعبين.",
  },
  {
    icon: Zap,
    title: "تجربة لا مثيل لها",
    description: "تصميم فريد يجمع التراث السعودي مع أحدث تقنيات الـ Roleplay.",
  },
];

export function AboutPreview() {
  return (
    <section className="py-20 px-4 bg-dots" style={{ backgroundAttachment: "local" }}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          badge="عن السيرفر"
          title="لماذا HQN POLICE MOD؟"
          subtitle="سيرفر يختلف عن كل ما سبق — تصميم سعودي أمني أصيل مع رولبلاي احترافي"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {features.map((f, i) => (
            <GlassCard key={i} className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
                <f.icon size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-[#F5F0E8] font-bold text-base mb-2">{f.title}</h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">{f.description}</p>
            </GlassCard>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/about"
            className="btn-outline-gold px-8 py-3 rounded-xl font-semibold inline-block"
          >
            اقرأ المزيد عن السيرفر
          </Link>
        </div>
      </div>
    </section>
  );
}
