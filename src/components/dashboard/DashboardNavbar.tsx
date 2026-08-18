"use client";

import React, { useState, useEffect } from "react";
import { Search, Bell, User, Menu, Sun, Moon } from "lucide-react";

interface DashboardNavbarProps {
  onToggleSidebar: () => void;
}

export default function DashboardNavbar({ onToggleSidebar }: DashboardNavbarProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync theme with document element on mount
  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const nextDarkState = !isDarkMode;
    setIsDarkMode(nextDarkState);

    if (nextDarkState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="h-16 w-full border-b border-slate-200/80 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
      
      {/* Mobile Hamburger & Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle Sidebar"
          className="lg:hidden p-2 rounded-xl border border-slate-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-48 sm:w-64 md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100/70 dark:bg-gray-950 border border-transparent focus:border-sky-500 rounded-xl text-xs focus:outline-none focus:bg-white dark:focus:bg-gray-900 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-800 dark:text-gray-100"
          />
        </div>
      </div>

      {/* Controls & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        
        {/* ── Theme Switcher Toggle ── */}
        {mounted && (
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="w-9 h-9 rounded-xl border border-slate-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-white transition-transform hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-sky-600 transition-transform hover:-rotate-12" />
            )}
          </button>
        )}

        {/* Notifications Bell */}
        <button
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl border border-slate-200 dark:border-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-500" />
        </button>

        <div className="h-5 w-px bg-slate-200 dark:bg-gray-800 hidden sm:block" />

        {/* User Profile Info */}
        <div className="flex items-center gap-3 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-800 dark:text-gray-200 leading-none">
              Alex Rivera
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 leading-none">
              Store Admin
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}