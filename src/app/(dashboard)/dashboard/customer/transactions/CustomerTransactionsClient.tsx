"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Download,
  Search,
  Plus,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import { CustomerTransaction, SavedPaymentCard } from "@/types/customerDashboard";

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
  const [statusFilter, setStatusFilter] = useState("All");
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  // New card form state
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const filteredTransactions = transactions.filter((tx) => {
    const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
    const matchesSearch =
      tx.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

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
            View billing history, download tax invoices, and manage saved payment methods.
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

      {/* ── Financial Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Total Paid (Net)
          </span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$1,842.50</p>
          <p className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">14 settled transactions</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Refunds &amp; Credits
          </span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">$445.00</p>
          <p className="text-[11px] text-gray-400">1 refunded order</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Invoices Available
          </span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {transactions.length}
          </p>
          <p className="text-[11px] text-gray-400">PDF download enabled</p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Saved Cards
          </span>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {savedCards.length}
          </p>
          <p className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">Protected with 256-bit SSL</p>
        </div>
      </div>

      {/* ── Saved Payment Cards Manager ── */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Saved Payment Cards
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Cards used for rapid 1-click checkout
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
                    className="text-gray-400 hover:text-rose-600 p-1"
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

      {/* ── Transaction Table & Search ── */}
      <div className="bg-white dark:bg-gray-900 border border-slate-200/80 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Transaction History
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Receipts and invoices for tax &amp; accounting
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Completed">Completed</option>
              <option value="Refunded">Refunded</option>
              <option value="Pending">Pending</option>
            </select>

            {/* Search */}
            <div className="relative w-48 sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search invoice / order..."
                className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-gray-950 border border-slate-200 dark:border-gray-800 rounded-xl text-xs focus:outline-none text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

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
                      {tx.paymentMethod} {tx.cardLast4 ? `(•• ${tx.cardLast4})` : ""}
                    </span>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        tx.type === "Refund"
                          ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400"
                          : "bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 font-bold text-gray-900 dark:text-white">
                    {tx.type === "Refund" ? `-$${tx.amount.toFixed(2)}` : `$${tx.amount.toFixed(2)}`}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                        tx.status === "Completed"
                          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
                          : tx.status === "Refunded"
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
      </div>

      {/* ── Add Card Modal ── */}
      {isAddCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white">
                Add Credit / Debit Card
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
                  Cardholder Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-gray-700 dark:text-gray-300">
                  Card Number (16 digits)
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  placeholder="4242 4242 4242 4242"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none font-mono"
                />
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-gray-700 dark:text-gray-300">
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-950 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCardOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-800 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold transition-all cursor-pointer"
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
