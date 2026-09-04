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
    <section className="w-full bg-gradient-to-r from-sky-500 via-blue-600 to-sky-600 text-white py-3.5 sm:py-4 px-3 sm:px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4">
        
        {/* Left Side: Paper Plane Icon + Text Content */}
        <div className="flex items-center gap-2.5 sm:gap-3 w-full lg:w-auto text-left">
          {/* Paper Plane Icon */}
          <div className="p-1.5 sm:p-2 rounded-full bg-white/10 backdrop-blur-xs text-white shrink-0">
            <Send className="w-4 h-4 sm:w-5 sm:h-5 -rotate-12 stroke-[2]" />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:flex-wrap gap-x-2 gap-y-0.5 min-w-0">
            <span className="font-bold text-white text-sm sm:text-base md:text-lg tracking-tight truncate">
              Sign up to Newsletter
            </span>
            <span className="text-sky-100 text-[11px] sm:text-xs md:text-sm font-normal">
              ...and receive{" "}
              <strong className="font-bold text-white bg-white/20 px-1.5 py-0.5 rounded text-[10px] sm:text-xs inline-block">
                {couponAmount} coupon
              </strong>{" "}
              for your first order
            </span>
          </div>
        </div>

        {/* Right Side: Email Input Form */}
        <div className="w-full lg:w-auto min-w-[260px] sm:min-w-[360px] md:min-w-[440px]">
          {isSubmitted ? (
            <div className="bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-medium py-2 px-5 rounded-full text-center border border-white/30 shadow-xs">
              Thank you for subscribing!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex items-center w-full bg-white dark:bg-gray-900 rounded-full overflow-hidden p-0.5 sm:p-1 shadow-md border border-sky-100/30 focus-within:ring-2 focus-within:ring-white/50 transition-all"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold px-4 sm:px-7 py-2 sm:py-2.5 rounded-full transition-colors shrink-0 cursor-pointer shadow-xs"
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