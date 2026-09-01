/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MainView, AboutSubView, AdmissionsSubView, AcademicsSubView } from "../types";
import { Menu, X, ChevronDown, GraduationCap, Phone, Info, Calendar, Compass, ShieldCheck } from "lucide-react";

interface HeaderProps {
  currentView?: MainView;
  currentPath?: string;
  setView?: (view: MainView) => void;
  setAboutSubView?: (sub: AboutSubView) => void;
  setAdmissionsSubView?: (sub: AdmissionsSubView) => void;
  setAcademicsSubView?: (sub: AcademicsSubView) => void;
}

type DropdownKey = "about" | "admissions" | "academics" | null;

const getViewFromPath = (path: string): MainView => {
  if (!path || path === "/") return "home";
  const clean = path.replace(/\/$/, "") || "/";
  if (clean === "/") return "home";
  const segment = clean.replace(/^\//, "").split("/")[0].toLowerCase();
  const validViews: MainView[] = [
    "home",
    "about",
    "admissions",
    "academics",
    "facilities",
    "activities",
    "news-events",
    "gallery",
    "careers",
    "contact",
    "lms-portal",
  ];
  return validViews.includes(segment as MainView) ? (segment as MainView) : "home";
};

export default function Header({
  currentView,
  currentPath,
  setView,
  setAboutSubView,
  setAdmissionsSubView,
  setAcademicsSubView,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey>(null);
  const [isMounted, setIsMounted] = useState(false); // controls animation classes separately from content swap

  // Timers: one to delay opening (avoids accidental trigger while passing over nav),
  // one to delay closing (gives time to move mouse into the panel)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Compute active view based on props (SSR/Astro) with client-side fallback
  const initialView =
    currentView ||
    (currentPath ? getViewFromPath(currentPath) : undefined) ||
    (typeof window !== "undefined" ? getViewFromPath(window.location.pathname) : "home");

  const [activeView, setActiveView] = useState<MainView>(initialView);

  // Sync state when props or browser location change
  useEffect(() => {
    if (currentView) {
      setActiveView(currentView);
    } else if (currentPath) {
      setActiveView(getViewFromPath(currentPath));
    } else if (typeof window !== "undefined") {
      setActiveView(getViewFromPath(window.location.pathname));
    }
  }, [currentView, currentPath]);

  const openDropdown = (key: DropdownKey) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);

    openTimer.current = setTimeout(() => {
      setActiveDropdown(key);
      // Let the panel mount with content first, then flip animation classes on next frame
      requestAnimationFrame(() => setIsMounted(true));
    }, 150);
  };

  const closeDropdownDelayed = () => {
    if (openTimer.current) clearTimeout(openTimer.current);

    closeTimer.current = setTimeout(() => {
      setIsMounted(false);
      // Wait for the exit animation to finish before clearing content
      setTimeout(() => setActiveDropdown(null), 250);
    }, 250);
  };

  const handleNav = (view: MainView) => {
    if (setView) {
      setView(view);
      setActiveView(view);
    } else if (typeof window !== "undefined") {
      const targetPath = view === "home" ? "/" : `/${view}`;
      if (window.location.pathname !== targetPath) {
        window.location.href = targetPath;
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
    setIsMounted(false);
    setActiveDropdown(null);
  };

  const handleSubNav = (
    view: "about" | "admissions" | "academics",
    subView: string
  ) => {
    if (setView) {
      setView(view);
      setActiveView(view);
      if (view === "about" && setAboutSubView) setAboutSubView(subView as AboutSubView);
      if (view === "admissions" && setAdmissionsSubView) setAdmissionsSubView(subView as AdmissionsSubView);
      if (view === "academics" && setAcademicsSubView) setAcademicsSubView(subView as AcademicsSubView);
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

    setMobileMenuOpen(false);
    setIsMounted(false);
    setActiveDropdown(null);
  };

  const isOpen = activeDropdown !== null && isMounted;

  // Shared classes for top-level nav buttons
  // NOTE: tightened horizontal padding + font-size at the xl breakpoint so 11 nav
  // items + logo comfortably fit between 1280px-1535px without wrapping/cutting off.
  const navLinkBase =
    "relative px-1.5 xl:px-2 2xl:px-2.5 py-2 text-[11.7px] xl:text-sm font-semibold whitespace-nowrap transition-colors duration-300 ease-out";
  const navLinkColor = (view: MainView) =>
    activeView === view
      ? "text-primary-dark font-bold"
      : "text-slate-800 hover:text-primary-dark";

  // Animated underline span: grows from 0 to full width on hover, stays full when active
  const Underline = ({ active }: { active: boolean }) => (
    <span
      className={`absolute left-0 -bottom-0.5 h-0.5 bg-primary transition-all duration-300 ease-out ${active ? "w-full" : "w-0 group-hover:w-full"
        }`}
    />
  );

  // Submenu item: same underline-hover language as top nav, plus a staggered fade/slide entrance
  const SubNavItem = ({
    label,
    onClick,
    delay = 0,
    emphasize = false,
  }: {
    label: string;
    onClick: () => void;
    delay?: number;
    emphasize?: boolean;
  }) => (
    <button
      onClick={onClick}
      style={{ transitionDelay: isOpen ? `${delay}ms` : "0ms" }}
      className={`group relative text-left px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out ${emphasize ? "text-primary-dark font-semibold" : "text-slate-700"
        } hover:text-primary-dark ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1.5"
        }`}
    >
      {label}
      <span className="absolute left-4 bottom-1 h-0.5 bg-primary transition-all duration-300 ease-out w-0 group-hover:w-[calc(100%-2rem)]" />
    </button>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-100">
      {/* Top Banner Bar */}
      <div className="bg-slate-950 text-white text-[9.9px] sm:text-xs py-1.5 sm:py-2 px-3 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start">
          <span className="flex items-center gap-1 text-gray-300 whitespace-nowrap">
            <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary flex-shrink-0" />
            +92 317 3700049 / 022 111 111 IFS
          </span>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="hidden md:inline text-primary whitespace-nowrap">
            <marquee scrollamount="3">Admissions Open 2026-2027</marquee>
          </span>
        </div>

        {/* Main Parent Container jo dono blocks ko sath layega */}
        {/* Moved from lg: to xl: so it only appears once there's enough room
            alongside the phone number + marquee (matches nav breakpoint below) */}
        <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
          {/* 1. Affiliations Block */}
          <div className="flex items-center gap-2">
            <span className="text-gray-300 font-medium whitespace-nowrap">Affiliations:</span>
            <span className="bg-primary/20 text-primary px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider whitespace-nowrap">
              Cambridge (CAIE)
            </span>
            <span className="bg-secondary/20 text-secondary px-2 py-0.5 text-[9px] uppercase font-bold tracking-wider whitespace-nowrap">
              Finland HEI
            </span>
          </div>

          {/* 2. LMS Portal Highlight Action Button */}
          <button
            onClick={() => window.open("https://moodle26.ifs.edu.pk/", "_blank")}
            className="flex items-center gap-1.5 bg-slate-900 text-primary hover:bg-primary/20 border-2 border-primary/40 px-3 py-1.5 text-xs font-semibold transition-all duration-300 shadow hover:shadow-md cursor-pointer select-none whitespace-nowrap"
          >
            <GraduationCap className="w-4 h-4 text-primary flex-shrink-0" />
            Student LMS Portal
          </button>
        </div>
      </div>

      {/* Main Header Row */}
      <div
        className="max-w-[1536px] w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-20 flex items-center justify-between"
        id="main-header-row"
      >
        {/* Logo and Crest Section */}
        <div
          onClick={() => handleNav("home")}
          className="flex items-center gap-3 cursor-pointer select-none group flex-shrink-0"
          id="school-logo-container"
        >
          <img
            src="/assets/images/logo.png"
            alt="School Logo"
            className="logo w-12 h-12 xl:w-15 xl:h-15 object-contain transition-transform duration-300 group-hover:scale-105"
            id="school-logo-img"
          />
          <div className="flex flex-col">
            <h1 className="font-serif text-base xl:text-xl font-bold tracking-tight text-slate-900 transition-colors leading-none mb-0.5 whitespace-nowrap">
              ISRA FOUNDATION
            </h1>
            <span className="text-[7.2px] xl:text-[8.1px] tracking-[0.2em] uppercase font-semibold text-black whitespace-nowrap">
              Schools & Academies
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        {/* Switched from lg:flex to xl:flex — 11 nav items don't fit at 1024px,
            so we now show the hamburger menu all the way up to 1279px */}
        <nav
          className="hidden xl:flex flex-1 items-center justify-end gap-0 2xl:gap-1 ml-6 2xl:ml-12 mr-4"
          id="desktop-navigation-menu"
        >
          {/* Home Link */}
          <button
            onClick={() => handleNav("home")}
            className={`group ${navLinkBase} ${navLinkColor("home")}`}
          >
            Home
            <Underline active={activeView === "home"} />
          </button>

          {/* About Us Trigger */}
          <button
            onMouseEnter={() => openDropdown("about")}
            onMouseLeave={closeDropdownDelayed}
            onClick={() => handleNav("about")}
            className={`group ${navLinkBase} ${navLinkColor("about")} flex items-center gap-1`}
          >
            About Us
            <ChevronDown className="w-4 h-4" />
            <Underline active={activeView === "about"} />
          </button>

          {/* Admissions Trigger */}
          <button
            onMouseEnter={() => openDropdown("admissions")}
            onMouseLeave={closeDropdownDelayed}
            onClick={() => {
              handleNav("admissions");
              if (setAdmissionsSubView) setAdmissionsSubView("overview");
            }}
            className={`group ${navLinkBase} ${navLinkColor("admissions")} flex items-center gap-1`}
          >
            Admissions
            <ChevronDown className="w-4 h-4" />
            <Underline active={activeView === "admissions"} />
          </button>

          {/* Academics Trigger */}
          <button
            onMouseEnter={() => openDropdown("academics")}
            onMouseLeave={closeDropdownDelayed}
            onClick={() => handleNav("academics")}
            className={`group ${navLinkBase} ${navLinkColor("academics")} flex items-center gap-1`}
          >
            Academics
            <ChevronDown className="w-4 h-4" />
            <Underline active={activeView === "academics"} />
          </button>

          {/* Facilities Link */}
          <button
            onClick={() => handleNav("facilities")}
            className={`group ${navLinkBase} ${navLinkColor("facilities")}`}
          >
            Facilities
            <Underline active={activeView === "facilities"} />
          </button>

          {/* ACTIVITIES (Activities) */}
          <button
            onClick={() => handleNav("activities")}
            className={`group ${navLinkBase} ${navLinkColor("activities")}`}
          >
            Activities
            <Underline active={activeView === "activities"} />
          </button>

          {/* News & Events Link */}
          <button
            onClick={() => handleNav("news-events")}
            className={`group ${navLinkBase} ${navLinkColor("news-events")}`}
          >
            News & Events
            <Underline active={activeView === "news-events"} />
          </button>

          {/* Gallery Link */}
          <button
            onClick={() => handleNav("gallery")}
            className={`group ${navLinkBase} ${navLinkColor("gallery")}`}
          >
            Gallery
            <Underline active={activeView === "gallery"} />
          </button>

          {/* Policies Link */}
          <button
            onClick={() => handleNav("gallery")}
            className={`group ${navLinkBase} ${navLinkColor("gallery")}`}
          >
            Policies
            <Underline active={activeView === "gallery"} />
          </button>

          {/* Careers Link */}
          <button
            onClick={() => handleNav("careers")}
            className={`group ${navLinkBase} ${navLinkColor("careers")}`}
          >
            Careers
            <Underline active={activeView === "careers"} />
          </button>

          {/* Contact Link */}
          <button
            onClick={() => handleNav("contact")}
            className={`group ${navLinkBase} ${navLinkColor("contact")}`}
          >
            Contact
            <Underline active={activeView === "contact"} />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        {/* Now shows up to 1279px (xl:hidden instead of lg:hidden) to match nav switch */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-slate-800 hover:bg-slate-50 border border-gray-100 transition-colors duration-300"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Width Mega Dropdown Panel (spans entire navbar width, opens below header) */}
      {activeDropdown && (
        <div
          onMouseEnter={() => {
            if (closeTimer.current) clearTimeout(closeTimer.current);
            if (openTimer.current) clearTimeout(openTimer.current);
          }}
          onMouseLeave={closeDropdownDelayed}
          className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t border-b border-gray-100 transition-all duration-300 ease-out origin-top ${isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          id="mega-dropdown-panel"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6">
            {/* ABOUT DROPDOWN */}
            {activeDropdown === "about" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                <div className="md:col-span-1 border-r border-gray-100 pr-6">
                  <div className="flex items-center gap-2 text-primary-dark font-bold text-sm mb-2">
                    <Info className="w-4 h-4" />
                    About IFS
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    Committed to nurturing globally competitive, value-driven leaders through our dual-curriculum framework.
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <SubNavItem label="Who We Are (Our Story)" onClick={() => handleSubNav("about", "who-we-are")} delay={40} />
                  <SubNavItem label="Principal's Message" onClick={() => handleSubNav("about", "principal")} delay={80} />
                  <SubNavItem label="Vision & Mission" onClick={() => handleSubNav("about", "vision-mission")} delay={120} />
                  <SubNavItem label="Executive Management" onClick={() => handleSubNav("about", "management")} delay={160} />
                  <SubNavItem label="Faculty & Academic Staff" onClick={() => handleSubNav("about", "faculty")} delay={200} />
                  {/*<SubNavItem label="Campus Virtual Tour" onClick={() => handleNav("facilities")} delay={240} emphasize />*/}
                </div>
              </div>
            )}

            {/* ADMISSIONS DROPDOWN */}
            {activeDropdown === "admissions" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                <div className="md:col-span-1 border-r border-gray-100 pr-6">
                  <div className="flex items-center gap-2 text-primary-dark font-bold text-sm mb-2">
                    <GraduationCap className="w-4 h-4" />
                    Admissions 2026-27
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    Now accepting applications from Early Childhood through Cambridge A-Levels.
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/*<SubNavItem label="Admissions Overview" onClick={() => handleSubNav("admissions", "overview")} delay={40} />*/}
                  <SubNavItem label="Admission Process (Step-by-Step)" onClick={() => handleSubNav("admissions", "process")} delay={80} />
                  <SubNavItem label="Online Registration Form" onClick={() => handleSubNav("admissions", "registration-form")} delay={120} />
                  <SubNavItem label="Scholarships & Financial Aid" onClick={() => handleSubNav("admissions", "scholarships")} delay={160} />
                  {/*<SubNavItem label="Fee Structure & Guidelines" onClick={() => handleSubNav("admissions", "process")} delay={200} />*/}
                  <SubNavItem label="Contact Admissions Team" onClick={() => handleNav("contact")} delay={240} />
                </div>
              </div>
            )}

            {/* ACADEMICS DROPDOWN */}
            {activeDropdown === "academics" && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                <div className="md:col-span-1 border-r border-gray-100 pr-6">
                  <div className="flex items-center gap-2 text-primary-dark font-bold text-sm mb-2">
                    <Compass className="w-4 h-4" />
                    Academic Programs
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed text-justify">
                    Dual pathway combining Finland Early Childhood rigor with Cambridge CAIE benchmarks.
                  </p>
                </div>
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <SubNavItem label="Curriculum Overview (ECD to A Levels)" onClick={() => handleSubNav("academics", "curriculum")} delay={40} />
                  <SubNavItem label="School & Office Timings" onClick={() => handleSubNav("academics", "timings")} delay={80} />
                  <SubNavItem label="Academic Calendar 2026-27" onClick={() => handleSubNav("academics", "calendar")} delay={120} />
                  <SubNavItem label="Co-curricular & Sports" onClick={() => handleNav("activities")} delay={160} />
                  <SubNavItem label="STEM & Science Labs" onClick={() => handleNav("facilities")} delay={200} />
                  {/*<SubNavItem label="Career & College Counseling" onClick={() => handleNav("careers")} delay={240} emphasize />*/}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation (Accordion Styled) */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto"
          id="mobile-drawer-menu"
        >
          {/* Home Mobile Link */}
          <button
            onClick={() => handleNav("home")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "home" ? "text-primary-dark bg-slate-50 font-bold" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            Home
          </button>

          {/* About Section */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="px-4 text-[9px] uppercase font-mono font-bold tracking-wider text-gray-400">
              About IFS
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleSubNav("about", "who-we-are")}
                className={`w-full text-left px-6 py-2 text-sm font-medium transition-colors duration-200 ${activeView === "about" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-700 hover:bg-slate-50"
                  }`}
              >
                Who We Are
              </button>
              <button
                onClick={() => handleSubNav("about", "principal")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Principal's Message
              </button>
              <button
                onClick={() => handleSubNav("about", "management")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Management Team
              </button>
              <button
                onClick={() => handleSubNav("about", "faculty")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Our Faculty & Staff
              </button>
            </div>
          </div>

          {/* Admissions Section */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="px-4 text-[9px] uppercase font-mono font-bold tracking-wider text-gray-400">
              Admissions
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleSubNav("admissions", "process")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Admissions Process
              </button>
              <button
                onClick={() => handleSubNav("admissions", "registration-form")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Online Registration
              </button>
              <button
                onClick={() => handleSubNav("admissions", "scholarships")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Scholarships & Grants
              </button>
            </div>
          </div>

          {/* Academics Section */}
          <div className="border-b border-gray-100 pb-2 mb-2">
            <span className="px-4 text-[9px] uppercase font-mono font-bold tracking-wider text-gray-400">
              Academics
            </span>
            <div className="mt-1 space-y-1">
              <button
                onClick={() => handleSubNav("academics", "curriculum")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Curriculum Overview
              </button>
              <button
                onClick={() => handleSubNav("academics", "timings")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                School Timings
              </button>
              <button
                onClick={() => handleSubNav("academics", "calendar")}
                className="w-full text-left px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-200"
              >
                Academic Calendar
              </button>
            </div>
          </div>

          {/* General Links */}
          <button
            onClick={() => handleNav("facilities")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "facilities" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            Facilities
          </button>
          <button
            onClick={() => handleNav("activities")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "activities" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            Co-curricular
          </button>
          <button
            onClick={() => handleNav("news-events")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "news-events" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            News & Events
          </button>
          <button
            onClick={() => handleNav("gallery")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "gallery" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNav("careers")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "careers" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            Careers
          </button>
          <button
            onClick={() => handleNav("contact")}
            className={`w-full text-left px-4 py-2.5 text-base font-semibold transition-colors duration-200 ${activeView === "contact" ? "text-primary-dark font-bold bg-slate-50" : "text-slate-800 hover:bg-slate-50"
              }`}
          >
            Contact
          </button>

          {/* Student Portal Mobile */}
          <div className="pt-4">
            <button
              onClick={() => window.open("https://moodle26.ifs.edu.pk/", "_blank")}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-primary hover:bg-slate-800 py-3 text-sm font-bold shadow border border-primary/40 transition-colors duration-200"
            >
              <GraduationCap className="w-5 h-5 text-primary" />
              Student LMS Portal
            </button>
          </div>
        </div>
      )}
    </header>
  );
}