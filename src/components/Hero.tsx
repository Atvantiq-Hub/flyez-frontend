'use client';

import React, { useState } from 'react';

export default function Hero() {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[530px] md:min-h-[590px] lg:min-h-[630px] flex flex-col justify-between py-5 md:py-6 overflow-hidden bg-brand-primary">
      {/* Zooming placeholder frame to prevent empty white flash before video plays */}
      <div
        className={`absolute inset-0 bg-cover bg-center z-0 transition-all duration-[4000ms] ease-out ${
          videoLoaded ? 'scale-100 opacity-0' : 'scale-105 opacity-85'
        }`}
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
        className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-[1500ms] ease-out ${
          videoLoaded ? 'opacity-75' : 'opacity-0'
        }`}
      >
        <source
          src="/videos/flyz.mp4"
          type="video/mp4"
        />
      </video>

      {/* Refined gradient overlay for high contrast */}
      <div 
        className="absolute inset-0 z-1" 
        style={{
          background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.3) 0%, rgba(7, 14, 27, 0.45) 50%, rgba(7, 14, 27, 0.8) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,0,0.1),transparent_60%)] z-1" />

      {/* Starry dot grid overlay */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#ffffff_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-1" />

      {/* Spacer */}
      <div className="h-2" />

      {/* Center Heading Title */}
      <div className="premium-container relative z-10 flex flex-col items-center flex-1 justify-center pb-20 pt-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-display italic font-semibold text-white leading-[1.08] tracking-tight max-w-4xl text-center"
          style={{
            textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)'
          }}
        >
          Unbeatable Flight Deals
        </h1>
      </div>
    </section>
  );
}
