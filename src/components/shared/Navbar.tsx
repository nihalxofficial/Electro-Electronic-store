"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, Repeat, Heart, User, ShoppingBag } from 'lucide-react';
import { CategoryOption, HeaderActionItem } from '@/types';

import CategoriesDropdown from './CategoriesDropdown';
import SearchCategoryDropdown from './SearchCategoryDropdown';

// 1. Interfaces for Nav Links & Action Icons


// 2. Reusable Arrays
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: 'All Categories', value: 'All Categories' },
  { label: 'Laptops', value: 'Laptops' },
  { label: 'Smartphones', value: 'Smartphones' },
  { label: 'Cameras', value: 'Cameras' },
  { label: 'Audio', value: 'Audio' },
];

export const ACTION_ITEMS: HeaderActionItem[] = [
  {
    id: 'compare',
    label: 'Compare',
    href: '/compare',
    icon: Repeat,
    badgeCount: 0,
  },
  {
    id: 'wishlist',
    label: 'Wishlist',
    href: '/wishlist',
    icon: Heart,
  },
  {
    id: 'account',
    label: 'Account',
    href: '/account',
    icon: User,
  },
  {
    id: 'cart',
    label: 'Cart',
    href: '/cart',
    icon: ShoppingBag,
    badgeCount: 0,
    showPrice: true,
  },
];

export default function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const cartTotal = "$0.00"; // Can be replaced with your global cart state

  return (
    <nav className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 py-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        
        {/* 1. Logo */}
        <Link href="/" className="flex items-center text-3xl font-extrabold tracking-tight text-[#333e48] dark:text-white">
          electro<span className="text-[#fed700] text-4xl leading-none">.</span>
        </Link>

        {/* 2. Categories Dropdown (Electro Home-v5 Style with HeroUI v3) */}
        <div className="hidden lg:flex items-center">
          <CategoriesDropdown />
        </div>

        {/* 3. Search Bar */}
        <div className="relative flex-1 max-w-2xl mx-2 flex items-center">
          <form className="flex flex-1 items-center border-2 border-[#fed700] rounded-full overflow-hidden bg-white dark:bg-gray-900">
            {/* Text input */}
            <input
              type="text"
              placeholder="Search for Products"
              className="w-full px-5 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 bg-transparent focus:outline-none"
            />

            {/* Search button */}
            <button
              type="submit"
              className="bg-[#fed700] hover:bg-[#e5c100] text-gray-900 px-6 py-2.5 flex items-center justify-center transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-gray-900 stroke-[2.5]" />
            </button>
          </form>

          {/* Category dropdown sits outside overflow-hidden form so it's never clipped */}
          <SearchCategoryDropdown
            options={CATEGORY_OPTIONS}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* 4. Action Icons Mapped from ACTION_ITEMS Array */}
        <div className="flex items-center space-x-5 text-gray-700 dark:text-gray-200">
          {ACTION_ITEMS.map((item) => {
            const Icon = item.icon;

            return (
              <Link 
                key={item.id} 
                href={item.href} 
                className="flex items-center gap-2 group relative"
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[1.8] group-hover:text-[#fed700] transition-colors" />
                  
                  {/* Render badge if defined */}
                  {item.badgeCount !== undefined && (
                    <span className="absolute -bottom-1.5 -right-2.5 bg-[#fed700] text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badgeCount}
                    </span>
                  )}
                </div>

                {/* Render Price for Cart */}
                {item.showPrice && (
                  <span className="font-bold text-sm text-[#333e48] dark:text-gray-100 group-hover:text-[#fed700] transition-colors">
                    {cartTotal}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}