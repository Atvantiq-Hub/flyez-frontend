'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      className="bg-[#03070f] text-white pt-24 pb-12 relative overflow-hidden border-t border-white/[0.03]"
    >
      {/* Golden thread line at the top border */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent opacity-60" />

      {/* Ambient background glows */}
      <div className="absolute top-0 right-[15%] w-[400px] h-[400px] rounded-full bg-radial from-brand-orange/4 to-transparent pointer-events-none blur-3xl" />
      <div className="absolute bottom-[-10%] left-[10%] w-[500px] h-[500px] rounded-full bg-radial from-brand-accent/5 to-transparent pointer-events-none blur-3xl" />

      <div className="premium-container relative z-10">
        
        {/* Tier 1: Brand Header Statement */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-12 mb-16 border-b border-white/[0.06]">
          <div className="max-w-xl">
            <a href="/" className="flex items-center gap-2.5 group mb-3">
              <img 
                src="/logo-small.gif" 
                alt="FlyEz Logo" 
                className="h-7 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
              />
              <span className="text-2xl font-[800] font-display text-white tracking-tight">
                Fly<span className="text-brand-orange font-medium">Ez</span>
              </span>
            </a>
            <p className="text-white/50 text-xs sm:text-sm font-sans leading-relaxed">
              FlyEz negotiates directly with airline inventory desks to source private, unpublished airfares and consolidated rates for business and luxury travelers.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <a 
              href="tel:1800-521-4263"
              className="flex items-center justify-center gap-2.5 border border-white/10 hover:border-brand-orange/40 bg-white/[0.02] hover:bg-white/[0.04] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              <Phone size={13} className="text-brand-orange" />
              <span>1800-521-4263</span>
            </a>
          </div>
        </div>

        {/* Tier 2: Main Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Company Directory */}
          <div>
            <h4 className="text-stone-300 text-[11px] font-bold font-ui uppercase tracking-[0.2em] mb-6">
              Company
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs text-white/55 font-sans">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "FAQ", href: "/faq" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Contact Us", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="group flex items-center gap-1 hover:text-brand-orange transition-all duration-300 hover:translate-x-1"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 text-brand-orange transition-opacity duration-300 shrink-0" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Travel Services */}
          <div>
            <h4 className="text-stone-300 text-[11px] font-bold font-ui uppercase tracking-[0.2em] mb-6">
              Services
            </h4>
            <ul className="flex flex-col gap-3.5 text-xs text-white/55 font-sans">
              {[
                { name: "Business Class Flights", href: "/business-first-class" },
                { name: "Offline Consolidator Deals", href: "/" },
                { name: "Group Travel Booking", href: "/contact" },
                { name: "Private Air Charters", href: "/contact" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href}
                    className="group flex items-center gap-1 hover:text-brand-orange transition-all duration-300 hover:translate-x-1"
                  >
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 text-brand-orange transition-opacity duration-300 shrink-0" />
                    <span>{link.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Concierge */}
          <div>
            <h4 className="text-stone-300 text-[11px] font-bold font-ui uppercase tracking-[0.2em] mb-6">
              USA Concierge
            </h4>
            <ul className="flex flex-col gap-4 text-xs text-white/55 font-sans leading-relaxed">
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-brand-orange flex-shrink-0" />
                <a href="mailto:help@flyez.ai" className="hover:text-white transition-colors">help@flyez.ai</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-brand-orange flex-shrink-0 mt-0.5" />
                <span>120 Sansome St, San Francisco, CA 94104</span>
              </li>
              <li className="text-[10px] text-white/40 leading-relaxed pt-2 border-t border-white/[0.05]">
                Licensed Independent Travel Seller. Offline desk operates 24/7.
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Apps */}
          <div>
            <h4 className="text-stone-300 text-[11px] font-bold font-ui uppercase tracking-[0.2em] mb-6">
              Exclusive Access
            </h4>
            <p className="text-white/50 text-[11.5px] mb-4 leading-relaxed font-sans">
              Subscribe to get secret discount codes and unpublished flight offers.
            </p>
            
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex bg-white/[0.03] border border-white/10 rounded-xl p-1 w-full transition-all duration-300 focus-within:border-brand-orange/40 focus-within:bg-white/[0.05] focus-within:shadow-[0_0_20px_rgba(255,92,0,0.1)] mb-5"
            >
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-transparent border-none outline-none text-white text-xs py-2 px-3 placeholder-white/25 w-[50%]"
              />
              <button 
                type="submit" 
                className="bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-300 shrink-0"
              >
                <Send size={12} className="text-white" />
              </button>
            </form>

            {/* App Store Buttons */}
            <div className="flex gap-2">
              <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 rounded-lg transition-all duration-300 text-left group">
                <svg className="w-3.5 h-3.5 fill-current text-white/70 group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.79 16.41 3.52 9.38 8.16 9.12c1.37.07 2.27.79 3.03.8 1.15-.02 2.27-.92 3.82-.77 1.62.15 2.82.78 3.54 1.84-3.3 1.98-2.77 6.17.53 7.5-1.04 2.5-1.97 5.02-1.97 7.79z M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.2 2.5-2.06 4.38-3.74 4.25z" />
                </svg>
                <div>
                  <div className="text-[6px] text-white/40 uppercase font-medium leading-none">Download on</div>
                  <div className="text-[9px] font-bold leading-tight mt-0.5">App Store</div>
                </div>
              </a>
              <a href="#" className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15 rounded-lg transition-all duration-300 text-left group">
                <svg className="w-3.5 h-3.5 fill-current text-white/70 group-hover:text-white" viewBox="0 0 24 24">
                  <path d="M3 2.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h.07l11.05-11.05L3.07 2.5H3zm12.46 9.5L4.41 21.05a2 2 0 0 0 1.29-.05l10.9-6.3-1.14-1.7zm0-2L5.7 3.7A2 2 0 0 0 4.41 2.95l11.05 9.05zM22.56 11l-3.04-1.75-2.06 3.1 2.06 3.1 3.04-1.75a1.15 1.15 0 0 0 0-1.7z" />
                </svg>
                <div>
                  <div className="text-[6px] text-white/40 uppercase font-medium leading-none">Get it on</div>
                  <div className="text-[9px] font-bold leading-tight mt-0.5">Google Play</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Tier 3: Directory Well (Grouped Index) */}
        <div className="bg-[#050b16] border border-white/[0.04] rounded-3xl p-8 mb-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
          <div className="text-stone-300 text-[10px] font-bold font-ui uppercase tracking-wider mb-6 pb-3 border-b border-white/[0.05] flex items-center justify-between">
            <span>Global Route & Airline Directories</span>
            <span className="text-[9px] text-brand-orange font-normal lowercase tracking-normal">consolidator pools</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-stone-300 text-xs font-bold mb-4 font-display uppercase tracking-wider text-brand-orange font-ui">Flights to US Cities</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/40 font-sans">
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=JFK" className="hover:text-brand-orange transition-colors">New York (JFK)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LAX" className="hover:text-brand-orange transition-colors">Los Angeles (LAX)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=LAS" className="hover:text-brand-orange transition-colors">Las Vegas (LAS)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=MIA" className="hover:text-brand-orange transition-colors">Miami (MIA)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=MCO" className="hover:text-brand-orange transition-colors">Orlando (MCO)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=ORD&ar1=DFW" className="hover:text-brand-orange transition-colors">Dallas (DFW)</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-stone-300 text-xs font-bold mb-4 font-display uppercase tracking-wider text-brand-orange font-ui">Flights to Intl Cities</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/40 font-sans">
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR" className="hover:text-brand-orange transition-colors">London (LHR)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=CDG" className="hover:text-brand-orange transition-colors">Paris (CDG)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=NRT" className="hover:text-brand-orange transition-colors">Tokyo (NRT)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=FCO" className="hover:text-brand-orange transition-colors">Rome (FCO)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=CUN" className="hover:text-brand-orange transition-colors">Cancun (CUN)</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=SYD" className="hover:text-brand-orange transition-colors">Sydney (SYD)</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-stone-300 text-xs font-bold mb-4 font-display uppercase tracking-wider text-brand-orange font-ui">Popular Airlines</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/40 font-sans">
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=AA" className="hover:text-brand-orange transition-colors">American Airlines</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=UA" className="hover:text-brand-orange transition-colors">United Airlines</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=DL" className="hover:text-brand-orange transition-colors">Delta Air Lines</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=BA" className="hover:text-brand-orange transition-colors">British Airways</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=LH" className="hover:text-brand-orange transition-colors">Lufthansa</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=QR" className="hover:text-brand-orange transition-colors">Qatar Airways</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=EK" className="hover:text-brand-orange transition-colors">Emirates</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR&airline=SQ" className="hover:text-brand-orange transition-colors">Singapore Airlines</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tier 4: Pricing Disclaimers & Fine Print */}
        <div className="text-[10px] text-white/30 leading-relaxed mb-8 border-t border-white/[0.04] pt-8 text-center max-w-[850px] mx-auto font-sans">
          <p className="mb-2">
            * Fares listed are round-trip, include fuel surcharges, government taxes, and carrier-imposed fees. All ticket rates are subject to real-time seat availability, booking class limits, and date changes, and cannot be guaranteed until successfully ticketed by the partner airline desk.
          </p>
          <p>
            FlyEz is a registered independent travel seller. Unpublished offline fares and private consolidator discounts are driven by direct booking desk inventory and can vary by caller location and flight selection. Secure checkout utilizes industry-standard 256-bit SSL encryption keys.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.05] mb-8" />

        {/* Bottom Panel */}
        <div className="flex flex-wrap justify-between items-center gap-5 font-sans">
          <p className="text-xs text-white/45">
            &copy; {new Date().getFullYear()} FlyEz. All rights reserved. Registered travel provider.
          </p>
          
          {/* Custom Secured Payment Tokens */}
          <div className="flex gap-4 items-center">
            <span className="text-[9px] text-white/30 uppercase font-semibold tracking-wider font-ui">Secured booking via</span>
            
            <div className="flex gap-1.5">
              {["VISA", "MASTERCARD", "AMEX", "DISCOVER"].map((badge, index) => (
                <div 
                  key={index}
                  className="bg-[#050b16] border border-white/[0.06] text-[8px] font-mono text-white/40 py-1 px-2.5 rounded-md hover:border-brand-orange/40 hover:text-white transition-all duration-300 select-none cursor-default"
                >
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
