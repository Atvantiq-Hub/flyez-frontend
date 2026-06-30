'use client';

import React from 'react';
import { Search, ArrowLeftRight, Plus, Trash2, ShieldAlert } from 'lucide-react';
import AirportAutocomplete from './AirportAutocomplete';
import PassengerCountSelector from './PassengerCountSelector';
import DateField from './DateField';
import { useFlightSearchForm } from '../hooks/useFlightSearchForm';

interface FlightSearchFormProps {
  restrictToBusinessFirst?: boolean;
}

export default function FlightSearchForm({ restrictToBusinessFirst = false }: FlightSearchFormProps) {
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

  const [todayDate, setTodayDate] = React.useState<string>('');
  
  const [isCabinOpen, setIsCabinOpen] = React.useState(false);
  const [isAirlineOpen, setIsAirlineOpen] = React.useState(false);

  const cabinRef = React.useRef<HTMLDivElement>(null);
  const airlineRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cabinRef.current && !cabinRef.current.contains(event.target as Node)) {
        setIsCabinOpen(false);
      }
      if (airlineRef.current && !airlineRef.current.contains(event.target as Node)) {
        setIsAirlineOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cabinOptions = restrictToBusinessFirst
    ? [
        { value: 'B', label: 'Business' },
        { value: 'F', label: 'First Class' }
      ]
    : [
        { value: 'E', label: 'Economy' },
        { value: 'P', label: 'Premium Economy' },
        { value: 'B', label: 'Business' },
        { value: 'F', label: 'First Class' }
      ];

  const airlineOptions = [
    { value: '', label: 'All Airlines' },
    { value: 'AA', label: 'American Airlines (AA)' },
    { value: 'DL', label: 'Delta Air Lines (DL)' },
    { value: 'UA', label: 'United Airlines (UA)' },
    { value: 'BA', label: 'British Airways (BA)' },
    { value: 'LH', label: 'Lufthansa (LH)' },
    { value: 'QR', label: 'Qatar Airways (QR)' },
    { value: 'EK', label: 'Emirates (EK)' },
    { value: 'SQ', label: 'Singapore Airlines (SQ)' }
  ];

  React.useEffect(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    setTodayDate(`${year}-${month}-${day}`);
    
    if (restrictToBusinessFirst) {
      setCabin('B');
    }
  }, [restrictToBusinessFirst]);

  return (
    <div className="glass-card animate-slide-up rounded-lg py-4.5 px-5 max-w-[1150px] mx-auto relative z-10">
      <form onSubmit={handleSearchSubmit}>
        {/* Validation Errors banner */}
        {validationError && (
          <div className="flex items-center gap-2.5 p-3 rounded-sm bg-red-50 border border-red-100 text-[#991b1b] text-sm font-medium mb-5">
            <ShieldAlert size={18} />
            {validationError}
          </div>
        )}

        {/* Trip Type Tabs (Moved to top) */}
        <div className="flex bg-black/15 border border-white/5 p-1 rounded-lg w-fit mb-4">
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
              className={`py-1.5 px-4 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                tripType === tab.id
                  ? 'bg-white shadow-[0_2px_8px_rgba(11,26,48,0.08)] text-black'
                  : 'bg-transparent text-white/70 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Standard Search Fields (Round trip & One way) */}
        {tripType !== 'multicity' && (
          <div className={`grid gap-4 items-start w-full grid-cols-1 ${
            tripType === 'round' ? 'lg:grid-cols-[2.2fr_1.1fr_1.1fr_1.2fr]' : 'lg:grid-cols-[2.2fr_1.2fr_1.4fr]'
          }`}>
            {/* From & To with absolutely overlapping Swap */}
            <div className="flex flex-col lg:col-span-1 w-full min-w-0">
              {/* Inputs row */}
              <div className="relative flex w-full flex-col lg:flex-row gap-4 lg:gap-6">
                <div className="flex-1 min-w-0">
                  <AirportAutocomplete
                    label="From" 
                    placeholder="Origin Airport" 
                    value={origin} 
                    selectedValueName={originName}
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
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white border-[1.5px] border-black shadow-[0_3px_10px_rgba(0,0,0,0.1)] flex items-center justify-center text-black z-20 cursor-pointer transition-all duration-300 hover:text-black hover:border-black hover:rotate-180 hover:shadow-[0_5px_12px_rgba(0,0,0,0.15)] max-lg:top-1/2 max-lg:left-[90%] max-lg:rotate-90"
                >
                  <ArrowLeftRight size={12} />
                </button>

                <div className="flex-1 min-w-0">
                  <AirportAutocomplete
                    label="To" 
                    placeholder="Destination Airport" 
                    value={destination} 
                    selectedValueName={destinationName}
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
                  <label className="flex items-center gap-1.5 mt-1 ml-1 cursor-pointer text-xs font-semibold text-slate-200 hover:text-white select-none">
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
                  <label className="flex items-center gap-1.5 mt-1 ml-1 cursor-pointer text-xs font-semibold text-slate-200 hover:text-white select-none">
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
            <div className="flex flex-col w-full">
              <DateField
                label="Depart"
                value={departDate}
                onChange={setDepartDate}
                min={todayDate}
                required
                accentClass="text-brand-accent"
              />
              <label className="flex items-center gap-1.5 mt-3 ml-1 cursor-pointer text-xs font-semibold text-slate-200 hover:text-white select-none">
                <input 
                  type="checkbox" 
                  checked={directFlights} 
                  onChange={(e) => setDirectFlights(e.target.checked)}
                  className="w-3.5 h-3.5 cursor-pointer accent-brand-accent"
                />
                Direct flights only
              </label>
            </div>

            {/* Return Date (Round trip only) */}
            {tripType === 'round' && (
              <div className="flex flex-col w-full">
                <DateField
                  label="Return"
                  value={returnDate}
                  onChange={setReturnDate}
                  min={departDate || todayDate}
                  required
                  accentClass="text-brand-orange"
                />
                 <label className="flex items-center gap-1.5 mt-3 ml-1 cursor-pointer text-xs font-semibold text-slate-200 hover:text-white select-none">
                  <input 
                    type="checkbox" 
                    checked={flexibleDates} 
                    onChange={(e) => setFlexibleDates(e.target.checked)}
                    className="w-3.5 h-3.5 cursor-pointer accent-brand-accent"
                  />
                  My dates are flexible (±3 Days)
                </label>
              </div>
            )}

            {/* Passenger Selector */}
            <div className="flex flex-col w-full">
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
              {tripType === 'one' && (
                <label className="flex items-center gap-1.5 mt-3 ml-1 cursor-pointer text-xs font-semibold text-slate-200 hover:text-white select-none">
                  <input 
                    type="checkbox" 
                    checked={flexibleDates} 
                    onChange={(e) => setFlexibleDates(e.target.checked)}
                    className="w-3.5 h-3.5 cursor-pointer accent-brand-accent"
                  />
                  My dates are flexible (±3 Days)
                </label>
              )}
            </div>
          </div>
        )}

        {/* Multi-City Form Segment Rows */}
        {tripType === 'multicity' && (
          <div className="flex flex-col gap-2.5 animate-fade-in">
            {multiFlights.map((flight, index) => (
              <div 
                key={index}
                className="grid gap-2.5 p-2 bg-slate-50/70 rounded-xl border border-dashed border-brand-border items-center grid-cols-1 md:grid-cols-[30px_1fr_1fr_1fr_36px]"
              >
                {/* Segment indicator */}
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-[10px] font-bold mx-auto">
                  {index + 1}
                </div>

                {/* Origin */}
                <AirportAutocomplete 
                  label="From" 
                  placeholder="Origin Airport" 
                  value={flight.origin} 
                  selectedValueName={flight.originName}
                  onSelect={(code, name) => updateMultiFlight(index, 'origin', code, name)}
                  type={3 + index * 2}
                  isOrigin={true}
                />

                {/* Destination */}
                <AirportAutocomplete 
                  label="To" 
                  placeholder="Destination Airport" 
                  value={flight.destination} 
                  selectedValueName={flight.destinationName}
                  onSelect={(code, name) => updateMultiFlight(index, 'destination', code, name)}
                  type={4 + index * 2}
                  isOrigin={false}
                />

                {/* Depart Date */}
                <DateField
                  label="Depart"
                  value={flight.date}
                  onChange={(v) => updateMultiFlight(index, 'date', v)}
                  min={todayDate}
                  required
                  accentClass="text-brand-accent"
                />

                {/* Remove button */}
                <div className="flex justify-center max-md:mt-2">
                  {multiFlights.length > 2 ? (
                    <button
                      type="button"
                      onClick={() => removeMultiFlight(index)}
                      className="w-9 h-9 flex items-center justify-center rounded-md text-red-500 bg-red-500/5 border border-red-500/10 transition-colors hover:bg-red-500/15 cursor-pointer"
                    >
                      <Trash2 size={15} />
                    </button>
                  ) : (
                    <div className="w-9" />
                  )}
                </div>
              </div>
            ))}

            {/* Row adding and traveler control for multi-city */}
            <div className="grid gap-2.5 items-center grid-cols-1 md:grid-cols-[30px_1fr_1fr_1fr_36px] mt-2">
              {/* Columns 1-3: Add Another Flight button */}
              <div className="md:col-span-3 flex justify-start">
                <button
                  type="button"
                  onClick={addMultiFlight}
                  disabled={multiFlights.length >= 5}
                  className="flex items-center gap-1.5 font-semibold text-xs py-1.5 px-3.5 rounded-md border border-dashed border-brand-accent bg-brand-accent/2 transition-all text-brand-accent cursor-pointer hover:bg-brand-accent/5"
                >
                  <Plus size={14} /> Add Another Flight
                </button>
              </div>

              {/* Column 4: Travelers Selector */}
              <div className="w-full">
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

              {/* Column 5: Spacer */}
              <div className="w-9" />
            </div>
          </div>
        )}

        {/* Booking Filters & Search Submit — placed below the search inputs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 border-t border-white/10 dark:border-slate-800/80 pt-3">
          {/* Class & Airline Dropdowns */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 relative" ref={cabinRef}>
              <span className="text-xs font-semibold text-white/80">Class:</span>
              <button
                type="button"
                onClick={() => {
                  setIsCabinOpen(!isCabinOpen);
                  setIsAirlineOpen(false);
                }}
                className="booking-select text-sm text-black dark:text-white bg-white min-w-[125px] text-left cursor-pointer flex items-center justify-between"
              >
                <span>{cabinOptions.find(o => o.value === cabin)?.label || 'Economy'}</span>
              </button>
              {isCabinOpen && (
                <div className="absolute bottom-full mb-2 left-10 z-50 w-44 rounded-lg bg-white border border-slate-200 shadow-xl py-1 animate-[fadeIn_0.15s_ease-out]">
                  {cabinOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setCabin(option.value);
                        setIsCabinOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${cabin === option.value ? 'text-brand-orange bg-brand-orange/5' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 relative" ref={airlineRef}>
              <span className="text-xs font-semibold text-white/80">Airline:</span>
              <button
                type="button"
                onClick={() => {
                  setIsAirlineOpen(!isAirlineOpen);
                  setIsCabinOpen(false);
                }}
                className="booking-select text-sm text-black dark:text-white bg-white min-w-[160px] text-left cursor-pointer flex items-center justify-between"
              >
                <span>{airlineOptions.find(o => o.value === preferredAirline)?.label || 'All Airlines'}</span>
              </button>
              {isAirlineOpen && (
                <div className="absolute bottom-full mb-2 left-12 z-50 w-52 max-h-60 overflow-y-auto rounded-lg bg-white border border-slate-200 shadow-xl py-1 animate-[fadeIn_0.15s_ease-out]">
                  {airlineOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setPreferredAirline(option.value);
                        setIsAirlineOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${preferredAirline === option.value ? 'text-brand-orange bg-brand-orange/5' : 'text-slate-700 hover:bg-slate-50'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="py-2 px-6 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_3px_10px_rgba(255,92,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 cursor-pointer sm:max-w-[180px]"
          >
            <Search size={14} /> Search Flights
          </button>
        </div>



      </form>
    </div>
  );
}
