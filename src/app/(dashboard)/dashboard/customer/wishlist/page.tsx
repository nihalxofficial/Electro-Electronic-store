import React from "react";
import CustomerWishlistClient from "./CustomerWishlistClient";
import { CustomerWishlistItem } from "@/types/customerDashboard";

// ── All Wishlist Data Kept In Page.tsx ──
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

async function getWishlistData() {
  try {
    return INITIAL_WISHLIST_DATA;
  } catch (error) {
    console.error("Failed to fetch wishlist data:", error);
    return INITIAL_WISHLIST_DATA;
  }
}

export default async function CustomerWishlistPage() {
  const items = await getWishlistData();
  return <CustomerWishlistClient initialItems={items} />;
}
