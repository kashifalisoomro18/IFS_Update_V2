/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  Trophy,
  Calendar,
  Users,
  Award,
  Gem,
  Compass,
  Landmark,
  Atom,
  Trees,
  GraduationCap,
  HeartHandshake,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  Map,
  Star,
  Sun,
  Image as ImageIcon,
  ChevronLeft
} from "lucide-react";
const NAVY = "#0d1f3c";
const GOLD = "#F5C330";
const SKY = "#60BADC";

/* ============================================================
   DATA FOR EDUCATIONAL TRIP
============================================================ */

interface Trip {
  label: string;
  icon: React.ElementType;
  photos: string[];
  desc: string;
}

const trips: Trip[] = [
  {
    label: "Museums",
    icon: Landmark,
    photos: ["/tour1.jpg", "/g1.jpg", "/g2.jpg"],
    desc: "Discover history and art."
  },
  {
    label: "Science Centres",
    icon: Atom,
    photos: ["/sci1.jpg", "/sci2.jpg", "/lab1.jpg"],
    desc: "Interactive learning."
  },
  {
    label: "Historical Sites",
    icon: Compass,
    photos: ["/tour2.jpg", "/building-image.jpeg"],
    desc: "Walk through time."
  },
  {
    label: "Nature Parks",
    icon: Trees,
    photos: ["/playground1.jpg", "/play.jpg"],
    desc: "Explore the outdoors."
  },
  {
    label: "University Visits",
    icon: GraduationCap,
    photos: ["/g1.jpg", "/tour1.jpg"],
    desc: "Inspiring futures."
  },
  {
    label: "Community Service",
    icon: HeartHandshake,
    photos: ["/g2.jpg", "/play1.jpg"],
    desc: "Giving back to society."
  },
];

/* ============================================================
   ANIMATED COUNTER
============================================================ */

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = Math.max(1, Math.abs(Math.floor(duration / Math.max(end, 1))));
    const timer = setInterval(() => {
      start += Math.ceil(end / 40);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix && <span className="text-[#F5C330]">{suffix}</span>}
    </span>
  );
};

/* ============================================================
   MAIN VIEW
============================================================ */

