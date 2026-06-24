'use client';

import React, { useState } from 'react';
import { 
  Star, MessageSquare, CheckCircle, ShieldCheck, User, Phone, 
  ThumbsUp, Edit3, Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import Ticker from '@/features/marketing/components/Ticker';
import dynamic from 'next/dynamic';

const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

export default function TestimonialsPage() {
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: '5',
    trip: '',
    text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setReviewForm({ name: '', rating: '5', trip: '', text: '' });
    }, 1200);
  };

  const stats = [
    { label: "Trustpilot Score", value: "4.9 / 5.0", desc: "Based on 8,500+ reviews" },
    { label: "Google Business", value: "4.8 Stars", desc: "9,200+ global ratings" },
    { label: "Repeat Customers", value: "94.2%", desc: "Voted by active travelers" },
    { label: "Average Savings", value: "$450+", desc: "Saved per roundtrip ticket" }
  ];

  const reviews = [
    {
      name: "David K.",
      location: "Chicago, IL",
      trip: "Chicago to London (Business Class)",
      rating: 5,
      title: "Saved $1,200 on British Airways!",
      text: "I was highly skeptical about phone-only ticket brokers, but FlyEz completely changed my mind. The desk specialist found an business class seat on British Airways for half of what I saw on Skyscanner. The PNR code was active in the airline app within 5 minutes of payment."
    },
    {
      name: "Linda S.",
      location: "Boston, MA",
      trip: "Boston to Tokyo (Family Package)",
      rating: 5,
      title: "Perfect family trip itinerary",
      text: "Booking for a group of 5 was stressful until I called FlyEz. They synchronized our seat selections, handled airport transfer details, and secured a wholesale rate that saved us nearly $3,000 on the flights alone. Exceptional customer service."
    },
    {
      name: "Marcus T.",
      location: "Houston, TX",
      trip: "Houston to Munich (Economy Class)",
      rating: 5,
      title: "24/7 support came through in a storm",
      text: "My outbound flight was cancelled due to heavy thunderstorms in Houston. Airlines had a 3-hour phone wait. I called the FlyEz desk and a specialist rebooked me on an alternate alliance carrier within 10 minutes. I didn't miss my connection. Worth every penny."
    },
    {
      name: "Sarah P.",
      location: "COO, TechVantage",
      trip: "Frequent Corporate Travel (USA/Europe)",
      rating: 5,
      title: "Our preferred booking partner",
      text: "We use the FlyEz VIP corporate desk for all our executive travel. The response time is under 15 minutes, their rates consistently beat corporate booking software, and they handle hotel blocks flawlessly."
    },
    {
      name: "Robert G.",
      location: "Miami, FL",
      trip: "Miami to Frankfurt (Last Minute)",
      rating: 5,
      title: "Incredible last-minute discounts",
      text: "Had to fly out for a family emergency with only 48 hours notice. Retail sites quoted $2,400. FlyEz found an offline consolidator fare for $1,150. Extremely grateful to the agent who helped me."
    },
    {
      name: "Emily & Sam",
      location: "San Francisco, CA",
      trip: "SF to Dubai (Emirates First Class)",
      rating: 5,
      title: "Honeymoon of our dreams!",
      text: "We wanted to fly First Class on Emirates for our honeymoon but the retail prices were astronomical. FlyEz secured a private discount that fit our budget perfectly. The shower spa onboard was unforgettable!"
    },
    {
      name: "Thomas H.",
      location: "Denver, CO",
      trip: "Denver to Paris (Premium Economy)",
      rating: 5,
      title: "Knowledgeable, friendly desk agents",
      text: "I really appreciate that they don't use automated phone menus. You call, you talk to an airfare expert immediately. They actually understand connections and airline alliances."
    },
    {
      name: "Karen L.",
      location: "Seattle, WA",
      trip: "Seattle to Honolulu (Economy Class)",
      rating: 4,
      title: "Transparent rates and easy booking",
      text: "No hidden booking fees or dynamic pricing surprises. What they quoted on the phone was exactly the final ticket price. Confirmation came straight to my inbox. Will use them again."
    },
    {
      name: "Michael D.",
      location: "Atlanta, GA",
      trip: "Atlanta to Honolulu (Group Booking)",
      rating: 5,
      title: "Group flight rate saved us thousands",
      text: "We booked flight routes for 14 family members traveling to a destination wedding. FlyEz negotiated a group contract with Delta that cut standard ticket rates by 25%."
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
            backgroundImage: 'url("https://images.unsplash.com/photo-1522878129833-838a904a0e9e?q=80&w=1600&auto=format&fit=crop")'
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
            Verified Customer Reviews
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display italic font-black text-white leading-tight tracking-tight"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Client Testimonials
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-20 relative">
        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-brand-accent/3 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-brand-orange/3 blur-[100px] pointer-events-none -z-10" />

        <div className="premium-container">
          {/* Trust Ratings Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((s, idx) => (
              <div 
                key={idx}
                className="bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 p-6 rounded-2xl text-center shadow-[0_4px_20px_rgba(11,26,48,0.01)]"
              >
                <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider block mb-2 font-ui">{s.label}</span>
                <span className="text-2xl sm:text-3xl font-display font-black text-brand-primary dark:text-white block mb-1">{s.value}</span>
                <span className="text-[10px] text-brand-text-muted font-sans">{s.desc}</span>
              </div>
            ))}
          </div>

          {/* Grid Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {reviews.map((rev, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 p-8 rounded-2xl shadow-[0_4px_20px_rgba(11,26,48,0.02)] flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex gap-1.5 text-amber-500 mb-4">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star 
                        key={starIdx} 
                        size={15} 
                        fill={starIdx < rev.rating ? "currentColor" : "none"} 
                        className={starIdx < rev.rating ? "text-amber-500" : "text-slate-300 dark:text-slate-700"}
                      />
                    ))}
                  </div>
                  <h3 className="text-base font-ui font-bold text-brand-primary dark:text-white mb-2 leading-snug">"{rev.title}"</h3>
                  <p className="text-xs sm:text-sm text-brand-text-muted font-sans leading-relaxed mb-6">"{rev.text}"</p>
                </div>
                
                <div className="pt-4 border-t border-brand-border dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 font-ui font-bold text-brand-primary dark:text-white text-xs">
                      <User size={13} className="text-brand-orange" />
                      <span>{rev.name}</span>
                    </div>
                    <span className="text-[10px] text-brand-text-muted font-sans block mt-0.5">{rev.location}</span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-[6px] tracking-wider font-ui flex items-center gap-1">
                    <ShieldCheck size={11} /> Verified
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form write review */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Box */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center gap-1.5 mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Feedback Channel
              </span>
              <h3 className="text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight leading-none mb-2">
                We'd Love to Hear From You
              </h3>
              <p className="text-sm text-brand-text-muted font-sans leading-relaxed">
                Have you recently booked a consolidated deal with our VIP desk? Share your experience with us. We read every review to refine our service levels and flight offerings.
              </p>
              
              <div className="mt-4 p-6 rounded-2xl bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 shadow-[0_4px_20px_rgba(11,26,48,0.01)] flex gap-4 items-center">
                <ThumbsUp className="w-8 h-8 text-brand-orange shrink-0" />
                <div>
                  <h4 className="text-sm font-ui font-bold text-brand-primary dark:text-white">Customer Satisfaction Rate</h4>
                  <p className="text-xs text-brand-text-muted font-sans mt-0.5">We maintain a 98% positive satisfaction rate across all offline phone bookings.</p>
                </div>
              </div>
            </div>

            {/* Right Box */}
            <div className="lg:col-span-7 bg-white dark:bg-brand-primary-light border border-brand-border dark:border-slate-800 p-8 rounded-2xl shadow-md">
              <h3 className="text-xl font-ui font-bold text-brand-primary dark:text-white mb-6 flex items-center gap-2">
                <Edit3 size={18} className="text-brand-orange" /> Leave a Review
              </h3>
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-brand-primary dark:text-white mb-2">Review Submitted</h4>
                  <p className="text-sm text-brand-text-muted font-sans max-w-sm mx-auto">
                    Thank you for sharing your experience! Your review has been submitted for moderation.
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
                        value={reviewForm.name}
                        onChange={e => setReviewForm({...reviewForm, name: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="John D." 
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Flight Trip / Route</label>
                      <input 
                        type="text" 
                        required
                        value={reviewForm.trip}
                        onChange={e => setReviewForm({...reviewForm, trip: e.target.value})}
                        className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui" 
                        placeholder="e.g. JFK to LHR (Business)" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Overall Star Rating</label>
                    <select 
                      value={reviewForm.rating}
                      onChange={e => setReviewForm({...reviewForm, rating: e.target.value})}
                      className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui"
                    >
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Very Poor)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-brand-text-muted uppercase font-ui">Review Content</label>
                    <textarea 
                      required
                      rows={4}
                      value={reviewForm.text}
                      onChange={e => setReviewForm({...reviewForm, text: e.target.value})}
                      className="py-2.5 px-3.5 rounded-lg border border-brand-border bg-slate-50/50 dark:bg-brand-primary dark:border-slate-800 text-sm focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent transition-all text-brand-primary dark:text-white font-ui resize-none" 
                      placeholder="Share details of your travel booking experience..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full py-3 bg-brand-primary hover:bg-brand-primary-light text-white rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none shadow-md"
                  >
                    {isSubmitting ? "Submitting Review..." : "Submit Review"}
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
