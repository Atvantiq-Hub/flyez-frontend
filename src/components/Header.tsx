'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
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

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <header
      className={`sticky top-0 z-[1000] py-4 transition-all duration-350 font-ui ${
        isSticky
          ? 'bg-white/92 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(11,26,48,0.05)]'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="premium-container flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-11 h-11 flex items-center justify-center">
            <svg width="38" height="38" viewBox="35 18 38 42" fill="none">
              {/* Blue "F" + Top Swoop */}
              <path d="M38 58 L38 37 C38 27, 48 22, 70 20 C60 26, 45 32, 43 37 L43 43 L57 43 L52 48 L43 48 L43 53 Z" fill="#2563eb" />
              {/* Orange Feathers */}
              <path d="M45 35.5 C50 35.5, 58 33, 71 23 C63 29, 56 32, 54 34 C58 34, 62 34, 66 34 C58 38, 50 40, 45 40.5 Z" fill="#ff5c00" />
            </svg>
          </div>
          <span className="text-2xl font-[800] font-ui tracking-tight text-brand-primary">
            Fly<span className="text-brand-orange">Ez</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <ul className="flex gap-7 text-[15px] font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className={`relative py-2 transition-colors duration-150 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-brand-accent after:transition-all after:duration-150 ${
                      isActive
                        ? 'text-brand-primary after:w-full'
                        : 'text-brand-text-muted hover:text-brand-primary after:w-0 hover:after:w-full'
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
        <div className="flex items-center gap-5">


          {/* SignIn CTA */}
          <a
            href="/login"
            className="hidden sm:flex items-center gap-2 py-2.5 px-5 rounded-md border-1.5 border-brand-accent text-brand-accent text-sm font-bold transition-all duration-350 hover:bg-brand-accent hover:text-white hover:-translate-y-0.5"
          >
            <User size={16} /> Sign In
          </a>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-sm bg-slate-50 border border-slate-200 text-brand-primary"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg py-5 px-6 flex flex-col gap-4 animate-[fadeIn_0.25s_ease] lg:hidden">
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
                        ? 'text-brand-orange' 
                        : 'text-brand-text-muted hover:text-brand-primary'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

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
