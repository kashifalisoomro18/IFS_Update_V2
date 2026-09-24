import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Megaphone,
  FileText,
  Bus,
  Calendar,
  Clock,
  MapPin,
  ClipboardList,
  BookOpen,
  Trophy,
  Star,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  X,
  GraduationCap,
  Palette,
  Award,
  Bell,
  LucideIcon,
} from "lucide-react";

// ============================================================
// NEWS DATA (Inlined)
// ============================================================
export const NEWS_DATA = [
  {
    id: "news-1",
    title: "Admissions Open for Academic Year 2026-2027",
    category: "Announcement",
    date: "July 1, 2026",
    content: "Admissions are now officially open for Pre-Nursery up to O/A Levels. Register online today and secure your child's future with our dual HEI Finland and Cambridge curriculum.",
    isImportant: true,
  },
  {
    id: "news-2",
    title: "Cambridge Assessment International Education (CAIE) Results",
    category: "News",
    date: "June 15, 2026",
    content: "Congratulations to our outstanding O and A Level students for achieving an extraordinary 94% straight A*/A grades in the recent examinations. We are proud of our dedicated instructors and students!",
    isImportant: true,
  },
  {
    id: "news-3",
    title: "Launch of Inquiry-Based STEM Innovation Lab",
    category: "Notice",
    date: "June 10, 2026",
    content: "Our newly designed STEM lab is now fully functional, featuring robotics kits, micro-controllers, and practical inquiry-based learning aids for Middle School and O/A Level physics, chemistry, and biology.",
    isImportant: false,
  },
  {
    id: "news-4",
    title: "Parent-Teacher Interactive Meeting (PTM)",
    category: "Notice",
    date: "July 10, 2026",
    content: "The first term introductory parent-teacher conference is scheduled for Saturday, July 10, from 9:00 AM to 1:00 PM. Parents will meet section heads and homeroom guides to review academic targets.",
    isImportant: false,
  },
  {
    id: "news-5",
    title: "HEI Finland Results (Pre-Nursery to Year 2)",
    category: "Notice",
    date: "June 10, 2026",
    content: "The first term introductory parent-teacher conference is scheduled for Saturday, July 10, from 9:00 AM to 1:00 PM. Parents will meet section heads and homeroom guides to review academic targets.",
    isImportant: false,
  },
  {
    id: "news-6",
    title: "Parent-Teacher Interactive Meeting (PTM)",
    category: "Notice",
    date: "July 10, 2026",
    content: "The first term introductory parent-teacher conference is scheduled for Saturday, July 10, from 9:00 AM to 1:00 PM. Parents will meet section heads and homeroom guides to review academic targets.",
    isImportant: false,
  },
];

// ============================================================
// CATEGORY -> COLOR MAPPING
// ============================================================
const CATEGORY_COLOR: Record<string, string> = {
  Academic: "#F5C330",
  Achievement: "#F5C330",
  Sports: "#60BADC",
  "Co-Curricular": "#60BADC",
  Notice: "#F5C330",
  Announcement: "#F5C330",
  News: "#60BADC",
};

const getAccent = (category: string) => CATEGORY_COLOR[category] ?? "#60BADC";

// ============================================================
// CATEGORY -> ICON MAPPING
// ============================================================
const CATEGORY_ICON: Record<string, LucideIcon> = {
  Academic: GraduationCap,
  Achievement: Award,
  Sports: Trophy,
  "Co-Curricular": Palette,
  Notice: Megaphone,
  Announcement: Megaphone,
  News: FileText,
};

const getCategoryIcon = (category: string) => CATEGORY_ICON[category] ?? Calendar;

// ============================================================
// FILTER PILL ICONS (nav bar above the News timeline)
// ============================================================
const FILTER_ICONS: Record<string, LucideIcon> = {
  All: Bell,
  Announcement: Megaphone,
  Notice: Bell,
  News: FileText,
};

// ============================================================
// ANNOUNCEMENT ICON STYLES
// ============================================================
const ANNOUNCEMENT_STYLE = [
  { icon: Calendar, bg: "#DCEEF6", iconColor: "#1E5A73" },
  { icon: FileText, bg: "#FDECC2", iconColor: "#8A6414" },
  { icon: Bus, bg: "#DCEEF6", iconColor: "#1E5A73" },
  { icon: ClipboardList, bg: "#FDECC2", iconColor: "#8A6414" },
  { icon: BookOpen, bg: "#DCEEF6", iconColor: "#1E5A73" },
  { icon: Trophy, bg: "#FDECC2", iconColor: "#8A6414" },
  { icon: Megaphone, bg: "#DCEEF6", iconColor: "#1E5A73" },
];

