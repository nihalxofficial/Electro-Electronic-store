import React from "react";
import { LucideIcon } from "lucide-react";

// ─── Layout & Common Global Types ─────────────────────────────────────────────
export interface LayoutProps {
  children: React.ReactNode;
}

// ─── Header & TopBar ──────────────────────────────────────────────────────────
export interface TopBarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// ─── Navbar & Search ──────────────────────────────────────────────────────────
export interface CategoryOption {
  label: string;
  value: string;
}

export interface HeaderActionItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badgeCount?: number;
  showPrice?: boolean;
}

// ─── Categories Mega Menu ─────────────────────────────────────────────────────
export interface CategoryMenuItem {
  id: string;
  name: string;
  href: string;
  isBold?: boolean;
  hasSubmenu?: boolean;
  SubMenuComponent?: React.ComponentType;
}

export interface CategorySubItem {
  name: string;
  href: string;
  isBold?: boolean;
}

export interface CategoryGroup {
  title: string;
  href?: string;
  items: CategorySubItem[];
}

export interface MegaMenuPromo {
  badge?: string;
  subtitle?: string;
  title?: string;
  titleClassName?: string;
  linkText?: string;
  linkHref?: string;
  customContent?: React.ReactNode;
}

export interface MegaMenuConfig {
  groups: CategoryGroup[];
  promo?: MegaMenuPromo;
  showBranding?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}

// ─── Products & Reviews ───────────────────────────────────────────────────────
export interface ProductBadge {
  text: string;
  type: "discount" | "new" | "hot" | "sale";
}

export interface ProductReview {
  id: string;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  ownerId?: string;
  title: string;
  slug: string;
  categories: string[]; // e.g. ["Accessories", "Headphone Cases"]
  price: number;
  originalPrice?: number;
  discountPercentage?: number; // e.g. 80 for -80%
  image: string;
  additionalImages?: string[];
  inStock: boolean;
  stockQuantity?: number;
  rating?: number;
  reviewCount?: number;
  badges?: ProductBadge[];
  sku?: string;
  description?: string;
  specifications?: Record<string, string>;
  isFeatured?: boolean;
}

// ─── Brand ───────────────────────────────────────────────────────────────────
export interface Brand {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

// ─── Categories & Subcategories ──────────────────────────────────────────────
export interface Category {
  ownerId?: string;
  name: string;
  slug: string;
  image?: File | string;
  description?: string;
  isActive?: boolean;
}

export interface SubCategory {
  ownerId?: string;
  categoryId: string; // selected from a dropdown of existing categories
  name: string;
  slug: string;
  image?: File | string;
  description?: string;
  isActive?: boolean;
}

// ─── Page Specific Types (Re-exports) ─────────────────────────────────────────
export * from "./home";
export * from "./adminDashboard";
export * from "./storeLocator";