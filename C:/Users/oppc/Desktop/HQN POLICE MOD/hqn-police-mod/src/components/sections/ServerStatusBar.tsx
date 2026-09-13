"use client";

import { RefreshCw, ExternalLink } from "lucide-react";
import { useServerStatus } from "@/hooks/useServerStatus";
import { siteConfig } from "@/config/site";

export function ServerStatusBar() {
  const { status, loading, refresh } = useServerStatus();

  return (
    <div className="bg-[#0D0D10] border-b border-[#C9A84C]/10 py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs">

        {/* Left: Status info */}
        <div className="flex items-center gap-4 overflow-x-auto min-w-0">
          {loading ? (
            <span className="text-[#5A5045] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5A5045] animate-pulse inline-block" />
              جاري التحميل...
            </span>
          ) : status ? (
            <>
              {/* Online/Offline dot */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span
                  className={`w-2 h-2 rounded-full inline-block ${
                    status.online
                      ? "status-dot-online animate-pulse"
                      : "status-dot-offline"
                  }`}
                />
                <span
                  className={`font-semibold ${
                    status.online ? "status-online" : "status-offline"
                  }`}
                >
                  {status.online ? "السيرفر شغّال" : "السيرفر متوقف"}
                </span>
              </div>

              <span className="text-[#2A2A32] shrink-0">|</span>

              {/* Players */}
              <span className="text-[#6B6558] shrink-0">
                اللاعبون:{" "}
                <span className="text-[#C9A84C] font-bold">
                  {status.players}/{status.maxPlayers}
                </span>
              </span>

              {/* IP — hidden on mobile */}
              <span className="text-[#2A2A32] hidden sm:inline shrink-0">|</span>
              <a
                href={siteConfig.SERVER_CONNECT}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1 text-[#6B6558] hover:text-[#C9A84C] transition-colors shrink-0 font-mono"
              >
                <span>{siteConfig.SERVER_IP}</span>
                <ExternalLink size={10} />
              </a>
            </>
          ) : (
            <span className="text-[#5A5045]">تعذر جلب الحالة</span>
          )}
        </div>

        {/* Right: Refresh + last updated */}
        <div className="flex items-center gap-3 shrink-0">
          {status && (
            <span className="text-[#3A3A42] hidden md:inline">
              آخر تحديث:{" "}
              {new Date(status.lastUpdated).toLocaleTimeString("ar-SA", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <button
            onClick={refresh}
            className="p-1.5 text-[#4A4A52] hover:text-[#C9A84C] transition-colors rounded"
            title="تحديث الحالة"
            aria-label="تحديث حالة السيرفر"
          >
            <RefreshCw size={12} />
          </button>
        </div>

      </div>
    </div>
  );
}
