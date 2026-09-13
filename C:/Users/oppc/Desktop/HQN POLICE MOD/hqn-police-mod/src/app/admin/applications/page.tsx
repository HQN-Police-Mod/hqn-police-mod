"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { getStatusLabel } from "@/utils/format";

// Mock data for demo — replace with real API calls
const mockApplications = [
  {
    id: "1",
    name: "محمد العمري",
    age: 22,
    discord: "m_omari",
    sector: "general-security",
    rank: "عنصر",
    experience: "لدي خبرة سنتين في سيرفرات FiveM الأمنية",
    reason: "أريد الانضمام لأنني أعتقد أنني سأضيف قيمة للسيرفر",
    status: "pending",
    createdAt: "2026-09-10T10:00:00Z",
  },
  {
    id: "2",
    name: "عبدالله السعدي",
    age: 19,
    discord: "a_saadi",
    sector: "criminal-investigation",
    rank: "محقق",
    experience: "خبرة في أجهزة التحقيق والرولبلاي الجنائي",
    reason: "أريد تطوير مهاراتي في التحقيق",
    status: "review",
    createdAt: "2026-09-11T14:30:00Z",
  },
];

export default function ApplicationsAdmin() {
  const [applications, setApplications] = useState(mockApplications);
  const [selected, setSelected] = useState<typeof mockApplications[0] | null>(null);

  const updateStatus = (id: string, status: string) => {
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    if (selected?.id === id) {
      setSelected((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const statusBadge = (status: string) => {
    const info = getStatusLabel(status);
    const variant = status === "accepted" ? "green" : status === "rejected" ? "red" : status === "review" ? "blue" : "gray";
    return <Badge variant={variant}>{info.label}</Badge>;
  };

  return (
    <AdminShell title="طلبات التقديم">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* List */}
        <div className="lg:col-span-1 space-y-3">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#F5F0E8] font-bold">الطلبات ({applications.length})</h2>
          </div>
          {applications.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelected(app)}
              className={`w-full text-right glass-card rounded-xl p-4 transition-all hover:border-[#C9A84C]/30 ${
                selected?.id === app.id ? "border-[#C9A84C]/40 bg-[#C9A84C]/5" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#F5F0E8] font-semibold text-sm">{app.name}</span>
                {statusBadge(app.status)}
              </div>
              <p className="text-[#5A5045] text-xs">{app.sector} — {app.rank}</p>
              <p className="text-[#3A3A42] text-xs mt-1">
                {new Date(app.createdAt).toLocaleDateString("ar-SA")}
              </p>
            </button>
          ))}
          {applications.length === 0 && (
            <div className="text-center py-10 text-[#5A5045]">لا توجد طلبات</div>
          )}
        </div>

        {/* Detail */}
        <div className="lg:col-span-2">
          {selected ? (
            <GlassCard className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[#F5F0E8] font-bold text-xl">{selected.name}</h3>
                  <p className="text-[#5A5045] text-sm mt-1">
                    عمره {selected.age} — Discord: @{selected.discord}
                  </p>
                </div>
                {statusBadge(selected.status)}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { label: "القطاع", value: selected.sector },
                  { label: "الرتبة المطلوبة", value: selected.rank },
                ].map((f, i) => (
                  <div key={i} className="bg-[#1A1A1F] rounded-xl p-3">
                    <p className="text-[#5A5045] text-xs mb-1">{f.label}</p>
                    <p className="text-[#F5F0E8] font-medium text-sm">{f.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-[#C9A84C] text-xs font-semibold uppercase mb-2">الخبرة</p>
                  <p className="text-[#8A8070] text-sm leading-relaxed bg-[#1A1A1F] rounded-xl p-3">
                    {selected.experience}
                  </p>
                </div>
                <div>
                  <p className="text-[#C9A84C] text-xs font-semibold uppercase mb-2">سبب التقديم</p>
                  <p className="text-[#8A8070] text-sm leading-relaxed bg-[#1A1A1F] rounded-xl p-3">
                    {selected.reason}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-[#2A2A32]">
                <button
                  onClick={() => updateStatus(selected.id, "accepted")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-green-600/80 hover:bg-green-600 text-white transition-colors"
                >
                  ✅ قبول
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "review")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-blue-600/80 hover:bg-blue-600 text-white transition-colors"
                >
                  🔍 للمراجعة
                </button>
                <button
                  onClick={() => updateStatus(selected.id, "rejected")}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                >
                  ❌ رفض
                </button>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-10 text-center">
              <p className="text-[#5A5045]">اختر طلباً من القائمة لعرض التفاصيل</p>
            </GlassCard>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
