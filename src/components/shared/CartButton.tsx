"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCart } from "@/lib/api";

interface CartButtonProps {
  showTotal?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function CartButton({
  showTotal = false,
  className = "",
  onClick,
}: CartButtonProps) {
  const [count, setCount] = useState<number>(0);
  const [total, setTotal] = useState<string>("$0.00");

  useEffect(() => {
    let isMounted = true;

    async function loadCartData() {
      try {
        const res = await getCart();
        if (!isMounted) return;

        if (res?.success && res.data) {
          const items = res.data.items || [];
          const totalQty = items.reduce(
            (sum: number, item: { quantity?: number }) => sum + (item.quantity || 1),
            0
          );
          setCount(totalQty);
          if (res.data.totalPrice !== undefined) {
            setTotal(`$${Number(res.data.totalPrice).toFixed(2)}`);
          }
        }
      } catch {
        // Fallback or unauthenticated state
      }
    }

    loadCartData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Link
      href="/cart"
      onClick={onClick}
      aria-label="Shopping Cart"
      className={`relative flex items-center gap-1.5 text-gray-700 dark:text-gray-200 hover:text-primary transition-colors ${className}`}
    >
      <div className="relative p-0.5">
        <ShoppingBag className="w-5 h-5 stroke-[1.8]" />
        <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
          {count}
        </span>
      </div>
      {showTotal && (
        <span className="text-xs sm:text-sm font-bold text-[#333e48] dark:text-gray-100 group-hover:text-primary transition-colors">
          {total}
        </span>
      )}
    </Link>
  );
}
