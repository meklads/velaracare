import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// ── POST /api/push — subscribe or unsubscribe ──
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const body = await req.json();

  try {
    const { action, subscription } = body;

    if (action === "subscribe" && subscription) {
      // Store or update push subscription
      const existing = await prisma.pushSubscription.findUnique({
        where: { userId: user.id },
      });

      if (existing) {
        await prisma.pushSubscription.update({
          where: { userId: user.id },
          data: { subscription: JSON.stringify(subscription), updatedAt: new Date() },
        });
      } else {
        await prisma.pushSubscription.create({
          data: {
            userId: user.id,
            subscription: JSON.stringify(subscription),
          },
        });
      }

      return NextResponse.json({ success: true, subscribed: true });
    }

    if (action === "unsubscribe") {
      await prisma.pushSubscription.deleteMany({ where: { userId: user.id } });
      return NextResponse.json({ success: true, subscribed: false });
    }

    return NextResponse.json({ error: "إجراء غير معروف" }, { status: 400 });
  } catch (error) {
    console.error("Push subscription error:", error);
    return NextResponse.json({ error: "خطأ في الاشتراك" }, { status: 500 });
  }
}

// ── GET /api/push — check subscription status ──
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;

  try {
    const sub = await prisma.pushSubscription.findUnique({
      where: { userId: user.id },
    });

    return NextResponse.json({
      subscribed: !!sub,
      subscription: sub ? JSON.parse(sub.subscription) : null,
    });
  } catch (error) {
    console.error("Push GET error:", error);
    return NextResponse.json({ error: "خطأ" }, { status: 500 });
  }
}
