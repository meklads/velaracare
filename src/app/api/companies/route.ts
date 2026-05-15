import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/companies — list companies (SuperAdmin only)
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const companies = await prisma.company.findMany({
      include: {
        _count: { select: { users: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(companies);
  } catch (error) {
    console.error("Companies GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب الشركات" }, { status: 500 });
  }
}

// POST /api/companies — create company
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const body = await req.json();

  try {
    const company = await prisma.company.create({
      data: {
        name: body.name,
        arabicName: body.arabicName || "",
        domain: body.domain ?? null,
        logo: body.logo ?? null,
        size: body.size ?? 0,
        industry: body.industry ?? null,
        plan: body.plan || "basic",
        status: body.status || "active",
      },
    });

    return NextResponse.json(company, { status: 201 });
  } catch (error) {
    console.error("Companies POST error:", error);
    return NextResponse.json({ error: "خطأ في إنشاء الشركة" }, { status: 500 });
  }
}

// PATCH /api/companies — update company
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const body = await req.json();

  try {
    if (!body.id) {
      return NextResponse.json({ error: "معرف الشركة مطلوب" }, { status: 400 });
    }

    const company = await prisma.company.update({
      where: { id: body.id },
      data: {
        name: body.name ?? undefined,
        arabicName: body.arabicName ?? undefined,
        domain: body.domain ?? undefined,
        logo: body.logo ?? undefined,
        size: body.size ?? undefined,
        industry: body.industry ?? undefined,
        plan: body.plan ?? undefined,
        status: body.status ?? undefined,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.error("Companies PATCH error:", error);
    return NextResponse.json({ error: "خطأ في تحديث الشركة" }, { status: 500 });
  }
}
