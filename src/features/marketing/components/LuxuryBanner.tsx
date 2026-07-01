import React from 'react';
import { Award, Compass } from 'lucide-react';

export default function LuxuryBanner() {
  return (
    <section 
      className="bg-[#fafaf9] py-6 sm:py-7 relative overflow-hidden border-t border-b border-stone-200/50"
    >
      <div className="premium-container relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        
        {/* Left Side: Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[680px]">
          {/* Luxury Badge */}
          <div className="flex items-center gap-1.5 bg-brand-orange/10 border border-brand-orange/20 py-0.5 px-3 rounded-full text-brand-orange text-[10.5px] font-bold uppercase tracking-wider mb-2.5 w-fit font-ui">
            <Award size={11} /> Business & First Class Elite
          </div>

          {/* Title & Desc */}
          <h2 className="text-[20px] sm:text-[23px] lg:text-[25px] font-semibold font-display text-brand-primary mb-1.5 leading-tight">
            Experiencing the Lap of Luxury
          </h2>
          <p className="text-xs sm:text-sm text-brand-text-muted leading-relaxed font-sans">
            A Journey Through Business Class Travel. Secure premium cabins at a fraction of public prices via offline private contracts.
          </p>
        </div>

        {/* Right Side: Button CTAs */}
        <div className="flex flex-wrap gap-2.5 justify-center lg:justify-end shrink-0">
          <a
            href="tel:1800-521-4263"
            className="py-2 px-4 rounded-xl bg-brand-primary text-white font-bold text-xs sm:text-sm shadow-[0_4px_12px_rgba(7,14,27,0.12)] flex items-center gap-1.5 transition-all duration-300 hover:bg-brand-primary/95 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Compass size={13} /> Explore Elite Fares
          </a>
          
          <a
            href="tel:1800-521-4263"
            className="py-2 px-4 rounded-xl bg-transparent text-slate-700 border border-slate-300 hover:border-slate-450 hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center transition-all duration-300 active:scale-95"
          >
            Speak to a Specialist
          </a>
        </div>

      </div>
    </section>
  );
}
