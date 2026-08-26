"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { getWishlist } from "@/lib/api";

interface WishlistButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function WishlistButton({
  className = "",
  onClick,
}: WishlistButtonProps) {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let isMounted = true;

    async function loadWishlistData() {
      try {
        const res = await getWishlist();
        if (!isMounted) return;

        if (res?.success && res.data) {
          const items = Array.isArray(res.data) ? res.data : res.data.items || [];
          setCount(items.length);
        }
      } catch {
        // Fallback or unauthenticated state
      }
    }

    loadWishlistData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Link
      href="/wishlist"
      onClick={onClick}
      aria-label="Wishlist"
      className={`relative flex items-center text-gray-700 dark:text-gray-200 hover:text-primary transition-colors ${className}`}
    >
      <div className="relative p-0.5">
        <Heart className="w-5 h-5 stroke-[1.8]" />
        <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
          {count}
        </span>
      </div>
    </Link>
  );
}
