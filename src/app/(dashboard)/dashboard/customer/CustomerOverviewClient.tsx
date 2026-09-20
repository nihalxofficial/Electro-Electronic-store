"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  Button,
  Chip,
  Badge,
} from "@heroui/react";
import {
  DollarSign,
  ShoppingBag,
  CreditCard,
  Heart,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ShoppingCart,
  Trash2,
  ShieldCheck,
  MoreVertical,
  Calendar,
  Tag,
  Download,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import { addToCart } from "@/lib/action/cart";
import {
  SpendingDataPoint,
  CategoryPurchaseData,
  CustomerOrder,
  CustomerWishlistItem,
  CustomerTransaction,
} from "@/types/customerDashboard";

export interface CustomerStatCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: "DollarSign" | "ShoppingBag" | "Heart" | "Sparkles";
}

export interface CustomerSpendingVsSavings {
  month: string;
  spending: number;
  savings: number;
  orders: number;
}

export interface CustomerOrderStatusItem {
  name: string;
  value: number;
  color: string;
}

interface CustomerOverviewClientProps {
  stats: CustomerStatCard[];
  spendingData: SpendingDataPoint[];
  spendingVsSavingsData: CustomerSpendingVsSavings[];
  categoryData: CategoryPurchaseData[];
  orderStatusData: CustomerOrderStatusItem[];
  recentOrders: CustomerOrder[];
  wishlistItems: CustomerWishlistItem[];
  recentTransactions: CustomerTransaction[];
  userName: string;
}

const ICON_MAP = {
  DollarSign,
  ShoppingBag,
  Heart,
  Sparkles,
};

