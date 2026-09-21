import React from "react";
import CustomerTransactionsClient from "./CustomerTransactionsClient";
import { CustomerTransaction, SavedPaymentCard } from "@/types/customerDashboard";
import { getUserSession } from "@/lib/core/session";
import { getTransactionsByUserId } from "@/lib/api/transactions";

export const dynamic = "force-dynamic";

const INITIAL_SAVED_CARDS: SavedPaymentCard[] = [
  {
    id: "card-1",
    brand: "visa",
    last4: "4242",
    expMonth: "08",
    expYear: "28",
    holderName: "Customer",
    isDefault: true,
  },
];

export default async function CustomerTransactionsPage() {
  const user = await getUserSession();
  let transactions: CustomerTransaction[] = [];

  if (user?.id) {
    try {
      const res = await getTransactionsByUserId(user.id);
      const rawTrans: any[] = Array.isArray(res?.data?.transactions)
        ? res.data.transactions
        : Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res)
        ? res
        : [];

      transactions = rawTrans.map((t: any): CustomerTransaction => {
        const orderIdStr = typeof t.orderId === "object" ? t.orderId?._id : t.orderId || "";
        const shortOrderId = orderIdStr ? `#ORD-${orderIdStr.slice(-6).toUpperCase()}` : "#ORD";
        const dateStr = t.createdAt
          ? new Date(t.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "";

        return {
          id: t._id || t.id,
          orderId: orderIdStr,
          orderNumber: shortOrderId,
          date: dateStr,
          amount: t.amount || 0,
          status: t.status === "success" ? "Completed" : t.status === "failed" ? "Failed" : "Pending",
          paymentMethod: (t.method || "").toUpperCase(),
          type: "Payment",
          invoiceNumber: t.reference || `INV-${(t._id || "").slice(-8).toUpperCase()}`,
        };
      });
    } catch (err) {
      console.error("Failed to fetch customer transactions:", err);
    }
  }

  return (
    <CustomerTransactionsClient
      initialTransactions={transactions}
      initialSavedCards={INITIAL_SAVED_CARDS}
    />
  );
}
