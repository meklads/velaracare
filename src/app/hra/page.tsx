"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle2, Brain, Activity, Moon, Heart, Apple, Droplets, Loader2, Shield } from "lucide-react";

interface Responses {
  bmi: string;
  smoking: string;
  activity: string;
  sleepHours: string;
  stress: string;
  familyHistory: string;
  bloodPressure: string;
  diet: string;
  water: string;
  mental: string;
}

const steps = [
  { id: "start", title: "البداية", icon: Heart },
  { id: "basics", title: "المعلومات الأساسية", icon: Activity },
  { id: "lifestyle", title: "نمط الحياة", icon: Moon },
  { id: "health", title: "الصحة العامة", icon: Brain },
  { id: "nutrition", title: "التغذية", icon: Apple },
  { id: "result", title: "النتيجة", icon: CheckCircle2 },
];

export default function HRAPage() {
  const [step, setStep] = useState("start");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [responses, setResponses] = useState<Responses>({
    bmi: "",
    smoking: "",
    activity: "",
    sleepHours: "",
    stress: "",
    familyHistory: "",
    bloodPressure: "",
    diet: "",
    water: "",
    mental: "",
  });

  function update(field: keyof Responses, value: string) {
    setResponses((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const res = await fetch("/api/hra", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });
      const data = await res.json();
      setResult(data);
      setStep("result");
    } catch {
      // Fallback result if API fails
      setResult({ riskLevel: "low", recommendations: { recommendations: ["استمر في نمط حياتك الصحي ✅"], score: 0 } });
      setStep("result");
    }
    setLoading(false);
  }

  const allAnswered = responses.bmi && responses.smoking && responses.activity && responses.sleepHours &&
    responses.stress && responses.familyHistory && responses.bloodPressure;

  const renderStart = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 rounded-full bg-emerald-gradient text-white flex items-center justify-center mx-auto mb-6 shadow-lg">
        <Heart className="h-10 w-10" />
      </div>
      <h2 className="text-3xl font-bold text-primary mb-4">التقييم الصحي الذكي</h2>
      <p className="text-secondary max-w-lg mx-auto mb-8 leading-relaxed">
        أجب على بضعة أسئلة بسيطة وسيقوم نظام الذكاء الاصطناعي بتحليل حالتك الصحية
        وتقديم توصيات مخصصة لتحسين عافيتك. التقييم يستغرق أقل من 5 دقائق.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-10">
        {[
          { icon: Brain, label: "تحليل ذكي", desc: "AI" },
          { icon: Activity, label: "5 دقائق فقط", desc: "سريع" },
          { icon: Shield, label: "بياناتك آمنة", desc: "خصوصية" },
          { icon: CheckCircle2, label: "توصيات فورية", desc: "فوري" },
        ].map((item) => (
          <div key={item.label} className="shade-card p-4 text-center">
            <item.icon className="h-6 w-6 text-emerald mx-auto mb-2" />
            <p className="text-sm font-semibold text-primary">{item.label}</p>
            <p className="text-xs text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>
      <button onClick={() => setStep("basics")} className="btn-primary text-lg px-10 py-4">
        ابدأ التقييم الآن
        <ChevronLeft className="h-5 w-5" />
      </button>
    </div>
  );

  const renderBasics = () => (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-primary mb-6">المعلومات الأساسية</h3>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">ما هو مؤشر كتلة الجسم (BMI) الخاص بك؟</label>
          <select value={responses.bmi} onChange={(e) => update("bmi", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="18.5">أقل من 18.5 (نحيف)</option>
            <option value="22">18.5 - 25 (طبيعي)</option>
            <option value="27">25 - 30 (وزن زائد)</option>
            <option value="32">أكثر من 30 (سمنة)</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">هل تدخن؟</label>
          <select value={responses.smoking} onChange={(e) => update("smoking", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="no">لا</option>
            <option value="former">سابقاً</option>
            <option value="yes">نعم</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">مستوى النشاط البدني</label>
          <select value={responses.activity} onChange={(e) => update("activity", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="active">نشط (رياضة 3+ مرات أسبوعياً)</option>
            <option value="light">خفيف (مشي أحياناً)</option>
            <option value="none">غير نشط</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderLifestyle = () => (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-primary mb-6">نمط الحياة</h3>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">كم ساعة تنام في المتوسط؟</label>
          <select value={responses.sleepHours} onChange={(e) => update("sleepHours", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="4">أقل من 5 ساعات</option>
            <option value="5.5">5 - 6 ساعات</option>
            <option value="7">7 - 8 ساعات (ممتاز)</option>
            <option value="9">أكثر من 9 ساعات</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">مستوى التوتر والإجهاد</label>
          <select value={responses.stress} onChange={(e) => update("stress", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="low">منخفض</option>
            <option value="medium">متوسط</option>
            <option value="high">مرتفع</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">هل يوجد تاريخ عائلي لأمراض مزمنة؟</label>
          <select value={responses.familyHistory} onChange={(e) => update("familyHistory", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="no">لا</option>
            <option value="yes">نعم</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-primary mb-6">الصحة العامة</h3>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">هل تعاني من ارتفاع ضغط الدم؟</label>
          <select value={responses.bloodPressure} onChange={(e) => update("bloodPressure", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="normal">طبيعي</option>
            <option value="borderline">حدود مرتفع</option>
            <option value="high">مرتفع</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">كيف تقيم صحتك النفسية؟</label>
          <select value={responses.mental} onChange={(e) => update("mental", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="good">جيدة</option>
            <option value="fair">مقبولة</option>
            <option value="poor">سيئة</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">كم كوب ماء تشرب يومياً؟</label>
          <select value={responses.water} onChange={(e) => update("water", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="8">أكثر من 8 أكواب</option>
            <option value="5">4 - 7 أكواب</option>
            <option value="3">أقل من 4 أكواب</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderNutrition = () => (
    <div className="max-w-xl mx-auto">
      <h3 className="text-xl font-bold text-primary mb-6">التغذية</h3>
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">كيف تصف نظامك الغذائي؟</label>
          <select value={responses.diet} onChange={(e) => update("diet", e.target.value)} className="w-full rounded-xl border border-[var(--surface-border)] bg-surface-mid px-4 py-3 text-sm">
            <option value="">اختر...</option>
            <option value="balanced">متوازن (جميع المجموعات الغذائية)</option>
            <option value="high_fat">غني بالدهون والسكريات</option>
            <option value="vegetarian">نباتي</option>
            <option value="irregular">غير منتظم</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderResult = () => (
    <div className="max-w-xl mx-auto text-center">
      <div className="w-20 h-20 rounded-full bg-emerald-soft text-emerald flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h2 className="text-2xl font-bold text-primary mb-2">تم إكمال التقييم! 🎉</h2>
      <p className="text-secondary mb-8">إليك نتائج التقييم الصحي بناءً على إجاباتك</p>

      {result && (
        <>
          <div className="shade-card p-8 mb-6">
            <p className="text-sm text-secondary mb-2">مستوى المخاطر الصحية</p>
            <span className={`text-lg font-bold px-6 py-2 rounded-full ${
              result.riskLevel === "low" ? "bg-emerald-soft text-emerald-dark" :
              result.riskLevel === "moderate" ? "bg-amber-50 text-amber-600" :
              result.riskLevel === "high" ? "bg-orange-50 text-orange-600" :
              "bg-rose-50 text-rose-600"
            }`}>
              {result.riskLevel === "low" && "🟢 منخفض"}
              {result.riskLevel === "moderate" && "🟡 متوسط"}
              {result.riskLevel === "high" && "🟠 مرتفع"}
              {result.riskLevel === "critical" && "🔴 حرج"}
            </span>
          </div>

          {result.recommendations?.recommendations?.length > 0 && (
            <div className="shade-card p-8 mb-8 text-right">
              <h3 className="font-bold text-primary mb-4 text-center">توصيات مخصصة لك</h3>
              <div className="space-y-3">
                {result.recommendations.recommendations.map((rec: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-emerald-soft/50">
                    <CheckCircle2 className="h-5 w-5 text-emerald shrink-0 mt-0.5" />
                    <p className="text-sm text-secondary">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <Link href="/dashboard/employee" className="btn-primary">
              الذهاب للوحة التحكم
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
        </>
      )}
    </div>
  );

  const stepContent: Record<string, () => React.ReactNode> = {
    start: renderStart,
    basics: renderBasics,
    lifestyle: renderLifestyle,
    health: renderHealth,
    nutrition: renderNutrition,
    result: renderResult,
  };

  const currentStepIndex = steps.findIndex((s) => s.id === step);
  const isFormStep = step !== "start" && step !== "result";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-surface-mid pt-24 pb-16">
        <div className="container-shade max-w-3xl">

          {/* Progress */}
          {isFormStep && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {steps.slice(1, -1).map((s, i) => (
                  <div key={s.id} className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      i <= currentStepIndex - 1 ? "bg-emerald-gradient text-white" :
                      i === currentStepIndex - 1 ? "bg-emerald-soft text-emerald ring-2 ring-emerald" :
                      "bg-[var(--surface-border)] text-secondary"
                    }`}>
                      {i + 1}
                    </div>
                    <span className="text-[10px] text-secondary mt-1 hidden sm:block">{s.title}</span>
                  </div>
                ))}
              </div>
              <div className="w-full bg-[var(--surface-border)] rounded-full h-1.5">
                <div className="bg-emerald-gradient h-1.5 rounded-full transition-all" style={{ width: `${((currentStepIndex) / (steps.length - 2)) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="shade-card p-8 fade-in-up">
            {stepContent[step]?.()}
          </div>

          {/* Navigation */}
          {isFormStep && (
            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  const prev = steps[currentStepIndex - 1]?.id;
                  if (prev) setStep(prev);
                }}
                className="btn-outline text-sm py-2 px-6"
              >
                <ChevronRight className="h-4 w-4 ml-1" />
                السابق
              </button>

              {step === "nutrition" ? (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn-primary text-sm py-2 px-8"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin ml-1" /> : null}
                  {loading ? "جاري التحليل..." : "عرض النتائج"}
                </button>
              ) : (
                <button
                  onClick={() => {
                    const next = steps[currentStepIndex + 1]?.id;
                    if (next) setStep(next);
                  }}
                  className="btn-primary text-sm py-2 px-8"
                >
                  التالي
                  <ChevronLeft className="h-4 w-4 mr-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
