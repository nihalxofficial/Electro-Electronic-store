import { LucideIcon } from "lucide-react";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface TopBarItem {
  label: string;
  href: string;
  icon: LucideIcon;
}