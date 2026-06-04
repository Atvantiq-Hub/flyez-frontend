'use client';

import React from 'react';
import { Calendar, Search, ArrowLeftRight, Plus, Trash2, ShieldAlert } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';
import PassengerCountSelector from './PassengerCountSelector';
import { useFlightSearchForm } from '../hooks/useFlightSearchForm';

export default function FlightSearchForm() {
  const {
    tripType,
    setTripType,
    cabin,
    setCabin,
    adults,
    setAdults,
    childrenCount,
    setChildrenCount,
    childAges,
    setChildAges,
    infants,
    setInfants,
    origin,
    setOrigin,
    originName,
    destination,
    setDestination,
    destinationName,
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,
    multiFlights,
    addMultiFlight,
    removeMultiFlight,
    updateMultiFlight,
    directFlights,
    setDirectFlights,
    preferredAirline,
    setPreferredAirline,
    flexibleDates,
    setFlexibleDates,
    nearOrigin,
    setNearOrigin,
    nearDest,
    setNearDest,
    validationError,
    setValidationError,
    handleSearchSubmit,
    handleSwap
  } = useFlightSearchForm();

  // Convert Date from YYYY-MM-DD to MM/DD/YYYY (only used inside component if needed)
  const formatDateToBackend = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${month}/${day}/${year}`;
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
              { id: 'one', label: 'One Way' },
              { id: 'multicity', label: 'Multi-City' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setTripType(tab.id as 'round' | 'one' | 'multicity');
                  setValidationError(null);
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
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-text-muted">Class:</span>
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value)}
                className="py-2 px-3.5 rounded-sm border border-brand-border bg-white text-sm font-semibold text-brand-primary cursor-pointer outline-none"
              >
                <option value="E">Economy</option>
                <option value="B">Business</option>
                <option value="F">First Class</option>
                <option value="P">Premium Economy</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-brand-text-muted">Airline:</span>
              <select
                value={preferredAirline}
                onChange={(e) => setPreferredAirline(e.target.value)}
                className="py-2 px-3.5 rounded-sm border border-brand-border bg-white text-sm font-semibold text-brand-primary cursor-pointer outline-none"
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
          <div className={`grid gap-4 items-start w-full grid-cols-1 ${
            tripType === 'round' ? 'lg:grid-cols-[2.2fr_1.1fr_1.1fr_1.2fr]' : 'lg:grid-cols-[2.2fr_1.2fr_1.4fr]'
          }`}>
            {/* From & To with absolutely overlapping Swap */}
            <div className="flex flex-col lg:col-span-1 w-full">
              {/* Inputs row */}
              <div className="relative flex w-full flex-col lg:flex-row gap-4 lg:gap-0">
                <div className="flex-1">
                  <AirportAutocomplete 
                    label="From" 
                    placeholder="Origin Airport" 
                    value={origin} 
                    onSelect={(code, name) => {
                      setOrigin(code, name);
                    }}
                    type={1}
                    isOrigin={true}
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

                <div className="flex-1">
                  <AirportAutocomplete 
                    label="To" 
                    placeholder="Destination Airport" 
                    value={destination} 
                    onSelect={(code, name) => {
                      setDestination(code, name);
                    }}
                    type={2}
                    isOrigin={false}
                  />
                </div>
              </div>

              {/* Checkboxes row */}
              <div className="flex w-full flex-col lg:flex-row gap-4 lg:gap-0 mt-2">
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 mt-1 ml-1 cursor-pointer text-xs font-semibold text-brand-text-muted select-none">
                    <input 
                      type="checkbox" 
                      checked={nearOrigin}
                      onChange={(e) => setNearOrigin(e.target.checked)}
                      className="w-3.5 h-3.5 cursor-pointer accent-brand-accent"
                    />
                    Search nearby airports
                  </label>
                </div>
                <div className="flex-1">
                  <label className="flex items-center gap-1.5 mt-1 ml-1 cursor-pointer text-xs font-semibold text-brand-text-muted select-none">
                    <input 
                      type="checkbox" 
                      checked={nearDest}
                      onChange={(e) => setNearDest(e.target.checked)}
                      className="w-3.5 h-3.5 cursor-pointer accent-brand-accent"
                    />
                    Search nearby airports
                  </label>
                </div>
              </div>
            </div>

            {/* Depart Date */}
            <div className="search-input-capsule flex flex-col py-3 px-4 bg-white rounded-md border border-brand-border shadow-sm">
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
              <div className="search-input-capsule flex flex-col py-3 px-4 bg-white rounded-md border border-brand-border shadow-sm">
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
                className="grid gap-3 p-4 bg-slate-50 rounded-md border border-dashed border-brand-border items-center grid-cols-1 md:grid-cols-[40px_1fr_1fr_1fr_48px]"
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
                <div className="flex flex-col py-3 px-4 bg-white border border-brand-border rounded-md shadow-sm">
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
                className="flex items-center gap-2 font-semibold text-sm py-2.5 px-4.5 rounded-md border border-dashed border-brand-accent bg-brand-accent/2 transition-all text-brand-accent cursor-pointer hover:bg-brand-accent/5"
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
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-brand-text-muted select-none">
              <input 
                type="checkbox" 
                checked={directFlights} 
                onChange={(e) => setDirectFlights(e.target.checked)}
                className="w-[18px] h-[18px] cursor-pointer accent-brand-accent"
              />
              Direct flights only
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-brand-text-muted select-none">
              <input 
                type="checkbox" 
                checked={flexibleDates} 
                onChange={(e) => setFlexibleDates(e.target.checked)}
                className="w-[18px] h-[18px] cursor-pointer accent-brand-accent"
              />
              My dates are flexible (±3 Days)
            </label>
          </div>

          <button
            type="submit"
            className="py-4 px-10 rounded-md bg-brand-orange text-white text-base font-bold flex items-center justify-center gap-2.5 shadow-glow transition-all duration-350 hover:bg-brand-orange-hover hover:-translate-y-0.5 w-full lg:max-w-[240px] cursor-pointer"
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
