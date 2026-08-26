"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ArrowRight, Layers, FolderTree } from "lucide-react";
import { Category, SubCategory } from "@/types";

interface MobileCategoriesProps {
  categories: Category[];
  subCategories: SubCategory[];
  onClose: () => void;
}

export default function MobileCategories({
  categories,
  subCategories,
  onClose,
}: MobileCategoriesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Group subcategories by parent category ID
  const subCategoryMap = useMemo(() => {
    const map = new Map<string, SubCategory[]>();

    for (const sub of subCategories) {
      if (sub.isActive === false) continue;
      const catId =
        typeof sub.categoryId === "object" && sub.categoryId !== null
          ? (sub.categoryId as { _id?: string; id?: string })._id ||
            (sub.categoryId as { _id?: string; id?: string }).id
          : sub.categoryId;

      if (catId) {
        const key = String(catId);
        if (!map.has(key)) map.set(key, []);
        map.get(key)!.push(sub);
      }
    }

    return map;
  }, [subCategories]);

  const toggleExpand = (catId: string) => {
    setExpandedId((prev) => (prev === catId ? null : catId));
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        <span className="flex items-center gap-1.5">
          <FolderTree className="w-3.5 h-3.5 text-primary" />
          Categories & Subcategories
        </span>
        <span className="text-[11px] font-normal text-gray-400">
          {categories.length} categories
        </span>
      </div>

      <div className="rounded-xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/40 divide-y divide-gray-200/60 dark:divide-gray-800/60 overflow-hidden">
        {categories.map((category) => {
          const catKey = String(category._id || category.id || category.slug);
          const relatedSubs = subCategoryMap.get(catKey) || [];
          const hasSubs = relatedSubs.length > 0;
          const isExpanded = expandedId === catKey;
          const imageUrl =
            typeof category.image === "string" && category.image.trim().length > 0
              ? category.image
              : undefined;

          return (
            <div key={catKey} className="transition-colors">
              {/* Category Header Row */}
              <div className="flex items-center justify-between p-2.5 hover:bg-white dark:hover:bg-gray-900/80 transition-colors">
                <Link
                  href={`/product?category=${category.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-2.5 flex-1 min-w-0 pr-2 group"
                >
                  {/* Category Image / Thumbnail Icon */}
                  {imageUrl ? (
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-gray-200 dark:bg-gray-800 border border-gray-200/60 dark:border-gray-700/60">
                      <Image
                        src={imageUrl}
                        alt={category.name}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center shrink-0 text-primary">
                      <Layers className="w-4 h-4" />
                    </div>
                  )}

                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-gray-800 dark:text-gray-100 truncate group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    {hasSubs && (
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {relatedSubs.length} subcategories
                      </span>
                    )}
                  </div>
                </Link>

                {/* Subcategories Expand / Collapse Button */}
                {hasSubs ? (
                  <button
                    type="button"
                    aria-label={`Toggle ${category.name} subcategories`}
                    onClick={() => toggleExpand(catKey)}
                    className={`p-1.5 rounded-lg border text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-200 cursor-pointer ${
                      isExpanded
                        ? "bg-primary/10 border-primary/30 text-primary dark:text-primary"
                        : "border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isExpanded ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={`/product?category=${category.slug}`}
                    onClick={onClose}
                    className="p-1.5 text-gray-400 hover:text-primary"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {/* Subcategories Collapsible Section */}
              {hasSubs && isExpanded && (
                <div className="bg-white dark:bg-gray-950 px-3 py-2.5 border-t border-gray-100 dark:border-gray-800/80 animate-in fade-in-50 slide-in-from-top-1 duration-150">
                  <div className="grid grid-cols-1 gap-1 pl-7">
                    {relatedSubs.map((sub) => (
                      <Link
                        key={sub._id || sub.id || sub.slug}
                        href={`/product?category=${category.slug}&subCategory=${sub.slug}`}
                        onClick={onClose}
                        className="group flex items-center justify-between py-1.5 px-2 rounded-md text-xs text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors"
                      >
                        <span className="truncate group-hover:translate-x-0.5 transition-transform duration-150">
                          {sub.name}
                        </span>
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity shrink-0" />
                      </Link>
                    ))}

                    <Link
                      href={`/product?category=${category.slug}`}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline pt-2 mt-1 border-t border-gray-100 dark:border-gray-800/60"
                    >
                      <span>View all in {category.name}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
