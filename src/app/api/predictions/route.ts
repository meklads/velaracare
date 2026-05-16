import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generatePredictions } from "@/lib/predictions";

export const runtime = "nodejs";

// GET /api/predictions — get AI predictions for current user or company
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const url = new URL(req.url);
  const companyId = url.searchParams.get("companyId");

  try {
    if (companyId && (user.role === "HR" || user.role === "COMPANY_ADMIN" || user.role === "SUPER_ADMIN")) {
      const predictions = await prisma.aIPrediction.findMany({
        where: {
          user: { companyId },
        },
        include: {
          user: { select: { firstName: true, lastName: true, department: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 50,
      });
      return NextResponse.json(predictions);
    }

    // Get existing predictions
    let predictions = await prisma.aIPrediction.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    // If no predictions exist, try to generate from latest HRA
    if (predictions.length === 0) {
      const latestHRA = await prisma.hRAResult.findFirst({
        where: { userId: user.id },
        orderBy: { completedAt: "desc" },
      });

      if (latestHRA?.responses) {
        const responses = latestHRA.responses as any;
        const computed = generatePredictions(responses);

        // Save generated predictions
        for (const pred of computed) {
          const saved = await prisma.aIPrediction.create({
            data: {
              userId: user.id,
              type: pred.type,
              probability: pred.probability,
              riskLevel: pred.riskLevel,
              factors: pred.factors,
              suggestions: pred.suggestions,
              expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            },
          });
          predictions.push(saved);
        }
      }
    }

    return NextResponse.json(predictions);
  } catch (error) {
    console.error("Predictions GET error:", error);
    return NextResponse.json({ error: "خطأ في جلب التوقعات" }, { status: 500 });
  }
}

// POST /api/predictions — generate a new prediction
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "غير مصرح" }, { status: 401 });
  }

  const user = session.user as any;
  const body = await req.json();

  try {
    const { type, probability, riskLevel, factors, suggestions } = body;

    const prediction = await prisma.aIPrediction.create({
      data: {
        userId: user.id,
        type: type || "general",
        probability: probability || 0,
        riskLevel: riskLevel || "low",
        factors: factors || {},
        suggestions: suggestions || [],
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
      },
    });

    return NextResponse.json(prediction, { status: 201 });
  } catch (error) {
    console.error("Predictions POST error:", error);
    return NextResponse.json({ error: "خطأ في إنشاء التوقع" }, { status: 500 });
  }
}
