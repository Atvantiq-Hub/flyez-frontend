'use client';

import React, { useState, useEffect } from 'react';
import { Shield, FileText, Lock, Eye, AlertCircle, Phone, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import Ticker from '@/features/marketing/components/Ticker';
import dynamic from 'next/dynamic';
const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

interface Section {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  glow: string;
  content: React.ReactNode;
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('overview');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const mobileNavRef = React.useRef<HTMLDivElement>(null);

  const sections: Section[] = [
    {
      id: "overview",
      number: "00",
      title: "Policy Overview",
      icon: <FileText size={16} />,
      color: "#2563eb",
      bg: "bg-blue-50 dark:bg-blue-500/10 text-brand-accent",
      glow: "rgba(37, 99, 235, 0.12)",
      content: (
        <>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            At FLYEZ.ai, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and disclose the information you provide to us when using our website and services.
          </p>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
            By accessing or using FLYEZ.ai, you acknowledge and agree to the terms and conditions of this Privacy Policy. If you do not agree with any aspect of this policy, please do not use our website or services.
          </p>
        </>
      )
    },
    {
      id: "collect",
      number: "01",
      title: "Information We Collect",
      icon: <Eye size={16} />,
      color: "#ff5c00",
      bg: "bg-orange-50 dark:bg-orange-500/10 text-brand-orange",
      glow: "rgba(255, 92, 0, 0.12)",
      content: (
        <>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            Any details you share with us, whether through our website or communication channels (telephone, email, fax), will be collected and stored. This includes personally identifiable information such as:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4 text-xs md:text-sm font-bold text-brand-primary dark:text-white">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> First and last name
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Phone number and email address
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Mailing and billing addresses
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" /> Payment credit card details
            </li>
          </ul>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
            We may also collect travel preferences (meal choices, seat preferences, frequent flyer/hotel/car rental details). While providing this info is optional, it is typically required to complete reservations.
          </p>
        </>
      )
    },
    {
      id: "passenger",
      number: "02",
      title: "Passenger Information",
      icon: <Shield size={16} />,
      color: "#10b981",
      bg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "rgba(16, 185, 129, 0.12)",
      content: (
        <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
          When arranging travel for someone else using FLYEZ, we will request personal details and travel preferences about that person. You must seek their consent before sharing their information with us. You will be the only one with access to view or modify their info through your account.
        </p>
      )
    },
    {
      id: "third-party",
      number: "03",
      title: "Log Data & Demographics",
      icon: <FileText size={16} />,
      color: "#8b5cf6",
      bg: "bg-purple-50 dark:bg-purple-500/10 text-purple-600",
      glow: "rgba(139, 92, 246, 0.12)",
      content: (
        <>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            We occasionally acquire information about you from independent business partners and third-party sources. This includes updated delivery/address details to rectify records, and demographic information to help us understand purchasing preferences.
          </p>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
            We automatically collect standard Log Data when you visit: IP address, browser type, operating system, referring URLs, pages viewed, and access timestamps to analyze trends and improve services.
          </p>
        </>
      )
    },
    {
      id: "cookies",
      number: "04",
      title: "Cookies & Tracking",
      icon: <Lock size={16} />,
      color: "#ec4899",
      bg: "bg-pink-50 dark:bg-pink-500/10 text-pink-600",
      glow: "rgba(236, 72, 153, 0.12)",
      content: (
        <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
          We use cookies and tracking technologies to enhance your experience, remember preferences, analyze usage patterns, and deliver personalized content. You can manage your cookie preferences directly in your browser settings.
        </p>
      )
    },
    {
      id: "sharing",
      number: "05",
      title: "Information Sharing",
      icon: <Shield size={16} />,
      color: "#06b6d4",
      bg: "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600",
      glow: "rgba(6, 182, 212, 0.12)",
      content: (
        <>
          <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed mb-4">
            We share your information strictly under the following channels:
          </p>
          <ul className="flex flex-col gap-3.5 text-brand-text-muted dark:text-gray-400 text-xs md:text-sm">
            <li className="flex gap-2">
              <span className="text-brand-orange font-black shrink-0">•</span>
              <span><strong>Suppliers:</strong> Hotels, airlines, cruise lines, and car rental companies that fulfill reservations. We restrict their use of your information to that specific purpose.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-orange font-black shrink-0">•</span>
              <span><strong>Third-party vendors:</strong> Partners processing credit cards, customer service, marketing, or fraud prevention. They are not allowed to use information for any other purpose.</span>
            </li>
            <li className="flex gap-2">
              <span className="text-brand-orange font-black shrink-0">•</span>
              <span><strong>Legal requirements:</strong> Disclosures required by law or to protect our rights, safety, and compliance with civil legal demands.</span>
            </li>
          </ul>
        </>
      )
    },
    {
      id: "security",
      number: "06",
      title: "Data Security",
      icon: <Lock size={16} />,
      color: "#3b82f6",
      bg: "bg-blue-50 dark:bg-blue-500/10 text-blue-600",
      glow: "rgba(59, 130, 246, 0.12)",
      content: (
        <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
          We employ industry-standard encryption and security measures to protect the information we collect. However, no transmission method over the internet or database storage is 100% secure. While we use commercially acceptable protections, we cannot guarantee absolute security.
        </p>
      )
    },
    {
      id: "rights",
      number: "07",
      title: "Access & Rights",
      icon: <Award size={16} />,
      color: "#cca353",
      bg: "bg-amber-50 dark:bg-amber-500/10 text-amber-600",
      glow: "rgba(204, 163, 83, 0.12)",
      content: (
        <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
          You have the right to access and correct the personal information we hold about you. You can update your details by logging into your profile or by contacting our help desk directly. You can also opt-out of promotional communications by clicking the unsubscribe link.
        </p>
      )
    },
    {
      id: "children",
      number: "08",
      title: "Children's Privacy",
      icon: <Shield size={16} />,
      color: "#f59e0b",
      bg: "bg-yellow-50 dark:bg-yellow-500/10 text-yellow-600",
      glow: "rgba(245, 158, 11, 0.12)",
      content: (
        <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
          FLYEZ has strict policies regarding minors below the age of 16. Minors are not authorized to transact or book directly with us. Parents or legal guardians must complete all flight bookings and reservations, ensuring correct supervision and adult legal consent.
        </p>
      )
    },
    {
      id: "billing",
      number: "09",
      title: "Billing & Card Safety",
      icon: <AlertCircle size={16} />,
      color: "#ef4444",
      bg: "bg-red-50 dark:bg-red-500/10 text-red-600",
      glow: "rgba(239, 68, 68, 0.12)",
      content: (
        <div className="bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
          <p className="text-brand-text-muted dark:text-gray-300 text-xs md:text-sm leading-relaxed mb-3">
            FLYEZ prioritizes the security of your payment details. **We advise customers never to submit secondary payments after receiving their finalized e-ticket confirmation.**
          </p>
          <p className="text-brand-text-muted dark:text-gray-300 text-xs md:text-sm leading-relaxed">
            If you receive communications requesting gift cards or extra fees, validate authenticity immediately by checking that emails originate exclusively from our official domain: <strong className="text-brand-primary dark:text-white">www.FLYEZ.ai</strong>.
          </p>
        </div>
      )
    }
  ];

  // ScrollSpy listener to automatically update active sidebar section on scroll, scroll progress and mobile nav visibility
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -55% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) observer.observe(element);
    });

    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollHeight > 0) {
        const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / totalScrollHeight) * 100)));
        setScrollProgress(pct);
      }
      
      if (window.scrollY > 340) {
        setShowMobileNav(true);
      } else {
        setShowMobileNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      sections.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  // Center active mobile index item when activeSection changes
  useEffect(() => {
    if (showMobileNav && mobileNavRef.current) {
      const container = mobileNavRef.current;
      const activeEl = container.querySelector('[data-active="true"]') as HTMLElement;
      if (activeEl) {
        const scrollLeft = activeEl.offsetLeft - container.offsetWidth / 2 + activeEl.offsetWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeSection, showMobileNav]);

  const handleScrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 135;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const activeIndex = sections.findIndex(sec => sec.id === activeSection);
  const currentActiveSecObj = sections[activeIndex] || sections[0];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Sticky Header Bar (Promo Alert + Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        <PromoAlert />
        <Header />
        <Ticker />
      </div>

      {/* Hero Banner */}
      <section className="relative py-28 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop")'
          }}
        />
        <div 
          className="absolute inset-0 z-1" 
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.25) 0%, rgba(7, 14, 27, 0.4) 50%, rgba(7, 14, 27, 0.75) 100%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_60%)] z-1" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#ffffff_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-1" />

        <div className="premium-container relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-block mb-3.5"
            style={{ textShadow: '0 1px 2px rgba(7, 14, 27, 0.4)' }}
          >
            Securing Your Travel Data
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold italic text-white leading-tight tracking-tight"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Privacy Policy
          </motion.h1>
        </div>
      </section>

      {/* Sticky Mobile Nav Slider */}
      <AnimatePresence>
        {showMobileNav && (
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            ref={mobileNavRef}
            className="sticky top-[77px] z-[999] lg:hidden w-full bg-white/95 dark:bg-brand-primary-light/95 backdrop-blur-md border-b border-slate-200/80 dark:border-gray-800/80 shadow-[0_4px_12px_rgba(7,14,27,0.03)] py-3 px-4 overflow-x-auto scrollbar-none flex gap-2.5"
          >
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  data-active={isActive ? "true" : "false"}
                  onClick={() => handleScrollTo(sec.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-350 cursor-pointer border ${
                    isActive
                      ? 'bg-brand-accent text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] border-brand-accent'
                      : 'bg-slate-100 dark:bg-brand-primary-light/60 text-brand-text-muted hover:text-brand-primary dark:hover:text-white border-slate-200/50 dark:border-gray-800'
                  }`}
                >
                  <span className="shrink-0" style={{ color: isActive ? '#fff' : sec.color }}>
                    {sec.icon}
                  </span>
                  <span>{sec.title}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Grid Content */}
      <main className="flex-1 py-16">
        <div className="premium-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sticky Sidebar Navigation (4 cols) */}
            <div 
              className="hidden lg:block lg:col-span-4 sticky top-28 backdrop-blur-2xl border border-white/20 dark:border-gray-800/60 p-6 rounded-3xl transition-all duration-500 z-30 overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.45)',
                boxShadow: `0 30px 60px -15px rgba(7, 14, 27, 0.05), 0 0 45px -15px ${currentActiveSecObj.color}20`
              }}
            >
              {/* Dark mode background adjustment */}
              <div className="absolute inset-0 bg-white/40 dark:bg-brand-primary-light/10 -z-30 pointer-events-none" />
              
              {/* Dynamic glowing ambient spheres */}
              <div 
                className="absolute -right-20 -top-20 w-44 h-44 rounded-full blur-[80px] opacity-10 dark:opacity-20 transition-all duration-700 pointer-events-none -z-20" 
                style={{ backgroundColor: currentActiveSecObj.color }}
              />
              <div 
                className="absolute -left-20 -bottom-20 w-36 h-36 rounded-full blur-[70px] opacity-5 dark:opacity-15 transition-all duration-700 pointer-events-none -z-20" 
                style={{ backgroundColor: currentActiveSecObj.color }}
              />
              
              {/* Flight Dashboard Header with scroll progress ring */}
              <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-200/50 dark:border-gray-800/60 relative z-10">
                <div className="relative w-11 h-11 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle 
                      cx="18" 
                      cy="18" 
                      r="15" 
                      fill="none" 
                      className="stroke-slate-200/60 dark:stroke-gray-800/80" 
                      strokeWidth="2.5" 
                    />
                    <motion.circle 
                      cx="18" 
                      cy="18" 
                      r="15" 
                      fill="none" 
                      stroke={currentActiveSecObj.color} 
                      strokeWidth="2.5" 
                      strokeDasharray="94.2" 
                      strokeDashoffset={94.2 - (94.2 * scrollProgress) / 100} 
                      strokeLinecap="round" 
                      transition={{ type: "spring", stiffness: 85, damping: 18 }}
                    />
                  </svg>
                  <span className="absolute text-[8px] font-mono font-bold text-brand-primary dark:text-white">
                    {scrollProgress}%
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center gap-1.5 mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Flight Plan
                  </span>
                  <h4 className="text-sm font-display font-semibold text-brand-primary dark:text-white">
                    Privacy Directory
                  </h4>
                </div>
              </div>

              <div className="relative flex flex-col gap-1.5">
                {/* Vertical timeline connector line */}
                <div className="absolute left-[33px] top-4 bottom-4 w-[2px] bg-slate-100 dark:bg-gray-800/40 z-0 pointer-events-none" />

                {/* Active Neon Segment Tracker */}
                <motion.div 
                  className="absolute left-[33px] w-[2px] rounded-full z-1 pointer-events-none"
                  initial={false}
                  animate={{
                    top: `${activeIndex * 48 + 22}px`,
                    height: '24px',
                  }}
                  style={{
                    backgroundColor: currentActiveSecObj.color,
                    boxShadow: `0 0 8px ${currentActiveSecObj.color}`
                  }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />

                {sections.map((sec) => {
                  const isActive = activeSection === sec.id;
                  return (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollTo(sec.id)}
                      onMouseEnter={() => setHoveredSection(sec.id)}
                      onMouseLeave={() => setHoveredSection(null)}
                      className={`relative flex items-center gap-4 px-4 py-2.5 rounded-2xl text-left transition-all duration-300 group cursor-pointer w-full z-10 ${
                        isActive
                          ? 'text-brand-primary dark:text-white font-black'
                          : 'text-brand-text-muted hover:text-brand-primary dark:hover:text-white font-medium'
                      }`}
                    >
                      {/* Active Background Pill with Framer Motion layoutId */}
                      {isActive && (
                        <motion.div
                          layoutId="activePill"
                          className="absolute inset-0 bg-slate-100/90 dark:bg-brand-primary rounded-2xl -z-10 border border-slate-200/50 dark:border-gray-800"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          style={{
                            boxShadow: `0 8px 24px -6px rgba(7, 14, 27, 0.04), 0 0 10px ${sec.glow}`
                          }}
                        />
                      )}

                      {/* Hover Pill Background */}
                      {hoveredSection === sec.id && !isActive && (
                        <motion.div
                          layoutId="hoverPill"
                          className="absolute inset-0 bg-slate-100/40 dark:bg-white/5 rounded-2xl -z-10 border border-slate-100/30 dark:border-white/5"
                          transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        />
                      )}

                      {/* Timeline Dot / Icon wrapper */}
                      <div 
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 z-10 transition-all duration-300 group-hover:scale-105 group-hover:rotate-[6deg] ${
                          isActive 
                            ? 'bg-white dark:bg-brand-primary shadow-sm' 
                            : sec.bg
                        }`}
                        style={{
                          color: isActive ? sec.color : undefined,
                          boxShadow: isActive ? `0 0 10px ${sec.glow}` : undefined
                        }}
                      >
                        {sec.icon}
                      </div>

                      {/* Title & Number */}
                      <div className="flex-1 flex items-center justify-between z-10 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-xs tracking-tight">{sec.title}</span>
                        <span className="text-[10px] font-mono opacity-40 dark:opacity-60 group-hover:opacity-80 transition-opacity">
                          {sec.number}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Display (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              <div className="flex items-center justify-between border-b border-brand-border dark:border-gray-800 pb-4 mb-4">
                <span className="text-xs font-bold text-brand-text-muted dark:text-gray-400">
                  Effective Date: June 5, 2023
                </span>
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={14} /> PCI-DSS Secure
                </span>
              </div>

              {sections.map((sec) => {
                const isCardActive = activeSection === sec.id;
                return (
                  <motion.div
                    id={sec.id}
                    key={sec.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className={`relative p-8 rounded-3xl bg-white dark:bg-brand-primary-light border transition-all duration-500 overflow-hidden ${
                      isCardActive
                        ? 'border-slate-300 dark:border-slate-700/80 shadow-[0_20px_40px_rgba(7,14,27,0.06)] animate-pulse-glow'
                        : 'border-brand-border dark:border-gray-800/80 shadow-sm'
                    }`}
                  >
                    {/* Glow border overlay when active */}
                    {isCardActive && (
                      <div 
                        className="absolute inset-0 border border-double rounded-3xl pointer-events-none transition-all duration-500 z-20" 
                        style={{ borderColor: sec.color, opacity: 0.15 }}
                      />
                    )}

                    {/* Dynamic Color top anchor line */}
                    <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: sec.color }} />

                    {/* Watermark Background Number */}
                    <div className="absolute right-6 bottom-[-15px] text-[95px] font-display font-semibold text-brand-primary/[0.02] dark:text-white/[0.01] select-none pointer-events-none z-0 transition-opacity duration-500"
                      style={{ opacity: isCardActive ? 0.08 : 0.02 }}
                    >
                      {sec.number}
                    </div>

                    {/* Header Title with Icon */}
                    <div className="relative z-10 flex items-center gap-3.5 mb-5 border-b border-brand-border dark:border-gray-800/60 pb-4">
                      <div className={`p-2.5 rounded-xl shrink-0 transition-transform duration-500 ${sec.bg} ${isCardActive ? 'scale-105 rotate-3' : ''}`}>
                        {sec.icon}
                      </div>
                      <h3 className="text-xl font-display font-semibold text-brand-primary dark:text-white tracking-tight leading-none">
                        {sec.title}
                      </h3>
                    </div>

                    {/* Body Content */}
                    <div className="relative z-10">
                      {sec.content}
                    </div>
                  </motion.div>
                );
              })}

              {/* Call Hotline Banner */}
              <div className="relative overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary-light dark:from-brand-primary-light dark:to-[#1e293b] rounded-2xl p-9 border border-white/8 dark:border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-4">
                <div className="flex items-center gap-4 z-10">
                  <div className="p-3 bg-white/10 rounded-full text-brand-orange shadow-[0_0_15px_rgba(255,92,0,0.3)] shrink-0">
                    <Phone size={20} className="fill-current text-brand-orange" />
                  </div>
                  <div>
                    <h4 className="text-white text-xl font-display font-semibold tracking-tight mb-1">
                      Need Immediate Assistance?
                    </h4>
                    <p className="text-white/70 text-xs md:text-sm">
                      Our secure ticketing desk is available 24/7. Call us for instant bookings or changes.
                    </p>
                  </div>
                </div>
                <a 
                  href="tel:1800-521-4263"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-extrabold px-6 py-3.5 rounded-xl text-center shadow-glow transition-all whitespace-nowrap shrink-0 z-10"
                >
                  Call Toll-Free 1800-521-4263
                </a>
              </div>

            </div>

          </div>
        </div>
      </main>

      <TravelGptChat />
      <Footer />
    </div>
  );
}
