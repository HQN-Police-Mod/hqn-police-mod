import { NextResponse } from "next/server";
import { staffMembers } from "@/data/staff";

export async function GET() {
  // Don't expose sensitive data
  const publicStaff = staffMembers
    .filter((s) => s.isActive)
    .map(({ id, name, nameAr, role, position, positionAr, discord }) => ({
      id, name, nameAr, role, position, positionAr, discord,
    }));

  return NextResponse.json({ success: true, data: publicStaff });
}
