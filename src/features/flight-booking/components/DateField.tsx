'use client';

import React from 'react';
import { Calendar } from 'lucide-react';

interface DateFieldProps {
  label: string;
  value: string;           // canonical YYYY-MM-DD (native date input format)
  onChange: (value: string) => void;
  min?: string;
  required?: boolean;
  accentClass?: string;    // tailwind text color for the calendar icon
}

/**
 * Premium date field that always displays the date as MM/DD/YY regardless of
 * the browser locale, while keeping the native calendar picker for input.
 * The native <input type="date"> is layered transparently on top so clicking
 * anywhere opens the OS date picker; the formatted MM/DD/YY label sits beneath.
 */
export default function DateField({
  label,
  value,
  onChange,
  min,
  required,
  accentClass = 'text-brand-accent',
}: DateFieldProps) {
  // YYYY-MM-DD -> MM/DD/YY
  const display = (() => {
    if (!value) return 'MM/DD/YY';
    const [year, month, day] = value.split('-');
    if (!year || !month || !day) return 'MM/DD/YY';
    return `${month}/${day}/${year.slice(-2)}`;
  })();

  const isPlaceholder = !value;

  return (
    <label className="search-input-capsule relative cursor-pointer">
      <span className={`field-icon-chip ${accentClass.includes('orange') ? 'bg-brand-orange/10 text-brand-orange' : 'bg-brand-accent/10 text-brand-accent'}`}>
        <Calendar size={18} />
      </span>

      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-[10px] uppercase text-brand-text-muted font-bold tracking-[0.09em]">
          {label}
        </span>
        <span
          className={`text-[17px] font-bold tracking-tight tabular-nums ${
            isPlaceholder ? 'text-slate-300' : 'text-brand-primary'
          }`}
        >
          {display}
        </span>
      </div>

      {/* Transparent native date input drives the calendar picker */}
      <input
        type="date"
        value={value}
        min={min}
        required={required}
        onChange={(e) => {
          const selectedVal = e.target.value;
          if (min && selectedVal && selectedVal < min) {
            onChange(min);
          } else {
            onChange(selectedVal);
          }
        }}
        onClick={(e) => {
          // Open the OS calendar when clicking anywhere on the capsule
          try {
            (e.currentTarget as HTMLInputElement & { showPicker?: () => void }).showPicker?.();
          } catch {
            /* showPicker can throw if not user-activated; ignore */
          }
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      />
    </label>
  );
}
