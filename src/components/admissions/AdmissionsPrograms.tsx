import { useEffect, useRef, useState } from "react";
import { Baby, Blocks, BookOpen, GraduationCap, Globe2, Library, LucideIcon, ArrowRight } from "lucide-react";

interface Program {
  title: string;
  description: string;
  icon: LucideIcon;
  age: string;
  color: string;
  bg: string;
}

const programs: Program[] = [
  { title: "Pre-Nursery", description: "Play-based learning that nurtures curiosity and creativity from the very start.", icon: Baby, age: "Age 3+", color: "#0ea5e9", bg: "#f0f9ff" },
  { title: "Nursery", description: "Foundational skills through guided discovery, storytelling and joyful play.", icon: Blocks, age: "Age 3+", color: "#F5C330", bg: "#fefce8" },
  { title: "Kindergarten", description: "Building confidence in early literacy, numeracy and social skills.", icon: BookOpen, age: "Age 4+", color: "#0ea5e9", bg: "#f0f9ff" },
  { title: "Grades 1–8", description: "A balanced, holistic curriculum for well-rounded academic and personal growth.", icon: Library, age: "Primary to Middle", color: "#F5C330", bg: "#fefce8" },
  { title: "O Levels", description: "Rigorous Cambridge (CAIE) curriculum designed for secondary school success.", icon: GraduationCap, age: "Cambridge System", color: "#0ea5e9", bg: "#f0f9ff" },
  { title: "A Levels", description: "Advanced study and research skills preparing students for top universities worldwide.", icon: Globe2, age: "Cambridge System", color: "#F5C330", bg: "#fefce8" },
];

function useReveal(threshold = 0.15) {
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

export default function AdmissionsPrograms() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: gridRef, visible: gridVisible } = useReveal();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20 bg-slate-50">

      


      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-16 xl:px-24">
        {/* Header Section */}
        <div ref={headRef} className="mb-20 text-center max-w-3xl mx-auto">
          <span
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] mb-4 text-sky-600"
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.6s ease 0s",
            }}
          >
            <span className="h-px w-8 bg-current inline-block" />
            Curriculum Structure
            <span className="h-px w-8 bg-current inline-block" />
          </span>
          <h2
            className="font-extrabold text-slate-900 leading-tight mb-6"
            style={{
              fontSize: "clamp(2.5rem, 3.6vw, 3.5rem)",
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(30px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            Programs <span className="text-amber-500">Offered</span>
          </h2>
          <p
            className="text-slate-600 text-lg leading-relaxed"
            style={{
              opacity: headVisible ? 1 : 0,
              transform: headVisible ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.7s ease 0.25s",
            }}
          >
            We offer world-class education from early childhood to advanced levels,
            with a focus on excellence and holistic growth at every stage of learning.
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map(({ title, description, icon: Icon, age, color, bg }, i) => (
            <div
              key={title}
              className="group relative bg-white rounded-3xl p-8 cursor-pointer overflow-hidden transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl border border-slate-100"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? "translateY(0)" : "translateY(40px)",
                transition: `opacity 0.65s ease ${i * 0.1}s, transform 0.65s ease ${i * 0.1}s, box-shadow 0.5s ease`,
              }}
            >
              {/* Top Accent Line */}
              <div 
                className="absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 scale-x-0 group-hover:scale-x-100 origin-left"
                style={{ background: color }}
              />

              {/* Icon Container */}
              <div
                className="flex items-center justify-center rounded-2xl mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm"
                style={{ width: 64, height: 64, background: bg }}
              >
                <Icon size={32} style={{ color }} />
              </div>

              {/* Content */}
              <span
                className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-md mb-4"
                style={{ background: bg, color }}
              >
                {age}
              </span>

              <h3 className="font-extrabold text-slate-900 text-xl mb-3">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-8">{description}</p>

              {/* Arrow link bottom */}
              <div
                className="flex items-center gap-2 text-sm font-bold transition-all duration-300"
                style={{ color }}
              >
                Learn More 
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
