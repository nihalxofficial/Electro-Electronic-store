"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  Button,
  Input,
  Chip,
} from "@heroui/react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Search,
  ArrowRight,
  Share2,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { CustomerWishlistItem } from "@/types/customerDashboard";

const INITIAL_WISHLIST_DATA: CustomerWishlistItem[] = [
  {
    id: "wish-1",
    productId: "prod-101",
    title: 'MacBook Pro 16" M3 Max 32GB RAM 1TB SSD Space Black',
    slug: "macbook-pro-16-m3-max",
    price: 2499.00,
    originalPrice: 2799.00,
    discountPercentage: 11,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80",
    inStock: true,
    rating: 4.9,
    category: "Laptops",
    addedAt: "Aug 15, 2026",
  },
  {
    id: "wish-2",
    productId: "prod-102",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    slug: "sony-wh-1000xm5",
    price: 348.00,
    originalPrice: 399.99,
    discountPercentage: 13,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80",
    inStock: true,
    rating: 4.8,
    category: "Audio",
    addedAt: "Aug 12, 2026",
  },
  {
    id: "wish-3",
    productId: "prod-103",
    title: "Apple Watch Ultra 2 Titanium Case with Ocean Band",
    slug: "apple-watch-ultra-2",
    price: 799.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80",
    inStock: true,
    rating: 4.9,
    category: "Smartwatches",
    addedAt: "Aug 08, 2026",
  },
  {
    id: "wish-4",
    productId: "prod-104",
    title: "Logitech MX Master 3S Wireless Performance Mouse",
    slug: "logitech-mx-master-3s",
    price: 99.99,
    originalPrice: 119.99,
    discountPercentage: 17,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&auto=format&fit=crop&q=80",
    inStock: false,
    rating: 4.7,
    category: "Accessories",
    addedAt: "Aug 01, 2026",
  },
  {
    id: "wish-5",
    productId: "prod-105",
    title: 'Samsung Odyssey OLED G9 49" Curved Dual QHD 240Hz',
    slug: "samsung-odyssey-oled-g9",
    price: 1199.99,
    originalPrice: 1599.99,
    discountPercentage: 25,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&auto=format&fit=crop&q=80",
    inStock: true,
    rating: 4.9,
    category: "Monitors",
    addedAt: "Jul 28, 2026",
  },
  {
    id: "wish-6",
    productId: "prod-106",
    title: "Bose QuietComfort Ultra Earbuds with Spatial Audio",
    slug: "bose-quietcomfort-ultra-earbuds",
    price: 249.00,
    originalPrice: 299.00,
    discountPercentage: 17,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&auto=format&fit=crop&q=80",
    inStock: true,
    rating: 4.8,
    category: "Audio",
    addedAt: "Jul 20, 2026",
  },
];

export default function CustomerWishlistClient() {
  const [items, setItems] = useState<CustomerWishlistItem[]>(INITIAL_WISHLIST_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: CustomerWishlistItem) => {
    if (!item.inStock) {
      toast.error("Sorry, this item is currently out of stock!");
      return;
    }
    toast.success(`"${item.title}" added to your cart!`);
  };

  const handleMoveAllToCart = () => {
    const inStockItems = items.filter((i) => i.inStock);
    if (inStockItems.length === 0) {
      toast.info("No in-stock items to add to cart.");
      return;
    }
    toast.success(`Added ${inStockItems.length} in-stock items to your cart!`);
  };

  const handleRemove = (id: string, title: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.info(`Removed "${title}" from wishlist.`);
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear your entire wishlist?")) {
      setItems([]);
      toast.info("Wishlist cleared.");
    }
  };

  const handleShareWishlist = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Wishlist share link copied to clipboard!");
    } else {
      toast.success("Wishlist link ready to share!");
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <Link href="/dashboard/customer" className="hover:text-sky-600 transition-colors">
              Customer Dashboard
            </Link>
            <span>/</span>
            <span className="text-sky-600 dark:text-sky-400">Wishlist</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            My Saved{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Wishlist
            </span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            You have {items.length} saved product{items.length !== 1 ? "s" : ""} in your wishlist.
          </p>
        </div>

        {/* Global actions */}
        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={handleShareWishlist}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 text-xs font-semibold transition-colors cursor-pointer h-9"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Wishlist</span>
            </Button>
            <Button
              onClick={handleMoveAllToCart}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer h-9"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add In-Stock to Cart</span>
            </Button>
            <Button
              isIconOnly
              variant="ghost"
              onClick={handleClearAll}
              className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer h-9 w-9 min-w-0"
              title="Clear all"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* ── Search & Filter Controls ── */}
      {items.length > 0 && (
        <Card className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-slate-200/80 dark:border-gray-800 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved products by name or category..."
              className="w-full pl-9 pr-4 h-10 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 focus:border-sky-500 rounded-xl text-xs"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>
      )}

      {/* ── Wishlist Grid ── */}
      {filteredItems.length === 0 ? (
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto border border-sky-100 dark:border-sky-900/40 shadow-xs">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {searchQuery ? "No matching products found" : "Your Wishlist is Empty"}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {searchQuery
                ? "Try searching for a different product keyword or reset filters."
                : "Explore our trending tech catalog and heart your favorite electronics to save them for later."}
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all h-11"
          >
            <span>Explore Trending Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group p-0"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-slate-50 dark:bg-gray-800/50 p-6 flex items-center justify-center overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>

                {/* Discount Badge */}
                {item.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                    -{item.discountPercentage}% OFF
                  </span>
                )}

                {/* Stock Status Badge */}
                <span
                  className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    item.inStock
                      ? "bg-sky-50 dark:bg-sky-950/80 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  {item.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 mb-1">
                    <span>{item.category}</span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-500" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <Link
                    href={`/shop/${item.slug}`}
                    className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                  >
                    {item.title}
                  </Link>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-gray-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-xs text-gray-400 line-through ml-2">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      onClick={() => handleRemove(item.id, item.title)}
                      title="Remove from wishlist"
                      className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer h-8 w-8 min-w-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer h-8 ${
                        item.inStock
                          ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-xs"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{item.inStock ? "Add to Cart" : "Restocking"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
