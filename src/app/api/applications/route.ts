import { NextRequest, NextResponse } from "next/server";
import { validateApplication, sanitize } from "@/utils/validation";
import type { Application, ApplicationFormData } from "@/types";

// In-memory store — replace with DB (Prisma/Firebase/etc.) in production
// TODO: Connect to database
const applications: Application[] = [];

// Simple rate limiting (in-memory)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 3600000 }); // 1h window
    return true;
  }
  if (limit.count >= 3) return false; // Max 3 per hour
  limit.count++;
  return true;
}

export async function GET(req: NextRequest) {
  // TODO: Replace with proper session-based auth (NextAuth / Clerk)
  const authHeader = req.headers.get("authorization");
  if (!authHeader || authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ success: true, data: applications });
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip =
      req.headers.get("x-forwarded-for") ??
      req.headers.get("x-real-ip") ??
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "لقد تجاوزت الحد المسموح به. يرجى المحاولة لاحقاً." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "بيانات غير صالحة" },
        { status: 400 }
      );
    }

    // Validate
    const errors = validateApplication(body);
    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: errors[0].message },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const data: ApplicationFormData = {
      name: sanitize(String(body.name)),
      age: Number(body.age),
      discord: sanitize(String(body.discord)),
      sector: sanitize(String(body.sector)),
      rank: sanitize(String(body.rank)),
      experience: sanitize(String(body.experience)),
      reason: sanitize(String(body.reason)),
      additionalInfo: body.additionalInfo
        ? sanitize(String(body.additionalInfo))
        : undefined,
    };

    const application: Application = {
      id: crypto.randomUUID(),
      ...data,
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    applications.push(application);

    // TODO: Send to Discord webhook
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                title: "🗂️ طلب تقديم جديد — HQN POLICE MOD",
                color: 0xc9a84c,
                fields: [
                  { name: "الاسم", value: data.name, inline: true },
                  { name: "العمر", value: String(data.age), inline: true },
                  { name: "Discord", value: data.discord, inline: true },
                  { name: "القطاع", value: data.sector, inline: true },
                  { name: "الرتبة", value: data.rank, inline: true },
                  { name: "الخبرة", value: data.experience },
                  { name: "سبب التقديم", value: data.reason },
                ],
                timestamp: new Date().toISOString(),
                footer: { text: "HQN POLICE MOD — نظام التقديم" },
              },
            ],
          }),
        });
      } catch {
        // Non-fatal
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "تم إرسال طلبك بنجاح. سيتم مراجعته من قبل الإدارة.",
        id: application.id,
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء المعالجة. يرجى المحاولة لاحقاً." },
      { status: 500 }
    );
  }
}
