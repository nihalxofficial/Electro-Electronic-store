"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Repeat, Heart, ShoppingBag } from "lucide-react";
import { HeaderActionItem } from "@/types";
import BottomNavbar from "./BottomNavbar";

export const ACTION_ITEMS: HeaderActionItem[] = [
  { id: "compare", label: "Compare", href: "/compare", icon: Repeat, badgeCount: 0 },
  { id: "wishlist", label: "Wishlist", href: "/wishlist", icon: Heart },
  { id: "cart", label: "Cart", href: "/cart", icon: ShoppingBag, badgeCount: 0, showPrice: true },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const cartTotal = "$0.00";

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/product?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="w-full transition-colors duration-200">
      {/* ── Top Navbar Row ── */}
      <div className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
        <div className="w-full px-4 md:px-14 py-3.5 flex items-center justify-between gap-4 md:gap-8">

          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 flex items-center text-2xl sm:text-3xl font-extrabold tracking-tight text-[#333e48] dark:text-white"
          >
            electro<span className="text-primary text-3xl sm:text-4xl leading-none">.</span>
          </Link>

          {/* Search Bar — full width flex-1 */}
          <div className="relative flex flex-1 items-center max-w-3xl">
            <form
              onSubmit={handleSearchSubmit}
              className="flex flex-1 items-center border-2 border-primary rounded-full overflow-hidden bg-white dark:bg-gray-900 shadow-sm"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Products"
                className="w-full px-4 sm:px-5 py-2 text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white px-5 sm:px-6 py-2.5 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4 text-white stroke-[2.5]" />
              </button>
            </form>
          </div>

          {/* Right Action Icons: Compare + Wishlist + Cart */}
          <div className="flex items-center gap-3 sm:gap-5 text-gray-700 dark:text-gray-200 shrink-0">
            {ACTION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isCart = item.id === "cart";
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-1.5 group relative ${
                    !isCart ? "hidden sm:flex" : "flex"
                  }`}
                  aria-label={item.label}
                >
                  <div className="relative p-1">
                    <Icon className="w-5 h-5 stroke-[1.8] group-hover:text-primary transition-colors" />
                    {item.badgeCount !== undefined && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {item.badgeCount}
                      </span>
                    )}
                  </div>
                  {item.showPrice && (
                    <span className="font-bold text-xs sm:text-sm text-[#333e48] dark:text-gray-100 group-hover:text-primary transition-colors hidden md:inline">
                      {cartTotal}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

        </div>
      </div>

      {/* ── Bottom Navbar (Page Links & Promo banner) ── */}
      <BottomNavbar />
    </header>
  );
}