// ============================================================
// ANNOUNCEMENTS DATA
// ============================================================
const ANNOUNCEMENTS_DATA = [
  // Announcement 1
  {
    id: "ann-1",
    title: "Academic Session 2026–2027",
    content: " Isra Foundation Schools commenced the new academic session on Monday, 10 August 2026. .",
    date: "10 August 2026 ",
  },
  // Announcement 2
  {
    id: "ann-2",
    title: "Independence Day celebration ",
    content: " Activities Celebrating 79 Years of Freedom .",
    date: " 16 August 2026",
  },
  // Announcement 3
  {
    id: "ann-3",
    title: "Seerah Session ",
    content: "Seerah of Nabi Kareem ﷺ: A Role Model for Young Muslims.",
    date: " 8 September , 2026",
  },
  // Announcement 4
  {
    id: "ann-4",
    title: "Library Book Return Deadline",
    content: "All borrowed books must be returned before the term ends on 20th August 2026.",
    date: "30 August, 2026",
  },
  // Announcement 5
  {
    id: "ann-5",
    title: "Sports Trials Announcement",
    content: "Trials for the inter-house football and basketball teams begin next week.",
    date: "18 August, 2026",
  },
  // Announcement 7

];

// ============================================================
// NOTICE GALLERY DATA
// ============================================================
const NOTICE_GALLERY_DATA = [
  {
    id: "ng-1",
    title: "Science Centres",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ng-2",
    title: "Annual Sports Day",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ng-3",
    title: "Art & Creativity",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ng-4",
    title: "Campus Activities",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "ng-5",
    title: "Library Sessions",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1000&q=80",
  }
];

// ============================================================
// UPCOMING EVENTS DATA
// ============================================================
const EVENTS_DATA = [
  // Event Card 1 — Annual Science & STEM Innovation Expo
  {
    id: "evt-1",
    category: "Academic",
    time: "09:00 AM - 02:00 PM",
    title: "Independence Day Celebration",
    description:
      "Activities Celebrating 79 Years of Freedom",
    date: "August 16, 2026",
    venue: "Main Multipurpose Auditorium",
    image: "/ID1.JPG",
  },
  // Event Card 2 — Inter-House Football & Basketball Championship
  {
    id: "evt-2",
    category: "Academic",
    time: "11:30 AM - 01:30 PM",
    title: "Seerah Session ",
    description:
      "Seerah of Nabi Kareem ﷺ: A Role Model for Young Muslims .",
    date: "September 08, 2026",
    venue: "Auditorium",
    image: "/audi2.jpg",
  },
  // Event Card 3 — Annual Study Trip: Science Museum & Historical Sites
  {
    id: "evt-3",
    category: "Co-Curricular",
    time: "08:00 AM - 04:00 PM",
    title: "Annual Study Trip - Science Museum & Historical Sites",
    description:
      "Educational study trip designed to facilitate experiential, out-of-classroom learning for grades 4 to 8.",
    date: "October 12, 2026",
    venue: "Out of Campus",
    image: "/trip1.jpg",
  },
  // Event Card 4 — Independence Day Celebrations
  {
    id: "evt-4",
    category: "Co-Curricular",
    time: "08:30 AM - 11:30 AM",
    title: "Independence Day Celebrations",
    description:
      "Patriotic school assembly, stage performances, and flag-hoisting ceremony celebrating national heritage.",
    date: "August 14, 2026",
    venue: "Auditorium & Lawns",
    image: "/ID2.JPG",
  },
  // Event Card 5 — Annual Prize Distribution Ceremony
  {
    id: "evt-5",
    category: "Academic",
    time: "10:00 AM - 12:30 PM",
    title: "Annual Prize Distribution Ceremony",
    description:
      "Recognizing top-performing students across all grades with awards, certificates, and academic honors.",
    date: "November 02, 2026",
    venue: "Main Multipurpose Auditorium",
    image: "/graduationcermony.jpeg",
  },

  // Event Card 6 — Annual Prize Distribution Ceremony
  {
    id: "evt-6",
    category: "Academic",
    time: "7:30 AM - 12:30 PM",
    title: "Annual Prize  Ceremony",
    description:
      "Recognizing top-performing students across all grades with awards, certificates, and academic honors.",
    date: "November 03, 2026",
    venue: "Auditorium",
    image: "/audi3.jpg",
  },
  // Event Card 7 — Annual Prize Distribution Ceremony
  {
    id: "evt-7",
    category: "Academic",
    time: "9:30 AM - 1:00 PM",
    title: "ISRA International Sports Tournament",
    description:
      "ISRA welcomes teams from leading schools for friendly competitions in athletics, chess, football, and basketball.",
    date: "November 30, 2026",
    venue: "International Sports Stadium",
    image: "/hydolympic1.jpeg",
  },
];

/* ================================================================
   ANNOUNCEMENT ROW
================================================================ */
type AnnouncementRowProps = {
  title: string;
  content: string;
  date: string;
  index: number;
  key?: string;
};

