import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail, invitationEmail } from "@/lib/email";

export const runtime = "nodejs";

// GET /api/users — list users (HR/Admin/SuperAdmin)
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const department = url.searchParams.get("department");
  const role = url.searchParams.get("role");
  const companyId = url.searchParams.get("companyId");

  try {
    let whereClause: any = {};

    // Filter by company
    if (user.role === "SUPER_ADMIN") {
      if (companyId) whereClause.companyId = companyId;
    } else if (user.role === "HR" || user.role === "COMPANY_ADMIN") {
      whereClause.companyId = user.companyId;
    } else {
      // Regular users can only see themselves
      whereClause.id = user.id;
    }

    if (department) whereClause.department = department;
    if (role) whereClause.role = role;

    const users = await prisma.user.findMany({
      where: whereClause,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        department: true,
        position: true,
        isActive: true,
        companyId: true,
        createdAt: true,
        wellnessScore: { select: { score: true, riskLevel: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Users GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب المستخدمين" }, { status: 500 });
  }
}

// POST /api/users — invite/create new user (HR/Admin)
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== "HR" && user.role !== "COMPANY_ADMIN" && user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  const body = await req.json();

  try {
    if (!body.email || !body.firstName || !body.lastName) {
      return NextResponse.json({ error: "البريد الإلكتروني والاسم مطلوبان" }, { status: 400 });
    }

    // Check duplicate
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) {
      return NextResponse.json({ error: "البريد الإلكتروني مستخدم بالفعل" }, { status: 409 });
    }

    const password = body.password || "changeme123";
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone ?? null,
        role: body.role || "EMPLOYEE",
        department: body.department ?? null,
        position: body.position ?? null,
        companyId: body.companyId ?? user.companyId ?? null,
        passwordHash: password,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        department: true,
      },
    });

    // Send invitation email (non-blocking)
    sendEmail(body.email, "🎉 مرحباً بك في Velara Care", invitationEmail(
      `${body.firstName} ${body.lastName}`,
      body.email,
      password,
      body.companyName || "الشركة"
    ));

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Users POST error:", error);
    return NextResponse.json({ error: "خطأ في إنشاء المستخدم" }, { status: 500 });
  }
}

// PATCH /api/users — update own profile
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }
  const user = session.user as any;
  const body = await req.json();

  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName: body.firstName ?? undefined,
        lastName: body.lastName ?? undefined,
        phone: body.phone ?? undefined,
        department: body.department ?? undefined,
        position: body.position ?? undefined,
      },
      select: {
        id: true, firstName: true, lastName: true, email: true,
        phone: true, department: true, position: true, role: true,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Users PATCH error:", error);
    return NextResponse.json({ error: "خطأ في تحديث الملف الشخصي" }, { status: 500 });
  }
}
