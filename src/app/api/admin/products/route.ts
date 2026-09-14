import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/adminAuth";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  const products = await prisma.product.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json({ success: true, data: products });
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await req.json();
    const product = await prisma.product.create({
      data: {
        name: body.name,
        nameAr: body.nameAr,
        description: body.description ?? "",
        descriptionAr: body.descriptionAr ?? "",
        price: Number(body.price),
        currency: body.currency ?? "SAR",
        category: body.category ?? "bundle",
        image: body.image ?? "/HQN.png",
        features: body.features ?? [],
        isAvailable: body.isAvailable ?? true,
        isFeatured: body.isFeatured ?? false,
        discount: body.discount ? Number(body.discount) : null,
        sortOrder: body.sortOrder ?? 0,
      },
    });
    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
