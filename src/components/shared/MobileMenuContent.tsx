"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Info,
  Briefcase,
  Mail,
  Repeat,
  Heart,
  User,
  LogOut,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { Category, SubCategory } from "@/types";
import MobileCategories from "./MobileCategories";
import { ThemeSwitch } from "./Switcher";
import { getCart, getWishlist } from "@/lib/api";
import { getUserSession } from "@/lib/core/session";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

interface MobileMenuContentProps {
  categories: Category[];
  subCategories: SubCategory[];
  onClose: () => void;
}

const NAV_PAGES = [
  { label: "Home", href: "/", icon: Home },
  { label: "Shop / All Products", href: "/product", icon: ShoppingBag },
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
  const router = useRouter();

  const [user, setUser] = useState<Awaited<ReturnType<typeof getUserSession>>>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

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

  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      await authClient.signOut();
      setUser(null);
      setCartCount(0);
      setWishlistCount(0);
      toast.success("Logged out successfully");
      onClose();
      router.push("/");
    } catch (err) {
      console.error("Logout failed:", err);
      toast.error("Failed to log out");
    } finally {
      setIsLoggingOut(false);
    }
  }

  const accountHref = user
    ? `/dashboard/${user.role?.toLowerCase() || "customer"}`
    : "/auth/login";

  const wishlistHref = user ? "/wishlist" : "/auth/login";
  const cartHref = user ? "/cart" : "/auth/login";

  const isHomeActive = pathname === "/";
  const isShopActive = pathname.startsWith("/product") || pathname.startsWith("/shop");
  const isCompareActive = pathname.startsWith("/compare");
  const isWishlistActive = pathname.startsWith("/wishlist");
  const isCartActive = pathname.startsWith("/cart");

  return (
    <div className="flex flex-col h-full min-h-0 bg-white dark:bg-gray-950">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 min-h-0">
        
        {/* 1. Dedicated Account Profile & Logout Card */}
        {user ? (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-sky-50/90 via-blue-50/50 to-indigo-50/30 dark:from-sky-950/40 dark:via-blue-950/20 dark:to-gray-900/40 border border-sky-100/80 dark:border-sky-900/40 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-10 h-10 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-xs shrink-0 overflow-hidden">
                  {user.image || (user as { avatar?: string })?.avatar ? (
                    <Image
                      src={user.image || ((user as { avatar?: string })?.avatar as string)}
                      alt={user.name || "User avatar"}
                      fill
                      sizes="40px"
                      className="object-cover rounded-full"
                      unoptimized
                    />
                  ) : user.name ? (
                    <span>{user.name.charAt(0).toUpperCase()}</span>
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                    {user.name || "My Account"}
                  </p>
                  <p className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 capitalize">
                    {user.role || "Customer"} Account
                  </p>
                </div>
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
                title="Log Out"
              >
                {isLoggingOut ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <LogOut className="w-3.5 h-3.5" />
                )}
                <span>Logout</span>
              </button>
            </div>

            {/* Direct Dashboard Link */}
            <Link
              href={accountHref}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-xs transition-all"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Go to Dashboard</span>
            </Link>
          </div>
        ) : (
          <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900/70 border border-gray-200/80 dark:border-gray-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate">
                  Welcome to Electro
                </p>
                <p className="text-[10px] text-gray-400 truncate">
                  Sign in to access your orders
                </p>
              </div>
            </div>
            <Link
              href="/auth/login"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-primary hover:bg-primary/90 transition-colors shrink-0 shadow-xs"
            >
              Sign In
            </Link>
          </div>
        )}

        {/* 2. Pages & Navigation Section */}
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

        {/* 3. Categories and Subcategories Tree */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80">
          <MobileCategories
            categories={categories}
            subCategories={subCategories}
            onClose={onClose}
          />
        </div>

        {/* 4. Appearance / Dark Mode Switch */}
        <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between px-1">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            Appearance
          </span>
          <ThemeSwitch variant="inline" />
        </div>

      </div>

      {/* ── Fixed Bottom Bar: Home, Shop, Compare, Wishlist, Cart ── */}
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

          {/* Shop */}
          <Link
            href="/product"
            onClick={onClose}
            aria-label="Shop Products"
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-lg text-center transition-all ${
              isShopActive
                ? "text-primary font-semibold bg-primary/10 dark:bg-primary/20"
                : "text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-200/50 dark:hover:bg-gray-800/60"
            }`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.8] shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-tight mt-1 truncate w-full">
              Shop
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
