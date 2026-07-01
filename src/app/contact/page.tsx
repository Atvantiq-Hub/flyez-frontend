'use client';

import React, { useState } from 'react';
import { 
  Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, 
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PromoAlert from '@/components/PromoAlert';
import Ticker from '@/features/marketing/components/Ticker';
import dynamic from 'next/dynamic';
const TravelGptChat = dynamic(() => import('@/features/chat-ai/components/TravelGptChat'), { ssr: false });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address format';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message content is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg-light dark:bg-brand-primary">
      {/* Sticky Header Bar (Promo Alert + Navigation) */}
      <div className="sticky top-0 z-[1000] flex flex-col">
        <PromoAlert />
        <Header />
        <Ticker />
      </div>

      {/* Hero Banner */}
      <section className="relative py-28 flex items-center justify-center text-center overflow-hidden bg-brand-primary">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.45 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 6, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1600&auto=format&fit=crop")'
          }}
        />
        <div 
          className="absolute inset-0 z-1" 
          style={{
            background: 'linear-gradient(to bottom, rgba(7, 14, 27, 0.25) 0%, rgba(7, 14, 27, 0.4) 50%, rgba(7, 14, 27, 0.75) 100%)'
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,92,0,0.18),transparent_60%)] z-1" />
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle,#ffffff_1px,transparent_1.5px)] bg-[size:24px_24px] pointer-events-none z-1" />

        <div className="premium-container relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-extrabold text-brand-orange uppercase tracking-widest inline-block mb-3.5"
            style={{ textShadow: '0 1px 2px rgba(7, 14, 27, 0.4)' }}
          >
            Get In Touch With Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-semibold italic text-white leading-tight tracking-tight"
            style={{ textShadow: '0 4px 30px rgba(7, 14, 27, 0.95), 0 2px 8px rgba(7, 14, 27, 0.7)' }}
          >
            Contact Us
          </motion.h1>
        </div>
      </section>

      {/* Main Grid Section */}
      <main className="flex-1 py-20 relative">
        {/* Subtle page background ambient glows */}
        <div className="absolute top-1/4 right-[10%] w-96 h-96 rounded-full bg-brand-accent/3 dark:bg-brand-accent/5 blur-[120px] pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-[5%] w-80 h-80 rounded-full bg-brand-orange/3 dark:bg-brand-orange/5 blur-[100px] pointer-events-none -z-10" />

        <div className="premium-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Contact Cards Info (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="mb-4">
                <span className="text-[10px] font-extrabold uppercase text-brand-orange tracking-widest flex items-center gap-1.5 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" /> Support Centers
                </span>
                <h2 className="text-3xl font-display font-semibold text-brand-primary dark:text-white tracking-tight mb-4">
                  Need Help? Talk to Our Travel Experts
                </h2>
                <p className="text-brand-text-muted dark:text-gray-400 text-sm md:text-base leading-relaxed font-medium">
                  Have questions regarding your flight details, seat selections, pet policies, or need immediate booking assistance? Our secure ticketing desk is standing by 24/7.
                </p>
              </div>

              {/* 24/7 Telephone Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-primary-light/40 border border-brand-border dark:border-gray-800/80 shadow-sm flex items-start gap-4 hover:border-brand-accent/30 hover:shadow-md transition-all duration-350 relative overflow-hidden group">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-500/10 text-brand-accent rounded-2xl shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <Phone size={22} className="fill-current text-brand-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold text-brand-text-muted dark:text-gray-400 uppercase tracking-widest">Toll Free Support</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-success/10 text-brand-success text-[9px] font-extrabold tracking-wider uppercase border border-brand-success/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-success animate-[pulse_1.5s_infinite]" /> Online
                    </span>
                  </div>
                  <a href="tel:1800-521-4263" className="text-xl sm:text-2xl font-display font-semibold text-brand-primary dark:text-white block hover:text-brand-accent transition-colors">
                    1800-521-4263
                  </a>
                  <p className="text-brand-text-muted dark:text-gray-400 text-xs mt-1.5 font-medium">
                    Call 24/7/365 for unpublished airfares and flight changes.
                  </p>
                </div>
              </div>

              {/* Office Address Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-primary-light/40 border border-brand-border dark:border-gray-800/80 shadow-sm flex items-start gap-4 hover:border-brand-orange/30 hover:shadow-md transition-all duration-350 group">
                <div className="p-3.5 bg-orange-50 dark:bg-orange-500/10 text-brand-orange rounded-2xl shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <MapPin size={22} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold text-brand-text-muted dark:text-gray-400 uppercase tracking-widest block mb-1">HQ Address</span>
                  <span className="text-base font-bold text-brand-primary dark:text-white leading-snug block">
                    3143 Deering Bay Dr,<br />Naperville, IL 60564
                  </span>
                  <p className="text-brand-text-muted dark:text-gray-400 text-xs mt-2 font-medium">
                    USA Ticketing Operations Center.
                  </p>
                </div>
              </div>

              {/* Email Support Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-primary-light/40 border border-brand-border dark:border-gray-800/80 shadow-sm flex items-start gap-4 hover:border-brand-accent/30 hover:shadow-md transition-all duration-350 group">
                <div className="p-3.5 bg-blue-50 dark:bg-blue-500/10 text-brand-accent rounded-2xl shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform">
                  <Mail size={22} />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-extrabold text-brand-text-muted dark:text-gray-400 uppercase tracking-widest block mb-1">Email Support</span>
                  <a href="mailto:help@flyez.ai" className="text-lg font-bold text-brand-primary dark:text-white hover:text-brand-accent transition-colors block">
                    help@flyez.ai
                  </a>
                  <p className="text-brand-text-muted dark:text-gray-400 text-xs mt-1.5 font-medium">
                    Typical response time is within 1 hour.
                  </p>
                </div>
              </div>

              {/* Social Channels Card */}
              <div className="p-6 rounded-3xl bg-white dark:bg-brand-primary-light/40 border border-brand-border dark:border-gray-800/80 shadow-sm flex flex-col gap-3">
                <span className="text-[10px] font-extrabold text-brand-text-muted dark:text-gray-400 uppercase tracking-widest">Connect with us</span>
                <div className="flex items-center gap-3">
                  <a href="https://facebook.com/flyez.usa" target="_blank" className="w-10 h-10 rounded-full border border-brand-border dark:border-gray-800 flex items-center justify-center text-brand-text-muted hover:text-brand-accent hover:border-brand-accent dark:hover:border-brand-accent hover:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-brand-border dark:border-gray-800 flex items-center justify-center text-brand-text-muted hover:text-brand-accent hover:border-brand-accent dark:hover:border-brand-accent hover:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://instagram.com/flyez_usa/" target="_blank" className="w-10 h-10 rounded-full border border-brand-border dark:border-gray-800 flex items-center justify-center text-brand-text-muted hover:text-brand-orange hover:border-brand-orange dark:hover:border-brand-orange hover:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full border border-brand-border dark:border-gray-800 flex items-center justify-center text-brand-text-muted hover:text-brand-accent hover:border-brand-accent dark:hover:border-brand-accent hover:shadow-sm transition-all duration-300">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Form Card (7 cols) */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-white/70 dark:bg-brand-primary-light/30 backdrop-blur-xl border border-white/20 dark:border-gray-800/60 shadow-[0_30px_70px_-10px_rgba(7,14,27,0.06)] relative overflow-hidden min-h-[580px] flex flex-col justify-center">
                {/* Visual glass sheen overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none -z-10" />
                
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.div
                      key="form-view"
                      initial={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="mb-8">
                        <span className="text-[10px] bg-brand-accent/10 text-brand-accent border border-brand-accent/20 px-2.5 py-1 rounded-full font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
                          <MessageSquare size={11} /> Contact Form
                        </span>
                        <h3 className="text-2xl font-display font-semibold text-brand-primary dark:text-white tracking-tight mt-3">
                          Send a Message
                        </h3>
                        <p className="text-brand-text-muted dark:text-gray-400 text-xs mt-1.5 font-medium">
                          Fill out the details below and a service rep will email you right back.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-5">
                        
                        {/* Name Fields Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold uppercase text-brand-text-muted dark:text-gray-400 tracking-wider">First Name</label>
                            <input 
                              type="text" 
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              placeholder="e.g. John"
                              className={`w-full px-4 py-3 bg-white dark:bg-brand-primary/40 border rounded-xl text-brand-primary dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm font-medium ${
                                errors.firstName 
                                  ? 'border-red-500/60 focus:ring-red-500' 
                                  : 'border-brand-border dark:border-gray-800/80 focus:border-brand-accent focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                              }`}
                            />
                            {errors.firstName && (
                              <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.firstName}</span>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[11px] font-extrabold uppercase text-brand-text-muted dark:text-gray-400 tracking-wider">Last Name</label>
                            <input 
                              type="text" 
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              placeholder="e.g. Doe"
                              className={`w-full px-4 py-3 bg-white dark:bg-brand-primary/40 border rounded-xl text-brand-primary dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm font-medium ${
                                errors.lastName 
                                  ? 'border-red-500/60 focus:ring-red-500' 
                                  : 'border-brand-border dark:border-gray-800/80 focus:border-brand-accent focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                              }`}
                            />
                            {errors.lastName && (
                              <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.lastName}</span>
                            )}
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-brand-text-muted dark:text-gray-400 tracking-wider">Email Address</label>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john.doe@example.com"
                            className={`w-full px-4 py-3 bg-white dark:bg-brand-primary/40 border rounded-xl text-brand-primary dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm font-medium ${
                              errors.email 
                                ? 'border-red-500/60 focus:ring-red-500' 
                                : 'border-brand-border dark:border-gray-800/80 focus:border-brand-accent focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                            }`}
                          />
                          {errors.email && (
                            <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.email}</span>
                          )}
                        </div>

                        {/* Subject Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-brand-text-muted dark:text-gray-400 tracking-wider">Subject</label>
                          <input 
                            type="text" 
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="Flight changes, special meal selection, business quotes..."
                            className={`w-full px-4 py-3 bg-white dark:bg-brand-primary/40 border rounded-xl text-brand-primary dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm font-medium ${
                              errors.subject 
                                ? 'border-red-500/60 focus:ring-red-500' 
                                : 'border-brand-border dark:border-gray-800/80 focus:border-brand-accent focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                            }`}
                          />
                          {errors.subject && (
                            <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.subject}</span>
                          )}
                        </div>

                        {/* Message TextArea Field */}
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] font-extrabold uppercase text-brand-text-muted dark:text-gray-400 tracking-wider">Your Message</label>
                          <textarea 
                            name="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Please provide reservation numbers or airlines details where relevant..."
                            className={`w-full px-4 py-3 bg-white dark:bg-brand-primary/40 border rounded-xl text-brand-primary dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 transition-all text-sm font-medium resize-none ${
                              errors.message 
                                ? 'border-red-500/60 focus:ring-red-500' 
                                : 'border-brand-border dark:border-gray-800/80 focus:border-brand-accent focus:ring-brand-accent focus:shadow-[0_0_12px_rgba(37,99,235,0.15)]'
                            }`}
                          />
                          {errors.message && (
                            <span className="text-red-500 text-[10px] font-bold flex items-center gap-1 mt-0.5"><AlertCircle size={10} /> {errors.message}</span>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-extrabold py-4 px-6 rounded-xl shadow-glow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Sending Flight Request...</span>
                            </>
                          ) : (
                            <>
                              <Send size={15} />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>

                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                      className="text-center py-10"
                    >
                      <div className="w-20 h-20 bg-emerald-500/10 text-brand-success rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                        <CheckCircle size={38} className="text-brand-success animate-[scale-in_0.35s_ease-out]" />
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl font-display font-semibold text-brand-primary dark:text-white mb-3">
                        Message Sent Successfully!
                      </h3>
                      
                      <p className="text-brand-text-muted dark:text-gray-300 text-sm max-w-md mx-auto mb-8 leading-relaxed font-medium">
                        Thank you for contacting the FlyEz flight operations desk. A certified ticketing coordinator has received your request and will contact you via email at your address within the next 2 hours.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
                        <button
                          onClick={() => setIsSubmitted(false)}
                          className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-brand-primary-light dark:hover:bg-slate-800 text-brand-primary dark:text-white rounded-xl text-xs font-bold transition-all border border-slate-200 dark:border-gray-800 cursor-pointer"
                        >
                          Send Another Message
                        </button>
                        <a
                          href="tel:1800-521-4263"
                          className="px-5 py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-white rounded-xl text-xs font-bold transition-all shadow-glow text-center"
                        >
                          Urgent Call Support
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            </div>

          </div>
        </div>
      </main>

      <TravelGptChat />
      <Footer />
    </div>
  );
}
