import { PageLayout } from "@/components/layout/PageLayout";
import { staffMembers, boardMembers } from "@/data/staff";
import { OwnerCard } from "@/components/sections/OwnerCard";
import { GlassCard } from "@/components/ui/GlassCard";
import { Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أصحاب السيرفر",
  description: "تعرف على أصحاب وإدارة سيرفر HQN POLICE MOD",
};

export default function StaffPage() {
  const owners = staffMembers.filter((s) => s.isActive);

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">القيادة</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4 gold-text">
            أصحاب السيرفر
          </h1>
          <p className="text-[#8A8070] text-lg">
            أصحاب سيرفر HQN Police Mod
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">

        {/* Owners */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {owners.map((member) => (
            <OwnerCard key={member.id} member={member} />
          ))}
        </div>

        {/* Board Members */}
        <div>
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
              <Users size={18} className="text-[#C9A84C]" />
            </div>
            <div>
              <h2 className="heading-ar text-xl font-black text-[#F5F0E8]">المجلس الإداري</h2>
              <p className="text-[#5A5045] text-xs">{boardMembers.length} أعضاء</p>
            </div>
          </div>

          {/* Divider */}
          <div className="section-divider mb-6" />

          {/* Board Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {boardMembers.map((member) => (
              <GlassCard key={member.id} className="p-5 flex items-center gap-4 relative overflow-hidden" hover>
                <div className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.3),transparent)" }} />

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                  <span className="text-[#C9A84C] font-black text-lg">
                    {member.nameAr.charAt(0)}
                  </span>
                </div>

                {/* Info */}
                <div>
                  <h3 className="text-[#F5F0E8] font-bold text-base">{member.nameAr}</h3>
                  <p className="text-[#C9A84C]/70 text-xs font-medium mt-0.5">
                    عضو في المجلس الإداري
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
