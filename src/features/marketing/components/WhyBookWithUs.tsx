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
          
          {/* Left Column: High-End Single Media Frame */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(7,14,27,0.08)] border border-stone-200/60 z-10 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=800&auto=format&fit=crop"
                alt="Luxury aircraft passenger cabin suite"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Editorial Value Proposition Copy & Stacked Values */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-8">
            {/* Value Pitch Header */}
            <div>
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block mb-2.5 font-ui">
                THE FLYEZ PROMISE
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-medium text-brand-primary leading-tight tracking-tight mb-4">
                Bespoke Airfare Solutions
              </h2>
              <p className="text-brand-text-muted text-sm md:text-base leading-relaxed">
                FlyEz combines direct GDS airline contracts, wholesale consolidator connections, and 24/7 human expertise to offer flight bookings at rates simply unavailable to the general public.
              </p>

              {/* Minimal inline bullet list */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5">
                {[
                  "PCI-DSS Secure Desk",
                  "Instant PNR Confirmations",
                  "Zero Ticketing Surcharges"
                ].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-brand-primary font-ui uppercase tracking-wider">
                    <Check size={13} className="text-brand-orange shrink-0" strokeWidth={3} />
                    <span className="text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Vertical List */}
            <div className="flex flex-col divide-y divide-stone-200/50 pt-2 border-t border-stone-200/40">
              {benefits.map((b, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-5 py-5 first:pt-0 last:pb-0 group"
                >
                  {/* Large elegant serif index indicator */}
                  <span className="font-display italic text-2xl md:text-3xl text-brand-orange/60 font-medium shrink-0 select-none w-10 md:w-12 pt-0.5">
                    {b.number}
                  </span>

                  {/* Content Area */}
                  <div className="flex-1">
                    {/* Category Details */}
                    <span className="text-[9px] font-extrabold text-slate-400 font-ui tracking-[0.18em] block mb-1">
                      {b.label}
                    </span>

                    {/* Headline */}
                    <h3 className="text-base md:text-lg font-display font-semibold text-brand-primary tracking-tight leading-snug">
                      {b.title}
                    </h3>

                    {/* Paragraph copy */}
                    <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed mt-1">
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
