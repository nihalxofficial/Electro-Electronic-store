"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Info,
  Briefcase,
  Mail,
  Repeat,
  Heart,
  User,
  Truck,
  MapPin,
} from "lucide-react";
import { Category, SubCategory } from "@/types";
import MobileCategories from "./MobileCategories";
import { ThemeSwitch } from "./Switcher";
import { getCart, getWishlist } from "@/lib/api";
import { getUserSession } from "@/lib/core/session";

interface MobileMenuContentProps {
  categories: Category[];
  subCategories: SubCategory[];
  onClose: () => void;
}

const NAV_PAGES = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop / All Products", href: "/product", icon: ShoppingBag },
  { label: "Track Your Order", href: "/track-order", icon: Truck },
  { label: "Store Locator", href: "/store-locator", icon: MapPin },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Services", href: "/services", icon: Briefcase },
  { label: "Contact Us", href: "/contact", icon: Mail },
];

export default function MobileMenuContent({
  categories,
  subCategories,
  onClose,
}: MobileMenuContentProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<Awaited<ReturnType<typeof getUserSession>>>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function loadUserData() {
      try {
        const sessionUser = await getUserSession();
        if (!isMounted) return;

        if (sessionUser) {
          setUser(sessionUser);

          // Fetch cart & wishlist in parallel
          const [cartRes, wishRes] = await Promise.allSettled([
            getCart(),
            getWishlist(),
          ]);

          if (!isMounted) return;

          if (cartRes.status === "fulfilled" && cartRes.value?.success && cartRes.value.data) {
            const items = cartRes.value.data.items || [];
            const totalQty = items.reduce(
              (sum: number, item: { quantity?: number }) => sum + (item.quantity || 1),
              0
            );
            setCartCount(totalQty);
          }

          if (wishRes.status === "fulfilled" && wishRes.value?.success && wishRes.value.data) {
            const items = Array.isArray(wishRes.value.data)
              ? wishRes.value.data
              : wishRes.value.data.items || [];
            setWishlistCount(items.length);
          }
        } else {
          setUser(null);
          setCartCount(0);
          setWishlistCount(0);
        }
      } catch {
        // Fallback for unauthenticated/error state
      }
    }

    loadUserData();

    return () => {
      isMounted = false;
    };
  }, []);

  const accountHref = user
    ? user.role === "admin"
      ? "/dashboard/admin"
      : "/dashboard/customer"
    : "/auth/login";

  const wishlistHref = user ? "/wishlist" : "/auth/login";
  const cartHref = user ? "/cart" : "/auth/login";

  const isHomeActive = pathname === "/";
  const isAccountActive =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register");
  const isCompareActive = pathname.startsWith("/compare");
  const isWishlistActive = pathname.startsWith("/wishlist");
  const isCartActive = pathname.startsWith("/cart");

  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-gray-950">
      {/* ── Scrollable Body Area (Navigation Pages first, then Categories Tree, Theme Switch) ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0">
        
        {/* 1. Pages & Navigation Section (BEFORE Categories) */}
        <div className="space-y-1">
          <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider block mb-2 px-1">
            Pages & Navigation
          </span>
          <nav className="grid grid-cols-1 gap-1">
            {NAV_PAGES.map((page) => {
              const Icon = page.icon;
              const isActive =
                page.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(page.href);

              return (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-primary dark:hover:text-primary"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-primary" : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                    <span>{page.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 2. Categories and Subcategories Tree (AFTER Navigation Pages) */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <MobileCategories
            categories={categories}
            subCategories={subCategories}
            onClose={onClose}
          />
        </div>

        {/* 3. Appearance / Dark Mode Switch */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between px-1">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Appearance
          </span>
          <ThemeSwitch variant="inline" />
        </div>

      </div>

      {/* ── Fixed Bottom Bar: Home, Account, Compare, Wishlist, Cart ── */}
      <div className="shrink-0 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 px-2 py-2 shadow-lg">
        <div className="grid grid-cols-5 gap-1 items-center">
          {/* Home */}
          <Link
            href="/"
            onClick={onClose}
            aria-label="Home"
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all ${
              isHomeActive
                ? "text-primary font-semibold bg-primary/10 dark:bg-primary/20"
                : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
            }`}
          >
            <Home className="w-5 h-5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-1 truncate w-full">
              Home
            </span>
          </Link>

          {/* Account */}
          <Link
            href={accountHref}
            onClick={onClose}
            aria-label="My Account"
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all ${
              isAccountActive
                ? "text-primary font-semibold bg-primary/10 dark:bg-primary/20"
                : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
            }`}
          >
            <User className="w-5 h-5 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-1 truncate w-full">
              Account
            </span>
          </Link>

          {/* Compare */}
          <Link
            href="/compare"
            onClick={onClose}
            aria-label="Compare Products"
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all ${
              isCompareActive
                ? "text-primary font-semibold bg-primary/10 dark:bg-primary/20"
                : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
            }`}
          >
            <Repeat className="w-5 h-5 stroke-[1.8] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-1 truncate w-full">
              Compare
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            href={wishlistHref}
            onClick={onClose}
            aria-label="Wishlist"
            className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all ${
              isWishlistActive
                ? "text-primary font-semibold bg-primary/10 dark:bg-primary/20"
                : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
            }`}
          >
            <div className="relative">
              <Heart className="w-5 h-5 stroke-[1.8] shrink-0" />
              {Boolean(user) && wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-1 truncate w-full">
              Wishlist
            </span>
          </Link>

          {/* Cart */}
          <Link
            href={cartHref}
            onClick={onClose}
            aria-label="Shopping Cart"
            className={`relative flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all ${
              isCartActive
                ? "text-primary font-semibold bg-primary/10 dark:bg-primary/20"
                : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
            }`}
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 stroke-[1.8] shrink-0" />
              {Boolean(user) && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-1 truncate w-full">
              Cart
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
