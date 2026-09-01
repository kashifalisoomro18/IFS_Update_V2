"use client";

import { useState } from "react";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ------------------------------------------------------------------ */
/*  Data — one object per ribbon card. Add/remove entries freely; the */
/*  section re-flows automatically.                                   */
/* ------------------------------------------------------------------ */
// Variant now only ever draws from the four brand colors:
// navy #020816, gold #F5C330, blue #60BADC, white #FFFFFF
type Variant = "gold" | "blue" | "navy";

interface RibbonCardData {
  id: string;
  image: string;
  badge: string;
  title: string;
  description: string;
  tags: string[];
  variant: Variant;

  /**
   * Optional — when provided, the description acts as a short preview
   * and these bullet points are revealed via a "Read More" toggle.
   * Used by the Mission card since its full text is long.
   */
  expandablePoints?: string[];
}

const RIBBON_CARDS: RibbonCardData[] = [
  {
    id: "our-vision",
    image: "/cambridge_rigor.png",
    badge: "Our Vision",
    title: "Vision",
    description:
      "Empowering Learners to be Productive Change Agents as Future Citizens.",
    tags: ["Empowerment", "Change Agents", "Future Citizens"],
    variant: "gold",
  },
  {
    id: "our-mission",
    image: "/finland_hei.png",
    badge: "Our Mission",
    title: "Mission",
    description:
      "In order to accomplish the Mission of the Isra Foundation School, the IFS is committed to realizing the full potential of our learners to play a vital role in bringing about a meaningful, positive, and productive change for an ever-changing future by:",
    tags: ["Academics", "Character", "Community", "Innovation"],
    variant: "blue",
    expandablePoints: [
      "Fostering in our students positive growth in social and emotional behaviors and attitudes essential for success in our diverse and competitive society.",
      "Involving schools, families, businesses, and community partners in preparing our students for a lifetime of success.",
      "Planning for and securing sufficient resources to provide a rigorous academic program which encapsulates strong moral and character-building principles.",
      "Providing the best educational opportunities for students through student-centered, collaborative, experiential, experimental, problem-based learning approaches.",
      "Hiring and developing faculty who recognize and foster the unique potential of each student through personalized instruction.",
      "Acquiring, maintaining, and utilizing state-of-the-art and cutting-edge facilities and technologies to enhance the learning environment and achieve high levels of academic achievement for our students.",
      "Enriching the lives of young people through futuristic-based and diverse programming compatible with international standards.",
      "Acquiring knowledge on community, legislative, and educational issues to determine the best direction for our school.",
      "Grooming our students into well-rounded students for the society and well prepared and ready to take on the challenges of the 21st Century.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Variant → design tokens. Only the four brand colors (navy, gold,  */
/*  blue, white) are used, mixed via opacity for tints/tones.         */
/* ------------------------------------------------------------------ */
const NAVY = "#020816";
const GOLD = "#F5C330";
const BLUE = "#60BADC";
const WHITE = "#FFFFFF";

const VARIANT_STYLES: Record<
  Variant,
  {
    accent: string;
    panelBg: string;
    headingColor: string;
    bodyColor: string;
    badgeBg: string;
    badgeText: string;
    tagBg: string;
    tagText: string;
    ribbonBg: string;
    ribbonIcon: string;
    foldColor: string;
  }
> = {
  gold: {
    accent: GOLD,
    panelBg: WHITE,
    headingColor: NAVY,
    bodyColor: "rgba(2,8,22,0.68)",
    badgeBg: "rgba(245,195,48,0.20)",
    badgeText: "#b38f24",
    tagBg: "rgba(2,8,22,0.05)",
    tagText: NAVY,
    ribbonBg: GOLD,
    ribbonIcon: NAVY,
    foldColor: GOLD,
  },
  blue: {
    accent: BLUE,
    panelBg: WHITE,
    headingColor: NAVY,
    bodyColor: "rgba(2,8,22,0.68)",
    badgeBg: "rgba(96,186,220,0.20)",
    badgeText: "#0E6E8E",
    tagBg: "rgba(2,8,22,0.05)",
    tagText: NAVY,
    ribbonBg: BLUE,
    ribbonIcon: NAVY,
    foldColor: BLUE,
  },
  navy: {
    accent: GOLD,
    panelBg: NAVY,
    headingColor: WHITE,
    bodyColor: "rgba(255,255,255,0.72)",
    badgeBg: "rgba(245,195,48,0.16)",
    badgeText: GOLD,
    tagBg: "rgba(255,255,255,0.08)",
    tagText: WHITE,
    ribbonBg: GOLD,
    ribbonIcon: NAVY,
    foldColor: GOLD,
  },
};

/* ------------------------------------------------------------------ */
/*  Single ribbon card                                                */
/* ------------------------------------------------------------------ */
function RibbonCard({ data, index }: { data: RibbonCardData; index: number; key?: string }) {
  const v = VARIANT_STYLES[data.variant];
  const [isExpanded, setIsExpanded] = useState(false);
  const hasExpandable = !!data.expandablePoints?.length;
  const reversed = index % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div
        className={`relative flex flex-col my-10 md:items-stretch ${
          reversed ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* ───────────────────────── Image panel ───────────────────────── */}
        <div className="relative z-10 w-full md:w-[42%]">
          <div className="relative aspect-[4/3] md:aspect-auto md:h-[380px] overflow-hidden  shadow-lg transition-all duration-500 ease-out group-hover:shadow-2xl">
            <img
              src={data.image}
              alt={data.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(22, 17, 2, 0) 55%, rgba(2,8,22,0.55) 100%)",
              }}
            />
          </div>

          {/* pennant ribbon flag, hangs off the top corner */}
          <div
            className={`absolute -top-3 z-20 flex flex-col items-center gap-1 px-3 pb-3.5 pt-2.5 shadow-md transition-transform duration-500 ease-out group-hover:-translate-y-1 ${
              reversed ? "right-6" : "left-6"
            }`}
            style={{
              background: v.ribbonBg,
              clipPath: "polygon(0 0, 100% 0, 100% 76%, 50% 100%, 0 76%)",
            }}
          >
            <ShieldCheck className="h-4 w-4" strokeWidth={2.5} style={{ color: v.ribbonIcon }} />
          </div>
        </div>

        {/* ───────────────── Angled ribbon connector (md+) ───────────────── */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute z-[15] hidden md:block transition-transform duration-500 ease-out ${
            reversed ? "group-hover:-translate-x-1.5" : "group-hover:translate-x-1.5"
          }`}
          style={{
            [reversed ? "right" : "left"]: "calc(42% - 6px)",
            top: "40px",
            width: 56,
            height: 96,
            background: v.accent,
            clipPath: reversed
              ? "polygon(100% 10%, 45% 10%, 0 50%, 45% 90%, 100% 90%)"
              : "polygon(0 10%, 55% 10%, 100% 50%, 55% 90%, 0 90%)",
            boxShadow: "0 8px 20px rgba(2,8,22,0.18)",
          }}
        />

        {/* ───────────────────────── Content panel ───────────────────────── */}
        <div
          className={`relative z-20 text-justify flex w-full flex-col overflow-hidden p-8 shadow-xl transition-shadow duration-500 ease-out sm:p-10 md:mt-8 md:min-h-[380px] md:w-[62%] md:p-12 lg:p-14 group-hover:shadow-2xl mt-6 ${
            reversed ? "md:-mr-10" : "md:-ml-10"
          }`}
          style={{
            background: v.panelBg,
            clipPath: reversed
              ? "polygon(0 0, 100% 0, 100% 100%, 30px 100%, 0 calc(100% - 30px))"
              : "polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)",
            border: v.panelBg === WHITE ? "1px solid rgba(2,8,22,0.06)" : "none",
          }}
        >
          <span
            className="inline-block  px-3.5 py-1.5 text-[9.9px] font-bold uppercase tracking-widest"
            style={{ background: v.badgeBg, color: v.badgeText }}
          >
            {data.badge}
          </span>

          <h3
            className="mt-5 text-2xl font-black leading-tight tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-3xl lg:text-[2.15rem]"
            style={{ color: v.headingColor }}
          >
            {data.title}
          </h3>

          <div
            className="mt-4 h-[3px] w-12 origin-left  transition-all duration-500 ease-out group-hover:w-24"
            style={{ background: v.accent }}
          />

          <p
            className="mt-5 max-w-xl text-sm leading-relaxed sm:text-[13.5px]"
            style={{ color: v.bodyColor }}
          >
            {data.description}
          </p>

          {/* ───────────────── Expandable "Read More" content (Mission) ───────────────── */}
          {hasExpandable && (
            <>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    key="expandable-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="min-h-0 overflow-hidden text-justify"
                  >
                    <ul className="mt-4 flex max-w-xl flex-col gap-2.5 pt-1">
                      {data.expandablePoints!.map((point, i) => (
                        <li
                          key={i}
                          className="relative pl-4 text-sm leading-relaxed sm:text-[13px]"
                          style={{ color: v.bodyColor }}
                        >
                          <span
                            className="absolute left-0 top-[7px] h-1.5 w-1.5 rotate-45"
                            style={{ background: v.accent }}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* group ke sath /btn lagaya hai taaki main card ke group se takraye nahi */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                className="group/btn relative z-10 mt-5 inline-flex max-w-max cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-[9.9px] font-bold uppercase tracking-wide overflow-hidden"
                style={{ 
                  borderColor: v.accent, 
                  color: v.accent 
                }}
              >
                {/* Left to Right Background Hover Effect with Delay */}
                <span 
                  className="absolute inset-0 -z-10 w-full h-full scale-x-0 origin-left transition-transform duration-300 delay-150 ease-out group-hover/btn:scale-x-100 group-hover/btn:delay-0"
                  style={{ backgroundColor: v.accent }}
                />

                {/* Button Content with Matching Delay */}
                <span className="flex items-center gap-1.5 transition-colors duration-300 delay-150 group-hover/btn:text-white group-hover/btn:delay-0">
                  {isExpanded ? "Read Less" : "Read More"}
                  <ChevronDown
                    className="h-3.5 w-3.5 transition-transform duration-300"
                    style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </span>
              </button>
            </>
          )}

          {/* tags as pill chips instead of a plain dot-separated string */}
          <div className="mt-auto flex flex-wrap gap-2 pt-7">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[11.7px]  uppercase tracking-wide"
                style={{ background: v.tagBg, color: v.tagText }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* folded paper corner (dog-ear) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-0 z-30 h-[40px] w-[40px] ${
            reversed ? "left-0" : "right-0"
          }`}
          style={{
            background: v.foldColor,
            clipPath: reversed
              ? "polygon(0 0, 0 100%, 100% 100%)"
              : "polygon(100% 0, 100% 100%, 0 100%)",
            boxShadow: "0 -3px 8px rgba(22, 2, 2, 0.15)",
          }}
        />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
export default function RibbonPathwaysSection() {
  return (
    <section id="vision-mission" className="bg-[#F8FAFC] py-35 -mt-10" aria-labelledby="ribbon-pathways-heading">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center sm:mb-20"
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: NAVY }} />
            <span
              className="text-[#020816] font-mono text-xs  uppercase tracking-[0.2em]"
              style={{ color: NAVY }}
            >
              Learning Pathways
            </span>
            <span className="h-px w-8" style={{ background: NAVY }} />
          </div>
          
          {/* Main Heading with Custom Inline Styles */}
          <h2
            id="ribbon-pathways-heading"
            className="font-black tracking-tight leading-[1.2]" // 'leading-[1.1]' lagane se lines ke beech ka space kam ho jayega
            style={{ 
              fontSize: '36px', 
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {/* Built Around How Children Text with Specific Color */}
            <span className="block sm:inline" style={{ color: '#020816' }}>
              Built Around How Children{" "}
            </span>
            <span className="block sm:inline" style={{ color: BLUE }}>Actually Learn</span>
          </h2>

          
          {/* gold underline */}
          <div
            style={{
              width: "64px",
              height: "4px",
              background: "#F5C330",
              margin: "0px auto",
              marginTop: "15px",
            }}
          />
        </motion.div>

        <div className="flex flex-col gap-16 sm:gap-20">
          {RIBBON_CARDS.map((card, i) => (
            <RibbonCard key={card.id} data={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
