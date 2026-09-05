import React from "react";

interface ProductCardSkeletonProps {
  hasRightBorder?: boolean;
}

export default function ProductCardSkeleton({
  hasRightBorder = false,
}: ProductCardSkeletonProps) {
  return (
    <div
      className={`relative flex flex-col justify-between p-2.5 sm:p-4 
        bg-gradient-to-br from-sky-50/50 via-blue-50/20 to-slate-50/80 
        dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 
        h-full rounded-xl animate-pulse ${
        hasRightBorder ? "border-r border-sky-100/80 dark:border-gray-800" : ""
      }`}
    >
      {/* Top Image Skeleton */}
      <div className="relative w-full h-32 sm:h-44 md:h-48 rounded-lg bg-gray-200/80 dark:bg-gray-800/80 mb-2 sm:mb-3 overflow-hidden">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent" />
      </div>

      {/* Category & Title Skeleton */}
      <div className="flex-1 flex flex-col space-y-2 mb-2 sm:mb-3">
        {/* Category tag skeleton */}
        <div className="h-2.5 w-16 bg-sky-200/60 dark:bg-sky-950/60 rounded-full" />
        {/* Title skeleton */}
        <div className="h-3.5 w-4/5 bg-gray-200 dark:bg-gray-800 rounded-md" />
        <div className="h-3.5 w-3/5 bg-gray-200 dark:bg-gray-800 rounded-md" />
        {/* Description line skeleton (hidden on mobile) */}
        <div className="hidden sm:block h-2.5 w-1/2 bg-gray-200/70 dark:bg-gray-800/70 rounded-md" />
      </div>

      {/* Bottom Footer: Price & Button Skeleton */}
      <div className="flex items-end justify-between pt-1.5 sm:pt-2 border-t border-sky-100/50 dark:border-gray-800/60">
        <div className="space-y-1">
          <div className="h-2.5 w-10 bg-gray-200/60 dark:bg-gray-800/60 rounded-full" />
          <div className="h-4 sm:h-5 w-14 bg-gray-200 dark:bg-gray-800 rounded-md" />
        </div>
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
