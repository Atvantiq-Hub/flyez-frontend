'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Filter, SlidersHorizontal, ShieldCheck, 
  HelpCircle, ChevronDown, ChevronUp, Plane, Info, Check, AlertCircle 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Mock flight data generator based on search parameters
interface Flight {
  id: string;
  airline: string;
  logoCode: string;
  flightNo: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  stops: number;
  stopsInfo: string;
  cabinClass: string;
  publicPrice: number;
  consolidatorPrice: number;
  refundable: boolean;
  baggageIncluded: boolean;
  seatsLeft: number;
}

function FlightsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Search parameters
  const origin = searchParams.get('origin') || 'JFK';
  const destination = searchParams.get('destination') || 'LAX';
  const type = searchParams.get('type') || 'round';
  const cabinCode = searchParams.get('cabin') || 'E';
  const adults = parseInt(searchParams.get('adults') || '1', 10);
  
  const cabinLabel = {
    'E': 'Economy',
    'P': 'Premium Economy',
    'B': 'Business',
    'F': 'First Class'
  }[cabinCode] || 'Economy';

  // Filters state
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1800);
  const [maxStops, setMaxStops] = useState<number>(2);
  const [expandedFlightId, setExpandedFlightId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'recommend'>('recommend');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Generate mock flights
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate premium loader
    const timer = setTimeout(() => {
      const basePublicPrice = cabinCode === 'F' ? 4200 : cabinCode === 'B' ? 2400 : cabinCode === 'P' ? 1100 : 490;
      const airlinePool = [
        { name: 'American Airlines', code: 'AA' },
        { name: 'United Airlines', code: 'UA' },
        { name: 'Delta Air Lines', code: 'DL' },
        { name: 'Qatar Airways', code: 'QR' },
        { name: 'Emirates', code: 'EK' },
        { name: 'Lufthansa', code: 'LH' }
      ];

      const generated: Flight[] = Array.from({ length: 8 }).map((_, idx) => {
        const airline = airlinePool[idx % airlinePool.length];
        const stops = idx === 0 ? 0 : idx === 1 ? 1 : idx % 3 === 0 ? 2 : 0;
        const durationHours = stops === 0 ? 5 : stops === 1 ? 8 : 14;
        const durationMin = Math.floor(Math.random() * 45) + 15;
        const publicPrice = basePublicPrice + (idx * 65) + Math.floor(Math.random() * 40);
        // Consolidator agent rate is significantly cheaper (wow factor / trust builder)
        const consolidatorPrice = Math.floor(publicPrice * 0.78);

        return {
          id: `FL-${1000 + idx}`,
          airline: airline.name,
          logoCode: airline.code,
          flightNo: `${airline.code}-${Math.floor(Math.random() * 900) + 100}`,
          departureTime: `${String(6 + (idx * 2) % 12).padStart(2, '0')}:${idx % 2 === 0 ? '15' : '45'} ${idx * 2 >= 12 ? 'PM' : 'AM'}`,
          arrivalTime: `${String((11 + idx * 2) % 12 || 12).padStart(2, '0')}:${idx % 2 === 0 ? '45' : '15'} ${idx * 2 >= 8 ? 'PM' : 'AM'}`,
          duration: `${durationHours}h ${durationMin}m`,
          stops,
          stopsInfo: stops === 0 ? 'Nonstop' : stops === 1 ? '1 Stop (ORD)' : `${stops} Stops (LHR, DXB)`,
          cabinClass: cabinLabel,
          publicPrice,
          consolidatorPrice,
          refundable: idx % 2 === 0,
          baggageIncluded: idx % 3 !== 2,
          seatsLeft: Math.floor(Math.random() * 5) + 1
        };
      });

      setFlights(generated);
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [cabinCode, cabinLabel]);

  // Handle flight selection
  const handleSelectFlight = (flight: Flight) => {
    const selectedParams = new URLSearchParams(searchParams);
    selectedParams.set('flightId', flight.id);
    selectedParams.set('price', String(flight.consolidatorPrice));
    router.push(`/booking/passenger?${selectedParams.toString()}`);
  };

  // Filter list
  const filteredFlights = flights.filter(f => {
    if (selectedAirlines.length > 0 && !selectedAirlines.includes(f.airline)) return false;
    if (f.consolidatorPrice > maxPrice) return false;
    if (f.stops > maxStops) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price') return a.consolidatorPrice - b.consolidatorPrice;
    if (sortBy === 'duration') return parseFloat(a.duration) - parseFloat(b.duration);
    return a.publicPrice - b.publicPrice; // recommend
  });

  const toggleAirlineFilter = (airline: string) => {
    setSelectedAirlines(prev => 
      prev.includes(airline) ? prev.filter(a => a !== airline) : [...prev, airline]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-brand-text-main">
      <Header overlay={false} />

      {/* Sticky Search Summary Bar */}
      <div className="bg-brand-primary text-white py-3.5 border-b border-white/10 z-40 sticky top-[64px] shadow-md">
        <div className="premium-container px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => router.push('/')} 
              className="p-1.5 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-base font-bold">
                <span>{origin}</span>
                <Plane size={14} className="text-brand-orange rotate-90" />
                <span>{destination}</span>
              </div>
              <div className="text-xs text-white/60 font-medium">
                {type === 'round' ? 'Round Trip' : type === 'one' ? 'One Way' : 'Multi-City'} • {adults} Adult{adults > 1 ? 's' : ''} • {cabinLabel}
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/')}
            className="text-xs font-bold text-white hover:text-brand-orange border border-white/20 hover:border-brand-orange px-3.5 py-1.5 rounded-lg transition-all duration-300"
          >
            Edit Search
          </button>
        </div>
      </div>

      <div className="premium-container px-4 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-[280px] shrink-0">
          <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sticky top-[150px]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <span className="font-bold text-sm tracking-wide text-brand-primary uppercase">Filters</span>
              <button 
                onClick={() => {
                  setSelectedAirlines([]);
                  setMaxPrice(1800);
                  setMaxStops(2);
                }} 
                className="text-xs font-semibold text-brand-orange hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Stops */}
            <div className="mb-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Stops</span>
              <div className="flex flex-col gap-2">
                {[
                  { value: 0, label: 'Nonstop' },
                  { value: 1, label: '1 Stop' },
                  { value: 2, label: '2+ Stops' }
                ].map(stop => (
                  <label key={stop.value} className="flex items-center gap-2.5 text-sm font-semibold cursor-pointer">
                    <input 
                      type="radio" 
                      name="stops"
                      checked={maxStops === stop.value}
                      onChange={() => setMaxStops(stop.value)}
                      className="w-4 h-4 accent-brand-orange"
                    />
                    <span>{stop.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                <span>Max Budget</span>
                <span className="text-brand-primary">${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="300" 
                max="3000" 
                step="50"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                <span>$300</span>
                <span>$3,000</span>
              </div>
            </div>

            {/* Airlines */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Preferred Airlines</span>
              <div className="flex flex-col gap-2.5">
                {['American Airlines', 'United Airlines', 'Delta Air Lines', 'Qatar Airways', 'Emirates', 'Lufthansa'].map(airline => (
                  <label key={airline} className="flex items-center gap-2.5 text-sm font-semibold cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={selectedAirlines.includes(airline)}
                      onChange={() => toggleAirlineFilter(airline)}
                      className="w-4 h-4 rounded accent-brand-orange border-slate-300"
                    />
                    <span className="truncate">{airline}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Flight List Area */}
        <main className="flex-1">
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {filteredFlights.length} Flight{filteredFlights.length !== 1 ? 's' : ''} Found
            </span>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors"
              >
                <Filter size={14} /> Filter
              </button>
              
              <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100 text-xs font-bold">
                {[
                  { id: 'recommend', label: 'Best Fares' },
                  { id: 'price', label: 'Cheapest' },
                  { id: 'duration', label: 'Fastest' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSortBy(tab.id as any)}
                    className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      sortBy === tab.id 
                        ? 'bg-white shadow-sm text-brand-primary' 
                        : 'text-slate-400 hover:text-brand-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Skeleton Loader Simulation */}
          {loading ? (
            <div className="flex flex-col gap-5">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-white border border-slate-200/80 rounded-2xl p-6 animate-pulse">
                  <div className="flex justify-between items-center mb-6">
                    <div className="h-6 w-32 bg-slate-100 rounded-md"></div>
                    <div className="h-4 w-20 bg-slate-100 rounded-md"></div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-6 justify-between items-stretch">
                    <div className="flex-1 flex gap-4 items-center">
                      <div className="w-10 h-10 bg-slate-100 rounded-full"></div>
                      <div className="space-y-2 flex-1">
                        <div className="h-5 w-40 bg-slate-100 rounded-md"></div>
                        <div className="h-4 w-24 bg-slate-100 rounded-md"></div>
                      </div>
                    </div>
                    <div className="w-full md:w-36 h-10 bg-slate-100 rounded-xl self-center"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredFlights.length === 0 ? (
            <div className="bg-white border border-slate-200/80 rounded-2xl py-16 px-6 text-center shadow-sm">
              <AlertCircle size={48} className="text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-primary mb-2">No Flights Match Your Filters</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6">
                Try widening your budget, adjusting the stops, or clearing preferred airline restrictions.
              </p>
              <button 
                onClick={() => {
                  setSelectedAirlines([]);
                  setMaxPrice(1800);
                  setMaxStops(2);
                }}
                className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl hover:bg-brand-primary/90 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {filteredFlights.map((flight) => {
                const isExpanded = expandedFlightId === flight.id;
                
                return (
                  <div 
                    key={flight.id} 
                    className={`bg-white border transition-all duration-300 rounded-2xl ${
                      isExpanded 
                        ? 'border-brand-orange ring-1 ring-brand-orange/20 shadow-lg' 
                        : 'border-slate-200/80 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    {/* Main Ticket Card Header/Content */}
                    <div className="p-5 md:p-6 flex flex-col md:flex-row items-stretch justify-between gap-6">
                      
                      {/* Left Block: Airline and Route details */}
                      <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
                        {/* Airline Carrier Indicator */}
                        <div className="flex items-center gap-3.5 w-full md:w-48 shrink-0">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-sm text-slate-800 tracking-tighter shrink-0 shadow-inner">
                            {flight.logoCode}
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-brand-primary leading-tight">{flight.airline}</span>
                            <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">{flight.flightNo}</span>
                          </div>
                        </div>

                        {/* Route Progression */}
                        <div className="flex items-center justify-between md:justify-start gap-5 w-full md:w-auto flex-1">
                          <div className="text-left">
                            <span className="block text-lg font-black text-brand-primary leading-none mb-1">{flight.departureTime}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{origin}</span>
                          </div>

                          {/* Interactive Vector Route Line */}
                          <div className="flex-1 flex flex-col items-center min-w-[70px] max-w-[120px] relative px-1">
                            <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase mb-1 leading-none">
                              {flight.duration}
                            </span>
                            <div className="w-full h-[2px] bg-slate-200 relative flex items-center justify-center">
                              {/* Central stop dot indicator */}
                              {flight.stops > 0 && (
                                <div className="absolute w-1.5 h-1.5 rounded-full bg-brand-orange ring-2 ring-white" />
                              )}
                            </div>
                            <span className={`text-[9px] font-bold mt-1 leading-none ${flight.stops === 0 ? 'text-green-600' : 'text-brand-orange'}`}>
                              {flight.stopsInfo}
                            </span>
                          </div>

                          <div className="text-right">
                            <span className="block text-lg font-black text-brand-primary leading-none mb-1">{flight.arrivalTime}</span>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{destination}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Block: Fare Split Pricing Panel */}
                      <div className="w-full md:w-56 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 md:border-l md:border-slate-100 md:pl-6 shrink-0">
                        <div className="text-left md:text-right">
                          <div className="flex items-baseline justify-end gap-1.5 mb-0.5">
                            <span className="text-xs text-slate-400 font-medium line-through">${flight.publicPrice}</span>
                            <span className="text-2xl font-black text-brand-primary tracking-tight">${flight.consolidatorPrice}</span>
                          </div>
                          <span className="block text-[10px] font-extrabold uppercase bg-green-50 text-green-600 border border-green-100 px-2 py-0.5 rounded-md leading-none tracking-wider w-fit md:ml-auto">
                            Consolidator Agent Rate
                          </span>
                        </div>

                        <button
                          onClick={() => handleSelectFlight(flight)}
                          className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider shadow-[0_3px_12px_rgba(255,92,0,0.22)] hover:shadow-[0_4px_18px_rgba(255,92,0,0.32)] transition-all duration-200 cursor-pointer active:scale-95"
                        >
                          Select Fare
                        </button>
                      </div>
                    </div>

                    {/* Bottom Utility Row (Expandable Drawer & Badges) */}
                    <div className="bg-slate-50/70 border-t border-slate-100 px-5 py-2.5 flex items-center justify-between rounded-b-2xl">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck size={12} className="text-green-500" /> Secure Seat
                        </span>
                        {flight.refundable && (
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Check size={12} className="text-green-500" /> Fully Refundable
                          </span>
                        )}
                        {flight.baggageIncluded && (
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Check size={12} className="text-green-500" /> Baggage Included
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => setExpandedFlightId(isExpanded ? null : flight.id)}
                        className="text-xs font-bold text-slate-500 hover:text-brand-orange flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {isExpanded ? 'Hide Details' : 'Show Details'} 
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </div>

                    {/* Expanded Drawer: Details Matrix */}
                    {isExpanded && (
                      <div className="p-6 border-t border-slate-100 bg-slate-50/30 animate-[fadeIn_0.2s_ease-out]">
                        <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Flight Segment Breakdown</h5>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white border border-slate-100 rounded-xl p-5 mb-5">
                          <div className="space-y-1.5 text-xs font-semibold">
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              <span>Cabin Class: <strong className="text-brand-primary">{flight.cabinClass}</strong></span>
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              <span>Fare Base Code: <strong className="text-brand-primary">L-AP7 Consolidator</strong></span>
                            </p>
                          </div>

                          <div className="space-y-1.5 text-xs font-semibold">
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              <span>Booking Security: <strong className="text-brand-primary">Instant e-ticket Delivery</strong></span>
                            </p>
                            <p className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                              <span>Availability: <strong className="text-brand-orange">{flight.seatsLeft} seats left</strong></span>
                            </p>
                          </div>
                        </div>

                        {/* Price transparency comparison table */}
                        <div className="border border-slate-100 rounded-xl overflow-hidden text-xs">
                          <div className="grid grid-cols-3 bg-slate-100/60 p-3 font-bold text-slate-500 uppercase tracking-wider">
                            <span>Fare Type</span>
                            <span className="text-center">Public Rate</span>
                            <span className="text-right text-brand-orange">FlyEz Consolidator Rate</span>
                          </div>
                          <div className="grid grid-cols-3 p-3 border-b border-slate-100 font-semibold text-slate-600">
                            <span>Base Airfare</span>
                            <span className="text-center">${Math.floor(flight.publicPrice * 0.9)}</span>
                            <span className="text-right">${Math.floor(flight.consolidatorPrice * 0.9)}</span>
                          </div>
                          <div className="grid grid-cols-3 p-3 border-b border-slate-100 font-semibold text-slate-600">
                            <span>Taxes &amp; Carrier Fees</span>
                            <span className="text-center">${Math.floor(flight.publicPrice * 0.1)}</span>
                            <span className="text-right">${Math.floor(flight.consolidatorPrice * 0.1)}</span>
                          </div>
                          <div className="grid grid-cols-3 bg-slate-50/50 p-3 font-bold text-brand-primary text-sm">
                            <span>Total (Inc. Taxes)</span>
                            <span className="text-center">${flight.publicPrice}</span>
                            <span className="text-right text-brand-orange">${flight.consolidatorPrice}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Drawer Filter Panel Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-[1100] bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease]">
          <div className="absolute bottom-0 left-0 w-full bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto p-6 flex flex-col gap-6 animate-[slideUp_0.25s_ease-out]">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-base font-bold text-brand-primary uppercase tracking-wide">Filter Fares</span>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="text-xs font-bold text-slate-400 hover:text-black"
              >
                Close
              </button>
            </div>

            {/* Stops */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Stops</span>
              <div className="flex gap-4">
                {[
                  { value: 0, label: 'Nonstop' },
                  { value: 1, label: '1 Stop' },
                  { value: 2, label: '2+ Stops' }
                ].map(stop => (
                  <button
                    key={stop.value}
                    onClick={() => setMaxStops(stop.value)}
                    className={`flex-1 py-2 border rounded-xl text-xs font-bold transition-all ${
                      maxStops === stop.value 
                        ? 'border-brand-orange bg-brand-orange/5 text-brand-orange' 
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {stop.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price slider */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                <span>Max Budget</span>
                <span className="text-brand-primary">${maxPrice}</span>
              </div>
              <input 
                type="range" 
                min="300" 
                max="3000" 
                step="50"
                value={maxPrice} 
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-orange"
              />
            </div>

            {/* Airlines */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">Preferred Airlines</span>
              <div className="grid grid-cols-2 gap-3">
                {['American Airlines', 'United Airlines', 'Delta Air Lines', 'Qatar Airways', 'Emirates', 'Lufthansa'].map(airline => (
                  <button
                    key={airline}
                    onClick={() => toggleAirlineFilter(airline)}
                    className={`py-2 border rounded-xl text-xs font-semibold truncate px-3 text-left transition-all ${
                      selectedAirlines.includes(airline)
                        ? 'border-brand-orange bg-brand-orange/5 text-brand-orange font-bold'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    {airline.split(' ')[0]} Airlines
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowMobileFilters(false)}
              className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg mt-2 cursor-pointer"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin"></span>
      </div>
    }>
      <FlightsContent />
    </Suspense>
  );
}
