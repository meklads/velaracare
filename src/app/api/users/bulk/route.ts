import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail, invitationEmail } from "@/lib/email";
import { randomBytes } from "crypto";

export const runtime = "nodejs";

function generatePassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$";
  let pw = "";
  const bytes = randomBytes(10);
  for (let i = 0; i < 10; i++) {
    pw += chars[bytes[i] % chars.length];
  }
  return pw;
}

// POST /api/users/bulk — bulk invite employees from CSV/JSON array
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  if (user.role !== "HR" && user.role !== "COMPANY_ADMIN" && user.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "غير مصرح" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { employees } = body;

    if (!Array.isArray(employees) || employees.length === 0) {
      return NextResponse.json({ error: "يرجى تقديم قائمة بالموظفين" }, { status: 400 });
    }

    if (employees.length > 200) {
      return NextResponse.json({ error: "الحد الأقصى ٢٠٠ موظف في المرة الواحدة" }, { status: 400 });
    }

    const results: { success: boolean; email: string; name: string; error?: string }[] = [];
    const companyId = user.companyId ?? undefined;

    for (const emp of employees) {
      try {
        if (!emp.email || !emp.firstName) {
          results.push({ success: false, email: emp.email || "—", name: emp.firstName || "—", error: "البريد الإلكتروني والاسم مطلوبان" });
          continue;
        }

        // Check duplicate
        const existing = await prisma.user.findUnique({ where: { email: emp.email } });
        if (existing) {
          results.push({ success: false, email: emp.email, name: `${emp.firstName} ${emp.lastName || ""}`, error: "البريد مستخدم بالفعل" });
          continue;
        }

        const password = generatePassword();

        const created = await prisma.user.create({
          data: {
            email: emp.email,
            firstName: emp.firstName,
            lastName: emp.lastName || "",
            phone: emp.phone ?? null,
            role: emp.role || "EMPLOYEE",
            department: emp.department ?? null,
            position: emp.position ?? null,
            companyId: companyId || null,
            passwordHash: password,
          },
          select: { id: true, email: true, firstName: true, lastName: true },
        });

        // Send invitation email (non-blocking)
        sendEmail(
          emp.email,
          "🎉 مرحباً بك في Velara Care",
          invitationEmail(`${emp.firstName} ${emp.lastName || ""}`, emp.email, password, body.companyName || "الشركة")
        ).catch(() => {});

        results.push({ success: true, email: emp.email, name: `${emp.firstName} ${emp.lastName || ""}` });
      } catch (err: any) {
        results.push({ success: false, email: emp.email || "—", name: emp.firstName || "—", error: err.message || "خطأ في الإنشاء" });
      }
    }

    const succeeded = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    return NextResponse.json({
      total: employees.length,
      succeeded,
      failed,
      results,
      message: `تم إنشاء ${succeeded} موظف بنجاح${failed > 0 ? `، فشل ${failed}` : ""}`,
    });
  } catch (error) {
    console.error("Bulk users POST error:", error);
    return NextResponse.json({ error: "خطأ في الاستيراد الجماعي" }, { status: 500 });
  }
}
