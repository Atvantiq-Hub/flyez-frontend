'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Benefit {
  number: string;
  label: string;
  title: string;
  desc: string;
}

export default function WhyBookWithUs() {
  const benefits: Benefit[] = [
    {
      number: "01",
      label: "WHOLESALE ACQUISITION",
      title: "Consolidated Wholesale Rates",
      desc: "We bypass standard retail markups by securing contract rates directly from global airline consolidator desks, matching or beating any online offer."
    },
    {
      number: "02",
      label: "PRIORITY PROCESSING",
      title: "Frictionless Priority Booking",
      desc: "Configure your routing parameters online or call our desk; our priority booking system completes ticket reservations and seat allocations in seconds."
    },
    {
      number: "03",
      label: "CONCIERGE MANAGEMENT",
      title: "Elite Concierge Support",
      desc: "Access a dedicated 24/7 ticketing desk staffed by human flight experts to handle real-time modifications, cancellations, and premium seat setups."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#fafaf9] border-t border-b border-stone-200/50 relative overflow-hidden font-sans">
      <div className="premium-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Premium Staggered Fan Deck (stacked on mobile, fan effect from md up) */}
          <div className="lg:col-span-5 w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 md:h-[440px] lg:h-[480px] relative select-none">

            {/* Left Card - Wings / Sky */}
            <div className="w-full md:w-[30%] h-[220px] md:h-[310px] lg:h-[340px] rounded-2xl overflow-hidden border-4 border-[#fafaf9] shadow-lg md:-rotate-6 md:translate-x-8 md:mt-8 transition-all duration-500 md:hover:rotate-0 hover:scale-[1.02] md:hover:scale-105 md:hover:w-[44%] md:hover:translate-x-4 md:hover:z-20 hover:shadow-2xl group cursor-pointer shrink-0 hover:ring-4 hover:ring-brand-orange/20">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=400&auto=format&fit=crop"
                alt="Premium flight wing sunset"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Center Card - Luxury Flight Cabin Video */}
            <div className="w-full md:w-[46%] h-[260px] md:h-[350px] lg:h-[380px] rounded-3xl overflow-hidden border-4 border-[#fafaf9] shadow-2xl md:z-10 transition-all duration-500 hover:scale-[1.02] md:hover:scale-105 hover:shadow-2xl group cursor-pointer shrink-0 relative hover:ring-4 hover:ring-brand-orange/25">
              <video
                src="/videos/flight-deals-travel.mp4"
                poster="/videos/flight-deals-poster.jpg"
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Right Card - 5-Star VIP Airport Lounge */}
            <div className="w-full md:w-[30%] h-[220px] md:h-[310px] lg:h-[340px] rounded-2xl overflow-hidden border-4 border-[#fafaf9] shadow-lg md:rotate-6 md:-translate-x-8 md:mt-8 transition-all duration-500 md:hover:rotate-0 hover:scale-[1.02] md:hover:scale-105 md:hover:w-[44%] md:hover:-translate-x-4 md:hover:z-20 hover:shadow-2xl group cursor-pointer shrink-0 hover:ring-4 hover:ring-brand-orange/20">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop"
                alt="Luxury VIP transit lounge"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>

          </div>

          {/* Right Column: Editorial Value Proposition Copy & Stacked Values */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-5.5">
            {/* Value Pitch Header */}
            <div>
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block mb-2 font-ui">
                THE FLYEZ PROMISE
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-medium text-brand-primary leading-tight tracking-tight mb-2.5">
                Bespoke Airfare Solutions
              </h2>
              <p className="text-brand-text-muted text-xs sm:text-sm leading-relaxed">
                FlyEz combines direct GDS airline contracts, wholesale consolidator connections, and 24/7 human expertise to offer flight bookings at rates simply unavailable to the general public.
              </p>

              {/* Minimal inline bullet list */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3.5">
                {[
                  "PCI-DSS Secure Desk",
                  "Instant PNR Confirmations",
                  "Zero Ticketing Surcharges"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] font-bold text-brand-primary font-ui uppercase tracking-wider">
                    <Check size={12} className="text-brand-orange shrink-0" strokeWidth={3} />
                    <span className="text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Vertical List */}
            <div className="flex flex-col divide-y divide-stone-200/50 pt-1.5 border-t border-stone-200/40">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 py-3.5 first:pt-0 last:pb-0 group"
                >
                  {/* Large elegant serif index indicator */}
                  <span className="font-display italic text-xl md:text-2xl text-brand-orange/60 font-medium shrink-0 select-none w-8 md:w-10 pt-0.5">
                    {b.number}
                  </span>

                  {/* Content Area */}
                  <div className="flex-1">
                    {/* Category Details */}
                    <span className="text-[8px] font-extrabold text-slate-400 font-ui tracking-[0.18em] block mb-0.5">
                      {b.label}
                    </span>

                    {/* Headline */}
                    <h3 className="text-sm md:text-base font-display font-semibold text-brand-primary tracking-tight leading-snug">
                      {b.title}
                    </h3>

                    {/* Paragraph copy */}
                    <p className="text-brand-text-muted text-xs leading-relaxed mt-0.5">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
