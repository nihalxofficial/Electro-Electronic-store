import React from "react";
import CustomerOverviewClient from "./CustomerOverviewClient";
import { getUserSession } from "@/lib/core/session";
import {
  CustomerStats,
  SpendingDataPoint,
  CategoryPurchaseData,
  CustomerOrder,
  CustomerWishlistItem,
  CustomerTransaction,
} from "@/types/customerDashboard";

const MOCK_CUSTOMER_STATS: CustomerStats = {
  totalOrders: 14,
  totalSpent: 1842.50,
  wishlistCount: 4,
  rewardPoints: 1450,
  totalSavings: 280.00,
};

const MOCK_SPENDING_DATA: SpendingDataPoint[] = [
  { month: "Jan", amount: 140, orders: 1 },
  { month: "Feb", amount: 260, orders: 2 },
  { month: "Mar", amount: 190, orders: 2 },
  { month: "Apr", amount: 320, orders: 3 },
  { month: "May", amount: 210, orders: 1 },
  { month: "Jun", amount: 480, orders: 3 },
  { month: "Jul", amount: 110, orders: 1 },
  { month: "Aug", amount: 380, orders: 2 },
];

const MOCK_CATEGORY_DATA: CategoryPurchaseData[] = [
  { name: "Laptops & Computers", value: 45, amount: 829.12, color: "#10b981" },
  { name: "Headphones & Audio", value: 25, amount: 460.62, color: "#06b6d4" },
  { name: "Smartwatches", value: 18, amount: 331.65, color: "#3b82f6" },
  { name: "Accessories", value: 12, amount: 221.10, color: "#8b5cf6" },
];

const MOCK_RECENT_ORDERS: CustomerOrder[] = [
  {
    id: "ord-1",
    orderNumber: "#ORD-9582",
    date: "Aug 18, 2026",
    status: "Shipped",
    paymentStatus: "Paid",
    paymentMethod: "Visa •••• 4242",
    total: 399.00,
    itemCount: 2,
    carrier: "FedEx Express",
    trackingNumber: "FX-99824128",
    estimatedDelivery: "Aug 21, 2026",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR",
    items: [
      {
        id: "item-1",
        name: "Noise Cancelling Wireless Headphones Pro",
        slug: "noise-cancelling-wireless-headphones-pro",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60",
        price: 299.00,
        quantity: 1,
      },
      {
        id: "item-2",
        name: "Fast Charge USB-C Braided Cable 2M",
        slug: "fast-charge-usbc-cable",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&auto=format&fit=crop&q=60",
        price: 100.00,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        date: "Aug 18, 10:30 AM",
        completed: true,
        description: "Your order was received and confirmed.",
      },
      {
        title: "Payment Processed",
        date: "Aug 18, 10:32 AM",
        completed: true,
        description: "Payment of $399.00 was authorized via Visa.",
      },
      {
        title: "Dispatched from Warehouse",
        date: "Aug 19, 02:15 PM",
        completed: true,
        description: "Package handed over to FedEx carrier hub.",
      },
      {
        title: "In Transit",
        date: "Aug 20, 08:45 AM",
        completed: false,
        current: true,
        description: "Package is on the way to local sorting facility.",
      },
      {
        title: "Out for Delivery",
        date: "Expected Aug 21",
        completed: false,
        description: "Courier will deliver to your doorstep.",
      },
    ],
  },
  {
    id: "ord-2",
    orderNumber: "#ORD-9564",
    date: "Aug 02, 2026",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Apple Pay",
    total: 129.99,
    itemCount: 1,
    carrier: "DHL Express",
    trackingNumber: "DHL-84729104",
    estimatedDelivery: "Aug 05, 2026",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR",
    items: [
      {
        id: "item-3",
        name: "Ultra Ergonomic Mechanical Gaming Keyboard",
        slug: "ultra-ergonomic-mechanical-keyboard",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&auto=format&fit=crop&q=60",
        price: 129.99,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        date: "Aug 02, 09:12 AM",
        completed: true,
        description: "Order confirmed.",
      },
      {
        title: "Delivered",
        date: "Aug 05, 03:40 PM",
        completed: true,
        description: "Delivered and signed at front porch.",
      },
    ],
  },
  {
    id: "ord-3",
    orderNumber: "#ORD-9490",
    date: "Jul 24, 2026",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Mastercard •••• 8812",
    total: 649.50,
    itemCount: 1,
    carrier: "UPS Express",
    trackingNumber: "UPS-10492817",
    estimatedDelivery: "Jul 27, 2026",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR",
    items: [
      {
        id: "item-4",
        name: '4K Ultra Gaming Monitor 27" 165Hz IPS',
        slug: "4k-ultra-gaming-monitor-27",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&auto=format&fit=crop&q=60",
        price: 649.50,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        date: "Jul 24",
        completed: true,
        description: "Order confirmed.",
      },
      {
        title: "Delivered",
        date: "Jul 27",
        completed: true,
        description: "Delivered at doorstep.",
      },
    ],
  },
];

