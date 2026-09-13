"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { rulesData as initial } from "@/data/rules";
import { ChevronDown, Plus, Pencil } from "lucide-react";
import { cn } from "@/utils/cn";

export default function RulesAdmin() {
  const [categories] = useState(initial);
  const [openCat, setOpenCat] = useState<string | null>(null);

  return (
    <AdminShell title="إدارة القوانين">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#6B6558] text-sm">{categories.length} فئات</p>
        <button className="flex items-center gap-2 btn-gold px-4 py-2 rounded-xl text-sm font-bold">
          <Plus size={16} />
          <span>فئة جديدة</span>
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <GlassCard key={cat.id} className="overflow-hidden">
            <button
              onClick={() => setOpenCat(openCat === cat.id ? null : cat.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-[#C9A84C]/5 transition-colors"
            >
              <div className="text-right">
                <p className="text-[#F5F0E8] font-bold">{cat.nameAr}</p>
                <p className="text-[#5A5045] text-xs">{cat.rules.length} قواعد</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-1.5 text-[#5A5045] hover:text-[#C9A84C] transition-colors">
                  <Pencil size={14} />
                </button>
                <ChevronDown
                  size={18}
                  className={cn("text-[#C9A84C] transition-transform", openCat === cat.id && "rotate-180")}
                />
              </div>
            </button>

            {openCat === cat.id && (
              <div className="px-5 pb-5 space-y-2 border-t border-[#2A2A32]">
                {cat.rules.map((rule) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#1A1A1F] border border-[#2A2A32]"
                  >
                    <div className="text-right">
                      <p className="text-[#F5F0E8] text-sm font-semibold">{rule.titleAr}</p>
                      <p className="text-[#5A5045] text-xs truncate max-w-xs">{rule.description.slice(0, 60)}...</p>
                    </div>
                    <button className="p-1.5 text-[#5A5045] hover:text-[#C9A84C] transition-colors shrink-0">
                      <Pencil size={14} />
                    </button>
                  </div>
                ))}
                <button className="w-full mt-2 py-2 rounded-xl border border-dashed border-[#C9A84C]/20 text-[#C9A84C]/60 hover:text-[#C9A84C] hover:border-[#C9A84C]/40 text-sm transition-colors">
                  + إضافة قاعدة
                </button>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </AdminShell>
  );
}
