import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/users/[id] — get single user by ID (with wellness data)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;
  const user = session.user as any;

  try {
    const target = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        department: true,
        position: true,
        isActive: true,
        companyId: true,
        createdAt: true,
        updatedAt: true,
        wellnessScore: {
          select: {
            score: true,
            riskLevel: true,
            sleepScore: true,
            stressScore: true,
            activityScore: true,
            nutritionScore: true,
            bmiScore: true,
            trend: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!target) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    // Security: ensure users can only access their own data or within their company
    const isOwn = target.id === user.id;
    const isSuperAdmin = user.role === "SUPER_ADMIN";
    const isSameCompany = user.companyId && target.companyId === user.companyId;
    const isPrivileged = ["HR", "COMPANY_ADMIN", "NUTRITIONIST"].includes(user.role);

    if (!isOwn && !isSuperAdmin && !(isSameCompany && isPrivileged)) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    return NextResponse.json(target);
  } catch (error) {
    console.error("User GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب المستخدم" }, { status: 500 });
  }
}

// PATCH /api/users/[id] — admin update a specific user
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;
  const currentUser = session.user as any;
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN";
  const isAdmin = ["HR", "COMPANY_ADMIN"].includes(currentUser.role);
  const isOwn = id === currentUser.id;

  if (!isOwn && !isAdmin && !isSuperAdmin) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    // Admins can only modify users in their own company
    if (isAdmin && target.companyId !== currentUser.companyId) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    const body = await req.json();

    // Non-admins can only update their own profile fields
    if (isOwn && !isAdmin && !isSuperAdmin) {
      const updated = await prisma.user.update({
        where: { id },
        data: {
          firstName: body.firstName ?? undefined,
          lastName: body.lastName ?? undefined,
          phone: body.phone ?? undefined,
          department: body.department ?? undefined,
          position: body.position ?? undefined,
        },
        select: {
          id: true, firstName: true, lastName: true, email: true,
          phone: true, department: true, position: true, role: true, isActive: true,
        },
      });
      return NextResponse.json(updated);
    }

    // Admin update
    const updated = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName ?? undefined,
        lastName: body.lastName ?? undefined,
        phone: body.phone ?? undefined,
        department: body.department ?? undefined,
        position: body.position ?? undefined,
        role: body.role ?? undefined,
        isActive: body.isActive ?? undefined,
      },
      select: {
        id: true, firstName: true, lastName: true, email: true,
        phone: true, role: true, department: true, position: true,
        isActive: true, companyId: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("User PATCH error:", error);
    return NextResponse.json({ error: "خطأ في تحديث المستخدم" }, { status: 500 });
  }
}

// DELETE /api/users/[id] — admin delete a user
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const { id } = await params;
  const currentUser = session.user as any;
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN";
  const isAdmin = ["HR", "COMPANY_ADMIN"].includes(currentUser.role);

  if (!isAdmin && !isSuperAdmin) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    if (isAdmin && target.companyId !== currentUser.companyId) {
      return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
    }

    // Don't allow deleting yourself
    if (id === currentUser.id) {
      return NextResponse.json({ error: "لا يمكن حذف حسابك" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "تم حذف المستخدم" });
  } catch (error) {
    console.error("User DELETE error:", error);
    return NextResponse.json({ error: "خطأ في حذف المستخدم" }, { status: 500 });
  }
}
