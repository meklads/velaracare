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
  Award, Medal, ClipboardCheck, Brain,
  Sparkles, Zap, Workflow, LineChart,
  RefreshCw, Lightbulb, Layers, Network,
  Eye, Shield, Database, GanttChartSquare
} from "lucide-react";

// ─── HERO KPI CARDS ───
const kpiCards = [
  { icon: TrendingDown, value: "-35%", label: "Reduce Sick Leave", desc: "Measurable reduction in absenteeism through preventive workforce health programs." },
  { icon: Users, value: "+28%", label: "Improve Wellbeing", desc: "Quantifiable improvement in workforce wellness scores across all departments." },
  { icon: DollarSign, value: "-22%", label: "Lower Healthcare Costs", desc: "Direct reduction in employer healthcare expenditure year over year." },
  { icon: TrendingUp, value: "+18%", label: "Increase Productivity", desc: "Correlated productivity gains from optimised workforce health operations." }
];

// ─── SECTION 2: PLATFORM ECOSYSTEM ───
const ecosystemEntities = [
  { icon: Building2, title: "Enterprise", desc: "Sets workforce health strategy, funds programs, and measures ROI through unified operational dashboards.", role: "Strategy & Investment" },
  { icon: Users, title: "HR Operations", desc: "Manages programs, monitors engagement, generates executive reports from a single command center.", role: "Program Management" },
  { icon: UserCheck, title: "Employees", desc: "Complete health assessments, receive personalised recommendations, track progress over time.", role: "Participation & Growth" },
  { icon: Brain, title: "Nutritionists", desc: "Access workforce health data, design nutrition protocols, consult employees through integrated workspace.", role: "Clinical Operations" },
  { icon: Network, title: "Restaurant Partners", desc: "Receive structured meal orders aligned with health protocols, fulfil through integrated logistics.", role: "Service Delivery" }
];

// ─── SECTION 3: HR INTELLIGENCE DASHBOARD ───
const hrMetrics = [
  { icon: Activity, value: "87%", label: "Workforce Health Score", desc: "Aggregate health index across all employees" },
  { icon: TrendingUp, value: "72%", label: "Program Engagement", desc: "Active participation in workforce health programs" },
  { icon: PieChart, value: "3 Levels", label: "Risk Distribution", desc: "Low / Medium / High health risk segmentation" },
  { icon: TrendingDown, value: "-35%", label: "Absenteeism Rate", desc: "Year-over-year sick leave reduction" },
  { icon: ClipboardCheck, value: "81%", label: "Program Adoption", desc: "Employees enrolled in active health programs" },
  { icon: LineChart, value: "2.4x", label: "Productivity Correlation", desc: "Health score vs. performance benchmark" }
];

// ─── SECTION 4: EMPLOYEE JOURNEY ───
const employeeJourney = [
  { step: "01", icon: Building2, title: "Onboarding & Enrollment", desc: "Employee is automatically provisioned via HR system integration — zero manual setup." },
  { step: "02", icon: ClipboardCheck, title: "Health Assessment (HRA)", desc: "5-minute lifestyle assessment covering nutrition, sleep, activity, and stress levels." },
  { step: "03", icon: Brain, title: "AI Health Analysis", desc: "Proprietary algorithms generate a Workforce Health Score with personalised risk breakdown." },
  { step: "04", icon: Target, title: "Personalised Recommendations", desc: "Actionable health protocols and nutrition plans delivered through the platform." },
  { step: "05", icon: RefreshCw, title: "Progress Tracking", desc: "Continuous monitoring with real-time Health Score updates and trend analysis." },
  { step: "06", icon: TrendingUp, title: "Outcome Measurement", desc: "Enterprise reporting on health improvement, engagement, and business impact." }
];

