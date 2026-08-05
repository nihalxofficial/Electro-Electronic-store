"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeSwitchProps {
  /** 
   * 'sidebar' → original vertical pill fixed on the left (desktop only, hidden on mobile)
   * 'inline'  → horizontal Light/Dark pill toggle (for use inside menus/drawers)
   */
  variant?: "sidebar" | "inline";
}

export function ThemeSwitch({ variant = "sidebar" }: ThemeSwitchProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server and client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  // ── Inline variant: horizontal Light / Dark pill toggle ──────────────────
  if (variant === "inline") {
    return (
      <div className="flex items-center gap-1 p-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={() => setTheme("light")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            !isDark
              ? "bg-primary text-white shadow-sm"
              : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          }`}
        >
          <Sun className="w-3.5 h-3.5" />
          Light
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
            isDark
              ? "bg-gray-700 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Moon className="w-3.5 h-3.5" />
          Dark
        </button>
      </div>
    );
  }

  // ── Sidebar variant: original vertical pill (desktop only) ───────────────
  return (
    <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-50">
      <div
        className="relative bg-gray-400/80 dark:bg-gray-700/80 backdrop-blur-sm p-1.5 rounded-2xl border border-gray-300 dark:border-gray-600 shadow-lg flex flex-col items-center justify-between gap-1 w-10 h-[108px] cursor-pointer select-none transition-colors duration-200"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {/* Animated Sliding White Capsule with GPU-accelerated transform */}
        <div
          className={`absolute left-1.5 right-1.5 h-11.5 bg-white dark:bg-gray-900 rounded-xl shadow-md transition-transform duration-300 ease-out ${
            isDark ? "translate-y-12.5" : "translate-y-0"
          }`}
          style={{ top: "0.375rem" }} // Fixes starting top offset (1.5 / 6 = 0.375rem)
        />

        {/* Light Mode Label */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTheme("light");
          }}
          className={`relative cursor-pointer z-10 w-full h-1/2 flex items-center justify-center text-[11px] font-semibold transition-colors duration-200 ${
            !isDark ? "text-gray-900 font-bold" : "text-gray-200 hover:text-white"
          }`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Light
        </button>

        {/* Dark Mode Label */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setTheme("dark");
          }}
          className={`relative cursor-pointer z-10 w-full h-1/2 flex items-center justify-center text-[11px] font-semibold transition-colors duration-200 ${
            isDark ? "text-white font-bold" : "text-gray-700 hover:text-gray-900"
          }`}
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Dark
        </button>
      </div>
    </div>
  );
}