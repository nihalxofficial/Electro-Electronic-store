"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Package,
  FileText,
  Settings,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/dashboard/products", icon: Package },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200/80 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col justify-between shrink-0 h-screen sticky top-0">
      <div className="p-6 space-y-8">
        
        {/* Brand Logo */}
        <Link href="/" className="inline-flex items-baseline group">
          <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
            electro
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-sky-400">
            .
          </span>
          <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 border border-sky-200/60 dark:border-sky-800/50 px-2 py-0.5 rounded-md">
            Admin
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="space-y-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 mb-2">
            Main Menu
          </p>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-80" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Support Card */}
      <div className="p-4 border-t border-slate-100 dark:border-gray-800/80">
        <Link
          href="/dashboard/support"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-gray-800 transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-sky-500" />
          <span>Help & Support</span>
        </Link>
      </div>
    </aside>
  );
}