export default function ActivitiesView({ setView }: { setView?: (view: string) => void }) {
  const [activeTab, setActiveTab] = useState<"house" | "trips">("house");

  // Lightbox State
  const [lightboxTrip, setLightboxTrip] = useState<Trip | null>(null);
  const [lightboxPhotoIndex, setLightboxPhotoIndex] = useState(0);

  // What Students Gain Hover State
  const [hoveredGainIdx, setHoveredGainIdx] = useState<number | null>(null);

  const overallStats = [
    { icon: Gem, value: 4, suffix: "", label: "HOUSES" },
    { icon: Calendar, value: 130, suffix: "+", label: "EVENTS / YEAR" },
    { icon: Users, value: 1100, suffix: "+", label: "STUDENTS INVOLVED" },
    { icon: Map, value: 25, suffix: "+", label: "TRIPS / YEAR" },
  ];

  return (
    <div className="w-full bg-[#fcfcfd] text-slate-800 font-sans overflow-hidden" id="activities-view-container" style={{ zoom: 0.95 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        #activities-view-container {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', sans-serif;
        }

        .section-divider {
          width: 80px;
          height: 6px;
          background: linear-gradient(90deg, #F5C330, #f8d873);
         
          margin-top: 16px;
        }

        .gold-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 32px;
          background: #FFFFFF;
          color: #0d1f3c;
          font-weight: 700;
          font-size: 1rem;
          letter-spacing: 0.02em;
         
          cursor: pointer;
          transition: color 0.35s ease, box-shadow 0.35s ease;
        }
        .gold-btn-bg {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: #60BADC;
          transition: left 0.45s ease;
          z-index: 0;
        }
        .gold-btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color 0.35s ease;
        }
        .gold-btn:hover .gold-btn-bg {
          left: 0;
        }
        .gold-btn:hover .gold-btn-content {
          color: #ffffff;
        }
        .gold-btn:hover svg {
          color: #F5C330;
          transform: translateX(4px);
          transition: 0.3s;
        }
        .gold-btn:hover {
          box-shadow: 0 14px 32px rgba(13,31,60,0.4);
        }

        .glass-badge {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 8px 16px;
          
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-size: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        /* Tab Switcher */
        .tab-switcher {
          background: #0d1f3c;
          padding: 8px;
          box-shadow: 0 10px 30px rgba(13, 31, 60, 0.08);
          display: inline-flex;
          position: relative;
          z-index: 10;
        }
        .nav-tab {
          position: relative;
          padding: 14px 32px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          border: none;
          outline: none;
          background: transparent;
          overflow: hidden;
        }
        .tab-pill {
          position: absolute;
          inset: 0;
          background: #F5C330;
          box-shadow: 0 4px 15px rgba(13, 31, 60, 0.2);
          z-index: 0;
        }
        .tab-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .nav-tab.active {
          color: ;
        }
        .nav-tab:not(.active) {
          background: transparent;
          color: rgba(255,255,255,0.7);
        }
        .nav-tab:not(.active):hover {
         color: #ffffff;
        }

        /* Modern House Cards */
        .house-block {
          position: relative;
         
          background: #ffffff;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          border: 1px solid rgba(0,0,0,0.02);
        }
        .house-block:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 60px rgba(0,0,0,0.08);
        }
        .house-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 400px;
          overflow: hidden;
        }
        .house-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .house-block:hover .house-image-wrapper img {
          transform: scale(1.05);
        }
        .house-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%);
        }
        .house-gem-icon {
          width: 60px;
          height: 60px;
         
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        /* Educational trip cards */
        .premium-trip-card {
          position: relative;
         
          overflow: hidden;
          aspect-ratio: 4/5;
          cursor: pointer;
        }
        .premium-trip-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .premium-trip-card:hover img { 
          transform: scale(1.1); 
        }
        .premium-trip-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,31,60,0.9) 0%, rgba(13,31,60,0.2) 50%, rgba(13,31,60,0) 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          transition: all 0.4s ease;
          pointer-events: none;
        }
        .premium-trip-card:hover .premium-trip-overlay {
          background: linear-gradient(to top, rgba(13,31,60,0.95) 0%, rgba(13,31,60,0.4) 60%, rgba(13,31,60,0.1) 100%);
        }
        .trip-icon-box {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          display: flex; align-items: center; justify-content: center;
          color: white;
          margin-bottom: 16px;
          border: 1px solid rgba(255,255,255,0.3);
          transition: transform 0.4s ease, background 0.4s ease;
        }
        .premium-trip-card:hover .trip-icon-box {
          transform: translateY(-5px);
          background: #F5C330;
          color: #0d1f3c;
          border-color: #F5C330;
        }

        .stats-ticker {
          background: #0d1f3c;
          color: white;
          position: relative;
          overflow: hidden;
        }
        .stats-ticker::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
        
          opacity: 0.05;
          pointer-events: none;
        }

        /* Gain Cards (Benefits & Services style) */
        .gain-card {
          background: #ffffff;

          padding: 40px 30px 30px 30px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.4s ease, box-shadow 0.4s ease;
          height: 100%;
          position: relative;
          margin-top: 20px; /* space for the top badge */
        }
        .gain-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .gain-badge {
          position: absolute;
          top: -24px;
          left: 30px;
          width: 48px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          /* Shield shape via clip-path */
          clip-path: polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%);
          z-index: 2;
        }
        .gain-number-watermark {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 3rem;
          font-weight: 900;
          color: rgba(0,0,0,0.04);
          line-height: 1;
          z-index: 1;
        }
        .gain-card-content {
          position: relative;
          z-index: 3;
        }
        .gain-bullet {
          font-weight: 800;
          font-size: 0.9rem;
          margin-top: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
      `}</style>

      {/* Lightbox for Trip Images */}
      <AnimatePresence>
        {lightboxTrip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 sm:p-8"
          >
            <div className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center">

              <div className="absolute top-4 right-4 z-50 text-white/70 bg-black/50 p-3 rounded-full hover:text-white transition-colors cursor-pointer" onClick={() => setLightboxTrip(null)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </div>

              {lightboxTrip.photos.length > 1 && (
                <>
                  <button
                    className="absolute left-4 z-50 text-white/70 bg-black/50 p-3  hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxPhotoIndex((prev) => (prev - 1 + lightboxTrip.photos.length) % lightboxTrip.photos.length);
                    }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>
                  <button
                    className="absolute right-4 z-50 text-white/70 bg-black/50 p-3  hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxPhotoIndex((prev) => (prev + 1) % lightboxTrip.photos.length);
                    }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                </>
              )}

              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxPhotoIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "tween", duration: 0.3 }}
                  src={lightboxTrip.photos[lightboxPhotoIndex]}
                  alt="Full size view"
                  className="max-w-full max-h-[80vh] object-contain  shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </AnimatePresence>

              <div className="text-white mt-6 text-center">
                <h3 className="text-2xl font-bold mb-1">{lightboxTrip.label}</h3>
                <p className="text-white/70">Image {lightboxPhotoIndex + 1} of {lightboxTrip.photos.length}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
    1. HERO SECTION 
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
            backgroundImage: "url('building-image1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* mobile fallback: fixed backgrounds behave inconsistently on touch devices, so use a static cover image there */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage: "url('building-image1.jpg')",
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
                Beyond the Classroom
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
              Activities
            </h1>

            <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

            <p className="max-w-sm text-[15px] leading-relaxed text-white/70">
              Sports, clubs, and events that build character, teamwork, and lifelong passions.
            </p>
          </motion.div>
        </div>
      </section>
      {/* ============================================================
          2. INTRO
      ============================================================ */}
      <section className="py-20 px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="w-8 h-px bg-[#020618]" />

            <span
              style={{
                fontFamily:
                  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                display: "inline-block",
                color: "#020816",
                fontSize: "12px ",
                fontWeight: 800,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              CO-CURRICULAR ACTIVITIES
            </span>

            <span className="w-8 h-px bg-[#020618]" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black text-[#0D1F3C] leading-tight">
            A Vibrant  <br />
            <span className="text-[#F5C330]">Community Spirit</span>
          </h2>

          {/* Accent Line */}
          <div className="w-18 h-1 bg-[#60BADC] mx-auto mt-8 mb-15 " />

          {/* Paragraphs wrapper — squiggle lives only here, scoped to this block */}
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F3F5FA] py-20">
            <div className="max-w-4xl mx-auto px-8">

              {/* Description */}
              <p className="text-[#020816] text-justify text-lg leading-8 mb-6 relative z-10">
                Learning at Isra Foundation School extends well beyond the classroom.
                Our co-curricular programme is built on two pillars: a House System
                that channels healthy competition into teamwork and leadership, and a
                calendar of educational trips that turns lessons into real-world
                experiences.
              </p>

              <p className="text-[#020816] text-justify text-lg leading-8 relative z-10">
                Together, these programmes give every student a stage to compete,
                create, explore, and lead — building the confidence and character
                that carry them well beyond their school years.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          3. TAB SWITCHER
      ============================================================ */}
      <div className="flex justify-center pb-16 px-6 sticky top-24 z-50 mt-10">
        <div className="tab-switcher">
          <button
            className={`nav-tab ${activeTab === "house" ? "active" : ""}`}
            onClick={() => setActiveTab("house")}
            role="tab"
          >
            {activeTab === "house" && (
              <motion.span
                layoutId="tab-pill"
                className="tab-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="tab-content">
              <Trophy className="w-5 h-5" /> The House System
            </span>
          </button>
          <button
            className={`nav-tab ${activeTab === "trips" ? "active" : ""}`}
            onClick={() => setActiveTab("trips")}
            role="tab"
          >
            {activeTab === "trips" && (
              <motion.span
                layoutId="tab-pill"
                className="tab-pill"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="tab-content">
              <Compass className="w-5 h-5" /> Educational Trips
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "house" ? (
          <motion.div
            key="house-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* ============================================================
                4a. HOUSE SYSTEM (4 Distinct Cards Unrolled)
            ============================================================ */}
            <section id="house-system" className="pb-24 px-6 lg:px-12 mt-6">
              <div className="max-w-7xl mx-auto">

                {/* ── Section header ─────────────────────────────────── */}
                <motion.div
                  className="text-center mb-30"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl sm:text-5xl font-black text-[#020816] mb-6">
                    Four Houses <br />
                    <span className="text-[#60BADC] mt-2 inline-block">One School , One Family</span>
                  </h2>
                  <p className="text-[#020816] text-lg max-w-2xl mx-auto text-justify">
                    At Isra Foundation School, we believe that life outside the
                    classroom is just as important as the learning that happens
                    inside it. Our House System and carefully curated
                    educational trips are designed to build confidence, teamwork,
                    and real-world understanding in every student.
                  </p>
                </motion.div>

                <div className="space-y-40">

                  {/* House 1: Peridots */}
                  <motion.div
                    className="house-block flex flex-col lg:flex-row items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center order-2 lg:order-1">
                      <div className="flex items-center gap-4 mb-6">
                        {/* <div className="house-gem-icon" style={{ background: "#016B4F" }}>
                        <Gem className="w-8 h-8" />
                      </div> */}
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-[#020816] mb-1"> House of</p>
                          <h3 className="text-4xl sm:text-5xl font-black text-[#016B4F] leading-none"> Peridots</h3>
                        </div>
                      </div>

                      <p className="text-xl font-medium mb-6" style={{ color: "#016B4F" }}>
                        "Growth,Harmony & Perseverance"
                      </p>

                      <p className="text-[#020816]text-justify font-medium  mb-8">
                        The House of Peridots represents growth, harmony, and perseverance. We strive for excellence in all that we do and support one another to reach greater heights.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {["Inter-house Sports", "Cultural Celebrations", "Quiz & Debate", "Student Leadership", "Science & Art Exhibitions", "Annual House Championship"].map((a, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 " style={{ background: "#016B4F" }} />
                            <span className="text-sm font-semibold text-[#020816]">{a}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#016B4F]">
                        <div>
                          <Trophy className="w-6 h-6 mb-2" style={{ color: "#016B4F" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={22} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#016B4F] tracking-wider">Sports Wins</p>
                        </div>
                        <div>
                          <Calendar className="w-6 h-6 mb-2" style={{ color: "#016B4F" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={34} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#016B4F] tracking-wider">Events</p>
                        </div>
                        <div>
                          <Users className="w-6 h-6 mb-2" style={{ color: "#016B4F" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={280} suffix="+" /></p>
                          <p className="text-xs font-bold uppercase text-[#016B4F] tracking-wider">Members</p>
                        </div>
                        <div>
                          <Award className="w-6 h-6 mb-2" style={{ color: "#016B4F" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={16} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#016B4F] tracking-wider">Leadership Awards</p>
                        </div>
                         {/* Gallery button */}
                        <div className="mt-10">
                          <button
                            onClick={() => {
                              sessionStorage.setItem("galleryScrollTarget", "houses-gallery-section");
                              if (setView) {
                                setView("gallery");
                              } else {
                                window.location.href = "/gallery";
                              }
                            }}
                            className="flex items-center justify-center gap-3 px-10 py-4 text-white text-base font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:gap-4"
                            style={{ background: "#016B4F", minWidth: "220px" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#014f3a")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#016B4F")}
                          >
                            View Gallery
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 order-1 lg:order-2 min-h-[400px] lg:min-h-full relative">
                      <div className="house-image-wrapper">
                        <img src="/Peridot.png" alt="House of Peridots" />
                        <div className="house-image-overlay" />
                      </div>
                    </div>
                  </motion.div>

                  {/* House 2: Celestites */}
                  <motion.div
                    className="house-block flex flex-col lg:flex-row items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center order-2 lg:order-2">
                      <div className="flex items-center gap-4 mb-6">
                        {/* <div className="house-gem-icon" style={{ background: "#0F4C81" }}>
                        <Gem className="w-8 h-8" />
                      </div>*/}
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-[#020816] mb-1"> House of</p>
                          <h3 className="text-4xl sm:text-5xl font-black text-[#0F4C81] leading-none"> Celestites</h3>
                        </div>
                      </div>

                      <p className="text-xl font-medium mb-6" style={{ color: "#0F4C81" }}>
                        "Wisdom,Harmony & Calm Leadership"
                      </p>

                      <p className="text-[#020816] text-justify font-medium mb-8">
                        The House of Celestites represents wisdom, harmony, and calm leadership. We believe in working together with respect and unity to achieve greatness.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {["Inter-house Sports", "Cultural Celebrations", "Quiz & Debate", "Student Leadership", "Science & Art Exhibitions", "Annual House Championship"].map((a, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 " style={{ background: "#0F4C81" }} />
                            <span className="text-sm font-semibold text-[#020816]">{a}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#0F4C81]">
                        <div>
                          <Trophy className="w-6 h-6 mb-2" style={{ color: "#0F4C81" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={18} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#0F4C81] tracking-wider">Sports Wins</p>
                        </div>
                        <div>
                          <Calendar className="w-6 h-6 mb-2" style={{ color: "#0F4C81" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={29} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#0F4C81] tracking-wider">Events</p>
                        </div>
                        <div>
                          <Users className="w-6 h-6 mb-2" style={{ color: "#373838" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={250} suffix="+" /></p>
                          <p className="text-xs font-bold uppercase text-[#0F4C81] tracking-wider">Members</p>
                        </div>
                        <div>
                          <Award className="w-6 h-6 mb-2" style={{ color: "#0F4C81" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={14} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#0F4C81] tracking-wider">Leadership Awards</p>
                        </div>
                        {/* Gallery button */}
                        <div className="mt-10">
                          <button
                            onClick={() => {
                              sessionStorage.setItem("galleryScrollTarget", "houses-gallery-section");
                              if (setView) {
                                setView("gallery");
                              } else {
                                window.location.href = "/gallery";
                              }
                            }}
                            className="flex items-center justify-center gap-3 px-10 py-4 text-white text-base font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:gap-4"
                            style={{ background: "#0F4C81", minWidth: "220px" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#0b3a66")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#0F4C81")}
                          >
                            View Gallery
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 order-1 lg:order-1 min-h-[400px] lg:min-h-full relative">
                      <div className="house-image-wrapper">
                        <img src="/Celestite.png" alt="House of Celestites" />
                        <div className="house-image-overlay" />
                        {/* <div className="absolute bottom-8 left-8">
                        <span className="px-6 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest backdrop-blur-md" style={{ background: "#2563eb99" }}>
                          Celestites
                        </span>
                      </div> */}
                      </div>
                    </div>
                  </motion.div>

                  {/* House 3: Garnets */}
                  <motion.div
                    className="house-block flex flex-col lg:flex-row items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center order-2 lg:order-1">
                      <div className="flex items-center gap-4 mb-6">
                        {/* <div className="house-gem-icon" style={{ background: "#7B0D17" }}>
                        <Gem className="w-8 h-8" />
                      </div>*/}
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-[#020816] mb-1"> House of</p>
                          <h3 className="text-4xl sm:text-5xl font-black text-[#7B0D17] leading-none"> Garnets</h3>
                        </div>
                      </div>

                      <p className="text-xl font-medium mb-6" style={{ color: "#7B0D17" }}>
                        "Courage, Determination & Passion"
                      </p>

                      <p className="text-[#020816] text-justify font-medium mb-8">
                        The House of Garnets represents courage, determination, and passion. We face challenges with strength and lead with confidence.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {["Inter-house Sports", "Cultural Celebrations", "Quiz & Debate", "Student Leadership", "Science & Art Exhibitions", "Annual House Championship"].map((a, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 " style={{ background: "#7B0D17" }} />
                            <span className="text-sm font-semibold text-[#020816]">{a}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#7B0D17]">
                        <div>
                          <Trophy className="w-6 h-6 mb-2" style={{ color: "7B0D17" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={25} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#7B0D17] tracking-wider">Sports Wins</p>
                        </div>
                        <div>
                          <Calendar className="w-6 h-6 mb-2" style={{ color: "7B0D17" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={36} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#7B0D17] tracking-wider">Events</p>
                        </div>
                        <div>
                          <Users className="w-6 h-6 mb-2" style={{ color: "7B0D17" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={300} suffix="+" /></p>
                          <p className="text-xs font-bold uppercase text-[#7B0D17] tracking-wider">Members</p>
                        </div>
                        <div>
                          <Award className="w-6 h-6 mb-2" style={{ color: "7B0D17" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={20} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#7B0D17] tracking-wider">Leadership Awards</p>
                        </div>
                        {/* Gallery button */}
                        <div className="mt-10">
                          <button
                            onClick={() => {
                              sessionStorage.setItem("galleryScrollTarget", "houses-gallery-section");
                              if (setView) {
                                setView("gallery");
                              } else {
                                window.location.href = "/gallery";
                              }
                            }}
                            className="flex items-center justify-center gap-3 px-10 py-4 text-white text-base font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:gap-4"
                            style={{ background: "#7B0D17", minWidth: "220px" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#5a0a10")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#7B0D17")}
                          >
                            View Gallery
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 order-1 lg:order-2 min-h-[400px] lg:min-h-full relative">
                      <div className="house-image-wrapper">
                        <img src="/Garnet.jpg" alt="House of Garnets" />
                        <div className="house-image-overlay" />
                        {/*<div className="absolute bottom-8 left-8">
                        <span className="px-6 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest backdrop-blur-md" style={{ background: "#dc262699" }}>
                          Garnets
                        </span>
                      </div>*/}
                      </div>
                    </div>
                  </motion.div>

                  {/* House 4: Amethysts */}
                  <motion.div
                    className="house-block flex flex-col lg:flex-row items-stretch"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center order-2 lg:order-2">
                      <div className="flex items-center gap-4 mb-6">
                        {/* <div className="house-gem-icon" style={{ background: "#4B2E63" }}>
                        <Gem className="w-8 h-8" />
                      </div>*/}
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest text-[#020816] mb-1"> House of</p>
                          <h3 className="text-4xl sm:text-5xl font-black text-[#4B2E63] leading-none"> Amethysts</h3>
                        </div>
                      </div>

                      <p className="text-xl font-medium mb-6" style={{ color: "#4B2E63" }}>
                        "Creativity, Imagination & Innovation"
                      </p>

                      <p className="text-[#020816] text-justify font-medium mb-8">
                        The House of Amethysts represents creativity, imagination, and innovation. We inspire ideas and turn them into impactful actions.
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-10">
                        {["Inter-house Sports", "Cultural Celebrations", "Quiz & Debate", "Student Leadership", "Science & Art Exhibitions", "Annual House Championship"].map((a, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 " style={{ background: "#4B2E63" }} />
                            <span className="text-sm font-semibold text-[#020816]">{a}</span>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-[#4B2E63]">
                        <div>
                          <Trophy className="w-6 h-6 mb-2" style={{ color: "#4B2E63" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={20} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#4B2E63] tracking-wider">Sports Wins</p>
                        </div>
                        <div>
                          <Calendar className="w-6 h-6 mb-2" style={{ color: "#4B2E63" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={31} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#4B2E63] tracking-wider">Events</p>
                        </div>
                        <div>
                          <Users className="w-6 h-6 mb-2" style={{ color: "#4B2E63" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={270} suffix="+" /></p>
                          <p className="text-xs font-bold uppercase text-[#4B2E63] tracking-wider">Members</p>
                        </div>
                        <div>
                          <Award className="w-6 h-6 mb-2" style={{ color: "#4B2E63" }} />
                          <p className="text-2xl font-black text-[#020816] mb-1"><AnimatedCounter value={18} suffix="" /></p>
                          <p className="text-xs font-bold uppercase text-[#4B2E63] tracking-wider">Leadership Awards</p>
                        </div>
                        {/* Gallery button */}
                        <div className="mt-10">
                          <button
                            onClick={() => {
                              sessionStorage.setItem("galleryScrollTarget", "houses-gallery-section");
                              if (setView) {
                                setView("gallery");
                              } else {
                                window.location.href = "/gallery";
                              }
                            }}
                            className="flex items-center justify-center gap-3 px-10 py-4 text-white text-base font-bold uppercase tracking-widest rounded-none transition-all duration-300 hover:gap-4"
                            style={{ background: "#4B2E63", minWidth: "220px" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#3a1f4d")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "#4B2E63")}
                          >
                            View Gallery
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 order-1 lg:order-1 min-h-[400px] lg:min-h-full relative">
                      <div className="house-image-wrapper">
                        <img src="/Amethyst.png" alt="House of Amethysts" />
                        <div className="house-image-overlay" />
                        {/*<div className="absolute bottom-8 left-8">
                        <span className="px-6 py-2 rounded-full text-white text-sm font-bold uppercase tracking-widest backdrop-blur-md" style={{ background: "#7c3aed99" }}>
                          Amethysts
                        </span>
                      </div>*/}
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </section>

            {/* Overall House System stats bar */}
            <div className="stats-ticker mt-24 py-20 px-6">
              <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 md:divide-x divide-white/10">
                {overallStats.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex flex-col items-center justify-center text-center px-6 group cursor-pointer"
                    >
                      {/* Icon: Sirf is par hover effect rahega (Color change aur position shift) */}
                      <Icon
                        className="w-9 h-9 text-white mb-5 transition-all duration-300 ease-out group-hover:text-[#F5C330] group-hover:-translate-y-2"
                        strokeWidth={1.6}
                      />

                      {/* Numbers: Hover effect remove kar diya hai, yeh hamesha white rahega */}
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                        <AnimatedCounter value={item.value} suffix={item.suffix} />
                      </h2>

                      {/* Label: Hover effect remove kar diya hai, yeh hamesha white/70 rahega */}
                      <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-white/70">
                        {item.label}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>


          </motion.div>
        ) : (
          <motion.div
            key="trips-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* ============================================================
                4b. EDUCATIONAL TRIPS
            ============================================================ */}
            <section id="educational-trips" className="pb-16 px-6 lg:px-12">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-4xl sm:text-5xl font-black text-[#020816] mb-6">
                    Learning Beyond <br />
                    <span className="text-[#F5C330] mt-2 inline-block">The Classroom</span>
                  </h2>
                  <p className="text-[#020816] text-lg max-w-2xl mx-auto text-justify" >
                    Our educational trips transform classroom lessons into
                    unforgettable real-world experiences through exploration and
                    discovery. Click any trip to view its gallery in full size.
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {trips.map((trip, idx) => {
                    const Icon = trip.icon;
                    return (
                      <motion.div
                        key={idx}
                        className="premium-trip-card"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        onClick={() => { setLightboxTrip(trip); setLightboxPhotoIndex(0); }}
                      >
                        <img src={trip.photos[0]} alt={trip.label} />

                        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5  flex items-center gap-1.5 z-10">
                          <ImageIcon className="w-3.5 h-3.5" />
                          {trip.photos.length}
                        </div>

                        <div className="premium-trip-overlay">
                          <div className="trip-icon-box">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {trip.label}
                          </h3>
                          <p className="text-white/80 font-medium text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                            {trip.desc} <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================
          WHAT STUDENTS GAIN (Benefits & Services Style)
      ============================================================ */}
      <section className="py-40 px-6 lg:px-12 bg-slate-50 border-t border-[#020816]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-8 h-px bg-[#020618]" />

              <span
                style={{
                  display: "inline-block",
                  fontFamily:
                    '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  fontSize: "12px",
                  color: "#020816",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                WHY IT MATTERS
              </span>
              <span className="w-8 h-px bg-[#020618]" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-[#020816] mb-4">
              What <span className="text-[#F5C330]">Students</span> Gain
            </h2>
            <div className="w-16 h-1 bg-[#60BADC] mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
            {[
              {
                title: "Builds Confidence",
                desc: "Activities help students believe in themselves and express their abilities.",
                icon: Star,
                color: "#F5C330",
              },
              {
                title: "Develops Skills",
                desc: "Hands-on experiences strengthen communication, creativity, leadership, and problem-solving skills.",
                icon: Sun,
                color: "#60BADC",
              },
              {
                title: "Encourages Teamwork",
                desc: "Students learn collaboration, respect, responsibility, and sportsmanship.",
                icon: Users,
                color: "#60BADC",
              },
              {
                title: "Creates Memories",
                desc: "Every event becomes a meaningful learning experience students will remember for years.",
                icon: ImageIcon,
                color: "#F5C330",
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              const accent = item.color;
              const isHovered = hoveredGainIdx === idx;
              const number = String(idx + 1).padStart(2, "0");

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.09,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setHoveredGainIdx(idx)}
                  onMouseLeave={() => setHoveredGainIdx(null)}
                  style={{
                    position: "relative",
                    background: "#ffffff",

                    paddingTop: "52px",
                    paddingBottom: "24px",
                    paddingLeft: "24px",
                    paddingRight: "24px",
                    border: `2px solid ${isHovered ? accent : "#eef1f5"}`,
                    boxShadow: isHovered
                      ? `0 16px 40px ${accent}30, 0 4px 12px rgba(0,0,0,0.06)`
                      : "0 2px 12px rgba(0,0,0,0.06)",
                    transform: isHovered ? "translateY(-8px)" : "translateY(0)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    overflow: "visible",
                    marginTop: "20px"
                  }}
                >
                  {/* Shield badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-28px",
                      left: "24px",
                      width: "58px",
                      height: "66px",
                      clipPath: "polygon(50% 0%, 100% 12%, 100% 72%, 50% 100%, 0% 72%, 0% 12%)",
                      background: accent,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.3s ease, transform 0.3s ease",
                      transform: isHovered ? "scale(1.12) translateY(-3px)" : "scale(1)",
                      zIndex: 2,
                    }}
                  >
                    <Icon style={{ width: "24px", height: "24px", color: "#ffffff", marginTop: "2px" }} />
                  </div>

                  {/* Number watermark */}
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "18px",
                      fontSize: "3rem", // larger like in AboutView
                      fontWeight: 900,
                      color: isHovered ? `${accent}22` : "rgba(13,31,60,0.04)",
                      lineHeight: 1,
                      pointerEvents: "none",
                      userSelect: "none",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {number}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 800,
                      color: isHovered ? accent : "#0d1f3c",
                      margin: "18px 0 0",
                      lineHeight: 1.3,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* Colored line */}
                  <div
                    style={{
                      width: "32px",
                      height: "3px",
                      background: accent,

                      margin: "10px 0 0",
                      transition: "background 0.3s ease",
                    }}
                  />

                  {/* Description */}
                  <p
                    style={{
                      fontSize: "0.95rem",
                      color: "#6b7280",
                      lineHeight: 1.65,
                      margin: "12px 0 0",
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Footer: number + dot */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginTop: "22px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 800,
                        color: accent,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {number}
                    </span>
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        background: accent,
                        display: "inline-block",
                        transition: "background 0.3s ease",
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. CTA 
      ============================================================ */}
      <section className="relative py-32 px-6 lg:px-12 overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        >
          <img
            src="/playground4.jpg"
            alt="Playground"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0d1f3c]/80 mix-blend-multiply" />
        </motion.div>

        <div className="relative z-10 w-full text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              style={{
                display: "inline-block",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 800,
                padding: "2px 14px",
                borderRadius: 10,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              EXPLORE Co-curricular / Activities
            </span>
            <h2 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-tight">
              Get Involved. <br />
              <span className="text-[#F5C330]">Get Inspired.</span>
            </h2>
            <p className="text-white font-medium text-lg mb-12 max-w-2xl mx-auto ">
              Every student belongs to a house and every term brings a new place
              to explore. Pick a colour, pack a bag, and be part of the moments
              that shape an IFS education.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                className="gold-btn"
                onClick={() => {
                  setActiveTab("house");
                  setTimeout(() => {
                    const el = document.getElementById("house-system");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }, 50);
                }}
              >
                <span className="gold-btn-bg" />
                <span className="gold-btn-content">
                  Find My House

                </span>
              </button>
              {/*<button className="bg-transparent border-2 border-white text-white font-bold rounded-full px-8 py-[14px] hover:bg-white hover:text-[#0d1f3c] transition-all flex items-center gap-2">
                View Trip Calendar <ExternalLink className="w-5 h-5" />
              </button> */}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}