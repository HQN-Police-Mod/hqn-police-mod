import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { ExternalLink, Users, Bell, MessageSquare, Shield } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discord",
  description: "انضم إلى مجتمع HQN POLICE MOD على Discord",
};

const channels = [
  { icon: Bell, name: "الأخبار والإعلانات", desc: "آخر أخبار السيرفر والتحديثات" },
  { icon: MessageSquare, name: "النقاش العام", desc: "تحدث مع أعضاء المجتمع" },
  { icon: Shield, name: "الدعم الفني", desc: "احصل على مساعدة من فريق الدعم" },
  { icon: Users, name: "نقاشات الرولبلاي", desc: "شارك تجاربك وأفكارك" },
];

export default function DiscordPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-32 pb-20 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          {/* Discord Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-2xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
              </svg>
            </div>
          </div>

          <span className="badge-gold mb-4 inline-block">Discord</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4">
            <span className="text-[#F5F0E8]">انضم إلى مجتمع </span>
            <span className="gold-text">HQN</span>
          </h1>
          <p className="text-[#8A8070] text-lg mb-8">
            500+ عضو ينتظرونك — تابع أخبار السيرفر وتواصل مع المجتمع
          </p>

          <a
            href={siteConfig.DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg"
          >
            <ExternalLink size={20} />
            <span>انضم الآن</span>
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {[
            { label: "الأعضاء", value: "500+", icon: Users },
            { label: "أونلاين الآن", value: "100+", icon: Bell },
            { label: "القنوات", value: "20+", icon: MessageSquare },
          ].map((stat, i) => (
            <GlassCard key={i} className="p-5 text-center" hover>
              <stat.icon size={24} className="text-[#C9A84C] mx-auto mb-2" />
              <div className="text-2xl font-black text-[#E8C96A] mb-1">{stat.value}</div>
              <div className="text-[#6B6558] text-sm">{stat.label}</div>
            </GlassCard>
          ))}
        </div>

        {/* Channels preview */}
        <h2 className="heading-ar text-2xl font-bold text-center text-[#F5F0E8] mb-8">
          ماذا ستجد في الـ Discord؟
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          {channels.map((ch, i) => (
            <GlassCard key={i} className="p-5 flex items-start gap-4" hover>
              <div className="w-10 h-10 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 flex items-center justify-center shrink-0">
                <ch.icon size={18} className="text-[#5865F2]" />
              </div>
              <div>
                <h3 className="text-[#F5F0E8] font-bold text-sm mb-1">#{ch.name}</h3>
                <p className="text-[#6B6558] text-xs">{ch.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <a
            href={siteConfig.DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base"
          >
            <ExternalLink size={18} />
            <span>discord.gg/{siteConfig.DISCORD_INVITE}</span>
          </a>
        </div>
      </div>
    </PageLayout>
  );
}
