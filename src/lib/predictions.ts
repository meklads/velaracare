/**
 * AI Prediction Engine
 * Analyzes HRA data to generate health risk predictions and recommendations.
 */

interface HRAResponses {
  bmi?: string;
  smoking?: string;
  activity?: string;
  sleepHours?: string;
  stress?: string;
  familyHistory?: string;
  bloodPressure?: string;
  diet?: string;
  water?: string;
  mental?: string;
}

interface Prediction {
  type: string;
  probability: number;
  riskLevel: string;
  factors: Record<string, number>;
  suggestions: string[];
}

/**
 * Generate comprehensive health predictions from HRA responses.
 * Uses clinical risk factor analysis (not ML — deterministic rules engine).
 */
export function generatePredictions(responses: HRAResponses): Prediction[] {
  const predictions: Prediction[] = [];

  // Parse inputs
  const bmi = parseFloat(responses.bmi || "22");
  const isSmoker = responses.smoking === "yes";
  const wasSmoker = responses.smoking === "former";
  const isSedentary = responses.activity === "none";
  const isLightActivity = responses.activity === "light";
  const sleepHours = parseFloat(responses.sleepHours || "7");
  const isHighStress = responses.stress === "high";
  const isMediumStress = responses.stress === "medium";
  const hasFamilyHistory = responses.familyHistory === "yes";
  const isHighBP = responses.bloodPressure === "high";
  const isBorderlineBP = responses.bloodPressure === "borderline";
  const isPoorDiet = responses.diet === "high_fat" || responses.diet === "irregular";
  const isLowWater = parseInt(responses.water || "5") < 4;
  const isPoorMental = responses.mental === "poor";

  // ── Diabetes Risk ──
  {
    let score = 0;
    const factors: Record<string, number> = {};
    if (bmi > 30) { score += 3; factors.bmi = 3; }
    else if (bmi > 25) { score += 2; factors.bmi = 2; }
    if (hasFamilyHistory) { score += 2; factors.family_history = 2; }
    if (isPoorDiet) { score += 2; factors.diet = 2; }
    if (isSedentary) { score += 1; factors.sedentary = 1; }
    if (isHighBP || isBorderlineBP) { score += 1; factors.blood_pressure = 1; }
    const maxScore = 10;
    const probability = Math.min(0.95, score / maxScore);
    if (score > 1) {
      predictions.push({
        type: "diabetes",
        probability: Math.round(probability * 100) / 100,
        riskLevel: probability >= 0.6 ? "high" : probability >= 0.3 ? "moderate" : "low",
        factors,
        suggestions: [
          ...(bmi > 25 ? ["تحسين مؤشر كتلة الجسم عبر برنامج غذائي مخصص"] : []),
          ...(isPoorDiet ? ["استشارة أخصائي تغذية لوضع نظام غذائي متوازن"] : []),
          ...(isSedentary ? ["زيادة النشاط البدني — المشي 30 دقيقة يومياً"] : []),
          ...(hasFamilyHistory ? ["فحص دوري للسكر التراكمي كل 6 أشهر"] : []),
        ],
      });
    }
  }

  // ── Cardiovascular Risk ──
  {
    let score = 0;
    const factors: Record<string, number> = {};
    if (isSmoker) { score += 3; factors.smoking = 3; }
    if (wasSmoker) { score += 1; factors.smoking_history = 1; }
    if (isHighBP) { score += 3; factors.blood_pressure = 3; }
    else if (isBorderlineBP) { score += 1; factors.blood_pressure = 1; }
    if (bmi > 30) { score += 2; factors.bmi = 2; }
    else if (bmi > 25) { score += 1; factors.bmi = 1; }
    if (isSedentary) { score += 2; factors.sedentary = 2; }
    if (hasFamilyHistory) { score += 1; factors.family_history = 1; }
    if (isHighStress) { score += 1; factors.stress = 1; }
    const maxScore = 12;
    const probability = Math.min(0.95, score / maxScore);
    if (score > 1) {
      predictions.push({
        type: "heart_disease",
        probability: Math.round(probability * 100) / 100,
        riskLevel: probability >= 0.5 ? "high" : probability >= 0.25 ? "moderate" : "low",
        factors,
        suggestions: [
          ...(isSmoker ? ["برنامج الإقلاع عن التدخين — ندعمك بخطة تدريجية"] : []),
          ...(isHighBP || isBorderlineBP ? ["متابعة ضغط الدم أسبوعياً واستشارة طبية"] : []),
          ...(isSedentary ? ["برنامج نشاط بدني تدريجي — ابدأ بالمشي"] : []),
          ...(isHighStress ? ["جلسات استرخاء وتأمل وإدارة التوتر"] : []),
        ],
      });
    }
  }

  // ── Burnout / Mental Health Risk ──
  {
    let score = 0;
    const factors: Record<string, number> = {};
    if (isHighStress) { score += 3; factors.stress = 3; }
    if (isMediumStress) { score += 1; factors.stress = 1; }
    if (sleepHours < 5) { score += 3; factors.sleep = 3; }
    else if (sleepHours < 6) { score += 1; factors.sleep = 1; }
    if (isPoorMental) { score += 3; factors.mental_health = 3; }
    if (isSedentary) { score += 1; factors.sedentary = 1; }
    const maxScore = 10;
    const probability = Math.min(0.95, score / maxScore);
    if (score > 1) {
      predictions.push({
        type: "burnout",
        probability: Math.round(probability * 100) / 100,
        riskLevel: probability >= 0.6 ? "high" : probability >= 0.3 ? "moderate" : "low",
        factors,
        suggestions: [
          ...(isHighStress ? ["تقنيات إدارة التوتر واليقظة الذهنية — جرب تطبيقات التأمل"] : []),
          ...(sleepHours < 6 ? ["تحسين جودة النوم — تجنب الشاشات قبل النوم وتهيئة بيئة مناسبة"] : []),
          ...(isPoorMental ? ["استشارة نفسية مع مختص الصحة النفسية"] : []),
          ...(isSedentary ? ["النشاط البدني يحسن المزاج — ابدأ بتمارين خفيفة"] : []),
        ],
      });
    }
  }

  // ── Obesity / Weight Risk ──
  {
    let score = 0;
    const factors: Record<string, number> = {};
    if (bmi > 30) { score += 3; factors.bmi = 3; }
    else if (bmi > 25) { score += 2; factors.bmi = 2; }
    if (isPoorDiet) { score += 2; factors.diet = 2; }
    if (isSedentary) { score += 2; factors.sedentary = 2; }
    if (isLightActivity) { score += 1; factors.low_activity = 1; }
    const maxScore = 9;
    const probability = Math.min(0.95, score / maxScore);
    if (score > 1) {
      predictions.push({
        type: "obesity",
        probability: Math.round(probability * 100) / 100,
        riskLevel: probability >= 0.5 ? "high" : probability >= 0.25 ? "moderate" : "low",
        factors,
        suggestions: [
          ...(bmi > 30 ? ["برنامج تخفيف وزن تدريجي تحت إشراف أخصائي تغذية"] : []),
          ...(isPoorDiet ? ["خطة تغذية متوازنة تعتمد على البروتين والخضروات"] : []),
          ...(isSedentary ? ["ابدأ بالمشي 30 دقيقة 5 أيام في الأسبوع"] : []),
          ["متابعة الوزن أسبوعياً وتسجيل الوجبات لزيادة الوعي الغذائي"],
        ].flat(),
      });
    }
  }

  // ── General wellness / productivity impact ──
  {
    let score = 0;
    const factors: Record<string, number> = {};
    if (isHighStress) { score += 2; factors.stress = 2; }
    if (sleepHours < 6) { score += 2; factors.sleep = 2; }
    if (isSedentary) { score += 1; factors.sedentary = 1; }
    if (isPoorDiet) { score += 1; factors.diet = 1; }
    if (isLowWater) { score += 1; factors.hydration = 1; }
    const maxScore = 7;
    const probability = Math.min(0.95, score / maxScore);
    if (score > 1) {
      predictions.push({
        type: "productivity",
        probability: Math.round(probability * 100) / 100,
        riskLevel: probability >= 0.5 ? "high" : probability >= 0.25 ? "moderate" : "low",
        factors,
        suggestions: [
          ...(sleepHours < 6 ? ["تحسين النوم يزيد الإنتاجية —目标是 7-8 ساعات"] : []),
          ...(isHighStress ? ["إدارة التوتر تزيد التركيز — خذ استراحة منتظمة"] : []),
          ...(isLowWater ? ["شرب الماء يحسن الوظائف الإدراكية — 8 أكواب يومياً"] : []),
        ],
      });
    }
  }

  return predictions;
}
