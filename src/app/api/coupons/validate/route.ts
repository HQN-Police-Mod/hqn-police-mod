import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ error: "الكود مطلوب" }, { status: 400 });

    const coupon = await prisma.coupon.findUnique({
      where: { code: String(code).toUpperCase().trim() },
    });

    if (!coupon) return NextResponse.json({ error: "كود الخصم غير صحيح" }, { status: 404 });
    if (!coupon.isActive) return NextResponse.json({ error: "كود الخصم غير مفعّل" }, { status: 400 });
    if (coupon.expiresAt && coupon.expiresAt < new Date())
      return NextResponse.json({ error: "كود الخصم منتهي الصلاحية" }, { status: 400 });
    if (coupon.usedCount >= coupon.maxUses)
      return NextResponse.json({ error: "تم استنفاد استخدامات هذا الكود" }, { status: 400 });

    return NextResponse.json({
      success: true,
      discount: coupon.discount,
      description: coupon.description,
      code: coupon.code,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
