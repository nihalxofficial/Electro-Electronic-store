"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

interface NewsletterBannerProps {
  onSubscribe?: (email: string) => void;
  couponAmount?: string;
}

export default function NewsletterBanner({
  onSubscribe,
  couponAmount = "$20",
}: NewsletterBannerProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    if (onSubscribe) {
      onSubscribe(email);
    }

    setIsSubmitted(true);
    setEmail("");
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <section className="w-full bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 text-white py-4 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Paper Plane Icon + Text Content */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          {/* Paper Plane Icon */}
          <div className="p-2 rounded-full bg-white/10 backdrop-blur-xs text-white">
            <Send className="w-5 h-5 -rotate-12 stroke-[2] shrink-0" />
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 text-sm md:text-base">
            <span className="font-semibold text-white text-lg md:text-xl tracking-tight">
              Sign up to Newsletter
            </span>
            <span className="text-sky-100 text-xs md:text-sm font-light">
              ...and receive{" "}
              <strong className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-md inline-block">
                {couponAmount} coupon
              </strong>{" "}
              for your first shopping
            </span>
          </div>
        </div>

        {/* Right Side: Email Input Form */}
        <div className="w-full lg:w-auto min-w-[280px] sm:min-w-[380px] md:min-w-[460px]">
          {isSubmitted ? (
            <div className="bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-medium py-2.5 px-6 rounded-full text-center border border-white/30 shadow-xs">
              Thank you for subscribing! Check your inbox for your coupon.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center w-full bg-white dark:bg-gray-900 rounded-full overflow-hidden p-1 shadow-md border border-sky-100/30 focus-within:ring-2 focus-within:ring-white/50 transition-all"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-5 py-2 text-xs md:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-semibold px-6 md:px-8 py-2.5 rounded-full transition-colors shrink-0 cursor-pointer shadow-xs"
              >
                SignUp
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}