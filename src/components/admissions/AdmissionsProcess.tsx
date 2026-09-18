import { useEffect, useRef, useState } from "react";
// Lucide icons removed

const styleTag = (
  <style>{`
    @keyframes photoFloat {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    .timeline-photo-circle:hover {
      transform: scale(1.08);
      box-shadow: 0 10px 24px rgba(2,6,24,0.22);
    }
    @media (max-width: 767px) {
      .timeline-section-padding {
        padding: 60px 16px !important;
      }
      .timeline-line {
        left: 20px !important;
        transform: none !important;
      }
      .timeline-node {
        left: 20px !important;
        top: 28px !important;
        transform: translate(-50%, -50%) !important;
      }
      .timeline-row-container {
        flex-direction: column !important;
        align-items: flex-start !important;
        padding-left: 48px !important;
        margin-bottom: 48px !important;
      }
      .timeline-col-image {
        order: 1 !important;
        padding-right: 0 !important;
        padding-left: 0 !important;
        justify-content: flex-start !important;
        margin-bottom: 16px !important;
        width: 100% !important;
      }
      .timeline-col-content {
        order: 2 !important;
        padding-right: 0 !important;
        padding-left: 0 !important;
        text-align: left !important;
        width: 100% !important;
      }
      .timeline-col-content * {
        text-align: left !important;
      }
    }
  `}</style>
);

const COLORS = {
  bg: "#f8fafc",
  card: "#ffffff",
  gold: "#F5C330",
  splash: "#F5C330",   
  splashAlt: "#60BADC",   
  ink: "#0e1e38",
  blue: "#60BADC",
};

const steps = [
  { num: "01", title: "Contact School", desc: "Contact school to obtain application form .", image: "/01-contact-school.jpg" },
  { num: "02", title: "Submit Application", desc: " Submit application form . ", image: "/02-submit-application-form.jpg" },
  { num: "03", title: "Submit Documents", desc: " Submit required documents .", image: "/03-submit-required-documents.jpg" },
  { num: "04", title: "Placement Test & Interview", desc: " Placement Test and Parent Interview scheduled and conducted .", image: "/04-placement-test-parent-interview.jpg" },
  { num: "05", title: "Admission Result", desc: " Admission decision .", image: "/05-admission-decision.jpg" },
  { num: "06", title: "Fee Deposit", desc: "Fee submission .", image: "/06-fee-submission.jpg" },
  { num: "07", title: "Enrollment Confirmed", desc: "Schedule Enrollment.", image: "/07-schedule-enrollment.jpg" },
];

function useReveal(threshold = 0.25) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Irregular splash shape sitting behind the photo circle, offset up-left,
// matching the torn-paper splatter behind each portrait in the reference.
// Alternates red/gold to match the reference's alternating splash colors.
function Splash({ flip, color }) {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 130 130"
      style={{
        position: "absolute",
        top: -15,
        left: flip ? "auto" : -20,
        right: flip ? -20 : "auto",
        zIndex: 0,
      }}
    >
      <path
        d="M20 8C40 -4 78 -2 96 14C116 30 128 54 118 76C110 96 90 100 72 112C54 124 30 126 16 108C2 90 8 68 4 48C0 30 4 18 20 8Z"
        fill={color}
        opacity="0.9"
      />
    </svg>
  );
}

function TimelineRow({ step, index }) {
  const { ref, visible } = useReveal();
  const isLeft = index % 2 === 0; // 01, 03, 05 -> photo left, text right
  const fromRight = index % 2 === 0; // odd rows slide from right, even from left
  const imageSlot = (
    <div
      style={{
        position: "relative",
        width: 170,
        height: 170,
        flexShrink: 0,
        zIndex: 1,
        animation: `photoFloat 4s ease-in-out infinite`,
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <Splash flip={!isLeft} color={isLeft ? COLORS.splash : COLORS.splashAlt} />
      <div
        className="timeline-photo-circle"
        style={{
          position: "relative",
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: COLORS.card,
          border: `3px solid ${COLORS.card}`,
          boxShadow: "0 4px 14px rgba(2,6,24,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease",
          overflow: "hidden",
        }}
      >
        <img src={step.image} alt={step.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );

  const content = (
    <div style={{ textAlign: isLeft ? "left" : "right", width: "100%" }}>
      <h3
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.ink,
          margin: "0 0 10px",
        }}
      >
        {step.title}
      </h3>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(2,6,24,0.6)", margin: 0 }}>{step.desc}</p>
    </div>
  );

  return (
    <div
      ref={ref}
      className="timeline-row-container"
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: 64,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${fromRight ? 60 : -60}px)`,
        transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {isLeft ? (
        <>
          <div className="timeline-col-image" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', paddingRight: 40 }}>
            <div style={{ position: "relative", zIndex: 2 }}>{imageSlot}</div>
          </div>
          <div className="timeline-col-content" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 40 }}>
            {content}
          </div>
        </>
      ) : (
        <>
          <div className="timeline-col-content" style={{ flex: 1, display: 'flex', alignItems: 'center', paddingRight: 40 }}>
            {content}
          </div>
          <div className="timeline-col-image" style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', paddingLeft: 40 }}>
            <div style={{ position: "relative", zIndex: 2 }}>{imageSlot}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default function AdmissionsProcess() {
  const { ref: headRef, visible: headVisible } = useReveal(0.1);

  return (
    <section
      id="admissions-process"
      className="scroll-mt-24 timeline-section-padding"
      style={{
        position: "relative",
        padding: "100px 24px",
        background: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
      }}
    >
      {styleTag}
      <div
        ref={headRef}
        style={{
          textAlign: "center",
          marginBottom: 80,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-8 h-px bg-[#020618]" />
          <span
            style={{
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
            }}
          >
            The Journey
          </span>
          <span className="w-8 h-px bg-[#020618]" />
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 3.6vw, 3rem)",
            fontWeight: 700,
            color: "#0e1e38",
            margin: "0 0 5px",
          }}
        >
          Admission <span className="text-[#F5C330]">Process</span>
        </h2>
        <div style={{ width:72, height:4, background:"#60BADC", margin:"0 auto 20px" }} />
        <p style={{ fontSize: 16, color: "rgba(2,6,24,0.65)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
         Isra Foundation Schools welcomes applications from families seeking a supportive and academically focused learning environment for their children.
        </p>
      </div>

      <div style={{ position: "relative", maxWidth: 900, margin: "0 auto" }}>
        <div
          className="timeline-line"
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 2,
            borderLeft: `2px dotted ${COLORS.ink}`,
            transform: "translateX(-50%)",
          }}
        />
        {steps.map((step, i) => (
          <div key={step.num} style={{ position: "relative" }}>
            <div
              className="timeline-node"
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)",
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: COLORS.card,
                border: `2px solid ${COLORS.ink}`,
                zIndex: 3,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: COLORS.ink,
                }}
              />
            </div>
            <TimelineRow step={step} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
