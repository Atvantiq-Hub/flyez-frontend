'use client';

import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      className="bg-gradient-to-b from-[#070e1b] to-[#03070f] text-white pt-20 pb-10 relative overflow-hidden border-t border-white/5"
    >
      {/* Dynamic Ambient Background Glow */}
      <div 
        className="absolute bottom-[-10%] left-[5%] w-[35%] h-[60%] rounded-full bg-radial from-brand-accent/8 to-transparent pointer-events-none"
      />

      <div className="premium-container relative z-10">
        
        {/* Main Grid: 4-Column Structured Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          
          {/* Column 1: Brand Info & Socials */}
          <div className="flex flex-col gap-5">
            <a href="/" className="flex items-center gap-2.5 group">
              <img 
                src="/logo-small.gif" 
                alt="FlyEz Logo" 
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-108" 
              />
              <span className="text-xl font-[800] font-display text-white tracking-tight">
                Fly<span className="text-brand-orange">Ez</span>
              </span>
            </a>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-sans">
              Unlock unbeatable rates on global flights. We combine direct GDS integrations with exclusive offline consolidator contracts to offer private, unpublished fares.
            </p>
            
            {/* Social Connections */}
            <div className="flex gap-2.5 mt-2">
              {[
                {
                  href: "#",
                  path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"
                },
                {
                  href: "#",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                },
                {
                  href: "#",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"
                },
                {
                  href: "#",
                  path: "M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-orange hover:bg-white/10 hover:border-brand-orange/30 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-6">
            <h4 className="text-white text-xs font-bold mb-5 font-display uppercase tracking-[0.2em] font-ui">
              Company
            </h4>
            <ul className="flex flex-col gap-3 text-[13.5px] text-white/65 font-sans">
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
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white text-xs font-bold mb-5 font-display uppercase tracking-[0.2em] font-ui">
              Support 24/7
            </h4>
            <ul className="flex flex-col gap-4 text-[13px] text-white/65 font-sans">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-brand-orange flex-shrink-0" />
                <a href="tel:1800-521-4263" className="hover:text-white font-bold transition-colors duration-200">1800-521-4263</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-brand-orange flex-shrink-0" />
                <a href="mailto:help@flyez.ai" className="hover:text-white transition-colors duration-200">help@flyez.ai</a>
              </li>
              <li className="flex items-start gap-2.5 leading-relaxed">
                <MapPin size={14} className="text-brand-orange flex-shrink-0 mt-0.5" />
                <span>USA Flight Reservation Center, 120 Sansome St, San Francisco, CA 94104</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Mobile App Store Badges */}
          <div>
            <h4 className="text-white text-xs font-bold mb-5 font-display uppercase tracking-[0.2em] font-ui">
              Exclusive Deals
            </h4>
            <p className="text-white/60 text-[13px] mb-4 leading-relaxed font-sans">
              Subscribe to get secret discount codes and unpublished flight offers.
            </p>
            <form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex bg-white/5 border border-white/10 rounded-xl p-1 w-full transition-all duration-300 focus-within:border-brand-orange focus-within:bg-white/8 focus-within:shadow-[0_0_15px_rgba(255,92,0,0.15)] mb-5"
            >
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-transparent border-none outline-none text-white text-xs py-2 px-3 w-[60%] placeholder-white/30"
              />
              <button 
                type="submit" 
                className="bg-brand-orange text-white rounded-lg w-8 h-8 flex items-center justify-center transition-all duration-300 hover:bg-brand-orange-hover"
              >
                <Send size={13} className="text-white" />
              </button>
            </form>

            {/* Mobile App Store Badges */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider font-ui">FlyEz Mobile App</span>
              <div className="flex gap-2">
                <a href="#" className="flex items-center gap-1.5 px-2 py-1 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-lg transition-all text-left group">
                  <svg className="w-3.5 h-3.5 fill-current text-white/70 group-hover:text-white" viewBox="0 0 24 24">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C3.79 16.41 3.52 9.38 8.16 9.12c1.37.07 2.27.79 3.03.8 1.15-.02 2.27-.92 3.82-.77 1.62.15 2.82.78 3.54 1.84-3.3 1.98-2.77 6.17.53 7.5-1.04 2.5-1.97 5.02-1.97 7.79z M12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.2 2.5-2.06 4.38-3.74 4.25z" />
                  </svg>
                  <div>
                    <div className="text-[6px] text-white/40 uppercase font-medium leading-none">Download on</div>
                    <div className="text-[9px] font-bold leading-tight mt-0.5">App Store</div>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-1.5 px-2 py-1 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 rounded-lg transition-all text-left group">
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

        </div>

        {/* Directory Well: Premium Grouped Visual Box */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 lg:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h5 className="text-white text-xs font-bold mb-4 font-display uppercase tracking-wider text-brand-orange font-ui">Flights to US Cities</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/45 font-sans">
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=JFK" className="hover:text-brand-orange transition-colors">Flights to New York</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LAX" className="hover:text-brand-orange transition-colors">Flights to Los Angeles</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=LAS" className="hover:text-brand-orange transition-colors">Flights to Las Vegas</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=MIA" className="hover:text-brand-orange transition-colors">Flights to Miami</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=MCO" className="hover:text-brand-orange transition-colors">Flights to Orlando</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=ORD&ar1=DFW" className="hover:text-brand-orange transition-colors">Flights to Dallas</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white text-xs font-bold mb-4 font-display uppercase tracking-wider text-brand-orange font-ui">Flights to Intl Cities</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/45 font-sans">
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=LHR" className="hover:text-brand-orange transition-colors">Flights to London</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=CDG" className="hover:text-brand-orange transition-colors">Flights to Paris</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=NRT" className="hover:text-brand-orange transition-colors">Flights to Tokyo</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=FCO" className="hover:text-brand-orange transition-colors">Flights to Rome</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=JFK&ar1=CUN" className="hover:text-brand-orange transition-colors">Flights to Cancun</a></li>
                <li><a href="/flights?tp=round&couch=E&d1=LAX&ar1=SYD" className="hover:text-brand-orange transition-colors">Flights to Sydney</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white text-xs font-bold mb-4 font-display uppercase tracking-wider text-brand-orange font-ui">Popular Airlines</h5>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-white/45 font-sans">
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

        {/* Pricing Disclaimers / Legal Fine Print */}
        <div className="text-[10px] text-white/30 leading-relaxed mb-8 border-t border-white/5 pt-8 text-center max-w-[850px] mx-auto font-sans">
          <p className="mb-2">
            * Fares listed are round-trip, include fuel surcharges, government taxes, and carrier-imposed fees. All ticket rates are subject to real-time seat availability, booking class limits, and date changes, and cannot be guaranteed until successfully ticketed by the partner airline desk.
          </p>
          <p>
            FlyEz is a registered independent travel seller. Unpublished offline fares and private consolidator discounts are driven by direct booking desk inventory and can vary by caller location and flight selection. Secure checkout utilizes industry-standard 256-bit SSL encryption keys.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mb-8" />

        {/* Bottom Panel */}
        <div className="flex flex-wrap justify-between items-center gap-5 font-sans">
          <p className="text-xs text-white/45">
            &copy; {new Date().getFullYear()} FlyEz. All rights reserved. Registered travel provider.
          </p>
          
          {/* Payment Badges */}
          <div className="flex gap-3.5 items-center">
            <span className="text-[10px] text-white/35 uppercase font-semibold tracking-wider font-ui">Secured booking via</span>
            
            <div className="flex gap-2">
              {["VISA", "MC", "AMEX", "DISC"].map((badge, index) => (
                <div 
                  key={index}
                  className="w-11 h-6 bg-white/3 border border-white/10 rounded-md flex items-center justify-center text-[9px] font-semibold tracking-wide text-white/55 transition-all duration-300 hover:text-white hover:-translate-y-0.5 hover:bg-white/6 hover:border-white/25 select-none"
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
