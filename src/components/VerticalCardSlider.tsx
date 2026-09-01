/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

export interface SliderMember {
  name: string;
  designation: string;
  subject: string;
  bio: string;
  photo?: string;
  initials: string;
  accentColor?: "gold" | "blue";
}

interface VerticalCardSliderProps {
  members: SliderMember[];
  sectionLabel: string;
  heading: string;
}

export default function VerticalCardSlider({
  members,
  sectionLabel,
  heading,
}: VerticalCardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = members.length;

  // Track pending animation direction for post-render incoming animation
  const pendingDirection = useRef<"up" | "down" | null>(null);

  /* ─── GSAP slide transition ─────────────────────────── */
  const animateTo = useCallback(
    (nextIndex: number, direction: "up" | "down") => {
      if (isAnimating || nextIndex === currentIndex) return;
      setIsAnimating(true);
      const photo = photoRef.current;
      const info = infoRef.current;
      if (!photo || !info) return;

      const yOut = direction === "down" ? -80 : 80;
      const yIn = direction === "down" ? 80 : -80;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(photo, { y: yIn * 0.6, opacity: 0, scale: 0.96 });
          gsap.set(info, { y: yIn, opacity: 0 });
          pendingDirection.current = direction;
          setCurrentIndex(nextIndex);
          setIsAnimating(false);
        },
      });

      tl.to(photo, { y: yOut * 0.6, opacity: 0, scale: 0.92, duration: 0.30, ease: "power2.in" }, 0)
        .to(info,  { y: yOut,        opacity: 0,               duration: 0.26, ease: "power2.in" }, 0);
    },
    [isAnimating, currentIndex]
  );

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % total;
    animateTo(next, "down");
  }, [currentIndex, total, animateTo]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + total) % total;
    animateTo(prev, "up");
  }, [currentIndex, total, animateTo]);

  /* ─── After React renders new member: animate it in ─── */
  useEffect(() => {
    const photo = photoRef.current;
    const info = infoRef.current;
    if (!photo || !info) return;

    if (pendingDirection.current !== null) {
      gsap.to(photo, { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: "power3.out" });
      gsap.to(info,  { y: 0, opacity: 1,           duration: 0.38, ease: "power3.out", delay: 0.06 });
      pendingDirection.current = null;
    } else {
      gsap.set([photo, info], { opacity: 1, y: 0, scale: 1 });
    }
  }, [currentIndex]);

  /* ─── Mouse wheel ────────────────────────────────────── */
  useEffect(() => {
    const el = cardRef.current?.closest(".vcs-wrapper") as HTMLElement | null;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (wheelTimer.current) return; // debounce
      wheelTimer.current = setTimeout(() => {
        wheelTimer.current = null;
      }, 700);
      if (e.deltaY > 0) goNext();
      else goPrev();
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [goNext, goPrev]);

  /* ─── Touch / swipe ─────────────────────────────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const delta = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(delta) > 40) {
      if (delta > 0) goNext();
      else goPrev();
    }
    touchStartY.current = null;
  };

  /* ─── Arrow button hover micro-animation (GSAP) ─────── */
  const upArrowRef = useRef<HTMLButtonElement>(null);
  const downArrowRef = useRef<HTMLButtonElement>(null);

  const handleArrowEnter = (ref: React.RefObject<HTMLButtonElement>, dir: "up" | "down") => {
    if (!ref.current) return;
    gsap.to(ref.current, { y: dir === "up" ? -4 : 4, duration: 0.25, ease: "power2.out" });
  };
  const handleArrowLeave = (ref: React.RefObject<HTMLButtonElement>) => {
    if (!ref.current) return;
    gsap.to(ref.current, { y: 0, duration: 0.25, ease: "power2.out" });
  };
  const handleArrowClick = (ref: React.RefObject<HTMLButtonElement>, fn: () => void) => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        { scale: 0.82 },
        { scale: 1, duration: 0.35, ease: "back.out(3)" }
      );
    }
    fn();
  };

  const member = members[currentIndex];
  const accent = member?.accentColor === "blue" ? "#60BADC" : "#F5C330";
  const accentDark = member?.accentColor === "blue" ? "#3a8ea1" : "#dbaa1a";
  const accentBg = member?.accentColor === "blue" ? "rgba(96,186,220,0.12)" : "rgba(245,195,48,0.12)";

  if (!member) return null;

  return (
    <div className="vcs-wrapper w-full" style={{ position: "relative" }}>
      <style>{`
        .vcs-wrapper {
          user-select: none;
        }
        .vcs-card {
          display: flex;
          width: 100%;
          min-height: 480px;
          border-radius: 0px;
          overflow: hidden;
          box-shadow: 0 24px 72px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06);
          background: #fff;
          position: relative;
        }
        @media (max-width: 767px) {
          .vcs-card {
            flex-direction: column;
            min-height: 0;
          }
        }
        .vcs-photo-half {
          flex: 0 0 45%;
          position: relative;
          overflow: hidden;
          min-height: 380px;
        }
        @media (max-width: 767px) {
          .vcs-photo-half {
            flex: none;
            min-height: 260px;
            width: 100%;
          }
        }
        .vcs-photo-half img, .vcs-photo-half .vcs-initials-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .vcs-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 40%, rgba(13,31,60,0.65) 100%);
        }
        .vcs-info-half {
          flex: 1;
          padding: 52px 44px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          background: #fff;
        }
        @media (max-width: 1023px) {
          .vcs-info-half {
            padding: 36px 28px;
          }
        }
        @media (max-width: 767px) {
          .vcs-info-half {
            padding: 28px 22px;
          }
        }
        .vcs-subject-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          margin-bottom: 18px;
          width: fit-content;
        }
        .vcs-member-name {
          font-size: 2rem;
          font-weight: 800;
          color: #0d1f3c;
          line-height: 1.15;
          margin-bottom: 8px;
        }
        @media (max-width: 767px) {
          .vcs-member-name { font-size: 1.5rem; }
        }
        .vcs-designation {
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 22px;
        }
        .vcs-divider {
          width: 40px;
          height: 3px;
          margin-bottom: 20px;
        }
        .vcs-bio {
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.75;
          max-width: 380px;
          margin-bottom: 32px;
          text-align: justify;
        }
          
      .vcs-read-btn {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.82rem;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        padding: 11px 24px;
        border-radius: 0;
        border: 2px solid currentColor;
        width: fit-content;
        cursor: pointer;
        background: transparent;
        overflow: hidden;
        transition: transform .2s ease, box-shadow .2s ease;
      }

      .vcs-read-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      }

      /* Sliding Background */
      .vcs-btn-bg {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #60BADC;
        transition: left .45s ease;
        z-index: 0;
      }

      /* Content */
      .vcs-btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: color .35s ease;
      }

      .vcs-read-btn:hover .vcs-btn-bg {
        left: 0;
      }

      .vcs-read-btn:hover .vcs-btn-content {
        color: #fff;
      }

      .vcs-btn-content svg {
        transition: transform .3s ease, color .3s ease;
      }

      .vcs-read-btn:hover .vcs-btn-content svg {
        transform: translateX(4px);
        color: #fff;
      }

      /* Sliding Background */
      .vcs-btn-bg {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: #60BADC;
        transition: left .45s ease;
        z-index: 0;
      }

      /* Content */
      .vcs-btn-content {
        position: relative;
        z-index: 2;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: color .35s ease;
      }

      .vcs-read-btn:hover .vcs-btn-bg {
        left: 0;
      }

      .vcs-read-btn:hover .vcs-btn-content {
        color: #0D1F3C;
      }

      .vcs-btn-content svg {
        transition: transform .3s ease, color .3s ease;
      }

      .vcs-read-btn:hover .vcs-btn-content svg {
        transform: translateX(4px);
        color: #0D1F3C;
      }

        /* ── Line-style Up/Down arrow nav (matches reference image) ── */
       .vcs-nav-col {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 100;
        }
        @media (max-width: 1100px) {
          .vcs-nav-col {
            right: -50px;
          }
        }
        @media (max-width: 767px) {
          .vcs-nav-col {
            right: 14px;
            top: auto;
            bottom: 16px;
            transform: none;
          }
        }
        .vcs-arrow-btn {
          background: transparent;
          border: none;
          padding: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0d1f3c;
          opacity: 0.55;
          transition: opacity 0.2s, color 0.2s;
        }
        .vcs-arrow-btn:hover {
          opacity: 1;
        }
        .vcs-arrow-btn.vcs-arrow-down {
          opacity: 0.9;
        }
        .vcs-arrow-btn:hover svg {
          stroke: var(--vcs-accent, #F5C330);
        }
        .vcs-arrow-btn:disabled {
          opacity: 0.2;
          cursor: default;
        }
        .vcs-arrow-line {
          width: 1.5px;
          height: 46px;
          background: #cbd5e1;
          margin: 2px 0;
        }
        @media (max-width: 767px) {
          .vcs-arrow-line {
            width: 46px;
            height: 1.5px;
            margin: 0 2px;
          }
          .vcs-nav-col {
            flex-direction: row;
          }
        }

        .vcs-initials-bg {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.22);
          background: linear-gradient(135deg, #1a3a6b 0%, #0d1f3c 100%);
        }
        .vcs-number-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(13,31,60,0.82);
          border: 1.5px solid rgba(255,255,255,0.15);
          border-radius: 0px;
          padding: 6px 14px;
          backdrop-filter: blur(8px);
        }
      `}</style>

      <div
        ref={cardRef}
        className="vcs-card"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* LEFT — Photo half */}
        <div ref={photoRef} className="vcs-photo-half">
          {member.photo ? (
            <img src={member.photo} alt={member.name}className="w-full h-full object-cover rounded-none"/>
          ) : (
            <div
              className="vcs-initials-bg"
              style={{ background: `linear-gradient(135deg, ${accent}22 0%, #0d1f3c 100%)` }}
            >
              {member.initials}
            </div>
          )}
          <div className="vcs-photo-overlay" />
          <div className="vcs-number-badge">
            <span style={{ color: "#F5C330", fontWeight: 800, fontSize: "0.75rem" }}>
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 700, fontSize: "0.72rem" }}>
              {" "}/ {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* RIGHT — Info half */}
        <div ref={infoRef} className="vcs-info-half">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: `linear-gradient(90deg, ${accent} 0%, ${accentDark} 100%)`,
            }}
          />
          <span
            className="vcs-subject-badge"
            style={{ background: accentBg, color: accentDark }}
          >
            {member.subject}
          </span>
          <h3 className="vcs-member-name">{member.name}</h3>
          <p className="vcs-designation">{member.designation}</p>
          <div className="vcs-divider" style={{ background: accent }} />
          <p className="vcs-bio">"{member.bio}"</p>
          {/* comment for temporary */}
          {/* <button
            className="vcs-read-btn"
            style={{ borderColor: accent, color: "#0d1f3c" }}
          >
            <span
              className="vcs-btn-bg"
              style={{ background: accent }}
            ></span>

            <span className="vcs-btn-content">
              Read More
              <ArrowRight size={14} />
            </span>
          </button> */}
        </div>

        {/* NAV — line-style Up / Down arrows (matches reference screenshot) */}
        <div className="vcs-nav-col" style={{ ["--vcs-accent" as any]: accent }}>
          <button
            ref={upArrowRef}
            className="vcs-arrow-btn vcs-arrow-up"
            onClick={() => handleArrowClick(upArrowRef, goPrev)}
            onMouseEnter={() => handleArrowEnter(upArrowRef, "up")}
            onMouseLeave={() => handleArrowLeave(upArrowRef)}
            aria-label="Previous faculty member"
            id={`vcs-prev-${sectionLabel.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M7 17V1M7 1L1 7M7 1L13 7"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <span className="vcs-arrow-line" />

          <button
            ref={downArrowRef}
            className="vcs-arrow-btn vcs-arrow-down"
            onClick={() => handleArrowClick(downArrowRef, goNext)}
            onMouseEnter={() => handleArrowEnter(downArrowRef, "down")}
            onMouseLeave={() => handleArrowLeave(downArrowRef)}
            aria-label="Next faculty member"
            id={`vcs-next-${sectionLabel.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
              <path
                d="M7 1V17M7 17L1 11M7 17L13 11"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
