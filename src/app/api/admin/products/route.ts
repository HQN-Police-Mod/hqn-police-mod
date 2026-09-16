import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdminToken } from "@/lib/adminAuth";

export async function GET(req: NextRequest) {
  const { error } = await requireAdminToken(req);
  if (error) return error;

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ success: true, data: products });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdminToken(req);
  if (error) return error;

  try {
    const body = await req.json();

    // Validation
    if (!body.nameAr || String(body.nameAr).trim().length < 2)
      return NextResponse.json({ error: "اسم المنتج بالعربي مطلوب" }, { status: 400 });
    if (!body.name || String(body.name).trim().length < 2)
      return NextResponse.json({ error: "اسم المنتج بالإنجليزي مطلوب" }, { status: 400 });
    if (body.price === undefined || Number(body.price) < 0)
      return NextResponse.json({ error: "السعر يجب أن يكون 0 أو أكثر" }, { status: 400 });

    const product = await prisma.product.create({
      data: {
        name: String(body.name).trim(),
        nameAr: String(body.nameAr).trim(),
        description: body.description ? String(body.description).trim() : "",
        descriptionAr: body.descriptionAr ? String(body.descriptionAr).trim() : "",
        price: Number(body.price),
        currency: body.currency ?? "SAR",
        category: body.category ?? "bundle",
        image: body.image ?? "/HQN.png",
        features: Array.isArray(body.features) ? body.features.filter(Boolean) : [],
        isAvailable: body.isAvailable ?? true,
        isFeatured: body.isFeatured ?? false,
        discount: body.discount ? Number(body.discount) : null,
        sortOrder: body.sortOrder ? Number(body.sortOrder) : 0,
      },
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "فشل إنشاء المنتج" }, { status: 500 });
  }
}
