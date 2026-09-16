/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Briefcase,
  Send,
  CheckCircle,
  Upload,
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  FileText,
  Mail,
  Phone,
  Sparkles,
  Award,
  ChevronRight,
  X,
} from "lucide-react";

const NAVY = "#020816";
const GOLD = "#F5C330";
const SKY = "#60BADC";

interface Position {
  title: string;
  type: string;
  requirements: string;
  status: string;
  icon: React.ElementType;
  accent: string;
}

export default function CareersView() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(
    "O Level Chemistry Instructor"
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "O Level Chemistry Instructor",
    experience: "3-5 years",
    coverLetter: "",
    cv: null as File | null,
  });

  const positions: Position[] = [
    {
      title: "O Level Chemistry Instructor",
      type: "FULL-TIME",
      requirements:
        "Master's degree in Chemistry, CAIE certification and 3+ years of teaching experience.",
      status: "IMMEDIATE OPENING",
      icon: GraduationCap,
      accent: GOLD,
    },
    {
      title: "Early Years (ECD) Homeroom Guide",
      type: "FULL-TIME",
      requirements:
        "Bachelor's/Master's in Education. Montessori or Finland-HEI training preferred.",
      status: "ADMISSIONS EXPANSION",
      icon: Users,
      accent: SKY,
    },
    {
      title: "School Security Officer",
      type: "FULL-TIME",
      requirements:
        "Ex-military or certified physical defense coordinator. Hyderabad local resident preferred.",
      status: "SAFETY FOCUS",
      icon: ShieldCheck,
      accent: GOLD,
    },
  ];

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      cv: file,
    }));
  };

  const handlePositionSelect = (position: string) => {
    setSelectedPosition(position);

    setFormData((prev) => ({
      ...prev,
      position,
    }));

    setTimeout(() => {
      document
        .getElementById("career-application-form")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 100);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!formData.cv) return;

    setIsSubmitted(true);
  };

  return (
    <div
      id="careers-view-container"
      className="w-full overflow-hidden bg-[#fcfcfd] text-[#020816]"
      style={{ zoom: 0.95 }}
    >
      {/* ============================================================
          GLOBAL STYLES
      ============================================================ */}

      <style>{`
        #careers-view-container {
          font-family: 'Inter', sans-serif;
        }

        #careers-view-container h1,
        #careers-view-container h2,
        #careers-view-container h3,
        #careers-view-container h4 {
          font-family: 'Inter', sans-serif;
        }

        .career-square {
          border-radius: 0;
        }

        .career-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 28px;
          background: #ffffff;
          color: #020816;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.35s ease;
        }

        .career-btn-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background: #F5C330;
          transform: translateX(-101%);
          transition: transform 0.4s ease;
        }

        .career-btn:hover .career-btn-bg {
          transform: translateX(0);
        }

        .career-btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .career-btn:hover {
          box-shadow: 0 16px 35px rgba(0,0,0,0.18);
        }

        .career-btn:hover svg {
          transform: translateX(4px);
        }

        .career-btn svg {
          transition: transform 0.3s ease;
        }

        .career-grid-pattern {
          background-image:
            linear-gradient(rgba(245,195,48,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,195,48,0.08) 1px, transparent 1px);
          background-size: 36px 36px;
        }

        .career-input {
          width: 100%;
          background: #f7f8fa;
          border: 1px solid #e5e7eb;
          padding: 13px 14px;
          font-size: 13px;
          color: #020816;
          outline: none;
          transition: all 0.25s ease;
        }

        .career-input:focus {
          background: #ffffff;
          border-color: #F5C330;
          box-shadow: 0 0 0 3px rgba(245,195,48,0.10);
        }

        .career-label {
          display: block;
          margin-bottom: 7px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #334155;
        }
      `}</style>

      {/* ============================================================
          1. HERO
      ============================================================ */}

      <section className="relative w-full overflow-hidden flex items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]" style={{ background: NAVY }}>
        {/* dot grid texture, top-left */}
        <div
          className="absolute left-0 top-0 h-full w-full opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* activities photo, right half, blended into navy */}
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

        {/* decorative arc, top-right */}
        {/* decorative hexagon, top-right */}
        <svg
          className="pointer-events-none absolute -right-16 -top-24 hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
          viewBox="0 0 400 400"
          fill="none"
        >
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => {
              const dist = Math.sqrt((row - 2.5) ** 2 + (col - 2.5) ** 2);
              const opacity = Math.max(0.05, 0.5 - dist * 0.1);
              return (
                <rect
                  key={`${row}-${col}`}
                  x={col * 60 + 20}
                  y={row * 60 + 20}
                  width="40"
                  height="40"
                  stroke={GOLD}
                  strokeWidth="1"
                  strokeOpacity={opacity}
                />
              );
            })
          )}
        </svg>

        {/* Grid */}

        <div className="career-grid-pattern absolute inset-0 opacity-50" />
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
                Join the IFS Community
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
              Careers
            </h1>

            <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

            <p className="max-w-sm text-[15px] leading-relaxed text-white/70 text-justify">
              Build meaningful careers in an environment where educators,
              professionals, and support teams work together to shape
              confident, capable, and future-ready students.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("career-openings")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
                className="career-btn"
              >
                <span className="career-btn-bg" />

                <span className="career-btn-content">
                  Explore Opportunities
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. INTRO / STATS
      ============================================================ */}

      <section className="relative bg-white px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-[#020816]" />

                <span
                  style={{
                    fontFamily:
                      "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    display: "inline-block",
                    color: "#020816",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  WORK WITH PURPOSE
                </span>

                <span className="h-px w-8 bg-[#020816]" />
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black leading-tight text-[#020816]">
                More Than
                <br />
                <span className="text-[#F5C330]">Just a Job.</span>
              </h2>

              <div className="mt-7 h-1 w-16 bg-[#60BADC]" />
            </div>

            <div className="flex items-center">
              <p className="text-justify text-[15px] leading-8 text-slate-600">
                At Isra Foundation School, every role contributes to a larger
                purpose. From teaching and academic leadership to student
                wellbeing, administration, and campus safety, our people help
                create an environment where students can learn, explore, and
                grow with confidence.
              </p>
            </div>
          </motion.div>

          {/* Stats */}

          <div className="mt-16 grid grid-cols-2 border border-slate-200 md:grid-cols-4">
            {[
              {
                icon: Users,
                number: "01",
                label: "ONE COMMUNITY",
              },
              {
                icon: GraduationCap,
                number: "01",
                label: "SHARED PURPOSE",
              },
              {
                icon: Award,
                number: "100%",
                label: "STUDENT FOCUSED",
              },
              {
                icon: Briefcase,
                number: "24/7",
                label: "PROFESSIONAL SUPPORT",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="group border-b border-r border-slate-200 p-7 last:border-r-0 md:border-b-0"
                >
                  <Icon
                    className="mb-5 h-7 w-7 text-[#020816] transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[#F5C330]"
                    strokeWidth={1.7}
                  />

                  <div className="text-3xl font-black text-[#020816]">
                    {item.number}
                  </div>

                  <div className="mt-2 font-mono text-[9px] font-bold tracking-[0.16em] text-slate-400">
                    {item.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. OPEN POSITIONS
      ============================================================ */}

      <section
        id="career-openings"
        className="bg-[#F3F5FA] px-6 py-24 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#020816]" />

              <span
                style={{
                  fontFamily:
                    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  display: "inline-block",
                  color: "#020816",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                CURRENT OPPORTUNITIES
              </span>
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-5xl font-black leading-tight text-[#020816]">
              Find Your
              <br />
              <span className="text-[#60BADC]">Next Opportunity.</span>
            </h2>

            <div className="mt-7 h-1 w-16 bg-[#F5C330]" />
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            {/* Jobs */}

            <div className="space-y-5">
              {positions.map((position, index) => {
                const Icon = position.icon;
                const active = selectedPosition === position.title;

                return (
                  <motion.div
                    key={position.title}
                    initial={{ opacity: 0, x: -25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                    }}
                    onClick={() =>
                      handlePositionSelect(position.title)
                    }
                    className={`group relative cursor-pointer border bg-white p-6 transition-all duration-300 sm:p-8 ${active
                      ? "border-[#F5C330] shadow-[0_18px_45px_rgba(2,8,22,0.10)]"
                      : "border-slate-200 hover:-translate-y-1 hover:border-[#60BADC]"
                      }`}
                  >
                    {/* Accent */}

                    <div
                      className="absolute left-0 top-0 h-full w-1"
                      style={{
                        background: position.accent,
                      }}
                    />

                    <div className="flex flex-col gap-7 sm:flex-row sm:items-start">
                      {/* Icon */}

                      <div
                        className="flex h-14 w-14 shrink-0 items-center justify-center"
                        style={{
                          background:
                            active
                              ? position.accent
                              : "#020816",
                        }}
                      >
                        <Icon
                          className="h-6 w-6 text-white"
                          strokeWidth={1.8}
                        />
                      </div>

                      {/* Content */}

                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span
                            className="font-mono text-[9px] font-bold tracking-[0.14em]"
                            style={{
                              color: position.accent,
                            }}
                          >
                            {position.status}
                          </span>

                          <span className="h-1 w-1 bg-slate-300" />

                          <span className="font-mono text-[9px] font-bold tracking-[0.14em] text-slate-400">
                            {position.type}
                          </span>
                        </div>

                        <h3 className="text-xl font-black text-[#020816] sm:text-2xl">
                          {position.title}
                        </h3>

                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
                          {position.requirements}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePositionSelect(position.title);
                          }}
                          className="mt-6 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#020816] transition-colors hover:text-[#F5C330]"
                        >
                          Apply for this position
                          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Side information */}

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-[#020816] p-8 text-white sm:p-10"
            >
              <div className="absolute right-0 top-0 h-24 w-24 border-b border-l border-[#F5C330]/30" />

              <Sparkles className="h-8 w-8 text-[#F5C330]" />

              <h3 className="mt-8 text-2xl font-black">
                Why Join IFS?
              </h3>

              <div className="mt-5 h-1 w-10 bg-[#60BADC]" />

              <div className="mt-8 space-y-6">
                {[
                  "Purpose-driven academic environment",
                  "Collaborative professional culture",
                  "Opportunities for continuous growth",
                  "Student-first working philosophy",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 border-b border-white/10 pb-5"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 bg-[#F5C330]" />

                    <p className="text-sm leading-6 text-white/70">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. APPLICATION SECTION
      ============================================================ */}

      <section className="relative overflow-hidden bg-white px-6 py-24 lg:px-12">


        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            {/* Left */}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-28 lg:h-fit"
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#020816]" />

                <span
                  style={{
                    fontFamily:
                      "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                    display: "inline-block",
                    color: "#020816",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                  }}
                >
                  APPLICATION
                </span>
              </div>

              <h2 className="mt-5 text-4xl sm:text-5xl lg:text-5xl font-black leading-tight text-[#020816]">
                Ready to
                <br />
                <span className="text-[#F5C330]">Join Us?</span>
              </h2>

              <div className="mt-7 h-1 w-16 bg-[#60BADC]" />

              <p className="mt-7 max-w-md text-sm leading-7 text-slate-500">
                Share your professional profile with our academic management
                team. If your experience matches one of our current
                opportunities, our team will contact you for the next step.
              </p>

              <div className="mt-10 border-l-2 border-[#F5C330] bg-[#F8F9FB] p-6">
                <div className="flex gap-4">
                  <FileText className="h-6 w-6 shrink-0 text-[#020816]" />

                  <div>
                    <h4 className="font-bold text-[#020816]">
                      Application Checklist
                    </h4>

                    <p className="mt-2 text-xs leading-6 text-slate-500">
                      Keep your latest CV/resume ready. A concise cover letter
                      explaining your experience and teaching philosophy is
                      recommended.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}

            <motion.div
              id="career-application-form"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-slate-200 bg-white shadow-[0_20px_60px_rgba(2,8,22,0.07)]"
            >
              <div className="border-b-4 border-[#F5C330] bg-[#020816] p-7 text-white sm:p-9">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center bg-[#F5C330]">
                    <Briefcase className="h-6 w-6 text-[#020816]" />
                  </div>

                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-white/50">
                      IFS HUMAN RESOURCES
                    </p>

                    <h3 className="mt-1 text-2xl font-black">
                      Quick Application
                    </h3>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-7 py-20 text-center sm:px-12"
                  >
                    <div className="mx-auto flex h-20 w-20 items-center justify-center bg-[#020816]">
                      <CheckCircle className="h-10 w-10 text-[#F5C330]" />
                    </div>

                    <h3 className="mt-7 text-3xl font-black text-[#020816]">
                      Application Received.
                    </h3>

                    <div className="mx-auto mt-5 h-1 w-12 bg-[#60BADC]" />

                    <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-500">
                      Thank you,{" "}
                      <strong className="text-[#020816]">
                        {formData.name}
                      </strong>
                      . Your application for{" "}
                      <strong className="text-[#020816]">
                        {formData.position}
                      </strong>{" "}
                      has been recorded for review.
                    </p>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData((prev) => ({
                          ...prev,
                          name: "",
                          email: "",
                          phone: "",
                          coverLetter: "",
                          cv: null,
                        }));
                      }}
                      className="mt-8 bg-[#020816] px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#F5C330] hover:text-[#020816]"
                    >
                      Submit Another Application
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6 p-7 sm:p-10"
                  >
                    {/* Name / Email */}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="career-label">
                          Full Name *
                        </label>

                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="career-input"
                        />
                      </div>

                      <div>
                        <label className="career-label">
                          Email Address *
                        </label>

                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          className="career-input"
                        />
                      </div>
                    </div>

                    {/* Phone / Position */}

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="career-label">
                          Phone Number *
                        </label>

                        <div className="relative">

                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            className="career-input pl-10"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="career-label">
                          Applying Position *
                        </label>

                        <select
                          name="position"
                          value={formData.position}
                          onChange={(e) => {
                            handleInputChange(e);
                            setSelectedPosition(e.target.value);
                          }}
                          className="career-input"
                        >
                          {positions.map((position) => (
                            <option
                              key={position.title}
                              value={position.title}
                            >
                              {position.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Experience */}

                    <div>
                      <label className="career-label">
                        Total Experience *
                      </label>

                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="career-input"
                      >
                        <option value="1-2 years">
                          1–2 years
                        </option>
                        <option value="3-5 years">
                          3–5 years
                        </option>
                        <option value="5+ years">
                          5+ years
                        </option>
                        <option value="10+ years">
                          10+ years
                        </option>
                      </select>
                    </div>

                    {/* Cover letter */}

                    <div>
                      <label className="career-label">
                        Brief Cover Letter
                      </label>

                      <textarea
                        name="coverLetter"
                        rows={5}
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us briefly about your experience, strengths and professional goals..."
                        className="career-input resize-none"
                      />
                    </div>

                    {/* CV Upload */}

                    <div>
                      <label className="career-label">
                        CV / Resume *
                      </label>

                      <label
                        className={`group flex cursor-pointer items-center justify-between border p-5 transition-all ${formData.cv
                          ? "border-[#F5C330] bg-[#FFFDF4]"
                          : "border-dashed border-slate-300 bg-[#F8F9FB] hover:border-[#60BADC] hover:bg-white"
                          }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-11 w-11 items-center justify-center ${formData.cv
                              ? "bg-[#F5C330]"
                              : "bg-[#020816]"
                              }`}
                          >
                            {formData.cv ? (
                              <CheckCircle className="h-5 w-5 text-[#020816]" />
                            ) : (
                              <Upload className="h-5 w-5 text-white" />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-bold text-[#020816]">
                              {formData.cv
                                ? formData.cv.name
                                : "Upload your CV / Resume"}
                            </p>

                            <p className="mt-1 text-[10px] text-slate-400">
                              PDF, DOC or DOCX • Maximum recommended size 5MB
                            </p>
                          </div>
                        </div>

                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>

                      {formData.cv && (
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              cv: null,
                            }))
                          }
                          className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-red-500"
                        >
                          <X className="h-3 w-3" />
                          Remove file
                        </button>
                      )}
                    </div>

                    {/* Submit */}

                    <button
                      type="submit"
                      disabled={
                        !formData.name ||
                        !formData.email ||
                        !formData.phone ||
                        !formData.cv
                      }
                      className="group flex w-full items-center justify-center gap-3 bg-[#020816] px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all hover:bg-[#F5C330] hover:text-[#020816] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      Submit My Application
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. CONTACT / CTA
      ============================================================ */}

      <section className="relative overflow-hidden bg-[#020816] px-6 py-28 lg:px-12">
        <div className="career-grid-pattern absolute inset-0 opacity-30" />

        <div className="absolute right-0 top-0 h-48 w-48 border-b border-l border-[#F5C330]/20" />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#F5C330]" />

              <span
                style={{
                  fontFamily:
                    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  display: "inline-block",
                  color: "#F5C330",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                BE PART OF THE JOURNEY
              </span>

              <span className="h-px w-8 bg-[#F5C330]" />
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-white">
              Bring Your
              <br />
              <span className="text-[#F5C330]">Talent to IFS.</span>
            </h2>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
              Great schools are built by great people. If you are passionate
              about education, student development, and meaningful work, we
              would love to hear from you.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() =>
                  document
                    .getElementById("career-application-form")
                    ?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                }
                className="career-btn"
              >
                <span className="career-btn-bg" />

                <span className="career-btn-content">
                  Start Your Application
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>

              <div className="flex items-center gap-3 px-5 py-3 text-white/60">
                <Mail className="h-4 w-4 text-[#60BADC]" />

                <span className="font-mono text-[10px] uppercase tracking-wider">
                  Academic HR Team
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}