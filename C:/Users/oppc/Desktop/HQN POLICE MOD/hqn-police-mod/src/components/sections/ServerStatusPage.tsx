"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Wifi,
  WifiOff,
  Users,
  RefreshCw,
  ExternalLink,
  Clock,
  Activity,
  Server,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { siteConfig } from "@/config/site";
import type { ServerStatus } from "@/types";

const REFRESH_INTERVAL = 30_000; // 30s

function useStatus() {
  const [data, setData] = useState<ServerStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [history, setHistory] = useState<{ time: string; players: number }[]>([]);

  const fetch_ = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/server-status", { cache: "no-store" });
      const json: ServerStatus = await res.json();
      setData(json);
      setLastFetch(new Date());
      // Keep last 10 readings for mini history
      setHistory((prev) => [
        ...prev.slice(-9),
        {
          time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
          players: json.players,
        },
      ]);
    } catch {
      /* keep previous data */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch_();
    const id = setInterval(fetch_, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, [fetch_]);

  return { data, loading, lastFetch, history, refresh: fetch_ };
}

export function ServerStatusPage() {
  const { data, loading, lastFetch, history, refresh } = useStatus();
  const [countdown, setCountdown] = useState(30);

  // Countdown to next refresh
  useEffect(() => {
    if (!lastFetch) return;
    const tick = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastFetch.getTime()) / 1000);
      setCountdown(Math.max(0, 30 - elapsed));
    }, 1000);
    return () => clearInterval(tick);
  }, [lastFetch]);

  const online = data?.online ?? false;
  const players = data?.players ?? 0;
  const maxPlayers = data?.maxPlayers ?? siteConfig.MAX_PLAYERS;
  const fillPct = maxPlayers > 0 ? Math.round((players / maxPlayers) * 100) : 0;

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-5">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 blur-xl" />
              <Image src="/HQN.png" alt="HQN" fill className="object-contain relative z-10" />
            </div>
          </div>
          <span className="badge-gold mb-4 inline-block">مباشر</span>
          <h1 className="heading-ar text-4xl font-black gold-text mb-3">حالة السيرفر</h1>
          <p className="text-[#6B6558] text-sm">
            يتحدث كل 30 ثانية تلقائياً
          </p>
        </div>

        {/* ── Main Status Card ─────────────────────── */}
        <GlassCard
          className={`p-8 mb-5 text-center relative overflow-hidden transition-all duration-500 ${
            online ? "border-green-500/20" : loading ? "" : "border-red-500/20"
          }`}
          glow={online}
        >
          {/* Background pulse when online */}
          {online && (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(74,222,128,0.06),transparent_65%)] pointer-events-none" />
          )}

          <div className="relative z-10">
            {/* Status Icon */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
                loading
                  ? "bg-[#1A1A1F] border border-[#2A2A32]"
                  : online
                  ? "bg-green-500/10 border border-green-500/25"
                  : "bg-red-500/10 border border-red-500/25"
              }`}
            >
              {loading ? (
                <RefreshCw size={32} className="text-[#5A5045] animate-spin" />
              ) : online ? (
                <Wifi size={32} className="text-green-400" />
              ) : (
                <WifiOff size={32} className="text-red-400" />
              )}
            </div>

            {/* Status Text */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {!loading && (
                <span
                  className={`w-3 h-3 rounded-full inline-block ${
                    online ? "status-dot-online animate-pulse" : "status-dot-offline"
                  }`}
                />
              )}
              <h2
                className={`heading-ar text-3xl font-black ${
                  loading ? "text-[#5A5045]" : online ? "text-green-400" : "text-red-400"
                }`}
              >
                {loading ? "جاري الفحص..." : online ? "السيرفر شغّال" : "السيرفر متوقف"}
              </h2>
            </div>

            <p className="text-[#5A5045] text-sm mb-6">
              {loading
                ? "يتصل بالسيرفر..."
                : online
                ? "السيرفر يعمل بشكل طبيعي"
                : "السيرفر غير متاح حالياً"}
            </p>

            {/* Players Bar */}
            <div className="max-w-sm mx-auto mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B6558]">اللاعبون</span>
                <span className="text-[#C9A84C] font-bold font-mono">
                  {loading ? "—" : `${players} / ${maxPlayers}`}
                </span>
              </div>
              <div className="w-full bg-[#1A1A1F] rounded-full h-3 overflow-hidden border border-[#2A2A32]">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: loading ? "0%" : `${fillPct}%`,
                    background: online
                      ? fillPct > 80
                        ? "linear-gradient(90deg,#F87171,#EF4444)"
                        : fillPct > 50
                        ? "linear-gradient(90deg,#C9A84C,#E8C96A)"
                        : "linear-gradient(90deg,#4ADE80,#22C55E)"
                      : "#3A3A42",
                  }}
                />
              </div>
              {!loading && (
                <p className="text-[#5A5045] text-xs mt-1 text-left" dir="ltr">
                  {fillPct}% full
                </p>
              )}
            </div>

            {/* Join Button */}
            <a
              href={siteConfig.SERVER_CONNECT}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-gold inline-flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm ${
                !online && !loading ? "opacity-50 pointer-events-none" : ""
              }`}
            >
              <ExternalLink size={16} />
              <span>دخول السيرفر</span>
            </a>
          </div>
        </GlassCard>

        {/* ── Info Cards ───────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 mb-5">

          {/* Server Code */}
          <GlassCard className="p-5 text-center">
            <Server size={20} className="text-[#C9A84C] mx-auto mb-2" />
            <p className="text-[#5A5045] text-xs mb-1 uppercase tracking-wider">رابط الاتصال</p>
            <p className="text-[#F5F0E8] font-mono text-sm font-bold" dir="ltr">
              cfx.re/join/{siteConfig.SERVER_CFX_CODE}
            </p>
          </GlassCard>

          {/* Capacity */}
          <GlassCard className="p-5 text-center">
            <Users size={20} className="text-[#C9A84C] mx-auto mb-2" />
            <p className="text-[#5A5045] text-xs mb-1 uppercase tracking-wider">السعة</p>
            <p className="text-[#F5F0E8] font-bold text-sm">
              {loading ? "—" : `${players} / ${maxPlayers} لاعب`}
            </p>
          </GlassCard>

        </div>

        {/* ── History ──────────────────────────────── */}
        {history.length > 1 && (
          <GlassCard className="p-5 mb-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-[#C9A84C]" />
              <h3 className="text-[#F5F0E8] font-semibold text-sm">سجل القراءات</h3>
            </div>
            <div className="flex items-end gap-1.5 h-16">
              {history.map((h, i) => {
                const pct = maxPlayers > 0 ? (h.players / maxPlayers) * 100 : 0;
                const isLast = i === history.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1" title={`${h.time}: ${h.players} لاعب`}>
                    <div className="w-full flex items-end justify-center" style={{ height: "48px" }}>
                      <div
                        className={`w-full rounded-t transition-all duration-500 ${isLast ? "bg-[#C9A84C]" : "bg-[#C9A84C]/30"}`}
                        style={{ height: `${Math.max(4, pct * 0.48)}px` }}
                      />
                    </div>
                    <span className="text-[#3A3A42] text-[9px] font-mono leading-none">{h.time}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        )}

        {/* ── Refresh Info ─────────────────────────── */}
        <div className="flex items-center justify-between text-xs text-[#3A3A42] px-1">
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>
              {lastFetch
                ? `آخر تحديث: ${lastFetch.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`
                : "جاري التحميل..."}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span>التحديث التالي: {countdown}ث</span>
            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-1 text-[#5A5045] hover:text-[#C9A84C] transition-colors disabled:opacity-40"
              title="تحديث يدوي"
            >
              <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
              <span>تحديث</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
