import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useCampusNotice } from "./useCampusNotice";
import { MainView } from "../../types";

interface CampusNoticeWidgetProps {
  mascotImage?: string;
  boardImage?: string;
  title?: string;
  message?: string;
  setView?: (view: MainView) => void;
}

export default function CampusNoticeWidget({
  mascotImage = "/assets/notice/student-mascot.png",
  boardImage = "/assets/notice/notice-board.png",
  title = "Important Announcement!",
  message = "Please check the latest updates on our admissions and events page.",
  setView,
}: CampusNoticeWidgetProps) {
  const { isOpen, toggle, close } = useCampusNotice();

  return (
    <div className="cnw-root fixed sm:-bottom-15 sm:right-15 z-[95] flex flex-col items-end select-none">
      {/*
        MOBILE (< 640px)
        - The mascot sits to the LEFT of the WhatsApp button (same as tablet/desktop).
        - Mascot size is fluid: 88px @320 -> 120px @425.
        - The board width is calculated from the space left next to the mascot,
          and its tail is lined up over the mascot automatically.
        - Board text size / position are all derived from the board width,
          so they stay inside the yellow area at every size.

        Tablet / desktop (>= 640px) keeps the original Tailwind sm: styles.

        Quick tuning (only if needed):
          --cnw-r : gap from screen's right edge to the mascot (space for WhatsApp)
          --cnw-b : gap from screen's bottom edge to the mascot
      */}
      <style>{`
        .cnw-root {
          --cnw-r: 60px;
          --cnw-b: -23px;
          --cnw-m: clamp(140px, 28vw, 120px);
          --cnw: min(330px, calc((100vw - 8px - var(--cnw-r) - var(--cnw-m) * 0.55) / 0.82));
        }

        @media (max-width: 639px) {
          .cnw-root { right: var(--cnw-r); bottom: var(--cnw-b); }

          .cnw-mascot { width: var(--cnw-m); height: var(--cnw-m); }

          .cnw-board {
            width: var(--cnw);
            margin-right: calc(var(--cnw-m) * 0.55 - var(--cnw) * 0.18);
            margin-bottom: calc(var(--cnw-m) * -0.3 - 12px);
          }

          .cnw-text {
            position: absolute;
            left: 13.5%;
            right: 9%;
            top: 37%;
            bottom: 17%;
            overflow-wrap: anywhere;
          }
          .cnw-title {
            font-size: calc(var(--cnw) * 0.05);
            line-height: 1.15;
            margin-bottom: calc(var(--cnw) * 0.01);
          }
          .cnw-msg {
            font-size: calc(var(--cnw) * 0.04);
            line-height: 1.3;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
          }
          .cnw-btn {
            font-size: calc(var(--cnw) * 0.039);
            line-height: 1.2;
            padding: 0.35em 0.85em;
            margin-top: calc(var(--cnw) * 0.02);
          }
        }
      `}</style>

      {/* Speech-bubble board */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="cnw-board relative z-10 sm:-mb-24 sm:mr-20 sm:w-[340px] aspect-[405/302]"
          >
            <img
              src={boardImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            <button
              onClick={close}
              className="absolute top-2 right-2 sm:top-9 sm:right-7 w-5 h-5 sm:w-6 sm:h-6 bg-white hover:bg-slate-100 rounded-full sm:rounded-none flex items-center justify-center transition-colors z-20 cursor-pointer shadow-sm"
              aria-label="Close notice"
            >
              <X size={12} className="text-slate-900" />
            </button>

            <div className="cnw-text flex flex-col justify-center break-words sm:relative sm:h-full sm:top-2 sm:-right-12 sm:pl-8 sm:pr-12 sm:pb-6">
              <h4 className="cnw-title font-sans font-black text-slate-900 sm:text-base sm:leading-snug sm:mb-1">
                {title}
              </h4>
              <p className="cnw-msg text-white font-semibold sm:text-sm sm:leading-relaxed">
                {message}
              </p>
              {/* button */}
              <button
                onClick={() => {
                  if (setView) {
                    setView("news-events");
                    const scrollToNotices = () => {
                      const el = document.getElementById("announcements-notices-heading");
                      if (el) {
                        const HEADER_HEIGHT = 100;
                        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
                        window.scrollTo({ top, behavior: "smooth" });
                      }
                    };
                    setTimeout(scrollToNotices, 100);
                    setTimeout(scrollToNotices, 350);
                    setTimeout(scrollToNotices, 500);
                  } else if (typeof window !== "undefined") {
                    window.location.href = "/news-events#announcements-notices-heading";
                  }
                }}
                className="cnw-btn group relative w-fit sm:w-[100px] sm:mt-5 overflow-hidden bg-white text-slate-700 font-semibold sm:text-sm sm:px-3 sm:py-1.5 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer block text-center"
              >
                {/* Left to Right Background */}
                <span className="absolute inset-0 bg-[#020618] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"></span>

                {/* Text */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                  More Details
                </span>
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot trigger */}
      <motion.button
        type="button"
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        className="cnw-mascot sm:w-80 sm:h-80 cursor-pointer drop-shadow-xl relative z-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5C330]"
        aria-label="Toggle campus notice"
      >
        <img
          src={mascotImage}
          alt="School mascot"
          className="w-full h-full object-contain"
        />
      </motion.button>
    </div>
  );
}