import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple in-memory store for demo requests (production would use DB)
const demoRequests: any[] = [];

// POST /api/demo — submit a demo request
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, employeeCount } = body;

    if (!name || !company || !email) {
      return NextResponse.json({ error: "الحقول المطلوبة: الاسم، الشركة، البريد الإلكتروني" }, { status: 400 });
    }

    const request = {
      id: `demo_${Date.now()}`,
      name,
      company,
      email,
      phone: phone || null,
      employeeCount: employeeCount || "غير محدد",
      createdAt: new Date().toISOString(),
    };

    demoRequests.push(request);

    // In production: save to DB and send notification email
    console.log("📩 Demo request received:", request);

    return NextResponse.json({ success: true, message: "تم استلام طلبك بنجاح" }, { status: 201 });
  } catch (error) {
    console.error("Demo POST error:", error);
    return NextResponse.json({ error: "حدث خطأ في إرسال الطلب" }, { status: 500 });
  }
}

// GET /api/demo — list demo requests (for internal use)
export async function GET() {
  return NextResponse.json(demoRequests);
}
