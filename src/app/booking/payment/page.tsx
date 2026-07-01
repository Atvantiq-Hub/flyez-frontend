'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, ShieldCheck, CreditCard, CheckCircle, ChevronRight, 
  Lock, Calendar, User, FileText, Info
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State
  const flightId = searchParams.get('flightId') || 'FL-1000';
  const origin = searchParams.get('origin') || 'JFK';
  const destination = searchParams.get('destination') || 'LAX';
  const firstName = searchParams.get('firstName') || 'JOHN';
  const lastName = searchParams.get('lastName') || 'SMITH';
  const seat = searchParams.get('seat') || 'Random Assignment';
  const bags = searchParams.get('bags') || '0';
  const total = parseInt(searchParams.get('total') || '420', 10);

  // Form State
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(value.substring(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = `${value.substring(0, 2)}/${value.substring(2, 4)}`;
    }
    setExpiry(value.substring(0, 5));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvv(value.substring(0, 4));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (cardNumber.length < 19) {
      setValidationError('Please enter a valid 16-digit card number.');
      return;
    }
    if (!cardName.trim()) {
      setValidationError('Please enter the cardholder name.');
      return;
    }
    if (expiry.length < 5) {
      setValidationError('Please enter a valid expiry date (MM/YY).');
      return;
    }
    if (cvv.length < 3) {
      setValidationError('Please enter a valid CVV code.');
      return;
    }

    setLoading(true);

    // Simulate premium e-ticket processing delay
    setTimeout(() => {
      setLoading(false);
      const nextParams = new URLSearchParams(searchParams);
      // Random mock booking reference code (e.g. 6-digit alphanumeric)
      const mockRef = Math.random().toString(36).substring(2, 8).toUpperCase();
      nextParams.set('pnr', mockRef);
      router.push(`/booking/confirmation?${nextParams.toString()}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-text-main">
      <Header overlay={false} />

      {/* Progress Stepper bar */}
      <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="premium-container px-4 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-green-600">
            <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center text-[10px]">✓</span>
            <span>Passenger Details</span>
          </div>
          <ChevronRight size={14} />
          <div className="flex items-center gap-1.5 text-green-600">
            <span className="w-5 h-5 rounded-full bg-green-50 text-green-600 border border-green-200 flex items-center justify-center text-[10px]">✓</span>
            <span>Add-ons</span>
          </div>
          <ChevronRight size={14} />
          <div className="flex items-center gap-1.5 text-brand-orange">
            <span className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px]">3</span>
            <span>Payment</span>
          </div>
          <ChevronRight size={14} />
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-[10px]">4</span>
            <span>Confirmation</span>
          </div>
        </div>
      </div>

      <div className="premium-container px-4 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Card inputs */}
        <div className="flex-1 flex flex-col gap-6">
          
          <button 
            onClick={() => router.back()}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-primary w-fit transition-colors uppercase tracking-wider disabled:opacity-50"
          >
            <ArrowLeft size={14} /> Back to Extras
          </button>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            
            {/* Direct loading overlay */}
            {loading && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center gap-4">
                <span className="w-12 h-12 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
                <div className="text-center">
                  <h4 className="text-base font-bold text-brand-primary mb-1">Authorizing Transaction</h4>
                  <p className="text-xs text-slate-500 font-medium">Securing e-ticket assignment, please do not close window...</p>
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold text-brand-primary mb-2 flex items-center gap-2">
              <Lock className="text-brand-orange" size={24} /> Secure Payment
            </h2>
            <p className="text-xs text-slate-400 font-semibold mb-6">
              Please enter your credit or debit card details below. All info is fully encrypted.
            </p>

            {validationError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-2.5 text-xs font-semibold text-red-600">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Cardholder Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                  <User size={12} /> Cardholder Name
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. JOHN SMITH"
                  value={cardName} 
                  onChange={(e) => setCardName(e.target.value.toUpperCase())}
                  className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300 uppercase"
                />
              </div>

              {/* Card Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                  <CreditCard size={12} /> Card Number
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber} 
                  onChange={handleCardNumberChange}
                  className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold tracking-wider focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300"
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                    <Calendar size={12} /> Expiration Date
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="MM/YY"
                    value={expiry} 
                    onChange={handleExpiryChange}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold tracking-wider focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                    <Lock size={12} /> CVV / Security Code
                  </label>
                  <input 
                    type="password" 
                    required
                    placeholder="000"
                    value={cvv} 
                    onChange={handleCvvChange}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold tracking-widest focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-green-500" /> PCI-DSS Compliant Encryption
                </span>
                <button
                  type="submit"
                  className="w-full md:w-auto px-7 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Pay Securely &amp; Book
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Side: Sticky summary card */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sticky top-[150px] space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 pb-3.5 border-b border-slate-100">
              Payment Breakdown
            </h3>

            {/* Flight segment */}
            <div className="text-xs font-semibold text-slate-600 space-y-1.5">
              <div className="flex justify-between font-bold text-brand-primary">
                <span>Flight Route</span>
                <span>{origin} ➔ {destination}</span>
              </div>
              <div className="flex justify-between">
                <span>Passenger name</span>
                <span className="uppercase">{firstName.substring(0,1)}. {lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Selected Seat</span>
                <span>{seat}</span>
              </div>
              <div className="flex justify-between">
                <span>Additional bags</span>
                <span>{bags} Bag{bags !== '1' ? 's' : ''}</span>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 text-xs font-semibold text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between text-sm font-bold text-brand-primary">
                <span>Charged Amount</span>
                <span className="text-brand-orange">${total}</span>
              </div>
            </div>

            {/* Security Logos */}
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex justify-between items-center opacity-65">
              <span className="text-[9px] font-black text-slate-400">VISA</span>
              <span className="text-[9px] font-black text-slate-400">MASTERCARD</span>
              <span className="text-[9px] font-black text-slate-400">AMEX</span>
              <span className="text-[9px] font-black text-slate-400">STRIPE</span>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
