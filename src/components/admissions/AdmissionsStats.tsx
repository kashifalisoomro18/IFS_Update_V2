import { useEffect, useRef, useState } from "react";
import { CalendarClock, GraduationCap, HeartHandshake, Users, LucideIcon } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

const stats: Stat[] = [
  { value: 9, suffix: "+", label: "Years of Excellence", icon: CalendarClock, desc: "Serving Hyderabad since 2016" },
  { value: 40, suffix: "+", label: "Expert Teachers", icon: GraduationCap, desc: "Cambridge-qualified educators" },
  { value: 70, suffix: "+", label: "Support Staff", icon: HeartHandshake, desc: "Dedicated to student wellbeing" },
  { value: 4,  label: "House Systems", icon: Users, desc: "Co-curricular excellence" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(ease * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" style={{ fontWeight: 900 }}>
      <span style={{ color: "#ffffff" }}>{display}</span>
      <span style={{ color: "#F5C330" }}>{suffix}</span>
    </span>
  );
}

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

export default function AdmissionsStats() {
  const { ref: gridRef, visible: gridVisible } = useReveal();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="stats-section relative py-16 sm:py-20 px-6 lg:px-12 overflow-hidden my-10">
      <div className="absolute inset-0">
        <img
          src="/Academic Achievement.jpeg"
          alt="Academic Achievement"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0d1f3c]/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1f3c]/40 via-transparent to-[#0d1f3c]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-4"
          style={{ position: "relative" }}
        >
          {stats.map(({ value, suffix, label, icon: Icon }, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={label}
                className="stat-item border-b sm:border-b-0 sm:border-l border-white/20 last:border-b-0 sm:first:border-l-0 py-6 px-4 sm:px-6"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  textAlign: "center",
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible
                    ? isHovered
                      ? "translateY(-6px)"
                      : "translateY(0)"
                    : "translateY(20px)",
                  transition: `opacity 0.5s ease ${i * 0.1}s, transform 0.3s ease`,
                  cursor: "pointer",
                }}
              >
                <Icon
                  size={36}
                  strokeWidth={1.5}
                  style={{
                    color: isHovered ? "#F5C330" : "#ffffff",
                    margin: "0 auto 20px",
                    display: "block",
                    transition: "color 0.3s ease, transform 0.3s ease",
                    transform: isHovered ? "scale(1.12)" : "scale(1)",
                  }}
                />
                <div
                  className="stat-number"
                  style={{
                    fontSize: "2.6rem",
                    lineHeight: 1,
                    transition: "transform 0.3s ease",
                    transform: isHovered ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <Counter value={value} suffix={suffix} />
                </div>
                <div
                  className="stat-label"
                  style={{
                    marginTop: 14,
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isHovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.75)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}