"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  BarChart3, Shield, ArrowLeft, Target,
  Building2, Sparkles, Award, Eye, Layers, Zap,
  Users
} from "lucide-react";
import { initScrollAnimations, initCountUpAnimations } from "@/lib/scroll-animations";

const values = [
  { icon: BarChart3, title: "Data-Driven Decisions", desc: "Every recommendation on Velara Care is based on actual analysis — no guesswork, no assumptions." },
  { icon: Shield, title: "Privacy First", desc: "Employee data is encrypted and secure. Management sees only aggregated statistics, never individual details." },
  { icon: Building2, title: "Measurable Outcomes", desc: "Workforce health programs must demonstrate their impact on productivity, absenteeism, and retention." },
  { icon: Layers, title: "Sustainable Operations", desc: "We help enterprises build long-term workforce health operations — not temporary programs." },
  { icon: Eye, title: "Radical Transparency", desc: "Every metric, every outcome, every cost is visible and traceable across the entire platform ecosystem." },
];

export default function AboutPage() {
  useEffect(() => { const c1 = initScrollAnimations(); const c2 = initCountUpAnimations(); return () => { c1(); c2(); }; }, []);

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
                  <Building2 className="h-3.5 w-3.5" />
                  About Velara Care
                </span>
                <h1 className="vp-hero mt-5">
                  Enterprise Workforce Health
                  <br />
                  <span className="vp-hero-em">Operating System</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  Velara Care is a Saudi-founded enterprise platform that helps organisations build,
                  manage, and measure workforce health programs — increasing productivity, reducing costs,
                  and improving employee wellbeing through operational intelligence.
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
                      <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop&auto=format" alt="Velara team" width={500} height={500} className="w-full h-full object-cover scale-105" priority />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>
                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Zap className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Users className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY + IMAGE */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div data-vp-animate="fade-up">
                <span className="vp-label">Our Story</span>
                <h2 className="vp-section-title mt-4 mb-6">Why We Built Velara Care</h2>
                <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mb-6" />
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  Most organisations have fragmented health initiatives — a fitness challenge here,
                  a meal app there, scattered consultations everywhere. But no unified system manages
                  everything and measures the real impact on productivity and retention.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
                  Velara Care answers a simple question: What if you had one platform that manages all
                  workforce health programs, analyses engagement, measures improvement, and demonstrates ROI?
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  We are not a medical device company. We do not sell oxygen equipment or respiratory
                  therapy. We are an enterprise software platform for workforce health operations — nothing more, nothing less.
                </p>
              </div>
              <div className="relative" data-vp-animate="scale-in" data-vp-delay="2">
                <div className="absolute -inset-6 bg-gradient-to-l from-[var(--accent)]/10 via-[var(--accent)]/5 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-primary)]">
                  <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=700&h=500&fit=crop&auto=format" alt="Team collaboration" width={700} height={500} className="w-full h-auto object-cover" />
                </div>
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="py-24 relative overflow-hidden" dir="ltr" style={{ background: 'linear-gradient(135deg, var(--vp-ink) 0%, #0D4F4F 100%)' }}>
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="absolute top-1/2 left-1/4 w-80 h-80 rounded-full bg-[var(--accent)]/10 blur-3xl" />
          <div className="container-shade relative z-10">
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="glass-premium rounded-2xl p-8 text-center" data-vp-animate="fade-up">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Target className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
                <p className="text-white/70 leading-relaxed">Every enterprise in the region capable of building a data-driven workforce health operation that demonstrably improves productivity, reduces costs, and retains talent.</p>
              </div>
              <div className="glass-premium rounded-2xl p-8 text-center" data-vp-animate="fade-up" data-vp-delay="2">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-7 w-7 text-[var(--accent)]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
                <p className="text-white/70 leading-relaxed">Empower enterprises to build, manage, and measure workforce health programs through a single platform that connects strategy, execution, and outcomes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-20 bg-[var(--bg-primary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none opacity-50" />
          <div className="container-shade relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { num: "95", suffix: "%", label: "Client Satisfaction" },
                { num: "100", suffix: "+", label: "Enterprise Clients" },
                { num: "85", suffix: "%", label: "Employee Engagement" },
                { num: "5000", suffix: "+", label: "Employees on Platform" },
              ].map((s) => (
                <div key={s.label} className="text-center" data-vp-animate="fade-up">
                  <p className="vp-stat" data-vp-count-to={s.num} data-vp-count-suffix={s.suffix}>{s.num}{s.suffix}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-grid-bg opacity-[0.03]" />
          <div className="container-shade relative z-10">
            <div className="text-center mb-14" data-vp-animate="fade-up">
              <span className="vp-label">Our Values</span>
              <h2 className="vp-section-title mt-4">What We Stand For</h2>
              <div className="w-16 h-1 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] mx-auto mt-4" />
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
              {values.map((v, i) => (
                <div key={v.title} className="card-premium p-6 text-center group hover:shadow-xl" data-vp-animate="fade-up" data-vp-delay={String(Math.min(i + 1, 4))}>
                  <div className="w-14 h-14 rounded-2xl bg-[var(--accent-soft)] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <v.icon className="h-7 w-7 text-[var(--accent)]" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{v.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
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
                    <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" /></span>
                    Enterprise Workforce Health OS
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">Ready to Build Your Workforce Health Operations?</h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">Book a personalised enterprise demo and discover how Velara Care can transform your workforce health strategy.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/demo" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
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
