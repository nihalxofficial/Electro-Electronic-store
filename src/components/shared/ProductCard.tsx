"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
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
      className={`group relative flex flex-col justify-between p-4 bg-white dark:bg-gray-900 transition-colors duration-200 h-full ${
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

      {/* Middle Image Area */}
      <div className="my-4 flex items-center justify-center relative h-40 w-full overflow-hidden">
        <Link
          href={`/product/${product.slug}`}
          className="relative w-full h-full flex items-center justify-center cursor-pointer"
        >
          <img
            src={product.image}
            alt={product.title}
            className="object-contain max-h-full max-w-full transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
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

        {/* Quick Add To Cart Icon Button */}
        <button
          type="button"
          aria-label="Add to cart"
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center hover:bg-[#fed700] hover:text-gray-900 dark:hover:bg-[#fed700] dark:hover:text-gray-900 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}