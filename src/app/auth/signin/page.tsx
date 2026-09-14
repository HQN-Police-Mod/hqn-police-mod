"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/store/admin" });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #07070A 0%, #0D0D14 60%, #07070A 100%)",
      }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative z-10 glass-card rounded-2xl p-8 w-full max-w-sm text-center">
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent rounded-t-2xl" />

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <Image src="/HQN.png" alt="HQN" fill className="object-contain" />
          </div>
        </div>

        <h1 className="heading-ar text-xl font-black text-[#F5F0E8] mb-1">
          لوحة إدارة المتجر
        </h1>
        <p className="text-[#5A5045] text-sm mb-8">
          HQN POLICE MOD
        </p>

        <button
          onClick={handleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-xl bg-white hover:bg-gray-50 text-gray-800 font-semibold transition-all disabled:opacity-50"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          <span>{loading ? "جاري الدخول..." : "الدخول بـ Google"}</span>
        </button>

        <p className="text-[#3A3A42] text-xs mt-4">
          فقط المسؤولون المعتمدون يمكنهم الدخول
        </p>
      </div>
    </div>
  );
}
