'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Users, Plus, Minus, ChevronDown } from 'lucide-react';

interface PassengerCountSelectorProps {
  adults: number;
  setAdults: (count: number) => void;
  childrenCount: number;
  setChildrenCount: (count: number) => void;
  childAges: string[];
  setChildAges: (ages: string[]) => void;
  infants: number;
  setInfants: (count: number) => void;
}

export default function PassengerCountSelector({ 
  adults, 
  setAdults, 
  childrenCount, 
  setChildrenCount, 
  childAges, 
  setChildAges, 
  infants, 
  setInfants 
}: PassengerCountSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalTravelers = adults + childrenCount + infants;

  const handleIncrement = (type: 'adults' | 'children' | 'infants') => {
    if (type === 'adults') {
      if (adults < 9) setAdults(adults + 1);
    } else if (type === 'children') {
      if (childrenCount < 6) {
        const newCount = childrenCount + 1;
        setChildrenCount(newCount);
        setChildAges([...childAges, '']); // Append blank age
      }
    } else if (type === 'infants') {
      if (infants < adults) { // Usually infants cannot exceed adults
        setInfants(infants + 1);
      }
    }
  };

  const handleDecrement = (type: 'adults' | 'children' | 'infants') => {
    if (type === 'adults') {
      if (adults > 1) {
        const newAdults = adults - 1;
        setAdults(newAdults);
        // Ensure infants don't exceed adults
        if (infants > newAdults) {
          setInfants(newAdults);
        }
      }
    } else if (type === 'children') {
      if (childrenCount > 0) {
        setChildrenCount(childrenCount - 1);
        setChildAges(childAges.slice(0, -1)); // Remove last age
      }
    } else if (type === 'infants') {
      if (infants > 0) {
        setInfants(infants - 1);
      }
    }
  };

  const handleAgeChange = (index: number, age: string) => {
    const updatedAges = [...childAges];
    updatedAges[index] = age;
    setChildAges(updatedAges);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Selector Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`search-input-capsule select-none cursor-pointer flex flex-col py-3 px-4 bg-white rounded-md transition-all duration-350 shadow-sm border ${
          isOpen ? 'border-brand-accent shadow-[0_0_25px_rgba(37,99,235,0.3)]' : 'border-brand-border'
        }`}
      >
        <span className="text-[11px] uppercase text-brand-text-muted font-semibold flex items-center gap-1 mb-1">
          <Users size={12} className="text-brand-accent" />
          Travelers
        </span>
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-brand-primary">
            {totalTravelers} Traveler{totalTravelers > 1 ? 's' : ''}
          </span>
          <ChevronDown 
            size={16} 
            className={`text-brand-text-muted transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </div>
      </div>

      {/* Popover Panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+6px)] right-0 w-[290px] bg-white rounded-md shadow-lg border border-slate-200/80 p-5 z-[999] animate-[fadeIn_0.2s_ease]">
          {/* Row: Adults */}
          <div className="flex items-center justify-between mb-4.5">
            <div>
              <span className="block text-sm font-semibold text-brand-primary">Adults</span>
              <span className="block text-[11px] text-brand-text-muted">Age 12+</span>
            </div>
            <div className="flex items-center gap-3.5">
              <button 
                type="button"
                onClick={() => handleDecrement('adults')} 
                className={`w-8 h-8 rounded-sm border border-brand-border flex items-center justify-center transition-colors ${
                  adults > 1 ? 'text-brand-accent hover:bg-slate-50' : 'text-brand-text-muted opacity-50 cursor-not-allowed'
                }`}
                disabled={adults <= 1}
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold w-4 text-center">{adults}</span>
              <button 
                type="button"
                onClick={() => handleIncrement('adults')} 
                className="w-8 h-8 rounded-sm border border-brand-border flex items-center justify-center text-brand-accent hover:bg-slate-50 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Row: Children */}
          <div className="flex items-center justify-between mb-4.5">
            <div>
              <span className="block text-sm font-semibold text-brand-primary">Children</span>
              <span className="block text-[11px] text-brand-text-muted">Ages 2 - 11</span>
            </div>
            <div className="flex items-center gap-3.5">
              <button 
                type="button"
                onClick={() => handleDecrement('children')} 
                className={`w-8 h-8 rounded-sm border border-brand-border flex items-center justify-center transition-colors ${
                  childrenCount > 0 ? 'text-brand-accent hover:bg-slate-50' : 'text-brand-text-muted opacity-50 cursor-not-allowed'
                }`}
                disabled={childrenCount <= 0}
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold w-4 text-center">{childrenCount}</span>
              <button 
                type="button"
                onClick={() => handleIncrement('children')} 
                className="w-8 h-8 rounded-sm border border-brand-border flex items-center justify-center text-brand-accent hover:bg-slate-50 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Dynamic Child Age Selectors */}
          {childrenCount > 0 && (
            <div className="py-2.5 border-t border-b border-slate-100 mb-4.5">
              <span className="block text-xs font-semibold text-brand-text-muted mb-2">Specify Child Ages</span>
              <div className="grid grid-cols-2 gap-2">
                {childAges.map((age, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[10px] text-brand-text-muted">Child {i+1}</span>
                    <select
                      value={age}
                      onChange={(e) => handleAgeChange(i, e.target.value)}
                      className="p-1.5 rounded-[6px] border border-brand-border text-xs text-brand-primary bg-white outline-none"
                      required
                    >
                      <option value="">Age</option>
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(a => (
                        <option key={a} value={a}>{a} yrs</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Row: Infants */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-sm font-semibold text-brand-primary">Infants</span>
              <span className="block text-[11px] text-brand-text-muted">Under 2 yrs</span>
            </div>
            <div className="flex items-center gap-3.5">
              <button 
                type="button"
                onClick={() => handleDecrement('infants')} 
                className={`w-8 h-8 rounded-sm border border-brand-border flex items-center justify-center transition-colors ${
                  infants > 0 ? 'text-brand-accent hover:bg-slate-50' : 'text-brand-text-muted opacity-50 cursor-not-allowed'
                }`}
                disabled={infants <= 0}
              >
                <Minus size={14} />
              </button>
              <span className="text-sm font-bold w-4 text-center">{infants}</span>
              <button 
                type="button"
                onClick={() => handleIncrement('infants')} 
                className={`w-8 h-8 rounded-sm border border-brand-border flex items-center justify-center transition-colors ${
                  infants < adults ? 'text-brand-accent hover:bg-slate-50' : 'text-brand-text-muted opacity-50 cursor-not-allowed'
                }`}
                disabled={infants >= adults}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
