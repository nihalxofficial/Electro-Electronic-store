"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  Copy,
  Check,
  ShoppingBag,
  Truck,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CreditCard,
  Coins,
  MapPin,
  Calendar,
  Sparkles,
  CircleDot,
} from "lucide-react";
import { toast } from "react-toastify";
import { OrderSuccessClientProps, Order } from "@/types";

export default function OrderSuccessClient({
  orderId,
  initialOrder,
}: OrderSuccessClientProps) {
  const [order, setOrder] = useState<Order | null>(initialOrder || null);
  const [isCopiedId, setIsCopiedId] = useState<boolean>(false);
  const [isCopiedTrx, setIsCopiedTrx] = useState<boolean>(false);
  const receiptRef = useRef<HTMLDivElement>(null);

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
      setIsCopiedId(true);
      toast.success("Order ID copied to clipboard!");
      setTimeout(() => setIsCopiedId(false), 2000);
    }
  };

  const handleCopyTrxId = () => {
    if (order?.transactionId && typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(order.transactionId);
      setIsCopiedTrx(true);
      toast.success("Transaction ID copied to clipboard!");
      setTimeout(() => setIsCopiedTrx(false), 2000);
    }
  };

  const paymentMethodLabel = (method?: string) => {
    switch (method) {
      case "bkash":
        return {
          name: "bKash Direct",
          badgeBg: "bg-[#E2136E]/10 text-[#E2136E] border-[#E2136E]/30",
          icon: <Smartphone className="w-3.5 h-3.5 text-[#E2136E]" />,
        };
      case "nagad":
        return {
          name: "Nagad Wallet",
          badgeBg: "bg-[#F7941D]/10 text-[#F7941D] border-[#F7941D]/30",
          icon: <CreditCard className="w-3.5 h-3.5 text-[#F7941D]" />,
        };
      case "rocket":
        return {
          name: "Rocket DBBL",
          badgeBg: "bg-[#8C3494]/10 text-[#8C3494] border-[#8C3494]/30",
          icon: <ShieldCheck className="w-3.5 h-3.5 text-[#8C3494]" />,
        };
      case "cod":
      default:
        return {
          name: "Cash on Delivery",
          badgeBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
          icon: <Coins className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
        };
    }
  };

  const paymentBadge = paymentMethodLabel(order?.paymentMethod);

  const orderDate = order?.createdAt ? new Date(order.createdAt) : new Date();
  const formattedDate = orderDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Estimated delivery date (3 days from order date)
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="py-8 md:py-14 max-w-2xl mx-auto px-4 space-y-8 relative">
      {/* ── Ambient Background Lighting Effects ── */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-sky-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ── Top Celebration Header ── */}
      <div className="text-center space-y-3.5 print:hidden">
        {/* Animated Celebration Badge */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-xl shadow-emerald-500/25 ring-8 ring-emerald-500/10 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.5]" />
          </div>
          <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-md animate-bounce">
            <Sparkles className="w-4 h-4 fill-slate-900" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider mb-1">
            <CircleDot className="w-2 h-2 fill-emerald-500 animate-pulse text-emerald-500" />
            Payment & Order Confirmed
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Thank You for Your Order!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Your package has entered fulfillment and is scheduled for fast delivery by{" "}
            <span className="font-bold text-slate-800 dark:text-slate-200">
              {formattedDeliveryDate}
            </span>.
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BESPOKE DIGITAL RECEIPT TICKET (VINTAGE TICKET MOTIF)
      ════════════════════════════════════════════════════════ */}
      <div
        ref={receiptRef}
        id="order-receipt"
        className="relative bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 rounded-3xl shadow-2xl overflow-hidden print:border-none print:shadow-none print:p-0 print:m-0"
      >
        {/* Top Decorative Gradient Line */}
        <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />

        {/* ── Section A: Header & Meta ── */}
        <div className="p-6 sm:p-8 pb-5 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ELECTRO
                </span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 tracking-wider uppercase border border-sky-200 dark:border-sky-800">
                  Tax Invoice
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Official Purchase Receipt & Warranty Certificate
              </p>
            </div>

            {/* Order Reference Badge */}
            <div className="text-right space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-900 dark:text-white">
                <span>#{orderId}</span>
                <button
                  type="button"
                  onClick={handleCopyOrderId}
                  className="hover:text-sky-500 transition-colors p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 print:hidden cursor-pointer"
                  title="Copy Order ID"
                >
                  {isCopiedId ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-400 flex items-center justify-end gap-1 font-medium">
                <Calendar className="w-3 h-3 text-slate-400" />
                {formattedDate}
              </p>
            </div>
          </div>

          {/* Mini Live Order Status Tracker */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50/70 via-blue-50/40 to-indigo-50/70 dark:from-slate-800/60 dark:via-slate-800/40 dark:to-slate-800/60 border border-sky-100 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-slate-900 dark:text-white text-xs">
                  Status: Processing & Preparing for Courier
                </span>
              </div>
              <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                Est. Delivery: {formattedDeliveryDate}
              </span>
            </div>
          </div>
        </div>

        {/* ── Perforated Tear Line with Notches ── */}
        <div className="relative flex items-center my-1 print:hidden">
          {/* Left Notch */}
          <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950 -ml-3 border-r border-slate-200/90 dark:border-slate-800/90 shadow-inner" />
          {/* Dashed Line */}
          <div className="flex-1 border-b-2 border-dashed border-slate-200 dark:border-slate-700 mx-1" />
          {/* Right Notch */}
          <div className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-950 -mr-3 border-l border-slate-200/90 dark:border-slate-800/90 shadow-inner" />
        </div>

        {/* ── Section B: Shipping & Payment Cards ── */}
        <div className="p-6 sm:p-8 pt-4 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delivery Destination */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center gap-1.5 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                Shipping Destination
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-sm">
                  {order?.shippingAddress?.fullName || "Valued Customer"}
                </p>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-[11px] mt-0.5">
                  📞 {order?.shippingAddress?.phone || "Phone on file"}
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-1 leading-relaxed">
                  {order?.shippingAddress?.address ? (
                    <>
                      {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.postalCode}
                    </>
                  ) : (
                    "Standard Registered Delivery Address"
                  )}
                </p>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-sky-500" />
                  Payment Details
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  Authorized
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-bold text-xs text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
                  {paymentBadge.icon}
                  {paymentBadge.name}
                </div>

                {order?.transactionId && order.paymentMethod !== "cod" ? (
                  <div className="mt-2 flex items-center justify-between p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60">
                    <span className="text-[10px] text-sky-700 dark:text-sky-300 font-medium">Trx ID:</span>
                    <span className="font-mono font-bold text-[11px] text-sky-900 dark:text-sky-100 flex items-center gap-1">
                      {order.transactionId}
                      <button
                        type="button"
                        onClick={handleCopyTrxId}
                        className="hover:text-sky-500 p-0.5 print:hidden cursor-pointer"
                        title="Copy Trx ID"
                      >
                        {isCopiedTrx ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </span>
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    Payment collection upon parcel receipt at doorstep.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ── Purchased Items Table ── */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider px-1 pb-1 border-b border-slate-100 dark:border-slate-800">
              <span>Item & Specification</span>
              <span>Total Price</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-80 overflow-y-auto pr-1">
              {order?.items && order.items.length > 0 ? (
                order.items.map((item, idx) => {
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
                      className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="relative w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
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
                          <p className="font-bold text-slate-900 dark:text-white truncate text-xs sm:text-sm">
                            {title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            Unit: ${price.toFixed(2)} × Qty:{" "}
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {item.quantity}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-4 text-center text-xs text-slate-400">
                  Items verified and recorded.
                </div>
              )}
            </div>
          </div>

          {/* ── Financial Breakdown ── */}
          <div className="pt-4 border-t-2 border-slate-200 dark:border-slate-700 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>Items Subtotal</span>
              <span className="font-bold text-slate-900 dark:text-white">
                ${(order?.subtotal || order?.totalAmount || 0).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Delivery & Shipping Fee</span>
              <span className="font-bold text-slate-900 dark:text-white">
                {order?.shippingFee === 0 || !order?.shippingFee ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                    FREE DELIVERY
                  </span>
                ) : (
                  `$${order.shippingFee.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span>Estimated Tax & VAT</span>
              <span className="text-slate-400 text-[11px]">Included in total (0% extra)</span>
            </div>

            {/* Grand Total Highlight */}
            <div className="pt-4 border-t-2 border-dashed border-slate-200 dark:border-slate-700 flex items-baseline justify-between">
              <div>
                <span className="text-base font-black text-slate-900 dark:text-white">
                  Total Paid / Payable
                </span>
                <p className="text-[10px] text-slate-400">
                  Official Authorized Invoice Total
                </p>
              </div>
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ${(order?.totalAmount || 0).toFixed(2)}
              </span>
            </div>
          </div>

          {/* ── Security Stamp & Barcode Footer ── */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center space-y-3">
            {/* Realistic Barcode Generator */}
            <div className="flex items-center justify-center gap-1 opacity-70">
              {[3, 1, 5, 2, 4, 1, 6, 2, 3, 5, 1, 4, 2, 6, 3, 1, 5, 2, 4, 1, 6, 2, 3, 5, 1, 4, 2].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-slate-900 dark:bg-slate-100 rounded-2xs"
                  style={{ height: `${h * 3.5 + 8}px` }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>OFFICIAL ELECTRO VERIFIED DIGITAL RECEIPT • #{orderId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Navigation Action Buttons ── */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 print:hidden">
        <Link
          href="/shop"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-600 hover:via-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          Continue Shopping
        </Link>

        <Link
          href="/track-order"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          <Truck className="w-4 h-4 text-sky-500" />
          Track Order Live
        </Link>

        <Link
          href="/dashboard/customer/orders"
          className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-colors text-center flex items-center justify-center gap-2 shadow-xs cursor-pointer"
        >
          My Orders History
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
