import { PrismaClient } from "../src/generated/prisma/client.js";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { randomBytes, scryptSync } from "crypto";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const dbUrl = process.env.DATABASE_URL || "file:./prisma/dev.db";
const adapter = new PrismaLibSql({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding Velara Care database...");

  // Find or create company
  let company = await prisma.company.findUnique({ where: { domain: "velaracare.co" } });
  if (!company) {
    company = await prisma.company.create({
      data: {
        name: "شركة التقنية المتقدمة",
        arabicName: "شركة التقنية المتقدمة",
        domain: "velaracare.co",
        size: 240,
        industry: "تقنية المعلومات",
        plan: "professional",
        status: "active",
      },
    });
    console.log("✅ Company created: " + company.name);
  } else {
    console.log("✅ Company exists: " + company.name);
  }

  const demoPassword = hashPassword("demo123");

  for (const u of [
    { email: "admin@velaracare.co", firstName: "أحمد", lastName: "القحطاني", role: "COMPANY_ADMIN" as const, dept: "الإدارة", hasCompany: true },
    { email: "hr@velaracare.co", firstName: "نورة", lastName: "الشمري", role: "HR" as const, dept: "الموارد البشرية", hasCompany: true },
    { email: "nutrition@velaracare.co", firstName: "د. سارة", lastName: "العبدان", role: "NUTRITIONIST" as const, dept: "الاستشارات", hasCompany: true },
    { email: "restaurant@velaracare.co", firstName: "علي", lastName: "الزهراني", role: "RESTAURANT" as const, dept: "المطعم", hasCompany: true },
    { email: "superadmin@velaracare.co", firstName: "مشرف", lastName: "النظام", role: "SUPER_ADMIN" as const, dept: "الإدارة العليا", hasCompany: false },
  ]) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    const data = {
      email: u.email,
      passwordHash: demoPassword,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.role,
      department: u.dept,
      companyId: u.hasCompany ? company.id : null,
      isActive: true,
    };
    if (existing) {
      await prisma.user.update({ where: { email: u.email }, data });
      console.log("🔄 Updated: " + u.role);
    } else {
      await prisma.user.create({ data });
      console.log("✅ " + u.role + ": " + u.firstName);
    }
  }

  // Demo employee
  const employeeEmail = "employee@velaracare.co";
  let employeeUser = await prisma.user.findUnique({ where: { email: employeeEmail } });
  if (!employeeUser) {
    employeeUser = await prisma.user.create({
      data: {
        email: employeeEmail,
        passwordHash: demoPassword,
        firstName: "محمد",
        lastName: "الأحمد",
        role: "EMPLOYEE",
        department: "تقنية المعلومات",
        companyId: company.id,
        isActive: true,
      },
    });
    console.log("✅ EMPLOYEE created");
  } else {
    console.log("🔄 EMPLOYEE exists");
  }

  // Wellness score
  const existingScore = await prisma.wellnessScore.findUnique({ where: { userId: employeeUser.id } });
  if (!existingScore) {
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
    console.log("✅ Wellness Score created");
  } else {
    console.log("🔄 Wellness Score exists");
  }

  // Meal plans
  const existingMeals = await prisma.mealPlan.count({ where: { companyId: company.id } });
  if (existingMeals === 0) {
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
  } else {
    console.log("🔄 Meal plans exist, skipping");
  }

  console.log("\n🎉 Database seeded!");
  console.log("\n📋 Demo accounts:");
  console.log("admin@velaracare.co      / demo123 (مدير الشركة)");
  console.log("hr@velaracare.co         / demo123 (موارد بشرية)");
  console.log("employee@velaracare.co   / demo123 (موظف)");
  console.log("nutrition@velaracare.co  / demo123 (أخصائي تغذية)");
  console.log("restaurant@velaracare.co / demo123 (مطعم)");
  console.log("superadmin@velaracare.co / demo123 (مشرف النظام)");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
