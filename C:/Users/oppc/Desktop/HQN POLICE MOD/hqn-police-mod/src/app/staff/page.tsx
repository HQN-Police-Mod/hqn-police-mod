import { PageLayout } from "@/components/layout/PageLayout";
import { staffMembers } from "@/data/staff";
import { OwnerCard } from "@/components/sections/OwnerCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "أصحاب السيرفر",
  description: "تعرف على أصحاب سيرفر HQN POLICE MOD",
};

export default function StaffPage() {
  const owners = staffMembers.filter((s) => s.isActive);

  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">أصحاب السيرفر</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4 gold-text">
            أصحاب السيرفر
          </h1>
          <p className="text-[#8A8070] text-lg">
            أصحاب سيرفر HQN Police Mod
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {owners.map((member) => (
            <OwnerCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
