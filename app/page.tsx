"use client";

import { Delete, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";

// ----------------- Types -----------------
type Tx = {
  id: string;
  sender: { name: string; account: string };
  receiver: { name: string; account: string };
  amount_with_currency: string;
  amount: number;
  currency: string;
  cause: string;
  created_at_time: number;
  is_topup: boolean;
  is_outgoing_transfer: boolean;
};

// ----------------- Page Component -----------------
export default function Page() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const [loading, setLoading] = useState(false);
  const [txs, setTxs] = useState<Tx[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentAccount, setCurrentAccount] = useState<string>("yayawalletpi");
  const { theme, toggleTheme } = useTheme();

  // ----------------- Effects -----------------
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    // ...existing code...
    // Remove theme effect, handled by ThemeProvider
  }, []);

  // ----------------- Functions -----------------
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/transactions?p=${page}&q=${encodeURIComponent(
        q
      )}&perPage=${perPage}`;
      const res = await fetch(url);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setError(err?.message || `Server returned ${res.status}`);
        setTxs([]);
      } else {
        const json = await res.json();
        const transactions: Tx[] = json.data || [];
        const totalCount = json.total ?? transactions.length;

        setTxs(transactions);
        setTotal(totalCount);
      }
    } catch (err) {
      setError(String(err));
      setTxs([]);
    } finally {
      setLoading(false);
    }
  }

  function onSearch(e?: React.FormEvent) {
    if (e) e.preventDefault();
    setPage(1);
    fetchData();
  }

  // Removed local toggleTheme, now using context

  // ----------------- Derived -----------------
  const incomingCount = txs.filter(
    (t) => t.is_topup || t.receiver?.account === currentAccount
  ).length;
  const outgoingCount = txs.length - incomingCount;
  const totalAmount = txs.reduce((s, t) => s + (t.amount || 0), 0);

  // ----------------- Render -----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-10">
        {/* Top Section */}
  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              YaYa Wallet <span className="text-sky-600 dark:text-sky-400">Transactions</span>
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl text-sm sm:text-base">
              Securely view, search, and filter your account transactions.<br className="hidden sm:block" />
              <span className="inline-block mt-1 text-xs sm:text-sm text-sky-600 dark:text-sky-400">Modern, responsive, and theme-aware UI.</span>
            </p>
          </div>

          {/* Account + Theme Switcher */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm">
              <label className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-semibold">
                Account
              </label>
              <input
                className="ml-2 w-32 sm:w-40 border-none px-1 py-0 bg-transparent focus:outline-none text-sm"
                value={currentAccount}
                onChange={(e) => setCurrentAccount(e.target.value)}
                placeholder="account_name"
              />
            </div>
            <button
              onClick={toggleTheme}
              className="px-2 sm:px-4 py-1 sm:py-2 bg-slate-100 dark:bg-slate-700 text-xs sm:text-sm rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition flex items-center gap-1 sm:gap-2"
            >
              {theme === "light" ? <span>🌙</span> : <span>☀️</span>}
              <span className="hidden sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
            </button>
          </div>
        </div>

        {/* Stats + Search */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Search Bar */}
          <form onSubmit={onSearch} className="flex gap-2 col-span-2">
            <input
              className="flex-1 rounded-lg sm:rounded-xl border border-slate-200 dark:border-slate-700 px-2 sm:px-4 py-2 sm:py-3 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-sky-300 dark:focus:ring-sky-600 shadow-sm text-xs sm:text-base"
              placeholder="Search by sender, receiver, cause or ID"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 sm:px-5 py-2 sm:py-3 bg-sky-600 text-white rounded-lg sm:rounded-xl shadow hover:bg-sky-700 transition font-semibold text-xs sm:text-base flex items-center"
            >
              <Search className="w-4 h-4 sm:w-5 sm:h-5"/>
            </button>
            <button
              type="button"
              className="px-2 sm:px-4 py-2 sm:py-3 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition text-xs sm:text-base flex items-center"
              onClick={() => {
                setQ("");
                setPage(1);
                fetchData();
              }}
            >
              <Delete className="w-4 h-4 sm:w-5 sm:h-5"/>
            </button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow flex flex-col items-center">
              <span className="text-xs text-slate-500">Total</span>
              <span className="text-xl font-bold text-slate-900 dark:text-white">{total ?? txs.length}</span>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow flex flex-col items-center">
              <span className="text-xs text-slate-500">Incoming</span>
              <span className="text-xl font-bold text-green-600">
                {incomingCount}
              </span>
            </div>
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow flex flex-col items-center">
              <span className="text-xs text-slate-500">Outgoing</span>
              <span className="text-xl font-bold text-red-600">
                {outgoingCount}
              </span>
            </div>
          </div>
        </div>

        {/* Transactions List */}
  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-700">
          {loading ? (
            <div className="p-8 text-center animate-pulse text-lg text-sky-600 dark:text-sky-400">
              Loading transactions...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-600 text-lg">Error: {error}</div>
          ) : txs.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-lg">
              No transactions found.
            </div>
          ) : (
            <div>
              {/* Mobile cards */}
              <ul className="md:hidden divide-y">
                {txs.map((t) => {
                  const id = t.id;
                  const senderName = t.sender?.name || t.sender?.account || "—";
                  const receiverName = t.receiver?.name || t.receiver?.account || "—";
                  const amount = t.amount_with_currency || t.amount;
                  const createdAt = t.created_at_time
                    ? new Date(t.created_at_time * 1000).toLocaleString()
                    : "—";
                  const incoming = t.is_topup || receiverName === currentAccount;
                  return (
                    <li key={id} className={`p-4 flex flex-col gap-2 ${incoming ? "bg-green-50/50 dark:bg-green-900/20" : ""}`}>
                      {/* Hide transaction ID on mobile */}
                      {/* <div className="text-xs font-mono text-slate-400 break-all">{id}</div> */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-base font-semibold text-slate-900 dark:text-white">
                            {senderName} <span className="text-slate-400">→</span> {receiverName}
                          </div>
                          <div className="text-xs text-slate-500 mt-1">{createdAt}</div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold text-lg ${incoming ? "text-green-600" : "text-red-600"}`}>{amount}</div>
                        </div>
                      </div>
                      <div className="flex gap-2 text-xs text-slate-500 mt-1">
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{t.currency || "—"}</span>
                        <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-full">{t.cause || "—"}</span>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Desktop table */}
              <div className="hidden md:block overflow-auto">
                <table className="min-w-full table-fixed text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-700">
                    <tr>
                      <th className="p-3 text-left w-40">Txn ID</th>
                      <th className="p-3 text-left w-32">Sender</th>
                      <th className="p-3 text-left w-32">Receiver</th>
                      <th className="p-3 text-right w-24">Amount</th>
                      <th className="p-3 text-left w-20">Currency</th>
                      <th className="p-3 text-left w-32">Cause</th>
                      <th className="p-3 text-left w-40">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {txs.map((t) => {
                      const id = t.id;
                      const senderName = t.sender?.name || t.sender?.account || "—";
                      const receiverName = t.receiver?.name || t.receiver?.account || "—";
                      const amount = t.amount_with_currency || t.amount;
                      const currency = t.currency || "—";
                      const cause = t.cause || "—";
                      const createdAt = t.created_at_time
                        ? new Date(t.created_at_time * 1000).toLocaleString()
                        : "—";
                      const incoming = t.is_topup || receiverName === currentAccount;
                      return (
                        <tr
                          key={id}
                          className={`border-b dark:border-slate-700 transition hover:bg-sky-50/50 dark:hover:bg-sky-900/20 ${incoming ? "bg-green-50/50 dark:bg-green-900/20" : ""}`}
                        >
                          <td className="p-3 break-all max-w-xs text-xs text-slate-400 font-mono">{id}</td>
                          <td className="p-3 font-semibold">{senderName}</td>
                          <td className="p-3 font-semibold">{receiverName}</td>
                          <td className={`p-3 text-right font-bold ${incoming ? "text-green-600" : "text-red-600"}`}>{amount}</td>
                          <td className="p-3">{currency}</td>
                          <td className="p-3">{cause}</td>
                          <td className="p-3 text-xs">{createdAt}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Total: <span className="font-bold text-slate-900 dark:text-white">{total ?? "—"}</span>
          </div>
          <div className="flex gap-2">
            <button
              className="px-2 sm:px-4 py-1 sm:py-2 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 shadow disabled:opacity-50 hover:bg-sky-50 dark:hover:bg-sky-900 transition text-xs sm:text-base"
              disabled={page <= 1}
              onClick={() => setPage((v) => Math.max(1, v - 1))}
            >
              Prev
            </button>
            <div className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow">Page {page}</div>
            <div className="px-2 sm:px-4 py-1 sm:py-2 border border-slate-200 dark:border-slate-700 rounded-lg sm:rounded-xl bg-white dark:bg-slate-800 shadow text-xs sm:text-base">Page {page}</div>
            <button
              className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 shadow hover:bg-sky-50 dark:hover:bg-sky-900 transition"
              onClick={() => setPage((v) => v + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
