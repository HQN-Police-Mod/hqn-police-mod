"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, User, ShieldAlert, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username.trim() || !form.password) {
      setError("أدخل اليوزر والباسورد");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username.trim(), password: form.password }),
      });
      const d = await r.json();
      if (!r.ok) { setError(d.error ?? "بيانات خاطئة"); return; }
      if (d.role === "STORE_MANAGER") router.push("/store/admin");
      else router.push("/admin");
    } catch {
      setError("خطأ في الاتصال، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg,#07070A 0%,#0D0D14 60%,#07070A 100%)" }}
    >
      <div className="absolute inset-0" style={{
        backgroundImage: "linear-gradient(rgba(201,168,76,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,0.03) 1px,transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      <div className="relative z-10 w-full max-w-sm">
        <div
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{ background: "rgba(26,26,31,0.85)", border: "1px solid rgba(201,168,76,0.2)", backdropFilter: "blur(12px)" }}
        >
          {/* Gold top line */}
          <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: "linear-gradient(90deg,transparent,#C9A84C,transparent)" }} />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full blur-xl" style={{ background: "rgba(201,168,76,0.15)" }} />
              <Image src="/HQN.png" alt="HQN" fill className="object-contain relative z-10" />
            </div>
            <h1 className="text-xl font-black text-[#F5F0E8]" style={{ fontFamily: "Cairo, sans-serif" }}>
              لوحة الإدارة
            </h1>
            <div className="flex items-center gap-1 mt-1">
              <ShieldAlert size={11} className="text-[#5A5045]" />
              <p className="text-[#5A5045] text-xs">HQN POLICE MOD</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-[#C9A84C]">
                اسم المستخدم
              </label>
              <div className="relative">
                <User size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5045]" />
                <input
                  value={form.username}
                  onChange={(e) => { setForm(p => ({ ...p, username: e.target.value })); setError(""); }}
                  placeholder="username"
                  autoComplete="off"
                  className="w-full pr-9 pl-4 py-3 rounded-xl text-sm"
                  dir="ltr"
                  required
                  style={{
                    background: "rgba(26,26,31,0.9)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#F5F0E8",
                    fontFamily: "Cairo, sans-serif",
                    outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-[#C9A84C]">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5045]" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => { setForm(p => ({ ...p, password: e.target.value })); setError(""); }}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="w-full pr-9 pl-10 py-3 rounded-xl text-sm"
                  dir="ltr"
                  required
                  style={{
                    background: "rgba(26,26,31,0.9)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    color: "#F5F0E8",
                    fontFamily: "Cairo, sans-serif",
                    outline: "none",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(201,168,76,0.2)"}
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: "#5A5045" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#C9A84C")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#5A5045")}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#F87171" }}>
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm mt-2 relative overflow-hidden transition-all"
              style={{
                background: loading ? "rgba(201,168,76,0.5)" : "linear-gradient(135deg,#C9A84C,#A07832)",
                color: "#0A0A0B",
                fontFamily: "Cairo, sans-serif",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0A0A0B] border-t-transparent rounded-full animate-spin" />
                  جاري الدخول...
                </span>
              ) : "دخول"}
            </button>
          </form>

          <p className="text-center mt-5 text-xs" style={{ color: "#3A3A42" }}>
            للمسؤولين المعتمدين فقط — لا يمكن إنشاء حسابات جديدة
          </p>
        </div>
      </div>
    </div>
  );
}
