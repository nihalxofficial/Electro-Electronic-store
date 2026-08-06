import { LucideIcon } from "lucide-react";

// ─── Layout ───────────────────────────────────────────────────────────────────
export interface LayoutProps {
  children: React.ReactNode;
}

// ─── Top Header ───────────────────────────────────────────────────────────────
export interface TopBarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

/** Search bar category select options */
export interface CategoryOption {
  label: string;
  value: string;
}

/** Icon links on the right side of the navbar (Compare, Wishlist, Account, Cart) */
export interface HeaderActionItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badgeCount?: number;
  showPrice?: boolean;
}

// ─── Categories Mega Menu ─────────────────────────────────────────────────────

/** One item in the left sidebar of the Categories dropdown */
export interface CategoryMenuItem {
  id: string;
  name: string;
  href: string;
  isBold?: boolean;
  hasSubmenu?: boolean;
  SubMenuComponent?: React.ComponentType;
}

/** A single link inside a mega menu column */
export interface CategorySubItem {
  name: string;
  href: string;
  isBold?: boolean;
}

/** One column in the mega menu right panel (title + links) */
export interface CategoryGroup {
  title: string;
  href?: string;
  items: CategorySubItem[];
}

/**
 * Promo block in the upper-right of a mega menu panel.
 * Use `customContent` for fully custom JSX, or fill the structured fields.
 */
export interface MegaMenuPromo {
  badge?: string;
  subtitle?: string;
  title?: string;
  titleClassName?: string;
  linkText?: string;
  linkHref?: string;
  customContent?: React.ReactNode;
}

/**
 * Full config for one mega menu panel.
 * Edit in: src/data/navbarMenuData.ts → MEGA_MENU_PANELS
 * Change background image: set `imageSrc` on the matching panel entry.
 */
export interface MegaMenuConfig {
  groups: CategoryGroup[];
  promo?: MegaMenuPromo;
  showBranding?: boolean;
  imageSrc?: string;
  imageAlt?: string;
}


// types/hero.ts
export interface HeroSlide {
  id: string;
  tabTitle: string;
  subtitle?: string;
  title: string;
  productName: string;
  price: string;
  originalPrice?: string;
  image: string;
  buttonText: string;
  href: string;
  hours: number;
  mins: number;
  secs: number;
}

// types/banner.ts
export interface PromoBanner {
  id: string;
  subtitle: string;
  title: string;
  highlightText?: string;
  titleSuffix?: string;
  href: string;
  image: string;
  imageAlt: string;
  buttonText?: string;
  pricePrefix?: string;
  price?: number | string;
  priceDollars?: string;
  priceCents?: string;
  priority?: boolean;
}

export interface TabletPromoProps {
  categorySlug?: string;
  titlePrefix?: string;
  highlightText?: string;
  titleSuffix?: string;
  startingPrice?: string;
  cents?: string;
  imageSrc?: string;
}




// types/product.ts

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
  title: string;
  slug: string;
  categories: string[]; // e.g. ["Accessories", "Headphone Cases"]
  price: number;
  originalPrice?: number;
  discountPercentage?: number; // e.g. 80 for -80%
  discountPercent?: number; // e.g. 80 for -80%
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


export interface Brand {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}


export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  distance: string; // e.g., "1.2 miles"
  isOpen: boolean;
  hours: string;
  services: string[];
  lat: number;
  lng: number;
}