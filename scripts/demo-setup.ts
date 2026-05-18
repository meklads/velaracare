import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { randomBytes, scryptSync } from "crypto";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const dbUrl = process.env.DATABASE_URL || "file:./dev.db";
const adapter = new PrismaLibSql({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

const DEMO_PASSWORD = hashPassword("demo123");

// ── Employee profiles with realistic health data ──
const employeeProfiles = [
  { firstName: "محمد", lastName: "الأحمد", dept: "تقنية المعلومات", position: "مطور برمجيات", score: 82, sleepScore: 78, stressScore: 35, activityScore: 70, nutritionScore: 85, bmiScore: 80, riskLevel: "low", trend: "improving" },
  { firstName: "سارة", lastName: "العبدالله", dept: "الموارد البشرية", position: "أخصائية موارد بشرية", score: 68, sleepScore: 55, stressScore: 65, activityScore: 60, nutritionScore: 72, bmiScore: 75, riskLevel: "moderate", trend: "declining" },
  { firstName: "فهد", lastName: "المطيري", dept: "المالية", position: "محلل مالي", score: 45, sleepScore: 40, stressScore: 80, activityScore: 35, nutritionScore: 50, bmiScore: 55, riskLevel: "high", trend: "declining" },
  { firstName: "نورة", lastName: "الغامدي", dept: "التسويق", position: "مديرة تسويق", score: 91, sleepScore: 88, stressScore: 20, activityScore: 85, nutritionScore: 90, bmiScore: 92, riskLevel: "low", trend: "improving" },
  { firstName: "خالد", lastName: "الزهراني", dept: "تقنية المعلومات", position: "مدير تقنية", score: 73, sleepScore: 65, stressScore: 45, activityScore: 68, nutritionScore: 76, bmiScore: 70, riskLevel: "low", trend: "stable" },
  { firstName: "هند", lastName: "الشريف", dept: "التسويق", position: "أخصائية تسويق", score: 58, sleepScore: 50, stressScore: 70, activityScore: 55, nutritionScore: 60, bmiScore: 65, riskLevel: "moderate", trend: "improving" },
  { firstName: "سلطان", lastName: "العتيبي", dept: "المبيعات", position: "مدير مبيعات", score: 76, sleepScore: 72, stressScore: 40, activityScore: 65, nutritionScore: 78, bmiScore: 82, riskLevel: "low", trend: "improving" },
  { firstName: "مريم", lastName: "الحربي", dept: "الموارد البشرية", position: "أخصائية تدريب", score: 88, sleepScore: 85, stressScore: 25, activityScore: 80, nutritionScore: 86, bmiScore: 90, riskLevel: "low", trend: "stable" },
  { firstName: "عبدالله", lastName: "القحطاني", dept: "الإدارة", position: "الرئيس التنفيذي", score: 62, sleepScore: 48, stressScore: 75, activityScore: 55, nutritionScore: 65, bmiScore: 60, riskLevel: "moderate", trend: "declining" },
  { firstName: "لينا", lastName: "المنصور", dept: "المالية", position: "محاسبة", score: 79, sleepScore: 76, stressScore: 30, activityScore: 74, nutritionScore: 80, bmiScore: 78, riskLevel: "low", trend: "stable" },
  { firstName: "بدر", lastName: "الدوسري", dept: "المبيعات", position: "مندوب مبيعات", score: 52, sleepScore: 45, stressScore: 72, activityScore: 48, nutritionScore: 55, bmiScore: 58, riskLevel: "high", trend: "improving" },
  { firstName: "أمل", lastName: "القرني", dept: "تقنية المعلومات", position: "محللة أنظمة", score: 85, sleepScore: 82, stressScore: 28, activityScore: 78, nutritionScore: 84, bmiScore: 86, riskLevel: "low", trend: "improving" },
];

// ── Meal plans ──
const mealPlans = [
  { name: "وجبة السكري (DASH)", type: "diabetic", calories: 1800, desc: "وجبة متوازنة منخفضة السكر لمرضى السكري — غنية بالألياف والبروتين" },
  { name: "وجبة تخفيف الوزن", type: "weight_loss", calories: 1500, desc: "سعرات حرارية مخفضة مع عناصر غذائية كاملة لخسارة الوزن الصحية" },
  { name: "وجبة الأداء العالي", type: "high_performance", calories: 2200, desc: "غنية بالبروتين والدهون الصحية لتعزيز الطاقة والتركيز" },
  { name: "وجبة عامة متوازنة", type: "general", calories: 2000, desc: "وجبة متوازنة تناسب جميع الموظفين — تحتوي على جميع العناصر الغذائية" },
  { name: "وجبة نباتية", type: "vegan", calories: 1700, desc: "وجبة نباتية كاملة غنية بالبروتين النباتي والخضروات الموسمية" },
  { name: "وجبة كيتو", type: "keto", calories: 1900, desc: "نظام كيتو منخفض الكربوهيدرات وعالي الدهون الصحية" },
  { name: "وجبة البحر المتوسط", type: "mediterranean", calories: 2100, desc: "نظام البحر المتوسط الصحي للقلب — زيت زيتون، أسماك، خضروات" },
  { name: "وجبة ما بعد التمرين", type: "post_workout", calories: 600, desc: "وجبة خفيفة غنية بالبروتين لتعافي العضلات بعد التمرين" },
  { name: "وجبة الإفطار الصحية", type: "breakfast", calories: 450, desc: "إفطار متكامل — شوفان، فواكه، بيض، وزبادي يوناني" },
  { name: "سموذي الطاقة", type: "smoothie", calories: 350, desc: "سموذي طبيعي بالفواكه الطازجة والسبيرولينا لزيادة النشاط" },
];

// ── Consultation types and slots ──
const consultants = [
  { first: "د. سارة", last: "العبدان", type: "nutrition" },
  { first: "د. أحمد", last: "البسام", type: "fitness" },
  { first: "د. لمى", last: "الحقيل", type: "general" },
];

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function daysFromNow(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

function generateTrendHistory(baseScore: number, days: number = 30): { date: string; score: number; riskLevel: string }[] {
  const history: { date: string; score: number; riskLevel: string }[] = [];
  let score = baseScore - 5;
  for (let i = days; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    // Add some natural variation
    score += Math.round((Math.random() - 0.45) * 4);
    score = Math.max(30, Math.min(100, score));
    const risk = score >= 70 ? "low" : score >= 50 ? "moderate" : "high";
    history.push({ date: d.toISOString(), score, riskLevel: risk });
  }
  return history;
}

async function ensureCompany(data: { name: string; arabicName: string; domain: string; size: number; industry: string; plan: string }) {
  let company = await prisma.company.findUnique({ where: { domain: data.domain } });
  if (!company) {
    company = await prisma.company.create({ data: { ...data, status: "active" } });
    console.log(`  ✅ شركة "${data.arabicName}" تم إنشاؤها`);
  } else {
    console.log(`  ℹ️ شركة "${data.arabicName}" موجودة مسبقاً`);
  }
  return company;
}

async function ensureUser(email: string, data: any, companyId: string) {
  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({
      data: { ...data, email, passwordHash: DEMO_PASSWORD, companyId, isActive: true },
    });
    console.log(`  ✅ ${email}`);
  } else {
    await prisma.user.update({ where: { email }, data: { passwordHash: DEMO_PASSWORD, isActive: true, ...data } });
    user = { ...user, ...data };
  }
  return user;
}

async function seedWellnessScore(userId: string, companyId: string, profile: typeof employeeProfiles[0]) {
  const existing = await prisma.wellnessScore.findUnique({ where: { userId } });
  if (existing) {
    await prisma.wellnessScore.update({
      where: { userId },
      data: {
        score: profile.score, sleepScore: profile.sleepScore, stressScore: profile.stressScore,
        activityScore: profile.activityScore, nutritionScore: profile.nutritionScore,
        bmiScore: profile.bmiScore, riskLevel: profile.riskLevel, trend: profile.trend,
        companyId,
      },
    });
    return;
  }

  await prisma.wellnessScore.create({
    data: {
      userId, companyId,
      score: profile.score, sleepScore: profile.sleepScore, stressScore: profile.stressScore,
      activityScore: profile.activityScore, nutritionScore: profile.nutritionScore,
      bmiScore: profile.bmiScore, riskLevel: profile.riskLevel, trend: profile.trend,
    },
  });
}

async function seedHRA(userId: string, profile: typeof employeeProfiles[0], numAssessments: number) {
  const existingCount = await prisma.hRAResult.count({ where: { userId } });
  if (existingCount >= numAssessments) return;

  for (let i = 0; i < numAssessments; i++) {
    const daysBack = 90 - i * 30;
    const bmiVal = profile.bmiScore < 60 ? 32 : profile.bmiScore < 75 ? 27 : 22;
    const activityLevel = profile.activityScore >= 80 ? "high" : profile.activityScore >= 60 ? "moderate" : "light";
    const sleepHrs = profile.sleepScore >= 80 ? "7.5" : profile.sleepScore >= 60 ? "6.5" : "5";
    const stressLevel = profile.stressScore >= 70 ? "high" : profile.stressScore >= 40 ? "medium" : "low";
    const dietType = profile.nutritionScore >= 80 ? "balanced" : profile.nutritionScore >= 60 ? "moderate" : "high_fat";
    const waterIntake = profile.nutritionScore >= 80 ? "8" : "4";
    const smoking = "no";
    const familyHistory = profile.riskLevel === "high" ? "yes" : "no";
    const bloodPressure = profile.riskLevel === "high" ? "high" : profile.riskLevel === "moderate" ? "borderline" : "normal";
    const mental = profile.stressScore >= 70 ? "poor" : "good";
    const diet = dietType;

    // Prepare responses
    const responses = {
      bmi: String(bmiVal),
      smoking,
      activity: activityLevel,
      sleepHours: sleepHrs,
      stress: stressLevel,
      familyHistory,
      bloodPressure,
      diet,
      water: waterIntake,
      mental,
    };

    // Calculate risk score consistent with wellness score
    const score = profile.score + Math.round((Math.random() - 0.5) * 10);
    const riskLevel = score >= 70 ? "low" : score >= 50 ? "moderate" : "high";

    const recommendations = {
      riskLevel,
      score: Math.round((100 - score) / 10),
      recommendations: [
        ...(stressLevel === "high" ? ["جلسات استرخاء وتأمل — احجز استشارة مع مختص الصحة النفسية"] : []),
        ...(activityLevel === "light" ? ["ابدأ بالمشي ٣٠ دقيقة يومياً — سنساعدك بخطة تدريجية"] : []),
        ...(bmiVal > 25 ? ["خطة تغذية مخصصة لتحقيق الوزن الصحي — استشر أخصائي التغذية"] : []),
        ...(sleepHrs < "6" ? ["تحسين جودة النوم — قلل استخدام الشاشات قبل النوم"] : []),
        "استمر في نمط حياتك الصحي ✅",
      ].slice(0, 3),
      nextSteps: "تابع نمط حياتك الصحي",
    };

    // Check if this specific assessment already exists (same userId completedAt is approximate)
    const existingHRA = await prisma.hRAResult.findFirst({
      where: { userId, completedAt: { gte: daysAgo(daysBack - 2), lte: daysAgo(daysBack + 2) } },
    });
    if (existingHRA) continue;

    await prisma.hRAResult.create({
      data: {
        userId,
        riskLevel,
        responses,
        recommendations,
        completedAt: daysAgo(daysBack - Math.round(Math.random() * 5)),
      },
    });
  }
  console.log(`  ✅ ${numAssessments} تقييمات صحية`);
}

async function seedPredictions(userId: string, profile: typeof employeeProfiles[0]) {
  const existingCount = await prisma.aIPrediction.count({ where: { userId } });
  if (existingCount >= 3) return;

  const predictions: { type: string; probability: number; riskLevel: string; factors: Record<string, number>; suggestions: string[] }[] = [];

  if (profile.bmiScore < 70 || profile.nutritionScore < 60) {
    predictions.push({
      type: "obesity",
      probability: profile.bmiScore < 60 ? 0.75 : 0.35,
      riskLevel: profile.bmiScore < 60 ? "high" : "moderate",
      factors: { bmi: profile.bmiScore < 60 ? 0.45 : 0.3, nutrition: 0.25 },
      suggestions: ["برنامج تخفيف وزن تدريجي تحت إشراف أخصائي تغذية", "خطة تغذية متوازنة تعتمد على البروتين والخضروات"],
    });
  }

  if (profile.stressScore >= 60 || profile.sleepScore < 60) {
    predictions.push({
      type: "burnout",
      probability: profile.stressScore >= 70 ? 0.8 : 0.4,
      riskLevel: profile.stressScore >= 70 ? "high" : "moderate",
      factors: { stress: profile.stressScore / 100, sleep: profile.sleepScore < 60 ? 0.3 : 0.1 },
      suggestions: ["تقنيات إدارة التوتر واليقظة الذهنية", "تحسين جودة النوم — تجنب الشاشات قبل النوم"],
    });
  }

  if (profile.score < 70) {
    predictions.push({
      type: "productivity",
      probability: profile.score < 50 ? 0.65 : 0.3,
      riskLevel: profile.score < 50 ? "moderate" : "low",
      factors: { sleep: 0.2, stress: 0.25, activity: 0.15 },
      suggestions: ["تحسين النوم يزيد الإنتاجية", "إدارة التوتر تزيد التركيز"],
    });
  }

  if (profile.score >= 75) {
    predictions.push({
      type: "productivity",
      probability: 0.2,
      riskLevel: "low",
      factors: { sleep: 0.1, nutrition: 0.08 },
      suggestions: ["حافظ على نمط حياتك الصحي — أداؤك في مستوى ممتاز"],
    });
  }

  for (const pred of predictions) {
    const existing = await prisma.aIPrediction.findFirst({
      where: { userId, type: pred.type },
    });
    if (existing) continue;

    await prisma.aIPrediction.create({
      data: {
        userId, type: pred.type, probability: pred.probability,
        riskLevel: pred.riskLevel, factors: pred.factors,
        suggestions: pred.suggestions,
        expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      },
    });
  }
  console.log(`  ✅ ${predictions.length} توقعات ذكية`);
}

async function seedMealOrders(userId: string, companyId: string) {
  const existingCount = await prisma.mealOrder.count({ where: { userId } });
  if (existingCount >= 3) return;

  const statuses = ["delivered", "delivered", "delivered", "ready", "preparing", "pending"] as const;
  const mealNames = ["وجبة عامة متوازنة", "وجبة الأداء العالي", "سموذي الطاقة", "وجبة البحر المتوسط", "وجبة تخفيف الوزن"];

  for (let i = 0; i < 4; i++) {
    const status = statuses[i % statuses.length];
    const mealName = mealNames[i % mealNames.length];
    const daysBack = i * 7 + Math.round(Math.random() * 3);

    // Check if order already exists around this time
    const existing = await prisma.mealOrder.findFirst({
      where: { userId, mealName, status },
    });
    if (existing) continue;

    await prisma.mealOrder.create({
      data: {
        userId, mealName, status,
        notes: status === "pending" ? "ملاحظات: بدون بصل" : null,
        orderDate: daysAgo(daysBack),
      },
    });
  }
}

async function seedConsultations(companyId: string) {
  // Get employees
  const employees = await prisma.user.findMany({ where: { companyId, role: "EMPLOYEE" }, take: 6 });

  for (const emp of employees) {
    const existingCount = await prisma.consultation.count({ where: { patientId: emp.id } });
    if (existingCount >= 2) continue;

    // Past consultation
    const pastConsultant = consultants[Math.floor(Math.random() * consultants.length)];
    const pastExists = await prisma.consultation.findFirst({
      where: { patientId: emp.id, status: "completed" },
    });
    if (!pastExists) {
      const consultant = await prisma.user.findFirst({ where: { companyId, role: "NUTRITIONIST" } });
      await prisma.consultation.create({
        data: {
          patientId: emp.id,
          consultantId: consultant?.id || null,
          type: pastConsultant.type,
          status: "completed",
          scheduledAt: daysAgo(14 + Math.round(Math.random() * 20)),
          completedAt: daysAgo(13 + Math.round(Math.random() * 20)),
          notes: "استشارة ناجحة — الموظف متفاعل مع التوصيات",
          companyId,
        },
      });
    }

    // Upcoming consultation for some employees
    if (Math.random() > 0.5) {
      const upcomingExists = await prisma.consultation.findFirst({
        where: { patientId: emp.id, status: "scheduled" },
      });
      if (!upcomingExists) {
        const consultant = await prisma.user.findFirst({ where: { companyId, role: "NUTRITIONIST" } });
        const types = ["nutrition", "fitness", "general"] as const;
        await prisma.consultation.create({
          data: {
            patientId: emp.id,
            consultantId: consultant?.id || null,
            type: types[Math.floor(Math.random() * types.length)],
            status: "scheduled",
            scheduledAt: daysFromNow(3 + Math.round(Math.random() * 14)),
            companyId,
          },
        });
      }
    }
  }
}

async function seedEventLogs(companyId: string) {
  const existingCount = await prisma.eventLog.count();
  if (existingCount >= 10) return;

  const events = [
    { type: "new_order", data: JSON.stringify({ mealName: "وجبة عامة متوازنة", userId: "system" }) },
    { type: "order_updated", data: JSON.stringify({ status: "preparing", mealName: "وجبة الأداء العالي" }) },
    { type: "new_consultation", data: JSON.stringify({ type: "nutrition" }) },
    { type: "order_updated", data: JSON.stringify({ status: "ready", mealName: "سموذي الطاقة" }) },
    { type: "consultation_updated", data: JSON.stringify({ status: "completed" }) },
    { type: "new_order", data: JSON.stringify({ mealName: "وجبة تخفيف الوزن", userId: "system" }) },
    { type: "order_updated", data: JSON.stringify({ status: "delivered", mealName: "وجبة البحر المتوسط" }) },
    { type: "new_consultation", data: JSON.stringify({ type: "fitness" }) },
  ];

  for (const ev of events) {
    const existing = await prisma.eventLog.findFirst({
      where: { type: ev.type, data: ev.data },
    });
    if (existing) continue;
    await prisma.eventLog.create({ data: ev });
  }
  console.log("  ✅ أحداث تجريبية");
}

async function seedInvoices(companyId: string) {
  const existingCount = await prisma.invoice.count({ where: { companyId } });
  if (existingCount >= 3) return;

  const now = new Date();
  for (let i = 0; i < 3; i++) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const status: ("paid" | "pending")[] = ["paid", "paid", "pending"];

    const existing = await prisma.invoice.findFirst({
      where: { companyId, periodStart: month },
    });
    if (existing) continue;

    await prisma.invoice.create({
      data: {
        companyId,
        amount: i === 0 ? 3750 : i === 1 ? 3750 : 3750,
        currency: "SAR",
        status: status[i],
        plan: "professional",
        periodStart: month,
        periodEnd: monthEnd,
        paidAt: status[i] === "paid" ? new Date(month.getTime() + 5 * 24 * 60 * 60 * 1000) : null,
      },
    });
  }
  console.log("  ✅ فواتير تجريبية");
}

async function main() {
  console.log("🔧 Velara Care — تجهيز بيانات تجريبية احترافية\n");

  // ── 1. Create Companies ──
  console.log("📦 الشركات:");
  const mainCo = await ensureCompany({
    name: "شركة التقنية المتطورة",
    arabicName: "شركة التقنية المتطورة",
    domain: "velaracare.co",
    size: 50,
    industry: "تقنية المعلومات",
    plan: "professional",
  });
  const secondCo = await ensureCompany({
    name: "المجموعة الصحية السعودية",
    arabicName: "المجموعة الصحية السعودية",
    domain: "healthgroup.sa",
    size: 120,
    industry: "الرعاية الصحية",
    plan: "enterprise",
  });
  console.log("");

  // ── 2. Create Admin & Staff Users ──
  console.log("👤 حسابات المسؤولين:");
  const admin = await ensureUser("admin@velaracare.co", {
    firstName: "أحمد", lastName: "القحطاني",
    role: "COMPANY_ADMIN", department: "الإدارة", position: "مدير الشركة",
  }, mainCo.id);
  await ensureUser("hr@velaracare.co", {
    firstName: "نورة", lastName: "الشمري",
    role: "HR", department: "الموارد البشرية", position: "أخصائية موارد بشرية",
  }, mainCo.id);
  await ensureUser("nutrition@velaracare.co", {
    firstName: "د. سارة", lastName: "العبدان",
    role: "NUTRITIONIST", department: "الاستشارات", position: "أخصائية تغذية",
  }, mainCo.id);
  await ensureUser("restaurant@velaracare.co", {
    firstName: "علي", lastName: "الزهراني",
    role: "RESTAURANT", department: "المطعم", position: "مشرف المطعم",
  }, mainCo.id);
  // Second company admin
  await ensureUser("admin@healthgroup.sa", {
    firstName: "خالد", lastName: "السعود",
    role: "COMPANY_ADMIN", department: "الإدارة", position: "المدير التنفيذي",
  }, secondCo.id);
  console.log("");

  // ── 3. Create Employee Accounts with Wellness Data ──
  console.log("👥 الموظفون:");
  const employeeUsers: { id: string; profile: typeof employeeProfiles[0] }[] = [];
  for (const profile of employeeProfiles) {
    const email = `${profile.firstName.toLowerCase()}.${profile.lastName.toLowerCase()}@velaracare.co`;
    const user = await ensureUser(email, {
      firstName: profile.firstName, lastName: profile.lastName,
      role: "EMPLOYEE", department: profile.dept, position: profile.position,
    }, mainCo.id);
    employeeUsers.push({ id: user!.id, profile });

    // Wellness Score
    await seedWellnessScore(user!.id, mainCo.id, profile);
  }
  // Add a few employees to second company
  for (let i = 0; i < 5; i++) {
    const names = [
      { first: "نايف", last: "التميمي", dept: "التمريض", pos: "ممرض" },
      { first: "رنا", last: "الحارثي", dept: "الإدارة", pos: "مديرة مكتب" },
      { first: "تركي", last: "الغامدي", dept: "التمريض", pos: "ممرض" },
      { first: "شهد", last: "العنزي", dept: "الصيدلية", pos: "صيدلانية" },
      { first: "سامي", last: "الجهني", dept: "المختبر", pos: "فني مختبر" },
    ][i];
    const email = `${names.first}.${names.last}@healthgroup.sa`;
    await ensureUser(email, {
      firstName: names.first, lastName: names.last,
      role: "EMPLOYEE", department: names.dept, position: names.pos,
    }, secondCo.id);
  }
  console.log("");

  // ── 4. HRA History (2-3 assessments each) ──
  console.log("📋 التقييمات الصحية:");
  for (const { id, profile } of employeeUsers) {
    await seedHRA(id, profile, 2 + Math.round(Math.random()));
  }
  console.log("");

  // ── 5. AI Predictions ──
  console.log("🤖 التوقعات الذكية:");
  for (const { id, profile } of employeeUsers) {
    await seedPredictions(id, profile);
  }
  console.log("");

  // ── 6. Meal Plans ──
  console.log("🍽️ الوجبات:");
  for (const meal of mealPlans) {
    const existing = await prisma.mealPlan.findFirst({
      where: { name: meal.name, companyId: mainCo.id },
    });
    if (!existing) {
      await prisma.mealPlan.create({
        data: {
          name: meal.name, type: meal.type, calories: meal.calories,
          description: meal.desc, companyId: mainCo.id, isActive: true,
        },
      });
    }
  }
  // Also add some to second company
  for (const meal of mealPlans.slice(0, 5)) {
    const existing = await prisma.mealPlan.findFirst({
      where: { name: meal.name, companyId: secondCo.id },
    });
    if (!existing) {
      await prisma.mealPlan.create({
        data: {
          name: meal.name, type: meal.type, calories: meal.calories,
          description: meal.desc, companyId: secondCo.id, isActive: true,
        },
      });
    }
  }
  console.log(`  ✅ ${mealPlans.length} وجبات`);

  // ── 7. Meal Orders ──
  console.log("📦 طلبات الوجبات:");
  for (const { id } of employeeUsers) {
    await seedMealOrders(id, mainCo.id);
  }
  console.log("");

  // ── 8. Consultations ──
  console.log("🩺 الاستشارات:");
  await seedConsultations(mainCo.id);
  console.log("");

  // ── 9. Event Logs ──
  console.log("📡 الأحداث الحية:");
  await seedEventLogs(mainCo.id);

  // ── 10. Invoices ──
  console.log("💰 الفواتير:");
  await seedInvoices(mainCo.id);
  await seedInvoices(secondCo.id);

  // ── Summary ──
  console.log("\n" + "=".repeat(50));
  console.log("🎉 اكتمل تجهيز البيانات التجريبية بنجاح!\n");

  const counts = {
    الشركات: await prisma.company.count(),
    المستخدمين: await prisma.user.count(),
    التقييمات: await prisma.hRAResult.count(),
    التوقعات: await prisma.aIPrediction.count(),
    الوجبات: await prisma.mealPlan.count(),
    الطلبات: await prisma.mealOrder.count(),
    الاستشارات: await prisma.consultation.count(),
    الفواتير: await prisma.invoice.count(),
  };
  console.log("📊 إحصائيات البيانات التجريبية:");
  for (const [key, val] of Object.entries(counts)) {
    console.log(`   ${key}: ${val}`);
  }

  console.log("\n🔑 حسابات الدخول (كلمة المرور: demo123):");
  console.log("   ┌─────────────────────────────┬──────────────────┐");
  console.log("   │ البريد الإلكتروني           │ الدور            │");
  console.log("   ├─────────────────────────────┼──────────────────┤");
  console.log("   │ admin@velaracare.co         │ مدير الشركة      │");
  console.log("   │ hr@velaracare.co            │ موارد بشرية      │");
  console.log("   │ nutrition@velaracare.co     │ أخصائي تغذية     │");
  console.log("   │ restaurant@velaracare.co    │ مطعم             │");
  console.log("   │ mohamed.alahmed@velaracare.co│ موظف (محمد)      │");
  console.log("   │ admin@healthgroup.sa        │ مدير شركة ثانية  │");
  console.log("   └─────────────────────────────┴──────────────────┘");

  await prisma.$disconnect();
}

main().catch((e) => { console.error("❌ خطأ:", e); process.exit(1); });
