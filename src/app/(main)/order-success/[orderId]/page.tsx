import React from "react";
import OrderSuccessClient from "./OrderSuccessClient";
import { getUserSession } from "@/lib/core/session";

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

  return <OrderSuccessClient orderId={orderId} user={user} />;
}
