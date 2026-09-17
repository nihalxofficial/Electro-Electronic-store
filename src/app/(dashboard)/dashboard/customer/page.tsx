import React from "react";
import CustomerOverviewClient, {
  CustomerStatCard,
  CustomerSpendingVsSavings,
  CustomerOrderStatusItem,
} from "./CustomerOverviewClient";
import { getUserSession } from "@/lib/core/session";
import { getWishlistByUserId } from "@/lib/api/wishlist";
import {
  SpendingDataPoint,
  CategoryPurchaseData,
  CustomerOrder,
  CustomerWishlistItem,
  CustomerTransaction,
} from "@/types/customerDashboard";

const STAT_CARDS_DATA: CustomerStatCard[] = [
  {
    title: "Total Orders",
    value: "14 Orders",
    change: "+2 active in transit",
    isPositive: true,
    iconName: "ShoppingBag",
  },
  {
    title: "Total Spent",
    value: "$1,842.50",
    change: "Saved $280.00 with coupons",
    isPositive: true,
    iconName: "DollarSign",
  },
  {
    title: "Wishlist Items",
    value: "6 Items",
    change: "3 on discount sale",
    isPositive: true,
    iconName: "Heart",
  },
  {
    title: "Reward Points",
    value: "1,450 pts",
    change: "Gold Tier Member",
    isPositive: true,
    iconName: "Sparkles",
  },
];

const SPENDING_GRAPH_DATA: SpendingDataPoint[] = [
  { month: "Jan", amount: 140, orders: 1 },
  { month: "Feb", amount: 260, orders: 2 },
  { month: "Mar", amount: 190, orders: 2 },
  { month: "Apr", amount: 320, orders: 3 },
  { month: "May", amount: 210, orders: 1 },
  { month: "Jun", amount: 480, orders: 3 },
  { month: "Jul", amount: 110, orders: 1 },
  { month: "Aug", amount: 380, orders: 2 },
];

const SPENDING_VS_SAVINGS_DATA: CustomerSpendingVsSavings[] = [
  { month: "Jan", spending: 140, savings: 25, orders: 1 },
  { month: "Feb", spending: 260, savings: 45, orders: 2 },
  { month: "Mar", spending: 190, savings: 30, orders: 2 },
  { month: "Apr", spending: 320, savings: 60, orders: 3 },
  { month: "May", spending: 210, savings: 40, orders: 1 },
  { month: "Jun", spending: 480, savings: 95, orders: 3 },
  { month: "Jul", spending: 110, savings: 15, orders: 1 },
  { month: "Aug", spending: 380, savings: 75, orders: 2 },
];

const CATEGORY_GRAPH_DATA: CategoryPurchaseData[] = [
  { name: "Laptops & Computers", value: 45, amount: 829.12, color: "#0284c7" },
  { name: "Headphones & Audio", value: 25, amount: 460.62, color: "#2563eb" },
  { name: "Smartwatches", value: 18, amount: 331.65, color: "#6366f1" },
  { name: "Accessories", value: 12, amount: 221.10, color: "#38bdf8" },
];

const ORDER_STATUS_DISTRIBUTION: CustomerOrderStatusItem[] = [
  { name: "Delivered", value: 11, color: "#0284c7" },
  { name: "Shipped / In Transit", value: 2, color: "#2563eb" },
  { name: "Processing", value: 1, color: "#6366f1" },
];

// Overview recent orders snippet (full data lives in orders/page.tsx)
const RECENT_ORDERS_DATA: CustomerOrder[] = [
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
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    items: [
      {
        id: "item-1",
        name: "Noise Cancelling Wireless Headphones Pro",
        slug: "noise-cancelling-wireless-headphones-pro",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80",
        price: 299.00,
        quantity: 1,
      },
      {
        id: "item-2",
        name: "Fast Charge USB-C Braided Cable 2M",
        slug: "fast-charge-usbc-cable",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&auto=format&fit=crop&q=80",
        price: 100.00,
        quantity: 1,
      },
    ],
    timeline: [
      { title: "Order Placed", date: "Aug 18, 10:30 AM", completed: true, description: "Your order was received and confirmed." },
      { title: "Payment Processed", date: "Aug 18, 10:32 AM", completed: true, description: "Payment of $399.00 was authorized via Visa." },
      { title: "Dispatched from Warehouse", date: "Aug 19, 02:15 PM", completed: true, description: "Package handed over to FedEx carrier hub." },
      { title: "In Transit", date: "Aug 20, 08:45 AM", completed: false, current: true, description: "Package is on the way to local sorting facility." },
      { title: "Out for Delivery", date: "Expected Aug 21", completed: false, description: "Courier will deliver to your doorstep." },
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
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    items: [
      {
        id: "item-3",
        name: "Ultra Ergonomic Mechanical Gaming Keyboard RGB",
        slug: "ultra-ergonomic-mechanical-keyboard",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&auto=format&fit=crop&q=80",
        price: 129.99,
        quantity: 1,
      },
    ],
    timeline: [
      { title: "Order Placed", date: "Aug 02, 09:12 AM", completed: true, description: "Order confirmed." },
      { title: "Dispatched", date: "Aug 03, 11:30 AM", completed: true, description: "Dispatched with DHL Express." },
      { title: "Delivered", date: "Aug 05, 03:40 PM", completed: true, description: "Delivered and signed at front porch." },
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
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    items: [
      {
        id: "item-4",
        name: '4K Ultra Gaming Monitor 27" 165Hz IPS Panel',
        slug: "4k-ultra-gaming-monitor-27",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&auto=format&fit=crop&q=80",
        price: 649.50,
        quantity: 1,
      },
    ],
    timeline: [
      { title: "Order Placed", date: "Jul 24", completed: true, description: "Order confirmed." },
      { title: "Delivered", date: "Jul 27", completed: true, description: "Delivered safely." },
    ],
  },
];

// Overview transactions snippet (full data lives in transactions/page.tsx)
const RECENT_TRANSACTIONS_DATA: CustomerTransaction[] = [
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

  // Fetch real wishlist for the overview preview
  let wishlistItems: CustomerWishlistItem[] = [];
  if (user?.id) {
    const res = await getWishlistByUserId(user.id);
    const raw = res?.data?.items || (Array.isArray(res?.data) ? res.data : []);
    wishlistItems = raw
      .filter((item: any) => item?.productId)
      .map((item: any) => {
        const p = item.productId;
        return {
          id: item._id,
          productId: p._id || p.id,
          title: p.title,
          slug: p.slug,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          inStock: p.inStock ?? true,
          rating: p.rating || 5,
          category: p.category?.name || "Electronics",
          addedAt: item.createdAt
            ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
            : "",
        };
      });
  }

  const stats = STAT_CARDS_DATA.map((card) =>
    card.iconName === "Heart" ? { ...card, value: `${wishlistItems.length} Items` } : card
  );

  return (
    <CustomerOverviewClient
      stats={stats}
      spendingData={SPENDING_GRAPH_DATA}
      spendingVsSavingsData={SPENDING_VS_SAVINGS_DATA}
      categoryData={CATEGORY_GRAPH_DATA}
      orderStatusData={ORDER_STATUS_DISTRIBUTION}
      recentOrders={RECENT_ORDERS_DATA}
      wishlistItems={wishlistItems}
      recentTransactions={RECENT_TRANSACTIONS_DATA}
      userName={userName}
    />
  );
}
