'use client';

import React, { useState } from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative pt-24 pb-28 md:pt-28 md:pb-36 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
      {/* Slowly zooming background image for cinematic depth */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0.85 }}
        animate={{ 
          scale: 1, 
          opacity: videoLoaded ? 0 : 0.85 
        }}
        transition={{ 
          scale: { duration: 8, ease: "easeOut" },
          opacity: { duration: 1.5, ease: "easeOut" }
        }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: 'url("https://flyez.ai/assets/img/slider-bg-img.webp")'
        }}
      />

      {/* Premium cinematic background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        onPlay={() => setVideoLoaded(true)}
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[1500ms] ease-out ${
          videoLoaded ? 'opacity-75' : 'opacity-0'
        }`}
      >
        <source 
          src="https://d11rb8slxt017z.cloudfront.net/videos/koursair-video.mp4" 
          type="video/mp4" 
        />
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-passenger-airplane-flying-above-the-clouds-34255-large.mp4" 
          type="video/mp4" 
        />
      </video>

      {/* Refined gradient overlay for high image visibility and text readability */}
      <div 
        className="absolute inset-0 z-1" 
        style={{
          background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.35) 0%, rgba(7, 14, 27, 0.45) 50%, rgba(7, 14, 27, 0.8) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_60%)] z-1" />

      {/* Starry/Dot Grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#ffffff_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-1" />

      <div className="premium-container relative z-10 flex flex-col items-center">
        
        {/* VIP Pill */}
        <motion.span 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs font-extrabold text-brand-orange uppercase tracking-[3px] inline-block mb-5 px-4 py-1.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 backdrop-blur-md"
          style={{ textShadow: '0 1px 2px rgba(7, 14, 27, 0.4)' }}
        >
          Unpublished Private Fares
        </motion.span>
        
        {/* Title Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white mb-5 leading-[1.08] tracking-tight max-w-4xl"
          style={{ 
            textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' 
          }}
        >
          Unbeatable Flight Deals & <br/>Secret Agent Rates
        </motion.h1>
        
        {/* Subtitle Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-lg text-white/95 max-w-2xl mb-10 leading-relaxed font-semibold"
          style={{ 
            textShadow: '0 2px 20px rgba(7, 14, 27, 0.95), 0 1px 4px rgba(7, 14, 27, 0.8)' 
          }}
        >
          Access exclusive offline discounts, private consolidator rates, and group airfare deals not available online. Speak to a travel desk agent for instant discounts.
        </motion.p>

        {/* Dialing CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="tel:1800-521-4263"
            className="flex items-center gap-3.5 px-9 py-4 bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white rounded-2xl shadow-[0_4px_20px_rgba(255,92,0,0.35)] hover:shadow-[0_15px_35px_rgba(255,92,0,0.55)] border border-white/15 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(255, 255, 255, 0.4)",
                  "0 0 0 10px rgba(255, 255, 255, 0)",
                  "0 0 0 0 rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0"
            >
              <Phone size={16} className="fill-current text-white" />
            </motion.div>
            <div className="flex flex-col items-start text-left">
              <span className="text-[10px] text-white/80 uppercase tracking-widest font-extrabold leading-none">Travel Desk · 24/7</span>
              <span className="text-lg font-ui font-black leading-tight mt-1 tracking-tight">Speak to a Desk Agent</span>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
