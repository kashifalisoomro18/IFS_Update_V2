/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AcademicsSubView } from "../types";
import {
  Clock,
  ShieldCheck,
  GraduationCap,
  Puzzle,
  Lightbulb,
  FlaskRound,
  ArrowRight,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLORS = {
  ink: "#0d1f3c",
  gold: "#F5C330",
  blue: "#60BADC",
};

import RibbonPathwaysSection from "./RibbonPathways";

const NAVY = "#0d1f3c";
const GOLD = "#F5C330";
const SKY = "#60BADC";

function useReveal(threshold = 0.3) {
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

// Four overlapping ellipse "orbits" rotated at even increments, forming an
// atom / flower pattern, plus a nucleus. Each orbit draws itself in via a
// stroke-dashoffset animation, staggered, matching the recording's reveal.
const ORBITS = [
  { rotate: 0, delay: 0 },
  { rotate: 45, delay: 0.5 },
  { rotate: 90, delay: 1.0 },
  { rotate: 135, delay: 1.5 },
];

interface AnimatedAtomIconProps {
  size?: number;
  color?: string;
  accent?: string;
  strokeWidth?: number;
}

// NOTE: no "export" here — this file's only default export is AcademicsView below.
function AnimatedAtomIcon({
  size = 280,
  color = COLORS.blue,
  accent = COLORS.gold,
  strokeWidth = 1.5,
}: AnimatedAtomIconProps) {
  const { ref, visible } = useReveal();

  const rx = size * 0.42;
  const ry = size * 0.2;
  const cx = size / 2;
  const cy = size / 2;
  // approximate ellipse circumference (Ramanujan)
  const h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);
  const circumference = Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

  return (
    <div ref={ref} style={{ width: size, height: size, display: "inline-block" }}>
      <style>{`
        @keyframes orbitDraw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes nucleusPop {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.25); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {ORBITS.map((orbit, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={rx}
            ry={ry}
            fill="none"
            stroke={i % 2 === 0 ? color : accent}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            transform={`rotate(${orbit.rotate} ${cx} ${cy})`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: visible ? 0 : circumference,
              transition: `stroke-dashoffset 3s cubic-bezier(0.65,0,0.35,1) ${orbit.delay}s`,
            }}
          />
        ))}
        <g
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            animation: visible ? "nucleusPop 1s cubic-bezier(0.34,1.56,0.64,1) 2.4s both" : "none",
            opacity: visible ? undefined : 0,
          }}
        >
          <foreignObject
            x={cx - size * 0.19}
            y={cy - size * 0.19}
            width={size * 0.38}
            height={size * 0.38}
          >
            <img
              src="/ifs-logo.png"
              alt="ISRA Foundation Schools logo"
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />
          </foreignObject>
        </g>
      </svg>
    </div>
  );
}



/* ------------------------------------------------------------------ */
/* Shared eyebrow/heading block — matches About's "line — label — line" */
/* ------------------------------------------------------------------ */

function SectionHeading({
  eyebrow,
  heading,
  accent,
  description,
  subDescription,
  dividerColor,
}: {
  eyebrow: React.ReactNode;
  heading: React.ReactNode;
  accent?: React.ReactNode;
  description?: string;
  subDescription?: string;
  dividerColor?: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: "52px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span style={{ width: "32px", borderTop: "1px solid #020816" }} />
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
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          }}
        >{eyebrow}</span>
        <span style={{ width: "32px", borderTop: "1px solid #020816" }} />

      </div>

      <h2
        style={{
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          fontWeight: 900,
          color: "#0d1f3c",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {heading}
        {accent}
      </h2>
      {/* Divider — color is set per-section via the dividerColor prop below */}
      <div
        className="mx-auto"
        style={{
          width: "64px",
          height: "4px",
          borderRadius: "0px",
          marginTop: "16px",
          background: dividerColor || "#F5C330",
        }}
      />
      {description && (
        <p className="text-sm sm:text-base text-[#020816] leading-relaxed text-justify max-w-2xl mx-auto mt-4">
          {description}
        </p>
      )}
      {subDescription && (
        <p className="text-xs sm:text-sm text-[#020816] leading-relaxed text-justify max-w-2xl mx-auto mt-2">
          {subDescription}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* OVERVIEW                                                             */
/* ------------------------------------------------------------------ */

function OverviewSection() {
  return (
    <div className="space-y-8" id="academics-overview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Academic Program"
          heading="Curriculum"
          accent={<span style={{ color: "#60BADC" }}> Overview</span>}
          description="The curriculum focuses on a rigorous and creative academic foundation that aims at developing intellectual curiosity, critical thinking, and problem-solving skills amongst our students."
          subDescription="Our renowned curriculum and devoted faculty uphold the high standards we have maintained for nearly four decades."
          dividerColor="#f5c330"
        />
      </div>

      <div className="w-full bg-slate-100 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            <p className="font-semibold text-sm sm:text-base leading-relaxed text-justify text-[#0d1f3c]">
              At each grade level, students are challenged academically and personally to learn
              and grow. Our academic program is designed to teach students the knowledge, skills,
              and attitudes that will best prepare them for success in a global society.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-justify text-[#0d1f3c]">
              Our coursework also emphasizes an ethic of empathy and social responsibility.
              Students continually draw connections between what they learn and real-world
              experiences.
            </p>
          </div>
          <div className="flex justify-center -translate-x-[10px]">
            <AnimatedAtomIcon size={400} color="#60BADC" accent="#F5C330" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DUAL ACADEMIC CORE                                                   */
/* ------------------------------------------------------------------ */

const dualCore = [
  {
    eyebrow: "EARLY YEARS (ECD)",
    title: "FINLAND HEI MODEL",
    desc: "Sensory-led, active exploration modules built with Finnish education consultants. We guide student confidence, tactile exploration, child-centric discovery, and cooperative communication.",
    tags: "PRE-NURSERY • NURSERY • KINDERGARTEN",
    tone: "blue",
    image: "/finland_hei.png",
    Icon: () => (
      <div className="bg-[#60BADC]  p-1.5 text-white mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
      </div>
    )
  },
  {
    eyebrow: "MIDDLE & HIGH SCHOOL",
    title: "CAMBRIDGE RIGOR",
    desc: "Intensive syllabus, board diagnostic mock-evaluations, certified laboratory work, and advanced analytical reasoning designed to prepare change-makers for global tertiary pathways.",
    tags: "GRADES 6-8 • CAMBRIDGE CAIE O & A LEVELS",
    tone: "gold",
    image: "/cambridge_rigor.png",
    Icon: () => (
      <div className="bg-[#F5C330]  p-1.5 text-white mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
      </div>
    )
  },
];
function DualAcademicCoreSection() {
  return (
    <div className="space-y-10 pt-16 sm:pt-20" id="dual-academic-blocks">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Dual Curriculum"
          heading="Academic"
          accent={<span style={{ color: "#F5C330" }}> Excellence</span>}
          dividerColor="#60BADC"
        />
      </div>
      <div className="w-full">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 space-y-8 md:space-y-20">
          {dualCore.map(({ eyebrow, title, desc, tags, tone, image, Icon }, idx) => {
            const isBlue = tone === "blue";
            const accentColor = isBlue ? "#60BADC" : "#F5C330";
            const isFirst = idx === 0;
            return (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`w-full md:w-[85%] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-50   bg-white flex flex-col mx-auto ${isFirst ? "sm:flex-row" : "sm:flex-row-reverse"
                  }`}
              >
                {/* Photo / watermark panel */}
                <div
                  className="relative min-h-[220px] sm:min-h-[320px] sm:w-[45%] flex items-center justify-center"
                >
                  <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 opacity-40 ${isBlue ? 'bg-[#60BADC]' : 'bg-[#F5C330]'}`}></div>

                  {/* SVG overlay to create the curve */}
                  {isFirst ? (
                    <svg className="absolute inset-y-0 -right-[1px] h-full w-16 sm:w-32 text-white hidden sm:block" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path fill="currentColor" d="M100 0 C40 20 20 80 100 100 Z" />
                    </svg>
                  ) : (
                    <svg className="absolute inset-y-0 -left-[1px] h-full w-16 sm:w-32 text-white hidden sm:block" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path fill="currentColor" d="M0 0 C60 20 80 80 0 100 Z" />
                    </svg>
                  )}
                </div>

                {/* Info panel */}
                <div className="sm:w-[55%] p-8 sm:p-14 space-y-5 flex flex-col justify-center relative">
                  {/* Decorative background elements */}
                  {isFirst ? (
                    <>
                      <svg className="absolute top-8 right-10 w-12 h-12 text-blue-100/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                      <svg className="absolute bottom-10 right-20 w-16 h-16 text-blue-100/40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M17.5 19c-2.5 0-3-2.5-3-2.5C14 15 11.5 15 11.5 15c-2.5 0-3 2.5-3 2.5s-.5 2.5-3 2.5a4 4 0 1 1 0-8c0-1.5 1.5-4.5 5.5-4.5 1 0 2.5.5 3.5 1.5 2-3 5.5-2.5 6-2.5 3 0 4.5 2.5 4.5 4.5a4 4 0 1 1-7.5 3.5z" /></svg>
                    </>
                  ) : (
                    <>
                      <svg className="absolute top-10 right-20 w-12 h-12 text-yellow-100/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M9 18h6M10 22h4M12 2v1M12 7v1M4 12H3M21 12h-1M6.3 6.3l-.7-.7M18.4 6.3l.7-.7M6.3 17.7l-.7.7M18.4 17.7l.7.7" /><circle cx="12" cy="12" r="4" /></svg>
                      <svg className="absolute bottom-10 left-10 w-14 h-14 text-yellow-100/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                    </>
                  )}

                  <div className="flex items-center">
                    <Icon />
                    <span
                      className="font-bold text-xs uppercase tracking-widest px-3 py-1.5 "
                      style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
                    >
                      {eyebrow}
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-[#0d1f3c] leading-tight tracking-tight uppercase">
                    {title}
                  </h3>
                  <div className="h-1 w-16" style={{ backgroundColor: accentColor }}></div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-lg">{desc}</p>
                  <div
                    className="text-xs sm:text-sm font-bold uppercase tracking-widest pt-2"
                    style={{ color: accentColor }}
                  >
                    {tags}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
/* ------------------------------------------------------------------ */
/* TEACHING METHODOLOGY                                                */
/* ------------------------------------------------------------------ */

const methodology = [
  {
    icon: Puzzle,
    title: "Activity-Based Learning",
    desc: "Play and hands-on discovery drive every lesson through the early years, building confidence before content.",
  },
  {
    icon: Lightbulb,
    title: "Inquiry-Based STEM",
    desc: "Middle and Cambridge levels shift toward question-driven exploration across science and mathematics.",
  },
  {
    icon: FlaskRound,
    title: "Practical Lab Application",
    desc: "Theory is verified hands-on in certified labs, reinforcing STEM concepts through direct practice.",
  },
];

function TeachingMethodologySection() {
  return (
    <div className="space-y-10 pt-20" id="academics-methodology">
      <SectionHeading
        eyebrow="Our Approach"
        heading="How We Bring Learning"
        accent={<span style={{ color: "#60BADC" }}> <br />To Life</span>}
        dividerColor="#f5c330"
      />

      {/* Methodology cards - EXACT "Why Choose Isra Foundation" card style from HomeView */}
      <motion.div
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        id="methodology-cards"
      >
        {methodology.map(({ icon: Icon, title, desc }) => (
          <motion.div
            key={title}
            variants={{
              hidden: { opacity: 0, y: 30 },
              show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
            }}
            whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
            className="group relative h-full flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-xl p-8 transition-all duration-300 z-10 overflow-hidden"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#60badc";
              e.currentTarget.style.backgroundColor = "rgba(96, 186, 220, 0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#f1f5f9";
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            {/* Top border accent - slides in from left on hover (exact HomeView style) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#60badc] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

            {/* Icon box - springs on hover with scale + rotate */}
            <motion.div
              whileHover={{ scale: 1.15, rotate: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 12 }}
              className="w-14 h-14  bg-[#60badc]/10 flex items-center justify-center mb-6 group-hover:bg-[#60badc]/20 transition-colors duration-300"
            >
              <Icon className="w-7 h-7 text-[#60badc] transition-colors duration-300" />
            </motion.div>

            <h4 className="font-extrabold text-[#0d1f3c] text-xl leading-snug mb-3">
              {title}
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed font-normal">
              {desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
/* ------------------------------------------------------------------ */
/* ACADEMICS HERO BANNER — rendered OUTSIDE the zoomed container       */
/* ------------------------------------------------------------------ */
function AcademicsHeroBanner() {
  return (
    <section
      id="academics-hero-banner"
      className="relative w-full h-[auto] min-h-[500px] flex items-center bg-center bg-cover overflow-x-hidden"
      style={{
        backgroundImage: "url('/building-image1.jpg')",
      }}
    >

      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)",
        }}
      />

      {/* Content */}
      <div
        className="relative z-[2] w-full "
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 32px",
        }}
      >
        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >

          <span
            style={{
              display: "inline-block",
              color: "#ffffff",
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "2px 14px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Admissions Open 2026&ndash;27
          </span>

        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 900,
            color: "#ffffff",
            margin: "0 0 18px",
            lineHeight: 1.15,
            maxWidth: 820,
          }}
        >
          Shaping Bright Minds Through{" "}
          <span style={{ color: COLORS.gold }}>Academic Excellence</span>
        </h2>

        {/* Subtext */}
        <p
          style={{
            maxWidth: 600,
            fontSize: "1rem",
            color: "#ffffff",
            lineHeight: 1.7,
            margin: "0 0 30px",
          }}
        >
          From a strong foundation in core subjects to personalized attention in every
          classroom, ISRA Foundation Schools builds the skills and confidence your child
          needs to excel &mdash; today and in the future.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="#curriculum"
            className="curriculum-btn"
            onClick={(e) => {
              e.preventDefault();
              // Ensure the curriculum tab hash is set so the section is visible
              if (typeof window !== 'undefined') {
                window.history.replaceState(null, '', '#curriculum');
                window.dispatchEvent(new HashChangeEvent('hashchange'));
              }
              // After a brief tick (so React re-renders the tab), scroll smoothly
              setTimeout(() => {
                const target =
                  document.getElementById('academics-nav') ||
                  document.getElementById('curriculum');
                if (!target) return;
                const HEADER_OFFSET = window.innerWidth < 768 ? 85 : 110;
                const targetPosition =
                  target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 1600; // slow, deliberate upward journey ~1.6s
                let start: number | null = null;

                const easeInOutCubic = (t: number) =>
                  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

                const step = (timestamp: number) => {
                  if (!start) start = timestamp;
                  const progress = timestamp - start;
                  const percentage = Math.min(progress / duration, 1);
                  window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));
                  if (progress < duration) {
                    window.requestAnimationFrame(step);
                  }
                };
                window.requestAnimationFrame(step);
              }, 60);
            }}
          >
            <span className="curriculum-btn-bg"></span>
            <span className="curriculum-btn-content">
              Explore Curriculum
            </span>
          </a>
        </div>
      </div>

      {/* Local styles for the CTA button, since this section now renders
          outside academics-view-container (which previously scoped fonts/
          button styles via #academics-view-container *). Keeping a small
          scoped style block here so the button still looks right. */}
      <style>{`
        #academics-hero-banner {
          font-family: 'Inter', sans-serif;
        }
        #academics-hero-banner .curriculum-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 15px 26px;
          background: #ffffff;
          color: #020816;
          border-radius: 0;
          box-sizing: border-box;
          font-weight: 600;
          font-size: 14px;
          border: none;
          cursor: pointer;
          transition: color .35s ease, transform 0.25s ease, box-shadow 0.25s ease;
          text-decoration: none;
        }
        #academics-hero-banner .curriculum-btn:hover {
          transform: translateY(-3px);
        }
        #academics-hero-banner .curriculum-btn-bg {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #60BADC;
          transition: left 0.45s ease;
          z-index: 0;
        }
        #academics-hero-banner .curriculum-btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color .35s ease;
        }
        #academics-hero-banner .curriculum-btn:hover .curriculum-btn-bg {
          left: 0;
        }
        #academics-hero-banner .curriculum-btn:hover .curriculum-btn-content {
          color: white;
        }
        #academics-hero-banner .curriculum-btn:hover svg {
          color: white;
          transform: translateX(4px);
          transition: .3s;
        }
      `}</style>
    </section>
  );
}


/* ------------------------------------------------------------------ */
/* SCHOOL LEVELS OVERLAPPING SHOWCASE                                   */
/* (Elementary / Junior / Senior — pristine layout matching reference)  */
/* ------------------------------------------------------------------ */

interface SchoolLevelsShowcaseSectionProps {
  setSubView: (sub: AcademicsSubView) => void;
}

function SchoolLevelsShowcaseSection({ setSubView }: SchoolLevelsShowcaseSectionProps) {
  const goToCurriculum = () => setSubView("curriculum");

  return (
    <section className="space-y-30 overflow-visible pt-20" id="fps-school-levels-showcase">
      <SectionHeading
        eyebrow="Academic Pathways"
        heading="Levels "
        accent={<span style={{ color: "#f5c330" }}> Offered</span>}
        dividerColor="#60BADC"
      />
      {/* 1. ECD Section Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 my-16 sm:my-28 lg:my-44" id="junior-level-card">
        <div className="relative">

          {/* Background depth layers behind the whole card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-4 left-2 sm:left-6 w-[70%] sm:w-[42%] h-[85%] bg-[#FEF08A]/70 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-6 left-8 sm:left-14 w-[65%] sm:w-[38%] h-[75%]  bg-[#FDE047]/50 hidden sm:block"
          />

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#FDE047] p-5 sm:p-10 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 lg:min-h-[460px] w-full sm:w-[92%] ml-auto"
          >

            {/* Left Column: Narrative details and button — slides in from the left */}
            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 z-20 space-y-4 sm:space-y-6 lg:pr-12"
            >
              <p className="text-[#020618]/85 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-md text-justify">
                At IFS, we see<strong className="text-[#020618] font-extrabold"> Early Childhood Development (ECD) </strong> as a vital stage where children begin to explore the world, build meaningful relationships, and develop essential cognitive, social, emotional, and physical skills. Through a nurturing, safe, and engaging learning environment, we encourage curiosity, creativity, confidence, and a strong foundation for lifelong learning.
              </p>
            </motion.div>

            {/* Right Column: Large image block with golden tint and overlaid text — slides in from the right */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative h-[280px] sm:h-[380px] lg:h-[440px] flex items-center justify-center w-full mt-4 lg:mt-0"
            >
              <div className="absolute inset-0 top-0 lg:-top-6 xl:-top-10 bg-slate-950 overflow-hidden shadow-xl z-10 group rounded-sm">
                <img
                  src="/assets/slider/slide4.jpg"
                  alt="Junior school students in lab"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Golden color-wash overlay */}
                <div className="absolute inset-0 bg-[#FCD34D]/45 mix-blend-color z-15" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-20" />

                {/* Heading — bold + light on two lines, like Elementary card */}
                <div className="absolute bottom-20 sm:bottom-24 left-6 z-30 select-none">
                  <h3 className="font-sans font-black text-white text-3xl sm:text-5xl leading-[0.9] tracking-tight">
                    ECD
                    <span className="block font-light text-white/90 text-2xl sm:text-4xl mt-0.5">
                      Section
                    </span>
                  </h3>
                </div>

                {/* Grade levels — separate, dark charcoal text, below heading */}
                <div className="absolute bottom-6 left-6 z-30 space-y-0.5 select-none">
                  <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest block font-mono">
                    Grade Levels
                  </span>
                  <span className="text-xs sm:text-base text-white">
                    Pre-Nursery - Kindergarten
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 2. Elementary section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 my-16 sm:my-28 lg:my-44" id="elementary-level-card">
        <div className="relative">

          {/* Background depth layers — right side, lavender family */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-6 right-0 w-[38%] h-[16%] bg-[#cbb8ef]/70 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-[16%] right-0 w-[38%] h-[82%] bg-[#d8c9f4]/60 hidden sm:block"
          />

          {/* Main front card — light lavender #e1d8f7 */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#e1d8f7] p-5 sm:p-10 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 lg:min-h-[460px] w-full sm:w-[92%]"
          >

            {/* Left Column: Framed portrait photo + Grade Levels badge + heading */}
            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative flex flex-col justify-end min-h-[300px] sm:min-h-[400px] lg:min-h-[440px] z-10 w-full"
            >

              {/* Image frame wrapper — light glass border, fits the lavender card */}
              <div className="relative w-full h-[240px] sm:h-[320px]">

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  className="absolute inset-0 w-[82%] sm:w-[78%] h-full overflow-hidden bg-white/60 backdrop-blur-sm p-2 shadow-[0_18px_40px_rgba(31,20,10,0.15)] z-10 border border-white/60"
                >
                  <img
                    src="/assets/slider/slide2.jpg"
                    alt="School building"
                    className="w-full h-full object-cover object-center"
                  />
                </motion.div>

                {/* Grade Levels badge — dark glass, readable on light lavender */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute right-0 sm:right-2 bottom-6 bg-white/70 backdrop-blur-md border border-white/20 px-4 py-3.5 shadow-lg z-20 select-none"
                >
                  <span className="text-[9px] sm:text-[11px] font-bold text-[#020816] uppercase tracking-widest block font-mono">
                    Grade Levels
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#020816]">
                    Grade I - Grade V
                  </span>
                </motion.div>
              </div>

              {/* Heading — dark navy text on light lavender */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.55 }}
                className="relative z-30 mt-6 select-none"
              >
                <h3 className="font-sans font-black text-[#020816] text-4xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                  Elementary
                  <span className="block font-sans font-light text-[#020816]/60 text-3xl sm:text-5xl mt-1">
                    School
                  </span>
                </h3>
              </motion.div>
            </motion.div>

            {/* Right Column: Narrative + button — slides in from the right */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 lg:pl-16 z-20 space-y-4 sm:space-y-6"
            >
              <p className="text-[#020816]/85 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-md text-justify">
                At <strong className="text-[#020816] font-extrabold">IFS Elementary</strong>, we nurture the development of each child emotionally, academically, physically, socially, and artistically during their formative years.
              </p>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 3. Middle Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 my-16 sm:my-28 lg:my-44" id="alevel-level-card">
        <div className="relative">

          {/* Background depth layers behind the whole card — left side, mint-teal family */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-4 left-2 sm:left-6 w-[70%] sm:w-[42%] h-[85%] bg-[#C6F1EB]/70 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-6 left-8 sm:left-14 w-[65%] sm:w-[38%] h-[75%] bg-[#ADEBE1]/60 hidden sm:block"
          />

          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#91E5DB] p-5 sm:p-10 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 lg:min-h-[460px] w-full sm:w-[92%] ml-auto"
          >

            {/* Left Column: Narrative details and button — slides in from the left */}
            <motion.div
              initial={{ opacity: 0, x: -120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 z-20 space-y-4 sm:space-y-6 lg:pr-12"
            >
              <p className="text-[#020618]/85 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-md text-justify">
                At IFS <strong className="text-[#020816] font-extrabold"> Middle Section (Grades VI–VII) </strong>, students are encouraged to strengthen their academic skills, develop critical thinking, and build confidence as independent learners. Through engaging learning experiences, they are prepared to take on greater challenges and grow into responsible, curious, and capable individuals.
              </p>
            </motion.div>

            {/* Right Column: Angled image block, heading at top, floating grade badge on corner */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative h-[300px] sm:h-[400px] lg:h-[460px] flex items-center justify-center w-full mt-4 lg:mt-0"
            >
              {/* Image with angled top edge instead of a plain rectangle */}
              <div
                className="absolute inset-0 top-0 lg:-top-6 xl:-top-10 bg-slate-950 overflow-hidden shadow-xl z-10 group rounded-sm"
                style={{ clipPath: "polygon(0% 6%, 100% 0%, 100% 100%, 0% 100%)" }}
              >
                <img
                  src="/assets/slider/slide6.jpg"
                  alt="A-Level students"
                  className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Mint-teal color-wash overlay, matches new card theme */}
                <div className="absolute inset-0 bg-[#91E5DB]/45 mix-blend-color z-15" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent z-20" />

                {/* Heading — moved to TOP of image (Junior's sits at the bottom) */}
                <div className="absolute top-8 sm:top-10 left-6 z-30 select-none">
                  <h3 className="font-sans font-black text-white text-3xl sm:text-5xl leading-[0.9] tracking-tight">
                    Middle
                    <span className="block font-light text-white/90 text-2xl sm:text-4xl mt-0.5">
                      Section
                    </span>
                  </h3>
                </div>
              </div>

              {/* Floating white "Grade Levels" badge overlapping the bottom-left corner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="absolute -bottom-4 left-4 sm:left-6 z-30 bg-white px-5 py-3 shadow-lg select-none"
              >
                <span className="text-[10px] sm:text-[11px] font-bold text-[#020816] uppercase tracking-widest block font-mono">
                  Grade Levels
                </span>
                <span className="text-sm sm:text-base font-bold text-[#020816]">
                  Grade VI - Grade VII
                </span>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>
      </div>

      {/* 4. Cambridge section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-16 my-16 sm:my-28 lg:my-44" id="senior-level-card">
        <div className="relative">

          {/* Background depth layers behind the card — right side, like reference */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pointer-events-none absolute -top-6 right-0 w-[38%] h-[16%]  bg-[#BAE6FD]/50 hidden sm:block"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.12 }}
            className="pointer-events-none absolute top-[16%] right-0 w-[38%] h-[82%] bg-[#7DD3FC] hidden sm:block"
          />

          {/* Main front card */}
          <motion.div
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#BAE6FD] p-5 sm:p-10 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-0 lg:min-h-[460px] w-full sm:w-[92%]"
          >

            {/* Left Column: Image collage + heading */}
            <div className="lg:col-span-6 relative flex flex-col justify-end min-h-[300px] sm:min-h-[400px] lg:min-h-[440px] z-10 w-full">

              {/* Image stack wrapper */}
              <div className="relative w-full h-[240px] sm:h-[320px]">

                {/* Top polygon image — blue-tinted graduation photo */}
                <motion.div
                  initial={{ opacity: 0, y: -60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
                  whileHover={{ scale: 1.04 }}
                  className="absolute left-[20%] sm:left-[24%] -top-6 w-[60%] sm:w-[56%] h-[85%] overflow-hidden shadow-[0_20px_45px_rgba(16,24,40,0.22)] z-10"
                  style={{ clipPath: "polygon(10% 0%, 100% 4%, 88% 100%, 0% 90%)" }}
                >
                  <img
                    src="/assets/slider/slide51.jpg"
                    alt="Senior school graduates"
                    className="w-full h-full object-cover object-center"
                  />
                  {/* Blue color-wash overlay to match reference tint */}
                  <div className="absolute inset-0 bg-[#1d4ed8]/50 mix-blend-color" />
                </motion.div>

                {/* Tilted side photo — group graduation shot */}
                <motion.div
                  initial={{ opacity: 0, x: -50, rotate: -12 }}
                  whileInView={{ opacity: 1, x: 0, rotate: -8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: -4 }}
                  className="absolute left-0 bottom-[8%] w-[34%] sm:w-[30%] aspect-[4/5]  overflow-hidden bg-white p-1 shadow-[0_16px_35px_rgba(16,24,40,0.20)] border border-white z-20"
                >
                  <img
                    src="/assets/slider/559005353_1378177237650043_1854500200270735487_n.jpg"
                    alt="Graduation ceremony group"
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              </div>

              {/* Heading — sits directly under image stack */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="relative z-30 mt-4 select-none"
              >
                <h3 className="font-sans font-black text-[#0f172a] text-4xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                  Cambridge
                  <span className="block font-sans font-light text-slate-500 text-3xl sm:text-5xl mt-1">
                    Section
                  </span>
                </h3>
                <div className="mt-5 space-y-0.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-widest block font-mono">
                    Grade Levels
                  </span>
                  <span className="text-sm sm:text-base font-black text-slate-950">
                    O Level - A Level
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Narrative details and button */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="lg:col-span-6 lg:pl-16 z-20 space-y-4 sm:space-y-6"
            >
              <p className="text-slate-800 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-md text-justify">
                At IFS <strong className="text-slate-950 font-bold">O Level & A Level</strong> provides students with a balanced and enriching learning experience that combines academic excellence with a vibrant co-curricular program. Our aim is to develop confident, independent, and critical thinkers, equipping students with the knowledge, skills, and confidence they need to succeed in their examinations, university, and beyond.
              </p>

            </motion.div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}

interface AcademicsViewProps {
  subView?: AcademicsSubView;
  setSubView?: (sub: AcademicsSubView) => void;
}

export default function AcademicsView({
  subView: initialSubView = "curriculum",
  setSubView: externalSetSubView,
}: AcademicsViewProps) {
  const [activeTab, setActiveTab] = useState<AcademicsSubView>(initialSubView);

  const scrollToSection = (tab: string) => {
    const targetEl =
      document.getElementById(tab) ||
      document.getElementById(`academics-${tab}`) ||
      document.getElementById("academics-nav");

    if (targetEl) {
      const HEADER_HEIGHT = window.innerWidth < 768 ? 85 : 125;
      const navEl = document.getElementById("academics-nav");
      const scrollAnchor = navEl || targetEl;
      const top = scrollAnchor.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (initialSubView) {
      setActiveTab(initialSubView);
    }
  }, [initialSubView]);

  useEffect(() => {
    const handleHash = (shouldScroll = true, explicitHash?: string) => {
      if (typeof window === "undefined") return;
      const rawHash = (explicitHash || window.location.hash.replace("#", "")).toLowerCase();
      let tab: AcademicsSubView | null = null;
      if (rawHash === "curriculum" || rawHash === "overview" || rawHash === "academics-curriculum" || rawHash === "section-overview") {
        tab = "curriculum";
      } else if (rawHash === "timings" || rawHash === "daily-schedules" || rawHash === "academics-timings" || rawHash === "schedule" || rawHash === "schedules") {
        tab = "timings";
      } else if (rawHash === "calendar" || rawHash === "academic-calendar" || rawHash === "academics-calendar") {
        tab = "calendar";
      }

      if (tab) {
        setActiveTab(tab);
        if (externalSetSubView) {
          externalSetSubView(tab);
        }
        if (shouldScroll) {
          // Double tick to handle immediate scroll as well as post-animation layout
          setTimeout(() => {
            scrollToSection(tab);
          }, 50);
          setTimeout(() => {
            scrollToSection(tab);
          }, 180);
        }
      }
    };

    handleHash(true);

    const onHashChange = () => handleHash(true);
    const onCustomNav = (e: any) => {
      if (e.detail?.hash) {
        handleHash(true, e.detail.hash);
      } else {
        handleHash(true);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("app:navigate-anchor", onCustomNav);
    document.addEventListener("astro:page-load", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("app:navigate-anchor", onCustomNav);
      document.removeEventListener("astro:page-load", onHashChange);
    };
  }, [externalSetSubView]);

  const handleTabChange = (tabId: AcademicsSubView) => {
    setActiveTab(tabId);
    if (externalSetSubView) {
      externalSetSubView(tabId);
    }
    if (typeof window !== "undefined") {
      history.replaceState(null, "", `#${tabId}`);
    }
  };

  return (
    <>
      <div className="w-full space-y-0 bg-white text-slate-800 font-sans overflow-x-hidden" id="academics-view-container" style={{ zoom: 0.95 }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

          #academics-view-container * {
            font-family: 'Inter', sans-serif;
          }


         .about-nav-tab {
          padding: 10px 10px;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 0px;
          appearance: none;
          -webkit-appearance: none;
          cursor: pointer;
          transition: all 0.2s ease;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-align: center;
          border: none;
          outline: none;
        }

  .about-nav-tab.active {
    background: #F5C330;
    color: #0d1f3c;
  }

  .about-nav-tab:not(.active) {
    background: transparent;
    color: rgba(255,255,255,0.7);
  }

  .about-nav-tab:not(.active):hover {
    color: #ffffff;
  }

    /* Hover button matching AboutView section 5 */
  .curriculum-btn {
    position: relative;
    overflow: hidden;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 26px;
    background: #ffffff;
    color: #020816;
    border-radius: 0;
    box-sizing: border-box;
    font-weight: 600;
    font-size: 14px;
    border: none;
    cursor: pointer;
    transition: color .35s ease, transform 0.25s ease, box-shadow 0.25s ease;
    text-decoration: none;
  }

  .curriculum-btn:hover {
    transform: translateY(-3px);
  }

  .curriculum-btn-bg {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: #60BADC;
    transition: left 0.45s ease;
    z-index: 0;
  }
  .curriculum-btn-content {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: color .35s ease;
  }

  .curriculum-btn:hover .curriculum-btn-bg {
    left: 0;
  }

  .curriculum-btn:hover .curriculum-btn-content {
    color: white;
  }

  .curriculum-btn:hover svg {
    color: white;
    transform: translateX(4px);
    transition: .3s;
  }
        `}</style>

        {/* Immersive hero — matches About's hero exactly (image + navy gradient + gold accent line) */}
        <section className="relative w-full overflow-hidden flex items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]" style={{ background: NAVY }}>
          {/* dot grid texture, top-left */}
          <div
            className="absolute left-0 top-0 h-full w-full opacity-[0.06]"
            style={{
              backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          {/* building photo, right half, blended into navy */}
          <div
            className="absolute inset-0 hidden sm:block"
            style={{
              backgroundImage: "url('/building-image1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          {/* mobile fallback: fixed backgrounds behave inconsistently on touch devices, so use a static cover image there */}
          <div
            className="absolute inset-0 sm:hidden"
            style={{
              backgroundImage: "url('/building-image1.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #020816 0%, rgba(2,8,22,0.88) 20%, rgba(2,8,22,0.55) 48%, rgba(2,8,22,0.7) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(180deg, rgba(2,8,22,0.15) 0%, rgba(2,8,22,0.35) 100%)" }}
          />

          {/* decorative hexagon, top-right */}
          {/* decorative hexagon cluster, top-right */}
          {/* decorative hexagon cluster, top-right */}
          <svg
            className="pointer-events-none absolute -right-16 -top-24 hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
            viewBox="0 0 400 400"
            fill="none"
          >
            {[
              { cx: 290, cy: 70, opacity: 0.35 },
              { cx: 230, cy: 130, opacity: 0.3 },
              { cx: 350, cy: 130, opacity: 0.4 },
              { cx: 170, cy: 190, opacity: 0.25 },
              { cx: 290, cy: 190, opacity: 0.75, highlight: true },
              { cx: 350, cy: 250, opacity: 0.3 },
              { cx: 230, cy: 250, opacity: 0.3 },
              { cx: 290, cy: 310, opacity: 0.35 },
            ].map((hex, i) => {
              const r = 40;
              const pts = Array.from({ length: 6 })
                .map((_, k) => {
                  const a = (k * 60 * Math.PI) / 180 - Math.PI / 2;
                  const px = (hex.cx + r * Math.cos(a)).toFixed(2);
                  const py = (hex.cy + r * Math.sin(a)).toFixed(2);
                  return `${px},${py}`;
                })
                .join(" ");
              return (
                <polygon
                  key={i}
                  points={pts}
                  stroke={GOLD}
                  strokeWidth={hex.highlight ? "2" : "1.5"}
                  strokeOpacity={hex.opacity}
                />
              );
            })}
          </svg>
          <div className="relative z-10 w-full px-6 py-12 sm:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-xl"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8" style={{ background: GOLD }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ color: GOLD, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
                >
                  Learning Without Limits
                </span>
              </div>

              <h1
                className="font-extrabold text-white"
                style={{
                  fontSize: "clamp(48px, 6.5vw, 82px)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                }}
              >
                Academics
              </h1>

              <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

              <p className="max-w-sm text-[15px] leading-relaxed text-white/80 text-justify">
                From foundational knowledge to advanced learning, our academic programs are designed to foster critical thinking, innovation, and academic excellence.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="w-full py-16 sm:py-20">
          {/* Sub-nav  */}
          <div className="flex justify-center mb-10 px-4 sm:px-6 lg:px-8" id="academics-nav">
            <div className="flex w-full max-w-3xl bg-[#0d1f3c] p-2">
              {[
                { id: "curriculum", label: "Curriculum Overview" },
                { id: "timings", label: "Daily Schedules" },
                { id: "calendar", label: "Academic Calendar" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as AcademicsSubView)}
                  className="relative flex-1 py-3 text-sm font-semibold uppercase tracking-wider overflow-hidden cursor-pointer"
                  id={`nav-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  role="tab"
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeAcademicTab"
                      className="absolute inset-0 bg-[#F5C330] z-0"
                      transition={{
                        type: "spring",
                        stiffness: 220,
                        damping: 28,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-300 ${activeTab === tab.id
                      ? "text-[#0D1F3C]"
                      : "text-white"
                      }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* ============================================================
              1. CURRICULUM OVERVIEW
          ============================================================ */}
          {activeTab === "curriculum" && (
            <div className="space-y-0 animate-fadeIn" id="curriculum" data-section="curriculum">

              {/* ============================================================
                  1a. OVERVIEW
              ============================================================ */}
              <section id="section-overview" className="py-6 sm:py-8">
                <OverviewSection />
              </section>

              {/* ============================================================
                  1b. FINLAND / CAMBRIDGE DUAL CORE
              ============================================================ */}
              <section id="section-dual-core" className="py-6 sm:py-8">
                <DualAcademicCoreSection />
              </section>

              {/* ============================================================
                  1c. TEACHING METHODOLOGY
              ============================================================ */}
              <section id="section-methodology" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <TeachingMethodologySection />
              </section>


              {/* ============================================================
                  1d. SCHOOL LEVELS SHOWCASE
              ============================================================ */}
              <section id="section-school-levels" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <SchoolLevelsShowcaseSection setSubView={handleTabChange} />
              </section>

            </div>
          )}

          {/* ============================================================
              2. SCHOOL TIMINGS
          ============================================================ */}
          {activeTab === "timings" && (
             <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn" id="timings" data-section="timings">
              <SectionHeading
                eyebrow="Daily Hours"
                heading="School Hours & "
                accent={<span style={{ color: "#60BADC" }}>Office Timings</span>}
                dividerColor="#F5C330"
              />

              <div className="bg-white border border-slate-100 rounded-sm shadow-sm overflow-hidden border-t-4 border-[#F5C330] shadow-md">
                <div className="bg-[#0d1f3c] text-white p-5 grid grid-cols-2 text-xs font-bold uppercase tracking-widest font-mono">
                  <span>Section / Office</span>
                  <span>Daily Timing (Mon - Fri)</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="p-5 grid grid-cols-2 items-center">
                    <span className="font-bold text-slate-900 text-sm">Student Class Timings</span>
                    <span className="font-mono text-[#0d1f3c] font-bold flex items-center gap-1.5 text-xs">
                      <Clock className="w-4 h-4 text-[#F5C330]" />
                      8:30 AM to 2:00 PM
                    </span>
                  </div>
                  <div className="p-5 grid grid-cols-2 items-center">
                    <span className="font-bold text-slate-900 text-sm">Administrative Office Hours</span>
                    <span className="font-mono text-slate-900 font-bold flex items-center gap-1.5 text-xs">
                      <Clock className="w-4 h-4 text-slate-400" />
                      9:00 AM to 2:00 PM
                    </span>
                  </div>
                </div> 
              </div>

              <div className="p-6 border  bg-slate border-l-4 border-[#F5C330]  text-xs text-slate leading-relaxed text-center">
                               <strong>Parental Note:</strong> Parents must ensure that children arrive at school by
                8:20 AM.
              </div>
            </div>
          )}

          {/* ============================================================
              3. ACADEMIC CALENDAR
          ============================================================ */}
          {activeTab === "calendar" && (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn" id="calendar" data-section="calendar">
              <SectionHeading
                eyebrow="Yearly Milestones"
                heading="Academic Term "
                accent={<span style={{ color: "#F5C330" }}>Schedules</span>}
                dividerColor="#60BADC"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Term 1 Card */}
                <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-[#F5C330] hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#0d1f3c] bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-sm inline-block uppercase tracking-wider text-[10px] font-mono">
                  January - May - Spring Session
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">Term Commencement</span>
                      <span className="font-mono text-[#0d1f3c] font-bold"> 5 January, 2026</span>
                    </div>
                  </div>
                </div>

                {/* Term 2 Card */}
                <div className="bg-white border border-slate-100 rounded-sm p-8 shadow-sm space-y-6 border-t-4 border-[#0d1f3c] hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-[#F5C330] bg-[#0d1f3c] border border-slate-800 px-4 py-2.5 rounded-sm inline-block uppercase tracking-wider text-[10px] font-mono">
                    August - December - Fall Session
                  </h3>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex justify-between border-b border-slate-100 pb-2">
                      <span className="font-bold text-slate-900">Term Commencement</span>
                      <span className="font-mono text-[#0d1f3c] font-bold">August 1, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
          FOOTER HERO BANNER — rendered OUTSIDE the zoomed container
          so its "w-screen" / "-ml-[50vw]" breakout math is based on the
          real viewport, not the scaled-down zoom box. Only shown on the
          curriculum tab, right after the zoomed content.
      ============================================================ */}
      {activeTab === "curriculum" && (
        <section id="section-academics-hero">
          <AcademicsHeroBanner />
        </section>
      )}
    </>
  );
}