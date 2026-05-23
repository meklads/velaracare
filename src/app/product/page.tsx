"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  Brain, BarChart3, Users, Shield, ArrowLeft, Activity,
  TrendingDown, Target, PieChart, Building2, Cpu,
  UserCheck, Clock, CheckCircle2, Gift, Sparkles,
  Workflow, LineChart, Database, Zap, Layers
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const platformSections = [
  {
    icon: Users,
    title: "Employee — Health Journey Experience",
    subtitle: "Employee Wellness Journey",
    items: ["5-minute lifestyle assessment", "Personalised Workforce Health Score", "AI-driven nutrition and activity recommendations", "Interactive wellness challenges and programs", "Educational health content and motivation"],
  },
  {
    icon: BarChart3,
    title: "HR — Intelligence Dashboard",
    subtitle: "HR Analytics Dashboard",
    items: ["Enterprise-wide Workforce Health Score", "Engagement rates and improvement tracking", "Program impact analysis on productivity", "Board-ready automated reports", "Department and branch comparisons"],
  },
  {
    icon: Cpu,
    title: "Analytics & Recommendations Engine",
    subtitle: "Analytics & Recommendations Engine",
    items: ["Lifestyle and health pattern analysis", "Workforce Health Score (0-100)", "AI-personalised employee recommendations", "Enterprise health trend analysis", "Program impact on absenteeism and productivity"],
  },
  {
    icon: Shield,
    title: "Security & Privacy Infrastructure",
    subtitle: "Security & Privacy",
    items: ["AES-256 encryption & TLS 1.3", "Anonymised reporting for management", "Role-based access control (RBAC)", "Full audit trail logging", "PDPL & SDAIA compliance"],
  },
];

const capabilityModules = [
  { icon: Activity, title: "Workforce Health Assessment", desc: "A rapid data collection tool capturing lifestyle patterns — nutrition, sleep, activity, stress — transforming them into actionable analytics.", bizValue: "Objective understanding of enterprise health within first week" },
  { icon: TrendingDown, title: "Business Impact Analysis", desc: "Correlates program participation with productivity, absenteeism, and retention. Demonstrates real ROI of workforce health investment.", bizValue: "Concrete report linking health to business performance" },
  { icon: PieChart, title: "Board-Ready Executive Reports", desc: "Automated reports for executive leadership and board — covering engagement, health improvement, and KPI impact.", bizValue: "Professional reports with zero manual effort" },
  { icon: Gift, title: "Wellness Programs & Challenges", desc: "Platform managing fitness challenges, nutrition programs, wellness content, and engagement tracking with automated follow-ups.", bizValue: "Employee engagement increase of up to 85%" },
  { icon: Target, title: "Personalised Employee Recommendations", desc: "Based on lifestyle data, each employee receives tailored protocols — meals, activities, sleep, stress management — driving engagement and results.", bizValue: "Personalised experience increasing satisfaction and improvement" },
  { icon: Users, title: "Health Program Operations", desc: "Manages the full program lifecycle — launch, registration, tracking, reporting — with automation saving 70% of HR team time.", bizValue: "Full program management automation — save your team's time" },
];

