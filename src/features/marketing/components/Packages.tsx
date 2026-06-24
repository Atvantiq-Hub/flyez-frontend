'use client';

import React from 'react';
import { Plane, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface City {
  name: string;
  routes: string;
  price: number;
  image: string;
  text: string;
}

export default function Packages() {
  const cities: City[] = [
    { name: "New York", routes: "240+ Weekly Flights", price: 149, image: "https://flyez.ai/assets/img/1.jpg", text: "Stunning skylines & nonstop schedules" },
    { name: "Los Angeles", routes: "185+ Weekly Flights", price: 189, image: "https://flyez.ai/assets/img/2.jpg", text: "West coast hubs & sunny terminals" },
    { name: "San Francisco", routes: "130+ Weekly Flights", price: 159, image: "https://flyez.ai/assets/img/3.jpg", text: "Transpacific routes & bay views" },
    { name: "Las Vegas", routes: "210+ Weekly Flights", price: 99, image: "https://flyez.ai/assets/img/4.jpg", text: "Direct desert links & night flights" },
    { name: "San Diego", routes: "90+ Weekly Flights", price: 129, image: "https://flyez.ai/assets/img/5.jpg", text: "Southern border routes & calm skies" },
    { name: "Chicago", routes: "175+ Weekly Flights", price: 119, image: "https://flyez.ai/assets/img/6.jpg", text: "Midwest connection hubs & dining" }
  ];

  const handleCityClick = (cityName: string) => {
    const params = new URLSearchParams({
      tp: 'round',
      couch: 'E',
      d1: 'JFK', // Default origin
      ar1: cityName.toUpperCase().substring(0, 3), // Stylized code
      adult: '1',
      children: '0',
      infant: '0'
    });
    window.location.href = `https://flyez.ai/flight-listing?${params.toString()}`;
  };

  return (
    <section className="py-24 bg-brand-bg-light dark:bg-brand-primary border-t border-b border-brand-border dark:border-gray-800">
      <div className="premium-container">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-black text-brand-primary dark:text-white">
            Popular Holiday Packages
          </h2>
          <p className="text-brand-text-muted dark:text-gray-400 text-base max-w-xl mx-auto mt-2">
            Explore exclusive flight options and consolidator rates to our most requested cities.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city, idx) => {
            // Bento spanning: 2nd (idx 1) and 4th (idx 3) span 2 columns on large displays
            const isSpanned = idx === 1 || idx === 3;
            
            return (
              <motion.div
                key={idx}
                onClick={() => handleCityClick(city.name)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl min-h-[280px] shadow-sm hover:shadow-xl border border-brand-border dark:border-gray-800 hover:border-brand-orange/30 dark:hover:border-brand-orange/40 bg-white dark:bg-brand-primary-light cursor-pointer group transition-all duration-300 ${
                  isSpanned ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                {/* Zoom-on-hover background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-[0.5deg]"
                  style={{ backgroundImage: `url("${city.image}")` }}
                />
                
                {/* Premium dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 to-brand-primary/88 dark:from-black/10 dark:to-black/90 group-hover:from-brand-primary/5 group-hover:to-brand-primary/92 transition-all duration-300" />

                {/* Content Panel */}
                <div className="relative z-10 flex flex-col justify-between h-full flex-1 p-6">
                  
                  {/* Top Section: Flight Capacity Badge & Plane Icon */}
                  <div className="flex justify-between items-center w-100 z-10">
                    <span className="text-[10px] font-extrabold uppercase bg-white/15 dark:bg-black/20 text-white px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/15 tracking-wider">
                      {city.routes}
                    </span>
                    
                    <div className="w-9 h-9 rounded-full bg-white/15 dark:bg-black/20 text-white flex items-center justify-center backdrop-blur-md border border-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[15deg] group-hover:bg-brand-orange group-hover:border-brand-orange">
                      <Plane size={14} fill="currentColor" />
                    </div>
                  </div>

                  {/* Bottom Section: Name, Desc, Price tag, and Slide-up CTA */}
                  <div className="w-100 z-10">
                    <div className="flex justify-between items-end mb-1.5">
                      <h4 className="text-white text-2xl font-display font-black leading-none">
                        {city.name}
                      </h4>
                      
                      {/* Price Badge */}
                      <div className="bg-gradient-to-r from-brand-orange to-[#e04a00] text-white px-2.5 py-1 rounded-md text-xs font-extrabold shadow-[0_4px_10px_rgba(255,92,0,0.25)] flex items-center gap-0.5 whitespace-nowrap">
                        <span className="text-[10px] font-normal opacity-90">from</span>
                        <span className="text-sm font-black">${city.price}</span>
                      </div>
                    </div>

                    <p className="text-white/75 group-hover:text-white text-xs leading-relaxed transition-colors duration-300">
                      {city.text}
                    </p>

                    {/* Modern Slide-Up CTA */}
                    <div className="max-h-0 opacity-0 group-hover:max-h-10 group-hover:opacity-100 group-hover:mt-2.5 transition-all duration-300 overflow-hidden">
                      <div className="flex items-center gap-1.5 text-brand-orange text-xs font-bold">
                        Book Private Rates Now <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle background text representation */}
                <div className="absolute right-4 -bottom-5 text-[90px] font-display font-black text-white/[0.03] dark:text-white/[0.02] select-none pointer-events-none z-0">
                  {city.name.substring(0, 3).toUpperCase()}
                </div>

                {/* Shimmer Overlay effect */}
                <div className="absolute top-0 -left-[150%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] transition-all duration-[750ms] group-hover:left-[150%] pointer-events-none z-10" />

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
