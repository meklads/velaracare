import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/wellness — get wellness scores for current user / company
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const companyId = url.searchParams.get("companyId");

  try {
    // Single user wellness score
    if (userId) {
      const score = await prisma.wellnessScore.findUnique({
        where: { userId },
        include: { user: { select: { firstName: true, lastName: true, email: true } } },
      });
      return NextResponse.json(score);
    }

    // Company-wide scores (HR/Admin only)
    if (companyId && (user.role === "HR" || user.role === "COMPANY_ADMIN" || user.role === "SUPER_ADMIN")) {
      const scores = await prisma.wellnessScore.findMany({
        where: { companyId },
        include: { user: { select: { firstName: true, lastName: true, email: true, department: true } } },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(scores);
    }

    // Current user's own score
    const score = await prisma.wellnessScore.findUnique({
      where: { userId: user.id },
    });
    return NextResponse.json(score);
  } catch (error) {
    console.error("Wellness GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب البيانات" }, { status: 500 });
  }
}

// POST /api/wellness — create or update wellness score
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const body = await req.json();

  try {
    const data = {
      score: body.score ?? 0,
      bmiScore: body.bmiScore ?? 0,
      sleepScore: body.sleepScore ?? 0,
      stressScore: body.stressScore ?? 0,
      activityScore: body.activityScore ?? 0,
      nutritionScore: body.nutritionScore ?? 0,
      familyHistory: body.familyHistory ?? 0,
      bloodPressure: body.bloodPressure ?? null,
      riskLevel: body.riskLevel ?? "low",
      trend: body.trend ?? "stable",
      companyId: body.companyId ?? user.companyId ?? null,
    };

    const score = await prisma.wellnessScore.upsert({
      where: { userId: user.id },
      update: data,
      create: { ...data, userId: user.id },
    });

    return NextResponse.json(score, { status: 201 });
  } catch (error) {
    console.error("Wellness POST error:", error);
    return NextResponse.json({ error: "خطأ في حفظ البيانات" }, { status: 500 });
  }
}
