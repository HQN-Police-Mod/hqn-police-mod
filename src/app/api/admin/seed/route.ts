import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  // Strict secret check — must be set in environment
  const secret = process.env.ADMIN_SECRET;
  if (!secret || secret.length < 8) {
    return NextResponse.json({ error: "ADMIN_SECRET not configured" }, { status: 503 });
  }

  const auth = req.headers.get("authorization");
  if (!auth || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Seed admin users — credentials come from env vars, fallback to defaults only in dev
    const admins = [
      {
        username: process.env.ADMIN_USERNAME ?? "hqn_admin",
        password: process.env.ADMIN_PASSWORD ?? "HQN@Admin#9X2k",
        role: "SUPER_ADMIN" as const,
      },
      {
        username: process.env.STORE_USERNAME ?? "store_hqn",
        password: process.env.STORE_PASSWORD ?? "HQN@Store#2024",
        role: "STORE_MANAGER" as const,
      },
    ];

    const results: string[] = [];

    for (const a of admins) {
      const existing = await prisma.adminUser.findUnique({ where: { username: a.username } });
      if (!existing) {
        const hashed = await bcrypt.hash(a.password, 12);
        await prisma.adminUser.create({
          data: { username: a.username, password: hashed, role: a.role },
        });
        results.push(`Created: ${a.username}`);
      } else {
        results.push(`Exists: ${a.username}`);
      }
    }

    // Default site settings
    await prisma.siteSettings.upsert({
      where: { id: "main" },
      update: {},
      create: { id: "main", maintenanceMode: false, maintenanceMsg: "الموقع تحت الصيانة، سنعود قريباً" },
    });
    results.push("SiteSettings: ready");

    return NextResponse.json({ success: true, results });
  } catch (e) {
    return NextResponse.json({ error: "Seed failed", detail: String(e) }, { status: 500 });
  }
}
