/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Parallax, Thumbs, Navigation, A11y, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import type { SwiperOptions } from "swiper/types";

// Swiper CSS (core + modules)
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import "swiper/css/free-mode";

export interface BoardMember {
  name: string;
  title: string;
  description: string;
  photo?: string;
  initials: string;
  accentColor?: "gold" | "blue";
}

interface ManagementBoardSliderProps {
  members: BoardMember[];
}

export default function ManagementBoardSlider({ members }: ManagementBoardSliderProps) {
  const mainSwiperRef = useRef<HTMLDivElement>(null);
  const thumbSwiperRef = useRef<HTMLDivElement>(null);
  const mainSwiperInstance = useRef<SwiperType | null>(null);
  const thumbSwiperInstance = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!mainSwiperRef.current || !thumbSwiperRef.current) return;
    setActiveIndex(0);

    // 1. Thumbs swiper first
    //    < 768px  : horizontal, free-scroll strip under the main slide
    //    >= 768px : vertical list on the right side
    // Cast: some Swiper type versions don't list `freeMode` inside
    // breakpoints, although it works at runtime.
    const thumbBreakpoints = {
      0: {
        direction: "horizontal",
        spaceBetween: 8,
        slidesOffsetAfter: 40,
        freeMode: { enabled: true },
      },
      768: {
        direction: "vertical",
        spaceBetween: 12,
        slidesOffsetAfter: 0,
        freeMode: { enabled: false },
      },
    } as unknown as SwiperOptions["breakpoints"];

    const thumbSwiper = new Swiper(thumbSwiperRef.current, {
      modules: [A11y, FreeMode],
      slidesPerView: "auto",
      watchSlidesProgress: true,
      watchOverflow: true,
      a11y: { enabled: true },
      breakpoints: thumbBreakpoints,
    });
    thumbSwiperInstance.current = thumbSwiper;

    // 2. Main swiper
    const mainSwiper = new Swiper(mainSwiperRef.current, {
      modules: [Parallax, Thumbs, Navigation, A11y],
      parallax: true,
      speed: 900,
      loop: false,
      thumbs: { swiper: thumbSwiper },
      navigation: {
        nextEl: ".mbs-btn-next",
        prevEl: ".mbs-btn-prev",
      },
      a11y: { enabled: true },
      grabCursor: true,
      on: {
        slideChange(swiper) {
          setActiveIndex(swiper.activeIndex);
        },
      },
    });
    mainSwiperInstance.current = mainSwiper;

    return () => {
      mainSwiper.destroy(true, true);
      thumbSwiper.destroy(true, true);
    };
  }, [members]);

  const handleThumbClick = (index: number) => {
    mainSwiperInstance.current?.slideTo(index);
  };

  return (
    <div className="mbs-root">
      <style>{`
        /* ══════════════════════════════════════════════════════
           BASE  (desktop ≥ 1200px)
           ══════════════════════════════════════════════════════ */
        .mbs-root {
          --mbs-h: clamp(440px, 72vh, 640px);   /* slide height */
          --mbs-thumbs-w: 300px;                /* thumbs column width */
          --mbs-pad: clamp(20px, 4.5vw, 52px);  /* fluid content padding */
          --mbs-gold: #F5C330;

          position: relative;
          display: flex;
          width: 100%;
          max-width: 100%;
          min-height: var(--mbs-h);
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
        }
        .mbs-root *,
        .mbs-root *::before,
        .mbs-root *::after { box-sizing: border-box; }

        /* ── Main swiper (left) ──────────────────────────────── */
        .mbs-main {
          flex: 1 1 0;
          min-width: 0;            /* lets Swiper shrink inside flex */
          position: relative;
          overflow: hidden;
        }
        .mbs-main .swiper-wrapper { height: auto; }
        .mbs-main .swiper-slide {
          position: relative;
          overflow: hidden;
          height: auto;
          min-height: var(--mbs-h);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }

        /* Background image with parallax */
        .mbs-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          background-size: 55%;
          background-repeat: no-repeat;
          background-position: center top;
        }

        /* Gradient overlay */
        .mbs-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            rgba(4,12,33,0.88) 0%,
            rgba(6,20,50,0.75) 45%,
            rgba(8,28,65,0.4) 75%,
            rgba(10,32,72,0.1) 100%
          );
          z-index: 1;
        }

        /* Content sits in normal flow, so long text pushes the slide taller
           instead of being clipped */
        .mbs-slide-content {
          position: relative;
          z-index: 2;
          width: 100%;
          padding: 80px var(--mbs-pad) var(--mbs-pad);
        }

        .mbs-slide-role {
          display: inline-block;
          max-width: 100%;
          background: var(--mbs-gold);
          color: #0d1f3c;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          margin-bottom: 14px;
          will-change: transform;
        }

        .mbs-slide-name {
          margin: 0 0 16px;
          font-size: clamp(1.3rem, 1rem + 1.6vw, 2.8rem);   /* fluid 21px → 45px */
          font-weight: 900;
          color: #fff;
          line-height: 1.12;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
          overflow-wrap: anywhere;
          will-change: transform;
        }

        .mbs-slide-desc {
          margin: 0;
          max-width: 480px;
          font-size: clamp(0.8rem, 0.74rem + 0.25vw, 0.92rem);
          color: rgba(255,255,255,0.78);
          line-height: 1.72;
          text-align: justify;
          text-justify: inter-word;
          hyphens: auto;
          overflow-wrap: break-word;
          will-change: transform;
        }

        /* Nav buttons */
        .mbs-nav-row {
          position: absolute;
          top: 28px;
          right: 28px;
          display: flex;
          gap: 10px;
          z-index: 10;
        }
        .mbs-btn-prev, .mbs-btn-next {
          width: 42px;
          height: 42px;
          padding: 0;
          background: rgba(255,255,255,0.12);
          border: 2px solid #fff;
          -webkit-backdrop-filter: blur(8px);
          backdrop-filter: blur(8px);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          user-select: none;
          -webkit-tap-highlight-color: transparent;
        }
        .mbs-btn-prev:focus-visible, .mbs-btn-next:focus-visible {
          outline: 3px solid var(--mbs-gold);
          outline-offset: 2px;
        }
        @media (hover: hover) {
          .mbs-btn-prev:hover, .mbs-btn-next:hover {
            background: var(--mbs-gold);
            border-color: var(--mbs-gold);
            transform: scale(1.08);
          }
        }
        .mbs-btn-prev.swiper-button-disabled,
        .mbs-btn-next.swiper-button-disabled {
          opacity: 0.3;
          cursor: default;
          pointer-events: none;
        }

        /* ── Thumbnails column (right) ─────────────────────── */
        .mbs-thumbs-wrap {
          flex: 0 0 var(--mbs-thumbs-w);
          width: var(--mbs-thumbs-w);
          min-width: 0;
          background: #020618;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .mbs-thumbs-header {
          padding: 20px 18px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .mbs-thumbs-header p {
          margin: 0;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
        }

        /* The swiper is absolutely filled into this box, so the thumbs list
           always matches the slide height and never stretches the layout */
        .mbs-thumbs-body {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
        }
        .mbs-thumbs-body .mbs-thumbs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 8px;
        }
        .mbs-thumbs .swiper-slide {
          height: auto !important;
          cursor: pointer;
          opacity: 1 !important;
        }
        .mbs-thumbs .swiper-slide:focus-visible .mbs-thumb-card {
          outline: 2px solid var(--mbs-gold);
          outline-offset: -2px;
        }

        .mbs-thumb-card {
          position: relative;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px;
          overflow: hidden;
          border: 1.5px solid transparent;
          transition: all 0.22s;
        }
        @media (hover: hover) {
          .mbs-thumb-card:hover {
            background: rgba(255,255,255,0.06);
            border-color: rgba(245,195,48,0.3);
          }
          .mbs-thumb-card:hover .mbs-thumb-photo img { filter: brightness(1); }
        }
        .mbs-thumb-card.active-thumb {
          background: rgba(245,195,48,0.12);
          border-color: rgba(245,195,48,0.6);
        }
        .mbs-thumb-card.active-thumb .mbs-thumb-name { color: var(--mbs-gold); }

        .mbs-thumb-photo {
          width: 56px;
          height: 56px;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: border-color 0.2s;
        }
        .mbs-thumb-card.active-thumb .mbs-thumb-photo { border-color: var(--mbs-gold); }
        .mbs-thumb-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.85);
          transition: filter 0.2s;
        }
        .mbs-thumb-card.active-thumb .mbs-thumb-photo img { filter: brightness(1); }
        .mbs-thumb-initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          font-weight: 900;
          color: rgba(255,255,255,0.5);
          background: linear-gradient(135deg, #1a3a6b, #0d1f3c);
        }

        .mbs-thumb-text { flex: 1; min-width: 0; }
        .mbs-thumb-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: rgba(255,255,255,0.8);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.2s;
        }
        .mbs-thumb-role {
          margin-top: 4px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Active indicator bar (left) */
        .mbs-thumb-card.active-thumb::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 70%;
          background: var(--mbs-gold);
        }

        /* Initials placeholder for main slide */
        .mbs-slide-initials {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: clamp(5rem, 14vw, 9rem);
          font-weight: 900;
          color: rgba(255,255,255,0.06);
          background: linear-gradient(135deg, #1a3a6b 0%, #0d1f3c 100%);
        }

        /* ══════════════════════════════════════════════════════
           LAPTOP  (1024px – 1199px)
           ══════════════════════════════════════════════════════ */
        @media (max-width: 1199px) {
          .mbs-root { --mbs-thumbs-w: 260px; }
        }

        /* ══════════════════════════════════════════════════════
           TABLET  (768px – 1023px)
           ══════════════════════════════════════════════════════ */
        @media (max-width: 1023px) {
          .mbs-root { --mbs-thumbs-w: 220px; }
          .mbs-bg-image { background-size: 70%; }
          .mbs-slide-desc { max-width: 100%; }
          .mbs-nav-row { top: 20px; right: 20px; }
          .mbs-thumbs-header { padding: 16px 14px 10px; }
          .mbs-thumb-card { gap: 10px; padding: 10px; }
          .mbs-thumb-photo { width: 48px; height: 48px; }
          .mbs-thumb-name { font-size: 0.88rem; }
          .mbs-thumb-role { font-size: 0.78rem; }
        }

        /* ══════════════════════════════════════════════════════
           MOBILE  (≤ 767px): stacked layout, horizontal thumbs
           ══════════════════════════════════════════════════════ */
        @media (max-width: 767px) {
          .mbs-root {
            --mbs-h: clamp(400px, 118vw, 540px);
            flex-direction: column;
            min-height: 0;
            box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          }

          .mbs-main { flex: none; width: 100%; }

          .mbs-bg-image {
            background-size: cover;
            background-position: center 20%;
          }

          /* light at top so the photo shows, heavy at bottom for legible text */
          .mbs-slide-overlay {
            background: linear-gradient(
              180deg,
              rgba(2,8,22,0.05) 0%,
              rgba(2,8,22,0.35) 35%,
              rgba(2,8,22,0.80) 62%,
              rgba(2,8,22,0.96) 100%
            );
          }

          .mbs-slide-content { padding: 64px 20px 24px; }
          .mbs-slide-role { font-size: 0.62rem; padding: 4px 10px; margin-bottom: 10px; }
          .mbs-slide-name { margin-bottom: 10px; }
          .mbs-slide-desc {
            max-width: 100%;
            line-height: 1.65;
            text-align: justify;
          }

          .mbs-nav-row { top: 14px; right: 14px; gap: 8px; }
          .mbs-btn-prev, .mbs-btn-next { width: 40px; height: 40px; }

          /* Thumbs strip */
          .mbs-thumbs-wrap { flex: none; width: 100%; }
          .mbs-thumbs-header { display: none; }
          .mbs-thumbs-body { flex: none; }
          .mbs-thumbs-body .mbs-thumbs {
            position: relative;
            inset: auto;
            height: auto;
            padding: 10px 0 12px 10px;
          }
          /* fade on the right edge hints that the strip scrolls */
          .mbs-thumbs-wrap::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 40px;
            background: linear-gradient(to right, transparent, #020618 90%);
            pointer-events: none;
            z-index: 5;
          }

          .mbs-thumbs .swiper-slide {
            width: 150px !important;
            height: auto !important;
          }
          .mbs-thumb-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            height: 100%;
            padding: 10px 10px 12px;
          }
          .mbs-thumb-photo { width: 44px; height: 44px; }
          .mbs-thumb-text { width: 100%; }
          .mbs-thumb-name,
          .mbs-thumb-role {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
            overflow-wrap: anywhere;
          }
          .mbs-thumb-name { font-size: 0.82rem; line-height: 1.3; }
          .mbs-thumb-role { font-size: 0.72rem; line-height: 1.25; margin-top: 2px; }

          /* Active indicator: top bar instead of left bar */
          .mbs-thumb-card.active-thumb::before {
            top: 0;
            left: 0;
            transform: none;
            width: 100%;
            height: 3px;
          }
        }

        /* ══════════════════════════════════════════════════════
           LARGE PHONES  (≤ 425px)
           ══════════════════════════════════════════════════════ */
        @media (max-width: 425px) {
          .mbs-slide-content { padding: 60px 16px 20px; }
          .mbs-slide-desc { font-size: 0.8rem; }
          .mbs-nav-row { top: 12px; right: 12px; }
          .mbs-thumbs .swiper-slide { width: 140px !important; }
        }

        /* ══════════════════════════════════════════════════════
           MEDIUM PHONES  (≤ 375px)
           ══════════════════════════════════════════════════════ */
        @media (max-width: 375px) {
          .mbs-root { --mbs-h: clamp(390px, 122vw, 460px); }
          .mbs-slide-role { font-size: 0.58rem; letter-spacing: 0.1em; }
          .mbs-slide-desc { font-size: 0.78rem; line-height: 1.6; }
          .mbs-btn-prev, .mbs-btn-next { width: 38px; height: 38px; }
          .mbs-thumbs .swiper-slide { width: 132px !important; }
          .mbs-thumb-photo { width: 40px; height: 40px; }
        }

        /* ══════════════════════════════════════════════════════
           SMALL PHONES  (≤ 340px, e.g. 320px)
           ══════════════════════════════════════════════════════ */
        @media (max-width: 340px) {
          .mbs-root { --mbs-h: 400px; }
          .mbs-slide-content { padding: 58px 14px 18px; }
          .mbs-slide-role { padding: 4px 8px; }
          .mbs-slide-desc { font-size: 0.75rem; }
          .mbs-nav-row { top: 10px; right: 10px; gap: 6px; }
          .mbs-btn-prev, .mbs-btn-next { width: 36px; height: 36px; }
          .mbs-thumbs-body .mbs-thumbs { padding-left: 8px; }
          .mbs-thumbs .swiper-slide { width: 120px !important; }
          .mbs-thumb-card { padding: 8px 8px 10px; }
          .mbs-thumb-name { font-size: 0.78rem; }
          .mbs-thumb-role { font-size: 0.68rem; }
        }

        /* ══════════════════════════════════════════════════════
           SHORT LANDSCAPE SCREENS (phones rotated)
           ══════════════════════════════════════════════════════ */
        @media (max-height: 480px) and (orientation: landscape) {
          .mbs-root { --mbs-h: 360px; }
          .mbs-slide-content { padding-top: 64px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .mbs-root * { transition: none !important; }
        }
      `}</style>

      {/* MAIN SWIPER */}
      <div className="mbs-main swiper" ref={mainSwiperRef}>
        <div className="swiper-wrapper">
          {members.map((member, i) => (
            <div className="swiper-slide" key={i}>
              {/* Parallax background */}
              {member.photo ? (
                <div
                  className="mbs-bg-image"
                  data-swiper-parallax="-25%"
                  style={{ backgroundImage: `url(${member.photo})` }}
                />
              ) : (
                <div className="mbs-slide-initials" data-swiper-parallax="-10%">
                  {member.initials}
                </div>
              )}

              {/* Overlay */}
              <div className="mbs-slide-overlay" />

              {/* Content */}
              <div className="mbs-slide-content">
                <div data-swiper-parallax="-120" data-swiper-parallax-opacity="0">
                  <span className="mbs-slide-role">{member.title}</span>
                </div>
                <div data-swiper-parallax="-200" data-swiper-parallax-opacity="0">
                  <h3 className="mbs-slide-name">{member.name}</h3>
                </div>
                <div data-swiper-parallax="-150" data-swiper-parallax-opacity="0">
                  <p className="mbs-slide-desc">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="mbs-nav-row">
          <button type="button" className="mbs-btn-prev" aria-label="Previous board member">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button type="button" className="mbs-btn-next" aria-label="Next board member">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* THUMB STRIP */}
      <div className="mbs-thumbs-wrap">
        <div className="mbs-thumbs-header">
          <p>Board Members</p>
        </div>
        <div className="mbs-thumbs-body">
          <div className="swiper mbs-thumbs" ref={thumbSwiperRef}>
            <div className="swiper-wrapper">
              {members.map((member, i) => (
                <div
                  className="swiper-slide"
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-label={`Show ${member.name}`}
                  onClick={() => handleThumbClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleThumbClick(i);
                    }
                  }}
                >
                  <div className={`mbs-thumb-card ${i === activeIndex ? "active-thumb" : ""}`}>
                    <div className="mbs-thumb-photo">
                      {member.photo ? (
                        <img src={member.photo} alt={member.name} loading="lazy" />
                      ) : (
                        <div className="mbs-thumb-initials">{member.initials}</div>
                      )}
                    </div>
                    <div className="mbs-thumb-text">
                      <div className="mbs-thumb-name">{member.name}</div>
                      <div className="mbs-thumb-role">{member.title}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}