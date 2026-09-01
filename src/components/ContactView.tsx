/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import { InquiryFormData } from "../types";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
  MessageCircle,
  Navigation,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Real school contact details                                       */
/* ------------------------------------------------------------------ */
const CONTACT = {
  address: "Isra Town, Hyderabad Bypass, Hyderabad, Sindh, Pakistan",
  phones: ["+92 317 3700049", "022 111 111 IFS (437)"],
  whatsapp: "+92 317 3700049",
  email: "israfoundationschools@gmail.com",
  hours: "Monday to Friday: 8:00 AM – 2:40 PM",
  mapsLink: "https://maps.app.goo.gl/4ed81vuzEEYcuEwj7?g_st=ipc",
  social: {
    facebook: "facebook.com/IsraFoundationSchools",
    instagram: "instagram.com/IsraFoundationSchools",
    youtube: "youtube.com/c/IsraFoundationSchools",
  },
};

/* ------------------------------------------------------------------ */
/*  Decorative dot grid — echoes the reference design's corner motif  */
/* ------------------------------------------------------------------ */
function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none ${className}`}
      style={{
        width: 120,
        height: 120,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.35) 1.5px, transparent 1.5px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Motion variants                                                    */
/* ------------------------------------------------------------------ */
const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const INFO_CARDS = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [CONTACT.address],
  },
  {
    icon: Phone,
    title: "Call / WhatsApp",
    lines: [...CONTACT.phones, `WhatsApp: ${CONTACT.whatsapp}`],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: [CONTACT.email],
  },
  {
    icon: Clock,
    title: "Office Hours",
    lines: [CONTACT.hours],
  },
];

export default function ContactView() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<InquiryFormData>({
    name: "",
    email: "",
    phone: "",
    grade: "Pre-Nursery",
    message: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-white text-slate-900 font-sans" id="contact-view-container" >
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative w-full overflow-hidden flex items-center min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80')",
          }}
        />

        {/* Background Image Over-Layer */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, #020816 0%, rgba(2,8,22,0.88) 20%, rgba(2,8,22,0.55) 48%, rgba(2,8,22,0.7) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(2,8,22,0.15) 0%, rgba(2,8,22,0.35) 100%)" }}
        />


        <DotGrid className="absolute top-8 left-6 hidden sm:block" />
        <DotGrid className="absolute -bottom-4 right-6 hidden lg:block opacity-60" />

        <div className="relative z-10 w-full px-6 py-12 sm:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl space-y-6"
          >
            {/* Breadcrumb */}
            {/* <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest">
              <span className="text-[#60BADC]">Home</span>
              <span className="text-white/40">/</span>
              <span className="text-white">Contact Us</span>
            </div> */}

            <h1 className="font-sans font-black text-white text-4xl sm:text-6xl tracking-tight leading-[1.02]">
              Get In <span className="text-[#F5C330]">Touch</span>
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-lg text-justify">
              We're here to help and answer any question about admissions, campuses, or campus
              life. Our team looks forward to hearing from you.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Send Message Button: Yellow se Black fill hoga */}
              <a
                href="#inquiry-form-col"
                className="group relative inline-flex items-center gap-2 bg-[#F5C330] text-[#04080c] font-bold text-xs uppercase tracking-widest px-6 py-3.5 overflow-hidden transition-colors duration-300 hover:text-white"
              >
                {/* Left-to-right filling layer */}
                <span className="absolute inset-0 w-0 bg-[#60badc] transition-all duration-500 ease-out group-hover:w-full" />

                {/* Content layered above the background fill */}
                <span className="relative z-10 flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>

              {/* Call Us Now Button: Border/Transparent se White fill hoga */}
              <a
                href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
                className="group relative inline-flex items-center gap-2 border border-white/25 text-white font-bold text-xs uppercase tracking-widest px-6 py-3.5 overflow-hidden transition-colors duration-300 hover:text-[#04080c]"
              >
                {/* Left-to-right filling layer */}
                <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />

                {/* Content layered above the background fill */}
                <span className="relative z-10 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#60BADC] transition-colors duration-300 group-hover:text-[#04080c]" />
                  Call Us Now
                </span>
              </a>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ============================================================
          INFO CARDS + FORM
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-20 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12" id="contact-grid">
          {/* ── Left: heading + info cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-8"
            id="contact-info-col"
          >
            <div className="space-y-4">
              <span className="inline-block font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#60badc] bg-[#60badc]/10 px-3 py-1.5">
                Contact Information
              </span>
              <h2 className="font-sans font-black text-[#020816] text-3xl sm:text-4xl tracking-tight leading-[1.1]">
                Let's Start a <span className="text-[#60BADC]">Conversation</span>
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-md">
                Our admissions desk is ready to assist with any questions about enrollment,
                fees, or a campus visit.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="space-y-4"
            >
              {INFO_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="group flex items-start gap-4 bg-white border border-slate-100 hover:border-[#F5C330] shadow-sm hover:shadow-lg p-5 transition-all duration-300"
                >
                  <div className="w-11 h-11 flex-shrink-0 bg-[#020816] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#F5C330]">
                    <card.icon className="w-5 h-5 text-[#F5C330] transition-colors duration-300 group-hover:text-[#020816]" />
                  </div>
                  <div className="space-y-1 pt-0.5">
                    <h5 className="font-sans font-extrabold text-[#020816] text-sm uppercase tracking-wide">
                      {card.title}
                    </h5>
                    {card.lines.map((line) => (
                      <p key={line} className="text-slate-500 text-xs sm:text-[13px] leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: inquiry form ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-white border border-slate-100 shadow-lg p-8 sm:p-10 h-fit relative overflow-hidden"
            id="inquiry-form-col"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#F5C330]" />

            <h3 className="font-sans font-black text-[#020816] text-2xl sm:text-3xl tracking-tight mb-2">
              Send Us a <span className="text-[#F5C330]">Message</span>
            </h3>
            <p className="text-slate-500 text-sm mb-8">
              Fill out the form below and our admissions team will get back to you shortly.
            </p>

            {isSubmitted ? (
              <div className="text-center py-14 space-y-4">
                <div className="w-16 h-16 bg-[#020816] text-[#F5C330] flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="font-sans font-extrabold text-xl text-[#020816]">
                  Inquiry Submitted!
                </h4>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you for your interest, <strong className="text-slate-700">{formData.name}</strong>.
                  Our team has received your questions about{" "}
                  <strong className="text-slate-700">{formData.grade}</strong> and will contact you
                  at <strong className="text-slate-700">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: "", email: "", phone: "", grade: "Pre-Nursery", message: "" });
                  }}
                  className="mt-4 bg-[#020816] hover:bg-[#0f172b] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest cursor-pointer transition-colors"
                >
                  Submit New Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full text-sm bg-slate-50 border border-slate-200 p-3.5 focus:border-[#60BADC] focus:outline-none focus:bg-white transition-colors text-slate-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full text-sm bg-slate-50 border border-slate-200 p-3.5 focus:border-[#60BADC] focus:outline-none focus:bg-white transition-colors text-slate-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +92 3XX XXXXXXX"
                      className="w-full text-sm bg-slate-50 border border-slate-200 p-3.5 focus:border-[#60BADC] focus:outline-none focus:bg-white transition-colors text-slate-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Class of Interest *
                    </label>
                    <select
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full text-sm bg-slate-50 border border-slate-200 p-3.5 focus:border-[#60BADC] focus:outline-none focus:bg-white transition-colors text-slate-900"
                    >
                      <option value="Pre-Nursery">Pre-Nursery</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Kindergarten">Kindergarten</option>
                      <option value="Grades 1-5">Grades 1 - 5</option>
                      <option value="Grades 6-8">Grades 6 - 8</option>
                      <option value="O Levels">Cambridge O Levels</option>
                      <option value="A Levels">Cambridge A Levels</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your questions about fees, classes, or timing..."
                    className="w-full text-sm bg-slate-50 border border-slate-200 p-3.5 focus:border-[#60BADC] focus:outline-none focus:bg-white transition-colors resize-none text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="group relative w-full bg-[#020816] text-[#F5C330] py-4 text-xs font-bold uppercase tracking-widest transition-colors duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 overflow-hidden hover:text-[#020816]"
                >
                  {/* Left-to-right yellow filling layer */}
                  <span className="absolute inset-0 w-0 bg-[#F5C330] transition-all duration-500 ease-out group-hover:w-full" />

                  {/* Content layered above the background fill */}
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Academic Inquiry
                  </span>
                </button>

              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          MAP
      ============================================================ */}
      {/* ============================================================
          MAP
      ============================================================ */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-20 sm:pb-24" id="contact-map-col">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative w-full h-[420px] sm:h-[480px] overflow-hidden shadow-lg"
        >
          <iframe
            title="IFS Campus Map"
            src="https://www.google.com/maps?q=Isra+Foundation+Schools,25.4522,68.373942&hl=en&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(30%)" }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#020816]/20 via-transparent to-transparent" />

          {/* Overlay card, top-left, matching reference layout */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 bg-white shadow-xl p-6 sm:p-7 w-[86%] sm:w-[320px] space-y-4">
            <div className="w-11 h-11 bg-[#020816] flex items-center justify-center">
              <MapPin className="w-5 h-5 text-[#F5C330]" />
            </div>
            <div>
              <h3 className="font-sans font-black text-[#020816] text-xl tracking-tight">
                Find Us <span className="text-[#60BADC]">Here</span>
              </h3>
              <div className="h-1 w-10 bg-[#F5C330] mt-2 mb-3" />
              <p className="text-slate-500 text-xs leading-relaxed">
                Visit our campus or reach us through any of our channels below.
              </p>
            </div>

            <a
              href={CONTACT.mapsLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-[#020816] hover:text-[#60BADC] transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              Get Directions
            </a>

            <div className="flex items-center gap-2.5 pt-1">
              <a
                href={`https://${CONTACT.social.facebook}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center bg-[#020816] text-white hover:bg-[#F5C330] hover:text-[#020816] transition-colors duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://${CONTACT.social.instagram}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center bg-[#020816] text-white hover:bg-[#F5C330] hover:text-[#020816] transition-colors duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://${CONTACT.social.youtube}`}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center bg-[#020816] text-white hover:bg-[#F5C330] hover:text-[#020816] transition-colors duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 flex items-center justify-center bg-[#020816] text-white hover:bg-[#F5C330] hover:text-[#020816] transition-colors duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ============================================================
          BOTTOM CTA BANNER
      ============================================================ */}
      <section className="relative bg-[#020816] overflow-hidden h-70">
        <DotGrid className="absolute top-6 left-6 hidden sm:block opacity-70" />
        <DotGrid className="absolute -bottom-6 right-10 hidden lg:block opacity-40" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 mt-8">
            <div className="space-y-3 max-w-lg">
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#60BADC]">
                Let's Connect
              </span>
              <h2 className="font-sans font-black text-white text-3xl sm:text-4xl tracking-tight leading-[1.1]">
                We'd Love to Hear <span className="text-[#F5C330]">From You!</span>
              </h2>
            </div>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed max-w-md ">
              Have questions about joining us? Reach out now and let our admissions experts help you take the first step.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
              {/* Custom slow/smooth click function added here */}
              <a
                href="#inquiry-form-col"
                onClick={(e) => {
                  e.preventDefault(); // Default fast jump ko rokne ke liye
                  const target = document.getElementById("inquiry-form-col");
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth", // Slow aur smooth scrolling ke liye
                      block: "start",
                    });
                  }
                }}
                className="group inline-flex items-center justify-center gap-2 bg-[#F5C330] text-[#020816] font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-transform duration-300 hover:scale-105"
              >
                JOIN
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}