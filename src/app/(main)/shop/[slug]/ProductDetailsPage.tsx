"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  Repeat,
  ShieldCheck,
  Truck,
  RotateCcw,
  Star,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Share2,
  Minus,
  Plus,
  Zap,
} from "lucide-react";
import { Button, Card, Tabs, Tab, TabList, TabPanel } from "@heroui/react";
import { toast } from "react-toastify";
import { Product } from "@/types";

// Matches your exact demo JSON structure

export default function ProductDetailsPage({ product }: { product: Product }) {
  // Combine main image + additional images into single array
  const allImages = [
    product.image,
    ...(product.additionalImages || []),
  ].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState<string>(allImages[0] || "");
  const [quantity, setQuantity] = useState<number>(1);

  const formattedPrice = `$${product.price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const formattedOriginalPrice = product.originalPrice
    ? `$${product.originalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`
    : null;

  const discountPercent =
    product.discountPercentage ??
    (product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null);

  const handleQuantityChange = (type: "inc" | "dec") => {
    const maxStock = product.stockQuantity ?? Infinity;
    if (type === "dec" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else if (type === "inc" && quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleShare = async () => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} on Electro!`,
      url: currentUrl,
    };

    if (
      typeof navigator !== "undefined" &&
      navigator.share &&
      typeof navigator.canShare === "function" &&
      navigator.canShare(shareData)
    ) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
      }
    }

    // Fallback: Copy link to clipboard
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(currentUrl);
        toast.success("Product link copied to clipboard!", {
          icon: <span>🔗</span>,
        });
      } else {
        toast.info("Share URL: " + currentUrl);
      }
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleAddToWishlist = () => {
    toast.success(`"${product.title}" added to wishlist!`, {
      icon: <span>❤️</span>,
    });
  };

  const handleAddToCompare = () => {
    toast.info(`"${product.title}" added to compare!`, {
      icon: <span>🔁</span>,
    });
  };

  const getBadgeStyle = (badge: string) => {
    const b = badge.toLowerCase();
    if (b.includes("hot") || b.includes("sale")) {
      return "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-sm shadow-red-500/30 border border-red-400/30";
    }
    if (b.includes("trend") || b.includes("popular")) {
      return "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm shadow-amber-500/30 border border-amber-400/30";
    }
    if (b.includes("new") || b.includes("feature")) {
      return "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-sm shadow-emerald-500/30 border border-emerald-400/30";
    }
    return "bg-slate-900/90 dark:bg-slate-800 text-white shadow-sm border border-slate-700/60 dark:border-sky-500/30";
  };

  return (
    <div className="w-full py-6 space-y-8 relative">
      {/* Subtle ambient bluish gradient in dark mode */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-blue-500/5 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 overflow-x-auto pb-2">
        <Link href="/" className="hover:text-sky-600 transition-colors cursor-pointer">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
        <Link href="/shop" className="hover:text-sky-600 transition-colors cursor-pointer">
          Shop
        </Link>
        {product.categoryId?.name && (
          <>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
            <Link
              href={`/shop?category=${product.categoryId?.slug || encodeURIComponent(product.categoryId?.name)}`}
              className="hover:text-sky-600 transition-colors cursor-pointer"
            >
              {product.categoryId?.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
        <span className="text-slate-900 dark:text-slate-100 font-semibold truncate">
          {product.title}
        </span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Product Images (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Featured Hero Display */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white via-sky-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-sky-950/40 border border-sky-100 dark:border-sky-900/40 shadow-xl shadow-sky-950/5 dark:shadow-sky-950/40 backdrop-blur-md flex items-center justify-center p-6 group">
            
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              {discountPercent && discountPercent > 0 ? (
                <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-extrabold uppercase tracking-wider shadow-sm shadow-sky-500/30 border border-sky-400/30">
                  -{discountPercent}% OFF
                </span>
              ) : null}

              {product.badges?.map((badge) => (
                <span
                  key={badge}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(
                    badge
                  )}`}
                >
                  {badge.replace(/-/g, " ")}
                </span>
              ))}
            </div>

            <Image
              src={selectedImage}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              onError={() =>
                setSelectedImage(
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80"
                )
              }
            />
          </div>

          {/* Thumbnail Carousel */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    selectedImage === img
                      ? "border-sky-500 shadow-md ring-2 ring-sky-500/30 scale-95 bg-white dark:bg-slate-900"
                      : "border-sky-100 dark:border-sky-900/40 bg-white/70 dark:bg-slate-900/60 hover:border-sky-300 dark:hover:border-sky-700 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.title} thumbnail ${idx + 1}`}
                    fill
                    className="object-contain p-1.5"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

          {/* Right: Product Meta & Purchase Options (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Meta */}
            <div className="space-y-2 border-b border-sky-100 dark:border-gray-800 pb-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-extrabold tracking-wider text-sky-600 dark:text-sky-400">
                  {product.categoryId?.name}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  SKU: {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {product.title}
              </h1>

              {/* Rating & Stock Status */}
              <div className="flex flex-wrap items-center gap-4 pt-1 text-sm">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                    4.9
                  </span>
                  <span className="text-xs text-slate-400">(24 reviews)</span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>

                <div className="flex items-center gap-1.5">
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                      <CheckCircle2 className="w-3.5 h-3.5" /> In Stock {product.stockQuantity !== undefined ? `(${product.stockQuantity} units)` : ""}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2.5 py-1 rounded-full border border-red-200 dark:border-red-800/50">
                      <XCircle className="w-3.5 h-3.5" /> Out of Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Price Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50/90 via-blue-50/40 to-slate-50 dark:from-slate-900 dark:via-sky-950/40 dark:to-slate-900 border border-sky-100 dark:border-sky-900/40 flex items-center justify-between shadow-xs">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">
                  Total Price
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 dark:text-white">
                    {formattedPrice}
                  </span>
                  {formattedOriginalPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {formattedOriginalPrice}
                    </span>
                  )}
                </div>
              </div>

              {product.badges?.includes("value-of-the-day") && (
                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-amber-700/60 shadow-xs">
                  <Zap className="w-4 h-4 fill-amber-500 text-amber-500" />
                  Value of the Day
                </div>
              )}
            </div>

            {/* Quick Description */}
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Quantity Box */}
                <div className="flex items-center justify-between border border-sky-200 dark:border-sky-900/60 rounded-xl bg-white dark:bg-slate-900 p-1 w-full sm:w-36 shadow-xs">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange("dec")}
                    disabled={quantity <= 1 || !product.inStock}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-sm text-slate-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange("inc")}
                    disabled={(product.stockQuantity !== undefined && quantity >= product.stockQuantity) || !product.inStock}
                    className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add To Cart */}
                <Button
                  isDisabled={!product.inStock}
                  className="flex-1 h-12 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </Button>

                {/* Buy Now */}
                <Button
                  isDisabled={!product.inStock}
                  variant="outline"
                  className="h-12 border-sky-500 text-sky-600 dark:text-sky-400 font-bold rounded-xl hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-all cursor-pointer disabled:cursor-not-allowed"
                >
                  Buy Now
                </Button>
              </div>

              {/* Secondary Actions (Wishlist, Compare, Share) */}
              <div className="flex items-center gap-4 pt-2 border-t border-sky-100 dark:border-sky-900/40 text-xs">
                <button
                  type="button"
                  onClick={handleAddToWishlist}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4" /> Add to Wishlist
                </button>
                <button
                  type="button"
                  onClick={handleAddToCompare}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <Repeat className="w-4 h-4" /> Add to Compare
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors ml-auto cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> Share
                </button>
              </div>
            </div>

            {/* Store Features / Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-sky-100 dark:border-sky-900/40 text-center hover:border-sky-300 dark:hover:border-sky-700 transition-colors shadow-xs">
                <Truck className="w-5 h-5 mx-auto text-sky-600 dark:text-sky-400 mb-1" />
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  Fast Delivery
                </p>
                <p className="text-[10px] text-slate-400">2-3 Business Days</p>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-sky-100 dark:border-sky-900/40 text-center hover:border-sky-300 dark:hover:border-sky-700 transition-colors shadow-xs">
                <ShieldCheck className="w-5 h-5 mx-auto text-sky-600 dark:text-sky-400 mb-1" />
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  1 Year Warranty
                </p>
                <p className="text-[10px] text-slate-400">Official Brand Coverage</p>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-sky-100 dark:border-sky-900/40 text-center hover:border-sky-300 dark:hover:border-sky-700 transition-colors shadow-xs">
                <RotateCcw className="w-5 h-5 mx-auto text-sky-600 dark:text-sky-400 mb-1" />
                <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                  Easy Return
                </p>
                <p className="text-[10px] text-slate-400">30-Day Guarantee</p>
              </div>
            </div>

          </div>
        </div>

        {/* Tabbed Specs / Description Section */}
        <Card className="border border-sky-100 dark:border-sky-900/40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-6 shadow-sm">
          <Tabs>
            <TabList className="flex gap-1 border-b border-sky-100 dark:border-sky-900/40 pb-0 mb-4">
              <Tab id="description" className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-transparent data-[selected]:border-sky-500 data-[selected]:text-sky-600 dark:data-[selected]:text-sky-400 transition-all cursor-pointer bg-transparent rounded-none outline-none">
                Description
              </Tab>
              <Tab id="specifications" className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-transparent data-[selected]:border-sky-500 data-[selected]:text-sky-600 dark:data-[selected]:text-sky-400 transition-all cursor-pointer bg-transparent rounded-none outline-none">
                Specifications
              </Tab>
              <Tab id="reviews" className="px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 border-b-2 border-transparent data-[selected]:border-sky-500 data-[selected]:text-sky-600 dark:data-[selected]:text-sky-400 transition-all cursor-pointer bg-transparent rounded-none outline-none">
                Customer Reviews (24)
              </Tab>
            </TabList>

            <TabPanel id="description">
              <div className="py-4 space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Product Overview
                </h3>
                <p>{product.description}</p>
                <p>
                  Designed with premium efficiency in mind, featuring state-of-the-art thermal hardware management and lightweight body dynamics suitable for professionals on the go.
                </p>
              </div>
            </TabPanel>

            <TabPanel id="specifications">
              <div className="py-4">
                <div className="divide-y divide-sky-100 dark:divide-sky-900/40 text-sm">
                  <div className="py-2.5 grid grid-cols-3">
                    <span className="font-semibold text-slate-500">Brand / Category</span>
                    <span className="col-span-2 text-slate-800 dark:text-slate-200 font-medium">
                      {product.categories?.join(", ")}
                    </span>
                  </div>
                  <div className="py-2.5 grid grid-cols-3">
                    <span className="font-semibold text-slate-500">Sub Category</span>
                    <span className="col-span-2 text-slate-800 dark:text-slate-200 font-medium">
                      {product.subCategoryIds?.map((s) => s.name).join(", ")}
                    </span>
                  </div>
                  <div className="py-2.5 grid grid-cols-3">
                    <span className="font-semibold text-slate-500">Stock SKU</span>
                    <span className="col-span-2 text-slate-800 dark:text-slate-200 font-mono">
                      {product.sku}
                    </span>
                  </div>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <div key={key} className="py-2.5 grid grid-cols-3">
                        <span className="font-semibold text-slate-500 capitalize">
                          {key}
                        </span>
                        <span className="col-span-2 text-slate-800 dark:text-slate-200">
                          {val}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </TabPanel>

            <TabPanel id="reviews">
              <div className="py-6 space-y-4">
                <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/30 border border-sky-100 dark:border-sky-900/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Alex Johnson
                    </span>
                    <span className="text-xs text-slate-400">2 days ago</span>
                  </div>
                  <div className="flex text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Exceptional performance and battery life. Exceeded my expectations for daily work!
                  </p>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </Card>
    </div>
  );
}