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

export interface Transaction {
  _id: string;
  id?: string;
  orderId:
    | string
    | {
        _id: string;
        totalAmount?: number;
        orderStatus?: string;
        shippingAddress?: {
          fullName?: string;
          phone?: string;
          address?: string;
          city?: string;
          postalCode?: string;
        };
        createdAt?: string;
      };
  userId:
    | string
    | {
        _id?: string;
        name?: string;
        email?: string;
        image?: string;
        avatar?: string;
      };
  method: "cod" | "bkash" | "rocket" | "nagad";
  amount: number;
  status: "pending" | "success" | "failed";
  reference: string;
  createdAt?: string;
  updatedAt?: string;
}

