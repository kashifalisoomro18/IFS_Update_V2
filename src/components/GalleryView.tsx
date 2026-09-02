/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  X,
  Eye,
  Images,
  GraduationCap,
  Trophy,
  Palette,
  Building2,
  CalendarDays,
  Camera,
  ArrowRight,
} from "lucide-react";

/* ---------------------------------------------------------
   Design tokens
--------------------------------------------------------- */
const NAVY = "#020816";
const SKY = "#60BADC";
const GOLD = "#F5C330";

/* ---------------------------------------------------------
   Data — swap `src` values for real school photography.
   `size` controls the card's aspect ratio in the masonry grid.
--------------------------------------------------------- */
const galleryItems = [
  { id: "1", src: "public/ACADEMICS7.JPG", alt: "Student holding flag", title: "Graduation", category: "academics", size: "tall" },
  { id: "2", src: "public/ACADEMICS1.JPG", alt: "Student reaching for a book on a tall shelf", title: "Finding the Right Book", category: "academics", size: "wide" },
  { id: "3", src: "public/IMG_2203.JPG", alt: "Student choosing a guitar from the music room wall", title: "Music Room", category: "cultural", size: "md" },
  { id: "4", src: "public/IMG_2210.JPG", alt: "Student viewing an art installation", title: "Gallery Walk", category: "cultural", size: "md" },
  { id: "5", src: "public/IMG_2348.JPG", alt: "Teacher giving a speech at the podium", title: "Annual Address", category: "events", size: "wide" },
  { id: "6", src: "public/ACADEMICS2.JPG", alt: "Teacher writing on the whiteboard", title: "Morning Lecture", category: "academics", size: "wide" },
  { id: "7", src: "public/IMG_4097.JPG", alt: "Group of students laughing together outdoors", title: "Between Classes", category: "campus", size: "md" },
  { id: "8", src: "public/ACADEMICS6.JPG", alt: "Student portrait holding folders", title: "Class of 2026", category: "academics", size: "tall" },
  { id: "9", src: "public/ACADEMICS5.JPG", alt: "Students examining an anatomy model", title: "Science Lab", category: "academics", size: "wide" },
  { id: "10", src: "https://picsum.photos/seed/edu-grad-10/800/650", alt: "Faculty member celebrating at graduation", title: "Graduation Day", category: "events", size: "wide" },
  { id: "11", src: "public/ACADEMICS3.JPG", alt: "Student reading in the library aisle", title: "Quiet Corner", category: "academics", size: "wide" },
  { id: "12", src: "public/IMG_4093.JPG", alt: "Students pointing at campus architecture", title: "Campus Tour", category: "campus", size: "wide" },
  { id: "13", src: "public/IMG_4095.JPG", alt: "Two students walking with backpacks and books", title: "Heading to Class", category: "campus", size: "wide" },
  { id: "14", src: "public/ACADEMICS4.JPG", alt: "Student thinking with a thoughtful expression", title: "Deep in Thought", category: "academics", size: "md" },
  { id: "15", src: "public/IMG_4096.JPG", alt: "Student reading on the campus lawn", title: "Outdoor Reading", category: "campus", size: "wide" },
  { id: "16", src: "public/playground.jpg", alt: "Athletes racing on the track", title: "Track Finals", category: "sports", size: "tall" },
  { id: "17", src: "public/play3.jpg", alt: "Basketball team celebrating a win", title: "Championship Match", category: "sports", size: "md" },
  { id: "18", src: "public/play2.jpg", alt: "Football team huddled on the field", title: "Team Huddle", category: "sports", size: "wide" },
  { id: "19", src: "public/playground5.jpg", alt: "Swimmer diving into the pool", title: "Swim Meet", category: "sports", size: "tall" },
  { id: "20", src: "https://picsum.photos/seed/culture-dance-20/800/900", alt: "Students performing a traditional dance", title: "Cultural Night", category: "cultural", size: "md" },
  { id: "21", src: "https://picsum.photos/seed/culture-art-21/800/650", alt: "Students painting a mural together", title: "Mural Project", category: "cultural", size: "wide" },
  { id: "22", src: "public/ID4.JPG", alt: "Students at the annual fall festival", title: "Fall Festival", category: "events", size: "tall" },
  { id: "23", src: "public/ID3.JPG", alt: "Student receiving an award on stage", title: "Honors Ceremony", category: "events", size: "md" },
  { id: "24", src: "public/IMG_4097.JPG", alt: "Wide view of the school building facade", title: "Main Building", category: "campus", size: "wide" },
];

