/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AboutSubView, MainView } from "../types";
import React, { useState, useEffect, useRef } from "react";
import VerticalCardSlider, { SliderMember } from "./VerticalCardSlider";
import ManagementBoardSlider, { BoardMember } from "./ManagementBoardSlider";
import BenefitsServices from "./BenefitsServices";
import {
  Users,
  BookOpen,
  Award,
  Globe,
  Monitor,
  CheckCircle,
  Quote,
  Target,
  Shield,
  Calendar,
  Building,
  GraduationCap,
  Lightbulb,
  HeartHandshake,
  School,
  Check,
  Crown,
  Calculator,
  Languages,
  Beaker,
  Telescope,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  MapPin,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "motion/react";
import RibbonPathwaysSection from "./RibbonPathways";

const NAVY = "#0d1f3c";
const GOLD = "#F5C330";
const SKY = "#60BADC";

interface AboutViewProps {
  subView?: AboutSubView;
  setSubView?: (sub: AboutSubView) => void;
  setView?: (view: MainView) => void;
}

interface CustomFacultyMember {
  name: string;
  roleLabel: string;
  department: string;
  photo?: string;
  initials: string;
  quote: string;
  badgeIcon: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'crown': return <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'users': return <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'graduation-cap': return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'book': return <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'flask': return <Beaker className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'calculator': return <Calculator className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'monitor': return <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'languages': return <Languages className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    case 'globe': return <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
    default: return <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-white" />;
  }
};

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += Math.ceil(end / 60);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const TeamCarousel = ({ members, prefersReducedMotion, isMobile }: { members: CustomFacultyMember[], prefersReducedMotion: boolean, isMobile: boolean }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [members]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % members.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + members.length) % members.length);
  };

  return (
    <div className="w-full flex flex-col items-center select-none outline-none overflow-hidden relative pb-8" role="region" aria-label="Team Carousel">
      <div className="flex w-full justify-between absolute top-[130px] sm:top-[155px] -translate-y-1/2 z-20 px-2 sm:px-6 pointer-events-none">
        <button onClick={handlePrev} className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#F5C330] hover:text-black hover:border-[#F5C330] transition-all duration-200 focus:ring-2 focus:ring-[#60BADC]" aria-label="Previous">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={handleNext} className="pointer-events-auto w-12 h-12 rounded-full bg-white shadow-lg border border-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#F5C330] hover:text-black hover:border-[#F5C330] transition-all duration-200 focus:ring-2 focus:ring-[#60BADC]" aria-label="Next">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="relative w-full h-[280px] sm:h-[320px] flex items-center justify-center mt-6">
        <AnimatePresence initial={false}>
          {members.map((member, idx) => {
            const distance = idx - activeIndex;
            const half = Math.floor(members.length / 2);
            let offset = distance;
            if (offset > half) offset -= members.length;
            if (offset < -half) offset += members.length;

            const isActive = offset === 0;
            const zIndex = members.length - Math.abs(offset);
            const scale = isActive ? 1.0 : 0.72;
            const xPos = offset * (isMobile ? 85 : 150);

            const isPrimaryColor = idx % 2 === 0;
            const ringColor = isPrimaryColor ? '#F5C330' : '#60BADC';

            if (Math.abs(offset) > (isMobile ? 1 : 3)) return null;

            return (
              <motion.div
                key={member.name + idx}
                className={`absolute cursor-pointer rounded-full overflow-hidden flex items-center justify-center shadow-xl border-solid bg-white group`}
                style={{
                  width: isMobile ? '120px' : '180px',
                  height: isMobile ? '120px' : '180px',
                  zIndex: isActive ? 50 : zIndex,
                  borderColor: isActive ? ringColor : '#e2e8f0',
                  borderWidth: isActive ? '4px' : '3px',
                  backgroundColor: isActive ? 'white' : '#f1f5f9',
                  boxShadow: isActive ? `0 0 0 6px ${ringColor}33, 0 15px 45px rgba(0,0,0,0.15)` : '0 4px 16px rgba(0,0,0,0.08)'
                }}
                initial={prefersReducedMotion ? undefined : { x: xPos, scale, opacity: 0 }}
                animate={prefersReducedMotion ? { x: xPos, scale: isActive ? 1 : 0.8, opacity: 1 } : { x: xPos, scale, opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.5 }}
                transition={prefersReducedMotion ? { duration: 0 } : {
                  type: "tween",
                  ease: [0.2, 0.8, 0.2, 1],
                  duration: 0.3
                }}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setActiveIndex(idx);
                }}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
              >
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-2xl sm:text-3xl text-black" style={{ backgroundColor: ringColor }}>
                    {member.initials}
                  </div>
                )}
                {!isActive && <div className="absolute inset-0 bg-white/50 transition-colors"></div>}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-10 text-center min-h-[160px] px-6 relative w-full overflow-hidden" aria-live="polite">
        <AnimatePresence mode="wait">
          {members[activeIndex] && (
            <motion.div
              key={activeIndex}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">{members[activeIndex].name}</h3>
              <p className="text-sm sm:text-base font-bold uppercase tracking-widest mt-2 px-4 py-1 rounded-full" style={{ color: activeIndex % 2 === 0 ? '#b8860b' : '#1a6b9a', backgroundColor: activeIndex % 2 === 0 ? '#FFF3B0' : '#D0EEF9' }}>
                {members[activeIndex].roleLabel}
              </p>
              <p className="text-slate-500 italic mt-4 max-w-lg text-base">
                "{members[activeIndex].quote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── MANAGEMENT & BOARD (Swiper parallax slider) ─────────────── */
const boardMembers: BoardMember[] = [
  {
    name: "Dr. Ahmed Waliullah Kazi",
    title: "Executive Director",
    description: "Dr. Ahmed Waliullah Kazi is the Vice Chancellor of Isra University and Director of Isra Islamic Foundation, under whose vision Isra Foundation Schools was established. He founded the school with the aim of providing students with a safe, nurturing and supportive environment where they can pursue their academic goals. His educational vision emphasizes academic excellence, character development and the holistic growth of every student, preparing them to become confident and responsible individuals.",
    photo: "/principal.jpg",
    initials: "AW",
  },
  {
    name: "Mrs. Maha Khan",
    title: "Cambridge Section Head ",
    description: "Mrs. Maha Khan leads the Cambridge Section with a focus on academic excellence and student development. Her approach encourages independent thinking, conceptual understanding and confidence in learning. She strives to prepare students for internationally recognized academic pathways while nurturing curiosity and lifelong learning.",
    photo: "",
    initials: "MK",
  },
  {
    name: "Ms. Rukhsar Khan ",
    title: "Middle Section head",
    description: "Ms. Rukhsar Khan leads the Middle Section with an emphasis on strong academic foundations and the development of independent learners.She believes in creating a supportive environment where students are encouraged to question, explore and take responsibility for their learning.Her focus is on helping students grow in confidence as they transition towards higher levels of education.",
    photo: "",
    initials: "RK",
  },
  {

    name: "Mrs. Sobia Soomro ",
    title: "ECD/Elementary Section Head ",
    description: "She emphasizes the development of academic skills alongside confidence, creativity, communication and positive learning habits. Her approach supports children in becoming enthusiastic, capable and well-rounded learners from their earliest years. ",
    photo: "",
    initials: "SS",
  },

];

/* ── FACULTY & STAFF (GSAP vertical slider) ──────────────────── */
const facultyStaffMembers: SliderMember[] = [
  {
    name: "Mr. Arif Hussain",
    designation: "Senior Faculty Coordinator",
    subject: "Administration",
    bio: "Orchestrating seamless academic operations and faculty well-being. Mr. Hussain brings 18 years of administrative experience ensuring every educator at IFS has the tools and support needed to excel in the classroom.",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
    initials: "AH",
    accentColor: "gold",
  },
  {
    name: "Mrs. Fatima Naqvi",
    designation: "Student Counsellor & Welfare Lead",
    subject: "Student Welfare",
    bio: "Championing the mental health and personal growth of every student. Mrs. Naqvi runs evidence-based counselling programmes and pastoral care initiatives that help students navigate academic pressures and thrive socially.",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    initials: "FN",
    accentColor: "blue",
  },
  {
    name: "Mr. Shahid Baloch",
    designation: "Head of Sports & Physical Education",
    subject: "Sports & PE",
    bio: "Building character through sport, discipline, and teamwork. Mr. Baloch has coached national-level athletes and believes physical education is as essential to a complete education as mathematics or literature.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    initials: "SB",
    accentColor: "gold",
  },
  {
    name: "Ms. Huma Afridi",
    designation: "Library & Resource Centre Manager",
    subject: "Library & Media",
    bio: "Curating a world of knowledge at students' fingertips. Ms. Afridi manages IFS's extensive library and digital resource centre, running reading programmes and research-skills workshops that ignite lifelong curiosity.",
    initials: "HA",
    accentColor: "blue",
  },
];

/* ── O-LEVEL FACULTY (GSAP vertical slider) ──────────────────── */
const oLevelSliderMembers: SliderMember[] = [
  {
    name: "Mrs. Nida Almani",
    designation: "Senior Mathematics Coordinator",
    subject: "Mathematics — O Level",
    bio: "Making mathematics logical, accessible, and exciting for all. Mrs. Almani's problem-solving workshops have consistently produced top scorers in CAIE O Level Mathematics across three consecutive academic years.",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    initials: "NA",
    accentColor: "gold",
  },
  {
    name: "Mr. Farhan Ali Soomro",
    designation: "Chemistry Instructor & Lab Supervisor",
    subject: "Sciences — O Level",
    bio: "Exploring the elements of life through safe and stimulating laboratory discovery. Mr. Soomro's hands-on lab sessions turn abstract chemical concepts into memorable, real-world experiments that students genuinely love.",
    initials: "FS",
    accentColor: "blue",
  },
  {
    name: "Mr. Zeeshan Haider",
    designation: "Computer Science Specialist",
    subject: "Computer Science — O Level",
    bio: "Empowering students to write the future with code and logic. Mr. Haider integrates project-based learning and coding competitions into his curriculum, producing students ready for tomorrow's digital economy.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    initials: "ZH",
    accentColor: "gold",
  },
  {
    name: "Mrs. Ayesha Lodhi",
    designation: "English Literature Lecturer",
    subject: "Languages — O Level",
    bio: "Unlocking critical thinking and empathy through classical and contemporary literature. Mrs. Lodhi's engaging discussion-led classes build both analytical skills and a lifelong appreciation for the written word.",
    initials: "AL",
    accentColor: "blue",
  },
  {
    name: "Mr. Imran Khan",
    designation: "Pakistan Studies Instructor",
    subject: "Humanities — O Level",
    bio: "Connecting past heritages to prepare citizens for future civic actions. Mr. Khan brings history alive through primary sources, debates, and field trips that deepen students' understanding of national identity.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    initials: "IK",
    accentColor: "gold",
  },
  {
    name: "Ms. Sarah Ahmed",
    designation: "Biology Specialist",
    subject: "Sciences — O Level",
    bio: "Investigating biological structures and the intricacies of living organisms. Ms. Ahmed blends laboratory investigations with visual storytelling to make cell biology, genetics, and ecology genuinely accessible.",
    initials: "SA",
    accentColor: "blue",
  },
];

/* ── A-LEVEL FACULTY (GSAP vertical slider) ──────────────────── */
const aLevelSliderMembers: SliderMember[] = [
  {
    name: "Mr. Asif Jahangir",
    designation: "A-Level Physics Specialist",
    subject: "Sciences — A Level",
    bio: "Bridging theoretical physics with real-world engineering concepts. Mr. Jahangir's rigorous yet approachable teaching style has produced multiple CAIE top-scorers in AS and A2 Physics over successive years.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    initials: "AJ",
    accentColor: "gold",
  },
  {
    name: "Mrs. Hina Shah",
    designation: "A-Level Economics Expert",
    subject: "Humanities — A Level",
    bio: "Analyzing global markets to cultivate smart fiscal understanding in tomorrow's leaders. Mrs. Shah uses real-world case studies, policy debates, and econometric data to bring macroeconomics to life.",
    initials: "HS",
    accentColor: "blue",
  },
  {
    name: "Mr. Raheel Siddiqui",
    designation: "A-Level Chemistry Specialist",
    subject: "Sciences — A Level",
    bio: "Deconstructing chemical equations to explore molecular structures and reactions. Mr. Siddiqui's advanced lab sessions and exam-technique workshops consistently push students to distinction grades.",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
    initials: "RS",
    accentColor: "gold",
  },
  {
    name: "Mr. Tariq Aziz",
    designation: "A-Level Mathematics Instructor",
    subject: "Mathematics — A Level",
    bio: "Advanced calculus, statistics, and pure mathematics simplified for sustained academic success. Mr. Aziz's methodical approach demystifies complex topics and builds confidence in even the most challenging syllabus areas.",
    initials: "TA",
    accentColor: "blue",
  },
  {
    name: "Dr. Kamran Malik",
    designation: "A-Level Business Studies Lecturer",
    subject: "Humanities — A Level",
    bio: "Fostering entrepreneurial mindsets through core enterprise, strategy, and finance concepts. Dr. Malik incorporates live case studies, startup simulations, and guest industry speakers into every module.",
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    initials: "KM",
    accentColor: "gold",
  },
  {
    name: "Ms. Maria Khan",
    designation: "A-Level English Language Guide",
    subject: "Languages — A Level",
    bio: "Mastering advanced communication skills, stylistic analysis, and language structures. Ms. Khan's workshops on discursive writing and comparative textual analysis have helped students excel across all paper components.",
    initials: "MK",
    accentColor: "blue",
  },
];

/* ── Principal's Message expand/collapse ──────────────────────── */
const PRINCIPAL_FULL_MESSAGE = `We are committed to fostering a culture of curiosity, discipline, and compassion — values that are woven into every lesson, every interaction, and every programme we offer. Our teachers are not merely instructors; they are mentors who invest deeply in every child's holistic development.\n\nAt IFS, we challenge our students to think critically, to question, to innovate, and to lead with integrity. Whether your child is in Primary, O Level, or A Level, they will find here an environment that takes their potential seriously.\n\nI invite parents, students, and the wider community to walk this journey of excellence with us. Together, we will build a generation that is equipped not just for examinations, but for life.`;

function PrincipalExpandCollapse() {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="overflow-hidden"
        >
          {PRINCIPAL_FULL_MESSAGE.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-600 leading-relaxed text-base mt-4 text-justify">{para}</p>
          ))}
        </motion.div>
      )}
      <button
        className="pm-expand-btn"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="pm-expand-bg"></span>

        <span className="pm-expand-content">
          {expanded ? "Collapse Message" : "Read Full Message"}

          <ArrowRight
            size={14}
            style={{
              transform: expanded ? "rotate(90deg)" : "none",
              transition: "transform 0.25s ease",
            }}
          />
        </span>
      </button>
    </>
  );
}

