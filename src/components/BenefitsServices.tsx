/**
 * BenefitsServices — Shield-badge card grid for the About page.
 *
 * Accepts the existing `whyChooseItems` array as a prop.
 * Each item: { icon: LucideIcon, title: string, desc: string, color?: string }
 */

import React, { useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight, type LucideIcon } from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────── */
export interface BenefitItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  color?: string;
}

interface BenefitsServicesProps {
  items: BenefitItem[];
}

/* ── Accent palette (cycles when no `color` field) ─────────── */
const ACCENT_COLORS = [
  "#F5C330", // yellow — theme gold
  "#60BADC", // blue  — theme blue
  "#F5C330", // yellow
  "#60BADC", // blue
  "#F5C330", // yellow
  "#60BADC", // blue
];

/* ── Shield clip-path (pentagon / shield shape) ──────────────── */
const SHIELD_CLIP =
  "polygon(50% 0%, 100% 12%, 100% 72%, 50% 100%, 0% 72%, 0% 12%)";

/* ── Component ─────────────────────────────────────────────────── */
export default function BenefitsServices({ items }: BenefitsServicesProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  /* ref for section-level inView (used to stagger) */
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  return (
    <section
      id="benefits-services"
      style={{ padding: "64px 24px" }}
    >
      <div
        ref={sectionRef}
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        {/* ── Section header ─────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          {/* small gold label */}
          <div className="flex items-center justify-center gap-4 my-10">
          <span className="w-8 h-px bg-[#020618]" />
          <span
            style={{
              display: "inline-block",
              fontFamily: '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
              fontSize: "10.8px",
              color: "#020618",
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            WHAT WE OFFER
          </span>
          <span className="w-8 h-px bg-[#020618] " />
          </div>

          {/* heading */}
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
              fontWeight: 800,
              color: "#0d1f3c",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Benefits &amp; <span className="text-[#f5c330]">Services</span>
          </h2>

          {/* gold underline */}
          <div
            style={{
              width: "64px",
              height: "4px",
              background: "#60badc",  
              margin: "0 auto",
            }}
          />
        </div>

        {/* ── Cards grid ─────────────────────────────────────── */}
        {/* Tailwind only for responsive columns; everything else inline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "36px 28px" }}>
          {items.map((item, idx) => {
            const Icon = item.icon;
            const accent = item.color || ACCENT_COLORS[idx % ACCENT_COLORS.length];
            const isHovered = hoveredIdx === idx;
            const number = String(idx + 1).padStart(2, "0");

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.09,
                  ease: "easeOut",
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
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
                }}
              >
                {/* ── Shield badge (pokes above card) ──────── */}
                <div
                  style={{
                    position: "absolute",
                    top: "-28px",
                    left: "24px",
                    width: "58px",
                    height: "66px",
                    clipPath: SHIELD_CLIP,
                    background: accent,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.3s ease, transform 0.3s ease",
                    transform: isHovered ? "scale(1.12) translateY(-3px)" : "scale(1)",
                    zIndex: 2,
                  }}
                >
                  <Icon
                    style={{
                      width: "24px",
                      height: "24px",
                      color: "#ffffff",
                      marginTop: "2px",
                    }}
                  />
                </div>

                {/* ── Number watermark (top-right) ─────────── */}
                <span
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "18px",
                    fontSize: "2.6rem",
                    fontWeight: 900,
                    color: isHovered ? `${accent}22` : "rgba(13,31,60,0.06)",
                    lineHeight: 1,
                    pointerEvents: "none",
                    userSelect: "none",
                    transition: "color 0.3s ease",
                  }}
                >
                  {number}
                </span>

                {/* ── Title ────────────────────────────────── */}
                <h3
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 800,
                    color: isHovered ? accent : "#0d1f3c",
                    margin: "18px 0 0",
                    lineHeight: 1.3,
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.title}
                </h3>

                {/* ── Small colored line ───────────────────── */}
                <div
                  style={{
                    width: "32px",
                    height: "3px",
                    background: accent,
                    borderRadius: "9999px",
                    margin: "10px 0 0",
                    transition: "background 0.3s ease",
                  }}
                />

                {/* ── Description ──────────────────────────── */}
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "#6b7280",
                    lineHeight: 1.65,
                    margin: "12px 0 0",
                  }}
                >
                  {item.desc}
                </p>

                {/* ── Footer: number + dot ─────────────────── */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "22px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
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

                  {/* ── Arrow button (reveals on hover) ──── */}
                 {/* <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: isHovered ? accent : "#f1f5f9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? "scale(1)" : "scale(0.7)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ArrowRight
                      style={{
                        width: "16px",
                        height: "16px",
                        color: isHovered ? "#ffffff" : "#94a3b8",
                      }}
                    />
                  </div>*/}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
