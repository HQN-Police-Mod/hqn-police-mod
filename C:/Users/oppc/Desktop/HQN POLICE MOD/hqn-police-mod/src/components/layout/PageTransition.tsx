"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";

// ─── Context للتحكم في الانتقال من أي مكان ────────
type NavFn = (href: string) => void;
const TransitionCtx = createContext<NavFn>(() => {});
export const useTransitionNav = () => useContext(TransitionCtx);

type Stage = "idle" | "closing" | "closed" | "opening";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>("idle");
  const [displayed, setDisplayed] = useState(children);
  const pending = useRef<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => timers.current.forEach(clearTimeout);

  // ── الدالة التي تُشغَّل عند الضغط على الرابط ──
  const navigate: NavFn = useCallback(
    (href: string) => {
      if (href === pathname) return;
      clear();
      pending.current = href;

      // 1. أغلق الستارة فوراً
      setStage("closing");

      // 2. بعد اكتمال الإغلاق: انتقل للصفحة
      const t1 = setTimeout(() => {
        setStage("closed");
        router.push(href);
      }, 500);
      timers.current.push(t1);
    },
    [pathname, router]
  );

  // ── عند وصول الصفحة الجديدة: افتح الستارة ──
  useEffect(() => {
    if (stage !== "closed") return;
    setDisplayed(children);

    const t = setTimeout(() => {
      setStage("opening");
      const t2 = setTimeout(() => {
        setStage("idle");
      }, 650);
      timers.current.push(t2);
    }, 60);
    timers.current.push(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── sync content when idle ──
  useEffect(() => {
    if (stage === "idle") setDisplayed(children);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // ── Curtain position ──────────────────────────
  const curtainY =
    stage === "idle"
      ? "-100%"
      : stage === "closing"
      ? "0%"
      : stage === "closed"
      ? "0%"
      : "-100%"; // opening

  const duration =
    stage === "closing" ? "0.5s" : stage === "opening" ? "0.65s" : "0s";

  const ease = "cubic-bezier(0.76, 0, 0.24, 1)";

  const showDot = stage === "closed";

  return (
    <TransitionCtx.Provider value={navigate}>
      {/* ── Curtain ───────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9998,
          pointerEvents: stage === "idle" ? "none" : "all",
          transform: `translateY(${curtainY})`,
          transition:
            stage === "idle" ? "none" : `transform ${duration} ${ease}`,
          willChange: "transform",
        }}
      >
        {/* Base */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, #07070A 0%, #0D0D14 55%, #07070A 100%)",
          }}
        />

        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)",
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

        {/* Center dot — visible only when fully closed */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: showDot ? 1 : 0,
            transition: "opacity 0.15s ease",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#C9A84C",
                boxShadow: "0 0 14px #C9A84C88",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────── */}
      <div
        style={{
          opacity: stage === "closed" ? 0 : 1,
          transition:
            stage === "opening"
              ? "opacity 0.3s ease 0.1s"
              : "none",
        }}
      >
        {displayed}
      </div>
    </TransitionCtx.Provider>
  );
}
