/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Beaker,
  BookOpen,
  Flame,
  Tv,
  Coffee,
  Truck,
  ShieldCheck,
  Camera,
  ArrowRight,
  ArrowUpRight,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Plus,
  X,
  LucideIcon,
} from "lucide-react";

const NAVY = "#0d1f3c";
const GOLD = "#F5C330";
const SKY = "#60BADC";

function useReveal(threshold = 0.15) {
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
/* ================================================================
   FACILITY CARD
   - Falls back to a clean icon/color block if no image is given, or
     if the image fails to load (no more broken-image icon).
   - If `images` (1 or more) is provided, hovering shows a "view
     photos" hint, and clicking expands the photo in place, hiding
     the title/description.
   - Whether a card is expanded is controlled by the PARENT
     (`FacilitiesView`) via `isExpanded` + `onToggle`, instead of each
     card managing its own local boolean. That's what makes opening
     one card automatically close whichever other card was open —
     only one `id` can be the "expanded" one at a time, see the
     `expandedCard` state in `FacilitiesView` below.
   - When a card has multiple images and isn't expanded, the photo
     auto-advances every few seconds (auto-cycling carousel). Manual
     next/prev interaction pauses auto-play briefly so it doesn't
     fight the user, then resumes.
================================================================ */
type FacilityCardProps = {
  id: string;
  icon: LucideIcon;
  name: string;
  description: string;
  images?: string[];
  imagePlaceholderColor?: string;
  needsPhoto?: boolean;
  delay?: number;
  isExpanded: boolean;
  onToggle: () => void;
};

function FacilityCard({
  icon: Icon,
  name,
  description,
  images = [],
  imagePlaceholderColor = "bg-slate-50",
  needsPhoto = false,
  delay = 0,
  isExpanded,
  onToggle,
}: FacilityCardProps) {
  const [failedIndexes, setFailedIndexes] = useState<Set<number>>(new Set());
  const [cardIndex, setCardIndex] = useState(0);
  const [autoPlayPaused, setAutoPlayPaused] = useState(false);

  const validImages = images.filter((_, i) => !failedIndexes.has(i));
  const hasImages = validImages.length > 0;
  const hasMultiple = validImages.length > 1;
  const coverImage = hasImages ? validImages[cardIndex % validImages.length] : null;

  const handlePhotoClick = () => {
    if (!hasImages) return;
    onToggle();
  };

  // Arrows cycle the photo — stopPropagation so they never also
  // trigger the expand/collapse toggle on the image beneath them.
  const cardNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardIndex((i) => (i + 1) % validImages.length);
    setAutoPlayPaused(true);
  };
  const cardPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCardIndex((i) => (i - 1 + validImages.length) % validImages.length);
    setAutoPlayPaused(true);
  };

  // Auto-cycle through images. Applies an initial delay (staggered per card)
  // so they don't all flip at the exact same time, then cycles every 5s.
  // Pauses while expanded or manually interacted with.
  useEffect(() => {
    if (!hasMultiple || isExpanded || autoPlayPaused) return;

    let intervalTimer: ReturnType<typeof setInterval>;

    // Apply an initial delay first before starting the continuous cycle
    const initialTimer = setTimeout(() => {
      setCardIndex((i) => (i + 1) % validImages.length);

      // Start the regular cycle
      intervalTimer = setInterval(() => {
        setCardIndex((i) => (i + 1) % validImages.length);
      }, 5000);
    }, 4000 + delay * 1000); // 3s base delay + stagger

    return () => {
      clearTimeout(initialTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [hasMultiple, isExpanded, autoPlayPaused, validImages.length, delay]);

  // Resume auto-play a few seconds after a manual interaction.
  useEffect(() => {
    if (!autoPlayPaused) return;
    const resumeTimer = setTimeout(() => setAutoPlayPaused(false), 8000);
    return () => clearTimeout(resumeTimer);
  }, [autoPlayPaused]);

  return (
    <motion.div
      className="group bg-white shadow-md flex flex-col items-center text-center w-full sm:w-[300px] lg:w-[330px] overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      whileHover={!isExpanded ? { y: -8, boxShadow: "0 20px 35px rgba(11,32,63,0.18)" } : {}}
      layout
    >
      {/* Photo area — this is the part that grows to fill the whole
          card when clicked. It's a motion element so the height
          change animates instead of jumping. */}
      <motion.div
        className="relative w-full flex-shrink-0"
        animate={{ height: isExpanded ? 480 : 280 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div
          className={`w-full h-full overflow-hidden ${hasImages ? "cursor-pointer" : ""}`}
          onClick={handlePhotoClick}
          role={hasImages ? "button" : undefined}
          aria-label={hasImages ? (isExpanded ? `Collapse ${name} photo` : `Expand ${name} photo`) : undefined}
        >
          <AnimatePresence mode="wait">
            {coverImage ? (
              <motion.img
                key={cardIndex}
                src={coverImage}
                alt={name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                  !isExpanded ? "group-hover:scale-110" : ""
                }`}
                onError={() =>
                  setFailedIndexes((prev) => new Set(prev).add(cardIndex))
                }
              />
            ) : (
              <div className={`w-full h-full ${imagePlaceholderColor} flex items-center justify-center`}>
                <Icon className="w-9 h-9 text-secondary/50" strokeWidth={1.5} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Needs-photo badge — only shown in the normal (collapsed) state */}
        <AnimatePresence>
          {needsPhoto && !isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 left-2 z-10 bg-primary text-slate-900 text-[9px] font-bold px-2.5 py-1 flex items-center gap-1 shadow-sm"
            >
              <Camera className="w-3 h-3" strokeWidth={2.5} />
              Needs Photos
            </motion.span>
          )}
        </AnimatePresence>

        {/* Photo count badge — top-left, only when there are multiple photos and not expanded */}
        {hasMultiple && !isExpanded && (
          <span
            className="absolute top-2 left-2 z-10 text-white text-[9.9px] font-bold px-2.5 py-1 flex items-center gap-1.5 shadow-sm"
            style={{
              background: "rgba(13, 31, 60, 0.35)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
            }}
          >
            <Camera className="w-3 h-3" strokeWidth={2.5} />
            {validImages.length} Photos
          </span>
        )}

        {/* Collapse ("x") button — only while expanded */}
        <AnimatePresence>
          {isExpanded && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              aria-label={`Collapse ${name} photo`}
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
              className="absolute top-3 right-3 z-20 w-8 h-8 bg-slate-950/60 text-white flex items-center justify-center transition-colors duration-200 hover:bg-[#F5C330] hover:text-[#0d1f3c]"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Prev / next arrows — visible on hover when collapsed,
            always visible while expanded so you can browse the gallery.
            Hover state turns them yellow (brand primary) instead of white. */}
        {hasMultiple && (
          <>
            <button
              aria-label="Previous photo"
              onClick={cardPrev}
              className={`absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 shadow flex items-center justify-center transition-all duration-200 hover:bg-[#F5C330] hover:scale-110 ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-slate-900" />
            </button>
            <button
              aria-label="Next photo"
              onClick={cardNext}
              className={`absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/90 shadow flex items-center justify-center transition-all duration-200 hover:bg-[#F5C330] hover:scale-110 ${
                isExpanded ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <ChevronRight className="w-4 h-4 text-slate-900" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
              {validImages.map((_, i) => (
                <span
                  key={i}
                  className={`rounded-full transition-all ${
                    i === cardIndex ? "bg-white w-4 h-1.5" : "bg-white/45 w-1.5 h-1.5"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Blue hover tint + zoom icon — the overlay that appears over the
            photo on hover, same idea as the green-tinted "click to view"
            treatment, just in the brand blue instead of green. */}
        {hasImages && !isExpanded && (
          <>
            <div
              className="absolute inset-0 z-[5] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(96, 186, 220, 0.45)" }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/95 shadow-md flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
              <Plus className="w-5 h-5 text-[#0d1f3c]" strokeWidth={2.5} aria-hidden="true" />
            </div>
          </>
        )}

        {/* Floating icon badge — hidden while expanded so it doesn't
            float awkwardly over a full-bleed photo */}
        {!isExpanded && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 z-10 w-11 h-11 rounded-full bg-secondary ring-4 ring-white shadow-md flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
            <Icon className="w-5 h-5 text-white" strokeWidth={2} />
          </div>
        )}
      </motion.div>

      {/* Text — collapses away (height + opacity) when the photo expands */}
      <AnimatePresence initial={false}>
        {!isExpanded && (
          <motion.div
            key="text"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full overflow-hidden"
          >
            <div className="pt-8 pb-4 px-4">
              <h3 className="font-serif font-bold text-slate-900 text-base leading-snug">
                {name}
              </h3>
              <p
                className="text-slate-600 text-xs leading-relaxed mt-2"
                style={{
                  minHeight: "3.75rem", // reserves space for 3 lines so cards stay level
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FacilitiesView() {
  const { ref: ctaRef, visible: ctaVisible } = useReveal();

  // Tracks which single card (by id) is currently expanded, across the
  // whole grid. Opening a new card just changes this value, which
  // automatically makes the previously-open card collapse — because
  // its `isExpanded` prop (expandedCard === its own id) becomes false.
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedCard((current) => (current === id ? null : id));
  };

  return (
    <div className="w-full space-y-0 bg-[#f8fafc] text-slate-800 font-sans" id="facilities-view-container" style={{ zoom: 0.95 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:wght@700;800&display=swap');

        .facilities-hero-section * {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* ============================================================
          1. HERO SECTION
      ============================================================ */}
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

  {/* campus photo, right half, blended into navy */}
  <div
    className="absolute inset-0 hidden sm:block"
    style={{
      backgroundImage: "url('/Campus.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
    }}
  />
  {/* mobile fallback: fixed backgrounds behave inconsistently on touch devices, so use a static cover image there */}
  <div
    className="absolute inset-0 sm:hidden"
    style={{
      backgroundImage: "url('/Campus.jpg')",
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
  {[190, 140, 90].map((r, i) => (
    <circle
      key={i}
      cx="200"
      cy="200"
      r={r}
      stroke={GOLD}
      strokeWidth="1.5"
      strokeOpacity={0.6 - i * 0.15}
    />
  ))}
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
          Explore Our Campus
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
        Facilities
      </h1>

      <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

      <p className="max-w-sm text-[13.5px] leading-relaxed text-white/70">
        World-class spaces and resources designed to support learning, growth, and discovery.
      </p>
    </motion.div>
  </div>
</section>

      {/* ============================================================
          2. FACILITIES GRID SECTION
      ============================================================ */}
      <section id="facilities-grid-section" style={{ background: "#f8fafc", padding: "200px 32px 64px" }}>
        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>

          {/* ── Section header ─────────────────────────────────── */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div className="flex items-center justify-center gap-3 mb-9">
              <span className="w-8 h-px bg-[#020618]" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                  display: "inline-block",
                  color: "#020816",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                Our Learning Spaces
              </span>
              <span className="w-8 h-px bg-[#020618]" />
            </div>

          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
              fontWeight: 800,
              color: "#0d1f3c",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Explore Our Campus <span style={{ color: "#F5C330" }}><br/>Facilities</span>
          </h2>
            <div
              style={{
                width: "64px",
                height: "4px",
                background: "#60BADC",
                borderRadius: "0px",
                margin: "0 auto",
              }}
            />

           {/* <p
              style={{
                maxWidth: "720px",
                margin: "24px auto 0",
                color: "#020816",
                fontSize: "1rem",
                lineHeight: 1.75,
                textAlign: "justify",
              }}
            >
              Every space on campus is designed with purpose — from fully equipped science labs to
              secure, open grounds for play — supporting learning that extends well beyond the
              classroom. Our facilities reflect the same standard of excellence we've upheld for
              nearly four decades, built to nurture curiosity, confidence, and growth in every
              student who walks through them.
            </p> */}
          </div>

          {/* ── Facility cards — each one written out separately ─── */}
          {/* To add photos to a card: pass images={["/path/one.jpg", "/path/two.jpg"]}.
              Leave images empty/omitted and it shows a clean icon placeholder instead
              of a broken image — no need for the file to exist yet.
              Each card also needs a unique `id` — that's what the "only one card
              expanded at a time" behavior uses to know which one is open. */}
          <div className="flex flex-wrap items-start justify-center gap-8" id="facilities-grid">

            {/* Card 1 — Science / Laboratories: physics, chemistry and biology labs. Flagged as needing real photos. */}
            <FacilityCard
              id="science"
              icon={Flame}
              name="Science / Computer labs"
              description="Well-equipped labs ."
              images={["/sci.jpg", "/sci1.jpg", "/sci2.jpg", "/scilab.jpg", "/lab1.jpg", "/lab2.jpg","lab5.JPG" ]}
              delay={0.2}
              isExpanded={expandedCard === "science"}
              onToggle={() => handleToggle("science")}
            />

            {/* Card 2 — Library: reading zone with 2,000+ books and reference materials. Flagged as needing real photos. */}
            <FacilityCard
              id="library"
              icon={BookOpen}
              name="Library"
              description="Quiet learning zone holding 2,000+ books, reference materials, and reading nooks."
              images={["/library1.jpg", "/library2.jpg", "/library3.jpg", "/library4.jpg", "/library5.jpg", "/library6.jpg", "/library7.jpg", "/library8.jpg", "/library9.jpg"]}
              delay={0.1}
              isExpanded={expandedCard === "library"}
              onToggle={() => handleToggle("library")}
            />

            {/* Card 3 — Sports / Playground: outdoor grounds plus indoor sports room. Flagged as needing real photos. */}
            <FacilityCard
              id="sports"
              icon={Flame}
              name="Sports / Playground"
              description="Secured campus ground for football, cricket, basketball court in addition to an indoor sports room."
              images={["/ground1.jpg", "/ground2.jpg", "/ground3.jpg", "/ground4.jpg", "/ground5.jpg", "/ground6.jpg", "/ground7.jpg", "/ground8.jpg", "/ground9.jpg","/ground10.jpg", "/ground11.jpg", "/ground12.jpg", "/ground13.jpg", "/ground14.jpg", "/ground15.jpg", "/ground16.jpg"]}
              delay={0.2}
              isExpanded={expandedCard === "sports"}
              onToggle={() => handleToggle("sports")}
            />

            {/* Card 4 — Auditorium: multipurpose hall for events, performances and assemblies. */}
            <FacilityCard
              id="auditorium"
              icon={Tv}
              name="Auditorium"
              description="Multipurpose auditorium for events, performances, seminars, and student activities."
              images={["/audi1.jpg", "/audi2.jpg", "/audi3.jpg", "/audi4.jpg","/audi5.jpg", "/audi6.jpg", "/audi7.jpg", "/audi8.jpg", "/audi9.jpg", "/audi10.jpg"]}
              delay={0.3}
              isExpanded={expandedCard === "auditorium"}
              onToggle={() => handleToggle("auditorium")}
            />

            {/* Card 5 — Cafeteria: hygienic, school-monitored lunch service. */}
            <FacilityCard
              id="cafeteria"
              icon={Coffee}
              name="Cafeteria"
              description="Hygienic, school-monitored cafeteria providing nutritious lunch items for students."
              images={["/Cafeteria1.JPG", "/Cafeteria2.JPG", "/Cafeteria3.JPG", "/Cafeteria4.JPG"]}
              delay={0.4}
              isExpanded={expandedCard === "cafeteria"}
              onToggle={() => handleToggle("cafeteria")}
            />

            {/* Card 6 — Transport: managed van routes across the city. */}
            <FacilityCard
              id="transport"
              icon={Truck}
              name="Transport"
              description="Managed school van routes covering safe pick-and-drop options across major city zones."
              images={["/kid1.jpg", "/kid2.jpg", "/kid3.jpg", "/kid4.jpg"]}
              delay={0.5}
              isExpanded={expandedCard === "transport"}
              onToggle={() => handleToggle("transport")}
            />

            {/* Card 7 — Security / CCTV: guards, gated entry and full camera coverage. */}
            <FacilityCard
              id="security"
              icon={ShieldCheck}
              name="Security / CCTV"
              description="24/7 security perimeter guards, walk-through gates, and comprehensive CCTV monitoring network."
              images={["/g3.jpg", "/g2.jpg", "/g7.jpg", "/play.jpg", "/play1.jpg"]}
              delay={0.6}
              isExpanded={expandedCard === "security"}
              onToggle={() => handleToggle("security")}
            />

            {/* Card 8 — Classrooms. */}
            <FacilityCard
              id="classrooms"
              icon={ShieldCheck}
              name="Classrooms"
              description="Air-conditioned, well-lit classrooms with digital boards and comfortable seating."
              images={["/classroom1.jpg", "/classroom2.jpg", "/classroom3.jpg", "/classroom4.jpg", "/classroom5.jpg", "/classroom6.jpg", "/classroom7.jpg", "/classroom8.jpg", "/classroom9.jpg"]}
              delay={0.6}
              isExpanded={expandedCard === "classrooms"}
              onToggle={() => handleToggle("classrooms")}
            />

          </div>

        </div>
      </section>

      {/* ============================================================
          3. FACILITIES CTA SECTION
      ============================================================ */}
      <section className="relative h-[auto] min-h-[500px] flex items-center overflow-hidden py-16 lg:py-24 mt-16 lg:mt-24">
        <img
          src="/building-image1.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)",
          }}
        />

        <div ref={ctaRef} className="relative z-[2] w-full px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
        <div
          className="text-center mb-12"
          style={{
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0s",
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
            fontSize: "10.8px",
            fontWeight: 800,
            padding: "2px 14px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          See It Before You Enroll
        </span>
      </div>

      <h2 className="text-4xl sm:text-6xl font-extrabold text-white mb-6">
        Come Experience Our <span className="text-[#F5C330]">Campus</span> in Person
      </h2>
      <p className="text-white text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
        From fully equipped science labs to secured sports grounds and a 24/7 monitored
        campus, the best way to understand what IFS offers is to walk through it yourself.
        Book a guided tour and see every facility firsthand.
      </p>
    </div>
  </div>
</div>
      </section>
    </div>
  );
}
