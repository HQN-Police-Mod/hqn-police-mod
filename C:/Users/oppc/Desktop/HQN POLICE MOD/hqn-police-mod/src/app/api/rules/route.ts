import { NextResponse } from "next/server";
import { rulesData } from "@/data/rules";

export async function GET() {
  return NextResponse.json({ success: true, data: rulesData });
}
