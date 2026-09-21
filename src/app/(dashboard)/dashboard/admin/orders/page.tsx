import React from "react";
import { getAllOrders } from "@/lib/api/orders";
import OrdersClient from "./OrdersClient";

export const dynamic = "force-dynamic";

interface AdminOrdersPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const ordersRes = await getAllOrders({
    ...params,
    page,
    limit,
  });

  const orders = Array.isArray(ordersRes?.data?.orders)
    ? ordersRes.data.orders
    : Array.isArray(ordersRes?.data)
    ? ordersRes.data
    : Array.isArray(ordersRes)
    ? ordersRes
    : [];

  const pagination = ordersRes?.data?.pagination ?? {
    page,
    limit,
    total: ordersRes?.data?.total ?? orders.length,
    totalPages: Math.max(1, Math.ceil((ordersRes?.data?.total ?? orders.length) / limit)),
  };

  return (
    <OrdersClient
      initialOrders={orders}
      pagination={pagination}
    />
  );
}
