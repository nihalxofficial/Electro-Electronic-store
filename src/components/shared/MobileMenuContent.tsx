"use client";

import React from "react";
import Link from "next/link";
import {
  Home,
  ShoppingBag,
  Info,
  Briefcase,
  Mail,
  User,
  Repeat,
} from "lucide-react";
import { Category, SubCategory } from "@/types";
import MobileCategories from "./MobileCategories";
import { ThemeSwitch } from "./Switcher";
import CartButton from "./CartButton";
import WishlistButton from "./WishlistButton";

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
  return (
    <div className="p-4 space-y-5 overflow-y-auto max-h-full">
      {/* Categories and Subcategories Tree */}
      <MobileCategories
        categories={categories}
        subCategories={subCategories}
        onClose={onClose}
      />

      {/* Pages & Navigation (Home, Shop, About, Services, Contact) */}
      <div className="space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2 px-1">
          Pages & Navigation
        </span>
        {NAV_PAGES.map((page) => {
          const Icon = page.icon;
          return (
            <Link
              key={page.href}
              href={page.href}
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-gray-700 dark:text-gray-200 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <Icon className="w-4 h-4 text-primary shrink-0" />
              <span>{page.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Account & Theme Switcher */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
        <Link
          href="/auth/login"
          onClick={onClose}
          className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
        >
          <User className="w-4 h-4 text-primary" />
          <span>My Account</span>
        </Link>
        <ThemeSwitch variant="inline" />
      </div>

      {/* Action Icons Row (Compare, Wishlist, Cart) */}
      <div className="flex items-center justify-around pt-3 border-t border-gray-100 dark:border-gray-800">
        <Link
          href="/compare"
          onClick={onClose}
          aria-label="Compare"
          className="flex items-center text-gray-700 dark:text-gray-200 hover:text-primary transition-colors"
        >
          <Repeat className="w-5 h-5 stroke-[1.8]" />
        </Link>
        <WishlistButton onClick={onClose} />
        <CartButton showTotal={false} onClick={onClose} />
      </div>
    </div>
  );
}
