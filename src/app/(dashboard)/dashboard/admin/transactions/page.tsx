import React from "react";
import { getTransactions } from "@/lib/api/transactions";
import TransactionsClient from "./TransactionsClient";

export const dynamic = "force-dynamic";

interface AdminTransactionsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    method?: string;
    sort?: string;
    page?: string;
    limit?: string;
  }>;
}

export default async function AdminTransactionsPage({
  searchParams,
}: AdminTransactionsPageProps) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;

  const transRes = await getTransactions({
    ...params,
    page,
    limit,
  });

  const transactions = Array.isArray(transRes?.data?.transactions)
    ? transRes.data.transactions
    : Array.isArray(transRes?.data)
    ? transRes.data
    : Array.isArray(transRes)
    ? transRes
    : [];

  const pagination = transRes?.data?.pagination ?? {
    page,
    limit,
    total: transRes?.data?.total ?? transactions.length,
    totalPages: Math.max(1, Math.ceil((transRes?.data?.total ?? transactions.length) / limit)),
  };

  return (
    <TransactionsClient
      initialTransactions={transactions}
      pagination={pagination}
    />
  );
}
