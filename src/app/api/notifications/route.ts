import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/notifications — return user-specific notifications
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const notifications: { id: string; type: string; title: string; message: string; href?: string; urgent: boolean }[] = [];
  const now = new Date();

  try {
    const isEmployee = user.role === "EMPLOYEE";
    const isHR = user.role === "HR" || user.role === "COMPANY_ADMIN";
    const isNutritionist = user.role === "NUTRITIONIST";
    const isRestaurant = user.role === "RESTAURANT";

    // ── EMPLOYEE notifications ──
    if (isEmployee) {
      // Upcoming consultations (next 24h)
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const upcomingCons = await prisma.consultation.findFirst({
        where: {
          patientId: user.id,
          status: "scheduled",
          scheduledAt: { gte: now, lte: tomorrow },
        },
        select: { id: true, type: true, scheduledAt: true },
      });
      if (upcomingCons) {
        const timeStr = upcomingCons.scheduledAt.toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" });
        notifications.push({
          id: `cons-${upcomingCons.id}`,
          type: "consultation",
          title: "🔔 استشارة قريبة",
          message: `لديك استشارة ${upcomingCons.type} اليوم الساعة ${timeStr}`,
          href: "/dashboard/employee/consultations",
          urgent: true,
        });
      }

      // HRA reminder (no HRA in last 90 days)
      const lastHRA = await prisma.hRAResult.findFirst({
        where: { userId: user.id },
        orderBy: { completedAt: "desc" },
        select: { completedAt: true },
      });
      if (!lastHRA || (now.getTime() - lastHRA.completedAt.getTime()) > 90 * 24 * 60 * 60 * 1000) {
        notifications.push({
          id: "hra-reminder",
          type: "hra",
          title: "📋 تقييم صحي",
          message: !lastHRA ? "لم تقم بإجراء التقييم الصحي بعد" : "آخر تقييم صحي منذ أكثر من 3 أشهر",
          href: "/hra",
          urgent: !lastHRA,
        });
      }

      // Active order status
      const activeOrders = await prisma.mealOrder.findMany({
        where: { userId: user.id, status: { in: ["pending", "preparing", "ready"] } },
        orderBy: { orderDate: "desc" },
        take: 3,
        select: { id: true, mealName: true, status: true },
      });
      for (const order of activeOrders) {
        const statusLabels: Record<string, string> = {
          pending: "قيد الانتظار",
          preparing: "قيد التحضير",
          ready: "جاهز للتسليم",
        };
        notifications.push({
          id: `order-${order.id}`,
          type: "order",
          title: "🍽️ طلب وجبة",
          message: `${order.mealName}: ${statusLabels[order.status] || order.status}`,
          href: "/dashboard/employee/meals",
          urgent: order.status === "ready",
        });
      }
    }

    // ── HR / Admin notifications ──
    if (isHR || user.role === "SUPER_ADMIN") {
      const companyFilter = user.role === "SUPER_ADMIN" ? {} : { companyId: user.companyId };

      // High-risk employees
      const highRiskCount = await prisma.wellnessScore.count({
        where: {
          ...companyFilter,
          riskLevel: { in: ["high", "critical"] },
        },
      });
      if (highRiskCount > 0) {
        notifications.push({
          id: "high-risk",
          type: "risk",
          title: "⚠️ موظفون بمخاطر عالية",
          message: `${highRiskCount} موظف بمستوى خطر مرتفع أو حرج`,
          href: "/dashboard/admin/employees",
          urgent: highRiskCount > 5,
        });
      }

      // Employees without HRA
      const usersWithoutHRA = await prisma.user.count({
        where: {
          ...companyFilter,
          isActive: true,
          role: "EMPLOYEE",
          hraResults: { none: {} },
        },
      });
      if (usersWithoutHRA > 0) {
        notifications.push({
          id: "no-hra",
          type: "hra",
          title: "📋 تقييم صحي ناقص",
          message: `${usersWithoutHRA} موظف لم يجروا التقييم الصحي`,
          href: "/dashboard/hr/invite",
          urgent: usersWithoutHRA > 10,
        });
      }

      // Today's consultations
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
      const todayCons = await prisma.consultation.count({
        where: { ...companyFilter, scheduledAt: { gte: todayStart, lte: todayEnd }, status: "scheduled" },
      });
      if (todayCons > 0) {
        notifications.push({
          id: "today-cons",
          type: "consultation",
          title: "📅 استشارات اليوم",
          message: `لديك ${todayCons} استشارة مجدولة اليوم`,
          href: "/dashboard/admin/consultations",
          urgent: false,
        });
      }

      // Pending orders count
      const pendingOrders = await prisma.mealOrder.count({
        where: { status: { in: ["pending", "preparing"] } },
      });
      if (pendingOrders > 0) {
        notifications.push({
          id: "pending-orders",
          type: "order",
          title: "🍽️ طلبات نشطة",
          message: `${pendingOrders} طلب وجبة قيد التحضير`,
          href: "/dashboard/restaurant",
          urgent: pendingOrders > 10,
        });
      }
    }

    // ── Nutritionist notifications ──
    if (isNutritionist) {
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);
      const todayCons = await prisma.consultation.count({
        where: { consultantId: user.id, scheduledAt: { gte: todayStart, lte: todayEnd }, status: "scheduled" },
      });
      if (todayCons > 0) {
        notifications.push({
          id: "nut-cons",
          type: "consultation",
          title: "📅 استشارات اليوم",
          message: `لديك ${todayCons} استشارة اليوم`,
          href: "/dashboard/nutritionist",
          urgent: false,
        });
      }
    }

    // ── Restaurant notifications (already handled via SSE, but show count) ──
    if (isRestaurant) {
      const pendingPrep = await prisma.mealOrder.count({
        where: { status: "pending" },
      });
      if (pendingPrep > 0) {
        notifications.push({
          id: "rest-pending",
          type: "order",
          title: "🍳 طلبات جديدة",
          message: `${pendingPrep} طلب بانتظار التحضير`,
          href: "/dashboard/restaurant",
          urgent: pendingPrep > 5,
        });
      }
    }

    return NextResponse.json(notifications);
  } catch (error) {
    console.error("Notifications error:", error);
    return NextResponse.json([], { status: 200 }); // Return empty array on error
  }
}
