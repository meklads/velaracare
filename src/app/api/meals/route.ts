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
      // Restaurant sees ALL orders; others see only their own
      const isRestaurant = user.role === "RESTAURANT" || user.role === "COMPANY_ADMIN" || user.role === "SUPER_ADMIN";
      const where = isRestaurant ? {} : { userId: url.searchParams.get("userId") || user.id };
      const orders = await prisma.mealOrder.findMany({
        where,
        include: {
          mealPlan: true,
          user: { select: { firstName: true, lastName: true, department: true } },
        },
        orderBy: { orderDate: "desc" },
        take: 100,
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

      // Notify SSE clients
      fetch(`${process.env.NEXTAUTH_URL || ""}/api/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "new_order" }),
      }).catch(() => {});

      return NextResponse.json(order, { status: 201 });
    }

    // Create meal plan (HR/Restaurant/Admin only)
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

// PATCH /api/meals — update order status (Restaurant/Admin)
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const canUpdate = ["RESTAURANT", "COMPANY_ADMIN", "SUPER_ADMIN", "HR"].includes(user.role);
  if (!canUpdate) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { orderId, status, planId, isActive, name, description, type, calories } = body;

    // ── Meal Plan update ──
    if (planId) {
      const plan = await prisma.mealPlan.update({
        where: { id: planId },
        data: {
          isActive: isActive ?? undefined,
          name: name ?? undefined,
          description: description ?? undefined,
          type: type ?? undefined,
          calories: calories ?? undefined,
        },
      });
      return NextResponse.json(plan);
    }

    // ── Order status update ──
    if (!orderId || !status) {
      return NextResponse.json({ error: "معرف الطلب والحالة مطلوبان" }, { status: 400 });
    }

    const validStatuses = ["pending", "preparing", "ready", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "حالة غير صالحة" }, { status: 400 });
    }

    const order = await prisma.mealOrder.update({
      where: { id: orderId },
      data: { status },
      include: { mealPlan: true, user: { select: { firstName: true, lastName: true, department: true } } },
    });

    // Notify SSE clients immediately
    fetch(`${process.env.NEXTAUTH_URL || ""}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "order_updated" }),
    }).catch(() => {});

    return NextResponse.json(order);
  } catch (error) {
    console.error("Meals PATCH error:", error);
    return NextResponse.json({ error: "خطأ في تحديث الطلب" }, { status: 500 });
  }
}
