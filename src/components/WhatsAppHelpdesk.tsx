import React from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppHelpdesk() {
  return (
    <a
      href="https://wa.me/923173700049?text=Assalam-o-Alaikum%20Isra%20Foundation%20Schools,%20I%20would%20like%20to%20inquire%20about%20admissions."
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-[999] bg-[#25D366] hover:bg-[#20ba5a] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white cursor-pointer group"
      aria-label="Contact IFS via WhatsApp"
      id="whatsapp-floating-helpdesk"
    >
      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
      <span className="absolute right-14 sm:right-16 bg-slate-900 text-[#25D366] text-[10px] font-bold px-2 py-1 rounded shadow-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-mono hidden sm:block">
        WhatsApp Helpdesk
      </span>
    </a>
  );
}
