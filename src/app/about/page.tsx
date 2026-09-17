import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Shield, Users, Star, Target, BookOpen, Award } from "lucide-react";
import Image from "next/image";
import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "عن السيرفر",
  description: "تعرف على HQN POLICE MOD — منظومة police roleplay سعودية احترافية",
};

const pillars = [
  {
    icon: Shield,
    title: "الواقعية",
    desc: "كل إجراء أمني مبني على الواقع. من طريقة التوقيف إلى التحقيق الجنائي.",
  },
  {
    icon: Target,
    title: "التنظيم",
    desc: "هيكل تنظيمي واضح لكل قطاع مع تسلسل قيادي محترم وأنظمة مكتوبة.",
  },
  {
    icon: Users,
    title: "المجتمع",
    desc: "مجتمع من اللاعبين المحترفين الذين يرفعون مستوى الرولبلاي.",
  },
  {
    icon: Star,
    title: "جودة الإدارة",
    desc: "فريق إداري خبير يعمل لضمان بيئة عادلة ومنظمة لجميع اللاعبين.",
  },
  {
    icon: BookOpen,
    title: "الأنظمة الأمنية",
    desc: "منظومة متكاملة تحاكي الأجهزة الأمنية الحقيقية بتفاصيل دقيقة.",
  },
  {
    icon: Award,
    title: "تجربة Police Mod",
    desc: "أفضل تجربة Police Mod في المنطقة العربية بهوية سعودية أصيلة.",
  },
];

const timeline = [
  { year: "2024", title: "تأسيس HQN", desc: "انطلاق الفكرة وبناء الأساس" },
  { year: "2024", title: "الإطلاق الرسمي", desc: "فتح أبواب السيرفر لأول لاعب" },
  { year: "2025", title: "التوسع", desc: "إضافة قطاعات جديدة وتحديثات كبرى" },
  { year: "2026", title: "اليوم", desc: "مجتمع متنامٍ ومنظومة أمنية متكاملة" },
];

export default function AboutPage() {
  return (
    <PageLayout>
      {/* Page Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">عن السيرفر</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4">
            <span className="gold-text">HQN POLICE MOD</span>
          </h1>
          <p className="text-[#8A8070] text-lg leading-relaxed">
            {siteConfig.SERVER_DESCRIPTION}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Main Description */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20 items-center">
          <div>
            <h2 className="heading-ar text-2xl md:text-3xl font-bold text-[#F5F0E8] mb-6">
              ما هو <span className="gold-text">HQN POLICE MOD</span>؟
            </h2>
            <div className="space-y-4 text-[#8A8070] text-base leading-relaxed">
              <p>
                HQN Police Mod هو سيرفر FiveM سعودي متخصص في تجربة Police Roleplay
                الاحترافية. نحن لسنا مجرد سيرفر عادي — نحن منظومة أمنية متكاملة
                تجمع بين أصالة التراث السعودي وأحدث معايير الرولبلاي.
              </p>
              <p>
                يضم السيرفر ستة قطاعات أمنية متخصصة، كل منها بهيكل تنظيمي واضح
                ورتب محددة ومهام واقعية. من الأمن العام إلى المباحث وصولاً إلى قوات
                التدخل الخاص.
              </p>
              <p>
                الهدف الأساسي هو تقديم تجربة roleplay أمنية لا مثيل لها في
                المنطقة العربية، مع الحفاظ على الهوية السعودية الأصيلة في كل
                تفصيل.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/sectors" className="btn-gold px-6 py-3 rounded-xl font-bold">
                القطاعات
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-[#C9A84C]/8 blur-3xl" />
              <Image
                src="/HQN.png"
                alt="HQN POLICE MOD"
                fill
                className="object-contain relative z-10"
              />
            </div>
          </div>
        </div>

        {/* Pillars */}
        <SectionHeader
          badge="قيمنا"
          title="على ماذا نبني؟"
          subtitle="ستة محاور أساسية تُشكّل هوية HQN POLICE MOD"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {pillars.map((p, i) => (
            <GlassCard key={i} className="p-6" hover>
              <div className="w-12 h-12 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center mb-4">
                <p.icon size={22} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-[#F5F0E8] font-bold text-lg mb-2">{p.title}</h3>
              <p className="text-[#6B6558] text-sm leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>

      </div>
    </PageLayout>
  );
}
