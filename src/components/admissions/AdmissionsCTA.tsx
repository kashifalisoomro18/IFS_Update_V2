import { useEffect, useRef, useState } from "react";
// Navigation handled via window.location for SPA compatibility
import { ArrowRight, ExternalLink } from "lucide-react";

const ADMISSIONS_PATH = "/admissions";
const REGISTRATION_SECTION_ID = "admissions-registration";

function scrollToAdmissionsSection(sectionId: string) {
  const el = document.getElementById(sectionId);
  const headerHeight = window.innerWidth < 768 ? 85 : 125;
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function AdmissionsCTA() {
  const { ref, visible } = useReveal();

  const handleApplyNow = () => {
    if (typeof window === "undefined") return;

    const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
    const onAdmissionsPage = currentPath === ADMISSIONS_PATH;

    if (onAdmissionsPage) {
      scrollToAdmissionsSection(REGISTRATION_SECTION_ID);
      return;
    }

    // Store the scroll target so AdmissionsView can pick it up after mount
    sessionStorage.setItem("admissionsScrollTarget", REGISTRATION_SECTION_ID);
    window.location.href = `${ADMISSIONS_PATH}#${REGISTRATION_SECTION_ID}`;
  };

  return (
    <section className="relative h-[auto] min-h-[500px] flex items-center overflow-hidden py-16 lg:py-24">
      {/* Background image */}
      <img src="/building-image1.jpg" alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover object-center" />
      {/* Dark overlay so text stays readable */}
      <div className="absolute inset-0 z-[1]" style={{background: "linear-gradient(90deg, rgba(11,32,63,0.88) 0%, rgba(11,32,63,0.75) 100%)" }}/>

      {/* Content */}
      <div ref={ref} className="relative z-[2] w-full px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12"
            style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",transition: "all 0.6s ease 0s", }}>
            <p className="text-white text-sm font-bold uppercase tracking-widest mb-4">
              Limited Seats Available </p>
            <h2 className="text-3xl sm:text-6xl font-extrabold text-white mb-6">
              Secure Your Child's <span className="text-[#F5C330]">Future</span> Today</h2>
            <p className="text-white text-base sm:text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Seats for the 2025–26 academic session are filling fast.
              Start the application process now and give your child the world-class
              education they deserve at ISRA Foundation Schools.</p>
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
              <button
                type="button"
                onClick={handleApplyNow}
                className="group relative overflow-hidden inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 sm:px-8 sm:py-4 w-full sm:w-auto cursor-pointer border-0"
                style={{
                  background: "white",
                  color: "#020816",
                }}
              >
                <span className="absolute inset-0 bg-[#f5C330] origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                <span className="relative z-10 flex items-center gap-2">
                  Apply Now <ArrowRight className="w-5 h-5" />
                </span>
              </button>

                {/* Google Form Button */}
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe57M4une4aQYnDUjL12hQN1IfI5s8Kt718syMKnFEvBveVsg/viewform" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 sm:px-8 sm:py-4 w-full sm:w-auto" 
                  style={{ 
                    border: '2px solid rgba(255,255,255,0.2)', 
                    color: 'white',
                    textDecoration: 'none',
                    
                    // Left to right color fill ke liye background canvas layout
                    backgroundImage: "linear-gradient(to right, rgba(96, 186, 220, 0.15) 50%, transparent 50%)",
                    backgroundSize: "200% 100%",
                    backgroundPosition: "right bottom",
                    
                    // Duration set ki hai taaki animation smoothly (0.4s) chale
                    transition: "background-position 0.4s ease, border-color 0.4s ease, color 0.4s ease"
                  }}
                  onMouseEnter={e => {
                    const target = e.currentTarget as HTMLAnchorElement;
                    target.style.backgroundPosition = "left bottom";
                    target.style.borderColor = "#60BADC"; // Hover par border blue
                    target.style.color = "#60BADC";       // Hover par text blue
                    
                    const svg = target.querySelector("svg");
                    if (svg) svg.style.stroke = "#60BADC"; // Icon blue
                  }}
                  onMouseLeave={e => {
                    const target = e.currentTarget as HTMLAnchorElement;
                    target.style.backgroundPosition = "right bottom";
                    target.style.borderColor = "rgba(255,255,255,0.2)"; // Wapis original border
                    target.style.color = "white";                       // Wapis white text
                    
                    const svg = target.querySelector("svg");
                    if (svg) svg.style.stroke = "currentColor";          // Wapis white icon
                  }}
                >
                  Google Form <ExternalLink className="w-5 h-5" />
                </a>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}