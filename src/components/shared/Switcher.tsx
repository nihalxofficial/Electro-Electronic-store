"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch between server and client
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50">
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