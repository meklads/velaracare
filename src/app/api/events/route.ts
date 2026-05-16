import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── In-memory store for tracking changes ──
// In production with multiple instances, replace with Redis Pub/Sub
const globalState = globalThis as any;
if (!globalState.__orderTimestamps) {
  globalState.__orderTimestamps = { lastOrderCount: 0, lastUpdate: Date.now() };
}

/**
 * GET /api/events — Server-Sent Events endpoint
 * Streams real-time updates (new orders, status changes) to connected clients.
 */
export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get("type") || "orders";

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(`data: ${JSON.stringify({ type: "connected", message: "مرحباً! تم الاتصال بالخادم المباشر" })}\n\n`);

      // Keep connection alive with periodic checks
      const interval = setInterval(async () => {
        try {
          if (type === "orders") {
            const count = await prisma.mealOrder.count();
            const lastCount = globalState.__orderTimestamps.lastOrderCount;

            if (count !== lastCount) {
              globalState.__orderTimestamps.lastOrderCount = count;
              globalState.__orderTimestamps.lastUpdate = Date.now();

              // Fetch latest orders
              const orders = await prisma.mealOrder.findMany({
                orderBy: { orderDate: "desc" },
                take: 5,
                include: {
                  mealPlan: true,
                  user: { select: { firstName: true, lastName: true, department: true } },
                },
              });

              controller.enqueue(`data: ${JSON.stringify({ type: "orders_update", orders, total: count })}\n\n`);
            }
          } else if (type === "consultations") {
            const count = await prisma.consultation.count();
            const lastCount = globalState.__consultationTimestamps?.lastCount || 0;

            if (count !== lastCount) {
              if (!globalState.__consultationTimestamps) globalState.__consultationTimestamps = { lastCount: 0 };
              globalState.__consultationTimestamps.lastCount = count;

              const consultations = await prisma.consultation.findMany({
                orderBy: { scheduledAt: "desc" },
                take: 5,
                include: {
                  patient: { select: { firstName: true, lastName: true, department: true } },
                },
              });

              controller.enqueue(`data: ${JSON.stringify({ type: "consultations_update", consultations, total: count })}\n\n`);
            }
          }

          // Heartbeat every 10s to keep connection alive
          controller.enqueue(`: heartbeat ${Date.now()}\n\n`);
        } catch (e) {
          // Silently handle DB errors in SSE
        }
      }, 3000);

      // Clean up on disconnect
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
 * POST /api/events — Trigger an event (called by other API routes)
 * Use this to immediately notify SSE clients without waiting for the next poll.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type } = body;

    if (type === "order_updated" || type === "new_order") {
      globalState.__orderTimestamps.lastOrderCount = await prisma.mealOrder.count();
      globalState.__orderTimestamps.lastUpdate = Date.now();
    } else if (type === "consultation_updated" || type === "new_consultation") {
      if (!globalState.__consultationTimestamps) globalState.__consultationTimestamps = { lastCount: 0 };
      globalState.__consultationTimestamps.lastCount = await prisma.consultation.count();
    }

    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "خطأ" }, { status: 500 });
  }
}
