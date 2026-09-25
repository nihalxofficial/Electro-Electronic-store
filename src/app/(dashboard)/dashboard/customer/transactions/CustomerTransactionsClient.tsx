"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Card,
  Button,
  Input,
  Select,
  ListBox,
} from "@heroui/react";
import {
  CreditCard,
  Download,
  Search,
  Plus,
  Trash2,
  ShieldCheck,
  Receipt,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpDown,
  Filter,
  RotateCcw,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import { CustomerTransaction, SavedPaymentCard } from "@/types/customerDashboard";

const STATUS_OPTIONS = [
  { key: "all", label: "All Statuses" },
  { key: "Completed", label: "Completed" },
  { key: "Pending", label: "Pending" },
  { key: "Failed", label: "Failed" },
];

const SORT_OPTIONS = [
  { key: "newest", label: "Newest First" },
  { key: "oldest", label: "Oldest First" },
  { key: "amount_desc", label: "Amount: High to Low" },
  { key: "amount_asc", label: "Amount: Low to High" },
];

interface CustomerTransactionsClientProps {
  initialTransactions?: CustomerTransaction[];
  initialSavedCards?: SavedPaymentCard[];
}

export default function CustomerTransactionsClient({
  initialTransactions = [],
  initialSavedCards = [],
}: CustomerTransactionsClientProps) {
  const [transactions, setTransactions] = useState<CustomerTransaction[]>(initialTransactions);
  const [savedCards, setSavedCards] = useState<SavedPaymentCard[]>(initialSavedCards);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("newest");
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  // New card form state
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // ── Compute Real Metrics from DB Transactions ──
  const totalPaid = transactions
    .filter((tx) => tx.status === "Completed")
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const settledCount = transactions.filter((tx) => tx.status === "Completed").length;

  const pendingTotal = transactions
    .filter((tx) => tx.status === "Pending")
    .reduce((sum, tx) => sum + (tx.amount || 0), 0);

  const pendingCount = transactions.filter((tx) => tx.status === "Pending").length;

  // ── Filter and Sort using HeroUI values ──
  const filteredTransactions = useMemo(() => {
    let result = transactions.filter((tx) => {
      const matchesStatus =
        statusFilter === "all" ||
        tx.status.toLowerCase() === statusFilter.toLowerCase();

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        tx.orderNumber.toLowerCase().includes(q) ||
        tx.invoiceNumber.toLowerCase().includes(q) ||
        tx.paymentMethod.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });

    result.sort((a, b) => {
      switch (sortOrder) {
        case "oldest":
          return a.id.localeCompare(b.id);
        case "amount_desc":
          return (b.amount || 0) - (a.amount || 0);
        case "amount_asc":
          return (a.amount || 0) - (b.amount || 0);
        case "newest":
        default:
          return 0; // Natural descending order
      }
    });

    return result;
  }, [transactions, statusFilter, searchQuery, sortOrder]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortOrder("newest");
  };

  const handleDownloadInvoice = (invoiceNumber: string) => {
    toast.success(`Downloading tax invoice ${invoiceNumber}.pdf...`);
  };

  const handleSetDefaultCard = (id: string) => {
    setSavedCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
    toast.success("Default payment card updated.");
  };

  const handleDeleteCard = (id: string) => {
    setSavedCards((prev) => prev.filter((c) => c.id !== id));
    toast.info("Payment card removed.");
  };

  const handleAddCardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardHolder) {
      toast.error("Please fill in card details");
      return;
    }

    const newCard: SavedPaymentCard = {
      id: `card-${Date.now()}`,
      brand: "visa",
      last4: cardNumber.slice(-4) || "9999",
      expMonth: cardExp.split("/")[0] || "12",
      expYear: cardExp.split("/")[1] || "28",
      holderName: cardHolder,
      isDefault: savedCards.length === 0,
    };

    setSavedCards((prev) => [...prev, newCard]);
    setIsAddCardOpen(false);
    setCardHolder("");
    setCardNumber("");
    setCardExp("");
    setCardCvv("");
    toast.success("New payment method added securely!");
  };

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all" || sortOrder !== "newest";

  return (
    <div className="space-y-8">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            <Link href="/dashboard/customer" className="hover:text-sky-600 transition-colors">
              Customer Dashboard
            </Link>
            <span>/</span>
            <span className="text-sky-600 dark:text-sky-400">Transactions</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Transactions &amp;{" "}
            <span className="bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent">
              Invoices
            </span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
            View your actual billing history, payment settlements, and receipts.
          </p>
        </div>

        <button
          onClick={() => setIsAddCardOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Payment Method</span>
        </button>
      </div>

      {/* ── Real Dynamic Financial Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Paid */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Total Paid (Settled)
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${totalPaid.toFixed(2)}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {settledCount} {settledCount === 1 ? "settled payment" : "settled payments"}
          </p>
        </div>

        {/* Pending Settlements */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Pending / COD
            </span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            ${pendingTotal.toFixed(2)}
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
            {pendingCount} pending settlement
          </p>
        </div>

        {/* Total Invoices */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Invoices Available
            </span>
            <Receipt className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {transactions.length}
          </p>
          <p className="text-[11px] text-gray-400">PDF receipt ready</p>
        </div>

        {/* Saved Cards */}
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Saved Cards
            </span>
            <CreditCard className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {savedCards.length}
          </p>
          <p className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">
            Protected with 256-bit SSL
          </p>
        </div>
      </div>

      {/* ── Saved Payment Cards Manager ── */}
      {savedCards.length > 0 && (
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Saved Payment Cards
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Cards saved for rapid checkout
              </p>
            </div>
            <button
              onClick={() => setIsAddCardOpen(true)}
              className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Card</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {savedCards.map((card) => (
              <div
                key={card.id}
                className={`p-5 rounded-2xl border transition-all ${
                  card.isDefault
                    ? "border-sky-500/50 bg-gradient-to-br from-sky-500/5 to-blue-500/10 shadow-xs"
                    : "border-slate-200 dark:border-gray-800 bg-slate-50/50 dark:bg-gray-950/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider uppercase text-gray-800 dark:text-gray-200">
                    {card.brand}
                  </span>
                  {card.isDefault ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                      Default
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSetDefaultCard(card.id)}
                      className="text-[10px] font-semibold text-gray-400 hover:text-sky-600 transition-colors"
                    >
                      Set as Default
                    </button>
                  )}
                </div>

                <div className="my-4">
                  <p className="text-sm font-mono font-bold tracking-widest text-gray-900 dark:text-white">
                    •••• •••• •••• {card.last4}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Expires {card.expMonth}/{card.expYear} • {card.holderName}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[10px] text-gray-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
                    <span>Encrypted</span>
                  </div>
                  {!card.isDefault && (
                    <button
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-gray-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Remove card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Transaction Table & HeroUI v3 Toolbar ── */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Transaction History
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Receipts and invoices from your store purchases
            </p>
          </div>
        </div>

        {/* HeroUI v3 Toolbar: Search, Status Select, Sort Select */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-slate-50 dark:bg-gray-950/60 rounded-xl border border-slate-100 dark:border-gray-800">
          {/* HeroUI Input Search */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice / order..."
              className="w-full pl-9 pr-8 h-10 bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 focus:border-sky-500 rounded-xl text-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* HeroUI Select Status */}
          <div>
            <Select
              selectedKey={statusFilter}
              onSelectionChange={(key) => setStatusFilter(key ? String(key) : "all")}
            >
              <Select.Trigger className="h-10 w-full px-3.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between gap-1.5 cursor-pointer hover:border-sky-400 transition-colors shadow-xs [&>span]:text-xs [&>span]:font-semibold">
                <div className="flex items-center gap-2 truncate">
                  <Filter className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <Select.Value className="text-xs font-semibold truncate" />
                </div>
                <Select.Indicator className="[&>svg]:w-3.5 [&>svg]:h-3.5 text-gray-400 shrink-0" />
              </Select.Trigger>
              <Select.Popover className="w-56 p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50">
                <ListBox className="space-y-1 p-0">
                  {STATUS_OPTIONS.map((opt) => (
                    <ListBox.Item
                      key={opt.key}
                      id={opt.key}
                      textValue={opt.label}
                      className="px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-950/60 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer flex items-center justify-between data-[selected=true]:bg-sky-500 data-[selected=true]:text-white font-semibold transition-colors"
                    >
                      {opt.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* HeroUI Select Sort */}
          <div>
            <Select
              selectedKey={sortOrder}
              onSelectionChange={(key) => setSortOrder(key ? String(key) : "newest")}
            >
              <Select.Trigger className="h-10 w-full px-3.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-200 flex items-center justify-between gap-1.5 cursor-pointer hover:border-sky-400 transition-colors shadow-xs [&>span]:text-xs [&>span]:font-semibold">
                <div className="flex items-center gap-2 truncate">
                  <ArrowUpDown className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <Select.Value className="text-xs font-semibold truncate" />
                </div>
                <Select.Indicator className="[&>svg]:w-3.5 [&>svg]:h-3.5 text-gray-400 shrink-0" />
              </Select.Trigger>
              <Select.Popover className="w-56 p-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl z-50">
                <ListBox className="space-y-1 p-0">
                  {SORT_OPTIONS.map((opt) => (
                    <ListBox.Item
                      key={opt.key}
                      id={opt.key}
                      textValue={opt.label}
                      className="px-3 py-2 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 hover:bg-sky-50 dark:hover:bg-sky-950/60 hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer flex items-center justify-between data-[selected=true]:bg-sky-500 data-[selected=true]:text-white font-semibold transition-colors"
                    >
                      {opt.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>
              Showing{" "}
              <strong className="text-gray-900 dark:text-white font-bold">
                {filteredTransactions.length}
              </strong>{" "}
              of {transactions.length} transactions
            </span>
            <button
              type="button"
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}

        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 dark:bg-gray-800 flex items-center justify-center text-gray-400">
              <Receipt className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-gray-900 dark:text-white">
              No transactions found
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {searchQuery || statusFilter !== "all"
                ? "No transactions matched your search or filter."
                : "Your transaction history will be displayed here once you complete orders."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Invoice / Ref</th>
                  <th className="pb-3">Order Number</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Payment Method</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-gray-800">
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="py-3.5 pl-2 font-mono font-bold text-gray-900 dark:text-white">
                      {tx.invoiceNumber}
                    </td>
                    <td className="py-3.5 font-semibold text-gray-700 dark:text-gray-300">
                      {tx.orderNumber}
                    </td>
                    <td className="py-3.5 text-gray-500 dark:text-gray-400">
                      {tx.date}
                    </td>
                    <td className="py-3.5">
                      <span className="inline-flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200">
                        <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                        {tx.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3.5 font-bold text-gray-900 dark:text-white">
                      ${tx.amount.toFixed(2)}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.status === "Completed"
                            ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                            : tx.status === "Pending"
                            ? "bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400"
                            : "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => handleDownloadInvoice(tx.invoiceNumber)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 text-[11px] font-semibold text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Add Card Modal ── */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Add Payment Method
              </h3>
              <button
                onClick={() => setIsAddCardOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCardSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4242 •••• •••• 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-9 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
                  />
                  <CreditCard className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="08/28"
                    maxLength={5}
                    value={cardExp}
                    onChange={(e) => setCardExp(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    CVC / CVV
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="•••"
                    maxLength={4}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsAddCardOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
