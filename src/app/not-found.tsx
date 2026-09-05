"use client";

import Link from "next/link";
import { Home, Search, ShoppingBag, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[85vh] w-full flex items-center justify-center px-4 py-16 relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-slate-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      
      {/* ── Background Floating Glow Orbs & Decorative Grid ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-sky-400/20 to-blue-600/20 dark:from-sky-500/10 dark:to-blue-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-indigo-400/15 dark:bg-indigo-500/10 rounded-full blur-2xl pointer-events-none animate-[bounce_8s_infinite]" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        
        {/* 1. Interactive 404 Hero Visual */}
        <div className="relative flex items-center justify-center group">
          
          {/* Main 404 Text with Shimmer Gradient */}
          <h1 className="text-9xl md:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-500 dark:to-indigo-400 select-none drop-shadow-sm transition-transform duration-700 ease-out group-hover:scale-105">
            404
          </h1>

          {/* Floating Floating Icon Pill with Soft Float Animation */}
          <div className="absolute bottom-2 md:bottom-4 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-sky-100 dark:border-gray-800 shadow-xl shadow-sky-900/5 animate-[bounce_4s_infinite_ease-in-out]">
            <Search className="w-5 h-5 text-sky-500 dark:text-sky-400 animate-spin-slow" />
            <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Page Not Found
            </span>
          </div>
        </div>

        {/* 2. Text Message Header */}
        <div className="space-y-3 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lost in Cyberspace?</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            We couldn&apos;t find that page
          </h2>
          
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
            The link you followed might be broken, or the page may have been moved to a new URL. Let&apos;s get you back on track!
          </p>
        </div>

        {/* 3. Smooth Interactive CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          
          {/* Primary CTA: Home */}
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold text-sm shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <Home className="w-4 h-4 stroke-[2.2]" />
            <span>Back to Home</span>
          </Link>

          {/* Secondary CTA: Products */}
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-800 dark:text-gray-200 font-semibold text-sm border border-sky-100 dark:border-gray-700/80 shadow-xs hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-gray-800 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            <span>Browse Products</span>
          </Link>

        </div>

        {/* 4. Quick Category Quick-Links */}
        <div className="pt-8 border-t border-sky-100/80 dark:border-gray-800/80 max-w-md mx-auto">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-3">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium">
            <Link
              href="/shop?category=cameras"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-sky-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 dark:hover:border-sky-500/40 transition-all duration-200"
            >
              Cameras
            </Link>
            <Link
              href="/shop?category=tablets-smartphones"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-sky-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 dark:hover:border-sky-500/40 transition-all duration-200"
            >
              Tablets & Phones
            </Link>
            <Link
              href="/deals/warehouse"
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-sky-100 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:text-sky-600 dark:hover:text-sky-400 hover:border-sky-300 dark:hover:border-sky-500/40 transition-all duration-200"
            >
              Daily Deals
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}