import { motion } from "motion/react";

const NAVY = "#0d1f3c";
const GOLD = "#F5C330";
const SKY = "#60BADC";

export default function AdmissionsHero() {
  return (
    <section className="relative w-full overflow-hidden flex items-center min-h-[422px] sm:min-h-[489px] lg:min-h-[534px]" style={{ background: NAVY }}>
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
        className="pointer-events-none absolute -right-16 -top-24 hidden h-72 w-72 sm:block lg:h-96 lg:w-96"
        viewBox="0 0 400 400"
        fill="none"
      >
        <rect
          x="70"
          y="70"
          width="260"
          height="260"
          transform="rotate(45 200 200)"
          stroke={GOLD}
          strokeWidth="1.5"
          strokeOpacity="0.45"
        />
        <rect
          x="105"
          y="105"
          width="190"
          height="190"
          transform="rotate(45 200 200)"
          stroke={GOLD}
          strokeWidth="1.2"
          strokeOpacity="0.3"
        />
        <rect
          x="140"
          y="140"
          width="120"
          height="120"
          transform="rotate(45 200 200)"
          stroke={GOLD}
          strokeWidth="1"
          strokeOpacity="0.2"
        />
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
              Start Your Journey
            </span>
          </div>

          <h1
            className="font-extrabold text-white"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4.5rem)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            Admissions
          </h1>

          <div className="mb-6 mt-5 h-[3px] w-16" style={{ background: SKY }} />

          <p className="max-w-sm text-[15px] leading-relaxed text-white/80 text-justify">
            Apply with confidence and become part of an inspiring learning environment where innovation, excellence, and opportunity come together.
          </p>
        </motion.div>
      </div>
    </section>

  );
}