/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { AdmissionsSubView, AdmissionFormData } from "../types";
import AdmissionsHero from "./admissions/AdmissionsHero";
import AdmissionsProcess from "./admissions/AdmissionsProcess";
import AdmissionsEligibility from "./admissions/AdmissionsEligibility";
import AdmissionsScholarship from "./admissions/AdmissionsScholarship";
import AdmissionsInfoCards from "./admissions/AdmissionsInfoCards";
import AdmissionsRegistrationForm from "./admissions/AdmissionsRegistrationForm";
import AdmissionsOnlineCTA from "./admissions/AdmissionsOnlineCTA";
import AdmissionsFAQ from "./admissions/AdmissionsFAQ";
import AdmissionsStickyNav from "./admissions/AdmissionsStickyNav";
import AdmissionsStats from "./admissions/AdmissionsStats";
import AdmissionsCTA from "./admissions/AdmissionsCTA";

interface AdmissionsViewProps {
  subView?: AdmissionsSubView;
  onSubmitApplication?: (data: AdmissionFormData) => void;
}

// Maps each Header dropdown sub-item to the section it should scroll to.
const sectionIdMap: Record<string, string> = {
  process: "admissions-process",
  "registration-form": "admissions-registration",
  scholarships: "admissions-scholarships",
};

export default function AdmissionsView({ subView = "overview", onSubmitApplication }: AdmissionsViewProps) {
  useEffect(() => {
    const id = sectionIdMap[subView as string];
    if (!id) return;

    const SCROLL_DELAY = 450;
    const HEADER_HEIGHT = window.innerWidth < 768 ? 80 : 120;

    const timer = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, SCROLL_DELAY);

    return () => clearTimeout(timer);
  }, [subView]);

  return (
    <div
      className="w-full bg-white text-slate-800 font-sans"
      id="admissions-view-container"
      style={{ position: "relative", zoom: 0.9 }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        #admissions-view-container * {
          font-family: 'Inter', sans-serif;
          box-sizing: border-box;
        }

        /* Shared section divider */
        .section-divider {
          width: 64px;
          height: 4px;
          background: linear-gradient(90deg, #F5C330, #60BADC);
          border-radius: 9999px;
          margin-top: 16px;
        }

        /* Legacy success-btn kept for registration form & CTA compatibility */
        .success-btn {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 34px;
          background: #ffffff;
          color: #020816;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: color .35s ease;
        }
        .success-btn-bg {
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: #f5c330;
          transition: left 0.45s ease;
          z-index: 0;
        }
        .success-btn-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: color .35s ease;
        }
        .success-btn:hover .success-btn-bg { left: 0; }
        .success-btn:hover .success-btn-content { color: #020816; }
        .success-btn:hover svg {
          color: #020816;
          transform: translateX(4px);
          transition: .3s;
        }

        /* Stats section styles */
        .stats-section {
          background: linear-gradient(135deg, #0d1f3c 0%, #1a3a6b 100%);
          position: relative;
          overflow: hidden;
        }
        .stat-item { text-align: center; position: relative; z-index: 1; }
        .stat-item .stat-number {
          font-size: 2.8rem; font-weight: 900;
          color: #F5C330; line-height: 1;
        }
        .stat-item .stat-label {
          font-size: 0.8rem;
          color: rgba(255,255,255,0.7);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-top: 6px;
        }

        /* Registration section */
        .reg-section-badge {
          display: inline-block;
          color: #F5C330;
          font-size: 0.7rem; font-weight: 800;
          padding: 4px 14px;
          border-radius: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 14px;
          background-color: #020618;
        }

        @media(prefers-reduced-motion:reduce) {
          * { animation:none !important; transition:none !important; }
        }

        
      `}</style>

      {/* ── Sticky sidebar progress nav (desktop) ── */}
      {/* <AdmissionsStickyNav /> */}

      {/* ── 1. HERO ── */}
      <AdmissionsHero />

      {/* ── 2. ADMISSION PROCESS TIMELINE ── */}
      <AdmissionsProcess />

      {/* ── 9. STATS ── */}
      <AdmissionsStats />

      {/* ── 3. ELIGIBILITY ── */}
      <AdmissionsEligibility />


      {/* ── 5. ADMISSION CRITERIA CARDS ── */}
      {/* <AdmissionsInfoCards /> */}



      {/* ── 6. ONLINE REGISTRATION CTA ── */}
      <AdmissionsOnlineCTA />
      {/* ── 7. EMBEDDED REGISTRATION FORM ── */}
      {/* <section
        id="admissions-registration"
        className="scroll-mt-24"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
          padding: "80px 0",
        }}
      >
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"0 40px" }}>
          <div style={{ marginBottom:52, textAlign:"center" }}>
            <span className="reg-section-badge">Apply Now</span>
            <h2 style={{
              fontSize:"clamp(1.8rem, 2.7vw, 2.6rem)",
              fontWeight:900, color:"#0d1f3c",
              margin:"0 0 8px",
            }}>
              Online Registration{" "}
              <span style={{ color:"#F5C330" }}>Form</span>
            </h2>
            <div className="section-divider" style={{ margin:"12px auto 16px" }} />
            <p style={{ maxWidth:520, margin:"0 auto", fontSize:"0.95rem", color:"#64748b", lineHeight:1.7 }}>
              Prefer to fill it in directly here instead of Google Forms?
              Complete the application below.
            </p>
          </div>
          <div style={{ maxWidth:760, margin:"0 auto" }}>
            <AdmissionsRegistrationForm onSubmit={onSubmitApplication} />
          </div>
        </div>
      </section> */}
      {/* ── 4. SCHOLARSHIPS ── */}
      <AdmissionsScholarship />







      {/* ── 8. FAQ ── */}
      <AdmissionsFAQ />



      {/* ── 10. FINAL CTA ── */}
      <AdmissionsCTA />
    </div>
  );
}
