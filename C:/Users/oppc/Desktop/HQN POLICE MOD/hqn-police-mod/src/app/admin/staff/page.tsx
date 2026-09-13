"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { staffMembers as initial } from "@/data/staff";
import { getRoleLabel } from "@/utils/format";
import { UserPlus } from "lucide-react";

export default function StaffAdmin() {
  const [staff] = useState(initial);

  return (
    <AdminShell title="إدارة الفريق">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#6B6558] text-sm">{staff.length} عضو</p>
        <button className="flex items-center gap-2 btn-gold px-4 py-2 rounded-xl text-sm font-bold">
          <UserPlus size={16} />
          <span>إضافة عضو</span>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {staff.map((member) => {
          const role = getRoleLabel(member.role);
          return (
            <GlassCard key={member.id} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center text-xl font-black text-[#C9A84C]">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[#F5F0E8] font-bold text-sm">{member.nameAr}</p>
                  <p className={`text-xs font-semibold ${role.color}`}>{role.label}</p>
                </div>
              </div>
              <div className="text-[#5A5045] text-xs mb-3">@{member.discord}</div>
              <div className="flex gap-2">
                <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-all">
                  تعديل
                </button>
                <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                  إزالة
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </AdminShell>
  );
}
