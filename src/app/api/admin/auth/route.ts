import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "hqn_admin_jwt_secret");

// Rate limiting
const attempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 900_000 }); // 15 min window
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "محاولات كثيرة. حاول بعد 15 دقيقة." }, { status: 429 });
  }

  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({ error: "اليوزر والباسورد مطلوبان" }, { status: 400 });
    }

    const admin = await prisma.adminUser.findUnique({ where: { username: String(username).trim() } });
    if (!admin) {
      return NextResponse.json({ error: "بيانات خاطئة" }, { status: 401 });
    }

    const valid = await bcrypt.compare(String(password), admin.password);
    if (!valid) {
      return NextResponse.json({ error: "بيانات خاطئة" }, { status: 401 });
    }

    // Issue JWT
    const token = await new SignJWT({ id: admin.id, username: admin.username, role: admin.role })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    const res = NextResponse.json({ success: true, role: admin.role });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "خطأ في الخادم" }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete("admin_token");
  return res;
}