function AnnouncementRow({ title, content, date, index }: AnnouncementRowProps) {
  const style = ANNOUNCEMENT_STYLE[index % ANNOUNCEMENT_STYLE.length];
  const Icon = style.icon;
  const isAlternate = index % 2 === 1;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-6 px-7 sm:px-8 py-8 transition-all duration-300 cursor-pointer border-l-4"
      style={{
        borderLeftColor: hovered ? "#F5C330" : "transparent",
        backgroundColor: hovered ? "#FFFBEB" : (isAlternate ? "#f8fafc" : "#ffffff")
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="flex items-center justify-center w-14 h-14 rounded-full flex-shrink-0"
        style={{ background: style.bg, color: style.iconColor }}
      >
        <Icon style={{ width: 22, height: 22 }} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-base sm:text-lg font-bold text-slate-900">{title}</p>
        <p className="text-sm sm:text-[15px] text-slate-500 mt-1.5 leading-relaxed">{content}</p>
      </div>
      <span className="text-xs sm:text-sm font-medium text-slate-400 whitespace-nowrap hidden sm:block flex-shrink-0">
        {date}
      </span>
    </div>
  );
}

/* ================================================================
   EVENT CARD
================================================================ */
type EventData = {
  id: string;
  category: string;
  time: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  image?: string;
};

function EventCard({ event }: { event: EventData; key?: string }) {
  const accent = getAccent(event.category);
  const CategoryIcon = getCategoryIcon(event.category);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="bg-white border transition-all duration-300 overflow-hidden flex flex-col"
      id={`event-item-${event.id}`}
      style={{
        borderRadius: "0px",
        borderColor: hovered ? "#F5C330" : "#f1f5f9",
        boxShadow: hovered
          ? "0 12px 24px -10px rgba(245, 195, 48, 0.3)"
          : "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Photo + badge overlay */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={
            event.image ??
            "/audi1.jpg"
          }
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <span
          className="absolute top-3.5 left-3.5 flex items-center justify-center w-10 h-10  shadow-md"
          style={{ background: accent }}
        >
          <CategoryIcon className="w-5 h-5 text-slate-900" />
        </span>
      </div>

      {/* Content wrapper */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category label + time */}
          <div className="flex items-center justify-between gap-3 mb-2.5">
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: accent }}
            >
              {event.category}
            </span>
            <span
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500"
            >
              <Clock className="w-3.5 h-3.5 text-[#60BADC]" />
              {event.time}
            </span>
          </div>

          {/* Title */}
          <h4 className="font-extrabold text-[15px] text-slate-900 leading-snug mb-2">
            {event.title}
          </h4>

          {/* Clamped description */}
          <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">

            {event.description}
          </p>
        </div>

        {/* Date + venue footer */}
        <div className="border-t border-slate-100 pt-3.5 mt-auto flex flex-col gap-2 text-xs text-slate-600 font-semibold">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#F5C330]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#F5C330]" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   NEWS DATA TYPE
================================================================ */
type NewsData = {
  id: string;
  category: string;
  date: string;
  title: string;
  content: string;
  image?: string;
  isImportant?: boolean;
};

/* ================================================================
   DATE PARSER (for NewsTimelineRow)
   Handles both:
     - "DD Mon, YYYY"  e.g. "01 Aug, 2026"
     - "Month D, YYYY" e.g. "July 1, 2026"
   Returns { day, monthLabel } for the big-day timeline column.
================================================================ */
function parseNewsDate(dateStr: string) {
  // Try native Date parse first for flexible formats
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    const day = String(parsed.getDate()).padStart(2, "0");
    const month = parsed.toLocaleString("en-US", { month: "short" });
    const year = parsed.getFullYear();
    return { day, monthLabel: `${month}, ${year}` };
  }
  // Fallback: split on spaces
  const parts = dateStr.split(" ");
  const day = parts[0] ?? "";
  const month = (parts[1] ?? "").replace(",", "");
  const year = parts[2] ?? "";
  return { day, monthLabel: `${month}, ${year}`.trim() };
}

/* ================================================================
   STUDENT SUCCESS STORIES — carousel matching the reference image
   Left: scattered circular photos with connecting dashed lines
   Right: active student detail (rank, name, grade, achievement, stars, quote)
   Bottom: dot navigation | Auto-rotates every 4s
================================================================ */

const STORIES_DATA = [
  {
    rank: 1,
    name: "Ayesha Noor",
    grade: "Grade 12 — A Levels",
    achievement: "94% in CAIE A Levels — All A*",
    stars: 5,
    quote:
      "Isra Foundation's dual curriculum of Finland and Cambridge gave me the foundation to think critically and perform exceptionally. The teachers here don't just teach — they inspire.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b7a0b9b4?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 2,
    name: "Ahmed Raza",
    grade: "Grade 10 — O Levels",
    achievement: "Gold Medal — Inter-School Football 2026",
    stars: 5,
    quote:
      "Playing for the school team and representing Isra in the inter-school championship was the proudest moment of my life. This school believes in every student's potential.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 3,
    name: "Fatima Malik",
    grade: "Grade 7 — Middle School",
    achievement: "1st Place — National Junior Science Olympiad",
    stars: 5,
    quote:
      "The STEM Innovation Lab at our school made science come alive for me. I never thought I could build a working robot at age 12 — but I did, and I won!",
    image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 4,
    name: "Usman Tariq",
    grade: "Grade 5 — Elementary",
    achievement: "Most Books Read — School Library Award 2026",
    stars: 4,
    quote:
      "My teacher always said that reading opens the door to every world. I've read 48 books this year and I love every single one. This school made me a reader for life.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 5,
    name: "Zara Hussain",
    grade: "Grade 11 — A Levels",
    achievement: "Cambridge Arts Award — Distinction 2026",
    stars: 5,
    quote:
      "My art teacher saw something in me I didn't see in myself. Winning the Cambridge Arts Award is something I will carry with me forever. Isra Foundation is truly special.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 6,
    name: "Hassan Ali",
    grade: "Grade 9 — O Levels",
    achievement: "Best Speaker — Inter-School Debate 2026",
    stars: 4,
    quote:
      "Standing on that podium and arguing my case taught me confidence I never had before. The debate club at Isra Foundation prepared me for every challenge life can throw.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 7,
    name: "Sara Iqbal",
    grade: "Grade 8 — Middle School",
    achievement: "1st Place — Provincial Spelling Bee 2026",
    stars: 5,
    quote:
      "Competing in the spelling bee taught me that preparation and dedication are everything. My teachers at Isra Foundation never stopped believing in me.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
  },
  {
    rank: 8,
    name: "Bilal Shah",
    grade: "Grade 11 — A Levels",
    achievement: "National Math Olympiad — Bronze Medal",
    stars: 4,
    quote:
      "Mathematics is a language and Isra Foundation taught me to speak it fluently. The dedicated STEM faculty here is simply the best I have ever encountered.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80",
  },
];

