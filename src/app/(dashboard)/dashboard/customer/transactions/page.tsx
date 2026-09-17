import React from "react";
import CustomerTransactionsClient from "./CustomerTransactionsClient";
import { CustomerTransaction, SavedPaymentCard } from "@/types/customerDashboard";

// ── All Transactions Data Kept In Page.tsx ──
const MOCK_TRANSACTIONS_LIST: CustomerTransaction[] = [
  {
    id: "tx-1",
    orderId: "ord-1",
    orderNumber: "#ORD-9582",
    date: "Aug 18, 2026",
    amount: 399.00,
    status: "Completed",
    paymentMethod: "Visa",
    cardLast4: "4242",
    type: "Payment",
    invoiceNumber: "INV-2026-0881",
  },
  {
    id: "tx-2",
    orderId: "ord-2",
    orderNumber: "#ORD-9564",
    date: "Aug 02, 2026",
    amount: 129.99,
    status: "Completed",
    paymentMethod: "Apple Pay",
    type: "Payment",
    invoiceNumber: "INV-2026-0792",
  },
  {
    id: "tx-3",
    orderId: "ord-3",
    orderNumber: "#ORD-9490",
    date: "Jul 24, 2026",
    amount: 649.50,
    status: "Completed",
    paymentMethod: "Mastercard",
    cardLast4: "8812",
    type: "Payment",
    invoiceNumber: "INV-2026-0683",
  },
  {
    id: "tx-4",
    orderId: "ord-4",
    orderNumber: "#ORD-9412",
    date: "Jun 14, 2026",
    amount: 219.00,
    status: "Completed",
    paymentMethod: "PayPal",
    type: "Payment",
    invoiceNumber: "INV-2026-0544",
  },
  {
    id: "tx-5",
    orderId: "ord-5",
    orderNumber: "#ORD-9302",
    date: "May 09, 2026",
    amount: 445.00,
    status: "Refunded",
    paymentMethod: "Visa",
    cardLast4: "4242",
    type: "Refund",
    invoiceNumber: "REF-2026-0310",
  },
];

const INITIAL_SAVED_CARDS: SavedPaymentCard[] = [
  {
    id: "card-1",
    brand: "visa",
    last4: "4242",
    expMonth: "08",
    expYear: "28",
    holderName: "Alex Rivera",
    isDefault: true,
  },
  {
    id: "card-2",
    brand: "mastercard",
    last4: "8812",
    expMonth: "11",
    expYear: "27",
    holderName: "Alex Rivera",
    isDefault: false,
  },
];

async function getTransactionsData() {
  try {
    return {
      transactions: MOCK_TRANSACTIONS_LIST,
      savedCards: INITIAL_SAVED_CARDS,
    };
  } catch (error) {
    console.error("Failed to fetch transactions data:", error);
    return {
      transactions: MOCK_TRANSACTIONS_LIST,
      savedCards: INITIAL_SAVED_CARDS,
    };
  }
}

export default async function CustomerTransactionsPage() {
  const data = await getTransactionsData();
  return (
    <CustomerTransactionsClient
      initialTransactions={data.transactions}
      initialSavedCards={data.savedCards}
    />
  );
}
