import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/consultations
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const type = url.searchParams.get("type"); // upcoming, completed, all

  try {
    const now = new Date();
    let whereClause: any = {};

    if (user.role === "EMPLOYEE") {
      whereClause.patientId = user.id;
    } else if (user.role === "NUTRITIONIST") {
      whereClause.consultantId = user.id;
    } else if (user.role === "HR" || user.role === "COMPANY_ADMIN") {
      whereClause.companyId = user.companyId;
    }

    if (type === "upcoming") {
      whereClause.scheduledAt = { gte: now };
      whereClause.status = { not: "cancelled" };
    } else if (type === "completed") {
      whereClause.status = "completed";
    }

    const consultations = await prisma.consultation.findMany({
      where: whereClause,
      include: {
        patient: { select: { firstName: true, lastName: true, email: true, department: true } },
        consultant: { select: { firstName: true, lastName: true } },
      },
      orderBy: { scheduledAt: "desc" },
      take: 50,
    });

    return NextResponse.json(consultations);
  } catch (error) {
    console.error("Consultations GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب الاستشارات" }, { status: 500 });
  }
}

// POST /api/consultations
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const body = await req.json();

  try {
    if (!body.scheduledAt) {
      return NextResponse.json({ error: "تاريخ الاستشارة مطلوب" }, { status: 400 });
    }

    const consultation = await prisma.consultation.create({
      data: {
        patientId: body.patientId || user.id,
        consultantId: body.consultantId ?? null,
        type: body.type || "general",
        status: "scheduled",
        scheduledAt: new Date(body.scheduledAt),
        notes: body.notes ?? null,
        companyId: user.companyId ?? null,
      },
    });

    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error("Consultations POST error:", error);
    return NextResponse.json({ error: "خطأ في إنشاء الاستشارة" }, { status: 500 });
  }
}

// PATCH /api/consultations — update status
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const body = await req.json();

  try {
    if (!body.id) {
      return NextResponse.json({ error: "معرف الاستشارة مطلوب" }, { status: 400 });
    }

    const consultation = await prisma.consultation.update({
      where: { id: body.id },
      data: {
        status: body.status ?? undefined,
        consultantId: body.consultantId ?? undefined,
        notes: body.notes ?? undefined,
        completedAt: body.status === "completed" ? new Date() : undefined,
      },
    });

    return NextResponse.json(consultation);
  } catch (error) {
    console.error("Consultations PATCH error:", error);
    return NextResponse.json({ error: "خطأ في تحديث الاستشارة" }, { status: 500 });
  }
}
