"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Save, Eye, EyeOff, Monitor, MessageSquare, ShoppingCart, AlertTriangle } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function SettingsAdmin() {
  const [saved, setSaved] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [form, setForm] = useState({
    SERVER_IP: siteConfig.SERVER_IP,
    SERVER_CONNECT: siteConfig.SERVER_CONNECT,
    DISCORD_URL: siteConfig.DISCORD_URL,
    DISCORD_INVITE: siteConfig.DISCORD_INVITE,
    SERVER_API: siteConfig.SERVER_API,
    STORE_URL: siteConfig.STORE_URL,
    MAX_PLAYERS: String(siteConfig.MAX_PLAYERS),
  });

  const handleSave = () => {
    // TODO: Persist settings to DB or env
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const input = (key: keyof typeof form, label: string, placeholder: string, type = "text") => (
    <div>
      <label className="block text-[#C9A84C] text-xs font-semibold uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
        placeholder={placeholder}
        className="input-dark w-full px-4 py-3 rounded-xl text-sm"
        dir="ltr"
      />
    </div>
  );

  return (
    <AdminShell title="الإعدادات">
      <div className="max-w-2xl space-y-6">
        {/* Server Settings */}
        <GlassCard className="p-6">
          <h2 className="text-[#F5F0E8] font-bold mb-5 flex items-center gap-2">
            <Monitor size={18} className="text-[#C9A84C]" />
            إعدادات السيرفر
          </h2>
          <div className="space-y-4">
            {input("SERVER_IP", "IP السيرفر", "play.hqnpolice.sa")}
            {input("SERVER_CONNECT", "رابط الاتصال", "fivem://connect/...")}
            {input("MAX_PLAYERS", "الحد الأقصى للاعبين", "64", "number")}
            {input("SERVER_API", "API السيرفر (اختياري)", "https://...")}
          </div>
        </GlassCard>

        {/* Discord Settings */}
        <GlassCard className="p-6">
          <h2 className="text-[#F5F0E8] font-bold mb-5 flex items-center gap-2">
            <MessageSquare size={18} className="text-[#C9A84C]" />
            إعدادات Discord
          </h2>
          <div className="space-y-4">
            {input("DISCORD_URL", "رابط Discord", "https://discord.gg/...")}
            {input("DISCORD_INVITE", "كود الدعوة", "hqnpolice")}
          </div>
        </GlassCard>

        {/* Store Settings */}
        <GlassCard className="p-6">
          <h2 className="text-[#F5F0E8] font-bold mb-5 flex items-center gap-2">
            <ShoppingCart size={18} className="text-[#C9A84C]" />
            إعدادات المتجر
          </h2>
          <div className="space-y-4">
            {input("STORE_URL", "رابط المتجر / Checkout (اختياري)", "https://...")}
          </div>
        </GlassCard>

        {/* Security Note */}
        <GlassCard className="p-5 border-yellow-500/20">
          <div className="flex items-start gap-2 mb-3">
            <AlertTriangle size={18} className="text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[#F5F0E8] font-semibold text-sm mb-1">ملاحظة أمنية</p>
              <p className="text-[#8A8070] text-xs leading-relaxed">
                هذه الإعدادات تجريبية ولا تُحفظ بشكل دائم في هذا النسخ. لحفظ الإعدادات بشكل آمن،
                استخدم ملف <code className="bg-[#1A1A1F] px-1 rounded font-mono text-[#C9A84C]">.env.local</code>{" "}
                أو أضف قاعدة بيانات للتخزين. لا تضع secrets أو tokens في هذا النموذج.
              </p>
            </div>
          </div>

          <div>
            <label className="block text-[#6B6558] text-xs font-semibold mb-2 uppercase">
              Admin Secret Key (من .env.local فقط)
            </label>
            <div className="flex gap-2">
              <input
                type={showSecret ? "text" : "password"}
                placeholder="مخفي — يُعيَّن في .env.local"
                disabled
                className="input-dark w-full px-4 py-3 rounded-xl text-sm opacity-50 cursor-not-allowed"
                dir="ltr"
              />
              <button
                onClick={() => setShowSecret(!showSecret)}
                className="px-3 rounded-xl border border-[#2A2A32] text-[#5A5045] hover:text-[#C9A84C] transition-colors"
              >
                {showSecret ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
              saved
                ? "bg-green-600/80 text-white"
                : "btn-gold"
            }`}
          >
            <Save size={16} />
            <span>{saved ? "تم الحفظ" : "حفظ الإعدادات"}</span>
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
