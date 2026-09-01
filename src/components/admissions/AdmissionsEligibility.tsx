import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Baby, GraduationCap, BookOpen, Blocks, Library, Globe2 } from "lucide-react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

const classLevels = [
  { label: "Pre-Nursery", age: "3+", icon: Baby, color: "#60BADC" },
  { label: "Nursery", age: "4+", icon: Blocks, color: "#F5C330" },
  { label: "Kindergarten", age: "5+", icon: BookOpen, color: "#60BADC" },
   { label: "Grades 1-7", age: "6-14", icon: Library, color: "#F5C330" },
  { label: "O Levels", age: "14-16", icon: GraduationCap, color: "#60BADC" },
  { label: "A Levels", age: "16-18", icon: Globe2, color: "#F5C330" },
];

export default function AdmissionsEligibility() {
  const { ref: leftRef, visible: leftVisible } = useReveal();
  const { ref: rightRef, visible: rightVisible } = useReveal();
  const [checkedItems, setCheckedItems] = useState<boolean[]>([]);

  // Stagger check animations on reveal
  useEffect(() => {
    if (rightVisible) {
      classLevels.forEach((_, i) => {
        setTimeout(() => {
          setCheckedItems(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 300 + i * 150);
      });
    }
  }, [rightVisible]);

  return (
    <section
      id="admissions-eligibility"
      className="scroll-mt-24"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <style>{`
        .elig-glass-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(255,255,255,0.9);
          border-radius: 0px;
          box-shadow:
            0 8px 40px rgba(13,31,60,0.1),
            0 1px 0 rgba(255,255,255,0.8) inset;
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        .elig-glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: #F5C330;
          background-size: 200% 100%;
          animation: gradShift 3s ease infinite;
          border-radius: 0px 0px 0px 0px;
        }
        @keyframes gradShift {
          0%,100% { background-position:0% 50%; }
          50%      { background-position:100% 50%; }
        }

        .elig-level-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-radius: 0px;
          transition: all 0.3s ease;
          cursor: default;
          border: 1.5px solid transparent;
        }
        .elig-level-item:hover {
          background: rgba(245,195,48,0.06);
          border-color: rgba(245,195,48,0.2);
          transform: translateX(6px);
        }

        .elig-check-icon {
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .elig-check-icon.checked {
          transform: scale(1) rotate(0deg);
          opacity: 1;
        }
        .elig-check-icon.unchecked {
          transform: scale(0) rotate(-90deg);
          opacity: 0;
        }

        .elig-age-badge {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: linear-gradient(135deg, #020618, #1a3560);
          box-shadow: 
            0 0 0 20px rgba(96,186,220,0.08),
            0 0 0 40px rgba(96,186,220,0.04),
            0 20px 60px rgba(13,31,60,0.3);
          animation: eligFloat 5s ease-in-out infinite;
        }
        @keyframes eligFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-12px); }
        }
        .elig-orbit {
          position: absolute; inset:-40px;
          border: 1.5px dashed rgba(245,195,48,0.3);
          border-radius: 50%;
          animation: eligOrbit 12s linear infinite;
        }
        .elig-orbit2 {
          position: absolute; inset:-70px;
          border: 1px dashed rgba(96,186,220,0.2);
          border-radius: 50%;
          animation: eligOrbit 18s linear infinite reverse;
        }
        @keyframes eligOrbit {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        .elig-orbit-dot {
          position: absolute;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: #F5C330;
          top: -5px; left: 50%; transform: translateX(-50%);
          box-shadow: 0 0 10px rgba(245,195,48,0.6);
        }
        .elig-orbit-dot2 {
          position: absolute;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #60BADC;
          top: -4px; left: 50%; transform: translateX(-50%);
          box-shadow: 0 0 8px rgba(96,186,220,0.6);
        }

        @media(max-width:768px) {
          .elig-grid { flex-direction:column !important; gap: 32px !important; }
          .elig-left { flex: 1 1 100% !important; margin-bottom: 24px !important; }
          .elig-container-padding { padding: 0 16px !important; }
          .elig-glass-card { padding: 24px 20px !important; }
          .elig-age-badge { width: 220px !important; height: 220px !important; }
          .elig-orbit { inset: -20px !important; }
          .elig-orbit2 { inset: -36px !important; }
        }
        @media(prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>

      {/* Background blobs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{
          position:"absolute", top:"10%", right:"5%",
          width:350, height:350, borderRadius:"0%",
          background:"radial-gradient(circle, rgba(96,186,220,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position:"absolute", bottom:"5%", left:"10%",
          width:300, height:300, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(245,195,48,0.07) 0%, transparent 70%)",
        }} />
      </div>

      <div className="elig-container-padding" style={{ maxWidth:1400, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>

        {/* Section header */}
          <div style={{ textAlign:"center", marginBottom:72 }}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#020618]" />
              <span style={{
              display: "inline-block",
              color: "#020618",
              fontSize: "12px",
              fontWeight: 800,
              padding: "2px 14px",
              borderRadius: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "6px",
              fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}> Who Can Apply</span>
          <span className="w-8 h-px bg-[#020618]" />
          </div>
          <h2 style={{
            fontSize:"clamp(2rem, 3.15vw, 3rem)",
            fontWeight:900,
            color:"#020618",
            margin:"0 0 14px",
            lineHeight:1.15,
          }}>
            Eligibility & <span style={{ color:"#60BADC" }}>Programs</span>
          </h2>
          <div style={{ width:72, height:4, background:"#F5C330", margin:"0 auto 18px" }} />
          <p style={{ color:"#020618A6", fontSize:"1rem", maxWidth:520, margin:"0 auto", lineHeight:1.7 }}>
            We welcome students from Pre-Nursery to A Levels with a nurturing, inclusive environment for all learners.
          </p>
        </div>

        {/* Split layout */}
        <div
          className="elig-grid"
          style={{
            display:"flex",
            alignItems:"center",
            gap:60,
          }}
        >
          {/* LEFT: Illustration */}
          <div
            className="elig-left"
            ref={leftRef}
            style={{
              flex:"0 0 40%",
              display:"flex",
              flexDirection:"column",
              alignItems:"center",
              gap:32,
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-50px)",
              transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            {/* Big age badge */}
            <div style={{ position:"relative" }}>
              <div className="elig-age-badge">
                <div className="elig-orbit">
                  <div className="elig-orbit-dot" />
                </div>
                <div className="elig-orbit2">
                  <div className="elig-orbit-dot2" />
                </div>
                <span style={{ fontSize:"0.75rem", color:"#ffffff", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>
                  Pre-Nursery starts at
                </span>
                <div style={{ display:"flex", alignItems:"flex-end", gap:4 }}>
                  <span style={{ fontSize:"5rem", fontWeight:900, color:"#F5C330", lineHeight:1 }}>3</span>
                  <span style={{ fontSize:"1.8rem", fontWeight:700, color:"#ffffff", marginBottom:12 }}>Yrs+</span>
                </div>
                <div style={{ width:48, height:2, background:"#F5C330", margin:"10px 0" }} />
                <span style={{ fontSize:"0.8rem", color:"#ffffff", fontWeight:600 }}>
                  Minimum Age Requirement
                </span>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display:"flex", gap:20, marginTop: 48 }}>
              {[
                { val:"6", label:"Programs" },
                { val:"3-18", label:"Age Range" },
                { val:"100%", label:"Inclusive" },
              ].map(({ val, label }) => (
                <div key={label} style={{
                  flex:1, textAlign:"center",
                  background:"white",
                  borderRadius:0, padding:"20px 20px",
                  boxShadow:"0 4px 18px rgba(13,31,60,0.08)",
                  border:"1px solid #eef1f5",
                }}>
                  <div style={{ fontSize:"1.5rem", fontWeight:900, color:"#F5C330" }}>{val}</div>
                  <div style={{ fontSize:"0.7rem", color:"#64748b", fontWeight:700, marginTop:4, textTransform:"uppercase", letterSpacing:"0.06em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Glass card with classes */}
          <div
            ref={rightRef}
            style={{
              flex:"1 1 55%",
              minWidth:0,
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateX(0)" : "translateX(50px)",
              transition:"all 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s",
            }}
          >
            <div className="elig-glass-card">
              {/* Card header */}
              <div style={{ marginBottom:28 }}>
                <span style={{
                  fontSize:"0.7rem", fontWeight:800, color:"#60BADC",
                  letterSpacing:"0.12em", textTransform:"uppercase",
                }}>
                  Admissions Open For
                </span>
                <h3 style={{
                  fontSize:"1.6rem", fontWeight:900, color:"#0d1f3c",
                  margin:"8px 0 0",
                }}>
                  All Programs
                </h3>
              </div>

              {/* Classes list */}
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                {classLevels.map(({ label, age, icon: Icon, color }, i) => (
                  <div key={label} className="elig-level-item">
                    {/* Animated check */}
                   {/* <div
                      className={`elig-check-icon ${checkedItems[i] ? "checked" : "unchecked"}`}
                    >
                      <CheckCircle2
                        size={22}
                        fill={color}
                        style={{ color:"white" }}
                      />
                    </div> */}

                    {/* Icon */}
                    <div style={{
                      width:40, height:40, borderRadius:0,
                      background:`${color}15`,
                      border:`1.5px solid ${color}30`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      flexShrink:0,
                    }}>
                      <Icon size={18} style={{ color }} />
                    </div>

                    {/* Label */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:"0.95rem", fontWeight:700, color:"#0d1f3c" }}>{label}</div>
                    </div>

                    {/* Age chip */}
                    <div style={{
                      padding:"4px 12px",
                      background:`${color}15`,
                      border:`1px solid ${color}30`,
                      borderRadius:0,
                      fontSize:"0.72rem", fontWeight:800,
                      color,
                      whiteSpace:"nowrap",
                    }}>
                      Age {age}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom note */}
              <div style={{
                marginTop:24, padding:"16px 20px",
                background:"rgba(245,195,48,0.08)",
                border:"1px solid rgba(245,195,48,0.2)",
                borderRadius:0,
                display:"flex", alignItems:"center", gap:12,
              }}>
                <Baby size={20} style={{ color:"#c49c10", flexShrink:0 }} />
                <p style={{ fontSize:"0.82rem", color:"#64748b", margin:0, lineHeight:1.5 }}>
                  <strong style={{ color:"#0d1f3c" }}>Age Requirement:</strong> Children must be at least{" "}
                  <strong style={{ color:"#c49c10" }}>3 years</strong> of age to be eligible for Pre-Nursery admission.
                </p>
              </div>

              {/* CTA */}
              {/* <a
                href="https://forms.gle/M9nuKcakF15TbsYQ9"
                target="_blank"
                rel="noreferrer"
                style={{
                  display:"flex", alignItems:"center", justifyContent:"center", gap:10,
                  marginTop:24, padding:"16px",
                  background:"#F5C330",
                  color:"#0d1f3c", fontWeight:800, fontSize:"0.95rem",
                  borderRadius:0, textDecoration:"none",
                  boxShadow:"0 8px 24px rgba(245,195,48,0.35)",
                  transition:"transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 16px 36px rgba(245,195,48,0.5)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 24px rgba(245,195,48,0.35)";
                }}
              >
                Apply Now – It's Free 
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