export default function AboutView({ subView = "who-we-are", setSubView, setView }: AboutViewProps) {
  const [activeTab, setActiveTab] = useState<'olevel' | 'alevel'>('olevel');

  // ── Section-based smooth scroll ──────────────────────────────────────────
  // Maps each AboutSubView key to the section id on this page.
  const SECTION_MAP: Record<string, string> = {
    "who-we-are": "about-story",
    "principal": "principal-message",
    "vision-mission": "vision-mission",
    "management": "management-board",
    "faculty": "academic-faculty",
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash.replace("#", "")) {
      return;
    }

    const scrollToSection = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const HEADER_HEIGHT = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const sectionId = SECTION_MAP[subView];
    if (sectionId) {
      const SCROLL_DELAY = 450;
      const timer = setTimeout(() => scrollToSection(sectionId), SCROLL_DELAY);
      return () => clearTimeout(timer);
    }
  }, [subView]);

  useEffect(() => {
    const scrollToSection = (targetId: string) => {
      const el = document.getElementById(targetId);
      if (!el) return;
      const HEADER_HEIGHT = 120;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    };

    const handleHash = (explicitHash?: string) => {
      if (typeof window === "undefined") return;
      const raw = (explicitHash || window.location.hash.replace("#", "")).toLowerCase();
      const mappedId = SECTION_MAP[raw] || raw;
      if (mappedId) {
        setTimeout(() => scrollToSection(mappedId), 50);
        setTimeout(() => scrollToSection(mappedId), 200);
      }
    };

    handleHash();

    const onHashChange = () => handleHash();
    const onCustomNav = (e: any) => {
      if (e.detail?.hash) handleHash(e.detail.hash);
      else handleHash();
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("app:navigate-anchor", onCustomNav);
    document.addEventListener("astro:page-load", onHashChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("app:navigate-anchor", onCustomNav);
      document.removeEventListener("astro:page-load", onHashChange);
    };
  }, []);
  // ─────────────────────────────────────────────────────────────────────────


  const missionPoints = [
    "Fostering social and emotional growth.",
    "Involving schools, families, and community.",
    "Securing resources for rigorous academics.",
    "Implementing student-centered learning approaches.",
    "Hiring faculty who personalize instruction.",
    "Providing cutting-edge facilities and technology.",
    "Offering futuristic diverse programming.",
    "Promoting community and legislative awareness.",
    "Grooming well-rounded 21st-century students."
  ];

  const quickFacts = [
    { icon: Calendar, title: "2016", label: "Founded" },
    { icon: Building, title: "Isra Islamic Foundation", label: "Founder" },
    { icon: GraduationCap, title: "Isra University", label: "Affiliation" },
    { icon: BookOpen, title: "CAIE & HEI Curriculum", label: "Curriculum" },
  ];

  const whyChooseItems = [
    { icon: GraduationCap, title: "Academic Excellence", desc: "Experienced faculty delivering internationally recognized education." },
    { icon: Globe, title: "Global Curriculum", desc: "CAIE and HEI curriculum designed for future success." },
    { icon: Lightbulb, title: "Innovative Learning", desc: "Technology-enabled classrooms and experiential learning." },
    { icon: HeartHandshake, title: "Character Development", desc: "Building integrity, leadership, and compassion." },
    { icon: School, title: "Modern Campus", desc: "Safe, inclusive, and well-equipped learning environment." },
    { icon: Users, title: "Community Partnership", desc: "Strong collaboration between school, parents, and community." },
  ];

  const accreditations = [
    { title: "Isra University", icon: Building },
    { title: "Cambridge Assessment International Education (CAIE)", icon: Globe },
    { title: "HEI Curriculum", icon: BookOpen },
    { title: "Qualified CAIE Instructors", icon: Award },
  ];

  return (
    <div className="w-full bg-white text-slate-800 font-sans" id="about-view-container" style={{ zoom: 0.95 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        #about-view-container * {
        font-family: 'Inter', sans-serif;
        }

        .about-hero-bg {
        position: relative;
        overflow: hidden;
        }

        .success-btn {
        position: relative;
        overflow: hidden;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 16px 34px;
        background: #ffffffff;
        color: #020618;
        border: 2px solid #0d1f3c;
        border-radius: 0;          /* Sharp corners */
        box-sizing: border-box;


        font-weight: 700;
        font-size: 16px;

        border: none;
        cursor: pointer;
        transition: color .35s ease;
      }

        .success-btn-bg {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #60BADC;

        transition: left 0.45s ease;
        z-index: 0;
      }
      .success-btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 10px;
        transition: color .35s ease;
        }

      .success-btn:hover .success-btn-bg {
        left: 0;
        }

        .success-btn:hover .success-btn-content {
          color: white;
        }

        .success-btn:hover svg {
          color: white;
          transform: translateX(4px);
          transition: .3s;
        }


         .gold-btn {
          background: #F5C330;
          color: #0d1f3c;
          font-weight: 700;
          border-radius: 0;
          padding: 12px 28px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          font-size: 0.9rem;
          letter-spacing: 0.02em;
        }

        .gold-btn:hover {
          background: #e6b220;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245,195,48,0.35);
        }

        .outline-btn {
          background: transparent;
          color: #fff;
          font-weight: 700;
          border-radius: 0;
          padding: 11px 28px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
          font-size: 0.9rem;
          border: 2px solid rgba(255,255,255,0.6);
          letter-spacing: 0.02em;
        }

        .outline-btn:hover {
          border-color: #F5C330;
          color: #F5C330;
          transform: translateY(-2px);
        }

        .event-card {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 4/3;
          cursor: pointer;
        }

        .event-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .event-card:hover img {
          transform: scale(1.06);
        }

        .event-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(13,31,60,0.85) 0%, rgba(13,31,60,0.1) 60%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
        }

        .event-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F5C330;
          color: #0d1f3c;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 4px 10px;
          border-radius: 10px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 8px;
          width: fit-content;
        }

        .stats-section {
          background: linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%);
          position: relative;
          overflow: hidden;
        }

        .stats-section::before {
          content: '';
          position: absolute;
          top: -60px;
          right: -60px;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: rgba(245,195,48,0.08);
        }

        .stats-section::after {
          content: '';
          position: absolute;
          bottom: -80px;
          left: -40px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: rgba(96,186,220,0.08);
        }

        .stat-item {
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .stat-item .stat-number {
          font-size: 2.8rem;
          font-weight: 900;
          color: #F5C330;
          line-height: 1;
          font-family: 'Inter', sans-serif;
        }

        .stat-item .stat-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 6px;
        }

        .vision-split {
          background: #f8fafc;
        }

        .mission-strip {
          background: linear-gradient(to right, #F5C330 0%, #f0b800 100%);
        }

        .accred-banner {
            background: #020618;
}

        .photo-strip-item {
          position: relative;
          overflow: hidden;
          border-radius: 10px;
          aspect-ratio: 4/3;
          flex: 1;
          min-width: 0;
        }

        .photo-strip-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
          filter: brightness(0.92);
        }

        .photo-strip-item:hover img {
          transform: scale(1.05);
          filter: brightness(1);
        }

      .bottom-stats-bar{
    background:#132443;
    padding:55px 0;
    border-top:3px solid #F5C330;
}

