"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Download,
  RotateCcw,
  Star,
  ChevronRight,
  Copy,
} from "lucide-react";
import { toast } from "react-toastify";
import { CustomerOrder } from "@/types/customerDashboard";

const MOCK_ORDERS_LIST: CustomerOrder[] = [
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
      {
        title: "Order Placed",
        date: "Aug 02, 09:12 AM",
        completed: true,
        description: "Order confirmed.",
      },
      {
        title: "Dispatched",
        date: "Aug 03, 11:30 AM",
        completed: true,
        description: "Dispatched with DHL Express.",
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
        description: "Delivered safely.",
      },
    ],
  },
  {
    id: "ord-4",
    orderNumber: "#ORD-9412",
    date: "Jun 14, 2026",
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "PayPal",
    total: 219.00,
    itemCount: 2,
    carrier: "USPS Priority",
    trackingNumber: "USPS-94821039",
    estimatedDelivery: "Jun 18, 2026",
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    items: [
      {
        id: "item-5",
        name: "Wireless MagSafe 3-in-1 Charging Stand",
        slug: "magsafe-3-in-1-charging-stand",
        image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=200&auto=format&fit=crop&q=80",
        price: 119.00,
        quantity: 1,
      },
      {
        id: "item-6",
        name: "Smart RGB Ambient Light Bar Set",
        slug: "smart-rgb-ambient-light-bar",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200&auto=format&fit=crop&q=80",
        price: 100.00,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        date: "Jun 14",
        completed: true,
        description: "Order confirmed.",
      },
      {
        title: "Delivered",
        date: "Jun 18",
        completed: true,
        description: "Delivered in mailbox.",
      },
    ],
  },
  {
    id: "ord-5",
    orderNumber: "#ORD-9302",
    date: "May 09, 2026",
    status: "Cancelled",
    paymentStatus: "Refunded",
    paymentMethod: "Visa •••• 4242",
    total: 445.00,
    itemCount: 1,
    shippingAddress: "742 Evergreen Terrace, Springfield, OR 97477",
    items: [
      {
        id: "item-7",
        name: "Noise-Cancelling Studio Bluetooth Mic",
        slug: "studio-bluetooth-mic",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&auto=format&fit=crop&q=80",
        price: 445.00,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        date: "May 09",
        completed: true,
        description: "Order placed by customer.",
      },
      {
        title: "Order Cancelled",
        date: "May 09",
        completed: true,
        description: "Cancelled by customer before dispatch. Full refund issued.",
      },
    ],
  },
];

