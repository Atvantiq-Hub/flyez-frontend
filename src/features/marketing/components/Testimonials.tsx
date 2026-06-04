'use client';

import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  text: string;
  user: string;
  route: string;
}

export default function Testimonials() {
  const reviews: Review[] = [
    {
      text: "Outstanding service! I saved $280 booking my business trip to London. The offline pricing via the phone line was far cheaper than anything else online.",
      user: "Sarah Jenkins",
      route: "New York to London"
    },
    {
      text: "Great experience. Booked JFK to Delhi flights for my family. The agent helped select seats and handled infants details flawlessly. Highly recommended!",
      user: "Rajesh Sharma",
      route: "JFK to Delhi"
    }
  ];

  return (
    <section className="py-20 bg-brand-bg-light dark:bg-brand-primary border-t border-brand-border dark:border-gray-800">
      <div className="premium-container">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Stats & Header */}
          <div>
            <div className="flex items-center gap-2 text-brand-orange text-xs font-bold uppercase tracking-wider mb-2.5">
              <Star size={14} className="fill-current text-brand-orange" /> Customer Trust
            </div>
            <h2 className="text-4xl font-display font-black text-brand-primary dark:text-white mb-4 leading-tight">
              What Our Flyers Are Saying
            </h2>
            <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed mb-8">
              We're proud to share reviews from flyers who book with us. We handle every reservation with care to guarantee a smooth travel experience.
            </p>

            {/* Stats row */}
            <div className="flex gap-8">
              <div>
                <span className="block text-3xl font-extrabold text-brand-primary dark:text-white leading-none">10m+</span>
                <span className="block text-xs text-brand-text-muted dark:text-gray-400 font-semibold mt-1">Happy Travelers</span>
              </div>
              <div className="w-px bg-brand-border dark:bg-gray-800" />
              <div>
                <span className="block text-3xl font-extrabold text-brand-primary dark:text-white leading-none">4.8/5</span>
                <span className="block text-xs text-brand-text-muted dark:text-gray-400 font-semibold mt-1">Customer Rating</span>
              </div>
            </div>
          </div>

          {/* Right Column: Review cards */}
          <div className="flex flex-col gap-6">
            {reviews.map((r, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, borderColor: 'rgba(37, 99, 235, 0.25)', boxShadow: '0 15px 35px rgba(7, 14, 27, 0.06)' }}
                className="relative bg-white dark:bg-brand-primary-light rounded-2xl p-6 border border-brand-border dark:border-gray-800 shadow-sm transition-all duration-300 group"
              >
                {/* Quote Icon overlay */}
                <div className="absolute right-6 top-6 opacity-[0.05] dark:opacity-[0.08] text-brand-primary dark:text-white pointer-events-none transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-105">
                  <MessageSquareQuote size={40} />
                </div>

                {/* Star rating for review */}
                <div className="flex gap-0.5 mb-3">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="14" height="14" viewBox="0 0 24 24" className="text-yellow-500 fill-current">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm leading-relaxed text-brand-primary dark:text-white/80 mb-4 italic font-medium">
                  &ldquo;{r.text}&rdquo;
                </p>

                {/* Review User info */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-brand-primary dark:text-white">{r.user}</span>
                  <span className="text-[10px] font-semibold text-brand-text-muted dark:text-gray-400 bg-slate-100 dark:bg-brand-primary border dark:border-gray-800 px-2 py-0.5 rounded">
                    {r.route}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
