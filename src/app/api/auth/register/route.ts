import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import { sendEmail } from "@/lib/email";

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
          passwordHash: hashPassword(password),
          firstName,
          lastName,
          role: "COMPANY_ADMIN",
          companyId: company.id,
        },
      });

      return { user, company };
    });

    // Send welcome email (non-blocking)
    const baseUrl = process.env.NEXTAUTH_URL || "https://velaracare.co";
    sendEmail(
      email,
      "🎉 مرحباً بك في Velara Care",
      `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body{margin:0;padding:0;background:#f5f7fa;font-family:"Segoe UI",Tajawal,sans-serif}
        .wrapper{background:#f5f7fa;padding:32px 16px}
        .container{max-width:560px;background:#fff;border-radius:20px;overflow:hidden;margin:0 auto}
        .header{background:linear-gradient(135deg,#24A170,#1a7a54);padding:32px 40px;text-align:center}
        .header h1{margin:0;color:#fff;font-size:24px}
        .content{padding:32px 40px;color:#334155;font-size:15px;line-height:1.7}
        .btn{display:inline-block;background:linear-gradient(135deg,#24A170,#1a7a54);color:#fff;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:600;margin:16px 0}
        .footer{padding:24px 40px;text-align:center;border-top:1px solid #e9edf2}
        .footer p{margin:0;font-size:12px;color:#94a3b8}
      </style>
      </head>
      <body>
        <table width="100%" cellpadding="0" cellspacing="0" class="wrapper">
          <tr><td align="center">
            <table cellpadding="0" cellspacing="0" class="container">
              <tr><td class="header"><h1>🎉 مرحباً بك في Velara Care</h1></td></tr>
              <tr><td class="content">
                <p>مرحباً ${firstName}،</p>
                <p>تم إنشاء حسابك بنجاح في منصة Velara Care — منصة الصحة المؤسسية الذكية.</p>
                <p>يمكنك الآن:</p>
                <ul>
                  <li>إجراء التقييم الصحي (HRA) للحصول على درجة العافية</li>
                  <li>حجز استشارات مع أخصائيي التغذية واللياقة</li>
                  <li>طلب وجبات صحية مخصصة</li>
                  <li>متابعة تقدمك الصحي عبر لوحة التحكم</li>
                </ul>
                <div style="text-align:center">
                  <a href="${baseUrl}/login" class="btn">تسجيل الدخول الآن</a>
                </div>
              </td></tr>
              <tr><td class="footer">
                <p>Velara Care — منصة الصحة المؤسسية الذكية</p>
                <p style="font-size:11px;color:#cbd5e1;">© ${new Date().getFullYear()} Velara Care</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
      </html>
      `
    );

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
