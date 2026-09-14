import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: coupons });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();
    if (!body.code || !body.discount) {
      return NextResponse.json({ error: "Code and discount required" }, { status: 400 });
    }
    const coupon = await prisma.coupon.create({
      data: {
        code: String(body.code).toUpperCase().trim(),
        discount: Number(body.discount),
        maxUses: body.maxUses ? Number(body.maxUses) : 100,
        isActive: body.isActive ?? true,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        description: body.description ?? null,
      },
    });
    return NextResponse.json({ success: true, data: coupon }, { status: 201 });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002") {
      return NextResponse.json({ error: "كود الخصم موجود بالفعل" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 });
  }
}
