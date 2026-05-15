import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({ url: "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Velara Care database...");

  const company = await prisma.company.create({
    data: {
      name: "شركة التقنية المتقدمة",
      arabicName: "شركة التقنية المتقدمة",
      domain: "techadvanced.com",
      size: 240,
      industry: "تقنية المعلومات",
      plan: "professional",
      status: "active",
    },
  });
  console.log("✅ Company: " + company.name);

  for (const u of [
    { email: "admin@velaracare.co", firstName: "أحمد", lastName: "القحطاني", role: "COMPANY_ADMIN" as const, dept: "الإدارة" },
    { email: "hr@velaracare.co", firstName: "نورة", lastName: "الشمري", role: "HR" as const, dept: "الموارد البشرية" },
    { email: "nutrition@velaracare.co", firstName: "د. سارة", lastName: "العبدان", role: "NUTRITIONIST" as const, dept: "الاستشارات" },
    { email: "restaurant@velaracare.co", firstName: "علي", lastName: "الزهراني", role: "RESTAURANT" as const, dept: "المطعم" },
    { email: "superadmin@velaracare.co", firstName: "مشرف", lastName: "النظام", role: "SUPER_ADMIN" as const, dept: "الإدارة العليا" },
  ]) {
    const data: any = {
      email: u.email,
      passwordHash: "demo123",
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      department: u.dept,
    };
    if (u.role !== "NUTRITIONIST" && u.role !== "SUPER_ADMIN") {
      data.companyId = company.id;
    }
    await prisma.user.create({ data });
    console.log("✅ " + u.role + ": " + u.firstName);
  }

  // Demo employee
  const employeeUser = await prisma.user.create({
    data: {
      email: "employee@velaracare.co",
      passwordHash: "demo123",
      firstName: "محمد",
      lastName: "الأحمد",
      role: "EMPLOYEE",
      department: "تقنية المعلومات",
      companyId: company.id,
    },
  });
  console.log("✅ EMPLOYEE: " + employeeUser.firstName);

  await prisma.wellnessScore.create({
    data: {
      userId: employeeUser.id,
      companyId: company.id,
      score: 78,
      bmiScore: 75,
      sleepScore: 68,
      stressScore: 82,
      activityScore: 70,
      nutritionScore: 80,
      familyHistory: 85,
      riskLevel: "low",
      trend: "improving",
    },
  });
  console.log("✅ Wellness Score for employee");

  for (const meal of [
    { name: "وجبة السكري", type: "diabetic", calories: 1800 },
    { name: "وجبة تخفيف الوزن", type: "weight_loss", calories: 1500 },
    { name: "وجبة الأداء العالي", type: "high_performance", calories: 2200 },
    { name: "وجبة عامة", type: "general", calories: 2000 },
  ]) {
    await prisma.mealPlan.create({
      data: { name: meal.name, type: meal.type, calories: meal.calories, companyId: company.id, description: "وجبة مخصصة لـ " + meal.name },
    });
    console.log("✅ Meal: " + meal.name);
  }

  console.log("\n🎉 Database seeded!");
  console.log("\n📋 Demo accounts:");
  console.log("admin@velaracare.co / demo123");
  console.log("employee@velaracare.co / demo123");
  console.log("nutrition@velaracare.co / demo123");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
