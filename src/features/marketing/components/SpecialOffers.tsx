'use client';

import React from 'react';
import { Percent, Plane, Headphones, ArrowRight } from 'lucide-react';

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
      icon: <Plane size={18} className="text-white" />,
      image: "https://flyez.ai/assets/img/backgrounds/1.jpg",
      badge: "Flexible Fares",
      action: "Search Airlines"
    },
    {
      title: "Grab Amazing Flight Deals",
      subtitle: "Unpublished airfares direct from offline ticketing desks",
      icon: <Headphones size={18} className="text-white" />,
      image: "https://flyez.ai/assets/img/backgrounds/3.jpg",
      badge: "Exclusive Deals",
      action: "Talk to Specialist"
    },
    {
      title: "Up to 70% Discount Fares!",
      subtitle: "Call our agents for special business and group rates",
      icon: <Percent size={18} className="text-white" />,
      image: "https://flyez.ai/assets/img/backgrounds/2.jpg",
      badge: "Limited Time",
      action: "Call for Discount"
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#fafaf9] border-b border-stone-200/50">
      <div className="premium-container">
        
        {/* Title */}
        <div className="text-center mb-14">
          <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] block mb-2.5 font-ui">
            EXCLUSIVE OFFERS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-brand-primary mb-3">
            Special Offers
          </h2>
          <p className="text-brand-text-muted text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            These popular flight selections have a lot to offer. Search and book now!
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              onClick={() => {
                window.location.href = "tel:1800-521-4263";
              }}
              className="flex flex-col overflow-hidden rounded-3xl border border-stone-200/60 bg-white shadow-[0_4px_20px_rgba(7,14,27,0.03)] hover:shadow-[0_15px_40px_rgba(7,14,27,0.08)] transition-all duration-500 hover:-translate-y-2 cursor-pointer group"
            >
              {/* Top Section: Media Image */}
              <div className="h-[210px] w-full overflow-hidden relative border-b border-stone-100">
                <img 
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Clean vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none" />
                
                {/* Floating Tags */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                  <div className="p-2.5 bg-brand-primary/80 backdrop-blur-md rounded-xl border border-white/10 text-white transition-all duration-500 group-hover:bg-brand-orange group-hover:scale-105">
                    {offer.icon}
                  </div>
                  
                  <span className="text-[9px] font-bold uppercase bg-white/95 text-brand-primary px-3 py-1.5 rounded-full shadow-sm tracking-wider font-ui border border-stone-100">
                    {offer.badge}
                  </span>
                </div>
              </div>

              {/* Bottom Section: Clean Editorial Info */}
              <div className="p-6 flex flex-col justify-between flex-1 min-h-[170px]">
                <div>
                  <h4 className="text-[17px] font-display font-semibold text-brand-primary tracking-tight leading-snug group-hover:text-brand-orange transition-colors duration-300">
                    {offer.title}
                  </h4>
                  <p className="text-brand-text-muted text-[12.5px] leading-relaxed mt-2">
                    {offer.subtitle}
                  </p>
                </div>

                {/* Micro Action link */}
                <div className="flex items-center gap-1.5 text-brand-primary text-xs font-bold font-ui uppercase tracking-wider mt-5 transition-colors group-hover:text-brand-orange">
                  <span>{offer.action}</span>
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
