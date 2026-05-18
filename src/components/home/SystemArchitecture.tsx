"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, BarChart3, Users, Apple, Shield, ArrowLeft, Activity, Heart, TrendingDown, Sparkles } from "lucide-react";
import Link from "next/link";

/**
 * System Architecture Visualization
 * Animated enterprise-grade flow showing the complete Velara Care ecosystem.
 */

type FlowNode = {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  x: number;
  y: number;
  phase: number;
};

const systemNodes: FlowNode[] = [
  { id: "employee", icon: Users, title: "الموظف", subtitle: "يبدأ رحلة الصحة", x: 5, y: 50, phase: 1 },
  { id: "hra", icon: Activity, title: "تقييم HRA", subtitle: "تحليل صحي ذكي", x: 20, y: 30, phase: 1 },
  { id: "ai-engine", icon: Brain, title: "محرك AI التنبؤي", subtitle: "معالجة وتصنيف", x: 20, y: 70, phase: 2 },
  { id: "risk-scoring", icon: BarChart3, title: "تصنيف المخاطر", subtitle: "منخفض / متوسط / مرتفع", x: 38, y: 30, phase: 2 },
  { id: "recommendations", icon: Sparkles, title: "التوصيات الذكية", subtitle: "خطط مخصصة", x: 38, y: 70, phase: 3 },
  { id: "meals", icon: Apple, title: "الوجبات الصحية", subtitle: "نظام توصيات متكامل", x: 55, y: 20, phase: 3 },
  { id: "consultations", icon: Heart, title: "الاستشارات", subtitle: "تغذية ولياقة وصحة", x: 55, y: 50, phase: 3 },
  { id: "tracking", icon: Activity, title: "متابعة التقدم", subtitle: "قياس مستمر", x: 55, y: 80, phase: 4 },
  { id: "dashboard", icon: BarChart3, title: "لوحة القيادة", subtitle: "مؤشرات الأداء", x: 72, y: 30, phase: 4 },
  { id: "insights", icon: TrendingDown, title: "التحليلات", subtitle: "ROI وتقارير", x: 72, y: 70, phase: 5 },
  { id: "savings", icon: Shield, title: "توفير التكاليف", subtitle: "نتائج مالية قابلة للقياس", x: 88, y: 50, phase: 5 },
];

const connections = [
  [0, 1], [0, 2],
  [1, 3], [2, 3], [2, 4],
  [3, 5], [3, 6], [4, 6], [4, 7],
  [5, 8], [6, 8], [7, 8],
  [8, 9], [8, 10], [9, 10],
];

const phaseLabels = [
  { phase: 1, label: "1. جمع البيانات", x: 12, desc: "الدخول والتقييم" },
  { phase: 2, label: "2. المعالجة والتحليل", x: 30, desc: "AI — تصنيف المخاطر" },
  { phase: 3, label: "3. التوصيات المخصصة", x: 48, desc: "خطط صحية ذكية" },
  { phase: 4, label: "4. المتابعة والقياس", x: 65, desc: "تقارير وتحليلات" },
  { phase: 5, label: "5. النتائج المالية", x: 82, desc: "ROI وتوفير التكاليف" },
];

