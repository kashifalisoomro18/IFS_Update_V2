import React, { useEffect, useRef, useState } from "react";

interface DocumentRequirement {
  id: string;
  title: string;
  description: string;
  color: "blue" | "yellow";
  icon: (props: { className?: string }) => React.ReactElement;
}

function BirthCertIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="15" rx="2" />
      <path d="M8 7h8" />
      <path d="M8 11h5" />
      <path d="M9 18l3-2 3 2v-4H9v4z" />
    </svg>
  );
}

function CnicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <rect x="6" y="9" width="4" height="4" rx="1" />
      <path d="M13 10h5" />
      <path d="M13 14h3" />
    </svg>
  );
}

function ReportIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 17v-4" />
      <path d="M12 17v-8" />
      <path d="M16 17v-6" />
    </svg>
  );
}

function TransferIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <circle cx="12" cy="15" r="3" />
      <path d="m10.5 15 1 1 2-2" />
    </svg>
  );
}

function CameraIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2z" />
    </svg>
  );
}

const documentRequirements: DocumentRequirement[] = [
  {
    id: "birth-cert",
    title: "Birth Certificate / B-Form",
    description: "Original or attested copy for verification.",
    color: "blue",
    icon: BirthCertIcon,
  },
  {
    id: "cnic",
    title: "Parent / Guardian CNIC",
    description: "Copy of the parent or guardian's national ID card.",
    color: "yellow",
    icon: CnicIcon,
  },
  {
    id: "report",
    title: "Previous School Report",
    description: "Most recent academic report or transcript.",
    color: "blue",
    icon: ReportIcon,
  },
  {
    id: "transfer-cert",
    title: "Transfer / Leaving Certificate",
    description: "Where applicable, from the previous school.",
    color: "yellow",
    icon: TransferIcon,
  },
  {
    id: "photographs",
    title: "Passport-size Photographs",
    description: "Recent passport-size photos of the student.",
    color: "blue",
    icon: CameraIcon,
  },
  {
    id: "other-docs",
    title: "Other Documents",
    description: "Any additional documents requested by admissions.",
    color: "yellow",
    icon: FolderIcon,
  },
];

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
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

export default function AdmissionDocumentRequried() {
  const { ref: sectionRef, visible } = useReveal();

  return (
    <section
      id="admissions-required-documents"
      className="scroll-mt-24 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#f8fafc] relative overflow-hidden -mt-10"
    >
      <div className="max-w-6xl mx-auto" ref={sectionRef}>
        {/* Header */}
        <div
          className="text-center mb-12 sm:mb-16 transition-all duration-700 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          {/* Subheader with dashes */}
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
    Before You Apply
  </span>
  <span className="w-8 h-px bg-[#020618]" />
</div>

          {/* Title */}
    <h2
  style={{
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(2rem, 3.6vw, 3rem)",
    fontWeight: 700,
    color: "#0e1e38",
    margin: "0 0 5px",
  }}
>
  Required <span className="text-[#60BADC]">Documents</span>
</h2>
<div style={{ width: 72, height: 4, background: "#F5C330", margin: "0 auto 20px" }} />
<p style={{ fontSize: 16, color: "rgba(2,6,24,0.65)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
  Please prepare the following documents to complete your child's application. Our admissions team will confirm exact requirements for your grade level.
</p>
</div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {documentRequirements.map((doc, index) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.id}
                className="relative bg-white  p-8 pt-10 text-center shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col items-center group transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {/* Yellow Ribbon Tag top-left */}
               {/* <div
                  className="absolute top-0 left-6 w-7 h-10 bg-[#F5C330] flex items-center justify-center shadow-sm z-10"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
                  }}
                >
                  <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-[#0d1f3c] flex items-center justify-center -mt-1">
                    <svg
                      className="w-2 h-2 text-[#0d1f3c]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                </div> */}

                {/* Circular Outer Background Glow */}
                <div className="w-24 h-24 rounded-full  flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
                  {/* Inner Colored Rounded Box */}
                  <div
                    className={`w-14 h-14  flex items-center justify-center shadow-sm ${
                      doc.color === "blue" ? "bg-[#54c0e8]" : "bg-[#f5c330]"
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white stroke-[2]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#0d1f3c] mb-2 leading-snug">
                  {doc.title}
                </h3>

                {/* Description */}
                <p className="text-slate-500 text-sm leading-relaxed max-w-[250px]">
                  {doc.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
