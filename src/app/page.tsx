"use client";

import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useEffect } from "react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";
import {
  TrendingDown, BarChart3, Users, Building2,
  ArrowLeft, ArrowRight, Activity, TrendingUp,
  DollarSign, PieChart, UserCheck, Target,
  Award, Medal, ClipboardCheck, Brain, Salad,
  Apple, ChefHat, Sparkles, Zap, Heart
} from "lucide-react";

// ===== HERO VALUE CARDS =====
const valueCards = [
  { icon: TrendingDown, title: "Reduce Sick Leave", desc: "Wellness programs that lower absenteeism and keep your workforce healthy and present." },
  { icon: Users, title: "Improve Employee Wellbeing", desc: "Personalized wellness journeys that improve quality of life and job satisfaction." },
  { icon: BarChart3, title: "Workforce Wellness Analytics", desc: "Real-time dashboards that track participation, improvement, and business impact." },
  { icon: Target, title: "Measurable Health Outcomes", desc: "Quantifiable results linking wellness investment to productivity and cost reduction." }
];

// ===== SECTION 1: ECOSYSTEM =====
const ecosystemEntities = [
  { icon: Building2, title: "Company", desc: "Invests in workforce wellness and gains measurable improvements in productivity, retention, and operational costs.", role: "Sets strategy & funds programs" },
  { icon: Users, title: "HR Team", desc: "Manages wellness programs, monitors engagement, tracks outcomes, and generates executive reports from one dashboard.", role: "Operates & monitors programs" },
  { icon: UserCheck, title: "Employee", desc: "Completes assessments, receives personalized recommendations, orders healthy meals, and tracks progress over time.", role: "Participates & improves over time" },
  { icon: Apple, title: "Nutritionist", desc: "Accesses employee wellness insights, creates tailored nutrition plans, and monitors client progress through consultations.", role: "Prescribes nutrition plans" },
  { icon: ChefHat, title: "Restaurant Partner", desc: "Receives structured wellness orders, prepares meals aligned with health goals, and delivers via integrated logistics.", role: "Fulfills healthy meals" }
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
  useEffect(() => {
    const c1 = initScrollAnimations();
    const c2 = initCountUpAnimations();
    return () => { c1(); c2(); };
  }, []);

  return (
    <>
      <Header />
      <main>
        {/* ════════════════════════════════════════
           HERO
           ════════════════════════════════════════ */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent)]/3 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />

          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-4xl text-center">
              <div data-vp-animate="fade-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-6">
                  <Heart className="h-3.5 w-3.5" />
                  Enterprise Workforce Wellness Platform
                </span>
              </div>
              <h1 className="vp-hero" data-vp-animate="fade-up" data-vp-delay="1">
                Transform Workforce Health
                <br />
                <span className="vp-hero-em">Into Measurable Business Performance</span>
              </h1>
              <p className="vp-subtitle max-w-3xl mx-auto mt-6" data-vp-animate="fade-up" data-vp-delay="2">
                Velara is an integrated workforce health operating system connecting companies,
                employees, HR teams, nutritionists, and wellness providers inside one measurable ecosystem.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4" data-vp-animate="fade-up" data-vp-delay="3">
                <Link href="/demo" className="btn-premium text-base px-10 py-4 !h-auto">
                  Book Enterprise Demo
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/product" className="btn-ghost text-base px-8 py-4 !h-auto">
                  Explore Platform
                </Link>
              </div>
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto" data-vp-animate="fade-up" data-vp-delay="4">
                {valueCards.map((card) => (
                  <div key={card.title} className="glass-premium rounded-xl p-4 text-center group hover:border-[var(--accent)]/20">
                    <div className="w-10 h-10 rounded-xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                      <card.icon className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{card.title}</h3>
                    <p className="text-xs text-[var(--text-secondary)] leading-tight">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           STATS — Trust & Scale
           ════════════════════════════════════════ */}
        <section className="py-16 bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 vp-data-dots pointer-events-none opacity-50" />
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { num: "5000", suffix: "+", label: "Employees On Platform" },
                { num: "100", suffix: "+", label: "Enterprise Clients" },
                { num: "35", suffix: "%", label: "Sick Leave Reduction" },
                { num: "3.2", suffix: "x", label: "Average ROI" },
              ].map((s) => (
                <div key={s.label} className="text-center" data-vp-animate="fade-up">
                  <p className="vp-stat" data-vp-count-to={s.num} data-vp-count-suffix={s.suffix}>{s.num}{s.suffix}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 1 — PLATFORM ECOSYSTEM
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">Platform Architecture</span>
              <h2 className="vp-section-title mt-4">How The Velara Ecosystem Works</h2>
              <p className="vp-subtitle mt-4">Five key stakeholders connected in one measurable workforce wellness operating system.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>

            <div className="hidden lg:flex items-start justify-center max-w-6xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {ecosystemEntities.map((item, i) => (
                <div key={item.title} className="flex items-start">
                  <div className="glass-premium rounded-2xl p-5 flex flex-col items-center text-center w-[190px] hover:border-[var(--accent)]/20 transition-all duration-500">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mb-3 ring-2 ring-[var(--accent)]/10">
                      <item.icon className="h-8 w-8 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">{item.desc}</p>
                    <span className="text-[10px] font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-full whitespace-nowrap">{item.role}</span>
                  </div>
                  {i < ecosystemEntities.length - 1 && (
                    <div className="flex items-center pt-8 px-2">
                      <div className="w-8 h-8 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-sm">
                        <ArrowRight className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:hidden gap-5 max-w-3xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {ecosystemEntities.map((item) => (
                <div key={item.title} className="card-premium p-6 text-center group">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mx-auto mb-4 ring-2 ring-[var(--accent)]/10 group-hover:scale-110 transition-transform">
                    <item.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">{item.desc}</p>
                  <span className="text-xs font-semibold text-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 rounded-full">{item.role}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 2 — HR CONTROL CENTER
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-bl from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">Enterprise Analytics</span>
                <h2 className="vp-section-title mt-4">HR Wellness Intelligence Dashboard</h2>
                <p className="vp-subtitle mt-4 mb-8">Real-time operational intelligence for managing workforce wellness programs at scale. Monitor participation, track outcomes, and generate executive-ready reports.</p>
                <div className="grid grid-cols-2 gap-3">
                  {hrDashboardMetrics.map((metric) => (
                    <div key={metric.label} className="card-premium !p-4 group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <metric.icon className="h-4 w-4 text-[var(--accent)]" />
                        </div>
                        <span className="text-lg font-extrabold text-[var(--accent)]">{metric.value}</span>
                      </div>
                      <h3 className="text-xs font-bold text-[var(--text-primary)] mb-0.5">{metric.label}</h3>
                      <p className="text-[10px] text-[var(--text-secondary)]">{metric.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&auto=format" alt="HR Analytics Dashboard" width={700} height={500} className="w-full h-auto object-cover" priority />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 3 — EMPLOYEE EXPERIENCE FLOW
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.02]" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-last lg:order-first" data-vp-animate="scale-in">
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&h=500&fit=crop&auto=format" alt="Employee Wellness Journey" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div data-vp-animate="fade-up" data-vp-delay="2">
                <span className="vp-label">Employee Journey</span>
                <h2 className="vp-section-title mt-4">Employee Wellness Journey</h2>
                <p className="vp-subtitle mt-4 mb-8">From onboarding to measurable improvement — a complete employee wellness experience powered by AI.</p>
                <div className="space-y-4">
                  {employeeJourney.map((item, i) => (
                    <div key={item.step} className="flex items-start gap-4 group">
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-md group-hover:scale-110 transition-transform">
                          {item.step}
                        </div>
                        {i < employeeJourney.length - 1 && (<div className="w-0.5 flex-1 bg-gradient-to-b from-[var(--accent)]/20 to-transparent mt-1" />)}
                      </div>
                      <div className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 flex-1 group-hover:border-[var(--accent)]/20 transition-all">
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
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 4 — NUTRITIONIST OPERATIONS
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">Nutritionist Workspace</span>
                <h2 className="vp-section-title mt-4">Connected Nutritionist Workspace</h2>
                <p className="vp-subtitle mt-4 mb-8">An intelligent operational workspace where nutritionists manage clients, create plans, and measure outcomes — all connected to the employee wellness ecosystem.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {nutritionistCapabilities.map((cap) => (
                    <div key={cap.title} className="card-premium !p-4 group">
                      <div className="w-9 h-9 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <cap.icon className="h-4 w-4 text-[var(--accent)]" />
                      </div>
                      <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{cap.title}</h3>
                      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=700&h=500&fit=crop&auto=format" alt="Healthy Nutrition" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 5 — RESTAURANT PARTNER SYSTEM
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden">
          <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-last lg:order-first" data-vp-animate="scale-in">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&h=500&fit=crop&auto=format" alt="Restaurant Kitchen" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div data-vp-animate="fade-up" data-vp-delay="2">
                <span className="vp-label">Partner Network</span>
                <h2 className="vp-section-title mt-4">Restaurant Wellness Network</h2>
                <p className="vp-subtitle mt-4 mb-8">An operational logistics ecosystem connecting restaurant partners to workforce wellness outcomes through structured ordering and integrated delivery.</p>
                <div className="space-y-4">
                  {restaurantCapabilities.map((cap) => (
                    <div key={cap.title} className="card-premium !p-5 group">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-[var(--accent-soft)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <cap.icon className="h-5 w-5 text-[var(--accent)]" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">{cap.title}</h3>
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
           SECTION 6 — BUSINESS IMPACT
           ════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">ROI Metrics</span>
              <h2 className="vp-section-title mt-4">Business Outcomes That Matter</h2>
              <p className="vp-subtitle mt-4">Measurable enterprise KPIs that prove the return on workforce wellness investment.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {businessMetrics.map((metric) => (
                <div key={metric.label} className="card-premium !p-6 text-center group hover:shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ring-2 ring-[var(--accent)]/10">
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
        <section className="relative py-24 overflow-hidden" style={{ background: 'linear-gradient(135deg, var(--vp-ink) 0%, #0D4F4F 100%)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center" data-vp-animate="slide-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-semibold mb-6">
                <Zap className="h-3.5 w-3.5" />
                Get Started Today
              </span>
              <h2 className="vp-hero text-white mb-6">Ready to Build Your Workforce Wellness<br /><span className="vp-hero-em">Operating System?</span></h2>
              <p className="vp-subtitle text-white/70 max-w-2xl mx-auto mb-10">Get a personalized enterprise demo — including an initial workforce wellness analysis and program recommendations tailored to your organization.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/demo" className="btn-premium !bg-white !text-[var(--vp-ink)] hover:!shadow-xl">
                  Book Enterprise Demo <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/5 hover:border-white/30 transition-all">
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
