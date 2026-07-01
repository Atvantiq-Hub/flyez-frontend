'use client';

import React, { useState } from 'react';
import { 
  Calendar, User, ArrowRight, BookOpen, Clock, Tag, Mail, Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import Ticker from '@/features/marketing/components/Ticker';
import dynamic from 'next/dynamic';

const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

export default function NewsInsights() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1200);
  };

  const articles = [
    {
      img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600",
      category: "Guides",
      title: "How GDS Inventory Systems Work (And How We Get Wholesale Rates)",
      excerpt: "Uncover the technology behind global distribution systems and how private ticketing desks secure unpublished flight codes.",
      date: "Jun 20, 2026",
      author: "Alex Mercer",
      readTime: "6 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600",
      category: "Deals",
      title: "Why Phone-Only Flight Deals Are Real & Legitimate",
      excerpt: "A deep dive into airline minimum advertised price (MAP) regulations and why the cheapest seats can only be sold offline.",
      date: "Jun 18, 2026",
      author: "Sarah Jenkins",
      readTime: "5 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600",
      category: "Destinations",
      title: "Top 5 Luxury Escape Destinations to Visit in Autumn 2026",
      excerpt: "From private villas in Amalfi to boutique resorts in Kyoto, explore the peak vacation choices for the upcoming shoulder season.",
      date: "Jun 12, 2026",
      author: "Elena Rostova",
      readTime: "8 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=600",
      category: "Travel Tips",
      title: "Tips for Bypassing Jetlag on Transatlantic Routes",
      excerpt: "Expert advice on light therapy, scheduling adjustments, and hydration strategies to hit the ground running on your next long haul.",
      date: "Jun 08, 2026",
      author: "Dr. Marcus Vance",
      readTime: "4 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600",
      category: "Industry News",
      title: "Understanding Airline Code-sharing Alliances",
      excerpt: "How flying on codeshare partners benefits travelers with seamless luggage check-in, priority status, and mileage benefits.",
      date: "May 28, 2026",
      author: "David Stone",
      readTime: "7 min read"
    },
    {
      img: "https://images.unsplash.com/photo-1506013013222-c941df990c0f?q=80&w=600",
      category: "Guides",
      title: "How to Secure Seat Upgrades at the Gate",
      excerpt: "An insider checklist detailing the precise windows and etiquette parameters that maximize your chances of getting bumped to first class.",
      date: "May 20, 2026",
      author: "Jessica Alba",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Sticky Header Bar (Promo Alert + Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        <PromoAlert />
        <Header />
        <Ticker />
      </div>

      {/* Hero Banner */}
      <section className="relative py-32 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1600&auto=format&fit=crop")'
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
            Insights, Industry News & Guides
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display italic font-semibold text-white leading-tight tracking-tight"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            News & Insights
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-20 relative">
        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-brand-orange/3 blur-[100px] pointer-events-none -z-10" />

        <div className="premium-container">
          {/* Featured Article */}
          <div className="mb-20">
            <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Featured Article
            </span>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 rounded-3xl overflow-hidden shadow-lg">
              <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-full">
                <img 
                  src="https://images.unsplash.com/photo-1506013013222-c941df990c0f?q=80&w=1200" 
                  alt="Featured Article" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs font-semibold text-brand-text-muted mb-4 font-ui">
                  <span className="bg-brand-orange/10 text-brand-orange py-1 px-2.5 rounded-md">Featured</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> 10 min read</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-semibold text-brand-primary dark:text-white mb-4 leading-snug">
                  The Ultimate Guide to Booking Consolidated Airline Tickets
                </h2>
                <p className="text-sm sm:text-base text-brand-text-muted font-sans leading-relaxed mb-6">
                  Learn what consolidator airfares are, how consolidators buy seats in blocks from airline alliances, and how passengers can access these offline rates to save hundreds on transatlantic flights.
                </p>
                <div className="flex items-center justify-between border-t border-brand-border dark:border-slate-800 pt-6">
                  <div className="flex items-center gap-2">
                    <User size={16} className="text-brand-orange" />
                    <span className="text-xs font-bold text-brand-primary dark:text-white font-ui">Marcus Vance</span>
                  </div>
                  <span className="text-xs font-semibold text-brand-text-muted font-ui">Jun 22, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {articles.map((art, idx) => (
              <motion.article 
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(11,26,48,0.02)] flex flex-col group h-full"
              >
                <div className="relative overflow-hidden h-48 shrink-0">
                  <img 
                    src={art.img} 
                    alt={art.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-brand-primary/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider py-1 px-2.5 rounded-md font-ui">
                    {art.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[11px] font-bold text-brand-text-muted mb-3 font-ui">
                    <span className="flex items-center gap-1"><Calendar size={11} /> {art.date}</span>
                    <span>•</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-ui font-bold text-brand-primary dark:text-white group-hover:text-brand-orange transition-colors duration-200 mb-3 leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-brand-text-muted font-sans leading-relaxed mb-5 line-clamp-3">
                    {art.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-brand-border dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-brand-primary dark:text-white font-bold font-ui">
                      <User size={13} className="text-brand-orange" />
                      <span>{art.author}</span>
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-brand-orange tracking-wider flex items-center gap-1 group-hover:gap-1.5 transition-all">
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Box */}
          <div className="max-w-3xl mx-auto bg-brand-primary text-white p-10 rounded-3xl relative overflow-hidden shadow-xl border border-white/5 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
            <div className="relative z-10 max-w-xl mx-auto">
              <Mail size={32} className="text-brand-orange mx-auto mb-4" />
              <h3 className="text-2xl font-display font-semibold mb-3">Join the Insider List</h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6 font-sans leading-relaxed">
                Subscribe to receive weekly flight deals, unpublished price alerts, and expert airfare strategies sent directly to your inbox.
              </p>

              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-brand-success font-bold py-2 font-ui"
                >
                  <Check size={18} />
                  <span>Success! You have been subscribed.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 bg-white/5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-brand-orange focus:border-brand-orange transition-all font-ui"
                  />
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 px-6 bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-brand-orange/20 shrink-0 font-ui"
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <TravelGptChat />
    </div>
  );
}
