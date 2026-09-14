import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip: maintenance page itself, admin routes, API, static files
  if (
    pathname.startsWith("/maintenance") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/HQN") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".ico") ||
    pathname.endsWith(".svg")
  ) {
    return NextResponse.next();
  }

  // Check maintenance mode from API
  try {
    const base = req.nextUrl.origin;
    const res = await fetch(`${base}/api/admin/maintenance`, {
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      if (data.maintenanceMode === true) {
        return NextResponse.redirect(new URL("/maintenance", req.url));
      }
    }
  } catch {
    // If fetch fails, allow access (don't block users)
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
