"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────
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
  targetDate: Date;
}

// ─── Slide Data ─────────────────────────────────────────────────────────────
// To add/edit a slide: update this array.
// image: must be a DIRECT image URL (e.g. ending in .jpg/.png), not a web page.
const SLIDES: SlideData[] = [
  {
    id: "4k-tvs",
    tabTitle: "SO MUCH TO WATCH IN 4K TVS",
    subtitle: "LIMITED WEEK DEAL",
    tagline: "HURRY UP BEFORE OFFER WILL END",
    productName: "Ultra HD 4K Smart TV 55 Inch",
    price: "$399.00",
    originalPrice: "$499.00",
    image: "https://i.ibb.co.com/mVYgHKHt/black-color-wall-mount-32-inch-smart-led-tv-full-hd-display-065-removebg-preview.png",
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
    image: "https://i.ibb.co.com/1tR8Pt8S/392223-large-removebg-preview.png",
    href: "/product/game-console-controller",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 8 + 1000 * 60 * 19),
  },
  {
    id: "gamepad-deal",
    tabTitle: "LIMITED WEEK DEAL - GAMEPAD",
    subtitle: "EXCLUSIVE OFFER",
    tagline: "SPECIAL DISCOUNT THIS WEEK",
    productName: "Wireless Gaming Controller Pro",
    price: "$55.00",
    originalPrice: "$75.00",
    image: "https://i.ibb.co.com/Q3Sjxy1L/havit-game-pad-g158bt-pro-wiredhavit-business-215824-1024x1024-crop-center-removebg-preview.png",
    href: "/product/wireless-controller-pro",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 5 + 1000 * 60 * 10),
  },
  {
    id: "headphones",
    tabTitle: "SECOND PRODUCT 40% CHEAPER",
    subtitle: "MEGA DISCOUNT",
    tagline: "BUY ONE GET SECOND AT 40% OFF",
    productName: "Noise Cancelling Headphones",
    price: "$120.00",
    originalPrice: "$200.00",
    image: "https://i.ibb.co.com/BVpxvpWr/Zeb-Blast-Z-pic2-removebg-preview.png",
    href: "/product/noise-cancelling-headphones",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 18),
  },
  {
    id: "usb-cable",
    tabTitle: "$10 BUCKS OR LESS",
    subtitle: "CLEARANCE SALE",
    tagline: "TOP ACCESSORIES UNDER $10",
    productName: "High Speed USB-C Cable",
    price: "$8.99",
    originalPrice: "$15.00",
    image: "https://i.ibb.co.com/5X01M2Wy/71m3-HJg-LTZL-AC-UF894-1000-QL80-removebg-preview.png",
    href: "/product/usb-c-cable",
    targetDate: new Date(Date.now() + 1000 * 60 * 60 * 2 + 1000 * 60 * 45),
  },
];

// Fallback image used when any slide image fails to load
const FALLBACK_IMAGE =
  "https://i.ibb.co.com/Q3Tpt7Df/industries-consumer-electronics-removebg-preview.png";

// ─── Countdown Hook ──────────────────────────────────────────────────────────
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff > 0) {
        setTimeLeft({
          hours:   Math.floor(diff / 3_600_000),
          minutes: Math.floor((diff / 60_000) % 60),
          seconds: Math.floor((diff / 1_000)  % 60),
        });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

// ─── Countdown Box ───────────────────────────────────────────────────────────
function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="border-2 border-primary rounded-md p-1.5 w-12 text-center bg-white dark:bg-gray-800 shadow-sm">
      <span className="block text-lg font-bold text-gray-800 dark:text-white leading-none">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] text-gray-500 dark:text-gray-400 uppercase font-semibold">{label}</span>
    </div>
  );
}

// ─── Main Slider ─────────────────────────────────────────────────────────────
export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slide = SLIDES[currentSlide];
  const { hours, minutes, seconds } = useCountdown(slide.targetDate);

  // Auto-advance every 5 s, reset on manual tab click, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(
      () => setCurrentSlide((p) => (p + 1) % SLIDES.length),
      5000
    );
    return () => clearInterval(id);
  }, [currentSlide, isPaused]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 my-8">
      <div
        className="relative bg-gradient-to-b from-[#f8f9fa] via-[#f3f4f6] to-[#eef0f3] dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-sm"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Main content grid
            Each section gets key={currentSlide} so React fully re-mounts it on
            every slide change. The CSS class (slide-anim-*) then re-runs its
            @keyframes animation automatically — no GSAP needed, never gets stuck. */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center min-h-[380px] p-6 md:p-10 gap-6">

          {/* Left – headline & tagline */}
          <div
            key={`left-${currentSlide}`}
            className="slide-anim-left md:col-span-4 space-y-2 text-center md:text-left"
          >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-800 dark:text-gray-100 tracking-tight leading-none uppercase">
              {slide.subtitle.split(" ")[0]} <br />
              <span className="font-bold">{slide.subtitle.split(" ").slice(1).join(" ")}</span>
            </h3>
            <p className="text-xs font-semibold tracking-wider text-gray-500 dark:text-gray-400 uppercase pt-2">
              {slide.tagline}
            </p>
          </div>

          {/* Center – product image
              key={currentSlide} forces React to unmount/remount the entire image
              wrapper on slide change → fresh network request for the new src. */}
          <div className="md:col-span-5 flex justify-center items-center h-64 md:h-80">
            <Link
              key={`img-${currentSlide}`}
              href={slide.href}
              className="slide-anim-image w-full h-full max-w-[320px] flex items-center justify-center cursor-pointer group"
            >
              <img
                src={slide.image}
                alt={slide.productName}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null; // prevent infinite loop
                  if (e.currentTarget.src !== FALLBACK_IMAGE) {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }
                }}
                className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105 drop-shadow-md"
              />
            </Link>
          </div>

          {/* Right – product name, price, countdown */}
          <div
            key={`right-${currentSlide}`}
            className="slide-anim-right md:col-span-3 space-y-4 text-center md:text-left"
          >
            <Link href={slide.href}>
              <h4 className="text-base font-bold text-sky-600 dark:text-sky-400 hover:underline leading-tight">
                {slide.productName}
              </h4>
            </Link>

            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-3xl font-normal text-red-500">{slide.price}</span>
              {slide.originalPrice && (
                <span className="text-sm text-gray-400 line-through">{slide.originalPrice}</span>
              )}
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 pt-2">
              <CountdownBox value={hours}   label="HOURS" />
              <CountdownBox value={minutes} label="MINS"  />
              <CountdownBox value={seconds} label="SECS"  />
            </div>
          </div>

        </div>

        {/* Tab bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 border-t border-gray-200/90 dark:border-gray-800 bg-white/80 dark:bg-gray-950 backdrop-blur-sm">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(i)}
              className={`relative px-3 py-4 text-center transition-all duration-200 cursor-pointer select-none ${
                currentSlide === i
                  ? "bg-[#f3f4f6] dark:bg-gray-900 font-bold text-gray-900 dark:text-white"
                  : "hover:bg-gray-100/60 dark:hover:bg-gray-900/50 text-gray-500 dark:text-gray-400 font-medium"
              }`}
            >
              {currentSlide === i && (
                <div className="absolute top-0 left-0 w-full">
                  <div className="h-[3px] w-full bg-primary" />
                  <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-primary" />
                </div>
              )}
              <span className="text-[11px] leading-tight block uppercase tracking-tight pt-1">
                {s.tabTitle}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
