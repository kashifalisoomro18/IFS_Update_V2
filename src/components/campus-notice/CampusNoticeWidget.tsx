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
    <div className="fixed bottom-24 right-3 sm:-bottom-15 sm:right-15 z-[95] flex flex-col items-end select-none">
      {/* Speech-bubble board */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative -mb-25 mr-20 w-[min(85vw,300px)] sm:w-[340px] aspect-[405/302]"
          >
            <img
              src={boardImage}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            />
            <button
              onClick={close}
              className="absolute top-3 right-4 sm:top-9 sm:right-7 w-6 h-6  bg-white hover:bg-white flex items-center justify-center transition-colors z-10 cursor-pointer"
              aria-label="Close notice"
            >
              <X size={13} className="text-slate-900" />
            </button>

            <div className="relative h-full flex flex-col justify-center pl-6 pr-10 pb-5 sm:top-2 sm:-right-12 sm:pl-8 sm:pr-12 sm:pb-6 break-words">
              <h4 className="font-sans font-black text-slate-900 text-xs sm:text-base leading-snug mb-1">
                {title}
              </h4>
              <p className="text-white text-[11px] sm:text-sm font-semibold leading-relaxed">
                {message}
              </p>
              {/* button  */}
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
                className="group relative w-[100px] sm:top-5 overflow-hidden bg-white text-slate-700 font-medium text-sm  py-1.5 shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
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
        className="w-20 h-20 sm:w-90 sm:h-90 cursor-pointer drop-shadow-xl relative z-0"
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