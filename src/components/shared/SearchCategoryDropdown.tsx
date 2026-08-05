"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CategoryOption } from '@/types';

interface Props {
  options: CategoryOption[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function SearchCategoryDropdown({ options, selected, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="absolute right-[70px] top-0 bottom-0 hidden sm:flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Invisible hover zone + trigger — overlays the category label */}
      <button
        type="button"
        aria-label="Select category"
        aria-expanded={isOpen}
        className="flex items-center gap-1 h-full px-4 text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-[#333e48] dark:hover:text-gray-100 whitespace-nowrap bg-transparent border-0 focus:outline-none transition-colors cursor-pointer"
      >
        {selected}
        <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown panel — opens below, left-aligned with trigger */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[200] w-52 animate-in fade-in-50 slide-in-from-top-1 duration-150 shadow-2xl">
          <div className="h-[3px] bg-primary" />
          <ul className="bg-white dark:bg-gray-950 border border-t-0 border-gray-200 dark:border-gray-800">
            {options.map((option) => {
              const isSelected = option.value === selected;
              return (
                <li key={option.value} className="relative">
                  {isSelected && <span className="absolute left-0 inset-y-0 w-[3px] bg-primary" />}
                  <button
                    type="button"
                    onClick={() => { onSelect(option.value); setIsOpen(false); }}
                    className={`w-full text-left pl-5 pr-4 py-[9px] text-[13px] border-b border-gray-100 dark:border-gray-800/60 last:border-0 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#f5f5f5] dark:bg-gray-900 font-semibold text-[#333e48] dark:text-gray-100'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-[#fafafa] dark:hover:bg-gray-900/50'
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
