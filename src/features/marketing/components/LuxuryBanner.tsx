import React from 'react';
import { Award, Compass } from 'lucide-react';

export default function LuxuryBanner() {
  return (
    <section 
      className="bg-gradient-to-r from-[#070e1b] to-[#0c1b33] py-20 relative overflow-hidden border-t border-b border-white/5"
    >
      {/* Background radial glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-radial from-brand-accent/8 to-transparent pointer-events-none"
      />

      <div className="premium-container relative z-10 flex flex-col items-center text-center">
        
        {/* Luxury Badge */}
        <div className="flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/25 py-1.5 px-4 rounded-full text-brand-orange text-xs font-bold uppercase tracking-wider mb-6">
          <Award size={14} /> Business & First Class Elite
        </div>

        {/* Content */}
        <h2 className="text-[32px] sm:text-[42px] font-extrabold font-display text-white mb-4 leading-tight max-w-[700px]">
          Experiencing the Lap of Luxury
        </h2>
        
        <p className="text-lg text-white/70 mb-9 max-w-[600px] leading-relaxed">
          A Journey Through Business Class Travel. Secure premium cabins at fraction of public prices via offline private contracts.
        </p>

        {/* Button CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="tel:1800-521-4263"
            className="py-3.5 px-8 rounded-md bg-white text-[#070e1b] font-bold text-sm shadow-[0_4px_14px_rgba(255,255,255,0.1)] flex items-center gap-2 transition-all duration-350 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.15)]"
          >
            <Compass size={16} /> Explore Elite Fares
          </a>
          
          <a
            href="tel:1800-521-4263"
            className="py-3.5 px-8 rounded-md bg-transparent text-white border-1.5 border-white/30 font-bold text-sm flex items-center transition-all duration-350 hover:border-white hover:bg-white/5"
          >
            Speak to a Specialist
          </a>
        </div>

      </div>
    </section>
  );
}
