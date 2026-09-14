import { auth, isAdmin } from "./auth";
import { verifyAdminToken } from "./adminJwt";
import { NextRequest, NextResponse } from "next/server";

// For Google OAuth admin routes
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email || !isAdmin(session.user.email)) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null };
  }
  return { error: null, session };
}

// For username/password admin routes (store admin)
export async function requireAdminToken(req: NextRequest) {
  // Try cookie-based JWT first
  const payload = await verifyAdminToken(req);
  if (payload) return { error: null, payload };

  // Fallback: Google OAuth admin
  const session = await auth();
  if (session?.user?.email && isAdmin(session.user.email)) {
    return { error: null, payload: { id: session.user.id, username: session.user.email, role: "SUPER_ADMIN" as const } };
  }

  return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), payload: null };
}
