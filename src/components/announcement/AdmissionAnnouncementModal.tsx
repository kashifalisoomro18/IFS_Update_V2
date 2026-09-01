/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Calendar as CalendarIcon, ArrowRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface AnnouncementData {
  /** Small label above the title, e.g. "IFS Admissions Office" */
  eyebrow?: string;
  /** Big headline */
  title: string;
  /** Supporting paragraph */
  description: string;
  /** Text inside the pill/badge, e.g. "Admissions Open" */
  badgeText?: string;
  /** Large banner image shown at the top of the card */
  image: string;
  /** Alt text for the banner image */
  imageAlt?: string;
  /** Human readable date/deadline, e.g. "Deadline: 30 September 2026" */
  date?: string;
  /** Shows a floating "NEW" ribbon on the image when true */
  isNew?: boolean;
  /** Primary CTA button label */
  ctaText?: string;
  /** Secondary (close) button label */
  secondaryText?: string;
}

export interface AnnouncementModalProps {
  /** Controls visibility. Component handles its own enter/exit animation. */
  isOpen: boolean;
  /** Called when the user closes the modal (X button, backdrop click, Escape, or CTA). */
  onClose: () => void;
  /** Called when the user clicks the primary CTA. If omitted, CTA just closes the modal. */
  onApply?: () => void;
  /** Announcement content. Falls back to sensible defaults if omitted. */
  data?: AnnouncementData;
}

const DEFAULT_DATA: AnnouncementData = {
  eyebrow: "Isra Foundation Schools",
  title: "Admissions Open for Fall 2027",
  description:
    "Applications are now open for undergraduate and postgraduate programs. Apply before the deadline to secure your admission.",
  badgeText: "Admissions Open",
  image: "/AD.png",
  imageAlt: "Students at Isra Foundation Schools",
  date: "Deadline: 30 September 2026",
  isNew: true,
  ctaText: "Apply Now",
  secondaryText: "Maybe Later",
};

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.25, ease: "easeIn" as const } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 12,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

const badgeFloat = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AnnouncementModal({
  isOpen,
  onClose,
  onApply,
  data = DEFAULT_DATA,
}: AnnouncementModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Lock body scroll while open, restore on close/unmount.
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Focus management: capture trigger, move focus in, trap Tab, restore on close.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement;
    // Delay one tick so the element is mounted before focusing.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused.current?.focus();
    };
  }, [isOpen, onClose]);

  const handleApplyClick = () => {
    onApply?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="announcement-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
          style={{ background: "rgba(2,8,22,0.72)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            key="announcement-modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-modal-title"
            aria-describedby="announcement-modal-description"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[660px] max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200"
            style={{
              background: "#ffffff",
              boxShadow: "0 30px 80px -20px rgba(2,8,22,0.45), 0 0 0 1px rgba(96,186,220,0.08)",
            }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close announcement"
              className="group absolute top-4 right-4 z-30 w-9 h-9 flex items-center justify-center bg-[#F5C330] outline-none border-none appearance-none shadow-none transition-colors duration-300 hover:bg-[#020816] cursor-pointer"
            >
              <X
                size={17}
                strokeWidth={2.25}
                className="text-[#020816] transition-colors duration-300 group-hover:text-white"
              />
            </button>

            {/* Banner image — reduced height */}
            <div className="relative w-[full] h-[240px] sm:h-[280px] overflow-hidden">
              <img
                src={data.image}
                alt={data.imageAlt ?? ""}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(2,8,22,0.15) 0%, rgba(2,8,22,0.15) 55%, rgba(2,8,22,0.92) 100%)",
                }}
              />

              {/* NEW ribbon */}
              {data.isNew && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
                  animate={{ opacity: 1, scale: 1, rotate: -6 }}
                  transition={{ delay: 0.35, duration: 0.4, ease: "easeOut" }}
                  className="absolute top-4 left-4 bg-[#F5C330] text-[#020816] text-[10px] font-black uppercase tracking-widest px-3 py-1 shadow-md"
                >
                  New
                </motion.span>
              )}

              {/* Floating badge/icon, anchored bottom-left of image */}
              {/* {data.badgeText && (
                <motion.div
                  variants={badgeFloat}
                  animate="animate"
                  className="absolute -bottom-6 left-6 flex items-center gap-2 bg-white shadow-lg px-4 py-2.5 border border-slate-100"
                >
                  <span className="w-7 h-7 bg-[#60BADC]/15 flex items-center justify-center shrink-0">
                    <Sparkles size={15} className="text-[#60BADC]" />
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-[#020816]">
                    {data.badgeText}
                  </span>
                </motion.div>
              )} */}
            </div>

            {/* Body — further compacted */}
            <div className="relative px-6 sm:px-8 pt-4 sm:pt-5 pb-4 border-l-4 border-[#F5C330]">
              {/* {data.eyebrow && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-0.5 bg-[#60BADC]" />
                  <span className="font-mono text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#020816]">
                    {data.eyebrow}
                  </span>
                </div>
              )} */}

              <h2
                id="announcement-modal-title"
                className="font-sans font-black text-[#020816] text-lg sm:text-xl leading-tight tracking-tight mb-2"
              >
                {data.title}
              </h2>

              <p
                id="announcement-modal-description"
                className="text-slate-700 text-sm leading-relaxed mb-2 text-justify"
              >
                {data.description}
              </p>

              {data.date && (
                <div className="flex items-center gap-2 mb-3 text-slate-700">
                  <CalendarIcon size={14} className="text-[#020816]" />
                  <span className="text-xs font-semibold uppercase tracking-wide">{data.date}</span>
                </div>
              )}

              {/* Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-3" />

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-6 py-2 text-xs font-bold uppercase tracking-widest text-[#020816] border-2 border-slate-200 transition-colors duration-300 hover:border-[#020816] cursor-pointer"
                >
                  {data.secondaryText ?? "Close"}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleApplyClick}
                  className="group relative flex-1 sm:flex-none overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-2 text-xs font-bold uppercase tracking-widest text-[#020816] bg-[#F5C330] shadow-md transition-shadow duration-300 hover:shadow-xl cursor-pointer"
                >
                  <span className="absolute inset-0 bg-[#60BADC] origin-left scale-x-0 transition-transform duration-400 ease-out group-hover:scale-x-100" />
                  <span className="relative z-10 flex items-center gap-2">
                    {data.ctaText ?? "Apply Now"}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}