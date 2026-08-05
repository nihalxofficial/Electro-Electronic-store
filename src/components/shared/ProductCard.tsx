"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Repeat } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  hasRightBorder?: boolean;
}

export default function ProductCard({
  product,
  hasRightBorder = true,
}: ProductCardProps) {
  const categoryText = product.categories.join(", ");
  const formattedPrice = `$${product.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedOriginalPrice = product.originalPrice
    ? `$${product.originalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : null;

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out h-full hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:-translate-y-0.5 z-0 hover:z-10 ${
        hasRightBorder ? "border-r border-gray-200/80 dark:border-gray-800" : ""
      }`}
    >
      {/* Top Header: Category & Title */}
      <div className="space-y-1">
        <p className="text-[11px] text-gray-400 dark:text-gray-500 font-medium truncate">
          {categoryText}
        </p>
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-[13px] font-bold text-[#0066c0] dark:text-sky-400 leading-snug line-clamp-2 hover:underline min-h-[36px] cursor-pointer">
            {product.title}
          </h3>
        </Link>
      </div>

      {/* Middle Image Area — with wishlist & compare overlay on hover */}
      <div className="my-4 flex items-center justify-center relative h-40 w-full overflow-hidden rounded-md">
        {/* Product image */}
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            key={product.id + product.image}
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80";
            }}
            className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist & Compare — slide up from bottom on card hover */}
        <div
          className="
            absolute bottom-0 left-0 right-0
            flex items-center justify-center gap-3
            py-2 px-3
            bg-white/90 dark:bg-gray-900/90
            backdrop-blur-sm
            border-t border-gray-100 dark:border-gray-800
            translate-y-full
            group-hover:translate-y-0
            transition-transform duration-250 ease-out
          "
        >
          {/* Wishlist */}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer group/wish"
          >
            <Heart className="w-3.5 h-3.5 group-hover/wish:fill-red-500 group-hover/wish:text-red-500 transition-all duration-200" />
            Wishlist
          </button>

          {/* Divider */}
          <span className="text-gray-200 dark:text-gray-700 font-light text-xs select-none">|</span>

          {/* Compare */}
          <button
            type="button"
            aria-label="Add to compare"
            className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-[#0066c0] dark:hover:text-sky-400 transition-colors cursor-pointer group/cmp"
          >
            <Repeat className="w-3.5 h-3.5 group-hover/cmp:text-[#0066c0] dark:group-hover/cmp:text-sky-400 transition-colors duration-200" />
            Compare
          </button>
        </div>
      </div>

      {/* Bottom Footer: Price & Add To Cart */}
      <div className="flex items-end justify-between pt-2">
        <div className="flex flex-col">
          {formattedOriginalPrice ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-red-500">
                {formattedPrice}
              </span>
              <span className="text-xs text-gray-400 line-through">
                {formattedOriginalPrice}
              </span>
            </div>
          ) : (
            <span className="text-base font-semibold text-gray-800 dark:text-gray-100">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Add To Cart — glows on card hover */}
        <button
          type="button"
          aria-label="Add to cart"
          className="
            w-8 h-8 rounded-full
            bg-gray-100 dark:bg-gray-800
            text-gray-600 dark:text-gray-300
            flex items-center justify-center
            cursor-pointer
            transition-all duration-200
            group-hover:bg-[#fed700]
            group-hover:text-gray-900
            group-hover:shadow-[0_0_12px_3px_rgba(254,215,0,0.55)]
            hover:scale-110
          "
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}