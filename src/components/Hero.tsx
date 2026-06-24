'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative pt-28 pb-36 md:pt-36 md:pb-48 lg:pt-40 lg:pb-56 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
      {/* Slowly zooming placeholder — the video's own first frame, so there is
          no mismatched image flash before playback begins */}
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
          backgroundImage: 'url("/videos/flight-deals-poster.jpg")'
        }}
      />

      {/* Premium cinematic background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/flight-deals-poster.jpg"
        onPlay={() => setVideoLoaded(true)}
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[1500ms] ease-out ${
          videoLoaded ? 'opacity-75' : 'opacity-0'
        }`}
      >
        <source
          src="/videos/flight-deals-travel.mp4"
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

        {/* Title Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display italic font-black text-white mb-10 leading-[1.08] tracking-tight max-w-4xl"
          style={{ 
            textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' 
          }}
        >
          Unbeatable Flight Deals
        </motion.h1>
      </div>
    </section>
  );
}