// ─── SECTION 5: NUTRITIONIST OPERATIONS ───
const nutritionistCapabilities = [
  { icon: Eye, title: "Health Data Access", desc: "View assigned workforce health profiles and assessment results." },
  { icon: Target, title: "Protocol Design", desc: "Create nutrition protocols linked directly to restaurant ordering systems." },
  { icon: UserCheck, title: "Consultation Management", desc: "Schedule and manage all employee consultations within the platform." },
  { icon: TrendingUp, title: "Progress Monitoring", desc: "Track employee health metrics and adjust protocols dynamically." },
  { icon: BarChart3, title: "Outcome Analytics", desc: "Measure the impact of nutrition interventions on Workforce Health Scores." }
];

// ─── SECTION 6: RESTAURANT OPERATIONS ───
const restaurantCapabilities = [
  { icon: GanttChartSquare, title: "Structured Ordering", desc: "Receive classified orders based on health protocols and dietary requirements." },
  { icon: Database, title: "Wellness Menu Management", desc: "Organise meals by health categories — balanced, protein, low-calorie, custom." },
  { icon: Activity, title: "Integrated Logistics", desc: "Platform-connected delivery with real-time order tracking for enterprise scale." },
  { icon: PieChart, title: "Performance Analytics", desc: "Track order volumes, popular meals, and participation trends across all client companies." }
];

// ─── SECTION 7: AI & PREDICTIVE ENGINE ───
const aiCapabilities = [
  { icon: Brain, title: "Predictive Risk Modelling", desc: "ML models identify at-risk employees before health issues manifest, enabling proactive intervention." },
  { icon: LineChart, title: "Trend Forecasting", desc: "Enterprise-wide health trend analysis with 6-month forward-looking projections." },
  { icon: Lightbulb, title: "Smart Recommendations", desc: "AI-powered personalised health protocols that adapt based on employee progress and feedback." },
  { icon: Shield, title: "Privacy-Preserving Analytics", desc: "Federated learning ensures individual data never leaves the device — only aggregate insights reach HR." }
];

