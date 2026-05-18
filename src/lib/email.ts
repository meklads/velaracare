import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "sandbox.smtp.mailtrap.io",
  port: parseInt(process.env.SMTP_PORT || "2525"),
  auth: {
    user: process.env.SMTP_USER || "dummy",
    pass: process.env.SMTP_PASS || "dummy",
  },
});

const fromName = process.env.EMAIL_FROM_NAME || "Velara Care";
const fromEmail = process.env.EMAIL_FROM || "noreply@velaracare.co";

export async function sendEmail(to: string, subject: string, html: string) {
  try {
    // In development, log instead of sending if no SMTP configured
    if (!process.env.SMTP_HOST || process.env.SMTP_HOST === "sandbox.smtp.mailtrap.io") {
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

// ── Email Templates ──

export function forgotPasswordEmail(name: string, code: string): string {
  const baseUrl = process.env.NEXTAUTH_URL || "https://velaracare.co";
  return `
    <div dir="rtl" style="font-family: 'Avenir Arabic','Tajawal', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); text-align: center; line-height: 50px; color: white; font-size: 28px; font-weight: bold;">V</div>
        <h1 style="color: #1a1a2e; margin-top: 10px;">Velara Care</h1>
      </div>
      <h2 style="color: #1a1a2e;">استعادة كلمة المرور</h2>
      <p style="color: #666; line-height: 1.6;">مرحباً ${name}،</p>
      <p style="color: #666; line-height: 1.6;">لقد تلقينا طلباً لاستعادة كلمة المرور الخاصة بحسابك في Velara Care. استخدم رمز التحقق التالي:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="display: inline-block; padding: 15px 40px; background: #f3f4f6; border-radius: 12px; font-size: 32px; font-weight: bold; color: #10B981; letter-spacing: 8px; direction: ltr;">${code}</span>
      </div>
      <p style="color: #666; line-height: 1.6;">هذا الرمز صالح لمدة ٣٠ دقيقة. يمكنك استخدامه أدناه:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${baseUrl}/reset-password"
           style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #10B981, #059669); color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">
          إعادة تعيين كلمة المرور
        </a>
      </div>
      <p style="color: #999; font-size: 12px; text-align: center;">إذا لم تطلب استعادة كلمة المرور، يمكنك تجاهل هذه الرسالة.</p>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px; text-align: center;">Velara Care — منصة الصحة المؤسسية الذكية<br>المملكة العربية السعودية</p>
    </div>
  `;
}

export function invitationEmail(name: string, email: string, password: string, company: string): string {
  return `
    <div dir="rtl" style="font-family: 'Avenir Arabic','Tajawal', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); text-align: center; line-height: 50px; color: white; font-size: 28px; font-weight: bold;">V</div>
        <h1 style="color: #1a1a2e; margin-top: 10px;">Velara Care</h1>
      </div>
      <h2 style="color: #1a1a2e;">مرحباً بك في ${company} 👋</h2>
      <p style="color: #666; line-height: 1.6;">مرحباً ${name}،</p>
      <p style="color: #666; line-height: 1.6;">تم إنشاء حسابك في منصة Velara Care للصحة والعافية. يمكنك الآن تسجيل الدخول والاستفادة من خدماتنا:</p>
      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong style="color: #374151;">البريد الإلكتروني:</strong> <span style="color: #10B981;" dir="ltr">${email}</span></p>
        <p style="margin: 5px 0;"><strong style="color: #374151;">كلمة المرور المؤقتة:</strong> <span style="color: #10B981;" dir="ltr">${password}</span></p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXTAUTH_URL || "https://velaracare.co"}/login"
           style="display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #10B981, #059669); color: white; text-decoration: none; border-radius: 12px; font-weight: bold;">
          تسجيل الدخول الآن
        </a>
      </div>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px; text-align: center;">Velara Care — منصة الصحة المؤسسية الذكية<br>المملكة العربية السعودية</p>
    </div>
  `;
}

export function bookingConfirmationEmail(name: string, type: string, date: string, time: string): string {
  return `
    <div dir="rtl" style="font-family: 'Avenir Arabic','Tajawal', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-block; width: 50px; height: 50px; border-radius: 12px; background: linear-gradient(135deg, #10B981, #059669); text-align: center; line-height: 50px; color: white; font-size: 28px; font-weight: bold;">V</div>
        <h1 style="color: #1a1a2e; margin-top: 10px;">Velara Care</h1>
      </div>
      <h2 style="color: #1a1a2e;">✅ تم تأكيد الحجز</h2>
      <p style="color: #666; line-height: 1.6;">مرحباً ${name}،</p>
      <p style="color: #666; line-height: 1.6;">تم حجز استشارتك بنجاح. إليك تفاصيل الموعد:</p>
      <div style="background: #f9fafb; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: center;">
        <p style="font-size: 18px; color: #10B981; font-weight: bold; margin: 5px 0;">${type}</p>
        <p style="color: #374151; margin: 5px 0;">📅 ${date}</p>
        <p style="color: #374151; margin: 5px 0;">⏰ ${time}</p>
      </div>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />
      <p style="color: #999; font-size: 12px; text-align: center;">Velara Care — منصة الصحة المؤسسية الذكية<br>المملكة العربية السعودية</p>
    </div>
  `;
}
