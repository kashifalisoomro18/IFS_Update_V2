import { useState, useEffect, useRef } from "react";
import { Plus, HelpCircle } from "lucide-react";

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

const faqs = [
  {
    q: "Who can apply for admission?",
    a: "Any child aged 3 years and above is eligible to apply at ISRA Foundation Schools. We welcome students from Pre-Nursery all the way through A Levels. Both new students and transfers from other schools are encouraged to apply.",
  },
  {
    q: "What is the minimum age requirement?",
    a: "Children must be at least 3 years of age by the start of the academic year to join Pre-Nursery. For Nursery, the minimum is 4 years. Each subsequent grade follows age-appropriate entry criteria aligned with Cambridge standards.",
  },
  {
    q: "How long does the admission process take?",
    a: "The complete admission process typically takes 5–10 working days from the time of application submission. This includes the placement test, parent interview, document verification, and fee deposit. We strive to make the process as smooth and transparent as possible.",
  },
  {
   q: "Is there a placement test, and how do we prepare?",
    a: "Yes, a placement test is required for students applying for all grades . The assessment covers English, Mathematics, and General Knowledge (logical reasoning) at a grade-appropriate level. It is a friendly, low-pressure evaluation — no special preparation is needed beyond what your child has already learned.",
  },
   {
    q: "How do merit scholarships work?",
    a: "Merit scholarships are awarded to outstanding students at O Level and A Level based on their examination results. O Level achievers may receive scholarships of up to 100% on tuition, while A Level top performers may qualify for up to 100%. Applications are reviewed by the academic committee after results are declared.",
  },
    {
    q: "What is the fee structure?",
    a: "For detailed information regarding our fee structure, we kindly request that you visit our campus in person. Our admissions office is available Monday to Friday, from 9:00 AM to 2:00 PM, to assist you with all fee-related queries.",
  },
  {
    q: "Where is the school located?",
    a: "Isra Foundation Schools is conveniently located in Isra Town, near Palm Enclave and Hashim Hospital, on the Bypass Road, Hyderabad.",
  },
];

