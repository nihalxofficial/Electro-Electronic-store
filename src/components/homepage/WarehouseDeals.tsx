"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "../shared/ProductCard";

interface WarehouseProduct extends Product {
  discountPercent: number;
}

// Sample Products Data with discount percentages attached
const SAMPLE_DEALS: WarehouseProduct[] = [
  // -80% Off Items (6 items)
  {
    id: "wh-1",
    title: "Universal Headphones Case in Black",
    slug: "universal-headphones-case-black",
    categories: ["Accessories", "Headphone Cases"],
    price: 19.99,
    originalPrice: 99.99,
    discountPercent: 80,
    image: "https://images.unsplash.com/photo-1583394293253-4f26498c2c5e?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-2",
    title: "High-Speed Braided USB Wires",
    slug: "headphones-usb-wires",
    categories: ["Accessories", "Cables"],
    price: 9.99,
    originalPrice: 49.99,
    discountPercent: 80,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-3",
    title: "Protective Screen Guard 3-Pack",
    slug: "screen-guard-3-pack",
    categories: ["Accessories", "Screen Protectors"],
    price: 4.99,
    originalPrice: 24.99,
    discountPercent: 80,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-80-4",
    title: "Ultra Slim Phone Armor Case",
    slug: "ultra-slim-phone-armor-case",
    categories: ["Accessories", "Cases & Covers"],
    price: 5.99,
    originalPrice: 29.99,
    discountPercent: 80,
    image: "https://images.unsplash.com/photo-1541877944-ac82a091518a?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-80-5",
    title: "Magnetic Car Mount Holder",
    slug: "magnetic-car-mount-holder",
    categories: ["Car Electronics", "Accessories"],
    price: 7.99,
    originalPrice: 39.99,
    discountPercent: 80,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-80-6",
    title: "Anti-Dust Earbud Cleaning Pen",
    slug: "anti-dust-earbud-cleaning-pen",
    categories: ["Accessories", "Headphones"],
    price: 3.99,
    originalPrice: 19.99,
    discountPercent: 80,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // -65% Off Items
  {
    id: "wh-4",
    title: "Ultra Wireless S50 Headphones with Mic",
    slug: "ultra-wireless-s50-headphones",
    categories: ["Accessories", "Headphones"],
    price: 122.5,
    originalPrice: 350.0,
    discountPercent: 65,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-5",
    title: "Smart Workout Fitness Tracker Band",
    slug: "smart-fitness-tracker-band",
    categories: ["Wearables", "Watches"],
    price: 35.0,
    originalPrice: 100.0,
    discountPercent: 65,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-6",
    title: "Ergonomic Vertical Wireless Mouse",
    slug: "ergonomic-vertical-wireless-mouse",
    categories: ["Computers", "Accessories"],
    price: 28.0,
    originalPrice: 80.0,
    discountPercent: 65,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // -45% Off Items
  {
    id: "wh-7",
    title: "Game Console Controller + USB Cable",
    slug: "game-console-controller-usb",
    categories: ["Game Consoles", "Video Games"],
    price: 54.45,
    originalPrice: 99.0,
    discountPercent: 45,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-8",
    title: "Wireless Audio System Multiroom 360",
    slug: "wireless-audio-system-360",
    categories: ["Audio Speakers", "TV & Audio"],
    price: 1264.45,
    originalPrice: 2299.0,
    discountPercent: 45,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-9",
    title: "RGB Mechanical Gaming Keyboard",
    slug: "rgb-mechanical-gaming-keyboard",
    categories: ["Computers", "Gaming Accessories"],
    price: 66.0,
    originalPrice: 120.0,
    discountPercent: 45,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },

  // -25% Off Items
  {
    id: "wh-10",
    title: "EliteBook Revolve 810 G2 Touch Laptop",
    slug: "tablet-white-elitebook-revolve",
    categories: ["Laptops", "Laptops & Computers"],
    price: 975.0,
    originalPrice: 1300.0,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-11",
    title: "Compact 4K Action Camera Waterproof",
    slug: "compact-4k-action-camera-waterproof",
    categories: ["Cameras", "Action Cameras"],
    price: 187.5,
    originalPrice: 250.0,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-12",
    title: "Fast Charging Dual Port Car Charger",
    slug: "fast-charging-dual-port-car-charger",
    categories: ["Car Electronics", "Accessories"],
    price: 22.5,
    originalPrice: 30.0,
    discountPercent: 25,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
];

const DISCOUNT_TABS = [
  { label: "-80% off", value: 80 },
  { label: "-65%", value: 65 },
  { label: "-45%", value: 45 },
  { label: "-25%", value: 25 },
];

export default function WarehouseDeals() {
  const [activeTab, setActiveTab] = useState(80);
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Filter products by selected discount percentage tab
  const filteredProducts = SAMPLE_DEALS.filter(
    (product) => product.discountPercent === activeTab
  );

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(activePageIndex, totalPages - 1);
  const visibleProducts = filteredProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-10">
      {/* 1. Section Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-6 gap-4">
        {/* Left Title */}
        <div className="relative inline-block">
          <h2 className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-100">
            Save Big on Warehouse Cleaning
          </h2>
          <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-primary" />
        </div>

        {/* Center & Right Filters + Section Link */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-6 text-sm">
          {/* Discount Percentage Pill Filters */}
          <div className="flex items-center gap-3">
            {DISCOUNT_TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.value);
                    setActivePageIndex(0);
                  }}
                  className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-white font-bold shadow-sm"
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Link to Section */}
          <Link
            href="/deals/warehouse"
            className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 font-medium transition-colors cursor-pointer"
          >
            Go to Daily Deals Section
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Carousel Container with Side Navigation Arrows */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          type="button"
          aria-label="Previous Products"
          onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Product Cards Row */}
        <div className="border border-gray-200/80 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 divide-x-0 sm:divide-x divide-gray-200/80 dark:divide-gray-800">
            {visibleProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                hasRightBorder={index !== visibleProducts.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          aria-label="Next Products"
          onClick={() => setActivePageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
          disabled={currentPage >= totalPages - 1}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Bottom Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActivePageIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentPage === idx
                  ? "w-6 bg-primary"
                  : "w-2 bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}