.stat-card{
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;
    min-height:180px;
}

.stat-icon{
    width:54px;
    height:54px;
    border-radius:14px;
    background:rgba(255,255,255,.12);
    display:flex;
    align-items:center;
    justify-content:center;
    color:#fff;
    margin-bottom:24px;
    transform:rotate(4deg);
    transition:.3s;
}

.stat-icon.active{
    background:#F5C330;
    color:#132443;
}

.stat-card:hover .stat-icon{
    transform:translateY(-6px) rotate(0deg);
}

.stat-number{
    font-size:56px;
    font-weight:900;
    color:#fff;
    line-height:1;
}

.stat-number span{
    color:#F5C330;
}

.stat-label{
    margin-top:12px;
    color:rgba(255,255,255,.75);
    text-transform:uppercase;
    letter-spacing:3px;
    font-size:12px;
    font-weight:700;
}

.bottom-cta {
  background: linear-gradient(135deg, #1a3a6b 0%, #0f2d55 100%);
}

.section-divider {
  width: 64px;
  height: 4px;
  background: #F5C330;
  margin-top: 16px;
}

.section-divider1 {
  width: 64px;
  height: 4px;
  background: #f5c330;
  margin-top: 16px;
}
  

.section-divider2 { 
  width: 64px;
  height: 4px;
  background: #60BADC;
  margin-top: 16px;
}

  .about-nav-tab {
  padding: 10px 28px;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 1px;   /* was 10px */
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.04em;
  text-transform: uppercase;
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
  color: #F5C330;
}

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-slide-in {
          animation: fadeSlideIn 0.5s ease both;
        }
      `}</style>

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

        {/* decorative arc, top-right */}
        <svg
          className="pointer-events-none absolute -right-20 -top-24 hidden h-80 w-80 sm:block lg:h-[28rem] lg:w-[28rem]"
          viewBox="0 0 400 400"
          fill="none"
        >
          {[
            [200, 60], [140, 100], [260, 100], [320, 60],
            [80, 140], [200, 140], [320, 140],
            [140, 180], [260, 180], [380, 180],
            [80, 220], [200, 220], [320, 220],
            [140, 260], [260, 260],
            [200, 300], [320, 300],
          ].map(([cx, cy], i) => {
            const dist = Math.sqrt((cx - 200) ** 2 + (cy - 180) ** 2);
            const opacity = Number(Math.max(0.08, 0.55 - dist * 0.0028).toFixed(3));
            const pts = Array.from({ length: 6 })
              .map((_, k) => {
                const a = (k * 60 * Math.PI) / 180;
                const px = (cx + 34 * Math.cos(a)).toFixed(2);
                const py = (cy + 34 * Math.sin(a)).toFixed(2);
                return `${px},${py}`;
              })
              .join(" ");
            return <polygon key={i} points={pts} stroke={GOLD} strokeWidth="1.2" strokeOpacity={opacity} />;
          })}
        </svg>

        <div className="relative z-10 w-full px-6 py-12 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-xl"
          >
            <div
              className="mb-6 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: GOLD }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: GOLD, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Who We Are
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
              About Us
            </h1>

            <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

            <p className="max-w-sm text-[15px] leading-relaxed text-white/80">
              Get to know our story, our values, and the community that shapes who we are.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. ABOUT IFS — 2-column image + text
      ============================================================ */}
      <section id="about-story" className="py-16 sm:py-20 px-6 lg:px-12 bg-white mt-25">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className=" overflow-hidden shadow-2xl aspect-[4/3]">
              <img src="/about.jpeg" alt="IFS Campus Building" className="w-full h-full object-cover" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-[#F5C330] text-[#0d1f3c]  px-6 py-4 shadow-xl">
              <p className="text-2xl font-black leading-none">2016</p>
              <p className="text-xs font-bold uppercase tracking-wider mt-1">Est. Year</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* <span style={{ display: "inline-block", color: "#00000098", fontSize: "0.7rem", fontWeight: 800, padding: "4px 12px", borderRadius: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "10px", textAlign: "left" }}>
              Our Foundation & History </span> */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] leading-tight">
              About <span className="text-[#60BADC]">IFS</span>
            </h2>
            <div className="section-divider" />
            <p className="text-slate-600 leading-relaxed text-base text-justify">
              Isra Foundation Schools (IFS) is a school project associated with Isra Islamic Foundation and serves as an educational institution in Hyderabad, Sindh.
            </p>
            <p className="text-slate-600 leading-relaxed text-base text-justify">
              IFS is committed to providing quality education in an environment that supports academic achievement, character development and the holistic growth of students.
            </p>
            <p className="text-slate-600 leading-relaxed text-base text-justify">
              The school aims to develop learners who are confident, responsible, intellectually curious and equipped to contribute positively to society.
            </p>
            <p className="text-slate-600 leading-relaxed text-base text-justify">
              Our educational philosophy places importance on:
            </p>
            <ul className="list-disc list-inside text-slate-600 leading-relaxed text-base space-y-1">
              <li>Academic excellence</li>
              <li>Character and moral development</li>
              <li>Critical and creative thinking</li>
              <li>Collaboration and communication</li>
              <li>Student participation</li>
              <li>Practical and hands-on learning</li>
              <li>Personal responsibility</li>
              <li>Social awareness and service</li>
            </ul>
          </motion.div>
        </div>
      </section>




      {/* ============================================================
          4. PRINCIPAL'S MESSAGE — Redesigned two-column layout
      ============================================================ */}
      <section id="principal-message" className="py-0 bg-white overflow-hidden my-20">
        <style>{`
          .pm-square-wrap {
            position: relative;
            display: inline-block;
            width: 100%;
          }
          .pm-square-img {
            width: 100%;
            height: 500px;
            object-fit: cover;
            object-position: center top;
            display: block;
            border-radius: 0px;
          }
          @media (max-width: 767px) {
            .pm-square-img { height: 280px; }
          }
          /* Yellow top-left corner accent */
          .pm-corner-tl {
            position: absolute;
            top: -10px;
            left: -10px;
            width: 52px;
            height: 52px;
            border-top: 5px solid #F5C330;
            border-left: 5px solid #F5C330;
            z-index: 3;
          }
          /* Blue bottom-right corner accent */
          .pm-corner-br {
            position: absolute;
            bottom: -10px;
            right: -10px;
            width: 52px;
            height: 52px;
            border-bottom: 5px solid #60BADC;
            border-right: 5px solid #60BADC;
            z-index: 3;
          }
          .pm-expand-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 14px 28px;
  border: 2px solid #0d1f3c;
  background: transparent;
  color: #0d1f3c;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;

  transition: color .35s ease;
}

