import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const { error } = await requireAdminToken(req);
  if (error) return error;

  const coupons = await prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ success: true, data: coupons });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminToken(req);
  if (error) return error;

  try {
    const body = await req.json();

    if (!body.code || String(body.code).trim().length < 2)
      return NextResponse.json({ error: "كود الخصم مطلوب (2 أحرف على الأقل)" }, { status: 400 });
    if (!body.discount || Number(body.discount) <= 0 || Number(body.discount) > 100)
      return NextResponse.json({ error: "نسبة الخصم يجب أن تكون بين 1 و 100" }, { status: 400 });

    const coupon = await prisma.coupon.create({
      data: {
        code: String(body.code).toUpperCase().trim().replace(/\s+/g, ""),
        discount: Number(body.discount),
        maxUses: body.maxUses ? Number(body.maxUses) : 100,
        isActive: body.isActive ?? true,
        expiresAt: body.expiresAt ? new Date(body.expiresAt) : null,
        description: body.description ? String(body.description).trim() : null,
      },
    });
    return NextResponse.json({ success: true, data: coupon }, { status: 201 });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "P2002")
      return NextResponse.json({ error: "كود الخصم موجود بالفعل" }, { status: 400 });
    return NextResponse.json({ error: "فشل إنشاء الكوبون" }, { status: 500 });
  }
}
