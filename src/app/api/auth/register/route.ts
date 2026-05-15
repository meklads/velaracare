import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName, companyName, employeeCount } = body;

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "جميع الحقول المطلوبة يجب أن تكون ممتلئة" },
        { status: 400 }
      );
    }

    // Check existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "البريد الإلكتروني مسجل بالفعل" },
        { status: 409 }
      );
    }

    // Parse employee count for company size
    let size = 0;
    if (employeeCount) {
      const match = employeeCount.match(/(\d+)/);
      if (match) size = parseInt(match[1]) * (employeeCount.includes("أكثر") ? 2 : 1);
    }

    // Create company + user in transaction
    const result = await prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: {
          name: companyName || `${firstName}'s Company`,
          arabicName: companyName || `شركة ${firstName}`,
          size,
          status: "active",
          plan: "basic",
        },
      });

      const user = await tx.user.create({
        data: {
          email,
          passwordHash: password, // TODO: use bcrypt in production
          firstName,
          lastName,
          role: "COMPANY_ADMIN",
          companyId: company.id,
        },
      });

      return { user, company };
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: result.user.id,
          email: result.user.email,
          name: `${result.user.firstName} ${result.user.lastName}`,
          role: result.user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء الحساب. حاول مرة أخرى." },
      { status: 500 }
    );
  }
}
