'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, ShieldCheck, CreditCard, ChevronRight, 
  User, Mail, Phone, Calendar, Info, CheckCircle, Plane 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function PassengerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State
  const flightId = searchParams.get('flightId') || 'FL-1000';
  const price = parseInt(searchParams.get('price') || '380', 10);
  const origin = searchParams.get('origin') || 'JFK';
  const destination = searchParams.get('destination') || 'LAX';
  const adults = parseInt(searchParams.get('adults') || '1', 10);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!firstName.trim() || !lastName.trim()) {
      setValidationError('Please enter full passenger name.');
      return;
    }
    if (!dob) {
      setValidationError('Please enter date of birth.');
      return;
    }
    if (!email.includes('@')) {
      setValidationError('Please enter a valid email address.');
      return;
    }
    if (phone.length < 7) {
      setValidationError('Please enter a valid phone number.');
      return;
    }

    // Direct to add-ons step with same parameters
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('firstName', firstName);
    nextParams.set('lastName', lastName);
    router.push(`/booking/addons?${nextParams.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-text-main">
      <Header overlay={false} />

      {/* Progress Stepper bar */}
      <div className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="premium-container px-4 flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-brand-orange">
            <span className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px]">1</span>
            <span>Passenger Details</span>
          </div>
          <ChevronRight size={14} />
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-[10px]">2</span>
            <span>Add-ons</span>
          </div>
          <ChevronRight size={14} />
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 border border-slate-200 flex items-center justify-center text-[10px]">3</span>
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
        
        {/* Left Side: Form */}
        <div className="flex-1 flex flex-col gap-6">
          
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-primary w-fit transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Search Results
          </button>

          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-brand-primary mb-6 flex items-center gap-2">
              <User className="text-brand-orange" size={24} /> Passenger Information
            </h2>

            {validationError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 flex items-start gap-2.5 text-xs font-semibold text-red-600">
                <Info size={16} className="shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em]">First / Given Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. JOHN"
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value.toUpperCase())}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300 uppercase"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em]">Last / Surname</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. SMITH"
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value.toUpperCase())}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300 uppercase"
                  />
                </div>
              </div>

              {/* Row 2: Gender & DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em]">Gender</label>
                  <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1 gap-1 text-sm font-semibold">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
                        gender === 'male' ? 'bg-white shadow-sm text-brand-primary font-bold' : 'text-slate-400 hover:text-brand-primary'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`flex-1 py-2 text-center rounded-lg transition-colors cursor-pointer ${
                        gender === 'female' ? 'bg-white shadow-sm text-brand-primary font-bold' : 'text-slate-400 hover:text-brand-primary'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                    <Calendar size={12} /> Date of Birth
                  </label>
                  <input 
                    type="date" 
                    required
                    value={dob} 
                    onChange={(e) => setDob(e.target.value)}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all text-slate-800"
                  />
                </div>
              </div>

              {/* Row 3: Contacts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. john.smith@gmail.com"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] uppercase text-slate-500 font-bold tracking-[0.09em] flex items-center gap-1">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. 212-555-0199"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-11 px-3.5 border border-slate-200 rounded-xl bg-slate-50/50 text-sm font-semibold focus:outline-none focus:border-brand-orange focus:bg-white focus:ring-4 focus:ring-brand-orange/10 transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                  <ShieldCheck size={16} className="text-green-500" /> Secure 256-bit SSL Connection
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  Continue to Add-ons
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Right Side: Sticky summary card */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sticky top-[150px] space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 pb-3.5 border-b border-slate-100">
              Trip Summary
            </h3>

            {/* Flight info */}
            <div>
              <div className="flex items-center gap-2 text-sm font-bold text-brand-primary mb-1">
                <span>{origin}</span>
                <Plane size={12} className="text-brand-orange rotate-90" />
                <span>{destination}</span>
              </div>
              <span className="block text-xs text-slate-500 font-medium">Selected Ticket Ref: {flightId}</span>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Base Fare (Consolidator Rate)</span>
                <span>${price}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes &amp; Agent Fees</span>
                <span>$40</span>
              </div>
              <div className="flex justify-between pt-3.5 border-t border-slate-100 text-sm font-bold text-brand-primary">
                <span>Total Cost</span>
                <span className="text-brand-orange">${price + 40}</span>
              </div>
            </div>

            {/* Trust highlights */}
            <div className="bg-slate-50 p-3 rounded-xl space-y-2 border border-slate-100">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <CheckCircle size={14} className="text-green-500" /> Verified Agent Rates
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <CheckCircle size={14} className="text-green-500" /> Free Ticket Cancellation (24h)
              </div>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default function PassengerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <PassengerContent />
    </Suspense>
  );
}
