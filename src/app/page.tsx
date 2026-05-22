"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  TrendingDown, BarChart3, Users, Building2,
  ArrowLeft, ArrowRight, Activity, TrendingUp,
  DollarSign, PieChart, UserCheck, Target,
  Award, Medal, ClipboardCheck, Brain, Salad,
  Apple, ChefHat
} from "lucide-react";

// ===== HERO VALUE CARDS =====
const valueCards = [
  {
    icon: TrendingDown,
    title: "Reduce Sick Leave",
    desc: "Wellness programs that lower absenteeism and keep your workforce healthy and present."
  },
  {
    icon: Users,
    title: "Improve Employee Wellbeing",
    desc: "Personalized wellness journeys that improve quality of life and job satisfaction."
  },
  {
    icon: BarChart3,
    title: "Workforce Wellness Analytics",
    desc: "Real-time dashboards that track participation, improvement, and business impact."
  },
  {
    icon: Target,
    title: "Measurable Health Outcomes",
    desc: "Quantifiable results linking wellness investment to productivity and cost reduction."
  }
];

// ===== SECTION 1: ECOSYSTEM =====
const ecosystemEntities = [
  {
    icon: Building2,
    title: "Company",
    desc: "Invests in workforce wellness and gains measurable improvements in productivity, retention, and operational costs.",
    role: "Sets strategy & funds programs"
  },
  {
    icon: Users,
    title: "HR Team",
    desc: "Manages wellness programs, monitors engagement, tracks outcomes, and generates executive reports from one dashboard.",
    role: "Operates & monitors programs"
  },
  {
    icon: UserCheck,
    title: "Employee",
    desc: "Completes assessments, receives personalized recommendations, orders healthy meals, and tracks progress over time.",
    role: "Participates & improves over time"
  },
  {
    icon: Apple,
    title: "Nutritionist",
    desc: "Accesses employee wellness insights, creates tailored nutrition plans, and monitors client progress through consultations.",
    role: "Prescribes nutrition plans"
  },
  {
    icon: ChefHat,
    title: "Restaurant Partner",
    desc: "Receives structured wellness orders, prepares meals aligned with health goals, and delivers via integrated logistics.",
    role: "Fulfills healthy meals"
  }
];

// ===== SECTION 2: HR DASHBOARD =====
const hrDashboardMetrics = [
  { icon: Activity, value: "87%", label: "Workforce Wellness Score", desc: "Overall workforce health index across all participants" },
  { icon: TrendingUp, value: "72%", label: "Employee Engagement", desc: "Active participation rate in wellness programs" },
  { icon: Apple, value: "64%", label: "Nutrition Participation", desc: "Employees actively using meal planning and ordering" },
  { icon: PieChart, value: "3 Levels", label: "Wellness Risk Distribution", desc: "Low, moderate, and high-risk employee segments" },
  { icon: TrendingDown, value: "-35%", label: "Sick Leave Reduction", desc: "Year-over-year decrease in absenteeism" },
  { icon: ClipboardCheck, value: "81%", label: "Program Adoption", desc: "Percentage of employees enrolled in wellness programs" }
];

// ===== SECTION 3: EMPLOYEE JOURNEY =====
const employeeJourney = [
  { step: "1", icon: Building2, title: "Employee Joins Company", desc: "Auto-onboarded into Velara wellness platform via HR system integration." },
  { step: "2", icon: ClipboardCheck, title: "Completes Assessment", desc: "5-minute lifestyle survey on nutrition, sleep, activity, and stress." },
  { step: "3", icon: Brain, title: "AI Generates Profile", desc: "Personalized Wellness Score with risk analysis based on responses." },
  { step: "4", icon: Target, title: "Nutrition Recommendations", desc: "AI-driven meal suggestions aligned with wellness goals and dietary needs." },
  { step: "5", icon: Salad, title: "Orders Healthy Meals", desc: "Selects from restaurant partner menus through integrated ordering system." },
  { step: "6", icon: Apple, title: "Books Consultation", desc: "One-on-one sessions with platform nutritionists for guidance." },
  { step: "7", icon: TrendingUp, title: "Progress Tracked Over Time", desc: "Wellness Score improves, achievements logged, outcomes measured." }
];

