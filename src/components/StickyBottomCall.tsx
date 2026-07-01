'use client';

import React, { useState, useEffect } from 'react';
import { Phone, X, Award } from 'lucide-react';

export default function StickyBottomCall() {
  const [isVisible, setIsVisible] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    // Show the bar after 1.5 seconds
    const timer = setTimeout(() => {
      setIsRendered(true);
      // Short delay to trigger slideUp transition smoothly
      setTimeout(() => setIsVisible(true), 50);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isRendered) return null;

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-[999] bg-[#070e1b]/80 backdrop-blur-xl text-white py-3 px-4 md:px-6 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] border-t border-white/10 flex items-center justify-between gap-4 transition-transform duration-500 ease-out select-none ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-7 h-7 rounded-full bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center shrink-0">
          <Phone size={12} className="text-brand-orange fill-brand-orange" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 min-w-0">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/10 border border-brand-orange/20 px-2 py-0.5 rounded w-fit flex items-center gap-1 shrink-0">
            <Award size={11} className="shrink-0" /> Special Offline Offer
          </span>
          <span className="text-xs sm:text-sm font-semibold tracking-tight text-white/90 truncate">
            Save an Extra $30 On Flight Fees! Call: <a href="tel:1800-521-4263" className="underline font-bold text-brand-orange hover:text-brand-orange-hover">1800-521-4263</a>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href="tel:1800-521-4263"
          className="bg-brand-orange hover:bg-brand-orange-hover text-white transition-colors py-1 px-3.5 rounded-md text-xs font-black shadow-md uppercase tracking-wider"
        >
          Call Now
        </a>
        <button
          onClick={() => {
            setIsVisible(false);
            // Completely unmount after transition completes
            setTimeout(() => setIsRendered(false), 500);
          }}
          className="text-white/60 hover:text-white p-1 transition-colors rounded-full hover:bg-white/10"
          aria-label="Close offer bar"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}
