"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Input,
  Chip,
  AlertDialog,
} from "@heroui/react";
import {
  Heart,
  ShoppingCart,
  ShoppingBag,
  Trash2,
  Search,
  ArrowRight,
  Star,
} from "lucide-react";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { CustomerWishlistItem } from "@/types/customerDashboard";
import { removeFromWishlist } from "@/lib/action/wishlist";
import { addToCart, isCarted as checkIsCartedAction } from "@/lib/action/cart";

// ── Star Rating ─────────────────────────────────────────────────────────────
function StarRating({ rating = 0 }: { rating?: number }) {
  const r = Number(rating) || 0;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const fill = Math.min(Math.max(r - (star - 1), 0), 1) * 100;
          return (
            <div key={star} className="relative inline-flex w-3.5 h-3.5 flex-shrink-0">
              <Star className="w-full h-full text-gray-200 dark:text-gray-700/80 fill-gray-200/60 dark:fill-gray-700/40" />
              {fill > 0 && (
                <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      <span className="text-[11px] font-bold text-amber-500 dark:text-amber-400">
        {r > 0 ? r.toFixed(1) : "—"}
      </span>
    </div>
  );
}

// ── Wishlist Item Card (with only isCarted highlight) ────────────────────────
function WishlistProductCard({
  item,
  onRemove,
}: {
  item: CustomerWishlistItem;
  onRemove: (item: CustomerWishlistItem) => void;
}) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userRole = ((user as { role?: string })?.role || "").toLowerCase();
  const isOwner = Boolean(
    user?.id && (item as any)?.ownerId && String(user.id) === String((item as any).ownerId)
  );

  const [isInCart, setIsInCart] = useState<boolean>(false);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  useEffect(() => {
    if (!item.productId) return;

    const loadCart = () => {
      checkIsCartedAction(item.productId)
        .then((res) => {
          if (res?.isInCart !== undefined || res?.isCarted !== undefined) {
            setIsInCart(Boolean(res.isInCart || res.isCarted));
          }
        })
        .catch(() => {});
    };

    loadCart();
    window.addEventListener("cart-updated", loadCart);
    return () => {
      window.removeEventListener("cart-updated", loadCart);
    };
  }, [item.productId]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.info("Please log in to add items to your cart", {
        icon: <span>🔒</span>,
      });
      router.push("/auth/login");
      return;
    }

    if (userRole === "admin") {
      toast.warning("Admin cannot add products to cart!", {
        icon: <span>🛡️</span>,
      });
      return;
    }
    if (isOwner) {
      toast.warning("You cannot add your own product to cart!", {
        icon: <span>⚠️</span>,
      });
      return;
    }

    if (!item.inStock) {
      toast.error("Sorry, this item is currently out of stock!");
      return;
    }
    if (isInCart) {
      toast.info(`"${item.title}" is already in your cart!`, { icon: <span>🛒</span> });
      return;
    }

    setIsAddingToCart(true);
    try {
      const res = await addToCart(item.productId, 1);
      if (res?.success !== false) {
        setIsInCart(true);
        toast.success(`"${item.title}" added to cart!`, { icon: <span>🛒</span> });
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } else {
        toast.error(res?.message || "Failed to add to cart");
      }
    } catch {
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="group relative flex flex-col justify-between bg-gradient-to-br from-sky-50/80 via-blue-50/30 to-slate-50 dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-950 border border-sky-100/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-sky-900/10 dark:hover:shadow-black/60 transition-all duration-300 p-2 sm:p-3">
      {/* Discount Badge */}
      {item.discountPercentage && item.discountPercentage > 0 ? (
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 px-1.5 sm:px-2 py-0.5 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
          -{item.discountPercentage}%
        </div>
      ) : null}

      {/* Out of Stock Badge */}
      {!item.inStock && (
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10 px-1.5 sm:px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-[9px] sm:text-[10px] font-bold">
          Out of Stock
        </div>
      )}

      {/* Product Image */}
      <div className="relative w-full h-32 sm:h-48 overflow-hidden rounded-xl bg-white/60 dark:bg-gray-800/40 border border-sky-100/50 dark:border-gray-800/50 mb-2 sm:mb-3">
        <Link href={`/shop/${item.slug}`} className="block w-full h-full">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </Link>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
        <p className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider text-sky-600/80 dark:text-sky-400/80 truncate">
          {item.category}
        </p>

        {/* Star Rating */}
        <StarRating rating={item.rating} />

        <Link
          href={`/shop/${item.slug}`}
          className="text-xs sm:text-[13px] font-semibold text-gray-800 dark:text-gray-100 leading-snug line-clamp-2 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
        >
          {item.title}
        </Link>

        {item.addedAt && (
          <p className="hidden sm:block text-[10px] text-gray-400 dark:text-gray-500">
            Added {item.addedAt}
          </p>
        )}
      </div>

      {/* Footer: Price + Actions */}
      <div className="flex items-end justify-between pt-1.5 sm:pt-2 border-t border-sky-100/50 dark:border-gray-800/60">
        <div className="flex flex-col">
          {item.originalPrice ? (
            <>
              <span className="text-[10px] sm:text-[11px] text-gray-400 line-through leading-none pb-0.5">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-sm sm:text-base font-extrabold text-red-500 dark:text-red-400 leading-tight">
                ${item.price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm sm:text-base font-extrabold text-gray-900 dark:text-white leading-tight">
              ${item.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Remove Wishlist Button */}
          <button
            onClick={() => onRemove(item)}
            aria-label="Remove from wishlist"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>

          {/* Cart Button (glows blue when isCarted) */}
          <button
            onClick={handleAddToCart}
            disabled={!item.inStock || isAddingToCart}
            aria-label={isInCart ? "Already in cart" : "Add to cart"}
            title={isInCart ? "Already in cart" : "Add to cart"}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shadow-xs transition-all duration-300 ${
              !item.inStock
                ? "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                : isInCart
                ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 cursor-default"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-sky-100 dark:border-gray-700 hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-sky-500/30 hover:scale-105 active:scale-95 cursor-pointer"
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Customer Wishlist Client ───────────────────────────────────────────
interface CustomerWishlistClientProps {
  initialItems?: CustomerWishlistItem[];
}

export default function CustomerWishlistClient({
  initialItems = [],
}: CustomerWishlistClientProps) {
  const [items, setItems] = useState<CustomerWishlistItem[]>(initialItems);
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

  const handleRemove = async (item: CustomerWishlistItem) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id && i.productId !== item.productId));
    toast.info(`Removed "${item.title}" from wishlist.`);
    try {
      await removeFromWishlist(item.productId);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("wishlist-updated"));
      }
    } catch {
      // Non-blocking
    }
  };

  const handleClearAll = async () => {
    const currentItems = [...items];
    setItems([]);
    toast.info("Wishlist cleared.");
    
    // Clear in backend and notify
    for (const item of currentItems) {
      try {
        await removeFromWishlist(item.productId);
      } catch {
        // ignore
      }
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("wishlist-updated"));
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

        {items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Show Cart Button (Link to /cart) */}
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer h-9"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Show Cart</span>
            </Link>

            {/* Clear Wishlist with HeroUI v3 AlertDialog */}
            <AlertDialog.Root>
              <AlertDialog.Trigger>
                <Button
                  variant="outline"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors cursor-pointer h-9"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Wishlist</span>
                </Button>
              </AlertDialog.Trigger>
              <AlertDialog.Backdrop isDismissable className="bg-black/60">
                <AlertDialog.Container size="sm">
                  <AlertDialog.Dialog className="rounded-2xl border border-slate-200/90 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl p-6 space-y-4">
                    {({ close }) => (
                      <>
                        <div className="flex items-start gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 border border-rose-200/80 dark:border-rose-900/50">
                            <Trash2 className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <AlertDialog.Heading className="text-base font-bold text-gray-900 dark:text-white">
                              Clear Wishlist?
                            </AlertDialog.Heading>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                              Are you sure you want to remove all saved items from your wishlist? This action cannot be undone.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100 dark:border-gray-800">
                          <Button
                            variant="outline"
                            size="sm"
                            onPress={close}
                            className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onPress={async () => {
                              await handleClearAll();
                              close();
                            }}
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-xs"
                          >
                            Yes, Clear Wishlist
                          </Button>
                        </div>
                      </>
                    )}
                  </AlertDialog.Dialog>
                </AlertDialog.Container>
              </AlertDialog.Backdrop>
            </AlertDialog.Root>
          </div>
        )}
      </div>

      {/* ── Search & Filter ── */}
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          {filteredItems.map((item) => (
            <WishlistProductCard
              key={item.id || item.productId}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