// Positions for circular photos — start from ~20% top so they don't clash with header
const BUBBLE_POSITIONS = [
  { top: "22%", left: "5%" },
  { top: "15%", left: "30%" },
  { top: "42%", left: "15%" },
  { top: "32%", left: "48%" },
  { top: "60%", left: "4%" },
  { top: "58%", left: "35%" },
  { top: "76%", left: "18%" },
  { top: "72%", left: "50%" },
];

function SuccessStoriesSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STORIES_DATA.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const story = STORIES_DATA[active];

  return (
    <section
      id="student-success-stories"
      className="relative w-full overflow-hidden"
      style={{
        background: "#12122a",
        backgroundImage: `url('/Academic Achievement.jpeg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "rgba(10,10,30,0.82)",
          zIndex: 0,
        }}
      />

      {/* Large faded watermark behind everything */}
      {/* <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
        style={{ zIndex: 0 }}
      >
        <span
          style={{
            fontSize: "clamp(90px, 16vw, 220px)",
            fontWeight: 900,
            color: "rgba(255,255,255,0.035)",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            paddingLeft: "3%",
          }}
        >
          Success Stories
        </span>
      </div> */}

      {/* ── TOP HEADER BAR (not absolute — sits above bubbles) ── */}
      <div
        className="relative z-20 flex items-center justify-between px-6 sm:px-8 pt-8 pb-4"
      >
        <div>
          <h2
            className="stories font-extrabold text-white leading-tight"
            style={{ fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            Success Stories
          </h2>
          <div className="flex items-center gap-2 mt-1" style={{ color: "#F5C330" }}>
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-bold">Top Achievers</span>
          </div>
        </div>
      </div>


      {/* ── MAIN CONTENT: profile image + detail ── */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:min-h-[440px]">
        {/* LEFT — active profile image (always centered) */}
        <div className="relative w-full lg:w-1/2 flex-shrink-0 flex items-center justify-center py-6 lg:py-0 min-h-[240px] sm:min-h-[300px] lg:min-h-[440px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center justify-center mx-auto"
            >
              <div
                className="rounded-full overflow-hidden"
                style={{
                  width: "clamp(170px, 40vw, 300px)",
                  aspectRatio: "1/1",
                  border: "3px solid #F5C330",
                  boxShadow: "0 0 0 8px rgba(245,195,48,0.15), 0 16px 40px rgba(0,0,0,0.5)",
                }}
              >
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT — active student detail */}
        <div
          className="flex-1 flex flex-col justify-center px-6 sm:px-10 py-8"
          style={{ minWidth: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              {/* Rank */}
              <p
                className="font-black text-white leading-none mb-2"
                style={{ fontSize: "clamp(40px, 6vw, 72px)" }}
              >
                #{story.rank}
              </p>

              {/* Name */}
              <h3
                className="font-extrabold leading-tight mb-1"
                style={{ fontSize: "clamp(18px, 2.4vw, 28px)", color: "#F5C330" }}
              >
                {story.name}
              </h3>

              {/* Grade with pin icon */}
              <p className="flex items-center gap-1.5 text-sm mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#F5C330" }} />
                {story.grade}
              </p>

              {/* Achievement */}
              <p
                className="font-extrabold mb-1"
                style={{ fontSize: "clamp(13px, 1.6vw, 16px)", color: "#F5C330" }}
              >
                {story.achievement}
              </p>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-5">
                <span className="text-white/50 text-xs mr-1 font-semibold">Rating:</span>
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star
                    key={si}
                    className="w-4 h-4"
                    style={{
                      fill: si < story.stars ? "#F5C330" : "transparent",
                      color: si < story.stars ? "#F5C330" : "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>

              {/* Quote */}
              <p
                className="leading-relaxed"
                style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.6)", maxWidth: 420 }}
              >
                {story.quote.length > 190 ? story.quote.slice(0, 190) + "…" : story.quote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Dot navigation */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-8">
            {STORIES_DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show story ${i + 1}`}
                className="focus:outline-none transition-all duration-300 w-6 sm:w-[35px] h-2"
                style={{
                  borderRadius: "0px",
                  background: i === active ? "#F5C330" : "transparent",
                  border: i === active
                    ? "2px solid #F5C330"
                    : "2px solid rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div style={{ paddingBottom: 32 }} />
    </section>
  );
}

/* ================================================================
   NEWS DETAIL MODAL — rendered via a PORTAL directly into
   document.body (same fix as the Notice gallery modal below).
   If it stayed inline inside NewsTimelineRow, any transformed
   ancestor (e.g. the "fade-in" wrapper) would turn its
   `position: fixed` into "fixed relative to that ancestor"
   instead of the real viewport — causing the exact same
   scroll-to-see-it bug. A portal sidesteps that completely.
================================================================ */
function NewsDetailModal({
  news,
  thumb,
  onClose,
}: {
  news: NewsData;
  thumb: string;
  onClose: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6"
        style={{ background: "rgba(2,8,22,0.75)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="relative bg-white shadow-2xl overflow-hidden"
          style={{
            width: "min(900px, 96vw)",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "row",
            borderRadius: 0,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close X */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 flex items-center justify-center w-9 h-9 bg-slate-900/80 hover:bg-[#F5C330] transition-colors group"
            style={{ borderRadius: 0 }}
          >
            <X className="w-4 h-4 text-white group-hover:text-slate-900 transition-colors" />
          </button>

          {/* Left — Image */}
          <div
            className="flex-shrink-0 hidden sm:block"
            style={{ width: "42%", minHeight: "100%" }}
          >
            <img
              src={thumb}
              alt={news.title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Right — Content */}
          <div
            className="flex-1 flex flex-col overflow-y-auto"
            style={{ padding: "40px 36px 36px" }}
          >
            {/* Category badge */}
            <span
              className="text-[11px] font-black uppercase tracking-[0.2em] mb-4 inline-block"
              style={{ color: "#F5C330" }}
            >
              {news.category}
            </span>

            {/* Title */}
            <h2
              className="font-extrabold text-slate-900 leading-tight mb-4"
              style={{ fontSize: "clamp(20px, 2.5vw, 28px)" }}
            >
              {news.title}
            </h2>

            {/* Gold divider */}
            <div className="h-[3px] w-12 mb-5" style={{ background: "#F5C330" }} />

            {/* Date */}
            <span
              className="inline-flex items-center gap-2 font-semibold mb-6"
              style={{ fontSize: "13px", color: "#64748b" }}
            >
              <Calendar style={{ width: 13, height: 13, color: "#F5C330" }} />
              {news.date}
            </span>

            {/* Mobile image (shown only on small screens) */}
            <div className="sm:hidden mb-5" style={{ aspectRatio: "16/9", overflow: "hidden" }}>
              <img
                src={thumb}
                alt={news.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>

            {/* Full content */}
            <p
              className="text-slate-600 leading-relaxed flex-1"
              style={{ fontSize: "15px" }}
            >
              {news.content}
            </p>

            {/* Close button */}
            {/*<button
              onClick={onClose}
              className="mt-8 font-bold text-sm uppercase tracking-widest transition-all hover:opacity-90"
              style={{
                background: "#0d1f3c",
                color: "#F5C330",
                border: "none",
                padding: "14px 0",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Close
            </button>*/}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ================================================================
   NEWS TIMELINE ROW  
   Layout per row (each row is its own white card):
     [Big gold day / Mon,YYYY]  |  [Bordered thumbnail]  |  [Content block]
   Content block:
     Bold title → gold calendar-icon date → expandable desc → View Details
================================================================ */
function NewsTimelineRow({ news }: { news: NewsData; key?: string }) {
  const { day, monthLabel } = parseNewsDate(news.date);
  const [hovered, setHovered] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  // Fallback thumbnail from Unsplash (school / education themed)
  const thumb =
    news.image ??
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80";

  return (
    <>
      <div
        className="flex items-start gap-4 sm:gap-7 bg-white shadow-sm hover:shadow-md transition-all duration-300 border-l-4"
        style={{
          padding: "24px 28px",
          borderLeftColor: hovered ? "#F5C330" : "transparent",
          backgroundColor: hovered ? "#FFFBEB" : "#ffffff"
        }}
        id={`news-item-${news.id}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Left: big day + month/year label ── */}
        <div
          className="hidden sm:flex flex-col items-center flex-shrink-0 pt-1"
          style={{ minWidth: "64px" }}
        >
          <span
            className="font-extrabold leading-none"
            style={{ fontSize: "clamp(36px,4vw,52px)", color: "#F5C330" }}
          >
            {day}
          </span>
          <span
            className="mt-1 text-center font-medium"
            style={{ fontSize: "13px", color: "#64748b", whiteSpace: "nowrap" }}
          >
            {monthLabel}
          </span>
        </div>

        {/* ── Centre: bordered thumbnail ── */}
        <div
          className="flex-shrink-0"
          style={{
            border: "2px solid #cbd5e1",
            width: "clamp(120px, 16vw, 200px)",
            aspectRatio: "4/3",
            overflow: "hidden",
          }}
        >
          <img
            src={thumb}
            alt={news.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>

        {/* ── Right: content ── */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3
            className="font-bold text-slate-900 leading-snug mb-2"
            style={{ fontSize: "clamp(15px,1.6vw,20px)" }}
          >
            {news.title}
          </h3>



          {/* Clamped description preview */}
          <p
            className="text-slate-500 leading-relaxed mb-3"
            style={{
              fontSize: "clamp(13px,1.1vw,15px)",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {news.content}
          </p>

          {/* View Details button */}
          <button
            onClick={() => setShowDetail(true)}
            className="font-bold hover:underline underline-offset-2 transition-opacity hover:opacity-75"
            style={{ fontSize: "14px", color: "#F5C330", background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            View Details
          </button>
        </div>
      </div>

      {/* ── Detail Modal (portal) ── */}
      {showDetail && (
        <NewsDetailModal
          news={news}
          thumb={thumb}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}

/* ================================================================
   NOTICE MODAL (Lightbox) — rendered via a PORTAL directly into
   document.body. This is the key fix: if any ancestor in the tree
   (e.g. a "fade-in" animated wrapper, or any framer-motion element
   using transform) has a CSS `transform`, it creates a new
   "containing block" for `position: fixed` children — which makes
   the fixed modal position itself relative to THAT ancestor instead
   of the real viewport. That's exactly why the modal was opening
   off-screen and needing a scroll. Rendering through a portal
   attaches the modal as a direct child of <body>, completely
   outside that transformed tree, so `fixed` now always means
   "fixed to the browser viewport" — no scroll ever needed again.
================================================================ */
function NoticeModal({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const notice = NOTICE_GALLERY_DATA[index];

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-6"
        onClick={onClose}
      >
        <div
          className="relative flex flex-col items-center"
          style={{ maxWidth: "90vw", maxHeight: "90vh" }}
        >
          <button
            className="absolute -top-12 right-0 z-50 text-white/70 bg-black/50 p-2.5 rounded-full hover:text-white transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-5 h-5" />
          </button>

          <button
            className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors bg-black/30 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 z-50 text-white/50 hover:text-white transition-colors bg-black/30 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="shadow-2xl bg-white flex items-center justify-center"
              style={{ maxHeight: "72vh", maxWidth: "90vw" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={notice.image}
                alt={notice.title}
                style={{
                  maxHeight: "72vh",
                  maxWidth: "90vw",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="text-white mt-4 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold">{notice.title}</h3>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

/* ================================================================
   MAIN VIEW
================================================================ */
export default function NewsEventsView() {
  const eventsListRef = useRef<HTMLDivElement>(null);
  const [activeScrollDir, setActiveScrollDir] = useState<"down" | "up">("down");
  const [visibleEventsCount, setVisibleEventsCount] = useState(2);
  const [filter, setFilter] = useState<string>("All");
  const [selectedNoticeIndex, setSelectedNoticeIndex] = useState<number | null>(null);

  const filteredNews = NEWS_DATA;

  const scrollEvents = (direction: "up" | "down") => {
    const container = eventsListRef.current;
    if (!container) return;
    setActiveScrollDir(direction);
    container.scrollBy({
      top: direction === "down" ? 350 : -350,
      behavior: "smooth",
    });
  };

  // Scroll controls for the "News & Events" timeline list below
  const newsListRef = useRef<HTMLDivElement>(null);
  const [activeNewsScrollDir, setActiveNewsScrollDir] = useState<"down" | "up">("down");

  const scrollNews = (direction: "up" | "down") => {
    const container = newsListRef.current;
    if (!container) return;
    const amount = 320;
    setActiveNewsScrollDir(direction);
    container.scrollBy({ top: direction === "down" ? amount : -amount, behavior: "smooth" });
  };

  return (
    // NOTE: `zoom: 0.9` scales the ENTIRE page (fonts, spacing, images) down to
    // exactly how it looked at 90% browser zoom — even when the user's browser
    // is at 100%. Unlike `transform: scale()`, `zoom` affects real layout/box
    // sizing, so there are no leftover gaps or overflow issues. Portal-based
    // modals (NewsDetailModal, NoticeModal) render into document.body and are
    // NOT affected by this, so overlays stay at their normal, unscaled size.
    <div className="w-full bg-white" id="news-events-view-container" style={{ zoom: 0.9 }}>
      {/* ============================================================
          SECTION: HERO
          ============================================================ */}
      <section className="relative w-full overflow-hidden flex items-center min-h-[422px] sm:min-h-[489px] lg:min-h-[534px]" style={{ background: "#0d1f3c" }}>
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
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* mobile fallback */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1600&q=80')",
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

        {/* decorative stars grid, top-right */}
        <svg
          className="pointer-events-none absolute -right-16 -top-24 hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
          viewBox="0 0 400 400"
          fill="none"
        >
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => {
              const dist = Math.sqrt((row - 2.5) ** 2 + (col - 2.5) ** 2);
              const opacity = Math.max(0.05, 0.5 - dist * 0.1);
              // Draw a 4-point sparkle star
              const cx = col * 60 + 40;
              const cy = row * 60 + 40;
              const r1 = 12; // outer radius
              const r2 = 3;  // inner radius
              return (
                <path
                  key={`${row}-${col}`}
                  d={`M ${cx} ${cy - r1} L ${cx + r2} ${cy - r2} L ${cx + r1} ${cy} L ${cx + r2} ${cy + r2} L ${cx} ${cy + r1} L ${cx - r2} ${cy + r2} L ${cx - r1} ${cy} L ${cx - r2} ${cy - r2} Z`}
                  fill="#F5C330"
                  fillOpacity={opacity}
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
              <span className="h-px w-8" style={{ background: "#F5C330" }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "#F5C330", fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                LATEST UPDATES
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
              News & Events
            </h1>

            <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: "#60BADC" }} />

            <p className="max-w-sm text-[15px] leading-relaxed text-white/70">
              Stay informed with the latest announcements, student achievements, upcoming events, and memorable moments from Isra Foundation Schools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SECTION: "ANNOUNCEMENTS & NOTICES" PAGE HEADING
          ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-25">
        <div className="mb-8" id="announcements-notices-heading">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8" style={{ background: "#0F172A" }} />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-900"
              style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              School Notices
            </span>
          </div>
          <h2
            className="font-extrabold tracking-tight"
            style={{ fontSize: "clamp(30px, 4vw, 44px)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
          >
            <span style={{ color: "#0d1f3c" }}>Announcements</span>{" "}
            <span style={{ color: "#F5C330" }}>& Notices</span>
          </h2>
          <div className="mt-4 h-[3px] w-16" style={{ background: "#60BADC" }} />
        </div>

        {/* Filter pill nav bar */}
        <div className="flex flex-wrap gap-2.5 mb-2" id="news-filter-pills">
          {["All", "Announcement", "Notice", "News"].map((cat) => {
            const Icon = FILTER_ICONS[cat] ?? Bell;
            const active = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                id={`filter-pill-${cat}`}
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-4 py-2.5 transition-all duration-300 cursor-pointer ${active
                  ? "bg-[#0d1f3c] text-[#F5C330] shadow-md"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                  }`}
              >
                <Icon size={12} />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================
          SECTION: ANNOUNCEMENTS + UPCOMING EVENTS (full-bleed panel, changed to white bg)
          ============================================================ */}
      {(filter === "All" || filter === "Announcement") && (
        <section className="w-full bg-white py-12" id="announcements-events-panel">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-8 items-stretch" id="top-row">

              {/* LATEST ANNOUNCEMENTS (left column) */}
              <div className="flex flex-col gap-6">
                <section id="latest-announcements" className="border border-slate-100  shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-white">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex items-center justify-center w-9 h-9 "
                        style={{ background: "#F5C330" }}
                      >
                        <Megaphone className="w-4 h-4 text-slate-900" />
                      </span>
                      <h3 className="font-bold text-xl text-slate-900">Latest Announcements</h3>
                    </div>
                  </div>

                  <div className="bg-white overflow-hidden divide-y divide-slate-100">
                    {ANNOUNCEMENTS_DATA.map((item, i) => (
                      <AnnouncementRow
                        key={item.id}
                        title={item.title}
                        content={item.content}
                        date={item.date}
                        index={i}
                      />
                    ))}
                  </div>
                </section>
              </div>

              {/* UPCOMING EVENTS (right column) */}
              <section
                id="events-col"
                className="lg:sticky lg:top-24 lg:ml-auto w-full flex flex-col h-full"
                style={{ maxWidth: 400 }}
              >
                {/* Stacked Heading Design matching the request */}
                <div className="mb-6">
                  <h3 className="font-extrabold text-3xl tracking-tight text-slate-900 leading-none">
                    Upcoming
                  </h3>
                  <h3 className="font-extrabold text-3xl tracking-tight text-[#60BADC] leading-tight">
                    Events
                  </h3>
                  <div className="mt-2 h-[3px] w-12" style={{ background: "#F5C330" }} />
                </div>

                <div
                  ref={eventsListRef}
                  id="events-list"
                  className="events-scroll space-y-5 overflow-y-auto"
                  style={{
                    height: "920px",
                    scrollBehavior: "smooth",
                  }}
                >
                  {EVENTS_DATA.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>

                <div className="flex justify-end mt-4 w-full" id="events-scroll-controls">
                  <div className="flex w-fit overflow-hidden shadow-sm">
                    <button
                      onClick={() => scrollEvents("up")}
                      aria-label="Scroll events up"
                      className="w-12 h-12 flex items-center justify-center transition-colors"
                      style={{ background: activeScrollDir === "up" ? "#F5C330" : "#E7EAEF" }}
                    >
                      <ChevronUp
                        className="w-5 h-5"
                        style={{ color: activeScrollDir === "up" ? "#0d1f3c" : "#94A3B8" }}
                      />
                    </button>
                    <button
                      onClick={() => scrollEvents("down")}
                      aria-label="Scroll events down"
                      className="w-12 h-12 flex items-center justify-center transition-colors"
                      style={{ background: activeScrollDir === "down" ? "#F5C330" : "#E7EAEF" }}
                    >
                      <ChevronDown
                        className="w-5 h-5"
                        style={{ color: activeScrollDir === "down" ? "#0d1f3c" : "#94A3B8" }}
                      />
                    </button>
                  </div>
                </div>

                <style>{`
                .events-scroll::-webkit-scrollbar { display: none; }
                .events-scroll { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>
              </section>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION: NOTICES (Visual Gallery)
          ============================================================ */}
      {(filter === "All" || filter === "Notice") && (
        <section className="w-full bg-white py-14" id="visual-notices-section">
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span
                  className="flex-shrink-0 "
                  style={{ width: 5, height: 38, background: "#F5C330" }}
                />
                <h2
                  className="font-extrabold tracking-tight text-slate-900"
                  style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.1 }}
                >
                  NOTICES
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {NOTICE_GALLERY_DATA.map((notice, i) => (
                <div
                  key={notice.id}
                  onClick={() => setSelectedNoticeIndex(i)}
                  className="group relative cursor-pointer overflow-hidden aspect-[3/4] shadow-sm bg-slate-200"
                >
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <h4 className="text-white font-bold text-sm leading-snug">{notice.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================
          SECTION: NEWS & EVENTS (date-timeline design)
          - Filter pill nav bar (All / Announcement / Notice / News)
          - One NewsTimelineRow per filtered NEWS_DATA entry: big day
            number + month/year, bordered thumbnail, title, date line,
            clamped description.
          - Scrollable container (native scrollbar hidden) with
            gold/grey down-up scroll buttons underneath, bottom-left.
          ============================================================ */}
      {(filter === "All" || filter === "News") && (
        <section className="w-full py-14" style={{ background: "#f8f9fb" }} id="news-events-timeline">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Section heading — left blue bar accent */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <span
                  className="flex-shrink-0 "
                  style={{ width: 5, height: 38, background: "#60BADC" }}
                />
                <h2
                  className="font-extrabold tracking-tight text-slate-900"
                  style={{ fontSize: "clamp(24px, 3vw, 38px)", lineHeight: 1.1 }}
                >
                  NEWS
                </h2>
              </div>
              {/*} <button
              className="text-xs font-bold uppercase tracking-widest hover:underline underline-offset-4 transition-opacity hover:opacity-70"
              style={{ color: "#F5C330" }}
            >
              View All
            </button>*/}
            </div>

            {/* Timeline list — scrollable cards with gap, hidden native scrollbar */}
            <div
              ref={newsListRef}
              className="news-scroll"
              style={{
                maxHeight: 820,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
              id="news-listings"
            >
              {filteredNews.length === 0 ? (
                <div className="text-center py-20 text-slate-400 text-sm font-medium border border-dashed border-slate-200">
                  No news found for this category.
                </div>
              ) : (
                (filteredNews as NewsData[]).map((news) => (
                  <NewsTimelineRow key={news.id} news={news} />
                ))
              )}
            </div>

            {/* Scroll controls — down/up buttons, bottom-left */}
            <div className="flex mt-5" id="news-scroll-controls">
              <div className="flex overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
                <button
                  onClick={() => scrollNews("up")}
                  aria-label="Scroll news up"
                  className="w-12 h-12 flex items-center justify-center transition-colors"
                  style={{
                    background: activeNewsScrollDir === "up" ? "#F5C330" : "#E2E8F0",
                  }}
                >
                  <ChevronUp
                    className="w-5 h-5"
                    style={{ color: activeNewsScrollDir === "up" ? "#0d1f3c" : "#94A3B8" }}
                  />
                </button>
                <button
                  onClick={() => scrollNews("down")}
                  aria-label="Scroll news down"
                  className="w-12 h-12 flex items-center justify-center transition-colors"
                  style={{
                    background: activeNewsScrollDir === "down" ? "#F5C330" : "#E2E8F0",
                  }}
                >
                  <ChevronDown
                    className="w-5 h-5"
                    style={{ color: activeNewsScrollDir === "down" ? "#0d1f3c" : "#94A3B8" }}
                  />
                </button>
              </div>
            </div>

          </div>

          {/* Hide native scrollbar on the news list while keeping it scrollable */}
          <style>{`
          .news-scroll::-webkit-scrollbar { display: none; }
          .news-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        </section>
      )}

      {/* ============================================================
          SECTION: STUDENT SUCCESS STORIES — carousel layout
          ============================================================ */}
      <SuccessStoriesSection />


      {/* ============================================================
          NOTICE MODAL (Lightbox) — now rendered through a portal,
          see the NoticeModal component above for why.
          ============================================================ */}
      {selectedNoticeIndex !== null && (
        <NoticeModal
          index={selectedNoticeIndex}
          onClose={() => setSelectedNoticeIndex(null)}
          onPrev={() =>
            setSelectedNoticeIndex((prev) =>
              prev! > 0 ? prev! - 1 : NOTICE_GALLERY_DATA.length - 1
            )
          }
          onNext={() =>
            setSelectedNoticeIndex((prev) =>
              prev! < NOTICE_GALLERY_DATA.length - 1 ? prev! + 1 : 0
            )
          }
        />
      )}
    </div>
  );
}