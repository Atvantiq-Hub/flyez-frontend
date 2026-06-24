'use client';

import React from 'react';
import { Percent, Plane, Headphones, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Offer {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  image: string;
  badge: string;
  action: string;
}

export default function SpecialOffers() {
  const offers: Offer[] = [
    {
      title: "Choose any Airline, Book Your Ticket",
      subtitle: "Worldwide coverage & custom airline booking plans",
      icon: <Plane size={24} className="text-white" />,
      image: "https://flyez.ai/assets/img/backgrounds/1.jpg",
      badge: "Flexible Fares",
      action: "Search Airlines"
    },
    {
      title: "Grab Amazing Flight Deals",
      subtitle: "Unpublished airfares direct from offline ticketing desks",
      icon: <Headphones size={24} className="text-white" />,
      image: "https://flyez.ai/assets/img/backgrounds/3.jpg",
      badge: "Exclusive Deals",
      action: "Talk to Specialist"
    },
    {
      title: "Up to 70% Discount Fares!",
      subtitle: "Call our agents for special business and group rates",
      icon: <Percent size={24} className="text-white" />,
      image: "https://flyez.ai/assets/img/backgrounds/2.jpg",
      badge: "Limited Time",
      action: "Call for Discount"
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-brand-primary border-b border-brand-border dark:border-gray-800">
      <div className="premium-container">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black text-brand-primary dark:text-white mb-3">
            Special Offers
          </h2>
          <p className="text-brand-text-muted dark:text-gray-400 text-base max-w-xl mx-auto">
            These popular flight selections have a lot to offer. Search and book now!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              onClick={() => {
                window.location.href = "tel:1800-521-4263";
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative flex flex-col justify-between overflow-hidden rounded-2xl min-h-[290px] shadow-sm hover:shadow-xl border border-brand-border dark:border-gray-800 bg-brand-primary/95 cursor-pointer group transition-all duration-300"
            >
              {/* Zoom-on-hover background image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[0.5deg]"
                style={{ backgroundImage: `url("${offer.image}")` }}
              />
              
              {/* Premium dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/15 to-brand-primary/88 dark:from-black/15 dark:to-black/90 group-hover:from-brand-primary/5 group-hover:to-brand-primary/92 transition-all duration-300" />
              
              {/* Content Panel */}
              <div className="relative z-10 flex flex-col justify-between h-full flex-1 p-6">
                {/* Top Row */}
                <div className="flex justify-between items-start w-100 z-10">
                  <div className="p-3 bg-white/12 rounded-xl backdrop-blur-md border border-white/15 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-[10deg] group-hover:bg-brand-orange group-hover:border-brand-orange">
                    {offer.icon}
                  </div>
                  
                  <span className="text-[10px] font-extrabold uppercase bg-white/15 dark:bg-black/20 text-white px-3 py-1.5 rounded-full backdrop-blur-md border border-white/15 tracking-wider">
                    {offer.badge}
                  </span>
                </div>

                {/* Bottom Info */}
                <div className="w-100 z-10">
                  <h4 className="text-white text-xl font-display font-black mb-1.5 leading-snug tracking-tight">
                    {offer.title}
                  </h4>
                  <p className="text-white/75 text-xs leading-relaxed">
                    {offer.subtitle}
                  </p>

                  {/* Interactive slide-up button */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2.5 transition-all duration-300 overflow-hidden">
                    <div className="flex items-center gap-1.5 text-brand-orange text-xs font-bold">
                      {offer.action} <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Shimmer overlay effect */}
              <div className="absolute top-0 -left-[150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-[750ms] group-hover:left-[150%] pointer-events-none z-10" />

            </motion.div>
          ))}
        </div>

        {/* Help Banner call to action */}
        <div className="relative overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary-light dark:from-brand-primary-light dark:to-[#1e293b] rounded-2xl p-9 md:p-10 border border-white/8 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Subtle glowing radial overlay */}
          <div className="absolute -top-1/2 -right-1/10 w-[300px] height-[300px] bg-[radial-gradient(circle,rgba(255,92,0,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-brand-orange shadow-[0_0_15px_rgba(255,92,0,0.3)] shrink-0 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://flyez.ai/assets/img/grouptraveltelecaller.webp" alt="telecaller" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-white text-2xl font-display font-black tracking-tight mb-1.5">
                Let Us Help You Book!
              </h3>
              <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">
                Speak with a travel desk expert and secure unpublished rates, cancellation adjustments, or custom travel dates 24/7.
              </p>
            </div>
          </div>

          <motion.a 
            href="tel:1800-521-4263"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(255, 92, 0, 0.4)",
                "0 0 0 10px rgba(255, 92, 0, 0)",
                "0 0 0 0 rgba(255, 92, 0, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white px-8 py-4 rounded-md font-extrabold text-base flex items-center justify-center gap-2.5 z-10 shrink-0 self-stretch md:self-start lg:self-auto cursor-pointer"
          >
            <Headphones size={18} className="fill-current" /> Call 1800-521-4263
          </motion.a>
        </div>

      </div>
    </section>
  );
}
