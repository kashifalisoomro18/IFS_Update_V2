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
    <div className="fixed bottom-20 sm:-bottom-15 right-2 sm:right-15 z-[95] flex flex-col items-end select-none">
      {/* Speech-bubble board */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative -mb-2 sm:-mb-24 mr-0 sm:mr-20 w-[min(calc(100vw-24px),265px)] sm:w-[340px] aspect-[405/302]"
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

            <div className="relative h-full flex flex-col justify-center pl-7 pr-8 pb-3 sm:top-2 sm:-right-12 sm:pl-8 sm:pr-12 sm:pb-6 break-words">
              <h4 className="font-sans font-black text-slate-900 text-[11px] sm:text-base leading-tight sm:leading-snug mb-0.5 sm:mb-1">
                {title}
              </h4>
              <p className="text-white text-[9.5px] sm:text-sm font-semibold leading-tight sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
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
                className="group relative w-fit min-w-[72px] sm:w-[100px] mt-1.5 sm:mt-5 overflow-hidden bg-white text-slate-700 font-semibold text-[10px] sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer block text-center"
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
        className="w-14 h-14 sm:w-80 sm:h-80 cursor-pointer drop-shadow-xl relative z-0"
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