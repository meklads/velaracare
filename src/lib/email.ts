import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

const fromName = process.env.EMAIL_FROM_NAME || "Velara Care";
const fromEmail = process.env.EMAIL_FROM || "noreply@velaracare.co";

// ── HTML email layout wrapper ──
function emailLayout(title: string, content: string): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { margin:0;padding:0;background-color:#f5f7fa;font-family:'Segoe UI',Tajawal,sans-serif; }
  .wrapper { background:#f5f7fa;padding:32px 16px; }
  .container { max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.05);margin:0 auto; }
  .header { background:linear-gradient(135deg,#24A170,#1a7a54);padding:32px 40px;text-align:center; }
  .header h1 { margin:0;color:#ffffff;font-size:24px;font-weight:700; }
  .content { padding:32px 40px;color:#334155;font-size:15px;line-height:1.7; }
  .footer { padding:24px 40px;border-top:1px solid #e9edf2;text-align:center; }
  .footer p { margin:0 0 4px;font-size:12px;color:#94a3b8; }
  .btn { display:inline-block;background:linear-gradient(135deg,#24A170,#1a7a54);color:#ffffff;padding:14px 36px;border-radius:12px;text-decoration:none;font-weight:600;font-size:15px;margin:16px 0; }
  .info-box { background:#f8fafc;border-radius:12px;padding:20px;margin:16px 0; }
  .code { display:inline-block;padding:15px 40px;background:#f3f4f6;border-radius:12px;font-size:32px;font-weight:bold;color:#24A170;letter-spacing:8px;direction:ltr;font-family:monospace; }
</style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" class="wrapper">
    <tr><td align="center">
      <table cellpadding="0" cellspacing="0" class="container">
        <tr><td class="header"><h1>${title}</h1></td></tr>
        <tr><td class="content">${content}</td></tr>
        <tr><td class="footer">
          <p>Velara Care — منصة الصحة المؤسسية الذكية</p>
          <p style="font-size:11px;color:#cbd5e1;">© ${new Date().getFullYear()} Velara Care. جميع الحقوق محفوظة.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Email Templates ──

export function forgotPasswordEmail(name: string, code: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || "https://velaracare.co";
  return emailLayout(
    "🔑 استعادة كلمة المرور",
    `
    <p>مرحباً ${name}،</p>
    <p>لقد تلقينا طلباً لاستعادة كلمة المرور الخاصة بحسابك في Velara Care.</p>
    <p>استخدم رمز التحقق التالي لإعادة تعيين كلمة المرور:</p>
    <div style="text-align:center;margin:24px 0;">
      <span class="code">${code}</span>
    </div>
    <p style="font-size:13px;color:#94a3b8;">هذا الرمز صالح لمدة 30 دقيقة.</p>
    <div style="text-align:center;">
      <a href="${baseUrl}/reset-password" class="btn">إعادة تعيين كلمة المرور</a>
    </div>
    <p style="font-size:13px;color:#94a3b8;margin-top:24px;">إذا لم تطلب استعادة كلمة المرور، يمكنك تجاهل هذه الرسالة.</p>
    `
  );
}

export function invitationEmail(name: string, email: string, password: string, company: string): string {
  return emailLayout(
    "🎉 مرحباً بك في Velara Care",
    `
    <p>مرحباً ${name}،</p>
    <p>تم إنشاء حسابك في منصة Velara Care للصحة والعافية في <strong>${company}</strong>.</p>
    <p>يمكنك الآن تسجيل الدخول والاستفادة من خدماتنا:</p>
    <div class="info-box">
      <p style="margin:5px 0;"><strong>البريد الإلكتروني:</strong> <span dir="ltr" style="color:#24A170;">${email}</span></p>
      <p style="margin:5px 0;"><strong>كلمة المرور المؤقتة:</strong> <span dir="ltr" style="color:#24A170;">${password}</span></p>
    </div>
    <div style="text-align:center;">
      <a href="${process.env.NEXTAUTH_URL || "https://velaracare.co"}/login" class="btn">تسجيل الدخول الآن</a>
    </div>
    <p style="font-size:13px;color:#94a3b8;">نوصي بتغيير كلمة المرور بعد أول تسجيل دخول.</p>
    `
  );
}

export function bookingConfirmationEmail(name: string, type: string, date: string, time: string): string {
  return emailLayout(
    "✅ تم تأكيد الحجز",
    `
    <p>مرحباً ${name}،</p>
    <p>تم حجز استشارتك بنجاح في Velara Care. إليك تفاصيل الموعد:</p>
    <div class="info-box" style="text-align:center;">
      <p style="font-size:18px;color:#24A170;font-weight:bold;margin:5px 0;">${type}</p>
      <p style="margin:5px 0;">📅 ${date}</p>
      <p style="margin:5px 0;">⏰ ${time}</p>
    </div>
    <p>سيتم إرسال تذكير قبل الموعد. يمكنك إدارة استشاراتك من لوحة التحكم.</p>
    `
  );
}

export function consultationReminderEmail(patientName: string, type: string, date: string, time: string): string {
  const typeLabels: Record<string, string> = { nutrition: "تغذية", fitness: "لياقة", general: "عام", mental: "نفسية" };
  return emailLayout(
    "📅 تذكير باستشارة",
    `
    <p>مرحباً ${patientName}،</p>
    <p>هذا تذكير باستشارتك القادمة في Velara Care:</p>
    <div class="info-box">
      <p style="margin:0 0 8px;"><strong>النوع:</strong> ${typeLabels[type] || type}</p>
      <p style="margin:0 0 8px;"><strong>التاريخ:</strong> ${date}</p>
      <p style="margin:0;"><strong>الوقت:</strong> ${time}</p>
    </div>
    <p>يرجى التأكد من جاهزيتك في الموعد المحدد.</p>
    `
  );
}

export function mealOrderConfirmationEmail(userName: string, mealName: string, orderDate: string): string {
  return emailLayout(
    "🍽️ تأكيد طلب وجبة",
    `
    <p>مرحباً ${userName}،</p>
    <p>تم تأكيد طلب وجبتك في Velara Care:</p>
    <div class="info-box">
      <p style="margin:0 0 8px;"><strong>الوجبة:</strong> ${mealName}</p>
      <p style="margin:0;"><strong>تاريخ الطلب:</strong> ${orderDate}</p>
    </div>
    <p>سيتم تحضير وجبتك وتوصيلها حسب الموعد المحدد.</p>
    `
  );
}

export function wellnessReportEmail(userName: string, score: number, riskLevel: string, reportUrl: string): string {
  const riskColors: Record<string, string> = { low: "#24A170", moderate: "#F59E0B", high: "#F97316", critical: "#EF4444" };
  const riskLabels: Record<string, string> = { low: "منخفض", moderate: "متوسط", high: "عالٍ", critical: "حرج" };
  return emailLayout(
    "📊 تقرير العافية الدوري",
    `
    <p>مرحباً ${userName}،</p>
    <p>هذا تقرير العافية الدوري الخاص بك:</p>
    <div style="text-align:center;margin:24px 0;">
      <div style="display:inline-flex;width:100px;height:100px;border-radius:50%;border:5px solid ${riskColors[riskLevel] || "#24A170"};align-items:center;justify-content:center;">
        <span style="font-size:32px;font-weight:700;color:${riskColors[riskLevel] || "#24A170"};">${score}</span>
      </div>
      <p style="margin:12px 0 0;font-size:18px;font-weight:600;color:${riskColors[riskLevel] || "#24A170"};">${riskLabels[riskLevel] || riskLevel}</p>
    </div>
    <div style="text-align:center;">
      <a href="${reportUrl}" class="btn">عرض التقرير الكامل</a>
    </div>
    `
  );
}

// ── Main send function ──
export async function sendEmail(to: string, subject: string, html: string) {
  try {
    // In development, log instead of sending if no SMTP configured
    if (
      !process.env.SMTP_HOST ||
      process.env.SMTP_HOST === "sandbox.smtp.mailtrap.io" ||
      process.env.SMTP_HOST === ""
    ) {
      console.log(`[EMAIL DEV] To: ${to}`);
      console.log(`[EMAIL DEV] Subject: ${subject}`);
      console.log(`[EMAIL DEV] Body: ${html.slice(0, 200)}...`);
      return { success: true, dev: true };
    }

    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log(`[EMAIL] Sent: ${info.messageId} -> ${to}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[EMAIL] Failed:", error);
    // Don't throw — email failure shouldn't break the app
    return { success: false, error: String(error) };
  }
}
