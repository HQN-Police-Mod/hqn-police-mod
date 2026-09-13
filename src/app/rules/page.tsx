"use client";

import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { rulesData } from "@/data/rules";
import { ChevronDown, BookOpen, Users, Shield, MessageSquare, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/utils/cn";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Users, Shield, MessageSquare,
};

const severityStyles = {
  info: { border: "border-blue-500/20", bg: "bg-blue-500/5", icon: Info, color: "text-blue-400" },
  warning: { border: "border-yellow-500/20", bg: "bg-yellow-500/5", icon: AlertTriangle, color: "text-yellow-400" },
  critical: { border: "border-red-500/20", bg: "bg-red-500/5", icon: Shield, color: "text-red-400" },
};

export default function RulesPage() {
  const [openCategory, setOpenCategory] = useState<string | null>(rulesData[0]?.id ?? null);
  const [openRule, setOpenRule] = useState<string | null>(null);

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">القوانين</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4 gold-text">
            أنظمة السيرفر
          </h1>
          <p className="text-[#8A8070] text-lg">
            اقرأ وافهم جميع الأنظمة قبل الانضمام — الجهل بالنظام لا يُعدّ عذراً
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <SectionHeader
          badge="الأنظمة"
          title="قوانين HQN POLICE MOD"
          subtitle="منظمة حسب الفئات — اضغط لفتح القانون"
        />

        {/* Categories accordion */}
        <div className="space-y-4">
          {rulesData.map((category) => {
            const CategoryIcon = iconMap[category.icon] ?? BookOpen;
            const isOpen = openCategory === category.id;

            return (
              <GlassCard key={category.id} className="overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() =>
                    setOpenCategory(isOpen ? null : category.id)
                  }
                  className="w-full flex items-center justify-between p-5 text-right hover:bg-[#C9A84C]/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                      <CategoryIcon size={18} className="text-[#C9A84C]" />
                    </div>
                    <div className="text-right">
                      <h3 className="text-[#F5F0E8] font-bold">{category.nameAr}</h3>
                      <p className="text-[#5A5045] text-xs">
                        {category.rules.length} قاعدة
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={cn(
                      "text-[#C9A84C] transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                {/* Rules list */}
                {isOpen && (
                  <div className="px-5 pb-5 space-y-3 border-t border-[#2A2A32]">
                    {category.rules.map((rule) => {
                      const severity = severityStyles[rule.severity];
                      const SeverityIcon = severity.icon;
                      const isRuleOpen = openRule === rule.id;

                      return (
                        <div
                          key={rule.id}
                          className={cn(
                            "rounded-xl border overflow-hidden mt-3",
                            severity.border,
                            severity.bg
                          )}
                        >
                          <button
                            onClick={() =>
                              setOpenRule(isRuleOpen ? null : rule.id)
                            }
                            className="w-full flex items-center justify-between p-4 text-right"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[#5A5045] font-mono text-xs font-bold w-6 text-center">
                                {String(rule.number).padStart(2, "0")}
                              </span>
                              <SeverityIcon size={15} className={cn(severity.color, "shrink-0")} />
                              <span className="text-[#F5F0E8] font-semibold text-sm">
                                {rule.titleAr}
                              </span>
                            </div>
                            <ChevronDown
                              size={16}
                              className={cn(
                                "text-[#6B6558] transition-transform duration-200 shrink-0",
                                isRuleOpen && "rotate-180"
                              )}
                            />
                          </button>
                          {isRuleOpen && (
                            <div className="px-4 pb-4 text-[#8A8070] text-sm leading-relaxed border-t border-current/10 pt-3">
                              {rule.description}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-10 glass-card rounded-xl p-5 border border-yellow-500/20">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[#F5F0E8] font-bold mb-1">تنبيه مهم</h4>
              <p className="text-[#8A8070] text-sm leading-relaxed">
                مخالفة أي من هذه الأنظمة تعرضك للإجراءات الإدارية بدءاً من التحذير وصولاً إلى
                الحظر الدائم. الإدارة تتخذ قراراتها بناءً على الأدلة والسياق.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
