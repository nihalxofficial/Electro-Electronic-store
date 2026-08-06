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
    product.discountPercent ??
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 
        /* 1. Added same gradient background as PromoBanners */
        bg-gradient-to-br from-sky-50/80 via-blue-50/30 to-slate-50 
        dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 
        transition-all duration-300 ease-out h-full 
        hover:shadow-xl hover:shadow-sky-900/10 dark:hover:shadow-black/60 z-0 hover:z-20 ${
        hasRightBorder ? "border-r border-sky-100/80 dark:border-gray-800" : ""
      }`}
    >
      {/* Discount Badge */}
      {showDiscountBadge && discountPercent && discountPercent > 0 ? (
        <div className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm shadow-sky-500/20">
          -{discountPercent}%
        </div>
      ) : null}

      {/* Top Header: Category & Title */}
      <div className="space-y-1.5 pt-1">
        <p className="text-[10px] uppercase font-bold tracking-wider text-sky-600/80 dark:text-sky-400/80 truncate">
          {categoryText}
        </p>
        <Link href={`/product/${product.slug}`} className="block group/title">
          <h3 className="text-[13px] font-semibold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 group-hover/title:text-sky-600 dark:group-hover/title:text-sky-400 transition-colors min-h-[36px] cursor-pointer">
            {product.title}
          </h3>
        </Link>
      </div>

      {/* Middle Image Area with Floating Action Overlay */}
      <div className="my-4 flex items-center justify-center relative h-44 w-full overflow-hidden rounded-lg bg-white/60 dark:bg-gray-800/40 border border-sky-100/50 dark:border-gray-800/50 backdrop-blur-xs">
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center cursor-pointer p-2"
        >
          <Image
            src={imgSrc}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 16vw"
            onError={() => {
              setImgSrc(
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80"
              );
            }}
            className="object-contain p-2 transition-transform duration-500 ease-out group-hover:scale-108 drop-shadow-sm"
          />
        </Link>

        {/* Floating Actions (Glassmorphism Pill overlay) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 p-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-full border border-sky-100 dark:border-gray-700/80 shadow-md translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
          {/* Wishlist */}
          <button
            type="button"
            aria-label="Add to wishlist"
            className="p-1.5 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer group/btn"
          >
            <Heart className="w-3.5 h-3.5 group-hover/btn:fill-red-500 transition-all" />
          </button>

          <span className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700" />

          {/* Compare */}
          <button
            type="button"
            aria-label="Add to compare"
            className="p-1.5 rounded-full text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all cursor-pointer"
          >
            <Repeat className="w-3.5 h-3.5" />
          </button>

          <span className="w-[1px] h-3 bg-gray-200 dark:bg-gray-700" />

          {/* Quick View Link */}
          <Link
            href={`/product/${product.slug}`}
            aria-label="Quick View"
            className="p-1.5 rounded-full text-gray-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Bottom Footer: Price & Add To Cart */}
      <div className="flex items-end justify-between pt-1">
        <div className="flex flex-col">
          {formattedOriginalPrice ? (
            <div className="flex flex-col">
              <span className="text-[11px] text-gray-400 dark:text-gray-500 line-through leading-none pb-0.5">
                {formattedOriginalPrice}
              </span>
              <span className="text-base font-extrabold text-red-500 dark:text-red-400 leading-tight">
                {formattedPrice}
              </span>
            </div>
          ) : (
            <span className="text-base font-extrabold text-gray-900 dark:text-white leading-tight">
              {formattedPrice}
            </span>
          )}
        </div>

        {/* Add To Cart Button */}
        <button
          type="button"
          aria-label="Add to cart"
          className="w-9 h-9 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-sky-100 dark:border-gray-700 shadow-xs flex items-center justify-center cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-sky-500/30 hover:scale-105 active:scale-95"
        >
          <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>
    </div>
  );
}