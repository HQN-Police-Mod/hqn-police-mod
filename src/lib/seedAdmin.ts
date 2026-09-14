/**
 * Run once to seed admin users and default site settings
 * Call from /api/admin/seed (protected) or run directly
 */
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function seedAdmins() {
  const admins = [
    { username: "hqn_admin",  password: "HQN@Admin#9X2k",  role: "SUPER_ADMIN"   as const },
    { username: "store_hqn",  password: "HQN@Store#2024",  role: "STORE_MANAGER" as const },
  ];

  for (const a of admins) {
    const existing = await prisma.adminUser.findUnique({ where: { username: a.username } });
    if (!existing) {
      const hashed = await bcrypt.hash(a.password, 12);
      await prisma.adminUser.create({ data: { username: a.username, password: hashed, role: a.role } });
      console.log(`Created admin: ${a.username}`);
    }
  }

  // Default site settings
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main", maintenanceMode: false, maintenanceMsg: "الموقع تحت الصيانة، سنعود قريباً" },
  });

  console.log("Seed complete");
}
