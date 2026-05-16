import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail, forgotPasswordEmail } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "البريد الإلكتروني مطلوب" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if email exists or not
      return NextResponse.json({ message: "إذا كان البريد مسجلاً، سيتم إرسال رمز استعادة كلمة المرور" });
    }

    // Generate 6-digit code
    const code = String(Math.floor(100000 + Math.random() * 900000));

    // Store the reset code in the user record (expires in 30 min)
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetCode: code,
        resetCodeExpires: expiresAt,
      },
    });

    // Send email
    const fullName = `${user.firstName} ${user.lastName}`;
    const result = await sendEmail(email, "🔐 استعادة كلمة المرور — Velara Care", forgotPasswordEmail(fullName, code));

    // In dev mode, return the code for testing
    const isDev = result.dev;

    return NextResponse.json({
      message: "إذا كان البريد مسجلاً، سيتم إرسال رمز استعادة كلمة المرور",
      ...(isDev ? { dev_code: code, dev_email: email } : {}),
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "حدث خطأ، حاول مرة أخرى" }, { status: 500 });
  }
}
