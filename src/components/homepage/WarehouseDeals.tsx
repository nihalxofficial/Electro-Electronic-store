"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "../shared/ProductCard";

interface WarehouseDealsProps {
  products?: Product[];
  deals?: Product[];
}

const DISCOUNT_TABS = [
  { label: "-80% off", value: 80 },
  { label: "-65%", value: 65 },
  { label: "-45%", value: 45 },
  { label: "-25%", value: 25 },
];

export default function WarehouseDeals({
  products,
  deals,
}: WarehouseDealsProps) {
  const allProducts = products || deals || [];
  const [activeTab, setActiveTab] = useState(80);
  const [activePageIndex, setActivePageIndex] = useState(0);

  // Filter products by selected discount percentage tab
  const filteredProducts = allProducts.filter(
    (product) => (product.discountPercent ?? product.discountPercentage) === activeTab
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