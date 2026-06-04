'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Plane } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubscriptionBanner() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-brand-primary border-t border-b border-white/5 relative overflow-hidden">
      
      {/* Dynamic Ambient Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[140%] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[140%] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,92,0,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="premium-container relative z-10">
        
        {/* High-Energy Glassmorphic Subscription Card */}
        <motion.div 
          whileHover={{ y: -4, borderColor: 'rgba(255, 255, 255, 0.15)', boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), 0 0 50px rgba(37, 99, 235, 0.12)' }}
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          className="relative bg-[#0d1b3e]/45 backdrop-blur-xl border border-white/8 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-[0_30px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(37,99,235,0.08)]"
        >
          {/* Decorative Flight Trail SVG Layer */}
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden z-0">
            <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none" preserveAspectRatio="none">
              <path d="M-50,220 C150,180 350,260 550,140 C650,80 750,120 850,50" stroke="#ff5c00" strokeWidth="2.5" strokeDasharray="6 6" />
            </svg>
          </div>

          {/* Left: Travel Visual Gradient Panel with canyon background */}
          <div 
            className="relative bg-cover bg-center p-10 md:p-12 text-white flex flex-col justify-center min-h-[300px] border-b md:border-b-0 md:border-r border-white/8 z-10"
            style={{
              backgroundImage: 'linear-gradient(135deg, rgba(7, 14, 27, 0.75) 0%, rgba(37, 99, 235, 0.45) 100%), url("https://flyez.ai/assets/img/slider-bg-img.webp")'
            }}
          >
            {/* Flying Mini Plane Icon */}
            <motion.div 
              animate={{ 
                y: [0, -6, 0],
                rotate: [45, 48, 45]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-6 right-10 text-brand-orange opacity-80"
            >
              <Plane size={24} />
            </motion.div>

            <span className="text-[10px] text-brand-orange uppercase font-extrabold tracking-[3px] block mb-3">
              VIP Fare Alerts
            </span>
            <h3 className="text-white text-3xl font-display font-black mb-5 leading-tight tracking-tight">
              Your Next Journey Starts Here
            </h3>
            <ul className="flex flex-col gap-3.5 text-sm opacity-95">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-brand-orange shrink-0" /> 
                <span>Unpublished private flight rate drops</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 size={18} className="text-brand-orange shrink-0" /> 
                <span>Secret airline discounts directly in your inbox</span>
              </li>
            </ul>
          </div>

          {/* Right: Email Signup Form */}
          <div className="p-10 md:p-12 flex flex-col justify-center z-10 bg-brand-primary-light/10">
            <h4 className="text-white text-2xl font-display font-black mb-2 tracking-tight">
              Unlock Member-Only Deals
            </h4>
            <p className="text-white/70 text-sm mb-8 leading-relaxed">
              Join the FlyEz newsletter and receive exclusive flight promotional codes and flash travel warnings.
            </p>
            
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-5 rounded-xl bg-brand-success/12 border border-dashed border-brand-success/40 text-brand-success text-sm font-bold text-center shadow-[0_10px_20px_rgba(16,185,129,0.05)]"
                >
                  ✓ Subscription Successful! Watch your inbox.
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubscribe}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center bg-white/3 hover:bg-white/5 border border-white/10 focus-within:border-brand-orange focus-within:bg-white/6 focus-within:shadow-[0_0_20px_rgba(255,92,0,0.3)] rounded-xl sm:rounded-full p-2 transition-all duration-300 gap-2"
                >
                  <div className="flex items-center gap-3 flex-1 px-4 py-2 sm:py-0">
                    <Mail size={18} className="text-white/45" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent border-0 outline-none text-sm text-white placeholder-white/45 py-2"
                    />
                  </div>
                  
                  <motion.button 
                    type="submit"
                    whileHover={{ scale: 1.02, backgroundColor: '#e05200' }}
                    whileTap={{ scale: 0.98 }}
                    className="px-7 py-3 rounded-lg sm:rounded-full bg-brand-orange text-white font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_12px_rgba(255,92,0,0.25)] whitespace-nowrap"
                  >
                    Join VIP <ArrowRight size={15} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
