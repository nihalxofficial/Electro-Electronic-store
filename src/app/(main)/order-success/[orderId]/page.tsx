import React from "react";
import OrderSuccessClient from "./OrderSuccessClient";
import { getUserSession } from "@/lib/core/session";
import { getOrderById } from "@/lib/api/orders";
import { Order } from "@/types";

export const metadata = {
  title: "Order Confirmed | Electro",
  description:
    "Thank you for your order! Your order has been placed successfully on Electro.",
};

interface PageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { orderId } = await params;
  const user = await getUserSession();

  let initialOrder: Order | null = null;

  try {
    const res = await getOrderById(orderId);
    if (res?.success && res.data) {
      initialOrder = res.data;
    }
  } catch {
    // Backend unavailable during SSR — client will show fallback
  }

  return <OrderSuccessClient orderId={orderId} initialOrder={initialOrder} user={user} />;
}