export default function ProductPage() {
  useEffect(() => { const c = initScrollAnimations(); return () => c(); }, []);

  return (
    <>
      <Header />
      <main>
        {/* HERO — Circle image + split layout */}
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
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div data-vp-animate="fade-up" className="lg:pr-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-soft)] border border-[var(--accent)]/10 text-[var(--accent)] text-xs font-semibold mb-5">
                  <Zap className="h-3.5 w-3.5" />
                  Enterprise Workforce Health OS
                </span>
                <h1 className="vp-hero mt-5">
                  A Unified Operating System
                  <br />
                  <span className="vp-hero-em">For Workforce Health Operations</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  Velara Care is the infrastructure for enterprise workforce health programs — bringing
                  together health assessment, engagement analytics, program management, and ROI reporting
                  in one intuitive platform.
                </p>
              </div>
              <div className="relative flex items-center justify-center" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute w-[320px] h-[320px] lg:w-[420px] lg:h-[420px] rounded-full bg-gradient-to-br from-[var(--accent)]/12 via-[var(--accent)]/3 to-transparent blur-[80px] pointer-events-none" />
                <div className="absolute w-[240px] h-[240px] lg:w-[320px] lg:h-[320px] rounded-full bg-gradient-to-tr from-[var(--accent)]/8 to-transparent blur-[60px] pointer-events-none translate-y-6" />
                <div className="relative w-[240px] h-[240px] lg:w-[340px] lg:h-[340px]">
                  <div className="absolute -inset-[5px] lg:-inset-[7px] rounded-full bg-gradient-to-br from-[var(--accent)] via-[var(--accent-light)]/50 to-[var(--accent-dark)] shadow-2xl shadow-[var(--accent)]/20" />
                  <div className="absolute -inset-[1.5px] lg:-inset-[2.5px] rounded-full bg-[var(--bg-primary)]" />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <div className="w-full h-full" style={{ clipPath: 'url(#circleFrame)' }}>
                      <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop&auto=format" alt="Velara Platform" width={500} height={500} className="w-full h-full object-cover scale-105" priority />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>
                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Layers className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLATFORM SECTIONS */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="mx-auto max-w-3xl text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">Platform Architecture</span>
              <h2 className="vp-section-title mt-4">Four Pillars Operating <span className="vp-hero-em">In Complete Integration</span></h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="space-y-5">
              {platformSections.map((section, i) => (
                <div key={section.title} className="card-premium p-6 lg:p-8" data-vp-animate="fade-up" data-vp-delay={String(i + 1)}>
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex items-start gap-4 lg:w-72 shrink-0">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center shrink-0 shadow-md">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[var(--text-primary)]">{section.title}</h3>
                        <p className="text-xs text-[var(--text-secondary)]">{section.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex-1 grid sm:grid-cols-2 gap-3">
                      {section.items.map((item) => (
                        <div key={item} className="flex items-center gap-2 p-2.5 rounded-xl bg-[var(--accent-soft)]">
                          <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                          <span className="text-sm text-[var(--text-secondary)]">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* IMAGE BREAK */}
        <section className="relative py-16 bg-[var(--bg-primary)]" dir="ltr">
          <div className="container-shade">
            <div className="max-w-4xl mx-auto relative" data-vp-animate="scale-in">
              <div className="absolute -inset-6 bg-gradient-to-r from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&h=500&fit=crop&auto=format" alt="Platform Dashboard" width={1000} height={500} className="w-full h-auto object-cover" />
              </div>
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
            </div>
          </div>
        </section>

        {/* MODULES */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade">
            <div className="mx-auto max-w-3xl text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">Operational Modules</span>
              <h2 className="vp-section-title mt-4">Every Module Delivers <span className="vp-hero-em">Clear Enterprise Value</span></h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-vp-animate="fade-up" data-vp-delay="2">
              {capabilityModules.map((mod) => (
                <div key={mod.title} className="card-premium p-6 group hover:shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <mod.icon className="h-6 w-6 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{mod.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">{mod.desc}</p>
                  <div className="pt-3 border-t border-[var(--border-primary)]">
                    <span className="text-xs font-semibold text-[var(--accent)]">{mod.bizValue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA — Glass Premium Card */}
        <section className="relative py-28 overflow-hidden" dir="ltr" style={{ background: 'linear-gradient(160deg, #071F1F 0%, #0A3A3A 40%, #0D4F4F 70%, #071F1F 100%)' }}>
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25% 40%, rgba(45,212,191,0.10) 0%, transparent 50%), radial-gradient(circle at 75% 60%, rgba(45,212,191,0.06) 0%, transparent 50%)' }} />
          <div className="absolute inset-0 vp-grid-bg opacity-[0.04]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="container-shade relative z-10">
            <div className="max-w-4xl mx-auto" data-vp-animate="slide-up">
              <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] p-10 lg:p-16" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.015) 100%)', backdropFilter: 'blur(24px)' }}>
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-white/[0.02] blur-[120px] pointer-events-none" />
                <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/[0.10] text-white/80 text-xs font-semibold mb-8 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
                    </span>
                    Enterprise Workforce Health OS
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">
                    Ready to See the Platform in Action?
                  </h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Get a personalised enterprise demo tailored to your organisation's needs — includes a preliminary health assessment and program recommendations.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5">
                      Book Enterprise Demo
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-8 border-t border-white/[0.06]">
                    <div className="text-center"><p className="text-white font-extrabold text-xl">100+</p><p className="text-white/40 text-xs">Enterprise Clients</p></div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center"><p className="text-white font-extrabold text-xl">5,000+</p><p className="text-white/40 text-xs">Employees on Platform</p></div>
                    <div className="w-px h-10 bg-white/[0.06]" />
                    <div className="text-center"><p className="text-white font-extrabold text-xl">3.2x</p><p className="text-white/40 text-xs">Average ROI</p></div>
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