// ===== SECTION 4: NUTRITIONIST =====
const nutritionistCapabilities = [
  { icon: Brain, title: "Wellness Insights Access", desc: "View detailed wellness profiles and risk assessments of assigned employees." },
  { icon: Target, title: "Connected Nutrition Plans", desc: "Create meal plans integrated directly with restaurant partner ordering systems." },
  { icon: UserCheck, title: "Consultation Management", desc: "Schedule, conduct, and track all nutrition consultations within the platform." },
  { icon: TrendingUp, title: "Progress Monitoring", desc: "Track employee health metrics over time and adjust recommendations." },
  { icon: BarChart3, title: "Outcome Analytics", desc: "Measure real impact of nutrition interventions on workforce wellness scores." }
];

// ===== SECTION 5: RESTAURANT =====
const restaurantCapabilities = [
  { icon: ClipboardCheck, title: "Structured Wellness Orders", desc: "Receive orders categorized by wellness goals, dietary preferences, and health requirements." },
  { icon: Salad, title: "Wellness-Aligned Menus", desc: "Organize meal offerings by health categories — balanced, high-protein, low-calorie, and more." },
  { icon: Activity, title: "Integrated Delivery Logistics", desc: "Fulfill orders through platform-connected delivery with real-time tracking." },
  { icon: PieChart, title: "Performance Analytics", desc: "Track order volume, popular meals, participation trends, and satisfaction metrics." }
];

