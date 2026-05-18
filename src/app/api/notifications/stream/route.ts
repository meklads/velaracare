import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ── Per-connection last-seen tracker ──
const connections = new Map<string, number>();

/**
 * GET /api/notifications/stream — SSE endpoint for real-time notification updates
 * Keeps connection open and pushes "refresh" events when relevant DB changes occur.
 */
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response(null, { status: 401 });
  }

  const userId = session.user.id!;
  const connId = `${userId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  connections.set(connId, Date.now());

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      controller.enqueue(
        `data: ${JSON.stringify({ type: "connected", message: "✅ متصل بالإشعارات المباشرة" })}\n\n`
      );

      const interval = setInterval(async () => {
        try {
          const since = new Date(Date.now() - 30_000); // last 30 seconds
          const events = await prisma.eventLog.findMany({
            where: { createdAt: { gte: since } },
            orderBy: { createdAt: "asc" },
            take: 30,
          });

          for (const event of events) {
            const eventTs = event.createdAt.getTime();
            const lastSeen = connections.get(connId) || 0;

            if (eventTs > lastSeen) {
              connections.set(connId, eventTs);

              // Only push refresh for notification-relevant events
              const notifTypes = [
                "new_consultation",
                "consultation_updated",
                "new_order",
                "order_updated",
                "hra_completed",
                "user_invited",
              ];
              if (notifTypes.includes(event.type)) {
                controller.enqueue(
                  `data: ${JSON.stringify({ type: "notification_refresh", event: event.type })}\n\n`
                );
              }
            }
          }

          // Heartbeat every 15s
          controller.enqueue(`: heartbeat ${Date.now()}\n\n`);
        } catch {
          // Silent
        }
      }, 3000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        connections.delete(connId);
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
