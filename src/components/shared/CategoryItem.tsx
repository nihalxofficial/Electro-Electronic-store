"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Category } from "@/types";

interface CategoryItemProps {
  category: Category;
  isActive: boolean;
  hasSubCategories: boolean;
  onHover: () => void;
  onClick?: () => void;
}

export default function CategoryItem({
  category,
  isActive,
  hasSubCategories,
  onHover,
  onClick,
}: CategoryItemProps) {
  return (
    <div
      onMouseEnter={onHover}
      className={`group relative flex items-center justify-between px-5 py-[11px] text-[13px] transition-all duration-150 border-b border-gray-100 dark:border-gray-800/60 last:border-0 cursor-pointer ${
        isActive
          ? "bg-primary/10 dark:bg-primary/20 text-gray-900 dark:text-white font-semibold"
          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 hover:text-gray-900 dark:hover:text-white"
      }`}
    >
      {/* Active Left Accent Bar */}
      {isActive && (
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary" />
      )}

      <Link
        href={`/shop?category=${category.slug}`}
        onClick={onClick}
        className="flex-1 truncate pr-2 transition-colors"
      >
        {category.name}
      </Link>

      {hasSubCategories && (
        <ChevronRight
          className={`w-3.5 h-3.5 shrink-0 transition-transform duration-150 ${
            isActive
              ? "text-primary translate-x-0.5"
              : "text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300"
          }`}
        />
      )}
    </div>
  );
}
