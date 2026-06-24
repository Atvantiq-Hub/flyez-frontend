'use client';

import React, { useState } from 'react';
import { 
  Calendar, MapPin, Ticket, Shield, Check, Phone, ArrowRight, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import Ticker from '@/features/marketing/components/Ticker';
import dynamic from 'next/dynamic';

const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

export default function EventsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    event: 'Oktoberfest Munich 2026',
    tickets: '2'
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

  const packages = [
    {
      img: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600",
      title: "Oktoberfest Munich Package",
      location: "Munich, Germany",
      date: "September 19 – October 4, 2026",
      details: "Roundtrip flights to Munich, 3 nights in a 4-star hotel, reserved seating in the Hofbräu-Festzelt tent, and airport transfers.",
      price: "$1,899"
    },
    {
      img: "https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?q=80&w=600",
      title: "Monaco Grand Prix VIP Experience",
      location: "Monte Carlo, Monaco",
      date: "May 20 – 24, 2027",
      details: "Flights to Nice, 4 nights at a boutique hotel, Grandstand K tickets, yacht hospitality access, and premium helicopter transfers.",
      price: "$4,650"
    },
    {
      img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600",
      title: "Rio de Janeiro Carnival",
      location: "Rio de Janeiro, Brazil",
      date: "February 5 – 10, 2027",
      details: "Flights to Rio, Copacabana beachfront hotel (5 nights), Sambadrome Parade Grandstand tickets, and private tour guide.",
      price: "$2,799"
    },
    {
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600",
      title: "Kyoto Cherry Blossom Special",
      location: "Kyoto, Japan",
      date: "March 28 – April 4, 2027",
      details: "Flights to Osaka, 6 nights in a luxury Ryokan, traditional tea ceremony tickets, private temple tour, and train passes.",
      price: "$3,200"
    },
    {
      img: "https://images.unsplash.com/photo-1481162854517-d9e353af153d?q=80&w=600",
      title: "Tomorrowland Festival AirPackage",
      location: "Boom, Belgium",
      date: "July 17 – 27, 2027",
      details: "Roundtrip flight to Brussels, DreamVille Easy Tent passes, Full Madness Tomorrowland ticket, and shuttle service.",
      price: "$1,950"
    },
    {
      img: "https://images.unsplash.com/photo-1513829096900-fe0386e89af7?q=80&w=600",
      title: "New Year's Times Square Gala",
      location: "New York City, USA",
      date: "December 30, 2026 – January 2, 2027",
      details: "Flights to NYC, 3 nights in a Times Square luxury hotel, rooftop VIP viewing party ticket, and champagne gala toast.",
      price: "$2,100"
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1469488865564-c2de10f69f96?q=80&w=1600&auto=format&fit=crop")'
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
            Global Festivals & Packages
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display italic font-black text-white leading-tight tracking-tight"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Events & Packages
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-20 relative">
        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-brand-orange/3 blur-[100px] pointer-events-none -z-10" />

        <div className="premium-container">
          {/* Section: Overview */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center justify-center gap-1.5 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Complete Flight + Ticket Packages
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-brand-primary dark:text-white mb-6">
              Travel to the World's Biggest Celebrations
            </h2>
            <p className="text-lg text-brand-text-muted font-sans leading-relaxed">
              Don't spend days piecing together flight dates, event ticket credentials, and airport lodging separately. We design comprehensive, vetted packages that combine flight consolidator rates with VIP access passes.
            </p>
            <div className="mt-8 flex justify-center">
              <a 
                href="/events/seasonal-calendars"
                className="inline-flex items-center gap-2 py-3 px-6 rounded-lg bg-brand-orange hover:bg-brand-orange/90 text-white text-sm font-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-ui"
              >
                <span>Explore Exclusive Seasonal Calendars</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Section: Packages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {packages.map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(11,26,48,0.02)] flex flex-col h-full group"
              >
                <div className="relative overflow-hidden h-48 shrink-0">
                  <img 
                    src={pkg.img} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-brand-orange text-white text-sm font-black py-1 px-3 rounded-lg font-ui shadow-md">
                    {pkg.price} <span className="text-[10px] font-medium font-sans">/ pp</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs text-brand-orange font-bold uppercase tracking-wider mb-2.5 font-ui">
                    <MapPin size={13} />
                    <span>{pkg.location}</span>
                  </div>
                  <h3 className="text-base font-ui font-bold text-brand-primary dark:text-white mb-3 group-hover:text-brand-orange transition-colors leading-snug">
                    {pkg.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-brand-text-muted mb-4 font-ui">
                    <Calendar size={13} />
                    <span>{pkg.date}</span>
                  </div>
                  <p className="text-xs text-brand-text-muted font-sans leading-relaxed mb-6">
                    {pkg.details}
                  </p>
                  <button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, event: pkg.title }));
                      const formEl = document.getElementById('inquiry-section');
                      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="mt-auto w-full py-2.5 bg-brand-primary/5 hover:bg-brand-primary dark:bg-slate-800 dark:hover:bg-brand-primary text-brand-primary dark:text-slate-200 hover:text-white border border-brand-primary/10 dark:border-slate-700 rounded-lg text-xs font-bold transition-all duration-200 font-ui"
                  >
                    Select Package Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section: Form & Help */}
          <div id="inquiry-section" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Need Assistance?
              </span>
              <h3 className="text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight leading-none mb-2">
                Consult a Festival Specialist
              </h3>
              <p className="text-sm text-brand-text-muted font-sans leading-relaxed mb-4">
                Have custom travel dates or need specific group rates for more than 10 passengers? Speak to our offline event desk for flight upgrades, hotel block options, and festival passes.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-ui font-bold text-brand-primary dark:text-white">Fully Bonded & Insured</h4>
                    <p className="text-xs text-brand-text-muted font-sans mt-0.5">Every package incorporates standard air travel insolvency protection.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-brand-accent">
                    <Ticket size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-ui font-bold text-brand-primary dark:text-white">Official Ticket Credentials</h4>
                    <p className="text-xs text-brand-text-muted font-sans mt-0.5">All event tickets are 100% verified partnership vouchers.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-5 bg-brand-primary text-white rounded-xl border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.12),transparent_50%)]" />
                <div className="relative z-10 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 font-ui block">Speak to a specialist</span>
                    <a href="tel:1800-521-4263" className="text-lg font-black text-white hover:text-brand-orange transition-colors">1800-521-4263</a>
                  </div>
                  <a href="tel:1800-521-4263" className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center hover:scale-[1.05] transition-all shrink-0">
                    <Phone size={15} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-7 bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-ui font-bold text-brand-primary dark:text-white mb-6">Request Event Itinerary Options</h3>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-brand-primary dark:text-white mb-2">Package Request Submitted</h4>
                  <p className="text-sm text-brand-text-muted font-sans max-w-sm mx-auto">
                    An events specialist will check inventory for <strong className="text-brand-primary dark:text-white">{formData.event}</strong> and contact you with flights and accommodations details.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Your Name</label>
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Selected Event Package</label>
                      <select 
                        value={formData.event}
                        onChange={e => setFormData({...formData, event: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui"
                      >
                        {packages.map((pkg, idx) => (
                          <option key={idx} value={pkg.title}>{pkg.title}</option>
                        ))}
                        <option value="Custom Festival Request">Other / Custom Event Package</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Number of Travelers</label>
                      <select 
                        value={formData.tickets}
                        onChange={e => setFormData({...formData, tickets: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5">5+ People (Group)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none shadow-md"
                  >
                    {isSubmitting ? "Requesting Event Quote..." : "Send Request Quote"}
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
