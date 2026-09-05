"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Heart, Repeat, Eye } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  hasRightBorder?: boolean;
  showDiscountBadge?: boolean;
}

export default function ProductCard({
  product,
  hasRightBorder = true,
  showDiscountBadge = true,
}: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState<string>(product.image);

  const categoryText = product.categories?.join(", ") || "Electronics";
  
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

  const discountPercent =
    product.discountPercentage ??
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  return (
    <div
      className={`group relative flex flex-col justify-between p-2.5 sm:p-4 
        bg-gradient-to-br from-sky-50/80 via-blue-50/30 to-slate-50 
        dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 
        transition-all duration-300 ease-out h-full 
        hover:shadow-xl hover:shadow-sky-900/10 dark:hover:shadow-black/60 z-0 hover:z-20 rounded-xl ${
        hasRightBorder ? "border-r border-sky-100/80 dark:border-gray-800" : ""
      }`}
    >
      {/* Discount Badge */}
      {showDiscountBadge && discountPercent && discountPercent > 0 ? (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-sm shadow-sky-500/20">
          -{discountPercent}%
        </div>
      ) : null}

      {/* Top Image Area */}
      <div className="relative w-full h-32 sm:h-44 md:h-48 overflow-hidden rounded-lg bg-white/60 dark:bg-gray-800/40 border border-sky-100/50 dark:border-gray-800/50 backdrop-blur-xs mb-2 sm:mb-3">
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full block cursor-pointer"
        >
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            onError={() => {
              setImgSrc(
                "https://smartview.com.bd/uploads/products/1742452515.webp"
              );
            }}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {/* Floating Actions (Glassmorphism Pill overlay) — hidden on small touch screens */}
        <div className="hidden sm:flex absolute bottom-2 left-1/2 -translate-x-1/2 items-center gap-1 p-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full border border-sky-100 dark:border-gray-700/80 shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          <button
            type="button"
            aria-label="Add to wishlist"
            className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer group/btn"
          >
            <Heart className="w-3.5 h-3.5 group-hover/btn:fill-red-500 transition-all" />
          </button>
          <span className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700" />
          <button
            type="button"
            aria-label="Add to compare"
            className="p-1.5 rounded-full text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all cursor-pointer"
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>
          <span className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700" />
          <Link
            href={`/product/${product.slug}`}
            aria-label="Quick View"
            className="p-1.5 rounded-full text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Below Image: Category, Title & Description */}
      <div className="flex-1 flex flex-col space-y-1 mb-2 sm:mb-3">
        <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-sky-600/80 dark:text-sky-400/80 truncate">
          {categoryText}
        </p>
        <Link href={`/product/${product.slug}`} className="block group/title">
          <h3 className="text-xs sm:text-[13px] font-semibold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 group-hover/title:text-sky-600 dark:group-hover/title:text-sky-400 transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>
        {product.description && (
          <p className="hidden sm:block text-[11px] text-gray-500 dark:text-gray-400 truncate leading-relaxed">
            {product.description}
          </p>
        )}
      </div>

      {/* Bottom Footer: Price & Add To Cart */}
      <div className="flex items-end justify-between pt-1.5 sm:pt-2 border-t border-sky-100/50 dark:border-gray-800/60">
        <div className="flex flex-col">
          {formattedOriginalPrice ? (
            <div className="flex flex-col">
              <span className="text-[10px] sm:text-[11px] text-gray-400 dark:text-gray-500 line-through leading-none pb-0.5">
                {formattedOriginalPrice}
              </span>
              <span className="text-sm sm:text-base font-extrabold text-red-500 dark:text-red-400 leading-tight">
                {formattedPrice}
              </span>
            </div>
          ) : (
            <span className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white leading-tight">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Add To Cart Button */}
        <button
          type="button"
          aria-label="Add to cart"
          className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-sky-100 dark:border-gray-700 shadow-xs flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-sky-500/30 hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}