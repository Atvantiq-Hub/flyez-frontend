'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PlaneTakeoff, PlaneLanding, X } from 'lucide-react';

interface AirportAutocompleteProps {
  label: string;
  placeholder: string;
  value: string;
  onSelect: (code: string, name: string) => void;
  type: number; /* 1 for origin, 2 for destination, 3+ for multicity */
  isOrigin?: boolean;
}

export default function AirportAutocomplete({ 
  label, 
  placeholder, 
  value, 
  onSelect, 
  type, 
  isOrigin = true 
}: AirportAutocompleteProps) {
  const [query, setQuery] = useState(value || '');
  const [suggestionsHtml, setSuggestionsHtml] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync with value if updated from parent (e.g., origin/destination swap)
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Handle outside clicks to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch suggestions with debouncing
  useEffect(() => {
    if (!query || query.length < 2 || !isOpen) {
      setSuggestionsHtml('');
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/get-airport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            val: query,
            type: String(type),
            check: '1'
          })
        });
        if (response.ok) {
          const html = await response.json();
          setSuggestionsHtml(html);
        }
      } catch (err) {
        console.error('Autocomplete fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(delayDebounce);
  }, [query, isOpen, type]);

  // Handle clicking a suggestion from the raw HTML structure
  const handleSuggestionClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const targetItem = target.closest('[data-id]');
    if (targetItem) {
      const code = targetItem.getAttribute('data-id') || '';
      const name = targetItem.getAttribute('data-id1') || code;
      setQuery(code);
      onSelect(code, name);
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Label and input container */}
      <div 
        className={`flex flex-col py-3 px-4 bg-white rounded-md cursor-text transition-all duration-350 shadow-sm border ${
          isOpen ? 'border-brand-accent shadow-[0_0_25px_rgba(37,99,235,0.3)]' : 'border-brand-border'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <span className="text-[11px] uppercase text-brand-text-muted font-semibold flex items-center gap-1 mb-1">
          {isOrigin ? <PlaneTakeoff size={12} className="text-brand-accent" /> : <PlaneLanding size={12} className="text-brand-orange" />}
          {label}
        </span>
        <div className="flex items-center gap-2">
          <input 
            type="text" 
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="border-none outline-none w-full text-base font-semibold text-brand-primary bg-transparent"
          />
          {query && (
            <button 
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setQuery('');
                onSelect('', '');
              }}
              className="text-brand-text-muted"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Suggestion Dropdown Panel */}
      {isOpen && (suggestionsHtml || isLoading) && (
        <div 
          onClick={handleSuggestionClick}
          className="absolute top-[calc(100%+6px)] left-0 w-full max-h-[260px] overflow-y-auto bg-white rounded-md shadow-lg border border-slate-200/80 z-[999] py-2 animate-[fadeIn_0.2s_ease]"
        >
          {isLoading ? (
            <div className="py-4 text-center text-brand-text-muted text-sm flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full inline-block animate-spin"></span>
              Searching airports...
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: suggestionsHtml }} className="suggestions-html-container" />
          )}
        </div>
      )}

      {/* Inject custom suggestion styling */}
      <style jsx global>{`
        .suggestions-html-container ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .suggestions-html-container li, .suggestions-html-container .drp, .suggestions-html-container .drp2 {
          padding: 12px 16px 12px 42px !important;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid #f1f5f9;
          transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .suggestions-html-container li::before, .suggestions-html-container .drp::before, .suggestions-html-container .drp2::before {
          content: '';
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-size: contain;
        }
        .suggestions-html-container li:last-child {
          border-bottom: none;
        }
        .suggestions-html-container li:hover, .suggestions-html-container .drp:hover, .suggestions-html-container .drp2:hover {
          background-color: #f8fafc;
        }
        .suggestions-html-container b {
          font-weight: 700;
          color: #070e1b;
          font-size: 14px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .suggestions-html-container p {
          margin: 4px 0 0 0;
          color: #64748b;
          font-size: 11px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}
