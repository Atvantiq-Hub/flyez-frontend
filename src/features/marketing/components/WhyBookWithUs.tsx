'use client';

import React from 'react';
import { DollarSign, Zap, ShieldCheck } from 'lucide-react';

interface Benefit {
  number: string;
  label: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function WhyBookWithUs() {
  const benefits: Benefit[] = [
    {
      number: "01",
      label: "WHOLESALE ACQUISITION",
      title: "Consolidated Wholesale Rates",
      desc: "We bypass standard retail markups by securing contract rates directly from global airline consolidator desks, matching or beating any online offer.",
      icon: <DollarSign size={20} className="text-slate-800" strokeWidth={1.25} />
    },
    {
      number: "02",
      label: "PRIORITY PROCESSING",
      title: "Frictionless Priority Booking",
      desc: "Configure your routing parameters online or call our desk; our priority booking system completes ticket reservations and seat allocations in seconds.",
      icon: <Zap size={20} className="text-slate-800" strokeWidth={1.25} />
    },
    {
      number: "03",
      label: "CONCIERGE MANAGEMENT",
      title: "Elite Concierge Support",
      desc: "Access a dedicated 24/7 ticketing desk staffed by human flight experts to handle real-time modifications, cancellations, and premium seat setups.",
      icon: <ShieldCheck size={20} className="text-slate-800" strokeWidth={1.25} />
    }
  ];

  return (
    <section className="py-28 bg-[#fafaf9] border-t border-b border-stone-200/50 relative overflow-hidden font-sans">
      <div className="premium-container relative z-10">
        
        {/* Editorial Value Pitch Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] block mb-3 font-ui">
            THE FLYEZ PROMISE
          </span>
          <h2 className="text-4xl sm:text-5xl font-display font-medium text-brand-primary tracking-tight leading-[1.15] mb-5">
            Bespoke Airfare Solutions
          </h2>
          <p className="text-brand-text-muted text-base leading-relaxed max-w-2xl">
            FlyEz combines direct GDS airline contracts, wholesale consolidator connections, and 24/7 human expertise to offer flight bookings at rates simply unavailable to the general public.
          </p>
        </div>

        {/* Premium Horizontal 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {benefits.map((b, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-4.5 pt-8 md:pt-0 border-t md:border-t-0 md:border-r border-stone-200/50 last:border-0 md:pr-10 lg:pr-12 last:pr-0 group"
            >
              {/* Minimal Single-Color Thin Icon */}
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[3deg]">
                {b.icon}
              </div>

              {/* Sub-label indicators */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold text-brand-orange font-ui tracking-wider">{b.number}</span>
                <span className="text-stone-300">/</span>
                <span className="text-[9px] font-extrabold text-slate-400 font-ui tracking-[0.2em]">{b.label}</span>
              </div>

              {/* Serif Headline */}
              <h3 className="text-xl font-display font-semibold text-brand-primary tracking-tight mt-1 leading-snug">
                {b.title}
              </h3>

              {/* Description */}
              <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed">
                {b.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
