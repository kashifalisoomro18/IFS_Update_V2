import { useEffect, useRef, useState } from "react";
import { ArrowRight, Star, Sparkles, Zap } from "lucide-react";

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

const scholarships = [
   {
    label: "O Level Merit Scholarship",
    pct: "100%",
    desc: "For outstanding performance in CAIE O Level examinations.",
    icon: Star,
    color: "#F5C330",
  },
  {
    label: "A Level Merit Scholarship",
    pct: "100%",
    desc: "Rewarding the highest academic achievers at A Level.",
    icon: Zap,
    color: "#60BADC",
  },
];

const STATIC_STARS = [
  { width: 2.1, height: 2.1, top: "12%", left: "15%", opacity: 0.35, duration: 4.2, delay: "0.5s" },
  { width: 1.5, height: 1.5, top: "25%", left: "80%", opacity: 0.25, duration: 5.8, delay: "1.2s" },
  { width: 3.0, height: 3.0, top: "45%", left: "30%", opacity: 0.45, duration: 3.5, delay: "2.1s" },
  { width: 1.8, height: 1.8, top: "60%", left: "70%", opacity: 0.30, duration: 6.2, delay: "0.8s" },
  { width: 2.4, height: 2.4, top: "18%", left: "55%", opacity: 0.40, duration: 4.9, delay: "3.0s" },
  { width: 1.2, height: 1.2, top: "75%", left: "20%", opacity: 0.20, duration: 5.1, delay: "1.7s" },
  { width: 2.8, height: 2.8, top: "85%", left: "88%", opacity: 0.42, duration: 3.8, delay: "2.5s" },
  { width: 1.6, height: 1.6, top: "35%", left: "92%", opacity: 0.28, duration: 6.5, delay: "0.3s" },
  { width: 2.0, height: 2.0, top: "50%", left: "10%", opacity: 0.32, duration: 4.6, delay: "1.9s" },
  { width: 2.5, height: 2.5, top: "90%", left: "45%", opacity: 0.38, duration: 5.4, delay: "3.2s" },
  { width: 1.4, height: 1.4, top: "8%", left: "38%", opacity: 0.22, duration: 4.0, delay: "0.9s" },
  { width: 2.2, height: 2.2, top: "68%", left: "62%", opacity: 0.36, duration: 5.0, delay: "2.8s" },
  { width: 1.9, height: 1.9, top: "40%", left: "50%", opacity: 0.29, duration: 6.0, delay: "1.4s" },
  { width: 2.7, height: 2.7, top: "28%", left: "5%", opacity: 0.44, duration: 3.6, delay: "2.2s" },
  { width: 1.3, height: 1.3, top: "82%", left: "76%", opacity: 0.21, duration: 5.6, delay: "0.6s" },
  { width: 2.6, height: 2.6, top: "55%", left: "95%", opacity: 0.39, duration: 4.4, delay: "3.5s" },
  { width: 1.7, height: 1.7, top: "15%", left: "72%", opacity: 0.27, duration: 6.8, delay: "1.1s" },
  { width: 2.3, height: 2.3, top: "72%", left: "35%", opacity: 0.34, duration: 4.8, delay: "2.0s" },
  { width: 1.5, height: 1.5, top: "95%", left: "18%", opacity: 0.26, duration: 5.3, delay: "0.4s" },
  { width: 2.9, height: 2.9, top: "32%", left: "65%", opacity: 0.46, duration: 3.9, delay: "3.1s" },
];

