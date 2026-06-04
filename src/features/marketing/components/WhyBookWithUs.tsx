'use client';

import React from 'react';
import { DollarSign, Zap, ShieldCheck, CheckCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

interface Benefit {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  glow: string;
}

export default function WhyBookWithUs() {
  const benefits: Benefit[] = [
    {
      number: "01",
      title: "Consolidated Wholesale Rates",
      desc: "We bypass standard retail markups by securing contract rates directly from global airline consolidators, matching or beating any online offer.",
      icon: <DollarSign size={24} />,
      color: "#2563eb", // Brand Accent Blue
      bg: "bg-blue-50 dark:bg-blue-500/10 text-brand-accent",
      glow: "rgba(37, 99, 235, 0.15)"
    },
    {
      number: "02",
      title: "Frictionless Priority Booking",
      desc: "Configure your routing parameters online or call our desk; our priority booking system completes ticket reservations and seat allocations in seconds.",
      icon: <Zap size={24} />,
      color: "#ff5c00", // Brand Orange
      bg: "bg-orange-50 dark:bg-orange-500/10 text-brand-orange",
      glow: "rgba(255, 92, 0, 0.15)"
    },
    {
      number: "03",
      title: "Elite Concierge Support",
      desc: "Access a dedicated 24/7 ticketing desk staffed by human flight experts to handle real-time modifications, cancellations, and premium seat setups.",
      icon: <ShieldCheck size={24} />,
      color: "#10b981", // Brand Success Green
      bg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)"
    }
  ];

  return (
    <section className="py-24 bg-brand-bg-light dark:bg-brand-primary border-t border-b border-brand-border dark:border-gray-800 relative overflow-hidden">
      
      {/* Decorative subtle vector background mesh */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(circle,var(--color-brand-primary)_1px,transparent_1.5px)] bg-[size:32px_32px] pointer-events-none" />
      <div className="absolute top-1/2 left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

      <div className="premium-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Rich Editorial Value Pitch */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-flex items-center gap-2 mb-3">
                <Award size={14} /> Unrivaled Service
              </span>
              <h2 className="text-4xl lg:text-5xl font-display font-black text-brand-primary dark:text-white leading-[1.1] tracking-tight mb-4">
                Smart Flight <br/>Desk Solutions
              </h2>
              <p className="text-brand-text-muted dark:text-gray-400 text-base leading-relaxed">
                FlyEz combines direct GDS airline contracts, wholesale consolidator connections, and 24/7 human expertise to offer flight bookings at rates simply unavailable to the general public.
              </p>
            </div>

            {/* Micro checklist indicators */}
            <div className="flex flex-col gap-3 border-t border-brand-border dark:border-gray-800 pt-6">
              {[
                "100% Secure PCI-DSS GDS bookings",
                "Instant PNR ticket confirmations",
                "Zero hidden ticketing or seat fees"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-bold text-brand-primary dark:text-white">
                  <CheckCircle size={16} className="text-brand-orange shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Staggered Benefits Panel */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {benefits.map((b, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ 
                  x: 8, 
                  borderColor: b.color,
                  boxShadow: `0 12px 30px rgba(7, 14, 27, 0.04), 0 0 15px ${b.glow}` 
                }}
                className="relative flex items-start gap-6 p-6 rounded-2xl bg-white dark:bg-brand-primary-light border border-brand-border dark:border-gray-800/80 shadow-sm transition-all duration-300 group cursor-pointer overflow-hidden"
              >
                {/* Dynamic Brand Color Top-Left corner accent */}
                <div className="absolute top-0 left-0 w-1 h-full transition-transform duration-300 group-hover:scale-y-110" style={{ backgroundColor: b.color }} />

                {/* Animated Background Number Watermark */}
                <div className="absolute right-6 bottom-[-15px] text-[72px] font-display font-black text-brand-primary/[0.02] dark:text-white/[0.01] select-none pointer-events-none transition-all duration-500 group-hover:scale-108 group-hover:text-brand-primary/[0.04] dark:group-hover:text-white/[0.02]">
                  {b.number}
                </div>

                {/* Icon Capsule with ambient background glow */}
                <div className={`p-4 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[6deg] ${b.bg}`}>
                  {b.icon}
                </div>

                {/* Content */}
                <div className="flex-1 pr-6 z-10">
                  <h4 className="text-lg font-display font-black text-brand-primary dark:text-white mb-2 leading-none">
                    {b.title}
                  </h4>
                  <p className="text-brand-text-muted dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
