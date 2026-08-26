"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/product" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact" },
  { label: "Track Order", href: "/track-order" },
  { label: "Store Locator", href: "/store-locator" },
];

export default function BottomNavbar() {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 transition-colors duration-200">
      <div className="w-full px-4 md:px-14 flex items-center justify-between gap-4">
        
        {/* Navigation Page Links */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-[13px] font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-primary bg-primary/10 dark:bg-primary/20"
                    : "text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Promotional Text */}
        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 shrink-0">
          <Truck className="w-4 h-4 text-primary shrink-0" />
          <span>Free Shipping on Orders $50+</span>
        </div>

      </div>
    </div>
  );
}