const STATUS_TABS = ["All Orders", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function CustomerOrdersClient() {
  const [orders, setOrders] = useState<CustomerOrder[]>(MOCK_ORDERS_LIST);
  const [selectedTab, setSelectedTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [trackingModalOrder, setTrackingModalOrder] = useState<CustomerOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      selectedTab === "All Orders" ||
      order.status.toLowerCase() === selectedTab.toLowerCase();
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const handleDownloadInvoice = (orderNumber: string) => {
    toast.success(`Downloading Invoice for order ${orderNumber}...`);
  };

  const handleBuyAgain = (item: { name: string }) => {
    toast.success(`"${item.name}" added to cart for reorder!`);
  };

  const copyTracking = (tracking: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tracking);
      toast.info(`Tracking #${tracking} copied to clipboard!`);
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <Link href="/dashboard/customer" className="hover:text-sky-600 transition-colors">
              Customer Dashboard
            </Link>
            <span>/</span>
            <span className="text-sky-600 dark:text-sky-400">My Orders</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Order History &amp;{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Tracking
            </span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track active shipments, manage past deliveries, and download receipts.
          </p>
        </div>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop More Items</span>
        </Link>
      </div>

      {/* ── Tabs & Search Bar ── */}
      <div className="space-y-4">
        {/* Status Tab Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {STATUS_TABS.map((tab) => {
            const count =
              tab === "All Orders"
                ? orders.length
                : orders.filter((o) => o.status.toLowerCase() === tab.toLowerCase()).length;

            return (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-xs"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 border border-slate-200/80 dark:border-gray-800"
                }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedTab === tab
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order number (e.g. #ORD-9582) or product title..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 focus:border-sky-500 rounded-xl text-xs focus:outline-none transition-all text-gray-800 dark:text-gray-100 shadow-xs"
          />
        </div>
      </div>

      {/* ── Orders Cards List ── */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-12 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto border border-sky-100 dark:border-sky-900/40">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              No orders found
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {searchQuery
                ? "No orders matched your search keyword."
                : `You do not have any ${selectedTab !== "All Orders" ? selectedTab.toLowerCase() : ""} orders yet.`}
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold shadow-md transition-all"
          >
            <span>Start Shopping</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs space-y-4"
            >
              {/* Order Card Header */}
              <div className="p-4 sm:p-5 bg-slate-50/70 dark:bg-gray-800/40 border-b border-slate-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">
                      Order Number
                    </span>
                    <span className="font-extrabold text-gray-900 dark:text-white">
                      {order.orderNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">
                      Date Placed
                    </span>
                    <span className="font-semibold text-gray-700 dark:text-gray-300">
                      {order.date}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] uppercase font-bold block">
                      Total Amount
                    </span>
                    <span className="font-black text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
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

                  <button
                    onClick={() => handleDownloadInvoice(order.orderNumber)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Invoice</span>
                  </button>
                </div>
              </div>

              {/* Order Items List */}
              <div className="p-4 sm:p-5 space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-gray-800 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative w-16 h-16 rounded-xl bg-slate-50 dark:bg-gray-800 p-1.5 border border-slate-200 dark:border-gray-700 shrink-0 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-contain p-1"
                          unoptimized
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/shop/${item.slug}`}
                          className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white hover:text-sky-600 dark:hover:text-sky-400 transition-colors line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          Qty: {item.quantity} • ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <button
                        onClick={() => handleBuyAgain(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-gray-800 hover:bg-slate-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Buy Again</span>
                      </button>

                      {order.status === "Delivered" && (
                        <Link
                          href={`/shop/${item.slug}#reviews`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sky-500/30 text-sky-600 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-950/40 text-xs font-semibold transition-colors"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer with Tracking CTA */}
              <div className="p-4 sm:p-5 pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 dark:text-gray-400">
                <div>
                  <span>Paid with {order.paymentMethod}</span>
                  {order.trackingNumber && (
                    <span className="ml-2 font-mono text-[11px] text-sky-600 dark:text-sky-400">
                      • {order.carrier}: #{order.trackingNumber}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {order.timeline && (
                    <button
                      onClick={() => setTrackingModalOrder(order)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-900/40 font-bold transition-colors cursor-pointer"
                    >
                      <Truck className="w-4 h-4" />
                      <span>Track Shipment</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Order Tracking Modal ── */}
      {trackingModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">
                  Tracking: {trackingModalOrder.orderNumber}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-xs text-gray-500">
                    {trackingModalOrder.carrier} • #{trackingModalOrder.trackingNumber}
                  </p>
                  {trackingModalOrder.trackingNumber && (
                    <button
                      onClick={() => copyTracking(trackingModalOrder.trackingNumber!)}
                      className="text-sky-600 hover:text-sky-700"
                      title="Copy Tracking #"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Timeline */}
            <div className="space-y-4 py-2">
              {trackingModalOrder.timeline.map((step, idx) => (
                <div key={idx} className="flex gap-4 items-start relative">
                  {idx !== trackingModalOrder.timeline.length - 1 && (
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

            <div className="pt-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between text-xs">
              <div className="text-gray-500">
                <span>Shipping to: </span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 block sm:inline">
                  {trackingModalOrder.shippingAddress}
                </span>
              </div>
              <button
                onClick={() => setTrackingModalOrder(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold transition-all cursor-pointer shrink-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
