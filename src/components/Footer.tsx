/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "../types";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Award, ArrowRight } from "lucide-react";

interface FooterProps {
  setView?: (view: MainView) => void;
  setAboutSubView?: (sub: AboutSubView) => void;
  setAdmissionsSubView?: (sub: AdmissionsSubView) => void;
  setAcademicsSubView?: (sub: AcademicsSubView) => void;
}

export default function Footer({
  setView,
  setAboutSubView,
  setAdmissionsSubView,
  setAcademicsSubView,
}: FooterProps) {
  const handleNav = (view: MainView) => {
    if (setView) {
      setView(view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (typeof window !== "undefined") {
      const targetPath = view === "home" ? "/" : `/${view}`;
      if (window.location.pathname !== targetPath) {
        window.location.href = targetPath;
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleSubNav = (
    view: "about" | "admissions" | "academics",
    subView: string
  ) => {
    if (setView) {
      setView(view);
      if (view === "about" && setAboutSubView) setAboutSubView(subView as AboutSubView);
      if (view === "admissions" && setAdmissionsSubView) setAdmissionsSubView(subView as AdmissionsSubView);
      if (view === "academics" && setAcademicsSubView) setAcademicsSubView(subView as AcademicsSubView);
      if (view !== "about" && view !== "admissions") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else if (typeof window !== "undefined") {
      const sectionIdMap: Record<string, string> = {
        "who-we-are": "about-story",
        "principal": "principal-message",
        "vision-mission": "vision-mission",
        "management": "management-board",
        "faculty": "academic-faculty",
        "overview": "admissions-view-container",
        "process": "admissions-process",
        "registration-form": "admissions-registration",
        "scholarships": "admissions-scholarships",
        "curriculum": "curriculum",
        "timings": "timings",
        "calendar": "calendar",
      };
      const targetPath = `/${view}`;
      const targetId = sectionIdMap[subView] || subView;

      if (window.location.pathname !== targetPath) {
        window.location.href = `${targetPath}#${targetId}`;
      } else {
        const el = document.getElementById(targetId);
        if (el) {
          const HEADER_HEIGHT = 120;
          const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About IFS Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            
            <div className="flex flex-col">
              <h3 className="font-serif text-base font-bold text-white tracking-tight leading-none mb-0.5">
                ISRA FOUNDATION
              </h3>
              <span className="text-[9px] tracking-[0.2em] uppercase font-semibold text-primary">
                Schools & Academies
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-300 leading-relaxed text-justify ">
            Founded in 2016 by the Isra Islamic Foundation, bridging world-class academic excellence with deep-rooted moral and ethical principles.
          </p>
          <div className="flex items-center gap-3 pt-4">
            <a
              href="https://facebook.com/IsraFoundationSchools"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-slate-700 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/IsraFoundationSchools"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-slate-700 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com/c/IsraFoundationSchools"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-gray-300 hover:text-primary hover:bg-slate-700 transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 className="font-display font-bold text-base text-white tracking-wider uppercase mb-6 border-b-2 border-primary/40 pb-2 inline-block">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <button
                onClick={() => handleNav("home")}
                className="text-gray-300 hover:text-primary flex items-center gap-1.5 transition-colors group text-left"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                Home Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSubNav("about", "who-we-are")}
                className="text-gray-300 hover:text-primary flex items-center gap-1.5 transition-colors group text-left"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                About Our History
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSubNav("admissions", "process")}
                className="text-gray-300 hover:text-primary flex items-center gap-1.5 transition-colors group text-left"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                Admission Process
              </button>
            </li>
            <li>
              <button
                onClick={() => handleSubNav("academics", "curriculum")}
                className="text-gray-300 hover:text-primary flex items-center gap-1.5 transition-colors group text-left"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                Finland & Cambridge Curricula
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("facilities")}
                className="text-gray-300 hover:text-primary flex items-center gap-1.5 transition-colors group text-left"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                Campus Facilities
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNav("careers")}
                className="text-gray-300 hover:text-primary flex items-center gap-1.5 transition-colors group text-left"
              >
                <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
                Join Our Team (Careers)
              </button>
            </li>
          </ul>
        </div>

        {/* Accreditations & Timings Column */}
        <div>
          <h4 className="font-display font-bold text-base text-white tracking-wider uppercase mb-6 border-b-2 border-primary/40 pb-2 inline-block">
            Accreditations
          </h4>
          <div className="space-y-4">
            <div className="flex gap-3 bg-slate-900 p-3  border border-slate-800">
              <Award className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-xs text-primary">CAIE Registered</h5>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Cambridge Assessment International Education guidelines.
                </p>
              </div>
            </div>
            <div className="flex gap-3 bg-slate-900 p-3  border border-slate-800">
              <Award className="w-8 h-8 text-secondary flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-xs text-secondary">Finland Partnership</h5>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  Child-centric, inquiry-based curriculum in partnership with HEI.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-300 pl-1">
              <Clock className="w-4 h-4 text-primary" />
              <span>Office: Mon - Fri: 8:00 AM - 2:40 PM</span>
            </div>
          </div>
        </div>

        {/* Contact & Map Location Column */}
        <div className="space-y-4">
          <h4 className="font-display font-bold text-base text-white tracking-wider uppercase border-b-2 border-primary/40 pb-2 inline-block">
            Reach Us
          </h4>
          <div className="space-y-8 text-sm mt-5">
            <p className="flex items-start gap-2 text-gray-300">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="leading-snug">
                Isra Town, Hyderabad Bypass, Hyderabad, Sindh, Pakistan.
              </span>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <span>+92 317 3700049 / 022 111 111 IFS</span>
            </p>
            <p className="flex items-center gap-2 text-gray-300">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="break-all sm:break-normal">israfoundationschools@gmail.com</span>
            </p>
          </div>

          {/* Clean Google Maps Embed */}
          {/* <div className="w-full h-28  overflow-hidden border border-slate-800 relative bg-slate-900 shadow">
            <iframe
              title="Isra Foundation Schools Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.2885973795115!2d68.3971207!3d25.4118335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x394c71ef694c925d%3A0xc3cf9363a0279a29!2sIsra%20University!5e0!3m2!1sen!2spk!4v1700000000000!5m2!1sen!2spk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div> */}

        </div>
      </div>

      {/* Under Footer Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400 font-mono text-center sm:text-left">
          &copy; 2026 Isra Foundation Schools (IFS). All Rights Reserved. Built for premium education.
        </p>
        <div className="flex gap-4 text-xs text-gray-400 font-mono">
          <span>Affiliated with Isra University</span>
          {/* <span>|</span>
          <a
            href="https://wa.me/923173700049"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            WhatsApp Helpdesk
          </a> */}
        </div>
      </div>
    </footer>
  );
}
