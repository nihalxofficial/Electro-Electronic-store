import { CartData, Product, User } from "./index";

export type PaymentMethod = "cod" | "bkash" | "rocket" | "nagad";

export interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface CreateOrderItemPayload {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  userId: string;
  items: CreateOrderItemPayload[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  transactionId?: string;
}

export interface SendOtpPayload {
  phone: string;
}

export interface SendOtpResponse {
  otp: string;
  expiresInMinutes: number;
}

export interface VerifyOtpPayload {
  phone: string;
  otp: string;
}

export interface VerifyOtpResponse {
  transactionId: string;
}

export interface OrderItem {
  productId: string | Product;
  product?: Product;
  quantity: number;
  price?: number;
  lineTotal?: number;
  title?: string;
  image?: string;
}

export interface Order {
  _id: string;
  id?: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  transactionId?: string;
  totalAmount: number;
  subtotal?: number;
  shippingFee?: number;
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: string;
  updatedAt?: string;
}

export interface CheckoutClientProps {
  initialCart?: CartData | null;
  user?: User | null;
}

export interface OrderSuccessClientProps {
  orderId: string;
  initialOrder?: Order | null;
  user?: User | null;
}
