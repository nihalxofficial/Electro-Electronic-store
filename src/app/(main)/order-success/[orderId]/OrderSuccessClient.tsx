"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  Button,
} from "@heroui/react";
import {
  CheckCircle2,
  ShoppingBag,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  Home,
  ShieldCheck,
  Receipt,
  Smartphone,
  Coins,
} from "lucide-react";
import { toast } from "react-toastify";
import { OrderSuccessClientProps, Order } from "@/types";

export default function OrderSuccessClient({
  orderId,
  initialOrder,
}: OrderSuccessClientProps) {
  const [order, setOrder] = useState<Order | null>(initialOrder || null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!order && typeof window !== "undefined") {
      try {
        const storedOrder = sessionStorage.getItem(`order_${orderId}`);
        if (storedOrder) {
          setOrder(JSON.parse(storedOrder));
        }
      } catch (err) {
        console.error("Error reading stored order:", err);
      }
    }
  }, [orderId, order]);

  const handleCopyOrderId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(orderId);
      setIsCopied(true);
      toast.success("Order ID copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const cardClass =
    "border border-slate-200/80 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900 rounded-2xl";

  const paymentMethodLabel = (method?: string) => {
    switch (method) {
      case "bkash":
        return {
          name: "bKash Direct",
          color: "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800",
          icon: <Smartphone className="w-3.5 h-3.5" />,
        };
      case "nagad":
        return {
          name: "Nagad Wallet",
          color: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800",
          icon: <CreditCard className="w-3.5 h-3.5" />,
        };
      case "rocket":
        return {
          name: "Rocket (DBBL)",
          color: "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800",
          icon: <ShieldCheck className="w-3.5 h-3.5" />,
        };
      case "cod":
      default:
        return {
          name: "Cash on Delivery",
          color: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800",
          icon: <Coins className="w-3.5 h-3.5" />,
        };
    }
  };

  const paymentBadge = paymentMethodLabel(order?.paymentMethod);

  return (
    <div className="py-8 md:py-12 max-w-4xl mx-auto space-y-8">
      {/* ── Celebration Header Banner ── */}
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/10 ring-8 ring-emerald-50 dark:ring-emerald-900/20 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            Your order has been confirmed and is now being processed by our fulfillment team.
          </p>
        </div>

        {/* Order ID Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <span className="text-xs text-slate-500 dark:text-slate-400">Order ID:</span>
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white">
            {orderId}
          </span>
          <button
            type="button"
            onClick={handleCopyOrderId}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 cursor-pointer"
            title="Copy Order ID"
          >
            {isCopied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* ── Order Highlights Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Card */}
        <Card className={cardClass}>
          <Card.Content className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Order Status</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                {order?.status || "Processing"}
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Date Card */}
        <Card className={cardClass}>
          <Card.Content className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Date Placed</p>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {order?.createdAt
                  ? new Date(order.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : new Date().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
              </p>
            </div>
          </Card.Content>
        </Card>

        {/* Payment Card */}
        <Card className={cardClass}>
          <Card.Content className="p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 font-medium">Payment Method</p>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border mt-0.5 ${paymentBadge.color}`}
              >
                {paymentBadge.icon}
                {paymentBadge.name}
              </span>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* ── Transaction Details (If Wallet Payment) ── */}
      {order?.transactionId && order.paymentMethod !== "cod" && (
        <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200/80 dark:border-sky-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-sky-950 dark:text-sky-100">
                Payment Verification Reference
              </p>
              <p className="text-[11px] text-sky-700 dark:text-sky-300">
                Authorized mobile wallet transaction
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 shadow-2xs">
            Trx ID: {order.transactionId}
          </span>
        </div>
      )}

      {/* ── Detailed Breakdown Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Destination */}
        <Card className={cardClass}>
          <Card.Content className="p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <MapPin className="w-4 h-4 text-sky-500" />
              Delivery Information
            </h2>

            {order?.shippingAddress ? (
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 text-[11px]">Recipient Name</span>
                  <p className="font-bold text-slate-900 dark:text-white">
                    {order.shippingAddress.fullName}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Contact Phone</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.shippingAddress.phone}
                  </p>
                </div>
                <div>
                  <span className="text-slate-400 text-[11px]">Delivery Address</span>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {order.shippingAddress.address}
                  </p>
                  <p className="text-slate-500">
                    {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-1 text-xs text-slate-500">
                <p>Standard Express Delivery</p>
                <p>Estimated Arrival: 3-5 business days</p>
              </div>
            )}
          </Card.Content>
        </Card>

        {/* Receipt & Totals */}
        <Card className={cardClass}>
          <Card.Content className="p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Receipt className="w-4 h-4 text-sky-500" />
              Payment Summary
            </h2>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${(order?.subtotal || order?.totalAmount || 0).toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {order?.shippingFee === 0 || !order?.shippingFee ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      FREE
                    </span>
                  ) : (
                    `$${order.shippingFee.toFixed(2)}`
                  )}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Total Paid
                </span>
                <span className="text-lg font-black text-sky-600 dark:text-sky-400">
                  ${(order?.totalAmount || 0).toFixed(2)}
                </span>
              </div>
            </div>
          </Card.Content>
        </Card>
      </div>

      {/* ── Items Purchased Section ── */}
      {order?.items && order.items.length > 0 && (
        <Card className={cardClass}>
          <Card.Content className="p-6 space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <ShoppingBag className="w-4 h-4 text-sky-500" />
              Purchased Items ({order.items.length})
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {order.items.map((item, idx) => {
                const title =
                  item.title ||
                  item.product?.title ||
                  `Item #${idx + 1}`;
                const price = Number(item.price || item.product?.price || 0);
                const image =
                  item.image ||
                  item.product?.image ||
                  "/placeholder.png";
                const total =
                  item.lineTotal ?? price * (item.quantity || 1);

                return (
                  <div
                    key={idx}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-700">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover"
                          sizes="48px"
                          unoptimized={image.startsWith("http")}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          {title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Qty: {item.quantity} × ${price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-slate-900 dark:text-white shrink-0">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card.Content>
        </Card>
      )}

      {/* ── Navigation Actions ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all text-center flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Link>

        <Link
          href="/track-order"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors text-center flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          Track Order
        </Link>

        <Link
          href="/dashboard/customer/orders"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors text-center flex items-center justify-center gap-2"
        >
          View All Orders
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
