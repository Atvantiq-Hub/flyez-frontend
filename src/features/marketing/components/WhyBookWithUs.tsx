'use client';

import React from 'react';
import { DollarSign, Zap, ShieldCheck, CheckCircle } from 'lucide-react';

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
      icon: <DollarSign size={18} className="text-brand-primary" strokeWidth={1.5} />
    },
    {
      number: "02",
      label: "PRIORITY PROCESSING",
      title: "Frictionless Priority Booking",
      desc: "Configure your routing parameters online or call our desk; our priority booking system completes ticket reservations and seat allocations in seconds.",
      icon: <Zap size={18} className="text-brand-primary" strokeWidth={1.5} />
    },
    {
      number: "03",
      label: "CONCIERGE MANAGEMENT",
      title: "Elite Concierge Support",
      desc: "Access a dedicated 24/7 ticketing desk staffed by human flight experts to handle real-time modifications, cancellations, and premium seat setups.",
      icon: <ShieldCheck size={18} className="text-brand-primary" strokeWidth={1.5} />
    }
  ];

  return (
    <section className="py-24 bg-[#fafaf9] border-t border-b border-stone-200/50 relative overflow-hidden font-sans">
      <div className="premium-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Rich Editorial Value Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] block mb-3 font-ui">
                THE FLYEZ PROMISE
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-medium text-brand-primary leading-[1.15] tracking-tight mb-4">
                Smart Flight <br/>Desk Solutions
              </h2>
              <p className="text-brand-text-muted text-base leading-relaxed mt-2.5">
                FlyEz combines direct GDS airline contracts, wholesale consolidator connections, and 24/7 human expertise to offer flight bookings at rates simply unavailable to the general public.
              </p>
            </div>

            {/* Micro checklist indicators */}
            <div className="flex flex-col gap-3.5 border-t border-stone-200/55 pt-8">
              {[
                "100% Secure PCI-DSS GDS bookings",
                "Instant PNR ticket confirmations",
                "Zero hidden ticketing or seat fees"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm font-bold text-brand-primary">
                  <CheckCircle size={16} className="text-brand-orange shrink-0" />
                  <span className="font-ui font-semibold">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Borderless Vertical List */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-stone-200/50">
            {benefits.map((b, idx) => (
              <div
                key={idx}
                className="flex items-start gap-5 py-6.5 first:pt-0 last:pb-0 group"
              >
                {/* Subtle, refined single-color icon inside round-square box */}
                <div className="w-9 h-9 rounded-xl bg-stone-100 flex items-center justify-center text-slate-800 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[3deg]">
                  {b.icon}
                </div>

                {/* Content Area */}
                <div className="flex-1">
                  {/* Category Details */}
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-brand-orange font-ui tracking-wider">{b.number}</span>
                    <span className="text-stone-300 text-xs font-light">/</span>
                    <span className="text-[9px] font-extrabold text-slate-400 font-ui tracking-[0.15em]">{b.label}</span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg font-display font-semibold text-brand-primary tracking-tight mt-1 leading-snug">
                    {b.title}
                  </h3>

                  {/* Paragraph copy */}
                  <p className="text-brand-text-muted text-xs md:text-sm leading-relaxed mt-1.5">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
