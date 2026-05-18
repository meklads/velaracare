import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generatePredictions } from "@/lib/predictions";
import { sendEmail, wellnessReportEmail } from "@/lib/email";

export const runtime = "nodejs";

// POST /api/hra — submit Health Risk Assessment
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const body = await req.json();

  try {
    const { responses } = body;
    if (!responses) {
      return NextResponse.json({ error: "البيانات مطلوبة" }, { status: 400 });
    }

    // Calculate risk level based on responses
    const riskScore = calculateRiskScore(responses);
    const riskLevel = getRiskLevel(riskScore);

    // Generate AI recommendations
    const recommendations = generateRecommendations(responses, riskLevel);

    const result = await prisma.hRAResult.create({
      data: {
        userId: user.id,
        riskLevel,
        responses,
        recommendations,
      },
    });

    // Also update wellness score
    await prisma.wellnessScore.upsert({
      where: { userId: user.id },
      update: {
        score: Math.max(0, 100 - riskScore * 10),
        riskLevel,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        companyId: user.companyId ?? undefined,
        score: Math.max(0, 100 - riskScore * 10),
        riskLevel,
      },
    });

    // Auto-generate AI predictions from HRA responses
    const predictions = generatePredictions(responses);
    for (const pred of predictions) {
      await prisma.aIPrediction.create({
        data: {
          userId: user.id,
          type: pred.type,
          probability: pred.probability,
          riskLevel: pred.riskLevel,
          factors: pred.factors,
          suggestions: pred.suggestions,
          expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Notify SSE clients
    fetch(`${process.env.NEXTAUTH_URL || ""}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "hra_completed" }),
    }).catch(() => {});

    // Send wellness report email (non-blocking)
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
      select: { firstName: true, lastName: true, email: true },
    });
    if (userData?.email) {
      const reportUrl = `${process.env.NEXTAUTH_URL || "https://velaracare.co"}/dashboard/employee/insights`;
      sendEmail(
        userData.email,
        "📊 تقرير العافية — Velara Care",
        wellnessReportEmail(
          `${userData.firstName} ${userData.lastName}`,
          Math.max(0, 100 - riskScore * 10),
          riskLevel,
          reportUrl
        )
      );
    }

    return NextResponse.json({ ...result, predictionsGenerated: predictions.length }, { status: 201 });
  } catch (error) {
    console.error("HRA POST error:", error);
    return NextResponse.json({ error: "خطأ في حفظ التقييم" }, { status: 500 });
  }
}

// GET /api/hra — get HRA results (own or for a specific userId if authorized)
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const targetUserId = url.searchParams.get("userId") || user.id;

  try {
    // Allow nutritionists & admins to view any patient's HRA; others only their own
    if (targetUserId !== user.id) {
      const isPrivileged = ["NUTRITIONIST", "HR", "COMPANY_ADMIN", "SUPER_ADMIN"].includes(user.role);
      if (!isPrivileged) {
        return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
      }
    }

    const results = await prisma.hRAResult.findMany({
      where: { userId: targetUserId },
      orderBy: { completedAt: "desc" },
      take: 10,
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error("HRA GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب النتائج" }, { status: 500 });
  }
}

function calculateRiskScore(responses: Record<string, any>): number {
  let score = 0;
  let count = 0;

  // BMI
  if (responses.bmi) {
    const bmi = parseFloat(responses.bmi);
    if (bmi > 30) score += 3;
    else if (bmi > 25) score += 2;
    else if (bmi < 18.5) score += 1;
    count++;
  }

  // Smoking
  if (responses.smoking === "yes") score += 3;
  else if (responses.smoking === "former") score += 1;
  count++;

  // Physical activity
  if (responses.activity === "none") score += 3;
  else if (responses.activity === "light") score += 1;
  count++;

  // Sleep
  if (responses.sleepHours) {
    const sleep = parseFloat(responses.sleepHours);
    if (sleep < 5 || sleep > 9) score += 2;
    else if (sleep < 6) score += 1;
    count++;
  }

  // Stress
  if (responses.stress === "high") score += 3;
  else if (responses.stress === "medium") score += 1;
  count++;

  // Family history
  if (responses.familyHistory === "yes") score += 2;
  count++;

  // Blood pressure
  if (responses.bloodPressure === "high") score += 2;
  count++;

  return count > 0 ? score / count : 0;
}

function getRiskLevel(score: number): string {
  if (score >= 2.5) return "critical";
  if (score >= 2) return "high";
  if (score >= 1) return "moderate";
  return "low";
}

function generateRecommendations(responses: Record<string, any>, riskLevel: string): any {
  const recs: string[] = [];

  if (responses.smoking === "yes") {
    recs.push("برنامج الإقلاع عن التدخين — ندعمك برنامج تدريجي متكامل");
  }
  if (responses.activity === "none" || responses.activity === "light") {
    recs.push("ابدأ بالمشي ٣٠ دقيقة يومياً — سنساعدك بخطة تدريجية");
  }
  if (responses.stress === "high") {
    recs.push("جلسات استرخاء وتأمل — احجز استشارة مع مختص الصحة النفسية");
  }
  if (parseFloat(responses.bmi || "0") > 25) {
    recs.push("خطة تغذية مخصصة لتحقيق الوزن الصحي — استشر أخصائي التغذية");
  }
  if (riskLevel === "high" || riskLevel === "critical") {
    recs.push("استشارة عاجلة مع الفريق الطبي — تمت إحالتك تلقائياً");
  }

  return {
    riskLevel,
    score: calculateRiskScore(responses),
    recommendations: recs,
    nextSteps: recs.length > 0 ? recs[0] : "استمر في نمط حياتك الصحي ✅",
  };
}
