"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff, Lock, User, ShieldAlert } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const r = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const d = await r.json();

      if (!r.ok) {
        setError(d.error ?? "بيانات خاطئة");
        return;
      }

      // Redirect based on role
      if (d.role === "STORE_MANAGER") {
        router.push("/store/admin");
      } else {
        router.push("/admin");
      }
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
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 w-full max-w-sm">
        <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />

          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 blur-xl" />
              <Image src="/HQN.png" alt="HQN" fill className="object-contain relative z-10" />
            </div>
            <h1 className="heading-ar text-xl font-black text-[#F5F0E8]">لوحة الإدارة</h1>
            <p className="text-[#5A5045] text-xs mt-1 flex items-center gap-1">
              <ShieldAlert size={11} /> HQN POLICE MOD
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
            {/* Username */}
            <div>
              <label className="block text-[#C9A84C] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                اسم المستخدم
              </label>
              <div className="relative">
                <User size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5045]" />
                <input
                  value={form.username}
                  onChange={(e) => setForm(p => ({ ...p, username: e.target.value }))}
                  placeholder="username"
                  autoComplete="new-password"
                  className="input-dark w-full pr-9 pl-4 py-3 rounded-xl text-sm"
                  dir="ltr"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#C9A84C] text-xs font-semibold mb-1.5 uppercase tracking-wider">
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A5045]" />
                <input
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  className="input-dark w-full pr-9 pl-10 py-3 rounded-xl text-sm"
                  dir="ltr"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5A5045] hover:text-[#C9A84C] transition-colors"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                <ShieldAlert size={15} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-xl font-bold text-sm mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-[#0A0A0B] border-t-transparent rounded-full animate-spin" />
                  جاري الدخول...
                </span>
              ) : "دخول"}
            </button>
          </form>

          <p className="text-[#3A3A42] text-xs text-center mt-5">
            للمسؤولين المعتمدين فقط
          </p>
        </div>
      </div>
    </div>
  );
}