const categories = [
  { id: "all", label: "All Memories", icon: Images },
  { id: "academics", label: "Academics", icon: GraduationCap },
  { id: "sports", label: "Sports", icon: Trophy },
  { id: "cultural", label: "Cultural", icon: Palette },
  { id: "campus", label: "Campus", icon: Building2 },
  { id: "events", label: "Events", icon: CalendarDays },
];

const categoryMeta = {
  academics: { label: "Academics", color: SKY },
  sports: { label: "Sports", color: "#E24C4C" },
  cultural: { label: "Cultural", color: "#F08A2B" },
  campus: { label: "Campus", color: "#4FAE6E" },
  events: { label: "Events", color: "#8A63D2" },
};

const aspectMap = {
  sm: { cls: "aspect-[4/5]", ratio: 4 / 5 },
  md: { cls: "aspect-[3/4]", ratio: 3 / 4 },
  lg: { cls: "aspect-[5/4]", ratio: 5 / 4 },
  tall: { cls: "aspect-[3/5]", ratio: 3 / 5 },
  wide: { cls: "aspect-[16/10]", ratio: 16 / 10 },
};

const PAGE_SIZE = 8;

/* ---------------------------------------------------------
   Hero
--------------------------------------------------------- */
function GalleryHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]" style={{ background: NAVY }}>
      {/* dot grid texture, top-left */}
      <div
        className="absolute left-0 top-0 h-full w-full opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

      {/* school photo, right half, blended into navy */}
      <div
        className="absolute inset-0 hidden sm:block"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/school-hero-banner/1600/900')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      {/* mobile fallback: fixed backgrounds behave inconsistently on touch devices, so use a static cover image there */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundImage: "url('https://picsum.photos/seed/school-hero-banner/1600/900')",
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
        className="pointer-events-none absolute -right-16 -top-24 hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="199" stroke={GOLD} strokeWidth="1.5" strokeOpacity="0.55" />
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
              className="text-[9.9px] font-bold uppercase tracking-[0.22em]"
              style={{ color: GOLD, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
            >
              Around the Campus
            </span>
          </div>

          <h1
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(43.2px, 5.85vw, 73.8px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            Gallery
          </h1>

          <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

          <p className="max-w-sm text-[13.5px] leading-relaxed text-white/80">
            Capturing the moments, memories and milestones that make our school special.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------
   Section header
--------------------------------------------------------- */
function GalleryHeader() {
  return (
    <motion.div
      className="mb-10 mt-16 text-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex items-center justify-center gap-3">
        {/* <span className="h-px w-8" style={{ background: NAVY }} />
        <span
          className="text-[11px] font-extrabold uppercase tracking-[0.2em]"
          style={{ color: NAVY, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
        >
          Around the Campus
        </span>
        <span className="h-px w-8" style={{ background: NAVY }} /> */}
      </div>
      <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-tight" style={{ color: NAVY }}>
        School <span style={{ color: GOLD }}>Gallery</span>
      </h2>
      <div className="mx-auto mt-3 h-1 w-16" style={{ background: SKY }} />
    </motion.div>
  );
}

/* ---------------------------------------------------------
   Filters
--------------------------------------------------------- */
function GalleryFilters({ active, onChange }) {
  return (
    <div className="flex justify-center px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 border border-slate-100 bg-white p-2 shadow-[0_8px_30px_-12px_rgba(2,8,22,0.15)]">
        {categories.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className="relative flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-colors duration-300 cursor-pointer"
              style={{
                color: isActive ? "#ffffff" : "#475569",
                background: isActive ? NAVY : "transparent",
              }}
            >
              <Icon size={15} />
              {label}

              {isActive && (
                <motion.span
                  layoutId="filterUnderline"
                  className="absolute -bottom-[6px] left-1/2 h-[3px] w-6 -translate-x-1/2"
                  style={{ background: GOLD }}
                  transition={{
                    type: "spring",
                    stiffness: 120, // Speed ko slow karne ke liye (pehle 300 tha)
                    damping: 20,    // Smoothness control karne ke liye
                    delay: 0.15     // Click ke baad 0.15 seconds ka halt/delay dene ke liye
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   Card
--------------------------------------------------------- */
function GalleryCard({ item, onClick, index, stretch }) {
  const meta = categoryMeta[item.category];
  return (
    <motion.button
      onClick={onClick}
      type="button"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.4) }}
      className={`group relative block w-full cursor-pointer overflow-hidden bg-slate-100 shadow-[0_10px_30px_-14px_rgba(2,8,22,0.35)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-14px_rgba(2,8,22,0.45)] ${stretch ? "min-h-0 flex-1" : aspectMap[item.size].cls
        }`}
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[500ms] ease-out group-hover:scale-[1.08]"
      />
      {/* sky-blue tinted gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(to top, rgba(2,8,22,0.88) 0%, rgba(96,186,220,0.28) 55%, rgba(96,186,220,0.05) 100%)",
        }}
      />
      <span
        className="absolute left-3.5 top-3.5 -translate-y-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: meta.color }}
      >
        {meta.label}
      </span>
      <span
        className="absolute right-3.5 top-3.5 flex h-9 w-9 -translate-y-1.5 items-center justify-center opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        style={{ background: GOLD, color: NAVY }}
      >
        <Eye size={16} />
      </span>
      <p className="absolute bottom-4 left-4 right-4 translate-y-2 text-left text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        {item.title}
      </p>
    </motion.button>
  );
}

/* ---------------------------------------------------------
   Masonry grid
--------------------------------------------------------- */
function useColumnCount() {
  const getCols = () => {
    if (typeof window === "undefined") return 4;
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    if (w < 1280) return 3;
    return 4;
  };
  const [cols, setCols] = useState(getCols);
  useEffect(() => {
    const onResize = () => setCols(getCols());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return cols;
}

// Greedy shortest-column placement: every new card goes into whichever
// column currently has the least accumulated height, so columns stay
// balanced and no column is left short with a gap at the bottom.
function distributeMasonry(items, colCount) {
  const columns = Array.from({ length: colCount }, () => []);
  const heights = Array(colCount).fill(0);
  items.forEach((item) => {
    let shortest = 0;
    for (let i = 1; i < colCount; i++) {
      if (heights[i] < heights[shortest]) shortest = i;
    }
    columns[shortest].push(item);
    heights[shortest] += 1 / aspectMap[item.size].ratio;
  });
  return columns;
}

function GalleryGrid({ items, onSelect }) {
  const cols = useColumnCount();
  const columns = useMemo(() => distributeMasonry(items, cols), [items, cols]);

  return (
    <div className="flex items-stretch gap-5">
      {columns.map((column, colIndex) => (
        <div key={colIndex} className="flex flex-1 flex-col gap-5">
          {column.map((item, itemIndex) => {
            const globalIndex = items.indexOf(item);
            return (
              <GalleryCard
                key={item.id}
                item={item}
                index={globalIndex}
                stretch={itemIndex === column.length - 1}
                onClick={() => onSelect(globalIndex)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Lightbox modal (masonry gallery)
--------------------------------------------------------- */
function GalleryModal({ items, activeIndex, onClose, onNavigate }) {
  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex - 1 + items.length) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate((activeIndex + 1) % items.length);
  }, [activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goPrev, goNext, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-md"
          style={{ background: "rgba(2,8,22,0.92)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:text-[#020816]"
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <X size={20} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous image"
            className="absolute left-3 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:text-[#020816] sm:left-6"
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <ChevronLeft size={22} />
          </button>

          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[80vh] max-w-[calc(100vw-3.5rem)] sm:max-w-3xl overflow-hidden"
          >
            <img src={item.src} alt={item.alt} className="max-h-[80vh] w-auto object-contain" />
            <div className="flex items-center justify-between px-5 py-3" style={{ background: NAVY }}>
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="text-xs font-mono uppercase tracking-widest text-white/50">
                {activeIndex + 1} / {items.length}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next image"
            className="absolute right-3 flex h-11 w-11 items-center justify-center bg-white/10 text-white transition-colors duration-300 hover:text-[#020816] sm:right-6"
            onMouseEnter={(e) => (e.currentTarget.style.background = GOLD)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "")}
          >
            <ChevronRight size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------
   Load more
--------------------------------------------------------- */
function LoadMoreButton({ hasMore, showLess, onLoadMore, onLoadLess }) {
  if (!hasMore && !showLess) return null;
  return (
    <div className="flex justify-center gap-4 pb-20 pt-10">
      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          className="group relative overflow-hidden px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white  transition-colors duration-300"
          style={{ background: NAVY }}
        >
          <span
            className="absolute inset-0 -z-0 w-0 transition-all duration-400 group-hover:w-full"
            style={{ background: SKY }}
          />
          <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-[#020816]">
            Load More Photos
          </span>
        </button>
      )}
      {showLess && (
        <button
          type="button"
          onClick={onLoadLess}
          className="group relative cursor-pointer overflow-hidden px-8 py-3.5 text-sm font-semibold transition-colors duration-300"
          style={{ color: NAVY, border: `1.5px solid ${NAVY}` }}
        >
          <span
            className="absolute inset-0 -z-0 w-0 transition-all duration-400 group-hover:w-full"
            style={{ background: GOLD }}
          />
          <span className="relative z-10">Show Less</span>
        </button>
      )}
    </div>
  );
}

/* ================================================================
   HOUSES SECTION — data, lightbox, previews and house sections
================================================================ */
const HOUSES = [
  {
    id: "peridots",
    name: "House of Peridots",
    gem: "Peridot",
    tagline: "Growth • Curiosity • Resilience",
    description:
      "Peridots channel their energy into inquiry, championing curiosity in every classroom, lab and field they enter.",
    color: "#6E9B3A",
    tint: "#EEF5E4",
    icon: "/Peridot.png",
    images: [
      { id: "per-1", src: "https://picsum.photos/seed/peridot-house-1/900/700", caption: "House assembly", category: "student-life" },
      { id: "per-2", src: "https://picsum.photos/seed/peridot-house-2/900/700", caption: "Science fair build", category: "events" },
      { id: "per-3", src: "https://picsum.photos/seed/peridot-house-3/900/700", caption: "Inter-house football", category: "sports" },
      { id: "per-4", src: "https://picsum.photos/seed/peridot-house-4/900/700", caption: "Green wing corridor", category: "facilities" },
      { id: "per-5", src: "https://picsum.photos/seed/peridot-house-5/900/700", caption: "Study circle", category: "student-life" },
      { id: "per-6", src: "https://picsum.photos/seed/peridot-house-6/900/700", caption: "Annual prize giving", category: "events" },
    ],
  },
  {
    id: "celestites",
    name: "House of Celestites",
    gem: "Celestite",
    tagline: "Calm • Clarity • Cooperation",
    description:
      "Celestites bring a steady, collaborative spirit to everything from debate finals to the quiet corners of the library.",
    color: "#4E8FB8",
    tint: "#E7F1F7",
    icon: "/Celestite.png",
    images: [
      { id: "cel-1", src: "https://picsum.photos/seed/celestite-house-1/900/700", caption: "Debate finals", category: "events" },
      { id: "cel-2", src: "https://picsum.photos/seed/celestite-house-2/900/700", caption: "Basketball practice", category: "sports" },
      { id: "cel-3", src: "https://picsum.photos/seed/celestite-house-3/900/700", caption: "Blue wing library nook", category: "facilities" },
      { id: "cel-4", src: "https://picsum.photos/seed/celestite-house-4/900/700", caption: "House orientation", category: "student-life" },
      { id: "cel-5", src: "https://picsum.photos/seed/celestite-house-5/900/700", caption: "Robotics workshop", category: "events" },
      { id: "cel-6", src: "https://picsum.photos/seed/celestite-house-6/900/700", caption: "Morning house huddle", category: "student-life" },
    ],
  },
  {
    id: "garnets",
    name: "House of Garnets",
    gem: "Garnet",
    tagline: "Courage • Drive • Discipline",
    description:
      "Garnets lead with grit — first on the track, loudest at the finals, and always first to volunteer.",
    color: "#A13D3D",
    tint: "#F6E7E5",
    icon: "/Garnet.jpg",
    images: [
      { id: "gar-1", src: "https://picsum.photos/seed/garnet-house-1/900/700", caption: "Track & field day", category: "sports" },
      { id: "gar-2", src: "https://picsum.photos/seed/garnet-house-2/900/700", caption: "Debate & MUN expo", category: "events" },
      { id: "gar-3", src: "https://picsum.photos/seed/garnet-house-3/900/700", caption: "Red wing common room", category: "facilities" },
      { id: "gar-4", src: "https://picsum.photos/seed/garnet-house-4/900/700", caption: "Cricket finals", category: "sports" },
      { id: "gar-5", src: "https://picsum.photos/seed/garnet-house-5/900/700", caption: "House captain briefing", category: "student-life" },
      { id: "gar-6", src: "https://picsum.photos/seed/garnet-house-6/900/700", caption: "Founders' day march", category: "events" },
    ],
  },
  {
    id: "amethyst",
    name: "House of Amethyst",
    gem: "Amethyst",
    tagline: "Creativity • Expression • Imagination",
    description:
      "Amethysts turn every hallway into a canvas, bringing colour, music and story to campus life.",
    color: "#7B4FA0",
    tint: "#F1E9F7",
    icon: "/Amethyst.png",
    images: [
      { id: "ame-1", src: "https://picsum.photos/seed/amethyst-house-1/900/700", caption: "Art & culture expo", category: "events" },
      { id: "ame-2", src: "https://picsum.photos/seed/amethyst-house-2/900/700", caption: "Drama rehearsal", category: "student-life" },
      { id: "ame-3", src: "https://picsum.photos/seed/amethyst-house-3/900/700", caption: "Purple wing studio", category: "facilities" },
      { id: "ame-4", src: "https://picsum.photos/seed/amethyst-house-4/900/700", caption: "Badminton meet", category: "sports" },
      { id: "ame-5", src: "https://picsum.photos/seed/amethyst-house-5/900/700", caption: "Music showcase", category: "events" },
      { id: "ame-6", src: "https://picsum.photos/seed/amethyst-house-6/900/700", caption: "House bonding day", category: "student-life" },
    ],
  },
];

function HouseLightbox({ images, title, accentColor, index, onClose, onNext, onPrev }) {
  const img = images[index];

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md"
      style={{ background: "rgba(2,8,22,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8 sm:top-8"
      >
        <X className="h-5 w-5" />
      </button>

      <button
        aria-label="Previous photo"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next photo"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden shadow-2xl">
          <img src={img.src} alt={img.caption} className="max-h-[75vh] w-full object-cover" />
        </div>
        <div className="mt-4 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5" style={{ background: accentColor }} />
            <p className="text-sm font-semibold text-white">{img.caption}</p>
          </div>
          <p className="font-mono text-xs uppercase tracking-widest text-white/50">
            {index + 1} / {images.length} — {title}
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

function HouseSection({ house, delay }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section id={`house-${house.id}`} className="scroll-mt-24 px-6 py-16 sm:py-20 lg:px-12" style={{ background: house.tint }}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay }}
        >
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="flex h-15 w-15 flex-shrink-0 items-center justify-center shadow-sm"
                style={{ background: house.color }}
              >
                <img src={house.icon} alt={`${house.name} crest`} className="h-15 w-15 object-contain" />
              </span>
              <span
                className="text-[9.9px] font-extrabold uppercase tracking-[0.18em]"
                style={{ color: house.color, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                {house.tagline}
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,3.06vw,2.5rem)] font-extrabold leading-tight" style={{ color: NAVY }}>
              {house.name}
            </h2>
            <div className="mt-3 h-1 w-16" style={{ background: house.color }} />
          </div>

          {/* <p className="max-w-md text-sm leading-relaxed text-slate-600">{house.description}</p> */}
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {house.images.map((img, i) => (
            <motion.div
              key={img.id}
              className="group relative cursor-pointer overflow-hidden border-t-4 bg-white shadow-sm transition-shadow hover:shadow-xl"
              style={{ borderTopColor: house.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              whileHover={{ y: -6 }}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/0 transition-colors group-hover:bg-slate-950/30" />
                <Camera className="absolute right-3 top-3 h-4 w-4 text-white/0 transition-colors group-hover:text-white/90" />
              </div>
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <HouseLightbox
            images={house.images}
            title={house.name}
            accentColor={house.color}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % house.images.length))}
            onPrev={() => setLightboxIndex((i) => (i === null ? 0 : (i - 1 + house.images.length) % house.images.length))}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function HousePreviewCard({ house, onView, delay }) {
  return (
    <motion.div
      className="group border border-slate-100 bg-white p-6 shadow-[0_8px_30px_-16px_rgba(2,8,22,0.25)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-16px_rgba(2,8,22,0.3)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
    >
      <div className="mb-1 flex items-center gap-3">
        <span
          className="flex h-11 w-11 flex-shrink-0 items-center justify-center"
          style={{ background: `${house.color}17` }}
        >
          <img src={house.icon} alt={`${house.name} crest`} className="h-11 w-11 object-contain" />
        </span>
        <h3 className="text-[13.5px] font-extrabold leading-tight" style={{ color: house.color }}>
          {house.name}
        </h3>
      </div>
      <p className="mb-4 ml-[3.5rem] text-xs font-medium text-slate-500">{house.tagline}</p>

      <div className="mb-5 grid grid-cols-4 gap-2">
        {house.images.slice(0, 4).map((img) => (
          <div key={img.id} className="relative aspect-square overflow-hidden bg-slate-100">
            <img src={img.src} alt={img.caption} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
            <div
              className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `${house.color}99` }}
            />
          </div>
        ))}
      </div>

      {/* comment button for temporary */}
      {/* <button
        type="button"
        onClick={onView}
        className="flex w-full items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-transform duration-200 hover:scale-[1.02]"
        style={{ background: house.color }}
      >
        View Moments <ArrowRight size={14} />
      </button> */}
    </motion.div>
  );
}

function HousesGallery() {
  const [activeHouse, setActiveHouse] = useState("all");

  const visibleHouses = activeHouse === "all" ? HOUSES : HOUSES.filter((h) => h.id === activeHouse);

  const scrollToHouse = (id) => {
    setActiveHouse(id);
    requestAnimationFrame(() => {
      const el = document.getElementById(`house-${id}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <div className="w-full" id="houses-gallery-section">
      <section style={{ background: "#F8FAFC" }} className="px-6 py-16 sm:py-20 lg:px-12">
        <div className="mx-auto mb-12 flex max-w-7xl flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8" style={{ background: SKY }} />
              <span
                className="text-[9.9px] font-bold uppercase tracking-[0.18em]"
                style={{ color: SKY, fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
              >
                Four Houses, One School
              </span>
            </div>

            <h2 className="text-[clamp(1.75rem,3.6vw,2.5rem)] font-extrabold leading-tight" style={{ color: NAVY }}>
              Life Across Our <span style={{ color: SKY }}>Houses</span>
            </h2>
            <div className="mb-5 mt-3 h-1 w-16" style={{ background: GOLD }} />
            <p className="text-sm leading-relaxed text-slate-500">
              Every student belongs to one of four houses — Peridots, Celestites, Garnets, and
              Amethyst — each with its own spirit, colours, and moments captured here.
            </p>
          </div>

          {/* segmented house tabs */}
          <div className="flex flex-wrap gap-1.5 p-1.5 lg:flex-nowrap" style={{ background: NAVY }}>
            {[{ id: "all", name: "All Houses", color: GOLD }, ...HOUSES.map((h) => ({ id: h.id, name: h.name.replace("House of ", ""), color: h.color }))].map((h) => {
              const isActive = activeHouse === h.id;
              return (
                <button
                  key={h.id}
                  onClick={() => setActiveHouse(h.id)}
                  className="relative overflow-hidden px-5 py-2.5 text-xs font-semibold uppercase tracking-wider sm:text-sm"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeHouseTab"
                      className="absolute inset-0 z-0"
                      style={{ background: h.color, border: h.id === "all" ? `1.5px solid ${GOLD}` : "none" }}
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    />
                  )}
                  <span
                    className="relative z-10 transition-colors duration-300"
                    style={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.65)" }}
                  >
                    {h.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* preview cards */}
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOUSES.map((house, i) => (
            <HousePreviewCard key={house.id} house={house} delay={i * 0.05} onView={() => scrollToHouse(house.id)} />
          ))}
        </div>
      </section>

      {visibleHouses.map((house, i) => (
        <HouseSection key={house.id} house={house} delay={i * 0.05} />
      ))}
    </div>
  );
}

/* ---------------------------------------------------------
   Page — masonry gallery + houses section together
--------------------------------------------------------- */
export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState(null);

  // On mount: check sessionStorage for a scroll target set by ActivitiesView
  useEffect(() => {
    const target = sessionStorage.getItem("galleryScrollTarget");
    if (!target) return;
    sessionStorage.removeItem("galleryScrollTarget");

    // Poll until the element appears in the DOM (handles AnimatePresence delay)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const el = document.getElementById(target);
      if (el) {
        clearInterval(interval);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (attempts >= 30) {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const filteredItems = useMemo(
    () =>
      activeCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <main className="bg-white" id="gallery-view-container" style={{ zoom: 0.95 }}>
      <GalleryHero />
      <GalleryHeader />
      <GalleryFilters active={activeCategory} onChange={handleCategoryChange} />

      <section className="mx-auto max-w-[1350px] px-4 pt-12 sm:px-6 lg:px-8">
        <GalleryGrid items={visibleItems} onSelect={setActiveIndex} />
        <LoadMoreButton
          hasMore={visibleCount < filteredItems.length}
          showLess={visibleCount > PAGE_SIZE}
          onLoadMore={() => setVisibleCount((c) => c + PAGE_SIZE)}
          onLoadLess={() => setVisibleCount(PAGE_SIZE)}
        />
      </section>

      <GalleryModal
        items={filteredItems}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />

      <HousesGallery />
    </main>
  );
}