"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";

type Phase = "enter" | "hold" | "exit" | "gone";

export function PageIntro() {
  const [phase, setPhase] = useState<Phase | null>(null);

  useEffect(() => {
    const seen = sessionStorage.getItem("hqn_intro");
    if (seen) return;
    sessionStorage.setItem("hqn_intro", "1");

    setPhase("enter");

    const t1 = setTimeout(() => setPhase("hold"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => setPhase("gone"), 3200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  if (!phase || phase === "gone") return null;

  const curtainY =
    phase === "enter" ? "0%"
    : phase === "hold" ? "0%"
    : "-100%";

  const contentVisible = phase === "hold";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        transform: `translateY(${curtainY})`,
        transition:
          phase === "exit"
            ? "transform 0.75s cubic-bezier(0.76,0,0.24,1)"
            : "none",
        willChange: "transform",
        pointerEvents: phase === "exit" ? "none" : "all",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(160deg, #07070A 0%, #0D0D14 60%, #07070A 100%)",
        }}
      />

      {/* Grid lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gold bottom edge */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent 0%, #A07832 20%, #E8C96A 50%, #A07832 80%, transparent 100%)",
        }}
      />

      {/* Center content */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          opacity: contentVisible ? 1 : 0,
          transform: contentVisible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
          transition: "opacity 0.6s ease, transform 0.7s cubic-bezier(0.34,1.4,0.64,1)",
        }}
      >
        {/* Outer ring */}
        <div
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "24px",
            position: "relative",
          }}
        >
          {/* Rotating ring */}
          <div
            style={{
              position: "absolute",
              inset: "-3px",
              borderRadius: "50%",
              border: "1.5px solid transparent",
              borderTopColor: "#C9A84C",
              borderRightColor: "#C9A84C40",
              animation: "spin 1.8s linear infinite",
            }}
          />
          {/* Logo */}
          <div style={{ position: "relative", width: "80px", height: "80px" }}>
            <Image src="/HQN.png" alt="HQN" fill className="object-contain" priority />
          </div>
        </div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "var(--font-cairo), Cairo, sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
            fontWeight: 900,
            background: "linear-gradient(135deg, #E8C96A 0%, #C9A84C 50%, #A07832 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "8px",
            letterSpacing: "-0.01em",
          }}
        >
          {siteConfig.SERVER_NAME}
        </h1>

        {/* Motto */}
        <p
          style={{
            fontFamily: "var(--font-cairo), Cairo, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(107,101,88,0.9)",
            letterSpacing: "0.15em",
            marginBottom: "32px",
          }}
        >
          {siteConfig.MOTTO}
        </p>

        {/* Progress bar */}
        <div
          style={{
            width: "120px",
            height: "1px",
            background: "rgba(42,42,50,0.8)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #A07832, #E8C96A, #A07832)",
              width: contentVisible ? "100%" : "0%",
              transition: "width 2s cubic-bezier(0.4,0,0.2,1)",
              borderRadius: "1px",
            }}
          />
        </div>
      </div>

      {/* Spin keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
