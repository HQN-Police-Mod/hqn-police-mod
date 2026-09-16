import { NextRequest, NextResponse } from "next/server";

// Simple in-memory cache for maintenance mode
// Note: In serverless, this resets per cold start — acceptable for this use case
let cachedMaintenance: { value: boolean; msg: string; ts: number } | null = null;
const CACHE_TTL = 30_000; // 30 seconds

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip: admin, API, static, maintenance page itself
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/auth") ||
    /\.(png|ico|svg|jpg|jpeg|webp|gif|css|js|woff|woff2|ttf)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check maintenance mode — use cache to avoid HTTP call every request
  try {
    const now = Date.now();
    let maintenanceOn = false;

    if (cachedMaintenance && now - cachedMaintenance.ts < CACHE_TTL) {
      maintenanceOn = cachedMaintenance.value;
    } else {
      // Fetch with short timeout
      const res = await fetch(`${req.nextUrl.origin}/api/admin/maintenance`, {
        signal: AbortSignal.timeout(2000),
        cache: "no-store",
        headers: { "x-middleware-check": "1" },
      });
      if (res.ok) {
        const data = await res.json();
        maintenanceOn = data.maintenanceMode === true;
        cachedMaintenance = { value: maintenanceOn, msg: data.maintenanceMsg, ts: now };
      }
    }

    if (maintenanceOn) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    }
  } catch {
    // If fetch fails, allow access (fail open = better UX)
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|css|js|woff|woff2|ttf)).*)",
  ],
};
