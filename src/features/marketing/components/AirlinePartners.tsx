'use client';

import React from 'react';
import { Ticket, Sparkles } from 'lucide-react';

interface Airline {
  name: string;
  code: string;
  alliance: string;
  deal: string;
  color: string;
  glow: string;
}

export default function AirlinePartners() {
  const airlines: Airline[] = [
    { name: "American Airlines", code: "AA", alliance: "Oneworld Alliance", deal: "Secret Domestic Deals", color: "#0078d2", glow: "rgba(0, 120, 210, 0.2)" },
    { name: "United Airlines", code: "UA", alliance: "Star Alliance Member", deal: "Europe Direct Flights", color: "#192a56", glow: "rgba(25, 42, 86, 0.2)" },
    { name: "Delta Air Lines", code: "DL", alliance: "SkyTeam Alliance", deal: "Special Private Fares", color: "#e01933", glow: "rgba(224, 25, 51, 0.2)" },
    { name: "British Airways", code: "BA", alliance: "Oneworld Alliance", deal: "London Direct Specials", color: "#00205b", glow: "rgba(0, 32, 91, 0.2)" },
    { name: "Lufthansa", code: "LH", alliance: "Star Alliance Member", deal: "Transatlantic Deals", color: "#001f3f", glow: "rgba(0, 31, 63, 0.2)" },
    { name: "Qatar Airways", code: "QR", alliance: "Oneworld Alliance", deal: "5-Star Premium Fares", color: "#5a002c", glow: "rgba(90, 0, 44, 0.2)" },
    { name: "Emirates", code: "EK", alliance: "Global Partner", deal: "Luxury Cabin Rates", color: "#ff0000", glow: "rgba(255, 0, 0, 0.2)" },
    { name: "Singapore Airlines", code: "SQ", alliance: "Star Alliance Member", deal: "Asia Route Specials", color: "#cca353", glow: "rgba(204, 163, 83, 0.2)" }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-primary border-t border-b border-brand-border dark:border-gray-800">
      <div className="premium-container flex flex-col gap-10">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest block mb-3">
              Global Ticketing Desk
            </span>
            <h2 className="text-4xl font-display font-semibold text-brand-primary dark:text-white leading-tight">
              Global Airline Directory
            </h2>
            <p className="text-brand-text-muted dark:text-gray-400 text-base leading-relaxed mt-3 max-w-2xl">
              Direct ticketing access across Oneworld, SkyTeam, and Star Alliance networks — with private consolidator fares on the world&apos;s leading carriers.
            </p>
          </div>
          <span className="text-[11px] text-brand-orange font-bold flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/20">
            <Sparkles size={12} /> Real-time Pricing
          </span>
        </div>

        {/* Interactive Airline Cards Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {airlines.map((a, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 shadow-sm relative overflow-hidden group cursor-default min-h-[160px] transition-all duration-350 hover:-translate-y-1.5 hover:shadow-md"
            >
              {/* Glowing dynamic background airline code watermark */}
              <div className="absolute right-4 bottom-[-15px] text-[72px] font-display font-semibold text-brand-primary/[0.02] dark:text-white/[0.01] select-none pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:text-brand-primary/[0.04] dark:group-hover:text-white/[0.02]">
                {a.code}
              </div>

              {/* Geometric tail-fin abstract background graphic */}
              <div className="absolute right-0 top-0 w-24 h-full pointer-events-none select-none z-0 opacity-15 dark:opacity-10 transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-105">
                <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
                  <path d="M60 100 L85 10 L100 10 L85 100 Z" fill={a.color} />
                  <path d="M45 100 L70 30 L80 30 L60 100 Z" fill={a.color} opacity="0.5" />
                </svg>
              </div>

              {/* Top content */}
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <span
                    className="text-[10px] font-extrabold text-white px-2.5 py-0.5 rounded tracking-wide shadow-sm"
                    style={{ backgroundColor: a.color }}
                  >
                    {a.code}
                  </span>
                  <span className="text-[10px] text-brand-text-muted dark:text-gray-400 font-semibold">{a.alliance}</span>
                </div>

                <h4 className="text-base font-extrabold text-brand-primary dark:text-white tracking-tight">
                  {a.name}
                </h4>
              </div>

              {/* Bottom: Special deal badge */}
              <div
                className="relative z-10 flex items-center gap-1.5 text-xs font-bold mt-6"
                style={{ color: a.color }}
              >
                <Ticket size={13} className="shrink-0" />
                <span>{a.deal}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
