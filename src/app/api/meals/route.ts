import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/meals — list meal plans or orders
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const type = url.searchParams.get("type") || "plans";

  try {
    if (type === "orders") {
      const userId = url.searchParams.get("userId") || user.id;
      const orders = await prisma.mealOrder.findMany({
        where: { userId },
        include: { mealPlan: true },
        orderBy: { orderDate: "desc" },
        take: 50,
      });
      return NextResponse.json(orders);
    }

    // Default: list meal plans
    const plans = await prisma.mealPlan.findMany({
      where: {
        OR: [
          { companyId: user.companyId ?? undefined },
          { isActive: true },
        ],
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(plans);
  } catch (error) {
    console.error("Meals GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب الوجبات" }, { status: 500 });
  }
}

// POST /api/meals — create meal plan (HR/Admin) or place order (Employee)
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const body = await req.json();

  try {
    if (body.action === "order") {
      const order = await prisma.mealOrder.create({
        data: {
          userId: user.id,
          mealPlanId: body.mealPlanId ?? null,
          mealName: body.mealName || "وجبة مخصصة",
          notes: body.notes ?? null,
          status: "pending",
        },
      });
      return NextResponse.json(order, { status: 201 });
    }

    // Create meal plan (HR/Restaurant only)
    if (user.role !== "HR" && user.role !== "COMPANY_ADMIN" && user.role !== "RESTAURANT" && user.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "غير مصرح بإنشاء خطط وجبات" }, { status: 403 });
    }

    const plan = await prisma.mealPlan.create({
      data: {
        name: body.name,
        description: body.description ?? null,
        type: body.type || "general",
        calories: body.calories ?? null,
        companyId: body.companyId ?? user.companyId ?? null,
        isActive: true,
      },
    });
    return NextResponse.json(plan, { status: 201 });
  } catch (error) {
    console.error("Meals POST error:", error);
    return NextResponse.json({ error: "خطأ في إنشاء الوجبة" }, { status: 500 });
  }
}