export default function AdmissionsScholarship() {
  const { ref: leftRef, visible: leftVisible } = useReveal();
  const { ref: rightRef, visible: rightVisible } = useReveal();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section
      id="admissions-scholarships"
      className="scroll-mt-24"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
      }}
    >
      {/* Background image */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <img
          src="/scholarship.jpeg"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(10,20,34,0.92) 0%, rgba(15,30,56,0.88) 50%, rgba(10,20,34,0.92) 100%)",
        }} />
      </div>

      <style>{`
        @keyframes trophyFloat {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          33%      { transform:translateY(-12px) rotate(1deg); }
          66%      { transform:translateY(-6px) rotate(-0.5deg); }
        }
        @keyframes orbitSpin {
          from { transform:rotate(0deg); }
          to   { transform:rotate(360deg); }
        }
        @keyframes orbitSpinRev {
          from { transform:rotate(0deg); }
          to   { transform:rotate(-360deg); }
        }
        @keyframes twinkle {
          0%,100% { opacity:0.1; }
          50%      { opacity:0.6; }
        }

        .schol-glass-panel {
          background: rgba(60, 75, 100, 0.35);
          backdrop-filter: blur(0px) saturate(150%);
          -webkit-backdrop-filter: blur(30px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 0px;
          padding: 48px;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.3),
            inset 0 0 40px rgba(255,255,255,0.03);
        }

        @keyframes goldGlow {
          0%,100% { box-shadow:0 0 30px rgba(245,195,48,0.3), 0 0 60px rgba(245,195,48,0.1); }
          50%      { box-shadow:0 0 60px rgba(245,195,48,0.5), 0 0 100px rgba(245,195,48,0.2); }
        }

        .schol-row {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 22px 16px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          border-radius: 0px;
          border: 1.5px solid transparent;
          transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        .schol-row:last-of-type {
          border-bottom: none;
        }
        .schol-row:hover {
          transform: translateY(-6px) scale(1.02);
        }
        .schol-row.yellow:hover {
          background: rgba(245,195,48,0.1);
          border-color: rgba(245,195,48,0.45);
          box-shadow: 0 20px 60px rgba(245,195,48,0.35), 0 0 0 1.5px rgba(245,195,48,0.5);
          animation: goldGlow 2s ease-in-out infinite;
        }
        .schol-row.blue:hover {
          background: rgba(96,186,220,0.08);
          border-color: rgba(96,186,220,0.4);
          box-shadow: 0 20px 60px rgba(96,186,220,0.3), 0 0 0 1.5px rgba(96,186,220,0.5);
        }

        .schol-pct-badge {
          display: flex; align-items: center; justify-content: center;
          flex-direction: column;
          width: 64px; height: 64px;
          border-radius: 0px;
          font-weight: 900;
          font-size: 1rem;
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .schol-row:hover .schol-pct-badge {
          transform: scale(1.08) rotate(-4deg);
        }

        .schol-cta-btn {
          display: inline-flex; 
          align-items: center; 
          gap: 8px; /* Gap ko 0px se 8px kiya taaki text aur arrow chipke na */
          padding: 16px 36px;
          
          /* Left to Right background fill setup */
          background: linear-gradient(to right, #f5c330 50%, #F5C330 50%);
          background-size: 200% 100%;
          background-position: right bottom;
          
          color: #020816; 
          font-weight: 800; 
          font-size: 1rem;
          border: none;
          border-radius: 0px;
          text-decoration: none; 
          cursor: pointer;
          box-shadow: 0 8px 30px rgba(245,195,48,0.4);
          
          /* Transition properties ko smooth kiya */
          transition: background-position 0.4s ease-out, color 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease;
          position: relative;
        }

        /* Hover Effects */
        .schol-cta-btn:hover {
          background-position: left bottom; /* Background left se right slide hoga */
          color: #020816; /* Dark background par text auto white ho jayega */
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 16px 48px rgba(13, 31, 60, 0.4); /* Shadow ko bhi transition ke mutabik dark kiya */
        }

        /* Arrow SVG icon ka color white karne ke liye jab hover ho */
        .schol-cta-btn:hover svg {
          stroke: #020816 !important;
        }
        @media(max-width:900px) {
          .schol-grid { flex-direction:column !important; gap: 32px !important; }
          .schol-left { flex: 1 1 100% !important; margin-bottom: 24px !important; }
          .schol-glass-panel { padding: 28px 20px !important; }
          .schol-container-padding { padding: 0 16px !important; }
        }
        @media(prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>

      {/* Stars / particles */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        {STATIC_STARS.map((star, i) => (
          <div key={i} style={{
            position:"absolute",
            width: star.width,
            height: star.height,
            borderRadius:"0%",
            background:"white",
            top: star.top,
            left: star.left,
            opacity: star.opacity,
            animation:`twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: star.delay,
          }} />
        ))}
      </div>

      <div className="schol-container-padding" style={{ maxWidth:1400, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>
        <div className="schol-grid" style={{ display:"flex", alignItems:"center", gap:64 }}>

          {/* LEFT: Trophy visual, floating over the image, outside the glass panel */}
          <div
            className="schol-left"
            ref={leftRef}
            style={{
              flex:"0 0 34%",
              display:"flex", justifyContent:"center", alignItems:"center",
              opacity: leftVisible ? 1 : 0,
              transform: leftVisible ? "translateX(0)" : "translateX(-60px)",
              transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <div style={{ position:"relative", width:260, height:260 }}>
              {/* Orbit rings */}
              <div style={{
                position:"absolute", inset:-46,
                border:"1.5px dashed rgba(245,195,48,0.25)",
                borderRadius:"50%",
                animation:"orbitSpin 14s linear infinite",
              }}>
                <div style={{
                  position:"absolute",
                  top:-6, left:"50%", transform:"translateX(-50%)",
                  width:12, height:12, borderRadius:"50%",
                  background:"#F5C330",
                  boxShadow:"0 0 12px rgba(245,195,48,0.7)",
                }} />
              </div>
              <div style={{
                position:"absolute", inset:-74,
                border:"1px dashed rgba(96,186,220,0.18)",
                borderRadius:"50%",
                animation:"orbitSpinRev 20s linear infinite",
              }}>
                <div style={{
                  position:"absolute",
                  top:-5, left:"50%", transform:"translateX(-50%)",
                  width:10, height:10, borderRadius:"50%",
                  background:"#60BADC",
                  boxShadow:"0 0 10px rgba(96,186,220,0.6)",
                }} />
              </div>

              {/* Trophy SVG */}
              <div style={{
                position:"relative", zIndex:2,
                animation:"trophyFloat 5s ease-in-out infinite",
                filter:"drop-shadow(0 0 50px rgba(245,195,48,0.5))",
              }}>
                <svg viewBox="0 0 280 300" style={{ width:260, height:260 }}>
                  <defs>
                    <radialGradient id="tGlow2" cx="50%" cy="35%" r="60%">
                      <stop offset="0%" stopColor="#F5C330" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#F5C330" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="tBody2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F5C330" />
                      <stop offset="50%" stopColor="#ffd54f" />
                      <stop offset="100%" stopColor="#e0a800" />
                    </linearGradient>
                    <linearGradient id="tShine" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                      <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                    </linearGradient>
                  </defs>
                  <circle cx="140" cy="130" r="115" fill="url(#tGlow2)" />
                  <path d="M88 64H192V108C192 142 168 170 140 170C112 170 88 142 88 108V64Z" fill="url(#tBody2)" />
                  <path d="M100 64H140V108C140 132 128 152 115 162C102 148 88 132 88 108V64Z" fill="url(#tShine)" />
                  <path d="M88 78C66 78 54 95 59 112C63 127 78 136 92 133" stroke="#c49c10" strokeWidth="10" fill="none" strokeLinecap="round" />
                  <path d="M192 78C214 78 226 95 221 112C217 127 202 136 188 133" stroke="#c49c10" strokeWidth="10" fill="none" strokeLinecap="round" />
                  <rect x="128" y="170" width="24" height="42" rx="4" fill="#e0a800" />
                  <rect x="120" y="210" width="40" height="14" rx="5" fill="#d4960a" />
                  <rect x="98" y="224" width="84" height="14" rx="5" fill="#c49c10" />
                  <path d="M140 84L147 100L164 101L151 113L155 130L140 121L125 130L129 113L116 101L133 100Z" fill="white" fillOpacity="0.92" />
                  <rect x="84" y="60" width="112" height="10" rx="5" fill="#F5C330" />
                  <rect x="90" y="60" width="100" height="5" rx="3" fill="rgba(255,255,255,0.3)" />
                  <circle cx="60" cy="80" r="5" fill="#F5C330" opacity="0.7">
                    <animate attributeName="cy" values="80;70;80" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="220" cy="95" r="4" fill="#60BADC" opacity="0.6">
                    <animate attributeName="cy" values="95;85;95" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="90" cy="165" r="3.5" fill="#F5C330" opacity="0.5">
                    <animate attributeName="cy" values="165;157;165" dur="2s" repeatCount="indefinite" />
                  </circle>
                </svg>
              </div>
            </div>
          </div>

          {/* RIGHT: Glass content panel */}
          <div className="schol-glass-panel" ref={rightRef} style={{ flex:"1 1 55%", minWidth:0 }}>
            <span style={{
              display:"inline-flex", alignItems:"center", gap:8,
              fontSize:"0.72rem", fontWeight:800,
              color:"#F5C330", letterSpacing:"0.12em", textTransform:"uppercase",
              marginBottom:16,
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateY(0)" : "translateY(20px)",
              transition:"all 0.6s ease",
            }}>
              Scholarships &amp; Grants
            </span>

            <h2 style={{
              fontSize:"clamp(2rem, 3.15vw, 3rem)",
              fontWeight:900, color:"white",
              margin:"0 0 14px", lineHeight:1.15,
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateY(0)" : "translateY(28px)",
              transition:"all 0.7s ease 0.1s",
            }}>
              Merit-Based <span style={{ color:"#F5C330" }}>Scholarships</span>
            </h2>
            <div style={{
              width:72, height:4,
              background:"#F5C330",
              borderRadius:99, marginBottom:22,
              opacity: rightVisible ? 1 : 0,
              transition:"all 0.6s ease 0.2s",
            }} />

            <p style={{
              color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:8,
              fontSize:"0.98rem",
              opacity: rightVisible ? 1 : 0,
              transform: rightVisible ? "translateY(0)" : "translateY(18px)",
              transition:"all 0.7s ease 0.3s",
            }}>
              We believe talent should not be limited by financial constraints.
              Outstanding students at O and A Level are eligible for significant
              merit-based scholarships recognizing academic excellence.
            </p>

            <div style={{ marginTop: 28, marginBottom: 36 }}>
              {scholarships.map(({ label, pct, desc, icon: Icon, color }, i) => {
                const isYellow = color === "#F5C330";
                return (
                  <div
                    key={label}
                    className={`schol-row ${isYellow ? "yellow" : "blue"}`}
                    style={{
                      opacity: rightVisible ? 1 : 0,
                      transform: rightVisible ? "translateX(0)" : "translateX(30px)",
                      transition: `opacity 0.7s ease ${0.4 + i * 0.12}s, transform 0.7s ease ${0.4 + i * 0.12}s`,
                    }}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="schol-pct-badge" style={{
                      background: isYellow ? "rgba(245,195,48,0.15)" : "rgba(96,186,220,0.12)",
                      border: `1.5px solid ${isYellow ? "rgba(245,195,48,0.35)" : "rgba(96,186,220,0.3)"}`,
                      color,
                    }}>
                      <span style={{ fontSize:"1rem", fontWeight:900, lineHeight:1 }}>
                        {pct === "Special" ? "★" : pct}
                      </span>
                      {pct !== "Special" && (
                        <span style={{ fontSize:"0.55rem", fontWeight:700, opacity:0.7, marginTop:2 }}>off</span>
                      )}
                    </div>

                    <div style={{
                      width:36, height:36, borderRadius:10, flexShrink:0,
                      background: isYellow ? "rgba(245,195,48,0.1)" : "rgba(96,186,220,0.1)",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <Icon size={18} style={{ color }} />
                    </div>

                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontWeight:800, color:"white", fontSize:"0.92rem", marginBottom:4 }}>{label}</p>
                      <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.78rem", lineHeight:1.5, margin:0 }}>{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
             href="/IFS-Cambridge Scholarship-Criteria.pdf"
              target="_blank"
              rel="noreferrer"
              className="schol-cta-btn"
            >
              Apply for Scholarship
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}