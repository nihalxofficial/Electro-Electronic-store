"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { TabletPromoProps } from "@/types";

export default function TabletPromoBanner({
  categorySlug = "tablets",
  titlePrefix = "SHOP AND",
  highlightText = "SAVE BIG",
  titleSuffix = "ON HOTTEST TABLETS",
  startingPrice = "79",
  cents = "99",
  imageSrc = "https://i.ibb.co.com/zh1qTHwh/Tablets.png",
}: TabletPromoProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-10">
      <Link
        href={`/products?category=${categorySlug}`}
        className="group relative block w-full rounded-2xl overflow-hidden border border-sky-100/80 dark:border-gray-800 bg-gradient-to-r from-slate-50 via-sky-50/50 to-blue-50/30 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-6 md:px-12 py-6 md:py-0 min-h-[140px] md:h-36 relative overflow-hidden">
          
          {/* 1. Content Area: Headline & Price Badge (Centered) */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 z-10 text-center">
            
            {/* Banner Text */}
            <h2 className="text-base md:text-xl font-light text-gray-600 dark:text-gray-300 tracking-wider uppercase leading-snug">
              {titlePrefix}{" "}
              <span className="font-extrabold text-gray-900 dark:text-white">
                {highlightText}
              </span>{" "}
              {titleSuffix}
            </h2>

            {/* Price Badge */}
            <div className="inline-flex flex-col items-center justify-center bg-[#FFDB00] text-gray-900 px-5 py-2.5 rounded-xl shadow-xs group-hover:scale-105 transition-transform duration-300 shrink-0">
              <span className="text-[9px] whitespace-nowrap font-bold tracking-widest uppercase text-gray-800/90 leading-tight">
                STARTING AT
              </span>
              <div className="flex items-start font-black text-2xl md:text-3xl leading-none tracking-tighter pt-0.5">
                <span className="text-sm font-bold align-top leading-none pt-0.5">$</span>
                <span>{startingPrice}</span>
                <span className="text-xs font-bold align-top leading-none pt-0.5">
                  {cents}
                </span>
              </div>
            </div>

          </div>

          {/* 2. Product Image Area (Centered Layout) */}
          <div className="relative w-full md:w-64 h-32 md:h-full flex items-center justify-center">
            <div className="relative w-full h-full max-w-xs transition-transform duration-500 group-hover:scale-105">
              <Image
                src={imageSrc}
                alt={`${highlightText} ${titleSuffix}`}
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-contain object-center drop-shadow-md"
              />
            </div>
          </div>

        </div>
      </Link>
    </section>
  );
}