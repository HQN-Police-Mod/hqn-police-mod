import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/adminJwt";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return NextResponse.json({
    maintenanceMode: settings?.maintenanceMode ?? false,
    maintenanceMsg: settings?.maintenanceMsg ?? "الموقع تحت الصيانة، سنعود قريباً",
  });
}

export async function PATCH(req: NextRequest) {
  const payload = await verifyAdminToken(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { maintenanceMode, maintenanceMsg } = await req.json();

  const settings = await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {
      ...(maintenanceMode !== undefined && { maintenanceMode }),
      ...(maintenanceMsg !== undefined && { maintenanceMsg }),
    },
    create: {
      id: "main",
      maintenanceMode: maintenanceMode ?? false,
      maintenanceMsg: maintenanceMsg ?? "الموقع تحت الصيانة، سنعود قريباً",
    },
  });

  return NextResponse.json({ success: true, data: settings });
}
