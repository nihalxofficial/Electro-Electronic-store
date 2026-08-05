"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "../shared/ProductCard";

// Sample Products Data matching the exact UI design
const SAMPLE_DEALS: Product[] = [
  {
    id: "wh-1",
    title: "Universal Headphones Case in Black",
    slug: "universal-headphones-case-black",
    categories: ["Accessories", "Headphone Cases"],
    price: 159.0,
    image: "https://images.unsplash.com/photo-1583394293253-4f26498c2c5e?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-2",
    title: "Headphones USB Wires",
    slug: "headphones-usb-wires",
    categories: ["Accessories", "Headphone"],
    price: 50.0,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-3",
    title: "Ultra Wireless S50 Headphones with Mic",
    slug: "ultra-wireless-s50-headphones",
    categories: ["Accessories", "Headphones"],
    price: 350.0,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-4",
    title: "Game Console Controller + USB 3.0 Cable",
    slug: "game-console-controller-usb",
    categories: ["Game Consoles", "Video Games"],
    price: 90.0,
    originalPrice: 99.0,
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-5",
    title: "Wireless Audio System Multiroom 360",
    slug: "wireless-audio-system-360",
    categories: ["Audio Speakers", "TV & Audio"],
    price: 2299.0,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
  {
    id: "wh-6",
    title: "EliteBook Revolve 810 G2 Tablet Laptop",
    slug: "tablet-white-elitebook-revolve",
    categories: ["Laptops", "Laptops & Computers"],
    price: 1300.0,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&auto=format&fit=crop&q=80",
    inStock: true,
  },
];


const DISCOUNT_TABS = [
  { label: "-80% off", value: 80, isPill: true },
  { label: "-65%", value: 65, isPill: false },
  { label: "-45%", value: 45, isPill: false },
  { label: "-25%", value: 25, isPill: false },
];

export default function WarehouseDeals() {
  const [activeTab, setActiveTab] = useState(80);
  const [activePageIndex, setActivePageIndex] = useState(0);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-10">
      {/* 1. Section Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-6 gap-4">
        {/* Left Title with Yellow Active Underline */}
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
                  onClick={() => setActiveTab(tab.value)}
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
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Product Cards Row */}
        <div className="border border-gray-200/80 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 divide-x-0 sm:divide-x divide-gray-200/80 dark:divide-gray-800">
            {SAMPLE_DEALS.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                hasRightBorder={index !== SAMPLE_DEALS.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          aria-label="Next Products"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3. Bottom Pagination Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <button
          type="button"
          onClick={() => setActivePageIndex(0)}
          className={`h-2 rounded-full transition-all cursor-pointer ${
            activePageIndex === 0
              ? "w-6 bg-primary"
              : "w-2 bg-gray-300 dark:bg-gray-700"
          }`}
        />
        <button
          type="button"
          onClick={() => setActivePageIndex(1)}
          className={`h-2 rounded-full transition-all cursor-pointer ${
            activePageIndex === 1
              ? "w-6 bg-primary"
              : "w-2 bg-gray-300 dark:bg-gray-700"
          }`}
        />
        <button
          type="button"
          onClick={() => setActivePageIndex(2)}
          className={`h-2 rounded-full transition-all cursor-pointer ${
            activePageIndex === 2
              ? "w-6 bg-primary"
              : "w-2 bg-gray-300 dark:bg-gray-700"
          }`}
        />
      </div>
    </section>
  );
}