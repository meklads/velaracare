"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Shield, Sparkles, ArrowLeft, Lock } from "lucide-react";
import { initScrollAnimations } from "@/lib/scroll-animations";

const sections = [
  { title: "Introduction", content: "At Velara Care, we are committed to protecting your personal data. This policy explains how we collect, use, and safeguard the information you share when using our enterprise workforce health platform." },
  { title: "Information We Collect", content: "We collect the following information: name, work email, phone number, health profile data (height, weight, age, health history), health assessment results, platform usage data, and consultation records." },
  { title: "How We Use Your Information", content: "We use your information to deliver personalised workforce health recommendations, improve our services, communicate regarding consultations, prepare anonymised enterprise health reports, and enhance user experience." },
  { title: "Data Protection", content: "We employ industry-leading security standards to protect your data. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never share individual health data with third parties without explicit consent." },
  { title: "Data Retention", content: "We retain your data for the duration of your organisation's platform subscription. You may request data deletion at any time by contacting our support team." },
  { title: "Your Rights", content: "You have the right to access, correct, delete, or restrict processing of your data. You may also object to processing or request data portability." },
  { title: "Policy Updates", content: "We may update this privacy policy from time to time. Material changes will be communicated via email or in-platform notification." },
  { title: "Contact Us", content: "For privacy-related inquiries, please contact us at: privacy@velaracare.co" },
];

export default function PrivacyPage() {
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
                  <Lock className="h-3.5 w-3.5" />
                  Privacy Policy
                </span>
                <h1 className="vp-hero mt-5">
                  Your Data Is <span className="vp-hero-em">In Safe Hands</span>
                </h1>
                <p className="text-sm lg:text-base text-[var(--text-secondary)] mt-6 leading-relaxed max-w-lg">
                  Velara Care is committed to the highest standards of privacy and security for enterprise
                  workforce health data. Last updated: May 2026.
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
                        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500&h=500&fit=crop&auto=format"
                        alt="Privacy and security"
                        width={500}
                        height={500}
                        className="w-full h-full object-cover scale-105"
                        priority
                      />
                    </div>
                    <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.12) 100%)' }} />
                  </div>
                  <div className="absolute -top-2 -right-1 lg:-top-3 lg:-right-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--accent)]/20 flex items-center justify-center shadow-lg backdrop-blur-sm rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Shield className="h-4 w-4 lg:h-5 lg:w-5 text-[var(--accent)]" />
                  </div>
                  <div className="absolute -bottom-2 -left-1 lg:-bottom-3 lg:-left-2 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center shadow-lg backdrop-blur-sm -rotate-12 hover:rotate-0 hover:scale-110 transition-all duration-500 z-10">
                    <Lock className="h-4 w-4 lg:h-5 lg:w-5 text-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVACY CONTENT */}
        <section className="py-24 bg-[var(--bg-secondary)] relative overflow-hidden" dir="ltr">
          <div className="absolute inset-0 vp-data-dots pointer-events-none" />
          <div className="container-shade max-w-4xl mx-auto relative z-10">
            <div className="space-y-5" data-vp-animate="fade-up" data-vp-delay="2">
              {sections.map((section, i) => (
                <div key={i} className="card-premium p-6 group hover:shadow-md">
                  <h2 className="font-bold text-[var(--text-primary)] text-lg mb-2">{section.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{section.content}</p>
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
                  <Shield className="h-12 w-12 text-[var(--accent)] mx-auto mb-4" />
                  <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] mb-6">Security Is Our First Priority</h2>
                  <p className="text-lg text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">We continuously develop our security and privacy standards to ensure your data remains protected.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                    <Link href="/contact" className="group relative inline-flex items-center gap-2.5 px-10 py-4 rounded-2xl bg-white text-[var(--vp-ink)] font-bold text-base shadow-xl shadow-white/10 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:-translate-y-0.5">
                      Contact Privacy Team
                      <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                    </Link>
                    <Link href="/compliance" className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl border border-white/20 text-white/80 font-semibold text-sm hover:bg-white/[0.06] hover:border-white/30 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                      View Compliance
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
