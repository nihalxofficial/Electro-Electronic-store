"use client";

import React from "react";
import Link from "next/link";
import {
  PackageSearch,
  ArrowLeft,
  Home,
  ShoppingBag,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface ProductNotFoundProps {
  slug?: string;
}

export default function ProductNotFound({ slug }: ProductNotFoundProps) {
  const quickCategories = [
    { name: "Laptops & Computers", href: "/shop?category=laptops" },
    { name: "Audio & Headphones", href: "/shop?category=audio" },
    { name: "Smartphones & Tablets", href: "/shop?category=smartphones" },
    { name: "Gaming Gear", href: "/shop?category=gaming" },
  ];

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center py-12 px-4">
      {/* Ambient background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-sky-500/10 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-xl w-full text-center space-y-8">
        {/* Visual Icon Box */}
        <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-sky-500/20 via-blue-500/20 to-indigo-500/20 blur-xl animate-pulse" />
          <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-white via-sky-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-sky-950 border border-sky-100 dark:border-sky-900/60 shadow-xl shadow-sky-900/10 dark:shadow-sky-950/50 flex items-center justify-center">
            <PackageSearch className="w-12 h-12 text-sky-600 dark:text-sky-400 stroke-[1.5]" />
          </div>
          <span className="absolute -bottom-2 -right-2 p-1.5 rounded-full bg-amber-500 text-white shadow-md shadow-amber-500/30">
            <Sparkles className="w-4 h-4" />
          </span>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800/50 text-sky-700 dark:text-sky-300 text-xs font-bold uppercase tracking-wider">
            404 • Product Not Found
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Oops! This product is unavailable
          </h1>

          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            The item you are looking for might have been removed, had its name changed, or is temporarily out of catalog.
          </p>

          {slug && (
            <div className="pt-1">
              <span className="inline-block px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-mono text-slate-500 dark:text-slate-400">
                Slug: &quot;{slug}&quot;
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/shop"
            className="w-full sm:w-auto h-11 px-6 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            Explore All Products
          </Link>

          <Link
            href="/"
            className="w-full sm:w-auto h-11 px-6 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/70 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Popular Categories Shortcut */}
        <div className="pt-6 border-t border-sky-100 dark:border-sky-900/40 space-y-3">
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Or Browse Top Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {quickCategories.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/50 hover:border-sky-400 dark:hover:border-sky-600 hover:text-sky-600 dark:hover:text-sky-400 transition-all shadow-2xs"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Help Contact */}
        <div className="text-xs text-slate-400 flex items-center justify-center gap-1.5 pt-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Need help finding an item?</span>
          <Link href="/contact" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
