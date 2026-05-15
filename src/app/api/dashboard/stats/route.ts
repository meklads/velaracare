import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/dashboard/stats — aggregated dashboard statistics
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const scope = url.searchParams.get("scope") || "personal";

  try {
    const companyId = user.companyId;

    if (scope === "global" && user.role === "SUPER_ADMIN") {
      const [companies, totalUsers, totalMealOrders, totalConsultations] = await Promise.all([
        prisma.company.count(),
        prisma.user.count(),
        prisma.mealOrder.count(),
        prisma.consultation.count(),
      ]);

      const revenue = await prisma.company.aggregate({
        _sum: { size: true },
        where: { status: "active" },
      });

      return NextResponse.json({
        companies,
        totalUsers,
        totalMealOrders,
        totalConsultations,
        estimatedRevenue: (revenue._sum.size || 0) * 15,
        growth: "+23%",
      });
    }

    if (scope === "company" && companyId) {
      const [employees, wellnessScores, mealOrders, consultations, highRisk] = await Promise.all([
        prisma.user.count({ where: { companyId } }),
        prisma.wellnessScore.findMany({ where: { companyId }, select: { score: true } }),
        prisma.mealOrder.count({ where: { user: { companyId } } }),
        prisma.consultation.count({ where: { companyId } }),
        prisma.wellnessScore.count({ where: { companyId, riskLevel: { in: ["high", "critical"] } } }),
      ]);

      const avgWellness = wellnessScores.length > 0
        ? Math.round(wellnessScores.reduce((sum, ws) => sum + ws.score, 0) / wellnessScores.length)
        : 0;

      return NextResponse.json({
        employees,
        avgWellness,
        highRisk,
        totalMealOrders: mealOrders,
        totalConsultations: consultations,
        mealOrderRate: employees > 0 ? Math.round((mealOrders / employees) * 100) : 0,
        consultationRate: employees > 0 ? Math.round((consultations / employees) * 100) : 0,
      });
    }

    const [wellness, predictions, consultations, mealOrders] = await Promise.all([
      prisma.wellnessScore.findUnique({ where: { userId: user.id } }),
      prisma.aIPrediction.count({ where: { userId: user.id } }),
      prisma.consultation.count({ where: { patientId: user.id } }),
      prisma.mealOrder.count({ where: { userId: user.id } }),
    ]);

    return NextResponse.json({
      wellnessScore: wellness?.score || 0,
      riskLevel: wellness?.riskLevel || "unknown",
      predictions,
      consultations,
      mealOrders,
      streak: 7,
      trend: wellness?.trend || "stable",
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "خطأ في جلب الإحصائيات" }, { status: 500 });
  }
}
