import { useEffect, useRef, useState } from "react";
import { Building2, Users, ShieldCheck, Layers, MonitorSmartphone, Sprout, LucideIcon, CheckCircle2 } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  { title: "Modern Facilities", description: "Well-equipped labs, libraries, and sports infrastructure for hands-on learning.", icon: Building2 },
  { title: "Expert Faculty", description: "Qualified, passionate teachers dedicated to nurturing every student's potential.", icon: Users },
  { title: "Safe Campus", description: "A secure, nurturing environment with 24/7 CCTV and perimeter security.", icon: ShieldCheck },
  { title: "Holistic Curriculum", description: "Academics balanced with life skills, creativity, and Islamic values.", icon: Layers },
  { title: "Smart Classrooms", description: "Technology-enabled, interactive learning spaces built for deep engagement.", icon: MonitorSmartphone },
  { title: "Student Development", description: "Clubs, STEM fairs, and mentorship programs that grow character and confidence.", icon: Sprout },
];

const highlights = ["Cambridge CAIE Affiliated", "Finland HEI Curriculum", "Isra University Partner", "Merit Scholarships", "Transport Facility", "Cafeteria & Sports"];

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

export default function AdmissionsWhyChoose() {
  const { ref: leftRef, visible: leftVisible } = useReveal();
  const { ref: rightRef, visible: rightVisible } = useReveal();

  return (
    <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: "#f8fafc" }}>


      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* LEFT: Image panel */}
          <div
            ref={leftRef}
            className="relative"
            style={{
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-60px)",
              transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
            }}
          >
            {/* Main image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="assets/images/admissions-hero-full.jpg"
                alt="ISRA Foundation campus"
                className="w-full object-cover"
                style={{ height: "clamp(320px, 50vw, 520px)" }}
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,16,40,0.4), transparent 60%)" }} />
            </div>

            {/* Floating badge — bottom left */}
            <div
              className="absolute bottom-2 left-2 sm:-bottom-6 sm:-left-6 rounded-2xl px-4 py-3 sm:px-6 sm:py-5 shadow-2xl"
              style={{ background: "#0e1e38", border: "1px solid rgba(96,186,220,0.3)" }}
            >
              <p className="text-xs text-white/50 font-semibold uppercase tracking-wider">Established</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">2016</p>
              <p className="text-[10px] sm:text-xs text-[#60BADC] font-semibold mt-0.5">Years of Excellence</p>
            </div>

            {/* Floating badge — top right */}
            <div
              className="absolute top-2 right-2 sm:-top-5 sm:-right-5 rounded-2xl px-4 py-3 sm:px-5 sm:py-4 shadow-xl"
              style={{ background: "#F5C330" }}
            >
              <p className="text-[10px] sm:text-xs font-bold text-[#0e1e38] uppercase tracking-wider">Students</p>
              <p className="text-xl sm:text-2xl font-extrabold text-[#0e1e38]">15,000+</p>
            </div>


          </div>

          {/* RIGHT: Content */}
          <div ref={rightRef}>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-5"
              style={{
                color: "#60BADC",
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.6s ease 0s",
              }}
            >
              <span className="h-px w-8 bg-current inline-block" />
              Our Difference
            </span>

            <h2
              className="font-extrabold leading-tight mb-6"
              style={{
                fontSize: "clamp(2rem, 3.15vw, 3rem)",
                color: "#0e1e38",
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.7s ease 0.1s",
              }}
            >
              Why Choose{" "}
              <span style={{ color: "#60BADC" }}>ISRA</span>{" "}
              <span style={{ color: "#F5C330" }}>Foundation?</span>
            </h2>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {features.map(({ title, description, icon: Icon }, i) => (
                <div
                  key={title}
                  className="group flex gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.8)",
                    border: "1px solid rgba(96,186,220,0.15)",
                    opacity: rightVisible ? 1 : 0,
                    transform: rightVisible ? "translateY(0)" : "translateY(25px)",
                    transition: `all 0.6s ease ${0.2 + i * 0.08}s`,
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(96,186,220,0.45)";
                    el.style.boxShadow = "0 8px 24px rgba(96,186,220,0.15)";
                    el.style.transform = "translateY(-6px)";
                    el.style.transition = "all 0.25s ease-out";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.borderColor = "rgba(96,186,220,0.15)";
                    el.style.boxShadow = "none";
                    el.style.transform = "translateY(0)";
                    el.style.transition = "all 0.25s ease-out";
                  }}
                >
                  <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,186,220,0.12)" }}>
                    <Icon size={20} style={{ color: "#60BADC" }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0e1e38] mb-0.5">{title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Highlights pills */}
            <div
              className="flex flex-wrap gap-2"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.7s ease 0.75s",
              }}
            >
              {highlights.map((h) => (
                <span
                  key={h}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(245,195,48,0.12)", color: "#b38a00", border: "1px solid rgba(245,195,48,0.3)" }}
                >
                  <CheckCircle2 size={11} />
                  {h}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
