"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// 1. Types & Data Definition
export interface SlideData {
  id: string;
  tabTitle: string;
  subtitle: string;
  tagline: string;
  productName: string;
  price: string;
  originalPrice?: string;
  image: string;
  href: string;
  targetDate: Date; // Real target time for the countdown
}

const INITIAL_SLIDES: SlideData[] = [
  {
    id: "4k-tvs",
    tabTitle: "SO MUCH TO WATCH IN 4K TVS",
    subtitle: "LIMITED WEEK DEAL",
    tagline: "HURRY UP BEFORE OFFER WILL END",
    productName: "Ultra HD 4K Smart TV 55 Inch",
    price: "$399.00",
    originalPrice: "$499.00",
    image: "/images/hero-tv.png",
    href: "/product/4k-tv-55-inch",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 14 + 1000 * 60 * 22),
  },
  {
    id: "game-consoles",
    tabTitle: "GAME CONSOLES",
    subtitle: "LIMITED WEEK DEAL",
    tagline: "HURRY UP BEFORE OFFER WILL END",
    productName: "Game Console Controller + USB 3.0 Cable",
    price: "$90.00",
    originalPrice: "$99.00",
    image: "/images/hero-controller.png",
    href: "/product/game-console-controller",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 19 + 1000 * 11),
  },
  {
    id: "gamepad-deal",
    tabTitle: "LIMITED WEEK DEAL - GAMEPAD",
    subtitle: "EXCLUSIVE OFFER",
    tagline: "SPECIAL DISCOUNT THIS WEEK",
    productName: "Wireless Gaming Controller Pro",
    price: "$55.00",
    originalPrice: "$75.00",
    image: "/images/hero-gamepad.png",
    href: "/product/wireless-controller-pro",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 10),
  },
  {
    id: "cheaper-product",
    tabTitle: "SECOND PRODUCT 40% CHEAPER",
    subtitle: "MEGA DISCOUNT",
    tagline: "BUY ONE GET SECOND AT 40% OFF",
    productName: "Noise Cancelling Headphones",
    price: "$120.00",
    originalPrice: "$200.00",
    image: "/images/hero-headphones.png",
    href: "/product/noise-cancelling-headphones",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 18),
  },
  {
    id: "under-10",
    tabTitle: "$10 BUCKS OR LESS",
    subtitle: "CLEARANCE SALE",
    tagline: "TOP ACCESSORIES UNDER $10",
    productName: "High Speed USB-C Cable",
    price: "$8.99",
    originalPrice: "$15.00",
    image: "/images/hero-cable.png",
    href: "/product/usb-c-cable",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 45),
  },
];

// 2. Custom Countdown Hook
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const activeSlide = INITIAL_SLIDES[currentSlide];
  const { hours, minutes, seconds } = useCountdown(activeSlide.targetDate);

  // Auto-slide loop with pause control
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % INITIAL_SLIDES.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentSlide, isPaused]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-6">
      <div 
        className="relative bg-[#f6f6f6] dark:bg-gray-900 rounded-lg overflow-hidden transition-colors duration-200"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main Banner Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[380px] p-6 md:p-10 gap-6">
          
          {/* Left Side Text */}
          <div className="md:col-span-4 space-y-2 text-center md:text-left">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 dark:text-gray-100 tracking-tight leading-none uppercase">
              {activeSlide.subtitle.split(" ")[0]} <br />
              <span className="font-bold">{activeSlide.subtitle.split(" ").slice(1).join(" ")}</span>
            </h3>
            <p className="text-xs font-semibold tracking-wider text-gray-600 dark:text-gray-400 uppercase pt-2">
              {activeSlide.tagline}
            </p>
          </div>

          {/* Center Product Image with Pointer Cursor */}
          <div className="md:col-span-5 flex justify-center items-center relative h-64 md:h-80">
            <Link 
              href={activeSlide.href} 
              className="relative w-full h-full max-w-[320px] transition-all duration-500 ease-in-out flex items-center justify-center cursor-pointer group"
            >
              <img
                src={activeSlide.image}
                alt={activeSlide.productName}
                className="object-contain max-h-full transition-all duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Right Side: Product Details, Price & Dynamic Countdown */}
          <div className="md:col-span-3 space-y-4 text-center md:text-left">
            <Link href={activeSlide.href} className="inline-block cursor-pointer">
              <h4 className="text-base font-bold text-sky-600 dark:text-sky-400 hover:underline leading-tight">
                {activeSlide.productName}
              </h4>
            </Link>

            {/* Price Tag */}
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-3xl font-normal text-red-500">
                {activeSlide.price}
              </span>
              {activeSlide.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {activeSlide.originalPrice}
                </span>
              )}
            </div>

            {/* Countdown Boxes */}
            <div className="flex items-center justify-center md:justify-start gap-2 pt-2">
              <div className="border-2 border-[#fed700] rounded p-1.5 w-12 text-center bg-white dark:bg-gray-800">
                <span className="block text-lg font-bold text-gray-800 dark:text-white leading-none">
                  {String(hours).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-semibold">HOURS</span>
              </div>
              <div className="border-2 border-[#fed700] rounded p-1.5 w-12 text-center bg-white dark:bg-gray-800">
                <span className="block text-lg font-bold text-gray-800 dark:text-white leading-none">
                  {String(minutes).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-semibold">MINS</span>
              </div>
              <div className="border-2 border-[#fed700] rounded p-1.5 w-12 text-center bg-white dark:bg-gray-800">
                <span className="block text-lg font-bold text-gray-800 dark:text-white leading-none">
                  {String(seconds).padStart(2, "0")}
                </span>
                <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-semibold">SECS</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Interactive Slide Tabs with Pointer Cursor & Arrow */}
        <div className="grid grid-cols-2 md:grid-cols-5 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          {INITIAL_SLIDES.map((slide, index) => {
            const isActive = currentSlide === index;

            return (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={`relative px-3 py-4 text-center transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? "bg-[#f6f6f6] dark:bg-gray-900 font-bold text-gray-900 dark:text-white"
                    : "hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium"
                }`}
              >
                {/* Active Yellow Accent Line & Downward Pointer Arrow */}
                {isActive && (
                  <div className="absolute top-0 left-0 w-full">
                    <div className="h-[3px] w-full bg-[#fed700]" />
                    <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#fed700]" />
                  </div>
                )}

                <span className="text-[11px] leading-tight block uppercase tracking-tight pt-1">
                  {slide.tabTitle}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}