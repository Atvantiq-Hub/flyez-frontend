'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, ShieldCheck, CheckCircle, ChevronRight, 
  Armchair, Briefcase, Plus, Minus, Info
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Seat {
  id: string;
  row: number;
  col: string;
  type: 'extra' | 'standard' | 'occupied';
  price: number;
}

function AddonsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL State
  const flightId = searchParams.get('flightId') || 'FL-1000';
  const price = parseInt(searchParams.get('price') || '380', 10);
  const origin = searchParams.get('origin') || 'JFK';
  const destination = searchParams.get('destination') || 'LAX';
  const firstName = searchParams.get('firstName') || 'JOHN';
  const lastName = searchParams.get('lastName') || 'SMITH';

  // Add-ons State
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [checkedBags, setCheckedBags] = useState<number>(0);

  // Seat pricing
  const getSeatPrice = (seatId: string | null) => {
    if (!seatId) return 0;
    const row = parseInt(seatId.slice(0, -1), 10);
    return row <= 5 ? 45 : 15; // Extra legroom rows 1-5
  };

  const seatFee = getSeatPrice(selectedSeat);
  const baggageFee = checkedBags * 35;
  const finalTotal = price + 40 + seatFee + baggageFee;

  // Generate seat grid: rows 1 to 15, cols A to F
  const rows = Array.from({ length: 12 }).map((_, r) => r + 1);
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleSeatClick = (seatId: string, isOccupied: boolean) => {
    if (isOccupied) return;
    setSelectedSeat(prev => prev === seatId ? null : seatId);
  };

  const handleSubmit = () => {
    const nextParams = new URLSearchParams(searchParams);
    if (selectedSeat) nextParams.set('seat', selectedSeat);
    nextParams.set('bags', String(checkedBags));
    nextParams.set('total', String(finalTotal));
    router.push(`/booking/payment?${nextParams.toString()}`);
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
          <div className="flex items-center gap-1.5 text-brand-orange">
            <span className="w-5 h-5 rounded-full bg-brand-orange text-white flex items-center justify-center text-[10px]">2</span>
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
        
        {/* Left Side: Customize Extras */}
        <div className="flex-1 flex flex-col gap-8">
          
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-brand-primary w-fit transition-colors uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Passenger Details
          </button>

          {/* Seat selection block */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-brand-primary mb-2 flex items-center gap-2">
              <Armchair className="text-brand-orange" size={24} /> Select Your Seat
            </h2>
            <p className="text-xs text-slate-400 font-semibold mb-6">
              Choose your preferred seating. Extra legroom seats are highlighted in light orange.
            </p>

            {/* Seat Map Grid */}
            <div className="flex flex-col items-center bg-slate-50 border border-slate-100 p-6 rounded-2xl max-w-md mx-auto">
              
              {/* Airplane Nose indicator */}
              <div className="w-32 h-10 bg-slate-200 rounded-t-full border-t border-x border-slate-300 flex items-center justify-center text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-6">
                Cockpit
              </div>

              {/* Legend */}
              <div className="flex gap-4 mb-6 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-slate-200 border border-slate-300" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-brand-orange border border-brand-orange-hover" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-slate-300 opacity-40 cursor-not-allowed" />
                  <span>Occupied</span>
                </div>
              </div>

              {/* Rows */}
              <div className="space-y-3 w-full">
                {rows.map(row => {
                  const isExtraLegroom = row <= 5;
                  
                  return (
                    <div key={row} className="flex items-center justify-between gap-1">
                      
                      {/* Left col seats */}
                      <div className="flex gap-1.5">
                        {cols.slice(0, 3).map(col => {
                          const seatId = `${row}${col}`;
                          // Mock occupied seats
                          const isOccupied = (row * 7 + col.charCodeAt(0)) % 3 === 0;
                          const isSelected = selectedSeat === seatId;
                          
                          return (
                            <button
                              key={col}
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(seatId, isOccupied)}
                              className={`w-7 h-7 rounded border text-[9px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                                isOccupied 
                                  ? 'bg-slate-300 border-slate-300 opacity-40 cursor-not-allowed text-transparent' 
                                  : isSelected
                                    ? 'bg-brand-orange border-brand-orange text-white shadow-sm scale-105'
                                    : isExtraLegroom
                                      ? 'bg-brand-orange/5 border-brand-orange/30 hover:border-brand-orange text-brand-orange hover:bg-brand-orange/10'
                                      : 'bg-white border-slate-200 hover:border-slate-400 text-slate-700'
                              }`}
                              title={`${seatId} (${isExtraLegroom ? 'Extra Legroom - $45' : 'Standard - $15'})`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>

                      {/* Row Label */}
                      <span className="text-[10px] font-bold text-slate-400 w-5 text-center">{row}</span>

                      {/* Right col seats */}
                      <div className="flex gap-1.5">
                        {cols.slice(3).map(col => {
                          const seatId = `${row}${col}`;
                          const isOccupied = (row * 5 + col.charCodeAt(0)) % 4 === 0;
                          const isSelected = selectedSeat === seatId;
                          
                          return (
                            <button
                              key={col}
                              disabled={isOccupied}
                              onClick={() => handleSeatClick(seatId, isOccupied)}
                              className={`w-7 h-7 rounded border text-[9px] font-bold flex items-center justify-center transition-all cursor-pointer ${
                                isOccupied 
                                  ? 'bg-slate-300 border-slate-300 opacity-40 cursor-not-allowed text-transparent' 
                                  : isSelected
                                    ? 'bg-brand-orange border-brand-orange text-white shadow-sm scale-105'
                                    : isExtraLegroom
                                      ? 'bg-brand-orange/5 border-brand-orange/30 hover:border-brand-orange text-brand-orange hover:bg-brand-orange/10'
                                      : 'bg-white border-slate-200 hover:border-slate-400 text-slate-700'
                              }`}
                              title={`${seatId} (${isExtraLegroom ? 'Extra Legroom - $45' : 'Standard - $15'})`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Baggage block */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-brand-primary mb-2 flex items-center gap-2">
              <Briefcase className="text-brand-orange" size={24} /> Checked Baggage
            </h2>
            <p className="text-xs text-slate-400 font-semibold mb-6">
              Need additional bags? Pre-paying is up to 50% cheaper than airport rates.
            </p>

            <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl max-w-md">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-brand-orange/10 text-brand-orange rounded-xl">
                  <Briefcase size={22} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-brand-primary">Additional Checked Bag</span>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">$35 / bag per flight</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCheckedBags(prev => Math.max(0, prev - 1))}
                  className={`w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center transition-colors cursor-pointer ${
                    checkedBags > 0 ? 'text-brand-orange hover:bg-white' : 'text-slate-300 opacity-50 cursor-not-allowed'
                  }`}
                  disabled={checkedBags <= 0}
                >
                  <Minus size={14} />
                </button>
                <span className="text-sm font-bold w-4 text-center">{checkedBags}</span>
                <button
                  type="button"
                  onClick={() => setCheckedBags(prev => Math.min(3, prev + 1))}
                  className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-brand-orange hover:bg-white transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Sticky summary card */}
        <div className="w-full lg:w-[360px] shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sticky top-[150px] space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 pb-3.5 border-b border-slate-100">
              Pricing Details
            </h3>

            {/* Flight info */}
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Passenger</span>
              <span className="block text-sm font-bold text-brand-primary uppercase">{firstName} {lastName}</span>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 text-xs font-semibold text-slate-600">
              <div className="flex justify-between">
                <span>Flight Ticket &amp; Taxes</span>
                <span>${price + 40}</span>
              </div>
              {selectedSeat && (
                <div className="flex justify-between text-brand-orange">
                  <span>Selected Seat ({selectedSeat})</span>
                  <span>+${seatFee}</span>
                </div>
              )}
              {checkedBags > 0 && (
                <div className="flex justify-between text-brand-orange">
                  <span>Checked Baggage ({checkedBags} bag{checkedBags > 1 ? 's' : ''})</span>
                  <span>+${baggageFee}</span>
                </div>
              )}
              <div className="flex justify-between pt-3.5 border-t border-slate-100 text-sm font-bold text-brand-primary">
                <span>Final Balance</span>
                <span className="text-brand-orange">${finalTotal}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer text-center block"
            >
              Proceed to Payment
            </button>

            {/* Security */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-green-500" /> Secure Payment Clearances
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}

export default function AddonsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <AddonsContent />
    </Suspense>
  );
}
