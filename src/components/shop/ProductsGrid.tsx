"use client";

import React, { useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "@heroui/react";
import { ProductsGridProps } from "@/types";
import ProductCard from "@/components/shared/ProductCard";
import ProductCardSkeleton from "@/components/shared/ProductCardSkeleton";
import { PackageOpen } from "lucide-react";

export default function ProductsGrid({ products, pagination }: ProductsGridProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { page, limit, total, totalPages } = pagination;

  const startItem = total > 0 ? (page - 1) * limit + 1 : 0;
  const endItem   = Math.min(page * limit, total);

  // Update the page param in the URL
  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    startTransition(() => router.push(`/shop?${params.toString()}`, { scroll: false }));
  };

  // Build page number list with ellipsis
  const getPageNumbers = (): (number | "ellipsis")[] => {
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);
    if (page > 3) pages.push("ellipsis");
    const start = Math.max(2, page - 1);
    const end   = Math.min(totalPages - 1, page + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("ellipsis");
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200/80 dark:border-gray-800 text-center min-h-[350px]">
        <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-500 mb-4">
          <PackageOpen className="w-8 h-8" />
        </div>
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-1">No products found</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mb-6">
          Try adjusting your filters or search query.
        </p>
        <button
          type="button"
          onClick={() => router.push("/shop")}
          className="px-4 py-2 text-xs font-semibold text-white bg-sky-500 hover:bg-sky-600 rounded-xl transition-colors cursor-pointer"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-6">
      {/* Products Grid — 2 columns on mobile, 2 on sm, 3 on md/lg, 4 on xl */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-px bg-gray-200/80 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-xs">
        {isPending
          ? Array.from({ length: limit }).map((_, idx) => (
              <div key={`skel-${idx}`} className="bg-white dark:bg-gray-900 h-full">
                <ProductCardSkeleton hasRightBorder={false} />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id || (product as any)._id} className="bg-white dark:bg-gray-900 h-full">
                <ProductCard product={product} hasRightBorder={false} />
              </div>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pb-6">
          {/*
            HeroUI v3 Pagination compound:
            Pagination (nav) → Pagination.Summary + Pagination.Content (ul) →
            Pagination.Item (li) → Pagination.Previous | Pagination.Link | Pagination.Ellipsis | Pagination.Next
          */}
          <Pagination className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-500 dark:text-gray-400">
            <Pagination.Summary className="text-xs">
              Showing <span className="text-gray-800 dark:text-gray-200 font-bold">{startItem}–{endItem}</span> of{" "}
              <span className="text-sky-600 dark:text-sky-400 font-bold">{total}</span> products
            </Pagination.Summary>

            <Pagination.Content className="flex items-center gap-1">
              {/* Previous button */}
              <Pagination.Item>
                <Pagination.Previous
                  className="flex items-center gap-1 px-3 h-8 rounded-lg text-xs hover:bg-sky-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  isDisabled={page === 1 || isPending}
                  onPress={() => goToPage(page - 1)}
                >
                  <Pagination.PreviousIcon />
                  <span>Prev</span>
                </Pagination.Previous>
              </Pagination.Item>

              {/* Page number links */}
              {getPageNumbers().map((p, i) =>
                p === "ellipsis" ? (
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis className="px-2 text-gray-400 select-none text-xs" />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={p}>
                    <Pagination.Link
                      isActive={p === page}
                      isDisabled={isPending}
                      onPress={() => goToPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        p === page
                          ? "bg-sky-500 text-white shadow-sm shadow-sky-500/30"
                          : "hover:bg-sky-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                )
              )}

              {/* Next button */}
              <Pagination.Item>
                <Pagination.Next
                  className="flex items-center gap-1 px-3 h-8 rounded-lg text-xs hover:bg-sky-50 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  isDisabled={page === totalPages || isPending}
                  onPress={() => goToPage(page + 1)}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}
