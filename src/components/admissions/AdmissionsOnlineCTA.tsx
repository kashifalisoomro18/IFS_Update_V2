import { useEffect, useRef, useState } from "react";
import { ArrowRight, Lock, ExternalLink } from "lucide-react";

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

export default function AdmissionsOnlineCTA() {
  const { ref, visible } = useReveal();
  const [arrowHovered, setArrowHovered] = useState(false);

  return (
    <section
      id="admissions-registration"
      className="scroll-mt-24 octa-section-padding"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 24px",
        background: "#ffffff",
      }}
    >
      <style>{`
        @keyframes arrowBounceRight {
          0%,100% { transform:translateX(0); }
          50%      { transform:translateX(8px); }
        }
        @keyframes ringExpand {
          0%   { transform:scale(0.9); opacity:0.6; }
          100% { transform:scale(1.6); opacity:0; }
        }
        @keyframes floatUp {
          0%,100% { transform:translateY(0); }
          50%      { transform:translateY(-8px); }
        }

        .octa-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 20px 48px;
          background: linear-gradient(135deg, #F5C330 0%, #f0b800 100%);
          color: #0d1f3c;
          font-weight: 700; font-size: 1.1rem;
          text-decoration: none; cursor: pointer;
          box-shadow: 0 12px 40px rgba(245,195,48,0.45);
          transition: transform 0.28s ease, box-shadow 0.28s ease;
        }
        .octa-btn:hover {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 0 24px 60px rgba(245,195,48,0.6);
        }
        .octa-btn:active {
          transform: translateY(-1px) scale(1.02);
        }

        /* Ripple on click */
        .octa-btn-ripple {
          position: absolute;
          width: 100%; height: 100%;
          top: 0; left: 0;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
          transform: scale(0); opacity: 0;
          transition: transform 0.5s ease, opacity 0.5s ease;
          pointer-events: none;
        }
        .octa-btn:active .octa-btn-ripple {
          transform: scale(2); opacity: 1;
        }

        /* Pulse ring */
        .octa-pulse-ring {
          position: absolute; inset: -4px;
          border: 2px solid rgba(245,195,48,0.6);
          animation: ringExpand 2s ease-out infinite;
        }
        .octa-pulse-ring:nth-child(2) { animation-delay: 0.6s; }
        .octa-pulse-ring:nth-child(3) { animation-delay: 1.2s; }

        .octa-secure-note {
          display: flex; align-items: center; gap: 8px;
          justify-content: center;
          margin-top: 30px;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        .octa-secure-note:hover { opacity: 1; }

        @media(max-width: 640px) {
          .octa-btn { padding: 16px 24px !important; font-size: 1rem !important; width: 100% !important; justify-content: center !important; }
          .octa-section-padding { padding: 60px 16px !important; }
        }
        @media(prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Big background accent */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{
          position:"absolute",
          top:"50%", left:"50%",
          transform:"translate(-50%,-50%)",
          width:700, height:700, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(245,195,48,0.07) 0%, transparent 65%)",
        }} />
        <div style={{
          position:"absolute", top:"20%", left:"5%",
          width:200, height:200, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(96,186,220,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position:"absolute", bottom:"15%", right:"8%",
          width:250, height:250, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(96,186,220,0.07) 0%, transparent 70%)",
        }} />

        {/* Decorative geometric lines */}
        <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", opacity:0.08 }} viewBox="0 0 1400 600" preserveAspectRatio="none">
          <line x1="0" y1="300" x2="1400" y2="300" stroke="#F5C330" strokeWidth="1" strokeDasharray="6 18" />
          <line x1="700" y1="0" x2="700" y2="600" stroke="#60BADC" strokeWidth="1" strokeDasharray="6 18" />
          <circle cx="700" cy="300" r="200" fill="none" stroke="#F5C330" strokeWidth="1" strokeDasharray="8 16" />
          <circle cx="700" cy="300" r="100" fill="none" stroke="#60BADC" strokeWidth="1" strokeDasharray="4 12" />
        </svg>
      </div>

      <div
        ref={ref}
        style={{
          maxWidth:800,
          margin:"0 auto",
          textAlign:"center",
          position:"relative", zIndex:1,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(40px) scale(0.97)",
          transition:"all 0.85s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Badge */}
        <div className="flex items-center justify-center gap-3 mb-4 my-20">
        <span className="w-8 h-px bg-[#020618]" />

        <span
          style={{
            display: "inline-block",
            color: "#020816",
            fontSize: "12px",
            fontWeight: 800,
            padding: "2px 14px",
            borderRadius: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "6px",
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        >
          START YOUR APPLICATION
        </span>
        

        <span className="w-8 h-px bg-[#020618]" />
      </div>

        {/* Heading */}
        <h2 style={{
          fontSize:"clamp(2.2rem, 4.5vw, 4rem)",
          fontWeight:900,
          color:"#0d1f3c",
          lineHeight:1.1,
          letterSpacing:"-1px",
          marginBottom:18,
        }}>
          Ready to Join{" "}
          <span style={{
            background:"linear-gradient(135deg,#F5C330,#f0b800)",
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
          }}>
            Our School?
          </span>
        </h2>

        <p style={{
          fontSize:"1.05rem",
          color:"#475569",
          lineHeight:1.7,
          maxWidth:520,
          margin:"0 auto 48px",
        }}>
          Seats for the 2026–27 academic session are limited. Complete the online
          registration form and secure your child's place at Isra Foundation Schools.
        </p>

        {/* CTA button */}
        <div style={{ position:"relative", display:"inline-block" }}>
          {/* Pulse rings */}
          <div className="octa-pulse-ring" />
          <div className="octa-pulse-ring" />
          <div className="octa-pulse-ring" />

          <a
            href="https://forms.gle/M9nuKcakF15TbsYQ9"
            target="_blank"
            rel="noreferrer"
            className="octa-btn"
          >
            <div className="octa-btn-ripple" />
            Apply Online
            <div
              style={{
                animation: arrowHovered ? "arrowBounceRight 0.5s ease infinite" : "none",
                display:"flex",
              }}
              onMouseEnter={() => setArrowHovered(true)}
              onMouseLeave={() => setArrowHovered(false)}
            >
              <ArrowRight size={20} />
            </div>
          </a>
        </div>

        {/* Secure note */}
        <div className="octa-secure-note my-20">
          <Lock size={14} style={{ color:"#020816" }} />
          <span style={{ fontSize:"0.8rem", color:"#020816", fontWeight:600 }}>
            Secure Online Registration
          </span>
          <ExternalLink size={12} style={{ color:"#020816" }} />
        </div>
      </div>
    </section>
  );
}