.pm-expand-bg {
  position: absolute;
  inset: 0;
  background: #60BADC;   /* Hover color */
  transform: scaleX(0);
  transform-origin: left;
  transition: transform .45s ease;
  z-index: 0;
}

.pm-expand-content {
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  gap: 10px;

  transition: color .35s ease;
}

.pm-expand-btn:hover .pm-expand-bg {
  transform: scaleX(1);
}

.pm-expand-btn:hover .pm-expand-content {
  color: #ffffff;
}

/* Arrow inherits text color */
.pm-expand-content svg {
  transition: color .35s ease, transform .25s ease;
}
        `}</style>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 sm:py-24">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >


            {/* LEFT — Message */}
            <motion.div
              className="space-y-5 order-2 lg:order-1"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.15 }}
            >
              {/* Eyebrow */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <div style={{ width: "32px", height: "3px", background: "#60BADC" }} />
                <span style={{
                  fontSize: "12px",
                  fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                  color: "#020618",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase"
                }}>
                  From the Principal's Desk
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] leading-tight">
                A Message from<br />
                <span className="text-[#F5C330]">Our Principal</span>
              </h2>

              {/* Themed left-border quote block */}
              <div style={{
                borderLeft: "4px solid #F5C330",
                paddingLeft: "20px",
                margin: "8px 0",
              }}>
                <p className="text-slate-600 leading-relaxed text-base text-justify">
                  At Isra Foundation School, we believe that education is not merely the transmission of knowledge — it is the cultivation of character, the ignition of curiosity, and the forging of responsible, compassionate citizens.
                </p>
              </div>

              {/* Secondary quote */}
              <p className="text-slate-600 text-base leading-relaxed text-justify">
                We are committed to providing an environment where every student is empowered to discover their potential, embrace global values, and contribute meaningfully to society.
              </p>

              <PrincipalExpandCollapse />
            </motion.div>

            {/* RIGHT — Square Photo with theme accents */}
            <motion.div
              className="flex flex-col items-center gap-6 order-1 lg:order-2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.1 }}
            >
              {/* Image wrapper */}
              <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
                <div className="pm-corner-tl" />
                <div className="pm-corner-br" />
                <img
                  src="/principal.jpg"
                  alt="Dr. Ahmed Waliullah Kazi — Chairperson & Principal"
                  className="pm-square-img"
                  style={{ boxShadow: "0 24px 60px rgba(0,0,0,0.14)" }}
                />
                {/* Yellow bottom strip / nameplate overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: "linear-gradient(to top, rgba(10,24,58,0.92) 0%, rgba(10,24,58,0.6) 60%, transparent 100%)",
                  padding: "28px 20px 16px",
                  borderRadius: "0 0 4px 4px",
                }}>
                  <p style={{ color: "#ffffff", fontWeight: 800, fontSize: "1.05rem", margin: 0 }}>
                    Dr. Ahmed Waliullah Kazi
                  </p>
                  <span style={{
                    display: "inline-block",
                    marginTop: "6px",
                    background: "#F5C330",
                    color: "#0d1f3c",
                    fontWeight: 800,
                    fontSize: "0.68rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    borderRadius: "2px",
                  }}>
                    Chairperson &amp; Principal
                  </span>
                </div>
              </div>
            </motion.div>

          </motion.div>


        </div>
      </section>

      {/* White divider between Principal & Stats */}
      <div style={{ background: "#ffffff", height: "48px" }} />



      {/* ============================================================
          8. ACCREDITATIONS BANNER
      ============================================================ */}
      <div>
        <section id="accreditations" className="accred-banner py-20 px-6 lg:px-12 min-h-[340px] flex items-center my-10">
          <div className="max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-1 flex justify-center">
                <Shield className="w-10 h-10 text-[#F5C330]" />
              </div>
              <div className="lg:col-span-6">
                <h3 className="text-lg font-extrabold text-white mb-1">Accreditations & Affiliations</h3>
                <p className="text-white/90 text-lg">
                  Helps us maintain and update your institutional information so our data remains accurate and up-to-date. We partner with globally recognized educational organizations.
                </p>
              </div>
              <div className="lg:col-span-5">
                <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                  {accreditations.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <div key={idx} className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2">
                        <Icon className="w-4 h-4 text-[#F5C330] flex-shrink-0" />
                        <span className="text-white text-xs font-semibold">{item.title}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


      {/* Vission & Mission */}
      <RibbonPathwaysSection />
      {/* ============================================================
          3. BENEFITS & SERVICES — Shield-badge card grid
      ============================================================ */}
      <BenefitsServices items={whyChooseItems} />

      {/* White divider between Benefits & Principal */}
      <div style={{ background: "#ffffff", height: "48px" }} />



      {/* ============================================================
          7. QUICK FACTS STATS BAR (like bottom stats bar)
      ============================================================ */}
      <div className="bg-[#11182B] py-14 my-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4">

          {[
            {
              icon: Calendar,
              value: "2016",
              suffix: "",
              label: "YEAR FOUNDED",
            },
            {
              icon: Users,
              value: "300",
              suffix: "+",
              label: "STUDENTS ENROLLED",
            },
            {
              icon: Globe,
              value: "2",
              suffix: "",
              label: "AFFILIATIONS",
            },
            {
              icon: Star,
              value: "10",
              suffix: "+",
              label: "EVENTS & PROGRAMS",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className={`
                group
                flex
                flex-col
                items-center
                justify-center
                py-6
                transition-all
                duration-300
                ${index !== 3
                    ? "border-r border-white/20"
                    : ""
                  }
              `}
              >
                {/* Icon */}
                <Icon
                  className="
        w-11
        h-11
        text-white
        transition-all
        duration-500
        ease-out
        group-hover:text-[#F5C330]
        group-hover:-translate-y-1
        group-hover:scale-110
      "
                />
                {/* Number */}
                <h2
                  className="
            mt-5
            text-5xl
            font-extrabold
            text-white
            leading-none
            transition-transform
            duration-300
            ease-out
            group-hover:scale-110
          "
                >
                  {item.value}
                  <span className="text-[#F5C330]">
                    {item.suffix}
                  </span>
                </h2>
                {/* Label */}
                <p className="mt-4 text-[12px] uppercase tracking-[0.35em] font-bold text-white/80 text-center">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>


      {/* ============================================================
          6a. MANAGEMENT & BOARD — Swiper Parallax Slider
      ============================================================ */}
      <section id="management-board" className="py-16 sm:py-20 px-6 lg:px-12 bg-white ">
        <div className="max-w-7xl mx-auto ">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#020618]" />
              <span style={{
                display: "inline-block",
                fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: "12px",
                color: "#020618",
                fontWeight: 800,
                padding: "2px 14px",
                borderRadius: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}>
                Leadership</span>
              <span className="w-8 h-px bg-[#020618]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-2">Management &amp; <span className="text-[#60BADC]">Board</span></h2>
            <div className="section-divider1 mx-auto mt-2" />
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Meet the visionary leaders who shape the direction, values, and academic standards of Isra Foundation School.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ManagementBoardSlider members={boardMembers} />
          </motion.div>
        </div>
      </section>
      {/* ============================================================
          5. ACHIEVEMENT STATS — Dark section with counters
      ============================================================ */}
      <section className="stats-section relative py-16 sm:py-20 px-6 lg:px-12 overflow-hidden my-25">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/Academic Achievement.jpeg"
            alt="Academic Achievement"
            className="w-full h-full object-cover"
          />

          {/* Premium overlay */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: `
              linear-gradient(
                90deg,
                rgba(11,32,63,0.88) 0%,
                rgba(11,32,63,0.72) 45%,
                rgba(11,32,63,0.55) 100%
              ),
              linear-gradient(
                to bottom,
                rgba(13,31,60,0.20) 0%,
                transparent 45%,
                rgba(13,31,60,0.35) 100%
              )
            `,
            }}
          />
        </div>

        {/* Content sits above the background */}
        <div className="relative z-10 max-w-7xl mx-auto ">
          <div className="text-center mb-12">
            <span style={{ display: "inline-block", color: "#F5C330", fontSize: "0.7rem", fontWeight: 800, padding: "4px 14px", borderRadius: "10px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "14px", }}>
              Track Record</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Academic Achievement & Recognition Program
            </h2>
            <p className="text-white mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Celebrating distinguished students across various fields through awards and public recognition.
              Highlighting their achievements and success stories via newsletters, social media, and
              institutional events to strengthen pride and engagement.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { value: 8, suffix: "+", label: "Years of Excellence" },
              { value: 300, suffix: "+", label: "Students Enrolled" },
              { value: 15, suffix: "+", label: "Award Programs" },
              { value: 40, suffix: "+", label: "Qualified Faculty" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="stat-number">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="/news-events#student-success-stories"
              className="success-btn group cursor-pointer inline-flex relative"
              style={{ display: "inline-block" }}
            >
              <span className="success-btn-bg"></span>
              <span className="success-btn-content" >
                Explore Success Stories
                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        </div>
      </section>
      {/* White divider between Stats & Management */}
      <div style={{ background: "#ffffff", height: "48px" }} />

      {/* ============================================================
          6b. O/A LEVEL ACADEMIC FACULTY — GSAP Vertical Card Slider
      ============================================================ */}
      <section id="academic-faculty" className="py-16 sm:py-20 px-6 lg:px-12 bg-white -my-10">
        <div className="max-w-7xl mx-auto -my-10">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >

            <div className="flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-[#020618]" />
              <span style={{
                display: "inline-block",
                fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: "12px",
                color: "#020618",
                fontWeight: 800,
                padding: "2px 14px",
                borderRadius: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "6px",
              }}>
                Academic Faculty</span>
              <span className="w-8 h-px bg-[#020618]" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0d1f3c] mt-2">Faculty / <span className="text-[#f5c330]">Staff</span> </h2>
            <div className="section-divider2 mx-auto mt-2" />
            <p className="text-slate-500 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Specialist subject teachers for Cambridge O Level and A Level programmes. Scroll or swipe to explore.
            </p>
          </motion.div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-2 bg-[#0d1f3c] p-1.5 rounded-none">
              {(["olevel", "alevel"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="relative px-8 py-3 text-sm font-semibold uppercase tracking-wider overflow-hidden"
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary z-0"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 transition-colors duration-300 ${activeTab === tab ? "text-[#0D1F3C]" : "text-white"
                      }`}
                  >
                    {tab === "olevel" ? "O Level" : "A Level"}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'olevel' ? (
              <motion.div
                key="olevel-slider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="px-0 sm:px-8 lg:px-16"
              >
                <VerticalCardSlider
                  members={oLevelSliderMembers}
                  sectionLabel="O Level Faculty"
                  heading="O Level Faculty"
                />
              </motion.div>
            ) : (
              <motion.div
                key="alevel-slider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="px-0 sm:px-8 lg:px-16"
              >
                <VerticalCardSlider
                  members={aLevelSliderMembers}
                  sectionLabel="A Level Faculty"
                  heading="A Level Faculty"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* using this section for giving space */}
      <section className="py-16 sm:py-25 px-6 lg:px-12 bg-white"></section>

      {/* ============================================================
          9. CAMPUS MOMENTS — Photo strip (like Alumni Moments)
      ============================================================ */}
      {/*<section className="py-16 sm:py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="section-label">Gallery</span>
            <h2 className="text-3xl font-extrabold text-[#0d1f3c] mt-2">Campus Moments</h2>
            <div className="section-divider mx-auto mt-2" />
          </div>

          <div className="flex gap-3 overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=400",
            ].map((src, idx) => (
              <motion.div
                key={idx}
                className="photo-strip-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <img src={src} alt={`Campus moment ${idx + 1}`} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="inline-flex items-center gap-2 border-2 border-[#1a3a6b] text-[#1a3a6b] font-bold text-sm px-8 py-3 rounded-lg hover:bg-[#1a3a6b] hover:text-white transition-all duration-200">
              View More Photos <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section> */}


      {/* ============================================================
          9. STAY CONNECTED CTA (Bottom)
      ============================================================ */}
      <section className="relative h-[420px] lg:h-[544.5px] flex items-center overflow-hidden">
        {/* Background image */}
        <img
          src="/building-image.jpeg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay so text stays readable */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,32,63,0.80) 0%, rgba(11,32,63,0.55) 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-[2] w-full py-24 px-6 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <p className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Join Our Community
            </p>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Stay Connected. <br /><span className="text-[#F5C330]">Stay Inspired.</span>
            </h2>
            <p className="text-white text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Be a part of a global community making a difference. Connect with IFS
              today and be part of the legacy of excellence at Isra Foundation Schools.
            </p>

            <div className="flex flex-wrap gap-6 justify-center mt-20">
              <a href="/admissions" className="success-btn" style={{ textDecoration: 'none' }}>
                <span className="success-btn-bg"></span>
                <span className="success-btn-content">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </span></a>

              {/* Google Form Button */}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe57M4une4aQYnDUjL12hQN1IfI5s8Kt718syMKnFEvBveVsg/viewform"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 font-bold px-8 py-4"
                style={{
                  border: '2px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  textDecoration: 'none',

                  // Left to right color fill ke liye background canvas layout
                  backgroundImage: "linear-gradient(to right, rgba(245, 195, 48, 0.15) 50%, transparent 50%)",
                  backgroundSize: "200% 100%",
                  backgroundPosition: "right bottom",

                  // Duration set ki hai taaki animation smoothly (0.4s) chale
                  transition: "background-position 0.4s ease, border-color 0.4s ease, color 0.4s ease"
                }}
                onMouseEnter={e => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.backgroundPosition = "left bottom";
                  target.style.borderColor = "#F5C330"; // Hover par border blue
                  target.style.color = "#F5C330";       // Hover par text blue

                  const svg = target.querySelector("svg");
                  if (svg) svg.style.stroke = "#F5C330"; // Icon blue
                }}
                onMouseLeave={e => {
                  const target = e.currentTarget as HTMLAnchorElement;
                  target.style.backgroundPosition = "right bottom";
                  target.style.borderColor = "rgba(255,255,255,0.2)"; // Wapis original border
                  target.style.color = "white";                       // Wapis white text

                  const svg = target.querySelector("svg");
                  if (svg) svg.style.stroke = "currentColor";          // Wapis white icon
                }}
              >
                Google Form <ExternalLink className="w-5 h-5" />
              </a>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
