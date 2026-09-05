"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/types";
import { getProducts } from "@/lib/api/products";
import ProductCard from "../shared/ProductCard";

const TABS = ["0-20", "20-40", "40-60", "60-80"] as const;

interface WarehouseDealsProps {
  warehouseDealsProducts?: Product[];
}

function WarehouseDealsContent({ warehouseDealsProducts = [] }: WarehouseDealsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDiscount = searchParams.get("discount") || "0-20";

  const [products, setProducts] = useState<Product[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Fetch products from server for active discount tab
  useEffect(() => {
    let active = true;

    getProducts({ discount: currentDiscount, limit: 18 })
      .then((res) => {
        if (!active) return;
        const list = res?.data?.products || (Array.isArray(res?.data) ? res.data : []);
        if (list.length > 0) {
          setProducts(list);
        } else {
          // Fallback to local products filter
          const [min, max] = currentDiscount.split("-").map(Number);
          setProducts(
            warehouseDealsProducts.filter((p) => {
              const d =
                p.discountPercentage ??
                (p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0);
              return d >= min && d <= max;
            })
          );
        }
      })
      .catch(() => {
        if (!active) return;
        const [min, max] = currentDiscount.split("-").map(Number);
        setProducts(
          warehouseDealsProducts.filter((p) => {
            const d =
              p.discountPercentage ??
              (p.originalPrice ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100) : 0);
            return d >= min && d <= max;
          })
        );
      });

    setPageIndex(0);
    return () => {
      active = false;
    };
  }, [currentDiscount, warehouseDealsProducts]);

  const handleTabChange = (tab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("discount", tab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const visibleProducts = products.slice(
    pageIndex * ITEMS_PER_PAGE,
    (pageIndex + 1) * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full max-w-7xl mx-auto px-4 my-10">
      {/* Header with Title and Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-6 gap-4">
        <div className="relative inline-block">
          <h2 className="text-xl md:text-2xl font-light text-gray-800 dark:text-gray-100">
            Save Big on Warehouse Cleaning
          </h2>
          <div className="absolute -bottom-[13px] left-0 w-full h-[2px] bg-primary" />
        </div>

        <div className="flex flex-wrap items-center justify-between md:justify-end gap-4 text-sm">
          {/* Discount range tabs */}
          <div className="flex items-center gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`text-xs font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                  currentDiscount === tab
                    ? "bg-primary text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {tab}%
              </button>
            ))}
          </div>

          <Link
            href={`/shop?discount=${currentDiscount}`}
            className="text-xs text-gray-500 hover:text-primary flex items-center gap-1 font-medium transition-colors"
          >
            Go to Daily Deals Section
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Products Carousel */}
      <div className="relative group/carousel">
        {totalPages > 1 && (
          <button
            type="button"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div className="border border-gray-200/80 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 shadow-xs">
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 divide-x-0 sm:divide-x divide-gray-200/80 dark:divide-gray-800">
              {visibleProducts.map((product, idx) => (
                <ProductCard
                  key={product.id || product.slug}
                  product={product}
                  hasRightBorder={idx !== visibleProducts.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="p-10 text-center text-sm text-gray-500">
              No products found for {currentDiscount}% discount.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <button
            type="button"
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            disabled={pageIndex >= totalPages - 1}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-400 hover:text-gray-800 dark:hover:text-white transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setPageIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                pageIndex === idx ? "w-6 bg-primary" : "w-2 bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default function WarehouseDeals(props: WarehouseDealsProps) {
  return (
    <Suspense fallback={null}>
      <WarehouseDealsContent {...props} />
    </Suspense>
  );
}