"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronDown, Loader2, AlertCircle } from "lucide-react";
import { Category, SubCategory } from "@/types";
import { getCategories } from "@/lib/api/categories";
import { getSubCategories } from "@/lib/api/subCategories";
import CategoryItem from "./CategoryItem";
import SubCategoryMenu from "./SubCategoryMenu";

interface CategoriesDropdownProps {
  initialCategories?: Category[];
  initialSubCategories?: SubCategory[];
}

export default function CategoriesDropdown({
  initialCategories,
  initialSubCategories,
}: CategoriesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories || []);
  const [subCategories, setSubCategories] = useState<SubCategory[]>(
    initialSubCategories || []
  );
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!initialCategories?.length);

  useEffect(() => {
    if (initialCategories && initialCategories.length > 0) {
      setCategories(initialCategories);
      if (initialSubCategories) setSubCategories(initialSubCategories);
      setActiveCategoryId(
        initialCategories[0]._id || initialCategories[0].id || initialCategories[0].slug
      );
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    async function fetchData() {
      try {
        const [catRes, subRes] = await Promise.allSettled([
          getCategories(),
          getSubCategories(),
        ]);

        if (!isMounted) return;

        let loadedCategories: Category[] = [];
        let loadedSubCategories: SubCategory[] = [];

        if (catRes.status === "fulfilled") {
          const val = catRes.value;
          if (val?.success && Array.isArray(val.data)) {
            loadedCategories = val.data;
          } else if (Array.isArray(val)) {
            loadedCategories = val;
          }
        }

        if (subRes.status === "fulfilled") {
          const val = subRes.value;
          if (val?.success && Array.isArray(val.data)) {
            loadedSubCategories = val.data;
          } else if (Array.isArray(val)) {
            loadedSubCategories = val;
          }
        }

        const activeCats = loadedCategories.filter((c) => c.isActive !== false);
        setCategories(activeCats);
        setSubCategories(loadedSubCategories.filter((s) => s.isActive !== false));

        if (activeCats.length > 0) {
          setActiveCategoryId(activeCats[0]._id || activeCats[0].id || activeCats[0].slug);
        }
      } catch (err) {
        console.error("Failed to fetch categories/subcategories:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Map subcategories to categoryId for fast lookup
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

  // Determine active category object
  const activeCategory = useMemo(() => {
    if (!categories.length) return null;
    if (activeCategoryId) {
      const found = categories.find(
        (c) =>
          (c._id && c._id === activeCategoryId) ||
          (c.id && c.id === activeCategoryId) ||
          c.slug === activeCategoryId
      );
      if (found) return found;
    }
    return categories[0] || null;
  }, [categories, activeCategoryId]);

  // Related subcategories for the active category
  const activeSubCategories = useMemo(() => {
    if (!activeCategory) return [];
    const catId = activeCategory._id || activeCategory.id || "";
    return subCategoryMap.get(String(catId)) || [];
  }, [activeCategory, subCategoryMap]);

  return (
    <div
      className="relative inline-block py-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
      }}
    >
      {/* Categories Trigger Button */}
      <button
        type="button"
        aria-label="Categories Menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 font-bold text-sm text-[#333e48] dark:text-gray-200 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
      >
        <span>Categories</span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Mega Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-0 z-50 animate-in fade-in-50 slide-in-from-top-1 duration-150">
          <div className="flex bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden rounded-b-md">
            {/* Accent Bar at top */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary z-20" />

            {isLoading ? (
              <div className="flex items-center justify-center p-12 w-[320px] text-gray-500 dark:text-gray-400 gap-2">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="text-sm">Loading categories...</span>
              </div>
            ) : categories.length === 0 ? (
              <div className="flex items-center justify-center p-8 w-[300px] text-gray-500 dark:text-gray-400 gap-2">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs">No categories found</span>
              </div>
            ) : (
              <>
                {/* Left Column: Category List */}
                <div className="w-[260px] pt-3 pb-1 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 flex flex-col shrink-0">
                  {categories.map((category) => {
                    const catKey =
                      category._id || category.id || category.slug;
                    const isSelected =
                      (activeCategory?._id &&
                        activeCategory._id === category._id) ||
                      (activeCategory?.slug &&
                        activeCategory.slug === category.slug);

                    const relatedSubs =
                      subCategoryMap.get(
                        String(category._id || category.id || "")
                      ) || [];

                    return (
                      <CategoryItem
                        key={catKey}
                        category={category}
                        isActive={Boolean(isSelected)}
                        hasSubCategories={relatedSubs.length > 0}
                        onHover={() => setActiveCategoryId(catKey)}
                        onClick={() => setIsOpen(false)}
                      />
                    );
                  })}
                </div>

                {/* Right Column: Dynamic SubCategory Menu with Category Background */}
                {activeCategory && (
                  <div className="animate-in fade-in-50 duration-150">
                    <SubCategoryMenu
                      category={activeCategory}
                      subCategories={activeSubCategories}
                      onItemClick={() => setIsOpen(false)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
