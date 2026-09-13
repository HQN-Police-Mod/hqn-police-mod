"use client";

import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";
import type { StaffMember } from "@/types";

interface Props {
  member: StaffMember;
}

export function OwnerCard({ member }: Props) {
  const isOwner = member.role === "owner";

  return (
    <GlassCard
      className="p-8 text-center relative overflow-hidden border-[#C9A84C]/25"
      hover
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.07),transparent_65%)] pointer-events-none" />

      <div className="relative z-10">
        {/* Avatar — HQN Logo */}
        <div
          className={`w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden border-2 flex items-center justify-center bg-[#0D0D10] ${
            isOwner ? "border-[#C9A84C]/60" : "border-[#C9A84C]/30"
          }`}
        >
          <Image
            src="/HQN.png"
            alt="HQN"
            width={96}
            height={96}
            className="object-contain p-1"
          />
        </div>

        {/* Name */}
        <h2 className="heading-ar text-xl font-black text-[#F5F0E8] mb-2">
          {member.nameAr}
        </h2>

        {/* Position */}
        <p className={`font-bold text-sm ${isOwner ? "text-[#C9A84C]" : "text-[#B0A890]"}`}>
          {member.positionAr}
        </p>
      </div>
    </GlassCard>
  );
}
