'use client';

import React from 'react';
import { Compass, Sparkles, Heart, Award, Phone, CheckCircle, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import dynamic from 'next/dynamic';
const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

interface Pillar {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  bg: string;
  glow: string;
}

export default function About() {
  const pillars: Pillar[] = [
    {
      number: "01",
      title: "Intelligent AI Routing",
      desc: "Our platform processes millions of GDS data nodes to match your routing requirements with flight segments at consolidated prices in seconds.",
      icon: <Compass size={24} />,
      color: "#2563eb",
      bg: "bg-blue-50 dark:bg-blue-500/10 text-brand-accent",
      glow: "rgba(37, 99, 235, 0.15)"
    },
    {
      number: "02",
      title: "24/7 Human Experts",
      desc: "We back our technology with live ticketing support, allowing you to secure unpublished private airline deals via phone line anytime.",
      icon: <Sparkles size={24} />,
      color: "#ff5c00",
      bg: "bg-orange-50 dark:bg-orange-500/10 text-brand-orange",
      glow: "rgba(255, 92, 0, 0.15)"
    },
    {
      number: "03",
      title: "Sustainable Aviation",
      desc: "We collaborate with carrier alliances to emphasize eco-friendly routes, carbon offsets, and partners committed to sustainable fuels.",
      icon: <Heart size={24} />,
      color: "#10b981",
      bg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Consistant Layout Components */}
      <PromoAlert />
      <Header />

      {/* About Hero Section */}
      <section className="relative py-32 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
        {/* Background Image overlay with parallax zoom effect */}
        <motion.div
          initial={{ scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop")'
          }}
        />

        {/* Navy linear overlay to ensure contrast */}
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
            Your Trusted Flight Companion
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-tight tracking-tight"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Discover the FlyEz Story
          </motion.h1>
        </div>
      </section>

      {/* Main Content Details */}
      <main className="flex-1 pb-16">
        
        {/* Intro Block: Asymmetric Layout */}
        <section className="py-24">
          <div className="premium-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Visual Stats Panel */}
              <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 p-8 rounded-3xl shadow-sm relative overflow-hidden group"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-accent/5 rounded-full blur-2xl group-hover:bg-brand-accent/8 transition-colors duration-500" />
                  
                  <h3 className="text-xl font-display font-black text-brand-primary dark:text-white mb-6 border-b border-brand-border dark:border-gray-800 pb-3 flex items-center gap-2">
                    <Shield size={18} className="text-brand-orange" /> FlyEz Registry
                  </h3>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="block text-3xl font-extrabold text-brand-accent">190+</span>
                      <span className="block text-xs text-brand-text-muted dark:text-gray-400 font-bold mt-1">Countries Connected</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-extrabold text-brand-orange">400+</span>
                      <span className="block text-xs text-brand-text-muted dark:text-gray-400 font-bold mt-1">Global Airlines</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-extrabold text-emerald-500">24/7</span>
                      <span className="block text-xs text-brand-text-muted dark:text-gray-400 font-bold mt-1">Live Ticketing</span>
                    </div>
                    <div>
                      <span className="block text-3xl font-extrabold text-indigo-500">100%</span>
                      <span className="block text-xs text-brand-text-muted dark:text-gray-400 font-bold mt-1">Secure Clearance</span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Narrative Content */}
              <div className="lg:col-span-7 flex flex-col gap-6 order-1 lg:order-2">
                <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-flex items-center gap-2">
                  <Award size={14} /> Who We Are
                </span>
                <h2 className="text-3xl lg:text-4xl font-display font-black text-brand-primary dark:text-white leading-tight tracking-tight">
                  Welcome to FLYEZ.ai!
                </h2>
                
                <div className="flex flex-col gap-4 text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed">
                  <p>
                    At FLYEZ.ai, we are dedicated to revolutionizing the way people experience air travel. Our mission is to provide seamless, efficient, and personalized travel solutions, making your journey enjoyable from start to finish.
                  </p>
                  <p>
                    We understand that planning a trip can be a complex and time-consuming process. That's why we've developed an advanced platform that coordinates your travel details, giving you more time to focus on creating memories.
                  </p>
                  <p>
                    With our cutting-edge technology and GDS connections, we provide you with tailored flight options, airline consolidator rates, and curated itineraries that suit your preferences and budget.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pillars Section: Standardized Cards */}
        <section className="py-20 bg-white dark:bg-brand-primary border-t border-b border-brand-border dark:border-gray-800">
          <div className="premium-container">
            <div className="text-center mb-16">
              <span className="text-xs font-extrabold text-brand-orange uppercase tracking-widest block mb-2.5">
                Our Core Competency
              </span>
              <h2 className="text-3xl lg:text-4xl font-display font-black text-brand-primary dark:text-white">
                How We Deliver Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pillars.map((p, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ 
                    y: -8, 
                    borderColor: p.color,
                    boxShadow: `0 12px 30px rgba(7, 14, 27, 0.04), 0 0 15px ${p.glow}` 
                  }}
                  className="relative flex flex-col justify-between p-6 rounded-2xl bg-slate-50 dark:bg-brand-primary-light border border-brand-border dark:border-gray-800 shadow-sm transition-all duration-300 group cursor-pointer overflow-hidden min-h-[260px]"
                >
                  {/* Dynamic Brand Color Top Edge Anchor */}
                  <div className="absolute top-0 inset-x-0 h-1 transition-transform duration-300 group-hover:scale-x-110" style={{ backgroundColor: p.color }} />

                  {/* Animated Background Number Watermark */}
                  <div className="absolute right-6 bottom-[-15px] text-[80px] font-display font-black text-brand-primary/[0.02] dark:text-white/[0.01] select-none pointer-events-none transition-all duration-500 group-hover:scale-108 group-hover:text-brand-primary/[0.04] dark:group-hover:text-white/[0.02]">
                    {p.number}
                  </div>

                  {/* Icon and content */}
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[6deg] ${p.bg}`}>
                      {p.icon}
                    </div>
                    <h4 className="text-lg font-display font-black text-brand-primary dark:text-white mb-2.5">
                      {p.title}
                    </h4>
                    <p className="text-brand-text-muted dark:text-gray-400 text-xs md:text-sm leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call Banner */}
        <section className="pt-20">
          <div className="premium-container">
            <div className="relative overflow-hidden bg-gradient-to-r from-brand-primary to-brand-primary-light dark:from-brand-primary-light dark:to-[#1e293b] rounded-2xl p-9 md:p-10 border border-white/8 dark:border-gray-800 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 z-10">
                <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-brand-orange shadow-[0_0_15px_rgba(255,92,0,0.3)] shrink-0 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://flyez.ai/assets/img/grouptraveltelecaller.webp" alt="telecaller" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white text-2xl font-display font-black tracking-tight mb-1.5">
                    Looking for Unpublished Private Fares?
                  </h3>
                  <p className="text-white/75 text-sm md:text-base max-w-2xl leading-relaxed">
                    Our offline ticketing desk provides discount rates on popular international routes. Give our travel specialists a call 24/7.
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
                className="bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white px-8 py-4 rounded-md font-extrabold text-base flex items-center justify-center gap-2.5 z-10 shrink-0 self-stretch md:self-start lg:self-auto cursor-pointer shadow-[0_4px_12px_rgba(255,92,0,0.25)]"
              >
                <Phone size={18} fill="currentColor" /> Call 1-800-521-4263
              </motion.a>
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
