'use client';

import React, { useState } from 'react';
import { 
  Sparkles, ShieldCheck, Coffee, Award, Phone, Check, 
  ChevronRight, Compass, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FlightSearchForm from '@/features/flight-booking/components/FlightSearchForm';
import dynamic from 'next/dynamic';

const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

export default function BusinessFirstClass() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    origin: '',
    destination: '',
    date: '',
    passengers: '1'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const benefits = [
    {
      icon: <Coffee className="w-6 h-6 text-brand-orange" />,
      title: "Exclusive Airport Lounges",
      desc: "Gain access to premium international lounges featuring fine dining, spa treatments, and private workspaces before your flight."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-brand-orange" />,
      title: "Fully Flatbed Suites",
      desc: "Fly in absolute comfort with spacious lie-flat seats, designer bedding, direct aisle access, and complete personal privacy screens."
    },
    {
      icon: <Award className="w-6 h-6 text-brand-orange" />,
      title: "Priority Care & Baggage",
      desc: "Bypass queues with fast-track check-in, priority security clearance, and first-off baggage delivery at your destination."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-orange" />,
      title: "Dedicated Luxury Desk",
      desc: "Your dedicated concierge manages your booking, itinerary tweaks, lounge access, and seat upgrades 24 hours a day."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Sticky Header Bar (Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        <Header />
      </div>

      {/* Hero Banner */}
      <section className="relative h-[62vh] min-h-[480px] lg:h-[65vh] lg:min-h-[530px] flex flex-col justify-between py-5 md:py-6 overflow-hidden bg-brand-primary">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=1600&auto=format&fit=crop")'
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

        {/* Top spacer to balance the navigation header bar spacing */}
        <div className="h-2" />

        {/* Center Heading Title */}
        <div className="premium-container relative z-10 flex flex-col items-center flex-1 justify-center py-4">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-block mb-2"
            style={{ textShadow: '0 1px 2px rgba(7, 14, 27, 0.4)' }}
          >
            Premium Cabin Upgrades
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display italic font-black text-white leading-tight tracking-tight text-center"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Business & First Class
          </motion.h1>
        </div>

        {/* Bottom Booking Wizard Form */}
        <div className="premium-container relative z-20 w-full mb-1 sm:mb-2 mt-auto">
          <FlightSearchForm restrictToBusinessFirst={true} />
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 pb-20 relative">

        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-brand-orange/3 blur-[100px] pointer-events-none -z-10" />

        <div className="premium-container">
          {/* Section: Overview */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center justify-center gap-1.5 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Luxury Air Travel
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-primary dark:text-white mb-6">
              Fly in Unparalleled Luxury for Less
            </h2>
            <p className="text-lg text-brand-text-muted font-sans leading-relaxed">
              Why pay retail prices for premium cabins? Through our exclusive wholesale relationships, private consolidator rates, and GDS routing optimizations, FlyEz offers business and first-class tickets at up to <strong className="text-brand-primary dark:text-white">60% off</strong> standard retail airline pricing.
            </p>
          </div>

          {/* Section: Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {benefits.map((b, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 p-8 rounded-2xl shadow-[0_4px_20px_rgba(11,26,48,0.02)] flex gap-5 items-start"
              >
                <div className="p-3 bg-brand-orange/5 dark:bg-brand-orange/10 rounded-xl shrink-0">
                  {b.icon}
                </div>
                <div>
                  <h3 className="text-lg font-ui font-bold text-brand-primary dark:text-white mb-2">{b.title}</h3>
                  <p className="text-sm text-brand-text-muted font-sans leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section: Two-Column Form and Promo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Premium Call Desk */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="p-8 rounded-2xl bg-brand-primary text-white relative overflow-hidden shadow-xl border border-white/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
                <div className="relative z-10">
                  <span className="text-xs font-bold text-brand-orange uppercase tracking-wider block mb-2">Unpublished Phone Fares</span>
                  <h3 className="text-2xl font-display font-black mb-4">Request a Premium Quote</h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-sans">
                    Due to strict airline restrictions, our deepest luxury discounts are unpublished. Call our VIP Luxury desk to speak directly with an airfare specialist and obtain immediate flight options.
                  </p>
                  <a
                    href="tel:1800-521-4263"
                    className="flex items-center justify-center gap-3 w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-brand-orange/20"
                  >
                    <Phone size={18} />
                    <span>Call VIP Desk: 1800-521-4263</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Inquiry Form */}
            <div className="lg:col-span-7 bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-ui font-bold text-brand-primary dark:text-white mb-6">Or Inquire Online</h3>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-brand-primary dark:text-white mb-2">Inquiry Received Successfully</h4>
                  <p className="text-sm text-brand-text-muted font-sans max-w-sm mx-auto">
                    A luxury airfare concierge has received your request and will contact you within 15 minutes with options.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="john@example.com" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="(555) 000-0000" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Target Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Origin Airport</label>
                      <input 
                        type="text" 
                        required
                        value={formData.origin}
                        onChange={e => setFormData({...formData, origin: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="JFK (New York)" 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Destination Airport</label>
                      <input 
                        type="text" 
                        required
                        value={formData.destination}
                        onChange={e => setFormData({...formData, destination: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="LHR (London)" 
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none shadow-md"
                  >
                    {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry Request"}
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
