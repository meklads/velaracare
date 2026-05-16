import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if email exists or not — just return success
      return NextResponse.json({ message: "إذا كان البريد مسجلاً، سيتم إرسال رابط إعادة تعيين كلمة المرور" });
    }

    // TODO: In production, send actual email
    // For demo, we simulate success
    console.log(`[Forgot Password] Reset link for ${email} (demo mode)`);

    return NextResponse.json({
      message: "إذا كان البريد مسجلاً، سيتم إرسال رابط إعادة تعيين كلمة المرور",
      demo_mode: true,
      demo_reset_code: "123456",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
