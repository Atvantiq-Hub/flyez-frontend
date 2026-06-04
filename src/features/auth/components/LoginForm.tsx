'use client';

import React from 'react';
import { Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoginForm } from '../hooks/useLoginForm';

export default function LoginForm() {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleInputChange,
    handleSubmit,
    authError
  } = useLoginForm();

  return (
    <div className="max-w-5xl mx-auto bg-white dark:bg-brand-primary-light rounded-3xl border border-brand-border dark:border-gray-800 shadow-[0_20px_50px_rgba(7,14,27,0.05)] overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
      
      {/* Left Column: Visual Banner (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-12 overflow-hidden bg-brand-primary select-none">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop")' }}
        />
        {/* Deep Radial & Linear Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-primary/10 via-brand-primary/60 to-brand-primary/95 z-10" />

        {/* Left side content */}
        <div className="relative z-20 flex flex-col justify-between h-full">
          {/* Brand Branding */}
          <div className="flex items-center gap-2">
            <svg width="34" height="34" viewBox="35 18 38 42" fill="none">
              <path d="M38 58 L38 37 C38 27, 48 22, 70 20 C60 26, 45 32, 43 37 L43 43 L57 43 L52 48 L43 48 L43 53 Z" fill="#2563eb" />
              <path d="M45 35.5 C50 35.5, 58 33, 71 23 C63 29, 56 32, 54 34 C58 34, 62 34, 66 34 C58 38, 50 40, 45 40.5 Z" fill="#ff5c00" />
            </svg>
            <span className="text-xl font-black font-display text-white tracking-tight">
              Fly<span className="text-brand-orange">Ez</span>
            </span>
          </div>

          {/* Motivational Text */}
          <div className="my-auto pt-20">
            <h3 className="text-3xl font-display font-black text-white leading-tight mb-4" style={{ textShadow: '0 2px 10px rgba(7, 14, 27, 0.4)' }}>
              Unlock Exclusive <br />Offline Airfares
            </h3>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs font-semibold">
              Sign in to manage your bookings, customize itineraries, and access private consolidator rates.
            </p>
          </div>

          {/* Bottom Footer Quote */}
          <div className="text-[11px] text-white/50 font-bold uppercase tracking-wider">
            © {new Date().getFullYear()} FlyEz Travel Desk.
          </div>
        </div>
      </div>

      {/* Right Column: Interaction Form */}
      <div className="col-12 lg:col-span-7 p-8 sm:p-12 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* Title block */}
                <div className="mb-8">
                  <h2 className="text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight">
                    Welcome back
                  </h2>
                  <p className="text-brand-text-muted dark:text-gray-400 text-sm mt-2 font-semibold">
                    Don't have an account yet?{' '}
                    <a href="https://flyez.ai/register" className="text-brand-accent hover:underline font-bold transition-all">
                      Sign up for free
                    </a>
                  </p>
                </div>

                {authError && (
                  <div className="flex items-center gap-2 p-3.5 mb-5 text-xs font-bold bg-red-50 dark:bg-red-950/20 text-red-500 rounded-xl border border-red-100 dark:border-red-950/30">
                    <AlertCircle size={16} />
                    <span>{authError}</span>
                  </div>
                )}

                {/* Interactive Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email input field */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase text-brand-primary/80 dark:text-white/80 tracking-wider mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-brand-text-muted dark:text-gray-400">
                        <Mail size={16} />
                      </span>
                      <input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="name@company.com"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-slate-50/50 dark:bg-brand-primary border-brand-border dark:border-gray-800 text-brand-primary dark:text-white placeholder-brand-text-muted/60 text-sm focus:outline-none transition-all duration-300 ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                            : 'focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <span className="flex items-center gap-1 text-[11px] text-red-500 font-bold mt-1.5 animate-[fadeIn_0.2s_ease]">
                        <AlertCircle size={12} /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Password input field */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-extrabold uppercase text-brand-primary/80 dark:text-white/80 tracking-wider">
                        Password
                      </label>
                      <a href="https://flyez.ai/forgot-password" className="text-xs text-brand-accent hover:underline font-bold">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-brand-text-muted dark:text-gray-400">
                        <Lock size={16} />
                      </span>
                      <input 
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className={`w-full pl-11 pr-4 py-3.5 rounded-xl border bg-slate-50/50 dark:bg-brand-primary border-brand-border dark:border-gray-800 text-brand-primary dark:text-white placeholder-brand-text-muted/60 text-sm focus:outline-none transition-all duration-300 ${
                          errors.password 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                            : 'focus:border-brand-orange/50 focus:ring-1 focus:ring-brand-orange/20'
                        }`}
                      />
                    </div>
                    {errors.password && (
                      <span className="flex items-center gap-1 text-[11px] text-red-500 font-bold mt-1.5 animate-[fadeIn_0.2s_ease]">
                        <AlertCircle size={12} /> {errors.password}
                      </span>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-brand-orange to-brand-orange-hover text-white rounded-xl text-sm font-extrabold shadow-[0_4px_15px_rgba(255,92,0,0.25)] hover:shadow-[0_12px_25px_rgba(255,92,0,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-70 disabled:-translate-y-0 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Sign In <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Social login divider */}
                <div className="relative my-8 flex items-center justify-center">
                  <div className="absolute inset-x-0 h-px bg-brand-border dark:bg-gray-800 z-0" />
                  <span className="relative z-10 px-4 bg-white dark:bg-brand-primary-light text-brand-text-muted dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                    or sign in with
                  </span>
                </div>

                {/* Social login buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-brand-border dark:border-gray-800 hover:border-brand-orange/25 dark:hover:border-brand-orange/30 hover:bg-slate-50 dark:hover:bg-brand-primary transition-all duration-300 font-bold text-xs text-brand-primary dark:text-white cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#1877f2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                    </svg>
                    Facebook
                  </button>
                  <button 
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-brand-border dark:border-gray-800 hover:border-brand-orange/25 dark:hover:border-brand-orange/30 hover:bg-slate-50 dark:hover:bg-brand-primary transition-all duration-300 font-bold text-xs text-brand-primary dark:text-white cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    Google
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.1 }}
                  className="w-20 h-20 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500"
                >
                  <CheckCircle size={40} />
                </motion.div>
                <h2 className="text-3xl font-display font-black text-brand-primary dark:text-white tracking-tight mb-2">
                  Successfully Signed In
                </h2>
                <p className="text-brand-text-muted dark:text-gray-400 text-sm leading-relaxed max-w-sm mx-auto mb-8 font-semibold">
                  Redirecting to your FlyEz Dashboard travel hub. Start searching consolidator deals.
                </p>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-8 py-3 bg-brand-primary dark:bg-white text-white dark:text-brand-primary hover:bg-brand-primary/95 dark:hover:bg-white/95 rounded-xl text-sm font-extrabold transition-all duration-300 shadow-sm"
                >
                  Go to Homepage
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