function FAQItem({ question, answer, index, visible }: { question: string; answer: string; index: number; visible: boolean }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div
      style={{
        borderRadius: 0,
        overflow: "hidden",
        border: open ? "1.5px solid rgba(245,195,48,0.35)" : "1.5px solid rgba(13,31,60,0.08)",
        background: open ? "rgba(245,195,48,0.03)" : "white",
        boxShadow: open
          ? "0 8px 32px rgba(245,195,48,0.12), 0 2px 8px rgba(13,31,60,0.06)"
          : "0 2px 12px rgba(13,31,60,0.05)",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${index * 0.1}s`,
        cursor: "pointer",
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Question row */}
      <div
        className="faq-question-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 28px",
        }}
      >
        <div style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{
            width:36, height:36, borderRadius:0,
            background: open ? "rgba(245,195,48,0.15)" : "rgba(13,31,60,0.05)",
            border: open ? "1px solid rgba(245,195,48,0.3)" : "1px solid rgba(13,31,60,0.08)",
            display:"flex", alignItems:"center", justifyContent:"center",
            flexShrink:0,
            transition:"all 0.3s ease",
          }}>
            <HelpCircle size={17} style={{ color: open ? "#c49c10" : "#94a3b8" }} />
          </div>
          <span style={{
            fontSize: "0.98rem",
            fontWeight: 700,
            color: open ? "#0d1f3c" : "#1e293b",
            lineHeight:1.4,
          }}>
            {question}
          </span>
        </div>

        {/* Plus/minus icon */}
        <div style={{
          width: 36, height: 36,
          borderRadius: "0%",
          background: open ? "#F5C330" : "rgba(13,31,60,0.06)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
          transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: open ? "0 4px 16px rgba(245,195,48,0.4)" : "none",
        }}>
          <Plus size={18} style={{ color: open ? "#0d1f3c" : "#64748b" }} />
        </div>
      </div>

      {/* Answer */}
      <div style={{
        height,
        overflow: "hidden",
        transition: "height 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div ref={contentRef} className="faq-answer-content" style={{ padding: "0 28px 24px", paddingLeft: 78 }}>
          <p style={{
            fontSize: "0.92rem",
            color: "#475569",
            lineHeight: 1.75,
            margin: 0,
          }}>
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AdmissionsFAQ() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: faqRef, visible: faqVisible } = useReveal(0.05);

  return (
    <section
      id="admissions-faq"
      className="scroll-mt-24 my-20"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 0",
        background: "#ffffff",
      }}
    >
      <style>{`
        @media(max-width: 640px) {
          .faq-question-row { padding: 16px !important; }
          .faq-answer-content { padding: 0 16px 20px 16px !important; }
          .faq-container-padding { padding: 0 16px !important; }
        }
        @media(prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }
      `}</style>

      {/* Background */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
        <div style={{
          position:"absolute", top:"-10%", right:"5%",
          width:400, height:400, borderRadius:"50%",
          background:"radial-gradient(circle, rgba(96,186,220,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position:"absolute", bottom:"-5%", left:"8%",
          width:350, height:350, borderRadius:"0%",
          background:"radial-gradient(circle, rgba(245,195,48,0.06) 0%, transparent 70%)",
        }} />
        <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.3 }}>
          <defs>
            <pattern id="faqDots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.4" fill="#cbd5e1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#faqDots)" />
        </svg>
      </div>

      <div className="faq-container-padding" style={{ maxWidth:860, margin:"0 auto", padding:"0 40px", position:"relative", zIndex:1 }}>

        {/* Header */}
        <div
          ref={headRef}
          style={{
            textAlign:"center", marginBottom:64,
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(28px)",
            transition:"all 0.7s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
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
              Got Questions?
            </span>
            <span className="w-8 h-px bg-[#020618]" />
          </div>
          <h2 style={{
            fontSize:"clamp(2rem, 3.15vw, 3rem)",
            fontWeight:900, color:"#0d1f3c",
            margin:"0 0 14px", lineHeight:1.15,
          }}>
            Frequently Asked <span style={{ color:"#60badc" }}>Questions</span>
          </h2>
          <div style={{ width:72, height:4, background:"#F5C330", borderRadius:99, margin:"0 auto 18px" }} />
          <p style={{ color:"#64748b", fontSize:"1rem", maxWidth:460, margin:"0 auto", lineHeight:1.7 }}>
            Answers to the most common questions parents ask about the admission process.
          </p>
        </div>

        {/* FAQ list */}
        <div ref={faqRef} style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              question={faq.q}
              answer={faq.a}
              index={i}
              visible={faqVisible}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: 48, textAlign: "center",
          padding: "28px 32px",
          background: "white",
          borderRadius: 0,
          border: "1.5px solid #eef1f5",
          boxShadow: "0 4px 20px rgba(13,31,60,0.07)",
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.7s ease 0.8s",
        }}>
          <p style={{ fontSize: "0.95rem", color: "#475569", margin: "0 0 14px" }}>
            Still have questions? Our admissions team is here to help.
          </p>
          <a
            href="tel:+923173700049"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontSize: "0.9rem", fontWeight: 800,
              color: "#0d1f3c", textDecoration: "none",
              padding: "12px 28px",
              
              // Left to right effect ke liye transparent background aur yellow color ka gradient stack
              backgroundImage: "linear-gradient(to right, #F5C330 50%, rgba(245,195,48,0.1) 50%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "right bottom",
              
              border: "1px solid #f5c330",
              borderRadius: 0,
              transition: "background-position 0.4s ease-out, border-color 0.3s ease, transform 0.25s ease",
            }}
            onMouseEnter={e => {
              const target = e.currentTarget as HTMLAnchorElement;
              target.style.backgroundPosition = "left bottom";
              target.style.borderColor = "#F5C330";
              
              // Hover par SVG icon ka color dark blue hi rahega readibilty ke liye
              const svg = target.querySelector("svg");
              if (svg) svg.style.fill = "#0d1f3c";
            }}
            onMouseLeave={e => {
              const target = e.currentTarget as HTMLAnchorElement;
              target.style.backgroundPosition = "right bottom";
              target.style.borderColor = "rgba(245,195,48,0.35)";
              
              // Hover hatne par SVG icon wapis gray ho jayega
              const svg = target.querySelector("svg");
              if (svg) svg.style.fill = "#64748b";
            }}
          >
            {/* Gray SVG Phone Icon */}
            <svg 
              viewBox="0 0 24 24" 
              style={{ 
                width: "18px", 
                height: "18px", 
                fill: "#64748b", 
                transition: "fill 0.3s ease" 
              }}
            >
              <path d="M6.62 10.79a15.15 15.15 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.27c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.27 1.02l-2.18 2.2z"/>
            </svg>
            Call Us: +92 317 3700049
          </a>
        </div>

      </div>
    </section>
  );
}
