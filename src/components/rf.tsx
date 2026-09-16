/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gem,
  Camera,
  Sparkles,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ================================================================
   HOUSE DATA
   Replace the `images` arrays with real photography whenever it's
   ready — everything else (layout, filtering, lightbox) just works
   off this array, same pattern as the About page's member arrays.
================================================================ */
type HouseImage = {
  id: string;
  src: string;
  caption: string;
  category: "facilities" | "student-life" | "sports" | "events";
};

type House = {
  id: string;
  name: string;
  gem: string;
  tagline: string;
  description?: string;
  color: string; // accent
  tint: string; // soft background tint
  images: HouseImage[];
};

const HOUSES: House[] = [
  {
    id: "peridots",
    name: "House of Peridots",
    gem: "Peridot",
    tagline: "Growth • Curiosity • Resilience",
    // description:
    //   "Peridots channel their energy into steady, patient effort — the house best known for turning up early to labs, finishing what they start, and cheering loudest for teammates rather than themselves.",
    color: "#6E9B3A",
    tint: "#EEF5E4",
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
    // description:
    //   "Celestites bring a quiet, level-headed presence to everything — the house that mediates disagreements, keeps group projects on schedule, and treats every teammate's idea as worth hearing out.",
    color: "#4E8FB8",
    tint: "#E7F1F7",
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
    // description:
    //   "Garnets are the competitive spine of the house system — first on the field, last to leave practice, and consistently the name called out at inter-house sports finals.",
    color: "#A13D3D",
    tint: "#F6E7E5",
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
    // description:
    //   "Amethysts lead with imagination — the house behind the loudest art installations, the sharpest stage productions, and the most original entries at every school exhibition.",
    color: "#7B4FA0",
    tint: "#F1E9F7",
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

/* ================================================================
   GENERAL GALLERY — school-wide images, not tied to any house
================================================================ */
const GENERAL_GALLERY: HouseImage[] = [
  { id: "gen-1", src: "https://picsum.photos/seed/ifs-general-1/900/700", caption: "Main campus building", category: "facilities" },
  { id: "gen-2", src: "https://picsum.photos/seed/ifs-general-2/900/700", caption: "Annual sports day", category: "sports" },
  { id: "gen-3", src: "https://picsum.photos/seed/ifs-general-3/900/700", caption: "Science & tech expo", category: "events" },
  { id: "gen-4", src: "https://picsum.photos/seed/ifs-general-4/900/700", caption: "Students in the library", category: "student-life" },
  { id: "gen-5", src: "https://picsum.photos/seed/ifs-general-5/900/700", caption: "Auditorium assembly", category: "events" },
  { id: "gen-6", src: "https://picsum.photos/seed/ifs-general-6/900/700", caption: "Campus grounds", category: "facilities" },
  { id: "gen-7", src: "https://picsum.photos/seed/ifs-general-7/900/700", caption: "Graduation day", category: "events" },
  { id: "gen-8", src: "https://picsum.photos/seed/ifs-general-8/900/700", caption: "Classroom activity", category: "student-life" },
];

/* ================================================================
   LIGHTBOX
================================================================ */
function Lightbox({
  images,
  title,
  accentColor,
  index,
  onClose,
  onNext,
  onPrev,
}: {
  images: HouseImage[];
  title: string;
  accentColor: string;
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const img = images[index];

  // Lock page scroll while the lightbox is open, and restore it on close.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Rendered through a portal straight into <body>. This escapes any
  // transformed ancestor (e.g. the page-transition wrapper around each
  // view) — once an ancestor has a CSS transform, `position: fixed`
  // stops anchoring to the real viewport and anchors to that ancestor's
  // box instead, which is what was causing the stray gaps / scroll-through.
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(9,17,35,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-8 sm:right-8 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <button
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <motion.div
        key={img.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden shadow-2xl">
          <img src={img.src} alt={img.caption} className="w-full max-h-[75vh] object-cover" />
        </div>
        <div className="flex items-center justify-between mt-4 px-1">
          <div className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: accentColor }}
            />
            <p className="text-white text-sm font-semibold">{img.caption}</p>
          </div>
          <p className="text-white/50 text-xs font-mono uppercase tracking-widest">
            {index + 1} / {images.length} — {title}
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/* ================================================================
   HOUSE SECTION
================================================================ */
function HouseSection({
  house,
  delay,
}: {
  house: House;
  delay: number;
}) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section
      id={`house-${house.id}`}
      className="py-16 sm:py-20 px-6 lg:px-12"
      style={{ background: house.tint }}
    >
      <div className="max-w-7xl mx-auto">
        {/* House header */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay }}
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span
                className="w-11 h-11 flex items-center justify-center flex-shrink-0"
                style={{ background: house.color }}
              >
                <Gem className="w-5 h-5 text-white" strokeWidth={2} />
              </span>
              <span
                style={{
                  fontFamily:
                    "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  color: house.color,
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {house.tagline}
              </span>
            </div>

            <h2
              className="font-serif font-extrabold text-slate-900"
              style={{ fontSize: "clamp(1.75rem, 3.06vw, 2.5rem)", lineHeight: 1.15 }}
            >
              {house.name}
            </h2>
            <div className="h-1 w-16 mt-3" style={{ background: house.color }} />
          </div>

          <p className="text-slate-600 leading-relaxed text-sm max-w-md">
            {house.description}
          </p>
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {house.images.map((img, i) => (
            <motion.div
              key={img.id}
              className="group relative bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border-t-4"
              style={{ borderTopColor: house.color }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: 0.05 * i }}
              whileHover={{ y: -6 }}
              onClick={() => setLightboxIndex(i)}
            >
              <div className="h-56 overflow-hidden relative">
                <img
                  src={img.src}
                  alt={img.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/30 transition-colors" />
                <Camera className="absolute top-3 right-3 w-4 h-4 text-white/0 group-hover:text-white/90 transition-colors" />
              </div>
              <div className="px-4 py-3">
                <p className="text-slate-800 text-sm font-semibold">{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={house.images}
            title={house.name}
            accentColor={house.color}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNext={() => setLightboxIndex((i) => (i === null ? 0 : (i + 1) % house.images.length))}
            onPrev={() =>
              setLightboxIndex((i) => (i === null ? 0 : (i - 1 + house.images.length) % house.images.length))
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}


/* ================================================================
   MAIN GALLERY VIEW
================================================================ */
export default function GalleryView() {
  const [activeHouse, setActiveHouse] = useState<string>("all");

  const visibleHouses =
    activeHouse === "all" ? HOUSES : HOUSES.filter((h) => h.id === activeHouse);

  return (
    <div className="w-full space-y-0 fade-in" id="gallery-view-container">
      {/* ============================================================
          1. HERO SECTION — matches About/Facilities hero exactly
      ============================================================ */}
      <section
        className="relative h-[420px] lg:h-[430px] overflow-hidden"
        style={{
          backgroundImage: "url('/building-image1.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(90deg, rgba(11,32,63,0.80) 0%, rgba(11,32,63,0.55) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[4px] z-[2]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #F5C330 30%, #F5C330 70%, transparent 100%)",
          }}
        />
        <div className="relative z-[3] max-w-7xl mx-auto h-full flex items-end px-8 lg:px-16 pb-12 lg:pb-16">
          <motion.div
            className="-ml-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1
              style={{
                fontSize: "clamp(50.4px, 6.3vw, 72px)",
                fontWeight: 750,
                lineHeight: "1",
                letterSpacing: "-3px",
                color: "#ffffff",
                fontFamily: "Inter, sans-serif",
                margin: 0,
              }}
            >
              GALLERY
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          2. GENERAL GALLERY — all school images, house-agnostic
      ============================================================ */}
      {/* <GeneralGallerySection /> */}

      {/* ============================================================
          3. INTRO / SECTION HEADER — matches Facilities grid header
      ============================================================ */}
      <section style={{ background: "#f8fafc", padding: "72px 32px 0" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}>
          <div className="flex items-center justify-center gap-3 mb-9">
            <span className="w-8 h-px bg-[#020618]" />
            <span
              style={{
                fontFamily:
                  "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                color: "#020816",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Four Houses, One School
            </span>
            <span className="w-8 h-px bg-[#020618]" />
          </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
              fontWeight: 800,
              color: "#020816",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Life Across Our <span style={{ color: "#F5C330" }}>Houses</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed mb-2">
            Every student belongs to one of four houses — Peridots, Celestites, Garnets, and
            Amethyst — each with its own spirit, colours, and moments captured here.
          </p>
          {/* <div style={{ width: "64px", height: "4px", background: "#60BADC", margin: "0 auto" }} /> */}
        </div>
      </section>
      

      {/* ============================================================
          4. HOUSE TABS — navy pill bar, like About's O/A Level switcher
      ============================================================ */}
      <section style={{ background: "#f8fafc", padding: "48px 32px 64px" }}>
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-2 bg-[#0d1f3c] p-1.5">
            {[{ id: "all", name: "All Houses", color: "#F5C330" }, ...HOUSES].map((h) => (
              <button
                key={h.id}
                onClick={() => setActiveHouse(h.id)}
                className="relative px-5 py-2.5 text-xs sm:text-sm font-semibold uppercase tracking-wider overflow-hidden"
              >
                {activeHouse === h.id && (
                  <motion.div
                    layoutId="activeHouseTab"
                    className="absolute inset-0 z-0"
                    style={{ background: h.color }}
                    transition={{ type: "spring", stiffness: 200, damping: 30 }}
                  />
                )}
                <span
                  className="relative z-10 transition-colors duration-300"
                  style={{ color: activeHouse === h.id ? "#ffffff" : "rgba(255, 255, 255)" }}
                >
                  {h.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. HOUSE SECTIONS
      ============================================================ */}
      {visibleHouses.map((house, i) => (
        <HouseSection key={house.id} house={house} delay={i * 0.05} />
      ))}

      {/* ============================================================
          6. HOUSE SPIRIT CTA — matches About/Facilities bottom CTA
      ============================================================ */}
      {/* <section className="relative h-[auto] min-h-[460px] flex items-center overflow-hidden py-16 lg:py-20">
        <img
          src="/building-image1.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)",
          }}
        />
        <div className="relative z-[2] w-full px-6 lg:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <Sparkles className="w-4 h-4 text-[#F5C330]" />
              <span className="text-white text-xs font-bold uppercase tracking-widest">
                Every House Has a Story
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
              Which House Will <span className="text-[#F5C330]">You</span> Join?
            </h2>
            <p className="text-white text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              From Peridot's steady discipline to Amethyst's creative flair, every house
              gives students a home team to grow, compete, and celebrate with.
            </p>
            <a href="#admissions-registration" className="success-btn" style={{ textDecoration: "none" }}>
              <span className="success-btn-bg" />
              <span className="success-btn-content">
                Explore Admissions <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>
      </section> */}

      {/* Shared button styles reused from the About page's design system */}
      <style>{`
        .success-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 34px;
          background: #ffffff;
          color: #020618;
          border-radius: 0;
          font-weight: 700;
          font-size: 14.4px;
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
        .success-btn:hover .success-btn-bg { left: 0; }
        .success-btn:hover .success-btn-content { color: white; }
      `}</style>
    </div>
  );
}