import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

// GET /api/billing — get invoices for company
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const user = session.user as any;
  const isAdmin = user.role === "COMPANY_ADMIN" || user.role === "SUPER_ADMIN";
  if (!isAdmin) return NextResponse.json({ error: "غير مصرح" }, { status: 403 });

  try {
    const invoices = await prisma.invoice.findMany({
      where: { companyId: user.companyId },
      orderBy: { periodStart: "desc" },
      take: 12,
    });

    const totalBilled = invoices.reduce((s, i) => s + i.amount, 0);
    const pendingAmount = invoices.filter(i => i.status === "pending").reduce((s, i) => s + i.amount, 0);
    const paidCount = invoices.filter(i => i.status === "paid").length;

    return NextResponse.json({ invoices, summary: { totalBilled, pendingAmount, paidCount, totalInvoices: invoices.length } });
  } catch (error) {
    console.error("Billing error:", error);
    return NextResponse.json({ error: "خطأ في جلب الفواتير" }, { status: 500 });
  }
}

// POST /api/billing — create invoice (SuperAdmin only)
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "غير مصرح" }, { status: 401 });

  const user = session.user as any;
  if (user.role !== "SUPER_ADMIN") return NextResponse.json({ error: "غير مصرح" }, { status: 403 });

  const body = await req.json();
  try {
    const invoice = await prisma.invoice.create({
      data: {
        companyId: body.companyId,
        amount: body.amount || 0,
        currency: body.currency || "SAR",
        status: body.status || "pending",
        plan: body.plan || "basic",
        periodStart: new Date(body.periodStart),
        periodEnd: new Date(body.periodEnd),
      },
    });
    return NextResponse.json(invoice, { status: 201 });
  } catch (error) {
    console.error("Invoice create error:", error);
    return NextResponse.json({ error: "خطأ في إنشاء الفاتورة" }, { status: 500 });
  }
}
