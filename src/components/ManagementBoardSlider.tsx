/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Parallax, Thumbs, Navigation, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Swiper CSS (core + modules)
import "swiper/css";
import "swiper/css/parallax";
import "swiper/css/thumbs";
import "swiper/css/navigation";

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

    // 1. Init thumbs swiper first
    const thumbSwiper = new Swiper(thumbSwiperRef.current, {
      modules: [A11y],
      direction: "vertical",
      slidesPerView: "auto",
      spaceBetween: 12,
      watchSlidesProgress: true,
      watchOverflow: true,
      a11y: { enabled: true },
      breakpoints: {
        0: { direction: "horizontal", spaceBetween: 10 },
        768: { direction: "vertical", spaceBetween: 12 },
      },
    });
    thumbSwiperInstance.current = thumbSwiper;

    // 2. Init main swiper
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
        /* ── Root wrapper ─────────────────────────────────────── */
        .mbs-root {
          position: relative;
          width: 100%;
          display: flex;
          gap: 0;
          min-height: 560px;
          border-radius: 0px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
        }

        /* ── Main swiper (left) ──────────────────────────────── */
        .mbs-main {
          flex: 1 1 0;
          position: relative;
          overflow: hidden;
        }
        .mbs-main .swiper-slide {
          position: relative;
          overflow: hidden;
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
          object-fit: contain;
          object-position: center;
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

        /* Content on top of overlay */
        .mbs-slide-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 52px 52px;
          z-index: 2;
        }
        @media (max-width: 767px) {
          .mbs-slide-content { padding: 32px 24px; }
        }

        .mbs-slide-role {
          display: inline-block;
          background: #F5C330;
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
          font-size: 2.8rem;
          font-weight: 900;
          color: #fff;
          line-height: 1.1;
          margin-bottom: 16px;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
          will-change: transform;
        }
        @media (max-width: 1023px) { .mbs-slide-name { font-size: 2rem; } }
        @media (max-width: 767px) { .mbs-slide-name { font-size: 1.5rem; } }

        .mbs-slide-desc {
          font-size: 0.92rem;
          color: rgba(255,255,255,0.78);
          max-width: 480px;
          line-height: 1.72;
          will-change: transform;
        }
        @media (max-width: 767px) { .mbs-slide-desc { font-size: 0.82rem; } }

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
          // border-radius: 50%;
          background: rgba(255,255,255,0.12);
         border: 2px solid #ffffffff;
          backdrop-filter: sepia (8px);
          color: #ffffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 1rem;
          user-select: none;
        }
        .mbs-btn-prev:hover, .mbs-btn-next:hover {
          background: #F5C330;
          border-color: #F5C330;
          color: #ffffffff;
          transform: scale(1.08);
        }
        .mbs-btn-prev.swiper-button-disabled,
        .mbs-btn-next.swiper-button-disabled {
          opacity: 0.3;
          cursor: default;
          pointer-events: none;
        }

        /* ── Thumbnails strip (right) ──────────────────────── */
        .mbs-thumbs-wrap {
          width: 300px;
          flex-shrink: 0;
          background: #020618;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 1023px) {
          .mbs-thumbs-wrap { width: 240px; }
        }

        /* On mobile: horizontal row below main */
        @media (max-width: 767px) {
          .mbs-root {
            flex-direction: column;
            min-height: 0;
          }
          .mbs-thumbs-wrap {
            width: 100%;
            height: 90px;
            flex-direction: row;
            overflow-x: auto;
            overflow-y: hidden;
          }
        }

        .mbs-thumbs {
          height: 100%;
          width: 100%;
          padding: 8px;
        }
        @media (max-width: 767px) {
          .mbs-thumbs { height: 90px; }
        }

        .mbs-thumbs .swiper-slide {
          height: auto !important;
          cursor: pointer;
          opacity: 1 !important;
        }
        @media (max-width: 767px) {
          .mbs-thumbs .swiper-slide {
            width: 120px !important;
          }
        }

        .mbs-thumb-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 14px;
          border-radius: 0px;
          transition: all 0.22s;
          position: relative;
          overflow: hidden;
          border: 1.5px solid transparent;
        }
        .mbs-thumb-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(245,195,48,0.3);
        }
        .mbs-thumb-card.active-thumb {
          background: rgba(245,195,48,0.12);
          border-color: rgba(245,195,48,0.6);
        }
        .mbs-thumb-card.active-thumb .mbs-thumb-name {
          color: #F5C330;
        }

        .mbs-thumb-photo {
          width: 56px;
          height: 56px;
          // border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid transparent;
          transition: border-color 0.2s;
        }
        .mbs-thumb-card.active-thumb .mbs-thumb-photo {
          border-color: #F5C330;
        }
        .mbs-thumb-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.85);
          transition: filter 0.2s;
        }
        .mbs-thumb-card.active-thumb .mbs-thumb-photo img,
        .mbs-thumb-card:hover .mbs-thumb-photo img {
          filter: brightness(1);
        }
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
        font-size: 0.85rem;
          color: rgba(255,255,255,0.55);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 4px;
          font-weight: 600;
          letter-spacing: 0.03em;
        }

        /* Active indicator bar */
        .mbs-thumb-card.active-thumb::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 70%;
          background: #F5C330;
          border-radius: 0 3px 3px 0;
        }

        /* Thumb header */
        .mbs-thumbs-header {
          padding: 20px 18px 12px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }
        .mbs-thumbs-header p {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #ffffffff;
        }
        @media (max-width: 767px) {
          .mbs-thumbs-header { display: none; }
        }

        /* Initials placeholder for main slide */
        .mbs-slide-initials {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9rem;
          font-weight: 900;
          color: rgba(255,255,255,0.06);
          background: linear-gradient(135deg, #1a3a6b 0%, #0d1f3c 100%);
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
                  <p className="mbs-slide-desc text-justify">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="mbs-nav-row">
          <button className="mbs-btn-prev" aria-label="Previous board member">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button className="mbs-btn-next" aria-label="Next board member">
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
        <div className="swiper mbs-thumbs" ref={thumbSwiperRef}>
          <div className="swiper-wrapper">
            {members.map((member, i) => (
              <div
                className="swiper-slide"
                key={i}
                onClick={() => handleThumbClick(i)}
              >
                <div className={`mbs-thumb-card ${i === activeIndex ? "active-thumb" : ""}`}>
                  <div className="mbs-thumb-photo">
                    {member.photo ? (
                      <img src={member.photo} alt={member.name} />
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
  );
}
