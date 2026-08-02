"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { CategoryMenuItem } from '@/types';
import {
  ComputersAccessoriesMegaMenu,
  MobilesTabletsMegaMenu,
  WatchesEyewearMegaMenu,
  CamerasMegaMenu,
  MoviesGamesMegaMenu,
  TvAudioMegaMenu,
  CarMotorbikeMegaMenu,
  AccessoriesMegaMenu,
} from './MegaMenuSubComponents';

export const CATEGORIES_MENU_DATA: CategoryMenuItem[] = [
  {
    id: 'value-of-day',
    name: 'Value of the Day',
    href: '/deals/value-of-the-day',
    isBold: true,
  },
  {
    id: 'top-100-offers',
    name: 'Top 100 Offers',
    href: '/deals/top-100-offers',
    isBold: true,
  },
  {
    id: 'new-arrivals',
    name: 'New Arrivals',
    href: '/deals/new-arrivals',
    isBold: true,
  },
  {
    id: 'laptops-computers',
    name: 'Computers & Accessories',
    href: '/category/computers',
    hasSubmenu: true,
    SubMenuComponent: ComputersAccessoriesMegaMenu,
  },
  {
    id: 'cameras-audio',
    name: 'Cameras, Audio & Video',
    href: '/category/cameras',
    hasSubmenu: true,
    SubMenuComponent: CamerasMegaMenu,
  },
  {
    id: 'mobiles-tablets',
    name: 'Mobiles & Tablets',
    href: '/category/smartphones',
    hasSubmenu: true,
    SubMenuComponent: MobilesTabletsMegaMenu,
  },
  {
    id: 'movies-games',
    name: 'Movies, Music & Video Games',
    href: '/category/video-games',
    hasSubmenu: true,
    SubMenuComponent: MoviesGamesMegaMenu,
  },
  {
    id: 'tv-audio',
    name: 'TV & Audio',
    href: '/category/tv-audio',
    hasSubmenu: true,
    SubMenuComponent: TvAudioMegaMenu,
  },
  {
    id: 'watches-eyewear',
    name: 'Watches & Eyewear',
    href: '/category/watches',
    hasSubmenu: true,
    SubMenuComponent: WatchesEyewearMegaMenu,
  },
  {
    id: 'car-motorbike',
    name: 'Car, Motorbike & Industrial',
    href: '/category/car-electronics',
    hasSubmenu: true,
    SubMenuComponent: CarMotorbikeMegaMenu,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    href: '/category/accessories',
    hasSubmenu: true,
    SubMenuComponent: AccessoriesMegaMenu,
  },
];

export default function CategoriesDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenuId, setActiveSubmenuId] = useState<string | null>(null);

  const activeCategory = CATEGORIES_MENU_DATA.find((cat) => cat.id === activeSubmenuId);
  const ActiveSubMenuComponent = activeCategory?.SubMenuComponent;

  return (
    <div
      className="relative inline-block py-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveSubmenuId(null);
      }}
    >
      <button
        type="button"
        aria-label="Categories Menu"
        aria-expanded={isOpen}
        className="flex items-center gap-2 font-bold text-sm text-[#333e48] dark:text-gray-200 hover:text-[#fed700] dark:hover:text-[#fed700] transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
      >
        <span>Categories</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#fed700]' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-0 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
          <div className="flex bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden">
            {/* Yellow accent bar at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#fed700] z-10" />

            {/* Left sidebar — primary category list */}
            <div className="w-[270px] pt-3 pb-1 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
              {CATEGORIES_MENU_DATA.map((item) => {
                const isSelected = activeSubmenuId === item.id;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => {
                      if (item.hasSubmenu) {
                        setActiveSubmenuId(item.id);
                      } else {
                        setActiveSubmenuId(null);
                      }
                    }}
                    className={`relative px-5 py-[11px] flex items-center justify-between text-[13px] cursor-pointer transition-colors duration-100 border-b border-gray-100 dark:border-gray-800/60 last:border-0 ${
                      isSelected
                        ? 'bg-[#f5f5f5] dark:bg-gray-900 text-[#333e48] dark:text-gray-100'
                        : 'hover:bg-[#fafafa] dark:hover:bg-gray-900/50 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Link
                      href={item.href}
                      className={`flex-1 transition-colors ${
                        item.isBold
                          ? 'font-bold text-[#333e48] dark:text-gray-100'
                          : 'font-normal'
                      }`}
                    >
                      {item.name}
                    </Link>

                    {item.hasSubmenu && (
                      <ChevronRight
                        className={`w-3.5 h-3.5 shrink-0 ml-2 ${
                          isSelected
                            ? 'text-gray-600 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-500'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right panel — 2-row submenu */}
            {ActiveSubMenuComponent && (
              <div className="bg-white dark:bg-gray-950 animate-in fade-in-50 duration-150 border-l-0">
                <ActiveSubMenuComponent />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