// ─── SECTION 8: BUSINESS IMPACT ───
const businessMetrics = [
  { icon: TrendingDown, value: "-35%", label: "Absenteeism Reduction", desc: "Average reduction in sick leave within 6 months" },
  { icon: TrendingUp, value: "+25%", label: "Productivity Improvement", desc: "Measurable performance gains across teams" },
  { icon: Users, value: "85%", label: "Program Participation", desc: "Employee enrollment in health programs" },
  { icon: DollarSign, value: "-28%", label: "Healthcare Cost Reduction", desc: "Direct employer cost savings annually" },
  { icon: Award, value: "3.2x", label: "Average ROI", desc: "Return on workforce health investment" },
  { icon: Medal, value: "+40%", label: "Retention Improvement", desc: "Improved employee retention through wellness" }
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
        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 1 — HERO
           "Transform Workforce Health Into Measurable Business Performance"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative pt-32 pb-20 overflow-hidden" dir="ltr">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-soft)] via-transparent to-transparent opacity-60" />
          <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent)]/3 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />

          <svg width="0" height="0" className="absolute">
            <defs>
              <clipPath id="circleFrame" clipPathUnits="objectBoundingBox">
                <circle cx="0.5" cy="0.5" r="0.5" />
              </clipPath>
            </defs>
          </svg>

          <div className="container-shade relative z-10">
            {/* Top row: text (left) + image (right) */}
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Text — LHS */}
              <div data-vp-animate="fade-up" className="lg:pr-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-5">
                  <Zap className="h-3.5 w-3.5" />
                  Enterprise Workforce Health OS
                </span>
                <h1 className="vp-hero mt-5">
                  Transform Workforce Health Into
                  <br />
                  <span className="vp-hero-em">Measurable Business Performance</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  Velara is the unified operating system that connects enterprises, HR teams,
                  employees, nutritionists, and restaurant partners into one measurable workforce
                  health ecosystem — turning wellness investment into operational intelligence.
                </p>
              </div>

              {/* Image — RHS */}
              <div className="relative flex items-center justify-center" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-[var(--accent)]/12 via-[var(--accent)]/3 to-transparent blur-[80px] pointer-events-none" />
                <div className="absolute w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] rounded-full bg-gradient-to-tr from-[var(--accent)]/8 to-transparent blur-[60px] pointer-events-none translate-y-6" />

                <div className="relative w-[240px] h-[240px] lg:w-[340px] lg:h-[340px]">
                  <div className="absolute -inset-[5px] lg:-inset-[7px] rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-light)]/50 to-[var(--accent-dark)] shadow-2xl shadow-[var(--accent)]/20" />
                  <div className="absolute -inset-[1.5px] lg:-inset-[2.5px] rounded-full bg-[var(--bg-primary)]" />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="w-full h-full" style={{ clipPath: 'url(#circleFrame)' }}>
                      <Image
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=500&fit=crop&auto=format"
                        alt="Enterprise team collaborating"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover scale-105"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>

                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg shadow-[var(--accent)]/10 backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row: CTA + 4 KPI cards */}
            <div className="mt-10 lg:mt-14 max-w-5xl" data-vp-animate="fade-up" data-vp-delay="3">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
                <Link href="/demo" className="btn-premium text-base px-10 py-4 !h-auto shadow-lg shadow-[var(--accent)]/15">
                  Book Enterprise Demo
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <Link href="/product" className="btn-ghost text-base px-8 py-4 !h-auto">
                  Explore Platform
                </Link>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                {kpiCards.map((card) => (
                  <div key={card.label} className="glass-premium rounded-xl p-4 text-center group hover:border-[var(--accent)]/20 hover:shadow-lg transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform ring-1 ring-[var(--accent)]/10">
                      <card.icon className="h-4 w-4 text-[var(--accent)]" />
                    </div>
                    <h3 className="text-xs font-bold text-[var(--text-primary)] mb-1">{card.label}</h3>
                    <p className="text-[10px] text-[var(--text-secondary)] leading-snug">{card.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
           STATISTICS BANNER
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-[var(--bg-primary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none opacity-50" />
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { num: "100", suffix: "+", label: "Enterprise Clients" },
                { num: "5000", suffix: "+", label: "Employees on Platform" },
                { num: "35", suffix: "%", label: "Avg. Sick Leave Reduction" },
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

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 2 — PLATFORM ECOSYSTEM
           "The Workforce Wellness Ecosystem"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">Platform Architecture</span>
              <h2 className="vp-section-title mt-4">The Workforce Health Ecosystem</h2>
              <p className="vp-subtitle mt-4">Five interconnected stakeholders operating in one unified, measurable platform — connecting strategy to execution.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
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

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 3 — HR INTELLIGENCE DASHBOARD
           "HR Wellness Intelligence Center"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="ltr">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">Command Center</span>
                <h2 className="vp-section-title mt-4">HR Wellness Intelligence Center</h2>
                <p className="vp-subtitle mt-4 mb-8">Real-time operational intelligence for managing workforce health programs at scale. Monitor engagement, measure outcomes, and generate board-ready reports.</p>
                <div className="grid grid-cols-2 gap-3">
                  {hrMetrics.map((metric) => (
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
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=500&fit=crop&auto=format" alt="HR Analytics Dashboard" width={700} height={500} className="w-full h-auto object-cover" priority />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 4 — EMPLOYEE JOURNEY
           "The Employee Wellness Journey"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-tl from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.02]" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-last lg:order-first" data-vp-animate="scale-in">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&h=500&fit=crop&auto=format" alt="Employee journey" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div data-vp-animate="fade-up" data-vp-delay="2">
                <span className="vp-label">Workflow</span>
                <h2 className="vp-section-title mt-4">The Employee Wellness Journey</h2>
                <p className="vp-subtitle mt-4 mb-8">From onboarding to measurable improvement — a complete workforce health journey powered by AI-driven insights and connected care.</p>
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

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 5 — NUTRITIONIST OPERATIONS
           "Connected Nutritionist Workspace"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">Clinical Workspace</span>
                <h2 className="vp-section-title mt-4">Connected Nutritionist Workspace</h2>
                <p className="vp-subtitle mt-4 mb-8">An intelligent clinical workspace where nutritionists manage their caseload, design protocols, and measure outcomes — all connected to the enterprise health ecosystem.</p>
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
                  <Image src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=700&h=500&fit=crop&auto=format" alt="Nutritionist workspace" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 6 — RESTAURANT OPERATIONS
           "Restaurant Wellness Network"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative order-last lg:order-first" data-vp-animate="scale-in">
                <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=700&h=500&fit=crop&auto=format" alt="Restaurant operations" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
              <div data-vp-animate="fade-up" data-vp-delay="2">
                <span className="vp-label">Logistics Network</span>
                <h2 className="vp-section-title mt-4">Restaurant Wellness Network</h2>
                <p className="vp-subtitle mt-4 mb-8">An operational logistics ecosystem connecting restaurant partners to enterprise health goals — from structured order management to integrated delivery tracking.</p>
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

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 7 — AI & PREDICTIVE ENGINE
           "Predictive Workforce Health Intelligence"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="ltr">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-[var(--accent)]/8 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">Intelligence Engine</span>
              <h2 className="vp-section-title mt-4">Predictive Workforce Health Intelligence</h2>
              <p className="vp-subtitle mt-4">Machine learning models that predict health risks, forecast trends, and deliver personalised recommendations at enterprise scale — while preserving individual privacy.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" data-vp-animate="fade-up" data-vp-delay="2">
              {aiCapabilities.map((cap) => (
                <div key={cap.title} className="card-premium p-6 sm:p-8 group hover:shadow-xl" data-vp-animate="fade-up">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <cap.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{cap.title}</h3>
                  <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">{cap.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
           SECTION 8 — BUSINESS IMPACT
           "Business Outcomes That Matter"
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute bottom-[-20%] right-[20%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[var(--accent)]/5 to-transparent blur-3xl pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16" data-vp-animate="fade-up">
              <span className="vp-label">Enterprise Outcomes</span>
              <h2 className="vp-section-title mt-4">Business Outcomes That Matter</h2>
              <p className="vp-subtitle mt-4">Key performance indicators that demonstrate the measurable ROI of investing in workforce health operations.</p>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto" data-vp-animate="fade-up" data-vp-delay="2">
              {businessMetrics.map((metric) => (
                <div key={metric.label} className="card-premium !p-6 text-center group hover:shadow-xl">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent)]/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ring-2 ring-[var(--accent)]/10">
                    <metric.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <p className="text-3xl font-extrabold text-[var(--accent)] leading-none mb-2">{metric.value}</p>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{metric.label}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{metric.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
           CTA — Glass Premium Card
           ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 overflow-hidden" dir="ltr" style={{ background: 'linear-gradient(160deg, #071F1F 0%, #0A3A3A 40%, #0D4F4F 70%, #071F1F 100%)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(45,212,191,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(45,212,191,0.06) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)]/20 to-transparent" />

          <div className="absolute top-[15%] left-[10%] w-64 h-64 rounded-full bg-[var(--accent)]/8 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[10%] right-[5%] w-80 h-80 rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />

          <div className="container-shade relative z-10">
            <div className="max-w-4xl mx-auto" data-vp-animate="slide-up">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 lg:p-16" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/80 text-xs font-semibold mb-8 backdrop-blur-sm hover:bg-white/[0.08] transition-all">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                    </span>
                    Enterprise Workforce Health OS
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">
                    Ready to Transform Your<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] via-[var(--accent-light)] to-[var(--accent)]">
                      Workforce Health Operations?
                    </span>
                  </h2>

                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Book a personalised enterprise demo — includes a free preliminary workforce health
                    assessment and recommended program structure tailored to your organisation's size and needs.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5">
                      Book Enterprise Demo
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/pricing" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      View Pricing
                    </Link>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-8 border-t border-white/[0.06]">
                    <div className="text-center">
                      <p className="text-white font-extrabold text-xl">100+</p>
                      <p className="text-white/40 text-xs">Enterprise Clients</p>
                    </div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center">
                      <p className="text-white font-extrabold text-xl">5,000+</p>
                      <p className="text-white/40 text-xs">Employees on Platform</p>
                    </div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center">
                      <p className="text-white font-extrabold text-xl">3.2x</p>
                      <p className="text-white/40 text-xs">Average ROI</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
