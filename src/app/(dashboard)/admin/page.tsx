import React from "react";
import OverviewClient from "./OverviewClient";
import {
  StatCardItem,
  RevenueDataPoint,
  CategoryDataPoint,
  RecentOrder,
} from "@/types";

// ── All Dashboard Data Kept In Page.tsx ──
const STAT_CARDS_DATA: StatCardItem[] = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    isPositive: true,
    iconName: "DollarSign",
  },
  {
    title: "Orders Processed",
    value: "+2,350",
    change: "+12.2%",
    isPositive: true,
    iconName: "ShoppingBag",
  },
  {
    title: "Active Customers",
    value: "+12,234",
    change: "+4.5%",
    isPositive: true,
    iconName: "Users",
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-1.1%",
    isPositive: false,
    iconName: "TrendingUp",
  },
];

const REVENUE_GRAPH_DATA: RevenueDataPoint[] = [
  { month: "Jan", revenue: 18500, orders: 120 },
  { month: "Feb", revenue: 22400, orders: 150 },
  { month: "Mar", revenue: 28100, orders: 190 },
  { month: "Apr", revenue: 24000, orders: 170 },
  { month: "May", revenue: 32900, orders: 220 },
  { month: "Jun", revenue: 39100, orders: 260 },
  { month: "Jul", revenue: 36400, orders: 240 },
  { month: "Aug", revenue: 45231, orders: 310 },
];

const CATEGORY_GRAPH_DATA: CategoryDataPoint[] = [
  { name: "Laptops & Mobile", value: 45, color: "#0284c7" },
  { name: "Audio & Wearables", value: 30, color: "#2563eb" },
  { name: "Gaming Consoles", value: 25, color: "#6366f1" },
];

const RECENT_ORDERS_DATA: RecentOrder[] = [
  {
    id: "#ORD-9582",
    customer: "Sophia Montgomery",
    email: "sophia@example.com",
    product: 'MacBook Pro 16"',
    amount: "$2,499.00",
    status: "Completed",
    date: "Aug 18, 2026",
  },
  {
    id: "#ORD-9581",
    customer: "Liam Chen",
    email: "liam.c@example.com",
    product: "Wireless Headphones",
    amount: "$299.00",
    status: "Processing",
    date: "Aug 18, 2026",
  },
  {
    id: "#ORD-9580",
    customer: "Emma Watson",
    email: "emma.w@example.com",
    product: "4K Gaming Monitor",
    amount: "$649.50",
    status: "Pending",
    date: "Aug 17, 2026",
  },
  {
    id: "#ORD-9579",
    customer: "Noah Miller",
    email: "noah.m@example.com",
    product: "Smart Watch Series 9",
    amount: "$399.00",
    status: "Completed",
    date: "Aug 17, 2026",
  },
  {
    id: "#ORD-9578",
    customer: "Ava Davis",
    email: "ava.d@example.com",
    product: "Ergonomic Keyboard",
    amount: "$129.99",
    status: "Cancelled",
    date: "Aug 16, 2026",
  },
];

// Async Server Fetcher (Replace fallback data with your actual fetch call)
async function getDashboardData() {
  try {
    // const res = await fetch("https://api.yourdomain.com/v1/admin/overview", { cache: "no-store" });
    // return await res.json();

    return {
      stats: STAT_CARDS_DATA,
      revenueData: REVENUE_GRAPH_DATA,
      categoryData: CATEGORY_GRAPH_DATA,
      recentOrders: RECENT_ORDERS_DATA,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      stats: STAT_CARDS_DATA,
      revenueData: REVENUE_GRAPH_DATA,
      categoryData: CATEGORY_GRAPH_DATA,
      recentOrders: RECENT_ORDERS_DATA,
    };
  }
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  return (
    <OverviewClient
      stats={data.stats}
      revenueData={data.revenueData}
      categoryData={data.categoryData}
      recentOrders={data.recentOrders}
    />
  );
}