'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  /**
   * When true (default), the header floats transparently over a dark hero
   * banner and transitions to a solid white bar on scroll. Set to false for
   * pages without a dark hero directly beneath the nav (e.g. the login page),
   * where the header should render solid from the start.
   */
  overlay?: boolean;
}

export default function Header({ overlay = true }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transparent overlay applies only while floating over the hero (top of an
  // overlay page); once scrolled past the hero it flips to the solid bar.
  const transparent = overlay && !isSticky;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Business/First Class", href: "/business-first-class" },
    { name: "News & Insights", href: "/news-insights" },
    { name: "Events", href: "/events" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Talk to Us", href: "/contact" }
  ];

  return (
    <header
      className={`${overlay ? 'fixed top-0 left-0' : ''} w-full z-[1000] transition-all duration-500 font-ui ${
        transparent
          ? 'py-5 bg-slate-950/35 backdrop-blur-md border-b border-white/15 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]'
          : 'py-3 bg-white/90 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(7,14,27,0.12)]'
      }`}
    >
      {/* Soft top-down sheen inside the bar adds depth without losing the
          contained, defined-edge "panel" look (vs. fading into nothing) */}
      {transparent && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 to-transparent"
        />
      )}

      <div className="premium-container relative flex items-center justify-between gap-6">
        {/* Logo left-aligned */}
        <a href="/" className="flex items-center group shrink-0">
          <img
            src={transparent ? '/logo-white.png' : '/logo-small.gif'}
            alt="FlyEz Logo"
            className="h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center font-ui">
          <ul className="flex gap-7 xl:gap-9 text-[15px] xl:text-[16px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name} className="flex items-center">
                  <a
                    href={link.href}
                    className={`relative py-2 tracking-[0.01em] transition-colors duration-300 ${
                      transparent
                        ? isActive
                          ? 'text-white font-semibold'
                          : 'text-white/75 font-medium hover:text-white'
                        : isActive
                          ? 'text-brand-primary font-semibold'
                          : 'text-brand-primary/55 font-medium hover:text-brand-primary'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Widgets */}
        <div className="flex items-center gap-3">
          {/* Travel Specialist Call Widget */}
          <a
            href="tel:1800-521-4263"
            className={`hidden sm:flex items-center gap-2.5 py-1.5 pl-1.5 pr-4 rounded-full border transition-all duration-300 group ${
              transparent
                ? 'border-white/25 bg-white/10 backdrop-blur-md hover:border-white/45'
                : 'border-slate-200/80 bg-white hover:border-brand-orange/30 hover:shadow-[0_6px_20px_-8px_rgba(255,92,0,0.35)]'
            }`}
          >
            <img
              src="/grouptraveltelecaller.webp"
              alt="Travel Specialist"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-brand-orange/40 ring-offset-1 ring-offset-transparent"
            />
            <div className="flex flex-col font-ui text-left leading-none">
              <span className={`text-[9px] font-semibold uppercase tracking-[0.14em] mb-0.5 ${transparent ? 'text-white/70' : 'text-brand-text-muted'}`}>Talk to a Specialist</span>
              <span className={`text-[13px] font-semibold tracking-wide transition-colors group-hover:text-brand-orange ${transparent ? 'text-white' : 'text-brand-primary'}`}>1800-521-4263</span>
            </div>
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden p-2 rounded-lg border transition-colors ${
              transparent
                ? 'bg-white/10 border-white/25 text-white backdrop-blur-md hover:bg-white/20'
                : 'bg-slate-50 border-slate-200 text-brand-primary hover:bg-slate-100'
            }`}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-5 px-6 flex flex-col gap-4 animate-[fadeIn_0.25s_ease] lg:hidden z-[1001]">
          <ul className="flex flex-col gap-4 text-base font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`block py-1 transition-colors ${
                      isActive 
                        ? 'text-brand-orange font-bold' 
                        : 'text-black hover:text-brand-orange'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
          
          <div className="pt-4 border-t border-slate-100">
            <a
              href="tel:1800-521-4263"
              className="flex items-center justify-center gap-2 py-3 px-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-lg font-bold text-sm transition-colors"
            >
              <PhoneCall size={16} /> Call Expert: 1800-521-4263
            </a>
          </div>
        </div>
      )}

      {/* Embedded Animations */}
      <style jsx global>{`
        @keyframes agentPulse {
          0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1.1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
      `}</style>
    </header>
  );
}
