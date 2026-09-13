import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to database
const applications: { id: string; status: string; [key: string]: unknown }[] = [];

function requireAdmin(req: NextRequest): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${process.env.ADMIN_SECRET}`;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!["pending", "accepted", "rejected", "review"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const index = applications.findIndex((a) => a.id === id);
    if (index === -1) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    applications[index].status = status;
    applications[index].updatedAt = new Date().toISOString();

    return NextResponse.json({ success: true, data: applications[index] });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!requireAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const index = applications.findIndex((a) => a.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  applications.splice(index, 1);
  return NextResponse.json({ success: true });
}
