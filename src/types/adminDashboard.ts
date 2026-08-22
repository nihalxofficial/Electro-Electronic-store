// ─── Admin Dashboard Page Types ───────────────────────────────────────────────

export interface StatCardItem {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: "DollarSign" | "ShoppingBag" | "Users" | "TrendingUp";
}

export interface RevenueDataPoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  email: string;
  product: string;
  amount: string;
  status: "Completed" | "Processing" | "Pending" | "Cancelled";
  date: string;
}
