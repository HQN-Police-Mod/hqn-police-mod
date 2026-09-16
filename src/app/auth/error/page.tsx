"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";

function ErrorContent() {
  const params = useSearchParams();
  const error = params.get("error");

  const messages: Record<string, string> = {
    Configuration: "خطأ في إعداد تسجيل الدخول. تواصل مع المسؤول.",
    AccessDenied: "تم رفض الوصول. ليس لديك صلاحية لتسجيل الدخول.",
    Verification: "انتهت صلاحية رابط التحقق. حاول مرة أخرى.",
    OAuthSignin: "حدث خطأ أثناء تسجيل الدخول بـ Google. حاول مرة أخرى.",
    OAuthCallback: "حدث خطأ في الاتصال بـ Google. تحقق من إعدادات OAuth.",
    OAuthCreateAccount: "تعذر إنشاء الحساب. حاول مرة أخرى.",
    Default: "حدث خطأ غير متوقع. حاول مرة أخرى.",
  };

  const msg = messages[error ?? "Default"] ?? messages.Default;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(135deg,#07070A 0%,#0D0D14 60%,#07070A 100%)" }}
    >
      <div
        className="max-w-sm w-full rounded-2xl p-8 relative overflow-hidden"
        style={{ background: "rgba(26,26,31,0.9)", border: "1px solid rgba(201,168,76,0.2)" }}
      >
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
          style={{ background: "linear-gradient(90deg,transparent,#F87171,transparent)" }} />

        <div className="flex justify-center mb-5">
          <div className="relative w-14 h-14">
            <Image src="/HQN.png" alt="HQN" fill className="object-contain" />
          </div>
        </div>

        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <h2 style={{ fontFamily: "Cairo, sans-serif", color: "#F5F0E8", fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.75rem" }}>
          خطأ في تسجيل الدخول
        </h2>

        <p style={{ color: "#8A8070", fontSize: "0.875rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          {msg}
        </p>

        <a
          href="/auth/signin"
          style={{
            display: "block",
            background: "linear-gradient(135deg,#C9A84C,#A07832)",
            color: "#0A0A0B",
            fontWeight: 700,
            padding: "0.75rem",
            borderRadius: "0.75rem",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontFamily: "Cairo, sans-serif",
          }}
        >
          حاول مرة أخرى
        </a>

        <a
          href="/"
          style={{ display: "block", color: "#5A5045", fontSize: "0.8rem", marginTop: "0.75rem" }}
        >
          العودة للرئيسية
        </a>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#07070A" }} />}>
      <ErrorContent />
    </Suspense>
  );
}
