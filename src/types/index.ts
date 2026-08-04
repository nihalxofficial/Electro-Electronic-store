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