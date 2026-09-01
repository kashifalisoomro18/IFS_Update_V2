/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "motion/react";
import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "../types";
import { NEWS_DATA, EVENTS_DATA } from "../data";
import {
  ArrowRight,
  Calendar as CalendarIcon,
  Star,
  Shield,
  Cpu,
  Clock,
  FileText,
  ChevronRight,
  GraduationCap,
  Play,
  Pause,
  Users,
  Target,
  UserCheck,
  Laptop,
  Trophy,
  Award,
  Palette,
  ChevronLeft,
  BookOpen,
  ShieldCheck,
  X,
  Calendar,
  Flag,
  Briefcase,
} from "lucide-react";

import AdmissionsCTA from "./admissions/AdmissionsCTA.tsx"; // ya jo bhi relative path ho
// this is for admission announcement
//import AnnouncementModal, { AnnouncementData } from "./announcement/AdmissionAnnouncementModal.tsx";

// this is for general announcement just uncomment this line of code and comment the above line of code.
import AnnouncementModal, { AnnouncementData } from "./announcement/GeneralAnnouncement.tsx";

import { useAnnouncementPopup } from "./announcement/useAnnouncementPopup";

// this is for the mascot + notice board popup (separate from the admission announcement above)
// import CampusNoticeWidget from "./campus-notice/CampusNoticeWidget.tsx";

interface HomeViewProps {
  setView?: (view: MainView) => void;
  setAboutSubView?: (sub: AboutSubView) => void;
  setAdmissionsSubView?: (sub: AdmissionsSubView) => void;
  setAcademicsSubView?: (sub: AcademicsSubView) => void;
}

