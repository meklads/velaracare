import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Last-seen timestamps per event type (per instance, used for polling) ──
const lastSeen = { orders: 0, consultations: 0 };

/**
 * GET /api/events — Server-Sent Events endpoint (authenticated)
 * Streams real-time updates using DB-backed EventLog for multi-instance support.
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse(null, { status: 401 });
  }

  const eventType = req.nextUrl.searchParams.get("type") || "orders";

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(`data: ${JSON.stringify({ type: "connected", message: "مرحباً! تم الاتصال بالخادم المباشر" })}\n\n`);

      // Poll EventLog table for new events
      const interval = setInterval(async () => {
        try {
          const since = new Date(Date.now() - 60000); // last 60 seconds
          const events = await prisma.eventLog.findMany({
            where: { createdAt: { gte: since } },
            orderBy: { createdAt: "asc" },
            take: 20,
          });

          for (const event of events) {
            const eventTs = event.createdAt.getTime();
            const lastKey = eventType === "orders" ? "orders" : "consultations";

            // Only process events matching our subscription type
            const isOrderEvent = event.type.includes("order") && eventType === "orders";
            const isConsEvent = event.type.includes("consultation") && eventType === "consultations";

            if ((isOrderEvent || isConsEvent) && eventTs > lastSeen[lastKey]) {
              lastSeen[lastKey] = eventTs;

              // Fetch fresh data
              if (isOrderEvent) {
                const [orders, total] = await Promise.all([
                  prisma.mealOrder.findMany({
                    orderBy: { orderDate: "desc" },
                    take: 5,
                    include: {
                      mealPlan: true,
                      user: { select: { firstName: true, lastName: true, department: true } },
                    },
                  }),
                  prisma.mealOrder.count(),
                ]);
                controller.enqueue(`data: ${JSON.stringify({ type: "orders_update", orders, total })}\n\n`);
              } else if (isConsEvent) {
                const [consultations, total] = await Promise.all([
                  prisma.consultation.findMany({
                    orderBy: { scheduledAt: "desc" },
                    take: 5,
                    include: {
                      patient: { select: { firstName: true, lastName: true, department: true } },
                    },
                  }),
                  prisma.consultation.count(),
                ]);
                controller.enqueue(`data: ${JSON.stringify({ type: "consultations_update", consultations, total })}\n\n`);
              }
            }
          }

          // Heartbeat every 10s
          controller.enqueue(`: heartbeat ${Date.now()}\n\n`);
        } catch {
          // Silently handle DB errors in SSE
        }
      }, 3000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

/**
 * POST /api/events — Log an event (called by other API routes)
 * Stores event in EventLog table so all SSE instances pick it up.
 */
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { type, data } = body;

    if (type) {
      await prisma.eventLog.create({
        data: { type, data: data ? JSON.stringify(data) : null },
      });
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "خطأ" }, { status: 500 });
  }
}
