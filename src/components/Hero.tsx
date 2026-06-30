'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FlightSearchForm from '@/features/flight-booking/components/FlightSearchForm';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative h-[62vh] min-h-[480px] lg:h-[65vh] lg:min-h-[530px] flex flex-col justify-between py-5 md:py-6 overflow-hidden bg-brand-primary">
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
        className="absolute top-0 left-0 right-0 bottom-[52px] bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("/videos/flight-deals-poster.png")'
        }}
      />

      {/* Premium cinematic background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/videos/flight-deals-poster.png"
        onPlay={() => setVideoLoaded(true)}
        onLoadedData={() => setVideoLoaded(true)}
        className={`absolute top-0 left-0 right-0 bottom-[52px] w-full h-[calc(100%-52px)] object-cover z-0 transition-opacity duration-[1500ms] ease-out ${
          videoLoaded ? 'opacity-75' : 'opacity-0'
        }`}
      >
        <source
          src="https://videos.pexels.com/video-files/1851190/1851190-hd_1920_1080_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Refined gradient overlay for high image visibility and text readability */}
      <div 
        className="absolute top-0 left-0 right-0 bottom-[52px] z-1" 
        style={{
          background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.35) 0%, rgba(7, 14, 27, 0.45) 50%, rgba(7, 14, 27, 0.8) 100%)'
        }}
      />
      <div className="absolute top-0 left-0 right-0 bottom-[52px] bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.18),transparent_60%)] z-1" />

      {/* Starry/Dot Grid overlay */}
      <div className="absolute top-0 left-0 right-0 bottom-[52px] opacity-5 bg-[radial-gradient(circle,#ffffff_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-1" />

      {/* Top spacer to balance the navigation header bar spacing */}
      <div className="h-2" />

      {/* Center Heading Title */}
      <div className="premium-container relative z-10 flex flex-col items-center flex-1 justify-center py-4">
        {/* Title Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-display italic font-black text-white leading-[1.08] tracking-tight max-w-4xl text-center"
          style={{ 
            textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' 
          }}
        >
          Unbeatable Flight Deals
        </motion.h1>
      </div>

      {/* Bottom Booking Wizard Form */}
      <div className="premium-container relative z-20 w-full mb-1 sm:mb-2 mt-auto">
        <FlightSearchForm />
      </div>
    </section>
  );
}
