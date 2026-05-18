import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  try {
    const { email, code, password } = await req.json();

    if (!email || !code || !password) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "المستخدم غير موجود" }, { status: 404 });
    }

    // Verify reset code
    if (user.resetCode !== code) {
      return NextResponse.json({ error: "رمز التحقق غير صحيح" }, { status: 403 });
    }

    // Check expiry
    if (user.resetCodeExpires && new Date() > user.resetCodeExpires) {
      return NextResponse.json({ error: "انتهت صلاحية رمز التحقق. أعد طلب استعادة جديدة." }, { status: 410 });
    }

    // Update password and clear reset code
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashPassword(password),
        resetCode: null,
        resetCodeExpires: null,
      },
    });

    return NextResponse.json({ message: "تم تحديث كلمة المرور بنجاح" });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
