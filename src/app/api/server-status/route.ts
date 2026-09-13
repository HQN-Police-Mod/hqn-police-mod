import { NextResponse } from "next/server";
import type { ServerStatus } from "@/types";
import { siteConfig } from "@/config/site";

// In-memory cache — 30 seconds
const cache: { data: ServerStatus | null; ts: number } = { data: null, ts: 0 };
const CACHE_TTL = 30_000;

export async function GET() {
  try {
    const now = Date.now();

    if (cache.data && now - cache.ts < CACHE_TTL) {
      return NextResponse.json(cache.data);
    }

    // ── Strategy 1: FiveM Public Master List API ──────────────
    // Works only if server has sv_master1 set (public listing)
    try {
      const masterRes = await fetch(
        `https://servers-frontend.fivem.net/api/servers/single/${siteConfig.SERVER_CFX_CODE}`,
        {
          headers: { "User-Agent": "HQN-Website/1.0" },
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        }
      );
      if (masterRes.ok) {
        const json = await masterRes.json();
        const d = json?.Data ?? json;
        const status: ServerStatus = {
          online: true,
          players: d.clients ?? 0,
          maxPlayers: d.sv_maxclients ?? siteConfig.MAX_PLAYERS,
          lastUpdated: new Date().toISOString(),
          isMock: false,
        };
        cache.data = status;
        cache.ts = now;
        return NextResponse.json(status);
      }
    } catch { /* try next strategy */ }

    // ── Strategy 2: FiveM alternative endpoint ────────────────
    try {
      const altRes = await fetch(
        `https://servers-frontend.fivem.net/api/servers/${siteConfig.SERVER_CFX_CODE}`,
        {
          headers: { "User-Agent": "HQN-Website/1.0" },
          signal: AbortSignal.timeout(5000),
          cache: "no-store",
        }
      );
      if (altRes.ok) {
        const json = await altRes.json();
        const d = json?.Data ?? json;
        const status: ServerStatus = {
          online: true,
          players: d.clients ?? 0,
          maxPlayers: d.sv_maxclients ?? siteConfig.MAX_PLAYERS,
          lastUpdated: new Date().toISOString(),
          isMock: false,
        };
        cache.data = status;
        cache.ts = now;
        return NextResponse.json(status);
      }
    } catch { /* try next strategy */ }

    // ── Strategy 3: Direct server HTTP endpoint ───────────────
    // If server IP is set, try to reach it directly
    // FiveM servers expose /info.json and /players.json on their HTTP port
    // NOTE: This only works if the server IP is publicly accessible
    // TODO: Add server direct IP here when available
    // Example: const SERVER_DIRECT = "http://YOUR_IP:30120";
    // try {
    //   const [infoRes, playersRes] = await Promise.all([
    //     fetch(`${SERVER_DIRECT}/info.json`, { signal: AbortSignal.timeout(3000), cache: "no-store" }),
    //     fetch(`${SERVER_DIRECT}/players.json`, { signal: AbortSignal.timeout(3000), cache: "no-store" }),
    //   ]);
    //   if (infoRes.ok && playersRes.ok) {
    //     const info = await infoRes.json();
    //     const players = await playersRes.json();
    //     ...
    //   }
    // } catch { }

    // ── All strategies failed: server offline or private ─────
    const offline: ServerStatus = {
      online: false,
      players: 0,
      maxPlayers: siteConfig.MAX_PLAYERS,
      lastUpdated: new Date().toISOString(),
      isMock: false,
    };
    cache.data = offline;
    cache.ts = now;
    return NextResponse.json(offline);

  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
