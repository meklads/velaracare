"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  CheckCircle2, ArrowLeft, Building2, Users,
  TrendingDown, BarChart3, Sparkles, Zap,
  DollarSign
} from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const plans = [
  {
    name: "Starter",
    desc: "For enterprises beginning their workforce health optimisation journey.",
    popular: false,
    features: ["Workforce Health Assessment (up to 200 employees)", "Enterprise Wellness Score", "Executive Dashboard", "Monthly Reports", "Technical Support"],
  },
  {
    name: "Professional",
    desc: "For growing enterprises needing a measurable, integrated health program.",
    popular: true,
    features: ["All Starter features", "Unlimited workforce assessments", "Healthcare cost analytics", "Preventive intervention engine", "ROI reporting suite", "Full employee portal", "Dedicated account manager"],
  },
  {
    name: "Enterprise",
    desc: "For large organisations requiring a custom, fully integrated health OS.",
    popular: false,
    features: ["All Professional features", "ERP & HRMS integration", "Health insurance system integration", "Custom modules per company needs", "Open API for custom integrations", "Board-level analytics", "Customer success manager", "99.9% SLA guarantee"],
  },
];

const planModules = [
  { name: "Workforce Health Assessment", starter: true, pro: true, enterprise: true },
  { name: "Enterprise Wellness Score", starter: true, pro: true, enterprise: true },
  { name: "Executive Dashboard", starter: true, pro: true, enterprise: true },
  { name: "Monthly Reports", starter: true, pro: true, enterprise: true },
  { name: "Unlimited Employee Assessments", starter: false, pro: true, enterprise: true },
  { name: "Healthcare Cost Analytics", starter: false, pro: true, enterprise: true },
  { name: "Preventive Intervention Engine", starter: false, pro: true, enterprise: true },
  { name: "ROI Reporting Suite", starter: false, pro: true, enterprise: true },
  { name: "Full Employee Portal", starter: false, pro: true, enterprise: true },
  { name: "Dedicated Account Manager", starter: false, pro: true, enterprise: true },
  { name: "ERP & HRMS Integration", starter: false, pro: false, enterprise: true },
  { name: "Insurance System Integration", starter: false, pro: false, enterprise: true },
  { name: "Open API Access", starter: false, pro: false, enterprise: true },
  { name: "99.9% SLA Guarantee", starter: false, pro: false, enterprise: true },
];

export default function PricingPage() {
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
                  <DollarSign className="h-3.5 w-3.5" />
                  Enterprise Pricing
                </span>
                <h1 className="vp-hero mt-5">
                  Flexible Enterprise Plans
                  <br />
                  <span className="vp-hero-em">For Every Organisation</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  Annual subscription based on workforce size and required modules. Transparent pricing
                  with no hidden fees. All plans include a free trial period.
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
                      <Image
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=500&fit=crop&auto=format"
                        alt="Enterprise pricing strategy"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover scale-105"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>
                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <TrendingDown className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PLANS */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div key={plan.name} className={`card-premium p-6 text-center relative group ${plan.popular ? 'border-2 border-[var(--accent)] shadow-xl shadow-[var(--accent)]/10' : 'hover:shadow-xl'}`} data-vp-animate="scale-in" data-vp-delay={String(i + 1)}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)' }}>
                        <Sparkles className="h-3 w-3 inline-block mr-1" />
                        Most Popular
                      </span>
                    </div>
                  )}
                  <p className="text-xl font-bold text-[var(--text-primary)] mt-2">{plan.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{plan.desc}</p>
                  <div className="mt-5 pt-5 border-t border-[var(--border-primary)]">
                    <p className="text-sm text-[var(--text-secondary)]">Custom Pricing</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Contact us for a tailored quote</p>
                  </div>
                  <div className="mt-6 space-y-3 text-left">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                        {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/demo" className={`${plan.popular ? 'btn-premium' : 'btn-ghost'} w-full justify-center mt-6 text-sm`}>
                    Book Enterprise Demo
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Feature comparison */}
        <section className="py-24 bg-[var(--bg-primary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.02]" />
          <div className="container-shade max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">Feature Comparison</span>
              <h2 className="vp-section-title mt-4">Detailed Plan Comparison</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="overflow-x-auto rounded-2xl border border-[var(--border-primary)]" data-vp-animate="fade-up" data-vp-delay="2">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-primary)] bg-[var(--accent-soft)]">
                    <th className="text-left py-4 px-4 font-bold text-[var(--text-primary)]">Feature</th>
                    <th className="text-center py-4 px-4 font-bold text-[var(--text-primary)]">Starter</th>
                    <th className="text-center py-4 px-4 font-bold text-[var(--accent)]">Professional</th>
                    <th className="text-center py-4 px-4 font-bold text-[var(--text-primary)]">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {planModules.map((mod) => (
                    <tr key={mod.name} className="border-b border-[var(--border-primary)] hover:bg-[var(--accent-soft)]/50 transition-colors">
                      <td className="py-3.5 px-4 text-[var(--text-secondary)]">{mod.name}</td>
                      <td className="text-center py-3.5 px-4">
                        {mod.starter ? <CheckCircle2 className="h-4 w-4 text-[var(--accent)] mx-auto" /> : <span className="text-[var(--text-muted)]">—</span>}
                      </td>
                      <td className="text-center py-3.5 px-4">
                        {mod.pro ? <CheckCircle2 className="h-4 w-4 text-[var(--accent)] mx-auto" /> : <span className="text-[var(--text-muted)]">—</span>}
                      </td>
                      <td className="text-center py-3.5 px-4">
                        {mod.enterprise ? <CheckCircle2 className="h-4 w-4 text-[var(--accent)] mx-auto" /> : <span className="text-[var(--text-muted)]">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Enterprise CTA — Glass card */}
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
                    Talk to Our Sales Team
                  </h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
                    Every organisation has unique needs. Let us build a custom plan that fits your workforce size and budget.
                  </p>
                  <p className="text-sm text-white/50 mb-10">Free trial — no credit card — no commitment.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5">
                      Book Enterprise Demo
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/contact" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      Contact Our Team
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
