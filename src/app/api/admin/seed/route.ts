import { NextRequest, NextResponse } from "next/server";
import { seedAdmins } from "@/lib/seedAdmin";

// One-time seed endpoint — protected by ADMIN_SECRET
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await seedAdmins();
    return NextResponse.json({ success: true, message: "Admins seeded" });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
