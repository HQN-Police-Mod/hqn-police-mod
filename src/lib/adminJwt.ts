import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "hqn_admin_jwt_secret"
);

export interface AdminPayload {
  id: string;
  username: string;
  role: "SUPER_ADMIN" | "STORE_MANAGER";
}

export async function verifyAdminToken(req: NextRequest): Promise<AdminPayload | null> {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as AdminPayload;
  } catch {
    return null;
  }
}

export async function getAdminFromToken(req: NextRequest): Promise<AdminPayload | null> {
  return verifyAdminToken(req);
}
