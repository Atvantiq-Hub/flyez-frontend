'use client';

import React from 'react';
import { ArrowRight, Plane, Info, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface Deal {
  origin: string;
  originCity: string;
  destination: string;
  destinationCity: string;
  price: number;
  type: string;
  dates: string;
  carrier: string;
  class: string;
  color: string;
  glow: string;
}

export default function TrendingDeals() {
  const deals: Deal[] = [
    {
      origin: "JFK",
      originCity: "New York",
      destination: "BOM",
      destinationCity: "Mumbai",
      price: 899,
      type: "round",
      dates: "Nov 12 - Nov 28",
      carrier: "Air India",
      class: "ECONOMY CLASS",
      color: "#ff5c00", // var(--color-brand-orange)
      glow: "rgba(255, 92, 0, 0.15)"
    },
    {
      origin: "SFO",
      originCity: "San Francisco",
      destination: "DEL",
      destinationCity: "Delhi",
      price: 849,
      type: "round",
      dates: "Dec 05 - Dec 20",
      carrier: "United Airlines",
      class: "ECONOMY CABIN",
      color: "#2563eb", // var(--color-brand-accent)
      glow: "rgba(37, 99, 235, 0.15)"
    },
    {
      origin: "LAX",
      originCity: "Los Angeles",
      destination: "LHR",
      destinationCity: "London",
      price: 599,
      type: "round",
      dates: "Nov 10 - Nov 24",
      carrier: "British Airways",
      class: "PROMO CABIN",
      color: "#10b981", // var(--color-brand-success)
      glow: "rgba(16, 185, 129, 0.15)"
    },
    {
      origin: "JFK",
      originCity: "New York",
      destination: "DEL",
      destinationCity: "Delhi",
      price: 899,
      type: "round",
      dates: "Nov 18 - Dec 02",
      carrier: "Delta Air Lines",
      class: "ECONOMY CLASS",
      color: "#8b5cf6",
      glow: "rgba(139, 92, 246, 0.15)"
    },
    {
      origin: "ORD",
      originCity: "Chicago",
      destination: "BOM",
      destinationCity: "Mumbai",
      price: 899,
      type: "round",
      dates: "Dec 01 - Dec 18",
      carrier: "Emirates",
      class: "ECONOMY SAVER",
      color: "#ec4899",
      glow: "rgba(236, 72, 153, 0.15)"
    },
    {
      origin: "LAX",
      originCity: "Los Angeles",
      destination: "BOM",
      destinationCity: "Mumbai",
      price: 899,
      type: "round",
      dates: "Jan 10 - Jan 28",
      carrier: "Qatar Airways",
      class: "ECONOMY CLASS",
      color: "#070e1b", // var(--color-brand-primary)
      glow: "rgba(7, 14, 27, 0.15)"
    }
  ];

  const handleDealClick = (deal: Deal) => {
    const params = new URLSearchParams({
      tp: deal.type,
      couch: 'E',
      d1: deal.origin,
      ar1: deal.destination,
      adult: '1',
      children: '0',
      infant: '0'
    });

    const currentYear = new Date().getFullYear();
    params.append('dt1', `11/12/${currentYear}`);
    if (deal.type === 'round') {
      params.append('ardt1', `11/18/${currentYear}`);
    }

    window.location.href = `https://flyez.ai/flight-listing?${params.toString()}`;
  };

  return (
    <section className="py-24 bg-white dark:bg-brand-primary">
      <div className="premium-container">
        
        {/* Title Block */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-brand-orange dark:text-brand-orange text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles size={16} /> Exclusive Fares
            </div>
            <h2 className="text-4xl font-display font-black text-brand-primary dark:text-white leading-tight">
              Popular Routes
            </h2>
            <p className="text-brand-text-muted dark:text-gray-400 text-base mt-2">
              We compile unpublished rates on popular domestic and international routes. Select a ticket to search instantly.
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-brand-text-muted dark:text-gray-400 bg-brand-bg-light dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 px-4 py-2.5 rounded-sm self-start md:self-auto">
            <Info size={14} className="text-brand-accent" /> <span>Prices include all terminal taxes & consolidator fees</span>
          </div>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, idx) => (
            <motion.div
              key={idx}
              onClick={() => handleDealClick(deal)}
              whileHover="hover"
              initial="initial"
              variants={{
                initial: { y: 0, borderColor: '#e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' },
                hover: { 
                  y: -6, 
                  borderColor: deal.color, 
                  boxShadow: `0 15px 30px rgba(7, 14, 27, 0.08), 0 0 15px ${deal.glow}` 
                }
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative flex bg-white dark:bg-brand-primary-light border dark:border-gray-800 rounded-2xl min-h-[180px] cursor-pointer overflow-hidden group"
            >
              {/* Colored Side Stripe */}
              <div className="w-1.5 shrink-0" style={{ backgroundColor: deal.color }} />

              {/* Left Side: Ticket Itinerary */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  {/* Cabin Category Badge */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-extrabold tracking-wider" style={{ color: deal.color }}>
                      {deal.class}
                    </span>
                    <span className="text-[10px] font-bold uppercase text-brand-text-muted dark:text-gray-400">
                      {deal.type === 'round' ? 'Round Trip' : 'One Way'}
                    </span>
                  </div>

                  {/* Airport codes & Sliding flight path */}
                  <div className="flex items-center gap-2 my-2">
                    <span className="text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight">
                      {deal.origin}
                    </span>
                    
                    {/* Animated path dotted line */}
                    <div className="flex-1 h-px border-b-2 border-dashed border-brand-border dark:border-gray-800 mx-2 relative min-w-[40px]">
                      <motion.div 
                        variants={{
                          initial: { left: '10%' },
                          hover: { left: '80%' }
                        }}
                        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-90"
                        style={{ color: deal.color }}
                      >
                        <Plane size={11} fill="currentColor" />
                      </motion.div>
                    </div>

                    <span className="text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight">
                      {deal.destination}
                    </span>
                  </div>
                  
                  {/* City labels */}
                  <div className="text-xs text-brand-text-muted dark:text-gray-400 font-semibold">
                    {deal.originCity} to {deal.destinationCity}
                  </div>
                </div>

                {/* Carrier info */}
                <div className="flex items-center gap-1.5 text-xs text-brand-primary dark:text-white font-bold mt-2.5">
                  <Plane size={12} style={{ color: deal.color }} />
                  <span>{deal.carrier}</span>
                </div>
              </div>

              {/* Ticket Coupon Separator (Dashed vertical line + cutout notches) */}
              <div className="relative w-px border-l-2 border-dashed border-brand-border dark:border-gray-800 my-4 shrink-0">
                <div className="absolute -top-[23px] -left-2 w-4 h-4 bg-white dark:bg-brand-primary rounded-full border border-brand-border dark:border-gray-800 border-t-transparent transform rotate-135" />
                <div className="absolute -bottom-[23px] -left-2 w-4 h-4 bg-white dark:bg-brand-primary rounded-full border border-brand-border dark:border-gray-800 border-b-transparent transform rotate-135" />
              </div>

              {/* Right Side: Price & Barcode details */}
              <div className="w-[125px] shrink-0 p-6 bg-gradient-to-b from-brand-primary/5 to-brand-primary/10 dark:from-white/2 dark:to-white/5 flex flex-col justify-between items-center text-center">
                
                {/* Boarding Date */}
                <div className="flex flex-col">
                  <span className="text-[9px] text-brand-text-muted dark:text-gray-400 font-extrabold uppercase tracking-wider">BOARDING</span>
                  <span className="text-xs font-bold text-brand-primary dark:text-white mt-0.5">{deal.dates.split(' - ')[0]}</span>
                </div>

                {/* Price Display */}
                <div>
                  <span className="text-[9px] text-brand-text-muted dark:text-gray-400 font-bold block">FROM</span>
                  <span className="text-3xl font-display font-black text-brand-orange leading-none">
                    <span className="text-sm font-extrabold align-super mr-0.5">$</span>
                    {deal.price}
                  </span>
                </div>

                {/* Micro Barcode placeholder representing a real ticket */}
                <div className="flex gap-0.5 h-3.5 w-16 opacity-35 dark:opacity-60" title="Book Private Flight Deal">
                  {[1.5, 3, 1, 2.5, 1, 4, 1.5, 2, 1, 3].map((w, idx) => (
                    <div key={idx} style={{ flexGrow: w }} className="h-full bg-brand-primary dark:bg-white" />
                  ))}
                </div>
              </div>

              {/* Sheen Overlay Effect */}
              <div className="absolute top-0 -left-[150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/12 to-transparent skew-x-[-25deg] transition-all duration-[750ms] group-hover:left-[150%] pointer-events-none z-10" />

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
