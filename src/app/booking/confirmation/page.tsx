'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  CheckCircle, FileText, Download, Printer, 
  Home, Plane, User, Armchair, Briefcase, Calendar 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

function ConfirmationContent() {
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
  const pnr = searchParams.get('pnr') || 'X7Y9Z2';

  const handleDownloadReceipt = () => {
    const lines = [
      'FLYEZ — E-TICKET ITINERARY RECEIPT',
      '='.repeat(40),
      `Reservation Reference (PNR): ${pnr}`,
      `Flight / Sector: ${origin} -> ${destination}`,
      `Reference: ${flightId}`,
      `Passenger: ${firstName} ${lastName}`,
      `Seat Assignment: ${seat}`,
      `Checked Baggage: ${bags} bag${bags !== '1' ? 's' : ''}`,
      `Total Paid: $${total}`,
      '',
      'Thank you for booking with FlyEz.',
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FlyEz-Itinerary-${pnr}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-text-main">
      <Header overlay={false} />

      <div className="premium-container px-4 py-16 flex-1 flex items-center justify-center">
        
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 md:p-10 shadow-lg max-w-2xl w-full text-center space-y-8 relative overflow-hidden">
          
          {/* Confetti-like vector top accent */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"></div>

          {/* Success Check Badge */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 text-green-500 flex items-center justify-center shadow-inner animate-[fadeIn_0.5s_ease-out]">
              <CheckCircle size={36} />
            </div>
            <h2 className="text-3xl font-display font-semibold text-brand-primary tracking-tight">
              Booking Successfully Confirmed!
            </h2>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Reservation Reference Code (PNR)
            </p>
            <div className="bg-slate-100 border border-slate-200/80 rounded-xl px-5 py-2.5 font-black text-2xl text-brand-primary tracking-widest select-all w-fit shadow-sm">
              {pnr}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              We have dispatched your e-ticket itinerary receipt to your email address.
            </p>
          </div>

          {/* Ticket Information Matrix */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 text-left space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 pb-2 border-b border-slate-200/60">
              E-Ticket Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
              
              {/* Flight details */}
              <div className="flex items-start gap-2.5">
                <Plane size={16} className="text-brand-orange mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Flight / Sector</span>
                  <span className="block text-sm font-bold text-brand-primary">{origin} ➔ {destination}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5">Reference: {flightId}</span>
                </div>
              </div>

              {/* Passenger */}
              <div className="flex items-start gap-2.5">
                <User size={16} className="text-brand-orange mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Primary Traveler</span>
                  <span className="block text-sm font-bold text-brand-primary uppercase">{firstName} {lastName}</span>
                </div>
              </div>

              {/* Seat */}
              <div className="flex items-start gap-2.5">
                <Armchair size={16} className="text-brand-orange mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Selected Seat Assignment</span>
                  <span className="block text-sm font-bold text-brand-primary">{seat}</span>
                </div>
              </div>

              {/* Baggage */}
              <div className="flex items-start gap-2.5">
                <Briefcase size={16} className="text-brand-orange mt-0.5" />
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Checked Baggage Allowance</span>
                  <span className="block text-sm font-bold text-brand-primary">{bags} Checked Bag{bags !== '1' ? 's' : ''}</span>
                </div>
              </div>

            </div>

            {/* Total paid */}
            <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-500">Secure Payment Amount</span>
              <span className="text-base font-black text-brand-orange">${total} Paid</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:border-slate-400 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-primary hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer size={14} /> Print Itinerary
            </button>
            <button
              onClick={handleDownloadReceipt}
              className="w-full sm:w-auto px-5 py-2.5 border border-slate-200 hover:border-slate-400 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-primary hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <Download size={14} /> Download Receipt
            </button>
            <button
              onClick={() => router.push('/')}
              className="w-full sm:w-auto px-6 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-bold hover:bg-brand-primary/95 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md hover:shadow-lg"
            >
              <Home size={14} /> Back to Homepage
            </button>
          </div>

        </div>

      </div>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  );
}