export default function SystemArchitecture() {
  const [activePhase, setActivePhase] = useState(0);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          intervalRef.current = setInterval(() => {
            setActivePhase((prev) => (prev >= 5 ? 1 : prev + 1));
          }, 3500);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isNodeVisible = (node: FlowNode) => activePhase === 0 || node.phase <= activePhase;
  const isConnectionActive = (fromIdx: number, toIdx: number) => {
    const from = systemNodes[fromIdx];
    const to = systemNodes[toIdx];
    return activePhase === 0 || (from.phase <= activePhase && to.phase <= activePhase);
  };

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" dir="rtl" style={{ background: 'var(--vp-gradient-card)' }}>
      <div className="absolute inset-0 vp-grid-bg opacity-20" />
      <div className="container-shade relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-12" data-vp-animate="fade-up">
          <span className="vp-label">النظام البيئي</span>
          <h2 className="vp-section-title mt-4">
            منصة ذكاء صحي مؤسسي{' '}
            <span className="vp-hero-em">متكاملة</span>
          </h2>
          <div className="w-16 h-1 rounded-full bg-gradient-to-l from-[var(--vp-accent)] to-[var(--vp-cyan)] mx-auto mt-4" />
          <p className="vp-subtitle mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
            رحلة متكاملة تبدأ من تقييم الموظف الصحي وصولاً إلى توفير التكاليف التأمينية —
            مدعومة بالذكاء الاصطناعي في كل خطوة.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10" data-vp-animate="fade-up" data-vp-delay="2">
          <button
            onClick={() => setActivePhase(0)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
              activePhase === 0
                ? "bg-[var(--vp-accent)] text-white shadow-lg shadow-[var(--vp-accent)]/20"
                : "bg-[var(--vp-glow-soft)] text-[var(--text-secondary)] hover:bg-[var(--vp-glow-medium)]"
            }`}
          >
            عرض كامل
          </button>
          {phaseLabels.map((p) => (
            <button
              key={p.phase}
              onClick={() => setActivePhase(p.phase)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                activePhase === p.phase
                  ? "bg-[var(--vp-accent)] text-white shadow-lg shadow-[var(--vp-accent)]/20"
                  : "bg-[var(--vp-glow-soft)] text-[var(--text-secondary)] hover:bg-[var(--vp-glow-medium)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="relative w-full" style={{ height: 'clamp(400px, 50vw, 600px)' }} data-vp-animate="fade-up" data-vp-delay="3">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2B9F7A" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#2B9F7A" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="flowGradActive" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2B9F7A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#2B9F7A" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {connections.map(([from, to], idx) => {
              const f = systemNodes[from];
              const t = systemNodes[to];
              const isActive = isConnectionActive(from, to);
              return (
                <line
                  key={idx}
                  x1={f.x}
                  y1={f.y}
                  x2={t.x}
                  y2={t.y}
                  stroke={isActive ? "url(#flowGradActive)" : "url(#flowGrad)"}
                  strokeWidth={isActive ? "0.8" : "0.4"}
                  strokeDasharray={isActive ? "none" : "3,3"}
                  className="transition-all duration-700"
                />
              );
            })}
          </svg>

          {systemNodes.map((node, idx) => {
            const visible = isNodeVisible(node);
            const isHovered = hoveredNode === node.id;
            return (
              <div
                key={node.id}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.3})`,
                  opacity: visible ? 1 : 0,
                  zIndex: isHovered ? 10 : 1,
                  transitionDelay: `${idx * 80}ms`,
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div
                  className={`
                    flex flex-col items-center justify-center
                    rounded-2xl transition-all duration-300
                    ${isHovered
                      ? "bg-[var(--vp-accent)] text-white shadow-2xl shadow-[var(--vp-accent)]/30 scale-110"
                      : "bg-[var(--bg-card)] text-[var(--text-primary)] depth-3 hover:depth-4"
                    }
                    ${node.phase <= activePhase || activePhase === 0 ? "border-2 border-[var(--vp-accent)]/20" : "border border-[var(--border-primary)]"}
                  `}
                  style={{
                    width: 'clamp(72px, 10vw, 120px)',
                    height: 'clamp(72px, 10vw, 120px)',
                    padding: 'clamp(4px, 0.6vw, 12px)',
                  }}
                >
                  <node.icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" style={{ opacity: visible ? 1 : 0 }} />
                  <span className="text-[8px] sm:text-[10px] font-semibold leading-tight text-center" style={{ opacity: visible ? 1 : 0 }}>
                    {node.title}
                  </span>
                  <span className="text-[6px] sm:text-[8px] opacity-60 leading-tight text-center hidden sm:block" style={{ opacity: visible ? 1 : 0 }}>
                    {node.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center" data-vp-animate="fade-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-[var(--vp-glow-soft)] border border-[var(--vp-accent)]/10">
            <span className="text-sm font-semibold text-[var(--vp-accent)]">
              {activePhase === 0
                ? "🌐 النظام البيئي المتكامل — جميع المراحل تعمل معاً"
                : phaseLabels.find((p) => p.phase === activePhase)?.desc || ""}
            </span>
          </div>
        </div>

        <div className="mt-10 text-center" data-vp-animate="fade-up" data-vp-delay="4">
          <Link href="/product" className="btn-premium group">
            اكتشف المنصة بالكامل
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
