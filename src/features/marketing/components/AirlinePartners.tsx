'use client';

import React from 'react';
import { ShieldCheck, Ticket, Globe, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Airline {
  name: string;
  code: string;
  alliance: string;
  deal: string;
  color: string;
  glow: string;
  gradient: string;
}

export default function AirlinePartners() {
  const airlines: Airline[] = [
    { 
      name: "American Airlines", 
      code: "AA", 
      alliance: "Oneworld Alliance", 
      deal: "Secret Domestic Deals", 
      color: "#0078d2", 
      glow: "rgba(0, 120, 210, 0.2)",
      gradient: "from-[#0078d2]/5 to-[#0078d2]/15"
    },
    { 
      name: "United Airlines", 
      code: "UA", 
      alliance: "Star Alliance Member", 
      deal: "Europe Direct Flights", 
      color: "#192a56", 
      glow: "rgba(25, 42, 86, 0.2)",
      gradient: "from-[#192a56]/5 to-[#192a56]/15"
    },
    { 
      name: "Delta Air Lines", 
      code: "DL", 
      alliance: "SkyTeam Alliance", 
      deal: "Special Private Fares", 
      color: "#e01933", 
      glow: "rgba(224, 25, 51, 0.2)",
      gradient: "from-[#e01933]/5 to-[#e01933]/15"
    },
    { 
      name: "British Airways", 
      code: "BA", 
      alliance: "Oneworld Alliance", 
      deal: "London Direct Specials", 
      color: "#00205b", 
      glow: "rgba(0, 32, 91, 0.2)",
      gradient: "from-[#00205b]/5 to-[#00205b]/15"
    },
    { 
      name: "Lufthansa", 
      code: "LH", 
      alliance: "Star Alliance Member", 
      deal: "Transatlantic Deals", 
      color: "#001f3f", 
      glow: "rgba(0, 31, 63, 0.2)",
      gradient: "from-[#001f3f]/5 to-[#001f3f]/15"
    },
    { 
      name: "Qatar Airways", 
      code: "QR", 
      alliance: "Oneworld Alliance", 
      deal: "5-Star Premium Fares", 
      color: "#5a002c", 
      glow: "rgba(90, 0, 44, 0.2)",
      gradient: "from-[#5a002c]/5 to-[#5a002c]/15"
    },
    { 
      name: "Emirates", 
      code: "EK", 
      alliance: "Global Partner", 
      deal: "Luxury Cabin Rates", 
      color: "#ff0000", 
      glow: "rgba(255, 0, 0, 0.2)",
      gradient: "from-[#ff0000]/5 to-[#ff0000]/15"
    },
    { 
      name: "Singapore Airlines", 
      code: "SQ", 
      alliance: "Star Alliance Member", 
      deal: "Asia Route Specials", 
      color: "#cca353", 
      glow: "rgba(204, 163, 83, 0.2)",
      gradient: "from-[#cca353]/5 to-[#cca353]/15"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-primary border-t border-b border-brand-border dark:border-gray-800">
      <div className="premium-container">
        
        {/* Grid Layout separating Trust panel and Airlines Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Trust, IATA Accreditations, ASTA and ARC */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest block mb-3">
                Global Ticketing Desk
              </span>
              <h2 className="text-4xl font-display font-black text-brand-primary dark:text-white leading-tight mb-4">
                Accredited Booking Partner
              </h2>
              <p className="text-brand-text-muted dark:text-gray-400 text-base leading-relaxed">
                FlyEz is a registered flight reservation platform providing direct ticketing access through Oneworld, SkyTeam, and Star Alliance networks.
              </p>
            </div>

            {/* Trustpilot Score Block */}
            <div className="bg-gradient-to-r from-brand-bg-light to-white dark:from-brand-primary-light dark:to-brand-primary rounded-2xl p-6 border border-brand-border dark:border-gray-800 shadow-sm">
              <div className="flex gap-1 mb-2.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <svg key={s} width="18" height="18" viewBox="0 0 24 24" className="text-emerald-500 fill-current">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <h4 className="text-lg font-black text-brand-primary dark:text-white mb-1">
                Excellent <span className="text-emerald-500 font-bold">4.8 / 5</span> Trust rating
              </h4>
              <p className="text-xs text-brand-text-muted dark:text-gray-400 font-semibold">
                A verified service with 12,490+ passenger recommendations.
              </p>
            </div>

            {/* Accreditation details badges */}
            <div className="flex flex-col gap-5">
              {[
                { title: "IATA Accredited Desk", desc: "Certified ticketing operations following strict global civil aviation standards.", id: "IATA-8495" },
                { title: "ARC Bonded Agency", desc: "Airlines Reporting Corporation certification for flight security clearance.", id: "ARC-7201" },
                { title: "SSL Secure GDS Desk", desc: "256-bit SSL encrypted connection straight to primary airline booking hosts.", id: "Direct GDS" }
              ].map((acc, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-extrabold text-brand-primary dark:text-white flex items-center gap-2">
                      {acc.title}
                      <span className="text-[9px] bg-slate-100 dark:bg-brand-primary-light text-brand-text-muted dark:text-gray-400 border dark:border-gray-800 px-2 py-0.5 rounded font-bold">{acc.id}</span>
                    </h5>
                    <p className="text-xs text-brand-text-muted dark:text-gray-400 mt-1 leading-relaxed">{acc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Airline Cards Directory Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6 w-full">
            <div className="flex justify-between items-center border-b border-brand-border dark:border-gray-800 pb-3">
              <span className="text-xs font-extrabold text-brand-text-muted dark:text-gray-400 uppercase tracking-widest">
                Global Airline Directory
              </span>
              <span className="text-[10px] text-brand-orange font-bold flex items-center gap-1">
                <Sparkles size={11} /> Real-time Pricing
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {airlines.map((a, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ 
                    y: -5, 
                    borderColor: a.color,
                    boxShadow: `0 12px 25px rgba(7, 14, 27, 0.05), 0 0 15px ${a.glow}` 
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 shadow-sm relative overflow-hidden group cursor-default"
                >
                  
                  {/* Glowing dynamic background airline code watermark */}
                  <div className="absolute right-4 bottom-[-15px] text-[72px] font-display font-black text-brand-primary/[0.02] dark:text-white/[0.01] select-none pointer-events-none transition-all duration-300 group-hover:scale-110 group-hover:text-brand-primary/[0.04] dark:group-hover:text-white/[0.02]">
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
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