const MOCK_WISHLIST: CustomerWishlistItem[] = [
  {
    id: "wish-1",
    productId: "prod-101",
    title: 'MacBook Pro 16" M3 Max 32GB RAM 1TB SSD',
    slug: "macbook-pro-16-m3-max",
    price: 2499.00,
    originalPrice: 2799.00,
    discountPercentage: 11,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&auto=format&fit=crop&q=60",
    inStock: true,
    rating: 4.9,
    category: "Laptops",
    addedAt: "Aug 15, 2026",
  },
  {
    id: "wish-2",
    productId: "prod-102",
    title: "Sony WH-1000XM5 Wireless Headphones",
    slug: "sony-wh-1000xm5",
    price: 348.00,
    originalPrice: 399.99,
    discountPercentage: 13,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=60",
    inStock: true,
    rating: 4.8,
    category: "Audio",
    addedAt: "Aug 12, 2026",
  },
  {
    id: "wish-3",
    productId: "prod-103",
    title: "Apple Watch Ultra 2 Titanium GPS + Cellular",
    slug: "apple-watch-ultra-2",
    price: 799.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=60",
    inStock: true,
    rating: 4.9,
    category: "Smartwatches",
    addedAt: "Aug 08, 2026",
  },
  {
    id: "wish-4",
    productId: "prod-104",
    title: "Logitech MX Master 3S Wireless Mouse",
    slug: "logitech-mx-master-3s",
    price: 99.99,
    originalPrice: 119.99,
    discountPercentage: 17,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&auto=format&fit=crop&q=60",
    inStock: false,
    rating: 4.7,
    category: "Accessories",
    addedAt: "Aug 01, 2026",
  },
];

const MOCK_TRANSACTIONS: CustomerTransaction[] = [
  {
    id: "tx-1",
    orderId: "ord-1",
    orderNumber: "#ORD-9582",
    date: "Aug 18, 2026",
    amount: 399.00,
    status: "Completed",
    paymentMethod: "Visa",
    cardLast4: "4242",
    type: "Payment",
    invoiceNumber: "INV-2026-0881",
  },
  {
    id: "tx-2",
    orderId: "ord-2",
    orderNumber: "#ORD-9564",
    date: "Aug 02, 2026",
    amount: 129.99,
    status: "Completed",
    paymentMethod: "Apple Pay",
    type: "Payment",
    invoiceNumber: "INV-2026-0792",
  },
  {
    id: "tx-3",
    orderId: "ord-3",
    orderNumber: "#ORD-9490",
    date: "Jul 24, 2026",
    amount: 649.50,
    status: "Completed",
    paymentMethod: "Mastercard",
    cardLast4: "8812",
    type: "Payment",
    invoiceNumber: "INV-2026-0683",
  },
];

export default async function CustomerDashboardPage() {
  const user = await getUserSession();
  const userName = user?.name || "Customer";

  return (
    <CustomerOverviewClient
      stats={MOCK_CUSTOMER_STATS}
      spendingData={MOCK_SPENDING_DATA}
      categoryData={MOCK_CATEGORY_DATA}
      recentOrders={MOCK_RECENT_ORDERS}
      wishlistItems={MOCK_WISHLIST}
      recentTransactions={MOCK_TRANSACTIONS}
      userName={userName}
    />
  );
}
