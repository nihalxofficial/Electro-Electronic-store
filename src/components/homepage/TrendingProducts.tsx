"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { Product } from "@/types";

// Mock data structured like your reference image
const MOCK_TRENDING_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "Universal Headphones Case in",
    slug: "universal-headphones-case",
    categories: ["Accessories", "Headphone"],
    price: 159.0,
    image: "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    inStock: true,
  },
  {
    id: "2",
    title: "Headphones USB Wires",
    slug: "headphones-usb-wires",
    categories: ["Accessories", "Headphone"],
    price: 50.0,
    image: "https://i.ibb.co.com/5X01M2Wy/71m3-HJg-LTZL-AC-UF894-1000-QL80-removebg-preview.png",
    inStock: true,
  },
  {
    id: "3",
    title: "Ultra Wireless S50 Headphones S50",
    slug: "ultra-wireless-s50-headphones",
    categories: ["Accessories", "Headphones"],
    price: 350.0,
    image: "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    inStock: true,
  },
  {
    id: "4",
    title: "Game Console Controller + USB 3.0",
    slug: "game-console-controller-usb-3",
    categories: ["Game Consoles", "Video"],
    price: 90.0,
    originalPrice: 99.0,
    discountPercent: 9,
    image: "https://i.ibb.co.com/5X01M2Wy/71m3-HJg-LTZL-AC-UF894-1000-QL80-removebg-preview.png",
    inStock: true,
  },
  {
    id: "5",
    title: "Wireless Audio System Multiroom",
    slug: "wireless-audio-system-multiroom",
    categories: ["Audio Speakers", "TV & Audio"],
    price: 2299.0,
    image: "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    inStock: true,
  },
  {
    id: "6",
    title: "Tablet White EliteBook Revolve",
    slug: "tablet-white-elitebook-revolve",
    categories: ["Laptops", "Laptops & Computers"],
    price: 1300.0,
    image: "https://i.ibb.co.com/5X01M2Wy/71m3-HJg-LTZL-AC-UF894-1000-QL80-removebg-preview.png",
    inStock: true,
  },
  {
    id: "7",
    title: "Purple Solo 2 Wireless",
    slug: "purple-solo-2-wireless",
    categories: ["Accessories", "Headphones"],
    price: 248.0,
    image: "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png",
    inStock: true,
  },
];

interface TrendingProductsProps {
  products?: Product[];
  trendingProducts?: Product[];
}

export default function TrendingProductsSection({
  products,
  trendingProducts,
}: TrendingProductsProps) {
  const allProducts =
    products && products.length > 0
      ? products
      : trendingProducts && trendingProducts.length > 0
      ? trendingProducts
      : MOCK_TRENDING_PRODUCTS;

  const [activePageIndex, setActivePageIndex] = useState(0);
  const ITEMS_PER_PAGE = 7;
  const totalPages = Math.max(1, Math.ceil(allProducts.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(activePageIndex, totalPages - 1);
  const visibleProducts = allProducts.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-10">
      
      {/* ── 1. Section Header ── */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-6">
        <div className="relative inline-block">
          <h2 className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-100">
            Trending products
          </h2>
          {/* Active Accent Underline using Gradient Blue */}
          <div className="absolute -bottom-[13px] left-0 w-full h-[2.5px] bg-gradient-to-r from-sky-500 to-blue-600 rounded-full" />
        </div>

        {/* Go to Link */}
        <Link
          href="/products?filter=trending"
          className="text-xs text-gray-500 hover:text-sky-600 dark:text-gray-400 dark:hover:text-sky-400 flex items-center gap-1 font-medium transition-colors cursor-pointer group"
        >
          <span>Go to Trending products</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* ── 2. Carousel Container with Side Controls ── */}
      <div className="relative group/carousel">
        
        {/* Left Arrow Button */}
        <button
          type="button"
          aria-label="Previous products"
          disabled={currentPage === 0}
          onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 border border-sky-100 dark:border-gray-700 shadow-md text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 border border-sky-100/80 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs bg-white dark:bg-gray-900">
          {visibleProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              hasRightBorder={index < visibleProducts.length - 1}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          aria-label="Next products"
          disabled={currentPage >= totalPages - 1}
          onClick={() => setActivePageIndex((prev) => Math.min(totalPages - 1, prev + 1))}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/90 dark:bg-gray-800/90 border border-sky-100 dark:border-gray-700 shadow-md text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>

      {/* ── 3. Pagination Dots ── */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => setActivePageIndex(index)}
              className={`transition-all duration-300 cursor-pointer ${
                currentPage === index
                  ? "w-6 h-2 rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                  : "w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700 hover:bg-sky-300"
              }`}
            />
          ))}
        </div>
      )}

    </section>
  );
}