// ===== SECTION 6: BUSINESS IMPACT =====
const businessMetrics = [
  { icon: TrendingDown, value: "-35%", label: "Reduced Sick Leave" },
  { icon: TrendingUp, value: "+25%", label: "Improved Productivity" },
  { icon: Users, value: "85%", label: "Wellness Engagement" },
  { icon: DollarSign, value: "-28%", label: "Lower Health Costs" },
  { icon: Award, value: "3.2x", label: "Workforce Performance" },
  { icon: Medal, value: "+40%", label: "Employer Brand Strength" }
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ════════════════════════════════════════
           HERO — Enterprise Workforce Health Platform
           ════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] to-transparent opacity-50" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-4xl text-center">

              <h1 className="text-[clamp(36px,4vw,56px)] font-extrabold leading-[1.1] tracking-[-0.02em] text-[var(--text-primary)]">
                Transform Workforce Health
                <br />
                <span className="text-[var(--accent)]">Into Measurable Business Performance</span>
              </h1>

              <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed max-w-3xl mx-auto">
                Velara helps companies improve employee wellbeing, reduce healthcare-related costs,
                increase productivity, and manage workforce wellness through an integrated
                health optimization platform.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-10 py-4 !h-auto">
                  Book Enterprise Demo
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/product" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  Explore Platform
                </Link>
              </div>

              {/* Enterprise value cards */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {valueCards.map((card) => (
                  <div key={card.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 text-center hover:border-[var(--accent)]/30 transition-colors">
                    <card.icon className="h-5 w-5 text-[var(--accent)] mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{card.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-tight">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 1 — PLATFORM ECOSYSTEM
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-4">Platform Architecture</span>
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                How The Velara Ecosystem Works
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                Five key stakeholders connected in one measurable workforce wellness operating system.
              </p>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            {/* Desktop: horizontal flow */}
            <div className="hidden lg:flex items-start justify-center max-w-6xl mx-auto">
              {ecosystemEntities.map((item, i) => (
                <div key={item.title} className="flex items-start">
                  <div className="flex flex-col items-center text-center px-3">
                    <div className="w-16 h-16 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-3 ring-2 ring-[var(--accent)]/10">
                      <item.icon className="h-8 w-8 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed max-w-[170px] mb-3">{item.desc}</p>
                    <span className="text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-full whitespace-nowrap">{item.role}</span>
                  </div>
                  {i < ecosystemEntities.length - 1 && (
                    <div className="flex items-center pt-8 px-1">
                      <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-[var(--text-muted)]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Tablet / Mobile: grid */}
            <div className="grid sm:grid-cols-2 lg:hidden gap-5 max-w-3xl mx-auto">
              {ecosystemEntities.map((item, i) => (
                <div key={item.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 text-center hover:border-[var(--accent)]/30 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 ring-2 ring-[var(--accent)]/10">
                    <item.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full">{item.role}</span>
                  {i < ecosystemEntities.length - 1 && (
                    <div className="mt-3 pt-3 border-t border-[var(--border-primary)] text-xs text-[var(--text-muted)]">
                      <ArrowRight className="h-4 w-4 inline-block ml-1" />
                      Connects to next
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 2 — HR CONTROL CENTER
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-4">Enterprise Analytics</span>
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                HR Wellness Intelligence Dashboard
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                Real-time operational intelligence for managing workforce wellness programs at scale.
              </p>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
              {hrDashboardMetrics.map((metric) => (
                <div key={metric.label} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <metric.icon className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <span className="text-2xl font-extrabold text-[var(--accent)]">{metric.value}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{metric.label}</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 3 — EMPLOYEE EXPERIENCE FLOW
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-4">Employee Journey</span>
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                Employee Wellness Journey
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                From onboarding to measurable improvement — a complete employee wellness experience.
              </p>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Desktop: numbered flow */}
              <div className="hidden lg:grid grid-cols-7 gap-3">
                {employeeJourney.map((item) => (
                  <div key={item.step} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-4 text-center hover:border-[var(--accent)]/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold mx-auto mb-3">
                      {item.step}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-2">
                      <item.icon className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-[11px] font-bold text-[var(--text-primary)] mb-1 leading-tight">{item.title}</h3>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Connecting line between desktop cards */}
              <div className="hidden lg:flex justify-between px-4 mt-2 mb-8 max-w-5xl mx-auto">
                {employeeJourney.map((_, i) => (
                  i < employeeJourney.length - 1 && (
                    <div key={i} className="flex-1 flex items-center justify-center">
                      <div className="w-full h-0.5 bg-gradient-to-r from-[var(--accent)]/40 to-[var(--accent)]/10" />
                    </div>
                  )
                ))}
              </div>

              {/* Tablet: 2-2-2-1 grid */}
              <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
                {employeeJourney.map((item) => (
                  <div key={item.step} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-5 hover:border-[var(--accent)]/30 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {item.step}
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center shrink-0">
                        <item.icon className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Mobile: vertical timeline */}
              <div className="sm:hidden space-y-4">
                {employeeJourney.map((item, i) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--accent)] text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {item.step}
                      </div>
                      {i < employeeJourney.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-[var(--accent)]/30 to-transparent mt-1" />
                      )}
                    </div>
                    <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 flex-1 mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <item.icon className="h-4 w-4 text-[var(--accent)] shrink-0" />
                        <h3 className="text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 4 — NUTRITIONIST OPERATIONS
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-4">Nutritionist Workspace</span>
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                Connected Nutritionist Workspace
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                An intelligent operational workspace where nutritionists manage clients, create plans, and measure outcomes.
              </p>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {nutritionistCapabilities.map((cap) => (
                <div key={cap.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <cap.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{cap.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 5 — RESTAURANT PARTNER SYSTEM
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-4">Partner Network</span>
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                Restaurant Wellness Network
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                An operational logistics ecosystem connecting restaurant partners to workforce wellness outcomes.
              </p>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {restaurantCapabilities.map((cap) => (
                <div key={cap.title} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 hover:border-[var(--accent)]/30 transition-colors group">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <cap.icon className="h-6 w-6 text-[var(--accent)]" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">{cap.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 6 — BUSINESS IMPACT
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full mb-4">ROI Metrics</span>
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                Business Outcomes That Matter
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                Measurable enterprise KPIs that prove the return on workforce wellness investment.
              </p>
              <div className="w-16 h-1 rounded-full bg-[var(--accent)] mx-auto mt-4" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {businessMetrics.map((metric) => (
                <div key={metric.label} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-2xl p-6 text-center hover:border-[var(--accent)]/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <metric.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[var(--accent)] leading-none mb-2">{metric.value}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           FINAL CTA
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)]">
          <div className="container-shade">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-[clamp(28px,3vw,40px)] font-extrabold text-[var(--text-primary)] leading-tight">
                Ready to Build Your Workforce Wellness Operating System?
              </h2>
              <p className="mt-4 text-lg text-[var(--text-secondary)] leading-relaxed">
                Get a personalized enterprise demo — including an initial workforce wellness analysis
                and program recommendations tailored to your organization.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-primary text-base px-10 py-4 !h-auto">
                  Book Enterprise Demo
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[var(--border-primary)] text-[var(--text-secondary)] font-semibold text-sm hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
