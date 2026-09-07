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
  MessageSquare,
  ThumbsUp,
  UserCheck,
  Send,
  User as UserIcon,
  ShieldAlert,
} from "lucide-react";
import { Button, Card, Tabs, Tab, TabList, TabPanel } from "@heroui/react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { Product, ProductReview } from "@/types";

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string | null;
  role?: string | null;
}

export default function ProductDetailsPage({
  product,
  initialReviews = [],
  currentUser = null,
}: {
  product: Product;
  initialReviews?: ProductReview[];
  currentUser?: SessionUser | null;
}) {
  const { data: clientSession } = authClient.useSession();
  const user = currentUser || clientSession?.user;

  // Check if current user is the owner of this product
  const isOwner = Boolean(
    user?.id && product?.ownerId && String(user.id) === String(product.ownerId)
  );

  // Local reviews state initialized with demo reviews
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);

  // Review Form state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [guestName, setGuestName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Calculate review stats
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : "5.0";
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

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (isOwner) {
      toast.error("Product owners cannot submit reviews for their own listings.", {
        icon: <span>🚫</span>,
      });
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      toast.warning("Please select a star rating between 1 and 5 stars.", {
        icon: <span>⭐</span>,
      });
      return;
    }

    if (!description.trim()) {
      toast.warning("Please write a short description or review comment.", {
        icon: <span>✍️</span>,
      });
      return;
    }

    const reviewerName = user?.name || guestName.trim() || "Anonymous Customer";
    const reviewerAvatar = user?.image || (user as { avatar?: string })?.avatar;

    setIsSubmitting(true);

    const newReview: ProductReview = {
      id: `rev-${Date.now()}`,
      userId: user?.id,
      userName: reviewerName,
      userAvatar: reviewerAvatar,
      rating: rating,
      comment: description.trim(),
      date: "Just now",
    };

    // Add new review to local state
    setReviews((prev) => [newReview, ...prev]);

    // Reset form fields
    setDescription("");
    setRating(5);
    setHoverRating(0);
    setGuestName("");
    setIsSubmitting(false);

    toast.success("Thank you! Your review has been submitted successfully.", {
      icon: <span>⭐</span>,
    });
  };

  const handleToggleHelpful = (reviewId: string) => {
    setLikedReviews((prev) => {
      const isLiked = !prev[reviewId];
      setHelpfulCounts((counts) => ({
        ...counts,
        [reviewId]: (counts[reviewId] || 0) + (isLiked ? 1 : -1),
      }));
      return { ...prev, [reviewId]: isLiked };
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
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-white via-sky-50/40 to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-sky-950/40 border border-sky-100 dark:border-sky-900/40 shadow-xl shadow-sky-950/5 dark:shadow-sky-950/40 backdrop-blur-md group">
            
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
              className="object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
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
                    className="object-cover rounded-lg"
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
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(Number(averageRating))
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-300 dark:text-slate-700"
                      }`}
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                    {averageRating}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                  </span>
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
                Customer Reviews ({totalReviews})
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
              <div className="py-4 space-y-8">
                {/* Top Grid: Rating Breakdown & Write Review Form */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Rating Breakdown & Stats Card (5 cols) */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-sky-100 dark:border-sky-900/40 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="text-center p-3 rounded-2xl bg-white dark:bg-slate-900 border border-sky-100 dark:border-sky-900/60 shadow-xs min-w-[90px]">
                        <span className="text-3xl font-black text-slate-900 dark:text-white">
                          {averageRating}
                        </span>
                        <div className="flex justify-center text-amber-400 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.round(Number(averageRating))
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300 dark:text-slate-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">
                          out of 5
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Customer Satisfaction
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          Based on {totalReviews} {totalReviews === 1 ? "review" : "verified reviews"}
                        </p>
                      </div>
                    </div>

                    {/* Star Distribution Progress Bars */}
                    <div className="space-y-2 pt-2 border-t border-sky-100 dark:border-sky-900/40">
                      {[5, 4, 3, 2, 1].map((starNum) => {
                        const count = reviews.filter((r) => r.rating === starNum).length;
                        const percent = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
                        return (
                          <div key={starNum} className="flex items-center gap-2 text-xs">
                            <span className="w-12 font-medium text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              {starNum} <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline" />
                            </span>
                            <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700/60 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span className="w-8 text-right font-mono text-[11px] text-slate-400">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Write a Review Form Card (7 cols) */}
                  <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-br from-white via-sky-50/30 to-blue-50/20 dark:from-slate-900 dark:via-slate-900/80 dark:to-sky-950/30 border border-sky-100 dark:border-sky-900/50 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-sky-100 dark:border-sky-900/40 pb-3">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          Write a Review
                        </h4>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        Share your feedback
                      </span>
                    </div>

                    {isOwner ? (
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-xs">
                          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>Owner Review Policy</span>
                        </div>
                        <p className="text-xs text-amber-750 dark:text-amber-300/90 leading-relaxed">
                          You are currently logged in as the owner of this product. Product owners cannot leave reviews on their own listings to maintain fair and transparent customer feedback.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmitReview} className="space-y-4">
                        {/* User identity preview / Guest Input */}
                        {user ? (
                          <div className="flex items-center justify-between p-2.5 rounded-xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/40">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden shadow-xs">
                                {user.image || (user as { avatar?: string })?.avatar ? (
                                  <Image
                                    src={(user.image || (user as { avatar?: string })?.avatar)!}
                                    alt={user.name || "User"}
                                    fill
                                    className="object-cover rounded-full"
                                    unoptimized
                                  />
                                ) : (
                                  <span>{user.name ? user.name.charAt(0).toUpperCase() : "U"}</span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                                  {user.name}
                                </p>
                                <p className="text-[10px] text-slate-400 truncate">
                                  {user.email}
                                </p>
                              </div>
                            </div>
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                              <UserCheck className="w-3 h-3" /> Logged In
                            </span>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <UserIcon className="w-3.5 h-3.5 text-slate-400" /> Your Name
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your name (e.g. John Doe)"
                              value={guestName}
                              onChange={(e) => setGuestName(e.target.value)}
                              className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
                            />
                          </div>
                        )}

                        {/* Interactive 5-Star Rating Picker */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>Overall Rating</span>
                            <span className="text-[11px] font-bold text-amber-500">
                              {(hoverRating || rating) === 5 && "5 - Excellent"}
                              {(hoverRating || rating) === 4 && "4 - Very Good"}
                              {(hoverRating || rating) === 3 && "3 - Average"}
                              {(hoverRating || rating) === 2 && "2 - Poor"}
                              {(hoverRating || rating) === 1 && "1 - Terrible"}
                            </span>
                          </label>
                          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-sky-100 dark:border-sky-900/50 w-fit shadow-xs">
                            {[1, 2, 3, 4, 5].map((star) => {
                              const isFilled = star <= (hoverRating || rating);
                              return (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => setRating(star)}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  aria-label={`Rate ${star} stars`}
                                  className="p-1 hover:scale-125 transition-transform cursor-pointer group"
                                >
                                  <Star
                                    className={`w-5 h-5 transition-colors ${
                                      isFilled
                                        ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                                        : "text-slate-300 dark:text-slate-700"
                                    }`}
                                  />
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Review Description Textarea */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Review Description
                          </label>
                          <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="What did you like or dislike? How is the quality, sound, battery, and fit?"
                            required
                            className="w-full px-3 py-2.5 text-xs rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-900/60 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all resize-none"
                          />
                        </div>

                        {/* Submit Button */}
                        <Button
                          type="submit"
                          isDisabled={isSubmitting}
                          className="w-full sm:w-auto px-6 h-10 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-sky-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          Submit Review
                        </Button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Customer Reviews List */}
                <div className="space-y-4 pt-4 border-t border-sky-100 dark:border-sky-900/40">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      All Customer Feedback ({totalReviews})
                    </h4>
                    <span className="text-xs text-slate-400">
                      Showing verified customer comments
                    </span>
                  </div>

                  {reviews.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No reviews yet. Be the first to review this product!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {reviews.map((rev) => {
                        const isLiked = !!likedReviews[rev.id];
                        const helpfulCount = helpfulCounts[rev.id] || 0;
                        const initial = rev.userName ? rev.userName.charAt(0).toUpperCase() : "U";

                        return (
                          <div
                            key={rev.id}
                            className="p-4 rounded-2xl bg-white/80 dark:bg-slate-900/70 border border-sky-100 dark:border-sky-900/40 hover:border-sky-300 dark:hover:border-sky-700 transition-all shadow-xs flex flex-col justify-between space-y-3"
                          >
                            <div className="space-y-2.5">
                              {/* Reviewer Header */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden shadow-xs">
                                    {rev.userAvatar ? (
                                      <Image
                                        src={rev.userAvatar}
                                        alt={rev.userName}
                                        fill
                                        className="object-cover rounded-full"
                                        unoptimized
                                      />
                                    ) : (
                                      <span>{initial}</span>
                                    )}
                                  </div>
                                  <div>
                                    <span className="font-bold text-xs text-slate-900 dark:text-white block leading-tight">
                                      {rev.userName}
                                    </span>
                                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                                      <CheckCircle2 className="w-2.5 h-2.5" /> Verified Buyer
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium">
                                  {rev.date}
                                </span>
                              </div>

                              {/* Star Rating Display */}
                              <div className="flex items-center gap-1 text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < rev.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-slate-300 dark:text-slate-700"
                                    }`}
                                  />
                                ))}
                              </div>

                              {/* Review Description */}
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {rev.comment}
                              </p>
                            </div>

                            {/* Review Footer / Helpful reaction */}
                            <div className="pt-2 border-t border-sky-100/60 dark:border-sky-900/30 flex items-center justify-between text-[11px]">
                              <span className="text-slate-400 text-[10px]">
                                Was this review helpful?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleToggleHelpful(rev.id)}
                                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isLiked
                                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 font-bold"
                                    : "text-slate-500 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                              >
                                <ThumbsUp className={`w-3 h-3 ${isLiked ? "fill-sky-500 text-sky-500" : ""}`} />
                                <span>Helpful {helpfulCount > 0 ? `(${helpfulCount})` : ""}</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </Card>
    </div>
  );
}