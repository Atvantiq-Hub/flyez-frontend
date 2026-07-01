'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function SubscriptionBanner() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-7 bg-slate-50 border-t border-b border-slate-200/60 relative overflow-hidden">
      <div className="premium-container relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        
        {/* Left Side: Copywriting */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[620px]">
          <span className="text-[10px] text-brand-orange uppercase font-extrabold tracking-[2px] mb-1.5 block font-ui">
            VIP Fare Alerts
          </span>
          <h3 className="text-brand-primary text-xl font-display font-semibold leading-tight mb-1">
            Unlock Member-Only Deals
          </h3>
          <p className="text-xs sm:text-sm text-brand-text-muted">
            Join our newsletter and receive exclusive flight promotional codes and flash travel warnings.
          </p>
        </div>

        {/* Right Side: Email Signup Form */}
        <div className="w-full lg:max-w-[460px] shrink-0">
          {success ? (
            <div className="py-2.5 px-5 rounded-full bg-brand-success/10 border border-dashed border-brand-success/30 text-brand-success text-xs sm:text-sm font-bold text-center">
              ✓ Subscription Successful! Watch your inbox.
            </div>
          ) : (
            <form 
              onSubmit={handleSubscribe}
              className="flex items-center bg-white border border-slate-200/80 hover:border-slate-300 focus-within:border-brand-orange focus-within:shadow-[0_0_20px_rgba(255,92,0,0.08)] rounded-full p-1 transition-all duration-300 w-full"
            >
              <div className="flex items-center gap-2 flex-1 min-w-0 pl-3">
                <Mail size={14} className="text-slate-400 shrink-0" />
                <input 
                  type="email" 
                  placeholder="Enter email for secret deals" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-brand-primary placeholder:text-slate-300 py-1.5"
                />
              </div>
              
              <button 
                type="submit"
                className="px-5 py-2 rounded-full bg-brand-orange hover:bg-brand-orange-hover text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_4px_12px_rgba(255,92,0,0.18)] whitespace-nowrap active:scale-95 transition-all duration-200"
              >
                Join VIP <ArrowRight size={13} />
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
