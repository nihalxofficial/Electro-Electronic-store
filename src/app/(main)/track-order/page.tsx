"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PackageSearch,
  Receipt,
  Mail,
  ArrowRight,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;

    setIsSubmitting(true);
    // Simulate API lookup delay
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSearched(true);
    }, 800);
  };

  return (
    /* Full-width container using default page background */
    <section className="w-full text-gray-800 dark:text-gray-100 py-12 md:py-20">
      
      {/* Centered content grid */}
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        
        {/* ── Page Header ── */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/50 text-xs font-semibold tracking-wide uppercase">
            <PackageSearch className="w-4 h-4 stroke-[2.2]" />
            Order Lookup
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Track Your <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">Order</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg mx-auto">
            To track your order please enter your Order ID in the box below and press the "Track Order" button. This was given to you on your receipt and in the confirmation email.
          </p>
        </div>

        {/* ── Tracking Form Card ── */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-3xl p-6 md:p-10 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Order ID Input */}
              <div className="space-y-2">
                <label htmlFor="orderId" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Order ID <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <input
                    id="orderId"
                    type="text"
                    required
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Found in your confirmation email. e.g. 3456"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Billing Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                  Billing Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email used during checkout"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                  />
                </div>
              </div>

            </div>

            {/* Center-Aligned Submit Button */}
            <div className="pt-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-10 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 group cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Locating Order...</span>
                  </>
                ) : (
                  <>
                    <span>Track Order</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* ── Results Block (Triggers when submitted) ── */}
        {hasSearched && (
          <div className="bg-white dark:bg-gray-900 border border-sky-100 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Status Summary Banner */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
              <div>
                <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 uppercase tracking-wider">
                  Order #{orderId || "3456"}
                </p>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                  Status: <span className="text-sky-600 dark:text-sky-400">In Transit</span>
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs bg-slate-100 dark:bg-gray-800 px-3.5 py-2 rounded-xl text-gray-600 dark:text-gray-300 font-medium">
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Estimated Delivery: <strong>August 10, 2026</strong></span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              {[
                { title: "Order Placed", date: "Aug 04, 2026", done: true, icon: CheckCircle2 },
                { title: "Processing", date: "Aug 05, 2026", done: true, icon: PackageSearch },
                { title: "On The Way", date: "Aug 06, 2026", active: true, icon: Truck },
                { title: "Delivered", date: "Pending", done: false, icon: CheckCircle2 },
              ].map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex md:flex-col items-center gap-4 md:gap-3 text-left md:text-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                        step.done
                          ? "bg-sky-500 text-white shadow-xs"
                          : step.active
                          ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white ring-4 ring-sky-100 dark:ring-sky-950 shadow-md animate-pulse"
                          : "bg-slate-100 dark:bg-gray-800 text-gray-400"
                      }`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${step.active || step.done ? "text-gray-900 dark:text-white" : "text-gray-400"}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{step.date}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ── Help Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="flex items-start gap-3.5 p-5 bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Secure Tracking
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Your order data is encrypted. Make sure to enter the exact billing email address used during purchase.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-5 bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl">
            <HelpCircle className="w-6 h-6 text-sky-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                Need Support?
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                Can’t find your Order ID? Check your spam folder or{" "}
                <Link href="/contact" className="text-sky-600 dark:text-sky-400 font-medium hover:underline">
                  contact support
                </Link>.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}