import { useEffect, useRef, useState } from "react";
import { GraduationCap, Baby, Award, FileText, ArrowRight, Link2, CheckCircle2 } from "lucide-react";

const classesOpen = ["Pre-Nursery", "Nursery", "Kindergarten", "Grades 1–8", "O Levels", "A Levels"];

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function AdmissionsInfoCards() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: cardsRef, visible: cardsVisible } = useReveal();

  const cards = [
    {
      icon: GraduationCap,
      title: "Classes Open",
      color: "#60BADC",
      bg: "rgba(96,186,220,0.1)",
      content: (
        <ul className="mt-4 space-y-2">
          {classesOpen.map((c) => (
            <li key={c} className="flex items-center gap-2.5 text-sm text-slate-600">
              <CheckCircle2 size={14} style={{ color: "#60BADC", flexShrink: 0 }} />
              {c}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: Baby,
      title: "Age Requirement",
      color: "#F5C330",
      bg: "rgba(245,195,48,0.1)",
      content: (
        <div className="mt-4">
          <p className="text-sm text-slate-500 mb-3">Pre-Nursery entry point</p>
          <div className="flex items-end gap-1">
            <span className="text-5xl font-extrabold leading-none" style={{ color: "#0e1e38" }}>3</span>
            <span className="text-lg font-bold text-slate-400 mb-1">Years+</span>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-relaxed">
            Children must be at least 3 years of age to be eligible for Pre-Nursery admission.
          </p>
        </div>
      ),
    },
    {
      icon: Award,
      title: "Scholarships",
      color: "#60BADC",
      bg: "rgba(96,186,220,0.1)",
      content: (
        <div className="mt-4 space-y-3">
          {["O Level Merit Scholarship", "A Level Merit Scholarship", "Need-Based Support"].map((s) => (
            <div key={s} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "rgba(96,186,220,0.06)", border: "1px solid rgba(96,186,220,0.15)" }}>
              <Award size={14} style={{ color: "#60BADC", flexShrink: 0 }} />
              <span className="text-sm text-slate-700 font-medium">{s}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: FileText,
      title: "Online Registration",
      color: "#F5C330",
      bg: "rgba(245,195,48,0.1)",
      featured: true,
      content: (
        <div className="mt-4">
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Complete the registration form to begin your application journey today.
          </p>
          <div className="flex items-center gap-2 rounded-xl px-3 py-2.5 mb-4" style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}>
            <Link2 size={13} className="text-slate-400 shrink-0" />
            <span className="text-xs text-slate-500 truncate font-mono">forms.gle/M9nuKcakF15TbsYQ9</span>
          </div>
          <a
            href="https://forms.gle/M9nuKcakF15TbsYQ9"
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "#F5C330", color: "#0e1e38" }}
          >
            Fill Online Form
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      ),
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, #0b1628 0%, #0e1e38 100%)" }}>

      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: "radial-gradient(circle, #F5C330, transparent 70%)" }} />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div ref={headRef} className="text-center mb-16">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
            style={{
              color: "#60BADC",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease",
            }}
          >
            <span className="h-px w-8 bg-current inline-block" />
            Admission Information
            <span className="h-px w-8 bg-current inline-block" />
          </span>
          <h2
            className="font-extrabold leading-tight text-white"
            style={{
              fontSize: "clamp(2rem, 3.15vw, 3rem)",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            Everything You Need{" "}
            <span style={{ color: "#F5C330" }}>to Apply</span>
          </h2>
          <p
            className="mt-4 text-white/50 max-w-xl mx-auto text-base"
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            All the key information to start your child's admissions journey at ISRA Foundation Schools.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(({ icon: Icon, title, color, bg, featured, content }, i) => (
            <div
              key={title}
              className="relative rounded-2xl p-6 flex flex-col"
              style={{
                background: featured ? "rgba(245,195,48,0.07)" : "rgba(255,255,255,0.05)",
                border: featured ? "1px solid rgba(245,195,48,0.35)" : "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                opacity: cardsVisible ? 1 : 0,
                transform: cardsVisible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.65s ease ${i * 0.12}s, transform 0.65s ease ${i * 0.12}s`,
              }}
            >
              {featured && (
                <div
                  className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full"
                  style={{ background: "rgba(245,195,48,0.2)", color: "#F5C330", border: "1px solid rgba(245,195,48,0.35)" }}
                >
                  Start Here
                </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: bg, border: `1px solid ${color}30` }}>
                <Icon size={24} style={{ color }} />
              </div>
              <h3 className="mt-4 text-white font-bold text-lg">{title}</h3>
              {content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
