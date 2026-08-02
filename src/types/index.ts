import { LucideIcon } from "lucide-react";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface TopBarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

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
  /** Background image URL for the promo area (CSS background-image) */
  imageSrc?: string;
  imageAlt?: string;
}

export interface CategoryMenuItem {
  id: string;
  name: string;
  href: string;
  isBold?: boolean;
  hasSubmenu?: boolean;
  SubMenuComponent?: React.ComponentType;
}
