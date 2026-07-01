'use client';

import React from 'react';
import { Compass, Sparkles, Phone, Shield, Award, Check } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import dynamic from 'next/dynamic';

const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] dark:bg-brand-primary">
      {/* Sticky Header Bar (Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        <Header />
      </div>

      {/* About Hero Section */}
      <section className="relative py-28 md:py-36 flex items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#070e1b] to-[#0c1b33] border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,0,0.12),transparent_50%)] z-[1]" />

        <div className="premium-container relative z-10">
          <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.25em] inline-block mb-3">
            THE HERITAGE OF FLIGHT
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-white leading-tight tracking-tight">
            Bespoke Airfare Brokerage
          </h1>
        </div>
      </section>

      {/* Main Content Details */}
      <main className="flex-1 pb-20">
        
        {/* Intro Block: Editorial Grid */}
        <section className="py-20 lg:py-24">
          <div className="premium-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Visual Stat & Cabin Photo collage */}
              <div className="lg:col-span-5 relative w-full flex flex-col gap-6 order-2 lg:order-1">
                {/* Cabin Photo Frame */}
                <div className="w-full h-[380px] md:h-[420px] rounded-3xl overflow-hidden shadow-[0_12px_32px_rgba(7,14,27,0.06)] border border-stone-200/60 transition-transform duration-500 hover:scale-[1.01] cursor-pointer">
                  <img
                    src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=800&auto=format&fit=crop"
                    alt="Luxury Flight Suite"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Column: Narrative Content */}
              <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
                <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] inline-flex items-center gap-1.5 font-ui">
                  <Award size={13} /> WHO WE ARE
                </span>
                <h2 className="text-3xl lg:text-4xl font-display font-medium text-brand-primary dark:text-white leading-tight tracking-tight">
                  The Art of Private Airfare Brokerage
                </h2>
                
                <div className="flex flex-col gap-5 text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed font-sans">
                  <p>
                    At FlyEz, we believe that premium air travel should not be constrained by public retail pricing. As a bespoke airfare brokerage, our mission is to negotiate private consolidator contracts and offline rates directly with the world&apos;s leading airlines—passing the exclusivity and savings directly to you.
                  </p>
                  <p>
                    We coordinate travel details for corporate clients, luxury leisure flyers, and group itineraries that require custom routing and seat allocations. Our platform utilizes direct GDS links alongside seasoned routing specialists, ensuring your schedule is optimized and secured with zero hidden fees.
                  </p>
                  <p>
                    Whether securing a lie-flat business suite to Europe or a private group booking, FlyEz provides a tailored, high-touch experience from reservation to touchdown.
                  </p>
                </div>

                {/* Micro tags */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-6 border-t border-stone-250/15">
                  {[
                    "190+ Countries",
                    "400+ Partner Airlines",
                    "24/7 Concierge Desks",
                    "100% Secure GDS Ticketing"
                  ].map((stat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-brand-primary dark:text-white font-ui uppercase tracking-wider">
                      <Check size={12} className="text-brand-orange shrink-0" strokeWidth={3} />
                      <span>{stat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pillars Section: Borderless Staggered Columns */}
        <section className="py-20 bg-white dark:bg-brand-primary border-t border-b border-stone-200/50">
          <div className="premium-container">
            <div className="text-center mb-16">
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-[0.2em] block mb-2 font-ui">
                OUR CAPABILITIES
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-medium text-brand-primary dark:text-white">
                The Standards of Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
              {[
                {
                  roman: "I",
                  title: "Consolidator Pools",
                  desc: "We bypass standard retail markups by securing private offline contracts and wholesale consolidator rates directly from global airline desks."
                },
                {
                  roman: "II",
                  title: "Frictionless GDS Routing",
                  desc: "Our integration with global distribution systems completes flight selections, seat assignments, and instant PNR checks in seconds."
                },
                {
                  roman: "III",
                  title: "Bespoke Routing Specialists",
                  desc: "A dedicated ticketing desk staffed by human flight specialists handles complex itineraries, priority cabin seats, and adjustments 24/7."
                }
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 group cursor-pointer"
                >
                  <span className="font-display italic text-3xl text-brand-orange/65 font-medium select-none w-10 block transition-transform duration-300 group-hover:translate-x-1">
                    {p.roman}
                  </span>
                  
                  <h4 className="text-lg font-display font-semibold text-brand-primary dark:text-white tracking-tight">
                    {p.title}
                  </h4>
                  
                  <p className="text-brand-text-muted dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call Banner */}
        <section className="pt-20">
          <div className="premium-container">
            <div className="relative overflow-hidden bg-[#070e1b] rounded-3xl p-10 border border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 shadow-2xl">
              {/* Subtle gold radial glow overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-radial from-brand-orange/5 to-transparent pointer-events-none" />

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-orange shadow-[0_0_15px_rgba(255,92,0,0.15)] shrink-0 relative">
                  <img src="/grouptraveltelecaller.webp" alt="telecaller" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-display font-medium tracking-tight mb-1.5">
                    Looking for Unpublished Private Fares?
                  </h3>
                  <p className="text-white/70 text-sm md:text-base max-w-2xl leading-relaxed font-sans">
                    Our offline ticketing desk provides private discounts on premium international routes. Connect with a travel specialist 24/7.
                  </p>
                </div>
              </div>

              <a 
                href="tel:1800-521-4263"
                className="bg-brand-orange hover:bg-brand-orange-hover text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2.5 z-10 shrink-0 self-stretch md:self-start lg:self-auto cursor-pointer shadow-[0_4px_12px_rgba(255,92,0,0.25)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 font-ui"
              >
                <Phone size={14} fill="currentColor" /> Call 1-800-521-4263
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Floating Travel GPT Chat Assistant */}
      <TravelGptChat />

      <Footer />
    </div>
  );
}
