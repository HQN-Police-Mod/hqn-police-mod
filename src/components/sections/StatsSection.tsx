"use client";

import { Users, Layers, Award, Wifi } from "lucide-react";
import { useServerStatus } from "@/hooks/useServerStatus";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/config/site";
import { sectors } from "@/data/sectors";

export function StatsSection() {
  const { status, loading } = useServerStatus();

  const onlineSectors = sectors.filter((s) => s.isOpen).length;

  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {/* Server Status */}
          <GlassCard className="p-5 text-center" hover>
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
              style={{
                background: loading
                  ? "rgba(107,101,88,0.15)"
                  : status?.online
                  ? "rgba(74,222,128,0.12)"
                  : "rgba(248,113,113,0.12)",
                border: `1px solid ${
                  loading ? "#3A3A42" : status?.online ? "#4ADE8040" : "#F8717140"
                }`,
              }}
            >
              <Wifi
                size={20}
                className={
                  loading
                    ? "text-[#6B6558]"
                    : status?.online
                    ? "text-green-400"
                    : "text-red-400"
                }
              />
            </div>

            <div className="flex items-center justify-center gap-1.5 mb-1">
              {!loading && status && (
                <span
                  className={`w-2 h-2 rounded-full inline-block shrink-0 ${
                    status.online
                      ? "status-dot-online animate-pulse"
                      : "status-dot-offline"
                  }`}
                />
              )}
              <span
                className="text-xl font-black"
                style={{
                  color: loading
                    ? "#6B6558"
                    : status?.online
                    ? "#4ADE80"
                    : "#F87171",
                }}
              >
                {loading ? "..." : status?.online ? "شغّال" : "متوقف"}
              </span>
            </div>

            <p className="text-[#F5F0E8] text-sm font-semibold mb-0.5">حالة السيرفر</p>
            <p className="text-[#5A5045] text-xs">مباشر</p>
          </GlassCard>

          {/* Players */}
          <GlassCard className="p-5 text-center" hover>
            <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-3">
              <Users size={20} className="text-[#C9A84C]" />
            </div>

            <p className="text-xl font-black text-[#C9A84C] mb-1">
              {loading
                ? "..."
                : status
                ? `${status.players}/${status.maxPlayers}`
                : "0"}
            </p>
            <p className="text-[#F5F0E8] text-sm font-semibold mb-0.5">اللاعبون الآن</p>
            <p className="text-[#5A5045] text-xs">لاعب متصل</p>
          </GlassCard>

          {/* Sectors */}
          <GlassCard className="p-5 text-center" hover>
            <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-3">
              <Layers size={20} className="text-[#C9A84C]" />
            </div>
            <p className="text-xl font-black text-[#C9A84C] mb-1">{onlineSectors}</p>
            <p className="text-[#F5F0E8] text-sm font-semibold mb-0.5">القطاعات</p>
            <p className="text-[#5A5045] text-xs">قطاع مفتوح</p>
          </GlassCard>

          {/* Discord */}
          <GlassCard className="p-5 text-center" hover>
            <div className="w-10 h-10 rounded-lg bg-[#C9A84C]/12 border border-[#C9A84C]/25 flex items-center justify-center mx-auto mb-3">
              <Award size={20} className="text-[#C9A84C]" />
            </div>
            <p className="text-xl font-black text-[#C9A84C] mb-1">9K</p>
            <p className="text-[#F5F0E8] text-sm font-semibold mb-0.5">Discord</p>
            <p className="text-[#5A5045] text-xs">عضو في المجتمع</p>
          </GlassCard>

        </div>

        {/* Server connect CTA */}
        <div className="mt-5 text-center">
          <a
            href={siteConfig.SERVER_CONNECT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs text-[#5A5045] hover:text-[#C9A84C] transition-colors font-mono"
          >
            <span>cfx.re/join/{siteConfig.SERVER_CFX_CODE}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