export default function CustomerOverviewClient({
  stats,
  spendingData,
  spendingVsSavingsData,
  categoryData,
  orderStatusData,
  recentOrders,
  wishlistItems: initialWishlist,
  recentTransactions,
  userName,
}: CustomerOverviewClientProps) {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<CustomerOrder | null>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleAddToCart = async (item: CustomerWishlistItem) => {
    if (user?.role === "admin") {
      toast.warning("Admin cannot add products to cart!");
      return;
    }
    if (user?.id && (item as any)?.ownerId && user.id === (item as any).ownerId) {
      toast.warning("You cannot add your own product to cart!");
      return;
    }

    try {
      const res = await addToCart(item.productId, 1);
      if (res?.success !== false) {
        toast.success(`"${item.title}" added to your cart!`);
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } else {
        toast.error(res?.message || "Failed to add to cart");
      }
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  const handleRemoveWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from wishlist");
  };

  const handleExportReport = () => {
    toast.success("Exporting your customer account & spending report...");
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header / Welcome ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Customer{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Overview
            </span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, {userName || "Valued Customer"}. Here is your personal shopping activity &amp; performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleExportReport}
            className="self-start sm:self-auto bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer h-10 px-4 rounded-xl flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* ── Metric Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, idx) => {
          const IconComponent = ICON_MAP[stat.iconName] || ShoppingBag;
          return (
            <Card
              key={idx}
              className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                  {stat.title}
                </span>
                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100 dark:border-sky-900/40">
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className={`inline-flex items-center text-xs font-bold ${
                      stat.isPositive
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-600 dark:text-rose-400"
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* ── Recharts Graphs (Matching Admin Overview Style) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Spending Area Chart */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Spending Activity
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Monthly spendings over the last 8 months ($ USD)
              </p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorCustomerRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value: ValueType | undefined) => [
                    `$${Number(value ?? 0).toLocaleString()}`,
                    "Spent",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#0284c7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCustomerRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Category Share Donut Chart */}
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Category Share
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Distribution of purchases by category
            </p>
          </div>

          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val: ValueType | undefined) => [`${Number(val ?? 0)}%`, "Share"]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                100%
              </span>
              <span className="text-[10px] text-gray-400">Total Spent</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    {cat.name}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {cat.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Additional Analytics Row: Spending vs Savings & Order Fulfillment ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending vs Promo Savings Bar Chart */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Monthly Spending vs. Savings
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Comparison of net spend vs total discounts unlocked
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-sky-600" />
                <span className="text-gray-600 dark:text-gray-300">Spent ($)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-md bg-blue-400" />
                <span className="text-gray-600 dark:text-gray-300">Saved ($)</span>
              </div>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={spendingVsSavingsData} barGap={6}>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val: ValueType | undefined) => [`$${Number(val ?? 0)}`, "Amount"]}
                />
                <Bar dataKey="spending" fill="#0284c7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="savings" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Order Fulfillment Status */}
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Order Fulfillment
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Delivery success rate &amp; active shipments
            </p>
          </div>

          <div className="h-52 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "none",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(val: ValueType | undefined) => [`${Number(val ?? 0)} Orders`, "Count"]}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                14
              </span>
              <span className="text-[10px] text-gray-400">Total Orders</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {orderStatusData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-300 font-medium">
                    {item.name}
                  </span>
                </div>
                <span className="font-bold text-gray-800 dark:text-gray-200">
                  {item.value} ({Math.round((item.value / 14) * 100)}%)
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ── Recent Orders Table ── */}
      <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Recent Orders
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Latest orders placed across your account
            </p>
          </div>
          <Link
            href="/dashboard/customer/orders"
            className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
          >
            View All Orders
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">
                <th className="pb-3 pl-2">Order ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Items</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 pr-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
              {recentOrders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors"
                >
                  <td className="py-3.5 pl-2 font-bold text-gray-800 dark:text-gray-200">
                    {order.orderNumber}
                  </td>
                  <td className="py-3.5 text-gray-500 dark:text-gray-400">
                    {order.date}
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2 overflow-hidden">
                        {order.items.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="relative w-7 h-7 rounded-lg border-2 border-white dark:border-gray-900 bg-slate-100 dark:bg-gray-800 overflow-hidden shrink-0"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="28px"
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        {order.itemCount} item{order.itemCount > 1 ? "s" : ""}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 font-bold text-gray-900 dark:text-white">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 text-gray-600 dark:text-gray-300">
                    {order.paymentMethod}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        order.status === "Delivered"
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/40"
                          : order.status === "Shipped"
                            ? "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-200/50 dark:border-sky-800/40"
                            : order.status === "Processing"
                              ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/40"
                              : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200/50 dark:border-rose-800/40"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <Button
                      size="sm"
                      onClick={() => setSelectedOrderForTracking(order)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-100 text-[11px] font-semibold transition-colors cursor-pointer h-7 min-w-0"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── Wishlist Quick Preview & Recent Transactions ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Wishlist Quick Shelf */}
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Wishlist Saved Items
                </h3>
              </div>
              <Link
                href="/dashboard/customer/wishlist"
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                View All ({wishlist.length})
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Items saved for future checkout
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <Heart className="w-8 h-8 text-gray-300 dark:text-gray-600 mx-auto" />
              <p className="text-xs text-gray-400">Your wishlist is currently empty</p>
              <Link
                href="/shop"
                className="inline-block text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                Browse Trending Products
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {wishlist.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-gray-800 hover:border-slate-200 dark:hover:border-gray-700 bg-slate-50/50 dark:bg-gray-950/40 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-12 h-12 rounded-lg bg-white dark:bg-gray-800 p-1 border border-slate-200 dark:border-gray-700 overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="48px"
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white truncate">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-extrabold text-sky-600 dark:text-sky-400">
                          ${item.price.toFixed(2)}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[11px] text-gray-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="text-[10px] text-gray-400 font-medium capitalize">
                          {item.inStock ? "• In Stock" : "• Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      isIconOnly
                      onClick={() => handleAddToCart(item)}
                      aria-label="Add to Cart"
                      className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-xs transition-all cursor-pointer h-8 w-8 min-w-0"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      onClick={() => handleRemoveWishlist(item.id)}
                      aria-label="Remove"
                      className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer h-8 w-8 min-w-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/dashboard/customer/wishlist"
            className="w-full py-2.5 rounded-xl border border-dashed border-sky-300 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 text-xs font-bold text-center block transition-colors h-10 flex items-center justify-center"
          >
            Manage Complete Wishlist
          </Link>
        </Card>

        {/* Recent Transactions List */}
        <Card className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Recent Transactions
                </h3>
              </div>
              <Link
                href="/dashboard/customer/transactions"
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline"
              >
                View Invoices
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Payment history and invoices
            </p>
          </div>

          <div className="space-y-3">
            {recentTransactions.slice(0, 3).map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-gray-800 hover:border-slate-200 dark:hover:border-gray-700 bg-slate-50/50 dark:bg-gray-950/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 flex items-center justify-center font-bold text-xs shrink-0">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {tx.paymentMethod} {tx.cardLast4 ? `(••• ${tx.cardLast4})` : ""}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {tx.orderNumber} • {tx.date}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">
                    ${tx.amount.toFixed(2)}
                  </p>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/dashboard/customer/transactions"
            className="w-full py-2.5 rounded-xl border border-dashed border-sky-300 dark:border-sky-800/60 text-sky-600 dark:text-sky-400 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 text-xs font-bold text-center block transition-colors h-10 flex items-center justify-center"
          >
            Download Financial Statements
          </Link>
        </Card>
      </div>

      {/* ── Tracking Details Modal ── */}
      {selectedOrderForTracking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <Card className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Order Tracking: {selectedOrderForTracking.orderNumber}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Carrier: {selectedOrderForTracking.carrier || "FedEx Express"} • Tracking: #{selectedOrderForTracking.trackingNumber || "TRK-982310"}
                </p>
              </div>
              <Button
                size="sm"
                isIconOnly
                variant="ghost"
                onClick={() => setSelectedOrderForTracking(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold p-1 h-8 w-8 min-w-0"
              >
                ✕
              </Button>
            </div>

            {/* Step-by-step visual tracker */}
            <div className="space-y-4 py-2">
              {selectedOrderForTracking.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start relative">
                  {idx !== selectedOrderForTracking.timeline.length - 1 && (
                    <div
                      className={`absolute left-3.5 top-7 w-0.5 h-10 ${
                        step.completed ? "bg-sky-500" : "bg-slate-200 dark:bg-gray-800"
                      }`}
                    />
                  )}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      step.completed
                        ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs"
                        : step.current
                          ? "bg-amber-500 text-white ring-4 ring-amber-100 dark:ring-amber-950/60 animate-pulse"
                          : "bg-slate-200 dark:bg-gray-800 text-gray-400"
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </p>
                      <span className="text-[10px] text-gray-400 font-medium">
                        {step.date}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <span>Shipping to: </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  {selectedOrderForTracking.shippingAddress}
                </span>
              </div>
              <Button
                onClick={() => setSelectedOrderForTracking(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold transition-all cursor-pointer h-9"
              >
                Close Tracker
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
