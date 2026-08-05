"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Repeat, Heart, User, ShoppingBag } from 'lucide-react';
import { CategoryOption, HeaderActionItem } from '@/types';
import { ThemeSwitch } from './Switcher';

import CategoriesDropdown from './CategoriesDropdown';
import SearchCategoryDropdown from './SearchCategoryDropdown';

// 1. Reusable Arrays
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { label: 'All Categories', value: 'All Categories' },
  { label: 'Laptops', value: 'Laptops' },
  { label: 'Smartphones', value: 'Smartphones' },
  { label: 'Cameras', value: 'Cameras' },
  { label: 'Audio', value: 'Audio' },
];

export const ACTION_ITEMS: HeaderActionItem[] = [
  { id: 'compare', label: 'Compare', href: '/compare', icon: Repeat, badgeCount: 0 },
  { id: 'wishlist', label: 'Wishlist', href: '/wishlist', icon: Heart },
  { id: 'account', label: 'Account', href: '/account', icon: User },
  { id: 'cart', label: 'Cart', href: '/cart', icon: ShoppingBag, badgeCount: 0, showPrice: true },
];

const MOBILE_NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Deals', href: '/deals' },
  { label: 'Laptops', href: '/shop?category=laptops' },
  { label: 'Smartphones', href: '/shop?category=smartphones' },
  { label: 'Audio', href: '/shop?category=audio' },
  { label: 'Cameras', href: '/shop?category=cameras' },
  { label: 'Accessories', href: '/shop?category=accessories' },
];

export default function Navbar() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const cartTotal = "$0.00";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory && selectedCategory !== "All Categories") {
      params.set("category", selectedCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    const queryString = params.toString();
    window.location.href = `/product${queryString ? `?${queryString}` : ''}`;
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">

      {/* ── Desktop & Mobile Top Row ── */}
      <div className="w-full px-4 md:px-14 py-3 flex items-center justify-between gap-4">

        <Link href="/" className="flex-shrink-0 flex items-center text-3xl font-extrabold tracking-tight text-[#333e48] dark:text-white">
          electro<span className="text-primary text-4xl leading-none">.</span>
        </Link>

        {/* Categories — desktop only */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <CategoriesDropdown />
        </div>

        {/* Search Bar — hidden on small, visible md+ */}
        <div className="relative hidden md:flex flex-1 items-center">
          <form onSubmit={handleSearchSubmit} className="flex flex-1 items-center border-2 border-primary rounded-full overflow-hidden bg-white dark:bg-gray-900">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Products"
              className="w-full px-5 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-white stroke-[2.5]" />
            </button>
          </form>
          <SearchCategoryDropdown
            options={CATEGORY_OPTIONS}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Right — action icons + hamburger */}
        <div className="flex items-center gap-4 text-gray-700 dark:text-gray-200">

          {/* Action Icons — compare & wishlist hidden on mobile */}
          {ACTION_ITEMS.map((item) => {
            const Icon = item.icon;
            const isCart = item.id === 'cart';
            const isAccount = item.id === 'account';
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center gap-1.5 group relative ${
                  !isCart && !isAccount ? 'hidden md:flex' : 'flex'
                }`}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon className="w-5 h-5 stroke-[1.8] group-hover:text-primary transition-colors" />
                  {item.badgeCount !== undefined && (
                    <span className="absolute -bottom-1.5 -right-2.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badgeCount}
                    </span>
                  )}
                </div>
                {item.showPrice && (
                  <span className="font-bold text-sm text-[#333e48] dark:text-gray-100 group-hover:text-primary transition-colors hidden sm:inline">
                    {cartTotal}
                  </span>
                )}
              </Link>
            );
          })}

          {/* Hamburger — mobile only */}
          <button
            id="navbar-hamburger"
            type="button"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col items-center justify-center w-9 h-9 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {/* Animated 3-bar → X */}
            <span
              className={`block h-0.5 w-5 bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 ${
                mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 dark:bg-gray-200 rounded my-1.5 transition-all duration-300 ${
                mobileOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-gray-700 dark:bg-gray-200 rounded transition-all duration-300 ${
                mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 md:px-14 pb-5 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 space-y-4">

          {/* Mobile Search */}
          <div className="pt-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center border-2 border-primary rounded-full overflow-hidden bg-white dark:bg-gray-900">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Products"
                className="w-full px-4 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 flex items-center justify-center transition-colors"
                aria-label="Search"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  setSelectedCategory(opt.value);
                  const cat = opt.value === "All Categories" ? "" : opt.value.toLowerCase();
                  window.location.href = `/product${cat ? `?category=${cat}` : ''}`;
                }}
                className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors cursor-pointer ${
                  selectedCategory === opt.value
                    ? 'bg-primary border-primary text-white'
                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-primary hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Nav links grid */}
          <div className="grid grid-cols-2 gap-1">
            {MOBILE_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-light hover:text-primary transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Theme Toggle Row — reuses ThemeSwitch with inline variant */}
          <div className="flex items-center justify-between px-1 py-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Appearance</span>
            <ThemeSwitch variant="inline" />
          </div>

          {/* Mobile action links row */}
          <div className="flex items-center justify-around pt-2 border-t border-gray-100 dark:border-gray-800">
            {ACTION_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                  aria-label={item.label}
                >
                  <div className="relative">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                    {item.badgeCount !== undefined && (
                      <span className="absolute -bottom-1.5 -right-2.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>

        </div>
      </div>
    </nav>
  );
}