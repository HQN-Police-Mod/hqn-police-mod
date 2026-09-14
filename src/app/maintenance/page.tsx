import Image from "next/image";
import { siteConfig } from "@/config/site";

export default function MaintenancePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: "linear-gradient(135deg,#07070A 0%,#0D0D14 60%,#07070A 100%)" }}
    >
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 max-w-lg mx-auto">
        {/* Logo with pulse rings */}
        <div className="flex justify-center mb-10 relative">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-32 h-32 rounded-full border border-[#C9A84C]/20"
              style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite" }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 rounded-full border border-[#C9A84C]/30"
              style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite 0.5s" }}
            />
          </div>

          <div className="relative w-20 h-20 animate-float">
            <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 blur-xl scale-150" />
            <Image src="/HQN.png" alt="HQN" fill className="object-contain relative z-10" />
          </div>
        </div>

        {/* Maintenance Icon */}
        <div className="mb-6 flex justify-center">
          <MaintenanceIcon />
        </div>

        <h1 className="heading-ar text-3xl md:text-4xl font-black text-[#F5F0E8] mb-4">
          الموقع تحت <span className="gold-text">الصيانة</span>
        </h1>

        <MaintenanceMessage />

        <div className="mt-10 flex items-center justify-center gap-2 text-[#5A5045] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          <span>{siteConfig.SERVER_NAME}</span>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

function MaintenanceIcon() {
  return (
    <div className="relative w-16 h-16">
      {/* Spinning gear */}
      <svg
        viewBox="0 0 24 24"
        className="w-16 h-16 text-[#C9A84C]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ animation: "spin 4s linear infinite" }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    </div>
  );
}

async function MaintenanceMessage() {
  // Fetch message from DB
  try {
    const { prisma } = await import("@/lib/prisma");
    const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
    return (
      <p className="text-[#8A8070] text-lg leading-relaxed">
        {settings?.maintenanceMsg ?? "الموقع تحت الصيانة، سنعود قريباً"}
      </p>
    );
  } catch {
    return <p className="text-[#8A8070] text-lg">الموقع تحت الصيانة، سنعود قريباً</p>;
  }
}
