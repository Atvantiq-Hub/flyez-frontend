'use client';

import React, { useState } from 'react';
import { CalendarRange, Calendar, Ticket, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface Event {
  name: string;
  desc: string;
  image: string;
  color: string;
  date: string;
  url: string;
  tag: string;
  discount: string;
  code: string;
  from: string;
  to: string;
}

export default function Festivals() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const events: Event[] = [
    {
      name: "Thanksgiving",
      desc: "Fly home for the holidays. Exclusive family group airfares.",
      image: "https://flyez.ai/assets/img/thanks_giving.jpg",
      color: "#ff5c00", // Brand Orange
      date: "Late November",
      url: "https://flyez.ai/cheap-flights-for-thanksgiving-travel",
      tag: "Harvest Special",
      discount: "Save up to $45",
      code: "THG45",
      from: "ORD",
      to: "MIA"
    },
    {
      name: "Black Friday",
      desc: "Massive fare cuts. Get secret consolidator coupon rates.",
      image: "https://flyez.ai/assets/img/black_friday.jpg",
      color: "#2563eb", // Brand Blue
      date: "Late November",
      url: "https://flyez.ai/cheap-flights-for-black-friday",
      tag: "VIP Access",
      discount: "Save up to $55",
      code: "BLK55",
      from: "LAX",
      to: "JFK"
    },
    {
      name: "St. Patrick's Day",
      desc: "Travel to top parade cities. Lucky green flight discounts.",
      image: "https://flyez.ai/assets/img/st_patriks.jpg",
      color: "#10b981", // Shamrock Green
      date: "March 17",
      url: "https://flyez.ai/st-patricks-day-flight-deals",
      tag: "Lucky Fare",
      discount: "Save up to $35",
      code: "STP35",
      from: "BOS",
      to: "DUB"
    },
    {
      name: "Valentine's Day",
      desc: "Romantic couple getaways. 2-for-1 private airfares.",
      image: "https://flyez.ai/assets/img/Valentine-day.jpg",
      color: "#ec4899", // Rose Pink
      date: "February 14",
      url: "https://flyez.ai/cheap-flights-for-valentines-day",
      tag: "Sweetheart Rates",
      discount: "Save up to $50",
      code: "VAL50",
      from: "JFK",
      to: "CDG"
    },
    {
      name: "New Year Eve",
      desc: "Celebrate in NYC or London. Last-minute seat allocations.",
      image: "https://flyez.ai/assets/img/new_year.jpg",
      color: "#a855f7", // Royal Violet
      date: "December 31",
      url: "https://flyez.ai/new-year-travel-flight-deals",
      tag: "Countdown Deal",
      discount: "Save up to $60",
      code: "NYE60",
      from: "SFO",
      to: "LHR"
    },
    {
      name: "Christmas Travel",
      desc: "Secure discount seats for winter holidays. Festive airfares.",
      image: "https://flyez.ai/assets/img/christmas.jpg",
      color: "#3b82f6", // Electric Blue
      date: "Late December",
      url: "https://flyez.ai/cheap-flights-for-christmas-travel",
      tag: "Holiday Secret",
      discount: "Save up to $40",
      code: "XMAS40",
      from: "JFK",
      to: "DEL"
    },
    {
      name: "Halloween Day",
      desc: "Spooky good discount flight rates. Fall getaway specials.",
      image: "https://flyez.ai/assets/img/hallowen.jpg",
      color: "#f97316", // Pumpkin Orange
      date: "Late October",
      url: "https://flyez.ai/cheap-flights-for-halloween",
      tag: "Fright-Free Fare",
      discount: "Save up to $30",
      code: "HWN30",
      from: "SEA",
      to: "MCO"
    }
  ];

  const copyCode = (e: React.MouseEvent, code: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section className="py-24 bg-brand-bg-light dark:bg-brand-primary border-t border-b border-brand-border dark:border-gray-800 relative">
      <div className="premium-container relative z-10">
        
        {/* Unified Title Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-block mb-2.5">
            <span className="flex items-center gap-1.5 justify-center">
              <CalendarRange size={14} /> Exclusive Seasonal Calendars
            </span>
          </span>
          <h2 className="text-4xl font-display font-black text-brand-primary dark:text-white">
            Festivals & Special Events
          </h2>
          <p className="text-brand-text-muted dark:text-gray-400 text-base max-w-xl mx-auto mt-2">
            Lock in unpublished flight discounts and special consolidator fares during major holidays.
          </p>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event, idx) => (
            <motion.a
              key={idx}
              href={event.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl min-h-[340px] bg-white dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 hover:border-brand-orange/30 dark:hover:border-brand-orange/40 shadow-sm hover:shadow-xl cursor-pointer group transition-all duration-300"
            >
              {/* Top Accent Hover Glow */}
              <div 
                className="absolute top-0 inset-x-0 h-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                style={{ backgroundColor: event.color }} 
              />

              {/* Background Image with Dark Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105 z-0"
                style={{ backgroundImage: `url("${event.image}")` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-brand-primary/60 to-brand-primary/95 dark:from-black/10 dark:via-black/50 dark:to-black/95 z-10 transition-all duration-300 group-hover:via-brand-primary/15 group-hover:to-brand-primary/98 dark:group-hover:to-black/98" />

              {/* Content Panel */}
              <div className="relative z-20 flex flex-col justify-between h-full flex-1 p-6">
                
                {/* Date Pill */}
                <div className="flex">
                  <span className="text-[10px] font-extrabold uppercase bg-white/10 dark:bg-black/25 text-white px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/15 tracking-wider flex items-center gap-1.5">
                    <Calendar size={12} /> {event.date}
                  </span>
                </div>

                {/* Info Display */}
                <div className="w-full">
                  <span 
                    className="text-[10px] uppercase tracking-wider font-extrabold block mb-1" 
                    style={{ color: event.color }}
                  >
                    {event.tag} • {event.discount}
                  </span>
                  
                  <h4 className="text-white text-2xl font-display font-black mb-1.5 tracking-tight leading-snug">
                    {event.name}
                  </h4>

                  <p className="text-white/80 group-hover:text-white text-xs leading-relaxed mb-4 transition-colors duration-300">
                    {event.desc}
                  </p>

                  {/* Coupon & Action row */}
                  <div className="flex items-center justify-between border-t border-white/10 pt-3.5 mt-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-white/90 font-bold">
                      Code: <span className="font-mono bg-white/15 dark:bg-black/25 px-2.5 py-0.5 rounded text-white border border-white/10" style={{ color: event.color }}>{event.code}</span>
                    </div>

                    <button
                      onClick={(e) => copyCode(e, event.code)}
                      className="flex items-center gap-1 bg-white/10 hover:bg-brand-orange hover:border-brand-orange text-white text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-white/15 transition-all duration-300"
                    >
                      {copiedCode === event.code ? (
                        <>
                          <Check size={11} className="text-green-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Ticket size={11} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

              {/* Shimmer Overlay */}
              <div className="absolute top-0 -left-[150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-[-25deg] transition-all duration-[750ms] group-hover:left-[150%] pointer-events-none z-30" />

            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
