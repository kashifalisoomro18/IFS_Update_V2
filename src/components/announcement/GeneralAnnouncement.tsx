/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface AnnouncementData {
  /** Large banner image shown inside the modal */
  image: string;
  /** Alt text for the banner image */
  imageAlt?: string;
}

export interface AnnouncementModalProps {
  /** Controls visibility. Component handles its own enter/exit animation. */
  isOpen: boolean;
  /** Called when the user closes the modal (X button, backdrop click, Escape). */
  onClose: () => void;
  /** Announcement content. Falls back to sensible defaults if omitted. */
  data?: AnnouncementData;
}

const DEFAULT_DATA: AnnouncementData = {
  image: "/Admission_Poster.jpeg",
  imageAlt: "Isra Foundation Schools Announcement",
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

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function AnnouncementModal({
  isOpen,
  onClose,
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
            aria-label={data.imageAlt ?? "Announcement"}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] max-h-[85vh] overflow-hidden bg-white shadow-2xl"
            style={{
              boxShadow: "0 30px 80px -20px rgba(2,8,22,0.45), 0 0 0 1px rgba(96,186,220,0.08)",
            }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Close announcement"
              className="group absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center bg-[#020816] outline-none border-none appearance-none shadow-none rounded-full transition-colors duration-300 hover:bg-[#F5C330] cursor-pointer"
            >
              <X
                size={16}
                strokeWidth={2.25}
                className="text-white transition-colors duration-300 group-hover:text-[#020816]"
              />
            </button>

            {/* Image only */}
            <img
              src={data.image}
              alt={data.imageAlt ?? ""}
              className="w-full h-auto max-h-[85vh] object-contain block"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}