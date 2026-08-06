"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { PromoBanner } from "@/types";

interface PromoBannersProps {
  banners?: PromoBanner[];
}

export default function PromoBanners({ banners = [] }: PromoBannersProps) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-8">
      {/* 1. Dual Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="group relative bg-gradient-to-r from-sky-50/80 via-blue-50/40 to-slate-50 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 rounded-xl p-6 md:p-8 border border-sky-100/80 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-between overflow-hidden"
          >
            {/* Left Side: Product Image Container */}
            <div className="relative w-1/2 h-44 md:h-48 flex items-center justify-center">
              <Link
                href={banner.href}
                className="relative w-full h-full cursor-pointer flex items-center justify-center"
              >
                <Image
                  src={banner.image}
                  alt={banner.imageAlt}
                  fill
                  sizes="(max-width: 768px) 50vw, 30vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-sm"
                  priority={banner.priority}
                />
              </Link>
            </div>

            {/* Right Side: Text, Price & CTA */}
            <div className="w-1/2 pl-4 space-y-2.5">
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                {banner.subtitle}
              </p>
              
              <h3 className="text-lg md:text-xl font-light text-gray-800 dark:text-gray-100 uppercase leading-snug">
                {banner.highlightText && (
                  <span className="font-bold text-gray-900 dark:text-white">
                    {banner.highlightText}{" "}
                  </span>
                )}
                {banner.title}
              </h3>

              {/* Price display if present */}
              {(banner.priceDollars || banner.price) && (
                <div className="pt-1 flex items-baseline gap-1">
                  {banner.pricePrefix && (
                    <span className="text-[10px] font-semibold text-gray-400 uppercase">
                      {banner.pricePrefix}
                    </span>
                  )}
                  <span className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    ${banner.priceDollars || banner.price}
                    {banner.priceCents && (
                      <span className="text-xs align-top font-bold">
                        {banner.priceCents}
                      </span>
                    )}
                  </span>
                  
                  {!banner.buttonText && (
                    <Link
                      href={banner.href}
                      className="ml-2 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm cursor-pointer"
                      aria-label={`View ${banner.title}`}
                    >
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  )}
                </div>
              )}

              {/* Button CTA if present */}
              {banner.buttonText && (
                <Link
                  href={banner.href}
                  className="inline-flex items-center gap-2 pt-1 text-xs font-bold uppercase tracking-wider text-gray-800 dark:text-gray-200 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <span>{banner.buttonText}</span>
                  <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center transition-transform group-hover:translate-x-1 shadow-sm">
                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 2. Trending Products Section Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mt-12 mb-6">
        <div className="relative inline-block">
          <h2 className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-100">
            Trending products
          </h2>
          <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-primary" />
        </div>

        <Link
          href="/products?filter=trending"
          className="text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          Go to Trending products
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </section>
  );
}