/* ------------------------------------------------------------------ */
/*  Animated count-up number used by the Stats section                */
/* ------------------------------------------------------------------ */
function AnimatedCounter({
  value,
  suffix = "",
  duration = 1800,
  numberClassName = "text-slate-900",
  suffixClassName = "text-primary",
}: {
  value: number;
  suffix?: string;
  duration?: number;
  numberClassName?: string;
  suffixClassName?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span
      ref={ref}
      className={`font-sans font-black text-4xl sm:text-5xl tracking-tight tabular-nums ${numberClassName}`}
    >
      {count}
      <span className={suffixClassName}>{suffix}</span>
    </span>
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
}: {
  eyebrow: string;
  heading: React.ReactNode;
  accent?: React.ReactNode;
  description?: string;
  subDescription?: string;
}) {
  return (
    <div style={{ textAlign: "center", marginBottom: "72px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        <span style={{ width: "32px", height: "1px", background: "#0d1f3c" }} />
        <span
          style={{
            display: "inline-block",
            color: "#020816",
            fontSize: "10.8px",
            fontWeight: 800,
            padding: "2px 14px",
            borderRadius: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          }}
        >

          {eyebrow}
        </span>
        <span style={{ width: "32px", height: "1px", background: "#0d1f3c" }} />
      </div>
      <h2
        style={{
          fontSize: "clamp(2rem, 3.15vw, 3rem)",
          fontWeight: 900,
          color: "#020816",
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {heading}
        {accent}
      </h2>
      <div className="section-divider mx-auto my-30" />
      {description && (
        <p className="text-sm sm:text-base text-slate-500 leading-relaxed text-justify max-w-2xl mx-auto mt-4">
          {description}
        </p>
      )}
      {subDescription && (
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-justify max-w-2xl mx-auto mt-2 ">
          {subDescription}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Static content for the new premium section                        */
/* ------------------------------------------------------------------ */
const STATS_DATA = [
  { icon: GraduationCap, value: 300, suffix: "+", label: "Students", highlight: false },
  { icon: Users, value: 40, suffix: "+", label: "Teachers", highlight: false },
  { icon: Star, value: 10, suffix: "+", label: "Years of Excellence", highlight: true },
  { icon: Target, value: 98, suffix: "%", label: "Student Success Rate", highlight: false },
];

const WHY_CHOOSE_DATA = [
  {
    icon: UserCheck,
    title: "Personalized Attention & Instruction",
    description:
      "Dedicated faculty trained to recognize and actively nurture the unique potential of every student through individualized support and guidance.",
  },
  {
    icon: Shield,
    title: "Strong Moral & Character Building",
    description:
      "A balanced educational environment that combines academic excellence with Islamic values, discipline, leadership, and character development.",
  },
  {
    icon: Laptop,
    title: "Tech-Forward Learning Environment",
    description:
      "Modern classrooms equipped with digital learning tools and innovative teaching methods that prepare students for the future.",
  },
];

const ACHIEVEMENTS_DATA = [
  {
    icon: Trophy,
    emoji: "🏆",
    title: "Academic Excellence",
    description: "Students consistently achieve outstanding examination results and top academic rankings.",
    color: "#f5c330",
  },
  {
    icon: Award,
    emoji: "🥇",
    title: "Sports Championships",
    description: "Our students actively participate in regional and national sports competitions with excellent performances.",
    color: "#f5c330",
  },
  {
    icon: Palette,
    emoji: "🎨",
    title: "Co-Curricular Excellence",
    description: "Students showcase creativity and leadership through debates, science fairs, art exhibitions, and cultural events.",
    color: "#f5c330",
  },
];

/* ------------------------------------------------------------------ */
/*  Welcome / Announcement popup content — edit here to change copy   */
/* ------------------------------------------------------------------ */
const ANNOUNCEMENT_DATA: AnnouncementData = {
  eyebrow: "Isra Foundation Schools",
  title: "Admissions Open for Fall 2027",
  description:
    "Applications are now open for undergraduate and postgraduate programs. Apply before the deadline to secure your admission.",
  badgeText: "Admissions Open",
  image: "/Admission_Poster.jpeg",
  imageAlt: "Students at Isra Foundation Schools",
  date: "Deadline: 30 September 2026",
  isNew: true,
  ctaText: "Apply Now",
  secondaryText: "Close",
};

/* ------------------------------------------------------------------ */
/*  Motion variants (shared, so scroll-groups stagger children)       */
/* ------------------------------------------------------------------ */
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function HomeView({
  setView,
  setAboutSubView,
  setAdmissionsSubView,
  setAcademicsSubView,
}: HomeViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Alumni gallery lightbox state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Welcome / Announcement popup — shows once per browser session.
  // Change `enabled: false` here (or clear the sessionStorage key) to turn it off.
  const { isOpen: isAnnouncementOpen, close: closeAnnouncement } = useAnnouncementPopup({
    storageKey: "ifs_announcement_shown",
    enabled: true,
    delayMs: 500,
  });

  const toggleVideo = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  // 6 Carousel Images as requested (2 more than original, and tall height 700px)
  const heroSlides = [
    {
      id: 0,
      image: "assets/slider/slide1.jpg",
      category: "2026-2027",
      eyebrow: "Isra Foundation Schools",
      headline: ["Your Child’s", "Future Begins Here"],
      accentWord: 1,
      sub: "Admissions Open! Secure your child's seat today!.",
      cta: "Apply Now",
      accent: "#60BADC",
    },
    {
      id: 1,
      image: "assets/slider/slide2.jpg",
      category: "ESTABLISHED SINCE 1981",
      eyebrow: "Academic Excellence",
      headline: ["FOUNDED UPON ACADEMIC", "EXCELLENCE"],
      accentWord: 1,
      sub: "Nurturing creative minds, state-of-the-art laboratory facilities, and exceptional placements prepare our students to succeed globally.",
      cta: "Apply Now",
      accent: "#F5C330",
    },
    {
      id: 2,
      image: "assets/slider/slide3.jpg",
      category: "ACTIVE INQUIRY",
      eyebrow: "Holistic Development",
      headline: ["LEARNING BEYOND CLASSROOM", "BOUNDARIES"],
      accentWord: 1,
      sub: "Combining top-tier sports leagues, academic debating platforms, and Finland HEI early childhood active play frameworks.",
      cta: "Apply Now",
      accent: "#60BADC",
    },
    {
      id: 3,
      image: "assets/slider/slide4.jpg",
      category: "DIGITAL LITERACY FOR ALL",
      eyebrow: "STEM Focus",
      headline: ["INNOVATIVE INTERACTIVE", "STEM LABS"],
      accentWord: 1,
      sub: "Continuous research-led curriculum designed to equip student critical thinking with robotics workshops and coding labs.",
      cta: "Apply Now",
      accent: "#F5C330",
    },
    {
      id: 4,
      image: "assets/slider/slide5.jpeg",
      category: "MORAL LEADERSHIP",
      eyebrow: "Values & Ethics",
      headline: ["CHARACTER BUILDING &", "ANCHORED ETHICS"],
      accentWord: 1,
      sub: "Grooming well-rounded, responsible future citizens anchored in integrity, cooperative empathy, and academic precision.",
      cta: "Apply Now",
      accent: "#60BADC",
    },
    {
      id: 5,
      image: "assets/slider/slide6.jpg",
      category: "94% OUTSTANDING GRADES",
      eyebrow: "Cambridge Boarding",
      headline: ["PREPARING FUTURE CAMBRIDGE", "LEADERS"],
      accentWord: 1,
      sub: "A secure environment with qualified O and A Level specialist educators shaping tertiary admission placement success.",
      cta: "Apply Now",
      accent: "#F5C330",
    },
  ];

  const goTo = useCallback((idx: number, dir?: number) => {
    setDirection(dir ?? (idx > activeSlide ? 1 : -1));
    setActiveSlide(idx);
  }, [activeSlide]);

  const next = useCallback(() => goTo((activeSlide + 1) % heroSlides.length, 1), [activeSlide, goTo, heroSlides.length]);
  const prev = useCallback(() => goTo((activeSlide - 1 + heroSlides.length) % heroSlides.length, -1), [activeSlide, goTo, heroSlides.length]);

  // Auto-play interval effect (5.5 seconds)
  useEffect(() => {
    const interval = setInterval(next, 5500);
    return () => clearInterval(interval);
  }, [next]);

  const handleApplyNow = () => {
    setView("admissions");
    setAdmissionsSubView("registration-form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInquire = () => {
    setView("contact");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubNav = (view: MainView, sub: string) => {
    setView(view);
    if (view === "about") setAboutSubView(sub as AboutSubView);
    if (view === "admissions") setAdmissionsSubView(sub as AdmissionsSubView);
    if (view === "academics") setAcademicsSubView(sub as AcademicsSubView);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white text-slate-900 font-sans" id="home-view-container" style={{ zoom: 0.95 }}>

      {/* Welcome / Announcement Popup — appears once per session above everything else */}
      <AnnouncementModal
        isOpen={isAnnouncementOpen}
        onClose={closeAnnouncement}
        onApply={handleApplyNow}
        data={ANNOUNCEMENT_DATA}
      />

      {/* Mascot + notice board — auto-opens a moment after load, auto-closes, click mascot to reopen */}
      {/* <CampusNoticeWidget /> */}

      {/* SECTION 1: Carousel / Hero Slider (Admissions Page Styled, Responsive, Sticky) */}
      <section className="sticky top-0 overflow-hidden select-none w-full h-[calc(100vh-80px)] min-h-[500px] sm:min-h-[600px] max-h-[850px] z-0" id="IFS-hero-slider">

        {/* ── Background slides (always rendered for preload) ──────── */}
        {heroSlides.map((s, i) => (
          <div
            key={s.id}
            className="absolute inset-0"
            style={{ zIndex: 0, pointerEvents: "none" }}
          >
            <div
              className="absolute inset-0 bg-center bg-cover"
              style={{
                backgroundImage: `url('${s.image}')`,
                opacity: 0,
              }}
            />
          </div>
        ))}

        {/* ── Animated slides ──────────────────────────────────────── */}
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={{
              enter: (dir: number) => ({
                clipPath: dir > 0
                  ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                  : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
                zIndex: 2,
              }),
              center: {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                zIndex: 2,
                transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
              },
              exit: {
                zIndex: 1,
                transition: { duration: 1 },
              },
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
            style={{ zIndex: 2, willChange: "clip-path" }}
          >
            {/* Background image with Ken-Burns zoom */}
            <motion.div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url('${heroSlides[activeSlide].image}')` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6.5, ease: "linear" }}
            />

            {/* Multi-layer overlay for deep contrast */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(110deg, rgba(4,10,28,0.97) 0%, rgba(5,14,36,0.93) 20%, rgba(7,19,46,0.85) 42%, rgba(9,24,55,0.6) 64%, rgba(10,28,62,0.25) 82%, transparent 100%)",
              }}
            />
            {/* Bottom vignette */}
            <div className="absolute inset-x-0 bottom-0 h-48" style={{ background: "linear-gradient(to top, rgba(4,10,28,0.85), transparent)" }} />
            {/* Top vignette */}
            <div className="absolute inset-x-0 top-0 h-32" style={{ background: "linear-gradient(to bottom, rgba(4,10,28,0.55), transparent)" }} />
          </motion.div>
        </AnimatePresence>

        {/* ── Thin vertical accent line ─────────────────────────────── */}
        <div
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ left: "8.5%", width: 1, background: "linear-gradient(to bottom, transparent 5%, rgba(96,186,220,0.18) 30%, rgba(96,186,220,0.18) 70%, transparent 95%)", zIndex: 4 }}
        />

        {/* ══════════════ MAIN CONTENT ══════════════════════════════ */}
        <div className="absolute inset-0 flex flex-col" style={{ zIndex: 10 }}>
          <div className="flex-1 flex items-center min-h-0 overflow-hidden">
            <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 xl:px-28 pt-12 sm:pt-20 pb-4 sm:pb-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-12 items-center">

                {/* ── Left text column ── */}
                <div className="lg:col-span-7 xl:col-span-6">

                  {/* Category + eyebrow */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`eyebrow-${activeSlide}`}
                      initial={{ opacity: 0, y: -14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="flex items-center gap-3 mb-7"
                    >
                      <span
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 "
                        style={{ background: heroSlides[activeSlide].accent, color: "#04080c" }}
                      >
                        {heroSlides[activeSlide].category}
                      </span>
                      <span className="text-white text-xs font-semibold tracking-wide hidden sm:block">
                        {heroSlides[activeSlide].eyebrow}
                      </span>
                    </motion.div>
                  </AnimatePresence>

                  {/* Headline — word by word */}
                  <h1 className="mb-4 sm:mb-8 text-white" style={{ fontSize: "clamp(2rem, 3.87vw, 5rem)", lineHeight: 1.05, fontWeight: 900, letterSpacing: "-0.03em" }}>
                    <AnimatePresence mode="wait">
                      <div key={`headline-${activeSlide}`}>
                        {heroSlides[activeSlide].headline.map((line, li) => (
                          <div key={li} className="block">
                            <span style={{ display: "inline-flex", flexWrap: "wrap", gap: "0 0.28em" }}>
                              {line.split(" ").map((w, wi) => (
                                <span key={wi} style={{ overflow: "hidden", display: "inline-block", paddingBottom: "0.2em", marginBottom: "-0.2em" }}>
                                  <motion.span
                                    style={{ display: "inline-block", color: li === heroSlides[activeSlide].accentWord ? heroSlides[activeSlide].accent : "white" }}
                                    initial={{ y: "110%", opacity: 0 }}
                                    animate={{ y: "0%", opacity: 1 }}
                                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 + li * 0.2 + wi * 0.07 }}
                                  >
                                    {w}
                                  </motion.span>
                                </span>
                              ))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </AnimatePresence>
                  </h1>

                  {/* Subtitle */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`sub-${activeSlide}`}
                      className="flex items-start gap-4 mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.75 }}
                    >
                      <div className="shrink-0 w-1  mt-1" style={{ height: 52, background: heroSlides[activeSlide].accent }} />
                      <p className="text-white/80 leading-relaxed" style={{ fontSize: "clamp(0.85rem, 1.17vw, 1.15rem)", maxWidth: 600 }}>
                        {heroSlides[activeSlide].sub}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* CTAs */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`cta-${activeSlide}`}
                      className="flex flex-wrap gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.95 }}
                    >
                      <button
                        onClick={handleApplyNow}
                        className="group relative overflow-hidden inline-flex items-center gap-3 font-bold text-[11.7px] tracking-wide uppercase px-8 py-4 cursor-pointer"
                        style={{ background: heroSlides[activeSlide].accent, color: "#04080c" }}
                      >
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: "rgba(255,255,255,0.18)" }} />
                        {heroSlides[activeSlide].cta}
                        <ArrowRight size={16} className="transition-transform duration-400 group-hover:translate-x-1.5" />
                      </button>
                    </motion.div>
                  </AnimatePresence>

                  {/* Feature pills */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`pills-${activeSlide}`}
                      className="flex flex-wrap gap-3 mt-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, delay: 1.1 }}
                    >
                      {[
                        { icon: BookOpen, text: "Cambridge CAIE" },
                        { icon: ShieldCheck, text: "Safe Campus" },
                        { icon: GraduationCap, text: "O / A Levels" },
                        { icon: Users, text: "15,000+ Students" },
                      ].map(({ icon: Icon, text }) => (
                        <span
                          key={text}
                          className="inline-flex items-center gap-1.5 text-[9.9px] font-semibold px-3 py-1.5"
                          style={{
                            background: "rgba(255,255,255,0.07)",
                            border: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(6px)",
                          }}
                        >
                          <Icon size={11} style={{ color: heroSlides[activeSlide].accent }} />
                          {text}
                        </span>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* ── Right side blank ── */}
              </div>
            </div>
          </div>

          <div
            className="relative shrink-0"
            style={{ zIndex: 20, borderTop: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", background: "rgba(4,10,28,0.55)" }}
          >
            <div className="max-w-[1600px] mx-auto px-6 sm:px-8 lg:px-20 xl:px-28">
              <div className="flex items-center gap-6 py-4">

                {/* Progress bars */}
                <div className="flex-1 flex items-center gap-2">
                  {heroSlides.map((s, i) => (
                    <button
                      key={s.id}
                      className="flex-1 group flex flex-col gap-1.5 cursor-pointer"
                      onClick={() => goTo(i, i > activeSlide ? 1 : -1)}
                    >
                      <div className="relative h-[2px] w-full overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>
                        {i === activeSlide && (
                          <motion.div
                            className="absolute left-0 top-0 h-full rounded-full"
                            style={{ background: heroSlides[activeSlide].accent }}
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 5.5, ease: "linear" }}
                          />
                        )}
                      </div>
                      <span
                        className="text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 hidden sm:block"
                        style={{ color: i === activeSlide ? heroSlides[activeSlide].accent : "rgba(255,255,255,0.3)" }}
                      >
                        {s.category}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Slide counter */}
                <div className="shrink-0 flex items-baseline gap-1 tabular-nums" style={{ fontVariantNumeric: "tabular-nums" }}>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeSlide}
                      initial={{ y: 14, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -14, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-extrabold text-2xl"
                      style={{ color: heroSlides[activeSlide].accent }}
                    >
                      {String(activeSlide + 1).padStart(2, "0")}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-white/25 text-sm font-medium">/ {String(heroSlides.length).padStart(2, "0")}</span>
                </div>

                {/* Arrow controls */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={prev}
                    className="group flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{
                      width: 42, height: 42,
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "white",
                      background: "rgba(255,255,255,0.05)",
                    }}
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={next}
                    className="group flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{
                      width: 42, height: 42,
                      background: heroSlides[activeSlide].accent,
                      color: "#04080c",
                    }}
                    aria-label="Next slide"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Vertical slide number (decorative) ───────────────────── */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3"
          style={{ zIndex: 12 }}
        >
          <div className="w-px h-16" style={{ background: "rgba(255,255,255,0.12)" }} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="font-extrabold tabular-nums"
              style={{
                fontSize: "clamp(3.5rem, 4.5vw, 5rem)",
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                writingMode: "vertical-rl",
                userSelect: "none",
              }}
            >
              {String(activeSlide + 1).padStart(2, "0")}
            </motion.div>
          </AnimatePresence>
          <div className="w-px h-16" style={{ background: "rgba(255,255,255,0.12)" }} />
        </div>
      </section>

      {/* Subsequent sections wrapper with slide-over parallax style */}
      <div className="relative z-10 bg-white space-y-24 pb-24 pt-16 sm:pt-24">


        {/* SECTION 2: Welcome Section with Video Overlap and Grid Collage (Pristine Layout Matching Image 2) */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-8 overflow-hidden" id="IFS-welcome-section ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-40">

            {/* Left Side: Overlapping Collage of Video and 2x2 Images */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 relative flex items-center justify-center"
            >
              {/* Primary Large Video */}
              <div className="w-13/12 aspect-[4/3] bg-slate-950 rounded-sm overflow-hidden relative border-4 border-white -ml-35 group">

                <video
                  ref={videoRef}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source
                    src="/assets/videos/school-video.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-slate-950/20" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleVideo}
                    className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center  hover:bg-primary hover:border-primary transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-white" />
                    ) : (
                      <Play className="w-6 h-6 text-white fill-white" />
                    )}
                  </button>
                </div>

              </div>

              {/* Overlapping 2x2 collage stacked on the right margin */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="hidden xl:grid absolute -right-6 top-1/2 -translate-y-1/2 w-[190px] grid-cols-2 gap-1 bg-white p-1 shadow-xl border border-slate-100 rounded-sm z-20"
              >
                <img
                  src="assets\slider\g1.jpg"
                  alt="Teacher Speaker"
                  className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="assets\slider\g2.jpg"
                  alt="Happy Child Mascot"
                  className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="assets\slider\g3.jpg"
                  alt="Sports Coordination"
                  className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="assets\slider\g4.jpg"
                  alt="Active Classroom"
                  className="w-full aspect-square object-cover border border-slate-100 rounded-sm hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            </motion.div>

            {/* Right Side: Welcome Text in precise typographic configuration */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-6 space-y-6"
            >
              <div>
                {/* Welcome Row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "3px",
                      background: "#F5C330",
                    }}
                  />

                  <span
                    style={{
                      fontSize: "10.8px",
                      fontFamily:
                        '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                      color: "#020618",
                      fontWeight: 800,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                    }}
                  >
                    WELCOME TO
                  </span>
                </div>

                {/* Heading */}
                <h2 className="font-sans font-black text-slate-900 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                  Isra Foundation
                  <br />
                  <span className="text-[#60badc]">School</span>
                </h2>
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal text-justify">
                Welcome to Isra Foundation Schools, where
                academic excellence meets holistic character
                development. We provide a modern, value-driven
                education that equips students with critical thinking
                skills, Islamic ethics, and global competencies.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleSubNav("about", "who-we-are")}
                  className="group relative overflow-hidden bg-slate-950 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 shadow-md rounded-none transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {/* Hover Background */}
                  <span className="absolute inset-0 bg-[#60badc] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

                  {/* Button Text */}
                  <span className="relative z-10 group-hover:text-slate-950 transition-colors duration-300">
                    More About Us
                  </span>
                </button>

                <button
                  onClick={handleInquire}
                  className="group relative overflow-hidden border-2 border-slate-950 bg-white text-slate-950 font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-none transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {/* Hover Background */}
                  <span className="absolute inset-0 bg-[#f5c330] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>

                  {/* Button Text */}
                  <span className="relative z-10 group-hover:black-white transition-colors duration-300">
                    Inquire Now
                  </span>
                </button>

              </div>
            </motion.div>

          </div>
        </section>


        {/* SECTION 2.5: Premium Highlights (Stats + Why Choose Us + Achievements) */}
        <section className="bg-white" id="IFS-premium-highlights">

          {/* --- Statistics / Achievement Counters (full-width colored banner) --- */}
          <div className="w-full bg-[#0f172b] border-y border-slate-200 my-20">
            <div className="max-w-7x2 mx-auto px-6 sm:px-12 lg:px-16 py-14 sm:py-20">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-slate-200 lg:divide-y-0 lg:divide-x lg:divide-slate-200"
              >
                {STATS_DATA.map((stat) => (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    className="group flex flex-col items-center text-center gap-3 py-6 lg:py-0 lg:px-8 cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 6 }}
                      transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    >
                      <stat.icon
                        strokeWidth={1.25}
                        className="w-12 h-12 text-[#ffffff] transition-colors duration-300 group-hover:text-[#f5c330]"
                      />
                    </motion.div>

                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      numberClassName="text-[#ffffff]"
                      suffixClassName="text-primary"
                    />

                    <p className="text-[#ffffff] text-[9.9px] sm:text-xs uppercase tracking-widest font-mono font-bold">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>


          {/* --- Why Choose Isra Foundation School --- */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-24 my-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center space-y-4 mb-16"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-[#020618]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-extrabold text-[#020618]">
                  Our Difference
                </span>
                <span className="w-8 h-px bg-[#020618]" />
              </div>
              <h2 className="font-sans font-black text-[#0e1e38] text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                Why Choose Isra Foundation <span className="text-[#f5c330]">School</span>
              </h2>
              <div style={{ width: 72, height: 4, background: "#60bADC", margin: "0 auto 18px" }} />
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto mt-4">
                We combine dedicated mentorship, strong character formation, and modern learning
                tools to give every student a well-rounded foundation for lifelong success.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {WHY_CHOOSE_DATA.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="group relative h-full flex flex-col bg-white  border border-slate-100 shadow-sm hover:shadow-xl p-8 transition-all duration-300 z-10 overflow-hidden "
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#60badc";
                    e.currentTarget.style.backgroundColor = "rgba(96, 186, 220, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f1f5f9";
                    e.currentTarget.style.backgroundColor = "white";
                  }}
                >
                  {/* Top border accent that scales in on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#60badc] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className="w-14 h-14 rounded-2xl bg-[#60badc]/10 flex items-center justify-center mb-6 group-hover:bg-[#60badc]/20 transition-colors duration-300"
                  >
                    <item.icon className="w-7 h-7 text-[#60badc] transition-colors duration-300" />
                  </motion.div>
                  <h4 className="font-sans font-extrabold text-[#0e1e38] text-xl leading-snug mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal text-justify">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* --- Student Achievement Highlights --- */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-20 " >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl space-y-4 mb-12 text-center mx-auto"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="w-8 h-px bg-[#020618]" />
                <span className="font-mono text-xs uppercase tracking-[0.2em] font-extrabold text-[#020618]">
                  Our PRIDE
                </span>
                <span className="w-8 h-px bg-[#020618]" />
              </div>
              <h2 className="font-sans font-black text-slate-900 text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                Student Achievement <span className="text-[#60badc]"> <br />Highlights</span>
              </h2>
              <div style={{ width: 72, height: 4, background: "#F5C330", margin: "0 auto 18px" }} />
              <p className="text-slate-500 text-xs sm:text-sm font-normal ">
                Celebrating the remarkable accomplishments of our students in academics, sports,
                competitions, leadership, and community service.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 "
            >
              {ACHIEVEMENTS_DATA.map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
                  className="group relative h-full flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-xl p-8 overflow-hidden transition-all duration-300 cursor-default z-10"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#f5c330";
                    e.currentTarget.style.backgroundColor = "rgba(245, 195, 48, 0.04)";
                    const link = e.currentTarget.querySelector(".learn-more-link") as HTMLDivElement;
                    if (link) link.style.color = "#f5c330";
                    const iconWrapper = e.currentTarget.querySelector(".icon-wrapper") as HTMLDivElement;
                    if (iconWrapper) iconWrapper.style.backgroundColor = "rgba(245, 195, 48, 0.15)";
                    const icon = e.currentTarget.querySelector(".highlight-icon") as SVGElement;
                    if (icon) icon.style.color = "#f5c330";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f1f5f9";
                    e.currentTarget.style.backgroundColor = "white";
                    const link = e.currentTarget.querySelector(".learn-more-link") as HTMLDivElement;
                    if (link) link.style.color = item.color;
                    const iconWrapper = e.currentTarget.querySelector(".icon-wrapper") as HTMLDivElement;
                    if (iconWrapper) iconWrapper.style.backgroundColor = `${item.color}15`;
                    const icon = e.currentTarget.querySelector(".highlight-icon") as SVGElement;
                    if (icon) icon.style.color = item.color;
                  }}
                >
                  {/* Top accent bar - expands on hover (Yellowish theme color) */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left "
                    style={{ background: "#f5c330" }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 12 }}
                    className="icon-wrapper w-16 h-16  flex items-center justify-center mb-6 transition-colors duration-300"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <item.icon className="highlight-icon w-7 h-7 transition-colors duration-300" style={{ color: item.color }} />
                  </motion.div>

                  <h4 className="font-sans font-extrabold text-slate text-lg leading-snug mb-3">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-normal text-justify">
                    {item.description}
                  </p>

                  <button
                    onClick={() => handleSubNav("gallery", "")}
                    className="learn-more-link group/btn relative inline-flex w-fit  items-center gap-2 overflow-hidden border border-[#020816] px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#020816] transition-all duration-300 cursor-pointer mt-5"
                  >
                    {/* Hover Background */}
                    <span className="absolute inset-0 origin-left scale-x-0 bg-[#F5C330] transition-transform duration-500 ease-out group-hover/btn:scale-x-100"></span>

                    {/* Content */}
                    <span className="relative z-10 flex items-center gap-2 text-[#020816]">
                      Learn More
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                  </button>

                </motion.div>
              ))}
            </motion.div>
          </div>

        </section>




        {/* SECTION 5: Admission Banner Section (Prisinte Layout Matching Image 5) */}
<section className="relative h-[480px] w-full overflow-hidden flex items-center justify-center text-center px-6 my-50" id="IFS-admission-banner">
  {/* Shadowy background layer with active student crowd overlay */}
  <motion.div
    initial={{ scale: 1.15 }}
    whileInView={{ scale: 1.05 }}
    viewport={{ once: true }}
    transition={{ duration: 2.0 }}
    className="absolute inset-0 bg-cover bg-center bg-fixed opacity-100"
    style={{ backgroundImage: "url('/assets/images/admission.png')" }}
  />
  {/* Dark overlay with low transparency so the image is clearly visible */}
  <div className="absolute inset-0 bg-slate-950/85 mix-blend-multiply z-10" />

  {/* Content Box */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="max-w-4xl mx-auto space-y-6 relative z-20"
  >
    <h2 className="font-sans font-extrabold text-white text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-none">
      Admission
    </h2>
    <p className="text-slate-200 text-sm sm:text-base lg:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
      Admissions at IFS are <strong className="text-primary font-bold">extremely competitive</strong>. We encourage all applicants to apply as early as possible and to carefully review the admissions page before applying. To visit the admissions page and to apply online please click below.
    </p>
    <div className="pt-4">
      <button
        onClick={handleApplyNow}
        className="group relative overflow-hidden bg-white text-slate-950 font-bold text-xs uppercase tracking-widest px-10 py-4 rounded-none shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="absolute inset-0 bg-primary origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
        <span className="relative z-10 transition-colors duration-300 group-hover:text-slate-950">
          APPLY NOW
        </span>
      </button>
    </div>
  </motion.div>
</section>


        {/* SECTION 6: School Levels Overlapping Blocks (Pristine Layout Matching Reference Images) */}
        <section className="space-y-24 overflow-visible" id="fps-school-levels-showcase ">
          <SectionHeading
            eyebrow="Academic Pathways"
            heading="Levels "
            accent={<span style={{ color: "#f5c330" }}> Offered</span>}
          />
          <div style={{ width: 72, height: 4, background: "#60badc", margin: "-100px auto 18px" }} />

          {/* 1. ECD Section Block */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 my-50" id="junior-level-card">
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
                className="bg-[#FDE047]  p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%] ml-auto"
              >

                {/* Left Column: Narrative details and button — slides in from the left */}
                <motion.div
                  initial={{ opacity: 0, x: -120, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-6 z-20 space-y-6 lg:pr-12"
                >
                  <p className="text-[#020618]/85 text-base sm:text-lg leading-relaxed font-normal max-w-md text-justify">
                    At IFS, we see<strong className="text-[#020618] font-extrabold"> Early Childhood Development (ECD) </strong> as a vital stage where children begin to explore the world, build meaningful relationships, and develop essential cognitive, social, emotional, and physical skills. Through a nurturing, safe, and engaging learning environment, we encourage curiosity, creativity, confidence, and a strong foundation for lifelong learning.

                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleSubNav("academics", "curriculum")}
                      className="group relative overflow-hidden bg-white text-slate-700 font-medium text-sm px-7 py-3  shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      {/* Left to Right Background */}
                      <span className="absolute inset-0 bg-[#020816] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                      {/* Text */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        More Details
                      </span>
                    </button>
                  </div>
                </motion.div>

                {/* Right Column: Large image block with golden tint and overlaid text — slides in from the right */}
                <motion.div
                  initial={{ opacity: 0, x: 120, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-6 relative h-[400px] sm:h-[440px] flex items-center justify-center w-full"
                >
                  <div className="absolute inset-0 -top-6 sm:-top-10 bg-slate-950  overflow-hidden shadow-xl z-10 group">
                    <img
                      src="assets/slider/slide4.jpg"
                      alt="Junior school students in lab"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Golden color-wash overlay */}
                    <div className="absolute inset-0 bg-[#FCD34D]/45 mix-blend-color z-15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-20" />

                    {/* Heading — bold + light on two lines, like Elementary card */}
                    <div className="absolute bottom-20 sm:bottom-24 left-6 z-30 select-none">
                      <h3 className="font-sans font-black text-white text-4xl sm:text-5xl leading-[0.9] tracking-tight">
                        ECD
                        <span className="block font-light text-white/90 text-3xl sm:text-4xl mt-0.5">
                          Section
                        </span>
                      </h3>
                    </div>

                    {/* Grade levels — separate, dark charcoal text, below heading */}
                    <div className="absolute bottom-6 left-6 z-30 space-y-0.5 select-none">
                      <span className="text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-widest block font-mono">
                        Grade Levels
                      </span>
                      <span className="text-sm sm:text-base  text-white ">
                        Pre-Nursery - Kindergarten
                      </span>
                    </div>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>

          {/* 2. Elementary  section */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 my-50" id="elementary-level-card">
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
                className="bg-[#e1d8f7] p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%]"
              >

                {/* Left Column: Framed portrait photo + Grade Levels badge + heading */}
                <motion.div
                  initial={{ opacity: 0, x: -120, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-6 relative flex flex-col justify-end min-h-[380px] sm:min-h-[440px] z-10 w-full"
                >

                  {/* Image frame wrapper — light glass border, fits the lavender card */}
                  <div className="relative w-full h-[280px] sm:h-[320px]">

                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                      className="absolute inset-0 w-[82%] sm:w-[78%] h-full overflow-hidden bg-white/60 backdrop-blur-sm p-2 shadow-[0_18px_40px_rgba(31,20,10,0.15)] z-10 border border-white/60"
                    >
                      <img
                        src="assets/slider/slide2.jpg"
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
                      <span className="text-[9px] sm:text-[11px] font-bold text-[020816] uppercase tracking-widest block font-mono">
                        Grade Levels
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#020816]]">
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
                    <h3 className="font-sans font-black text-[#020816] text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                      Elementary
                      <span className="block font-sans font-light text-[#020816]/60 text-4xl sm:text-5xl mt-1">
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
                  className="lg:col-span-6 lg:pl-16 z-20 space-y-6"
                >
                  <p className="text-[#020816]/85 text-base sm:text-lg leading-relaxed font-normal max-w-md text-justify">
                    At <strong className="text-[#020816] font-extrabold">IFS Elementary</strong>, we nurture the development of each child emotionally, academically, physically, socially, and artistically during their formative years.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleSubNav("academics", "curriculum")}
                      className="group relative overflow-hidden bg-white text-slate-700 font-medium text-sm px-7 py-3  shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      {/* Left to Right Background */}
                      <span className="absolute inset-0 bg-[#020816] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                      {/* Text */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        More Details
                      </span>
                    </button>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>

          {/* 3. Middle Section */}
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 my-50" id="alevel-level-card">
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
                className="bg-[#91E5DB] p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%] ml-auto"
              >

                {/* Left Column: Narrative details and button — slides in from the left */}
                <motion.div
                  initial={{ opacity: 0, x: -120, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-6 z-20 space-y-6 lg:pr-12"
                >
                  {/* Small eyebrow tag — gives this card its own top-of-column identity */}
                  {/* <span className="inline-block text-[10px] sm:text-[11px] font-bold text-[#020618] uppercase tracking-widest font-mono border-b-2 border-[#020618] pb-1">
                  Beyond Senior School
                </span> */}

                  <p className="text-[#020618]/85 text-base sm:text-lg leading-relaxed font-normal max-w-md text-justify">
                    At IFS <strong className="text-[#020816] font-extrabold"> Middle Section (Grades VI–VII) </strong>, students are encouraged to strengthen their academic skills, develop critical thinking, and build confidence as independent learners. Through engaging learning experiences, they are prepared to take on greater challenges and grow into responsible, curious, and capable individuals.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleSubNav("academics", "curriculum")}
                      className="group relative overflow-hidden bg-white text-slate-700 font-medium text-sm px-7 py-3  shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      {/* Left to Right Background */}
                      <span className="absolute inset-0 bg-[#020618] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                      {/* Text */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        More Details
                      </span>
                    </button>
                  </div>
                </motion.div>

                {/* Right Column: Angled image block, heading at top, floating grade badge on corner */}
                <motion.div
                  initial={{ opacity: 0, x: 120, scale: 0.92 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-6 relative h-[420px] sm:h-[460px] flex items-center justify-center w-full"
                >
                  {/* Image with angled top edge instead of a plain rectangle */}
                  <div
                    className="absolute inset-0 -top-6 sm:-top-10 bg-slate-950 overflow-hidden shadow-xl z-10 group"
                    style={{ clipPath: "polygon(0% 6%, 100% 0%, 100% 100%, 0% 100%)" }}
                  >
                    <img
                      src="assets/slider/slide6.jpg"
                      alt="A-Level students"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Mint-teal color-wash overlay, matches new card theme */}
                    <div className="absolute inset-0 bg-[#91E5DB]/45 mix-blend-color z-15" />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-transparent to-transparent z-20" />

                    {/* Heading — moved to TOP of image (Junior's sits at the bottom) */}
                    <div className="absolute top-8 sm:top-10 left-6 z-30 select-none">
                      <h3 className="font-sans font-black text-white text-4xl sm:text-5xl leading-[0.9] tracking-tight">
                        Middle
                        <span className="block font-light text-white/90 text-3xl sm:text-4xl mt-0.5">
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
          <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 my-30" id="senior-level-card">
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
                className="bg-[#BAE6FD] p-8 sm:p-12 lg:p-16 relative overflow-visible shadow-lg hover:shadow-2xl transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[460px] w-full sm:w-[92%]"
              >

                {/* Left Column: Image collage + heading */}
                <div className="lg:col-span-6 relative flex flex-col justify-end min-h-[380px] sm:min-h-[440px] z-10 w-full">

                  {/* Image stack wrapper */}
                  <div className="relative w-full h-[280px] sm:h-[320px]">

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
                        src="assets/slider/slide51.jpg"
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
                        src="assets/slider/559005353_1378177237650043_1854500200270735487_n.jpg"
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
                    <h3 className="font-sans font-black text-[#0f172a] text-5xl sm:text-6xl lg:text-7xl leading-[0.85] tracking-tight">
                      Cambridge
                      <span className="block font-sans font-light text-slate-500 text-4xl sm:text-5xl mt-1">
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
                  className="lg:col-span-6 lg:pl-16 z-20 space-y-6"
                >
                  <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-normal max-w-md text-justify">
                    At IFS <strong className="text-slate-950 font-bold">O Level & A Level</strong> provides students with a balanced and enriching learning experience that combines academic excellence with a vibrant co-curricular program. Our aim is to develop confident, independent, and critical thinkers, equipping students with the knowledge, skills, and confidence they need to succeed in their examinations, university, and beyond.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => handleSubNav("academics", "curriculum")}
                      className="group relative overflow-hidden bg-white text-slate-700 font-medium text-sm px-7 py-3  shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
                    >
                      {/* Hover Background */}
                      <span className="absolute inset-0 bg-[#020618] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                      {/* Button Text */}
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                        More Details
                      </span>
                    </button>
                  </div>
                </motion.div>

              </motion.div>
            </div>
          </div>









          {/* SECTION 3: News Masonry Grid (Prisinte Layout Matching Image 3) */}
          <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-8 overflow-hidden mt-70" id="IFS-news-events-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-between items-end border-b border-slate-200 pb-4"
            >
              <div>
                <h3 className="font-sans font-extrabold text-[#0F172A] text-3xl sm:text-4xl tracking-tight">
                  NEWS
                </h3>
                <div className="w-16 h-1 bg-[#F5C330] mt-3 " />
                <p className="text-slate-500 text-sm mt-4">
                  Stay updated with our latest news and updates.
                </p>
              </div>

              <button
                onClick={() => handleSubNav("news-events", "")}
                className="group inline-flex items-center gap-2 text-xs font-extrabold text-[#0F172A] tracking-widest uppercase pb-1 border-b-2 border-[#F5C330] hover:border-[#60BADC] w-fit cursor-pointer transition-colors duration-300"
              >
                View All News
                <ArrowRight className="w-3.5 h-3.5 text-[#0F172A] group-hover:text-[#60BADC] transition-all duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* Grid Structure */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              {/* Big Featured Card on the Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7 h-[420px] bg-slate-950  overflow-hidden relative shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
                  alt="Young Authors"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Ambient Shadow overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent z-10" />

                {/* Title text overlaid perfectly inside container footer */}
                <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                  <span className="bg-secondary text-[#0f172a] font-mono text-[8.1px] uppercase tracking-widest font-extrabold px-2 py-0.5 ">
                    FEATURED EVENT
                  </span>
                  <h4 className="font-sans font-extrabold text-white text-2xl sm:text-3xl leading-snug tracking-tight">
                    Young Authors 2.0
                  </h4>
                  <p className="text-slate-200 text-xs sm:text-sm line-clamp-1">
                    Celebrating outstanding young literary talents from our community of future change makers.
                  </p>
                </div>
              </motion.div>

              {/* Right Side: 2x2 grid of smaller overlay cards */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Card 1 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="h-[202px] bg-slate-950  overflow-hidden relative shadow-md group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&w=400&q=80"
                    alt="Teachers Session"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                      Celebrating You! Teachers Session with the Management
                    </h5>
                  </div>
                </motion.div>

                {/* Card 2 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[202px] bg-slate-950  overflow-hidden relative shadow-md group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?auto=format&fit=crop&w=400&q=80"
                    alt="Fathers Padel"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                      Inter-Campus Fathers' Padel Cup
                    </h5>
                  </div>
                </motion.div>

                {/* Card 3 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="h-[202px] bg-slate-950  overflow-hidden relative shadow-md group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
                    alt="Graduation Ceremony"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                      A'level Graduation Ceremony
                    </h5>
                  </div>
                </motion.div>

                {/* Card 4 */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="h-[202px] bg-slate-950 overflow-hidden relative shadow-md group cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    alt="Teachers Award"
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <h5 className="font-sans font-extrabold text-white text-sm leading-snug">
                      Teachers Award Ceremonies
                    </h5>
                  </div>
                </motion.div>

              </div>

            </div>
          </section>


          {/* SECTION 4: Events Calendar Grid — Premium Date Panel Layout */}
          <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-8 overflow-hidden mt-60" id="IFS-events-calendar">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 border-b border-slate-200 pb-4"
            >
              <div>
                <h3 className="font-sans font-extrabold text-[#0F172A] text-3xl sm:text-4xl tracking-tight">
                  EVENTS
                </h3>
                <div className="w-16 h-1 bg-[#F5C330] mt-3 " />
                <p className="text-slate-500 text-sm mt-4">
                  Stay updated with our latest events and important dates.
                </p>
              </div>

              <button
                onClick={() => handleSubNav("news-events", "")}
                className="group inline-flex items-center gap-2 text-xs font-extrabold text-[#0F172A]  tracking-widest uppercase pb-1 border-b-2 border-[#F5C330] hover:border-[#60BADC] w-fit cursor-pointer transition-colors duration-300"
              >
                View All Events
                <ArrowRight className="w-3.5 h-3.5 text-[#0F172A] group-hover:text-[#60BADC] transition-all duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            {/* 2x2 Premium Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white p-6 flex items-start gap-6 shadow-sm border-l-4 border-[#F5C330]/50 hover:border-[#60BADC] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Icon badge */}
                <div className="absolute top-5 right-5 w-11 h-11  bg-[#F5C330]/10 group-hover:bg-[#60BADC]/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                  <Users className="w-5 h-5 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300" strokeWidth={1.75} />
                </div>

                {/* Floating date panel */}
                <div className="w-[84px] h-[94px] bg-[#F8FAFC] border-t-2 border-[#F5C330] group-hover:border-[#60BADC] shadow-sm flex flex-col items-center justify-center transition-colors duration-300 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300 mb-1" />
                  <span className="text-[#0F172A] font-black text-3xl leading-none">27</span>
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1">July</span>
                </div>

                <div className="flex-1 pt-1">
                  <h4 className="font-sans font-bold text-[#0F172A] text-lg leading-snug">
                    Back to School for Teachers
                  </h4>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Professional development and alignment sessions.
                  </p>

                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="group relative bg-white p-6 flex items-start gap-6 shadow-sm border-l-4 border-[#F5C330]/50 hover:border-[#60BADC] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="absolute top-5 right-5 w-11 h-11 bg-[#F5C330]/10 group-hover:bg-[#60BADC]/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                  <GraduationCap className="w-5 h-5 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300" strokeWidth={1.75} />
                </div>

                <div className="w-[84px] h-[94px] bg-[#F8FAFC] border-t-2 border-[#F5C330] group-hover:border-[#60BADC] shadow-sm flex flex-col items-center justify-center transition-colors duration-300 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300 mb-1" />
                  <span className="text-[#0F172A] font-black text-3xl leading-none">10</span>
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1">August</span>
                </div>

                <div className="flex-1 pt-1">
                  <h4 className="font-sans font-bold text-[#0F172A] text-lg leading-snug">
                    Back to School for Students
                  </h4>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Welcoming our brilliant scholars back to campuses.
                  </p>

                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="group relative bg-white p-6 flex items-start gap-6 shadow-sm border-l-4 border-[#F5C330]/50 hover:border-[#60BADC] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className="absolute top-5 right-5 w-11 h-11 bg-[#F5C330]/10 group-hover:bg-[#60BADC]/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                  <Flag className="w-5 h-5 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300" strokeWidth={1.75} />
                </div>

                <div className="w-[84px] h-[94px] bg-[#F8FAFC] border-t-2 border-[#F5C330] group-hover:border-[#60BADC] shadow-sm flex flex-col items-center justify-center transition-colors duration-300 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300 mb-1" />
                  <span className="text-[#0F172A] font-black text-3xl leading-none">14</span>
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1">August</span>
                </div>

                <div className="flex-1 pt-1">
                  <h4 className="font-sans font-bold text-[#0F172A] text-lg leading-snug">
                    Independence Day
                  </h4>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    National anthem ceremonies and student showcases.
                  </p>

                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="group relative bg-white p-6 flex items-start gap-6 shadow-sm border-l-4 border-[#F5C330]/50 hover:border-[#60BADC] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
              >

                <div className="absolute top-5 right-5 w-11 h-11 bg-[#F5C330]/10 group-hover:bg-[#60BADC]/10 flex items-center justify-center transition-all duration-300 group-hover:rotate-12">
                  <Briefcase className="w-5 h-5 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300" strokeWidth={1.75} />
                </div>

                <div className="w-[84px] h-[94px] bg-[#F8FAFC] border-t-2 border-[#F5C330] group-hover:border-[#60BADC] shadow-sm flex flex-col items-center justify-center transition-colors duration-300 flex-shrink-0">
                  <Calendar className="w-4 h-4 text-[#F5C330] group-hover:text-[#60BADC] transition-colors duration-300 mb-1" />
                  <span className="text-[#0F172A] font-black text-3xl leading-none">24</span>
                  <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-1">August</span>
                </div>

                <div className="flex-1 pt-1">
                  <h4 className="font-sans font-bold text-[#0F172A] text-lg leading-snug">
                    Fresher's Week Orientation at A'level
                  </h4>
                  <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                    Guiding senior entries towards university pipelines.
                  </p>

                </div>
              </motion.div>

            </div>
          </section>

        </section>


        {/* SECTION 7: Alumni Wall Collage Section (Prisinte Layout Matching Images 9, 10) */}
        <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-6 overflow-hidden mt-60" id="IFS-alumni-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end border-b border-slate-200 pb-4"
          >
            <div>
              <h3 className="font-sans font-extrabold text-[#0F172A] text-3xl sm:text-4xl tracking-tight">
                GALLERY
              </h3>
              <div className="w-16 h-1 bg-[#F5C330] mt-3 " />

            </div>

            <button
              onClick={() => handleSubNav("gallery", "")}
              className="group inline-flex items-center gap-2 text-xs font-extrabold text-[#0F172A] tracking-widest uppercase pb-1 border-b-2 border-[#F5C330] hover:border-[#60BADC] w-fit cursor-pointer transition-colors duration-300"
            >
              View All Photos
              <ArrowRight className="w-3.5 h-3.5 text-[#0F172A] group-hover:text-[#60BADC] transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* Mosaic/Pristine 2x4 Grid layout showing successful Pakistani Alumni Portraits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {/* Alumni Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm rounded-sm cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 4 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 5 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 6 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 7 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

            {/* Alumni Item 8 */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              onClick={() => setSelectedImage("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80")}
              className="aspect-[4/5] bg-slate-200 relative overflow-hidden group shadow-sm  cursor-pointer"
            >
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                alt="Alumni Portrait"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/45 transition-colors duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
              </div>
            </motion.div>

          </div>

          {/* Lightbox — opens on image click, closes via X button or outside click */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-5 right-5 sm:top-8 sm:right-8 z-[110] w-10 h-10 flex items-center justify-center  bg-white/10 hover:bg-white/20 text-white transition-colors duration-300 cursor-pointer"
                  aria-label="Close image"
                >
                  <X size={22} strokeWidth={2} />
                </button>

                {/* Image */}
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  src={selectedImage}
                  alt="Alumni Fullscreen"
                  className="max-w-full max-h-full object-contain  shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
      <AdmissionsCTA />
    </div>
  );
}