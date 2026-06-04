'use client';

import React, { useState } from 'react';
import { Calendar, Search, ArrowLeftRight, Plus, Trash2, ShieldAlert } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';
import PassengerCountSelector from './PassengerCountSelector';

interface MultiFlight {
  origin: string;
  originName: string;
  destination: string;
  destinationName: string;
  date: string;
}

export default function FlightSearchForm() {
  const [tripType, setTripType] = useState<'round' | 'oneway' | 'multicity'>('round');
  const [cabin, setCabin] = useState('E'); // 'E' (Economy), 'B' (Business), 'F' (First), 'P' (Premium)
  
  // Passenger state
  const [adults, setAdults] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childAges, setChildAges] = useState<string[]>([]);
  const [infants, setInfants] = useState(0);

  // Round / Oneway state
  const [origin, setOrigin] = useState('');
  const [originName, setOriginName] = useState('');
  const [destination, setDestination] = useState('');
  const [destinationName, setDestinationName] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Multi-city state (defaults to 2 flights)
  const [multiFlights, setMultiFlights] = useState<MultiFlight[]>([
    { origin: '', originName: '', destination: '', destinationName: '', date: '' },
    { origin: '', originName: '', destination: '', destinationName: '', date: '' }
  ]);

  const [validationError, setValidationError] = useState('');
  const [directFlights, setDirectFlights] = useState(false);
  const [preferredAirline, setPreferredAirline] = useState('');
  const [flexibleDates, setFlexibleDates] = useState(false);
  const [nearOrigin, setNearOrigin] = useState(false);
  const [nearDest, setNearDest] = useState(false);

  // Swap origin and destination
  const handleSwap = () => {
    const tempOrigin = origin;
    const tempOriginName = originName;
    setOrigin(destination);
    setOriginName(destinationName);
    setDestination(tempOrigin);
    setDestinationName(tempOriginName);
  };

  // Convert Date from YYYY-MM-DD to MM/DD/YYYY
  const formatDateToBackend = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
  };

  // Add Multi-city flight segment
  const addMultiFlight = () => {
    if (multiFlights.length < 5) {
      setMultiFlights([...multiFlights, { origin: '', originName: '', destination: '', destinationName: '', date: '' }]);
    }
  };

  // Remove Multi-city flight segment
  const removeMultiFlight = (index: number) => {
    if (multiFlights.length > 2) {
      const updated = multiFlights.filter((_, i) => i !== index);
      setMultiFlights(updated);
    }
  };

  // Update a Multi-city flight segment parameter
  const updateMultiFlight = (index: number, field: keyof MultiFlight, value: string, nameVal = '') => {
    const updated = [...multiFlights];
    if (field === 'origin') {
      updated[index].origin = value;
      updated[index].originName = nameVal;
    } else if (field === 'destination') {
      updated[index].destination = value;
      updated[index].destinationName = nameVal;
    } else {
      updated[index][field] = value;
    }
    setMultiFlights(updated);
  };

  // Trigger search submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const queryParams = new URLSearchParams();
    queryParams.append('couch', cabin);
    queryParams.append('adult', String(adults));
    queryParams.append('children', String(childrenCount));
    queryParams.append('infant', String(infants));

    if (directFlights) {
      queryParams.append('direct', '1');
    }
    if (preferredAirline) {
      queryParams.append('airline', preferredAirline);
    }
    if (flexibleDates) {
      queryParams.append('flex', '1');
    }
    if (nearOrigin) {
      queryParams.append('nearOrigin', '1');
    }
    if (nearDest) {
      queryParams.append('nearDest', '1');
    }

    // Append child ages
    childAges.forEach((age, index) => {
      queryParams.append(`ChildrenAge_${index + 1}`, age || '2');
    });

    if (tripType !== 'multicity') {
      // Validate standard search
      if (!origin) {
        setValidationError('Please select an origin airport.');
        return;
      }
      if (!destination) {
        setValidationError('Please select a destination airport.');
        return;
      }
      if (origin === destination) {
        setValidationError('Origin and Destination airports cannot be the same.');
        return;
      }
      if (!departDate) {
        setValidationError('Please select a departure date.');
        return;
      }
      if (tripType === 'round' && !returnDate) {
        setValidationError('Please select a return date.');
        return;
      }
      if (tripType === 'round' && returnDate < departDate) {
        setValidationError('Return date must be after departure date.');
        return;
      }

      queryParams.append('tp', tripType);
      queryParams.append('d1', origin);
      queryParams.append('ar1', destination);
      queryParams.append('dt1', formatDateToBackend(departDate));
      
      if (tripType === 'round') {
        queryParams.append('ardt1', formatDateToBackend(returnDate));
      }
    } else {
      // Validate Multi-city search
      queryParams.append('tp', 'multicity');
      
      for (let i = 0; i < multiFlights.length; i++) {
        const flight = multiFlights[i];
        if (!flight.origin) {
          setValidationError(`Flight ${i + 1}: Please select an origin airport.`);
          return;
        }
        if (!flight.destination) {
          setValidationError(`Flight ${i + 1}: Please select a destination airport.`);
          return;
        }
        if (flight.origin === flight.destination) {
          setValidationError(`Flight ${i + 1}: Origin and Destination cannot be the same.`);
          return;
        }
        if (!flight.date) {
          setValidationError(`Flight ${i + 1}: Please select a departure date.`);
          return;
        }
        
        // Append fields named as: d1, ar1, dt1, d2, ar2, dt2...
        queryParams.append(`d${i + 1}`, flight.origin);
        queryParams.append(`ar${i + 1}`, flight.destination);
        queryParams.append(`dt${i + 1}`, formatDateToBackend(flight.date));
      }
    }

    // Redirect to backend flight-listing page
    const searchUrl = `https://flyez.ai/flight-listing?${queryParams.toString()}`;
    window.location.href = searchUrl;
  };

  return (
    <div className="glass-card animate-slide-up rounded-2xl p-7 max-w-[1100px] -mt-15 mx-auto relative z-10 shadow-lg">
      <form onSubmit={handleSearchSubmit}>
        {/* Top Controls: Trip Type & Cabin Class */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          {/* Trip Type Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-md">
            {[
              { id: 'round', label: 'Round Trip' },
              { id: 'oneway', label: 'One Way' },
              { id: 'multicity', label: 'Multi-City' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setTripType(tab.id as 'round' | 'oneway' | 'multicity');
                  setValidationError('');
                }}
                className={`py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ${
                  tripType === tab.id 
                    ? 'bg-white shadow-[0_2px_6px_rgba(11,26,48,0.05)] text-brand-accent' 
                    : 'bg-transparent text-brand-text-muted hover:text-brand-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Class & Airline Dropdowns */}
          <div className="flex flex-wrap items-center gap-4.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-text-muted">Class:</span>
              <div className="relative flex items-center">
                <select
                  value={cabin}
                  onChange={(e) => setCabin(e.target.value)}
                  className="appearance-none bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border-none rounded-md py-1.5 pl-3 pr-8 text-xs font-bold text-brand-primary dark:text-white cursor-pointer outline-none transition-all"
                >
                  <option value="E">Economy</option>
                  <option value="B">Business</option>
                  <option value="F">First Class</option>
                  <option value="P">Premium Economy</option>
                </select>
                <div className="absolute right-2.5 pointer-events-none text-brand-text-muted flex items-center">
                  <svg className="w-3 h-3 fill-none stroke-current" strokeWidth="3" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-brand-text-muted">Airline:</span>
              <div className="relative flex items-center">
                <select
                  value={preferredAirline}
                  onChange={(e) => setPreferredAirline(e.target.value)}
                  className="appearance-none bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 border-none rounded-md py-1.5 pl-3 pr-8 text-xs font-bold text-brand-primary dark:text-white cursor-pointer outline-none transition-all"
                >
                  <option value="">All Airlines</option>
                  <option value="AA">American Airlines (AA)</option>
                  <option value="DL">Delta Air Lines (DL)</option>
                  <option value="UA">United Airlines (UA)</option>
                  <option value="BA">British Airways (BA)</option>
                  <option value="LH">Lufthansa (LH)</option>
                  <option value="QR">Qatar Airways (QR)</option>
                  <option value="EK">Emirates (EK)</option>
                  <option value="SQ">Singapore Airlines (SQ)</option>
                </select>
                <div className="absolute right-2.5 pointer-events-none text-brand-text-muted flex items-center">
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Errors banner */}
        {validationError && (
          <div className="flex items-center gap-2.5 p-3 rounded-sm bg-red-50 border border-red-100 text-[#991b1b] text-sm font-medium mb-5">
            <ShieldAlert size={18} />
            {validationError}
          </div>
        )}

        {/* Standard Search Fields (Round trip & One way) */}
        {tripType !== 'multicity' && (
          <div className={`grid gap-4 items-stretch w-full grid-cols-1 ${
            tripType === 'round' ? 'lg:grid-cols-[2.2fr_1.1fr_1.1fr_1.2fr]' : 'lg:grid-cols-[2.2fr_1.2fr_1.4fr]'
          }`}>
            {/* From & To with absolutely overlapping Swap */}
            <div className="relative flex w-full flex-col lg:flex-row lg:col-span-1">
              <div className="flex-1 flex flex-col">
                <AirportAutocomplete 
                  label="From" 
                  placeholder="Origin Airport" 
                  value={origin} 
                  onSelect={(code, name) => {
                    setOrigin(code);
                    setOriginName(name);
                  }}
                  type={1}
                  isOrigin={true}
                  inputBorderClass="rounded-t-lg rounded-b-none border-b-0 lg:rounded-l-lg lg:rounded-r-none lg:border-r-0 lg:border-b border-brand-border"
                />
              </div>
              
              {/* Overlapping Swap button */}
              <button
                type="button"
                onClick={handleSwap}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-brand-border shadow-md flex items-center justify-center text-brand-accent z-10 cursor-pointer transition-all duration-350 hover:text-brand-orange hover:shadow-lg max-lg:top-1/2 max-lg:left-[90%] max-lg:rotate-90"
              >
                <ArrowLeftRight size={14} />
              </button>

              <div className="flex-1 flex flex-col">
                <AirportAutocomplete 
                  label="To" 
                  placeholder="Destination Airport" 
                  value={destination} 
                  onSelect={(code, name) => {
                    setDestination(code);
                    setDestinationName(name);
                  }}
                  type={2}
                  isOrigin={false}
                  inputBorderClass="rounded-b-lg rounded-t-none border-t-0 lg:rounded-r-lg lg:rounded-l-none lg:border-l-0 lg:border-t border-brand-border"
                />
              </div>
            </div>

            {/* Depart Date */}
            <div className="search-input-capsule flex flex-col justify-center py-3.5 px-4 bg-white rounded-lg border border-brand-border shadow-sm">
              <span className="text-[11px] uppercase text-brand-text-muted font-semibold flex items-center gap-1 mb-1">
                <Calendar size={12} className="text-brand-accent" />
                Depart
              </span>
              <input 
                type="date" 
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="border-none outline-none text-base font-bold text-brand-primary cursor-pointer bg-transparent"
                required
              />
            </div>

            {/* Return Date (Round trip only) */}
            {tripType === 'round' && (
              <div className="search-input-capsule flex flex-col justify-center py-3.5 px-4 bg-white rounded-lg border border-brand-border shadow-sm">
                <span className="text-[11px] uppercase text-brand-text-muted font-semibold flex items-center gap-1 mb-1">
                  <Calendar size={12} className="text-brand-orange" />
                  Return
                </span>
                <input 
                  type="date" 
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departDate || new Date().toISOString().split('T')[0]}
                  className="border-none outline-none text-base font-bold text-brand-primary cursor-pointer bg-transparent"
                  required={tripType === 'round'}
                />
              </div>
            )}

            {/* Passenger Selector */}
            <PassengerCountSelector 
              adults={adults}
              setAdults={setAdults}
              childrenCount={childrenCount}
              setChildrenCount={setChildrenCount}
              childAges={childAges}
              setChildAges={setChildAges}
              infants={infants}
              setInfants={setInfants}
            />
          </div>
        )}

        {/* Multi-City Form Segment Rows */}
        {tripType === 'multicity' && (
          <div className="flex flex-col gap-4 animate-fade-in">
            {multiFlights.map((flight, index) => (
              <div 
                key={index}
                className="grid gap-3 p-4 bg-slate-50 rounded-lg border border-dashed border-brand-border items-center grid-cols-1 md:grid-cols-[40px_1fr_1fr_1fr_48px]"
              >
                {/* Segment indicator */}
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary text-white text-xs font-bold mx-auto">
                  {index + 1}
                </div>

                {/* Origin */}
                <AirportAutocomplete 
                  label="From" 
                  placeholder="Origin Airport" 
                  value={flight.origin} 
                  onSelect={(code, name) => updateMultiFlight(index, 'origin', code, name)}
                  type={3 + index * 2}
                  isOrigin={true}
                />

                {/* Destination */}
                <AirportAutocomplete 
                  label="To" 
                  placeholder="Destination Airport" 
                  value={flight.destination} 
                  onSelect={(code, name) => updateMultiFlight(index, 'destination', code, name)}
                  type={4 + index * 2}
                  isOrigin={false}
                />

                {/* Depart Date */}
                <div className="flex flex-col py-3.5 px-4 bg-white border border-brand-border rounded-lg shadow-sm">
                  <span className="text-[11px] uppercase text-brand-text-muted font-semibold flex items-center gap-1 mb-1">
                    <Calendar size={12} className="text-brand-accent" />
                    Depart Date
                  </span>
                  <input 
                    type="date" 
                    value={flight.date}
                    onChange={(e) => updateMultiFlight(index, 'date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="border-none outline-none text-base font-bold text-brand-primary cursor-pointer bg-transparent"
                    required
                  />
                </div>

                {/* Remove button */}
                <div className="flex justify-center max-md:mt-2">
                  {multiFlights.length > 2 ? (
                    <button
                      type="button"
                      onClick={() => removeMultiFlight(index)}
                      className="p-3 rounded-md text-red-500 bg-red-500/5 border border-red-500/10 transition-colors hover:bg-red-500/15"
                    >
                      <Trash2 size={16} />
                    </button>
                  ) : (
                    <div className="w-10" />
                  )}
                </div>
              </div>
            ))}

            {/* Row adding and traveler control for multi-city */}
            <div className="flex flex-wrap justify-between items-center gap-4 mt-2.5">
              <button
                type="button"
                onClick={addMultiFlight}
                disabled={multiFlights.length >= 5}
                className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4.5 rounded-lg border border-dashed border-brand-accent bg-brand-accent/2 transition-all text-brand-accent cursor-pointer hover:bg-brand-accent/5"
              >
                <Plus size={16} /> Add Another Flight
              </button>

              <div className="w-full sm:w-[280px]">
                <PassengerCountSelector 
                  adults={adults}
                  setAdults={setAdults}
                  childrenCount={childrenCount}
                  setChildrenCount={setChildrenCount}
                  childAges={childAges}
                  setChildAges={setChildAges}
                  infants={infants}
                  setInfants={setInfants}
                />
              </div>
            </div>
          </div>
        )}

        {/* Travel Preferences Checklist & Search Submit Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mt-6 border-t border-brand-border/60 dark:border-gray-800/80 pt-6">
          <div className="flex flex-wrap gap-x-6 gap-y-3.5 max-w-full lg:max-w-[70%]">
            {/* Custom Checkbox: Direct flights only */}
            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-text-muted select-none group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={directFlights} 
                  onChange={(e) => setDirectFlights(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  directFlights 
                    ? 'bg-brand-orange border-brand-orange text-white shadow-[0_2px_6px_rgba(255,92,0,0.3)]' 
                    : 'bg-white border-brand-border dark:border-gray-700 hover:border-brand-orange/60'
                }`}>
                  {directFlights && (
                    <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="group-hover:text-brand-primary transition-colors">Direct flights only</span>
            </label>

            {/* Custom Checkbox: My dates are flexible */}
            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-text-muted select-none group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={flexibleDates} 
                  onChange={(e) => setFlexibleDates(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  flexibleDates 
                    ? 'bg-brand-orange border-brand-orange text-white shadow-[0_2px_6px_rgba(255,92,0,0.3)]' 
                    : 'bg-white border-brand-border dark:border-gray-700 hover:border-brand-orange/60'
                }`}>
                  {flexibleDates && (
                    <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="group-hover:text-brand-primary transition-colors">My dates are flexible (±3 Days)</span>
            </label>

            {/* Custom Checkbox: Search nearby origin */}
            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-text-muted select-none group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={nearOrigin} 
                  onChange={(e) => setNearOrigin(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  nearOrigin 
                    ? 'bg-brand-orange border-brand-orange text-white shadow-[0_2px_6px_rgba(255,92,0,0.3)]' 
                    : 'bg-white border-brand-border dark:border-gray-700 hover:border-brand-orange/60'
                }`}>
                  {nearOrigin && (
                    <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="group-hover:text-brand-primary transition-colors">Search nearby origin</span>
            </label>

            {/* Custom Checkbox: Search nearby destination */}
            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-brand-text-muted select-none group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={nearDest} 
                  onChange={(e) => setNearDest(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border transition-all flex items-center justify-center ${
                  nearDest 
                    ? 'bg-brand-orange border-brand-orange text-white shadow-[0_2px_6px_rgba(255,92,0,0.3)]' 
                    : 'bg-white border-brand-border dark:border-gray-700 hover:border-brand-orange/60'
                }`}>
                  {nearDest && (
                    <svg className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="group-hover:text-brand-primary transition-colors">Search nearby destination</span>
            </label>
          </div>

          <button
            type="submit"
            className="py-4 px-10 rounded-lg bg-brand-orange text-white text-base font-bold flex items-center justify-center gap-2.5 shadow-glow transition-all duration-350 hover:bg-brand-orange-hover hover:-translate-y-0.5 w-full lg:max-w-[240px] cursor-pointer"
          >
            <Search size={18} /> Search Flights
          </button>
        </div>

        {/* Inline Hotline Promo alert inspired by CheapoAir */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-brand-orange/5 dark:bg-brand-orange/10 border border-brand-orange/20 rounded-xl px-5 py-3.5 text-xs md:text-sm text-brand-primary dark:text-white font-semibold">
          <span className="flex items-center gap-2 text-brand-orange dark:text-brand-orange">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            Save an Extra $30 to $50 Off Secret Offline Rates
          </span>
          <a 
            href="tel:1800-521-4263" 
            className="flex items-center gap-1.5 bg-brand-orange text-white hover:bg-brand-orange-hover px-4 py-2 rounded-lg font-bold transition-all shadow-[0_2px_8px_rgba(255,92,0,0.2)]"
          >
            Call desk: 1800-521-4263
          </a>
        </div>
      </form>
    </div>
  );
}
